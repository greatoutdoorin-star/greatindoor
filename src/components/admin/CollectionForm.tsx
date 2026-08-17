"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AdminCollection } from "@/lib/admin-data";
import type { ActionState } from "@/app/admin/actions";
import { saveCollection } from "@/app/admin/actions";
import ImageField from "./ImageField";

const GROUPS = ["Furniture", "Interiors", "Outdoor"];

const field =
  "w-full border border-hairline bg-canvas px-4 py-2.5 font-body text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent";

const labelClass =
  "block font-body font-medium uppercase tracking-[0.1em] text-ink-subtle";

/** Category editor. Mirrors ProductForm — same action pattern, fewer fields. */
export default function CollectionForm({
  collection,
}: {
  collection?: AdminCollection;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveCollection,
    undefined,
  );

  const isNew = !collection;

  return (
    <form action={formAction} className="mt-8 max-w-3xl">
      <input
        type="hidden"
        name="originalSlug"
        defaultValue={collection?.slug ?? ""}
      />

      {state?.error && (
        <p
          role="alert"
          className="mb-6 border border-red-300 bg-red-50 px-4 py-3 font-body text-red-700"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {state.error}
        </p>
      )}

      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className={labelClass} style={{ fontSize: "11px" }}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={collection?.name ?? ""}
            className={`${field} mt-1.5`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className={labelClass} style={{ fontSize: "11px" }}>
              URL slug
            </label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={collection?.slug ?? ""}
              placeholder="office-furniture"
              className={`${field} mt-1.5`}
            />
            {!isNew && (
              <p
                className="mt-1 font-body text-ink-subtle"
                style={{ fontSize: "11px" }}
              >
                Products move with the category, but the old category URL will
                stop working.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="group"
              className={labelClass}
              style={{ fontSize: "11px" }}
            >
              Group
            </label>
            <select
              id="group"
              name="group"
              required
              defaultValue={collection?.group ?? ""}
              className={`${field} mt-1.5`}
            >
              <option value="" disabled>
                Choose…
              </option>
              {GROUPS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="icon" className={labelClass} style={{ fontSize: "11px" }}>
            Icon
          </label>
          <input
            id="icon"
            name="icon"
            defaultValue={collection?.icon ?? ""}
            placeholder="🪑"
            className={`${field} mt-1.5`}
          />
          <p
            className="mt-1 font-body text-ink-subtle"
            style={{ fontSize: "11px" }}
          >
            One emoji. Shown in the sidebar, and on the category tile when there
            is no photo.
          </p>
        </div>

        <div>
          <label htmlFor="blurb" className={labelClass} style={{ fontSize: "11px" }}>
            Blurb
          </label>
          <textarea
            id="blurb"
            name="blurb"
            rows={2}
            defaultValue={collection?.blurb ?? ""}
            className={`${field} mt-1.5 resize-y`}
          />
        </div>

        {/* Single image, but ImageField handles upload and preview already. */}
        <ImageField
          name="image"
          initial={collection?.image ? [collection.image] : []}
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={collection?.visible ?? true}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="font-body" style={{ fontSize: "var(--text-body-sm)" }}>
            Show in the sidebar and category grid
          </span>
        </label>
        <p
          className="-mt-2 font-body text-ink-subtle"
          style={{ fontSize: "11px" }}
        >
          Hidden categories still have working pages, so existing links and
          search results keep resolving — they just stop being advertised.
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent px-8 py-3 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : isNew ? "Create category" : "Save changes"}
        </button>
        <Link
          href="/admin/collections"
          className="font-body text-ink-muted hover:text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
