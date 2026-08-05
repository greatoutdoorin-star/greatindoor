import type { Lead } from "./leads";

/**
 * Post a lead to the intake route from a client component.
 *
 * Resolves rather than throwing on failure: the WhatsApp handoff is the
 * primary conversion path and must happen whether or not the write succeeded.
 * `keepalive` lets the request finish even though the caller immediately
 * navigates away to wa.me.
 */
export async function submitLead(lead: Lead): Promise<void> {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      keepalive: true,
    });
  } catch {
    // Swallowed on purpose — see above.
  }
}
