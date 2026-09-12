import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const LINKS = [
  { href: "/articles", label: "Articles" },
  { href: "/tools", label: "Tools" },
  { href: "/tools/interview-questions", label: "Interview Qs" },
];

export default function Nav() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm sm:text-base">
          <span className="text-accent">&gt;</span>
          <span className="font-semibold text-foreground">{SITE_NAME}</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://divyatejareddy.gumroad.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-accent/40 bg-accent-soft px-3 py-1.5 text-xs sm:text-sm font-medium text-accent-strong hover:bg-accent/20 transition-colors"
        >
          Get the bundle
        </a>
      </div>
      <nav className="flex sm:hidden items-center gap-4 text-xs text-muted px-4 pb-3 -mt-1">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
