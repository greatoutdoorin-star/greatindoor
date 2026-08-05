import { createClient } from "@supabase/supabase-js";

/**
 * Lead capture.
 *
 * Every enquiry on this site hands off to WhatsApp, which leaves no
 * server-side trace: if the visitor never sends the pre-filled message, or the
 * popup is blocked, the lead is gone. This module records the submission
 * before that handoff so it survives regardless.
 *
 * Supabase is optional. Without credentials the lead is logged to the server
 * console and `stored` comes back false — the form still works, and switching
 * on persistence later is purely an env-var change with no code edit.
 */

export type LeadSource = "contact" | "b2b" | "product";

export type Lead = {
  source: LeadSource;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  message?: string;
  /** Product slug, when the enquiry came from a product page. */
  product?: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Service-role key — server-only, never NEXT_PUBLIC. Writes bypass RLS so the
 * `leads` table can stay closed to anonymous reads while still accepting
 * inserts from this route handler.
 */
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isPersistenceConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);
}

/** Trim, drop empties, and cap lengths so one bad post can't write a novel. */
function clean(value: string | undefined, max: number): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

export type ValidationResult =
  | { ok: true; lead: Lead }
  | { ok: false; error: string };

/**
 * Validate an untrusted payload from the client.
 *
 * Name and phone are the only genuinely required fields — this is a
 * lead-gen form, and demanding more loses enquiries.
 */
export function validateLead(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const body = input as Record<string, unknown>;
  const str = (k: string) =>
    typeof body[k] === "string" ? (body[k] as string) : undefined;

  const source = str("source");
  if (source !== "contact" && source !== "b2b" && source !== "product") {
    return { ok: false, error: "Unknown enquiry source." };
  }

  const name = clean(str("name"), 120);
  if (!name) return { ok: false, error: "Please tell us your name." };

  const phone = clean(str("phone"), 32);
  if (!phone) return { ok: false, error: "Please add a phone number." };
  // Deliberately loose: Indian mobiles, landlines with STD codes and numbers
  // pasted with +91 or spaces should all pass. This filters junk, not format.
  if (!/\d{6,}/.test(phone.replace(/\D/g, ""))) {
    return { ok: false, error: "That phone number doesn't look right." };
  }

  const email = clean(str("email"), 160);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  return {
    ok: true,
    lead: {
      source,
      name,
      phone,
      email,
      company: clean(str("company"), 160),
      city: clean(str("city"), 120),
      message: clean(str("message"), 4000),
      product: clean(str("product"), 200),
    },
  };
}

/**
 * Persist a lead. Never throws — a storage failure must not stop the visitor
 * reaching WhatsApp, which is still the primary conversion path.
 */
export async function recordLead(lead: Lead): Promise<{ stored: boolean }> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    // No database yet: at least leave a server-side trace so nothing is lost
    // silently while the project is still on seed data.
    console.info("[lead]", JSON.stringify(lead));
    return { stored: false };
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.from("leads").insert({
      source: lead.source,
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? null,
      company: lead.company ?? null,
      city: lead.city ?? null,
      message: lead.message ?? null,
      product: lead.product ?? null,
    });

    if (error) {
      console.error("[lead] insert failed", error.message);
      console.info("[lead]", JSON.stringify(lead));
      return { stored: false };
    }

    return { stored: true };
  } catch (cause) {
    console.error("[lead] unexpected failure", cause);
    console.info("[lead]", JSON.stringify(lead));
    return { stored: false };
  }
}
