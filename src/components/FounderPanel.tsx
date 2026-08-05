import Image from "next/image";
import { FOUNDER, VALUES } from "@/lib/seed-data";

/**
 * Founder story plus the three brand values, on the dark field.
 *
 * `--color-dark` and `--color-ink` are the same #282828, so this panel and the
 * footer below it merged into one slab. The accent rule at the bottom is the
 * boundary between them — cheaper than shifting either background off the
 * brand palette.
 */
export default function FounderPanel() {
  return (
    <section className="border-b-4 border-accent bg-dark px-6 py-16 text-white lg:px-14 lg:py-20">
      {/*
        Two columns from lg: portrait left, story right. Below that the portrait
        stacks above the copy — a 2:3 portrait beside text is unreadable on a
        phone.
      */}
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-14">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-dark-soft">
          <Image
            src={FOUNDER.image}
            alt={`${FOUNDER.name}, founder of Great Indoors, in the workshop`}
            fill
            sizes="(max-width: 1023px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div>
          <p
            className="font-body font-medium uppercase tracking-[0.22em] text-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            {FOUNDER.eyebrow}
          </p>
          <h2 className="mt-3 text-white" style={{ fontSize: "var(--text-h2)" }}>
            {FOUNDER.name}
          </h2>

          {FOUNDER.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mt-5 font-body leading-relaxed text-white/70"
              style={{ fontSize: "var(--text-body)" }}
            >
              {p}
            </p>
          ))}

          <p
            className="mt-7 inline-block border border-white/20 px-5 py-2 font-body text-white/80"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            {FOUNDER.timeline}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="text-center">
            {/* Accent rule rather than an emoji — see StylistPromo. */}
            <span
              aria-hidden="true"
              className="mx-auto block h-0.5 w-8 bg-accent"
            />
            <h3
              className="mt-4 text-white"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {v.title}
            </h3>
            <p
              className="mt-2 font-body text-white/60"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {v.blurb}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
