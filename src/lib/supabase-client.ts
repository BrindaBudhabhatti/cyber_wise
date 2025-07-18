import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Add your Supabase URL and anon key to your .env file.
// NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

// Note: service_role key is used for server-side operations where you need to bypass RLS.
// For client-side operations, you would use the anon key.
// Since all our data logic is in Server Actions, we use the service_role key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or service role key is not set in environment variables.');
  }

  return createSupabaseClient(supabaseUrl, supabaseKey);
}
