// Maps a blog post's slug to its sibling-language URLs — used for hreflang alternates, and
// (mirroring the same pattern in locationLanguageGroups.ts) for redirecting to the translated
// sibling when the visitor toggles the nav language while reading a post. Every slug in a
// group should list the same set of languages, since either slug can be the "current" page.
export const BLOG_LANGUAGE_GROUPS: Record<string, Record<string, string>> = {
  'international-dooh-advertising-chinese-brands': {
    en: 'https://www.movingwalls.com/blog/international-dooh-advertising-chinese-brands',
    'zh-CN': 'https://www.movingwalls.com/blog/international-dooh-advertising-chinese-brands-zh',
  },
  'international-dooh-advertising-chinese-brands-zh': {
    en: 'https://www.movingwalls.com/blog/international-dooh-advertising-chinese-brands',
    'zh-CN': 'https://www.movingwalls.com/blog/international-dooh-advertising-chinese-brands-zh',
  },
}

// The site's UI locale codes (see src/i18n/config.ts) don't always match the hreflang-style
// keys used above (e.g. the UI locale is "zh", but the hreflang/group key is "zh-CN"). This
// maps a UI locale to its group key; locales with no entry here never have a translated
// blog-post sibling, so the dropdown just behaves as a plain UI-string swap for them.
const UI_LOCALE_TO_GROUP_KEY: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
}

export function getBlogGroupKeyForLocale(locale: string): string | undefined {
  return UI_LOCALE_TO_GROUP_KEY[locale]
}

// Matches a blog post detail page path exactly, e.g. "/blog/international-dooh-advertising-chinese-brands" —
// deliberately excludes the bare "/blog" listing page since only individual posts have translated siblings.
export function getBlogSlugFromPathname(pathname: string): string | undefined {
  return pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1]
}
