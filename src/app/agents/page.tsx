import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AgentsClient from './AgentsClient';

export default async function AgentsServerPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Get user profile to check plan_type
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan_type')
    .eq('id', user.id)
    .single();

  const isElite = profile?.plan_type === 'elite_mensal' || profile?.plan_type === 'elite_anual';

  // Calculate Trial logic based on user.created_at
  const createdAtDate = new Date(user.created_at);
  const trialExpiresAt = new Date(createdAtDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const now = new Date();
  const isTrialActive = now < trialExpiresAt;
  
  let trialDaysLeft = 0;
  if (isTrialActive) {
     const msLeft = trialExpiresAt.getTime() - now.getTime();
     trialDaysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
  }

  // Se não for Elite e o trial já expirou, block total!
  if (!isElite && !isTrialActive) {
     redirect('/dashboard');
  }

  return (
    <AgentsClient 
       isElite={isElite} 
       isTrialActive={isTrialActive} 
       trialDaysLeft={trialDaysLeft} 
       userEmail={user.email} 
    />
  );
}
