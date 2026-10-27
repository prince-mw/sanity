import 'server-only'
import { createHash } from 'node:crypto'

// Shared status for dashboard action items (Not started / WIP / Done), stored in the PRIVATE
// Sanity document `secrets.internalInsightsActions` so every viewer sees the same state.

export type ActionStatus = 'not-started' | 'wip' | 'done'
export type StatusMap = Record<string, { status: ActionStatus; updatedAt: string }>

const DOC_ID = 'secrets.internalInsightsActions'
const projectId = () => process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
const dataset = () => process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

/** Stable id for an action, so its status survives data refreshes */
export const actionId = (parts: string[]) => createHash('sha1').update(parts.join('|')).digest('hex').slice(0, 16)

export async function getActionStatuses(): Promise<StatusMap> {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) return {}
  const q = encodeURIComponent(`*[_id == "${DOC_ID}"][0].statuses[]{_key, status, updatedAt}`)
  try {
    const res = await fetch(`https://${projectId()}.api.sanity.io/v2024-01-01/data/query/${dataset()}?query=${q}`, {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    const rows: { _key: string; status: ActionStatus; updatedAt: string }[] = (await res.json())?.result || []
    return Object.fromEntries(rows.map((r) => [r._key, { status: r.status, updatedAt: r.updatedAt }]))
  } catch {
    return {}
  }
}

export async function setActionStatus(id: string, status: ActionStatus): Promise<void> {
  const token = process.env.SANITY_API_TOKEN
  if (!token) throw new Error('No Sanity write token on the server')
  const item = { _key: id, status, updatedAt: new Date().toISOString() }
  const res = await fetch(`https://${projectId()}.api.sanity.io/v2024-01-01/data/mutate/${dataset()}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      mutations: [
        { createIfNotExists: { _id: DOC_ID, _type: 'internalInsightsActions', statuses: [] } },
        { patch: { id: DOC_ID, setIfMissing: { statuses: [] } } },
        { patch: { id: DOC_ID, unset: [`statuses[_key=="${id}"]`] } },
        { patch: { id: DOC_ID, insert: { after: 'statuses[-1]', items: [item] } } },
      ],
    }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Sanity write failed (${res.status})`)
}
