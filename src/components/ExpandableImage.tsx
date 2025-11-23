"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ExpandableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ExpandableImage({ src, alt, width, height, className }: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`cursor-pointer ${className}`}
        onClick={() => setIsExpanded(true)}
        unoptimized={true}
      />

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={src}
              alt={alt}
              width={0}
              height={0}
              className="w-auto h-auto max-w-full max-h-full object-contain"
              style={{ width: "auto", height: "auto" }}
              unoptimized={true}
            />
          </div>
        </div>
      )}
    </>
  );
}
