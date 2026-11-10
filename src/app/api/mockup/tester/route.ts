import { NextRequest, NextResponse } from 'next/server'
import { grantCookie, testerGrant, testerKeyOk, MOCKUP_COOKIE } from '@/lib/mockup/access'

// Private tester link for Rif and the team: /api/mockup/tester?key=<MOCKUP_TESTER_KEY>
// unlocks the ad mock-up on every site for this browser, with no form and no
// CRM lead. /api/mockup/tester?off=1 clears it. Open on localhost when no key is set.

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const back = req.nextUrl.searchParams.get('back') || '/locations/malaysia/kuala-lumpur'
  const url = new URL(back, req.nextUrl.origin)
  if (req.nextUrl.searchParams.get('off')) {
    const res = NextResponse.redirect(url)
    res.cookies.set({ name: MOCKUP_COOKIE, value: '', path: '/', maxAge: 0 })
    return res
  }
  if (!testerKeyOk(req.nextUrl.searchParams.get('key'))) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  const res = NextResponse.redirect(url)
  res.cookies.set(grantCookie(testerGrant()))
  return res
}
