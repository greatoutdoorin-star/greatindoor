"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

const BEFORE = "/catalog/before-after/before.webp";
const AFTER = "/catalog/before-after/after.webp";

/**
 * Before/after wipe.
 *
 * The "after" image is clipped to the handle position and sits over the
 * "before", so dragging reveals the empty room on the left and the furnished
 * one on the right.
 *
 * Both frames are the same room from the same camera at the same size — that
 * is what makes the wipe read as one space changing rather than as a cut
 * between two photos. If the pair is ever swapped, keep them identical in
 * dimensions and framing.
 *
 * The handle is a range input rather than a div with pointer handlers: it is
 * keyboard-operable and screen-reader-labelled for free, and browsers already
 * handle touch-drag on it correctly. The visible handle is drawn separately
 * and the input laid over it, transparent.
 */
export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);

  /* Clicking anywhere on the image jumps the handle there, which is quicker
     than dragging across the full width. */
  const jumpTo = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const { left, width } = frame.getBoundingClientRect();
    const next = ((clientX - left) / width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="px-6 text-center lg:px-14">
        <h2
          className="uppercase leading-snug"
          style={{ fontSize: "var(--text-h2)" }}
        >
          See the <span className="text-accent">difference</span>
        </h2>
        <p
          className="mx-auto mt-3 max-w-xl font-body text-ink-muted"
          style={{ fontSize: "var(--text-body)" }}
        >
          Drag the handle to see an empty space become a finished one — supplied
          and installed by us.
        </p>
      </div>

      <div className="mt-10 px-6 lg:px-14">
        <div
          ref={frameRef}
          onClick={(e) => jumpTo(e.clientX)}
          className="relative mx-auto aspect-[16/10] w-full max-w-5xl select-none overflow-hidden"
        >
          {/* Base layer: the empty room. */}
          <Image
            src={BEFORE}
            alt="The space before — bare floor and empty walls"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
            draggable={false}
          />

          {/* Furnished room, clipped to the handle. inset-0 with a clip-path
              rather than a width, so the image never rescales as it reveals —
              a width-based reveal squashes the furniture as you drag. */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={AFTER}
              alt="The same space after — furnished, carpeted and blinded"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
              draggable={false}
            />
          </div>

          {/* Corner labels. Each fades out as the handle passes it, so they
              never sit over the wrong half. */}
          <span
            className="pointer-events-none absolute left-4 top-4 bg-canvas px-3 py-1.5 font-display font-semibold uppercase tracking-[0.14em] text-ink transition-opacity duration-200 lg:left-6 lg:top-6"
            style={{ fontSize: "11px", opacity: position > 22 ? 0 : 1 }}
          >
            Before
          </span>
          <span
            className="pointer-events-none absolute right-4 top-4 bg-accent px-3 py-1.5 font-display font-semibold uppercase tracking-[0.14em] text-white transition-opacity duration-200 lg:right-6 lg:top-6"
            style={{ fontSize: "11px", opacity: position < 78 ? 0 : 1 }}
          >
            After
          </span>

          {/* The divider and grip. pointer-events-none so the range input
              underneath keeps receiving the drag. */}
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-canvas"
            style={{ left: `${position}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas shadow-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5 text-ink"
              >
                <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
              </svg>
            </span>
          </div>

          {/* The actual control. Transparent, full-bleed, above everything. */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Reveal more of the before or after photo"
            aria-valuetext={`${Math.round(position)}% furnished`}
            className="ba-range absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent"
          />
        </div>
      </div>
    </section>
  );
}
