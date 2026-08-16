import Image from "next/image";
import { CLIENTELE } from "@/lib/seed-data";

/**
 * Infinite client-logo marquee.
 *
 * The list is rendered twice so the track loops seamlessly — the keyframes
 * translate by -50%, which lands exactly on the start of the second copy. The
 * animation lives in globals.css, pauses on hover, and is disabled under
 * prefers-reduced-motion.
 *
 * Logos are monochrome marks on white, so they need no filter. `plateClass`
 * exists because this runs on two different backgrounds: on the tinted home
 * section the plates are white, and on the B2B page's white section they need
 * a hairline instead so they do not dissolve into the page.
 */
export default function ClientLogoMarquee({
  plateClass = "bg-panel",
}: {
  plateClass?: string;
}) {
  const logos = CLIENTELE.logos;

  return (
    <div
      className="logo-marquee overflow-hidden"
      style={{
        // Fades the track into the background at both ends, so logos enter and
        // leave instead of being chopped off at a hard edge.
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
            // The second copy exists only to make the loop seamless; it is the
            // same content, so it is hidden from assistive tech.
            aria-hidden={copy === 1}
          >
            {logos.map((logo) => (
              <div
                key={`${copy}-${logo.src}`}
                className={`mx-3 flex h-24 w-44 shrink-0 items-center justify-center px-6 ${plateClass}`}
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
  );
}
