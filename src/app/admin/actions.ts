"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminOrThrow } from "@/lib/auth";
import { createClient, createAuthClient } from "@/lib/supabase/server";
import type { Spec } from "@/lib/catalog";

/**
 * Admin mutations.
 *
 * Every exported function here is a public POST endpoint. Next encrypts the
 * action IDs and checks the request Origin, but the route is still reachable
 * by anyone who can replay the request — so each action calls
 * `requireAdminOrThrow()` before touching data. Rendering a form only on an
 * authenticated page is not a security boundary, and the proxy does not cover
 * Server Actions reliably (they POST to whatever route rendered them).
 *
 * Actions take an identifier plus the change, never a whole row from the
 * client: a well-formed object can still name a record the caller should not
 * be able to write.
 *
 * Writes go through the authenticated client, so they run as the signed-in
 * user and the `admin write` RLS policies apply. Postgres rejects an
 * unauthenticated write even if a check here were ever missed — the database
 * is the boundary, not this file.
 */

export type ActionState = { error?: string; ok?: boolean } | undefined;

/**
 * Rebuild the public pages a catalogue change affects.
 *
 * `revalidatePath` rather than revalidateTag: this project has cacheComponents
 * off, so there are no `use cache` tags to invalidate. Dynamic routes need the
 * route pattern plus `"page"`, not a literal URL.
 */
function revalidateCatalog(): void {
  revalidatePath("/");
  revalidatePath("/collections/[slug]", "page");
  revalidatePath("/products/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

/** Slugs are used as primary keys and in URLs, so they are constrained. */
function normaliseSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Split a textarea into trimmed lines, dropping blanks. */
function lines(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Parse the "Label: value" lines of the spec table.
 *
 * Only the first colon splits, so a value may contain colons of its own
 * ("Dimensions: 765 (H) × 355 (L) mm").
 */
function parseDetails(raw: FormDataEntryValue | null): Spec[] {
  return lines(raw)
    .map((line) => {
      const at = line.indexOf(":");
      if (at === -1) return null;
      const label = line.slice(0, at).trim();
      const value = line.slice(at + 1).trim();
      if (!label || !value) return null;
      return { label, value };
    })
    .filter((row): row is Spec => row !== null);
}

function text(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function signOut(): Promise<never> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export async function saveProduct(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  await requireAdminOrThrow();

  const originalSlug = text(form, "originalSlug");
  const slug = normaliseSlug(text(form, "slug"));
  const name = text(form, "name");
  const collection = text(form, "collection");

  if (!name) return { error: "Give the product a name." };
  if (!slug) return { error: "Give the product a URL slug." };
  if (!collection) return { error: "Choose a category." };

  const row = {
    slug,
    name,
    collection,
    badge: text(form, "badge"),
    description: text(form, "description"),
    specs: lines(form.get("specs")),
    details: parseDetails(form.get("details")),
    colours: lines(form.get("colours")),
    size: text(form, "size"),
    images: lines(form.get("images")),
    visible: form.get("visible") === "on",
  };

  const supabase = await createAuthClient();

  // A changed slug is a move, not an insert: update in place so the row keeps
  // its sort order and created_at instead of leaving a duplicate behind.
  const isRename = originalSlug && originalSlug !== slug;

  const { error } = isRename
    ? await supabase.from("products").update(row).eq("slug", originalSlug)
    : await supabase.from("products").upsert(row, { onConflict: "slug" });

  if (error) {
    if (error.code === "23505") {
      return { error: `The slug "${slug}" is already used by another product.` };
    }
    if (error.code === "23503") {
      return { error: `The category "${collection}" does not exist.` };
    }
    return { error: error.message };
  }

  revalidateCatalog();
  redirect(`/admin/products?saved=${encodeURIComponent(slug)}`);
}

export async function setProductVisibility(
  slug: string,
  visible: boolean,
): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase
    .from("products")
    .update({ visible })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateCatalog();
  revalidatePath("/admin/products");
}

export async function deleteProduct(slug: string): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase.from("products").delete().eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateCatalog();
  revalidatePath("/admin/products");
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export async function saveCollection(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  await requireAdminOrThrow();

  const originalSlug = text(form, "originalSlug");
  const slug = normaliseSlug(text(form, "slug"));
  const name = text(form, "name");
  const group = text(form, "group");

  if (!name) return { error: "Give the category a name." };
  if (!slug) return { error: "Give the category a URL slug." };
  if (!["Furniture", "Interiors", "Outdoor"].includes(group)) {
    return { error: "Choose a group." };
  }

  const row = {
    slug,
    name,
    group,
    icon: text(form, "icon"),
    // ImageField posts a newline-separated list even when only one image is
    // wanted, so take the first line rather than the raw value.
    image: lines(form.get("image"))[0] ?? "",
    blurb: text(form, "blurb"),
    visible: form.get("visible") === "on",
  };

  const supabase = await createAuthClient();
  const isRename = originalSlug && originalSlug !== slug;

  // The products.collection foreign key is ON UPDATE CASCADE, so renaming a
  // category slug carries its products across rather than orphaning them.
  const { error } = isRename
    ? await supabase.from("collections").update(row).eq("slug", originalSlug)
    : await supabase.from("collections").upsert(row, { onConflict: "slug" });

  if (error) {
    if (error.code === "23505") {
      return { error: `The slug "${slug}" is already used by another category.` };
    }
    return { error: error.message };
  }

  revalidateCatalog();
  redirect(`/admin/collections?saved=${encodeURIComponent(slug)}`);
}

export async function setCollectionVisibility(
  slug: string,
  visible: boolean,
): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase
    .from("collections")
    .update({ visible })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateCatalog();
  revalidatePath("/admin/collections");
}

export async function deleteCollection(slug: string): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase.from("collections").delete().eq("slug", slug);

  if (error) {
    // The foreign key is ON DELETE RESTRICT, so this is the common case:
    // the category still holds products.
    if (error.code === "23503") {
      throw new Error(
        "This category still has products. Move or delete them first.",
      );
    }
    throw new Error(error.message);
  }

  revalidateCatalog();
  revalidatePath("/admin/collections");
}

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export async function setLeadHandled(
  id: number,
  handled: boolean,
): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase
    .from("leads")
    .update({ handled })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export async function saveSettings(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  await requireAdminOrThrow();

  // Allow-listed: the form posts whatever it posts, and an unbounded loop over
  // FormData would let a crafted request write arbitrary settings keys.
  const KEYS = [
    "announcement_text",
    "whatsapp_number",
    "whatsapp_display",
    "contact_email",
    "contact_phone",
    "contact_address",
    "whatsapp_template_product",
    "whatsapp_template_b2b",
    "whatsapp_template_general",
    "stat_years",
    "stat_categories",
    "stat_projects",
  ];

  const rows = KEYS.filter((key) => form.has(key)).map((key) => ({
    key,
    value: text(form, key),
  }));

  if (rows.length === 0) return { error: "Nothing to save." };

  const number = rows.find((r) => r.key === "whatsapp_number")?.value;
  if (number && !/^\d{10,15}$/.test(number)) {
    return {
      error:
        "WhatsApp number must be digits only, country code first — e.g. 919829012090.",
    };
  }

  const supabase = await createAuthClient();
  const { error } = await supabase
    .from("settings")
    .upsert(rows, { onConflict: "key" });

  if (error) return { error: error.message };

  // Settings feed the shell on every page, so this is a site-wide rebuild.
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Hero slides
// ---------------------------------------------------------------------------

export async function saveHeroSlide(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  await requireAdminOrThrow();

  const image = lines(form.get("image"))[0] ?? "";
  if (!image) return { error: "Add an image for the slide." };

  const rawId = text(form, "id");
  const row = {
    image,
    headline: text(form, "headline") || null,
    subtext: text(form, "subtext") || null,
    link: text(form, "link") || null,
    visible: form.get("visible") === "on",
    sort_order: Number(text(form, "sort_order")) || 0,
  };

  const supabase = await createAuthClient();
  const { error } = rawId
    ? await supabase.from("hero_slides").update(row).eq("id", Number(rawId))
    : await supabase.from("hero_slides").insert(row);

  if (error) return { error: error.message };

  // The hero is on the home page only.
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { ok: true };
}

export async function deleteHeroSlide(id: number): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function setHeroSlideVisibility(
  id: number,
  visible: boolean,
): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase
    .from("hero_slides")
    .update({ visible })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/hero");
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export async function savePost(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  await requireAdminOrThrow();

  const originalSlug = text(form, "originalSlug");
  const slug = normaliseSlug(text(form, "slug"));
  const title = text(form, "title");

  if (!title) return { error: "Give the post a title." };
  if (!slug) return { error: "Give the post a URL slug." };

  // A datetime-local value carries no timezone. Treating it as local time is
  // what the author means by "publish at 9am".
  const publishedRaw = text(form, "published_at");
  let publishedAt: string | null = null;
  if (publishedRaw) {
    const parsed = new Date(publishedRaw);
    if (Number.isNaN(parsed.getTime())) {
      return { error: "That publish date doesn't look right." };
    }
    publishedAt = parsed.toISOString();
  }

  const row = {
    slug,
    title,
    excerpt: text(form, "excerpt"),
    cover: lines(form.get("cover"))[0] || null,
    body: text(form, "body"),
    published_at: publishedAt,
    visible: form.get("visible") === "on",
  };

  const supabase = await createAuthClient();
  const isRename = originalSlug && originalSlug !== slug;

  const { error } = isRename
    ? await supabase.from("posts").update(row).eq("slug", originalSlug)
    : await supabase.from("posts").upsert(row, { onConflict: "slug" });

  if (error) {
    if (error.code === "23505") {
      return { error: `The slug "${slug}" is already used by another post.` };
    }
    return { error: error.message };
  }

  revalidatePath("/blogs");
  revalidatePath("/blogs/[slug]", "page");
  revalidatePath("/sitemap.xml");
  redirect(`/admin/posts?saved=${encodeURIComponent(slug)}`);
}

export async function deletePost(slug: string): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase.from("posts").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidatePath("/blogs");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/posts");
}

export async function setPostVisibility(
  slug: string,
  visible: boolean,
): Promise<void> {
  await requireAdminOrThrow();

  const supabase = await createAuthClient();
  const { error } = await supabase
    .from("posts")
    .update({ visible })
    .eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidatePath("/blogs");
  revalidatePath("/admin/posts");
}
