'use client'

import Script from 'next/script'

interface ZohoLeadScriptProps {
  enabled?: boolean
  script?: string
}

export default function ZohoLeadScript({ enabled = true, script }: Readonly<ZohoLeadScriptProps>) {
  if (!enabled || !script?.trim()) return null

  // Strip <script> tags if the user pasted them — next/script wraps in its own tag
  const cleanScript = script
    .replaceAll(/<script[^>]*>/gi, '')
    .replaceAll(/<\/script>/gi, '')
    .trim()

  if (!cleanScript) return null

  return (
    <Script
      id="zoho-lead-tracking"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: cleanScript }}
    />
  )
}
