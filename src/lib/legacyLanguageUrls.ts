// The old WordPress site served translated copies under /ja/, /ko/, /id/ (and /zh/). Those URLs still
// get search impressions but 404 on this site, which has no language prefixes. This maps each one to
// the closest live page, for a 301 in middleware.
import { LOCATION_LANGUAGE_GROUPS, getLocationGroupKeyForLocale } from './locationLanguageGroups'

const LEGACY_PREFIX = /^\/(ja|ko|id|zh)(?=\/|$)/

// Old Indonesian blog slugs → the English post they were translated from (Japanese/Korean copies
// used the English slug, so they need no table).
const ID_BLOG_SLUGS: Record<string, string> = {
  'memilih-format-iklan-luar-ruang-yang-sempurna-memilih-media-yang-tepat-untuk-dampak-maksimal': 'picking-the-perfect-out-of-home-advertising-format-choosing-the-right-medium-for-maximum-impact',
  'iklan-dooh-selama-ramadan-praktik-terbaik-untuk-menyampaikan-campaign-yang-lebih-berdampak': 'dooh-advertising-during-ramadan',
  'semua-yang-perlu-anda-ketahui-tentang-iklan-luar-ruang-pasca-pandemi': 'out-of-home-advertising-post-pandemic-guide',
  'bagaimana-iot-mentransformasi-industri-ritel': 'how-iot-is-transforming-the-retail-industry',
  'out-of-home-pada-tahun-2022-melihat-tren-utama-yang-akan-membentuk-iklan-luar-ruang-di-tahun-baru': 'out-of-home-in-2022-a-look-at-the-key-trends-that-will-shape-outdoor-advertising-in-the-new-year',
  'ooh-101-panduan-untuk-pengukuran-campaign-ooh-yang-sukses': 'ooh-101-a-guide-to-successful-ooh-campaign-measurements',
  'moving-walls-group-menerima-kepatuhan-tipe-soc-2-menunjukkan-komitmen-terhadap-integritas-dan-keamanan-proses': 'moving-walls-group-receives-soc-2-type-compliance-demonstrates-commitment-to-process-integrity-and-security',
  'meningkatkan-pemasaran-pariwisata-bagaimana-iklan-di-luar-rumah-membawa-merek-anda-ke-tingkat-yang-lebih-tinggi': 'enhancing-tourism-marketing-how-out-of-home-advertising-takes-your-brand-to-new-heights',
  'inilah-alasan-mengapa-generasi-milenial-dan-gen-z-lebih-memilih-iklan-luar-ruang': 'heres-why-millennials-and-gen-z-prefer-outdoor-advertising',
  'mengapa-ooh-tetap-menjadi-daya-tarik-untuk-ritel-mewah': 'why-ooh-remains-a-show-stopper-for-luxury-retail',
}

// Returns the path to redirect to, or undefined when the path has no legacy language prefix.
// `path` has no trailing slash (except "/").
export function legacyLanguageRedirect(path: string): string | undefined {
  const m = path.match(LEGACY_PREFIX)
  if (!m) return undefined
  const lang = m[1]
  const rest = path.slice(m[0].length) || '/'

  const blog = rest.match(/^\/blog\/([^/]+)$/)
  if (blog) {
    const slug = blog[1].toLowerCase()
    if (lang === 'id') return ID_BLOG_SLUGS[slug] ? `/blog/${ID_BLOG_SLUGS[slug]}` : '/blog'
    return `/blog/${slug}`
  }

  // Location pages: prefer the page's own translation in that language when one exists
  // (/ja/locations/japan → /locations/japan-ja), otherwise the English page.
  const loc = rest.match(/^\/locations\/(.+)$/)
  if (loc) {
    const groupKey = getLocationGroupKeyForLocale(lang)
    const translated = groupKey ? LOCATION_LANGUAGE_GROUPS[loc[1]]?.[groupKey] : undefined
    return translated ? new URL(translated).pathname : rest
  }

  return rest
}
