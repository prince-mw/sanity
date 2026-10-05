// Seeds the `retailMediaPage` singleton (backs /retail) from the default copy in
// src/data/retail-media-page.ts, linking the two images already uploaded to Sanity.
//
// Usage (Node 22.18+ / 24, which can import .ts files directly):
//   node scripts/seed-retail-media-page.mjs            # dry run, prints the document
//   node scripts/seed-retail-media-page.mjs --write    # creates it (skips if it already exists)
//
// Reads SANITY_API_TOKEN from the environment or .env.local.

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { defaultRetailMediaContent as c } from '../src/data/retail-media-page.ts'

const IMAGE_ASSETS = {
  howItWorksImage: 'image-7131f197692d564a51064c436bf95dce7ef8814e-960x540-webp',
  caseImage: 'image-72a4c26ab841ceb3cc0909db584ad20108168b36-960x540-webp',
}

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
const withKeys = (items, _type) => items.map((item) => ({ _key: key(), _type, ...item }))
const image = (assetId, alt) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId }, alt })

const doc = {
  _id: 'retailMediaPage',
  _type: 'retailMediaPage',
  title: 'Retail Media Page',

  heroEyebrow: c.heroEyebrow,
  heroTitle: c.heroTitle,
  heroSubtitle: c.heroSubtitle,
  heroStats: withKeys(c.heroStats, 'retailStat'),
  heroCtaText: c.heroCtaText,

  contextHeading: c.contextHeading,
  contextParagraphs: c.contextParagraphs,
  contextCallout: c.contextCallout,
  contextStats: withKeys(c.contextStats, 'retailStat'),
  contextClosing: c.contextClosing,
  lastMileHeading: c.lastMileHeading,
  lastMileParagraphs: c.lastMileParagraphs,

  momentsHeading: c.momentsHeading,
  moments: withKeys(c.moments, 'retailMoment'),

  approachEyebrow: c.approachEyebrow,
  approachHeading: c.approachHeading,
  approachIntro: c.approachIntro,
  approachPillars: withKeys(c.approachPillars, 'retailTitledItem'),
  categoriesLabel: c.categoriesLabel,
  categories: c.categories,

  howItWorksEyebrow: c.howItWorksEyebrow,
  howItWorksHeading: c.howItWorksHeading,
  howItWorksSteps: withKeys(c.howItWorksSteps, 'retailStep'),
  howItWorksImage: image(IMAGE_ASSETS.howItWorksImage, c.howItWorksImage?.alt),

  creativeHeading: c.creativeHeading,
  creativeIntro: c.creativeIntro,
  creativeItems: withKeys(c.creativeItems, 'retailTitledItem'),

  measurementHeading: c.measurementHeading,
  measurementIntro: c.measurementIntro,
  measurementLayers: withKeys(c.measurementLayers, 'retailMeasurementLayer'),

  caseEyebrow: c.caseEyebrow,
  caseHeading: c.caseHeading,
  caseBody: c.caseBody,
  caseStats: withKeys(c.caseStats, 'retailStat'),
  caseImage: image(IMAGE_ASSETS.caseImage, c.caseImage?.alt),

  ctaHeading: c.ctaHeading,
  ctaBody: c.ctaBody,
  ctaButtonText: c.ctaButtonText,

  faqHeading: c.faqHeading,
  faqs: withKeys(c.faqs, 'retailFaq'),
}

const write = process.argv.includes('--write')
if (!write) {
  console.log(JSON.stringify(doc, null, 2))
  console.log('\nDry run. Re-run with --write to create the document.')
  process.exit(0)
}

const token = readToken()
if (!token) {
  console.error('SANITY_API_TOKEN not found in env or .env.local')
  process.exit(1)
}

const client = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token })
const result = await client.createIfNotExists(doc)
console.log(`retailMediaPage ready (rev ${result._rev}, updated ${result._updatedAt})`)
