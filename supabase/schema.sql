-- Schema for FisioHub

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name text,
  last_name text,
  student_year integer,
  stripe_customer_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE,
  status text NOT NULL CHECK (status IN ('active', 'past_due', 'canceled', 'trialing')),
  plan_type text NOT NULL CHECK (plan_type IN ('basic', 'pro', 'turma')),
  current_period_end timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create content modules table
CREATE TABLE public.modules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create lessons table
CREATE TABLE public.lessons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id uuid NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('video', 'pdf', 'quiz', 'flashcard')),
  video_url text, -- For external video host (e.g. Mux, Vimeo)
  content_body text, -- For text, PDFs, or quiz JSON
  order_index integer NOT NULL DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_progress table
CREATE TABLE public.user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed boolean DEFAULT false,
  completion_date timestamp with time zone,
  last_quiz_score integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can view and update their own profile.
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Subscriptions: Users can view their own subscriptions.
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Modules & Lessons: Anyone authenticated can view published content.
-- (If you wanted to restrict by subscription, you would join on subscriptions here)
CREATE POLICY "Authenticated users can view published modules" ON public.modules FOR SELECT USING (auth.role() = 'authenticated' AND is_published = true);
CREATE POLICY "Authenticated users can view published lessons" ON public.lessons FOR SELECT USING (auth.role() = 'authenticated' AND is_published = true);

-- User Progress: Users can view, insert, and update their own progress.
CREATE POLICY "Users can manage own progress (SELECT)" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress (INSERT)" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress (UPDATE)" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create a trigger to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name)
  VALUES (new.id, new.raw_user_meta_data->>'first_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
