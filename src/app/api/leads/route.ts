import { recordLead, validateLead } from "@/lib/leads";

/**
 * Lead intake.
 *
 * POST-only, so it is never cached. The forms call this before opening
 * WhatsApp; a failure here is logged but reported as a soft error, because
 * blocking the WhatsApp handoff would cost the enquiry outright.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = validateLead(payload);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }

  const { stored } = await recordLead(result.lead);

  return Response.json({ ok: true, stored });
}
