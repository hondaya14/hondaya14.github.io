import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import ogs from 'open-graph-scraper'

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
  ogpData?: OGPData
}

export function LinkCard({ url, children, ogpData }: LinkCardProps) {
  if (!ogpData) {
    return (
      <a
        href={url}
        target="_blank"
        className="inline-flex items-center gap-1 text-white hover:opacity-80"
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
      className="block border border-gray-600 rounded-lg p-4 bg-[#15171a] hover:bg-gray-600/10 transition-colors no-underline"
    >
      <div className="flex gap-4">
        {ogpData.image && (
          <div className="w-1/3 bg-[#15171a] rounded flex-shrink-0 flex items-center justify-center p-1">
            <Image
              src={ogpData.image}
              alt=""
              width={200}
              height={200}
              className="w-full h-full object-contain rounded"
              unoptimized={true}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {ogpData.title && (
            <h5 className="text-white text-base">
              {ogpData.title}
            </h5>
          )}
          {ogpData.description && (
            <p className="text-sm text-gray-300 line-clamp-2">
              {ogpData.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ExternalLink className="w-3 h-3" />
            <span>{ogpData.siteName || new URL(url).hostname}</span>
          </div>
        </div>
      </div>
    </a>
  )
}