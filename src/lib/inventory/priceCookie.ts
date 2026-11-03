// The signed cookie that unlocks estimated prices after the newsletter sign-up.
// HMAC over the sign-up time, so the cookie can't be forged by hand.

import { createHmac, timingSafeEqual } from 'crypto'

export const PRICE_COOKIE = 'mw_price_ok'
const MAX_AGE_DAYS = 365

const secret = () =>
  process.env.INVENTORY_PRICE_SECRET || process.env.SANITY_PREVIEW_SECRET || 'local-preview-only'

const sign = (v: string) => createHmac('sha256', secret()).update(v).digest('base64url')

export function makePriceCookie(now = Date.now()): string {
  const v = String(now)
  return `${v}.${sign(v)}`
}

export function priceCookieValid(raw: string | undefined, now = Date.now()): boolean {
  if (!raw) return false
  const [v, mac] = raw.split('.')
  if (!v || !mac) return false
  const want = Buffer.from(sign(v)), got = Buffer.from(mac)
  if (want.length !== got.length || !timingSafeEqual(want, got)) return false
  const at = Number(v)
  return Number.isFinite(at) && now - at < MAX_AGE_DAYS * 86_400_000
}

export const PRICE_COOKIE_MAX_AGE = MAX_AGE_DAYS * 86_400
