"use client";

import { useState, useTransition } from "react";
import type { Lead } from "@/lib/admin-data";
import { setLeadHandled } from "@/app/admin/actions";

/**
 * One enquiry.
 *
 * A card rather than a table row: leads carry a free-text message that no
 * sensible column width accommodates, and the phone number needs to be a
 * tappable link on mobile.
 */
export default function LeadRow({ lead }: { lead: Lead }) {
  const [handled, setHandled] = useState(lead.handled);
  const [pending, startTransition] = useTransition();

  const when = new Date(lead.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // Digits only, so the wa.me link works regardless of how it was typed.
  const wa = lead.phone.replace(/\D/g, "");

  return (
    <li
      className={`border bg-canvas p-4 transition-colors ${
        handled ? "border-hairline opacity-60" : "border-hairline"
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display font-semibold">{lead.name}</span>
        <span
          className="bg-surface px-2 py-0.5 font-body uppercase tracking-[0.1em] text-ink-muted"
          style={{ fontSize: "9px" }}
        >
          {lead.source}
        </span>
        <span
          className="ml-auto font-body text-ink-subtle"
          style={{ fontSize: "11px" }}
        >
          {when}
        </span>
      </div>

      <div
        className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-body text-ink-muted"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        <a href={`tel:${wa}`} className="hover:text-accent">
          {lead.phone}
        </a>
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="hover:text-accent">
            {lead.email}
          </a>
        )}
        {lead.company && <span>{lead.company}</span>}
        {lead.city && <span>{lead.city}</span>}
        {lead.product && (
          <a
            href={`/products/${lead.product}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {lead.product} ↗
          </a>
        )}
      </div>

      {lead.message && (
        <p
          className="mt-3 whitespace-pre-wrap border-l-2 border-hairline pl-3 font-body text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {lead.message}
        </p>
      )}

      <div className="mt-3 flex items-center gap-3">
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-whatsapp px-4 py-1.5 font-display font-semibold text-white transition-colors hover:bg-whatsapp-hover"
          style={{ fontSize: "11px" }}
        >
          Reply on WhatsApp
        </a>

        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const next = !handled;
              // Optimistic: the row is already in view and the write is a
              // single boolean, so waiting for the round trip would just feel
              // sluggish. Reverted below if the action throws.
              setHandled(next);
              try {
                await setLeadHandled(lead.id, next);
              } catch {
                setHandled(!next);
              }
            })
          }
          className="font-body text-ink-muted transition-colors hover:text-ink disabled:opacity-50"
          style={{ fontSize: "11px" }}
        >
          {handled ? "✓ Handled — undo" : "Mark handled"}
        </button>
      </div>
    </li>
  );
}
