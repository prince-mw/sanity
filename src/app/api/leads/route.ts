import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { createLead, attachToLead, crmConfigured, getLeadOwner } from '@/lib/zoho-crm'
import { grantCookie, readGrant, isStaffEmail, testerGrant } from '@/lib/mockup/access'

// The website's own lead form (replaces Zoho Forms on the inventory pages).
//   1. validate + spam checks
//   2. save a leadSubmission document in Sanity (durable copy)
//   3. create the lead in Zoho CRM (the CRM's assignment rule picks the owner),
//      attach the mock-up if there is one, read the owner back
//   4. record the CRM id (or the error, for a retry) on the document
//   5. for a mock-up registration: set the signed cookie that unlocks this one site
// The browser fires the GA4 conversion on a 200 (production only), so tracking
// no longer depends on a Zoho iframe.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_MOCKUP_BYTES = 4 * 1024 * 1024
const PURPOSES = new Set(['enquiry', 'mockup'])

type Body = {
  name?: string; email?: string; company?: string; country?: string; phone?: string; message?: string
  purpose?: string; siteId?: string; siteName?: string; pageUrl?: string
  utm?: Record<string, string>
  mockup?: string            // data:image/png;base64,...
  website?: string           // honeypot: must stay empty
  startedAt?: number         // when the form opened; bots submit instantly
}

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: NextRequest) {
  let b: Body
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }

  const name = str(b.name, 120), email = str(b.email, 200).toLowerCase(), company = str(b.company, 160), country = str(b.country, 80)
  const phone = str(b.phone, 40), message = str(b.message, 2000), purpose = PURPOSES.has(String(b.purpose)) ? String(b.purpose) : 'enquiry'
  const siteId = str(b.siteId, 80), siteName = str(b.siteName, 200), pageUrl = str(b.pageUrl, 500)

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please enter your name and a valid email.' }, { status: 400 })
  if (str(b.website)) return NextResponse.json({ ok: true }) // honeypot filled: pretend success, store nothing
  if (typeof b.startedAt === 'number' && Date.now() - b.startedAt < 2500) return NextResponse.json({ ok: true })

  // One mock-up per person: a visitor already registered for another site is sent to sales.
  if (purpose === 'mockup') {
    const g = await readGrant()
    if (g?.tester) return NextResponse.json({ ok: true, owner: null, leadId: null, tester: true })
    // staff testing the tool: unlock everything, create nothing
    if (isStaffEmail(email)) { const res = NextResponse.json({ ok: true, owner: null, leadId: null, tester: true }); res.cookies.set(grantCookie(testerGrant(email))); return res }
    if (g && g.siteId !== siteId) return NextResponse.json({ error: 'already-used', siteName: g.siteName, owner: g.owner }, { status: 409 })
    if (g && g.siteId === siteId) return NextResponse.json({ ok: true, owner: g.owner, leadId: g.leadId })
  }

  const utm = Object.fromEntries(
    ['source', 'medium', 'campaign', 'term', 'content', 'gclid', 'fbclid']
      .map(k => [k, str(b.utm?.[k] ?? b.utm?.[`utm_${k}`], 200)]).filter(([, v]) => v),
  ) as Record<string, string>

  // Mock-up image, if any
  let mockup: { bytes: Uint8Array; type: string } | null = null
  if (purpose === 'mockup' && typeof b.mockup === 'string') {
    const m = /^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/=]+)$/.exec(b.mockup)
    if (m) {
      const bytes = Buffer.from(m[2], 'base64')
      if (bytes.length <= MAX_MOCKUP_BYTES) mockup = { bytes, type: m[1] }
    }
  }

  // 1. durable copy in Sanity (and a public URL for the image, for the CRM email)
  let docId: string | null = null, mockupUrl: string | null = null
  if (process.env.SANITY_API_TOKEN) {
    try {
      let mockupAsset: { _type: 'image'; asset: { _type: 'reference'; _ref: string } } | undefined
      if (mockup) {
        const asset = await writeClient.assets.upload('image', Buffer.from(mockup.bytes), { filename: `mockup-${siteId || 'site'}.png`, contentType: mockup.type })
        mockupAsset = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
        mockupUrl = asset.url
      }
      const doc = await writeClient.create({
        _type: 'leadSubmission', submittedAt: new Date().toISOString(), purpose, name, email, company, country, message,
        siteId, siteName, pageUrl: pageUrl || undefined, utm, mockup: mockupAsset,
      })
      docId = doc._id
    } catch (e) {
      console.error('[leads] Sanity write failed', e)
    }
  }

  const description = [
    `Website form: ${purpose === 'mockup' ? 'ad mock-up' : 'enquiry'}${siteName ? ` for ${siteName}` : ''}`,
    pageUrl && `Page: ${pageUrl}`,
    mockupUrl && `Mock-up image: ${mockupUrl}`,
    message && `Message: ${message}`,
  ].filter(Boolean).join('\n')

  // 2. CRM
  let crmId: string | null = null, crmError: string | null = null, owner: { name: string; email: string | null } | null = null
  if (crmConfigured()) {
    try {
      crmId = await createLead({ name, email, company, country, phone, description, pageUrl, utm, extra: { Mockup_Site: siteName || undefined } }) // Mockup_URL is set on "Send to our team" — that's what the CRM email fires on
      if (mockup) await attachToLead(crmId, { name: `ad-mockup-${siteId || 'site'}-draft.png`, type: mockup.type, bytes: mockup.bytes }).catch(e => console.error('[leads] attachment failed', e))
      owner = await getLeadOwner(crmId).catch(() => null)
    } catch (e) {
      crmError = String((e as Error).message ?? e).slice(0, 300)
      console.error('[leads] CRM failed', crmError)
    }
  } else {
    crmError = 'CRM not configured'
  }
  if (docId) await writeClient.patch(docId).set({ crmId: crmId ?? undefined, crmError: crmError ?? undefined }).commit().catch(() => {})

  // Nothing could be saved (CRM not connected, Sanity token can't write): never block the
  // visitor over our back end. Log it loudly so the submission can be recovered from the logs.
  if (!docId && !crmId) console.error('[leads] NOT SAVED — fix the Sanity token / CRM keys:', JSON.stringify({ purpose, name, email, company, country, siteId, siteName, pageUrl, utm, message, crmError }))
  if (!docId && !crmId && purpose !== 'mockup') return NextResponse.json({ error: 'We could not save your details. Please email us instead.' }, { status: 502 })

  const res = NextResponse.json({ ok: true, owner, leadId: crmId, saved: !!(docId || crmId) })
  if (purpose === 'mockup') res.cookies.set(grantCookie({ email, siteId, siteName, leadId: crmId, owner, at: Date.now() }))
  return res
}
