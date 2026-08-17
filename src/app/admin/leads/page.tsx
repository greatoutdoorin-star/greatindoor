import AdminNav from "@/components/admin/AdminNav";
import LeadRow from "@/components/admin/LeadRow";
import { requireAdmin } from "@/lib/auth";
import { listLeads } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string; show?: string }> };

export default async function LeadsPage({ searchParams }: Props) {
  await requireAdmin();

  const { q = "", show = "" } = await searchParams;
  const leads = await listLeads();

  const needle = q.trim().toLowerCase();
  const filtered = leads.filter((lead) => {
    if (show === "new" && lead.handled) return false;
    if (show === "handled" && !lead.handled) return false;
    if (!needle) return true;
    return [lead.name, lead.phone, lead.email, lead.company, lead.city, lead.message]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(needle));
  });

  return (
    <>
      <AdminNav current="/admin/leads" />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1
            className="font-display font-bold"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Leads
          </h1>
          {/* Client-side CSV build would need the rows in the browser; this
              route handler streams them straight from the database. */}
          <a
            href="/admin/api/leads.csv"
            className="border border-ink px-5 py-2.5 font-display font-semibold uppercase tracking-[0.02em] text-ink transition-colors hover:border-accent hover:text-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Export CSV
          </a>
        </div>

        <form className="mt-6 flex flex-wrap gap-3" method="get">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, phone, message"
            aria-label="Search leads"
            className="min-w-[200px] flex-1 border border-hairline bg-canvas px-4 py-2.5 font-body outline-none focus:border-accent"
          />
          <select
            name="show"
            defaultValue={show}
            aria-label="Filter by status"
            className="border border-hairline bg-canvas px-4 py-2.5 font-body outline-none focus:border-accent"
          >
            <option value="">All</option>
            <option value="new">Not yet handled</option>
            <option value="handled">Handled</option>
          </select>
          <button
            type="submit"
            className="border border-ink bg-ink px-5 py-2.5 font-display font-semibold text-white transition-colors hover:border-accent hover:bg-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Filter
          </button>
        </form>

        <p
          className="mt-4 font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {filtered.length} of {leads.length}
        </p>

        {filtered.length === 0 ? (
          <p
            className="mt-6 border border-hairline bg-canvas px-4 py-10 text-center font-body text-ink-muted"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            No enquiries match.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {filtered.map((lead) => (
              <LeadRow key={lead.id} lead={lead} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
