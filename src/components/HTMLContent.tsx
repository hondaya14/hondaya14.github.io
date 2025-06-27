'use client'

import { useEffect, useState } from 'react'

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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Twitterウィジェットの再読み込み
    if (typeof window !== 'undefined') {
      const windowWithTwitter = window as WindowWithTwitter
      if (windowWithTwitter.twttr?.widgets) {
        windowWithTwitter.twttr.widgets.load()
      }
    }
  }, [])

  if (!isClient) {
    // サーバーサイドでは基本的なHTMLのみ表示（スクリプトタグを除去）
    const serverContent = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<blockquote[^>]*class="twitter-tweet"[^>]*>[\s\S]*?<\/blockquote>/gi, 
        '<div class="twitter-placeholder">Loading Twitter embed...</div>')
    
    return (
      <div
        dangerouslySetInnerHTML={{ __html: serverContent }}
      />
    )
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
