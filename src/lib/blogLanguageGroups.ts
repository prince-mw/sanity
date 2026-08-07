// Maps a blog post's slug to its sibling-language URLs, for hreflang alternates only —
// unlike locations, /blog itself already reactively filters by the post's `language` field
// and the nav locale, so this table doesn't need to drive any redirect/filtering behavior,
// just SEO. Every slug in a group should list the same set of languages, since either slug
// can be the "current" page.
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
