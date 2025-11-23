import { LinkCard } from "./LinkCard";
import { fetchOGPData, isExternalUrl } from "@/lib/ogp";

interface ServerLinkCardProps {
  url: string;
  children?: React.ReactNode;
  size?: "small" | "large";
}

export async function ServerLinkCard({ url, children, size = "small" }: ServerLinkCardProps) {
  let ogpData = null;

  if (isExternalUrl(url)) {
    try {
      ogpData = await fetchOGPData(url);
    } catch (error) {
      console.error("Failed to fetch OGP data:", error);
    }
  }

  return (
    <LinkCard url={url} ogpData={ogpData || undefined} size={size}>
      {children}
    </LinkCard>
  );
}
