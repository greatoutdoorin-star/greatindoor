import Link from "next/link";
import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import CollectionForm from "@/components/admin/CollectionForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminCollection } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function EditCollectionPage({ params }: Props) {
  await requireAdmin();

  const { slug } = await params;
  if (slug === "new") notFound();

  const collection = await getAdminCollection(slug);
  if (!collection) notFound();

  return (
    <>
      <AdminNav current="/admin/collections" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link
          href="/admin/collections"
          className="font-body text-ink-muted hover:text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          ← Categories
        </Link>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
          <h1
            className="font-display font-bold"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {collection.name}
          </h1>
          <Link
            href={`/collections/${collection.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-accent hover:underline"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            View on site ↗
          </Link>
        </div>

        <CollectionForm collection={collection} />
      </main>
    </>
  );
}
