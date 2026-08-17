import Link from "next/link";
import { signOut } from "@/app/admin/actions";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/collections", label: "Categories" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Settings" },
];

/**
 * Admin top bar.
 *
 * A server component so the sign-out Server Action can be bound directly to a
 * form, with no client bundle for what is a single button.
 *
 * `current` is passed rather than read from usePathname() so this stays on the
 * server; each page knows which one it is.
 */
export default function AdminNav({ current }: { current: string }) {
  return (
    <header className="border-b border-hairline bg-canvas">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/admin" className="font-display font-bold tracking-tight">
          <span className="text-accent">great</span> indoors
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {LINKS.map((link) => {
            const active =
              link.href === "/admin"
                ? current === "/admin"
                : current.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-body transition-colors ${
                  active ? "text-accent" : "text-ink-muted hover:text-ink"
                }`}
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-ink-muted transition-colors hover:text-ink"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            View site ↗
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="font-body text-ink-muted transition-colors hover:text-ink"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
