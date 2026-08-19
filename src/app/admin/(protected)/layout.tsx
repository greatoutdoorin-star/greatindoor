import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminUser } from "@/lib/auth";

/**
 * Gate for every admin page except login.
 *
 * The route group exists so the login page can sit outside this layout — it
 * must render for a signed-out visitor, and nesting it here would redirect it
 * to itself.
 *
 * force-dynamic on the layout covers every page beneath it: the session has to
 * be read per request, and Next's docs are explicit that a Data Access Layer
 * cannot protect a statically generated route.
 *
 * This is a second line of defence, not the only one. Layouts do not re-render
 * on client-side navigation, so each Server Action still calls
 * requireAdminOrThrow(), and the `admin write` RLS policies mean Postgres
 * rejects an unauthenticated write regardless of what the UI does.
 */
export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
