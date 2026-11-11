import { NextRequest, NextResponse } from 'next/server'
import { readProposalGrant, canEdit } from '@/lib/proposal/access'
import { getProposalByShareId, setHidden } from '@/lib/proposal/store'
import { ADDONS } from '@/lib/proposal/addons'

// The creator's settings for what the client sees (no new version):
//   POST /api/proposals/<shareId>/settings { hidden: { suggestions: string[], addons: string[] } }

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const grant = await readProposalGrant()
  if (!canEdit(grant, shareId)) return NextResponse.json({ error: 'Only the person who created this proposal can change it.' }, { status: 403 })
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  let b: { hidden?: { suggestions?: unknown; addons?: unknown } }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  const ids = (v: unknown, max = 20) => Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').map(x => x.slice(0, 60)).slice(0, max) : []
  const hidden = { suggestions: ids(b.hidden?.suggestions), addons: ids(b.hidden?.addons).filter(id => ADDONS.some(a => a.id === id)) }
  await setHidden(doc._id, hidden)
  return NextResponse.json({ ok: true, hidden })
}
