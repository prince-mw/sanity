// Maps a location page's slug to its sibling-language URLs (for hreflang alternates
// and the top-nav language dropdown's redirect behavior). Every slug in a group should
// list the same set of languages, since either slug can be the "current" page.
export const LOCATION_LANGUAGE_GROUPS: Record<string, Record<string, string>> = {
  americas: {
    en: 'https://www.movingwalls.com/locations/americas',
    es: 'https://www.movingwalls.com/locations/americas-es',
  },
  'americas-es': {
    en: 'https://www.movingwalls.com/locations/americas',
    es: 'https://www.movingwalls.com/locations/americas-es',
  },
  china: {
    en: 'https://www.movingwalls.com/locations/china',
    'zh-CN': 'https://www.movingwalls.com/locations/china-zh',
  },
  'china-zh': {
    en: 'https://www.movingwalls.com/locations/china',
    'zh-CN': 'https://www.movingwalls.com/locations/china-zh',
  },
  ...cityPairs('china', 'china-zh', 'zh-CN', ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'chengdu']),
}

// City pages with a translated sibling under the translated country page, keyed "country/city":
// /locations/china/beijing <-> /locations/china-zh/beijing.
function cityPairs(country: string, translatedCountry: string, lang: string, cities: string[]) {
  const groups: Record<string, Record<string, string>> = {}
  for (const city of cities) {
    const group = {
      en: `https://www.movingwalls.com/locations/${country}/${city}`,
      [lang]: `https://www.movingwalls.com/locations/${translatedCountry}/${city}`,
    }
    groups[`${country}/${city}`] = group
    groups[`${translatedCountry}/${city}`] = group
  }
  return groups
}

// The site's UI locale codes (see src/i18n/config.ts) don't always match the hreflang-style
// keys used above (e.g. the UI locale is "zh", but the hreflang/group key is "zh-CN"). This
// maps a UI locale to its group key; locales with no entry here never have a translated
// location-page sibling, so the dropdown just behaves as a plain UI-string swap for them.
const UI_LOCALE_TO_GROUP_KEY: Record<string, string> = {
  en: 'en',
  es: 'es',
  zh: 'zh-CN',
}

export function getLocationGroupKeyForLocale(locale: string): string | undefined {
  return UI_LOCALE_TO_GROUP_KEY[locale]
}

// Which group key each slug in a pair actually represents — lets the /locations grid
// pick the one sibling that matches the current nav locale instead of showing both.
const LOCATION_OWN_GROUP_KEY: Record<string, string> = {
  americas: 'en',
  'americas-es': 'es',
  china: 'en',
  'china-zh': 'zh-CN',
}

// Should this location card show in the /locations grid for the given nav locale?
// Ordinary, unpaired locations (the vast majority) always show. For a slug that's part
// of a language pair, only its matching sibling shows — falling back to the English
// sibling when the current locale has no counterpart in this particular group (e.g.
// a Japanese visitor sees americas, never americas-es).
export function shouldShowLocationForLocale(slug: string, locale: string): boolean {
  const ownKey = LOCATION_OWN_GROUP_KEY[slug]
  if (!ownKey) return true

  const group = LOCATION_LANGUAGE_GROUPS[slug]
  const requestedKey = getLocationGroupKeyForLocale(locale)
  const targetKey = requestedKey && group[requestedKey] ? requestedKey : 'en'

  return ownKey === targetKey
}

// Group key for a location page path: "china" for /locations/china, "china/beijing" for a
// city page. Excludes the bare "/locations" listing page.
export function getLocationSlugFromPathname(pathname: string): string | undefined {
  const m = pathname.match(/^\/locations\/([^/]+)(?:\/([^/]+))?\/?$/)
  if (!m) return undefined
  return m[2] ? `${m[1]}/${m[2]}` : m[1]
}

// Translated location pages (slug ending in "-zh") show the page template's fixed labels in Chinese.
export function getLocationPageLang(countrySlug: string): 'en' | 'zh' {
  return countrySlug.endsWith('-zh') ? 'zh' : 'en'
}
