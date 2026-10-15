import React from "react";
import LinksSection, { LinkItem } from "@/components/LinksSection";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Links",
};

export default function LinksPage() {
  const techBlogLinks: LinkItem[] = [
    { url: "https://techblog.lycorp.co.jp/ja/20250708a" },
    { url: "https://techblog.lycorp.co.jp/ja/20231208a" },
  ];

  const eventLinks: LinkItem[] = [
    { url: "https://hacku.yahoo.co.jp/hacku2025_osaka/" },
    { url: "https://engineering.linecorp.com/ja/blog/internship2021-hackathon" },
  ];

  const talkLinks: LinkItem[] = [
    { url: "https://ccc2025fall.java-users.jp/" },
    { url: "https://speakerdeck.com/hondaya14/the-pitfall-of-kotlins-null-safety" },
    { url: "https://freee.connpass.com/event/304573/" },
  ];

  return (
    <>
      <PageHero title="Links" photo="sunset-bridge" />
      <div className="reading-page page-hero-body">
        <div className="links-content">
          <LinksSection title="Tech Blog" links={techBlogLinks} />
          <LinksSection title="Talks" links={talkLinks} />
          <LinksSection title="Events" links={eventLinks} />
        </div>
      </div>
    </>
  );
}
