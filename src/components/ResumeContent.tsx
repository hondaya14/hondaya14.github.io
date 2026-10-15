"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ResumeContentProps {
  content: string;
  hideTitle?: boolean;
}

export function ResumeContent({ content, hideTitle = false }: ResumeContentProps) {
  const body = hideTitle ? content.replace(/^# [^\r\n]*(?:\r?\n|$)/, "") : content;
  return (
    <div className="prose resume-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
