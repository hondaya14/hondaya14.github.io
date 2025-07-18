import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import PWAHead from "@/components/PWAHead";
import "./globals.css";


const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: "Yasuhisa Honda",
  description: "Personal website of Honda Yasuhisa",
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
