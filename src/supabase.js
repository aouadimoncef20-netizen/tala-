import { createClient } from '@supabase/supabase-js';

// 🔑 Replace these with your Supabase project credentials
// Get them from: https://supabase.com → Project → Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// SQL TO RUN IN SUPABASE SQL EDITOR:
// ============================================================
// Paste this in: https://supabase.com → Project → SQL Editor → New Query
//
// CREATE TABLE profiles (
//   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
//   username TEXT,
//   avatar_url TEXT,
//   theme TEXT DEFAULT 'dark',
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE likes (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
//   track_id TEXT NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   UNIQUE(user_id, track_id)
// );
//
// CREATE TABLE playlists (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
//   name TEXT NOT NULL,
//   tracks JSONB DEFAULT '[]'::jsonb,
//   is_collaborative BOOLEAN DEFAULT false,
//   activity_log JSONB DEFAULT '[]'::jsonb,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// -- Auto-create profile on signup
// CREATE OR REPLACE FUNCTION handle_new_user()
// RETURNS TRIGGER AS $$
// BEGIN
//   INSERT INTO public.profiles (id, username, avatar_url)
//   VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.raw_user_meta_data->>'avatar_url');
//   RETURN NEW;
// END;
// $$ LANGUAGE plpgsql SECURITY DEFINER;
//
// CREATE TRIGGER on_auth_user_created
//   AFTER INSERT ON auth.users
//   FOR EACH ROW EXECUTE FUNCTION handle_new_user();
//
// -- Row Level Security (RLS)
// ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
// ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
// ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
//
// CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
// CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
//
// CREATE POLICY "Users can read own likes" ON likes FOR SELECT USING (auth.uid() = user_id);
// CREATE POLICY "Users can insert own likes" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
// CREATE POLICY "Users can delete own likes" ON likes FOR DELETE USING (auth.uid() = user_id);
//
// CREATE POLICY "Users can read own playlists" ON playlists FOR SELECT USING (auth.uid() = user_id);
// CREATE POLICY "Users can insert own playlists" ON playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
// CREATE POLICY "Users can update own playlists" ON playlists FOR UPDATE USING (auth.uid() = user_id);
// CREATE POLICY "Users can delete own playlists" ON playlists FOR DELETE USING (auth.uid() = user_id);
