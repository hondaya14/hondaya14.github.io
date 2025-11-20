import type { MDXComponents } from 'mdx/types'
import React from 'react'
import { CodeBlock } from '@/components/CodeBlock'

function PreWithSyntax(props: React.HTMLAttributes<HTMLPreElement>) {
  const child = React.Children.only(props.children as React.ReactElement)
  if (!React.isValidElement(child)) return <pre {...props} />

  const className = (child.props.className || '') as string
  const match = className.match(/language-(?<lang>[^\s]+)/)
  const language = match?.groups?.lang ?? null
  const code = String(child.props.children || '')

  return <CodeBlock language={language}>{code.replace(/\n$/, '')}</CodeBlock>
}

function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  const className = (props.className || '') as string
  const isBlock = className.includes('language-')
  if (isBlock) {
    const match = className.match(/language-(?<lang>[^\s]+)/)
    const language = match?.groups?.lang ?? null
    const code = String(props.children || '')
    return <CodeBlock language={language}>{code}</CodeBlock>
  }
  return <CodeBlock inline>{String(props.children || '')}</CodeBlock>
}

const components: MDXComponents = {
  pre: PreWithSyntax as any,
  code: InlineCode as any,
}

export function useMDXComponents(): MDXComponents {
  return components
}

