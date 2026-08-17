import Link from "next/link";
import Image from "next/image";
import AdminNav from "@/components/admin/AdminNav";
import RowActions from "@/components/admin/RowActions";
import { requireAdmin } from "@/lib/auth";
import { listCollections } from "@/lib/admin-data";
import { deleteCollection, setCollectionVisibility } from "../actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function CollectionsPage({ searchParams }: Props) {
  await requireAdmin();

  const { saved } = await searchParams;
  const collections = await listCollections();

  return (
    <>
      <AdminNav current="/admin/collections" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1
            className="font-display font-bold"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Categories
          </h1>
          <Link
            href="/admin/collections/new"
            className="bg-accent px-5 py-2.5 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Add category
          </Link>
        </div>

        {saved && (
          <p
            className="mt-4 border border-accent bg-accent/5 px-4 py-3 font-body text-ink"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Saved <strong>{saved}</strong>.
          </p>
        )}

        <div className="mt-6 overflow-x-auto border border-hairline bg-canvas">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-hairline text-left">
                {["", "Name", "Group", "Products", "Visible", ""].map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 font-body font-medium uppercase tracking-[0.1em] text-ink-subtle"
                    style={{ fontSize: "10px" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {collections.map((c) => (
                <tr key={c.slug} className={c.visible ? "" : "opacity-55"}>
                  <td className="px-4 py-3">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center bg-surface">
                      {c.image ? (
                        <Image
                          src={c.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <span aria-hidden="true">{c.icon}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/collections/${c.slug}`}
                      className="font-display font-semibold hover:text-accent"
                    >
                      {c.name}
                    </Link>
                    <p
                      className="font-body text-ink-subtle"
                      style={{ fontSize: "11px" }}
                    >
                      {c.slug}
                    </p>
                  </td>
                  <td
                    className="px-4 py-3 font-body text-ink-muted"
                    style={{ fontSize: "var(--text-body-sm)" }}
                  >
                    {c.group}
                  </td>
                  <td
                    className="px-4 py-3 font-body text-ink-muted"
                    style={{ fontSize: "var(--text-body-sm)" }}
                  >
                    {c.count}
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      id={c.slug}
                      visible={c.visible}
                      onToggle={setCollectionVisibility}
                      onDelete={deleteCollection}
                      label={c.name}
                      mode="toggle"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <RowActions
                      id={c.slug}
                      visible={c.visible}
                      onToggle={setCollectionVisibility}
                      onDelete={deleteCollection}
                      label={c.name}
                      mode="delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
