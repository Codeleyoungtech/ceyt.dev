import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getAllPostsMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description: "Build notes, lessons, and progress logs from CEYT.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing — CEYT",
    description: "Build notes, release logs, and practical lessons from CEYT projects.",
    url: "https://codeleyoungtech.dev/writing",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — CEYT",
    description: "Build notes, release logs, and practical lessons from CEYT projects.",
    images: ["/opengraph-image"],
  },
};

export default async function WritingPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="space-y-8 pb-12">
      <SectionHeading command="ls posts/*.mdx" title="Writing" />
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="editor-panel rounded-xl p-5">
            <p className="font-mono text-xs text-[var(--text-muted)]">{formatDate(post.date)}</p>
            <h2 className="mt-1 font-mono text-2xl text-[var(--text-primary)]">{post.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
            <Link
              href={`/writing/${post.slug}`}
              className="mt-4 inline-block font-mono text-sm text-[var(--accent-indigo)] hover:underline"
            >
              read this post
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
