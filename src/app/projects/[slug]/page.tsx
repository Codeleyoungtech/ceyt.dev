import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getProjectBySlug, inLabProjects } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return inLabProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — CEYT`,
      description: project.summary,
      url: `https://codeleyoungtech.dev/projects/${project.slug}`,
      type: "article",
      images: [`/projects/${project.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — CEYT`,
      description: project.summary,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.status !== "in-lab") notFound();

  return <ProjectCaseStudy project={project} templateLabel="In-lab project template" />;
}
