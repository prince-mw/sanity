import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { isStaffEmail } from '@/lib/mockup/access'

// Who may build and edit proposals: after the registration form succeeds, a
// signed cookie names the person, their CRM lead and the proposals they
// created (by shareId). Same shape as the ad mock-up grant. Rif, 11 Nov 2026.

export const PROPOSAL_COOKIE = 'mw_proposal'
const DAYS = 90

export type ProposalGrant = {
  email: string; name: string; company: string; country: string
  leadId: string | null; owner: { name: string; email: string | null } | null
  proposals: string[]; at: number; tester?: boolean
}

export { isStaffEmail }
export const testerProposalGrant = (email = 'tester@movingwalls.com'): ProposalGrant =>
  ({ email, name: 'Moving Walls tester', company: 'Moving Walls', country: 'Malaysia', leadId: null, owner: null, proposals: [], at: Date.now(), tester: true })

// Signing key: the dedicated secret, else any server-only secret the build always has
// (staging once shipped with none set, so every grant failed to decode and the
// registration form reopened on each submit, 11 Nov 2026).
const secret = () => process.env.PROPOSAL_COOKIE_SECRET || process.env.MOCKUP_COOKIE_SECRET || process.env.SANITY_WEBHOOK_SECRET || process.env.SANITY_API_TOKEN || (process.env.NODE_ENV === 'development' ? 'dev-only-secret' : '')

const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url')

export function encodeProposalGrant(g: ProposalGrant): string {
  const payload = Buffer.from(JSON.stringify(g)).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function decodeProposalGrant(value: string | undefined): ProposalGrant | null {
  if (!value || !secret()) return null
  const [payload, sig] = value.split('.')
  if (!payload || !sig) return null
  const want = sign(payload)
  if (want.length !== sig.length || !timingSafeEqual(Buffer.from(want), Buffer.from(sig))) return null
  try {
    const g = JSON.parse(Buffer.from(payload, 'base64url').toString()) as ProposalGrant
    if (Date.now() - g.at > DAYS * 86400_000) return null
    if (!Array.isArray(g.proposals)) g.proposals = []
    return g
  } catch { return null }
}

export async function readProposalGrant(): Promise<ProposalGrant | null> {
  const jar = await cookies()
  return decodeProposalGrant(jar.get(PROPOSAL_COOKIE)?.value)
}

/** The same grant with one more proposal it may edit (and a fresh timestamp). */
export const withProposal = (g: ProposalGrant, shareId: string): ProposalGrant =>
  ({ ...g, proposals: Array.from(new Set([...g.proposals, shareId])).slice(-50), at: Date.now() })

export const canEdit = (g: ProposalGrant | null, shareId: string) => !!g && (g.tester === true || g.proposals.includes(shareId))

export function proposalCookie(g: ProposalGrant) {
  return { name: PROPOSAL_COOKIE, value: encodeProposalGrant(g), httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: DAYS * 86400 }
}
