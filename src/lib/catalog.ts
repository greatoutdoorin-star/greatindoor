import { cache } from "react";
import { COLLECTIONS, PRODUCTS } from "./seed-data";

/**
 * Data access layer.
 *
 * Currently backed by the local seed file. Every function is async and shaped
 * exactly as the Supabase-backed version, so moving to the database is a
 * change inside this file only — no page or component has to be touched.
 */

export type Product = {
  slug: string;
  name: string;
  description: string;
  collection: string;
  badge: string;
  specs: string[];
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
};

export type HeroSlide = {
  image: string;
  headline: string | null;
  subtext: string | null;
  link: string | null;
};

/**
 * All active products.
 *
 * `cache()` dedupes across a single render pass, so a page needing both the nav
 * collections and a product list resolves the list once.
 */
export const getAllProducts = cache(async (): Promise<Product[]> => {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    collection: p.collection,
    badge: p.badge,
    specs: p.specs,
    images: p.images,
  }));
});

/**
 * Collections for the nav and the category grid.
 *
 * Unlike the outdoor site these are NOT filtered by product count — the live
 * site lists all 15 categories whether or not a product sits under each one,
 * because the enquiry is for the category as much as the item.
 */
export const getCollections = cache(async (): Promise<Collection[]> => {
  const products = await getAllProducts();
  return COLLECTIONS.map((c) => ({
    ...c,
    count: products.filter((p) => p.collection === c.slug).length,
  }));
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
    };
  }
  const collections = await getCollections();
  return collections.find((c) => c.slug === slug);
}

/** Related products: same collection first, then anything else, excluding self. */
export async function getRelatedProducts(
  product: Product,
  limit = 8,
): Promise<Product[]> {
  const products = await getAllProducts();
  const same = products.filter(
    (p) => p.collection === product.collection && p.slug !== product.slug,
  );
  const others = products.filter(
    (p) => p.collection !== product.collection && p.slug !== product.slug,
  );
  return [...same, ...others].slice(0, limit);
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
 * Editable settings. Reads from the seed defaults today; once Supabase is
 * connected this becomes the `settings` table lookup.
 */
export const getSettings = cache(
  async (): Promise<Record<string, string>> => ({
    announcement_text:
      "*Upto 30% off on Bulk & B2B orders  |  100% Customisable  |  Free Site Visit for Projects",
  }),
);
