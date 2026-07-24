import Link from "next/link";
import type { Metadata } from "next";
import { HeroTerminal } from "@/components/hero-terminal";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects, inLabProjects, profile } from "@/lib/site-data";
import { getAllPostsMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description: "CEYT: full stack dev work, featured projects, writing, and in-lab experiments.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const posts = (await getAllPostsMeta()).slice(0, 3);

  return (
    <div className="space-y-16 pb-12">
      <HeroTerminal />

      <Reveal>
        <section>
          <SectionHeading command="ls projects/featured" title="Featured Projects" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <SectionHeading command="ls projects/lab" title="In the Lab" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {inLabProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <SectionHeading
            command="cat writing/latest.md"
            title="Latest Writing"
            action={
              <Link href="/writing" className="font-mono text-sm text-[var(--accent-indigo)] hover:underline">
                view all
              </Link>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="editor-panel rounded-xl p-4">
                <p className="font-mono text-xs text-[var(--text-muted)]">{formatDate(post.date)}</p>
                <h3 className="mt-2 font-mono text-lg text-[var(--text-primary)]">{post.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
                <Link
                  href={`/writing/${post.slug}`}
                  className="mt-4 inline-block font-mono text-sm text-[var(--accent-indigo)] hover:underline"
                >
                  read post
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <footer className="editor-panel rounded-2xl p-6">
        <p className="font-mono text-sm text-[var(--accent-indigo)]">$ contact --reach-out</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Open to product engineering roles, indie dev collaborations, and practical AI + Rust work.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/contact" className="font-mono text-[var(--accent-indigo)] hover:underline">
            open contact form
          </Link>
          <Link href={profile.contact.github} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:underline">
            github
          </Link>
          <Link href={profile.contact.x} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:underline">
            x
          </Link>
        </div>
      </footer>
    </div>
  );
}
