import { NextResponse } from 'next/server'
import { readProposalGrant } from '@/lib/proposal/access'

// Is this visitor registered for instant proposals, and which ones are theirs?
//   GET /api/proposals/access → { state: 'none' | 'registered', name?, company?, proposals: string[] }

export const dynamic = 'force-dynamic'

export async function GET() {
  const g = await readProposalGrant()
  if (!g) return NextResponse.json({ state: 'none', proposals: [] })
  return NextResponse.json({ state: 'registered', name: g.name, company: g.company, tester: !!g.tester, proposals: g.proposals })
}
