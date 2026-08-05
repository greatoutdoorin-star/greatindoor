"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Collection } from "@/lib/catalog";

const AUTOPLAY_MS = 4000;

/**
 * "One Stop Shop for Your Abode" — every category as an image tile, in an
 * autoplaying carousel.
 *
 * Built on native scroll-snap rather than a transform track: it keeps touch
 * swipe, trackpad scroll and keyboard working for free, and the tile count per
 * view can then be pure CSS. Autoplay just scrolls the container.
 *
 * The final tile is the sister-brand link rather than a category, matching the
 * live site's `↗ GREATOUTDOOR.IN` card.
 */
export default function CategoryGrid({
  collections,
}: {
  collections: Collection[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // scrollWidth/clientWidth gives whole "screens" of tiles, which is what the
    // dots and the arrows step through — not individual tiles.
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    const target = ((i % total) + total) % total; // wrap both directions
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  }, []);

  // Autoplay. Paused on hover/focus so the row does not move out from under
  // someone reading it, and skipped entirely when everything already fits.
  // `page` is a dependency, so the timer restarts on each advance and the
  // current page is read from the closure rather than a ref.
  useEffect(() => {
    if (paused || pages < 2) return;
    const id = setTimeout(() => goTo(page + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [paused, pages, goTo, page]);

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-panel text-ink transition-colors hover:border-accent hover:text-accent";

  return (
    <section
      className="px-6 py-16 lg:px-14 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 style={{ fontSize: "var(--text-h2)" }}>
            One Stop Shop for Your Abode
          </h2>
          <p
            className="mt-2 font-body text-ink-muted"
            style={{ fontSize: "var(--text-body)" }}
          >
            {collections.length} product categories — furniture, flooring, decor
            &amp; more
          </p>
        </div>

        {pages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              aria-label="Previous categories"
              className={arrow}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              aria-label="Next categories"
              className={arrow}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            // Fractional widths minus the gap share, so a whole number of tiles
            // fills the viewport and scroll-snap lands cleanly.
            className="group block w-[45%] shrink-0 snap-start overflow-hidden bg-panel transition-shadow hover:shadow-lg sm:w-[30%] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)]"
          >
            {/* Every category has real photography. The icon fallback is kept
                for a category added before its photo exists — a fallback, not
                the default look. */}
            <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-surface">
              {c.image ? (
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="text-3xl opacity-40 transition-transform duration-500 group-hover:scale-110"
                >
                  {c.icon}
                </span>
              )}
            </div>
            <div className="px-3 py-3">
              <p
                className="font-body font-medium text-ink transition-colors group-hover:text-accent"
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                {c.name}
              </p>
            </div>
          </Link>
        ))}

        {/* No sister-brand tile here: greatoutdoor.in is already linked from
            the sidebar, the mobile header and the footer, and a dark panel in
            a run of product photography broke the rhythm of the carousel. */}
      </div>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-8 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
