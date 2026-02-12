import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import PWAHead from "@/components/PWAHead";
import { NOTO_SANS_JP, JETBRAINS_MONO } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "hondaya.co",
  description: "Personal website of hondaya.co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <GoogleAnalytics />
        {/* Google AdSense */}
        <GoogleAdSense />
        {/* PWA Manifest & Apple settings */}
        <PWAHead />
      </head>
      <body className={`${JETBRAINS_MONO.className} ${NOTO_SANS_JP.variable} antialiased`}>{children}</body>
    </html>
  );
}
