"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  name: string;
  initial: string[];
};

/**
 * Image list with upload.
 *
 * Paths are held in a hidden textarea (one per line) so the parent form posts
 * them as ordinary FormData and the Server Action parses them exactly like the
 * other repeatable fields.
 *
 * Two kinds of path coexist deliberately: the 347 images migrated with the
 * catalogue are site-relative ("/catalog/..."), while uploads return an
 * absolute Supabase Storage URL. next/image serves both — the Storage host is
 * already whitelisted in next.config.ts.
 */
export default function ImageField({ name, initial }: Props) {
  const [images, setImages] = useState<string[]>(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);

        // A Route Handler rather than a Server Action: actions are capped at
        // 1MB by default, which a product photo will exceed.
        const res = await fetch("/admin/api/upload", {
          method: "POST",
          body,
        });

        const json = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !json.url) {
          throw new Error(json.error ?? "Upload failed.");
        }
        uploaded.push(json.url);
      }

      setImages((current) => [...current, ...uploaded]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed.");
    } finally {
      setUploading(false);
      // Clear the picker so re-selecting the same file fires onChange again.
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length) return;
    setImages((current) => {
      const next = [...current];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  return (
    <div>
      <p
        className="block font-body font-medium uppercase tracking-[0.1em] text-ink-subtle"
        style={{ fontSize: "11px" }}
      >
        Images
      </p>
      <p className="mt-1 font-body text-ink-subtle" style={{ fontSize: "11px" }}>
        The first image is the one shown on cards and in search results.
      </p>

      {/* What the form actually posts. Kept in sync with the visual list. */}
      <textarea
        name={name}
        value={images.join("\n")}
        readOnly
        hidden
      />

      {images.length > 0 && (
        <ul className="mt-3 grid gap-2">
          {images.map((src, i) => (
            <li
              key={`${src}-${i}`}
              className="flex items-center gap-3 border border-hairline bg-canvas p-2"
            >
              <div className="relative h-14 w-14 shrink-0 bg-surface">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>

              <span
                className="min-w-0 flex-1 truncate font-mono text-ink-muted"
                style={{ fontSize: "11px" }}
                title={src}
              >
                {src}
              </span>

              {i === 0 && (
                <span
                  className="shrink-0 bg-accent/10 px-2 py-0.5 font-body uppercase tracking-[0.1em] text-accent"
                  style={{ fontSize: "9px" }}
                >
                  Main
                </span>
              )}

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="px-2 py-1 font-body text-ink-muted hover:text-ink disabled:opacity-30"
                  style={{ fontSize: "12px" }}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === images.length - 1}
                  aria-label="Move down"
                  className="px-2 py-1 font-body text-ink-muted hover:text-ink disabled:opacity-30"
                  style={{ fontSize: "12px" }}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setImages((current) => current.filter((_, at) => at !== i))
                  }
                  aria-label={`Remove image ${i + 1}`}
                  className="px-2 py-1 font-body text-ink-subtle hover:text-red-600"
                  style={{ fontSize: "11px" }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={(e) => handleFiles(e.target.files)}
          className="font-body text-ink-muted file:mr-3 file:border file:border-hairline file:bg-canvas file:px-4 file:py-2 file:font-display file:font-semibold file:text-ink hover:file:border-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        />
        {uploading && (
          <span
            className="font-body text-ink-muted"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Uploading…
          </span>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-2 font-body text-red-600"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
