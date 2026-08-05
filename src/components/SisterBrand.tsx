import { SISTER_BRAND } from "@/lib/site";

/**
 * "Also love the outdoors?" — cross-sell to the sister brand.
 *
 * Great Outdoor is a separate site and codebase; this outbound link is the
 * only connection between them, and it is deliberate — the live site runs the
 * same section.
 */
export default function SisterBrand() {
  return (
    <section className="bg-canvas px-6 py-16 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 style={{ fontSize: "var(--text-h2)" }}>{SISTER_BRAND.heading}</h2>
        <p
          className="mx-auto mt-4 max-w-2xl font-body text-ink-muted"
          style={{ fontSize: "var(--text-body)" }}
        >
          {SISTER_BRAND.blurb}
        </p>
        <a
          href={SISTER_BRAND.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-ink px-8 py-4 font-body font-medium text-white transition-colors hover:bg-accent"
        >
          Visit greatoutdoor.in →
        </a>
      </div>
    </section>
  );
}
