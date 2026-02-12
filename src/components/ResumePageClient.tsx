"use client";

import { useState } from "react";
import Link from "next/link";
import { ResumeContent } from "@/components/ResumeContent";

interface ResumePageClientProps {
  contentJa: string;
  contentEn: string;
}

function ResumeHeader({
  lang,
  setLang,
}: {
  lang: "ja" | "en";
  setLang: (lang: "ja" | "en") => void;
}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
      <Link href="/" className="text-white font-bold no-underline">
        <span>Resume</span>
      </Link>
      <div className="flex gap-4">
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
    </div>
  );
}

export function ResumePageClient({ contentJa, contentEn }: ResumePageClientProps) {
  const [lang, setLang] = useState<"ja" | "en">("en");
  const content = lang === "en" ? contentEn : contentJa;

  return (
    <div className="min-h-screen bg-[#101114] text-white">
      <header className="sticky top-0 z-50 border-b border-gray-600 bg-[#101114]/90 backdrop-blur">
        <ResumeHeader lang={lang} setLang={setLang} />
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Resume Content */}
        <div>
          <ResumeContent content={content} />
        </div>
      </main>
    </div>
  );
}
