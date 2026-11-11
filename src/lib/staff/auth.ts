import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { readProposalGrant } from '@/lib/proposal/access'
import { isStaffEmail } from '@/lib/mockup/access'
import { personByEmail } from './people'

// Staff sign-in for the website's own tools (the proposals dashboard, the
// editor): a magic link to a @movingwalls.com address sets a signed cookie
// (Rif, 11 Nov 2026: no passwords, no accounts). A staff member already
// recognised by the proposal tester grant counts too, so the dashboard works
// on staging before email is set up.

export const STAFF_COOKIE = 'mw_staff'
const DAYS = 30
const LINK_MINUTES = 20

export type Staff = { email: string; name: string; via: 'link' | 'grant' }

const secret = () => process.env.STAFF_COOKIE_SECRET || process.env.MOCKUP_COOKIE_SECRET || process.env.SANITY_WEBHOOK_SECRET || process.env.SANITY_API_TOKEN || (process.env.NODE_ENV === 'development' ? 'dev-only-secret' : '')
const sign = (p: string) => createHmac('sha256', secret()).update(p).digest('base64url')
const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b))

const encode = (kind: 'session' | 'link', email: string, exp: number) => { const p = Buffer.from(JSON.stringify({ kind, email: email.toLowerCase(), exp })).toString('base64url'); return `${p}.${sign(p)}` }
function decode(value: string | undefined, kind: 'session' | 'link'): { email: string } | null {
  if (!value || !secret()) return null
  const [p, s] = value.split('.')
  if (!p || !s || !same(sign(p), s)) return null
  try {
    const j = JSON.parse(Buffer.from(p, 'base64url').toString()) as { kind: string; email: string; exp: number }
    if (j.kind !== kind || typeof j.email !== 'string' || !isStaffEmail(j.email) || j.exp < Date.now()) return null
    return { email: j.email }
  } catch { return null }
}

/** A one-time-style link token for this email (short-lived; anyone with the inbox can use it once it is sent). */
export const loginToken = (email: string) => encode('link', email, Date.now() + LINK_MINUTES * 60_000)
export const verifyLoginToken = (t: string | null | undefined) => decode(t ?? undefined, 'link')

export function staffCookie(email: string) {
  return { name: STAFF_COOKIE, value: encode('session', email, Date.now() + DAYS * 86_400_000), httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: DAYS * 86_400 }
}

const nameFor = (email: string, fallback?: string) => personByEmail(email)?.name ?? fallback ?? email.split('@')[0]

/** The signed-in staff member, from the staff cookie or a staff-email proposal grant. */
export async function readStaff(): Promise<Staff | null> {
  const jar = await cookies()
  const s = decode(jar.get(STAFF_COOKIE)?.value, 'session')
  if (s) return { email: s.email, name: nameFor(s.email), via: 'link' }
  const g = await readProposalGrant()
  if (g && isStaffEmail(g.email)) return { email: g.email.toLowerCase(), name: nameFor(g.email, g.name), via: 'grant' }
  return null
}
