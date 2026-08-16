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
  /**
   * Tabulated specifications, transcribed from the supplier catalogue —
   * material, dimensions, packing. Optional: not every category has a spec
   * sheet behind it.
   */
  details?: { label: string; value: string }[];
  /** Finish/colour options quoted on enquiry. */
  colours?: string[];
  images: string[];
};

/** 15 categories, in the order the live site lists them. */
export const COLLECTIONS: SeedCollection[] = [
  {
    slug: "office-furniture",
    name: "Office Furniture",
    group: "Furniture",
    icon: "🪑",
    image: "/catalog/products/high-back-office-chair.jpg",
    blurb: "Executive chairs, workstations and boardroom seating.",
  },
  {
    slug: "cafe-furniture",
    name: "Cafe Furniture",
    group: "Furniture",
    icon: "☕",
    image: "/catalog/products/cane-back-cafe-chair.jpg",
    blurb: "Compact seating and tables built for high-turnover spaces.",
  },
  {
    slug: "sofa",
    name: "Sofa",
    group: "Furniture",
    icon: "🛋️",
    image: "/catalog/products/brown-leather-sofa-set.jpg",
    blurb: "Leather, velvet and fabric sofas in made-to-order sizes.",
  },
  {
    slug: "blinds",
    name: "Blinds",
    group: "Interiors",
    icon: "🪟",
    image: "/catalog/blinds/venetian-blinds.jpg",
    blurb: "Roller, roman, vertical and motorised window treatments.",
  },
  {
    slug: "deck-flooring",
    name: "Deck Flooring",
    group: "Interiors",
    icon: "🪵",
    image: "/catalog/products/wpc-deck-flooring.jpg",
    blurb: "WPC and hardwood decking for balconies, patios and poolsides.",
  },
  {
    slug: "wooden-flooring",
    name: "Wooden Flooring",
    group: "Interiors",
    icon: "🪵",
    image: "/catalog/flooring/atlantis-oak-cocoa.jpg",
    blurb:
      "AC4 laminate wooden flooring in oak, walnut, teak and spruce decors.",
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
    image: "/catalog/products/dining-room-wall-cladding.jpg",
    blurb: "Wood, stone and louvre panelling for feature walls.",
  },
  {
    slug: "planters",
    name: "Planters",
    group: "Interiors",
    icon: "🪴",
    image: "/catalog/products/tall-fluted-planter.jpg",
    blurb: "Fibreglass and ceramic planters in every size and finish.",
  },
  {
    slug: "awnings-umbrellas",
    name: "Awnings & Umbrellas",
    group: "Outdoor",
    icon: "⛱️",
    image: "/catalog/products/resort-umbrella.jpg",
    blurb: "Retractable awnings and cantilever umbrellas for shade.",
  },
  {
    slug: "tensile-structures",
    name: "Tensile Structures",
    group: "Outdoor",
    icon: "🏗️",
    image: "/catalog/products/garden-canopy-tensile-structure.jpg",
    blurb: "Engineered fabric canopies for entrances, courtyards and parking.",
  },
  {
    slug: "luxury-tents",
    name: "Luxury Tents",
    group: "Outdoor",
    icon: "⛺",
    image: "/catalog/products/poolside-canopy-tensile-structure.jpg",
    blurb: "Resort-grade tents for glamping and destination properties.",
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    group: "Outdoor",
    icon: "🍃",
    image: "/catalog/products/artificial-grass-turf.jpg",
    blurb: "Landscape and sports turf with UV-stable fibres.",
  },
  {
    slug: "wall-tiles",
    name: "Wall Tiles",
    group: "Interiors",
    icon: "🪧",
    image: "/catalog/products/vertical-garden-panel-mixed.jpg",
    blurb: "Ceramic, porcelain and mosaic tiling for walls and facades.",
  },
  {
    slug: "outdoor-furniture",
    name: "Outdoor Furniture",
    group: "Outdoor",
    icon: "🌿",
    image: "/catalog/products/white-rattan-sofa-set.jpg",
    blurb: "Weatherproof seating, dining sets and swings.",
  },
];

const SPEC_BASE = [
  "Made to order — dimensions, fabric and finish customisable",
  "Installation included within Jaipur",
  "Site visit available for project quantities",
];

/** Every product is quoted on enquiry, so lead times are stated the same way. */
const MADE_TO_ORDER: { label: string; value: string }[] = [
  { label: "Availability", value: "Made to order" },
  { label: "Installation", value: "Included within Jaipur" },
];

/**
 * Great Indoors' own photography, sorted by category in
 * public/catalog/. These are the ranges GI supplies and installs directly, as
 * distinct from the QEDO seating catalogue below.
 *
 * Dimensions are deliberately absent: everything here is made to measure, so a
 * fixed size would be wrong rather than merely incomplete.
 */
export const GI_PRODUCTS: SeedProduct[] = [
  // ── Office furniture ──────────────────────────────────────────────────────
  {
    slug: "executive-leather-chair",
    name: "Executive Leather Chair",
    collection: "office-furniture",
    badge: "Office",
    description:
      "High-back executive seating in diamond-quilted leather, on a polished chrome base with tilt and height adjustment. Built for long hours at the desk.",
    specs: [
      "Diamond-quilted leather upholstery",
      "Chrome five-star base with castors",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Upholstery", value: "Leather, diamond-quilted" },
      { label: "Base", value: "Polished chrome, five-star with castors" },
      { label: "Mechanism", value: "Tilt with height adjustment" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/executive-leather-chair.jpg"],
  },
  {
    slug: "high-back-office-chair",
    name: "High-Back Office Chair",
    collection: "office-furniture",
    badge: "Office",
    description:
      "A high-back task chair with a contoured backrest and integrated headrest — designed to hold posture through a full working day.",
    specs: ["Contoured high back with headrest", ...SPEC_BASE],
    details: [
      { label: "Upholstery", value: "Fabric or leatherette" },
      { label: "Base", value: "Five-star with castors" },
      { label: "Mechanism", value: "Tilt with height adjustment" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/high-back-office-chair.jpg"],
  },
  {
    slug: "cushioned-executive-chair",
    name: "Cushioned Executive Chair",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Deep-cushioned executive seating with padded arms, finished in soft-touch upholstery for boardrooms and cabins.",
    specs: ["Deep cushioning with padded arms", ...SPEC_BASE],
    details: [
      { label: "Upholstery", value: "Soft-touch leatherette" },
      { label: "Arms", value: "Padded, fixed" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/cushioned-executive-chair.jpg"],
  },
  {
    slug: "modern-office-chair",
    name: "Modern Office Chair",
    collection: "office-furniture",
    badge: "Office",
    description:
      "A clean-lined contemporary task chair in a light finish, sized for open-plan workstations and home offices.",
    specs: ["Slim contemporary profile", ...SPEC_BASE],
    details: [
      { label: "Upholstery", value: "Fabric or mesh" },
      { label: "Base", value: "Five-star with castors" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/modern-office-chair.jpg"],
  },

  // ── Cafe furniture (GI's own photography) ─────────────────────────────────
  {
    slug: "tan-barrel-cafe-chair",
    name: "Tan Barrel Cafe Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "A curved barrel-back chair in tan upholstery on a solid timber frame — sized for cafe and lounge corners where space is tight.",
    specs: ["Barrel back on a solid timber frame", ...SPEC_BASE],
    details: [
      { label: "Upholstery", value: "Fabric or leatherette" },
      { label: "Frame", value: "Solid timber" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/tan-barrel-cafe-chair.jpg"],
  },
  {
    slug: "brown-leather-cafe-chair",
    name: "Brown Leather Cafe Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Leather-upholstered dining seating with a low back and tapered legs, built to take the turnover of a working restaurant.",
    specs: ["Leather upholstery on tapered legs", ...SPEC_BASE],
    details: [
      { label: "Upholstery", value: "Leather" },
      { label: "Frame", value: "Solid timber, tapered legs" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/brown-leather-cafe-chair.jpg"],
  },
  {
    slug: "wooden-cafe-armchair",
    name: "Wooden Cafe Armchair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "A solid-wood armchair with an open frame and upholstered seat, equally at home in a cafe or a dining room.",
    specs: ["Solid wood open-arm frame", ...SPEC_BASE],
    details: [
      { label: "Frame", value: "Solid wood" },
      { label: "Seat", value: "Upholstered" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/wooden-cafe-armchair.jpg"],
  },
  {
    slug: "cane-back-cafe-chair",
    name: "Cane-Back Cafe Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Woven cane backrest set into a solid timber frame, with an upholstered seat in the fabric of your choice.",
    specs: ["Woven cane back", "Upholstered seat", ...SPEC_BASE],
    details: [
      { label: "Back", value: "Woven cane" },
      { label: "Frame", value: "Solid timber" },
      { label: "Seat", value: "Upholstered, fabric to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/cane-back-cafe-chair.jpg"],
  },
  {
    slug: "black-windsor-cafe-chair",
    name: "Black Windsor Cafe Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "A spindle-back Windsor chair in a black finish — a classic silhouette that suits both heritage and contemporary interiors.",
    specs: ["Spindle-back Windsor silhouette", ...SPEC_BASE],
    details: [
      { label: "Frame", value: "Timber, black finish" },
      { label: "Back", value: "Spindle" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/black-windsor-cafe-chair.jpg"],
  },
  {
    slug: "grey-lattice-cafe-chair",
    name: "Grey Lattice Cafe Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "An open lattice back keeps this chair light to look at and light to move — practical for high-turnover cafe floors.",
    specs: ["Open lattice back", "Stackable", ...SPEC_BASE],
    details: [
      { label: "Back", value: "Open lattice" },
      { label: "Finish", value: "Grey" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/grey-lattice-cafe-chair.jpg"],
  },
  {
    slug: "green-shell-cafe-chair",
    name: "Green Shell Cafe Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "A moulded shell seat on slim legs, in a green finish — a compact chair for tight covers and breakout spaces.",
    specs: ["Moulded shell seat", ...SPEC_BASE],
    details: [
      { label: "Seat", value: "Moulded shell" },
      { label: "Finish", value: "Green" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/green-shell-cafe-chair.jpg"],
  },
  {
    slug: "blue-upholstered-cafe-chair",
    name: "Blue Upholstered Cafe Chair",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Fully upholstered cafe seating in blue, with a padded back and seat for spaces where guests linger.",
    specs: ["Fully upholstered back and seat", ...SPEC_BASE],
    details: [
      { label: "Upholstery", value: "Fabric, colour to choice" },
      { label: "Frame", value: "Timber" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/blue-upholstered-cafe-chair.jpg"],
  },

  // ── Sofas ─────────────────────────────────────────────────────────────────
  {
    slug: "brown-leather-sofa-set",
    name: "Brown Leather Sofa Set",
    collection: "sofa",
    badge: "Sofa",
    description:
      "A full leather lounge set — three-seater with matching single seats, deep cushioned throughout and built on a hardwood frame.",
    specs: [
      "Three-seater with matching single seats",
      "Hardwood frame",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Upholstery", value: "Leather" },
      { label: "Configuration", value: "3-seater + 2 single seats" },
      { label: "Frame", value: "Seasoned hardwood" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/brown-leather-sofa-set.jpg"],
  },
  {
    slug: "beige-recliner-sofa",
    name: "Beige Recliner Sofa",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Recliner seating in a soft beige finish, with independent reclining action on each seat.",
    specs: ["Independent recline per seat", ...SPEC_BASE],
    details: [
      { label: "Upholstery", value: "Fabric or leatherette" },
      { label: "Mechanism", value: "Independent recline per seat" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/beige-recliner-sofa.jpg"],
  },

  // ── Outdoor furniture ─────────────────────────────────────────────────────
  {
    slug: "rattan-dining-set",
    name: "Rattan Dining Set",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "An alfresco dining set in hand-woven rattan on a powder-coated aluminium frame, finished to survive sun and monsoon without fading or rusting.",
    specs: [
      "Powder-coated aluminium frame",
      "UV-stable hand-woven rattan",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Weave", value: "Hand-woven rattan, UV-stable" },
      { label: "Frame", value: "Powder-coated aluminium" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/rattan-dining-set.jpg"],
  },
  {
    slug: "rattan-loungers",
    name: "Rattan Loungers",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "Poolside loungers in woven rattan with weatherproof cushions, built for resorts and private terraces.",
    specs: ["Weatherproof cushions", ...SPEC_BASE],
    details: [
      { label: "Weave", value: "Hand-woven rattan, UV-stable" },
      { label: "Cushions", value: "Weatherproof, quick-dry foam" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/rattan-loungers.jpg"],
  },
  {
    slug: "white-rattan-sofa-set",
    name: "White Rattan Sofa Set",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "Outdoor lounge seating in white rattan, with a low profile that keeps sightlines open across a terrace or garden.",
    specs: ["Low-profile outdoor lounge set", ...SPEC_BASE],
    details: [
      { label: "Weave", value: "Hand-woven rattan, UV-stable" },
      { label: "Frame", value: "Powder-coated aluminium" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/white-rattan-sofa-set.jpg"],
  },
  {
    slug: "rattan-sunbed",
    name: "Rattan Sunbed",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "A single sunbed in woven rattan with an adjustable backrest — the poolside staple, made to order in your finish.",
    specs: ["Adjustable backrest", ...SPEC_BASE],
    details: [
      { label: "Weave", value: "Hand-woven rattan, UV-stable" },
      { label: "Backrest", value: "Multi-position adjustable" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/rattan-sunbed.jpg"],
  },
  {
    slug: "two-seater-garden-swing",
    name: "Two-Seater Garden Swing",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "A canopied two-seater swing on a steel A-frame, with cushioned seating for gardens, balconies and terraces.",
    specs: ["Steel A-frame with canopy", "Cushioned two-seater", ...SPEC_BASE],
    details: [
      { label: "Frame", value: "Powder-coated steel A-frame" },
      { label: "Canopy", value: "Weatherproof fabric" },
      { label: "Seating", value: "Two-seater, cushioned" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/two-seater-garden-swing.jpg"],
  },
  {
    slug: "single-seater-swing-red",
    name: "Single-Seater Swing",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "A hanging single-seater swing chair, finished in weatherproof weave and supplied with its own stand or ceiling fixing.",
    specs: ["Stand or ceiling-mounted", ...SPEC_BASE],
    details: [
      { label: "Weave", value: "UV-stable synthetic rattan" },
      { label: "Mounting", value: "Free-standing or ceiling-fixed" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/single-seater-swing-red.jpg"],
  },
  {
    slug: "single-seater-swing-green",
    name: "Single-Seater Swing SW-4",
    collection: "outdoor-furniture",
    badge: "Outdoor",
    description:
      "The SW-4 hanging swing chair in a green weave, with a deep seat and weatherproof cushion.",
    specs: ["Deep seat with weatherproof cushion", ...SPEC_BASE],
    details: [
      { label: "Model", value: "SW-4" },
      { label: "Weave", value: "UV-stable synthetic rattan" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/single-seater-swing-green.jpg"],
  },

  // ── Deck flooring ─────────────────────────────────────────────────────────
  {
    slug: "wpc-deck-flooring",
    name: "WPC Deck Flooring",
    collection: "deck-flooring",
    badge: "Interiors",
    description:
      "Wood-plastic composite decking for balconies, patios and poolsides — the look of timber without the annual sealing.",
    specs: [
      "Wood-plastic composite, no annual sealing",
      "Anti-slip textured surface",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Material", value: "Wood-plastic composite (WPC)" },
      { label: "Surface", value: "Anti-slip texture" },
      { label: "Application", value: "Balcony, patio, poolside" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/wpc-deck-flooring.jpg"],
  },
  {
    slug: "garden-patio-decking",
    name: "Garden Patio Decking",
    collection: "deck-flooring",
    badge: "Interiors",
    description:
      "Deck flooring laid across a garden patio, cut and installed to your site dimensions.",
    specs: ["Cut and installed to site dimensions", ...SPEC_BASE],
    details: [
      { label: "Material", value: "WPC or hardwood" },
      { label: "Application", value: "Garden patio, terrace" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/garden-patio-decking.jpg"],
  },

  // ── Planters ──────────────────────────────────────────────────────────────
  {
    slug: "tall-fluted-planter",
    name: "Tall Fluted Planter",
    collection: "planters",
    badge: "Interiors",
    description:
      "A tall fluted planter in a white finish, sized for entrance lobbies and to flank a doorway.",
    specs: ["Fluted profile", ...SPEC_BASE],
    details: [
      { label: "Material", value: "Fibreglass (FRP)" },
      { label: "Profile", value: "Tall fluted" },
      { label: "Finish", value: "White, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/tall-fluted-planter.jpg"],
  },
  {
    slug: "square-charcoal-planter",
    name: "Square Charcoal Planter",
    collection: "planters",
    badge: "Interiors",
    description:
      "A square planter in charcoal, with clean edges that suit contemporary lobbies and terraces.",
    specs: ["Square profile", ...SPEC_BASE],
    details: [
      { label: "Material", value: "Fibreglass (FRP)" },
      { label: "Profile", value: "Square" },
      { label: "Finish", value: "Charcoal" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/square-charcoal-planter.jpg"],
  },
  {
    slug: "square-white-planter",
    name: "Square White Planter",
    collection: "planters",
    badge: "Interiors",
    description:
      "The square planter in a white finish — supplied in a run of matching sizes for a continuous line.",
    specs: ["Available in matching sizes", ...SPEC_BASE],
    details: [
      { label: "Material", value: "Fibreglass (FRP)" },
      { label: "Profile", value: "Square" },
      { label: "Finish", value: "White" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/square-white-planter.jpg"],
  },
  {
    slug: "textured-white-planter",
    name: "Textured White Planter",
    collection: "planters",
    badge: "Interiors",
    description:
      "A textured-finish planter in white, where the surface does the work rather than the shape.",
    specs: ["Textured surface finish", ...SPEC_BASE],
    details: [
      { label: "Material", value: "Fibreglass (FRP)" },
      { label: "Finish", value: "Textured white" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/textured-white-planter.jpg"],
  },

  // ── Tensile structures ────────────────────────────────────────────────────
  {
    slug: "garden-canopy-tensile-structure",
    name: "Garden Canopy",
    collection: "tensile-structures",
    badge: "Structures",
    description:
      "An engineered fabric canopy spanning a garden seating area — designed to span, not merely to cover.",
    specs: ["Engineered membrane", "Custom span and geometry", ...SPEC_BASE],
    details: [
      { label: "Membrane", value: "Engineered PVC-coated fabric" },
      { label: "Span", value: "Engineered to site" },
      { label: "Application", value: "Garden, courtyard" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/garden-canopy-tensile-structure.jpg"],
  },
  {
    slug: "poolside-canopy-tensile-structure",
    name: "Poolside Canopy",
    collection: "tensile-structures",
    badge: "Structures",
    description:
      "A tensile canopy over a poolside deck, engineered for shade and wind loading at your site.",
    specs: ["Wind-loaded engineering", ...SPEC_BASE],
    details: [
      { label: "Membrane", value: "Engineered PVC-coated fabric" },
      { label: "Application", value: "Poolside, deck" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/poolside-canopy-tensile-structure.jpg"],
  },

  // ── Wall cladding ─────────────────────────────────────────────────────────
  {
    slug: "dark-walnut-wall-cladding",
    name: "Dark Walnut Wall Cladding",
    collection: "wall-cladding",
    badge: "Interiors",
    description:
      "Fluted wall cladding in a dark walnut finish, supplied in profile lengths and installed to your wall dimensions.",
    specs: ["Fluted profile", "Cut to wall dimensions", ...SPEC_BASE],
    details: [
      { label: "Profile", value: "Fluted louvre" },
      { label: "Finish", value: "Dark walnut" },
      { label: "Supply", value: "Profile lengths, cut on site" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/dark-walnut-wall-cladding.jpg"],
  },
  {
    slug: "brown-wall-cladding",
    name: "Brown Wall Cladding",
    collection: "wall-cladding",
    badge: "Interiors",
    description:
      "The fluted cladding profile in a mid-brown finish — a warmer read than the walnut, in the same section.",
    specs: ["Fluted profile", ...SPEC_BASE],
    details: [
      { label: "Profile", value: "Fluted louvre" },
      { label: "Finish", value: "Brown" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/brown-wall-cladding.jpg"],
  },
  {
    slug: "light-oak-wall-cladding",
    name: "Light Oak Wall Cladding",
    collection: "wall-cladding",
    badge: "Interiors",
    description:
      "Fluted cladding in a light oak finish, for rooms that need the texture without losing brightness.",
    specs: ["Fluted profile", ...SPEC_BASE],
    details: [
      { label: "Profile", value: "Fluted louvre" },
      { label: "Finish", value: "Light oak" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/light-oak-wall-cladding.jpg"],
  },
  {
    slug: "dining-room-wall-cladding",
    name: "Dining Room Feature Wall",
    collection: "wall-cladding",
    badge: "Interiors",
    description:
      "Fluted cladding installed as a dining-room feature wall — supplied and fitted, including trims and returns.",
    specs: ["Supplied and installed with trims", ...SPEC_BASE],
    details: [
      { label: "Application", value: "Dining room feature wall" },
      { label: "Includes", value: "Trims and returns" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/dining-room-wall-cladding.jpg"],
  },
  {
    slug: "media-wall-cladding",
    name: "Media Wall Cladding",
    collection: "wall-cladding",
    badge: "Interiors",
    description:
      "Cladding run around a media wall, cut to the screen and console openings before installation.",
    specs: ["Cut around screen and console openings", ...SPEC_BASE],
    details: [
      { label: "Application", value: "Media / TV wall" },
      { label: "Fabrication", value: "Cut to openings off site" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/media-wall-cladding.jpg"],
  },

  // ── Awnings & umbrellas ───────────────────────────────────────────────────
  {
    slug: "striped-window-awning",
    name: "Striped Window Awning",
    collection: "awnings-umbrellas",
    badge: "Outdoor",
    description:
      "A striped fabric awning over a window, fixed or retractable, in a choice of fabrics and profiles.",
    specs: ["Fixed or retractable", "Choice of fabric and profile", ...SPEC_BASE],
    details: [
      { label: "Operation", value: "Fixed or retractable" },
      { label: "Fabric", value: "UV-stable acrylic, striped or plain" },
      { label: "Application", value: "Window, shopfront" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/striped-window-awning.jpg"],
  },
  {
    slug: "striped-patio-awning",
    name: "Striped Patio Awning",
    collection: "awnings-umbrellas",
    badge: "Outdoor",
    description:
      "A wider patio awning in striped fabric, spanning a seating area with a retractable arm mechanism.",
    specs: ["Retractable arm mechanism", ...SPEC_BASE],
    details: [
      { label: "Operation", value: "Retractable, manual or motorised" },
      { label: "Fabric", value: "UV-stable acrylic" },
      { label: "Application", value: "Patio, terrace" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/striped-patio-awning.jpg"],
  },
  {
    slug: "poolside-umbrella",
    name: "Poolside Umbrella",
    collection: "awnings-umbrellas",
    badge: "Outdoor",
    description:
      "A centre-pole shade umbrella for hotel poolsides and open-air restaurants, with a weighted or anchored base.",
    specs: ["Weighted or anchored base", ...SPEC_BASE],
    details: [
      { label: "Type", value: "Centre pole" },
      { label: "Base", value: "Weighted or ground-anchored" },
      { label: "Canopy", value: "UV-stable fabric" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/poolside-umbrella.jpg"],
  },
  {
    slug: "cantilever-umbrella-white",
    name: "Cantilever Umbrella",
    collection: "awnings-umbrellas",
    badge: "Outdoor",
    description:
      "A side-post cantilever umbrella that keeps the area beneath it clear — the shade sits where the pole does not.",
    specs: ["Side-post cantilever, clear span beneath", ...SPEC_BASE],
    details: [
      { label: "Type", value: "Cantilever, side post" },
      { label: "Base", value: "Weighted or ground-anchored" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/cantilever-umbrella-white.jpg"],
  },
  {
    slug: "cantilever-umbrella-yellow",
    name: "Cantilever Umbrella (Colour)",
    collection: "awnings-umbrellas",
    badge: "Outdoor",
    description:
      "The cantilever umbrella in a coloured canopy — specify the shade to match your property's palette.",
    specs: ["Canopy colour to specification", ...SPEC_BASE],
    details: [
      { label: "Type", value: "Cantilever, side post" },
      { label: "Canopy", value: "UV-stable fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/cantilever-umbrella-yellow.jpg"],
  },
  {
    slug: "resort-umbrella",
    name: "Resort Umbrella",
    collection: "awnings-umbrellas",
    badge: "Outdoor",
    description:
      "Large-format resort umbrellas supplied in matching runs, for pool decks and beach fronts.",
    specs: ["Large format, supplied in matching runs", ...SPEC_BASE],
    details: [
      { label: "Type", value: "Large-format resort" },
      { label: "Canopy", value: "UV-stable fabric" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/resort-umbrella.jpg"],
  },

  // ── Artificial grass ──────────────────────────────────────────────────────
  {
    // Distinct from the "artificial-grass" collection slug, so /products/… and
    // /collections/… never read as the same resource.
    slug: "artificial-grass-turf",
    name: "Artificial Grass",
    collection: "artificial-grass",
    badge: "Outdoor",
    description:
      "Landscape turf with UV-stable fibres, supplied by the roll and laid to your area.",
    specs: ["UV-stable fibres", "Supplied by the roll", ...SPEC_BASE],
    details: [
      { label: "Fibre", value: "UV-stable polyethylene" },
      { label: "Supply", value: "Roll, cut to area" },
      { label: "Application", value: "Landscape, balcony, terrace" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/artificial-grass-turf.jpg"],
  },

  // ── Wall tiles / green walls ──────────────────────────────────────────────
  {
    slug: "vertical-garden-panel-purple",
    name: "Vertical Garden Panel",
    collection: "wall-tiles",
    badge: "Interiors",
    description:
      "An artificial vertical garden panel mixing foliage with purple flowering stems, tiled across a wall to any size.",
    specs: ["Tiles to any wall size", ...SPEC_BASE],
    details: [
      { label: "Type", value: "Artificial vertical garden panel" },
      { label: "Planting", value: "Mixed foliage with purple flowering" },
      { label: "Supply", value: "Interlocking panels, cut to size" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/vertical-garden-panel-purple.jpg"],
  },
  {
    slug: "vertical-garden-panel-mixed",
    name: "Vertical Garden Panel (Mixed)",
    collection: "wall-tiles",
    badge: "Interiors",
    description:
      "A denser vertical garden mix with red flowering accents, for feature walls that need more contrast.",
    specs: ["Dense mixed planting", ...SPEC_BASE],
    details: [
      { label: "Type", value: "Artificial vertical garden panel" },
      { label: "Planting", value: "Mixed foliage with red flowering" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/vertical-garden-panel-mixed.jpg"],
  },
  {
    slug: "vertical-garden-panel-light",
    name: "Vertical Garden Panel (Light)",
    collection: "wall-tiles",
    badge: "Interiors",
    description:
      "A lighter green mix, where the wall should read as foliage rather than as a floral display.",
    specs: ["Light foliage mix", ...SPEC_BASE],
    details: [
      { label: "Type", value: "Artificial vertical garden panel" },
      { label: "Planting", value: "Light foliage mix" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/products/vertical-garden-panel-light.jpg"],
  },
];

/**
 * QEDO cafeteria seating.
 *
 * Specifications transcribed from the supplier price list (w.e.f. 1 August
 * 2025); images from the QEDO e-commerce pack, joined on the model name.
 * Prices are deliberately omitted — this site quotes on enquiry.
 */
export const QEDO_PRODUCTS: SeedProduct[] = [
  {
    slug: "qedo-vision",
    name: "Vision",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Vision chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "765 (H) x 355 (L) x 403 (W) mm" }, { label: "Packing", value: "5 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-001-vision.webp"],
  },
  {
    slug: "qedo-cube",
    name: "Cube",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Cube chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "750 (H) x 528 (L) x 567 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-002-cube.webp"],
  },
  {
    slug: "qedo-hexa",
    name: "Hexa",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Hexa chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "810 (H) x 485 (L) x 325 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-003-hexa.webp"],
  },
  {
    slug: "qedo-i-breach",
    name: "i-Breach",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Breach chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "787 (H) x 445 (L) x 448 (W) mm" }, { label: "Packing", value: "5 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-004-i-breach.webp"],
  },
  {
    slug: "qedo-breach",
    name: "Breach",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Breach chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "787 (H) x 445 (L) x 448 (W) mm" }, { label: "Packing", value: "5 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-005-breach.webp"],
  },
  {
    slug: "qedo-uno",
    name: "Uno",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Uno chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "815 (H) x 448 (L) x 512 (W) mm" }, { label: "Packing", value: "5 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-006-uno.webp"],
  },
  {
    slug: "qedo-uno-xr",
    name: "Uno XR",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Uno XR chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "815 (H) x 448 (L) x 512 (W) mm" }, { label: "Packing", value: "5 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-007-uno-xr.webp"],
  },
  {
    slug: "qedo-bravo",
    name: "Bravo",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Bravo chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "815 (H) x 448 (L) x 512 (W) mm" }, { label: "Packing", value: "5 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-008-bravo.webp"],
  },
  {
    slug: "qedo-bravo-xr",
    name: "Bravo XR",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Bravo XR chair from the QEDO cafeteria seating range. CO-Polypropylene Alloy Chair.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "CO-Polypropylene Alloy Chair" }, { label: "Dimensions", value: "815 (H) x 448 (L) x 512 (W) mm" }, { label: "Packing", value: "5 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-009-bravo-xr.webp"],
  },
  {
    slug: "qedo-tulip",
    name: "Tulip",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Tulip chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden, Connector: nylon.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden / Connector: nylon" }, { label: "Dimensions", value: "774 (H) x 485 (L) x 449 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-010-tulip.webp"],
  },
  {
    slug: "qedo-tulip-metal",
    name: "Tulip Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Tulip Metal chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal" }, { label: "Dimensions", value: "774 (H) x 485 (L) x 449 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-011-tulip-metal.webp"],
  },
  {
    slug: "qedo-classic",
    name: "Classic",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Classic chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "840 (H) x 438 (L) x 438 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-012-classic.webp"],
  },
  {
    slug: "qedo-classic-smart",
    name: "Classic Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Classic Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "840 (H) x 438 (L) x 438 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-013-classic-smart.webp"],
  },
  {
    slug: "qedo-classic-alpha",
    name: "Classic Alpha",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Classic Alpha chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "834 (H) x 388 (L) x 385 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-014-classic-alpha.webp"],
  },
  {
    slug: "qedo-classic-gamma",
    name: "Classic Gamma",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Classic Gamma chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "823 (H) x 435 (L) x 457 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-015-classic-gamma.webp"],
  },
  {
    slug: "qedo-classic-metal",
    name: "Classic Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Classic Metal chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "823 (H) x 435 (L) x 457 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-016-classic-metal.webp"],
  },
  {
    slug: "qedo-i-classic-smart",
    name: "i-Classic Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Classic Smart chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "855 (H) x 435 (L) x 435 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-017-i-classic-smart.webp"],
  },
  {
    slug: "qedo-i-classic",
    name: "i-Classic",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Classic chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "840 (H) x 438 (L) x 438 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-018-i-classic.webp"],
  },
  {
    slug: "qedo-i-classic-beta",
    name: "i-Classic Beta",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Classic Beta chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Wooden" }, { label: "Dimensions", value: "834 (H) x 385 (L) x 388 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-019-i-classic-beta.webp"],
  },
  {
    slug: "qedo-i-classic-zeta",
    name: "i-Classic Zeta",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Classic Zeta chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Wooden" }, { label: "Dimensions", value: "815 (H) x 423 (L) x 461 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-020-i-classic-zeta.webp"],
  },
  {
    slug: "qedo-i-classic-metal",
    name: "i-Classic Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Classic Metal chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "823 (H) x 457 (L) x 435 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-021-i-classic-metal.webp"],
  },
  {
    slug: "qedo-ikon",
    name: "Ikon",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Ikon chair from the QEDO cafeteria seating range. Seat: CO-Polypropylene Alloy, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: CO-Polypropylene Alloy / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "822 (H) x 438 (L) x 438 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-022-ikon.webp"],
  },
  {
    slug: "qedo-ikon-smart",
    name: "Ikon Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Ikon Smart chair from the QEDO cafeteria seating range. Seat: CO-Polypropylene Alloy, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: CO-Polypropylene Alloy / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "822 (H) x 438 (L) x 438 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-023-ikon-smart.webp"],
  },
  {
    slug: "qedo-ikon-metal",
    name: "Ikon Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Ikon Metal chair from the QEDO cafeteria seating range. Seat: CO-Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: CO-Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "838 (H) x 536 (L) x 526 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-024-ikon-metal.webp"],
  },
  {
    slug: "qedo-iris",
    name: "Iris",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Iris chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "853 (H) x 388 (L) x 385 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-025-iris.webp"],
  },
  {
    slug: "qedo-iris-smart",
    name: "Iris Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Iris Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "847 (H) x 438 (L) x 438 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-026-iris-smart.webp"],
  },
  {
    slug: "qedo-iris-gamma",
    name: "Iris Gamma",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Iris Gamma chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "835 (H) x 466 (L) x 466 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-027-iris-gamma.webp"],
  },
  {
    slug: "qedo-iris-metal",
    name: "Iris Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Iris Metal chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "864 (H) x 427 (L) x 396 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-028-iris-metal.webp"],
  },
  {
    slug: "qedo-iris-platinum",
    name: "Iris Platinum",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Iris Platinum chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "847 (H) x 438 (L) x 438 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-029-iris-platinum.webp"],
  },
  {
    slug: "qedo-delta",
    name: "Delta",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Delta chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "776 (H) x 492 (L) x 447 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-030-delta.webp"],
  },
  {
    slug: "qedo-delta-smart",
    name: "Delta Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Delta Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "819 (H) x 526 (L) x 488 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-031-delta-smart.webp"],
  },
  {
    slug: "qedo-delta-platinum",
    name: "Delta Platinum",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Delta Platinum chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "819 (H) x 526 (L) x 488 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-032-delta-platinum.webp"],
  },
  {
    slug: "qedo-i-delta",
    name: "i-Delta",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Delta chair from the QEDO cafeteria seating range. Polypropylene Alloy with upholstery, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy with upholstery / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "819 (H) x 526 (L) x 488 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-033-i-delta.webp"],
  },
  {
    slug: "qedo-neon",
    name: "Neon",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Neon chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "754 (H) x 394 (L) x 406 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-034-neon.webp"],
  },
  {
    slug: "qedo-neon-metal",
    name: "Neon Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Neon Metal chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal, wood grain finish" }, { label: "Dimensions", value: "754 (H) x 394 (L) x 406 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-035-neon-metal.webp"],
  },
  {
    slug: "qedo-leo",
    name: "Leo",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Leo chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "784 (H) x 362 (L) x 382 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-036-leo.webp"],
  },
  {
    slug: "qedo-leo-smart",
    name: "Leo Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Leo Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "784 (H) x 435 (L) x 435 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-037-leo-smart.webp"],
  },
  {
    slug: "qedo-leo-platinum",
    name: "Leo Platinum",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Leo Platinum chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "784 (H) x 435 (L) x 435 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-038-leo-platinum.webp"],
  },
  {
    slug: "qedo-virgo",
    name: "Virgo",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Virgo bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Knock-down metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Knock-down metal frame, wood grain finish" }, { label: "Dimensions", value: "1090 (H) x 413 (L) x 457 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-039-virgo.webp"],
  },
  {
    slug: "qedo-virgo-black-gold",
    name: "Virgo Black Gold",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Virgo Black Gold bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Knock-down metal frame, black gold finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Knock-down metal frame, black gold finish" }, { label: "Dimensions", value: "1065 (H) x 536 (L) x 457 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-040-virgo-black-gold.webp"],
  },
  {
    slug: "qedo-aqua-metal",
    name: "Aqua Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Aqua Metal chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "887 (H) x 535 (L) x 540 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-041-aqua-metal.webp"],
  },
  {
    slug: "qedo-i-aqua-metal",
    name: "i-Aqua Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Aqua Metal chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "831 (H) x 524 (L) x 498 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-042-i-aqua-metal.webp"],
  },
  {
    slug: "qedo-aqua-smart",
    name: "Aqua Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Aqua Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "831 (H) x 524 (L) x 498 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-043-aqua-smart.webp"],
  },
  {
    slug: "qedo-aqua-glow",
    name: "Aqua Glow",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Aqua Glow chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy (White).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy (White)" }, { label: "Dimensions", value: "790 (H) x 535 (L) x 510 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-044-aqua-glow.webp"],
  },
  {
    slug: "qedo-i-aqua-smart",
    name: "i-Aqua Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Aqua Smart chair from the QEDO cafeteria seating range. Polypropylene Alloy seat, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "887 (H) x 535 (L) x 540 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-045-i-aqua-smart.webp"],
  },
  {
    slug: "qedo-i-aqua-glow",
    name: "i-Aqua Glow",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Aqua Glow chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Polypropylene Alloy (White).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Polypropylene Alloy (White)" }, { label: "Dimensions", value: "831 (H) x 524 (L) x 498 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-046-i-aqua-glow.webp"],
  },
  {
    slug: "qedo-aqua-platinum",
    name: "Aqua Platinum",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Aqua Platinum chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "887 (H) x 535 (L) x 540 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-047-aqua-platinum.webp"],
  },
  {
    slug: "qedo-i-aqua-platinum",
    name: "i-Aqua Platinum",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "i-Aqua Platinum chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "887 (H) x 487 (L) x 487 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-048-i-aqua-platinum.webp"],
  },
  {
    slug: "qedo-wave",
    name: "Wave",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Wave chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "755 (H) x 388 (L) x 396 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-049-wave.webp"],
  },
  {
    slug: "qedo-wave-smart",
    name: "Wave Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Wave Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "756 (H) x 445 (L) x 445 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-050-wave-smart.webp"],
  },
  {
    slug: "qedo-wave-platinum",
    name: "Wave Platinum",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Wave Platinum chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "756 (H) x 445 (L) x 445 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-051-wave-platinum.webp"],
  },
  {
    slug: "qedo-dutch",
    name: "Dutch",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Dutch bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Knock-down metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Knock-down metal frame, wood grain finish" }, { label: "Dimensions", value: "1065 (H) x 413 (L) x 457 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-052-dutch.webp"],
  },
  {
    slug: "qedo-maxx-barstool-i",
    name: "Maxx Barstool I",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Maxx Barstool I bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Knock-down metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Knock-down metal frame, wood grain finish" }, { label: "Dimensions", value: "1006 (H) x 470 (L) x 531 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-053-maxx-barstool-i.webp"],
  },
  {
    slug: "qedo-maxx-barstool-ii",
    name: "Maxx Barstool II",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Maxx Barstool II bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Revolving stool with height adjuster.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Revolving stool with height adjuster" }, { label: "Dimensions", value: "1015 (H) x 410 (L) x 400 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-054-maxx-barstool-ii.webp"],
  },
  {
    slug: "qedo-maxx-stool",
    name: "Maxx Stool",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Maxx Stool bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Revolving stool with height adjuster.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Revolving stool with height adjuster" }, { label: "Dimensions", value: "712 (H) x 410 (L) x 400 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-055-maxx-stool.webp"],
  },
  {
    slug: "qedo-maxx-revolving",
    name: "Maxx Revolving",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Maxx Revolving bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Revolving stool with height adjuster.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Revolving stool with height adjuster" }, { label: "Dimensions", value: "763 (H) x 533 (L) x 400 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-056-maxx-revolving.webp"],
  },
  {
    slug: "qedo-turret",
    name: "Turret",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Turret bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Knock-down metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Knock-down metal frame, wood grain finish" }, { label: "Dimensions", value: "825 (H) x 470 (L) x 531 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-057-turret.webp"],
  },
  {
    slug: "qedo-turret-a",
    name: "Turret A",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Turret A bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Knock-down metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Knock-down metal frame, wood grain finish" }, { label: "Dimensions", value: "825 (H) x 470 (L) x 531 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-058-turret-a.webp"],
  },
  {
    slug: "qedo-cozy",
    name: "Cozy",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Cozy bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Knock-down metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Knock-down metal frame, wood grain finish" }, { label: "Dimensions", value: "963 (H) x 500 (L) x 451 (W) mm" }, { label: "Packing", value: "12 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-059-cozy.webp"],
  },
  {
    slug: "qedo-jewel",
    name: "Jewel",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Jewel chair from the QEDO cafeteria seating range. Seat: Upholstery, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Upholstery / Legs: Metal frame, wood grain finish" }, { label: "Dimensions", value: "772 (H) x 461 (L) x 423 (W) mm" }, { label: "Packing", value: "4 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-060-jewel.webp"],
  },
  {
    slug: "qedo-brew",
    name: "Brew",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Brew bar stool from the QEDO cafeteria seating range. Seat: Upholstery, Legs: Knock-down metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Upholstery / Legs: Knock-down metal frame, wood grain finish" }, { label: "Dimensions", value: "1131 (H) x 413 (L) x 458 (W) mm" }, { label: "Packing", value: "8 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-061-brew.webp"],
  },
  {
    slug: "qedo-iris-bar-stool",
    name: "Iris Bar Stool",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Iris Bar Stool bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "1105 (H) x 540 (L) x 536 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-062-iris-bar-stool.webp"],
  },
  {
    slug: "qedo-iris-beta-bar-stool",
    name: "Iris Beta Bar Stool",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Iris Beta Bar Stool bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "765 (H) x 445 (L) x 400 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-063-iris-beta-bar-stool.webp"],
  },
  {
    slug: "qedo-classic-alfa-bar-stool",
    name: "Classic Alfa Bar Stool",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Classic Alfa Bar Stool bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "1081 (H) x 540 (L) x 536 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-064-classic-alfa-bar-stool.webp"],
  },
  {
    slug: "qedo-classic-gamma-bar-stool",
    name: "Classic Gamma Bar Stool",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "Classic Gamma Bar Stool bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "1070 (H) x 510 (L) x 533 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-065-classic-gamma-bar-stool.webp"],
  },
  {
    slug: "qedo-i-classic-beta-bar-stool",
    name: "i-Classic Beta Bar Stool",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "i-Classic Beta Bar Stool bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "1081 (H) x 540 (L) x 536 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-066-i-classic-beta-bar-stool.webp"],
  },
  {
    slug: "qedo-i-classic-zeta-bar-stool",
    name: "i-Classic Zeta Bar Stool",
    collection: "cafe-furniture",
    badge: "Bar Stool",
    description:
      "i-Classic Zeta Bar Stool bar stool from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Wooden.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Wooden" }, { label: "Dimensions", value: "1070 (H) x 510 (L) x 533 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-067-i-classic-zeta-bar-stool.webp"],
  },
  {
    slug: "qedo-co21a",
    name: "CO21A",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "CO21A chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "831 (H) x 441 (L) x 449 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-068-co21a.webp"],
  },
  {
    slug: "qedo-co21a-smart",
    name: "CO21A Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "CO21A Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "831 (H) x 441 (L) x 449 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-069-co21a-smart.webp"],
  },
  {
    slug: "qedo-co21b",
    name: "CO21B",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "CO21B chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "831 (H) x 441 (L) x 449 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-070-co21b.webp"],
  },
  {
    slug: "qedo-co21b-smart",
    name: "CO21B Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "CO21B Smart chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "831 (H) x 441 (L) x 449 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-071-co21b-smart.webp"],
  },
  {
    slug: "qedo-fusion",
    name: "Fusion",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Fusion chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy" }, { label: "Dimensions", value: "815 (H) x 445 (L) x 442 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-072-fusion.webp"],
  },
  {
    slug: "qedo-fusion-smart",
    name: "Fusion Smart",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Fusion Smart chair from the QEDO cafeteria seating range. Seat: Polypropylene Alloy, Legs: Polypropylene Alloy (Black).",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Seat: Polypropylene Alloy / Legs: Polypropylene Alloy (Black)" }, { label: "Dimensions", value: "815 (H) x 445 (L) x 442 (W) mm" }, { label: "Packing", value: "10 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-073-fusion-smart.webp"],
  },
  {
    slug: "qedo-fusion-metal",
    name: "Fusion Metal",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Fusion Metal chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal frame, wood grain finish.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal frame, wood grain finish" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-074-fusion-metal.webp"],
  },
  {
    slug: "qedo-mirage-flex",
    name: "Mirage Flex",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Mirage Flex chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal powder coated.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal powder coated" }, { label: "Dimensions", value: "880 (H) x 515 (L) x 555 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-075-mirage-flex.webp"],
  },
  {
    slug: "qedo-mirage-air",
    name: "Mirage Air",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Mirage Air chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal powder coated.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal powder coated" }, { label: "Dimensions", value: "875 (H) x 465 (L) x 510 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-076-mirage-air.webp"],
  },
  {
    slug: "qedo-mirage-luxe",
    name: "Mirage Luxe",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Mirage Luxe chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal powder coated.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal powder coated" }, { label: "Dimensions", value: "880 (H) x 455 (L) x 485 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-077-mirage-luxe.webp"],
  },
  {
    slug: "qedo-mirage-pro",
    name: "Mirage Pro",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Mirage Pro chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal powder coated.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal powder coated" }, { label: "Dimensions", value: "890 (H) x 535 (L) x 585 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-078-mirage-pro.webp"],
  },
  {
    slug: "qedo-mirage-lite",
    name: "Mirage Lite",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Mirage Lite chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal powder coated.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal powder coated" }, { label: "Dimensions", value: "880 (H) x 530 (L) x 555 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-079-mirage-lite.webp"],
  },
  {
    slug: "qedo-mirage-edge",
    name: "Mirage Edge",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Mirage Edge chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal powder coated.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal powder coated" }, { label: "Dimensions", value: "800 (H) x 445 (L) x 540 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-080-mirage-edge.webp"],
  },
  {
    slug: "qedo-mirage-nova",
    name: "Mirage Nova",
    collection: "cafe-furniture",
    badge: "Cafe",
    description:
      "Mirage Nova chair from the QEDO cafeteria seating range. Polypropylene Alloy seat with cushion, Legs: Metal powder coated.",
    specs: [...SPEC_BASE],
    details: [{ label: "Material", value: "Polypropylene Alloy seat with cushion / Legs: Metal powder coated" }, { label: "Dimensions", value: "880 (H) x 515 (L) x 555 (W) mm" }, { label: "Packing", value: "6 Pcs. Per Box" }, ...MADE_TO_ORDER],
    images: ["/catalog/qedo/qedo-081-mirage-nova.webp"],
  },
];

/**
 * ZETA Seatings office chairs.
 *
 * Images from the ZETA e-commerce pack (2000x2000 studio canvas), grouped by
 * model so every view feeds the product gallery. The supplier catalogue is
 * photography only — it carries no dimension table — so these list the
 * construction that is visible and verifiable rather than invented numbers.
 */
export const ZETA_PRODUCTS: SeedProduct[] = [
  {
    slug: "zeta-altis",
    name: "Altis",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Altis office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-altis.webp", "/catalog/zeta/zeta-seatings-altis-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-altis-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-altis-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-aqua",
    name: "Aqua",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Aqua office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-aqua.webp", "/catalog/zeta/zeta-seatings-aqua-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-aqua-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-aqua-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-atlantis",
    name: "Atlantis",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Atlantis office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-atlantis.webp", "/catalog/zeta/zeta-seatings-atlantis-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-atlantis-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-atlantis-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-axis",
    name: "Axis",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Axis office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-axis.webp", "/catalog/zeta/zeta-seatings-axis-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-axis-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-axis-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-axis-pro",
    name: "Axis Pro",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Axis Pro office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-axis-pro.webp", "/catalog/zeta/zeta-seatings-axis-pro-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-axis-pro-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-axis-pro-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-capitol",
    name: "Capitol",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Capitol office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-capitol.webp", "/catalog/zeta/zeta-seatings-capitol-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-capitol-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-capitol-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-capitol-04-detail-lifestyle-office-chair.webp"],
  },
  {
    slug: "zeta-curvy",
    name: "Curvy",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Curvy office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-curvy.webp", "/catalog/zeta/zeta-seatings-curvy-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-curvy-04-main-office-chair.webp", "/catalog/zeta/zeta-seatings-curvy-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-curvy-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-curvy-05-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-curvy-06-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-duster",
    name: "Duster",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Duster office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-duster.webp", "/catalog/zeta/zeta-seatings-duster-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-duster-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-duster-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-dynamo",
    name: "Dynamo",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Dynamo office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-dynamo.webp", "/catalog/zeta/zeta-seatings-dynamo-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-dynamo-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-dynamo-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-everest",
    name: "Everest",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Everest office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-everest.webp", "/catalog/zeta/zeta-seatings-everest-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-everest-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-everest-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-jaguar",
    name: "Jaguar",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Jaguar office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-jaguar.webp", "/catalog/zeta/zeta-seatings-jaguar-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-jaguar-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-jaguar-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-jaguar-04-recliner-lifestyle-office-chair.webp"],
  },
  {
    slug: "zeta-magnet",
    name: "Magnet",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Magnet office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-magnet.webp", "/catalog/zeta/zeta-seatings-magnet-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-magnet-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-magnet-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-magnet-04-upholstery-detail-office-chair.webp"],
  },
  {
    slug: "zeta-mastra",
    name: "Mastra",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Mastra office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-mastra.webp", "/catalog/zeta/zeta-seatings-mastra-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-mastra-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-mastra-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-mastra-04-upholstery-detail-office-chair.webp"],
  },
  {
    slug: "zeta-mist",
    name: "Mist",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Mist office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-mist.webp", "/catalog/zeta/zeta-seatings-mist-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-mist-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-mist-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-muse",
    name: "Muse",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Muse office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-muse.webp", "/catalog/zeta/zeta-seatings-muse-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-muse-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-muse-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-nest",
    name: "Nest",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Nest office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-nest.webp", "/catalog/zeta/zeta-seatings-nest-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-nest-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-nest-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-orion",
    name: "Orion",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Orion office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-orion.webp", "/catalog/zeta/zeta-seatings-orion-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-orion-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-orion-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-rover",
    name: "Rover",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Rover office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-rover.webp", "/catalog/zeta/zeta-seatings-rover-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-rover-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-rover-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-sitara",
    name: "Sitara",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Sitara office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-sitara.webp", "/catalog/zeta/zeta-seatings-sitara-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-sitara-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-sitara-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-sitara-04-lifestyle-office-chair.webp"],
  },
  {
    slug: "zeta-spider",
    name: "Spider",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Spider office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-spider.webp", "/catalog/zeta/zeta-seatings-spider-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-spider-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-spider-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-sway",
    name: "Sway",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Sway office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-sway.webp", "/catalog/zeta/zeta-seatings-sway-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-sway-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-sway-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-synergy",
    name: "Synergy",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Synergy office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-synergy.webp", "/catalog/zeta/zeta-seatings-synergy-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-synergy-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-synergy-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-tang",
    name: "Tang",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Tang office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-tang.webp", "/catalog/zeta/zeta-seatings-tang-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-tang-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-tang-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-the-wood",
    name: "The Wood",
    collection: "office-furniture",
    badge: "Office",
    description:
      "The Wood office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-the-wood.webp", "/catalog/zeta/zeta-seatings-the-wood-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-the-wood-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-the-wood-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-the-wood-04-lifestyle-office-chair.webp"],
  },
  {
    slug: "zeta-triumph",
    name: "Triumph",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Triumph office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-triumph.webp", "/catalog/zeta/zeta-seatings-triumph-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-triumph-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-triumph-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-venus",
    name: "Venus",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Venus office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-venus.webp", "/catalog/zeta/zeta-seatings-venus-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-venus-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-venus-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-vista",
    name: "Vista",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Vista office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-vista.webp", "/catalog/zeta/zeta-seatings-vista-01-main-office-chair.webp", "/catalog/zeta/zeta-seatings-vista-02-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-vista-03-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-zenith",
    name: "Zenith",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Zenith office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-zenith.webp", "/catalog/zeta/zeta-seatings-zenith-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-zenith-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-zenith-02-view-02-office-chair.webp"],
  },
  {
    slug: "zeta-zentra",
    name: "Zentra",
    collection: "office-furniture",
    badge: "Office",
    description:
      "Zentra office seating from the ZETA Seatings range, supplied and installed by Great Indoors. Upholstery, base and mechanism options are confirmed on enquiry.",
    specs: [...SPEC_BASE],
    details: [
      { label: "Range", value: "ZETA Seatings" },
      { label: "Category", value: "Office / executive seating" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/office/zeta-zentra.webp", "/catalog/zeta/zeta-seatings-zentra-03-main-office-chair.webp", "/catalog/zeta/zeta-seatings-zentra-01-view-01-office-chair.webp", "/catalog/zeta/zeta-seatings-zentra-02-view-02-office-chair.webp", "/catalog/zeta/zeta-seatings-zentra-04-lifestyle-office-chair.webp"],
  },
];

/**
 * Wooden laminate flooring.
 *
 * Three supplier ranges — Atlantis (spillproof), Casablanca (herringbone)
 * and Vestige (European matte). Specifications are transcribed from each
 * catalogue's own spec panel; imagery is the catalogue room-sets, which show
 * the decor laid rather than as a plank swatch.
 *
 * Slugs carry the range prefix because decor names repeat across ranges —
 * Walnut Bliss and Bali Teak each appear in two.
 */
export const FLOORING_PRODUCTS: SeedProduct[] = [
  {
    slug: "atlantis-oak-cocoa",
    name: "Atlantis Oak Cocoa",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A deep cocoa-brown oak with pronounced grain, warm enough to anchor a hallway or living room without darkening it.\n\n100-hour spill protection technology — engineered Hydroshield HDF designed to resist accidental liquid spills for extended periods. Spill protection refers to resistance against surface standing liquid and does not replace proper maintenance practice.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Atlantis — Spillproof Wooden Laminate" }, { label: "Core", value: "Hydroshield HDF, density 1000 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1218 mm" }, { label: "Width", value: "197 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "8 planks" }, { label: "Area per Box", value: "20.66 sq.ft. / 1.919 sq.mtr." }, { label: "Surface", value: "Embossed in register" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/atlantis-oak-cocoa.jpg"],
  },
  {
    slug: "atlantis-oak-barley",
    name: "Atlantis Oak Barley",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A mid-tone barley oak — the everyday neutral of the range, equally at home in a bedroom or an open-plan living space.\n\n100-hour spill protection technology — engineered Hydroshield HDF designed to resist accidental liquid spills for extended periods. Spill protection refers to resistance against surface standing liquid and does not replace proper maintenance practice.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Atlantis — Spillproof Wooden Laminate" }, { label: "Core", value: "Hydroshield HDF, density 1000 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1218 mm" }, { label: "Width", value: "197 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "8 planks" }, { label: "Area per Box", value: "20.66 sq.ft. / 1.919 sq.mtr." }, { label: "Surface", value: "Embossed in register" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/atlantis-oak-barley.jpg"],
  },
  {
    slug: "atlantis-oak-creme",
    name: "Atlantis Oak Creme",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A pale creme oak that lifts a room, well suited to compact spaces and Scandinavian-leaning interiors.\n\n100-hour spill protection technology — engineered Hydroshield HDF designed to resist accidental liquid spills for extended periods. Spill protection refers to resistance against surface standing liquid and does not replace proper maintenance practice.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Atlantis — Spillproof Wooden Laminate" }, { label: "Core", value: "Hydroshield HDF, density 1000 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1218 mm" }, { label: "Width", value: "197 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "8 planks" }, { label: "Area per Box", value: "20.66 sq.ft. / 1.919 sq.mtr." }, { label: "Surface", value: "Embossed in register" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/atlantis-oak-creme.jpg"],
  },
  {
    slug: "atlantis-oak-grey-scale",
    name: "Atlantis Oak Grey Scale",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A cool grey-scale oak with soft grain, a contemporary backdrop that sits comfortably under both warm and cool furnishings.\n\n100-hour spill protection technology — engineered Hydroshield HDF designed to resist accidental liquid spills for extended periods. Spill protection refers to resistance against surface standing liquid and does not replace proper maintenance practice.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Atlantis — Spillproof Wooden Laminate" }, { label: "Core", value: "Hydroshield HDF, density 1000 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1218 mm" }, { label: "Width", value: "197 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "8 planks" }, { label: "Area per Box", value: "20.66 sq.ft. / 1.919 sq.mtr." }, { label: "Surface", value: "Embossed in register" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/atlantis-oak-grey-scale.jpg"],
  },
  {
    slug: "atlantis-oak-maize",
    name: "Atlantis Oak Maize",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A golden maize oak with a natural, sunlit warmth that suits traditional and transitional rooms alike.\n\n100-hour spill protection technology — engineered Hydroshield HDF designed to resist accidental liquid spills for extended periods. Spill protection refers to resistance against surface standing liquid and does not replace proper maintenance practice.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Atlantis — Spillproof Wooden Laminate" }, { label: "Core", value: "Hydroshield HDF, density 1000 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1218 mm" }, { label: "Width", value: "197 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "8 planks" }, { label: "Area per Box", value: "20.66 sq.ft. / 1.919 sq.mtr." }, { label: "Surface", value: "Embossed in register" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/atlantis-oak-maize.jpg"],
  },
  {
    slug: "casablanca-bali-teak",
    name: "Casablanca Bali Teak",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Golden-brown teak tones in a herringbone lay — the pattern does the work, giving a small room real presence.\n\nLaid in a herringbone pattern, bringing the warmth, touch and feel of hardwood flooring to your steps.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Casablanca — Herringbone Pattern" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "808 mm" }, { label: "Width", value: "101 mm" }, { label: "Total Thickness", value: "8 mm" }, { label: "Plank per Box", value: "24 planks" }, { label: "Area per Box", value: "21.08 sq.ft. / 1.958 sq.mtr." }, { label: "Surface", value: "Low gloss" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/casablanca-bali-teak.jpg"],
  },
  {
    slug: "casablanca-arctic-oak",
    name: "Casablanca Arctic Oak",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A cool, pale oak in herringbone, bright and graphic without becoming stark.\n\nLaid in a herringbone pattern, bringing the warmth, touch and feel of hardwood flooring to your steps.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Casablanca — Herringbone Pattern" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "808 mm" }, { label: "Width", value: "101 mm" }, { label: "Total Thickness", value: "8 mm" }, { label: "Plank per Box", value: "24 planks" }, { label: "Area per Box", value: "21.08 sq.ft. / 1.958 sq.mtr." }, { label: "Surface", value: "Low gloss" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/casablanca-arctic-oak.jpg"],
  },
  {
    slug: "casablanca-american-walnut",
    name: "Casablanca American Walnut",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Classic American walnut, rich and even-toned, laid in herringbone for a formal finish.\n\nLaid in a herringbone pattern, bringing the warmth, touch and feel of hardwood flooring to your steps.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Casablanca — Herringbone Pattern" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "808 mm" }, { label: "Width", value: "101 mm" }, { label: "Total Thickness", value: "8 mm" }, { label: "Plank per Box", value: "24 planks" }, { label: "Area per Box", value: "21.08 sq.ft. / 1.958 sq.mtr." }, { label: "Surface", value: "Low gloss" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/casablanca-american-walnut.jpg"],
  },
  {
    slug: "casablanca-patagonian-walnut",
    name: "Casablanca Patagonian Walnut",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A deeper, redder walnut with more movement in the grain than the American cut.\n\nLaid in a herringbone pattern, bringing the warmth, touch and feel of hardwood flooring to your steps.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Casablanca — Herringbone Pattern" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "808 mm" }, { label: "Width", value: "101 mm" }, { label: "Total Thickness", value: "8 mm" }, { label: "Plank per Box", value: "24 planks" }, { label: "Area per Box", value: "21.08 sq.ft. / 1.958 sq.mtr." }, { label: "Surface", value: "Low gloss" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/casablanca-patagonian-walnut.jpg"],
  },
  {
    slug: "casablanca-walnut-bliss",
    name: "Casablanca Walnut Bliss",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Warm mid-walnut in herringbone — the most forgiving of the range under mixed lighting.\n\nLaid in a herringbone pattern, bringing the warmth, touch and feel of hardwood flooring to your steps.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Casablanca — Herringbone Pattern" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "808 mm" }, { label: "Width", value: "101 mm" }, { label: "Total Thickness", value: "8 mm" }, { label: "Plank per Box", value: "24 planks" }, { label: "Area per Box", value: "21.08 sq.ft. / 1.958 sq.mtr." }, { label: "Surface", value: "Low gloss" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/casablanca-walnut-bliss.jpg"],
  },
  {
    slug: "casablanca-dessert-aspen",
    name: "Casablanca Dessert Aspen",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A sandy aspen tone, light and dry-looking, that keeps a herringbone floor from feeling heavy.\n\nLaid in a herringbone pattern, bringing the warmth, touch and feel of hardwood flooring to your steps.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Casablanca — Herringbone Pattern" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "808 mm" }, { label: "Width", value: "101 mm" }, { label: "Total Thickness", value: "8 mm" }, { label: "Plank per Box", value: "24 planks" }, { label: "Area per Box", value: "21.08 sq.ft. / 1.958 sq.mtr." }, { label: "Surface", value: "Low gloss" }, { label: "Locking", value: "Smart Click" }, { label: "Edges", value: "V-Groove, waxed for water resistance" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/casablanca-dessert-aspen.jpg"],
  },
  {
    slug: "vestige-walnut-bliss",
    name: "Vestige Walnut Bliss",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Walnut Bliss brings elegance and warmth to any space with its rich, walnut-toned finish. Its natural wood grain patterns add a touch of sophistication, making it perfect for both modern and traditional interiors.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-walnut-bliss.jpg"],
  },
  {
    slug: "vestige-spruce-frost",
    name: "Vestige Spruce Frost",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Spruce Frost features light ash-grey tones and delicate wood grain, offering a cool, contemporary look perfect for minimalist interiors. Its durable surface withstands daily wear, making it ideal for high-traffic areas.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-spruce-frost.jpg"],
  },
  {
    slug: "vestige-oak-thar",
    name: "Vestige Oak Thar",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Light natural tones and subtle wood grain create a bright, airy feel that effortlessly enhances modern and minimal interiors. The smooth finish and organic texture add a sense of calm and sophistication.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-oak-thar.jpg"],
  },
  {
    slug: "vestige-oak-asphalt",
    name: "Vestige Oak Asphalt",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Deep grey tones and striking wood grain create a contemporary look that adds depth and character. A refined backdrop that complements both minimal and statement furniture while keeping a warm, natural feel.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-oak-asphalt.jpg"],
  },
  {
    slug: "vestige-bali-teak",
    name: "Vestige Bali Teak",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Bali Teak brings the beauty of natural teak wood into your home with its warm, golden-brown tones and rich wood grain patterns — cosy and inviting in both traditional and modern interiors.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-bali-teak.jpg"],
  },
  {
    slug: "vestige-oak-aura",
    name: "Vestige Oak Aura",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Golden hues and authentic wood grain add warmth and charm to any space, suiting both traditional and contemporary interiors. Durable and elegant.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-oak-aura.jpg"],
  },
  {
    slug: "vestige-milky-oak",
    name: "Vestige Milky Oak",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Light, creamy tones bring a sense of spaciousness and calm to any room, making it perfect for minimalistic and Scandinavian-inspired designs.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-milky-oak.jpg"],
  },
  {
    slug: "vestige-golden-spruce",
    name: "Vestige Golden Spruce",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Rich, golden tones bring warmth and radiance to any space, creating a welcoming atmosphere.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-golden-spruce.jpg"],
  },
  {
    slug: "vestige-walnut-dusk",
    name: "Vestige Walnut Dusk",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Deep, rich walnut tones create a sense of sophistication, ideal for upscale, modern or classic interiors. The intricate wood grain lends natural beauty, while its sturdy construction ensures long-lasting performance.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-walnut-dusk.jpg"],
  },
  {
    slug: "vestige-merbau",
    name: "Vestige Merbau",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "A rich, reddish-brown hue brings sophistication and warmth. The distinctive wood grain adds texture and character, complementing both traditional and contemporary designs.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-merbau.jpg"],
  },
  {
    slug: "vestige-oak-victoria",
    name: "Vestige Oak Victoria",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Rich, natural oak tones provide a balance of warmth and sophistication, ideal for traditional and modern interiors alike. The detailed wood grain exudes timeless beauty.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-oak-victoria.jpg"],
  },
  {
    slug: "vestige-spruce-earth",
    name: "Vestige Spruce Earth",
    collection: "wooden-flooring",
    badge: "Flooring",
    description:
      "Rich, earthy tones evoke warmth and tranquillity, perfect for serene living environments. The distinct wood grain enhances the authenticity of each plank.\n\nWax-coated grooves for moisture resistance, suitable above, on and below grade. Floating installation.",
    specs: [
      "AC4 grade — passes a 4000-round abrasion test",
      "Smart Click locking, floating installation",
      ...SPEC_BASE,
    ],
    details: [{ label: "Range", value: "Vestige — European Matte Finish" }, { label: "Core", value: "Superior quality HDF, density 900 kg/cbm" }, { label: "Wear Layer", value: "AC4 aluminium oxide, 4000-round abrasion tested" }, { label: "Length", value: "1220 mm" }, { label: "Width", value: "198 mm" }, { label: "Total Thickness", value: "8.3 mm" }, { label: "Plank per Box", value: "10 planks" }, { label: "Area per Box", value: "26 sq.ft. / 2.415 sq.mtr." }, { label: "Finish", value: "Wood grain and European matte" }, { label: "Locking", value: "Smart Click" }, { label: "Edges / Ends", value: "Straight" }, { label: "Warranty", value: "15 years conditional residential" }, { label: "Application", value: "Residential / Light commercial" }, ...MADE_TO_ORDER],
    images: ["/catalog/flooring/vestige-spruce-earth.jpg"],
  },
];

/**
 * ZETA Seatings Premium Luxury sofa series.
 *
 * Office and reception seating, supplied in three-seater, two-seater and
 * single-seater configurations. The catalogue lists a price per
 * configuration; those are trade figures and are deliberately not imported —
 * this site quotes on enquiry.
 */
export const SOFA_PRODUCTS: SeedProduct[] = [
  {
    slug: "zeta-sofa-royal",
    name: "Royal",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Royal — Form meets function, seat meets style. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-royal.jpg"],
  },
  {
    slug: "zeta-sofa-odi",
    name: "Odi",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Odi — Seating that speaks your style. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-odi.jpg"],
  },
  {
    slug: "zeta-sofa-harshil",
    name: "Harshil",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Harshil — Sitting made strategic. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-harshil.jpg"],
  },
  {
    slug: "zeta-sofa-lucifer",
    name: "Lucifer",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Lucifer — Waiting rooms that don't feel like waiting. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-lucifer.jpg"],
  },
  {
    slug: "zeta-sofa-wilson",
    name: "Wilson",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Wilson — Smart seating for smart business. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-wilson.jpg"],
  },
  {
    slug: "zeta-sofa-k2",
    name: "K2",
    collection: "sofa",
    badge: "Sofa",
    description:
      "K2 — Led by design. Loved by professionals. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-k2.jpg"],
  },
  {
    slug: "zeta-sofa-hector",
    name: "Hector",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Hector — Built to impress. Made to last. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-hector.jpg"],
  },
  {
    slug: "zeta-sofa-fortune",
    name: "Fortune",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Fortune — The backdrop for your boardroom. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-fortune.jpg"],
  },
  {
    slug: "zeta-sofa-elite",
    name: "Elite",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Elite — Where design gives you the edge. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-elite.jpg"],
  },
  {
    slug: "zeta-sofa-sparkal",
    name: "Sparkal",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Sparkal — Designed for first impressions. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-sparkal.jpg"],
  },
  {
    slug: "zeta-sofa-moon",
    name: "Moon",
    collection: "sofa",
    badge: "Sofa",
    description:
      "Moon — Seamless style. Part of the ZETA Seatings Premium Luxury series, built for reception areas, boardrooms and executive cabins.",
    specs: [
      "Available as three-seater, two-seater and single seater",
      "Upholstery and finish confirmed on enquiry",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Range", value: "ZETA Seatings — Premium Luxury Series" },
      { label: "Configurations", value: "3-seater, 2-seater, single seater" },
      { label: "Application", value: "Reception, boardroom, executive cabin" },
      { label: "Upholstery", value: "Leatherette or fabric, colour to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/sofa/zeta-moon.jpg"],
  },
];

/**
 * Window blinds.
 *
 * The range and product names come from the supplier's own product page.
 * That source carries no dimensions or material tables, so the spec rows
 * here stay at the level the source actually supports — type, operation and
 * the made-to-measure terms that apply to every blind. Nothing is invented.
 */
export const BLINDS_PRODUCTS: SeedProduct[] = [
  {
    slug: "blinds-block-out",
    name: "Block Out",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Room-darkening blackout blinds that shut out daylight almost entirely — the choice for bedrooms, boardrooms and any room with a projector.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Blackout fabric" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/block-out.jpg"],
  },
  {
    slug: "blinds-curtain-track",
    name: "Curtain Track",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Ceiling- or wall-mounted curtain track systems, cut to the run of the window and finished to draw smoothly under weight.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Track system" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/curtain-track.jpg"],
  },
  {
    slug: "blinds-honeycomb",
    name: "Honeycomb",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Cellular honeycomb shades whose air pockets insulate the window, softening light while cutting heat gain and loss.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Cellular / honeycomb" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/honeycomb.jpg"],
  },
  {
    slug: "blinds-lohas",
    name: "Lohas",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Light-filtering shades in a soft weave that diffuses daylight across the room rather than blocking it.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Light filtering" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/lohas.jpg"],
  },
  {
    slug: "blinds-open-roman",
    name: "Open Roman",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Roman shades that stack into soft horizontal folds as they rise, giving a window the look of a curtain with the control of a blind.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Roman fold" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/open-roman.jpg"],
  },
  {
    slug: "blinds-roller",
    name: "Roller",
    collection: "blinds",
    badge: "Blinds",
    description:
      "The classic roller blind — a single flat panel on a smooth-running tube, in blackout, dim-out or sunscreen fabrics.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Roller" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/roller.jpg"],
  },
  {
    slug: "blinds-s-wooden-blind",
    name: "'S' Wooden Blind",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Wooden slat blinds with an S-profile that closes tighter than a flat slat, for better light control without losing the timber look.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Wooden slat, S-profile" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/s-wooden-blind.jpg"],
  },
  {
    slug: "blinds-slope",
    name: "Slope",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Blinds shaped for sloped and angled glazing — skylights, gables and stairwell windows that a standard blind cannot fit.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Shaped for angled glazing" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/slope.jpg"],
  },
  {
    slug: "blinds-triple-shade",
    name: "Triple Shade",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Layered sheer-and-solid banded shades that shift from open view to full privacy as the bands align.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Layered banded shade" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/triple-shade.jpg"],
  },
  {
    slug: "blinds-venetian-blinds",
    name: "Venetian Blinds",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Horizontal slat blinds that tilt through the full range from open to closed, in aluminium or timber finishes.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Horizontal slat" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/venetian-blinds.jpg"],
  },
  {
    slug: "blinds-vertical-blinds",
    name: "Vertical Blinds",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Vertical louvre blinds that draw aside and rotate — the practical choice for wide windows and sliding doors.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Vertical louvre" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/vertical-blinds.jpg"],
  },
  {
    slug: "blinds-wooden-blinds",
    name: "Wooden Blinds",
    collection: "blinds",
    badge: "Blinds",
    description:
      "Real timber venetian blinds, warm underlight and substantial in the hand, for studies, living rooms and period interiors.",
    specs: [
      "Made to measure — every blind is cut to your window",
      "Manual or motorised operation",
      ...SPEC_BASE,
    ],
    details: [
      { label: "Type", value: "Real timber slat" },
      { label: "Operation", value: "Manual or motorised" },
      { label: "Sizing", value: "Made to measure" },
      { label: "Fabric", value: "Colour and opacity to choice" },
      ...MADE_TO_ORDER,
    ],
    images: ["/catalog/blinds/wooden-blinds.jpg"],
  },
];

export const PRODUCTS: SeedProduct[] = [
  ...GI_PRODUCTS,
  ...BLINDS_PRODUCTS,
  ...FLOORING_PRODUCTS,
  ...SOFA_PRODUCTS,
  ...ZETA_PRODUCTS,
  ...QEDO_PRODUCTS,
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

/**
 * Clientele.
 *
 * Logo files live in public/clients/. Names are transcribed from the marks
 * themselves so the alt text matches what is actually shown — these are real
 * third-party trademarks, used to state who Great Indoors has supplied.
 */
export const CLIENTELE = {
  logos: [
    { name: "Ananta Hotels & Resorts", src: "/clients/client-1.webp" },
    { name: "ITC Rajputana, Jaipur", src: "/clients/client-2.webp" },
    { name: "Fairmont Hotels & Resorts", src: "/clients/client-3.webp" },
    { name: "Hilton", src: "/clients/client-4.webp" },
    { name: "Taj", src: "/clients/client-5.webp" },
    { name: "Raffles Hotels & Resorts", src: "/clients/client-6.webp" },
    { name: "The Leela", src: "/clients/client-7.webp" },
    { name: "Marriott", src: "/clients/client-8.webp" },
    { name: "Shahpura Hotels & Resorts", src: "/clients/client-9.webp" },
    { name: "Clarks Group of Hotels", src: "/clients/client-10.webp" },
    { name: "Rajasthali Resort & Spa", src: "/clients/client-11.webp" },
    { name: "Grand Uniara, A Heritage Hotel", src: "/clients/client-12.webp" },
    { name: "Amritara", src: "/clients/client-13.webp" },
    { name: "Desert Springs", src: "/clients/client-14.webp" },
    { name: "The Tree House Resort", src: "/clients/client-15.webp" },
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
  /** Shot in the Great Indoors workshop — the real thing, not a stock portrait. */
  image: "/catalog/brand/tarun-bhatia.webp",
  timeline: "Est. 1993 → Rebranded 2012",
  paragraphs: [
    "A man who started his journey as a wallpaper trader in the old city of Jaipur 33 years ago — riding a bike loaded with catalogs, with uncrushable determination.",
    "In 1993, he opened his first store, Royal Interiors, in Raja Park. After 19 years of tireless efforts, the brand was reborn as Great Indoors in 2012.",
  ],
} as const;
