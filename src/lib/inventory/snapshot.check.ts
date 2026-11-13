// What the pages would show from the pulled snapshot. Run after a pull:
//   npx -y tsx src/lib/inventory/snapshot.check.ts malaysia
import fs from 'node:fs'
import { CITY_GUIDE_DRAFTS } from '../../data/city-guide-drafts'
import { isPublishable, isTestRecord, toPublicSite, assignAreas, areaPages, siteHasPage, uniqueSlugs } from './normalize'
import type { PublicSite, InventoryRecord } from './types'

const country = process.argv[2] ?? 'malaysia'
const snap = JSON.parse(fs.readFileSync(`.inventory/${country}.json`, 'utf8')) as { staging: boolean; pulledAt: string; records: InventoryRecord[] }
const rows = snap.records
const shown = rows.filter(isPublishable)
const sites = shown.map(r => toPublicSite(r, { city: 2, area: 3 })).filter(Boolean) as PublicSite[]
const anchorsFor = (city: string) => (CITY_GUIDE_DRAFTS[`${country}/${city}`]?.audiences?.cities ?? []).map(c => ({ name: c.name, lat: c.lat as number, lng: c.lng as number })).filter(c => typeof c.lat === 'number')
const byCity = new Map<string, PublicSite[]>()
for (const s of sites) byCity.set(s.citySlug, [...(byCity.get(s.citySlug) ?? []), s])
const placed = uniqueSlugs([...byCity.entries()].flatMap(([c, l]) => assignAreas(l, anchorsFor(c))))

console.log(`${country}: pulled ${snap.pulledAt} (${snap.staging ? 'STAGING test data' : 'live'})`)
console.log(`records ${rows.length} · test placeholders ${rows.filter(isTestRecord).length} · shown ${sites.length} · with a photo (own page) ${placed.filter(siteHasPage).length}`)
console.log(`cities ${byCity.size}; top: ${[...byCity.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 8).map(([c, l]) => `${c} ${l.length}`).join(', ')}`)
const slugs = new Map<string, number>(); for (const s of placed) slugs.set(`${s.citySlug}/${s.areaSlug}/${s.slug}`, (slugs.get(`${s.citySlug}/${s.areaSlug}/${s.slug}`) ?? 0) + 1)
console.log(`duplicate site URLs: ${[...slugs.values()].filter(n => n > 1).length}`)
const kl = placed.filter(s => s.citySlug === 'kuala-lumpur')
const areas = areaPages(kl, anchorsFor('kuala-lumpur').map(a => a.name))
console.log(`KL areas with a page: ${areas.map(a => `${a.name} ${a.sites.length}${a.kind === 'supply' ? ' (supply)' : ''}`).join(', ')}`)
console.log(`no photo: ${placed.filter(s => !s.photos.length).length}; no map point: ${placed.filter(s => s.lat == null).length}; with size: ${placed.filter(s => s.size).length}; with resolution: ${placed.filter(s => s.specs?.resolution).length}`)
const leak = JSON.stringify(placed.slice(0, 500))
console.log(`owner/price leak check: ${/mediaOwner|"prices"|"cps"|"cpm"/.test(leak) ? 'LEAK' : 'clean'}`)
