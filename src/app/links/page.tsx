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

  return (
    <div className="min-h-screen bg-[#101114] text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold">External Links</h1>
        <LinksSection title="Tech Blog" links={techBlogLinks} />
      </div>
    </div>
  )
}
