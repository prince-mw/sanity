import 'server-only'
import type { OverviewPart, OverviewPiece } from './overview'
import { RANGE_KEYS, type PresetRange, type RangeKey } from './ranges'

// A shared copy of each finished Overview piece, so the Overview shows in about a second.
// The host (Amplify) runs several server copies, each with its own 6-hour data cache, so a visitor often lands on a
// "cold" copy that has to reload Zoho (10–30 s). These snapshots live in PRIVATE Sanity documents
// (secrets.insightsOverview.<range>.<part>), which every copy reads in one quick query:
// - fresh (under FRESH_MS): shown as is
// - older, up to MAX_STALE_MS: shown at once; the browser then re-requests it quietly, which saves a fresh one
// - older still, or missing: the browser loads that piece the normal (slow) way, which saves a new snapshot
// Only the preset date ranges are saved; custom dates load the normal way.

const FRESH_MS = 2 * 60 * 60 * 1000
const MAX_STALE_MS = 24 * 60 * 60 * 1000
/** Pieces that show action items: a snapshot older than the last status change is not used */
const WITH_ACTIONS: OverviewPart[] = ['site', 'campaigns', 'content', 'blog']

const projectId = () => process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
const dataset = () => process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
/** Bump when a piece's content or wording changes, so the new code doesn't show old snapshots */
const SNAPSHOT_VERSION = 'v2'
const docId = (range: PresetRange, part: OverviewPart) => `secrets.insightsOverview.${SNAPSHOT_VERSION}.${range}.${part}`

export const isSnapshotRange = (range: RangeKey): range is PresetRange => RANGE_KEYS.includes(range as PresetRange)

export interface Snapshot { piece: OverviewPiece; at: string; stale: boolean }

/** The usable snapshots for a preset range, in one Sanity query */
export async function readSnapshots(range: PresetRange, parts: OverviewPart[]): Promise<Partial<Record<OverviewPart, Snapshot>>> {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) return {}
  const ids = parts.map((p) => docId(range, p))
  const query = encodeURIComponent('{"snaps": *[_id in $ids]{_id, at, json}, "actionsAt": *[_id == "secrets.internalInsightsActions"][0]._updatedAt}')
  const res = await fetch(`https://${projectId()}.api.sanity.io/v2024-01-01/data/query/${dataset()}?query=${query}&$ids=${encodeURIComponent(JSON.stringify(ids))}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const result: { snaps: { _id: string; at: string; json: string }[]; actionsAt?: string } | undefined = (await res.json())?.result
  const out: Partial<Record<OverviewPart, Snapshot>> = {}
  const now = Date.now()
  for (const s of result?.snaps || []) {
    const part = s._id.split('.').pop() as OverviewPart
    const age = now - Date.parse(s.at)
    if (!(age >= 0 && age < MAX_STALE_MS)) continue
    if (WITH_ACTIONS.includes(part) && result?.actionsAt && Date.parse(s.at) < Date.parse(result.actionsAt)) continue
    try {
      out[part] = { piece: JSON.parse(s.json), at: s.at, stale: age > FRESH_MS }
    } catch {
      // unreadable snapshot: load the normal way
    }
  }
  return out
}

export async function writeSnapshot(range: PresetRange, part: OverviewPart, piece: OverviewPiece): Promise<void> {
  const token = process.env.SANITY_API_TOKEN
  if (!token) return
  await fetch(`https://${projectId()}.api.sanity.io/v2024-01-01/data/mutate/${dataset()}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      mutations: [{ createOrReplace: { _id: docId(range, part), _type: 'insightsOverviewSnapshot', at: new Date().toISOString(), json: JSON.stringify(piece) } }],
    }),
    cache: 'no-store',
  }).catch(() => undefined)
}
