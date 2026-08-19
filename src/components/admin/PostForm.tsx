"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AdminPost } from "@/lib/admin-data";
import type { ActionState } from "@/app/admin/actions";
import { savePost } from "@/app/admin/actions";
import ImageField from "./ImageField";

const field =
  "w-full border border-hairline bg-canvas px-4 py-2.5 font-body text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent";

const labelClass =
  "block font-body font-medium uppercase tracking-[0.1em] text-ink-subtle";

/**
 * Convert a stored ISO timestamp into the `YYYY-MM-DDTHH:mm` a
 * datetime-local input expects, in the browser's own timezone.
 *
 * Slicing the ISO string instead would show UTC, so a post scheduled for 9am
 * IST would display as 3:30am.
 */
function toLocalInput(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function PostForm({ post }: { post?: AdminPost }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    savePost,
    undefined,
  );

  const isNew = !post;

  return (
    <form action={formAction} className="mt-8 max-w-3xl">
      <input type="hidden" name="originalSlug" defaultValue={post?.slug ?? ""} />

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
          <label htmlFor="title" className={labelClass} style={{ fontSize: "11px" }}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={post?.title ?? ""}
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
              defaultValue={post?.slug ?? ""}
              placeholder="choosing-office-chairs"
              className={`${field} mt-1.5`}
            />
          </div>

          <div>
            <label
              htmlFor="published_at"
              className={labelClass}
              style={{ fontSize: "11px" }}
            >
              Publish at
            </label>
            <input
              id="published_at"
              name="published_at"
              type="datetime-local"
              defaultValue={toLocalInput(post?.publishedAt ?? "")}
              className={`${field} mt-1.5`}
            />
            <p
              className="mt-1 font-body text-ink-subtle"
              style={{ fontSize: "11px" }}
            >
              Leave empty to keep it a draft. A future date schedules it.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="excerpt"
            className={labelClass}
            style={{ fontSize: "11px" }}
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            defaultValue={post?.excerpt ?? ""}
            className={`${field} mt-1.5 resize-y`}
          />
          <p
            className="mt-1 font-body text-ink-subtle"
            style={{ fontSize: "11px" }}
          >
            Shown on the blog index and in search results.
          </p>
        </div>

        <ImageField name="cover" initial={post?.cover ? [post.cover] : []} />

        <div>
          <label htmlFor="body" className={labelClass} style={{ fontSize: "11px" }}>
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={18}
            defaultValue={post?.body ?? ""}
            className={`${field} mt-1.5 resize-y`}
            style={{ fontSize: "var(--text-body)" }}
          />
          <p
            className="mt-1 font-body text-ink-subtle"
            style={{ fontSize: "11px" }}
          >
            Plain text. Blank lines separate paragraphs.
          </p>
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={post?.visible ?? true}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="font-body" style={{ fontSize: "var(--text-body-sm)" }}>
            Show on the site
          </span>
        </label>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent px-8 py-3 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : isNew ? "Create post" : "Save changes"}
        </button>
        <Link
          href="/admin/posts"
          className="font-body text-ink-muted hover:text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
