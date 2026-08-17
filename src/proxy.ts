import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Proxy — formerly `middleware.ts`, renamed in Next 16 and located beside
 * `app/` (so `src/proxy.ts`, not the project root).
 *
 * Two jobs, both cheap:
 *
 *  1. Refresh the Supabase auth token and write it back to the response.
 *     Server Components cannot set cookies, so without this the session would
 *     expire mid-session and log the admin out at random.
 *  2. Bounce signed-out visitors from /admin to the login page.
 *
 * This is NOT the security boundary. Next's docs are explicit that proxy is
 * for optimistic checks only, and that Server Actions POST to the route that
 * renders them — so a matcher change can silently drop coverage. Every admin
 * page and action calls requireAdmin() from src/lib/auth.ts independently.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Not configured: let the request through. The admin pages redirect to login
  // on their own, and the public site must keep working without Supabase.
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        // Supabase passes no-store headers alongside auth cookies. Without
        // them a CDN could cache a response carrying one admin's session
        // token and serve it to somebody else.
        for (const [header, headerValue] of Object.entries(headers)) {
          response.headers.set(header, headerValue);
        }
      },
    },
  });

  // getUser() revalidates the token against the auth server and, as a side
  // effect, refreshes it — which is what triggers setAll above.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!user && !isLogin) {
    const target = request.nextUrl.clone();
    target.pathname = "/admin/login";
    // Preserve where they were headed so login can send them back.
    target.searchParams.set("next", pathname);
    return NextResponse.redirect(target);
  }

  if (user && isLogin) {
    const target = request.nextUrl.clone();
    target.pathname = "/admin";
    target.search = "";
    return NextResponse.redirect(target);
  }

  return response;
}

/**
 * Scoped to /admin only.
 *
 * Without a matcher, proxy runs on every request including `_next/static`,
 * `_next/image` and `public/` — and the redirect above would then block the
 * site's own CSS, JS and images. Restricting it to /admin also keeps the auth
 * round trip off every public page view.
 *
 * Matcher values must be static literals; Next analyses them at build time and
 * silently ignores anything computed.
 */
export const config = {
  matcher: ["/admin/:path*"],
};
