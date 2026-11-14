// Which place pages a country's inventory makes, and what sits inside each.
//   npx -y tsx src/lib/inventory/places.check.ts malaysia          (snapshot)
//   npx -y tsx src/lib/inventory/places.check.ts malaysia sample   (built-in sample)
import fs from 'node:fs'
import { SAMPLE_RECORDS, SAMPLE_LEVELS } from '../../data/inventory-sample'
import { CITY_GUIDE_DRAFTS } from '../../data/city-guide-drafts'
import { COUNTRY_GUIDE_DRAFTS } from '../../data/country-guide-drafts'
import { PLACE_PLANS } from '../../data/place-names'
import { isPublishable, trustedLevels, toPublicSite, placeOf, buildPlaceRules, assignAreas, uniqueSlugs, distanceKm } from './normalize'
import type { InventoryRecord, PublicSite } from './types'

const country = process.argv[2] ?? 'malaysia', sample = process.argv[3] === 'sample'
const rows: InventoryRecord[] = sample ? SAMPLE_RECORDS : JSON.parse(fs.readFileSync(`.inventory/${country}.json`, 'utf8')).records
const levels = SAMPLE_LEVELS[country] ?? { city: 2, area: 3 }
const pub = rows.filter(isPublishable)
const trusted = pub.map(raw => trustedLevels(raw, PLACE_PLANS[country]?.address ?? null))
const kept = trusted.map(t => t.record).flatMap(r => { const s = toPublicSite(r, levels); return s ? [{ r, s }] : [] })
const src = trusted.reduce((m, t) => ({ ...m, [t.source]: (m[t.source] ?? 0) + 1 }), {} as Record<string, number>)
const movedState = trusted.filter((t, i) => t.record.adminLevel1Name !== pub[i].adminLevel1Name).length
console.log(`placed by: ${JSON.stringify(src)} · state changed from the stored one: ${movedState}`)
const rules = buildPlaceRules(PLACE_PLANS[country], COUNTRY_GUIDE_DRAFTS[country]?.audiences?.cities ?? [], kept)
const placed = kept.map(({ r, s }) => ({ r, s: placeOf(r, s, rules) }))
const byCity = new Map<string, PublicSite[]>()
for (const { s } of placed) byCity.set(s.citySlug, [...(byCity.get(s.citySlug) ?? []), s])
const anchors = (c: string) => (CITY_GUIDE_DRAFTS[`${country}/${c}`]?.audiences?.cities ?? []).flatMap(a => typeof a.lat === 'number' ? [{ name: a.name, lat: a.lat, lng: a.lng as number }] : [])
const sites = uniqueSlugs([...byCity.entries()].flatMap(([c, l]) => assignAreas(l, anchors(c))))

let bad = 0
const check = (ok: boolean, m: string) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${m}`); if (!ok) bad++ }
console.log(`big cities: ${rules.bigCities.map(c => `${c.name} (in ${c.state ?? '?'})`).join(', ')}\n`)
const cities = new Map<string, PublicSite[]>()
for (const s of sites) cities.set(s.cityName, [...(cities.get(s.cityName) ?? []), s])
for (const [name, list] of [...cities.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const areas = new Map<string, number>(); for (const s of list) areas.set(s.areaName, (areas.get(s.areaName) ?? 0) + 1)
  console.log(`${name.padEnd(16)} ${String(list.length).padStart(5)}  ${[...areas.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7).map(([a, n]) => `${a} ${n}`).join(', ')}${areas.size > 7 ? ` … (${areas.size} areas)` : ''}`)
}
console.log('')
check(sites.length === kept.length, `every shown site is in exactly one place (${sites.length} of ${kept.length})`)
check(new Set(sites.map(s => s.id)).size === sites.length, 'no site appears twice')
const stateNames = new Set(placed.map(({ r }) => (r as unknown as Record<string, string>)[`adminLevel${rules.stateLevel}Name`]).filter(Boolean).map(n => rules.names[n] ?? n))
const allowed = new Set([...stateNames, ...rules.bigCities.map(c => c.name)])
check([...cities.keys()].every(c => allowed.has(c)), `every place is a state or a big city (${[...cities.keys()].filter(c => !allowed.has(c)).join(', ') || 'none other'})`)
for (const c of rules.bigCities) {
  const list = cities.get(c.name) ?? []
  const whole = [...stateNames].some(n => n.toLowerCase() === c.name.toLowerCase())
  if (!whole) check(list.every(s => s.lat != null && distanceKm({ lat: s.lat, lng: s.lng! }, c) <= rules.radiusKm), `${c.name}: every site within ${rules.radiusKm} km of the city (${list.length})`)
  check(placed.filter(({ s }) => s.citySlug === sites.find(x => x.cityName === c.name)?.citySlug).every(({ r }) => (rules.names[(r as unknown as Record<string, string>)[`adminLevel${rules.stateLevel}Name`]] ?? (r as unknown as Record<string, string>)[`adminLevel${rules.stateLevel}Name`]) === c.state), `${c.name}: only sites from ${c.state}`)
}
check(![...cities.keys()].some(c => /^(timur laut|petaling|kinta|johor baharu|melaka tengah)$/i.test(c)), 'no district is a place of its own')
check(sites.every(s => s.areaName && s.areaSlug), 'every site has an area')
console.log(bad ? `\n${bad} FAILED` : '\nall passed')
process.exit(bad ? 1 : 0)
