import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // Belt and braces with robots.ts, which already disallows /admin.
  robots: { index: false, follow: false },
};

/**
 * Root admin layout — metadata only.
 *
 * The chrome and the auth gate live in (protected)/layout.tsx, so the login
 * page can render outside them: it must be reachable while signed out, and
 * nesting it under the gate would redirect it to itself.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
