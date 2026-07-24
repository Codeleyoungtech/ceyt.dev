import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getProjectBySlug } from "@/lib/site-data";

const project = getProjectBySlug("zeyt");

export const metadata: Metadata = {
  title: "Zeyt",
  description: "Case study: Zeyt, CEYT's open-source GPU-optional terminal emulator.",
  alternates: {
    canonical: "/projects/zeyt",
  },
  openGraph: {
    title: "Zeyt — CEYT",
    description: "Open-source terminal emulator built with Tauri v2, Rust, and xterm.js.",
    url: "https://codeleyoungtech.dev/projects/zeyt",
    type: "article",
    images: ["/projects/zeyt/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeyt — CEYT",
    description: "Open-source terminal emulator built with Tauri v2, Rust, and xterm.js.",
    images: ["/projects/zeyt/opengraph-image"],
  },
};

export default function ZeytPage() {
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
