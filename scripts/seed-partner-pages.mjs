// Seeds `partnerPage` documents (backing /partners/{slug}) from the default copy in
// src/data/partners.ts. Existing documents are left untouched (createIfNotExists).
//
// Usage (Node 22.18+ / 24, which can import .ts files directly):
//   node scripts/seed-partner-pages.mjs            # dry run, prints the documents
//   node scripts/seed-partner-pages.mjs --write    # creates any that don't exist yet
//
// Reads SANITY_API_TOKEN from the environment or .env.local.

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { defaultPartners } from '../src/data/partners.ts'

// Logo assets already uploaded to Sanity, keyed by partner slug
const LOGO_ASSETS = {
  solum: 'image-4e7ce9f7bbcee979921191c6ddde71785316a4de-299x168-png',
  'lg-electronics': 'image-a6d87086894e45f8f5a1cb09b452e5a4c00b9de3-334x65-png',
  brightsign: 'image-4537927da104f386322a645055295775442d037f-702x168-png',
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

const docs = defaultPartners.map((p) => ({
  _id: `partnerPage-${p.slug}`,
  _type: 'partnerPage',
  name: p.name,
  slug: { _type: 'slug', current: p.slug },
  isPublished: true,
  ...(LOGO_ASSETS[p.slug] && {
    logo: { _type: 'image', asset: { _type: 'reference', _ref: LOGO_ASSETS[p.slug] }, alt: p.logo?.alt },
  }),
  logoBackground: p.logoBackground,
  category: p.category,
  summary: p.summary,
  order: p.order,
  heroEyebrow: p.heroEyebrow,
  heroTitle: p.heroTitle,
  heroParagraphs: p.heroParagraphs,
  heroCtaText: p.heroCtaText,
  heroIllustration: p.heroIllustration,
  highlights: (p.highlights || []).map((h) => ({ ...h, _key: key(), _type: 'partnerHighlight' })),
  sections: p.sections.map((s) => ({
    ...s,
    _key: key(),
    ...(s._type === 'partnerCardsSection' && {
      cards: s.cards.map((c) => ({ ...c, _key: key(), _type: 'partnerCard' })),
    }),
  })),
  metaTitle: p.metaTitle,
  metaDescription: p.metaDescription,
}))

if (!process.argv.includes('--write')) {
  console.log(JSON.stringify(docs, null, 2))
  console.log(`\nDry run (${docs.length} partner page(s)). Re-run with --write to create them.`)
  process.exit(0)
}

const token = readToken()
if (!token) {
  console.error('SANITY_API_TOKEN not found in env or .env.local')
  process.exit(1)
}

const client = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token })
for (const doc of docs) {
  const result = await client.createIfNotExists(doc)
  console.log(`${doc._id} ready (rev ${result._rev})`)
}
