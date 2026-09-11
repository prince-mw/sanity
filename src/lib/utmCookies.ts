// Reads UTM/click-id cookies (utm_source, utm_medium, utm_campaign, utm_term,
// utm_content, gclid, fbclid). These cookies are written by Zoho's own ZFAdvLead
// tracking script (pasted into the CMS "Zoho lead tracking" field) — our own
// duplicate writer (ZohoUTMTracker.tsx) was removed since it did the exact same
// job. Used by FormPopupProvider and ZohoFormEmbed to pre-fill/append UTM values.

const ALL_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid',
] as const

function getCookie(name: string): string | undefined {
  const parts = document.cookie.split('; ')
  for (const part of parts) {
    const [key, ...rest] = part.split('=')
    if (key === name && rest.length) {
      return decodeURIComponent(rest.join('='))
    }
  }
  return undefined
}

export function getUTMCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {}

  const result: Record<string, string> = {}
  for (const param of ALL_PARAMS) {
    const val = getCookie(param)
    if (val) result[param] = val
  }
  return result
}
