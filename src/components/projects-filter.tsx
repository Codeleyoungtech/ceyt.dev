"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/site-data";

type ProjectsFilterProps = {
  items: Project[];
};

export function ProjectsFilter({ items }: ProjectsFilterProps) {
  const [status, setStatus] = useState<"all" | "shipped" | "in-lab">("all");
  const [stack, setStack] = useState<string>("all");

  const stacks = useMemo(() => {
    const unique = new Set<string>();
    for (const item of items) {
      for (const value of item.stack) unique.add(value);
    }
    return ["all", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const filtered = items.filter((item) => {
    const statusMatch = status === "all" || item.status === status;
    const stackMatch = stack === "all" || item.stack.includes(stack);
    return statusMatch && stackMatch;
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "shipped", "in-lab"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={status === item}
            onClick={() => setStatus(item)}
            className="rounded border border-[var(--border-soft)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)] aria-pressed:border-[var(--accent-indigo)] aria-pressed:text-[var(--text-primary)]"
          >
            status:{item}
          </button>
        ))}
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {stacks.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={stack === item}
            onClick={() => setStack(item)}
            className="rounded border border-[var(--border-soft)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)] aria-pressed:border-[var(--accent-amber)] aria-pressed:text-[var(--text-primary)]"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} compact />
        ))}
      </div>
    </div>
  );
}
