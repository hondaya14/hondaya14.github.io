"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith("/blog");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
      <Link href="/" className="text-white font-bold no-underline">
        <img src="/icon.png" alt="hondaya.co" width={32} height={32} className="w-8 h-8" />
      </Link>
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-4">
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${
              pathname === "/blog" ? "text-red-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/links"
            className={`text-sm font-medium transition-colors ${
              pathname === "/links" ? "text-red-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Links
          </Link>
          <Link
            href="/resume"
            className={`text-sm font-medium transition-colors ${
              pathname === "/resume" ? "text-red-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Resume
          </Link>
        </nav>
        {isBlogPage && (
          <Link
            href="/blog/feed.xml"
            className="flex items-center space-x-2 text-white font-bold no-underline text-sm"
          >
            <Rss className="h-4 w-4" />
            <span>Subscribe</span>
          </Link>
        )}
      </div>
    </div>
  );
}
