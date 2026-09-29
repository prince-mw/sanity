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

/**
 * Appends the visitor's UTM/click-id cookies (see getUTMCookies) onto a Zoho form URL as
 * query params, so the form's own hidden fields (and its ${zf:UTM_PARAM}-style email merge
 * tags) get populated on submission. No-op for non-Zoho URLs, and never overwrites a param
 * the URL already has. Client-only — cookies aren't available during SSR, so call this from
 * an effect/event handler, not directly during render on a page that could be server-rendered.
 */
export function appendUTMsToUrl(url: string): string {
  if (!url.includes('formperma')) return url
  const cookies = getUTMCookies()
  let result = url
  for (const [key, val] of Object.entries(cookies)) {
    const regex = new RegExp('[?&]' + key + '=')
    if (!regex.test(result)) {
      result += (result.includes('?') ? '&' : '?') + key + '=' + encodeURIComponent(val)
    }
  }
  return result
}
