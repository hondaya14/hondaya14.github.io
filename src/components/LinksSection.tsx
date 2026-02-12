import React from "react";
import { LinkCard } from "./LinkCard";
import { fetchOGPData } from "@/lib/ogp";

export interface LinkItem {
  url: string;
  label?: React.ReactNode;
}

export interface LinksSectionProps {
  title: string;
  links: LinkItem[];
}

export default async function LinksSection({ title, links }: LinksSectionProps) {
  const linksWithOGP = await Promise.all(
    links.map(async (link) => ({
      ...link,
      ogpData: (await fetchOGPData(link.url)) || {},
    })),
  );

  return (
    <section className="space-y-4">
      <p className="text-sm font-semibold mb-2 mt-4 text-white">{title}</p>
      <div className="space-y-4">
        {linksWithOGP.map((link) => (
          <LinkCard key={link.url} url={link.url} ogpData={link.ogpData} size="large">
            {link.label}
          </LinkCard>
        ))}
      </div>
    </section>
  );
}
