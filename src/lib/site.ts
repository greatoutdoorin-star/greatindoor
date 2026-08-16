/**
 * Site-wide configuration.
 *
 * Build-time defaults. Once the database is wired up the WhatsApp number and
 * message templates are read from the `settings` table so they can change
 * without a redeploy — these values act as the fallback.
 */

export const SITE = {
  name: "Great Indoors",
  shortName: "GI",
  tagline: "Quality · Comfort · Class",
  established: "EST. 1993 · JAIPUR, INDIA",
  description:
    "Office and cafe furniture, sofas, blinds, flooring, carpets and outdoor structures — one stop shop for your abode, in Jaipur since 1993.",
  url: "https://greatindoor.in",
} as const;

/** Digits only, country code first — the format wa.me expects. */
export const WHATSAPP_NUMBER = "919829012090";

/** Human-readable form, for display in the sidebar/footer. */
export const WHATSAPP_DISPLAY = "+91 98290 12090";

export const CONTACT = {
  email: "Tarunroyal@yahoo.co.in",
  phone: "+91 98290 12090",
  address: "272A Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004",
} as const;

/**
 * Headline figures in the band beneath the hero.
 *
 * Keep "Product Categories" in step with COLLECTIONS in seed-data.ts — it read
 * "20+" against a catalogue of 15, which the category grid contradicted on the
 * same page.
 */
export const STATS = [
  { value: "33+", label: "Years Experience" },
  { value: "15+", label: "Product Categories" },
  { value: "500+", label: "Projects Delivered" },
] as const;

/**
 * Message templates. `{{token}}` placeholders are substituted at click time.
 * Available tokens: name, price, qty, url
 *
 * No price token: this site quotes over WhatsApp, so products read
 * "Contact for price" and the message must not imply a figure was shown.
 */
export const WHATSAPP_TEMPLATES = {
  product: "Hi, I'd like to enquire about {{name}} ({{qty}} pcs)\n{{url}}",
  b2b: "Hi, I'd like to enquire about bulk / B2B pricing for Great Indoors.",
  general: "Hi, I'd like to know more about Great Indoors products.",
} as const;

/**
 * Sidebar navigation.
 *
 * Flattened to a single list — the sister site runs its rail without group
 * headings, and three headings over twelve items added structure the page did
 * not need.
 *
 * Icons are kept HERE and only here. In the rail they act as scan anchors
 * against repeating text; on the category tiles and product cards they stood in
 * for photography, which now exists, so they are gone from those.
 *
 * "All Products" leads because it is the most common intent. Slugs match
 * collection slugs, and an item renders only if its collection exists.
 */
export const NAV_ITEMS = [
  { label: "All Products", slug: "all", icon: "▦" },
  { label: "Office Furniture", slug: "office-furniture", icon: "🪑" },
  { label: "Cafe Furniture", slug: "cafe-furniture", icon: "☕" },
  { label: "Sofa", slug: "sofa", icon: "🛋️" },
  { label: "Wooden Flooring", slug: "wooden-flooring", icon: "🪵" },
  { label: "Blinds", slug: "blinds", icon: "🪟" },
  { label: "Wall-to-Wall Carpets", slug: "wall-to-wall-carpets", icon: "🧶" },
  { label: "Awnings", slug: "awnings", icon: "🏠" },
  { label: "Umbrellas", slug: "umbrellas", icon: "⛱️" },
  { label: "Artificial Grass", slug: "artificial-grass", icon: "🍃" },
] as const;

/**
 * Categories hidden from the rail and the home grid.
 *
 * Their collection and product pages still resolve — the products exist and
 * are linked from "All Products" — so nothing 404s and no inbound link breaks.
 * This only removes them from browsing surfaces.
 */
export const HIDDEN_COLLECTIONS: readonly string[] = [
  "deck-flooring",
  "planters",
  "wall-cladding",
  "tensile-structures",
  "luxury-tents",
] as const;

/**
 * Sister brand. Great Outdoor is an entirely separate site and codebase — this
 * outbound link is the only connection, and it is deliberate: the live site
 * cross-sells it from the sidebar and a dedicated home section.
 */
export const SISTER_BRAND = {
  name: "Great Outdoor",
  url: "https://greatoutdoor.in",
  label: "Shop Outdoor Furniture",
  heading: "Also love the outdoors?",
  blurb:
    "Explore our sister brand Great Outdoor — weatherproof patio furniture, swings, and garden sets trusted by Raffles, Marriott and more.",
} as const;

/** Secondary nav, rendered smaller beneath the grouped collections. */
export const SECONDARY_NAV = [
  { label: "Bulk | B2B", href: "/pages/b2b-leads" },
  { label: "FAQs", href: "/pages/faqs" },
  { label: "About Us", href: "/pages/about" },
  { label: "Blogs", href: "/blogs" },
] as const;
