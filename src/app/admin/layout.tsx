import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // Belt and braces with robots.ts, which already disallows /admin.
  robots: { index: false, follow: false },
};

/**
 * Admin shell.
 *
 * Deliberately not SiteShell — no storefront sidebar, no WhatsApp FAB, no
 * enquiry popup. This is a tool, and the shop chrome would only get in the way.
 *
 * No auth check here on purpose: layouts do not re-render on navigation, so a
 * session check placed here would not run again as the admin moves between
 * pages. Each page calls requireAdmin() itself.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-surface">{children}</div>;
}
