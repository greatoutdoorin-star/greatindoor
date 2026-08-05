import type { Product } from "./catalog";
import { CONTACT, SITE, WHATSAPP_DISPLAY } from "./site";

/**
 * schema.org JSON-LD builders.
 *
 * This is a lead-generation site for a local business, so the two payloads that
 * matter are LocalBusiness (eligibility for the Jaipur local pack and the
 * knowledge panel) and Product on each product page.
 *
 * Products carry no price — everything is made to order and quoted on enquiry.
 * The `offers` block therefore omits `price` and uses availability rather than
 * inventing a figure, which would be a Merchant policy violation as well as
 * being untrue.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

/** Stable @id so the Product and Organization nodes can reference one entity. */
const ORGANIZATION_ID = `${BASE}/#organization`;

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${BASE}${path}`;
}

/**
 * The business itself. Rendered once, in the root layout, so every page
 * carries it — search engines resolve the entity from any entry point.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    description: SITE.description,
    url: BASE,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    foundingDate: "1993",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "272A Frontier Colony, Adarsh Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302004",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Jaipur",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: WHATSAPP_DISPLAY,
      email: CONTACT.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: ["https://www.instagram.com/greatindoor.in/"],
  };
}

/**
 * A single product. `offers` deliberately omits `price`: the catalogue is
 * quoted on enquiry, and Google treats a fabricated price as a mismatch
 * against the visible page, which reads "Contact for price".
 */
export function productSchema(product: Product) {
  const url = `${BASE}/products/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url,
    image: product.images.map(absoluteUrl),
    category: product.badge,
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    // Catalogue specs, exposed so search engines can read material and
    // dimensions rather than inferring them from the description prose.
    ...(product.details.length > 0 && {
      additionalProperty: product.details.map((d) => ({
        "@type": "PropertyValue",
        name: d.label,
        value: d.value,
      })),
    }),
    ...(product.colours.length > 0 && { color: product.colours.join(", ") }),
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      // Made to order — the figure is agreed over WhatsApp, so the offer
      // advertises a quote rather than a price.
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        valueAddedTaxIncluded: false,
      },
      seller: { "@id": ORGANIZATION_ID },
    },
  };
}

/** Breadcrumb trail for a product page: Home → Collection → Product. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE}${crumb.path}`,
    })),
  };
}

/** Website node, enabling the sitelinks search box if search is added later. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Serialise a JSON-LD payload for `dangerouslySetInnerHTML`.
 *
 * `<` is escaped to its unicode form so a stray closing script tag inside any content field
 * cannot close the tag early and inject markup — the sanitisation step the
 * Next.js JSON-LD guide calls for.
 */
export function jsonLdHtml(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
