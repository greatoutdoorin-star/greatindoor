import { FOUNDER, VALUES } from "@/lib/seed-data";

/** Founder story plus the three brand values, on the dark field. */
export default function FounderPanel() {
  return (
    <section className="bg-dark px-6 py-16 text-white lg:px-14 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
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

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="text-center">
            <span aria-hidden="true" className="text-3xl">
              {v.icon}
            </span>
            <h3
              className="mt-3 text-white"
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
