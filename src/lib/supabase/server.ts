import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Request-scoped Supabase client for Server Components, Server Actions and
 * Route Handlers.
 *
 * Reads the signed-in user's session from cookies, so every query runs under
 * that user's RLS policies. A new client per request — never share one across
 * requests, or sessions leak between visitors.
 *
 * `cookies()` is async in Next 16, and cookies cannot be written during Server
 * Component rendering; only Server Actions and Route Handlers may set them.
 * The try/catch in `setAll` is what makes this client safe to use in all three.
 */
export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only. The
          // refreshed token is still written by src/proxy.ts, which runs on
          // every admin request and can set them — so the session survives.
        }
      },
    },
  });
}
