// Checks for the inventory rules. No test runner in this repo, so run directly:
//   npx -y tsx src/lib/inventory/normalize.check.ts
import { SAMPLE_RECORDS, SAMPLE_LEVELS, FAMOUS_AREAS } from '../../data/inventory-sample'
import { isPublishable, toPublicSite, areaPages, siteHasPage, parsePoint, AREA_MIN_SITES } from './normalize'
import type { PublicSite } from './types'

let bad = 0
const check = (ok: boolean, m: string) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${m}`); if (!ok) bad++ }

const sites = SAMPLE_RECORDS.filter(isPublishable).map(r => toPublicSite(r, SAMPLE_LEVELS.malaysia)).filter(Boolean) as PublicSite[]
const json = JSON.stringify(sites)

check(!sites.some(s => s.name === 'Private test site'), 'a private site never becomes a public site')
check(!/mediaOwner|Hidden on the website/.test(json), 'no media owner reaches a public site')
check(!/"prices"|daily|monthly|cpm|MYR/.test(json), 'no price reaches a public site')
check(new Set(sites.map(s => s.slug)).size === sites.length, 'every site slug is unique')
check(sites.every(s => /^[a-z0-9-]+$/.test(s.slug)), 'slugs are clean URL text')
check(toPublicSite(SAMPLE_RECORDS[0], SAMPLE_LEVELS.malaysia)!.slug === toPublicSite(SAMPLE_RECORDS[0], SAMPLE_LEVELS.malaysia)!.slug, 'a slug is stable between runs')

const areas = areaPages(sites, FAMOUS_AREAS['malaysia/kuala-lumpur'])
const bb = areas.find(a => a.slug === 'bukit-bintang')
check(bb?.kind === 'buyer' && bb.sites.length >= AREA_MIN_SITES, 'an area with 3+ sites gets a buyer page')
check(areas.find(a => a.slug === 'trx')?.kind === 'supply', 'a famous area under 3 sites gets a media-owners-wanted page')
check(areas.find(a => a.slug === 'bangsar')?.kind === 'supply', 'a famous area with no sites still gets a page')
check(!areas.some(a => a.slug === 'dutamas'), 'a non-famous area under 3 sites gets no page (its sites stay on the city page)')
check(!siteHasPage(sites.find(s => s.name === 'Lot 10 Junction Lightbox')!), 'a site with no photo gets no page of its own')
check(siteHasPage(sites.find(s => s.name === 'Menara Tan & Tan')!), 'a site with a photo gets a page')
check(JSON.stringify(parsePoint('POINT(101.71 3.14)')) === '{"lat":3.14,"lng":101.71}', 'map points read longitude first, as the API sends them')

// The address decides the place, and no site is dropped over a missing level (Rif, 11 Nov 2026).
const base = SAMPLE_RECORDS.find(r => isPublishable(r))!
const noArea = toPublicSite({ ...base, id: 'x-no-area', adminLevel3Name: null, adminLevel4Name: null }, { city: 2, area: 3 })
check(!!noArea && noArea.areaName === noArea.cityName, 'a site with no area is kept, listed under its city')
const noCity = toPublicSite({ ...base, id: 'x-no-city', adminLevel2Name: null }, { city: 2, area: 3 })
check(!!noCity && noCity.cityName === base.adminLevel1Name?.trim(), 'a site with no city level falls back to the level above')

console.log(bad ? `\n${bad} FAILED` : '\nall passed')
process.exit(bad ? 1 : 0)
