import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { requireAdmin } from "@/lib/auth";
import { getAdminPost } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function EditPostPage({ params }: Props) {
  await requireAdmin();

  const { slug } = await params;
  if (slug === "new") notFound();

  const post = await getAdminPost(slug);
  if (!post) notFound();

  return (
    <>
      <Link
        href="/admin/posts"
        className="font-body text-ink-muted hover:text-ink"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        ← Blog posts
      </Link>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
        <h1
          className="font-display font-bold"
          style={{ fontSize: "var(--text-h1)" }}
        >
          {post.title}
        </h1>
        <Link
          href={`/blogs/${post.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-accent hover:underline"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          View on site ↗
        </Link>
      </div>

      <PostForm post={post} />
    </>
  );
}
