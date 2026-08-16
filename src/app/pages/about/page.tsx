import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { getVisibleCollections } from "@/lib/catalog";
import { FOUNDER, SERVICES, VALUES } from "@/lib/seed-data";
import { SITE, STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Great Indoors — from a wallpaper trader in old Jaipur to a 20+ category interiors house. Quality, comfort and class since 1993.",
};

export default async function AboutPage() {
  const collections = await getVisibleCollections();

  return (
    <SiteShell collections={collections}>
      <section className="px-6 pb-10 pt-16 lg:px-14 lg:pt-20">
        <p
          className="font-body font-medium uppercase tracking-[0.22em] text-accent"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {SITE.established}
        </p>
        <h1 className="mt-3" style={{ fontSize: "var(--text-h1)" }}>
          About {SITE.name}
        </h1>
        <p
          className="mt-5 max-w-2xl font-body leading-relaxed text-ink-muted"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          One stop shop for your abode — furniture, flooring, window treatments,
          cladding and outdoor structures, supplied and installed by a single
          team.
        </p>
      </section>

      <section className="grid grid-cols-3 bg-dark">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="border-r border-white/10 px-3 py-8 text-center last:border-r-0"
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

      <section className="px-6 py-16 lg:px-14 lg:py-20">
        <p
          className="font-body font-medium uppercase tracking-[0.22em] text-accent"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {FOUNDER.eyebrow}
        </p>
        <h2 className="mt-3" style={{ fontSize: "var(--text-h2)" }}>
          {FOUNDER.name}
        </h2>
        <div className="prose-gi mt-6 max-w-2xl font-body leading-relaxed">
          {FOUNDER.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <p
          className="mt-6 inline-block border border-hairline px-5 py-2 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {FOUNDER.timeline}
        </p>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-14 lg:py-20">
        <h2 style={{ fontSize: "var(--text-h2)" }}>What we stand for</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title}>
              <span aria-hidden="true" className="block h-0.5 w-8 bg-accent" />
              <h3 className="mt-4" style={{ fontSize: "var(--text-body-lg)" }}>
                {v.title}
              </h3>
              <p
                className="mt-2 font-body text-ink-muted"
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                {v.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 lg:px-14 lg:py-20">
        <h2 style={{ fontSize: "var(--text-h2)" }}>How we work</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-panel px-5 py-6">
              <span aria-hidden="true" className="block h-0.5 w-8 bg-accent" />
              <h3 className="mt-4" style={{ fontSize: "var(--text-body-hd)" }}>
                {s.title}
              </h3>
              <p
                className="mt-2 font-body text-ink-muted"
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                {s.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
