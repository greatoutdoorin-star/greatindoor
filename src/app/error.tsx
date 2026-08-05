"use client";

import Link from "next/link";
import { useEffect } from "react";
import { WHATSAPP_DISPLAY } from "@/lib/site";
import { generalEnquiryLink } from "@/lib/whatsapp";

/**
 * Route-level error boundary.
 *
 * Must be a Client Component, so it cannot fetch the nav collections the way
 * not-found.tsx does — it renders standalone chrome instead, and still offers
 * the WhatsApp action so a failed render does not cost the lead.
 *
 * `unstable_retry` (Next 16.2+) re-fetches and re-renders the segment; `reset`
 * only clears the boundary without re-fetching, which would show the same
 * failure again for a server-side error.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6 py-24">
      <div className="w-full max-w-xl">
        <Link href="/" aria-label="Great Indoors" className="block leading-[0.95]">
          <span className="block font-display text-[26px] font-bold text-accent">
            great
          </span>
          <span className="block font-display text-[26px] font-bold text-ink">
            indoors
          </span>
        </Link>

        <h1 className="mt-12" style={{ fontSize: "var(--text-h1)" }}>
          Something went wrong.
        </h1>

        <p
          className="mt-5 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body)" }}
        >
          This page failed to load. Trying again usually fixes it — if it
          doesn&apos;t, message us on {WHATSAPP_DISPLAY} and we&apos;ll help you
          straight away.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="bg-ink px-8 py-4 font-display font-semibold text-white transition-colors hover:bg-accent"
          >
            Try again
          </button>
          <a
            href={generalEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-hairline px-8 py-4 font-display font-semibold transition-colors hover:border-ink"
          >
            Message us on WhatsApp
          </a>
        </div>

        {/* Surfaced so a customer can quote it when they report the problem. */}
        {error.digest && (
          <p
            className="mt-10 font-body text-ink-subtle"
            style={{ fontSize: "11px" }}
          >
            Reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
