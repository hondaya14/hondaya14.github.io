import type { Metadata } from "next";
import localFont from "next/font/local";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";


const lineSeedFont = localFont({
  src: './LINESeedSans_W_XBd.woff2',
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
      </head>
      <body
        className={`${lineSeedFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
