import { SITE, WHATSAPP_NUMBER, WHATSAPP_TEMPLATES } from "./site";

type TemplateTokens = {
  name?: string;
  qty?: number | string;
  url?: string;
};

/** Replace `{{token}}` placeholders; unknown tokens collapse to an empty string. */
function fill(template: string, tokens: TemplateTokens): string {
  const filled = template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = tokens[key as keyof TemplateTokens];
    return value === undefined || value === null ? "" : String(value);
  });

  // A dropped token can strand its separator, leaving a trailing dash on the
  // line. Tidy that here rather than requiring every template to be written
  // defensively.
  return filled
    .split("\n")
    .map((line) => line.replace(/[\s]*[—–-]\s*$/, "").trimEnd())
    .join("\n");
}

/** Build a wa.me deep link with a pre-filled message. */
export function buildWhatsAppLink(
  message: string,
  number: string = WHATSAPP_NUMBER,
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Product enquiry link. No price token — the catalogue is quoted on enquiry, so
 * the message must not imply the customer was shown a figure.
 */
export function productEnquiryLink(opts: {
  name: string;
  qty?: number;
  slug: string;
  template?: string;
  number?: string;
}): string {
  const message = fill(opts.template ?? WHATSAPP_TEMPLATES.product, {
    name: opts.name,
    qty: opts.qty ?? 1,
    url: `${SITE.url}/products/${opts.slug}`,
  });
  return buildWhatsAppLink(message, opts.number);
}

/** Bulk / B2B enquiry — distinct template so these leads are recognisable. */
export function b2bEnquiryLink(template?: string, number?: string): string {
  return buildWhatsAppLink(template ?? WHATSAPP_TEMPLATES.b2b, number);
}

/** Generic enquiry, used by the floating action button. */
export function generalEnquiryLink(template?: string, number?: string): string {
  return buildWhatsAppLink(template ?? WHATSAPP_TEMPLATES.general, number);
}

/**
 * Everything here is quoted on enquiry — most of the catalogue is made to
 * order, so a fixed figure would be misleading. Products carry no price field
 * at all; this is what the card and product page show instead.
 */
export const PRICE_PLACEHOLDER = "Contact for price";
