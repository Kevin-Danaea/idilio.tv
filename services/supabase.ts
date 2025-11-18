import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production app, these would be in .env files.
// Since we are in a generated environment, we will fallback to null
// and handle the "missing client" gracefully by serving mock data.

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

