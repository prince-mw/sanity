import { NextRequest, NextResponse } from 'next/server'
import { getProposalByShareId, hashToken } from '@/lib/proposal/store'
import { readProposalGrant, proposalCookie, withProposal } from '@/lib/proposal/access'

// The edit link carries the token once: /proposals/<id>/edit?t=<token> sends
// the browser here, the cookie remembers the proposal, and the token leaves
// the URL. A wrong token lands on the public page.
//   GET /api/proposals/<shareId>/claim?t=<token>

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params
  const t = req.nextUrl.searchParams.get('t') ?? ''
  const doc = await getProposalByShareId(shareId)
  const base = req.nextUrl.origin
  if (!doc) return NextResponse.redirect(`${base}/proposals/${shareId}`, 302)
  if (!t || hashToken(t) !== doc.editTokenHash) return NextResponse.redirect(`${base}/proposals/${shareId}`, 302)
  const g = (await readProposalGrant())
    ?? { email: doc.creator.email, name: doc.creator.name, company: doc.creator.company, country: doc.creator.country, leadId: doc.leadId, owner: null, proposals: [], at: Date.now() }
  const res = NextResponse.redirect(`${base}/proposals/${shareId}/edit`, 302)
  res.cookies.set(proposalCookie(withProposal(g, shareId)))
  return res
}
