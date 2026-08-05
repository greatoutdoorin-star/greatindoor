"use client";

import { useState } from "react";
import { submitLead } from "@/lib/submit-lead";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * General contact form.
 *
 * Submitting does two things: records the enquiry server-side, then hands off
 * to a pre-filled WhatsApp message. The record matters because the handoff is
 * not guaranteed — the visitor may never send the drafted message.
 */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      "",
      form.message,
    ].filter(Boolean);

    // Opened synchronously inside the submit handler: browsers only treat
    // window.open as user-initiated in the same tick, so awaiting the fetch
    // first would get the WhatsApp tab blocked as a popup.
    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener");

    // Fire-and-forget; the lead is recorded whether or not the message is sent.
    void submitLead({
      source: "contact",
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
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
          placeholder="What's your good name?*"
          aria-label="Your name"
          className={field}
        />
        <input
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="Enter your email address"
          aria-label="Email address"
          className={field}
        />
        <input
          required
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          placeholder="Enter your phone number*"
          aria-label="Phone number"
          className={`${field} sm:col-span-2`}
        />
      </div>

      <textarea
        required
        value={form.message}
        onChange={set("message")}
        placeholder="Enter your message*"
        aria-label="Your message"
        rows={5}
        className={`${field} mt-5 resize-y`}
      />

      <button
        type="submit"
        className="mt-6 w-full bg-ink px-8 py-4 font-display font-semibold text-white transition-colors hover:bg-accent sm:w-auto"
      >
        Send on WhatsApp
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
