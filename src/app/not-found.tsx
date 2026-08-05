import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getCollections } from "@/lib/catalog";
import { generalEnquiryLink } from "@/lib/whatsapp";

/**
 * 404 page.
 *
 * Rendered inside the full site shell rather than as a bare message: a visitor
 * who hits a dead URL is still a lead, so they get the nav, the catalogue link
 * and the WhatsApp action instead of a dead end.
 */
export default async function NotFound() {
  const collections = await getCollections();

  return (
    <SiteShell
      collections={collections.map((c) => ({ name: c.name, slug: c.slug }))}
    >
      <section className="px-6 py-24 lg:px-14 lg:py-32">
        <p
          className="font-body uppercase tracking-[0.14em] text-accent"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Error 404
        </p>

        <h1 className="mt-3 max-w-2xl" style={{ fontSize: "var(--text-h1)" }}>
          We couldn&apos;t find that page.
        </h1>

        <p
          className="mt-5 max-w-xl font-body text-ink-muted"
          style={{ fontSize: "var(--text-body)" }}
        >
          The link may be out of date, or the page may have moved. Browse the
          full catalogue below, or send us a message and we&apos;ll point you to
          what you were looking for.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/collections/all"
            className="bg-ink px-8 py-4 font-display font-semibold text-white transition-colors hover:bg-accent"
          >
            Browse all products
          </Link>
          <a
            href={generalEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-hairline px-8 py-4 font-display font-semibold transition-colors hover:border-ink"
          >
            Ask on WhatsApp
          </a>
        </div>

        <div className="mt-16 border-t border-hairline pt-10">
          <p
            className="font-body font-medium uppercase tracking-[0.14em] text-ink-muted"
            style={{ fontSize: "11px" }}
          >
            Popular categories
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {collections.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="font-body underline underline-offset-4 transition-colors hover:text-accent"
                  style={{ fontSize: "var(--text-body-sm)" }}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
