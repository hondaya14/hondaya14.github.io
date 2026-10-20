"use client";

import { useState } from "react";
import { ResumeContent } from "@/components/ResumeContent";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LanguageToggle } from "@/components/LanguageToggle";

interface ResumePageClientProps {
  contentJa: string;
  contentEn: string;
}

export function ResumePageClient({ contentJa, contentEn }: ResumePageClientProps) {
  const [lang, setLang] = useState<"ja" | "en">("en");
  const content = lang === "en" ? contentEn : contentJa;
  return (
    <div lang={lang}>
      <PageHero title="Resume" photo="winter-walk" position="lower" />
      <div className="reading-page page-hero-body">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: lang === "en" ? "Profile" : "プロフィール", href: "/profile" },
            { label: lang === "en" ? "Resume" : "レジュメ" },
          ]}
        />
        <LanguageToggle language={lang} onChange={setLang} label="Resume language" />
        <ResumeContent content={content} hideTitle />
      </div>
    </div>
  );
}
