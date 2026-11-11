// The country page template (Rif, 11 Nov 2026): one fixed order of named slots
// for every country, so pages built from the API come out the same shape.
//
//   Hero → Instant proposal → Cities → Featured sites → Media types →
//   Market guide (5 fixed topics, each with a generated visual) →
//   Gallery → Logos → Proof (stories) → CTA → FAQ
//
// No schema change yet: the guide's first two topics take their text from the
// page's existing CMS blocks by ROLE (first twoColumn = "digital", first
// textBlock = "audiences"), never by heading text. The other topics use the
// drafts in data/country-guide-drafts.ts until Sanity has fields for them.
// A slot with no data hides; templateReport() lists what is missing.

import type { PublicSite } from '@/lib/inventory/types'
import { COUNTRY_GUIDE_DRAFTS } from '@/data/country-guide-drafts'

export type TemplateSection = { _type: string; _key: string; heading?: string; content?: unknown; [k: string]: unknown }

export type TopicId = 'digital' | 'audiences' | 'formats' | 'buying' | 'seasons'
export type GuideTopic = { id: TopicId; heading: string; blocks: unknown[] | null; paragraphs: string[] | null; source: 'cms' | 'draft' }

/** Headings follow one keyword pattern per topic, so every country covers the same searches. */
export const TOPIC_HEADINGS: Record<TopicId, (country: string) => string> = {
  digital: c => `Digital billboard advertising in ${c}`,
  audiences: c => `Where to advertise in ${c}: the cities that matter`,
  formats: c => `Outdoor advertising formats in ${c}`,
  buying: c => `How to buy billboard advertising in ${c}`,
  seasons: c => `When to advertise in ${c}: seasons and moments`,
}
export const TOPIC_ORDER: TopicId[] = ['digital', 'audiences', 'formats', 'buying', 'seasons']

/** The sections that follow the guide, in this order, one of each. */
const TAIL_ORDER = ['imageGallery', 'logoCarousel', 'successStories', 'ctaBanner']

const blocksOf = (s: TemplateSection | undefined) => (s && Array.isArray(s.content) && s.content.length > 0 ? (s.content as unknown[]) : null)

export function guideFor(countrySlug: string, countryName: string, sections: TemplateSection[]): GuideTopic[] {
  // A written guide wins over the page-builder text (Rif, 11 Nov 2026); countries
  // without one still get their first two topics from the CMS blocks by role.
  const draft = COUNTRY_GUIDE_DRAFTS[countrySlug]
  const cms: Partial<Record<TopicId, unknown[] | null>> = {
    digital: blocksOf(sections.find(s => s._type === 'twoColumn')),
    audiences: blocksOf(sections.find(s => s._type === 'textBlock')),
  }
  const written: Partial<Record<TopicId, string[] | undefined>> = draft ? { digital: draft.digital, audiences: draft.audiences.intro, formats: draft.formats.intro, buying: draft.buying, seasons: draft.seasons } : {}
  return TOPIC_ORDER.map((id): GuideTopic | null => {
    const paragraphs = written[id]?.length ? written[id]! : null
    const blocks = paragraphs ? null : cms[id] ?? null
    if (!blocks && !paragraphs) return null
    return { id, heading: TOPIC_HEADINGS[id](countryName), blocks, paragraphs, source: paragraphs ? 'draft' : 'cms' }
  }).filter((t): t is GuideTopic => !!t)
}

export function tailSections(sections: TemplateSection[]): TemplateSection[] {
  return TAIL_ORDER.map(t => sections.find(s => s._type === t)).filter((s): s is TemplateSection => !!s)
}

// ── Data for the generated visuals ───────────────────────────────────────────
const figure = (s: string | null | undefined) => { const n = Number(String(s ?? '').replace(/\D/g, '')); return Number.isFinite(n) && n > 0 ? n : 0 }

export type CityStat = { slug: string; name: string; sites: number; impressions: number; lat: number | null; lng: number | null }
export type FormatStat = { name: string; sites: number }
export type MarketData = { sites: number; cities: CityStat[]; formats: FormatStat[]; impressions: number }

export function marketData(sites: PublicSite[]): MarketData {
  const byCity = new Map<string, PublicSite[]>()
  for (const s of sites) byCity.set(s.citySlug, [...(byCity.get(s.citySlug) ?? []), s])
  const cities = Array.from(byCity.entries()).map(([slug, list]): CityStat => {
    const geo = list.filter(s => s.lat != null && s.lng != null)
    return {
      slug, name: list[0].cityName, sites: list.length, impressions: list.reduce((n, s) => n + figure(s.audience?.impressions), 0),
      lat: geo.length ? geo.reduce((n, s) => n + s.lat!, 0) / geo.length : null,
      lng: geo.length ? geo.reduce((n, s) => n + s.lng!, 0) / geo.length : null,
    }
  }).sort((a, b) => b.sites - a.sites || a.name.localeCompare(b.name))
  const fm = new Map<string, number>()
  for (const s of sites) { const f = s.displayFormat ?? s.format ?? 'Other'; fm.set(f, (fm.get(f) ?? 0) + 1) }
  const formats = Array.from(fm.entries()).map(([name, n]) => ({ name, sites: n })).sort((a, b) => b.sites - a.sites || a.name.localeCompare(b.name))
  return { sites: sites.length, cities, formats, impressions: cities.reduce((n, c) => n + c.impressions, 0) }
}

// ── The completeness report ──────────────────────────────────────────────────
export type SlotCheck = { slot: string; ok: boolean; note: string }

export function templateReport(input: { location: { heroTitle?: string; description?: string; highVisibilityBillboards?: unknown[]; mediaTypes?: unknown[]; faqs?: unknown[]; sections?: TemplateSection[] }; cities: unknown[]; guide: GuideTopic[]; data: MarketData; hasSeoTitle: boolean; hasSeoDescription: boolean }): SlotCheck[] {
  const { location: l, cities, guide, data } = input
  const sections = l.sections ?? []
  const has = (t: string) => sections.some(s => s._type === t)
  const topic = (id: TopicId) => guide.find(t => t.id === id)
  const known = ['twoColumn', 'textBlock', ...TAIL_ORDER]
  const extra = sections.filter(s => !known.includes(s._type)).map(s => s._type)
  const dup = known.filter(t => sections.filter(s => s._type === t).length > 1)
  return [
    { slot: 'Hero title', ok: !!l.heroTitle, note: l.heroTitle ? '' : 'falls back to "OOH Advertising in {country}"' },
    { slot: 'Hero description', ok: !!l.description, note: '' },
    { slot: 'SEO title', ok: input.hasSeoTitle, note: '' },
    { slot: 'SEO description', ok: input.hasSeoDescription, note: '' },
    { slot: 'Cities', ok: cities.length > 0, note: `${cities.length} city pages` },
    { slot: 'Featured sites', ok: (l.highVisibilityBillboards?.length ?? 0) > 0, note: `${l.highVisibilityBillboards?.length ?? 0} in the CMS` },
    { slot: 'Media types', ok: (l.mediaTypes?.length ?? 0) > 0, note: '' },
    ...TOPIC_ORDER.map(id => ({ slot: `Guide · ${id}`, ok: !!topic(id), note: topic(id) ? (topic(id)!.source === 'draft' ? 'written guide, awaiting approval' : 'from the CMS') : 'no text' })),
    { slot: 'Inventory data (visuals)', ok: data.sites > 0, note: data.sites > 0 ? `${data.sites} sites in ${data.cities.length} cities` : 'no inventory: the data visuals hide' },
    { slot: 'Gallery', ok: has('imageGallery'), note: '' },
    { slot: 'Client logos', ok: has('logoCarousel'), note: '' },
    { slot: 'Proof (stories)', ok: has('successStories'), note: '' },
    { slot: 'CTA', ok: has('ctaBanner'), note: '' },
    { slot: 'FAQ', ok: (l.faqs?.length ?? 0) > 0, note: `${l.faqs?.length ?? 0} questions` },
    { slot: 'Blocks outside the template', ok: extra.length === 0 && dup.length === 0, note: [extra.length ? `not shown: ${extra.join(', ')}` : '', dup.length ? `only the first is used: ${dup.join(', ')}` : ''].filter(Boolean).join(' · ') },
  ]
}
