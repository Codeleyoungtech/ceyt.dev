import type { Metadata } from "next";
import { PromptLine } from "@/components/prompt-line";
import { profile } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "Bio and background for Eleazar Ogoyemi (CEYT).",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-6 pb-12">
      <PromptLine>whoami --long</PromptLine>
      <h1 className="font-mono text-4xl text-[var(--text-primary)]">About Eleazar</h1>
      <p className="max-w-3xl text-[var(--text-muted)]">{profile.bio}</p>
      <p className="max-w-3xl text-[var(--text-muted)]">
        He builds under two distinct identities: CEYT for developer-focused products and engineering work, and Eleyoungtech for consumer-facing content and gadget reviews.
      </p>
      <p className="max-w-3xl text-[var(--text-muted)]">
        Current role: Full Stack Software Engineer at Alpinebolt, contributing substantially to FieldPilot, a Next.js AI voice-agent scheduling platform.
      </p>
      <p className="max-w-3xl text-[var(--text-muted)]">
        Education: University of Ibadan, CS distance-learning track, expected 2028.
      </p>
      <section className="editor-panel rounded-xl border-dashed p-5">
        <h2 className="font-mono text-xl text-[var(--text-primary)]">Photo / Avatar</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          [PLACEHOLDER: Add real headshot or commissioned illustrated avatar. No stock imagery.]
        </p>
      </section>
    </div>
  );
}
