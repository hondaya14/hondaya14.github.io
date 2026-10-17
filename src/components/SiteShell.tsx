import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/hondaya14" },
  { label: "X", href: "https://x.com/hondaya14" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yasuhisa-honda-5a5470274/" },
  { label: "Speaker Deck", href: "https://speakerdeck.com/hondaya14" },
  { label: "Filmarks", href: "https://filmarks.com/users/honhon_marks" },
  { label: "YAMAP", href: "https://yamap.com/users/4591140" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <SiteHeader />
      </header>
      <main id="main-content" className="site-main">
        {children}
      </main>
      <footer className="site-footer">
        <nav aria-label="Social links" className="social-links">
          {socialLinks.map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </nav>
        <div className="footer-meta">
          <span>&copy; {new Date().getFullYear()} hondaya.co</span>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
