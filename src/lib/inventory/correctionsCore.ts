// Staff corrections to inventory records (Rif, 14 Nov 2026): Moving Walls staff
// fix a site's field on /staff/inventory, and the next API pull never
// overwrites it. Pure rules here (no storage), so the check script can run them.
//
// A correction is per FIELD, not per site: every other field keeps updating
// from the API. Each one remembers what the API said when it was made, so on
// every pull it can tell three cases apart:
//   active           the API still says what it said: our value is used
//   fixed-at-source  the API now says what we said: onboarding fixed it, the
//                    correction retires itself (not applied, kept for the record)
//   conflict         the API now says something else again: our value is still
//                    used, and the site goes to the review queue
// That way corrections never freeze stale data, and the onboarding team's own
// fixes win as soon as they land.

import type { InventoryRecord } from './types'

export const CORRECTABLE = {
  name: { label: 'Site name', hint: 'The name buyers see on the website' },
  address: { label: 'Address', hint: 'Street address with postcode' },
  state: { label: 'State', hint: 'As the API spells it, e.g. Pahang, Pulau Pinang, Kuala Lumpur' },
  district: { label: 'District', hint: 'e.g. Kuantan, Petaling, Timur Laut' },
  area: { label: 'Area (mukim)', hint: 'e.g. Kuala Kuantan, Damansara' },
  point: { label: 'Map point', hint: 'latitude, longitude, e.g. 3.798792, 103.337646' },
  size: { label: 'Size (metres)', hint: 'width x height, e.g. 12 x 6' },
  facing: { label: 'Facing', hint: 'n, ne, e, se, s, sw, w or nw' },
  hidden: { label: 'Hide from the website', hint: 'yes to hide this site (test record, demolished, duplicate)' },
} as const
export type CorrectionField = keyof typeof CORRECTABLE
export const isField = (f: string): f is CorrectionField => f in CORRECTABLE

export type Correction = {
  _id: string
  siteId: string
  country: string
  field: CorrectionField
  value: string
  /** What the API said when the correction was made. */
  apiValue: string | null
  reason: string
  by: string
  byName: string
  at: string
  /** For a corrected map point: where the API's resolver puts it (filled at save time). */
  resolved?: InventoryRecord['resolved']
}

export type CorrectionStatus = 'active' | 'fixed-at-source' | 'conflict'

const pointOf = (r: InventoryRecord) => {
  const m = String(r.geoms?.[0] ?? '').match(/POINT\s*\(\s*(-?[\d.]+)\s+(-?[\d.]+)/i)
  return m ? `${Number(m[2]).toFixed(6)}, ${Number(m[1]).toFixed(6)}` : null
}
const sizeOf = (r: InventoryRecord) => {
  const p = r.panels?.find(x => x.physicalWidth && x.physicalHeight)
  return p ? `${p.physicalWidth} x ${p.physicalHeight}` : null
}

/** What the API's record says for a field, as text. */
export function apiValueOf(r: InventoryRecord, field: CorrectionField): string | null {
  switch (field) {
    case 'name': return r.name?.trim() || null
    case 'address': return r.address?.trim() || null
    case 'state': return r.adminLevel1Name?.trim() || null
    case 'district': return r.adminLevel2Name?.trim() || null
    case 'area': return r.adminLevel3Name?.trim() || null
    case 'point': return pointOf(r)
    case 'size': return sizeOf(r)
    case 'facing': return r.panels?.[0]?.cardinalDirection?.trim().toLowerCase() || null
    case 'hidden': return 'no'
  }
}

/** Values compared loosely: case, spacing and number formatting don't count as a difference. */
export const sameValue = (a: string | null | undefined, b: string | null | undefined) => {
  const norm = (v: string | null | undefined) => (v ?? '').toLowerCase()
    .replace(/-?\d+(?:\.\d+)?/g, n => String(Number(n)))   // 3.10 = 3.1, 12.0 = 12
    .replace(/\s*([,x×])\s*/g, '$1').replace(/×/g, 'x').replace(/\s+/g, ' ').trim()
  return norm(a) === norm(b)
}

/** Clean and check a value a staff member typed. Returns the stored text, or an error to show. */
export function parseValue(field: CorrectionField, raw: string): { value: string } | { error: string } {
  const v = raw.trim()
  if (!v) return { error: 'Type the correct value.' }
  if (field === 'point') {
    const m = v.match(/^\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)\s*$/)
    if (!m) return { error: 'Use latitude, longitude, e.g. 3.798792, 103.337646.' }
    const lat = Number(m[1]), lng = Number(m[2])
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return { error: 'That point is off the map. Check the order: latitude first.' }
    return { value: `${lat.toFixed(6)}, ${lng.toFixed(6)}` }
  }
  if (field === 'size') {
    const m = v.match(/^\s*(\d+(?:\.\d+)?)\s*m?\s*[x×*]\s*(\d+(?:\.\d+)?)\s*m?\s*$/i)
    if (!m) return { error: 'Use width x height in metres, e.g. 12 x 6.' }
    const w = Number(m[1]), h = Number(m[2])
    if (w <= 0 || h <= 0 || w > 100 || h > 100) return { error: 'Sizes are in metres, between 0.1 and 100.' }
    return { value: `${w} x ${h}` }
  }
  if (field === 'facing') {
    const f = v.toLowerCase()
    if (!['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'].includes(f)) return { error: 'Use n, ne, e, se, s, sw, w or nw.' }
    return { value: f }
  }
  if (field === 'hidden') {
    if (!/^(yes|no)$/i.test(v)) return { error: 'Type yes or no.' }
    return { value: v.toLowerCase() }
  }
  return { value: v.replace(/\s+/g, ' ') }
}

export function statusOf(c: Correction, r: InventoryRecord | undefined): CorrectionStatus {
  if (!r) return 'active'
  const now = apiValueOf(r, c.field)
  if (sameValue(now, c.value)) return 'fixed-at-source'
  if (!sameValue(now, c.apiValue)) return 'conflict'
  return 'active'
}

/**
 * The record as the website should use it: every active or conflicting
 * correction applied on top of the API's record. A corrected state, district
 * or area also locks the place (trustedLevels then leaves it alone); a
 * corrected map point carries the resolver's answer saved with it.
 */
export function applyCorrections(r: InventoryRecord, list: Correction[]): InventoryRecord & { placeLocked?: boolean; hiddenByStaff?: boolean } {
  const out: InventoryRecord & { placeLocked?: boolean; hiddenByStaff?: boolean } = { ...r }
  for (const c of list) {
    if (statusOf(c, r) === 'fixed-at-source') continue
    switch (c.field) {
      case 'name': out.name = c.value; break
      case 'address': out.address = c.value; break
      case 'state': out.adminLevel1Name = c.value; out.placeLocked = true; break
      case 'district': out.adminLevel2Name = c.value; out.placeLocked = true; break
      case 'area': out.adminLevel3Name = c.value; out.placeLocked = true; break
      case 'point': {
        const [lat, lng] = c.value.split(',').map(Number)
        out.geoms = [`POINT(${lng} ${lat})`]
        if (c.resolved) out.resolved = c.resolved
        break
      }
      case 'size': {
        const [w, h] = c.value.split('x').map(Number)
        const panels = out.panels?.length ? out.panels : [{}]
        out.panels = [{ ...panels[0], physicalWidth: w, physicalHeight: h }, ...panels.slice(1)]
        break
      }
      case 'facing': {
        const panels = out.panels?.length ? out.panels : [{}]
        out.panels = [{ ...panels[0], cardinalDirection: c.value }, ...panels.slice(1)]
        break
      }
      case 'hidden': out.hiddenByStaff = c.value === 'yes'; break
    }
  }
  return out
}
