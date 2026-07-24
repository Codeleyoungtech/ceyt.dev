import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getProjectBySlug } from "@/lib/site-data";

const project = getProjectBySlug("swyp");

export const metadata: Metadata = {
  title: "Swyp",
  description: "Case study: Swyp, CEYT's in-house AI carousel generation tool.",
  alternates: {
    canonical: "/projects/swyp",
  },
  openGraph: {
    title: "Swyp — CEYT",
    description: "In-house Cloudflare Worker pipeline for AI carousel generation and publishing throughput.",
    url: "https://codeleyoungtech.dev/projects/swyp",
    type: "article",
    images: ["/projects/swyp/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swyp — CEYT",
    description: "In-house Cloudflare Worker pipeline for AI carousel generation and publishing throughput.",
    images: ["/projects/swyp/opengraph-image"],
  },
};

export default function SwypPage() {
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
