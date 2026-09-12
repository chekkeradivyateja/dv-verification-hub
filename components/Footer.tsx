import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between text-sm text-muted">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. Written by a working DV/UVM engineer.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/articles" className="hover:text-foreground transition-colors">
            Articles
          </Link>
          <Link href="/tools" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <a
            href="https://divyatejareddy.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Gumroad bundle
          </a>
        </div>
      </div>
    </footer>
  );
}
