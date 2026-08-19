import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminProduct, listCollections } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function EditProductPage({ params }: Props) {
  await requireAdmin();

  const { slug } = await params;

  // "new" is handled by its own route; guard in case of a stray link.
  if (slug === "new") notFound();

  const [product, collections] = await Promise.all([
    getAdminProduct(slug),
    listCollections(),
  ]);

  if (!product) notFound();

  return (
    <>
      <Link
        href="/admin/products"
        className="font-body text-ink-muted hover:text-ink"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        ← Products
      </Link>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
        <h1
          className="font-display font-bold"
          style={{ fontSize: "var(--text-h1)" }}
        >
          {product.name}
        </h1>
        <Link
          href={`/products/${product.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-accent hover:underline"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          View on site ↗
        </Link>
      </div>

      <ProductForm product={product} collections={collections} />
    </>
  );
}
