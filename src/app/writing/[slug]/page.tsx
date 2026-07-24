import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromptLine } from "@/components/prompt-line";
import { getAllPostsMeta, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

type WritingPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WritingPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllPostsMeta();
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/writing/${slug}`,
    },
    openGraph: {
      title: `${post.title} — CEYT`,
      description: post.excerpt,
      type: "article",
      url: `https://codeleyoungtech.dev/writing/${slug}`,
      images: [`/writing/${slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — CEYT`,
      description: post.excerpt,
      images: [`/writing/${slug}/opengraph-image`],
    },
  };
}

export default async function WritingPostPage({ params }: WritingPostPageProps) {
  const { slug } = await params;
  const known = await getPostSlugs();
  if (!known.includes(slug)) notFound();

  const post = await getPostBySlug(slug);

  return (
    <article className="prose-ceyt max-w-3xl pb-12">
      <PromptLine>cat posts/{slug}.md</PromptLine>
      <h1 className="mt-4 font-mono text-4xl text-[var(--text-primary)]">{post.title}</h1>
      <p className="mt-1 font-mono text-sm text-[var(--text-muted)]">{formatDate(post.date)}</p>
      <div className="mt-8 space-y-4">{post.content}</div>
    </article>
  );
}
