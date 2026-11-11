import { NextRequest, NextResponse } from 'next/server'
import { isStaffEmail } from '@/lib/mockup/access'
import { loginToken, verifyLoginToken, staffCookie, STAFF_COOKIE } from '@/lib/staff/auth'
import { mailConfigured, sendEmail } from '@/lib/staff/email'

// Staff magic link.
//   POST /api/staff/login { email }        → emails a sign-in link (company addresses only)
//   GET  /api/staff/login?t=<token>&back=  → sets the staff cookie and redirects
//   GET  /api/staff/login?off=1            → signs out
// In development the link is returned in the response instead of emailed.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const recent = new Map<string, number[]>()

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({})) as { email?: unknown; back?: unknown }
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : ''
  if (!isStaffEmail(email)) return NextResponse.json({ error: 'Use your @movingwalls.com address.' }, { status: 400 })
  const now = Date.now(), hist = (recent.get(email) ?? []).filter(t => now - t < 3600_000)
  if (hist.length >= 5) return NextResponse.json({ error: 'Too many links requested. Check your inbox, or try again in an hour.' }, { status: 429 })
  recent.set(email, [...hist, now])
  const back = typeof b.back === 'string' && b.back.startsWith('/') ? b.back : '/staff/proposals'
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, '')
  const link = `${origin}/api/staff/login?t=${encodeURIComponent(loginToken(email))}&back=${encodeURIComponent(back)}`
  if (!mailConfigured()) {
    if (process.env.NODE_ENV === 'development') { console.log(`[staff/login] dev link for ${email}: ${link}`); return NextResponse.json({ ok: true, dev: true, link }) }
    return NextResponse.json({ error: 'Sign-in email is not set up on this site yet. Register on the proposal form with your company address instead; that signs you in too.' }, { status: 503 })
  }
  try {
    await sendEmail({ to: email, subject: 'Your Moving Walls sign-in link', text: `Sign in to the Moving Walls website tools:\n\n${link}\n\nThe link works for 20 minutes. If you did not ask for it, ignore this email.`,
      html: `<p>Sign in to the Moving Walls website tools:</p><p><a href="${link}">${link}</a></p><p>The link works for 20 minutes. If you did not ask for it, ignore this email.</p>` })
  } catch (e) { console.error('[staff/login] send failed', e); return NextResponse.json({ error: 'The email could not be sent. Please try again.' }, { status: 500 }) }
  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest) {
  const back = req.nextUrl.searchParams.get('back') || '/staff/proposals'
  const url = new URL(back.startsWith('/') ? back : '/staff/proposals', req.nextUrl.origin)
  if (req.nextUrl.searchParams.get('off')) {
    const res = NextResponse.redirect(new URL('/staff/login', req.nextUrl.origin))
    res.cookies.set({ name: STAFF_COOKIE, value: '', path: '/', maxAge: 0 })
    return res
  }
  const v = verifyLoginToken(req.nextUrl.searchParams.get('t'))
  if (!v) return NextResponse.redirect(new URL('/staff/login?expired=1', req.nextUrl.origin))
  const res = NextResponse.redirect(url)
  res.cookies.set(staffCookie(v.email))
  return res
}
