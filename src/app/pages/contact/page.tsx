import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { getVisibleCollections } from "@/lib/catalog";
import ContactForm from "@/components/ContactForm";
import { CONTACT, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Great Indoors — address, email and phone, or send us a message on WhatsApp.",
};

export default async function ContactPage() {
  const collections = await getVisibleCollections();

  return (
    <SiteShell collections={collections}>
      <section className="px-6 pb-10 pt-16 lg:px-14 lg:pt-20">
        <h1 style={{ fontSize: "var(--text-h1)" }}>Let&rsquo;s Talk</h1>
        <p
          className="mt-3 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body)" }}
        >
          Showroom visits welcome, and we do free site visits for projects.
        </p>
      </section>

      <section className="grid gap-10 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-14">
        <div>
          <span aria-hidden="true" className="text-2xl">
            📍
          </span>
          <h2 className="mt-3" style={{ fontSize: "var(--text-body-lg)" }}>
            Address
          </h2>
          <p className="mt-3 font-body leading-relaxed text-ink-muted">
            {CONTACT.address}
          </p>
        </div>

        <div>
          <span aria-hidden="true" className="text-2xl">
            📞
          </span>
          <h2 className="mt-3" style={{ fontSize: "var(--text-body-lg)" }}>
            Phone
          </h2>
          <p className="mt-3 font-body">
            <a
              href={`tel:+${CONTACT.phone.replace(/[^\d]/g, "")}`}
              className="underline underline-offset-4 hover:text-accent"
            >
              {CONTACT.phone}
            </a>
          </p>
        </div>

        <div>
          <span aria-hidden="true" className="text-2xl">
            ✉️
          </span>
          <h2 className="mt-3" style={{ fontSize: "var(--text-body-lg)" }}>
            Email
          </h2>
          <p className="mt-3 font-body break-words">
            <a
              href={`mailto:${CONTACT.email}`}
              className="underline underline-offset-4 hover:text-accent"
            >
              {CONTACT.email}
            </a>
          </p>
        </div>

        <div>
          <span aria-hidden="true" className="text-2xl">
            🌐
          </span>
          <h2 className="mt-3" style={{ fontSize: "var(--text-body-lg)" }}>
            Website
          </h2>
          <p className="mt-3 font-body text-ink-muted">
            {SITE.url.replace("https://", "www.")}
          </p>
        </div>
      </section>

      <section className="bg-surface px-6 py-16 lg:px-14 lg:py-20">
        <h2 style={{ fontSize: "var(--text-h2)" }}>Do you need help?</h2>
        <ContactForm />
      </section>
    </SiteShell>
  );
}
