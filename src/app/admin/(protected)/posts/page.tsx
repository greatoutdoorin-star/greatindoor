import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listPosts } from "@/lib/admin-data";
import RowActions from "@/components/admin/RowActions";
import { deletePost, setPostVisibility } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function PostsPage({ searchParams }: Props) {
  await requireAdmin();

  const { saved } = await searchParams;
  const posts = await listPosts();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1
          className="font-display font-bold"
          style={{ fontSize: "var(--text-h1)" }}
        >
          Blog posts
        </h1>
        <Link
          href="/admin/posts/new"
          className="bg-accent px-5 py-2.5 font-display font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-accent-hover"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Write a post
        </Link>
      </div>

      {saved && (
        <p
          className="mt-4 border border-accent bg-accent/5 px-4 py-3 font-body text-ink"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Saved <strong>{saved}</strong>.
        </p>
      )}

      {posts.length === 0 ? (
        <p
          className="mt-8 border border-hairline bg-canvas px-4 py-10 text-center font-body text-ink-muted"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          No posts yet. The blog pages render empty until one is published.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {posts.map((post) => {
            // Three states, and the difference matters: a scheduled post is
            // saved and correct but deliberately not live yet.
            // Compared against the row's own value rather than a Date.now()
            // captured in render — the page is force-dynamic, so it is read
            // fresh per request anyway, and calling it during render is impure.
            const published = post.publishedAt
              ? new Date(post.publishedAt) <= new Date()
              : false;
            const scheduled = Boolean(post.publishedAt) && !published;

            return (
              <li
                key={post.slug}
                className={`flex flex-wrap items-center gap-4 border border-hairline bg-canvas p-4 ${
                  post.visible ? "" : "opacity-55"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="font-display font-semibold hover:text-accent"
                  >
                    {post.title}
                  </Link>
                  <p
                    className="truncate font-body text-ink-subtle"
                    style={{ fontSize: "11px" }}
                  >
                    {post.slug}
                  </p>
                </div>

                <span
                  className="shrink-0 bg-surface px-2 py-1 font-body uppercase tracking-[0.1em] text-ink-muted"
                  style={{ fontSize: "9px" }}
                >
                  {published ? "Published" : scheduled ? "Scheduled" : "Draft"}
                </span>

                <RowActions
                  id={post.slug}
                  visible={post.visible}
                  onToggle={setPostVisibility}
                  onDelete={deletePost}
                  label={post.title}
                  mode="toggle"
                />
                <RowActions
                  id={post.slug}
                  visible={post.visible}
                  onToggle={setPostVisibility}
                  onDelete={deletePost}
                  label={post.title}
                  mode="delete"
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
