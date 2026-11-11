// The AREA page template (Rif, 11 Nov 2026), the fourth level after country
// and city. Same rules: one fixed order for every area, a written guide in a
// fixed shape, visuals from data, every slot hides when it has nothing.
//
//   Hero (stats) → Instant proposal → Every site (filter sidebar, Details) →
//   Area guide (5 topics) → FAQ → Related case studies and articles →
//   More areas in the city → Contact
//
// Areas without a written guide still get this order; the guide and FAQ
// slots are empty and the area's personas fill the audience slot instead.

import type { GuideTopic, MarketData, TopicId } from './countryTemplate'
import { AREA_GUIDE_DRAFTS, type AreaGuideDraft } from '@/data/area-guide-drafts'
import type { PublicSite } from '@/lib/inventory/types'

export const AREA_TOPIC_ORDER: TopicId[] = ['digital', 'audiences', 'people', 'formats', 'seasons']

/** One keyword pattern per topic, so every area page covers the same searches. */
export const AREA_TOPIC_HEADINGS: Record<TopicId, (area: string, city: string) => string> = {
  digital: (a, c) => `Billboard advertising in ${a}, ${c}`,
  audiences: a => `What draws people to ${a}`,
  people: a => `Who you reach in ${a}`,
  formats: a => `Advertising formats in ${a}`,
  buying: a => `How to buy billboard advertising in ${a}`,
  seasons: a => `When to advertise in ${a}`,
}

export const areaDraftFor = (countrySlug: string, citySlug: string, areaSlug: string): AreaGuideDraft | null =>
  AREA_GUIDE_DRAFTS[`${countrySlug}/${citySlug}/${areaSlug}`] ?? null

export function areaGuideFor(draft: AreaGuideDraft | null, areaName: string, cityName: string): GuideTopic[] {
  if (!draft) return []
  const written: Partial<Record<TopicId, string[] | undefined>> = { digital: draft.digital, audiences: draft.audiences.intro, people: draft.people?.intro, formats: draft.formats.intro, seasons: draft.seasons }
  return AREA_TOPIC_ORDER.filter(id => written[id]?.length).map(id => ({ id, heading: AREA_TOPIC_HEADINGS[id](areaName, cityName), blocks: null, paragraphs: written[id]!, source: 'draft' as const }))
}

const figure = (s: string | null | undefined) => { const n = Number(String(s ?? '').replace(/\D/g, '')); return Number.isFinite(n) && n > 0 ? n : 0 }

/**
 * The data the guide's visuals read, shaped for an area. The hero already counts
 * the sites, so the guide's fact panel uses the written public facts (sites: 0)
 * and the places map uses the written landmarks; formats keep their real counts.
 */
export function areaGuideData(sites: PublicSite[]): MarketData {
  const fm = new Map<string, number>()
  for (const s of sites) { const f = s.displayFormat ?? s.format ?? 'Other'; fm.set(f, (fm.get(f) ?? 0) + 1) }
  return {
    sites: 0, cities: [], impressions: sites.reduce((n, s) => n + figure(s.audience?.impressions), 0),
    formats: Array.from(fm.entries()).map(([name, n]) => ({ name, sites: n })).sort((a, b) => b.sites - a.sites || a.name.localeCompare(b.name)),
  }
}

export function areaFaqJsonLd(draft: AreaGuideDraft | null) {
  if (!draft?.faqs.length) return null
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: draft.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
}
