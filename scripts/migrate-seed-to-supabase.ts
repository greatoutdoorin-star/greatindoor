/**
 * One-time migration: seed-data.ts -> Supabase.
 *
 * Pushes the catalogue that has lived in src/lib/seed-data.ts into the
 * `collections`, `products` and `settings` tables, so the admin panel has
 * something to edit and src/lib/catalog.ts has something to read.
 *
 * Idempotent: every write is an upsert keyed on the primary key, so running it
 * twice changes nothing. That also makes it usable as a "reset to the shipped
 * catalogue" button during development.
 *
 * Run:
 *   node --experimental-strip-types scripts/migrate-seed-to-supabase.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the
 * environment (or .env.local, which is read below). Apply supabase/schema.sql
 * first — this script creates no tables.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

import { COLLECTIONS, PRODUCTS } from "../src/lib/seed-data.ts";
import { HIDDEN_COLLECTIONS } from "../src/lib/site.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Minimal .env.local reader.
 *
 * Next loads .env.local for the app, but this script runs under bare node, so
 * nothing has populated process.env yet. Only fills in what is not already set,
 * so a real environment variable still wins.
 */
function loadEnvLocal(): void {
  const file = path.join(ROOT, ".env.local");
  if (!fs.existsSync(file)) return;

  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i.exec(line);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.trim().replace(/^["']|["']$/g, "");
  }
}

loadEnvLocal();

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_ || !SERVICE_KEY) {
  console.error(
    "Missing credentials. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "SUPABASE_SERVICE_ROLE_KEY in .env.local or the environment.",
  );
  process.exit(1);
}

const supabase = createClient(URL_, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * Settings seeded from the current hard-coded values, so the admin panel opens
 * with the live copy rather than empty fields.
 */
const SETTINGS: Record<string, string> = {
  announcement_text:
    "*Upto 30% off on Bulk & B2B orders  |  100% Customisable  |  Free Site Visit for Projects",
  whatsapp_number: "919829012090",
  whatsapp_display: "+91 98290 12090",
  contact_email: "Tarunroyal@yahoo.co.in",
  contact_phone: "+91 98290 12090",
  contact_address: "272A Frontier Colony, Adarsh Nagar, Jaipur, Rajasthan 302004",
  whatsapp_template_product:
    "Hi, I'd like to enquire about {{name}} ({{qty}} pcs)\n{{url}}",
  whatsapp_template_b2b:
    "Hi, I'd like to enquire about bulk / B2B pricing for Great Indoors.",
  whatsapp_template_general:
    "Hi, I'd like to know more about Great Indoors products.",
  stat_years: "33+",
  stat_categories: "15+",
  stat_projects: "500+",
};

async function main(): Promise<void> {
  console.log(`Target: ${URL_}\n`);

  // ---- Collections -------------------------------------------------------
  // Written first: products carry a foreign key to this table, so the parent
  // rows must exist before any child insert is attempted.
  const collectionRows = COLLECTIONS.map((c, index) => ({
    slug: c.slug,
    name: c.name,
    group: c.group,
    icon: c.icon,
    image: c.image,
    blurb: c.blurb,
    // The HIDDEN_COLLECTIONS array becomes a per-row column.
    visible: !HIDDEN_COLLECTIONS.includes(c.slug),
    sort_order: index,
  }));

  const { error: collectionError } = await supabase
    .from("collections")
    .upsert(collectionRows, { onConflict: "slug" });

  if (collectionError) {
    console.error("collections failed:", collectionError.message);
    process.exit(1);
  }
  console.log(`collections  upserted ${collectionRows.length}`);

  // ---- Products ----------------------------------------------------------
  // sort_order is per collection, so reordering one category in the admin
  // panel cannot disturb the sequence of another.
  const seen = new Map<string, number>();
  const productRows = PRODUCTS.map((p) => {
    const next = seen.get(p.collection) ?? 0;
    seen.set(p.collection, next + 1);

    return {
      slug: p.slug,
      name: p.name,
      collection: p.collection,
      badge: p.badge,
      description: p.description,
      specs: p.specs,
      details: p.details ?? [],
      colours: p.colours ?? [],
      size: p.size ?? "",
      images: p.images,
      visible: true,
      sort_order: next,
    };
  });

  // Chunked: 248 rows in one statement is fine, but this keeps the request
  // under any payload limit if the catalogue grows.
  const CHUNK = 100;
  for (let i = 0; i < productRows.length; i += CHUNK) {
    const slice = productRows.slice(i, i + CHUNK);
    const { error } = await supabase
      .from("products")
      .upsert(slice, { onConflict: "slug" });

    if (error) {
      console.error(`products failed at row ${i}:`, error.message);
      process.exit(1);
    }
  }
  console.log(`products     upserted ${productRows.length}`);

  // ---- Settings ----------------------------------------------------------
  const settingRows = Object.entries(SETTINGS).map(([key, value]) => ({
    key,
    value,
  }));

  const { error: settingsError } = await supabase
    .from("settings")
    .upsert(settingRows, { onConflict: "key" });

  if (settingsError) {
    console.error("settings failed:", settingsError.message);
    process.exit(1);
  }
  console.log(`settings     upserted ${settingRows.length}`);

  // ---- Verify ------------------------------------------------------------
  // Count what actually landed rather than trusting the upserts reported no
  // error. A silent partial write is the failure mode worth catching.
  const [collections, products] = await Promise.all([
    supabase.from("collections").select("slug", { count: "exact", head: true }),
    supabase.from("products").select("slug", { count: "exact", head: true }),
  ]);

  console.log("\nVerification");
  console.log(
    `  collections  ${collections.count} in database, ${COLLECTIONS.length} in seed`,
  );
  console.log(
    `  products     ${products.count} in database, ${PRODUCTS.length} in seed`,
  );

  const ok =
    collections.count === COLLECTIONS.length &&
    products.count === PRODUCTS.length;

  if (!ok) {
    console.error(
      "\nCounts do not match. The database may hold rows the seed no longer " +
        "has (fine if you deleted some in the admin panel), or an upsert was " +
        "dropped (not fine). Inspect before relying on this data.",
    );
    process.exit(1);
  }

  // Spot-check the sub-grouping survived, since it drives the tabbed grid.
  const { count: vg } = await supabase
    .from("products")
    .select("slug", { count: "exact", head: true })
    .eq("size", "50x50 cm");

  console.log(`  50x50 cm     ${vg} (expected 26)`);
  console.log("\nDone.");
}

main().catch((cause) => {
  console.error("Migration failed:", cause);
  process.exit(1);
});
