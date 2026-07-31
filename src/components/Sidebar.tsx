"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_GROUPS, SECONDARY_NAV, SISTER_BRAND, SITE } from "@/lib/site";

export type NavCollection = { name: string; slug: string };

type SidebarProps = {
  /** Collections that exist; a nav item renders only if its slug is present. */
  collections: NavCollection[];
  /** Shifts the fixed mobile header down to clear the announcement bar. */
  hasAnnouncement?: boolean;
};

/** Two-line serif wordmark: "great" in accent, "indoors" in ink. */
function Wordmark() {
  return (
    <Link href="/" aria-label={SITE.name} className="block leading-[0.95]">
      <span className="block font-display text-[26px] font-bold text-accent">
        great
      </span>
      <span className="block font-display text-[26px] font-bold text-ink">
        indoors
      </span>
    </Link>
  );
}

export default function Sidebar({
  collections,
  hasAnnouncement = false,
}: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on navigation — otherwise it stays open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const known = new Set(collections.map((c) => c.slug));
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const nav = (
    <nav className="site-nav flex flex-col">
      {NAV_GROUPS.map((group) => {
        const items = group.items.filter((i) => known.has(i.slug));
        if (items.length === 0) return null;

        return (
          <div key={group.label} className="mb-7">
            <p
              className="mb-3 font-body font-medium uppercase tracking-[0.14em] text-ink-muted"
              style={{ fontSize: "11px" }}
            >
              {group.label}
            </p>
            <ul className="flex flex-col gap-[14px]">
              {items.map((item) => {
                const href = `/collections/${item.slug}`;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      style={{ fontSize: "var(--text-nav-primary)" }}
                      className={`flex items-center gap-2 font-body transition-colors ${
                        isActive(href)
                          ? "font-semibold text-accent"
                          : "text-ink hover:text-accent"
                      }`}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {/*
        Cross-sell to the sister brand. Great Outdoor is a separate site and
        codebase — this outbound link is the only connection, and it is
        intentional: the live site promotes it from the rail.
      */}
      <a
        href={SISTER_BRAND.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-7 block bg-accent px-4 py-3 text-center font-body font-medium text-white transition-colors hover:bg-accent-hover"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        🌿 {SISTER_BRAND.label} →
      </a>

      <ul className="flex flex-col gap-[14px] border-t border-hairline pt-6">
        {SECONDARY_NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              style={{ fontSize: "var(--text-nav-secondary)" }}
              className={`font-body transition-colors ${
                isActive(item.href)
                  ? "text-accent"
                  : "text-ink-muted hover:text-accent"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/*
        Mobile top bar — only below lg. `top` comes from the .site-header /
        .has-announcement rules in globals.css rather than a Tailwind arbitrary
        value: Tailwind v4 emits no class for top-[var(--announcement-h)],
        which leaves the header with no offset at all.
      */}
      <header
        className={`site-header fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-hairline bg-panel px-5 lg:hidden ${
          hasAnnouncement ? "site-header--offset" : ""
        }`}
      >
        <Wordmark />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="-mr-2 p-2"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </header>

      {/*
        Mobile drawer. `invisible` matters as much as the opacity: hidden with
        opacity alone the panel stays in layout, and `fixed inset-0` plus
        `overflow-y-auto` let it stretch to the widest element on the page,
        which makes every page scroll sideways. It also keeps the closed drawer
        out of the tab order.
      */}
      <div
        className={`no-scrollbar fixed inset-0 z-30 w-full max-w-full overflow-y-auto overflow-x-hidden bg-panel px-5 pb-10 transition-opacity lg:hidden ${
          hasAnnouncement ? "pt-32" : "pt-24"
        } ${
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {nav}
      </div>

      {/* Desktop fixed rail — 230px, measured from the live site. */}
      <aside className="site-sidebar no-scrollbar fixed inset-y-0 left-0 z-40 hidden flex-col overflow-y-auto border-r border-hairline bg-panel py-7 lg:flex">
        <div className="mb-10">
          <Wordmark />
        </div>
        {nav}
      </aside>
    </>
  );
}
