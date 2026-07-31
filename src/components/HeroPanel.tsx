import Link from "next/link";
import { SITE, STATS } from "@/lib/site";
import { generalEnquiryLink } from "@/lib/whatsapp";

/**
 * Dark hero with the offset accent circle, plus the stat band beneath it.
 *
 * The live site uses a static composition here rather than a carousel — the
 * brand statement is the hero, so there is nothing to rotate through.
 */
export default function HeroPanel() {
  return (
    <>
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-dark px-6 py-20 text-center lg:min-h-[500px] lg:px-14 lg:py-28">
        {/* Offset accent circle, clipped by the section's overflow-hidden. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-accent opacity-85 lg:h-72 lg:w-72"
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p
            className="font-body font-medium uppercase tracking-[0.22em] text-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            {SITE.established}
          </p>

          <h1
            className="mt-5 font-display font-black leading-[1.05] text-white"
            style={{ fontSize: "var(--text-hh)" }}
          >
            Great <span className="text-accent">Indoors</span>
          </h1>

          <p
            className="mt-5 font-body uppercase tracking-[0.16em] text-white/75"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {SITE.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/collections/all"
              className="bg-accent px-8 py-4 font-body font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Explore Products
            </Link>
            <a
              href={generalEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-8 py-4 font-body font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Stat band — same dark field, divided into thirds. */}
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
