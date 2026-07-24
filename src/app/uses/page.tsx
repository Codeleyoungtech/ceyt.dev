import type { Metadata } from "next";
import { PromptLine } from "@/components/prompt-line";

export const metadata: Metadata = {
  title: "Uses",
  description: "Daily tools and setup Eleazar uses to build products.",
  alternates: {
    canonical: "/uses",
  },
};

export default function UsesPage() {
  return (
    <div className="space-y-6 pb-12">
      <PromptLine>cat uses.md</PromptLine>
      <h1 className="font-mono text-4xl text-[var(--text-primary)]">Uses</h1>
      <div className="editor-panel rounded-xl p-5">
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
          <li>OS: Linux Mint 22 Cinnamon</li>
          <li>Terminal: Zeyt (daily driver)</li>
          <li>Package manager: pnpm</li>
          <li>Network setup: Cloudflare WARP / ProtonVPN toggle depending on route and task</li>
          <li>Core build stack: TypeScript, Next.js, Rust, Cloudflare Workers</li>
        </ul>
      </div>
    </div>
  );
}
