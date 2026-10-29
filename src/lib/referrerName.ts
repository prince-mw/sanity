// Maps the current page path to a short "referrername" tag appended to Zoho form URLs,
// so form submissions can be attributed to the page/section they came from.
const REFERRER_NAME_OVERRIDES: Record<string, string> = {
  'press-news': 'news',
  'mw-planner': 'planner',
  'mw-activate': 'activate',
  'mw-measure': 'measure',
  'mw-studio': 'studio',
  'mw-market': 'market',
  'mw-influence': 'influence',
  'mw-science': 'science',
};

// Sections whose detail pages are individual articles/items (/{section}/{slug}).
const CONTENT_SECTIONS = new Set([
  'blog', 'case-studies', 'ebooks', 'webinars', 'events', 'press-news', 'ooh-formats', 'partners', 'whitepapers',
]);

export function getReferrerName(pathname: string): string {
  if (!pathname || pathname === '/') return 'homepage';

  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (first === 'locations') {
    // Most specific segment available: city slug if present, else country slug.
    // Translated city pages (/locations/china-zh/beijing) get the language suffix, like their
    // country page does ("chinazh"), so they're told apart from the English page ("beijing").
    const langSuffix = segments[2] && segments[1]?.endsWith('-zh') ? 'zh' : '';
    return (segments[2] || segments[1] || 'locations').replace(/-/g, '') + langSuffix;
  }

  if (first === 'lp' && segments[1]) {
    // Landing Page Builder route — use the actual page slug, not the generic "lp" prefix.
    return segments[1].replace(/-/g, '');
  }

  const section = REFERRER_NAME_OVERRIDES[first] || first.replace(/-/g, '');

  // Articles and other content pages: keep the item's slug so the lead shows which article,
  // case study, e-book etc. it came from, e.g. "blog/what-is-dooh", "casestudies/calvin-klein-…".
  if (CONTENT_SECTIONS.has(first) && segments[1]) {
    return `${section}/${segments[1]}`;
  }

  return section;
}

export function appendReferrerName(url: string, pathname: string): string {
  if (!url) return url;
  if (/[?&]referrername=/.test(url)) return url; // don't double-append

  const value = getReferrerName(pathname);
  return url + (url.includes('?') ? '&' : '?') + `referrername=${encodeURIComponent(value)}`;
}
