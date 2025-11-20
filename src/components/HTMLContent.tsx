'use client'

import { useEffect, useState } from 'react'
import hljs from 'highlight.js'
import * as cheerio from 'cheerio'
import 'highlight.js/styles/github-dark.css'
import { LinkCard } from './LinkCard'
import { fetchAmazonProductInfo, isAmazonUrl, type AmazonProductInfo } from '@/lib/amazon'

interface HTMLContentProps {
  content: string
}

// Twitter widgets の型定義
interface TwitterWidgets {
  load: () => void
}

interface WindowWithTwitter extends Window {
  twitter?: {
    widgets: TwitterWidgets
  }
}

export function HTMLContent({ content }: HTMLContentProps) {
  const [processedContent, setProcessedContent] = useState(content)
  const [amazonLinks, setAmazonLinks] = useState<Array<{ url: string; text: string; id: string; productInfo?: AmazonProductInfo }>>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // シンタックスハイライトの処理
    const $ = cheerio.load(content)
    
    // Amazonリンクの検出と処理
    const foundAmazonLinks: Array<{ url: string; text: string; id: string; productInfo?: AmazonProductInfo }> = []
    $('a').each((index, element) => {
      const href = $(element).attr('href')
      
      if (href && isAmazonUrl(href)) {
        const linkId = `amazon-link-${index}`
        const linkText = $(element).text()
        foundAmazonLinks.push({ url: href, text: linkText, id: linkId })
        
        // Amazonリンクをプレースホルダーに置換
        $(element).replaceWith(`<div data-amazon-link="${linkId}" class="my-4"></div>`)
      }
    })
    setAmazonLinks(foundAmazonLinks)
    
    // Amazon商品情報を非同期で取得
    foundAmazonLinks.forEach(async (link) => {
      try {
        const productInfo = await fetchAmazonProductInfo(link.url)
        if (productInfo) {
          setAmazonLinks(prevLinks => 
            prevLinks.map(prevLink => 
              prevLink.id === link.id 
                ? { ...prevLink, productInfo }
                : prevLink
            )
          )
        }
      } catch (error) {
        console.error('Failed to fetch Amazon product info:', error)
      }
    })
    
    $('pre code').each((_, element) => {
      const codeText = $(element).text()
      const $element = $(element)
      
      // language-* クラスから言語を抽出
      let language = null
      const classList = $element.attr('class') || ''
      const languageMatch = classList.match(/language-(\w+)/)
      if (languageMatch) {
        language = languageMatch[1]
      }
      
      // 言語が指定されている場合は特定の言語でハイライト、そうでなければ自動判別
      let result
      if (language && hljs.getLanguage(language)) {
        result = hljs.highlight(codeText, { language })
      } else {
        result = hljs.highlightAuto(codeText)
        language = result.language
      }
      
      // コードブロックにクラスと言語情報を追加
      $element.html(result.value)
      $element.addClass('hljs')
      
      // 親のpreタグにコードブロック用のクラスを追加
      const preElement = $element.parent('pre')
      preElement.addClass('code-block')
      
      // 言語名の表示用
      if (language) {
        preElement.attr('data-language', language)
      }
    })
    
    // テーブルを横スクロール可能なラッパーで囲む
    $('table').each((_, element) => {
      $(element).wrap('<div class="table-wrapper"></div>')
    })
    
    setProcessedContent($.html())
    
    // Twitterウィジェットの再読み込み
    if (typeof window !== 'undefined') {
      const windowWithTwitter = window as WindowWithTwitter
      if (windowWithTwitter.twitter?.widgets) {
        windowWithTwitter.twitter.widgets.load()
      }
    }
  }, [content])

  if (!isClient) {
    // サーバーサイドでは基本的なHTMLのみ表示（スクリプトタグを除去）
    const serverContent = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<blockquote[^>]*class="twitter-tweet"[^>]*>[\s\S]*?<\/blockquote>/gi, 
        '<div class="twitter-placeholder">Loading Twitter embed...</div>')
    
    return (
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: serverContent }}
      />
    )
  }

  const renderContent = () => {
    const parts = processedContent.split(/(<div data-amazon-link="[^"]*" class="my-4"><\/div>)/)
    const result: React.ReactNode[] = []
    
    parts.forEach((part, index) => {
      const amazonLinkMatch = part.match(/data-amazon-link="([^"]*)"/)
      if (amazonLinkMatch) {
        const linkId = amazonLinkMatch[1]
        const link = amazonLinks.find(l => l.id === linkId)
        if (link) {
          result.push(
            <div key={`amazon-${index}`} className="my-4">
              <LinkCard url={link.url} ogpData={link.productInfo}>
                {link.text}
              </LinkCard>
            </div>
          )
        }
      } else if (part.trim()) {
        result.push(
          <div
            key={`content-${index}`}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        )
      }
    })
    
    return result
  }

  return (
    <div className="prose prose-invert max-w-none">
      {renderContent()}
    </div>
  )
}
