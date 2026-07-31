import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import Clientele from "@/components/Clientele";
import FounderPanel from "@/components/FounderPanel";
import HeroPanel from "@/components/HeroPanel";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import SisterBrand from "@/components/SisterBrand";
import SiteShell from "@/components/SiteShell";
import StylistPromo from "@/components/StylistPromo";
import { getAllProducts, getCollections, getSettings } from "@/lib/catalog";

export default async function Home() {
  const [products, collections, settings] = await Promise.all([
    getAllProducts(),
    getCollections(),
    getSettings(),
  ]);

  const navCollections = collections.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  // The ticker runs the category names, as on the live site.
  const tickerItems = collections.map((c) => c.name);

  return (
    <SiteShell
      collections={navCollections}
      announcement={settings.announcement_text}
    >
      <HeroPanel />
      <Marquee items={tickerItems} />
      <CategoryGrid collections={collections} />

      <section className="bg-surface px-6 py-16 lg:px-14 lg:py-20">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <h2 style={{ fontSize: "var(--text-h2)" }}>Featured Products</h2>
          <Link
            href="/collections/all"
            className="font-body underline underline-offset-4 transition-colors hover:text-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
        </div>
      </section>

      <StylistPromo />
      <Clientele />
      <SisterBrand />
      <FounderPanel />
    </SiteShell>
  );
}
