'use client'

import { useMemo } from 'react'
import DOMPurify from 'dompurify'

export default function SanitizedHtml({ html, className }: { html: string; className?: string }) {
  const sanitized = useMemo(() => DOMPurify.sanitize(html), [html])

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
