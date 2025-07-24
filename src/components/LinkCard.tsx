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
  ogpData?: OGPData
  size?: 'small' | 'large'
}

export function LinkCard({ url, children, ogpData, size = 'small' }: LinkCardProps) {
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

  const isLarge = size === 'large'

  return (
    <a
      href={url}
      target="_blank"
      className={`block border border-gray-600 rounded ${isLarge ? 'rounded-lg p-4' : 'p-3'} bg-[#15171a] hover:bg-gray-600/10 transition-colors no-underline`}
    >
      <div className={`flex ${isLarge ? 'gap-4' : 'gap-3'}`}>
        {ogpData.image && (
          <div className={`${isLarge ? 'w-1/3' : 'w-20 h-20'} bg-[#15171a] rounded flex-shrink-0 flex items-center justify-center p-1`}>
            <Image
              src={ogpData.image}
              alt=""
              width={isLarge ? 200 : 80}
              height={isLarge ? 200 : 80}
              className="w-full h-full object-contain rounded"
              unoptimized={true}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {ogpData.title && (
            <h5 className={`text-white ${isLarge ? 'text-base' : 'text-sm font-medium'} line-clamp-2 ${isLarge ? '' : 'mb-1'}`}>
              {ogpData.title}
            </h5>
          )}
          {ogpData.description && (
            <p className={`${isLarge ? 'text-sm' : 'text-xs'} text-gray-300 line-clamp-2 ${isLarge ? '' : 'mb-2'}`}>
              {ogpData.description}
            </p>
          )}
          <div className={`flex items-center ${isLarge ? 'gap-2' : 'gap-1'} text-xs text-gray-400`}>
            <ExternalLink className="w-3 h-3" />
            <span className="truncate">{ogpData.siteName || new URL(url).hostname}</span>
          </div>
        </div>
      </div>
    </a>
  )
}