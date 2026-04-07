-- Create user_messages table
CREATE TABLE IF NOT EXISTS public.user_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_messages ENABLE ROW LEVEL SECURITY;

-- users can only read their own messages
CREATE POLICY "Users can view own messages" ON public.user_messages FOR SELECT USING (auth.uid() = user_id);
-- users can update their own messages (e.g., mark as read)
CREATE POLICY "Users can update own messages" ON public.user_messages FOR UPDATE USING (auth.uid() = user_id);
-- admins can do everything
CREATE POLICY "Admins can manage messages" ON public.user_messages USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create user_suggestions table
CREATE TABLE IF NOT EXISTS public.user_suggestions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  suggestion text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_suggestions ENABLE ROW LEVEL SECURITY;

-- users can insert their own suggestions
CREATE POLICY "Users can insert own suggestions" ON public.user_suggestions FOR INSERT WITH CHECK (auth.uid() = user_id);
-- users can view their own suggestions
CREATE POLICY "Users can view own suggestions" ON public.user_suggestions FOR SELECT USING (auth.uid() = user_id);
-- admins can view all suggestions
CREATE POLICY "Admins can view suggestions" ON public.user_suggestions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
