import { NextRequest, NextResponse } from 'next/server'
import { getProposalByShareId, addCityRequest, CRM_FIELDS } from '@/lib/proposal/store'
import { cityOf } from '@/lib/proposal/markets'
import { crmConfigured, updateLead } from '@/lib/zoho-crm'

// "Run it in <city> too" for a city with no inventory on the site yet: the
// request is kept on the proposal and the CRM lead, and the team follows up.
//   POST /api/proposals/<shareId>/request-city { citySlug, email? }

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  let b: { citySlug?: unknown; email?: unknown }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const citySlug = typeof b.citySlug === 'string' ? b.citySlug.slice(0, 60) : ''
  const city = cityOf(doc.brief.countrySlug, citySlug)
  if (!city) return NextResponse.json({ error: 'Unknown city' }, { status: 400 })
  const by = typeof b.email === 'string' ? b.email.trim().slice(0, 200) : undefined
  if (!doc.cityRequests.some(r => r.citySlug === citySlug)) await addCityRequest(doc._id, citySlug, by)
  if (doc.leadId && crmConfigured()) {
    updateLead(doc.leadId, { [CRM_FIELDS.status]: 'Updated (city requested)', [CRM_FIELDS.note]: `Asked to run the same campaign in ${city.name}${by ? ` (${by})` : ''}` })
      .catch(e => console.error('[proposals/request-city] CRM update failed', e))
  }
  return NextResponse.json({ ok: true, citySlug })
}
