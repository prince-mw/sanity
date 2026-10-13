// Seeds the Singapore page singleton (`singaporePage`) and one `singaporeVenuePage` per venue
// from the copy in src/data/singapore.ts. Images reuse the assets already in Sanity.
// Existing documents are left untouched (createIfNotExists).
//
// Usage (Node 22.18+ / 24, which can import .ts files directly):
//   node scripts/seed-singapore-pages.mjs            # dry run, prints a summary
//   node scripts/seed-singapore-pages.mjs --write    # creates any that don't exist yet
//
// Reads SANITY_API_TOKEN from the environment or .env.local.

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { sgMain, sgVenues, mwScienceBlock } from '../src/data/singapore.ts'

function readToken() {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN
  try {
    const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    return env.match(/^SANITY_API_TOKEN=(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '')
  } catch {
    return undefined
  }
}

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const keyed = (items = [], _type) => items.map((item) => ({ _key: key(), ...(_type && { _type }), ...item }))
const strings = (items = []) => items.slice()

// https://cdn.sanity.io/images/<project>/<dataset>/<hash>-<w>x<h>.<ext> → image-<hash>-<w>x<h>-<ext>
function assetId(url) {
  const m = url && url.match(/\/([a-f0-9]+-\d+x\d+)\.(\w+)(\?|$)/)
  return m ? `image-${m[1]}-${m[2]}` : null
}

function image(img) {
  const id = assetId(img?.src || img)
  if (!id) return undefined
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: id },
    ...(img?.alt && { alt: img.alt }),
    ...(img?.title && { title: img.title }),
  }
}

const landmarks = (items) =>
  items.map((l) => ({
    _key: key(),
    _type: 'sgLandmark',
    name: l.name,
    location: l.location,
    format: l.format,
    reach: l.reach,
    impressions: l.impressions,
    image: image(l.image),
  }))

const faqs = (items) => keyed(items, 'sgFaq')

const mainDoc = {
  _id: 'singaporePage',
  _type: 'singaporePage',
  title: 'Singapore Page',
  metaTitle: sgMain.metaTitle,
  metaDescription: sgMain.metaDescription,
  h1: sgMain.h1,
  heroParagraphs: strings(sgMain.heroParagraphs),
  heroPrimaryCta: sgMain.heroPrimaryCta,
  heroSecondaryCta: sgMain.heroSecondaryCta,
  heroStats: keyed(sgMain.heroStats, 'sgStat'),
  landscapeHeading: sgMain.landscape.heading,
  landscapeIntro: sgMain.landscape.intro,
  landscapeCards: keyed(sgMain.landscape.cards, 'sgTitledItem'),
  venuesHeading: sgMain.venuesHeading,
  venuesIntro: sgMain.venuesIntro,
  landmarksHeading: sgMain.landmarksHeading,
  landmarksIntro: sgMain.landmarksIntro,
  landmarks: landmarks(sgMain.landmarks),
  mediaTypesHeading: sgMain.mediaTypesHeading,
  mediaTypes: sgMain.mediaTypes.map((m) => ({ _key: key(), _type: 'sgMediaType', title: m.title, description: m.description, icon: m.icon })),
  billboardHeading: sgMain.billboard.heading,
  billboardParagraphs: strings(sgMain.billboard.paragraphs),
  billboardCta: sgMain.billboard.cta,
  billboardImage: image(sgMain.billboard.image),
  measurementHeading: sgMain.measurement.heading,
  measurementParagraphs: strings(sgMain.measurement.paragraphs),
  measurementRows: keyed(sgMain.measurement.rows, 'sgMeasurementRow'),
  measurementCta: sgMain.measurement.cta,
  potentialHeading: sgMain.potential.heading,
  potentialParagraphs: strings(sgMain.potential.paragraphs),
  storiesHeading: sgMain.stories.heading,
  storiesIntro: sgMain.stories.intro,
  stories: sgMain.stories.items.map((s) => ({
    _key: key(),
    _type: 'sgStory',
    tag: s.tag,
    headline: s.headline,
    button: s.button,
    href: s.href,
    image: image({ src: s.image, alt: s.headline }),
  })),
  ctaHeading: sgMain.cta.heading,
  ctaBody: sgMain.cta.body,
  ctaButton: sgMain.cta.button,
  faqs: faqs(sgMain.faqs),
  scienceHeading: mwScienceBlock.heading,
  scienceBody: mwScienceBlock.body,
  scienceLinkText: mwScienceBlock.linkText,
  scienceHref: mwScienceBlock.href,
  scienceGroups: mwScienceBlock.groups.map((g) => ({ _key: key(), _type: 'sgScienceGroup', title: g.title, items: strings(g.items) })),
}

const venueDocs = sgVenues.map((v, i) => ({
  _id: `singaporeVenuePage-${v.slug}`,
  _type: 'singaporeVenuePage',
  breadcrumbLabel: v.breadcrumbLabel,
  slug: { _type: 'slug', current: v.slug },
  isPublished: true,
  order: i + 1,
  image: image(v.image),
  tabLabel: v.tabLabel,
  badge: v.badge,
  tabBestFor: v.tabBestFor,
  tabDescription: v.tabDescription,
  tabStats: keyed(v.tabStats, 'sgStat'),
  ...(v.tabNote && { tabNote: v.tabNote }),
  h1: v.h1,
  tagline: v.tagline,
  leadQuestion: v.leadQuestion,
  intro: strings(v.intro),
  heroCta: v.heroCta,
  heroStats: keyed(v.heroStats, 'sgStat'),
  whyHeading: v.whyHeading,
  why: keyed(v.why, 'sgTitledItem'),
  premiumHeading: v.premiumHeading,
  premiumIntro: v.premiumIntro,
  landmarks: landmarks(v.landmarks),
  ...(v.landmarksNote && { landmarksNote: v.landmarksNote }),
  landmarksImageOnly: !!v.landmarksImageOnly,
  locationsHeading: v.locationsHeading,
  sites: keyed(v.sites, 'sgSite'),
  ...(v.locationGroups && { locationGroups: keyed(v.locationGroups, 'sgTitledItem') }),
  formatsHeading: v.formatsHeading,
  formats: strings(v.formats),
  whyChooseLead: strings(v.whyChooseLead),
  whyChooseList: strings(v.whyChooseList),
  faqs: faqs(v.faqs),
  ctaHeading: v.ctaHeading,
  ctaBody: v.ctaBody,
  ctaButton: v.ctaButton,
  metaTitle: v.metaTitle,
  metaDescription: v.metaDescription,
}))

const docs = [mainDoc, ...venueDocs]
const missingImages = []
const scan = (o, path) => {
  if (o && typeof o === 'object') {
    if (o._type === 'image' && !o.asset?._ref) missingImages.push(path)
    for (const [k, val] of Object.entries(o)) scan(val, `${path}.${k}`)
  }
}
docs.forEach((d) => scan(d, d._id))

if (!process.argv.includes('--write')) {
  for (const d of docs) console.log(`${d._id}: ${Object.keys(d).length} fields`)
  console.log(missingImages.length ? `Images without an asset: ${missingImages.join(', ')}` : 'All images resolved to Sanity assets.')
  console.log('\nDry run. Re-run with --write to create the documents.')
  process.exit(0)
}

const token = readToken()
if (!token) {
  console.error('SANITY_API_TOKEN not found in env or .env.local')
  process.exit(1)
}
const client = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token })
for (const d of docs) {
  const r = await client.createIfNotExists(d)
  console.log(`${d._id} ready (rev ${r._rev})`)
}
