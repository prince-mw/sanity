import { NextRequest, NextResponse } from 'next/server'
import { INSIGHTS_COOKIE, INSIGHTS_COOKIE_MAX_AGE, STATE_COOKIE, googleSessionToken, googleSignIn, siteOrigin } from '@/lib/insights/auth'

// Google's redirect after sign-in: swap the code for the person's verified email, check it is on the
// company domain, then set the session cookie. Failures go back to the sign-in screen with a reason.

const noindex = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' }

export async function GET(req: NextRequest) {
  const origin = siteOrigin(req)
  const back = (error?: string) => {
    const res = NextResponse.redirect(new URL(`/internal-insights${error ? `?signin=${error}` : ''}`, origin), { headers: noindex })
    res.cookies.delete({ name: STATE_COOKIE, path: '/api/internal-insights/google' })
    return res
  }
  const g = await googleSignIn()
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  if (!g) return back()
  if (!code || !state || state !== req.cookies.get(STATE_COOKIE)?.value) return back('failed')

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: g.clientId, client_secret: g.clientSecret, redirect_uri: `${origin}/api/internal-insights/google/callback`, grant_type: 'authorization_code' }),
  })
  const idToken: string | undefined = (await tokenRes.json().catch(() => ({})))?.id_token
  if (!tokenRes.ok || !idToken) return back('failed')

  // The ID token came straight from Google over HTTPS, so its claims can be read without re-checking the signature
  let claims: { aud?: string; email?: string; email_verified?: boolean; hd?: string }
  try {
    claims = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64url').toString('utf8'))
  } catch {
    return back('failed')
  }
  const email = (claims.email || '').toLowerCase()
  if (claims.aud !== g.clientId || !claims.email_verified || claims.hd !== g.allowedDomain || !email.endsWith(`@${g.allowedDomain}`)) {
    return back('denied')
  }

  const token = await googleSessionToken(email)
  if (!token) return back('failed')
  const res = back()
  // Lax so the cookie is sent on this redirect chain, which started on accounts.google.com
  res.cookies.set(INSIGHTS_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: INSIGHTS_COOKIE_MAX_AGE })
  return res
}
