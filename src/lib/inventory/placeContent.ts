// City and area copy: description, audience personas and related content,
// the same shape as a site's (siteContent.ts) so the pages share one look.
// Stored as `siteContent` documents keyed "city:<country>/<city>" or
// "area:<country>/<city>/<area>"; until the daily job writes them, the pilot
// copy in src/data/place-content-sample.ts stands in and related items come
// from the live "same country + city/area" query. Server code only.

import { safeFetch } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import { PLACE_CONTENT_SAMPLE } from '@/data/place-content-sample'
import type { Persona, RelatedItem } from './siteContent'

export type PlaceContent = { description: string | null; personas: Persona[]; posts: RelatedItem[]; caseStudies: RelatedItem[]; fromSanity: boolean }

const relatedFields = `title, "slug": slug.current, excerpt, featuredImage, publishedAt, _id`
const docQuery = `*[_type == "siteContent" && siteId == $key && hidden != true][0]{
  description, personas,
  "posts": relatedPosts[]{ score, reason, "doc": post->{ ${relatedFields} } },
  "caseStudies": relatedCaseStudies[]{ score, reason, "doc": caseStudy->{ ${relatedFields} } }
}`
const liveQuery = (type: 'blogPost' | 'caseStudy') => `*[_type == "${type}" && !(_id in path("drafts.**"))
  && (title match $country || pt::text(coalesce(content, body, [])) match $country || location match $country || excerpt match $country)
  && (title match $place || excerpt match $place || location match $place || pt::text(coalesce(content, body, [])) match $place)
] | order(publishedAt desc)[0...$max]{ ${relatedFields} }`

const img = (f: unknown) => { try { return f ? urlFor(f).width(800).height(500).fit('crop').url() : null } catch { return null } }
const item = (kind: RelatedItem['kind'], d: any, score: number, reason: string): RelatedItem | null => d?.slug ? {
  kind, id: d._id, title: d.title, href: kind === 'post' ? `/blog/${d.slug}` : `/case-studies/${d.slug}`,
  image: img(d.featuredImage), excerpt: d.excerpt ?? null, publishedAt: d.publishedAt ?? null, score, reason,
} : null

export async function getPlaceContent(p: { kind: 'city' | 'area'; countrySlug: string; countryName: string; citySlug: string; cityName: string; areaSlug?: string; areaName?: string }): Promise<PlaceContent> {
  const key = p.kind === 'city' ? `city:${p.countrySlug}/${p.citySlug}` : `area:${p.countrySlug}/${p.citySlug}/${p.areaSlug}`
  const doc = await safeFetch<any>(docQuery, { key }, null)
  if (doc) {
    return {
      description: doc.description ?? null, personas: doc.personas ?? [],
      posts: (doc.posts ?? []).map((r: any) => item('post', r.doc, r.score ?? 0, r.reason ?? '')).filter(Boolean),
      caseStudies: (doc.caseStudies ?? []).map((r: any) => item('caseStudy', r.doc, r.score ?? 0, r.reason ?? '')).filter(Boolean),
      fromSanity: true,
    }
  }
  const sample = PLACE_CONTENT_SAMPLE[key]
  const place = p.kind === 'area' && p.areaName ? p.areaName : p.cityName
  const params = { country: `${p.countryName}*`, place: `${place}*`, max: 4 }
  const [posts, cases] = await Promise.all([
    safeFetch<any[]>(liveQuery('blogPost'), params, []),
    safeFetch<any[]>(liveQuery('caseStudy'), { ...params, max: 3 }, []),
  ])
  const reason = `Names ${p.countryName} and ${place}`
  return {
    description: sample?.description ?? null, personas: sample?.personas ?? [],
    posts: (posts ?? []).map(d => item('post', d, 70, reason)).filter(Boolean) as RelatedItem[],
    caseStudies: (cases ?? []).map(d => item('caseStudy', d, 70, reason)).filter(Boolean) as RelatedItem[],
    fromSanity: false,
  }
}
