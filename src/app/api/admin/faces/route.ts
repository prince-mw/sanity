import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { adminAllowed } from '@/lib/admin-auth'
import { detectFace } from '@/lib/mockup/face'
import { revalidatePath } from 'next/cache'

// The mock-up face marker's back end.
//   POST { action: 'propose', photo, width, height }        → Claude vision's corner proposal
//   POST { action: 'save', siteId, siteName, path, faceCorners, faceEdges, faceKind } → siteContent in Sanity
// Both need the admin key (x-admin-key header).

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Pt = [number, number]
const pts = (v: unknown, n: number): Pt[] | null =>
  Array.isArray(v) && v.length === n && v.every(p => Array.isArray(p) && p.length === 2 && p.every(x => typeof x === 'number' && x >= -0.2 && x <= 1.2)) ? v as Pt[] : null

export async function POST(req: NextRequest) {
  if (!adminAllowed(req.headers.get('x-admin-key'))) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  const b = await req.json().catch(() => ({}))

  if (b.action === 'propose') {
    const corners = await detectFace(String(b.photo ?? ''), Number(b.width) || 0, Number(b.height) || 0)
    if (!corners) return NextResponse.json({ error: process.env.ANTHROPIC_API_KEY ? 'No face found' : 'ANTHROPIC_API_KEY is not set on this server' }, { status: 422 })
    return NextResponse.json({ corners })
  }

  if (b.action === 'save') {
    const siteId = String(b.siteId ?? '').slice(0, 80), siteName = String(b.siteName ?? '').slice(0, 200)
    const faceCorners = pts(b.faceCorners, 4), faceEdges = b.faceEdges == null ? null : pts(b.faceEdges, 4)
    const faceKind = b.faceKind === 'print' ? 'print' : b.faceKind === 'led' ? 'led' : null
    if (!siteId || !faceCorners) return NextResponse.json({ error: 'siteId and 4 corners required' }, { status: 400 })
    if (!process.env.SANITY_API_TOKEN) return NextResponse.json({ error: 'SANITY_API_TOKEN is not set on this server' }, { status: 500 })
    const toObj = (p: Pt) => ({ _type: 'pt', _key: Math.random().toString(36).slice(2, 10), x: p[0], y: p[1] })
    const patch = { siteName, faceCorners: faceCorners.map(toObj), faceEdges: faceEdges ? faceEdges.map(toObj) : null, faceKind }
    const existing = await writeClient.fetch<{ _id: string } | null>(`*[_type == "siteContent" && siteId == $siteId][0]{_id}`, { siteId })
    const id = existing
      ? (await writeClient.patch(existing._id).set(patch).commit())._id
      : (await writeClient.create({ _type: 'siteContent', siteId, ...patch, generatedAt: new Date().toISOString() }))._id
    if (typeof b.path === 'string' && b.path.startsWith('/locations/')) revalidatePath(b.path)
    return NextResponse.json({ ok: true, id })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
