import { ensureMarkets } from '@/lib/proposal/marketsData'
import { NextRequest, NextResponse } from 'next/server'
import { readProposalGrant, canEdit } from '@/lib/proposal/access'
import { getProposalByShareId, setShown, resolveSites } from '@/lib/proposal/store'
import { marketOf } from '@/lib/proposal/markets'
import { ADDONS } from '@/lib/proposal/addons'

// The creator's settings for what the client sees (no new version):
//   POST /api/proposals/<shareId>/settings { shown: { options: string[], postApproval: string[] } }
// Ids: a suggestion id, an add-on id, 'smaller' | 'larger' (the plan sizes), or a city slug. At most 2 per list.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  await ensureMarkets()
  const { shareId } = await params
  const grant = await readProposalGrant()
  if (!canEdit(grant, shareId)) return NextResponse.json({ error: 'Only the person who created this proposal can change it.' }, { status: 403 })
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  let b: { shown?: { options?: unknown; postApproval?: unknown } }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  const view = await resolveSites(doc)
  const valid = new Set<string>(['smaller', 'larger', ...view.suggestions.map(x => x.id), ...ADDONS.map(a => a.id), ...(marketOf(doc.brief.countrySlug)?.cities.map(c => c.slug) ?? [])])
  const ids = (v: unknown) => Array.isArray(v) ? Array.from(new Set(v.filter((x): x is string => typeof x === 'string' && valid.has(x)))).slice(0, 2) : []
  const shown = { options: ids(b.shown?.options), postApproval: ids(b.shown?.postApproval) }
  await setShown(doc._id, shown)
  return NextResponse.json({ ok: true, shown })
}
