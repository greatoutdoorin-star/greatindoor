"use client";

import { useCallback, useSyncExternalStore } from "react";

type Props = { text: string };

const STORAGE_KEY = "gi-announcement-dismissed";

/** Notifies subscribed bars when this tab dismisses the announcement. */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function isDismissed() {
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

/** On the server nothing is dismissed yet — the bar resolves after hydration. */
function isDismissedOnServer() {
  return true;
}

function dismiss() {
  sessionStorage.setItem(STORAGE_KEY, "1");
  for (const listener of listeners) listener();
}

/**
 * Orange promo band pinned above the page.
 *
 * Dismissal is remembered in sessionStorage rather than localStorage — the bar
 * returns on the visitor's next session, so a promo is not silenced forever
 * after one click.
 *
 * The dismissed flag is browser-only state, so it is read through
 * `useSyncExternalStore` with a server snapshot of "dismissed". That keeps the
 * server and first client render identical (no hydration mismatch) without
 * setting state from an effect, which causes a second render pass on every
 * mount and is what React's set-state-in-effect rule flags.
 */
export default function AnnouncementBar({ text }: Props) {
  const dismissed = useSyncExternalStore(
    subscribe,
    isDismissed,
    isDismissedOnServer,
  );

  const onDismiss = useCallback(() => dismiss(), []);

  if (!text || dismissed) return null;

  return (
    // Fixed above the mobile header (which is itself fixed at top-0), so the
    // two never overlap. The shell offsets its content to match.
    <div className="fixed inset-x-0 top-0 z-50 bg-accent px-10 py-2 text-center">
      <p
        className="font-body text-white"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white transition-opacity hover:opacity-70"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
    </div>
  );
}
