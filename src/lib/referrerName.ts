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

export function getReferrerName(pathname: string): string {
  if (!pathname || pathname === '/') return 'homepage';

  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (first === 'locations') {
    // Most specific segment available: city slug if present, else country slug.
    return (segments[2] || segments[1] || 'locations').replace(/-/g, '');
  }

  if (first === 'lp' && segments[1]) {
    // Landing Page Builder route — use the actual page slug, not the generic "lp" prefix.
    return segments[1].replace(/-/g, '');
  }

  return REFERRER_NAME_OVERRIDES[first] || first.replace(/-/g, '');
}

export function appendReferrerName(url: string, pathname: string): string {
  if (!url) return url;
  if (/[?&]referrername=/.test(url)) return url; // don't double-append

  const value = getReferrerName(pathname);
  return url + (url.includes('?') ? '&' : '?') + `referrername=${encodeURIComponent(value)}`;
}
