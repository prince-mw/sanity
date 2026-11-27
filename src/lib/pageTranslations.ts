// Page-copy translations keyed by the English text itself (stored in Sanity `pageTranslation` docs,
// one per page + language). A page's English copy — from Studio or written in the component — is shown
// translated when an entry exists for the visitor's language; anything without an entry (including
// English that was edited after it was translated) simply stays English.

export type PageTranslations = Record<string, Record<string, string>> // locale → normalised English → translation

export const normalizeSource = (s: string) => s.replace(/\s+/g, ' ').trim()

// Object keys whose string values are never visible copy.
const SKIP_KEYS = new Set([
  'href', 'url', 'link', 'linkHref', 'image', 'images', 'logo', 'icon', 'id', 'slug', 'src', 'videoUrl',
  'color', 'gradient', 'className', 'formUrl', 'zohoFormUrl', 'contactFormUrl', 'ctaUrl', 'ctaLink', 'email', 'testimonials',
])

const isCopy = (s: string) => /[A-Za-z]{2,}/.test(s) && !/^(https?:|mailto:|tel:|\/|#)/.test(s.trim())

// Optional collector used by the translation script to list every English string a page can show.
type Collector = Set<string> | undefined
const collector = (): Collector => (typeof window !== 'undefined' ? (window as unknown as { __trCollect?: Set<string> }).__trCollect : undefined)

export function translateString(s: string, map: Record<string, string> | undefined): string {
  if (!isCopy(s)) return s
  const c = collector()
  const key = normalizeSource(s)
  if (c) c.add(key)
  return map?.[key] ?? s
}

export function translateDeep<T>(value: T, map: Record<string, string> | undefined): T {
  if (!map && !collector()) return value
  const walk = (v: unknown, key?: string): unknown => {
    if (key && (SKIP_KEYS.has(key) || key.startsWith('_'))) return v
    if (typeof v === 'string') return translateString(v, map)
    if (Array.isArray(v)) return v.map((x) => walk(x))
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]))
    return v
  }
  return walk(value) as T
}

// Builds the lookup from fetched pageTranslation docs.
export function buildPageTranslations(docs: Array<{ language?: string; entries?: Array<{ source?: string; translation?: string }> }> | null | undefined): PageTranslations {
  const out: PageTranslations = {}
  for (const d of docs || []) {
    if (!d.language) continue
    const m = (out[d.language] ??= {})
    for (const e of d.entries || []) if (e.source && e.translation?.trim()) m[normalizeSource(e.source)] = e.translation
  }
  return out
}
