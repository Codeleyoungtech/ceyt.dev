import Image from "next/image";
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
      
      <section className="mb-8 overflow-hidden rounded-xl border border-[var(--border-soft)] w-48 h-48 relative">
        <Image src="/images/headshot.jpg" alt="Eleazar Ogoyemi" fill className="object-cover" />
      </section>

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
    </div>
  );
}
