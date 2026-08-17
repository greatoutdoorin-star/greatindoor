"use client";

import { useState, useTransition } from "react";

type Props<Id extends string | number> = {
  id: Id;
  visible: boolean;
  /** Human-readable name, used in the delete confirmation. */
  label: string;
  /** Which control to render — the table shows these in separate columns. */
  mode: "toggle" | "delete";
  onToggle: (id: Id, visible: boolean) => Promise<void>;
  onDelete: (id: Id) => Promise<void>;
};

/**
 * Show/hide and delete controls for a table row.
 *
 * The actions arrive as props rather than being imported here: this component
 * serves both the products and categories tables, which have different action
 * pairs but identical behaviour.
 *
 * `useTransition` keeps the row interactive while the mutation runs — the
 * action revalidates the public pages, which takes a moment.
 */
export default function RowActions<Id extends string | number>({
  id,
  visible,
  label,
  mode,
  onToggle,
  onDelete,
}: Props<Id>) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (mode === "toggle") {
    return (
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              await onToggle(id, !visible);
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : "Failed");
            }
          })
        }
        aria-label={`${visible ? "Hide" : "Show"} ${label}`}
        className={`border px-3 py-1 font-body transition-colors disabled:opacity-50 ${
          visible
            ? "border-hairline text-ink-muted hover:border-ink hover:text-ink"
            : "border-accent text-accent"
        }`}
        style={{ fontSize: "11px" }}
      >
        {pending ? "…" : visible ? "Visible" : "Hidden"}
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          // Deleting a product removes it from every listing and 404s its
          // page, so it gets a confirmation. There is no undo.
          if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
          startTransition(async () => {
            setError(null);
            try {
              await onDelete(id);
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : "Failed");
            }
          });
        }}
        aria-label={`Delete ${label}`}
        className="font-body text-ink-subtle transition-colors hover:text-red-600 disabled:opacity-50"
        style={{ fontSize: "11px" }}
      >
        {pending ? "…" : "Delete"}
      </button>
      {error && (
        <p
          role="alert"
          className="mt-1 font-body text-red-600"
          style={{ fontSize: "10px" }}
        >
          {error}
        </p>
      )}
    </>
  );
}
