import React from 'react'
import { LinkCard } from './LinkCard'
import ogs from 'open-graph-scraper'

export interface LinkItem {
  url: string
  label?: React.ReactNode
}

export interface LinksSectionProps {
  title: string
  links: LinkItem[]
}

export interface OGPData {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
}

async function getOGPData(url: string): Promise<OGPData> {
  try {
    const { result } = await ogs({ url })
    return {
      title: result.ogTitle,
      description: result.ogDescription,
      image: result.ogImage?.[0]?.url,
      siteName: result.ogSiteName,
      url: result.ogUrl || url
    }
  } catch (error) {
    console.error('Error fetching OGP data:', error)
    return {}
  }
}

export default async function LinksSection({ title, links }: LinksSectionProps) {
  const linksWithOGP = await Promise.all(
    links.map(async (link) => ({
      ...link,
      ogpData: await getOGPData(link.url)
    }))
  )

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="space-y-4">
        {linksWithOGP.map((link) => (
          <LinkCard key={link.url} url={link.url} ogpData={link.ogpData} size="large">
            {link.label}
          </LinkCard>
        ))}
      </div>
    </section>
  )
}
