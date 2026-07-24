import { cn } from "@/lib/utils";

type PromptLineProps = {
  children: React.ReactNode;
  className?: string;
};

export function PromptLine({ children, className }: PromptLineProps) {
  return (
    <div className={cn("flex gap-3 font-mono text-sm text-[var(--text-primary)]", className)}>
      <span aria-hidden className="prompt">
        $
      </span>
      <span>{children}</span>
    </div>
  );
}
