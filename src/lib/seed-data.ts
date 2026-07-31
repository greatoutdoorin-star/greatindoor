/**
 * Placeholder catalogue.
 *
 * Categories, product names and images were taken from the live greatindoor.in
 * homepage; descriptions and specs are written stand-ins. This file is the only
 * data source until Supabase is wired up — `catalog.ts` reads from here and
 * keeps its async signatures so swapping in the database is a drop-in change.
 */

export type SeedCollection = {
  slug: string;
  name: string;
  /** Sidebar grouping on the live site. */
  group: "Furniture" | "Interiors" | "Outdoor";
  icon: string;
  /**
   * Category photo. Empty for now: the live site serves one identical
   * placeholder for all 15 categories (verified by hashing — 17 files, one
   * image), so there is nothing real to import. CategoryGrid falls back to the
   * icon on a tinted panel rather than repeating a leather chair 15 times.
   * Drop a real photo in public/categories/ and set the path here.
   */
  image: string;
  blurb: string;
};

export type SeedProduct = {
  slug: string;
  name: string;
  collection: string;
  /** Small label above the product name on cards, as on the live site. */
  badge: string;
  description: string;
  specs: string[];
  images: string[];
};

/** 15 categories, in the order the live site lists them. */
export const COLLECTIONS: SeedCollection[] = [
  {
    slug: "office-furniture",
    name: "Office Furniture",
    group: "Furniture",
    icon: "🪑",
    image: "",
    blurb: "Executive chairs, workstations and boardroom seating.",
  },
  {
    slug: "cafe-furniture",
    name: "Cafe Furniture",
    group: "Furniture",
    icon: "☕",
    image: "",
    blurb: "Compact seating and tables built for high-turnover spaces.",
  },
  {
    slug: "sofa",
    name: "Sofa",
    group: "Furniture",
    icon: "🛋️",
    image: "",
    blurb: "Leather, velvet and fabric sofas in made-to-order sizes.",
  },
  {
    slug: "blinds",
    name: "Blinds",
    group: "Interiors",
    icon: "🪟",
    image: "",
    blurb: "Roller, roman, vertical and motorised window treatments.",
  },
  {
    slug: "deck-flooring",
    name: "Deck Flooring",
    group: "Interiors",
    icon: "🪵",
    image: "",
    blurb: "WPC and hardwood decking for balconies, patios and poolsides.",
  },
  {
    slug: "wall-to-wall-carpets",
    name: "Wall-to-Wall Carpets",
    group: "Interiors",
    icon: "🧶",
    image: "",
    blurb: "Broadloom carpeting for offices, hotels and banquet halls.",
  },
  {
    slug: "wall-cladding",
    name: "Wall Cladding",
    group: "Interiors",
    icon: "🎨",
    image: "",
    blurb: "Wood, stone and louvre panelling for feature walls.",
  },
  {
    slug: "planters",
    name: "Planters",
    group: "Interiors",
    icon: "🪴",
    image: "",
    blurb: "Fibreglass and ceramic planters in every size and finish.",
  },
  {
    slug: "awnings-umbrellas",
    name: "Awnings & Umbrellas",
    group: "Outdoor",
    icon: "⛱️",
    image: "",
    blurb: "Retractable awnings and cantilever umbrellas for shade.",
  },
  {
    slug: "tensile-structures",
    name: "Tensile Structures",
    group: "Outdoor",
    icon: "🏗️",
    image: "",
    blurb: "Engineered fabric canopies for entrances, courtyards and parking.",
  },
  {
    slug: "luxury-tents",
    name: "Luxury Tents",
    group: "Outdoor",
    icon: "⛺",
    image: "",
    blurb: "Resort-grade tents for glamping and destination properties.",
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    group: "Outdoor",
    icon: "🍃",
    image: "",
    blurb: "Landscape and sports turf with UV-stable fibres.",
  },
  {
    slug: "sports-flooring",
    name: "Sports Flooring",
    group: "Outdoor",
    icon: "🏃",
    image: "",
    blurb: "Court, gym and multipurpose surfaces with certified bounce.",
  },
  {
    slug: "wall-tiles",
    name: "Wall Tiles",
    group: "Interiors",
    icon: "🪧",
    image: "",
    blurb: "Ceramic, porcelain and mosaic tiling for walls and facades.",
  },
  {
    slug: "outdoor-furniture",
    name: "Outdoor Furniture",
    group: "Outdoor",
    icon: "🌿",
    image: "",
    blurb: "Weatherproof seating, dining sets and swings.",
  },
];

const SPEC_BASE = [
  "Made to order — dimensions, fabric and finish customisable",
  "Installation included within Jaipur",
  "Site visit available for project quantities",
];

/** 12 featured products, matching the live site's featured row. */
export const PRODUCTS: SeedProduct[] = [
  {
    slug: "executive-leather-chair",
    name: "Executive Leather Chair",
    collection: "office-furniture",
    badge: "Office",
    description:
      "High-back executive seating in cushioned leather, with a chrome base and tilt mechanism. Built for long hours at the desk.",
    specs: ["High-back cushioned leather", "Chrome five-star base", ...SPEC_BASE],
    images: [],
  },
  {
    slug: "diamond-stitch-chair",
    name: "Diamond Stitch Chair",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Diamond-quilted backrest with a sculpted seat — a director's chair that reads as furniture, not office equipment.",
    specs: ["Diamond-quilted upholstery", "Height adjustable", ...SPEC_BASE],
    images: ["/products/diamond-stitch-chair.webp"],
  },
  {
    slug: "velvet-tub-chair",
    name: "Velvet Tub Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "A compact tub chair in velvet, sized for cafe and lounge corners where space is tight but comfort still matters.",
    specs: ["Velvet upholstery", "Solid wood frame", ...SPEC_BASE],
    images: ["/products/velvet-tub-chair.webp"],
  },
  {
    slug: "chesterfield-leather-sofa",
    name: "Chesterfield Leather Sofa",
    collection: "sofa",
    badge: "Sofa",
    description:
      "The classic deep-buttoned Chesterfield with rolled arms, in full-grain leather. Available in two, three and four seaters.",
    specs: ["Deep-buttoned back", "Full-grain leather", ...SPEC_BASE],
    images: ["/products/chesterfield-leather-sofa.webp"],
  },
  {
    slug: "wicker-sofa-set",
    name: "Wicker Sofa Set",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "Hand-woven wicker seating on a powder-coated aluminium frame, with weatherproof cushions for terraces and poolsides.",
    specs: [
      "Powder-coated aluminium frame",
      "Weatherproof cushions",
      ...SPEC_BASE,
    ],
    images: ["/products/wicker-sofa-set.webp"],
  },
  {
    slug: "outdoor-dining-set",
    name: "Outdoor Dining Set",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "A full alfresco dining set — table and chairs finished to survive sun and monsoon without fading or rusting.",
    specs: ["Rust-free frame", "UV-stable weave", ...SPEC_BASE],
    images: ["/products/outdoor-dining-set.webp"],
  },
  {
    slug: "two-seater-garden-swing",
    name: "Two-Seater Garden Swing",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "A canopied two-seater swing on a steel A-frame, with cushioned seating for gardens and balconies.",
    specs: ["Steel A-frame with canopy", "Cushioned two-seater", ...SPEC_BASE],
    images: ["/products/two-seater-garden-swing.webp"],
  },
  {
    slug: "tensile-structure",
    name: "Tensile Structure",
    collection: "tensile-structures",
    badge: "Structures",
    description:
      "Engineered fabric canopy for entrances, courtyards and parking bays — designed to span, not just cover.",
    specs: ["Engineered membrane", "Custom span and geometry", ...SPEC_BASE],
    images: ["/products/tensile-structure.webp"],
  },
  {
    slug: "umbrella-shade-structure",
    name: "Umbrella Shade Structure",
    collection: "awnings-umbrellas",
    badge: "Structures",
    description:
      "Large-format shade umbrella for hotel poolsides and open-air restaurants, with a weighted or anchored base.",
    specs: ["Large-format canopy", "Weighted or anchored base", ...SPEC_BASE],
    images: ["/products/umbrella-shade-structure.webp"],
  },
  {
    slug: "luxury-tent",
    name: "Luxury Tent",
    collection: "luxury-tents",
    badge: "Structures",
    description:
      "Resort-grade tent with a rigid frame and lined interior — built for glamping properties and destination stays.",
    specs: ["Rigid frame with lined interior", "All-season fabric", ...SPEC_BASE],
    images: ["/products/luxury-tent.webp"],
  },
  {
    slug: "wood-wall-cladding",
    name: "Wood Wall Cladding",
    collection: "wall-cladding",
    badge: "Interiors",
    description:
      "Slatted wood panelling that turns a plain wall into a feature — supplied and installed to your wall dimensions.",
    specs: ["Slatted wood panels", "Cut to wall dimensions", ...SPEC_BASE],
    images: ["/products/wood-wall-cladding.webp"],
  },
  {
    slug: "decorative-awning",
    name: "Decorative Awning",
    collection: "awnings-umbrellas",
    badge: "Outdoor",
    description:
      "Fixed or retractable awning for shopfronts, windows and balconies, in a choice of fabrics and profiles.",
    specs: ["Fixed or retractable", "Choice of fabric and profile", ...SPEC_BASE],
    images: ["/products/decorative-awning.webp"],
  },
];

/** Filter chips above the featured row on the home page. */
export const FEATURED_FILTERS = [
  "All",
  "Office",
  "Cafe",
  "Sofa",
  "Outdoor",
  "Structures",
  "Interiors",
] as const;

/** Clientele, grouped as on the live site. */
export const CLIENTELE = {
  hospitality: [
    "Raffles",
    "The Leela",
    "Marriott",
    "Rajasthali",
    "Shahpura",
    "Jaisalmer Resort",
  ],
  tagline: "Satisfaction is a rating · Loyalty is a brand",
} as const;

/** The four service promises beneath the promo band. */
export const SERVICES = [
  {
    icon: "🏠",
    title: "Installation",
    blurb: "Finished goods with refined installation services",
  },
  {
    icon: "🛡️",
    title: "Maintenance",
    blurb: "Only warranty comes with an expiry date",
  },
  {
    icon: "🔧",
    title: "Repairing",
    blurb: "Wear and Tear? Let Us Hear!",
  },
  {
    icon: "✏️",
    title: "100% Customisable",
    blurb: "Dimensions, fabric, finish — all tailored",
  },
] as const;

/** The three brand values — Quality, Comfort, Class. */
export const VALUES = [
  {
    icon: "🏆",
    title: "Quality",
    blurb: "An uncompromisable essence of our brand from decades",
  },
  {
    icon: "🛋️",
    title: "Comfort",
    blurb: "Products that convert spaces into a feeling like home",
  },
  {
    icon: "✨",
    title: "Class",
    blurb: "A fine range of finished products that speaks for themselves",
  },
] as const;

/** Founder copy, taken from the live site. */
export const FOUNDER = {
  name: "Mr. Tarun Bhatia",
  eyebrow: "Our Founder",
  timeline: "Est. 1993 → Rebranded 2012",
  paragraphs: [
    "A man who started his journey as a wallpaper trader in the old city of Jaipur 33 years ago — riding a bike loaded with catalogs, with uncrushable determination.",
    "In 1993, he opened his first store, Royal Interiors, in Raja Park. After 19 years of tireless efforts, the brand was reborn as Great Indoors in 2012.",
  ],
} as const;
