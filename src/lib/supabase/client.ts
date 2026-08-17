import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client, for Client Components.
 *
 * Used only by the admin login form, which needs to sign in from the browser
 * so the auth cookies are set on the response. Everything else reads through
 * the server client.
 *
 * The anon key is public by design — it is safe in the browser because every
 * table has RLS enabled and grants anon nothing but SELECT on the catalogue.
 */
export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createBrowserClient(url, key);
}
