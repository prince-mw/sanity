// What's wrong with a site, for the staff review queue on /staff/inventory.
// Same rules as the inventory-hygiene scan skill (CHECKLIST.md), applied to the
// latest daily pull, so the queue is always current; the monthly report is the
// scan skill's job. Pure: no storage, no fetching.

import { addressState, plausibleSize, isTestRecord, HOLD_REASONS, type AddressRules, type PlaceSource, type Display, type HoldReason } from './normalize'
import type { CorrectionField, CorrectionStatus } from './correctionsCore'
import type { InventoryRecord } from './types'

export type Severity = 'blocking' | 'high' | 'medium' | 'info'
export type Issue = { code: string; label: string; severity: Severity; fix: CorrectionField | null; onboarding: boolean }

export const ISSUE_TYPES: Record<string, { label: string; severity: Severity; fix: CorrectionField | null; onboarding: boolean }> = {
  'held': { label: 'Held from the website: location not confirmed', severity: 'blocking', fix: 'state', onboarding: true },
  'indoor-no-photo': { label: 'Held from the website: indoor site with no photo', severity: 'blocking', fix: null, onboarding: true },
  'no-pin': { label: 'Shown without a map pin (pin wrong or a shared default)', severity: 'high', fix: 'point', onboarding: true },
  'state-auto': { label: 'Stored state was wrong (placed by its map point)', severity: 'info', fix: 'state', onboarding: true },
  'border': { label: 'Address names another state (check)', severity: 'medium', fix: 'state', onboarding: false },
  'no-point': { label: 'No map point', severity: 'blocking', fix: 'point', onboarding: true },
  'conflict': { label: 'The API changed a field staff corrected', severity: 'high', fix: null, onboarding: false },
  'size-wrong': { label: 'Impossible size (hidden on the website)', severity: 'high', fix: 'size', onboarding: true },
  'no-size': { label: 'No size', severity: 'medium', fix: 'size', onboarding: true },
  'no-facing': { label: 'Outdoor site without a facing direction', severity: 'medium', fix: 'facing', onboarding: true },
  'no-photo': { label: 'No photo', severity: 'medium', fix: null, onboarding: true },
  'no-address': { label: 'No address', severity: 'medium', fix: 'address', onboarding: true },
  'long-name': { label: 'Name reads like a direction (over 60 characters)', severity: 'medium', fix: 'name', onboarding: true },
}
const issue = (code: keyof typeof ISSUE_TYPES): Issue => ({ code, ...ISSUE_TYPES[code] })

const isOutdoor = (r: InventoryRecord) => (r.venues?.find(v => v.name)?.name ?? r.venueTaxonomyName?.split('>')[0] ?? '').trim().toLowerCase() === 'outdoor'

/**
 * The issues of one site. `raw` is the API's record; `shown` the record the
 * website uses (corrections applied, place decided); `source` how its place was
 * decided; `statuses` its corrections' states.
 */
export function issuesOf(raw: InventoryRecord, shown: InventoryRecord, source: PlaceSource | 'staff', address: AddressRules | null, statuses: CorrectionStatus[] = [], display: Display = 'show', hold: HoldReason | null = null): Issue[] {
  if (isTestRecord(raw)) return []
  const out: Issue[] = []
  const stored = raw.adminLevel1Name?.trim() || null
  const point = raw.resolved?.adminLevel1Name ?? null
  if (display === 'hold' && hold === 'indoor-no-photo') out.push(issue('indoor-no-photo'))
  else if (display === 'hold') out.push({ ...issue('held'), label: `Held from the website: ${HOLD_REASONS[hold ?? 'three-way'].toLowerCase()}` })
  else if (display === 'no-pin') out.push(issue('no-pin'))
  else if (!raw.geoms?.length) out.push(issue('no-point'))
  else if (source === 'point' && point && stored && point !== stored) out.push(issue('state-auto'))
  else if (address && point && stored === point) {
    const said = addressState(raw.address, address)
    if (said && said !== stored) out.push(issue('border'))
  }
  if (statuses.includes('conflict')) out.push(issue('conflict'))
  const p = shown.panels?.find(x => x.physicalWidth && x.physicalHeight)
  if (!p) out.push(issue('no-size'))
  else if (!plausibleSize(shown, p.physicalWidth!, p.physicalHeight!)) out.push(issue('size-wrong'))
  if (isOutdoor(shown) && !shown.panels?.[0]?.cardinalDirection) out.push(issue('no-facing'))
  if (!(shown.medias?.length || shown.thumbnailUrl) && hold !== 'indoor-no-photo') out.push(issue('no-photo'))
  if (!shown.address?.trim()) out.push(issue('no-address'))
  if ((shown.name ?? '').trim().length > 60) out.push(issue('long-name'))
  return out
}
