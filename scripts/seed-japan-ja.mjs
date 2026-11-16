// Japanese versions of the Japan market pages (Nov 2026):
//   /locations/japan-ja  +  /locations/japan-ja/{tokyo,osaka,nagoya,fukuoka}
//   /{japan-transit-media-guide,japanGTM-LuxuryFashion,japanGTM-TechElectronics,japanGTM-TravelTourism}-ja  (site root, like the English ones)
// Each page is a copy of its English page with every visible text swapped for Japanese (same design, images,
// sections). Text comes from scripts/data/japan-ja/translations/<english slug>.json, keyed by the segment ids in
// scripts/data/japan-ja/segments/<english slug>.json (same extraction order as below).
// Forms load in Japanese (?zf_lang=ja) and internal links point at the Japanese siblings.
//
//   node scripts/seed-japan-ja.mjs --dry       build + check, write nothing
//   node scripts/seed-japan-ja.mjs --draft     create/replace the 9 DRAFTS (nothing live changes)
//   node scripts/seed-japan-ja.mjs --publish   publish the 9 drafts (country page first)
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { createClient } from '@sanity/client'
const require = createRequire(import.meta.url)
const { JSDOM } = require('jsdom')

const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const client = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })
const DATA = path.join('scripts', 'data', 'japan-ja')
const mode = process.argv[2] || '--dry'

const COUNTRY_EN = 'NUzgRk9h7jKjntS8pyrlSM'
const COUNTRY_JA = 'location-japan-ja'
const CITIES = ['tokyo', 'osaka', 'nagoya', 'fukuoka']
const LANDINGS = ['japan-transit-media-guide', 'japanGTM-LuxuryFashion', 'japanGTM-TechElectronics', 'japanGTM-TravelTourism']
const jaId = (d) => d._type === 'location' ? COUNTRY_JA : d._type === 'locationCity' ? `city-japan-ja-${d.slug.current}` : `landing-${d.slug.current.toLowerCase()}-ja`

// ---------- extraction (must match the order used to produce segments/*.json) ----------
const SKIP_KEYS = new Set(['_key', '_type', '_ref', '_id', '_rev', '_createdAt', '_updatedAt', '_system', 'slug', 'current', 'href', 'url', 'link', 'ctaLink', 'contactFormUrl', 'code', 'backgroundColor', 'alignment', 'layout', 'maxWidth', 'sectionsPosition', 'height', 'value', 'reach', 'impressions', 'status', 'style', 'listItem', 'marks', 'platform', 'icon', 'scheduledPublishAt', 'variant', 'ctaStyle', 'columns', 'imagePosition'])
const INLINE = new Set(['A', 'STRONG', 'B', 'EM', 'I', 'SPAN', 'BR', 'SMALL', 'SUP', 'SUB', 'MARK', 'U', 'ABBR', 'CODE'])
const ATTRS = ['alt', 'title', 'aria-label', 'placeholder']
const hasLetters = (s) => /[A-Za-z]{2,}/.test(s)
const isUrlish = (s) => /^(https?:|mailto:|tel:|\/|#|image-|file-)/.test(s.trim()) || /^[a-z]+$/.test(s.trim()) && s.length < 12

function ptToTagged(block) {
  const linkIdx = {}
  ;(block.markDefs || []).forEach((m, i) => { linkIdx[m._key] = i + 1 })
  return (block.children || []).map((c) => {
    let t = (c.text || '').replace(/</g, '&lt;')
    for (const m of [...(c.marks || [])].reverse()) {
      if (m === 'strong') t = `<b>${t}</b>`
      else if (m === 'em') t = `<i>${t}</i>`
      else if (linkIdx[m]) t = `<a${linkIdx[m]}>${t}</a${linkIdx[m]}>`
      else t = `<m:${m}>${t}</m:${m}>`
    }
    return t
  }).join('')
}
// Tagged Japanese string → span children with the original block's marks/link keys
let keyN = 0
const newKey = () => `ja${(keyN++).toString(36)}${Math.random().toString(36).slice(2, 7)}`
function taggedToChildren(str, block) {
  const linkKey = {}
  ;(block.markDefs || []).forEach((m, i) => { linkKey[i + 1] = m._key })
  const children = []
  const stack = []
  const re = /<(\/?)(b|i|a\d+|m:[^>]+)>/g
  let last = 0
  const push = (text) => { if (text) children.push({ _key: newKey(), _type: 'span', marks: [...stack], text: text.replace(/&lt;/g, '<') }) }
  for (let m; (m = re.exec(str));) {
    push(str.slice(last, m.index))
    last = m.index + m[0].length
    const name = m[2]
    const mark = name === 'b' ? 'strong' : name === 'i' ? 'em' : name.startsWith('a') ? linkKey[Number(name.slice(1))] : name.slice(2)
    if (m[1]) stack.splice(stack.lastIndexOf(mark), 1)
    else stack.push(mark)
  }
  push(str.slice(last))
  return children
}

function htmlSegments(html) {
  const dom = new JSDOM(`<!doctype html><body>${html}</body>`)
  const out = []
  const visit = (el) => {
    if (['STYLE', 'SCRIPT', 'NOSCRIPT', 'IFRAME'].includes(el.tagName)) return
    for (const a of ATTRS) { const v = el.getAttribute && el.getAttribute(a); if (v && hasLetters(v)) out.push({ node: el, kind: 'attr', attr: a, en: v }) }
    const kids = [...el.childNodes]
    const textKids = kids.filter((n) => n.nodeType === 3 && n.textContent.trim())
    const elemKids = kids.filter((n) => n.nodeType === 1)
    const allInline = elemKids.every((c) => INLINE.has(c.tagName) && [...c.querySelectorAll('*')].every((x) => INLINE.has(x.tagName)))
    if (el.tagName !== 'BODY' && hasLetters(el.textContent) && allInline && (textKids.length || elemKids.length)) {
      for (const x of el.querySelectorAll('*')) for (const a of ATTRS) { const v = x.getAttribute(a); if (v && hasLetters(v)) out.push({ node: x, kind: 'attr', attr: a, en: v }) }
      out.push({ node: el, kind: 'html', en: el.innerHTML.replace(/\s+/g, ' ').trim() })
      return
    }
    for (const n of textKids) if (hasLetters(n.textContent)) out.push({ node: n, kind: 'textnode', en: n.textContent.replace(/\s+/g, ' ').trim() })
    for (const c of elemKids) visit(c)
  }
  visit(dom.window.document.body)
  return { dom, segs: out }
}

// Walks the doc in extraction order, handing each segment's English to `tr(en)` and writing back the result.
function translateDoc(d, tr) {
  const walk = (o) => {
    if (Array.isArray(o)) {
      if (o.length && o.every((b) => b && b._type === 'block')) {
        for (const b of o) { const t = ptToTagged(b); if (hasLetters(t)) b.children = taggedToChildren(tr(t), b) }
        return
      }
      o.forEach(walk)
      return
    }
    if (o && typeof o === 'object') {
      for (const k of Object.keys(o)) {
        if (k === 'code' && typeof o[k] === 'string') {
          const { dom, segs } = htmlSegments(o[k])
          for (const s of segs) {
            const ja = tr(s.en)
            if (s.kind === 'attr') s.node.setAttribute(s.attr, ja)
            else if (s.kind === 'html') s.node.innerHTML = ja
            else { const raw = s.node.textContent; s.node.textContent = raw.match(/^\s*/)[0] + ja + raw.match(/\s*$/)[0] }
          }
          o[k] = dom.window.document.body.innerHTML
          continue
        }
        if (SKIP_KEYS.has(k) || k.startsWith('_')) continue
        const v = o[k]
        if (typeof v === 'string') { if (hasLetters(v) && !isUrlish(v)) o[k] = tr(v) }
        else walk(v)
      }
    }
  }
  walk(d)
}

// ---------- links & forms ----------
function localiseLinks(s) {
  return s
    // Zoho forms → Japanese (the 4 Japan forms have a Japanese translation, code "ja")
    .replace(/(https?:\/\/forms\.zohopublic\.com\/movingwallsholdingpteltd\/form\/(?:JapanContact|JapanWhitepaperLuxuryFashion|JapanWhitepaperTechnologyConsumerElectronics|JapaneseWhitePaperTravelTourism)\/formperma\/[A-Za-z0-9_-]+)(?![A-Za-z0-9_?&=-])/g, '$1?zf_lang=ja')
    // Japan location pages → Japanese siblings
    .replace(/((?:https?:\/\/(?:www\.)?movingwalls\.com)?\/locations\/japan)(?=[/"'?#\s)]|$)/g, '$1-ja')
    // Japan landing pages (at the site root, or /lp/…) → Japanese siblings at the site root
    .replace(/(?:https?:\/\/(?:www\.)?movingwalls\.com)?\/(?:lp\/)?(japan-transit-media-guide|japanGTM-LuxuryFashion|japanGTM-TechElectronics|japanGTM-TravelTourism)(?=[/"'?#\s)]|$)/g, '/$1-ja')
}
const deepMapStrings = (o, fn) => Array.isArray(o) ? o.map((v) => deepMapStrings(v, fn)) : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, k === '_ref' || k === '_id' ? v : deepMapStrings(v, fn)])) : typeof o === 'string' ? fn(o) : o

// ---------- leftover English check ----------
function englishLeftovers(doc) {
  const out = []
  const KEEP = /^(Moving Walls|MASTRUM|MW [A-Z][a-z]+|Insightz Club|jeki|JEKI|OOH|DOOH|LinkedIn|J・AD|Calvin Klein|LVMH)/
  const check = (t, where) => { const s = t.replace(/\s+/g, ' ').trim(); if (/[A-Za-z]{3,}(?: [A-Za-z]{2,}){2,}/.test(s) && !/[぀-ヿ一-鿿]/.test(s) && !KEEP.test(s)) out.push(`${where}: ${s.slice(0, 70)}`) }
  const walk = (o, p) => {
    if (Array.isArray(o)) return o.forEach((v, i) => walk(v, `${p}[${i}]`))
    if (o && typeof o === 'object') for (const k of Object.keys(o)) {
      if (k === 'code') { const { segs } = htmlSegments(o[k]); segs.forEach((s) => check(s.en, `${p}.code`)) }
      else if (!SKIP_KEYS.has(k) && !k.startsWith('_') && typeof o[k] === 'string' && !isUrlish(o[k])) check(o[k], `${p}.${k}`)
      else if (k === 'text' && typeof o[k] === 'string') check(o[k], `${p}.text`)
      else if (typeof o[k] === 'object') walk(o[k], `${p}.${k}`)
    }
  }
  walk(doc, '')
  return out
}

// ---------- build ----------
async function build() {
  const docs = await client.fetch(`*[!(_id in path("drafts.**")) && ((_type == "location" && _id == $c) || (_type == "locationCity" && country._ref == $c && slug.current in $cities) || (_type == "landingPage" && slug.current in $lps))]`, { c: COUNTRY_EN, cities: CITIES, lps: LANDINGS })
  if (docs.length !== 9) throw new Error(`expected 9 English pages, found ${docs.length}`)
  const built = []
  let problems = 0
  for (const en of docs) {
    const key = en.slug.current
    const segs = JSON.parse(fs.readFileSync(path.join(DATA, 'segments', `${key}.json`), 'utf8'))
    const tr = JSON.parse(fs.readFileSync(path.join(DATA, 'translations', `${key}.json`), 'utf8'))
    const d = structuredClone(en)
    let i = 0
    translateDoc(d, (english) => {
      const seg = segs[i++]
      const norm = (s) => s.replace(/\s+/g, ' ').trim()
      if (!seg || norm(seg.en) !== norm(english)) throw new Error(`${key}: segment ${i} out of step — expected "${seg?.en?.slice(0, 50)}", got "${english.slice(0, 50)}" (English page changed since extraction?)`)
      const ja = tr[seg.id]
      if (!ja) throw new Error(`${key}: no translation for ${seg.id}`)
      return ja
    })
    if (i !== segs.length) throw new Error(`${key}: used ${i} of ${segs.length} segments`)
    const { _id, _rev, _createdAt, _updatedAt, _system, ...rest } = d
    let out = deepMapStrings(rest, localiseLinks)
    out._id = jaId(en)
    out.slug = { _type: 'slug', current: en._type === 'locationCity' ? key : `${key}-ja` }
    if (en._type === 'locationCity') out.country = { _type: 'reference', _ref: COUNTRY_JA, _weak: true, _strengthenOnPublish: { type: 'location' } }
    const left = englishLeftovers(out)
    const formsJa = (JSON.stringify(out).match(/zf_lang=ja/g) || []).length
    const enForms = (JSON.stringify(en).match(/formperma\//g) || []).length
    const stillEnLinks = (JSON.stringify(out).match(/\/locations\/japan(?!-ja)[/"]|\/(?:lp\/)?japanGTM-[A-Za-z]+(?!-ja)["/]/g) || [])
    console.log(`${out._id.padEnd(40)} ${String(segs.length).padStart(4)} texts | forms ${formsJa}/${enForms} in Japanese | English left: ${left.length} | old links left: ${stillEnLinks.length}`)
    left.slice(0, 8).forEach((l) => console.log('     EN:', l))
    stillEnLinks.slice(0, 4).forEach((l) => console.log('     LINK:', l))
    problems += left.length + stillEnLinks.length + (formsJa < enForms ? 1 : 0)
    built.push(out)
  }
  return { built, problems }
}

if (mode === '--publish') {
  // Country page first so the cities' references can be strengthened.
  const ids = ['location-japan-ja', ...CITIES.map((c) => `city-japan-ja-${c}`), ...LANDINGS.map((l) => `landing-${l.toLowerCase()}-ja`)]
  for (const id of ids) {
    const draft = await client.getDocument(`drafts.${id}`)
    if (!draft) { console.log('no draft for', id, '(already published?)'); continue }
    const { _id, _rev, _createdAt, _updatedAt, ...doc } = draft
    if (doc.country?._weak) doc.country = { _type: 'reference', _ref: doc.country._ref }
    await client.transaction().createOrReplace({ ...doc, _id: id }).delete(`drafts.${id}`).commit()
    console.log('published', id)
  }
} else {
  const { built, problems } = await build()
  console.log(problems ? `\n${problems} problem(s) — fix before writing.` : '\nAll 9 pages fully Japanese.')
  if (mode === '--draft') {
    if (problems) process.exit(1)
    const tx = client.transaction()
    for (const d of built) tx.createOrReplace({ ...d, _id: `drafts.${d._id}` })
    await tx.commit()
    console.log('Wrote 9 drafts.')
  }
}
