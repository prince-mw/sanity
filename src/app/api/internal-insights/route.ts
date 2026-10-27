import { NextRequest, NextResponse } from 'next/server'
import {
  INSIGHTS_COOKIE,
  INSIGHTS_COOKIE_MAX_AGE,
  clearFailures,
  passwordMatches,
  recordFailure,
  sessionToken,
  throttled,
} from '@/lib/insights/auth'

// POST { password } → sets the session cookie. DELETE → signs out.

const noindex = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' }

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429, headers: noindex })
  }

  const { password } = await req.json().catch(() => ({ password: '' }))
  const token = await sessionToken()
  if (!token || typeof password !== 'string' || !(await passwordMatches(password))) {
    recordFailure(ip)
    // Small delay to slow down guessing
    await new Promise((r) => setTimeout(r, 800))
    return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401, headers: noindex })
  }

  clearFailures(ip)
  const res = NextResponse.json({ ok: true }, { headers: noindex })
  res.cookies.set(INSIGHTS_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: INSIGHTS_COOKIE_MAX_AGE,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true }, { headers: noindex })
  res.cookies.delete(INSIGHTS_COOKIE)
  return res
}
