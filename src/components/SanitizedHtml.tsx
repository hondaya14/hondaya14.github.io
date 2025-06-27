'use client'

import { useMemo, useEffect } from 'react'
import DOMPurify from 'dompurify'

export default function SanitizedHtml({ html, className }: { html: string; className?: string }) {
  useEffect(() => {
    const hook = (node: Element) => {
      if (node.nodeName === 'A') {
        node.setAttribute('target', '_blank')
        // ensure new tabs do not leak the opener but keep the referrer
        node.setAttribute('rel', 'noopener')
      }
    }
    DOMPurify.addHook('afterSanitizeAttributes', hook)
    return () => {
      DOMPurify.removeHook('afterSanitizeAttributes', hook)
    }
  }, [])

  const sanitized = useMemo(() => DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }), [html])

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
