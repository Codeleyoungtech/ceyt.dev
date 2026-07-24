import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getProjectBySlug } from "@/lib/site-data";

const project = getProjectBySlug("flustro");

export const metadata: Metadata = {
  title: "Flustro",
  description: "Case study: Flustro, CEYT's offline-first voice dictation desktop app.",
  alternates: {
    canonical: "/projects/flustro",
  },
  openGraph: {
    title: "Flustro — CEYT",
    description: "Offline-first voice dictation desktop app built with Tauri v2, Rust, React, and Python.",
    url: "https://codeleyoungtech.dev/projects/flustro",
    type: "article",
    images: ["/projects/flustro/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flustro — CEYT",
    description: "Offline-first voice dictation desktop app built with Tauri v2, Rust, React, and Python.",
    images: ["/projects/flustro/opengraph-image"],
  },
};

export default function FlustroPage() {
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
