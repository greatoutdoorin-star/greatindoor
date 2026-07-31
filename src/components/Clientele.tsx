import { CLIENTELE } from "@/lib/seed-data";

/**
 * Client roster.
 *
 * Rendered as name plates rather than logos — we do not have permission-cleared
 * logo files, and a wordmark set reads cleanly against the warm background. Swap
 * in images here once the brand assets are collected.
 */
export default function Clientele() {
  return (
    <section className="bg-surface px-6 py-16 lg:px-14 lg:py-20">
      <div className="text-center">
        <h2 style={{ fontSize: "var(--text-h2)" }}>Our Clientele</h2>
        <p
          className="mt-3 font-body uppercase tracking-[0.14em] text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {CLIENTELE.tagline}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {CLIENTELE.hospitality.map((name) => (
          <div
            key={name}
            className="flex min-h-[86px] items-center justify-center bg-panel px-4 py-6 text-center"
          >
            <span
              className="font-display font-bold uppercase tracking-[0.1em] text-ink"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
