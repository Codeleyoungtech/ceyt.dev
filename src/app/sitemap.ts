import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/mdx";
import { projects } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/projects", "/writing", "/about", "/resume", "/contact", "/uses"];
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);
  const postSlugs = await getPostSlugs();
  const postRoutes = postSlugs.map((slug) => `/writing/${slug}`);

  return [...staticRoutes, ...projectRoutes, ...postRoutes].map((route) => ({
    url: `https://codeleyoungtech.dev${route}`,
    lastModified: new Date(),
  }));
}

