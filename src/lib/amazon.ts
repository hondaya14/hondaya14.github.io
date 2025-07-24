import * as cheerio from 'cheerio'

export interface AmazonProductInfo {
  title?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
}

export async function fetchAmazonProductInfo(url: string): Promise<AmazonProductInfo | null> {
  try {
    console.log(url)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch Amazon page')
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Amazon商品情報の抽出
    const title = $('#productTitle').text().trim() || 
                  $('h1.a-size-large').text().trim() ||
                  $('h1').first().text().trim()

    // 商品画像の取得
    const image = $('#landingImage').attr('src') ||
                  $('.a-dynamic-image').first().attr('src') ||
                  $('img[data-old-hires]').first().attr('data-old-hires')

    // 商品説明の取得
    const description = $('#feature-bullets ul li').first().text().trim() ||
                        $('.a-unordered-list.a-nostyle.a-vertical').first().text().trim().slice(0, 200)

    return {
      title: title || 'Amazon商品',
      description: description || '商品詳細を確認してください',
      image: image || undefined,
      siteName: 'Amazon',
      url: url
    }
  } catch (error) {
    console.error('Error scraping Amazon product:', error)
    return null
  }
}

export function isAmazonUrl(url: string): boolean {
  return /amazon\.(co\.jp|com)/i.test(url) || /amzn\.(asia|to)/i.test(url)
}