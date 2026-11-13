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
 * Placeholder records the inventory team creates while testing ("TEST - …",
 * "DisplayInventory1016b34"). Sandeep, 13 Nov 2026: staging is all test data;
 * these names are the ones that would look broken on a page.
 */
export const isTestRecord = (r: InventoryRecord) => /^\s*(test\b|displayinventory[0-9a-f]+\s*$)/i.test(r.name ?? '')

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
  if (p) return `${metres(p.physicalWidth!)} × ${metres(p.physicalHeight!)}`
  return r.size && /\d/.test(r.size) ? r.size.trim() : null
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
    venueType: r.venueTaxonomyName ?? r.venues?.filter(v => v.name).at(-1)?.name ?? null,
    countryName, countrySlug: slugify(countryName),
    cityName, citySlug: slugify(cityName),
    areaName, areaSlug: slugify(areaName),
    address: r.address?.trim() || null,
    lat: point?.lat ?? null, lng: point?.lng ?? null,
    photos,
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

/** A site earns its own page only with a photo; without one it is listed, not paged. */
export const siteHasPage = (s: PublicSite) => s.photos.length > 0

export const formatCount = (n: number) => n.toLocaleString('en-US')
