import { jsonLdHtml } from "@/lib/structured-data";

/**
 * Renders a schema.org payload as a JSON-LD script tag.
 *
 * A native `<script>` is correct here rather than `next/script` — JSON-LD is
 * data, not executable code, so it needs no loading strategy.
 */
export default function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdHtml(schema) }}
    />
  );
}
