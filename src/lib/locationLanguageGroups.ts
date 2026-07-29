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

// Matches a country-level location page path exactly, e.g. "/locations/china" —
// deliberately excludes the bare "/locations" listing page and nested city pages
// like "/locations/india/mumbai", since only country pages have translated siblings today.
export function getLocationSlugFromPathname(pathname: string): string | undefined {
  return pathname.match(/^\/locations\/([^/]+)\/?$/)?.[1]
}
