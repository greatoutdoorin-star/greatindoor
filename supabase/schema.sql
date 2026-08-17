-- Great Indoors — database schema.
--
-- Run this once against a fresh Supabase project (SQL Editor, or
-- `supabase db push`). It is written to be re-runnable: every object uses
-- `if not exists` or is dropped first, so applying it twice is harmless.
--
-- The column shapes deliberately mirror the TypeScript types in
-- src/lib/seed-data.ts (SeedCollection, SeedProduct). Keeping them aligned is
-- what lets src/lib/catalog.ts swap its data source without any page or
-- component changing.

-- ---------------------------------------------------------------------------
-- Collections
-- ---------------------------------------------------------------------------

create table if not exists collections (
  slug        text primary key,
  name        text not null,
  -- Sidebar grouping. Constrained to the three the site renders, so a typo in
  -- the admin panel cannot create a fourth orphan group that nothing displays.
  "group"     text not null check ("group" in ('Furniture', 'Interiors', 'Outdoor')),
  icon        text not null default '',
  -- Category photo. May be empty: CategoryGrid falls back to the icon.
  image       text not null default '',
  blurb       text not null default '',
  -- Replaces the HIDDEN_COLLECTIONS array in src/lib/site.ts. Hidden
  -- collections are dropped from browsing UI but their pages still build, so
  -- no inbound link 404s — the same behaviour that array had.
  visible     boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------

create table if not exists products (
  slug        text primary key,
  name        text not null,
  -- on delete restrict: deleting a category that still holds products would
  -- silently orphan them out of every listing. The admin panel must move or
  -- remove the products first, and the database enforces it.
  collection  text not null references collections (slug) on update cascade on delete restrict,
  badge       text not null default '',
  description text not null default '',
  -- Free-form selling points, shown as a bulleted list.
  specs       text[] not null default '{}',
  -- Tabulated {label, value} rows. jsonb rather than two parallel arrays so
  -- the pairing and the catalogue's own row order both survive a round trip.
  details     jsonb not null default '[]'::jsonb,
  colours     text[] not null default '{}',
  -- Sub-group within a collection, e.g. the vertical garden panel sizes. When
  -- products in a collection carry this, the collection page tabs by it.
  size        text not null default '',
  images      text[] not null default '{}',
  visible     boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists products_collection_idx on products (collection);
create index if not exists products_sort_idx on products (collection, sort_order);

-- ---------------------------------------------------------------------------
-- Settings
--
-- Flat key/value rather than a one-row table: the admin panel edits a handful
-- of unrelated strings (WhatsApp number, announcement text, contact details),
-- and adding another is an insert instead of a migration.
-- ---------------------------------------------------------------------------

create table if not exists settings (
  key         text primary key,
  value       text not null default '',
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Leads
--
-- Already written to by src/lib/leads.ts via the service role. `handled` and
-- `notes` are added here for the admin inbox; the insert path ignores them.
-- ---------------------------------------------------------------------------

create table if not exists leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  source      text not null check (source in ('contact', 'b2b', 'product')),
  name        text not null,
  phone       text not null,
  email       text,
  company     text,
  city        text,
  message     text,
  product     text,
  handled     boolean not null default false,
  notes       text
);

create index if not exists leads_created_idx on leads (created_at desc);
create index if not exists leads_handled_idx on leads (handled, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists collections_updated_at on collections;
create trigger collections_updated_at before update on collections
  for each row execute function set_updated_at();

drop trigger if exists products_updated_at on products;
create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

drop trigger if exists settings_updated_at on settings;
create trigger settings_updated_at before update on settings
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
--
-- Every table has RLS on. The site reads catalogue data with the anon key, so
-- collections/products/settings allow anonymous SELECT and nothing else.
--
-- Leads are readable ONLY by an authenticated admin — an enquiry carries a
-- name and phone number, and the anon key ships to the browser.
--
-- All writes go through the service role, which bypasses RLS entirely. There
-- is deliberately no anon or authenticated write policy anywhere.
-- ---------------------------------------------------------------------------

alter table collections enable row level security;
alter table products    enable row level security;
alter table settings    enable row level security;
alter table leads       enable row level security;

drop policy if exists "public read collections" on collections;
create policy "public read collections" on collections
  for select to anon, authenticated using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products
  for select to anon, authenticated using (true);

drop policy if exists "public read settings" on settings;
create policy "public read settings" on settings
  for select to anon, authenticated using (true);

-- Signed-in admins only. No anon policy: leads must never be publicly readable.
drop policy if exists "admins read leads" on leads;
create policy "admins read leads" on leads
  for select to authenticated using (true);

-- ---------------------------------------------------------------------------
-- Storage
--
-- Admin image uploads. Public read so next/image can fetch them — the host is
-- already whitelisted in next.config.ts. Writes are service-role only.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('catalog', 'catalog', true)
on conflict (id) do nothing;

drop policy if exists "public read catalog images" on storage.objects;
create policy "public read catalog images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'catalog');
