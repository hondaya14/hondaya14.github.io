import React from 'react'
import { LinkCard } from './LinkCard'

export interface LinkItem {
  url: string
  label?: React.ReactNode
}

export interface LinksSectionProps {
  title: string
  links: LinkItem[]
}

export default function LinksSection({ title, links }: LinksSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="space-y-4">
        {links.map((link) => (
          <LinkCard key={link.url} url={link.url}>
            {link.label}
          </LinkCard>
        ))}
      </div>
    </section>
  )
}
