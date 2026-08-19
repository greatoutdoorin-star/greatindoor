import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDashboardStats, listLeads } from "@/lib/admin-data";

/** Session must be read per request — see the note in login/page.tsx. */
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const user = await requireAdmin();

  const [stats, leads] = await Promise.all([
    getDashboardStats(),
    listLeads(5),
  ]);

  const tiles = [
    { label: "Products", value: stats.products, href: "/admin/products" },
    { label: "Categories", value: stats.collections, href: "/admin/collections" },
    { label: "Leads", value: stats.leads, href: "/admin/leads" },
    { label: "New leads", value: stats.newLeads, href: "/admin/leads" },
  ];

  return (
    <>
      <h1 className="font-display font-bold" style={{ fontSize: "var(--text-h1)" }}>
        Dashboard
      </h1>
      <p
        className="mt-1 font-body text-ink-muted"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        Signed in as {user.email}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="border border-hairline bg-canvas p-5 transition-colors hover:border-accent"
          >
            <p
              className="font-body uppercase tracking-[0.12em] text-ink-subtle"
              style={{ fontSize: "11px" }}
            >
              {tile.label}
            </p>
            <p
              className="mt-2 font-display font-bold text-ink"
              style={{ fontSize: "var(--text-stat)" }}
            >
              {tile.value}
            </p>
          </Link>
        ))}
      </div>

      {stats.hiddenProducts > 0 && (
        <p
          className="mt-4 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {stats.hiddenProducts}{" "}
          {stats.hiddenProducts === 1 ? "product is" : "products are"} hidden
          from the site.
        </p>
      )}

      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2
            className="font-display font-bold"
            style={{ fontSize: "var(--text-h3)" }}
          >
            Recent enquiries
          </h2>
          <Link
            href="/admin/leads"
            className="font-body text-accent hover:underline"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            View all
          </Link>
        </div>

        {leads.length === 0 ? (
          <p
            className="mt-4 font-body text-ink-muted"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            No enquiries yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-hairline border border-hairline bg-canvas">
            {leads.map((lead) => (
              <li key={lead.id} className="flex flex-wrap gap-x-4 gap-y-1 p-4">
                <span className="font-display font-semibold">{lead.name}</span>
                <span className="font-body text-ink-muted">{lead.phone}</span>
                <span
                  className="ml-auto font-body text-ink-subtle"
                  style={{ fontSize: "var(--text-body-sm)" }}
                >
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
