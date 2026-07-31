import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/catalog";
import { SISTER_BRAND } from "@/lib/site";

/**
 * "One Stop Shop for Your Abode" — every category as an image tile.
 *
 * The final tile is the sister-brand link rather than a category, matching the
 * live site's `↗ GREATOUTDOOR.IN` card.
 */
export default function CategoryGrid({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <section className="px-6 py-16 lg:px-14 lg:py-20">
      <h2 style={{ fontSize: "var(--text-h2)" }}>One Stop Shop for Your Abode</h2>
      <p
        className="mt-2 font-body text-ink-muted"
        style={{ fontSize: "var(--text-body)" }}
      >
        {collections.length}+ product categories — furniture, flooring, decor &
        more
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group block overflow-hidden bg-panel transition-shadow hover:shadow-lg"
          >
            {/* No category photography yet — the live site serves one shared
                placeholder for all 15, so the icon on a tinted panel is both
                honest and better looking than a repeated leather chair. */}
            <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-surface-deep">
              {c.image ? (
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 18vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="text-4xl transition-transform duration-500 group-hover:scale-110"
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
                <span aria-hidden="true" className="mr-1">
                  {c.icon}
                </span>
                {c.name}
              </p>
            </div>
          </Link>
        ))}

        {/* Sister-brand tile, as on the live grid. */}
        <a
          href={SISTER_BRAND.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center bg-dark px-4 py-8 text-center transition-colors hover:bg-accent"
        >
          <span
            className="font-body font-semibold uppercase tracking-[0.12em] text-white"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            ↗ greatoutdoor.in
          </span>
          <span
            className="mt-2 font-body text-white/70"
            style={{ fontSize: "11px" }}
          >
            Outdoor furniture
          </span>
        </a>
      </div>
    </section>
  );
}
