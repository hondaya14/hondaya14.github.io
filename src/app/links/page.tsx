import React from 'react'
import LinksSection, { LinkItem } from '@/components/LinksSection'

export const metadata = {
  title: 'Links',
}

export default function LinksPage() {
  const techBlogLinks: LinkItem[] = [
    { url: 'https://techblog.lycorp.co.jp/ja/20250708a' },
    { url: 'https://techblog.lycorp.co.jp/ja/20231208a' },
  ]

  const eventLinks: LinkItem[] = [
    { url: 'https://hacku.yahoo.co.jp/hacku2025_osaka/' },
    { url: 'https://engineering.linecorp.com/ja/blog/internship2021-hackathon' },
  ]

  const talkLinks: LinkItem[] = [
    { url: 'https://freee.connpass.com/event/304573/' },
  ]


  return (
    <div className="min-h-screen bg-[#101114] text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold">Links</h1>
        <LinksSection title="Tech Blog" links={techBlogLinks} />
        <LinksSection title="Events" links={eventLinks} />
        <LinksSection title="Talks" links={talkLinks} />
      </div>
    </div>
  )
}
