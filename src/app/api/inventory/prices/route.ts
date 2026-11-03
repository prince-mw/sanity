import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PRICE_COOKIE, priceCookieValid } from '@/lib/inventory/priceCookie'
import { pricesFor } from '@/lib/inventory/source'

// Estimated prices — only for visitors who signed up (signed cookie). Never
// cached publicly, never in page HTML, so search engines can't index them.

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const jar = await cookies()
  if (!priceCookieValid(jar.get(PRICE_COOKIE)?.value)) {
    // Not signed up yet: a normal answer, not an error — the page shows the sign-up button.
    return NextResponse.json({ locked: true, quotes: null }, { headers: { 'cache-control': 'no-store' } })
  }
  const q = new URL(req.url).searchParams
  const country = String(q.get('country') ?? '').slice(0, 40)
  const ids = String(q.get('ids') ?? '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 200)
  const quotes = await pricesFor(country, ids)
  return NextResponse.json({ quotes }, { headers: { 'cache-control': 'private, no-store' } })
}
