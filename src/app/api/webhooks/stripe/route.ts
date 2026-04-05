import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
  });
}

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.client_reference_id) {
          const supabaseAdmin = getSupabaseAdmin();
          const userId = session.client_reference_id;
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          // 1. Vincular o stripe_customer_id ao Perfil do usuário
          await supabaseAdmin
            .from('profiles')
            .update({ stripe_customer_id: customerId })
            .eq('id', userId);
          
          // 2. Destravar o acesso IMEDIATAMENTE descobrindo o plano comprado
          if (subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const planType = mapStripePriceToPlanType(subscription.items.data[0].price.id);

            // Atualiza a barreira (Paywall usa profiles.plan_type)
            await supabaseAdmin
              .from('profiles')
              .update({ plan_type: planType })
              .eq('id', userId);

            // Grava o controle de assinaturas
            await supabaseAdmin.from('subscriptions').upsert({
              id: subscription.id,
              user_id: userId,
              stripe_subscription_id: subscription.id,
              status: subscription.status,
              plan_type: planType,
              current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
            });
          }
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await manageSubscriptionStatusChange(
          subscription.id,
          subscription.customer as string
        );
        break;
      }
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook event', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function manageSubscriptionStatusChange(
  subscriptionId: string,
  customerId: string
) {
  const supabaseAdmin = getSupabaseAdmin();
  const stripe = getStripe();

  // 1. Achar o usuário pelo stripe_customer_id (pode falhar se o checkout.session.completed ainda não rodou)
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (noCustomerError || !customerData) {
    // É comum a Stripe enviar esse evento MILISSEGUNDOS antes do checkout.session.completed.
    // Ignoramos o erro aqui porque o checkout.session manipulará a criação com segurança logo em seguida.
    console.log(`Ignorando pois customer ${customerId} ainda não tem profile atrelado.`);
    return;
  }

  const uuid = customerData.id;

  // 2. Pegar os dados atualizados da assinatura
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const planType = mapStripePriceToPlanType(subscription.items.data[0].price.id);

  // 3. Atualizar o Paywall do Usuário (profiles.plan_type)
  const newPlanTypeForProfile = subscription.status === 'active' || subscription.status === 'trialing' 
    ? planType 
    : 'free'; // Se foi cancelado ou não pago, volta pra free

  await supabaseAdmin
    .from('profiles')
    .update({ plan_type: newPlanTypeForProfile })
    .eq('id', uuid);

  // 4. Salvar na Tabela de Histórico
  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    plan_type: planType,
    current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
  };

  await supabaseAdmin.from('subscriptions').upsert(subscriptionData);
}

// Helper to map Stripe Product/Price IDs to our DB schema plan_types
function mapStripePriceToPlanType(priceId: string): string {
  const priceMapping: Record<string, string> = {
    'price_1TIxh3JQ3Z4y9v6CIM30iIGz': 'elite_mensal',
    'price_1TIxhZJQ3Z4y9v6C0FgwuTq1': 'elite_anual',
  };
  return priceMapping[priceId] || 'free';
}
