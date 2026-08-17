import LoginForm from "./LoginForm";
import { isSupabaseConfigured } from "@/lib/admin-data";

/**
 * Admin login.
 *
 * force-dynamic because the session must be read per request. Without it Next
 * would prerender this page at build time and every visitor would get the same
 * cached shell — the docs are explicit that a Data Access Layer cannot protect
 * a statically generated route.
 */
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-h2 font-bold tracking-tight">
            <span className="text-accent">great</span> indoors
          </p>
          <p
            className="mt-1 font-body uppercase tracking-[0.18em] text-ink-subtle"
            style={{ fontSize: "11px" }}
          >
            Admin
          </p>
        </div>

        {configured ? (
          <LoginForm />
        ) : (
          <div className="border border-hairline bg-canvas p-6">
            <p
              className="font-body text-ink-muted"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Supabase is not configured. Set{" "}
              <code className="text-ink">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="text-ink">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
              then apply <code className="text-ink">supabase/schema.sql</code>{" "}
              and create an admin user in the Supabase dashboard.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
