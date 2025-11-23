import localFont from "next/font/local";
import { Noto_Sans_JP } from "next/font/google";

export const LINE_SEED = localFont({
  src: "../app/LINESeedSans_W_XBd.woff2",
});

export const NOTO_SANS_JP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
});
