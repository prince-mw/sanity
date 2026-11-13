// Pull the Inventory API into a local snapshot the website reads.
//
//   npm run inventory:pull                 every country the API has sites in
//   npm run inventory:pull -- malaysia     one or more countries (name or slug)
//
// Why a snapshot and not a live call per page: one country is ~115 pages of
// 100 records and takes minutes to pull (Malaysia staging, 13 Nov 2026: 206 s
// with 8 requests in parallel), far too slow for a page view. The daily job
// runs this script, then the site builds from the files.
//
// Reads INVENTORY_API_URL and INVENTORY_API_KEY from the environment or
// .env.local. The key never leaves this process and is never printed.
// Output: .inventory/<country-slug>.json + .inventory/index.json (git-ignored:
// the files carry prices for the server-side estimate; the media owner is
// dropped here and never written).

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const OUT = process.env.INVENTORY_SNAPSHOT_DIR || path.join(ROOT, '.inventory')
const PAGE_SIZE = 100
const PARALLEL = 8

function env() {
  const file = path.join(ROOT, '.env.local')
  const vars = {}
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) vars[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
    }
  }
  const url = process.env.INVENTORY_API_URL || vars.INVENTORY_API_URL || 'https://inventory-api-prd.movingwalls.com/api/v1'
  const key = process.env.INVENTORY_API_KEY || vars.INVENTORY_API_KEY
  if (!key) { console.error('INVENTORY_API_KEY is not set (environment or .env.local).'); process.exit(1) }
  return { url: url.replace(/\/+$/, ''), key }
}

const slugify = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const { url: BASE, key: KEY } = env()
const HEADERS = { Authorization: `ApiKey ${KEY}`, 'Content-Type': 'application/json', Accept: 'application/json' }

async function call(pathname, init = {}, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(`${BASE}${pathname}`, { ...init, headers: HEADERS, signal: AbortSignal.timeout(120_000) })
      if (res.ok) return res
      if (res.status < 500 && res.status !== 429) throw Object.assign(new Error(`${res.status} ${res.statusText} on ${pathname}`), { fatal: true })
      throw new Error(`${res.status} on ${pathname}`)
    } catch (e) {
      if (e.fatal || i >= tries) throw e
      await new Promise(r => setTimeout(r, 1000 * i * i))
    }
  }
}

/** Keep only what the website uses. The media owner is left behind on purpose. */
function slim(r) {
  const panels = (r.panels ?? []).map(p => ({
    pixelWidth: p.pixelWidth ?? null, pixelHeight: p.pixelHeight ?? null,
    physicalWidth: p.physicalWidth ?? null, physicalHeight: p.physicalHeight ?? null,
    screenCount: p.screenCount ?? null, orientation: p.orientation ?? null, supportsAudio: p.supportsAudio ?? null,
  }))
  const prices = (r.prices ?? []).map(p => ({
    currency: p.currency ?? null, daily: p.daily ?? null, monthly: p.monthly ?? null,
    cpm: p.cpm ?? null, cps: p.cps ?? null, durationSeconds: p.durationSeconds ?? null,
  }))
  return {
    id: r.id, referenceId: r.referenceId ?? null, name: r.name, description: r.description ?? null,
    typeName: r.typeName ?? null, displayFormatName: r.displayFormatName ?? null, size: r.size ?? null, scale: r.scale ?? null,
    classicFields: r.classicFields ? { illuminated: r.classicFields.illuminated ?? null } : null,
    digitalFields: r.digitalFields ? {
      spotDuration: r.digitalFields.spotDuration ?? null, spotsPerLoop: r.digitalFields.spotsPerLoop ?? null,
      loopDuration: r.digitalFields.loopDuration ?? null,
    } : null,
    venueTaxonomyName: r.venueTaxonomyName ?? null,
    venues: (r.venues ?? []).map(v => ({ name: v.name ?? null, path: v.path ?? null })),
    adminLevel0Name: r.adminLevel0Name ?? null, adminLevel1Name: r.adminLevel1Name ?? null,
    adminLevel2Name: r.adminLevel2Name ?? null, adminLevel3Name: r.adminLevel3Name ?? null,
    adminLevel4Name: r.adminLevel4Name ?? null,
    address: r.address ?? null, postalCode: r.postalCode ?? null, geoms: r.geoms ?? null,
    medias: (r.medias ?? []).map(m => ({ mediaType: m.mediaType ?? null, url: m.url ?? null })),
    thumbnailUrl: r.thumbnailUrl ?? null, thumbnailUrlOriginal: r.thumbnailUrlOriginal ?? null,
    status: r.status ?? null, publication: r.publication ?? null, archived: r.archived ?? null,
    requiresContentApproval: r.requiresContentApproval ?? null,
    panels, prices,
    updatedAt: r.updatedAt ?? null,
  }
}

async function pullCountry(country) {
  // Server-side filter = the website's rule (Sandeep, 13 Nov 2026: active + public
  // are safe to show); archived sites are left out too. normalize.ts checks again.
  const body = JSON.stringify({ adminLevel0Ids: [country.id], status: 'active', publications: ['public'], archived: false })
  const page = async n => {
    const res = await call(`/inventories/search?page=${n}&pageSize=${PAGE_SIZE}`, { method: 'POST', body })
    const rows = await res.json()
    return { rows: Array.isArray(rows) ? rows : rows.data ?? [], pages: Number(res.headers.get('X-Total-Pages') || 1) }
  }
  const first = await page(1)
  const rest = []
  const todo = Array.from({ length: Math.max(0, first.pages - 1) }, (_, i) => i + 2)
  await Promise.all(Array.from({ length: PARALLEL }, async () => {
    for (let n = todo.shift(); n; n = todo.shift()) rest.push(...(await page(n)).rows)
  }))
  const seen = new Set()
  return [...first.rows, ...rest].filter(r => !seen.has(r.id) && seen.add(r.id)).map(slim)
}

async function main() {
  const wanted = process.argv.slice(2).map(slugify).filter(Boolean)
  const countries = await (await call('/locations')).json()
  const chosen = wanted.length ? countries.filter(c => wanted.includes(slugify(c.name))) : countries
  if (wanted.length && chosen.length !== wanted.length) {
    const found = new Set(chosen.map(c => slugify(c.name)))
    console.error(`Not in the API's country list: ${wanted.filter(w => !found.has(w)).join(', ')}`)
    process.exit(1)
  }
  fs.mkdirSync(OUT, { recursive: true })
  const indexFile = path.join(OUT, 'index.json')
  const index = fs.existsSync(indexFile) ? JSON.parse(fs.readFileSync(indexFile, 'utf8')) : { countries: {} }
  const staging = /-stg\./.test(BASE)
  const queue = [...chosen]
  let failed = 0
  await Promise.all(Array.from({ length: wanted.length ? 1 : 4 }, async () => {
    for (let c = queue.shift(); c; c = queue.shift()) {
      const slug = slugify(c.name), t = Date.now()
      try {
        const rows = await pullCountry(c)
        const file = path.join(OUT, `${slug}.json`)
        if (rows.length) {
          fs.writeFileSync(file, JSON.stringify({ country: c.name, slug, source: BASE, staging, pulledAt: new Date().toISOString(), records: rows }))
          index.countries[slug] = { name: c.name, sites: rows.length, staging, pulledAt: new Date().toISOString() }
        } else {
          if (fs.existsSync(file)) fs.rmSync(file)
          delete index.countries[slug]
        }
        if (rows.length || wanted.length) console.log(`${c.name}: ${rows.length} sites (${Math.round((Date.now() - t) / 1000)} s)`)
      } catch (e) {
        failed++
        console.error(`${c.name}: FAILED, previous snapshot kept (${e.message})`)
      }
    }
  }))
  index.source = BASE
  index.staging = staging
  index.updatedAt = new Date().toISOString()
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 1))
  console.log(`Done: ${Object.keys(index.countries).length} countries with sites in ${path.relative(ROOT, OUT) || OUT}${staging ? ' (STAGING data: test inventory)' : ''}`)
  if (failed) process.exit(1)
}

main().catch(e => { console.error(e.message); process.exit(1) })
