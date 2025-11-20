"use client"

import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/CodeBlock'

function extractCodeChild(node: React.ReactNode) {
  const arr = React.Children.toArray(node)
  const codeEl = arr.find(
    (n) => React.isValidElement(n) && (n as React.ReactElement).type === 'code'
  ) as React.ReactElement | undefined
  if (!codeEl) return null
  const className = (codeEl.props.className || '') as string
  const match = className.match(/language-([^\s]+)/)
  const language = match?.[1] ?? null
  const code = String(codeEl.props.children ?? '')
  return { language, code }
}

export function PreWithSyntax(props: React.HTMLAttributes<HTMLPreElement>) {
  const extracted = extractCodeChild(props.children)
  if (!extracted) return <pre {...props} />
  return (
    <CodeBlock language={extracted.language}>
      {extracted.code.replace(/\n$/, '')}
    </CodeBlock>
  )
}

export function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  const className = (props.className || '') as string
  const language = /language-([^\s]+)/.exec(className)?.[1] ?? null
  const content = String(props.children || '')
  if (language) return <CodeBlock language={language}>{content}</CodeBlock>
  return <CodeBlock inline>{content}</CodeBlock>
}

export const mdxCodeComponents: MDXComponents = {
  pre: PreWithSyntax as any,
  code: InlineCode as any,
}

