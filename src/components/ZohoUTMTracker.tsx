'use client'

import { useEffect } from 'react'

interface ZohoUTMTrackerProps {
  enabled?: boolean
  cookieExpiryDays?: number
}

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const CUSTOM_PARAMS = ['gclid', 'fbclid'] as const
const ALL_PARAMS = [...UTM_PARAMS, ...CUSTOM_PARAMS] as const

const SEARCH_ENGINES: [string, string][] = [
  ['google', 'q'],
  ['bing', 'q'],
  ['yahoo', 'q'],
  ['baidu', 'q'],
  ['yandex', 'q'],
  ['ask', 'q'],
]

// ── Cookie helpers ──────────────────────────────────────────

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setDate(expires.getDate() + days)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`
}

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

function getCookieRaw(name: string): string | undefined {
  const parts = document.cookie.split('; ')
  for (const part of parts) {
    const [key, ...rest] = part.split('=')
    if (key === name && rest.length) {
      return rest.join('=')
    }
  }
  return undefined
}

// ── URL param helper ────────────────────────────────────────

function getParam(search: string, key: string): string {
  try {
    const regex = new RegExp('[?&]' + key + '=([^&]+)')
    const match = regex.exec(search)
    if (match) {
      const decoded = decodeURIComponent(match[1])
      // Sanitise: strip non-alphanumeric except underscore, cap at 199 chars
      if (decoded.length > 199) {
        return decoded.replaceAll(/\W/g, '').slice(0, 199)
      }
      return decoded
    }
  } catch {
    // ignore
  }
  return ''
}

// ── Traffic source detection ────────────────────────────────

interface TrafficSource {
  source: string
  medium: string
  campaign: string
  term: string
  content: string
}

function loadFromCookies(): TrafficSource {
  return {
    source: getCookie('utm_source') || '',
    medium: getCookie('utm_medium') || '',
    campaign: getCookie('utm_campaign') || '',
    term: getCookie('utm_term') || '',
    content: getCookie('utm_content') || '',
  }
}

function hasUTMInUrl(search: string): boolean {
  return search.includes('utm_source') || search.includes('utm_medium') ||
    search.includes('utm_campaign') || search.includes('utm_term') || search.includes('utm_content')
}

function detectTrafficSource(): TrafficSource {
  const urlSearch = globalThis.location.search

  // 1) Explicit UTM params in URL
  if (hasUTMInUrl(urlSearch)) {
    return {
      source: getParam(urlSearch, 'utm_source'),
      medium: getParam(urlSearch, 'utm_medium'),
      campaign: getParam(urlSearch, 'utm_campaign'),
      term: getParam(urlSearch, 'utm_term'),
      content: getParam(urlSearch, 'utm_content'),
    }
  }

  // 2) Google Ads click ID
  if (getParam(urlSearch, 'gclid')) {
    return { source: 'Google Ads', medium: 'cpc', campaign: '(not set)', term: '', content: '' }
  }

  // 3) Referrer-based detection
  const ref = document.referrer
  if (!ref) {
    return getCookie('utm_source') === undefined
      ? { source: '', medium: '', campaign: '', term: '', content: '' }
      : loadFromCookies()
  }

  // Check existing cookies first (returning visitor with referrer)
  if (getCookie('utm_source') !== undefined) {
    return loadFromCookies()
  }

  const refClean = ref.replace(/^https?:\/\//, '')
  const slashIdx = refClean.indexOf('/')
  const refDomain = slashIdx > -1 ? refClean.slice(0, slashIdx) : refClean
  const refPath = slashIdx > -1 ? refClean.slice(slashIdx) : '/'
  const qIdx = refPath.indexOf('?')
  const refSearch = qIdx > -1 ? refPath.slice(qIdx) : ''

  // Detect organic search
  for (const [engine, qParam] of SEARCH_ENGINES) {
    if (refDomain.includes(engine)) {
      return { source: engine, medium: 'organic', campaign: '', term: getParam(refSearch, qParam) || '(not provided)', content: '' }
    }
  }

  // Generic referral
  return { source: refDomain, medium: 'referral', campaign: '', term: '', content: '' }
}

// ── Iframe UTM injection ────────────────────────────────────

function buildIframeSrcWithUTMs(src: string): string {
  let result = src
  for (const param of ALL_PARAMS) {
    const regex = new RegExp('[?&]' + param + '=')
    if (regex.test(result)) continue

    const val = getCookieRaw(param)
    if (val) {
      result += (result.includes('?') ? '&' : '?') + param + '=' + val
    }
  }
  return result
}

function injectUTMsIntoIframes() {
  const iframes = document.getElementsByTagName('iframe')
  for (const iframe of Array.from(iframes)) {
    if (!iframe.src.includes('formperma')) continue
    const newSrc = buildIframeSrcWithUTMs(iframe.src)
    if (iframe.src.length < newSrc.length) {
      iframe.src = newSrc
    }
  }
}

// ── Inline (HTML) form UTM injection ────────────────────────

function injectUTMsIntoHTMLForms() {
  const forms = document.forms
  for (const form of Array.from(forms)) {
    if (!form.action?.includes('formperma')) continue

    for (const param of ALL_PARAMS) {
      const val = getCookie(param)
      if (val) {
        const field = form.elements.namedItem(param) as HTMLInputElement | null
        if (field) {
          field.value = val
        }
      }
    }
  }
}

// ── Component ───────────────────────────────────────────────

export default function ZohoUTMTracker({ enabled = true, cookieExpiryDays = 7 }: ZohoUTMTrackerProps) {
  useEffect(() => {
    if (!enabled) return

    // 1. Detect & store traffic source
    const traffic = detectTrafficSource()
    const values: Record<string, string> = {}

    if (traffic.source) values.utm_source = traffic.source
    if (traffic.medium) values.utm_medium = traffic.medium
    if (traffic.campaign) values.utm_campaign = traffic.campaign
    if (traffic.term) values.utm_term = traffic.term
    if (traffic.content) values.utm_content = traffic.content

    // 2. Capture custom params (gclid, fbclid) from URL
    const urlSearch = globalThis.location.search
    for (const param of CUSTOM_PARAMS) {
      let val = getParam(urlSearch, param)
      if (!val) {
        val = getCookie(param) || ''
      }
      if (val) {
        values[param] = val
      }
    }

    // 3. Store all values in cookies
    for (const [key, val] of Object.entries(values)) {
      setCookie(key, val, cookieExpiryDays)
    }

    // 4. Inject UTMs into any existing Zoho iframes / HTML forms
    injectUTMsIntoIframes()
    injectUTMsIntoHTMLForms()

    // 5. Also inject when the page fully loads (for late-rendered iframes)
    if (document.readyState !== 'complete') {
      const onLoad = () => {
        injectUTMsIntoIframes()
        injectUTMsIntoHTMLForms()
      }
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [enabled, cookieExpiryDays])

  return null
}

// ── Exported utility: read UTM cookies ──────────────────────
// Used by FormPopupProvider and other components

export function getUTMCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {}

  const result: Record<string, string> = {}
  for (const param of ALL_PARAMS) {
    const val = getCookie(param)
    if (val) result[param] = val
  }
  return result
}
