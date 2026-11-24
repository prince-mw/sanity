// Adds hreflang "x-default" (the version for searchers whose language has no dedicated page) to a page's
// language alternates. It points at the English version.
export function withXDefault(languages: Record<string, string> | undefined | null): Record<string, string> | undefined {
  if (!languages) return undefined
  const fallback = languages.en ?? Object.values(languages)[0]
  return fallback ? { ...languages, 'x-default': fallback } : languages
}
