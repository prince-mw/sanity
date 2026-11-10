import { NextRequest, NextResponse } from 'next/server'

// Same-origin proxy for the images the mock-up draws (Pexels photos and the
// site photo on the Sanity CDN), so the canvas is never tainted and can be
// exported. The site photo must come through here too: the browser has
// already cached it from the hero without CORS, and that copy can't be reused.

export const runtime = 'nodejs'

const ALLOWED = new Set(['images.pexels.com', 'cdn.sanity.io'])

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get('u') ?? ''
  let url: URL
  try { url = new URL(u) } catch { return new NextResponse('Bad url', { status: 400 }) }
  if (url.protocol !== 'https:' || !ALLOWED.has(url.hostname)) return new NextResponse('Forbidden', { status: 403 })
  const r = await fetch(url, { headers: { 'User-Agent': 'movingwalls.com ad mock-up' }, next: { revalidate: 86400 } })
  if (!r.ok) return new NextResponse('Upstream error', { status: 502 })
  return new NextResponse(r.body, {
    headers: { 'content-type': r.headers.get('content-type') ?? 'image/jpeg', 'cache-control': 'public, max-age=86400', 'access-control-allow-origin': '*' },
  })
}
