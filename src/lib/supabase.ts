import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please connect to Supabase using the "Connect to Supabase" button.'
  );
  // Provide default values for development
  const defaultUrl = 'http://localhost:54321';
  const defaultAnonKey =    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHQiOiIxMjM0NTY3ODkwIn0.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs';

  console.warn('Using default development credentials');
  supabaseUrl = defaultUrl;
  supabaseAnonKey = defaultAnonKey;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);