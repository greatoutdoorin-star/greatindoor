"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/admin/actions";
import { saveHeroSlide } from "@/app/admin/actions";
import ImageField from "./ImageField";

const field =
  "w-full border border-hairline bg-canvas px-4 py-2.5 font-body text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent";

const labelClass =
  "block font-body font-medium uppercase tracking-[0.1em] text-ink-subtle";

/**
 * Add a hero slide.
 *
 * Headline and subtext are optional — the current artwork carries its own
 * copy, and overlaying more on top of it reads as clutter. They exist for
 * banners that leave clear space.
 */
export default function HeroSlideForm({
  nextSortOrder,
}: {
  nextSortOrder: number;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveHeroSlide,
    undefined,
  );

  return (
    <form action={formAction} className="mt-5 max-w-3xl">
      <input type="hidden" name="sort_order" defaultValue={nextSortOrder} />

      {state?.error && (
        <p
          role="alert"
          className="mb-5 border border-red-300 bg-red-50 px-4 py-3 font-body text-red-700"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {state.error}
        </p>
      )}

      {state?.ok && (
        <p
          role="status"
          className="mb-5 border border-accent bg-accent/5 px-4 py-3 font-body text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Slide added.
        </p>
      )}

      <div className="grid gap-5">
        <ImageField name="image" initial={[]} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="headline"
              className={labelClass}
              style={{ fontSize: "11px" }}
            >
              Headline
            </label>
            <input id="headline" name="headline" className={`${field} mt-1.5`} />
          </div>
          <div>
            <label
              htmlFor="link"
              className={labelClass}
              style={{ fontSize: "11px" }}
            >
              Link
            </label>
            <input
              id="link"
              name="link"
              placeholder="/collections/office-furniture"
              className={`${field} mt-1.5`}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subtext"
            className={labelClass}
            style={{ fontSize: "11px" }}
          >
            Subtext
          </label>
          <input id="subtext" name="subtext" className={`${field} mt-1.5`} />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="visible"
            defaultChecked
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="font-body" style={{ fontSize: "var(--text-body-sm)" }}>
            Show on the site
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 bg-accent px-8 py-3 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving…" : "Add slide"}
      </button>
    </form>
  );
}
