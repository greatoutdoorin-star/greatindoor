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
-- Hero slides
--
-- The home hero. Ships empty: HeroPanel falls back to its built-in slides when
-- no rows exist, so the site works before anything is added here.
-- ---------------------------------------------------------------------------

create table if not exists hero_slides (
  id          bigint generated always as identity primary key,
  image       text not null,
  headline    text,
  subtext     text,
  link        text,
  visible     boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Blog posts
--
-- /blogs and /blogs/[slug] already render; they have simply had nothing to
-- show. A row with published_at in the future, or null, stays unpublished.
-- ---------------------------------------------------------------------------

create table if not exists posts (
  slug          text primary key,
  title         text not null,
  excerpt       text not null default '',
  cover         text,
  body          text not null default '',
  published_at  timestamptz,
  visible       boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_published_idx on posts (published_at desc);

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

drop trigger if exists hero_slides_updated_at on hero_slides;
create trigger hero_slides_updated_at before update on hero_slides
  for each row execute function set_updated_at();

drop trigger if exists posts_updated_at on posts;
create trigger posts_updated_at before update on posts
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
--
-- Every table has RLS on.
--
-- Reads: the public site uses the anon key, so catalogue content is
-- world-readable. Leads are the exception — an enquiry carries a name and
-- phone number, and the anon key ships to the browser, so only a signed-in
-- admin may read them.
--
-- Writes: allowed for `authenticated` only. This is what makes the database
-- itself the security boundary rather than the UI — an unauthenticated caller
-- POSTing straight to a Server Action is rejected by Postgres, not merely by
-- the admin panel declining to render a form.
-- ---------------------------------------------------------------------------

alter table collections  enable row level security;
alter table products     enable row level security;
alter table hero_slides  enable row level security;
alter table posts        enable row level security;
alter table settings     enable row level security;
alter table leads        enable row level security;

-- Public read.
drop policy if exists "public read collections" on collections;
create policy "public read collections" on collections
  for select to anon, authenticated using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products
  for select to anon, authenticated using (true);

drop policy if exists "public read hero_slides" on hero_slides;
create policy "public read hero_slides" on hero_slides
  for select to anon, authenticated using (true);

drop policy if exists "public read posts" on posts;
create policy "public read posts" on posts
  for select to anon, authenticated using (true);

drop policy if exists "public read settings" on settings;
create policy "public read settings" on settings
  for select to anon, authenticated using (true);

-- Admin write. `for all` covers insert, update and delete.
drop policy if exists "admin write collections" on collections;
create policy "admin write collections" on collections
  for all to authenticated using (true) with check (true);

drop policy if exists "admin write products" on products;
create policy "admin write products" on products
  for all to authenticated using (true) with check (true);

drop policy if exists "admin write hero_slides" on hero_slides;
create policy "admin write hero_slides" on hero_slides
  for all to authenticated using (true) with check (true);

drop policy if exists "admin write posts" on posts;
create policy "admin write posts" on posts
  for all to authenticated using (true) with check (true);

drop policy if exists "admin write settings" on settings;
create policy "admin write settings" on settings
  for all to authenticated using (true) with check (true);

-- Leads: signed-in admins only, for both reading and updating (the inbox
-- marks them handled). Inserts still arrive through the service role in
-- src/lib/leads.ts, which bypasses RLS — deliberately, so the public enquiry
-- form never needs a write policy of its own.
drop policy if exists "admins read leads" on leads;
create policy "admins read leads" on leads
  for select to authenticated using (true);

drop policy if exists "admins update leads" on leads;
create policy "admins update leads" on leads
  for update to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage
--
-- Admin image uploads. Public read so next/image can fetch them — the host is
-- already whitelisted in next.config.ts.
--
-- Writes are restricted to signed-in admins here as well as in the upload
-- route, so a leaked anon key still cannot put objects in the bucket.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('catalog', 'catalog', true)
on conflict (id) do update set public = true;

drop policy if exists "public read catalog images" on storage.objects;
create policy "public read catalog images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'catalog');

drop policy if exists "admin upload catalog images" on storage.objects;
create policy "admin upload catalog images" on storage.objects
  for insert to authenticated with check (bucket_id = 'catalog');

drop policy if exists "admin update catalog images" on storage.objects;
create policy "admin update catalog images" on storage.objects
  for update to authenticated using (bucket_id = 'catalog');

drop policy if exists "admin delete catalog images" on storage.objects;
create policy "admin delete catalog images" on storage.objects
  for delete to authenticated using (bucket_id = 'catalog');
