"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Sign-in form.
 *
 * Signs in from the browser rather than through a Server Action: the Supabase
 * browser client writes the auth cookies itself as part of the response, which
 * is the flow @supabase/ssr is built around.
 *
 * There is no sign-up and no password reset — admin users are created in the
 * Supabase dashboard, so there is no public route to attack.
 */
export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Deliberately not distinguishing "no such user" from "wrong
        // password" — that difference tells an attacker which emails exist.
        setError("That email and password combination didn't work.");
        setPending(false);
        return;
      }

      // The proxy validates the new cookie and lets the redirect through.
      // `next` is a path from our own redirect; reject anything else so a
      // crafted ?next=https://evil.example cannot turn login into an open
      // redirect.
      const next = params.get("next");
      const target = next && next.startsWith("/admin") ? next : "/admin";

      // refresh() so the Server Components re-read the now-authenticated
      // session; push alone would render the cached signed-out tree.
      router.replace(target);
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection.");
      setPending(false);
    }
  }

  const field =
    "w-full border border-hairline bg-canvas px-4 py-3 font-body text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="border border-hairline bg-canvas p-6">
      <div className="grid gap-4">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          autoComplete="username"
          className={field}
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          className={field}
        />
      </div>

      {error && (
        <p
          className="mt-4 font-body text-red-600"
          role="alert"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full bg-accent px-8 py-3.5 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
