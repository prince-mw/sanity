import 'server-only'
import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { getInsightsConfig } from './config'

// Shared-password gate for /internal-insights. The password comes from getInsightsConfig()
// (env or the private Sanity doc); the cookie stores a hash of it, so changing the password
// signs everyone out.

export const INSIGHTS_COOKIE = 'mw_insights'
export const INSIGHTS_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 days

const hash = (s: string) => createHash('sha256').update(`mw-internal-insights:${s}`).digest('hex')

export async function sessionToken(): Promise<string | null> {
  const pw = (await getInsightsConfig()).password
  return pw ? hash(pw) : null
}

export async function passwordMatches(input: string): Promise<boolean> {
  const pw = (await getInsightsConfig()).password
  if (!pw) return false
  const a = Buffer.from(hash(input))
  const b = Buffer.from(hash(pw))
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function isAuthed(): Promise<boolean> {
  const token = await sessionToken()
  if (!token) return false
  const value = (await cookies()).get(INSIGHTS_COOKIE)?.value
  if (!value || value.length !== token.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(token))
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
