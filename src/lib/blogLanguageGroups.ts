// Blog post translation pairs are no longer hardcoded here — they're derived at request
// time from each post's `translations` reference field in Sanity (see
// getBlogLanguageGroups in src/sanity/lib/queries.ts), so editors can wire up a new
// translated post pair directly in Studio without a code change.

// Matches a blog post detail page path exactly, e.g. "/blog/international-dooh-advertising-chinese-brands" —
// deliberately excludes the bare "/blog" listing page since only individual posts have translated siblings.
export function getBlogSlugFromPathname(pathname: string): string | undefined {
  return pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1]
}
