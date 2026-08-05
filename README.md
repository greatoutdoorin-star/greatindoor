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
| `NEXT_PUBLIC_SUPABASE_URL` | No remote image host allowed; leads are not persisted |
| `SUPABASE_SERVICE_ROLE_KEY` | Leads are logged to the server console instead of stored |

`SUPABASE_SERVICE_ROLE_KEY` is server-only — it must never be prefixed
`NEXT_PUBLIC_`, which would ship it to the browser.

## Where the content lives

| What | Where |
| --- | --- |
| Brand, contact, nav groups, WhatsApp templates | `src/lib/site.ts` |
| Categories, products, clientele, founder copy | `src/lib/seed-data.ts` |
| FAQ content | `src/lib/faqs.ts` |
| Design tokens (colours, type scale, sidebar width) | `src/app/globals.css` |

`src/lib/catalog.ts` is the data access layer. It reads from `seed-data.ts`
today, but every function is already async and shaped for a database — so moving
to Supabase is a change inside that one file, with no page or component touched.

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

## Hero banner

The home hero renders a banner image from `public/catalog/banners/`. Artwork is
composed 2100×1181 with the product on the right and clear space on the left —
`next.config.ts` caps `deviceSizes` at 2100px, so anything wider is wasted bytes.

To swap it, change the one object at the top of `src/components/HeroPanel.tsx`:

```ts
const HERO = {
  src: "/catalog/banners/hero-executive-chair.png",
  tone: "dark",   // "dark" | "light" — must match the artwork
};
```

`tone` is not a preference: it selects the heading colour, the scrim and the
secondary button style. A light banner with `tone: "dark"` renders white text on
a near-white background. Change both fields together.

Banners on hand:

| File | Where | Config |
| --- | --- | --- |
| `hero-executive-chair.png` | hero (live) | `tone: "dark"`, `layout: "side"` |
| `hero-cane-chair-light.png` | hero (spare) | `tone: "light"`, `layout: "side"` |
| `hero-category-row-light.png` | band above the category grid | — |

The category-row artwork is **not** used as a hero. A full-width row of products
has no clear area for overlaid copy, and cropping it to hero proportions cuts
the end products off — so it renders uncropped in `CategoryGrid` instead, where
it can be shown whole. `layout: "top"` exists for banners that do leave space
above, but no current artwork suits it.

## SEO

`LocalBusiness` (as `FurnitureStore`) and `WebSite` JSON-LD render on every
page from the root layout; product pages add `Product` and `BreadcrumbList`.
Builders live in `src/lib/structured-data.ts`.

The `Product` offer carries no `price` — the catalogue is quoted on enquiry, and
a fabricated figure would contradict the visible "Contact for price".

Validate with the [Rich Results Test](https://search.google.com/test/rich-results).

## Not built yet

- **Supabase + admin panel** — content is edited in `seed-data.ts` for now
  (lead storage is wired; content is not)
- **Blog** — the routes exist and render empty; no posts written
- **Product-page lead capture** — the two forms post to `/api/leads`; the
  product WhatsApp button is still a direct link with no server-side trace

## Relationship to Great Outdoor

Great Outdoor is a **separate site, repository and deployment**. The only
connection is outbound: a sidebar button, a grid tile and the "Also love the
outdoors?" section link to greatoutdoor.in, exactly as the live site does. No
shared code, database or credentials.
