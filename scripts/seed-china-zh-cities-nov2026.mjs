// Creates DRAFT Chinese versions of ten more China city pages (Nov 2026), under the Chinese China page:
//   /locations/china-zh/{changsha,chongqing,hangzhou,nanjing,qingdao,suzhou,tianjin,wuhan,xiamen,xian}
// Copy: scripts/data/china-zh-cities-nov2026.mjs (Chinese docs from the China team, plus a few translated extras).
// Each page copies its live English page's design: the custom-HTML block is cloned and every English text node is
// swapped for its Chinese text (fails if any English is left). Forms use ChinaContact in Chinese (zf_lang=zh-cn);
// the agency survey uses the Chinese survey (fwDB2f) already used on /locations/china-zh.
// Also (per Dg, 23 Nov 2026), as drafts of the ENGLISH pages:
//   - Tianjin and Xiamen get real CC0 Wikimedia Commons hero photos (the old ones showed Kuala Lumpur / elsewhere)
//   - Hangzhou's "Vietnam" market chip links to /locations/vietnam (the page is now live)
// Usage: node scripts/seed-china-zh-cities-nov2026.mjs <photo folder> [apply]
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { createClient } from '@sanity/client'
import { px } from './data/location-seo-nov2026/pxwidth.mjs'
import { COMMON, CITIES } from './data/china-zh-cities-nov2026.mjs'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const [IMG_DIR, MODE] = process.argv.slice(2)
if (!IMG_DIR) { console.error('Pass the photo folder'); process.exit(1) }
const APPLY = MODE === 'apply'
const CHINA_ZH = 'mSyYDtb4LR10cN8Ptt6pOT'
const FORM_EN = 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/ChinaContact/formperma/nvy57hJomHEC_B86q0RdqW2SKg0CbwdeFC5N25Ce5e0'
const FORM = FORM_EN + '?zf_lang=zh-cn'
const SURVEY_EN = 'https://survey.zohopublic.com/zs/JHjE75'
const SURVEY_ZH = 'https://survey.zohopublic.com/zs/fwDB2f'
let n = 0
const k = () => `zh${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

// New hero photos (CC0, Wikimedia Commons)
const PHOTOS = {
  tianjin: { file: 'tj-skyline', source: 'File:天津天际线202511.jpg', en: 'Tianjin city skyline under a clear blue sky', zh: '天津城市天际线' },
  xiamen: { file: 'xm-lujiang', source: 'File:鹭江道之蓝夜.jpg', en: 'Lujiang Road waterfront towers at dusk, Xiamen', zh: '厦门鹭江道夜景' },
}

// ---- text swapping ----
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#0?39;|&rsquo;|’/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
function swap(html, dict, missing) {
  const keep = []
  const protect = (s) => s.replace(/<style>[\s\S]*?<\/style>|<!--[\s\S]*?-->|<svg[\s\S]*?<\/svg>|<script[\s\S]*?<\/script>/g, (m) => `\u0001${keep.push(m) - 1}\u0002`)
  let out = protect(html).replace(/>([^<]+)(?=<)/g, (m, raw) => {
    const t = decode(raw.replace(/\u0001\d+\u0002/g, ''))
    if (!t || !/[A-Za-z]/.test(t) || t === '&times;') return m
    const zh = dict[t] ?? COMMON[t]
    if (zh === undefined) { missing.add(t); return m }
    // keep protected blocks (e.g. an arrow <svg> after a button label) on the same side of the text
    const tokens = (raw.match(/\u0001\d+\u0002/g) || []).join(' ')
    if (!tokens) return '>' + esc(zh)
    return raw.trimStart().startsWith('\u0001') ? `> ${tokens} ${esc(zh)}` : `>${esc(zh)} ${tokens} `
  })
  out = out.replace(/\u0001(\d+)\u0002/g, (_, i) => keep[+i])
  // screen-reader labels
  out = out.replace(/aria-label="([^"]*)"/g, (m, v) => {
    const t = decode(v)
    const zh = t === 'Close' ? '关闭' : (dict[t] ?? COMMON[t])
    return zh ? `aria-label="${esc(zh).replace(/"/g, '&quot;')}"` : m
  })
  return out
    .replaceAll(FORM_EN + '"', FORM + '"')
    .replaceAll(SURVEY_EN, SURVEY_ZH)
    .replaceAll('aria-label="Contact Moving Walls"', 'aria-label="联系 Moving Walls"')
    .replaceAll('title="Moving Walls China Contact Form"', 'title="Moving Walls 中国联系表单"')
}
const leftovers = (html) => {
  const s = html.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '')
  const text = [...s.matchAll(/>([^<]+)</g)].map((m) => decode(m[1])).filter((t) => /[A-Za-z]{3}/.test(t) && !/^(Moving Walls|Calvin Klein|OOH|DOOH)\b/.test(t) && !/[一-鿿]/.test(t) && t !== '&times;')
  const attrs = [...s.matchAll(/\s(alt|aria-label|title|placeholder)="([^"]*[A-Za-z]{3}[^"]*)"/g)].map((m) => `${m[1]}="${m[2]}"`).filter((a) => !/[一-鿿]/.test(a))
  return [...text, ...attrs]
}
const VIETNAM_PLAIN = '<span class="mw-hz-regions__chip mw-hz-regions__chip--plain">Vietnam</span>'
const VIETNAM_LINK = '<a class="mw-hz-regions__chip" href="https://www.movingwalls.com/locations/vietnam">Vietnam</a>'

// ---- portable text / helpers ----
const faq = (list) => list.map(([question, answer]) => ({ _key: k(), question, answer }))

// ---- photos ----
const uploaded = {}
if (APPLY) {
  for (const [slug, p] of Object.entries(PHOTOS)) {
    const buf = await sharp(path.join(IMG_DIR, p.file + '.jpg')).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
    uploaded[slug] = await c.assets.upload('image', buf, { filename: `${slug}-${p.file}.webp`, source: { name: 'wikimedia-commons', id: p.source, url: 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(p.source.replace(/ /g, '_')) } })
  }
}
const heroFor = (slug, lang, en) => (PHOTOS[slug] && APPLY)
  ? { _type: 'image', asset: { _type: 'reference', _ref: uploaded[slug]._id }, alt: PHOTOS[slug][lang] }
  : { ...en.heroImage, alt: lang === 'zh' ? (PHOTOS[slug]?.zh || `${CITIES.find((x) => x.slug === slug).name}城市风光`) : en.heroImage?.alt }

// ---- build ----
const zhDocs = [], enDrafts = []
let problems = 0
for (const p of CITIES) {
  const en = await c.getDocument('city-china-' + p.slug)
  const enDraft = await c.getDocument('drafts.city-china-' + p.slug)
  if (enDraft) console.log(`note: ${p.slug} has an English draft (${enDraft._updatedAt}); English changes are applied to it`)
  const base = enDraft || en
  // English page changes (draft)
  if (PHOTOS[p.slug] || p.slug === 'hangzhou') {
    const { _rev, _updatedAt, _createdAt, _system, ...rest } = base
    const d = { ...rest, _id: 'drafts.city-china-' + p.slug }
    if (PHOTOS[p.slug]) {
      const oldRef = base.heroImage?.asset?._ref
      d.heroImage = heroFor(p.slug, 'en', base)
      if (base.seo?.ogImage?.asset?._ref === oldRef) d.seo = { ...base.seo, ogImage: { _type: 'image', asset: d.heroImage.asset } }
    }
    if (p.slug === 'hangzhou') {
      d.sections = base.sections.map((s) => (s.code?.includes(VIETNAM_PLAIN) ? { ...s, code: s.code.replace(VIETNAM_PLAIN, VIETNAM_LINK) } : s))
      if (!JSON.stringify(d.sections).includes('/locations/vietnam')) throw new Error('Vietnam chip not found on Hangzhou')
    }
    enDrafts.push(d)
  }
  // Chinese page (always from the English page incl. the changes above)
  const src = enDrafts.find((d) => d._id === 'drafts.city-china-' + p.slug) || en
  const missing = new Set()
  const sections = []
  for (const s of src.sections) {
    if (s._type === 'customEmbed') {
      const code = swap(s.code, p.swap, missing)
      const left = leftovers(code).filter((t) => !missing.has(t))
      if (left.length) { console.log(`${p.slug}: English left: ${JSON.stringify(left)}`); problems++ }
      sections.push({ ...s, _key: k(), code })
    } else if (s._type === 'logoCarousel') {
      sections.push({ ...s, _key: k(), heading: '广受全球营销人员信赖' })
    } else if (s._type === 'ctaBanner') {
      const [heading, subheading, ctaText] = p.banner
      const { subheading: _drop, ...rest } = s
      sections.push({ ...rest, _key: k(), heading, ...(subheading ? { subheading } : {}), ctaText, ctaLink: FORM })
    } else throw new Error(`${p.slug}: unexpected section ${s._type}`)
  }
  if (missing.size) { console.log(`${p.slug}: no Chinese for:\n  - ${[...missing].join('\n  - ')}`); problems++ }
  if (p.faqs.length !== (en.faqs || []).length) console.log(`${p.slug}: FAQ count zh ${p.faqs.length} vs en ${(en.faqs || []).length}`)
  const [t, dsc] = p.seo
  const tw = px(t, 20), dw = px(dsc, 14)
  console.log(`${p.slug}: title ${tw}px, desc ${dw}px`)
  if (tw > 600 || dw > 960) { console.log(`  SEO too wide: ${t}`); problems++ }
  const hero = heroFor(p.slug, 'zh', src)
  zhDocs.push({
    _id: `drafts.city-china-zh-${p.slug}`,
    _type: 'locationCity',
    country: { _type: 'reference', _ref: CHINA_ZH },
    city: p.name,
    slug: { _type: 'slug', current: p.slug },
    ...(en.order ? { order: en.order } : {}),
    isActive: true,
    heroTitle: p.h1,
    heroImage: hero,
    fullDescription: p.intro,
    description: p.card,
    ctaButtonText: p.button,
    showAllLocationsButton: true,
    contactFormUrl: FORM,
    faqsHeading: '常见问题',
    sectionsPosition: en.sectionsPosition,
    sections,
    faqs: faq(p.faqs),
    seo: { _type: 'seo', metaTitle: t, metaDescription: dsc, enableKeywords: false, noIndex: false, ogImage: { _type: 'image', asset: hero.asset } },
  })
}
for (const d of zhDocs) {
  if (await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$z && !(_id in [$id, $d])])', { s: d.slug.current, z: CHINA_ZH, id: d._id.slice(7), d: d._id })) throw new Error('Slug in use: ' + d.slug.current)
}
if (problems) { console.log(`\n${problems} problem(s); nothing written`); process.exit(1) }
if (!APPLY) { console.log('\nDry run OK. Add "apply" to write.'); process.exit(0) }
const tx = c.transaction()
for (const d of [...zhDocs, ...enDrafts]) tx.createOrReplace(d)
await tx.commit()
console.log('Drafts saved:', zhDocs.map((d) => '/locations/china-zh/' + d.slug.current).join(', '))
console.log('English drafts:', enDrafts.map((d) => d._id).join(', '))
