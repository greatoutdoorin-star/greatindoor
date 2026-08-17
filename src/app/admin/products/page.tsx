import Link from "next/link";
import Image from "next/image";
import AdminNav from "@/components/admin/AdminNav";
import RowActions from "@/components/admin/RowActions";
import { requireAdmin } from "@/lib/auth";
import { listCollections, listProducts } from "@/lib/admin-data";
import { deleteProduct, setProductVisibility } from "../actions";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; collection?: string; saved?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  await requireAdmin();

  const { q = "", collection = "", saved } = await searchParams;
  const [products, collections] = await Promise.all([
    listProducts(),
    listCollections(),
  ]);

  const needle = q.trim().toLowerCase();
  const filtered = products.filter((p) => {
    if (collection && p.collection !== collection) return false;
    if (!needle) return true;
    return (
      p.name.toLowerCase().includes(needle) ||
      p.slug.toLowerCase().includes(needle)
    );
  });

  const names = new Map(collections.map((c) => [c.slug, c.name]));

  return (
    <>
      <AdminNav current="/admin/products" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1
            className="font-display font-bold"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Products
          </h1>
          <Link
            href="/admin/products/new"
            className="bg-accent px-5 py-2.5 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Add product
          </Link>
        </div>

        {saved && (
          <p
            className="mt-4 border border-accent bg-accent/5 px-4 py-3 font-body text-ink"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Saved <strong>{saved}</strong>. The public page will show the change
            within a few seconds.
          </p>
        )}

        {/* GET form: the filter state lives in the URL, so a filtered view can
            be bookmarked and survives the redirect after a save. */}
        <form className="mt-6 flex flex-wrap gap-3" method="get">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name or slug"
            aria-label="Search products"
            className="min-w-[200px] flex-1 border border-hairline bg-canvas px-4 py-2.5 font-body outline-none focus:border-accent"
          />
          <select
            name="collection"
            defaultValue={collection}
            aria-label="Filter by category"
            className="border border-hairline bg-canvas px-4 py-2.5 font-body outline-none focus:border-accent"
          >
            <option value="">All categories</option>
            {collections.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="border border-ink bg-ink px-5 py-2.5 font-display font-semibold text-white transition-colors hover:bg-accent hover:border-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Filter
          </button>
        </form>

        <p
          className="mt-4 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {filtered.length} of {products.length}
        </p>

        <div className="mt-4 overflow-x-auto border border-hairline bg-canvas">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-hairline text-left">
                {["", "Name", "Category", "Visible", ""].map((head, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 font-body font-medium uppercase tracking-[0.1em] text-ink-subtle"
                    style={{ fontSize: "10px" }}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filtered.map((p) => (
                <tr key={p.slug} className={p.visible ? "" : "opacity-55"}>
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 shrink-0 bg-surface">
                      {p.images[0] && (
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${p.slug}`}
                      className="font-display font-semibold hover:text-accent"
                    >
                      {p.name}
                    </Link>
                    <p
                      className="font-body text-ink-subtle"
                      style={{ fontSize: "11px" }}
                    >
                      {p.slug}
                    </p>
                  </td>
                  <td
                    className="px-4 py-3 font-body text-ink-muted"
                    style={{ fontSize: "var(--text-body-sm)" }}
                  >
                    {names.get(p.collection) ?? p.collection}
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      id={p.slug}
                      visible={p.visible}
                      onToggle={setProductVisibility}
                      onDelete={deleteProduct}
                      label={p.name}
                      mode="toggle"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <RowActions
                      id={p.slug}
                      visible={p.visible}
                      onToggle={setProductVisibility}
                      onDelete={deleteProduct}
                      label={p.name}
                      mode="delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p
              className="px-4 py-10 text-center font-body text-ink-muted"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Nothing matches that search.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
