import 'server-only'
import { getInsightsConfig, type ZohoAnalyticsConfig as ZohoConfig } from './config'

// Read-only access to Zoho Analytics (scope ZohoAnalytics.data.read + metadata.read) through a
// Self Client refresh token. Credentials come from getInsightsConfig() (env ZOHO_ANALYTICS_* or the
// private Sanity doc) and never leave the server.

const ACCOUNTS = 'https://accounts.zoho.com/oauth/v2/token'
const API = 'https://analyticsapi.zoho.com/restapi/v2'

async function zohoConfig(): Promise<ZohoConfig | null> {
  const c = (await getInsightsConfig()).zohoAnalytics
  return c && Object.values(c).every(Boolean) ? c : null
}

export const isZohoConfigured = async () => !!(await zohoConfig())

// Zoho allows only ~10 token refreshes per 10 minutes, so reuse the hour-long access token.
// Kept on globalThis so dev hot-reloads don't discard it.
// Concurrent callers share one in-flight refresh.
const tokenCache = globalThis as unknown as { __zohoToken?: { token: string; expires: number }; __zohoTokenPending?: Promise<string> }

async function refreshAccessToken(c: ZohoConfig): Promise<string> {
  const params = new URLSearchParams({ refresh_token: c.refreshToken, client_id: c.clientId, client_secret: c.clientSecret, grant_type: 'refresh_token' })
  const json = await (await fetch(`${ACCOUNTS}?${params}`, { method: 'POST', cache: 'no-store' })).json()
  if (!json.access_token) throw new Error(`Zoho auth failed: ${json.error || 'no token'}`)
  tokenCache.__zohoToken = { token: json.access_token, expires: Date.now() + json.expires_in * 1000 }
  return json.access_token
}

async function accessToken(c: ZohoConfig): Promise<string> {
  const cached = tokenCache.__zohoToken
  if (cached && cached.expires > Date.now() + 60_000) return cached.token
  tokenCache.__zohoTokenPending ??= refreshAccessToken(c).finally(() => { tokenCache.__zohoTokenPending = undefined })
  return tokenCache.__zohoTokenPending
}

/**
 * Export a table's rows (synchronous export: plain tables only, not query tables).
 * `criteria` is Zoho's SQL-like filter, applied server-side (e.g. `"Date" >= '2026-10-01'`).
 */
export async function zohoTableRows(viewId: string, opts: { criteria?: string; columns?: string[] } = {}): Promise<Record<string, string>[]> {
  const c = await zohoConfig()
  if (!c) throw new Error('Zoho Analytics is not configured')
  const config = encodeURIComponent(JSON.stringify({
    responseFormat: 'json',
    ...(opts.criteria ? { criteria: opts.criteria } : {}),
    ...(opts.columns ? { selectedColumns: opts.columns } : {}),
  }))
  const res = await fetch(`${API}/workspaces/${c.workspaceId}/views/${viewId}/data?CONFIG=${config}`, {
    headers: { Authorization: `Zoho-oauthtoken ${await accessToken(c)}`, 'ZANALYTICS-ORGID': c.orgId },
    cache: 'no-store',
  })
  // Success is { data: [rows] } (no status field); failures are { status: 'failure', data: { errorMessage } }
  const json = await res.json()
  if (!Array.isArray(json.data)) throw new Error(`Zoho export failed: ${json.data?.errorMessage || json.summary || res.status}`)
  return json.data
}
