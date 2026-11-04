import 'server-only'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { getInsightsConfig } from './config'

// Sign-in for /internal-insights.
// - With Google sign-in configured (getInsightsConfig().googleOAuth), only Google accounts on the allowed
//   domain (movingwalls.com) get in. The cookie holds "email.expiry.signature", signed with a key derived
//   from the OAuth client secret, so rotating the secret signs everyone out. The password no longer works.
// - Without it, the shared password: the cookie stores a hash of it, so changing it signs everyone out.

export const INSIGHTS_COOKIE = 'mw_insights'
export const INSIGHTS_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 days
/** Short-lived anti-forgery value for the Google sign-in round trip */
export const STATE_COOKIE = 'mw_insights_state'

/** Our public address (the server behind CloudFront doesn't see it), or localhost in development */
export const siteOrigin = (req: { nextUrl: URL }) => (process.env.NODE_ENV === 'production' ? 'https://www.movingwalls.com' : req.nextUrl.origin)

const hash = (s: string) => createHash('sha256').update(`mw-internal-insights:${s}`).digest('hex')
const safeEqual = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b))

export async function googleSignIn() {
  return (await getInsightsConfig()).googleOAuth
}

export async function sessionToken(): Promise<string | null> {
  const pw = (await getInsightsConfig()).password
  return pw ? hash(pw) : null
}

export async function passwordMatches(input: string): Promise<boolean> {
  const pw = (await getInsightsConfig()).password
  if (!pw) return false
  return safeEqual(hash(input), hash(pw))
}

// Google sessions
const sign = (secret: string, payload: string) => createHmac('sha256', `mw-insights-session:${secret}`).update(payload).digest('base64url')

export async function googleSessionToken(email: string): Promise<string | null> {
  const g = await googleSignIn()
  if (!g) return null
  const payload = `${Buffer.from(email.toLowerCase()).toString('base64url')}.${Date.now() + INSIGHTS_COOKIE_MAX_AGE * 1000}`
  return `${payload}.${sign(g.clientSecret, payload)}`
}

/** The signed-in person's email (Google sign-in), '' for a password session, null when signed out */
export async function currentUser(): Promise<string | null> {
  const value = (await cookies()).get(INSIGHTS_COOKIE)?.value
  if (!value) return null
  const g = await googleSignIn()
  if (g) {
    const [email64, exp, sig] = value.split('.')
    if (!email64 || !exp || !sig || Number(exp) < Date.now()) return null
    if (!safeEqual(sig, sign(g.clientSecret, `${email64}.${exp}`))) return null
    const email = Buffer.from(email64, 'base64url').toString('utf8')
    return email.endsWith(`@${g.allowedDomain}`) ? email : null
  }
  const token = await sessionToken()
  return token && safeEqual(value, token) ? '' : null
}

export async function isAuthed(): Promise<boolean> {
  return (await currentUser()) !== null
}

// Simple per-instance throttle: 5 wrong attempts per IP per 15 minutes
const attempts = new Map<string, { count: number; first: number }>()
const WINDOW = 15 * 60 * 1000

export function throttled(ip: string): boolean {
  const a = attempts.get(ip)
  if (!a || Date.now() - a.first > WINDOW) return false
  return a.count >= 5
}

export function recordFailure(ip: string) {
  const a = attempts.get(ip)
  if (!a || Date.now() - a.first > WINDOW) attempts.set(ip, { count: 1, first: Date.now() })
  else a.count++
}

export function clearFailures(ip: string) {
  attempts.delete(ip)
}
