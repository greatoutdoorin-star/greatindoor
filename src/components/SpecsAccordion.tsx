"use client";

import { useState } from "react";
import type { Spec } from "@/lib/catalog";

type Props = {
  /** Free-form selling points, rendered as bullets. */
  specs: string[];
  /** Tabulated label/value specifications from the supplier catalogue. */
  details?: Spec[];
  /** Finish/colour options. */
  colours?: string[];
  variantLabel?: string | null;
  variants?: string[];
};

/**
 * "PRODUCT SPECIFICATIONS" disclosure, matching the reference product page.
 *
 * Catalogue specs (material, dimensions, packing) render as a label/value
 * table — a spec sheet reads far better aligned than as prose bullets — with
 * the free-form selling points kept underneath as a list.
 *
 * Variant and colour options are listed as text rather than as a selector:
 * this site has no cart, so the choice is made in the WhatsApp conversation.
 */
export default function SpecsAccordion({
  specs,
  details = [],
  colours = [],
  variantLabel,
  variants,
}: Props) {
  // Open by default: on a made-to-order catalogue the dimensions are the whole
  // decision, so hiding them behind a click costs more than the vertical space.
  const [open, setOpen] = useState(true);
  const hasVariants = Boolean(variants && variants.length > 0);

  if (
    specs.length === 0 &&
    details.length === 0 &&
    colours.length === 0 &&
    !hasVariants
  ) {
    return null;
  }

  return (
    <div className="mt-10 border-t border-hairline">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-accent"
      >
        <span
          className="font-display font-semibold tracking-[0.06em]"
          style={{ fontSize: "var(--text-body-hd)" }}
        >
          PRODUCT SPECIFICATIONS
        </span>
        <span className="relative block h-4 w-4 shrink-0">
          <span className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 bg-current" />
          <span
            className={`absolute left-1/2 top-0 block h-4 w-px -translate-x-1/2 bg-current transition-transform ${
              open ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {details.length > 0 && (
            <dl className="mb-6 border-t border-hairline">
              {details.map((d) => (
                <div
                  key={d.label}
                  // Stacks on mobile, two columns from sm — a long value like
                  // the dimension string has no room to sit beside its label
                  // on a 375px screen.
                  className="grid gap-1 border-b border-hairline py-3 sm:grid-cols-[168px_1fr] sm:gap-4"
                >
                  <dt
                    className="font-body font-medium uppercase tracking-[0.1em] text-ink-muted"
                    style={{ fontSize: "11px" }}
                  >
                    {d.label}
                  </dt>
                  <dd
                    className="font-body text-ink"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {specs.length > 0 && (
            <ul className="space-y-2 font-body text-ink-muted">
              {specs.map((s) => (
                <li key={s} className="flex gap-3">
                  <span aria-hidden="true">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}

          {colours.length > 0 && (
            <div className={specs.length > 0 ? "mt-6" : ""}>
              <p className="font-display font-semibold">Available colours</p>
              <p className="mt-2 font-body text-ink-muted">
                {colours.join(" · ")}
              </p>
            </div>
          )}

          {hasVariants && (
            <div className="mt-6">
              <p className="font-display font-semibold">
                {variantLabel || "Options"}
              </p>
              <p className="mt-2 font-body text-ink-muted">
                {variants!.join(" · ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
