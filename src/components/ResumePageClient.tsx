"use client";

import { useState } from "react";
import { ResumeContent } from "@/components/ResumeContent";

interface ResumePageClientProps {
  contentJa: string;
  contentEn: string;
}

export function ResumePageClient({ contentJa, contentEn }: ResumePageClientProps) {
  const [lang, setLang] = useState<"ja" | "en">("en");
  const content = lang === "en" ? contentEn : contentJa;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Language Toggle */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={() => setLang("ja")}
          className={`transition-colors ${
            lang === "ja" ? "text-red-400" : "text-gray-400 hover:text-white"
          }`}
        >
          JP
        </button>
        <button
          onClick={() => setLang("en")}
          className={`transition-colors ${
            lang === "en" ? "text-red-400" : "text-gray-400 hover:text-white"
          }`}
        >
          EN
        </button>
      </div>
      {/* Resume Content */}
      <div>
        <ResumeContent content={content} />
      </div>
    </div>
  );
}
