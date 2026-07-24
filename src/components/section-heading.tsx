import { PromptLine } from "@/components/prompt-line";

type SectionHeadingProps = {
  command: string;
  title: string;
  action?: React.ReactNode;
};

export function SectionHeading({ command, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <PromptLine className="text-[var(--text-muted)]">{command}</PromptLine>
        <h2 className="mt-2 font-mono text-2xl tracking-tight text-[var(--text-primary)]">{title}</h2>
      </div>
      {action ? <div className="text-sm">{action}</div> : null}
    </div>
  );
}
