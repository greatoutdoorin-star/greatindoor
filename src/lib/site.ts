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
  email: "greatindoor.in@gmail.com",
  phone: "+91 98290 12090",
  address: "272A Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004",
} as const;

/** Headline figures in the band beneath the hero. */
export const STATS = [
  { value: "33+", label: "Years Experience" },
  { value: "20+", label: "Product Categories" },
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
 * Sidebar navigation, grouped as on the live site. Slugs match collection
 * slugs; a group renders only the collections that actually exist.
 */
export const NAV_GROUPS = [
  {
    label: "Furniture",
    items: [
      { label: "Office Furniture", slug: "office-furniture", icon: "🪑" },
      { label: "Cafe Furniture", slug: "cafe-furniture", icon: "☕" },
      { label: "Sofa", slug: "sofa", icon: "🛋️" },
    ],
  },
  {
    label: "Interiors",
    items: [
      { label: "Blinds", slug: "blinds", icon: "🪟" },
      { label: "Deck Flooring", slug: "deck-flooring", icon: "🪵" },
      {
        label: "Wall-to-Wall Carpets",
        slug: "wall-to-wall-carpets",
        icon: "🧶",
      },
      { label: "Wall Cladding", slug: "wall-cladding", icon: "🎨" },
      { label: "Planters", slug: "planters", icon: "🪴" },
    ],
  },
  {
    label: "Outdoor",
    items: [
      { label: "Awnings & Umbrellas", slug: "awnings-umbrellas", icon: "⛱️" },
      { label: "Tensile Structures", slug: "tensile-structures", icon: "🏗️" },
      { label: "Luxury Tents", slug: "luxury-tents", icon: "⛺" },
      { label: "Artificial Grass", slug: "artificial-grass", icon: "🍃" },
    ],
  },
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
  { label: "Why GI?", href: "/pages/why-gi" },
  { label: "Blogs", href: "/blogs" },
] as const;
