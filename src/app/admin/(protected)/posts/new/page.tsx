import Link from "next/link";
import PostForm from "@/components/admin/PostForm";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <>
      <Link
        href="/admin/posts"
        className="font-body text-ink-muted hover:text-ink"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        ← Blog posts
      </Link>

      <h1
        className="mt-3 font-display font-bold"
        style={{ fontSize: "var(--text-h1)" }}
      >
        New post
      </h1>

      <PostForm />
    </>
  );
}
