import Image from "next/image";
import type { Metadata } from "next";
import { Log } from "@/components/LogClient";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = { title: "home | hondaya" };

export default function Home() {
  return (
    <SiteShell>
      <div className="home-content">
        <h1 className="sr-only">Yasuhisa Honda — Software Engineer</h1>
        <picture className="home-photograph">
          <source
            type="image/webp"
            srcSet={[600, 960, 1440]
              .map((size) => `/photographs/featured/img-6942-${size}.webp ${size}w`)
              .join(", ")}
            sizes="(min-width: 1024px) 900px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)"
          />
          <Image
            src="/photographs/featured/img-6942-960.webp"
            alt="山頂でカメラを構える人と青い山並み"
            width={1440}
            height={960}
            loading="eager"
            fetchPriority="high"
            unoptimized
          />
        </picture>
      </div>
      <Log />
    </SiteShell>
  );
}
