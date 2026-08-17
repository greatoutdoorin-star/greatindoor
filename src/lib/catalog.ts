import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { COLLECTIONS, PRODUCTS } from "./seed-data";
import { HIDDEN_COLLECTIONS } from "./site";

/**
 * Data access layer.
 *
 * Reads the catalogue from Supabase, falling back to the seed file in
 * src/lib/seed-data.ts when the database is unreachable or unconfigured.
 *
 * The fallback is not a convenience — it is what keeps a database outage from
 * blanking the shop. Pages are statically generated, so a failed read at build
 * time would otherwise bake empty listings into every page. It also means the
 * project still clones and runs with no environment variables at all.
 *
 * Every function is async and returns the same shapes it always has, so no
 * page or component changed when this moved off the seed file.
 */

/**
 * Read-only Supabase client.
 *
 * Uses the anon key: the schema grants anon SELECT on collections, products
 * and settings, and nothing else. Writes go through the service-role client in
 * src/lib/supabase/admin.ts, behind an admin check.
 *
 * Deliberately not the cookie-aware client from supabase/server.ts — that one
 * calls `cookies()`, which is a request-time API and would opt every page that
 * reads the catalogue out of static generation.
 */
function readClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Shape of a `products` row, before normalising into a `Product`. */
type ProductRow = {
  slug: string;
  name: string;
  description: string;
  collection: string;
  badge: string;
  specs: string[] | null;
  details: Spec[] | null;
  colours: string[] | null;
  size: string | null;
  images: string[] | null;
};

/** Shape of a `collections` row. */
type CollectionRow = {
  slug: string;
  name: string;
  group: string;
  icon: string;
  image: string;
  blurb: string;
  visible: boolean;
};

/** The seed catalogue, in the same shape a database read produces. */
function seedProducts(): Product[] {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    collection: p.collection,
    badge: p.badge,
    specs: p.specs,
    // Optional in the seed file; normalised to arrays here so consumers never
    // have to guard against undefined.
    details: p.details ?? [],
    colours: p.colours ?? [],
    size: p.size ?? "",
    images: p.images,
  }));
}

/**
 * A single labelled specification, e.g. { label: "Dimensions", value: "765 (H)
 * × 355 (L) × 403 (W) mm" }.
 *
 * Structured rather than a pre-formatted sentence so the product page can lay
 * specs out as a table, and so a value stays machine-readable for the Product
 * JSON-LD.
 */
export type Spec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  description: string;
  collection: string;
  badge: string;
  /**
   * Free-form selling points, shown as a bulleted list. Kept alongside
   * `details` because not every claim ("Installation included within Jaipur")
   * is a label/value pair.
   */
  specs: string[];
  /** Tabulated specifications from the supplier catalogue. */
  details: Spec[];
  /** Finish/colour options, listed as text — the choice is made on WhatsApp. */
  colours: string[];
  /**
   * Sub-group within the collection, e.g. a panel size. Empty for products in
   * collections that are not sub-divided.
   */
  size: string;
  images: string[];
};

export type Collection = {
  slug: string;
  name: string;
  group: string;
  icon: string;
  image: string;
  blurb: string;
  count: number;
  /**
   * Whether the collection appears in browsing UI. Its pages are built either
   * way — see getVisibleCollections.
   */
  visible: boolean;
};

export type HeroSlide = {
  image: string;
  headline: string | null;
  subtext: string | null;
  link: string | null;
};

/**
 * All active products, hidden ones excluded.
 *
 * `cache()` dedupes across a single render pass, so a page needing both the nav
 * collections and a product list resolves the list once.
 */
export const getAllProducts = cache(async (): Promise<Product[]> => {
  const supabase = readClient();
  if (!supabase) return seedProducts();

  const { data, error } = await supabase
    .from("products")
    .select(
      "slug, name, description, collection, badge, specs, details, colours, size, images",
    )
    .eq("visible", true)
    .order("collection", { ascending: true })
    .order("sort_order", { ascending: true });

  // An empty table is a legitimate state only if someone deleted everything;
  // far more likely it means the migration has not run yet. Either way the
  // seed is the safer thing to render than a blank shop.
  if (error || !data || data.length === 0) {
    if (error) console.error("[catalog] products read failed:", error.message);
    return seedProducts();
  }

  return (data as ProductRow[]).map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    collection: p.collection,
    badge: p.badge,
    // Postgres nulls normalised the same way the seed's optionals are, so
    // consumers never have to guard.
    specs: p.specs ?? [],
    details: p.details ?? [],
    colours: p.colours ?? [],
    size: p.size ?? "",
    images: p.images ?? [],
  }));
});

/**
 * Every collection, including hidden ones.
 *
 * NOT filtered by product count — the live site lists all categories whether
 * or not a product sits under each one, because the enquiry is for the
 * category as much as the item.
 */
export const getCollections = cache(async (): Promise<Collection[]> => {
  const products = await getAllProducts();
  const count = (slug: string) =>
    products.filter((p) => p.collection === slug).length;

  const supabase = readClient();

  // Seed fallback: visibility comes from the static HIDDEN_COLLECTIONS list,
  // which is what that array exists for.
  const fromSeed = () =>
    COLLECTIONS.map((c) => ({
      ...c,
      count: count(c.slug),
      visible: !HIDDEN_COLLECTIONS.includes(c.slug),
    }));

  if (!supabase) return fromSeed();

  const { data, error } = await supabase
    .from("collections")
    .select("slug, name, group, icon, image, blurb, visible")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) {
      console.error("[catalog] collections read failed:", error.message);
    }
    return fromSeed();
  }

  return (data as CollectionRow[]).map((c) => ({
    slug: c.slug,
    name: c.name,
    group: c.group,
    icon: c.icon,
    image: c.image,
    blurb: c.blurb,
    count: count(c.slug),
    visible: c.visible,
  }));
});

/**
 * Collections shown in browsing UI — the rail, the home grid, the ticker.
 *
 * Deliberately separate from `getCollections()`, which still returns every
 * collection: that one feeds `generateStaticParams` and the sitemap, so
 * filtering it would stop building the hidden pages and 404 any inbound link
 * to them. Hidden categories stay reachable, just not advertised.
 *
 * Filters the list `getCollections()` already resolved rather than issuing its
 * own query — a second read could disagree with the first if one source fell
 * back to the seed and the other did not.
 */
export const getVisibleCollections = cache(async (): Promise<Collection[]> => {
  const collections = await getCollections();
  return collections.filter((c) => c.visible);
});

export async function getProductsByCollection(
  slug: string,
): Promise<Product[]> {
  const products = await getAllProducts();
  if (slug === "all") return products;
  return products.filter((p) => p.collection === slug);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getCollection(
  slug: string,
): Promise<Collection | undefined> {
  if (slug === "all") {
    const products = await getAllProducts();
    return {
      slug: "all",
      name: "All Products",
      group: "",
      icon: "",
      image: "",
      blurb: "Every category we supply and install.",
      count: products.length,
      visible: true,
    };
  }
  const collections = await getCollections();
  return collections.find((c) => c.slug === slug);
}

/**
 * Related products — same collection only, excluding the product itself.
 *
 * Deliberately not padded out to `limit` with unrelated items: with a catalogue
 * this small that meant a Chesterfield sofa recommending luxury tents. An empty
 * result is fine — the product page hides the section entirely.
 */
export async function getRelatedProducts(
  product: Product,
  limit = 8,
): Promise<Product[]> {
  const products = await getAllProducts();
  return products
    .filter(
      (p) => p.collection === product.collection && p.slug !== product.slug,
    )
    .slice(0, limit);
}

/**
 * Hero slides. The live site's hero is a single static dark panel rather than a
 * carousel, so this returns nothing for now — HeroPanel renders the fixed
 * composition. Kept so the signature survives the move to Supabase.
 */
export const getHeroSlides = cache(async (): Promise<HeroSlide[]> => []);

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string | null;
  body: string;
  publishedAt: string | null;
};

/** No posts yet — the blog ships empty until content is written. */
export const getPosts = cache(async (): Promise<Post[]> => []);

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Build-time defaults for editable settings.
 *
 * Also the fallback when Supabase is unreachable, so the announcement band and
 * WhatsApp CTA never render blank.
 */
export const DEFAULT_SETTINGS: Record<string, string> = {
  announcement_text:
    "*Upto 30% off on Bulk & B2B orders  |  100% Customisable  |  Free Site Visit for Projects",
};

/**
 * Editable settings, merged over the defaults.
 *
 * Merged rather than replaced: a key the admin has never touched keeps its
 * default instead of coming back undefined.
 */
export const getSettings = cache(
  async (): Promise<Record<string, string>> => {
    const supabase = readClient();
    if (!supabase) return { ...DEFAULT_SETTINGS };

    const { data, error } = await supabase.from("settings").select("key, value");

    if (error || !data) {
      if (error) console.error("[catalog] settings read failed:", error.message);
      return { ...DEFAULT_SETTINGS };
    }

    const settings = { ...DEFAULT_SETTINGS };
    for (const row of data as { key: string; value: string }[]) {
      // Skip blanks so an empty field in the admin panel doesn't wipe a
      // default and leave, say, the WhatsApp template empty.
      if (row.value) settings[row.key] = row.value;
    }
    return settings;
  },
);
