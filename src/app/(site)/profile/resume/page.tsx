import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { ResumePageClient } from "@/components/ResumePageClient";

export const metadata: Metadata = {
  title: "Resume | hondaya.co",
  description: "Resume of Yasuhisa Honda",
};

function readResumeFile(lang: "ja" | "en"): string {
  const filePath = path.join(process.cwd(), "content-master", "resume", `resume-${lang}.md`);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Failed to read resume file for ${lang}:`, error);
    return "";
  }
}

export default function ResumePage() {
  const contentJa = readResumeFile("ja");
  const contentEn = readResumeFile("en");

  return <ResumePageClient contentJa={contentJa} contentEn={contentEn} />;
}
