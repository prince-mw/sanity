// Landing pages that have a translated sibling, for hreflang alternates and the top-nav language
// dropdown's redirect. Keys are UI locales; every slug in a pair lists the same set. These pages are
// used at the site root (/{slug}) — the /lp/{slug} copy of the route also works but isn't linked.
const BASE = 'https://www.movingwalls.com'

function pair(englishSlug: string, translatedSlug: string, locale: string) {
  const group = { en: `${BASE}/${englishSlug}`, [locale]: `${BASE}/${translatedSlug}` }
  return { [englishSlug]: group, [translatedSlug]: group }
}

export const LANDING_LANGUAGE_GROUPS: Record<string, Record<string, string>> = {
  ...pair('japan-transit-media-guide', 'japan-transit-media-guide-ja', 'ja'),
  ...pair('japanGTM-LuxuryFashion', 'japanGTM-LuxuryFashion-ja', 'ja'),
  ...pair('japanGTM-TechElectronics', 'japanGTM-TechElectronics-ja', 'ja'),
  ...pair('japanGTM-TravelTourism', 'japanGTM-TravelTourism-ja', 'ja'),
}

// hreflang codes for the keys above (UI locale "ja" is already a valid hreflang code).
export function landingHreflangs(slug: string): Record<string, string> | undefined {
  return LANDING_LANGUAGE_GROUPS[slug]
}

// Matches /{slug} and the equivalent /lp/{slug}.
export function getLandingSlugFromPathname(pathname: string): string | undefined {
  const slug = pathname.match(/^\/(?:lp\/)?([^/]+)\/?$/)?.[1]
  return slug && LANDING_LANGUAGE_GROUPS[slug] ? slug : undefined
}

// Content language of a landing page, from its slug ("…-ja" → "ja").
export function getLandingPageLang(slug: string): string | undefined {
  return slug.match(/-(ja)$/)?.[1]
}
