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

No environment variables are required yet.

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
sidebar  230px     display: Playfair Display   body: DM Sans
```

## Images

`public/products/` holds 11 product photos pulled from the live site. There is
no category photography: the live site serves one identical placeholder for all
15 categories (verified by hashing — 17 files, one image), so `CategoryGrid`
falls back to each category's icon on a tinted panel. Drop real photos into
`public/categories/` and set the `image` path in `seed-data.ts` to use them.

Executive Leather Chair also has no photo for the same reason, and shows a
"Photo coming soon" panel.

## Not built yet

- **Supabase + admin panel** — content is edited in `seed-data.ts` for now
- **Blog** — the routes exist and render empty; no posts written
- **Enquiry logging** — WhatsApp clicks leave no server-side trace

## Relationship to Great Outdoor

Great Outdoor is a **separate site, repository and deployment**. The only
connection is outbound: a sidebar button, a grid tile and the "Also love the
outdoors?" section link to greatoutdoor.in, exactly as the live site does. No
shared code, database or credentials.
