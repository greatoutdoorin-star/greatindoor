import { getAdminUser } from "@/lib/auth";
import { listLeads } from "@/lib/admin-data";

/**
 * Lead export.
 *
 * Checks authorisation itself — leads carry names and phone numbers, and this
 * is a plain GET that anyone could try. The proxy covers /admin/:path* but is
 * an optimistic check only.
 */

const COLUMNS = [
  "id",
  "created_at",
  "source",
  "name",
  "phone",
  "email",
  "company",
  "city",
  "product",
  "handled",
  "message",
] as const;

/**
 * Quote a CSV cell.
 *
 * Also neutralises spreadsheet formula injection: a value starting =, +, - or
 * @ is executed as a formula by Excel and Sheets, and these values come from a
 * public web form.
 */
function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const user = await getAdminUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const leads = await listLeads(10000);

  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.createdAt,
      lead.source,
      lead.name,
      lead.phone,
      lead.email,
      lead.company,
      lead.city,
      lead.product,
      lead.handled ? "yes" : "no",
      lead.message,
    ]
      .map(cell)
      .join(","),
  );

  // BOM so Excel opens it as UTF-8 — without it, names with accents mojibake.
  const csv = `﻿${COLUMNS.join(",")}\n${rows.join("\n")}`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="great-indoors-leads.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
