# Great Indoors

Lead-generation site for [greatindoor.in](https://greatindoor.in) — furniture,
interiors and outdoor structures, supplied and installed from Jaipur since 1993.

Built with Next.js 16 (App Router, Turbopack), TypeScript and Tailwind v4.

## Conversion model

There is no cart, no checkout and no customer login. Every commerce affordance
is a WhatsApp deep link, and products show **"Contact for price"** rather than a
figure — almost everything is made to order, so dimensions, fabric, finish and
quantity all change the cost.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

No environment variables are required to run the site. These are optional:

| Variable | Effect if unset |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs fall back to `SITE.url` |
| `NEXT_PUBLIC_SUPABASE_URL` | Catalogue reads fall back to `seed-data.ts`; no admin panel |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | As above — both are needed for any database read |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin panel cannot write; leads log to the console |

`SUPABASE_SERVICE_ROLE_KEY` is server-only — it must never be prefixed
`NEXT_PUBLIC_`, which would ship it to the browser.

## Admin panel

`/admin` is a Supabase-backed CMS for products, categories, hero slides, blog
posts, settings and the lead inbox. It mirrors the sister site's admin, so the
two are one system to operate. Setup:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor. It creates the tables, RLS
   policies and the `catalog` storage bucket, and is safe to re-run.
3. Put the three variables above in `.env.local`.
4. Migrate the shipped catalogue into the database:
   ```bash
   node --experimental-strip-types scripts/migrate-seed-to-supabase.ts
   ```
   Idempotent — it upserts on `slug`, so re-running it restores the shipped
   catalogue over any edits.
5. Create an admin user under **Authentication → Users** in the Supabase
   dashboard. There is no sign-up route by design.

### How it holds together

`src/lib/catalog.ts` reads Supabase and **falls back to `seed-data.ts`** on any
failure. That is deliberate: pages are statically generated, so a failed read at
build time would otherwise bake empty listings into the whole site. It also
means the repo still clones and runs with no credentials at all.

Public pages stay static. Saving in the admin panel calls `revalidatePath`, so
the affected pages regenerate within seconds rather than every visitor paying
for a database round trip.

Security has three layers, deliberately:

1. **RLS in Postgres.** Writes are granted to `authenticated` only, so admin
   mutations run as the signed-in user and the database rejects an
   unauthenticated write outright. Leads are readable only by an admin.
2. **`src/lib/auth.ts`**, called at the top of every admin page, Server Action
   and API route.
3. **`src/proxy.ts`** (Next 16's renamed `middleware.ts`, beside `app/`) does
   the cheap redirect. Only a convenience — Next's docs are explicit that proxy
   is an optimistic check, and that Server Actions POST to whatever route
   rendered them, so a matcher change can silently remove its coverage.

The service-role client bypasses RLS and is reserved for lead intake, where
there is no user session to act as.

Admin pages live under `src/app/admin/(protected)/`, whose layout holds the
auth gate and `force-dynamic`. The login page sits outside that group so it can
render while signed out.

Images already in `public/catalog/` keep working; uploads go to Supabase
Storage, whose host `next.config.ts` already whitelists.

## Where the content lives

| What | Where |
| --- | --- |
| Brand, contact, nav groups, WhatsApp templates | `src/lib/site.ts` |
| Categories, products, clientele, founder copy | `src/lib/seed-data.ts` |
| FAQ content | `src/lib/faqs.ts` |
| Design tokens (colours, type scale, sidebar width) | `src/app/globals.css` |

`src/lib/catalog.ts` is the data access layer. It reads Supabase and falls back
to `seed-data.ts`, so the table above describes the fallback content — anything
managed in `/admin` is edited there, not in code.

## Design tokens

Taken from the live site's own stylesheet rather than estimated from
screenshots:

```
--orange #E8622A   --dark #1a1a1a
--warm   #f5f0e8   --warm2 #ede6d8   --warm3 #e0d6c4
sidebar  230px     display: Montserrat   body: Poppins
```

## Images

`public/products/` holds 11 product photos pulled from the live site. There is
no category photography: the live site serves one identical placeholder for all
15 categories (verified by hashing — 17 files, one image), so `CategoryGrid`
falls back to each category's icon on a tinted panel. Drop real photos into
`public/categories/` and set the `image` path in `seed-data.ts` to use them.

Executive Leather Chair also has no photo for the same reason, and shows a
"Photo coming soon" panel.

## Lead capture

Both enquiry forms POST to `/api/leads` before opening WhatsApp, so an enquiry
survives even if the visitor never sends the drafted message. The write is
fire-and-forget and never blocks the handoff.

With Supabase credentials set, leads insert into a `leads` table:

```sql
create table leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  source      text not null check (source in ('contact', 'b2b', 'product')),
  name        text not null,
  phone       text not null,
  email       text,
  company     text,
  city        text,
  message     text,
  product     text
);
alter table leads enable row level security;   -- writes use the service role
```

Without them, leads are logged to the server console (`[lead] {...}`) and the
form still works — enabling persistence is an env-var change, not a code change.

## Hero

The home hero is a slider. Slides are managed in **`/admin/hero`**; with none
in the database `HeroPanel` renders its own built-in artwork from
`public/catalog/banners/`, so the page is never blank.

Artwork is 16:9 and the frame uses that aspect, so nothing is cropped.
`next.config.ts` caps `deviceSizes` at 2100px — anything wider is wasted bytes.

The slides carry their own baked-in wording, so nothing is overlaid on them: no
headline, no buttons, no scrim. The headline and subtext fields exist for
artwork that leaves clear space, and the headline doubles as alt text.

## SEO

`LocalBusiness` (as `FurnitureStore`) and `WebSite` JSON-LD render on every
page from the root layout; product pages add `Product` and `BreadcrumbList`.
Builders live in `src/lib/structured-data.ts`.

The `Product` offer carries no `price` — the catalogue is quoted on enquiry, and
a fabricated figure would contradict the visible "Contact for price".

Validate with the [Rich Results Test](https://search.google.com/test/rich-results).

## Not built yet

- **Blog** — the routes and the admin editor exist; no posts written yet
- **Product-page lead capture** — the two forms post to `/api/leads`; the
  product WhatsApp button is still a direct link with no server-side trace
- **Admin-editable home content** — clientele logos, founder copy, services and
  values still live in `seed-data.ts`, and the FAQs in `faqs.ts`. Products,
  categories, hero slides, posts and settings are in the database; these are
  not.
- **Drag-to-reorder** — `sort_order` exists on both tables and is respected on
  read, but the admin panel has no UI to change it yet

## Relationship to Great Outdoor

Great Outdoor is a **separate site, repository and deployment**. The only
connection is outbound: a sidebar button, a grid tile and the "Also love the
outdoors?" section link to greatoutdoor.in, exactly as the live site does. No
shared code, database or credentials.
