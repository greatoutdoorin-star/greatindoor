/**
 * Orange scrolling category ticker beneath the stat band.
 *
 * The list is rendered twice so the track loops seamlessly — the keyframes
 * translate by -50%, which lands exactly on the start of the second copy.
 * Animation lives in globals.css and is disabled under prefers-reduced-motion.
 */
export default function Marquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div className="overflow-hidden bg-accent py-3">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span
                  className="whitespace-nowrap px-5 font-body font-medium uppercase tracking-[0.12em] text-white"
                  style={{ fontSize: "var(--text-body-sm)" }}
                >
                  {item}
                </span>
                <span aria-hidden="true" className="text-white/50">
                  •
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
