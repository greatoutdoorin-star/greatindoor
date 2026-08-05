import Image from "next/image";
import { CLIENTELE } from "@/lib/seed-data";

/**
 * Client roster, as an infinite logo marquee.
 *
 * The list is rendered twice so the track loops seamlessly — the keyframes
 * translate by -50%, which lands exactly on the start of the second copy. The
 * animation lives in globals.css, pauses on hover, and is disabled under
 * prefers-reduced-motion.
 *
 * Logos are supplied as monochrome marks on white, so they need no filter; the
 * band sits on the tinted surface so the plates read as a set.
 */
export default function Clientele() {
  // CLIENTELE.logos is `as const`, so its length is a literal — an emptiness
  // guard here is dead code and TypeScript rejects the comparison.
  const logos = CLIENTELE.logos;

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

      {/*
        The mask fades the track into the background at both ends, so logos
        enter and leave instead of being chopped off at a hard edge.
      */}
      <div
        className="logo-marquee mt-12 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="logo-marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              // The second copy exists only to make the loop seamless; it is
              // the same content, so it is hidden from assistive tech.
              aria-hidden={copy === 1}
            >
              {logos.map((logo) => (
                <div
                  key={`${copy}-${logo.src}`}
                  className="mx-3 flex h-24 w-44 shrink-0 items-center justify-center bg-panel px-6"
                >
                  <Image
                    src={logo.src}
                    alt={copy === 0 ? logo.name : ""}
                    width={140}
                    height={64}
                    // contain: the marks vary in aspect, and cropping a logo is
                    // worse than leaving space around it.
                    className="h-auto max-h-14 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
