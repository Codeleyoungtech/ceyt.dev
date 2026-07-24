import Link from "next/link";

const navItems = [
  { href: "/projects", label: "projects" },
  { href: "/writing", label: "writing" },
  { href: "/about", label: "about" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
  { href: "/uses", label: "uses" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 mb-8 border-b border-[var(--border-soft)] bg-[rgba(13,15,20,0.88)] backdrop-blur">
      <nav className="flex items-center justify-between py-4 text-sm">
        <Link
          href="/"
          className="font-mono text-[15px] tracking-wide text-[var(--text-primary)] hover:text-[var(--accent-indigo)]"
        >
          ceyt_
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-2 font-mono text-[13px] sm:gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="px-1 py-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                [{item.label}]
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
