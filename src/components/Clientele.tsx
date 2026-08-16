import ClientLogoMarquee from "./ClientLogoMarquee";
import { CLIENTELE } from "@/lib/seed-data";

/**
 * Client roster on the home page.
 *
 * The marquee itself lives in ClientLogoMarquee so the B2B page can run the
 * same one — those are the leads the roster is meant to convince.
 */
export default function Clientele() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="px-6 text-center lg:px-14">
        <h2 style={{ fontSize: "var(--text-h2)" }}>Our Clientele</h2>
        <p
          className="mt-3 font-body uppercase tracking-[0.14em] text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {CLIENTELE.tagline}
        </p>
      </div>

      <div className="mt-12">
        <ClientLogoMarquee />
      </div>
    </section>
  );
}
