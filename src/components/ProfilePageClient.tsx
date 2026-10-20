"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PageHero } from "@/components/PageHero";

interface ProfilePageClientProps {
  contentJa: string;
  contentEn: string;
}

export function ProfilePageClient({ contentJa, contentEn }: ProfilePageClientProps) {
  const [lang, setLang] = useState<"ja" | "en">("en");
  const content = lang === "en" ? contentEn : contentJa;

  return (
    <div lang={lang}>
      <PageHero
        title={lang === "en" ? "Profile" : "プロフィール"}
        photo="winter-walk"
        position="lower"
      />
      <div className="reading-page page-hero-body">
        <LanguageToggle language={lang} onChange={setLang} label="Profile language" />
        <div className="prose profile-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <Link href="/profile/resume" className="profile-resume-link">
          {lang === "en" ? "Resume" : "レジュメ"}
        </Link>
      </div>
    </div>
  );
}
