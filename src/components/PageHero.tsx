import Image from "next/image";
import { LIBRE_BASKERVILLE } from "@/lib/fonts";

const photographs = {
  "cherry-river": { alt: "桜並木と川、緑の土手", width: 1200, height: 800 },
  "sunset-bridge": { alt: "夕日の下、鉄橋のそばに集まる人々", width: 1200, height: 800 },
  "winter-walk": { alt: "木漏れ日の差す冬の公園を歩く人", width: 1200, height: 1800 },
};

interface PageHeroProps {
  title: string;
  photo: keyof typeof photographs;
  position?: "center" | "lower";
}

export function PageHero({ title, photo, position = "center" }: PageHeroProps) {
  const photograph = photographs[photo];
  return (
    <div className="page-hero-container">
      <header className={`page-hero${position === "lower" ? " page-hero-lower" : ""}`}>
        <picture>
          <source
            type="image/webp"
            srcSet={[480, 810, 1200]
              .map((size) => `/photographs/cropped/${photo}-${size}.webp ${size}w`)
              .join(", ")}
            sizes="(min-width: 1216px) 1120px, (min-width: 1024px) calc(100vw - 96px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)"
          />
          <Image
            src={`/photographs/cropped/${photo}-1200.webp`}
            alt={photograph.alt}
            width={photograph.width}
            height={photograph.height}
            loading="eager"
            fetchPriority="high"
            unoptimized
          />
        </picture>
        <h1 className={`page-hero-title ${LIBRE_BASKERVILLE.className}`}>{title}</h1>
      </header>
    </div>
  );
}
