'use client'

import { useEffect, useState } from 'react'
import hljs from 'highlight.js'
import * as cheerio from 'cheerio'
import 'highlight.js/styles/github-dark.css'

interface HTMLContentProps {
  content: string
}

// Twitter widgets の型定義
interface TwitterWidgets {
  load: () => void
}

interface WindowWithTwitter extends Window {
  twttr?: {
    widgets: TwitterWidgets
  }
}

export function HTMLContent({ content }: HTMLContentProps) {
  const [processedContent, setProcessedContent] = useState(content)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // シンタックスハイライトの処理
    const $ = cheerio.load(content)
    
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
      if (windowWithTwitter.twttr?.widgets) {
        windowWithTwitter.twttr.widgets.load()
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

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}
