import 'server-only'
import { createSign } from 'node:crypto'
import { getInsightsConfig } from './config'

// Read-only access to GA4 and Search Console through the "website-insights" service account.
// Credentials come from getInsightsConfig() (env or the private Sanity doc) and never leave the server.

const SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly',
].join(' ')

let cachedToken: { token: string; expires: number } | null = null

async function serviceAccount(): Promise<{ client_email: string; private_key: string }> {
  const sa = (await getInsightsConfig()).serviceAccount
  if (!sa) throw new Error('Google service account is not configured')
  return sa
}

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expires > Date.now() + 60_000) return cachedToken.token
  const sa = await serviceAccount()
  const b64u = (o: unknown) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url')
  const now = Math.floor(Date.now() / 1000)
  const unsigned = `${b64u({ alg: 'RS256', typ: 'JWT' })}.${b64u({
    iss: sa.client_email,
    scope: SCOPES,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`
  const signature = createSign('RSA-SHA256').update(unsigned).sign(sa.private_key).toString('base64url')
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${unsigned}.${signature}`,
    cache: 'no-store',
  })
  const json = await res.json()
  if (!json.access_token) throw new Error(`Google auth failed: ${JSON.stringify(json)}`)
  cachedToken = { token: json.access_token, expires: Date.now() + json.expires_in * 1000 }
  return cachedToken.token
}

export type DateRange = { startDate: string; endDate: string }

/** GA4 runReport → rows as { dims: string[], mets: number[] } */
export async function ga4Report(body: Record<string, unknown>): Promise<{ dims: string[]; mets: number[] }[]> {
  const property = (await getInsightsConfig()).ga4PropertyId
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
    method: 'POST',
    headers: { authorization: `Bearer ${await accessToken()}`, 'content-type': 'application/json' },
    body: JSON.stringify({ limit: 10000, ...body }),
    cache: 'no-store',
  })
  const json = await res.json()
  if (json.error) throw new Error(`GA4: ${json.error.message}`)
  return (json.rows || []).map((r: { dimensionValues?: { value: string }[]; metricValues: { value: string }[] }) => ({
    dims: (r.dimensionValues || []).map((d) => d.value),
    mets: r.metricValues.map((m) => Number(m.value)),
  }))
}

export type GscRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }

export async function gscQuery(body: Record<string, unknown>): Promise<GscRow[]> {
  const site = encodeURIComponent((await getInsightsConfig()).gscSiteUrl)
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
    method: 'POST',
    headers: { authorization: `Bearer ${await accessToken()}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  const json = await res.json()
  if (json.error) throw new Error(`Search Console: ${json.error.message}`)
  return json.rows || []
}

export const isInsightsConfigured = async () => !!(await getInsightsConfig()).serviceAccount
