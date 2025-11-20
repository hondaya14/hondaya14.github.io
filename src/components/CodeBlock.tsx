"use client"

import React from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vscDarkPlus as theme } from "react-syntax-highlighter/dist/esm/styles/prism"

type CodeBlockProps = {
  language?: string | null
  children: string
  inline?: boolean
}

export function CodeBlock({ language, children, inline = false }: CodeBlockProps) {
  if (inline) {
    return (
      <code className="bg-gray-800/60 text-gray-100 px-1.5 py-0.5 rounded whitespace-pre-wrap text-[0.9em]">
        {children}
      </code>
    )
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-700/60">
      <SyntaxHighlighter
        language={language ?? undefined}
        style={theme}
        showLineNumbers={false}
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#0f172a",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
        codeTagProps={{
          style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

