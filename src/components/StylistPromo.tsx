import { SERVICES } from "@/lib/seed-data";
import { CONTACT, WHATSAPP_DISPLAY } from "@/lib/site";
import { generalEnquiryLink } from "@/lib/whatsapp";

/**
 * "Get a confirmation call with our interior stylist" band, plus the four
 * service promises beneath it.
 */
export default function StylistPromo() {
  return (
    <section className="px-6 py-16 lg:px-14 lg:py-20">
      <div className="bg-panel px-6 py-12 text-center lg:px-14">
        <h2
          className="mx-auto max-w-2xl uppercase leading-snug"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Get a confirmation call with our{" "}
          <span className="text-accent">interior stylist</span>
        </h2>
        <p
          className="mt-3 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body)" }}
        >
          within 24 hours of every order..
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a
            href={generalEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-semibold text-ink transition-colors hover:text-accent"
            style={{ fontSize: "var(--text-body-hd)" }}
          >
            📞 {WHATSAPP_DISPLAY}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-body text-ink-muted underline underline-offset-4 transition-colors hover:text-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            ✉️ {CONTACT.email}
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <div key={s.title} className="bg-panel px-5 py-6">
            <span aria-hidden="true" className="text-2xl">
              {s.icon}
            </span>
            <h3 className="mt-3" style={{ fontSize: "var(--text-body-hd)" }}>
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
  );
}
