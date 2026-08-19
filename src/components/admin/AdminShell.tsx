"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Products", href: "/admin/products" },
  { label: "Categories", href: "/admin/collections" },
  { label: "Hero slides", href: "/admin/hero" },
  { label: "Blog posts", href: "/admin/posts" },
  { label: "Settings", href: "/admin/settings" },
];

/**
 * Admin chrome — a left rail on desktop, a wrapping row on mobile.
 *
 * Matches the sister site's admin so the two are one system to operate; the
 * storefront's own sidebar and FABs are deliberately absent, since this is a
 * tool rather than a shop.
 *
 * Signing out happens through the browser client so the auth cookies are
 * cleared on the response, then `refresh()` makes the server re-read the now
 * empty session rather than serving the cached signed-in tree.
 */
export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-canvas lg:flex">
      <aside className="border-b border-hairline bg-surface px-6 py-6 lg:min-h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:py-8">
        <Link href="/admin" className="block">
          <Image
            src="/catalog/brand/logo.png"
            alt={SITE.name}
            width={863}
            height={163}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <nav className="mt-8 lg:mt-12">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 lg:flex-col lg:gap-3">
            {NAV.map((item) => {
              // Exact match for the dashboard, prefix for the rest — otherwise
              // "/admin" would light up on every page.
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-display font-semibold transition-colors ${
                      active ? "text-accent" : "text-ink hover:text-accent"
                    }`}
                    style={{ fontSize: "var(--text-body-hd)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 lg:mt-16">
          <p
            className="font-body text-ink-muted"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            {email}
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-2 font-body underline underline-offset-4 hover:text-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Sign out
          </button>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block font-body underline underline-offset-4 hover:text-accent"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            View site →
          </Link>
        </div>
      </aside>

      <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
