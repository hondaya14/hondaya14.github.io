"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/blog", label: "Blog" },
  { href: "/links", label: "Links" },
  { href: "/profile", label: "Profile" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <div className="header-inner">
      <div className="site-identity">
        <Link href="/" className="site-name">
          Yasuhisa Honda
        </Link>
        <p className="site-role">Software Engineer</p>
      </div>
      <nav aria-label="Main navigation" className="site-navigation">
        {navigation.map(({ href, label }) => {
          const active = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined}>
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
