"use client";

import { useState } from "react";
import { ResumeContent } from "@/components/ResumeContent";
import { PageHero } from "@/components/PageHero";

interface ResumePageClientProps {
  contentJa: string;
  contentEn: string;
}

export function ResumePageClient({ contentJa, contentEn }: ResumePageClientProps) {
  const [lang, setLang] = useState<"ja" | "en">("en");
  const content = lang === "en" ? contentEn : contentJa;
  return (
    <div lang={lang}>
      <PageHero title={lang === "en" ? "Resume" : "履歴書"} photo="winter-walk" position="lower" />
      <div className="reading-page page-hero-body">
        <div className="language-toggle" role="group" aria-label="Resume language">
          <button onClick={() => setLang("ja")} aria-pressed={lang === "ja"} aria-label="日本語">
            JP
          </button>
          <button onClick={() => setLang("en")} aria-pressed={lang === "en"} aria-label="English">
            EN
          </button>
        </div>
        <ResumeContent content={content} hideTitle />
      </div>
    </div>
  );
}
