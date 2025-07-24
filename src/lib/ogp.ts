import ogs from 'open-graph-scraper'
import { fetchAmazonProductInfo, isAmazonUrl } from './amazon'

export interface OGPData {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
}

export async function fetchOGPData(url: string): Promise<OGPData | null> {
  try {
    // AmazonURLの場合は専用のスクレイピングを使用
    if (isAmazonUrl(url)) {
      return await fetchAmazonProductInfo(url)
    }

    // 通常のOGP取得
    const { result } = await ogs({ 
      url,
      timeout: 10000
    })

    return {
      title: result.ogTitle,
      description: result.ogDescription,
      image: result.ogImage?.[0]?.url,
      siteName: result.ogSiteName,
      url: result.ogUrl || url
    }
  } catch (error) {
    console.error('Error fetching OGP data:', error)
    return null
  }
}

export function isExternalUrl(url: string, currentDomain: string = 'hondaya.co'): boolean {
  try {
    const urlObj = new URL(url)
    
    // 現在のドメインの場合は外部リンクではない
    if (urlObj.hostname === currentDomain) {
      return false
    }
    
    // HTTP/HTTPSでない場合は対象外
    if (!urlObj.protocol.startsWith('http')) {
      return false
    }
    
    // X/Twitter のユーザープロフィールリンクは無視
    if (
      (urlObj.hostname === 'x.com' || urlObj.hostname === 'twitter.com') &&
      /^\/[^\/]+\/?$/.test(urlObj.pathname) // /username または /username/ の形式
    ) {
      return false
    }
    
    return true
  } catch {
    return false
  }
}