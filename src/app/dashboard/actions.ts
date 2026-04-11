'use server';

import { createClient } from '@/utils/supabase/server';

export async function getUserDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  // Fetch unread messages
  const { data: messages, error } = await supabase
    .from('user_messages')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false });

  if (error) return { success: false, error: error.message };

  return {
    success: true,
    messages: messages || []
  };
}

export async function markMessageAsRead(messageId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from('user_messages')
    .update({ is_read: true })
    .eq('id', messageId)
    .eq('user_id', user.id); // Ensure user owns the message

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function submitSuggestion(suggestion: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from('user_suggestions')
    .insert({
      user_id: user.id,
      suggestion: suggestion
    });

  if (error) return { success: false, error: error.message };
  return { success: true };
}
