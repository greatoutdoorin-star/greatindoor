"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site";

/**
 * Hero slider.
 *
 * The artwork is self-contained — each slide carries its own composition and
 * baked-in wording — so nothing is overlaid on it: no headline, no buttons, no
 * contrast scrim. Adding any of those would fight the image rather than sit on
 * it. The CTAs live further down the page, on the sections that need them.
 *
 * To change the slides, edit SLIDES. Artwork is 16:9; the frame uses that
 * aspect so nothing is ever cropped.
 */
const SLIDES = [
  {
    src: "/catalog/banners/hero-slide-2.png",
    alt: "Executive leather chair and lounge armchair in a styled interior",
  },
  {
    src: "/catalog/banners/hero-slide-1.png",
    alt: "New collection — red, blue and yellow cafe chairs",
  },
  {
    src: "/catalog/banners/hero-slide-3.png",
    alt: "Drop #2 — cane-back chair, woven bar stool and yellow shell chair",
  },
  {
    src: "/catalog/banners/hero-slide-4.png",
    alt: "Drop #3, outdoor living — two-seater garden swing with yellow cushions",
  },
];

const INTERVAL_MS = 6000;

export default function HeroPanel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  // Advance on a timer. `index` is a dependency, so the timer restarts on every
  // change — a manual jump therefore gets a full dwell rather than the
  // remainder of the previous tick, and the current index is read from the
  // closure instead of a ref.
  useEffect(() => {
    if (paused || SLIDES.length < 2) return;
    const id = setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [paused, go, index]);

  /*
    Touch swipe. The slides are absolutely-positioned layers rather than a
    scrollable track, so there is no native swipe to inherit — it is wired by
    hand here.

    Only the horizontal distance is acted on, and only past a threshold: a
    smaller movement is a tap or the start of a vertical page scroll, and
    hijacking those would make the page feel broken on a phone.
  */
  const touch = useRef<{ x: number; y: number } | null>(null);
  const SWIPE_MIN_PX = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Ignore anything more vertical than horizontal — that is a page scroll.
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) <= Math.abs(dy)) return;
    go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <>
      <section
        aria-roledescription="carousel"
        aria-label="Featured collections"
        // Pausing on hover/focus is what makes a timed carousel usable: it
        // stops the slide changing under someone who is reading it.
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        // Taller than 16:9 below sm so the products are not reduced to a thin
        // strip on a phone; the artwork is centred, so cropping the sides costs
        // less than the height would.
        className="relative aspect-[4/3] w-full overflow-hidden bg-surface sm:aspect-[16/9]"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              // Only the first slide is the LCP candidate; the rest would
              // compete with it for bandwidth on load.
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              sizes="(max-width: 1023px) 100vw, calc(100vw - var(--sidebar-w))"
              className="object-cover"
            />
          </div>
        ))}

        {SLIDES.length > 1 && (
          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2.5">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === index ? "bg-ink" : "bg-ink/30 hover:bg-ink/50"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Stat band — the dark counterweight under the artwork. */}
      <section className="grid grid-cols-3 border-t border-white/10 bg-dark">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="border-r border-white/10 px-3 py-8 text-center last:border-r-0 lg:py-10"
          >
            <p
              className="font-display font-black text-accent"
              style={{ fontSize: "var(--text-stat)" }}
            >
              {s.value}
            </p>
            <p
              className="mt-1 font-body uppercase tracking-[0.12em] text-white/60"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
