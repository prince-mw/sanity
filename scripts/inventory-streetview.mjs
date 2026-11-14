// Street View for sites without a photo (Rif, 14 Nov 2026: Google's official
// Street View, never screenshots). For each outdoor site with a map point and no
// photo, ask Google's Street View metadata service (free, no image is
// downloaded) for the nearest outdoor panorama within 50 m, and attach its id
// and position to the record as `streetView`. The website then shows Google's
// own image/viewer for it, credited to Google; nothing is copied or stored.
//
//   node scripts/inventory-streetview.mjs malaysia   (also run by inventory-pull.mjs)
//
// Needs GOOGLE_MAPS_SERVER_KEY (environment or .env.local). Without it nothing
// happens and the website keeps "Photo coming soon". Answers are cached per point
// in .inventory/streetview-<country>.json; "no Street View here" is re-checked
// after 90 days, since Google adds coverage.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.cwd()
const OUT = process.env.INVENTORY_SNAPSHOT_DIR || path.join(ROOT, '.inventory')
const RADIUS_M = 50
const RECHECK_DAYS = 90

function key() {
  if (process.env.GOOGLE_MAPS_SERVER_KEY) return process.env.GOOGLE_MAPS_SERVER_KEY
  const f = path.join(ROOT, '.env.local')
  if (!fs.existsSync(f)) return null
  const m = fs.readFileSync(f, 'utf8').match(/^\s*GOOGLE_MAPS_SERVER_KEY\s*=\s*(.+)\s*$/m)
  return m ? m[1].replace(/^['"]|['"]$/g, '').trim() : null
}

const pointOf = r => {
  const m = String(r.geoms?.[0] ?? '').match(/POINT\s*\(\s*(-?[\d.]+)\s+(-?[\d.]+)/i)
  return m ? { lat: Number(m[2]), lng: Number(m[1]) } : null
}
const outdoor = r => ((r.venues ?? []).find(v => v.name)?.name ?? (r.venueTaxonomyName ?? '').split('>')[0] ?? '').trim().toLowerCase() === 'outdoor'
const hasPhoto = r => (r.medias ?? []).some(m => m.url) || !!r.thumbnailUrl

/** Find and attach Street View for the rows that need it. Returns how many have one. */
export async function findStreetView(slug, rows) {
  const apiKey = key()
  const file = path.join(OUT, `streetview-${slug}.json`)
  const cache = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {}
  const want = rows.filter(r => outdoor(r) && !hasPhoto(r) && pointOf(r))
  const keyOf = r => { const p = pointOf(r); return `${p.lat.toFixed(6)},${p.lng.toFixed(6)}` }
  const stale = e => !e || (e.status !== 'OK' && Date.now() - Date.parse(e.checkedAt ?? 0) > RECHECK_DAYS * 86_400_000)
  const todo = [...new Set(want.map(keyOf))].filter(k => stale(cache[k]))
  if (todo.length && !apiKey) console.log(`  Street View: ${todo.length} points to check, no GOOGLE_MAPS_SERVER_KEY yet`)
  if (todo.length && apiKey) {
    console.log(`  Street View: checking ${todo.length} points…`)
    let done = 0
    await Promise.all(Array.from({ length: 8 }, async () => {
      for (let k = todo.shift(); k; k = todo.shift()) {
        try {
          const u = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${k}&radius=${RADIUS_M}&source=outdoor&key=${encodeURIComponent(apiKey)}`
          const j = await (await fetch(u, { signal: AbortSignal.timeout(20_000) })).json()
          if (j.status === 'REQUEST_DENIED' || j.status === 'OVER_QUERY_LIMIT') { console.error(`  Street View: ${j.status} ${j.error_message ?? ''}`); todo.length = 0; break }
          cache[k] = j.status === 'OK'
            ? { status: 'OK', panoId: j.pano_id, lat: j.location?.lat, lng: j.location?.lng, date: j.date ?? null, checkedAt: new Date().toISOString() }
            : { status: j.status, checkedAt: new Date().toISOString() }
        } catch { /* network hiccup: try again next pull */ }
        if (++done % 500 === 0) fs.writeFileSync(file, JSON.stringify(cache))
      }
    }))
    fs.writeFileSync(file, JSON.stringify(cache))
  }
  let found = 0
  for (const r of rows) {
    const e = want.includes(r) ? cache[keyOf(r)] : null
    r.streetView = e?.status === 'OK' && e.panoId ? { panoId: e.panoId, lat: e.lat, lng: e.lng, date: e.date } : null
    if (r.streetView) found++
  }
  return found
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const slug = (process.argv[2] ?? '').toLowerCase()
  const file = path.join(OUT, `${slug}.json`)
  if (!slug || !fs.existsSync(file)) { console.error('Usage: node scripts/inventory-streetview.mjs <country>  (pull the country first)'); process.exit(1) }
  const snap = JSON.parse(fs.readFileSync(file, 'utf8'))
  const n = await findStreetView(slug, snap.records)
  fs.writeFileSync(file, JSON.stringify(snap))
  console.log(`${slug}: ${n} sites have Street View`)
}
