"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/admin/actions";
import { saveSettings } from "@/app/admin/actions";

type FieldSpec = {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  placeholder?: string;
};

/**
 * Grouped so related settings sit together — the WhatsApp number and its
 * display form are easy to leave inconsistent otherwise.
 */
const GROUPS: { title: string; fields: FieldSpec[] }[] = [
  {
    title: "Announcement bar",
    fields: [
      {
        key: "announcement_text",
        label: "Text",
        multiline: true,
        hint: "Leave empty to hide the bar entirely.",
      },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "contact_phone", label: "Phone" },
      { key: "contact_email", label: "Email" },
      { key: "contact_address", label: "Address", multiline: true },
    ],
  },
  {
    title: "WhatsApp",
    fields: [
      {
        key: "whatsapp_number",
        label: "Number",
        placeholder: "919829012090",
        hint: "Digits only, country code first — this is what wa.me links use.",
      },
      {
        key: "whatsapp_display",
        label: "Displayed as",
        placeholder: "+91 98290 12090",
        hint: "The human-readable form shown in the sidebar and footer.",
      },
    ],
  },
  {
    title: "Message templates",
    fields: [
      {
        key: "whatsapp_template_product",
        label: "Product enquiry",
        multiline: true,
        hint: "Tokens: {{name}}, {{qty}}, {{url}}",
      },
      { key: "whatsapp_template_b2b", label: "B2B enquiry", multiline: true },
      {
        key: "whatsapp_template_general",
        label: "General enquiry",
        multiline: true,
      },
    ],
  },
  {
    title: "Headline figures",
    fields: [
      { key: "stat_years", label: "Years experience", placeholder: "33+" },
      { key: "stat_categories", label: "Product categories", placeholder: "15+" },
      { key: "stat_projects", label: "Projects delivered", placeholder: "500+" },
    ],
  },
];

const field =
  "w-full border border-hairline bg-canvas px-4 py-2.5 font-body text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent";

export default function SettingsForm({
  settings,
}: {
  settings: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveSettings,
    undefined,
  );

  return (
    <form action={formAction} className="mt-8 max-w-3xl">
      {state?.error && (
        <p
          role="alert"
          className="mb-6 border border-red-300 bg-red-50 px-4 py-3 font-body text-red-700"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {state.error}
        </p>
      )}

      {state?.ok && (
        <p
          role="status"
          className="mb-6 border border-accent bg-accent/5 px-4 py-3 font-body text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Saved. The site will show the change within a few seconds.
        </p>
      )}

      <div className="grid gap-10">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2
              className="font-display font-bold uppercase tracking-[0.08em] text-ink"
              style={{ fontSize: "var(--text-body-hd)" }}
            >
              {group.title}
            </h2>

            <div className="mt-4 grid gap-5">
              {group.fields.map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={f.key}
                    className="block font-body font-medium uppercase tracking-[0.1em] text-ink-subtle"
                    style={{ fontSize: "11px" }}
                  >
                    {f.label}
                  </label>

                  {f.multiline ? (
                    <textarea
                      id={f.key}
                      name={f.key}
                      rows={2}
                      defaultValue={settings[f.key] ?? ""}
                      placeholder={f.placeholder}
                      className={`${field} mt-1.5 resize-y`}
                    />
                  ) : (
                    <input
                      id={f.key}
                      name={f.key}
                      defaultValue={settings[f.key] ?? ""}
                      placeholder={f.placeholder}
                      className={`${field} mt-1.5`}
                    />
                  )}

                  {f.hint && (
                    <p
                      className="mt-1 font-body text-ink-subtle"
                      style={{ fontSize: "11px" }}
                    >
                      {f.hint}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-10 bg-accent px-8 py-3 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
