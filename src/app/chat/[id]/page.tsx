import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ChatClient from './ChatClient';

const freeAgents = [
  'anatomia', 
  'avaliacao-avancada', 
  'pesquisa-tcc', 
  'pesquisa-estatistica', 
  'pablo-mentor', 
  'direito-civil-penal', 
  'direito-paciente', 
  'contabil-tributario', 
  'contabil-custos'
];

export default async function ChatServerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Verificar Paywall e Freemium Trial
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan_type')
    .eq('id', user.id)
    .single();

  const isElite = profile?.plan_type === 'elite_mensal' || profile?.plan_type === 'elite_anual';
  
  const createdAtDate = new Date(user.created_at);
  const trialExpiresAt = new Date(createdAtDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const isTrialActive = new Date() < trialExpiresAt;

  const isFreeAgent = freeAgents.includes(params.id);

  if (!isElite) {
    if (!isTrialActive) {
      // Trial expirou e não é Elite
      redirect('/dashboard');
    } else if (!isFreeAgent) {
      // Tá no trial mas tentou acessar agente premium
      redirect('/dashboard');
    }
  }

  return <ChatClient />;
}
