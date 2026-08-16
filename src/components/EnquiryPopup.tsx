"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CONTACT, WHATSAPP_DISPLAY } from "@/lib/site";
import { submitLead } from "@/lib/submit-lead";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Floating enquiry form.
 *
 * Sits above the WhatsApp FAB as a second persistent conversion affordance.
 * The FAB hands straight to WhatsApp, which loses anyone who won't leave the
 * page or doesn't use it; this captures those enquiries in a form instead.
 *
 * Same two-step submit as ContactForm — record server-side, then offer the
 * WhatsApp handoff — but the handoff is a link on the success panel rather
 * than an automatic window.open, because a popup fired from inside a modal
 * reads as an ad and is the thing browsers block hardest.
 */
export default function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  /* Esc closes, and the page behind must not scroll under the open panel. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /* Focus the first field on open so keyboard users land inside the dialog. */
  useEffect(() => {
    if (open && !sent) firstFieldRef.current?.focus();
  }, [open, sent]);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const whatsAppMessage = [
    `Name: ${form.name}`,
    form.phone && `Phone: ${form.phone}`,
    form.email && `Email: ${form.email}`,
    "",
    form.message || "I'd like to know more about Great Indoors products.",
  ]
    .filter(Boolean)
    .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    void submitLead({
      source: "contact",
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
    });

    setSent(true);
  };

  /* Reset on close so a returning visitor gets a clean form, not a stale one. */
  const close = () => {
    setOpen(false);
    setSent(false);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const field =
    "w-full border border-hairline bg-canvas px-4 py-3 font-body text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-accent";

  return (
    <>
      {/*
        Stacked above the WhatsApp FAB. Both use the same footprint (48px on
        mobile, 56px from lg) so the pair reads as one control column; the
        offsets below are the FAB's own bottom values plus its height and gap.
      */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Send an enquiry"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-lg transition-transform hover:scale-105 hover:bg-accent-hover lg:bottom-26 lg:right-6 lg:h-14 lg:w-14"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 text-white lg:h-7 lg:w-7"
        >
          {/* Clipboard with a written line — an enquiry form, not a chat. */}
          <path d="M9 3h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M16 4.5h1.5A1.5 1.5 0 0 1 19 6v13.5A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5V6a1.5 1.5 0 0 1 1.5-1.5H8" />
          <path d="M8.5 11h7M8.5 15h4.5" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
          {/* Scrim. Click-to-close lives here rather than on a wrapper around
              the panel, so clicks inside the form never bubble into a close. */}
          <div
            onClick={close}
            aria-hidden="true"
            className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[92dvh] w-full overflow-y-auto bg-canvas shadow-2xl sm:max-w-lg"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close enquiry form"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {sent ? (
              <div className="px-6 py-12 text-center sm:px-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-7 w-7 text-accent"
                  >
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                </div>

                <h2
                  id={titleId}
                  className="mt-5 font-display font-semibold text-ink"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  Thanks, {form.name.split(" ")[0] || "there"}!
                </h2>
                <p
                  className="mt-2 font-body text-ink-muted"
                  aria-live="polite"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  We have your enquiry and will get back to you on{" "}
                  {form.phone || "the number you gave us"}. Want a faster reply?
                </p>

                <a
                  href={buildWhatsAppLink(whatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-whatsapp px-8 py-4 font-display font-semibold text-white transition-colors hover:bg-whatsapp-hover sm:w-auto"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.945a11.9 11.9 0 0 0-3.45-8.406" />
                  </svg>
                  Continue on WhatsApp
                </a>

                <button
                  type="button"
                  onClick={close}
                  className="mt-4 block w-full font-body text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
                  style={{ fontSize: "var(--text-body-sm)" }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="bg-dark px-6 py-7 pr-14 sm:px-10">
                  <h2
                    id={titleId}
                    className="font-display font-semibold uppercase tracking-[0.02em] text-white"
                    style={{ fontSize: "var(--text-h2)" }}
                  >
                    Get a Free Quote
                  </h2>
                  <p
                    className="mt-2 font-body text-white/70"
                    style={{ fontSize: "var(--text-body-sm)" }}
                  >
                    Tell us what you&apos;re looking for and our team will get
                    back to you with pricing and options.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="px-6 py-7 sm:px-10 sm:py-8"
                >
                  <div className="grid gap-4">
                    <input
                      ref={firstFieldRef}
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="What's your good name?*"
                      aria-label="Your name"
                      autoComplete="name"
                      className={field}
                    />
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="Enter your phone number*"
                      aria-label="Phone number"
                      autoComplete="tel"
                      className={field}
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      autoComplete="email"
                      className={field}
                    />
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="What are you looking for? (optional)"
                      aria-label="Your requirement"
                      rows={3}
                      className={`${field} resize-y`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-5 w-full bg-accent px-8 py-4 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover"
                  >
                    Send Enquiry
                  </button>

                  <p
                    className="mt-4 text-center font-body text-ink-subtle"
                    style={{ fontSize: "var(--text-body-sm)" }}
                  >
                    Or call us on{" "}
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="text-ink-muted underline underline-offset-2 hover:text-accent"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
