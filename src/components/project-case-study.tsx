import Link from "next/link";
import { PromptLine } from "@/components/prompt-line";
import type { Project } from "@/lib/site-data";

type ProjectCaseStudyProps = {
  project: Project;
  templateLabel?: string;
};

export function ProjectCaseStudy({ project, templateLabel }: ProjectCaseStudyProps) {
  return (
    <article className="space-y-8 pb-12">
      <header className="space-y-3">
        <PromptLine>cat projects/{project.slug}.md</PromptLine>
        <h1 className="font-mono text-4xl text-[var(--text-primary)]">{project.name}</h1>
        <p className="max-w-3xl text-[var(--text-muted)]">{project.summary}</p>
        {templateLabel ? (
          <p className="max-w-3xl font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent-amber)]">
            {templateLabel}
          </p>
        ) : null}
      </header>

      <section className="editor-panel rounded-xl p-5">
        <h2 className="font-mono text-xl text-[var(--text-primary)]">Why this exists</h2>
        <p className="mt-3 text-sm text-[var(--text-muted)]">{project.details.why}</p>
      </section>

      <section className="editor-panel rounded-xl p-5">
        <h2 className="font-mono text-xl text-[var(--text-primary)]">Build notes</h2>
        <p className="mt-3 text-sm text-[var(--text-muted)]">{project.details.build}</p>
        {project.details.portfolioAngle ? (
          <p className="mt-3 text-sm text-[var(--text-muted)]">{project.details.portfolioAngle}</p>
        ) : null}
      </section>

      <section className="editor-panel rounded-xl p-5">
        <h2 className="font-mono text-xl text-[var(--text-primary)]">Outcome</h2>
        <p className="mt-3 text-sm text-[var(--text-muted)]">{project.details.outcome}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
          {project.details.metrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
      </section>

      <section className="editor-panel rounded-xl border-dashed p-5">
        <h2 className="font-mono text-xl text-[var(--text-primary)]">Media</h2>
        <p className="mt-3 text-sm text-[var(--text-muted)]">{project.screenshotPlaceholder}</p>
      </section>

      <section className="flex flex-wrap gap-3">
        {project.links.live ? (
          <Link
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[var(--accent-indigo)] hover:underline"
          >
            open live project
          </Link>
        ) : null}
        {project.links.github ? (
          <Link
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[var(--accent-amber)] hover:underline"
          >
            open source code
          </Link>
        ) : null}
        <Link href="/projects" className="font-mono text-[var(--text-muted)] hover:underline">
          back to all projects
        </Link>
      </section>
    </article>
  );
}
