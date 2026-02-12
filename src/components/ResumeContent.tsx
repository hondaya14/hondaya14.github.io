"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ResumeContentProps {
  content: string;
}

export function ResumeContent({ content }: ResumeContentProps) {
  return (
    <div className="prose prose-sm prose-invert max-w-none resume-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <p className="text-base font-semibold mb-2 text-red-400">{children}</p>
          ),
          h2: ({ children }) => (
            <p className="text-sm font-semibold mb-2 mt-4 text-red-400">{children}</p>
          ),
          h3: ({ children }) => (
            <p className="text-sm font-medium mb-1 mt-3 text-gray-300">{children}</p>
          ),
          h4: ({ children }) => <p className="text-sm mb-1 mt-2 text-gray-400">{children}</p>,
          h5: ({ children }) => <p className="text-xs mb-1 mt-2 text-gray-500">{children}</p>,
          h6: ({ children }) => <p className="text-xs mb-1 mt-2 text-gray-500">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
