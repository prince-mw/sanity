import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { attachToLead, crmConfigured, updateLead } from '@/lib/zoho-crm'
import { readGrant } from '@/lib/mockup/access'

// "Send my updated mock-up": a registered visitor changed their ad and wants
// the new version on their lead. Needs the grant cookie for this site.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const g = await readGrant()
  const b = await req.json().catch(() => ({})) as { siteId?: string; mockup?: string }
  if (g?.tester) return NextResponse.json({ ok: true, tester: true })
  if (!g || g.siteId !== b.siteId) return NextResponse.json({ error: 'Not registered for this site' }, { status: 403 })
  const m = typeof b.mockup === 'string' ? /^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/=]+)$/.exec(b.mockup) : null
  if (!m) return NextResponse.json({ error: 'No image' }, { status: 400 })
  const bytes = Buffer.from(m[2], 'base64')
  if (bytes.length > 4 * 1024 * 1024) return NextResponse.json({ error: 'Image too large' }, { status: 413 })

  let url: string | null = null
  if (process.env.SANITY_API_TOKEN) {
    try {
      const asset = await writeClient.assets.upload('image', bytes, { filename: `mockup-${g.siteId}.png`, contentType: m[1] })
      url = asset.url
      // keep the latest image on the most recent submission for this person + site
      const doc = await writeClient.fetch<{ _id: string } | null>(`*[_type == "leadSubmission" && email == $email && siteId == $siteId] | order(submittedAt desc)[0]{_id}`, { email: g.email, siteId: g.siteId })
      if (doc) await writeClient.patch(doc._id).set({ mockup: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit()
    } catch (e) { console.error('[mockup/update] Sanity', e) }
  }
  if (crmConfigured() && g.leadId) {
    try {
      await attachToLead(g.leadId, { name: `ad-mockup-${g.siteId}-v2.png`, type: m[1], bytes })
      await updateLead(g.leadId, { Mockup_URL: url ?? undefined })
    } catch (e) { console.error('[mockup/update] CRM', e) }
  }
  return NextResponse.json({ ok: true })
}
