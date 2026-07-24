import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: React.ReactNode;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "src/content/posts");

export async function getPostSlugs() {
  const files = await fs.readdir(POSTS_DIRECTORY);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(".mdx", ""));
}

export async function getAllPostsMeta() {
  const slugs = await getPostSlugs();
  const all = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
      const source = await fs.readFile(filePath, "utf-8");
      const { data } = matter(source);
      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        excerpt: String(data.excerpt),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      } satisfies PostMeta;
    }),
  );

  return all.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(source);

  const compiled = await compileMDX({
    source: content,
    components: mdxComponents,
  });

  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    excerpt: String(data.excerpt),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content: compiled.content,
  } satisfies Post;
}
