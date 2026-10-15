"use client";

import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import diff from "react-syntax-highlighter/dist/esm/languages/prism/diff";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin";

SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("diff", diff);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);

const theme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': { color: "#202624", whiteSpace: "pre" },
  'pre[class*="language-"]': { color: "#202624", whiteSpace: "pre" },
  comment: { color: "#626a66" },
  prolog: { color: "#626a66" },
  cdata: { color: "#626a66" },
  keyword: { color: "#35665e" },
  operator: { color: "#35665e" },
  string: { color: "#914d35" },
  "attr-value": { color: "#914d35" },
  number: { color: "#79527d" },
  boolean: { color: "#79527d" },
  function: { color: "#395d82" },
  "class-name": { color: "#395d82" },
  inserted: { color: "#35665e" },
  deleted: { color: "#914d35" },
};

type CodeBlockProps = {
  language?: string | null;
  children: string;
  inline?: boolean;
};

export function CodeBlock({ language, children, inline = false }: CodeBlockProps) {
  const langMap: Record<string, string> = {
    java: "java",
    js: "javascript",
    javascript: "javascript",
    jsx: "jsx",
    ts: "typescript",
    typescript: "typescript",
    tsx: "tsx",
    bash: "bash",
    sh: "bash",
    zsh: "bash",
    shell: "bash",
    console: "bash",
    diff: "diff",
    json: "json",
    text: "text",
    plaintext: "text",
  };
  const normalized = language ? (langMap[language] ?? language) : undefined;
  if (inline) {
    return <code className="whitespace-pre-wrap">{children}</code>;
  }

  return (
    <div className="code-block">
      {normalized && (
        <div className="code-block-header" aria-label="code language">
          {normalized}
        </div>
      )}
      <SyntaxHighlighter
        language={normalized}
        style={theme}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#f5f7f6",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-jetbrains-mono), monospace",
          },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
