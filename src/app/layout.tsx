import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import localFont from "next/font/local";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import PWAHead from "@/components/PWAHead";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });


export const lineSeedFont = localFont({
  src: './LINESeedSans_W_XBd.woff2',
})
const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
})

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
