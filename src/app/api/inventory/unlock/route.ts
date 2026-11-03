import { NextResponse } from 'next/server'
import { makePriceCookie, PRICE_COOKIE, PRICE_COOKIE_MAX_AGE } from '@/lib/inventory/priceCookie'

// The newsletter sign-up that unlocks estimated prices.
//
// PREVIEW: the sign-up is checked but not sent anywhere yet. Before launch it
// is posted to the Zoho newsletter form (to be created), and the cookie is set
// only once Zoho accepts it.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Please fill in the form.' }, { status: 400 }) }
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const company = String(body.company ?? '').trim()
  const country = String(body.country ?? '').trim()
  if (!name || !company || !country || !EMAIL.test(email)) return NextResponse.json({ error: 'Please fill in every field with a valid email.' }, { status: 400 })
  if (!body.consent) return NextResponse.json({ error: 'Please tick the box to receive our news.' }, { status: 400 })

  const res = NextResponse.json({ ok: true })
  res.cookies.set(PRICE_COOKIE, makePriceCookie(), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: PRICE_COOKIE_MAX_AGE })
  return res
}
