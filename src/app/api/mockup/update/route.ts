import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { attachToLead, crmConfigured, updateLead } from '@/lib/zoho-crm'
import { readGrant } from '@/lib/mockup/access'

// "Send to our team": the version the visitor chose goes on their lead — a new
// attachment plus Mock-up URL, which is the field the CRM's email workflow
// fires on (Rif, 11 Nov: the email carries the chosen version, not the first draft).
// A video creative also sends a short recorded clip of the moving mock-up.
// Needs the grant cookie for this site.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_IMAGE = 4 * 1024 * 1024
const MAX_CLIP = 5 * 1024 * 1024 // the browser records at a bitrate that keeps ~10 s under this

function dataUrl(s: unknown, re: RegExp): { type: string; bytes: Buffer } | null {
  const m = typeof s === 'string' ? re.exec(s) : null
  return m ? { type: m[1], bytes: Buffer.from(m[2], 'base64') } : null
}

export async function POST(req: NextRequest) {
  const g = await readGrant()
  const b = await req.json().catch(() => ({})) as { siteId?: string; mockup?: string; clip?: string }
  if (g?.tester) return NextResponse.json({ ok: true, tester: true })
  if (!g || g.siteId !== b.siteId) return NextResponse.json({ error: 'Not registered for this site' }, { status: 403 })
  const img = dataUrl(b.mockup, /^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/=]+)$/)
  if (!img) return NextResponse.json({ error: 'No image' }, { status: 400 })
  if (img.bytes.length > MAX_IMAGE) return NextResponse.json({ error: 'Image too large' }, { status: 413 })
  const clip = dataUrl(b.clip, /^data:(video\/(?:webm|mp4));base64,([A-Za-z0-9+/=]+)$/)
  if (clip && clip.bytes.length > MAX_CLIP) return NextResponse.json({ error: 'Clip too large' }, { status: 413 })
  const ext = (t: string) => t === 'image/jpeg' ? 'jpg' : t === 'video/mp4' ? 'mp4' : t === 'video/webm' ? 'webm' : 'png'

  let url: string | null = null, clipUrl: string | null = null
  if (process.env.SANITY_API_TOKEN) {
    try {
      const asset = await writeClient.assets.upload('image', img.bytes, { filename: `mockup-${g.siteId}.${ext(img.type)}`, contentType: img.type })
      url = asset.url
      const patch: Record<string, unknown> = { mockup: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }
      if (clip) {
        const f = await writeClient.assets.upload('file', clip.bytes, { filename: `mockup-${g.siteId}.${ext(clip.type)}`, contentType: clip.type })
        clipUrl = f.url
        patch.clip = { _type: 'file', asset: { _type: 'reference', _ref: f._id } }
      }
      // keep the latest version on the most recent submission for this person + site
      const doc = await writeClient.fetch<{ _id: string } | null>(`*[_type == "leadSubmission" && email == $email && siteId == $siteId] | order(submittedAt desc)[0]{_id}`, { email: g.email, siteId: g.siteId })
      if (doc) await writeClient.patch(doc._id).set(patch).commit()
    } catch (e) { console.error('[mockup/update] Sanity', e) }
  }
  if (crmConfigured() && g.leadId) {
    try {
      const stamp = Date.now()
      await attachToLead(g.leadId, { name: `ad-mockup-${g.siteId}-sent-${stamp}.${ext(img.type)}`, type: img.type, bytes: img.bytes })
      if (clip) await attachToLead(g.leadId, { name: `ad-mockup-${g.siteId}-clip-${stamp}.${ext(clip.type)}`, type: clip.type, bytes: clip.bytes })
      const when = new Date().toISOString().slice(0, 16).replace('T', ' ')
      await updateLead(g.leadId, { Mockup_URL: url ?? undefined, Description: `Mock-up sent by the visitor on ${when} UTC${url ? `: ${url}` : ''}${clipUrl ? ` · moving clip: ${clipUrl}` : ''}` })
    } catch (e) { console.error('[mockup/update] CRM', e) }
  }
  return NextResponse.json({ ok: true })
}
