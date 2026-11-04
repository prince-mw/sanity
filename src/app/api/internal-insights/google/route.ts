import { randomBytes } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { STATE_COOKIE, googleSignIn, siteOrigin } from '@/lib/insights/auth'

// GET → sends the browser to Google's sign-in, limited to the company's Google Workspace domain.
// Google returns to ./callback, which must be listed as a redirect URI on the OAuth client.

const noindex = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' }

export async function GET(req: NextRequest) {
  const g = await googleSignIn()
  if (!g) return NextResponse.redirect(new URL('/internal-insights', siteOrigin(req)), { headers: noindex })
  const state = randomBytes(16).toString('hex')
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.search = new URLSearchParams({
    client_id: g.clientId,
    redirect_uri: `${siteOrigin(req)}/api/internal-insights/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    hd: g.allowedDomain,
    prompt: 'select_account',
    state,
  }).toString()
  const res = NextResponse.redirect(url, { headers: noindex })
  // Lax, not Strict: the cookie must come back on Google's redirect to the callback
  res.cookies.set(STATE_COOKIE, state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/api/internal-insights/google', maxAge: 10 * 60 })
  return res
}
