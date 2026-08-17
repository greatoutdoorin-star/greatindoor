"use client";

import { useState } from "react";
import ProductCard, { type Product as CardProduct } from "./ProductCard";

export type SizeGroup = {
  /** Tab label, e.g. "50x50 cm". */
  size: string;
  /** Coverage per panel, shown under the tab once selected. */
  note: string;
  products: CardProduct[];
};

/**
 * A collection grid split into sub-groups the visitor tabs between.
 *
 * Built for the vertical garden range, where the two panel sizes are the
 * first decision a buyer makes — 48 mixed swatches in one grid gives them no
 * way to compare like with like, and the size is not visible in the photo.
 *
 * Client-side rather than one page per size: switching is instant, the
 * comparison is the point, and each panel still has its own indexable
 * product page.
 */
export default function SizeTabbedGrid({ groups }: { groups: SizeGroup[] }) {
  const [active, setActive] = useState(0);
  const current = groups[active];

  return (
    <>
      <div className="px-6 lg:px-14">
        {/* Segmented control. Scrolls rather than wraps, so two long labels
            never stack into a ragged second row on a narrow phone. */}
        <div
          role="tablist"
          aria-label="Panel size"
          className="no-scrollbar flex gap-2 overflow-x-auto border-b border-hairline pb-px"
        >
          {groups.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.size}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={`relative shrink-0 whitespace-nowrap px-5 py-3 font-display font-semibold uppercase tracking-[0.08em] transition-colors ${
                  selected
                    ? "text-accent"
                    : "text-ink-muted hover:text-ink"
                }`}
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                {g.size}
                <span
                  className="ml-2 font-body font-normal normal-case tracking-normal text-ink-subtle"
                  style={{ fontSize: "11px" }}
                >
                  {g.products.length}
                </span>
                {/* Underline sits on the container's border, so the active tab
                    reads as joined to the panel below it. */}
                {selected && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
                )}
              </button>
            );
          })}
        </div>

        <p
          className="mt-4 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {current.note}
        </p>
      </div>

      <section className="grid grid-cols-2 gap-4 px-6 pb-20 pt-6 sm:grid-cols-3 lg:grid-cols-4 lg:px-14">
        {current.products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </section>
    </>
  );
}
