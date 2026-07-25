import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/site-data";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className={cn("editor-panel rounded-xl p-4 sm:p-5", compact ? "h-full" : "h-full")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
            {project.status === "shipped" ? "shipped" : "in the lab"}
          </p>
          <h3 className="font-mono text-xl text-[var(--text-primary)]">{project.name}</h3>
        </div>
        <span className="rounded border border-[var(--border-soft)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-muted)]">
          {project.slug}
        </span>
      </div>
      <p className="mt-4 text-sm text-[var(--text-muted)]">{project.summary}</p>
      {!compact ? (
        <div className="mt-4">
          {project.image ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--border-soft)]">
              <Image src={project.image} alt={`${project.name} screenshot`} fill className="object-cover" />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[var(--border-soft)] p-3 text-xs text-[var(--text-muted)]">
              {project.screenshotPlaceholder}
            </div>
          )}
        </div>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, compact ? 3 : 5).map((item) => (
          <li
            key={item}
            className="rounded border border-[var(--border-soft)] px-2 py-1 font-mono text-[11px] text-[var(--text-muted)]"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-4 text-sm">
        <Link href={`/projects/${project.slug}`} className="font-mono text-[var(--accent-indigo)] hover:underline">
          view case study
        </Link>
        {project.links.live ? (
          <Link href={project.links.live} target="_blank" rel="noreferrer" className="text-[var(--accent-amber)] hover:underline">
            live
          </Link>
        ) : null}
        {project.links.github ? (
          <Link
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline"
          >
            code
          </Link>
        ) : null}
      </div>
    </article>
  );
}
