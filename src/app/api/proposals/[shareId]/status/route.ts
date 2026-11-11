import { NextRequest, NextResponse } from 'next/server'
import { getProposalByShareId, setStatus, addParticipant, CRM_FIELDS } from '@/lib/proposal/store'
import { readProposalGrant, canEdit } from '@/lib/proposal/access'
import { crmConfigured, updateLead } from '@/lib/zoho-crm'

// The client's two actions on a proposal page (anyone with the link):
//   POST /api/proposals/<shareId>/status { action: 'approve' | 'request-changes', message? }

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const recent = new Map<string, number[]>()

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  let b: { action?: unknown; message?: unknown; by?: { name?: unknown; email?: unknown } }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  const action = b.action === 'approve' ? 'approve' : b.action === 'request-changes' ? 'request-changes' : null
  const message = typeof b.message === 'string' ? b.message.trim().slice(0, 1000) : ''
  if (!action) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  if (action === 'request-changes' && !message) return NextResponse.json({ error: 'Tell us what to change.' }, { status: 400 })

  const now = Date.now(), hist = (recent.get(shareId) ?? []).filter(t => now - t < 3600_000)
  if (hist.length >= 10) return NextResponse.json({ error: 'Too many requests for this proposal. Please try again later.' }, { status: 429 })
  recent.set(shareId, [...hist, now])

  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const status = action === 'approve' ? 'approved' : 'changes-requested'
  await setStatus(doc._id, status, { message })
  const grant = await readProposalGrant()
  const by = !canEdit(grant, shareId) && b.by && typeof b.by.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.by.email)
    ? { name: typeof b.by.name === 'string' ? b.by.name.trim().slice(0, 120) : '', email: String(b.by.email).trim().toLowerCase().slice(0, 200), action: action === 'approve' ? 'Approved' : 'Requested changes' }
    : null
  if (by) await addParticipant(doc._id, by).catch(() => {})

  if (doc.leadId && crmConfigured()) {
    const url = `${(process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, '')}/proposals/${shareId}`
    updateLead(doc.leadId, { [CRM_FIELDS.status]: action === 'approve' ? 'Approved' : 'Changes requested', [CRM_FIELDS.note]: [by ? `${by.action} by ${by.name || by.email} (${by.email})` : null, message || null].filter(Boolean).join(' — ') || undefined, [CRM_FIELDS.url]: url })
      .catch(e => console.error('[proposals/status] CRM update failed', e))
  }
  return NextResponse.json({ ok: true, status })
}
