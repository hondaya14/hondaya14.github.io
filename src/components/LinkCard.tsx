import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface OGPData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

interface LinkCardProps {
  url: string;
  children?: React.ReactNode;
  ogpData?: OGPData;
  size?: "small" | "large";
}

export function LinkCard({ url, children, ogpData, size = "small" }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card ${size === "large" ? "link-card-large" : ""}`}
    >
      <div className="link-card-inner">
        {ogpData?.image && (
          <Image
            src={ogpData.image}
            alt=""
            width={200}
            height={150}
            className="link-card-image"
            unoptimized
          />
        )}
        <div className="link-card-body">
          <h3 className="link-card-title">{ogpData?.title || children || url}</h3>
          {ogpData?.description && (
            <p className="link-card-description line-clamp-2">{ogpData.description}</p>
          )}
          <div className="link-card-source">
            <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{ogpData?.siteName || new URL(url).hostname}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
