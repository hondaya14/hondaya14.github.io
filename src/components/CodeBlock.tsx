"use client"

import React from "react"
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula as theme } from "react-syntax-highlighter/dist/esm/styles/prism"
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('diff', diff)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('kotlin', kotlin)

type CodeBlockProps = {
  language?: string | null
  children: string
  inline?: boolean
}

export function CodeBlock({ language, children, inline = false }: CodeBlockProps) {
  const langMap: Record<string, string> = {
    js: 'javascript',
    javascript: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    typescript: 'typescript',
    tsx: 'tsx',
    bash: 'bash',
    sh: 'bash',
    zsh: 'bash',
    shell: 'bash',
    console: 'bash',
    diff: 'diff',
    json: 'json',
    text: 'text',
    plaintext: 'text',
  }
  const normalized = language ? langMap[language] ?? language : undefined
  if (inline) {
    return (
      <code className="bg-gray-800/60 text-gray-100 px-1.5 py-0.5 rounded whitespace-pre-wrap text-[0.9em]">
        {children}
      </code>
    )
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border" style={{ borderColor: '#2f3336' }}>
      <div className="flex items-center justify-between px-3 py-2 text-xs" style={{ background: '#3c3f41', color: '#e0e0e0', borderBottom: '1px solid #2f3336' }}>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: '#ff5f56' }} />
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: '#27c93f' }} />
        </div>
        {normalized && (
          <span aria-label="code language" className="tracking-wide" style={{ opacity: 0.8 }}>
            {normalized}
          </span>
        )}
      </div>
      <SyntaxHighlighter
        language={normalized}
        style={theme}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#2b2b2b",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
        lineNumberStyle={{ color: "#8a8a8a", paddingRight: "12px", marginRight: "12px", borderRight: "1px solid #3c3f41" }}
        codeTagProps={{
          style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
