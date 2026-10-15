// Sanity reads for the Singapore landing page and venue pages.
// Each field falls back to the copy in src/data/singapore.ts when it's empty in Sanity,
// and the whole page falls back to it when Sanity is unreachable.

import { safeFetch } from './fetch'
import { previewClient } from './client'
import {
  sgMain as defaultMain,
  sgVenues as defaultVenues,
  mwScienceBlock as defaultScience,
  type SgImage,
  type SgLandmark,
  type SgMain,
  type SgScience,
  type SgVenue,
} from '@/data/singapore'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>

const isEmpty = (v: unknown) =>
  v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)

const pick = <T,>(value: unknown, fallback: T): T => (isEmpty(value) ? fallback : (value as T))

const imageProjection = `{ "src": asset->url, alt, title }`

function toImage(value: Doc | null | undefined, fallback: SgImage): SgImage {
  if (!value?.src) return fallback
  return { src: value.src, alt: value.alt || fallback.alt, title: value.title || fallback.title, need: '' }
}

function toLandmarks(value: Doc[] | null | undefined, fallback: SgLandmark[]): SgLandmark[] {
  if (isEmpty(value)) return fallback
  return (value as Doc[]).map((l, i) => {
    const fb = fallback[i]
    return {
      name: l.name || '',
      location: l.location || '',
      format: l.format || '',
      reach: l.reach || '',
      impressions: l.impressions || '',
      image: toImage(l.image, fb?.image || { src: null, alt: l.name || '', need: 'Image' }),
    }
  })
}

const landmarksProjection = `landmarks[]{ name, location, format, reach, impressions, "image": image${imageProjection} }`

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const mainQuery = `*[_type == "singaporePage" && _id == "singaporePage"][0]{
  metaTitle, metaDescription, h1, heroParagraphs, heroPrimaryCta, heroSecondaryCta,
  heroStats[]{ value, label },
  landscapeHeading, landscapeIntro, landscapeCards[]{ title, description },
  venuesHeading, venuesIntro,
  landmarksHeading, landmarksIntro, ${landmarksProjection},
  mediaTypesHeading, mediaTypes[]{ title, description, icon },
  billboardHeading, billboardParagraphs, billboardCta, "billboardImage": billboardImage${imageProjection},
  measurementHeading, measurementParagraphs, measurementRows[]{ what, tells }, measurementCta,
  potentialHeading, potentialParagraphs,
  storiesHeading, storiesIntro, stories[]{ tag, headline, button, href, "image": image.asset->url },
  ctaHeading, ctaBody, ctaButton,
  faqs[]{ question, answer },
  scienceHeading, scienceBody, scienceLinkText, scienceHref, scienceGroups[]{ title, items }
}`

export async function getSingaporeMain(preview: boolean = false): Promise<{ main: SgMain; science: SgScience }> {
  const d = preview
    ? await previewClient.fetch<Doc | null>(mainQuery).catch(() => null)
    : await safeFetch<Doc | null>(mainQuery, undefined, null)
  if (!d) return { main: defaultMain, science: defaultScience }
  const m = defaultMain

  const main: SgMain = {
    ...m,
    metaTitle: pick(d.metaTitle, m.metaTitle),
    metaDescription: pick(d.metaDescription, m.metaDescription),
    h1: pick(d.h1, m.h1),
    heroParagraphs: pick(d.heroParagraphs, m.heroParagraphs),
    heroPrimaryCta: pick(d.heroPrimaryCta, m.heroPrimaryCta),
    heroSecondaryCta: pick(d.heroSecondaryCta, m.heroSecondaryCta),
    heroStats: pick(d.heroStats, m.heroStats),
    landscape: {
      heading: pick(d.landscapeHeading, m.landscape.heading),
      intro: pick(d.landscapeIntro, m.landscape.intro),
      cards: pick(d.landscapeCards, m.landscape.cards),
    },
    venuesHeading: pick(d.venuesHeading, m.venuesHeading),
    venuesIntro: pick(d.venuesIntro, m.venuesIntro),
    landmarksHeading: pick(d.landmarksHeading, m.landmarksHeading),
    landmarksIntro: pick(d.landmarksIntro, m.landmarksIntro),
    landmarks: toLandmarks(d.landmarks, m.landmarks),
    mediaTypesHeading: pick(d.mediaTypesHeading, m.mediaTypesHeading),
    mediaTypes: isEmpty(d.mediaTypes)
      ? m.mediaTypes
      : (d.mediaTypes as Doc[]).map((t) => ({ title: t.title || '', description: t.description || '', icon: t.icon || 'billboard', href: '' })),
    billboard: {
      heading: pick(d.billboardHeading, m.billboard.heading),
      paragraphs: pick(d.billboardParagraphs, m.billboard.paragraphs),
      cta: pick(d.billboardCta, m.billboard.cta),
      image: toImage(d.billboardImage, m.billboard.image),
    },
    measurement: {
      heading: pick(d.measurementHeading, m.measurement.heading),
      paragraphs: pick(d.measurementParagraphs, m.measurement.paragraphs),
      rows: pick(d.measurementRows, m.measurement.rows),
      cta: pick(d.measurementCta, m.measurement.cta),
    },
    potential: {
      heading: pick(d.potentialHeading, m.potential.heading),
      paragraphs: pick(d.potentialParagraphs, m.potential.paragraphs),
    },
    stories: {
      heading: pick(d.storiesHeading, m.stories.heading),
      intro: pick(d.storiesIntro, m.stories.intro),
      items: isEmpty(d.stories)
        ? m.stories.items
        : (d.stories as Doc[]).map((s, i) => ({
            tag: s.tag || '',
            headline: s.headline || '',
            button: s.button || 'Read more',
            href: s.href || '#',
            image: s.image || m.stories.items[i]?.image || '',
          })),
    },
    cta: {
      heading: pick(d.ctaHeading, m.cta.heading),
      body: pick(d.ctaBody, m.cta.body),
      button: pick(d.ctaButton, m.cta.button),
    },
    faqs: pick(d.faqs, m.faqs),
  }

  const science: SgScience = {
    heading: pick(d.scienceHeading, defaultScience.heading),
    body: pick(d.scienceBody, defaultScience.body),
    linkText: pick(d.scienceLinkText, defaultScience.linkText),
    href: pick(d.scienceHref, defaultScience.href),
    groups: pick(d.scienceGroups, defaultScience.groups),
  }

  return { main, science }
}

// ---------------------------------------------------------------------------
// Venue pages
// ---------------------------------------------------------------------------

const venueProjection = `{
  "slug": slug.current, order, breadcrumbLabel, "image": image${imageProjection},
  tabLabel, badge, tabBestFor, tabDescription, tabStats[]{ value, label }, tabNote,
  h1, tagline, leadQuestion, intro, heroCta, heroStats[]{ value, label },
  whyHeading, why[]{ title, description },
  premiumHeading, premiumIntro, ${landmarksProjection}, landmarksNote, landmarksImageOnly,
  locationsHeading, sites[]{ name, group, note }, locationGroups[]{ title, description },
  formatsHeading, formats, whyChooseLead, whyChooseList,
  faqs[]{ question, answer }, ctaHeading, ctaBody, ctaButton,
  metaTitle, metaDescription
}`

const EMPTY_VENUE: SgVenue = {
  slug: '',
  tabLabel: '',
  tabBestFor: '',
  tabDescription: '',
  tabStats: [],
  badge: 'Programmatic',
  image: { src: null, alt: '', need: 'Venue image' },
  metaTitle: '',
  metaDescription: '',
  breadcrumbLabel: '',
  h1: '',
  tagline: '',
  leadQuestion: '',
  intro: [],
  heroCta: 'Talk to Our Experts Today',
  heroStats: [],
  whyHeading: '',
  why: [],
  premiumHeading: '',
  premiumIntro: '',
  landmarks: [],
  locationsHeading: '',
  sites: [],
  formatsHeading: '',
  formats: [],
  whyChooseLead: [],
  whyChooseList: [],
  faqs: [],
  ctaHeading: '',
  ctaBody: '',
  ctaButton: 'Talk to Our Experts Today',
}

function toVenue(d: Doc): SgVenue {
  const b = defaultVenues.find((v) => v.slug === d.slug) || { ...EMPTY_VENUE, slug: d.slug }
  const label = pick<string>(d.breadcrumbLabel, b.breadcrumbLabel)
  return {
    ...b,
    slug: d.slug,
    breadcrumbLabel: label,
    image: toImage(d.image, b.image),
    tabLabel: pick(d.tabLabel, b.tabLabel || label),
    badge: pick(d.badge, b.badge),
    tabBestFor: pick(d.tabBestFor, b.tabBestFor),
    tabDescription: pick(d.tabDescription, b.tabDescription),
    // Stats and the note are alternatives: an editor filling either one overrides both defaults
    tabStats: isEmpty(d.tabStats) && isEmpty(d.tabNote) ? b.tabStats : d.tabStats || [],
    tabNote: isEmpty(d.tabStats) && isEmpty(d.tabNote) ? b.tabNote : d.tabNote || undefined,
    h1: pick(d.h1, b.h1 || `${label} in Singapore`),
    tagline: pick(d.tagline, b.tagline),
    leadQuestion: pick(d.leadQuestion, b.leadQuestion),
    intro: pick(d.intro, b.intro),
    heroCta: pick(d.heroCta, b.heroCta),
    heroStats: pick(d.heroStats, b.heroStats),
    whyHeading: pick(d.whyHeading, b.whyHeading),
    why: pick(d.why, b.why),
    premiumHeading: pick(d.premiumHeading, b.premiumHeading),
    premiumIntro: pick(d.premiumIntro, b.premiumIntro),
    landmarks: toLandmarks(d.landmarks, b.landmarks),
    landmarksNote: pick(d.landmarksNote, b.landmarksNote),
    landmarksImageOnly: typeof d.landmarksImageOnly === 'boolean' ? d.landmarksImageOnly : b.landmarksImageOnly,
    locationsHeading: pick(d.locationsHeading, b.locationsHeading),
    sites: pick(d.sites, b.sites),
    locationGroups: pick(d.locationGroups, b.locationGroups),
    formatsHeading: pick(d.formatsHeading, b.formatsHeading),
    formats: pick(d.formats, b.formats),
    whyChooseLead: pick(d.whyChooseLead, b.whyChooseLead),
    whyChooseList: pick(d.whyChooseList, b.whyChooseList),
    faqs: pick(d.faqs, b.faqs),
    ctaHeading: pick(d.ctaHeading, b.ctaHeading),
    ctaBody: pick(d.ctaBody, b.ctaBody),
    ctaButton: pick(d.ctaButton, b.ctaButton),
    metaTitle: pick(d.metaTitle, b.metaTitle || `${label} in Singapore | Moving Walls`),
    metaDescription: pick(d.metaDescription, b.metaDescription),
  }
}

/** Published venue pages in display order. Uses the bundled defaults only when Sanity has none at all. */
export async function getSingaporeVenues(preview: boolean = false): Promise<SgVenue[]> {
  const query = `{
      "docs": *[_type == "singaporeVenuePage" && isPublished != false && defined(slug.current)] | order(coalesce(order, 999) asc) ${venueProjection},
      "total": count(*[_type == "singaporeVenuePage"])
    }`
  // Preview mode reads drafts through the draft-aware previewClient (same pattern as getBlogPostBySlug)
  const result = preview
    ? await previewClient.fetch<{ docs: Doc[]; total: number } | null>(query).catch(() => null)
    : await safeFetch<{ docs: Doc[]; total: number } | null>(query, undefined, null)
  if (!result || result.total === 0) return defaultVenues
  return result.docs.map(toVenue)
}

export async function getSingaporeVenue(slug: string): Promise<SgVenue | null> {
  const venues = await getSingaporeVenues()
  return venues.find((v) => v.slug === slug) || null
}
/* eslint-enable @typescript-eslint/no-explicit-any */
