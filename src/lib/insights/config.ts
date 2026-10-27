import 'server-only'

// Where the dashboard's settings come from, in order:
// 1. Environment variables (INSIGHTS_PASSWORD, GOOGLE_SA_KEY_B64, GA4_PROPERTY_ID, GSC_SITE_URL)
// 2. The private Sanity document `secrets.internalInsights`. Documents whose _id contains a dot
//    are not readable by the public API; the server reads it with its existing Sanity token.

export interface InsightsConfig {
  password: string | null
  ga4PropertyId: string
  gscSiteUrl: string
  serviceAccount: { client_email: string; private_key: string } | null
}

let cached: { value: InsightsConfig; at: number } | null = null
const TTL = 10 * 60 * 1000

async function fromSanity(): Promise<Partial<InsightsConfig>> {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) return {}
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const query = encodeURIComponent('*[_id == "secrets.internalInsights"][0]{password, ga4PropertyId, gscSiteUrl, googleServiceAccount}')
  try {
    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`, {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    const doc = (await res.json())?.result
    if (!doc) return {}
    return {
      password: doc.password || null,
      ga4PropertyId: doc.ga4PropertyId,
      gscSiteUrl: doc.gscSiteUrl,
      serviceAccount: doc.googleServiceAccount ? JSON.parse(doc.googleServiceAccount) : null,
    }
  } catch {
    return {}
  }
}

export async function getInsightsConfig(): Promise<InsightsConfig> {
  if (cached && Date.now() - cached.at < TTL) return cached.value
  const envSa = process.env.GOOGLE_SA_KEY_B64
  const env: Partial<InsightsConfig> = {
    password: process.env.INSIGHTS_PASSWORD || null,
    ga4PropertyId: process.env.GA4_PROPERTY_ID,
    gscSiteUrl: process.env.GSC_SITE_URL,
    serviceAccount: envSa ? JSON.parse(Buffer.from(envSa, 'base64').toString('utf8')) : null,
  }
  const needSanity = !env.password || !env.serviceAccount
  const sanity = needSanity ? await fromSanity() : {}
  const value: InsightsConfig = {
    password: env.password || sanity.password || null,
    ga4PropertyId: env.ga4PropertyId || sanity.ga4PropertyId || '342007847',
    gscSiteUrl: env.gscSiteUrl || sanity.gscSiteUrl || 'https://www.movingwalls.com/',
    serviceAccount: env.serviceAccount || sanity.serviceAccount || null,
  }
  cached = { value, at: Date.now() }
  return value
}

export interface SemrushSnapshot {
  snapshotDate: string
  rows: { page: string; keyword: string; database: string; position: number; volume: number }[]
}

/** Monthly Semrush snapshot, stored in the private Sanity doc `secrets.internalInsightsSemrush` */
export async function getSemrushSnapshot(): Promise<SemrushSnapshot | null> {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) return null
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const query = encodeURIComponent('*[_id == "secrets.internalInsightsSemrush"][0]{snapshotDate, rows[]{page, keyword, database, position, volume}}')
  try {
    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`, {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    return (await res.json())?.result || null
  } catch {
    return null
  }
}
