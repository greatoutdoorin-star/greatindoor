import type { MetadataRoute } from "next";
import { getAllProducts, getCollections, getPosts } from "@/lib/catalog";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://greatindoor.in";

/**
 * Static routes, with the home page weighted highest.
 *
 * Every path here must have a matching route under src/app — a 404 in the
 * sitemap is a crawl error in Search Console, so add the page before the entry.
 */
const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/collections/all", priority: 0.9 },
  { path: "/blogs", priority: 0.6 },
  { path: "/pages/about", priority: 0.7 },
  { path: "/pages/b2b-leads", priority: 0.8 },
  { path: "/pages/faqs", priority: 0.6 },
  { path: "/pages/contact", priority: 0.6 },
  { path: "/pages/privacy-policy", priority: 0.3 },
];

/**
 * Stamped once per build rather than per request. Using `new Date()` inline
 * would move every `lastModified` on each rebuild, which teaches crawlers the
 * dates are noise and gets them ignored.
 */
const BUILD_TIME = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections, posts] = await Promise.all([
    getAllProducts(),
    getCollections(),
    getPosts(),
  ]);

  return [
    ...STATIC_PATHS.map((s) => ({
      url: `${BASE}${s.path}`,
      lastModified: BUILD_TIME,
      priority: s.priority,
    })),
    ...collections.map((c) => ({
      url: `${BASE}/collections/${c.slug}`,
      lastModified: BUILD_TIME,
      priority: 0.9,
    })),
    ...products.map((p) => ({
      url: `${BASE}/products/${p.slug}`,
      lastModified: BUILD_TIME,
      priority: 0.8,
    })),
    // Posts carry a real publish date, so they get an honest one.
    ...posts.map((p) => ({
      url: `${BASE}/blogs/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : BUILD_TIME,
      priority: 0.5,
    })),
  ];
}
