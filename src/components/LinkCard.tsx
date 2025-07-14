"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface OGPData {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
}

interface LinkCardProps {
  url: string
  children?: React.ReactNode
}

export function LinkCard({ url, children }: LinkCardProps) {
  const [ogpData, setOgpData] = useState<OGPData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchOGP = async () => {
      try {
        // CORSプロキシを使用してOGPデータを取得
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
        const response = await fetch(proxyUrl)
        
        if (response.ok) {
          const data = await response.json()
          const html = data.contents
          const ogpData = extractOGPData(html, url)
          setOgpData(ogpData)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchOGP()
  }, [url])

  const extractOGPData = (html: string, url: string): OGPData => {
    const ogpData: OGPData = { url }

    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/)
    if (titleMatch) {
      ogpData.title = titleMatch[1]
    } else {
      const titleTagMatch = html.match(/<title>([^<]*)<\/title>/)
      if (titleTagMatch) {
        ogpData.title = titleTagMatch[1].trim()
      }
    }

    const descriptionMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/)
    if (descriptionMatch) {
      ogpData.description = descriptionMatch[1]
    } else {
      const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)
      if (metaDescMatch) {
        ogpData.description = metaDescMatch[1]
      }
    }

    const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/)
    if (imageMatch) {
      let imageUrl = imageMatch[1]
      if (imageUrl.startsWith('/')) {
        const urlObj = new URL(url)
        imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`
      }
      ogpData.image = imageUrl
    }

    const siteNameMatch = html.match(/<meta\s+property="og:site_name"\s+content="([^"]*)"/)
    if (siteNameMatch) {
      ogpData.siteName = siteNameMatch[1]
    }

    return ogpData
  }

  if (loading) {
    return (
      <div className="border border-[#4C4948] rounded-lg p-4 bg-[#EFEEDF] animate-pulse">
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-[#4C4948]/20 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[#4C4948]/20 rounded w-3/4"></div>
            <div className="h-3 bg-[#4C4948]/20 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ogpData) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[#4C4948] hover:underline"
      >
        {children || url}
        <ExternalLink className="w-4 h-4" />
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-[#4C4948] rounded-lg p-4 bg-[#EFEEDF] hover:bg-[#4C4948]/5 transition-colors my-4"
    >
      <div className="flex gap-4">
        {ogpData.image && (
          <Image
            src={ogpData.image}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded flex-shrink-0"
            unoptimized={true}
          />
        )}
        <div className="flex-1 min-w-0">
          {ogpData.title && (
            <h3 className="font-semibold text-[#4C4948] line-clamp-2 mb-1">
              {ogpData.title}
            </h3>
          )}
          {ogpData.description && (
            <p className="text-sm text-[#4C4948]/80 line-clamp-2 mb-2">
              {ogpData.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-[#4C4948]/60">
            <ExternalLink className="w-3 h-3" />
            <span>{ogpData.siteName || new URL(url).hostname}</span>
          </div>
        </div>
      </div>
    </a>
  )
}