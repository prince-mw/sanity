// Inventory pages: turning API records into what a page may show, and the
// rules for which places get a page of their own. Pure — no fetching.

import type { InventoryRecord, LevelMap, PublicSite, PriceQuote } from './types'

export const slugify = (s: string) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/** "POINT(101.71 3.14)" → { lat: 3.14, lng: 101.71 } */
export function parsePoint(wkt: string | null | undefined): { lat: number; lng: number } | null {
  const m = String(wkt ?? '').match(/POINT\s*\(\s*(-?[\d.]+)\s+(-?[\d.]+)\s*\)/i)
  if (!m) return null
  const lng = Number(m[1]), lat = Number(m[2])
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null
}

const level = (r: InventoryRecord, n: number) =>
  (r as unknown as Record<string, string | null | undefined>)[`adminLevel${n}Name`]?.trim() || null

/**
 * Placeholder records the inventory team creates while testing. Sandeep, 13 Nov
 * 2026: staging is all test data. Patterns from the hygiene scan of 14 Nov
 * (mw-inventory-hygiene/REPORT.md): "TEST - …", "DisplayInventory1016b34",
 * "Import Classic…/Import Digital 2026-09-30…", "QA THIS IS MY DATA 23",
 * "FLEET CLASSIC CHECK", "Classic Check 7508", "test123", "… qa …", "digital invnetory", "single board", and names ending in a random hex code ("Kelantan Rive1d562").
 * Keep this pattern the same as the scan's (skills/inventory-hygiene/scripts/scan.py).
 */
export const TEST_NAME = /^\s*(test(\b|\d)|displayinventory[0-9a-f]+\s*$|import (classic|digital)\b|qa\b|sample\b|dummy\b|.*\bcheck\b\s*\d*\s*$|.*\b(qa|invnetory)\b|single board\b|tes[a-z]\s*-|trasntic\b|.*\buat\d*\b|.*[a-z](?=[0-9a-f]*\d)[0-9a-f]{5,6}\s*$)/i
export const isTestRecord = (r: InventoryRecord) => TEST_NAME.test(r.name ?? '')

/**
 * Only active, public, unarchived sites ever reach the website (Sandeep, 13 Nov
 * 2026: status active + publication public are safe to show). "specific" means
 * shown to chosen agencies only, so it stays off the public site.
 */
export const isPublishable = (r: InventoryRecord) =>
  (r.status ?? '').toLowerCase() === 'active' && (r.publication ?? '').toLowerCase() === 'public' &&
  r.archived !== true && !isTestRecord(r)

/** Images only: the API marks photos "asset" or "thumbnail" (older data "image"); videos are left out. */
const isImage = (m: { mediaType?: string | null; url?: string | null }) =>
  !!m.url && !/^video/i.test(m.mediaType ?? '') && !/\.(mp4|mov|webm|m4v)(\?|$)/i.test(m.url)

const metres = (n: number) => `${Number(n.toFixed(2))}m`

/**
 * "4.5m × 9m": the first panel's measurements, else the record's own size when
 * it is a measurement. The API's `size` is a class code ("xs", "l",
 * "medium-cinema"), which would read as nonsense on a page.
 */
function sizeOf(r: InventoryRecord): string | null {
  const p = r.panels?.find(x => x.physicalWidth && x.physicalHeight)
  if (p) return plausibleSize(r, p.physicalWidth!, p.physicalHeight!) ? `${metres(p.physicalWidth!)} × ${metres(p.physicalHeight!)}` : null
  return r.size && /\d/.test(r.size) ? r.size.trim() : null
}

/**
 * A size worth showing (hygiene scan, 14 Nov 2026: 855 implausible sizes in
 * Malaysia, e.g. 40 m × 60 m office screens, and 79 with pixel counts typed
 * into metres, 1920 m × 1080 m). Not plausible → no size shown, never a wrong one.
 * Indoor = a venue that isn't under "Outdoor". Same limits as the hygiene scan.
 */
export function plausibleSize(r: InventoryRecord, w: number, h: number): boolean {
  const px = r.panels?.find(x => x.pixelWidth && x.pixelHeight)
  if (Math.max(w, h) >= 300 || (px && Math.round(w) === px.pixelWidth && Math.round(h) === px.pixelHeight)) return false
  const top = (r.venues?.find(v => v.name)?.name ?? r.venueTaxonomyName?.split('>')[0] ?? '').trim().toLowerCase()
  const indoor = !!top && top !== 'outdoor'
  return !((indoor && Math.max(w, h) > 10) || Math.max(w, h) > 100 || Math.min(w, h) < 0.1)
}

/** Screen specs from the API's panels, over anything the record already carries. */
function specsOf(r: InventoryRecord): InventoryRecord['specs'] {
  const panels = r.panels ?? []
  const px = panels.find(p => p.pixelWidth && p.pixelHeight)
  if (!px && !panels.length) return r.specs ?? null
  const screens = panels.reduce((n, p) => n + (p.screenCount ?? 1), 0)
  return {
    ...(r.specs ?? {}),
    resolution: px ? `${px.pixelWidth} px × ${px.pixelHeight} px` : r.specs?.resolution ?? null,
    panels: panels.length || null,
    screens: screens || null,
    contentApproval: r.requiresContentApproval ?? r.specs?.contentApproval ?? null,
  }
}

/**
 * The public face of a site. The media owner and prices are left behind here
 * on purpose (owner, 26 Oct 2026: owner names never shown; prices only behind
 * the newsletter sign-up), so they can't leak into a page.
 */
// Same rule as weakAddress in scripts/inventory-addresses.mjs: keep the two in sync.
const STREET = /\b(jalan|jln|lebuh(raya)?|lorong|persiaran|road|rd|street|st|avenue|highway|hwy|expressway|expy|link|elite|ah\d+|usj\s?\d+|lingkaran|km\s?\d|km\d|ft\s?\d|e\d+|mrr\s?\d|ldp|kesas|sprint|npe|duke|dash|smart|precinct|presint|ss\s?\d+|seksyen|section|taman|bandar|kampung|kg|plaza|mall|tower|menara|building|wisma|station|stesen|sentral|lrt|mrt|airport|near|@|no\.?\s?\d)/i
/** An address with no street in it: empty, "transit", "Malaysia", or only a postcode and town. */
export const weakAddress = (a: string | null | undefined) => { const t = (a ?? '').trim(); return !t || (t.length < 40 && !STREET.test(t)) }
/** A single word that is no address at all ("transit", "Malaysia", "test"). */
const junkAddress = (a: string) => !/[\s,\d]/.test(a.trim())

/**
 * The address a page shows (Rif, 14 Nov 2026: the full address has to be there).
 * The API's when it names a street; else OpenStreetMap's for a trusted map point;
 * else whatever the API has, unless it is a single word.
 */
export function addressOf(r: InventoryRecord, trustedPoint: boolean): { text: string | null; fromMap: boolean } {
  const api = r.address?.trim() || null
  if (api && !weakAddress(api)) return { text: api, fromMap: false }
  if (trustedPoint && r.mapAddress?.trim()) return { text: r.mapAddress.trim(), fromMap: true }
  return { text: api && !junkAddress(api) ? api : null, fromMap: false }
}

export function toPublicSite(r: InventoryRecord, levels: LevelMap): PublicSite | null {
  // The address decides the place (Rif, 11 Nov 2026: never drop inventory over naming).
  // City: the configured level, else the nearest filled level above it. Area: the
  // configured level, else the next one down, else the city itself.
  const countryName = level(r, 0)
  const up = [levels.city, levels.city - 1, levels.city - 2, levels.city - 3].filter(n => n >= 1)
  const down = [levels.area, levels.area + 1, levels.area + 2].filter(n => n <= 4 && n > levels.city)
  const cityName = up.map(n => level(r, n)).find(Boolean) ?? null
  const areaName = down.map(n => level(r, n)).find(Boolean) ?? cityName
  if (!countryName || !cityName || !areaName || !r.name?.trim()) return null
  const point = parsePoint(r.geoms?.[0])
  // The thumbnail's full-size original first (it is the photo the media owner
  // chose), then the rest; the small `tn_` copy only when nothing else exists.
  const media = (r.medias ?? []).filter(isImage)
  const photos = [
    ...(r.thumbnailUrlOriginal ? [r.thumbnailUrlOriginal] : []),
    ...media.filter(m => (m.mediaType ?? '').toLowerCase() === 'thumbnail').map(m => m.url as string),
    ...media.map(m => m.url as string),
    ...(r.thumbnailUrl && !r.thumbnailUrlOriginal && !media.length ? [r.thumbnailUrl] : []),
  ].filter((u, i, a) => a.indexOf(u) === i)
  const d = r.digitalFields
  const where = addressOf(r, !!point)
  return {
    id: r.id,
    // Name for search, plus a short stable code so two sites with the same name never collide.
    slug: `${slugify(r.name)}-${(slugify(r.referenceId || r.id).split('-').pop() ?? '').slice(-6)}`,
    name: r.name.trim(),
    description: r.description?.trim() || null,
    format: r.typeName ?? null,
    displayFormat: r.displayFormatName ?? null,
    size: sizeOf(r),
    illuminated: r.classicFields?.illuminated ?? null,
    digital: d && (d.spotDuration || d.spotsPerLoop || d.loopDuration)
      ? { spotSeconds: d.spotDuration ?? null, spotsPerLoop: d.spotsPerLoop ?? null, loopSeconds: d.loopDuration ?? null } : null,
    // The API sends the venue as a path ("Outdoor > Billboards > Highway"); pages show its last part.
    venueType: (r.venueTaxonomyName ?? r.venues?.filter(v => v.name).at(-1)?.name ?? null)?.split('>').pop()?.trim() || null,
    countryName, countrySlug: slugify(countryName),
    cityName, citySlug: slugify(cityName),
    areaName, areaSlug: slugify(areaName),
    address: where.text,
    addressFromMap: where.fromMap,
    lat: point?.lat ?? null, lng: point?.lng ?? null,
    photos,
    // Street View only when there's no photo and the pin is trusted (no-pin sites have no point).
    streetView: !photos.length && point && r.streetView?.panoId ? { panoId: r.streetView.panoId, heading: r.streetView.lat != null && r.streetView.lng != null ? bearing({ lat: r.streetView.lat, lng: r.streetView.lng }, point) : 0, date: r.streetView.date ?? null } : null,
    audience: r.audience ?? null,
    specs: specsOf(r) ?? null,
    sample: !!r.sample,
  }
}

export function toPriceQuote(r: InventoryRecord): PriceQuote | null {
  const p = (r.prices ?? []).find(x => x.daily != null || x.monthly != null)
  if (!p) return null
  return { siteId: r.id, currency: p.currency ?? '', daily: p.daily ?? null, monthly: p.monthly ?? null }
}

/** A country's address vocabulary: state names as addresses write them, and postcode prefix → state. */
export type AddressRules = { states: Record<string, string[]>; postcodes: [number, number, string][] }

/** The state an address names (its last state name, a non-capital one first), else its 5-digit postcode's state. */
export function addressState(address: string | null | undefined, rules: AddressRules): string | null {
  const a = (address ?? '').toLowerCase()
  if (!a) return null
  const named = Object.entries(rules.states).filter(([, names]) => names.some(n => new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(a))).map(([st]) => st)
  if (named.length) return named.filter(s => s !== 'Kuala Lumpur').at(-1) ?? named.at(-1)!
  const pc = a.match(/\b(\d{5})\b/)
  if (!pc) return null
  const n = Number(pc[1].slice(0, 2))
  return rules.postcodes.find(([lo, hi]) => n >= lo && n <= hi)?.[2] ?? null
}

export type PlaceSource = 'point' | 'stored' | 'no-point'

/**
 * Which address levels to trust for a site (Rif, 14 Nov 2026: 1,121 of 7,231
 * Malaysia sites carry a stored state their own map point and address
 * contradict; see mw-inventory-hygiene/REPORT.md). The map point, resolved by
 * the API itself at pull time, wins, as in the industry (Place Exchange
 * corrects city/country from lat/lng). One exception: when the address
 * confirms the stored state and contradicts the point, the pin is the thing
 * that's wrong, so the stored levels stay. No resolved point: stored levels.
 * Never drops a site.
 */
export function trustedLevels(r: InventoryRecord, address?: AddressRules | null): { record: InventoryRecord; source: PlaceSource } {
  const p = r.resolved
  if (!p?.adminLevel1Name) return { record: r, source: 'no-point' }
  // A point in another country (or the sea) is a broken pin: keep the stored place.
  if (p.adminLevel0Name && r.adminLevel0Name && p.adminLevel0Name.trim() !== r.adminLevel0Name.trim()) return { record: r, source: 'stored' }
  const stored = r.adminLevel1Name?.trim() || null
  if (address && stored && stored !== p.adminLevel1Name) {
    const said = addressState(r.address, address)
    if (said === stored) return { record: r, source: 'stored' }
  }
  return {
    record: { ...r, adminLevel0Name: p.adminLevel0Name ?? r.adminLevel0Name, adminLevel1Name: p.adminLevel1Name, adminLevel2Name: p.adminLevel2Name ?? null, adminLevel3Name: p.adminLevel3Name ?? null, adminLevel4Name: null },
    source: 'point',
  }
}

/** An outdoor site: its venue sits under "Outdoor". */
export const isOutdoorRecord = (r: InventoryRecord) =>
  (r.venues?.find(v => v.name)?.name ?? r.venueTaxonomyName?.split('>')[0] ?? '').trim().toLowerCase() === 'outdoor'

/**
 * Map points that look like defaults: the same exact point on 3 or more real
 * sites. Fine for screens inside one mall; for an outdoor site it means the pin
 * was never set (Malaysia, 14 Nov: one point carried 102 "Classic Check" records).
 */
export function defaultPins(records: InventoryRecord[]): Set<string> {
  const n = new Map<string, number>()
  for (const r of records) { const g = r.geoms?.[0]; if (g && !isTestRecord(r)) n.set(g, (n.get(g) ?? 0) + 1) }
  return new Set([...n.entries()].filter(([, c]) => c >= 3).map(([g]) => g))
}

export type Display = 'show' | 'no-pin' | 'hold'
export const HOLD_REASONS = {
  'no-tiebreak': 'Stored state and map point disagree, and there is no address to decide',
  'single-signal': 'Only the stored state: the pin is a shared default and there is no address',
  'three-way': 'Stored state, map point and address all disagree',
  'indoor-no-photo': 'Indoor site with no photo (Street View can only stand in outdoors)',
} as const

/**
 * Indoor sites need a real photo to show (Rif, 14 Nov 2026): Street View can
 * stand in for an outdoor face, never for a screen inside a mall or station.
 * They wait on the staff dashboard for onboarding to add one.
 */
export const needsPhoto = (r: InventoryRecord) =>
  !isOutdoorRecord(r) && !(r.medias ?? []).some(m => m.url) && !r.thumbnailUrl
export type HoldReason = keyof typeof HOLD_REASONS

/**
 * The display bar (Rif, 14 Nov 2026): a site shows only when at least two of
 * its three location signals agree: the stored state, the map point (resolved
 * by the API at pull time) and the address (state name or postcode).
 *   - point agrees with stored or address → show, placed by the point
 *   - stored and address agree, point wrong or a shared default pin
 *     (`defaultPin`: an outdoor site on a point 3+ sites share) → show without
 *     a pin: listed under its stored place, no map pin, no site page
 *   - otherwise → hold, off the website, for onboarding to fix
 * Malaysia, 14 Nov: 6,761 of 7,047 real sites show (146 without a pin), 286 held.
 * A place staff corrected skips this (see source.ts).
 */
export function placementOf(r: InventoryRecord, address: AddressRules | null, defaultPin: boolean): { record: InventoryRecord; display: Display; reason: HoldReason | null; source: PlaceSource } {
  const S = r.adminLevel1Name?.trim() || null
  const res = r.resolved
  const inCountry = !res?.adminLevel0Name || !r.adminLevel0Name || res.adminLevel0Name.trim() === r.adminLevel0Name.trim()
  const P = !defaultPin && inCountry && r.geoms?.length ? res?.adminLevel1Name ?? null : null
  const A = address ? addressState(r.address, address) : null
  const byPoint = (): InventoryRecord => ({ ...r, adminLevel0Name: res?.adminLevel0Name ?? r.adminLevel0Name, adminLevel1Name: P, adminLevel2Name: res?.adminLevel2Name ?? null, adminLevel3Name: res?.adminLevel3Name ?? null, adminLevel4Name: null })
  if (P && (P === S || P === A)) return { record: byPoint(), display: 'show', reason: null, source: 'point' }
  if (S && A && S === A) return { record: { ...r, geoms: [] }, display: 'no-pin', reason: null, source: 'stored' }
  // No address table for this country: nothing to break a tie, so keep the old rule (point, else stored).
  if (!address) return P ? { record: byPoint(), display: 'show', reason: null, source: 'point' } : { record: r, display: S ? 'show' : 'hold', reason: S ? null : 'single-signal', source: P ? 'point' : 'stored' }
  const reason: HoldReason = P && !A ? 'no-tiebreak' : !P && !A ? 'single-signal' : 'three-way'
  return { record: r, display: 'hold', reason, source: P ? 'point' : 'stored' }
}

/** Compass bearing in degrees from `a` to `b` (0 = north), to point the Street View camera at the site. */
export function bearing(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const r = Math.PI / 180, dl = (b.lng - a.lng) * r
  const y = Math.sin(dl) * Math.cos(b.lat * r), x = Math.cos(a.lat * r) * Math.sin(b.lat * r) - Math.sin(a.lat * r) * Math.cos(b.lat * r) * Math.cos(dl)
  return Math.round(((Math.atan2(y, x) / r) + 360) % 360)
}

/** A big city from the country guide: its own page instead of (part of) its state. */
export type BigCity = { name: string; lat: number; lng: number; state: string | null }

export type PlaceRules = {
  stateLevel: 1 | 2
  names: Record<string, string>
  bigCities: BigCity[]
  radiusKm: number
}

/**
 * The English name the website uses for an address name. A numbered mukim
 * ("Mukim 12 (Bayan Lepas)") is shown by the place name in its brackets.
 */
export const placeName = (name: string, names: Record<string, string>) =>
  names[name] ?? name.match(/^Mukim\s+\d+\s*\((.+)\)\s*$/i)?.[1]?.trim() ?? name

/**
 * Which place page a site belongs to, under a country's place rules
 * (src/data/place-names.ts): a big city that shares its state's name takes the
 * whole state; another big city takes the sites near its point in its own
 * state; everything else stays with its state. Inside a city the area is the
 * neighbourhood level (mukim), inside a state the district.
 */
export function placeOf(r: InventoryRecord, s: PublicSite, rules: PlaceRules): PublicSite {
  const raw = level(r, rules.stateLevel)
  if (!raw) return s
  const state = placeName(raw, rules.names), stateSlug = slugify(state)
  let city = rules.bigCities.find(c => slugify(c.name) === stateSlug) ?? null
  if (!city && s.lat != null && s.lng != null) {
    let best = rules.radiusKm
    for (const c of rules.bigCities) {
      if (c.state !== state) continue
      const km = distanceKm({ lat: s.lat, lng: s.lng }, c)
      if (km <= best) { city = c; best = km }
    }
  }
  const place = city?.name ?? state, placeSlug = slugify(place)
  // A state's area is never named after one of the big cities (Johor's sites just outside
  // Johor Bahru are named by their own mukim, not "Johor Bahru" again).
  const bigSlugs = rules.bigCities.map(c => slugify(c.name))
  const order = city ? [rules.stateLevel + 2, rules.stateLevel + 3, rules.stateLevel + 1] : [rules.stateLevel + 1, rules.stateLevel + 2, rules.stateLevel + 3]
  const areaRaw = order.filter(n => n <= 4).map(n => level(r, n))
    .find((n): n is string => !!n && !/^mukim\s+\d+\s*$/i.test(n.trim()) && ![placeSlug, stateSlug, ...bigSlugs].includes(slugify(placeName(n, rules.names)))) ?? place
  const area = placeName(areaRaw, rules.names)
  return { ...s, cityName: place, citySlug: placeSlug, areaName: area, areaSlug: slugify(area) }
}

/**
 * A country's place rules (src/data/place-names.ts) with its big cities from
 * the approved country guide. Each big city's state is the one most sites
 * within 5 km of its point are in, so a city only ever takes sites from its
 * own state.
 */
export function buildPlaceRules(
  plan: { stateLevel: 1 | 2; names: Record<string, string>; bigCityRadiusKm: number },
  guideCities: { name: string; lat?: number | null; lng?: number | null }[],
  kept: { r: InventoryRecord; s: PublicSite }[],
): PlaceRules {
  const stateOf = (r: InventoryRecord) => { const raw = level(r, plan.stateLevel); return raw ? placeName(raw, plan.names) : null }
  const bigCities = guideCities
    .filter((c): c is { name: string; lat: number; lng: number } => !!c.name && typeof c.lat === 'number' && typeof c.lng === 'number')
    .map(c => {
      const near = new Map<string, number>()
      for (const { r, s } of kept) {
        if (s.lat == null || s.lng == null || distanceKm({ lat: s.lat, lng: s.lng }, c) > 5) continue
        const st = stateOf(r)
        if (st) near.set(st, (near.get(st) ?? 0) + 1)
      }
      const state = [...near.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
      return { name: c.name, lat: c.lat, lng: c.lng, state }
    })
  return { stateLevel: plan.stateLevel, names: plan.names, bigCities, radiusKm: plan.bigCityRadiusKm }
}

/** A named place with a map point: the area cards a city guide already carries. */
export type AreaAnchor = { name: string; lat: number; lng: number }

/** How far from an area's point a site still counts as in it. */
export const AREA_RADIUS_KM = 1.2

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180, dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(h))
}

/**
 * Areas by coordinates (Sandeep, 13 Nov 2026: the API's levels stop at the
 * mukim, so neighbourhoods like KLCC or Bukit Bintang come from the map). A
 * site within AREA_RADIUS_KM of a named area joins the nearest one; every
 * other site keeps the area its address gives. No site is ever dropped.
 */
export function assignAreas(sites: PublicSite[], anchors: AreaAnchor[], radiusKm = AREA_RADIUS_KM): PublicSite[] {
  if (!anchors.length) return sites
  return sites.map(s => {
    if (s.lat == null || s.lng == null) return s
    let best: AreaAnchor | null = null, bestKm = radiusKm
    for (const a of anchors) {
      const km = distanceKm({ lat: s.lat, lng: s.lng }, a)
      if (km <= bestKm) { best = a; bestKm = km }
    }
    return best ? { ...s, areaName: best.name, areaSlug: slugify(best.name) } : s
  })
}

/**
 * Two sites can still share a URL (same name, same reference ending, same
 * area). The one with the lower id keeps the plain slug; the other gets its
 * own id ending, so both stay reachable and neither URL moves between runs.
 */
export function uniqueSlugs(sites: PublicSite[]): PublicSite[] {
  const seen = new Set<string>()
  return [...sites].sort((x, y) => (x.id < y.id ? -1 : x.id > y.id ? 1 : 0)).map(s => {
    const key = `${s.citySlug}/${s.areaSlug}/${s.slug}`
    if (!seen.has(key)) { seen.add(key); return s }
    const slug = `${s.slug}-${slugify(s.id).replace(/-/g, '').slice(-6)}`
    seen.add(`${s.citySlug}/${s.areaSlug}/${slug}`)
    return { ...s, slug }
  })
}

/** An area earns its own buyer page at this many sites (owner, 26 Oct 2026). */
export const AREA_MIN_SITES = 3

export type AreaPage = { kind: 'buyer' | 'supply'; name: string; slug: string; sites: PublicSite[] }

/**
 * Which areas get a page. Buyer page: 3+ sites. Supply-wanted page: a famous
 * area with fewer — it asks media owners to list their screens with us, and
 * still points buyers at what we have nearby.
 */
export function areaPages(sites: PublicSite[], famous: string[]): AreaPage[] {
  const by = new Map<string, AreaPage>()
  for (const s of sites) {
    const a = by.get(s.areaSlug) ?? { kind: 'buyer' as const, name: s.areaName, slug: s.areaSlug, sites: [] }
    a.sites.push(s)
    by.set(s.areaSlug, a)
  }
  const out: AreaPage[] = []
  for (const a of by.values()) if (a.sites.length >= AREA_MIN_SITES) out.push(a)
  for (const name of famous) {
    const slug = slugify(name)
    if (out.some(a => a.slug === slug)) continue
    out.push({ kind: 'supply', name, slug, sites: by.get(slug)?.sites ?? [] })
  }
  return out.sort((x, y) => (x.kind === y.kind ? y.sites.length - x.sites.length : x.kind === 'buyer' ? -1 : 1))
}

/**
 * What a site list sends to the browser: enough for the card, the filters,
 * search and the map pin. Specs, extra photos and the description stay on the
 * server and arrive when someone opens Details (/api/inventory/site). Empty
 * fields are left out entirely. Kuala Lumpur with API data has ~2,000 sites,
 * and every byte here is repeated that many times in the page.
 */
export function toSiteCard(s: PublicSite): PublicSite {
  const card: Partial<PublicSite> = { ...s, photos: s.photos.slice(0, 1), specs: null, description: null }
  for (const k of Object.keys(card) as (keyof PublicSite)[]) {
    const v = card[k]
    if (v == null || v === false) delete card[k]
  }
  return card as PublicSite
}

/** A site earns its own page only with a photo; without one it is listed, not paged. */
/** A site earns its own page only with a photo and a trustworthy map pin (no-pin sites are listed, not paged). */
export const siteHasPage = (s: PublicSite) => s.photos.length > 0 && s.lat != null

export const formatCount = (n: number) => n.toLocaleString('en-US')
