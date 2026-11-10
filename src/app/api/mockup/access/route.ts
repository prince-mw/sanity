import { NextRequest, NextResponse } from 'next/server'
import { readGrant } from '@/lib/mockup/access'

// Does this visitor have the mock-up unlocked, and for which site?
//   GET /api/mockup/access?site=<siteId>
//   → { state: 'none' | 'this' | 'other', siteName?, owner? }

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const siteId = req.nextUrl.searchParams.get('site') ?? ''
  const g = await readGrant()
  if (!g) return NextResponse.json({ state: 'none' })
  if (g.tester) return NextResponse.json({ state: 'this', tester: true, siteName: g.siteName, owner: null, email: g.email })
  if (g.siteId === siteId) return NextResponse.json({ state: 'this', siteName: g.siteName, owner: g.owner, email: g.email })
  return NextResponse.json({ state: 'other', siteName: g.siteName, owner: g.owner })
}
