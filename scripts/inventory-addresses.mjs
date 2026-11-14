// Full addresses for sites the API has none for (Rif, 14 Nov 2026: "full address
// has to be there"). About 2,200 real Malaysia sites have no address, or only
// "transit", "Malaysia" or a town; all have a map point. For those, ask
// OpenStreetMap's Nominatim what is at the point (reverse geocoding) and attach
// it to the record as `mapAddress`. The website shows it with the credit
// "© OpenStreetMap contributors" (ODbL); the staff dashboard marks it "address
// from map pin" so onboarding can confirm it. An API address, when it arrives,
// wins; a staff correction wins over both.
//
//   node scripts/inventory-addresses.mjs malaysia   (also run by inventory-pull.mjs)
//
// No key needed. Nominatim's usage policy: at most 1 request a second, an
// application User-Agent, results cached. Answers are cached per point in
// .inventory/addresses-<country>.json, so the first Malaysia run is ~40 minutes
// and a daily pull only asks for new or moved points. Failures are retried
// after 30 days.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.cwd()
const OUT = process.env.INVENTORY_SNAPSHOT_DIR || path.join(ROOT, '.inventory')
const RETRY_DAYS = 30
const AGENT = 'inventory-address-fill/1.0'

// Same rule as weakAddress in src/lib/inventory/normalize.ts: keep the two in sync.
const STREET = /\b(jalan|jln|lebuh(raya)?|lorong|persiaran|road|rd|street|st|avenue|highway|hwy|expressway|expy|link|elite|ah\d+|usj\s?\d+|lingkaran|km\s?\d|km\d|ft\s?\d|e\d+|mrr\s?\d|ldp|kesas|sprint|npe|duke|dash|smart|precinct|presint|ss\s?\d+|seksyen|section|taman|bandar|kampung|kg|plaza|mall|tower|menara|building|wisma|station|stesen|sentral|lrt|mrt|airport|near|@|no\.?\s?\d)/i
export const weakAddress = a => { const t = (a ?? '').trim(); return !t || (t.length < 40 && !STREET.test(t)) }

const pointOf = r => {
  const m = String(r.geoms?.[0] ?? '').match(/POINT\s*\(\s*(-?[\d.]+)\s+(-?[\d.]+)/i)
  return m ? { lat: Number(m[2]), lng: Number(m[1]) } : null
}

const LANDMARK = /(mall|plaza|centre|center|city|square|sentral|station|stesen|terminal|airport|hospital|university|universiti|tower|menara|wisma|complex|kompleks|market|pasar|stadium|park)/i

/** Nominatim's parts as one address line: street, neighbourhood, postcode town, state. */
function lineOf(a) {
  if (!a) return null
  const street = [a.house_number, a.road ?? a.pedestrian ?? a.highway].filter(Boolean).join(' ')
  // A named landmark only (a mall, station, hospital…): "KFC, Jalan…" would read as if the screen were in the shop.
  const near = [a.building, a.amenity, a.shop, a.tourism, a.railway, a.aeroway].find(n => n && LANDMARK.test(n)) ?? null
  const hood = a.suburb ?? a.neighbourhood ?? a.quarter ?? a.residential ?? a.city_district ?? null
  const town = a.city ?? a.town ?? a.village ?? a.municipality ?? a.county ?? null
  const parts = [near, street, hood, [a.postcode, town].filter(Boolean).join(' '), a.state]
    .map(p => (p ?? '').trim()).filter(Boolean)
    .filter((p, i, all) => all.findIndex(q => q.toLowerCase() === p.toLowerCase()) === i)
  return parts.length >= 2 ? parts.join(', ') : null
}

const wait = ms => new Promise(res => setTimeout(res, ms))

/** Look up and attach map addresses for the rows that need one. Returns how many have one. */
export async function fillAddresses(slug, rows) {
  const file = path.join(OUT, `addresses-${slug}.json`)
  const cache = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {}
  const keyOf = r => { const p = pointOf(r); return p ? `${p.lat.toFixed(6)},${p.lng.toFixed(6)}` : null }
  const want = rows.filter(r => weakAddress(r.address) && keyOf(r))
  const stale = e => !e || (!e.parts && Date.now() - Date.parse(e.checkedAt ?? 0) > RETRY_DAYS * 86_400_000)
  const todo = [...new Set(want.map(keyOf))].filter(k => stale(cache[k]))
  if (todo.length) console.log(`  addresses: looking up ${todo.length} map points on OpenStreetMap (1 a second, ~${Math.ceil(todo.length / 60)} min)…`)
  let done = 0
  for (const k of todo) {
    const [lat, lng] = k.split(',')
    const t = Date.now()
    try {
      const u = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`
      const res = await fetch(u, { headers: { 'User-Agent': AGENT }, signal: AbortSignal.timeout(20_000) })
      if (res.status === 429 || res.status === 403) { console.error(`  addresses: OpenStreetMap said ${res.status}, stopping for today`); break }
      const j = await res.json()
      // The raw parts are cached, so the wording can change without asking OpenStreetMap again.
      cache[k] = { parts: j.address ?? null, checkedAt: new Date().toISOString() }
    } catch { /* network hiccup: try again next pull */ }
    if (++done % 100 === 0) { fs.writeFileSync(file, JSON.stringify(cache)); console.log(`  ${done} addresses looked up`) }
    await wait(Math.max(0, 1100 - (Date.now() - t)))
  }
  if (todo.length) fs.writeFileSync(file, JSON.stringify(cache))
  let found = 0
  for (const r of rows) {
    const e = want.includes(r) ? cache[keyOf(r)] : null
    r.mapAddress = e?.parts ? lineOf(e.parts) : null
    if (r.mapAddress) found++
  }
  return found
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const slug = (process.argv[2] ?? '').toLowerCase()
  const file = path.join(OUT, `${slug}.json`)
  if (!slug || !fs.existsSync(file)) { console.error('Usage: node scripts/inventory-addresses.mjs <country>  (pull the country first)'); process.exit(1) }
  const snap = JSON.parse(fs.readFileSync(file, 'utf8'))
  const n = await fillAddresses(slug, snap.records)
  // Re-read before writing: a pull may have replaced the snapshot meanwhile.
  const now = JSON.parse(fs.readFileSync(file, 'utf8'))
  const byId = new Map(snap.records.map(r => [r.id, r.mapAddress]))
  for (const r of now.records) r.mapAddress = byId.get(r.id) ?? r.mapAddress ?? null
  fs.writeFileSync(file, JSON.stringify(now))
  console.log(`${slug}: ${n} sites have an address from the map pin`)
}
