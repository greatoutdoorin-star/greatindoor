import { createAuthClient } from "./supabase/server";
import type { Collection, Product, Spec } from "./catalog";

/**
 * Admin-side reads.
 *
 * Separate from src/lib/catalog.ts because the two want opposite things: the
 * public site reads only visible rows and falls back to the seed file when the
 * database is unreachable, while the admin panel needs every row — including
 * hidden ones — and must surface a failure rather than quietly showing seed
 * data the admin cannot actually edit.
 *
 * Every function reads as the signed-in admin, so RLS applies: leads are
 * readable only by `authenticated`, and an unauthenticated caller gets nothing
 * back rather than the whole inbox. Callers should still establish the visitor
 * is an admin first (see requireAdmin in src/lib/auth.ts) so the page
 * redirects rather than rendering empty.
 */

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** A product row as the admin sees it — with the fields the site hides. */
export type AdminProduct = Product & {
  visible: boolean;
  sortOrder: number;
};

export type AdminCollection = Collection & {
  sortOrder: number;
};

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
  visible: boolean;
  sort_order: number;
};

function toAdminProduct(row: ProductRow): AdminProduct {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    collection: row.collection,
    badge: row.badge,
    specs: row.specs ?? [],
    details: row.details ?? [],
    colours: row.colours ?? [],
    size: row.size ?? "",
    images: row.images ?? [],
    visible: row.visible,
    sortOrder: row.sort_order,
  };
}

const PRODUCT_COLUMNS =
  "slug, name, description, collection, badge, specs, details, colours, size, images, visible, sort_order";

export async function listProducts(): Promise<AdminProduct[]> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("collection", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Could not load products: ${error.message}`);
  return (data as ProductRow[]).map(toAdminProduct);
}

export async function getAdminProduct(
  slug: string,
): Promise<AdminProduct | null> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Could not load product: ${error.message}`);
  return data ? toAdminProduct(data as ProductRow) : null;
}

export async function listCollections(): Promise<AdminCollection[]> {
  const supabase = await createAuthClient();

  const [collections, products] = await Promise.all([
    supabase
      .from("collections")
      .select("slug, name, group, icon, image, blurb, visible, sort_order")
      .order("sort_order", { ascending: true }),
    supabase.from("products").select("collection"),
  ]);

  if (collections.error) {
    throw new Error(`Could not load collections: ${collections.error.message}`);
  }

  const counts = new Map<string, number>();
  for (const row of (products.data ?? []) as { collection: string }[]) {
    counts.set(row.collection, (counts.get(row.collection) ?? 0) + 1);
  }

  type Row = {
    slug: string;
    name: string;
    group: string;
    icon: string;
    image: string;
    blurb: string;
    visible: boolean;
    sort_order: number;
  };

  return (collections.data as Row[]).map((c) => ({
    slug: c.slug,
    name: c.name,
    group: c.group,
    icon: c.icon,
    image: c.image,
    blurb: c.blurb,
    visible: c.visible,
    count: counts.get(c.slug) ?? 0,
    sortOrder: c.sort_order,
  }));
}

export async function getAdminCollection(
  slug: string,
): Promise<AdminCollection | null> {
  const all = await listCollections();
  return all.find((c) => c.slug === slug) ?? null;
}

export type Lead = {
  id: number;
  createdAt: string;
  source: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  city: string | null;
  message: string | null;
  product: string | null;
  handled: boolean;
};

export async function listLeads(limit = 200): Promise<Lead[]> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, created_at, source, name, phone, email, company, city, message, product, handled",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Could not load leads: ${error.message}`);

  type Row = Omit<Lead, "createdAt"> & { created_at: string };
  return (data as Row[]).map((l) => ({
    id: l.id,
    createdAt: l.created_at,
    source: l.source,
    name: l.name,
    phone: l.phone,
    email: l.email,
    company: l.company,
    city: l.city,
    message: l.message,
    product: l.product,
    handled: l.handled,
  }));
}

export async function getAdminSettings(): Promise<Record<string, string>> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase.from("settings").select("key, value");

  if (error) throw new Error(`Could not load settings: ${error.message}`);

  const settings: Record<string, string> = {};
  for (const row of (data ?? []) as { key: string; value: string }[]) {
    settings[row.key] = row.value;
  }
  return settings;
}

/** Dashboard counts, in one round trip each. */
export async function getDashboardStats(): Promise<{
  products: number;
  hiddenProducts: number;
  collections: number;
  leads: number;
  newLeads: number;
}> {
  const supabase = await createAuthClient();

  const [products, hidden, collections, leads, newLeads] = await Promise.all([
    supabase.from("products").select("slug", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("slug", { count: "exact", head: true })
      .eq("visible", false),
    supabase.from("collections").select("slug", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("handled", false),
  ]);

  return {
    products: products.count ?? 0,
    hiddenProducts: hidden.count ?? 0,
    collections: collections.count ?? 0,
    leads: leads.count ?? 0,
    newLeads: newLeads.count ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Hero slides
// ---------------------------------------------------------------------------

export type AdminHeroSlide = {
  id: number;
  image: string;
  headline: string;
  subtext: string;
  link: string;
  visible: boolean;
  sortOrder: number;
};

export async function listHeroSlides(): Promise<AdminHeroSlide[]> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("id, image, headline, subtext, link, visible, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`Could not load hero slides: ${error.message}`);

  type Row = {
    id: number;
    image: string;
    headline: string | null;
    subtext: string | null;
    link: string | null;
    visible: boolean;
    sort_order: number;
  };

  return (data as Row[]).map((s) => ({
    id: s.id,
    image: s.image,
    headline: s.headline ?? "",
    subtext: s.subtext ?? "",
    link: s.link ?? "",
    visible: s.visible,
    sortOrder: s.sort_order,
  }));
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export type AdminPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  body: string;
  /** ISO string, or empty when the post is still a draft. */
  publishedAt: string;
  visible: boolean;
};

type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string | null;
  body: string;
  published_at: string | null;
  visible: boolean;
};

function toAdminPost(row: PostRow): AdminPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    cover: row.cover ?? "",
    body: row.body,
    publishedAt: row.published_at ?? "",
    visible: row.visible,
  };
}

const POST_COLUMNS = "slug, title, excerpt, cover, body, published_at, visible";

export async function listPosts(): Promise<AdminPost[]> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    // Drafts (null published_at) sort first, where they need attention.
    .order("published_at", { ascending: false, nullsFirst: true });

  if (error) throw new Error(`Could not load posts: ${error.message}`);
  return (data as PostRow[]).map(toAdminPost);
}

export async function getAdminPost(slug: string): Promise<AdminPost | null> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Could not load post: ${error.message}`);
  return data ? toAdminPost(data as PostRow) : null;
}
