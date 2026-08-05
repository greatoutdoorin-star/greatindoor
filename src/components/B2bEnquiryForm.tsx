"use client";

import { useState } from "react";
import { submitLead } from "@/lib/submit-lead";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Bulk / B2B enquiry form.
 *
 * Submitting records the enquiry server-side and then hands the conversation
 * off to wa.me. These are the highest-value leads on the site, so they are not
 * left to depend on the visitor actually sending the drafted message.
 */
export default function B2bEnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    city: "",
    requirement: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "Bulk / B2B enquiry",
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.city && `City: ${form.city}`,
      "",
      form.requirement,
    ].filter(Boolean);

    // Opened synchronously inside the submit handler: browsers only treat
    // window.open as user-initiated in the same tick, so awaiting the fetch
    // first would get the WhatsApp tab blocked as a popup.
    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener");

    void submitLead({
      source: "b2b",
      name: form.name,
      phone: form.phone,
      company: form.company,
      city: form.city,
      message: form.requirement,
    });

    setSent(true);
  };

  const field =
    "w-full border border-hairline bg-canvas px-4 py-3 font-body outline-none transition-colors focus:border-ink";

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-3xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={set("name")}
          placeholder="Your name*"
          aria-label="Your name"
          className={field}
        />
        <input
          value={form.company}
          onChange={set("company")}
          placeholder="Company / property"
          aria-label="Company or property"
          className={field}
        />
        <input
          required
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          placeholder="Phone number*"
          aria-label="Phone number"
          className={field}
        />
        <input
          value={form.city}
          onChange={set("city")}
          placeholder="City"
          aria-label="City"
          className={field}
        />
      </div>

      <textarea
        required
        value={form.requirement}
        onChange={set("requirement")}
        placeholder="Tell us about your requirement — quantity, product types, timeline*"
        aria-label="Your requirement"
        rows={5}
        className={`${field} mt-5 resize-y`}
      />

      <button
        type="submit"
        className="mt-6 w-full bg-ink px-8 py-4 font-display font-semibold text-white transition-colors hover:bg-accent sm:w-auto"
      >
        Send enquiry on WhatsApp
      </button>

      {/* Shown after submit so a blocked popup is not a silent dead end —
          the enquiry has still reached us either way. */}
      {sent && (
        <p
          className="mt-5 font-body text-ink-muted"
          aria-live="polite"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Thanks — we have your enquiry. If WhatsApp didn&apos;t open, we&apos;ll
          still get back to you on the number you gave us.
        </p>
      )}
    </form>
  );
}
