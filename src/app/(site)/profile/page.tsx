import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { ProfilePageClient } from "@/components/ProfilePageClient";

export const metadata: Metadata = {
  title: "Profile | hondaya.co",
  description: "Profile of Yasuhisa Honda",
};

function readProfileFile(lang: "ja" | "en"): string {
  const filePath = path.join(process.cwd(), "content-master", "profile", `profile-${lang}.md`);
  return fs.readFileSync(filePath, "utf-8");
}

export default function ProfilePage() {
  const contentJa = readProfileFile("ja");
  const contentEn = readProfileFile("en");

  return <ProfilePageClient contentJa={contentJa} contentEn={contentEn} />;
}
