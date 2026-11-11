import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { getProposalByShareId, setCreative, addParticipant } from '@/lib/proposal/store'
import { readProposalGrant, canEdit } from '@/lib/proposal/access'
import type { Creative } from '@/lib/proposal/types'

// The client's creative for the mock-ups on a proposal (Rif, 11 Nov 2026):
//   POST /api/proposals/<shareId>/creative { creative, by? }
// Sales (the creator, or staff) may set it any time; the client only once the
// proposal is approved, with their identity (the second lead). Files arrive as
// data URLs and are stored on the Sanity CDN; the local file store keeps them
// inline. DELETE clears it.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_LOGO = 2 * 1024 * 1024
const MAX_IMAGE = 6 * 1024 * 1024
const MAX_VIDEO = 4.5 * 1024 * 1024 // what the hosted route can accept in one request; the panel says so

const dataUrl = (s: unknown, re: RegExp): { type: string; bytes: Buffer } | null => {
  const m = typeof s === 'string' ? re.exec(s) : null
  return m ? { type: m[1], bytes: Buffer.from(m[2], 'base64') } : null
}
const isUrl = (s: unknown): s is string => typeof s === 'string' && /^https?:\/\//.test(s)
const ext = (t: string) => t === 'image/jpeg' ? 'jpg' : t === 'image/webp' ? 'webp' : t === 'image/svg+xml' ? 'svg' : t === 'video/mp4' ? 'mp4' : t === 'video/webm' ? 'webm' : t === 'video/quicktime' ? 'mov' : 'png'

/** Stores a data URL as a Sanity asset and returns its URL; without a token (local file store) the data URL stays. */
async function store(kind: 'image' | 'file', d: { type: string; bytes: Buffer }, name: string, raw: string): Promise<string> {
  if (!process.env.SANITY_API_TOKEN || process.env.PROPOSAL_STORE === 'file') return raw
  const asset = await writeClient.assets.upload(kind, d.bytes, { filename: `${name}.${ext(d.type)}`, contentType: d.type })
  return asset.url
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  let b: { creative?: Partial<Creative> & { logo?: string; ownFile?: string }; by?: { name?: unknown; email?: unknown } }
  try { b = await req.json() } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const grant = await readProposalGrant()
  const staff = canEdit(grant, shareId)
  const by = !staff && b.by && typeof b.by.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.by.email)
    ? { name: typeof b.by.name === 'string' ? b.by.name.trim().slice(0, 120) : '', email: String(b.by.email).trim().toLowerCase().slice(0, 200) }
    : null
  if (!staff) {
    if (doc.status !== 'approved') return NextResponse.json({ error: 'The creative can be changed once the proposal is approved.' }, { status: 403 })
    if (!by) return NextResponse.json({ error: 'Tell us who you are first.' }, { status: 401 })
  }
  const c = b.creative ?? {}
  const mode = c.mode === 'own' ? 'own' : 'make'
  const out: Creative = {
    mode,
    brand: typeof c.brand === 'string' ? c.brand.trim().slice(0, 30) : '',
    tagline: typeof c.tagline === 'string' ? c.tagline.trim().slice(0, 60) : '',
    accent: typeof c.accent === 'string' && /^#[0-9a-f]{6}$/i.test(c.accent) ? c.accent : '#1B1E2B',
    template: c.template === 'split' || c.template === 'poster' ? c.template : 'band',
    logoUrl: isUrl(c.logoUrl) ? c.logoUrl : null,
    own: null,
    fit: c.fit === 'fill' ? 'fill' : 'letterbox',
    by: staff ? 'staff' : 'client', byName: staff ? (grant?.name ?? doc.creator.name ?? '') : (by?.name || by?.email || ''), at: new Date().toISOString(),
  }
  try {
    const logo = dataUrl(c.logo, /^data:(image\/(?:png|jpeg|webp|svg\+xml));base64,([A-Za-z0-9+/=]+)$/)
    if (logo) {
      if (logo.bytes.length > MAX_LOGO) return NextResponse.json({ error: 'Please use a logo under 2 MB.' }, { status: 413 })
      out.logoUrl = await store('image', logo, `proposal-${shareId}-logo`, c.logo as string)
    }
    const prevOwn = doc.creative?.own ?? null
    const ownFile = dataUrl(c.ownFile, /^data:((?:image\/(?:png|jpeg|webp))|(?:video\/(?:mp4|webm|quicktime)));base64,([A-Za-z0-9+/=]+)$/)
    if (ownFile) {
      const video = ownFile.type.startsWith('video/')
      if (ownFile.bytes.length > (video ? MAX_VIDEO : MAX_IMAGE)) return NextResponse.json({ error: video ? 'Videos in a proposal are limited to 4.5 MB. Trim or compress it, or send it to your planner.' : 'Please use an image under 6 MB.' }, { status: 413 })
      const o: Partial<NonNullable<Creative['own']>> = c.own ?? {}
      const url = await store(video ? 'file' : 'image', ownFile, `proposal-${shareId}-creative`, c.ownFile as string)
      out.own = { url, kind: video ? 'video' : 'image', width: Number(o.width) || 0, height: Number(o.height) || 0, name: typeof o.name === 'string' ? o.name.slice(0, 120) : '' }
    } else if (mode === 'own' && c.own && isUrl(c.own.url) && prevOwn && c.own.url === prevOwn.url) {
      out.own = prevOwn // kept from before, only the fit changed
    }
  } catch (e) {
    console.error('[proposals/creative] asset upload', e)
    return NextResponse.json({ error: 'The file could not be stored. Please try again.' }, { status: 500 })
  }
  if (out.mode === 'own' && !out.own) return NextResponse.json({ error: 'Upload an image or a video.' }, { status: 400 })
  if (out.mode === 'make' && !out.logoUrl && !out.brand && !out.tagline) return NextResponse.json({ error: 'Add a logo, a brand name or a tagline.' }, { status: 400 })
  await setCreative(doc._id, out)
  if (by) await addParticipant(doc._id, { ...by, action: 'Changed the creative' }).catch(() => {})
  return NextResponse.json({ ok: true, creative: out })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const doc = await getProposalByShareId(shareId)
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!canEdit(await readProposalGrant(), shareId)) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  await setCreative(doc._id, null)
  return NextResponse.json({ ok: true })
}
