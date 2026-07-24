import type { Metadata } from "next";
import Link from "next/link";
import { PromptLine } from "@/components/prompt-line";

export const metadata: Metadata = {
  title: "Resume",
  description: "Live resume for Eleazar Ogoyemi with downloadable ATS-safe PDF.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return (
    <div className="space-y-8 pb-12">
      <header>
        <PromptLine>cat resume.md</PromptLine>
        <h1 className="mt-3 font-mono text-4xl text-[var(--text-primary)]">Resume</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          HTML version matches the site style; recruiters can download the ATS-safe PDF below.
        </p>
        <Link
          href="/resume/eleazar-ogoyemi-ats-resume.pdf"
          className="mt-4 inline-block font-mono text-[var(--accent-indigo)] hover:underline"
        >
          Download PDF
        </Link>
      </header>

      <section className="editor-panel rounded-xl p-5">
        <h2 className="font-mono text-2xl text-[var(--text-primary)]">Eleazar Ogoyemi</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Full Stack Software Engineer · Remote</p>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Stack: TypeScript, React, Next.js, Express.js, Rust, Tauri v2, Cloudflare Workers/D1/KV/Queues, Hono, Drizzle ORM, WebRTC.
        </p>
      </section>

      <section className="editor-panel rounded-xl p-5">
        <h3 className="font-mono text-xl text-[var(--text-primary)]">Experience</h3>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Alpinebolt — Full Stack Software Engineer (remote). Approximate contribution share: ~40% of FieldPilot implementation.
        </p>
      </section>

      <section className="editor-panel rounded-xl p-5">
        <h3 className="font-mono text-xl text-[var(--text-primary)]">Selected Work</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
          <li>Flustro — offline-first voice dictation desktop app with real paying users.</li>
          <li>Zeyt — open-source terminal emulator with CI/CD public releases.</li>
          <li>Swyp — Cloudflare Worker AI carousel generation system.</li>
        </ul>
      </section>

      <section className="editor-panel rounded-xl border-dashed p-5">
        <h3 className="font-mono text-xl text-[var(--text-primary)]">ATS PDF Placeholder</h3>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          [PLACEHOLDER: Replace /public/resume/eleazar-ogoyemi-ats-resume.pdf with finalized ATS-safe resume file.]
        </p>
      </section>
    </div>
  );
}
