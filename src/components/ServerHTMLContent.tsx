import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { isExternalUrl } from '@/lib/ogp'
import { ServerLinkCard } from './ServerLinkCard'

interface ServerHTMLContentProps {
  content: string
}

function extractTextFromChildren(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child.toString()
      }
      return ''
    })
    .join('')
    .trim()
}

const markdownComponents: Components = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const language = match?.[1]
    const code = String(children).replace(/\n$/, '')

    if (inline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }

    return (
      <div className="code-block" data-language={language ?? undefined}>
        <SyntaxHighlighter
          style={coldarkDark}
          language={language}
          PreTag="div"
          showLineNumbers
          customStyle={{
            margin: 0,
            background: 'transparent',
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    )
  },
  a({ href, children, ...props }) {
    if (!href) {
      return <span {...props}>{children}</span>
    }

    const textContent = extractTextFromChildren(children)
    const shouldShowCard = isExternalUrl(href) && textContent === href

    if (shouldShowCard) {
      return (
        <div className="my-4">
          <ServerLinkCard url={href}>{textContent}</ServerLinkCard>
        </div>
      )
    }

    const isExternal = isExternalUrl(href)

    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    )
  },
  table({ children }) {
    return (
      <div className="table-wrapper">
        <table>{children}</table>
      </div>
    )
  },
}

export function ServerHTMLContent({ content }: ServerHTMLContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}