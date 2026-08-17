import { getAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Image upload to Supabase Storage.
 *
 * A Route Handler rather than a Server Action because actions cap request
 * bodies at 1MB by default, which product photography exceeds routinely.
 *
 * Authorisation is checked here directly. The proxy matcher covers /admin/:path*
 * so this route is behind it, but the proxy is an optimistic check — this is
 * a public POST endpoint and has to verify for itself.
 */

const MAX_BYTES = 10 * 1024 * 1024;

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file received." }, { status: 400 });
  }

  // Trust the sniffed type, not the filename: an extension is caller-supplied.
  if (!ALLOWED.has(file.type)) {
    return Response.json(
      { error: `${file.type || "That file type"} is not an image we accept.` },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: `Images must be under ${MAX_BYTES / 1024 / 1024}MB.` },
      { status: 400 },
    );
  }

  // Derive the stored name rather than using the uploaded one — a caller
  // could otherwise supply "../" segments or overwrite an existing object.
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  const extension = EXTENSIONS[file.type];
  const unique = crypto.randomUUID().slice(0, 8);
  const objectPath = `products/${base || "image"}-${unique}.${extension}`;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.storage
      .from("catalog")
      .upload(objectPath, file, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from("catalog").getPublicUrl(objectPath);
    return Response.json({ url: data.publicUrl });
  } catch (cause) {
    const message =
      cause instanceof Error ? cause.message : "Upload failed unexpectedly.";
    return Response.json({ error: message }, { status: 500 });
  }
}
