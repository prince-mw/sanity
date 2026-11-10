import 'server-only'

// Zoho CRM, server side only: creates a Lead from the website's own form and
// attaches the ad mock-up to it. Auth is a "self client" refresh token (made
// once at api-console.zoho.com with scope ZohoCRM.modules.leads.CREATE and
// ZohoCRM.modules.attachments.CREATE); the access token is refreshed here and
// kept in memory. Nothing in this file reaches the browser.
//
// Env (Amplify, staging first): ZOHO_CRM_CLIENT_ID, ZOHO_CRM_CLIENT_SECRET,
// ZOHO_CRM_REFRESH_TOKEN, optional ZOHO_ACCOUNTS_URL / ZOHO_API_URL for a
// non-US data centre (e.g. https://accounts.zoho.in, https://www.zohoapis.in).

const ACCOUNTS = (process.env.ZOHO_ACCOUNTS_URL ?? 'https://accounts.zoho.com').replace(/\/$/, '')
const API = (process.env.ZOHO_API_URL ?? 'https://www.zohoapis.com').replace(/\/$/, '')

export const crmConfigured = () =>
  !!(process.env.ZOHO_CRM_CLIENT_ID && process.env.ZOHO_CRM_CLIENT_SECRET && process.env.ZOHO_CRM_REFRESH_TOKEN)

let cached: { token: string; until: number } | null = null

async function accessToken(): Promise<string> {
  if (cached && cached.until > Date.now() + 60_000) return cached.token
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: process.env.ZOHO_CRM_CLIENT_ID!,
    client_secret: process.env.ZOHO_CRM_CLIENT_SECRET!,
    refresh_token: process.env.ZOHO_CRM_REFRESH_TOKEN!,
  })
  const r = await fetch(`${ACCOUNTS}/oauth/v2/token`, { method: 'POST', body, cache: 'no-store' })
  const j = await r.json().catch(() => ({}))
  if (!r.ok || !j.access_token) throw new Error(`Zoho token refresh failed: ${j.error ?? r.status}`)
  cached = { token: j.access_token, until: Date.now() + (Number(j.expires_in) || 3600) * 1000 }
  return cached.token
}

export type LeadInput = {
  name: string; email: string; company?: string; country?: string; phone?: string
  description: string
  pageUrl?: string
  utm?: Partial<Record<'source' | 'medium' | 'campaign' | 'term' | 'content' | 'gclid' | 'fbclid', string>>
}

/** Creates the lead. Returns the Zoho record id. */
export async function createLead(input: LeadInput): Promise<string> {
  const [first, ...rest] = input.name.trim().split(/\s+/)
  const last = rest.join(' ') || first // Last_Name is mandatory in this CRM
  const record: Record<string, unknown> = {
    First_Name: rest.length ? first : undefined,
    Last_Name: last,
    Email: input.email,
    Company: input.company || undefined,
    Phone: input.phone || undefined,
    Lead_Source: 'Website / Webform',
    Lead_Status: 'New Lead',
    Description: input.description,
    First_Visited_URL: input.pageUrl,
    UTM_Source: input.utm?.source, UTM_Medium: input.utm?.medium, UTM_Term: input.utm?.term,
    UTM_Content: input.utm?.content, UTM_GCLID: input.utm?.gclid, UTM_FBCLID: input.utm?.fbclid,
    Country1: input.country || undefined,
  }
  const post = async (data: Record<string, unknown>) => {
    const r = await fetch(`${API}/crm/v8/Leads`, {
      method: 'POST', cache: 'no-store',
      headers: { Authorization: `Zoho-oauthtoken ${await accessToken()}`, 'content-type': 'application/json' },
      body: JSON.stringify({ data: [data] }),
    })
    return { ok: r.ok, json: await r.json().catch(() => ({})) }
  }
  let res = await post(record)
  // Country1 is a picklist: an unknown spelling is rejected, so try once without it.
  if (!res.ok || res.json?.data?.[0]?.code !== 'SUCCESS') {
    const { Country1, ...without } = record
    res = await post({ ...without, Description: `${input.description}\nCountry (as typed): ${Country1 ?? '-'}` })
  }
  const row = res.json?.data?.[0]
  if (!res.ok || row?.code !== 'SUCCESS') throw new Error(`Zoho lead create failed: ${JSON.stringify(row ?? res.json).slice(0, 300)}`)
  return String(row.details.id)
}

/** Attaches a file (e.g. the mock-up PNG) to the lead. */
export async function attachToLead(leadId: string, file: { name: string; type: string; bytes: Uint8Array }): Promise<void> {
  const fd = new FormData()
  fd.append('file', new Blob([Buffer.from(file.bytes)], { type: file.type }), file.name)
  const r = await fetch(`${API}/crm/v8/Leads/${leadId}/Attachments`, {
    method: 'POST', cache: 'no-store',
    headers: { Authorization: `Zoho-oauthtoken ${await accessToken()}` },
    body: fd,
  })
  if (!r.ok) throw new Error(`Zoho attachment failed: ${r.status}`)
}
