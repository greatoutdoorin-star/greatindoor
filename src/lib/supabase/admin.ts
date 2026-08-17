import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client.
 *
 * Bypasses row level security, so it is the only way to write to the
 * catalogue — the schema deliberately grants no anon or authenticated write
 * policy. Reserve it for code that has already established the caller is an
 * admin: call `requireAdmin()` from src/lib/auth.ts first, every time.
 *
 * SUPABASE_SERVICE_ROLE_KEY must never carry the NEXT_PUBLIC_ prefix. Without
 * that prefix Next.js does not inline the value into client bundles, so an
 * accidental import from a Client Component yields `undefined` and throws
 * below rather than shipping the key to the browser.
 */
export function createAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL " +
        "and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Whether admin writes are possible. Mirrors isPersistenceConfigured(). */
export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
