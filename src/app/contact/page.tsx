import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PromptLine } from "@/components/prompt-line";
import { profile } from "@/lib/site-data";
import { submitContact } from "./actions";
import type { ContactState } from "./types";

const initialState: ContactState = { ok: false, message: "" };

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to CEYT for collaboration or engineering opportunities.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <PromptLine>contact --reach-out</PromptLine>
        <h1 className="mt-3 font-mono text-4xl text-[var(--text-primary)]">Contact</h1>
      </div>

      <ContactForm action={submitContact} initialState={initialState} />

      <div className="editor-panel rounded-xl p-5 text-sm text-[var(--text-muted)]">
        <p>Direct links</p>
        <div className="mt-3 flex flex-wrap gap-4">
          <Link href={`mailto:${profile.contact.email}`} className="hover:underline">
            email
          </Link>
          <Link href={profile.contact.github} target="_blank" rel="noreferrer" className="hover:underline">
            github
          </Link>
          <Link href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
            linkedin
          </Link>
          <Link href={profile.contact.x} target="_blank" rel="noreferrer" className="hover:underline">
            x
          </Link>
          <Link href={profile.contact.threads} target="_blank" rel="noreferrer" className="hover:underline">
            threads
          </Link>
        </div>
      </div>
    </div>
  );
}
