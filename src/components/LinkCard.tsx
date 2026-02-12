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
  const isLarge = size === "large";
  const hasOGPData = ogpData && (ogpData.title || ogpData.description || ogpData.image);

  return (
    <a href={url} target="_blank" className={`block ${isLarge ? "p-4" : "p-3"} no-underline`}>
      <div className={`flex ${isLarge ? "gap-4" : "gap-3"}`}>
        {/* Image area - always show to maintain layout */}
        <div
          className={`${isLarge ? "w-1/3" : "w-20 h-20"} bg-[#15171a] rounded flex-shrink-0 flex items-center justify-center p-1`}
        >
          {hasOGPData && ogpData?.image ? (
            <Image
              src={ogpData.image}
              alt=""
              width={isLarge ? 200 : 80}
              height={isLarge ? 200 : 80}
              className="w-full h-full object-contain rounded"
              unoptimized={true}
            />
          ) : (
            <span className="text-xs text-gray-500">N/A :(</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          {hasOGPData && ogpData?.title ? (
            <h5
              className={`text-white ${isLarge ? "text-sm" : "text-xs"} font-medium line-clamp-2 ${isLarge ? "" : "mb-1"}`}
            >
              {ogpData.title}
            </h5>
          ) : (
            <h5
              className={`text-white ${isLarge ? "text-sm" : "text-xs"} font-medium line-clamp-2 ${isLarge ? "" : "mb-1"}`}
            >
              {children || url}
            </h5>
          )}
          {hasOGPData && ogpData?.description && (
            <p
              className={`${isLarge ? "text-sm" : "text-xs"} text-gray-300 line-clamp-2 ${isLarge ? "" : "mb-2"}`}
            >
              {ogpData.description}
            </p>
          )}
          <div className={`flex items-center ${isLarge ? "gap-2" : "gap-1"} text-xs text-gray-400`}>
            <ExternalLink className="w-3 h-3" />
            <span className="truncate">{ogpData?.siteName || new URL(url).hostname}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
