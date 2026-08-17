import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SiteShell from "@/components/SiteShell";
import SizeTabbedGrid, { type SizeGroup } from "@/components/SizeTabbedGrid";
import {
  getCollection,
  getCollections,
  getProductsByCollection,
  getVisibleCollections,
} from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // Unfiltered on purpose: hidden categories are dropped from the nav, not
  // deleted, so their pages must still be generated or every link to them
  // (and every inbound link) 404s.
  const collections = await getCollections();
  return [{ slug: "all" }, ...collections.map((c) => ({ slug: c.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: `Browse ${collection.name.toLowerCase()} — supplied and installed by Great Indoors, Jaipur.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  const [products, navCollections] = await Promise.all([
    getProductsByCollection(slug),
    getVisibleCollections(),
  ]);

  /*
    Collections whose products carry a `size` are shown as tabs, one per
    group, rather than as a single flat grid. Order follows first appearance
    in the catalogue so it matches the supplier's own sequence.
  */
  const sizes = [...new Set(products.map((p) => p.size).filter(Boolean))];
  const groups: SizeGroup[] = sizes.map((size) => {
    const inGroup = products.filter((p) => p.size === size);
    return {
      size,
      note: `${inGroup.length} designs · ${
        inGroup[0]?.details.find((d) => d.label === "Coverage")?.value ??
        "coverage on enquiry"
      }`,
      products: inGroup.map((p) => ({
        name: p.name,
        slug: p.slug,
        image: p.images[0],
        badge: p.badge,
      })),
    };
  });

  return (
    <SiteShell collections={navCollections}>
      <section className="px-6 pb-8 pt-16 lg:px-14 lg:pt-20">
        <h1 style={{ fontSize: "var(--text-h0)" }}>{collection.name}</h1>
        <p
          className="mt-4 max-w-2xl font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {groups.length > 1
            ? collection.blurb
            : `${products.length} ${
                products.length === 1 ? "product" : "products"
              }`}
        </p>
      </section>

      {groups.length > 1 ? (
        <SizeTabbedGrid groups={groups} />
      ) : (
        <section className="grid grid-cols-2 gap-4 px-6 pb-20 sm:grid-cols-3 lg:grid-cols-4 lg:px-14">
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              product={{
                name: p.name,
                slug: p.slug,
                image: p.images[0],
                badge: p.badge,
              }}
            />
          ))}
        </section>
      )}

      {products.length === 0 && (
        <section className="px-6 pb-20 lg:px-14">
          <p className="font-body text-ink-muted">
            Products in this category are made to order — send us an enquiry and
            we will share the current range.
          </p>
        </section>
      )}
    </SiteShell>
  );
}
