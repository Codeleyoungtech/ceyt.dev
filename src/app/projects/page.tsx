import type { Metadata } from "next";
import { ProjectsFilter } from "@/components/projects-filter";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured builds and in-lab experiments from CEYT.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects — CEYT",
    description: "Featured products and in-the-lab project explorations from CEYT.",
    url: "https://codeleyoungtech.dev/projects",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — CEYT",
    description: "Featured products and in-the-lab project explorations from CEYT.",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8 pb-12">
      <SectionHeading command="find projects -type all" title="Project Index" />
      <p className="max-w-3xl text-sm text-[var(--text-muted)]">
        Shipped products and in-progress explorations in one index. In-lab entries are intentionally labeled as exploratory.
      </p>
      <ProjectsFilter items={projects} />
    </div>
  );
}
