import { NextRequest, NextResponse } from 'next/server'
import { readProposalGrant, decodeProposalGrant, PROPOSAL_COOKIE } from '@/lib/proposal/access'

// Is this visitor registered for instant proposals, and which ones are theirs?
//   GET /api/proposals/access → { state: 'none' | 'registered', name?, company?, proposals: string[] }
// `diag` says why a cookie did not count (nothing secret in it): whether the
// request carried it, by which API it was visible, and whether a signing key exists.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const viaHeaders = await readProposalGrant()
  const raw = req.cookies.get(PROPOSAL_COOKIE)?.value
  const viaRequest = decodeProposalGrant(raw)
  const g = viaHeaders ?? viaRequest
  const diag = { headerApi: !!viaHeaders, requestApi: !!viaRequest, cookieSent: !!raw, cookieHeader: (req.headers.get('cookie') ?? '').includes(PROPOSAL_COOKIE), secretSet: !!(process.env.PROPOSAL_COOKIE_SECRET || process.env.MOCKUP_COOKIE_SECRET || process.env.SANITY_WEBHOOK_SECRET || process.env.SANITY_API_TOKEN) }
  if (!g) return NextResponse.json({ state: 'none', proposals: [], diag })
  return NextResponse.json({ state: 'registered', name: g.name, company: g.company, tester: !!g.tester, proposals: g.proposals, diag })
}
