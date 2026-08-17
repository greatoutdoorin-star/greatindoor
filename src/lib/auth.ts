import { cache } from "react";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";

/**
 * Admin authorisation — the Data Access Layer.
 *
 * This is the real security boundary, not `src/proxy.ts`. Two reasons the
 * proxy cannot be trusted alone:
 *
 *  - Next's own docs are explicit that proxy is for "optimistic checks" and
 *    "should not be used as a full session management or authorization
 *    solution".
 *  - Server Actions are POSTs to the route that uses them, so a matcher change
 *    silently removes proxy coverage from every action on that path. The docs
 *    say to "always verify authentication and authorization inside each Server
 *    Function rather than relying on Proxy alone".
 *
 * So `requireAdmin()` is called at the top of every admin page AND every
 * Server Action — an unauthenticated POST straight to an action ID must fail
 * even though it never passed through the proxy.
 */

/**
 * The signed-in user, or null.
 *
 * `getUser()` rather than `getSession()`: getSession trusts the cookie as-is,
 * while getUser revalidates the token against the Supabase Auth server. For an
 * authorisation check the cookie is exactly the thing we cannot trust.
 *
 * React's `cache()` dedupes this within a single render pass, so a page and
 * the actions it renders don't each pay for the round trip.
 */
export const getAdminUser = cache(async (): Promise<User | null> => {
  // Unconfigured is not an error here: the public site runs without Supabase,
  // and /admin should then redirect to login rather than crash the route.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  } catch {
    return null;
  }
});

/**
 * Require an admin, or redirect to the login page.
 *
 * Use in pages and in Server Actions that a human triggers, where landing on
 * the login form is the right outcome.
 */
export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}

/**
 * Require an admin, or throw.
 *
 * For mutations. A redirect from a mutation would read to the client as a
 * successful navigation; an unauthorised write should fail loudly instead.
 */
export async function requireAdminOrThrow(): Promise<User> {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
