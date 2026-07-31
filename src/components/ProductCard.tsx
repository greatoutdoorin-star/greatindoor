import Image from "next/image";
import Link from "next/link";
import { PRICE_PLACEHOLDER, productEnquiryLink } from "@/lib/whatsapp";

export type Product = {
  name: string;
  slug: string;
  /** Empty when no photo has been supplied yet. */
  image?: string;
  /** Small uppercase label above the name, e.g. "OFFICE". */
  badge?: string;
};

/**
 * Product card. Everything is quoted on enquiry, so the price slot reads
 * "Contact for price" and the only action is WhatsApp.
 */
export default function ProductCard({
  product,
  sizes = "(max-width: 640px) 45vw, (max-width: 1023px) 30vw, 22vw",
}: {
  product: Product;
  /** Override where the card sits in a narrower column than a standard row. */
  sizes?: string;
}) {
  const enquiryHref = productEnquiryLink({
    name: product.name,
    slug: product.slug,
  });

  return (
    <article className="group flex h-full flex-col bg-panel">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-surface-deep">
        {/* The link is the image's positioned ancestor, so it needs
            `absolute inset-0` — with a static link `fill` resolves against the
            card wrapper and Next logs an invalid-position warning. */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span
              className="px-4 text-center font-body text-ink-muted"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Photo coming soon
            </span>
          )}
        </Link>

        {/* Mobile: an always-tappable round button — :hover never fires on
            touch, so a hover-only control would make the site's single
            conversion action unreachable on phones. */}
        <a
          href={enquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white shadow-md transition-colors hover:bg-whatsapp-hover lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.945a11.9 11.9 0 0 0-3.45-8.406" />
          </svg>
        </a>

        <a
          href={enquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-accent py-3 text-center font-body font-medium text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 lg:block"
        >
          Enquire on WhatsApp
        </a>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        {product.badge && (
          <p
            className="font-body font-medium uppercase tracking-[0.14em] text-accent"
            style={{ fontSize: "10px" }}
          >
            {product.badge}
          </p>
        )}
        <h3
          className="mt-1 font-display font-bold"
          style={{ fontSize: "var(--text-body-hd)" }}
        >
          <Link href={`/products/${product.slug}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p
          className="mt-1 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {PRICE_PLACEHOLDER}
        </p>
      </div>
    </article>
  );
}
