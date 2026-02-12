import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <header className="sticky top-0 z-50 border-b border-gray-600 bg-[#101114]/90 backdrop-blur">
        <SiteHeader />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-8 border-t border-gray-600 text-center">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} hondaya.co. All rights reserved.{" "}
          <Link href="/privacy" className="underline text-white">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}
