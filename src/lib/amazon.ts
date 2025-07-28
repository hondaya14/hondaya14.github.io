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
    // Amazon側でbotブロックが原因でOGP取得が不安定になる問題を修正
    // User-Agentヘッダーを追加してブラウザからのリクエストとして認識させる
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Amazon page')
    }

    console.log('Success for fetching Amazon product info: ', url)

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
      title: title || 'Amazon',
      description: description || 'Please check the product page for more details.',
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