'use server';

import { createClient } from '@/utils/supabase/server';

export async function getUserDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Fetch unread messages
  const { data: messages } = await supabase
    .from('user_messages')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false });

  return {
    messages: messages || []
  };
}

export async function markMessageAsRead(messageId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from('user_messages')
    .update({ is_read: true })
    .eq('id', messageId)
    .eq('user_id', user.id); // Ensure user owns the message

  if (error) throw new Error(error.message);
  return { success: true };
}

export async function submitSuggestion(suggestion: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from('user_suggestions')
    .insert({
      user_id: user.id,
      suggestion: suggestion
    });

  if (error) throw new Error(error.message);
  return { success: true };
}
