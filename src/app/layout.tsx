import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import PWAHead from "@/components/PWAHead";
import { notoSansJp } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yasuhisa Honda",
  description: "Personal website of Yasuhisa Honda",
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
        <GoogleAnalytics/>
        {/* Google AdSense */}
        <GoogleAdSense/>
        {/* PWA Manifest & Apple settings */}
        <PWAHead/>
      </head>
      <body className={`${notoSansJp.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
