import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

// Who may use the ad mock-up: one person (one email), one site, edit freely.
// After the lead form succeeds, a signed cookie names the email, the site and
// the CRM lead; the page unlocks that site only. Any other site shows the
// "talk to sales" message. Rif, 10 Nov 2026.

export const MOCKUP_COOKIE = 'mw_mockup'
const DAYS = 90

export type MockupGrant = { email: string; siteId: string; siteName: string; leadId: string | null; owner: { name: string; email: string | null } | null; at: number; tester?: boolean }

/** Staff: a tester link or a company email unlocks every site with no lead. */
export const isStaffEmail = (email: string) => /@movingwalls\.com$/i.test(email.trim())
export const testerKeyOk = (key: string | null | undefined) => {
  const want = process.env.MOCKUP_TESTER_KEY
  if (want) return !!key && key === want
  return process.env.NODE_ENV === 'development'
}
export const testerGrant = (email = 'tester@movingwalls.com'): MockupGrant => ({ email, siteId: '*', siteName: 'any site', leadId: null, owner: null, at: Date.now(), tester: true })

const secret = () => process.env.MOCKUP_COOKIE_SECRET || process.env.SANITY_WEBHOOK_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-only-secret' : '')

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function encodeGrant(g: MockupGrant): string {
  const payload = Buffer.from(JSON.stringify(g)).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function decodeGrant(value: string | undefined): MockupGrant | null {
  if (!value || !secret()) return null
  const [payload, sig] = value.split('.')
  if (!payload || !sig) return null
  const want = sign(payload)
  if (want.length !== sig.length || !timingSafeEqual(Buffer.from(want), Buffer.from(sig))) return null
  try {
    const g = JSON.parse(Buffer.from(payload, 'base64url').toString()) as MockupGrant
    if (Date.now() - g.at > DAYS * 86400_000) return null
    return g
  } catch { return null }
}

export async function readGrant(): Promise<MockupGrant | null> {
  const jar = await cookies()
  return decodeGrant(jar.get(MOCKUP_COOKIE)?.value)
}

export function grantCookie(g: MockupGrant) {
  return { name: MOCKUP_COOKIE, value: encodeGrant(g), httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: DAYS * 86400 }
}
