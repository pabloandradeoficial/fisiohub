'use server';

import { createClient } from '@/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a service client for admin operations
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return profile?.role === 'admin';
}

export async function getAdminDashboardData() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  // Fetch all users with their emails
  const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
  
  // Fetch profiles
  const { data: profiles, error: profilesError } = await supabaseAdmin.from('profiles').select('*');
  
  // Fetch subscriptions
  const { data: subscriptions, error: subsError } = await supabaseAdmin.from('subscriptions').select('*');

  // Match users with their profile and subscription
  const users = usersData?.users.map(u => {
    const profile = profiles?.find(p => p.id === u.id);
    const subscription = subscriptions?.find(s => s.user_id === u.id && s.status === 'active');
    
    return {
      id: u.id,
      email: u.email,
      name: profile?.full_name || 'Desconhecido',
      plan: profile?.plan_type || 'free',
      status: subscription ? 'active' : 'inactive',
      expires_at: subscription?.current_period_end || null
    };
  }) || [];

  const totalRegistered = users.length;
  const totalPaying = users.filter(u => u.status === 'active').length;
  
  // Dependents might mean anyone associated with a turma, or whatever plan
  const totalTurma = users.filter(u => u.plan === 'turma').length;

  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiringSoon = users.filter(u => u.expires_at && new Date(u.expires_at) < nextWeek && u.status === 'active').length;

  // Let's get suggestions
  const { data: suggestions } = await supabaseAdmin.from('user_suggestions').select('id, suggestion, created_at, user_id').order('created_at', { ascending: false });

  // Get Page Views if table exists, otherwise just return 0
  let totalViews = 0;
  const { data: pageViews } = await supabaseAdmin.from('page_views').select('views').single();
  if (pageViews) {
    totalViews = pageViews.views;
  }

  return {
    users,
    metrics: {
      totalRegistered,
      totalPaying,
      totalTurma,
      expiringSoon,
      totalViews,
    },
    suggestions: suggestions?.map(s => {
      const user = users.find(u => u.id === s.user_id);
      return {
        id: s.id,
        suggestion: s.suggestion,
        created_at: s.created_at,
        user_name: user?.name,
        user_email: user?.email
      };
    }) || []
  };
}

export async function sendDirectMessage(userId: string, message: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  const { error } = await supabaseAdmin.from('user_messages').insert({
    user_id: userId,
    message: message
  });

  if (error) throw new Error(error.message);
  return { success: true };
}
