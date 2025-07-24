import hljs from 'highlight.js'
import * as cheerio from 'cheerio'
import 'highlight.js/styles/github-dark.css'
import { ServerLinkCard } from './ServerLinkCard'
import { isExternalUrl } from '@/lib/ogp'

interface ServerHTMLContentProps {
  content: string
}

export async function ServerHTMLContent({ content }: ServerHTMLContentProps) {
  // シンタックスハイライトの処理
  const $ = cheerio.load(content)
  
  // 外部リンクの検出と処理
  const externalLinks: Array<{ url: string; text: string; id: string }> = []
  $('a').each((index, element) => {
    const href = $(element).attr('href')
    
    if (href && isExternalUrl(href)) {
      const linkId = `external-link-${index}`
      const linkText = $(element).text()
      externalLinks.push({ url: href, text: linkText, id: linkId })
      
      // 外部リンクをプレースホルダーに置換
      $(element).replaceWith(`<div data-external-link="${linkId}" class="my-4"></div>`)
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
  
  const processedContent = $.html()

  const renderContent = () => {
    const parts = processedContent.split(/(<div data-external-link="[^"]*" class="my-4"><\/div>)/)
    const result: React.ReactNode[] = []
    
    parts.forEach((part, index) => {
      const externalLinkMatch = part.match(/data-external-link="([^"]*)"/)
      if (externalLinkMatch) {
        const linkId = externalLinkMatch[1]
        const link = externalLinks.find(l => l.id === linkId)
        if (link) {
          result.push(
            <div key={`external-${index}`} className="my-4">
              <ServerLinkCard url={link.url}>{link.text}</ServerLinkCard>
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