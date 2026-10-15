"use client";

import { useEffect, useRef, useState } from "react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isExpanded) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [isExpanded]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="expandable-trigger"
        aria-label={`画像を拡大: ${alt || "Image"}`}
        onClick={() => setIsExpanded(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          unoptimized
        />
      </button>
      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Image preview"}
          className="image-dialog"
          onClick={() => setIsExpanded(false)}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="画像を閉じる"
            className="image-dialog-close"
            onClick={() => setIsExpanded(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="image-dialog-photo"
            unoptimized
          />
        </div>
      )}
    </>
  );
}
