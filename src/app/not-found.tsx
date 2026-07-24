import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center gap-4">
      <p className="font-mono text-[var(--accent-indigo)]">$ bash /page</p>
      <h1 className="font-mono text-4xl text-[var(--text-primary)]">bash: /page: command not found</h1>
      <p className="text-sm text-[var(--text-muted)]">This route does not exist in the current workspace.</p>
      <Link href="/" className="font-mono text-[var(--accent-indigo)] hover:underline">
        cd ~
      </Link>
    </div>
  );
}

