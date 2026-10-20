"use client";

interface LanguageToggleProps {
  language: "ja" | "en";
  onChange: (language: "ja" | "en") => void;
  label: string;
}

export function LanguageToggle({ language, onChange, label }: LanguageToggleProps) {
  return (
    <div className="language-toggle" role="group" aria-label={label}>
      <button onClick={() => onChange("ja")} aria-pressed={language === "ja"} aria-label="日本語">
        JP
      </button>
      <button onClick={() => onChange("en")} aria-pressed={language === "en"} aria-label="English">
        EN
      </button>
    </div>
  );
}
