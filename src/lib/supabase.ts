import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please connect to Supabase using the "Connect to Supabase" button.'
  );
  // Provide default values for development
  const defaultUrl = 'https://qhxkrnyenfmqorxzbmej.supabase.co';
  const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeGtybnllbmZtcW9yeHpibWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODI2NjgsImV4cCI6MjA1Nzk1ODY2OH0.nInnzlE3pJCCEJqpVXswlEWp4iGi_DAfa4tHuZ44dOg';

  console.warn('Using default development credentials');
  supabaseUrl = defaultUrl;
  supabaseAnonKey = defaultAnonKey;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);