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
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await manageSubscriptionStatusChange(
          subscription.id,
          subscription.customer as string,
          event.type === 'customer.subscription.created'
        );
        break;
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.client_reference_id) {
          const supabaseAdmin = getSupabaseAdmin();
          const { error } = await supabaseAdmin
            .from('profiles')
            .update({ stripe_customer_id: session.customer as string })
            .eq('id', session.client_reference_id);
          
          if (error) {
            console.error('Error linking stripe customer to profile:', error);
          }
        }
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
  customerId: string,
  createAction: boolean
) {
  const supabaseAdmin = getSupabaseAdmin();
  const stripe = getStripe();

  // 1. Fetch the user's UUID from the profiles table using the Stripe customer ID
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (noCustomerError || !customerData) {
    throw new Error(`Customer ${customerId} not found in database.`);
  }

  const uuid = customerData.id;

  // 2. Fetch the subscription data from Stripe to ensure we have the latest status
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  });

  const planType = mapStripePriceToPlanType(subscription.items.data[0].price.id);

  // 3. Upsert the subscription record in Supabase
  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    plan_type: planType,
    current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
  };

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert(subscriptionData);

  if (error) {
    throw new Error(`Error upserting subscription for ${uuid}: ${error.message}`);
  }
}

// Helper to map Stripe Product/Price IDs to our DB schema plan_types
function mapStripePriceToPlanType(priceId: string): string {
  const priceMapping: Record<string, string> = {
    'price_1TIxh3JQ3Z4y9v6CIM30iIGz': 'elite_mensal',
    'price_1TIxhZJQ3Z4y9v6C0FgwuTq1': 'elite_anual',
  };
  return priceMapping[priceId] || 'free';
}
