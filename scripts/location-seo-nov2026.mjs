// Location pages SEO clean-up (18 Nov 2026, per Dg):
//  - Google titles fit 600px (Arial 20px) and descriptions 960px (Arial 14px); widths checked with
//    data/location-seo-nov2026/pxwidth.mjs. Brand name removed from titles, replaced with keywords.
//  - heroImage.alt written for every location/city page (descriptions from looking at each photo;
//    photos that show a different place than the page get a neutral description). zh/ja/es/pt pages get
//    translated alt text.
//  - "See the Proof" case-study sections added where a case study matches the market.
//  - Singapore venue pages + /locations index titles (no brand).
// Patches the published doc and, if one exists, its draft (so pending edits don't undo this on publish).
// Run: node scripts/location-seo-nov2026.mjs          -> dry run (prints every change)
//      node scripts/location-seo-nov2026.mjs apply    -> writes
import fs from 'fs'
import { createClient } from '@sanity/client'
import { px } from './data/location-seo-nov2026/pxwidth.mjs'

const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })
const APPLY = process.argv[2] === 'apply'
const dir = 'scripts/data/location-seo-nov2026/'
const meta = JSON.parse(fs.readFileSync(dir + 'meta.json', 'utf8'))
const alts = JSON.parse(fs.readFileSync(dir + 'alts.json', 'utf8'))
const heroes = JSON.parse(fs.readFileSync(dir + 'heroes.json', 'utf8'))
const k = () => Math.random().toString(36).slice(2, 12)

// Case studies (published ids) per page path
const CS = {
  CNY_AFRICA: 'b8dac2d9-0255-41aa-a446-213764c22fa8', STRAAT: '4WosXPXvlMgq3tPqrVefOz', OOH_TRAXX: '4WosXPXvlMgq3tPqrVeesT',
  AL_ARABIA: '4WosXPXvlMgq3tPqrVejA1', FC_MEDIA: 'NUzgRk9h7jKjntS8q00bzA', ADDIG: '8bb80ddc-c16c-4534-a62f-79e51d0b2eeb',
  BYD: '441dbda9-49ce-489c-81fa-9f8ace07511e', JEKI: '4WosXPXvlMgq3tPqrVee25', AHA: 'dsdzDBKQU3TOwM9o6lPThv',
  SYDNEY_HOTEL: 'NUzgRk9h7jKjntS8q00bmy', OREO: '0793fc3d-0c46-4bfe-99f7-13b5f24d8d2e', RAMADAN_JKT: '2d616a70-2d5c-438a-b7b5-ed884a09a987',
  AQUA: '4WosXPXvlMgq3tPqrVecFt', YSL_KL: 'dsdzDBKQU3TOwM9o6lPLhO', BEAUTY_KL: 'case-study-anon-beauty-brand-ecommerce-dynamic-dooh-kuala-lumpur',
  OUT_OF_PHONE_BKK: '425beea2-107a-471a-9213-19e49d61f1db', SKINCARE_BKK: 'e9fc6d81-3275-4456-b576-cec53f1eee9b',
  NEUTROGENA_MUM: 'dsdzDBKQU3TOwM9o6lPHmo', FINTECH_EDSA: '4WosXPXvlMgq3tPqrVeiSf', SEASONAL_PH: '4WosXPXvlMgq3tPqrVek5p',
  BEVERAGE_CEBU: 'case-study-anon-beverage-brand-weather-traffic-triggered-dooh-philippines',
  COOKIE_PH: 'case-study-anon-global-cookie-brand-real-time-dooh-philippines',
}
const STORIES = {
  africa: ['CNY_AFRICA', 'STRAAT', 'OOH_TRAXX'],
  egypt: ['AL_ARABIA'],
  morocco: ['FC_MEDIA'],
  europe: ['ADDIG'],
  uae: ['BYD'],
  japan: ['JEKI'],
  'japan/tokyo': ['JEKI'],
  'united-states': ['AHA'],
  'united-states/new-york': ['AHA'],
  'united-states/new-jersey': ['AHA'],
  americas: ['AHA'],
  australia: ['SYDNEY_HOTEL'],
  'south-africa/cape-town': ['STRAAT', 'CNY_AFRICA'],
  'south-africa/durban': ['STRAAT', 'CNY_AFRICA'],
  'south-africa/johannesburg': ['STRAAT', 'CNY_AFRICA'],
  'kenya/nairobi': ['OOH_TRAXX'],
  'kenya/mombasa': ['OOH_TRAXX'],
  'kenya/kisumu-nakuru': ['OOH_TRAXX'],
  'indonesia/jakarta': ['OREO', 'RAMADAN_JKT', 'AQUA'],
  'malaysia/kuala-lumpur': ['YSL_KL', 'BEAUTY_KL'],
  'thailand/bangkok': ['OUT_OF_PHONE_BKK', 'SKINCARE_BKK'],
  'india/mumbai': ['NEUTROGENA_MUM'],
  'philippines/edsa': ['FINTECH_EDSA'],
  'philippines/central-business-districts': ['SEASONAL_PH'],
  'philippines/cebu': ['BEVERAGE_CEBU', 'COOKIE_PH'],
  'philippines/retail-shopping-malls': ['COOKIE_PH', 'SEASONAL_PH'],
}

const langOf = (path) => path.startsWith('china-zh') ? 'zh' : path.startsWith('japan-ja') ? 'ja' : path.startsWith('americas-es') ? 'es' : path.startsWith('americas-pt') ? 'pt' : 'en'
const altFor = (ref, path) => {
  const i = heroes.findIndex((h) => h.ref === ref)
  if (i < 0) return null
  const a = alts[String(i)]
  const lang = langOf(path)
  if (typeof a === 'string') { if (lang !== 'en') throw new Error(`No ${lang} alt for ${path}`); return a }
  if (!a[lang]) throw new Error(`No ${lang} alt for ${path}`)
  return a[lang]
}

function storiesSection(keys) {
  return {
    _key: k(), _type: 'successStories', backgroundColor: 'gray', cardStyle: 'image', sectionHeading: 'See the Proof',
    stories: keys.map((key) => ({ _key: k(), _type: 'successStoryItem', contentType: 'caseStudy', caseStudyRef: { _type: 'reference', _ref: CS[key] } })),
  }
}
function withStories(sections, keys) {
  const list = [...(sections || [])]
  if (list.some((s) => s._type === 'successStories')) return null // page already has one
  let at = list.findIndex((s) => s._type === 'logoCarousel')
  if (at < 0) at = list.findIndex((s) => s._type === 'ctaBanner')
  if (at < 0) at = list.length
  list.splice(at, 0, storiesSection(keys))
  return list
}

// Check case studies exist and are published
const csDocs = await c.fetch(`*[_id in $ids]{_id, title, status}`, { ids: Object.values(CS) })
for (const [name, id] of Object.entries(CS)) {
  const d = csDocs.find((x) => x._id === id)
  if (!d || d.status !== 'published') throw new Error(`Case study ${name} (${id}) missing or not published`)
}

const docs = await c.fetch(`*[_type in ["location","locationCity"]]{..., "countrySlug": country->slug.current}`)
const published = docs.filter((d) => !d._id.startsWith('drafts.'))
const drafts = Object.fromEntries(docs.filter((d) => d._id.startsWith('drafts.')).map((d) => [d._id.slice(7), d]))
const pathOf = (d) => d._type === 'location' ? d.slug.current : `${d.countrySlug}/${d.slug.current}`

const ops = []
let nT = 0, nD = 0, nA = 0, nS = 0
for (const d of published) {
  const path = pathOf(d)
  const m = meta[path] || {}
  const set = {}
  if (m.t && m.t !== d.seo?.metaTitle) { set['seo.metaTitle'] = m.t; nT++ }
  if (m.d && m.d !== d.seo?.metaDescription) { set['seo.metaDescription'] = m.d; nD++ }
  const ref = d.heroImage?.asset?._ref
  const alt = ref && altFor(ref, path)
  if (alt && alt !== d.heroImage?.alt) { set['heroImage.alt'] = alt; nA++ }
  let sections = null
  if (STORIES[path]) { sections = withStories(d.sections, STORIES[path]); if (sections) nS++ }
  if (!Object.keys(set).length && !sections) continue
  console.log(`\n${path}`)
  if (set['seo.metaTitle']) console.log(`  title ${px(m.t, 20)}px: ${m.t}\n        was ${px(d.seo?.metaTitle || '', 20)}px: ${d.seo?.metaTitle}`)
  if (set['seo.metaDescription']) console.log(`  desc  ${px(m.d, 14)}px: ${m.d}\n        was ${px(d.seo?.metaDescription || '', 14)}px`)
  if (set['heroImage.alt']) console.log(`  alt: ${alt}`)
  if (sections) console.log(`  + See the Proof: ${STORIES[path].join(', ')}`)
  ops.push({ id: d._id, set, stories: STORIES[path], hasSections: Boolean(sections), sections })
}

// Singapore venues and /locations index
for (const [key, m] of Object.entries(meta).filter(([key]) => key.includes(':'))) {
  const [kind, id] = key.split(':')
  const d = await c.getDocument(id)
  if (!d) throw new Error('Missing ' + id)
  const set = {}
  if (kind === 'SG') { if (m.t) set.metaTitle = m.t; if (m.d) set.metaDescription = m.d }
  else { if (m.t) set['seo.metaTitle'] = m.t; if (m.d) set['seo.metaDescription'] = m.d }
  console.log(`\n${id}\n  title ${px(m.t, 20)}px: ${m.t}\n        was: ${kind === 'SG' ? d.metaTitle : d.seo?.metaTitle}${m.d ? `\n  desc  ${px(m.d, 14)}px: ${m.d}` : ''}`)
  ops.push({ id, set })
  if (kind === 'SG') { nT++; if (m.d) nD++ } else nT++
}

console.log(`\n${ops.length} docs: ${nT} titles, ${nD} descriptions, ${nA} alt texts, ${nS} case-study sections`)
if (!APPLY) { console.log('Dry run. Add "apply" to write.'); process.exit(0) }

for (const op of ops) {
  const tx = c.transaction()
  const pub = { ...op.set }
  if (op.sections) pub.sections = op.sections
  tx.patch(op.id, (p) => p.set(pub))
  const dr = drafts[op.id] || (await c.getDocument('drafts.' + op.id))
  if (dr) {
    const dset = { ...op.set }
    if (op.stories) { const s = withStories(dr.sections, op.stories); if (s) dset.sections = s }
    tx.patch(dr._id, (p) => p.set(dset))
    console.log('also draft', dr._id)
  }
  await tx.commit()
}
console.log('applied', ops.length)
