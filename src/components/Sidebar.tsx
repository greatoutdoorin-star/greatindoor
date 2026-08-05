"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS, SECONDARY_NAV, SISTER_BRAND, SITE } from "@/lib/site";

export type NavCollection = { name: string; slug: string };

type SidebarProps = {
  /** Collections that exist; a nav item renders only if its slug is present. */
  collections: NavCollection[];
  /** Shifts the fixed mobile header down to clear the announcement bar. */
  hasAnnouncement?: boolean;
};

/**
 * Two-line wordmark: "great" in accent, "indoors" in ink.
 *
 * Smaller on mobile — at the desktop 26px it crowds the sister-brand pill and
 * the menu button in a 64px-tall bar.
 */
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={SITE.name}
      className={`block leading-[0.95] ${className}`}
    >
      <span className="block font-display text-[19px] font-bold text-accent lg:text-[26px]">
        great
      </span>
      <span className="block font-display text-[19px] font-bold text-ink lg:text-[26px]">
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

  // Closing on navigation is done from the links themselves (onClick below)
  // rather than an effect keyed on pathname: setState in an effect body
  // triggers a second render pass for every route change, and React's
  // set-state-in-effect lint rule rejects it.
  const close = () => setOpen(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the drawer — expected of anything that covers the viewport.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const known = new Set(collections.map((c) => c.slug));
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /*
    Cross-sell to the sister brand. Great Outdoor is a separate site and
    codebase — this outbound link is the only connection, and it is
    intentional: the live site promotes it from the rail.

    Rendered directly beneath the wordmark rather than after the category
    groups, so it is visible without scrolling the rail — and matching where
    greatoutdoor.in puts its own link back to this site.

    Outlined pill rather than a solid block, matching that same treatment.
  */
  const sisterBrandLink = (
    <a
      href={SISTER_BRAND.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={close}
      className="inline-flex w-fit items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 font-display font-semibold leading-none text-ink transition-colors hover:border-accent hover:text-accent"
      style={{ fontSize: "var(--text-body-sm)" }}
    >
      🌿 {SISTER_BRAND.label} →
    </a>
  );

  const nav = (
    <nav className="site-nav flex flex-col">
      {/* One flat list, no group headings — see NAV_ITEMS. "all" is always
          present, so it is not filtered against the collection slugs. */}
      <ul className="mb-8 flex flex-col gap-[14px]">
        {NAV_ITEMS.filter(
          (item) => item.slug === "all" || known.has(item.slug),
        ).map((item) => {
          const href = `/collections/${item.slug}`;
          return (
            <li key={item.slug}>
              <Link
                href={href}
                onClick={close}
                style={{ fontSize: "var(--text-nav-primary)" }}
                className={`flex items-center gap-2.5 font-body transition-colors ${
                  isActive(href)
                    ? "font-semibold text-accent"
                    : "text-ink hover:text-accent"
                }`}
              >
                {/* Fixed width so the labels align into a column rather than
                    stepping in and out with each icon's glyph width. */}
                <span aria-hidden="true" className="w-5 shrink-0">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col gap-[14px] border-t border-hairline pt-6">
        {SECONDARY_NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={close}
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
      {/*
        Three equal columns rather than a flex row, so the wordmark is centred
        against the viewport instead of against whatever the side items happen
        to measure — the sister-brand pill and the menu button are different
        widths. Matches the sister site's own mobile header.
      */}
      <header
        className={`site-header fixed inset-x-0 top-0 z-40 grid h-16 grid-cols-[1fr_auto_1fr] items-center border-b border-hairline bg-panel px-4 lg:hidden ${
          hasAnnouncement ? "site-header--offset" : ""
        }`}
      >
        <a
          href={SISTER_BRAND.url}
          target="_blank"
          rel="noopener noreferrer"
          className="justify-self-start whitespace-nowrap rounded-full border border-hairline px-3.5 py-2 font-display font-semibold leading-none text-ink transition-colors hover:border-accent hover:text-accent"
          style={{ fontSize: "12px" }}
        >
          {SISTER_BRAND.name} ↗
        </a>

        {/* text-center rather than justify-self-center: the wordmark is a
            two-line block, so centring the box still left the shorter first
            line ragged against the longer second one. */}
        <Wordmark className="text-center" />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="-mr-2 justify-self-end p-2"
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
        {/* The drawer hides the header's wordmark behind it, so the link sits
            at the top of the drawer content instead. */}
        <div className="mb-7">{sisterBrandLink}</div>
        {nav}
      </div>

      {/* Desktop fixed rail — width from --sidebar-w, matching the sister site. */}
      <aside className="site-sidebar no-scrollbar fixed inset-y-0 left-0 z-40 hidden flex-col overflow-y-auto border-r border-hairline bg-panel py-7 lg:flex">
        <div className="mb-5">
          <Wordmark />
        </div>
        <div className="mb-9">{sisterBrandLink}</div>
        {nav}
      </aside>
    </>
  );
}
