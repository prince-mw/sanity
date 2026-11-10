// Site page copy: description, personas, the billboard face for the mock-up,
// and related content. Read from the `siteContent` Sanity document for the
// site; until the daily job has written one, the preview content in
// src/data/site-content-sample.ts stands in (sample sites only), and related
// items come from a live "same country + one more link" query, so the page
// shows the real rule even before the job runs.
// Server code only.

import { safeFetch } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import { SITE_CONTENT_SAMPLE } from '@/data/site-content-sample'
import type { PublicSite } from './types'

export type PersonaIcon = 'commuter' | 'shopper' | 'tourist' | 'office' | 'family' | 'student' | 'nightlife' | 'traveller' | 'driver' | 'resident'
export type Persona = { name: string; icon: PersonaIcon; who: string; when: string; why: string }
export type FaceCorners = [number, number][] // 4 × [x, y] as fractions of the photo
export type RelatedItem = { kind: 'post' | 'caseStudy'; id: string; title: string; href: string; image: string | null; excerpt: string | null; publishedAt: string | null; score: number; reason: string }
export type SiteContent = {
  description: string | null
  personas: Persona[]
  faceCorners: FaceCorners | null
  posts: RelatedItem[]
  caseStudies: RelatedItem[]
  fromSanity: boolean
}

const EMPTY: SiteContent = { description: null, personas: [], faceCorners: null, posts: [], caseStudies: [], fromSanity: false }

const relatedFields = `title, "slug": slug.current, excerpt, featuredImage, publishedAt, _id`

const docQuery = `*[_type == "siteContent" && siteId == $siteId && hidden != true][0]{
  description, personas, faceCorners,
  "posts": relatedPosts[]{ score, reason, "doc": post->{ ${relatedFields} } },
  "caseStudies": relatedCaseStudies[]{ score, reason, "doc": caseStudy->{ ${relatedFields} } }
}`

// The hard filter of the related-content rule, as a query: the item must name
// the country, and the city or area. (Format/venue/industry matches and the
// Claude score are added by the daily job; this is the floor for the preview.)
const liveRelatedQuery = (type: 'blogPost' | 'caseStudy') => `*[_type == "${type}" && !(_id in path("drafts.**"))
  && (title match $country || pt::text(coalesce(content, body, [])) match $country || location match $country || excerpt match $country)
  && (title match $city || excerpt match $city || location match $city || title match $area || excerpt match $area)
] | order(publishedAt desc)[0...$max]{ ${relatedFields}, location }`

const img = (f: unknown) => { try { return f ? urlFor(f).width(800).height(500).fit('crop').url() : null } catch { return null } }

function item(kind: RelatedItem['kind'], d: any, score: number, reason: string): RelatedItem | null {
  if (!d?.slug) return null
  return {
    kind, id: d._id, title: d.title, href: kind === 'post' ? `/blog/${d.slug}` : `/case-studies/${d.slug}`,
    image: img(d.featuredImage), excerpt: d.excerpt ?? null, publishedAt: d.publishedAt ?? null, score, reason,
  }
}

export async function getSiteContent(site: PublicSite): Promise<SiteContent> {
  const doc = await safeFetch<any>(docQuery, { siteId: site.id }, null)
  if (doc) {
    return {
      description: doc.description ?? null,
      personas: doc.personas ?? [],
      faceCorners: Array.isArray(doc.faceCorners) && doc.faceCorners.length === 4 ? doc.faceCorners.map((p: any) => [p.x, p.y]) : null,
      posts: (doc.posts ?? []).map((r: any) => item('post', r.doc, r.score ?? 0, r.reason ?? '')).filter(Boolean),
      caseStudies: (doc.caseStudies ?? []).map((r: any) => item('caseStudy', r.doc, r.score ?? 0, r.reason ?? '')).filter(Boolean),
      fromSanity: true,
    }
  }
  // No document yet: preview copy + the live floor of the related rule.
  const sample = SITE_CONTENT_SAMPLE[site.id]
  const params = { country: `${site.countryName}*`, city: `${site.cityName}*`, area: `${site.areaName}*`, max: 4 }
  const [posts, cases] = await Promise.all([
    safeFetch<any[]>(liveRelatedQuery('blogPost'), params, []),
    safeFetch<any[]>(liveRelatedQuery('caseStudy'), { ...params, max: 3 }, []),
  ])
  const reason = `Names ${site.countryName} and ${site.cityName}`
  return {
    ...EMPTY,
    description: sample?.description ?? site.description ?? null,
    personas: sample?.personas ?? [],
    faceCorners: sample?.faceCorners ?? null,
    posts: (posts ?? []).map(d => item('post', d, 70, reason)).filter(Boolean) as RelatedItem[],
    caseStudies: (cases ?? []).map(d => item('caseStudy', d, 70, reason)).filter(Boolean) as RelatedItem[],
  }
}

/** Similar sites, no AI: same city + same format first, then the same area, nearest first. */
export function similarSites(site: PublicSite, all: PublicSite[], max = 6): PublicSite[] {
  const fmt = (s: PublicSite) => s.displayFormat ?? s.format ?? ''
  const dist = (s: PublicSite) => (site.lat == null || s.lat == null || site.lng == null || s.lng == null) ? 1e9
    : Math.hypot((s.lat - site.lat) * 111, (s.lng - site.lng) * 111 * Math.cos(site.lat * Math.PI / 180))
  const rank = (s: PublicSite) => (fmt(s) === fmt(site) ? 0 : 1) * 1000 + (s.areaSlug === site.areaSlug ? 0 : 500) + Math.min(dist(s), 499)
  return all.filter(s => s.id !== site.id && s.citySlug === site.citySlug).sort((a, b) => rank(a) - rank(b)).slice(0, max)
}
