"use client";

import { useState } from "react";
import Image from "next/image";
import { MATERIALS } from "@/lib/seed-data";

/**
 * Materials band.
 *
 * Two bands are visible at a time and the chevron steps down the list, so the
 * section keeps a fixed height however many materials exist. The partial band
 * beneath the first is what signals there is more to step through — without it
 * the control looks decorative.
 *
 * Photography is the content here, so the labels stay small and the images run
 * full-bleed to the viewport edge.
 */
export default function MaterialsBand() {
  const [index, setIndex] = useState(0);

  // Wraps rather than stopping: with five short items a disabled arrow at
  // either end reads as broken more often than it reads as a boundary.
  const next = () => setIndex((i) => (i + 1) % MATERIALS.length);
  const previous = () =>
    setIndex((i) => (i - 1 + MATERIALS.length) % MATERIALS.length);

  const visible = [
    MATERIALS[index],
    MATERIALS[(index + 1) % MATERIALS.length],
  ];

  return (
    <section className="bg-canvas py-16 lg:py-20">
      <div className="px-6 text-center lg:px-14">
        <h2
          className="uppercase leading-snug"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Made from <span className="text-accent">what lasts</span>
        </h2>
        <p
          className="mx-auto mt-3 max-w-xl font-body text-ink-muted"
          style={{ fontSize: "var(--text-body)" }}
        >
          Every piece is quoted on the material it is built from — choose the
          finish, we source and install it.
        </p>
      </div>

      <div className="relative mt-10">
        {visible.map((material, position) => (
          <div
            key={`${material.label}-${position}`}
            className="relative h-[220px] w-full overflow-hidden sm:h-[280px] lg:h-[340px]"
          >
            <Image
              src={material.image}
              alt={`${material.label} — ${material.blurb}`}
              fill
              sizes="100vw"
              className="object-cover"
              // The first band is above the fold on short viewports.
              priority={position === 0 && index === 0}
            />

            {/* Chip sits in the left third, which the artwork keeps clear. */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-6 lg:pl-14">
              <div className="bg-canvas px-6 py-4 lg:px-8 lg:py-5">
                <p
                  className="font-display font-semibold uppercase tracking-[0.14em] text-ink"
                  style={{ fontSize: "var(--text-body-hd)" }}
                >
                  {material.label}
                </p>
                <p
                  className="mt-1 max-w-[38ch] font-body text-ink-muted"
                  style={{ fontSize: "var(--text-body-sm)" }}
                >
                  {material.blurb}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Stepper, straddling the seam between the two bands as in the
            reference. Two buttons rather than one so it is reachable by
            keyboard and states its direction to a screen reader.

            Horizontally centred rather than pinned to either edge: the label
            chip owns the left, and the right is where the WhatsApp and enquiry
            FABs sit — pinned right, the control disappeared underneath them. */}
        <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-full bg-canvas shadow-lg">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous material"
            className="px-4 pb-1.5 pt-3 text-ink-muted transition-colors hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next material"
            className="px-4 pb-3 pt-1.5 text-ink-muted transition-colors hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Position, so stepping through has an end in sight. */}
      <p
        className="mt-5 text-center font-body uppercase tracking-[0.14em] text-ink-subtle"
        style={{ fontSize: "11px" }}
        aria-live="polite"
      >
        {MATERIALS[index].label} — {index + 1} of {MATERIALS.length}
      </p>
    </section>
  );
}
