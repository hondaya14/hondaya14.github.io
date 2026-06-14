"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const ADSENSE_ALLOWED_PATHS = [/^\/$/, /^\/blog(?:\/.*)?$/, /^\/links\/?$/];

function shouldLoadAdSense(pathname: string | null): boolean {
  if (!pathname) return false;
  return ADSENSE_ALLOWED_PATHS.some((pattern) => pattern.test(pathname));
}

export default function GoogleAdSense() {
  const pathname = usePathname();

  if (!shouldLoadAdSense(pathname)) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2516886759191822`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
