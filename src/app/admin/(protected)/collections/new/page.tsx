import Link from "next/link";
import CollectionForm from "@/components/admin/CollectionForm";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewCollectionPage() {
  await requireAdmin();

  return (
    <>
      <Link
        href="/admin/collections"
        className="font-body text-ink-muted hover:text-ink"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        ← Categories
      </Link>

      <h1
        className="mt-3 font-display font-bold"
        style={{ fontSize: "var(--text-h1)" }}
      >
        New category
      </h1>

      <CollectionForm />
    </>
  );
}
