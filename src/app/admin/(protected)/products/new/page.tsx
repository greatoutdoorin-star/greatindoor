import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/auth";
import { listCollections } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin();
  const collections = await listCollections();

  return (
    <>
      <Link
        href="/admin/products"
        className="font-body text-ink-muted hover:text-ink"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        ← Products
      </Link>

      <h1
        className="mt-3 font-display font-bold"
        style={{ fontSize: "var(--text-h1)" }}
      >
        New product
      </h1>

      <ProductForm collections={collections} />
    </>
  );
}
