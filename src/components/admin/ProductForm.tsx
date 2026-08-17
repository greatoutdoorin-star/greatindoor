"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AdminProduct } from "@/lib/admin-data";
import type { ActionState } from "@/app/admin/actions";
import { saveProduct } from "@/app/admin/actions";
import ImageField from "./ImageField";

type Props = {
  /** Undefined when creating. */
  product?: AdminProduct;
  collections: { slug: string; name: string }[];
};

const field =
  "w-full border border-hairline bg-canvas px-4 py-2.5 font-body text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent";

const labelClass =
  "block font-body font-medium uppercase tracking-[0.1em] text-ink-subtle";

/**
 * Product editor.
 *
 * `useActionState` (from react, not react-dom) gives the three-tuple
 * [state, action, pending], so validation errors from the Server Action render
 * inline and the submit button disables while the save is in flight.
 *
 * The repeatable fields — specs, spec table, colours, images — are plain
 * textareas, one item per line. A row-builder UI would be more polished, but
 * these are edited rarely and in bulk, and a textarea can be pasted into
 * straight from a supplier catalogue.
 */
export default function ProductForm({ product, collections }: Props) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveProduct,
    undefined,
  );

  const isNew = !product;

  return (
    <form action={formAction} className="mt-8 max-w-3xl">
      {/* Lets the action tell a rename from an insert. */}
      <input type="hidden" name="originalSlug" defaultValue={product?.slug ?? ""} />

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
            defaultValue={product?.name ?? ""}
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
              defaultValue={product?.slug ?? ""}
              placeholder="executive-leather-chair"
              className={`${field} mt-1.5`}
            />
            <p
              className="mt-1 font-body text-ink-subtle"
              style={{ fontSize: "11px" }}
            >
              {isNew
                ? "Appears in the page address."
                : "Changing this changes the product's URL and breaks existing links."}
            </p>
          </div>

          <div>
            <label
              htmlFor="collection"
              className={labelClass}
              style={{ fontSize: "11px" }}
            >
              Category
            </label>
            <select
              id="collection"
              name="collection"
              required
              defaultValue={product?.collection ?? ""}
              className={`${field} mt-1.5`}
            >
              <option value="" disabled>
                Choose…
              </option>
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="badge" className={labelClass} style={{ fontSize: "11px" }}>
              Badge
            </label>
            <input
              id="badge"
              name="badge"
              defaultValue={product?.badge ?? ""}
              placeholder="Office"
              className={`${field} mt-1.5`}
            />
            <p
              className="mt-1 font-body text-ink-subtle"
              style={{ fontSize: "11px" }}
            >
              Small label above the name on cards.
            </p>
          </div>

          <div>
            <label htmlFor="size" className={labelClass} style={{ fontSize: "11px" }}>
              Size group
            </label>
            <input
              id="size"
              name="size"
              defaultValue={product?.size ?? ""}
              placeholder="50x50 cm"
              className={`${field} mt-1.5`}
            />
            <p
              className="mt-1 font-body text-ink-subtle"
              style={{ fontSize: "11px" }}
            >
              Optional. When products in a category have this, the category page
              tabs between the groups.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className={labelClass}
            style={{ fontSize: "11px" }}
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className={`${field} mt-1.5 resize-y`}
          />
        </div>

        <ImageField name="images" initial={product?.images ?? []} />

        <div>
          <label htmlFor="specs" className={labelClass} style={{ fontSize: "11px" }}>
            Selling points — one per line
          </label>
          <textarea
            id="specs"
            name="specs"
            rows={5}
            defaultValue={product?.specs.join("\n") ?? ""}
            placeholder={"Made to order\nInstallation included within Jaipur"}
            className={`${field} mt-1.5 resize-y font-mono`}
            style={{ fontSize: "12px" }}
          />
        </div>

        <div>
          <label
            htmlFor="details"
            className={labelClass}
            style={{ fontSize: "11px" }}
          >
            Spec table — one &ldquo;Label: value&rdquo; per line
          </label>
          <textarea
            id="details"
            name="details"
            rows={6}
            defaultValue={
              product?.details.map((d) => `${d.label}: ${d.value}`).join("\n") ??
              ""
            }
            placeholder={"Panel Size: 50 x 50 cm\nCoverage: 2.69 sqft per panel"}
            className={`${field} mt-1.5 resize-y font-mono`}
            style={{ fontSize: "12px" }}
          />
          <p
            className="mt-1 font-body text-ink-subtle"
            style={{ fontSize: "11px" }}
          >
            Lines without a colon are ignored. Only the first colon splits, so
            values may contain colons.
          </p>
        </div>

        <div>
          <label
            htmlFor="colours"
            className={labelClass}
            style={{ fontSize: "11px" }}
          >
            Colours / finishes — one per line
          </label>
          <textarea
            id="colours"
            name="colours"
            rows={3}
            defaultValue={product?.colours.join("\n") ?? ""}
            className={`${field} mt-1.5 resize-y font-mono`}
            style={{ fontSize: "12px" }}
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={product?.visible ?? true}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="font-body" style={{ fontSize: "var(--text-body-sm)" }}>
            Show on the website
          </span>
        </label>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent px-8 py-3 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : isNew ? "Create product" : "Save changes"}
        </button>
        <Link
          href="/admin/products"
          className="font-body text-ink-muted hover:text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
