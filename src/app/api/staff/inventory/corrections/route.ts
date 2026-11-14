import { NextRequest, NextResponse } from 'next/server'
import { readStaff } from '@/lib/staff/auth'
import { countrySnapshot } from '@/lib/inventory/snapshot'
import { saveCorrection, removeCorrection } from '@/lib/inventory/corrections'
import { apiValueOf, isField, parseValue, CORRECTABLE } from '@/lib/inventory/correctionsCore'

// Save or remove one staff correction (form post from /staff/inventory/site).
// Staff only. The page posts a plain form, so this answers with a redirect back.

export const runtime = 'nodejs'

/** Where the API's own resolver puts a corrected map point, so the site lands in the right place. */
async function resolvePoint(value: string) {
  const base = process.env.INVENTORY_API_URL || 'https://inventory-api-prd.movingwalls.com/api/v1', key = process.env.INVENTORY_API_KEY
  if (!key) return undefined
  const [lat, lng] = value.split(',').map(s => s.trim())
  try {
    const r = await fetch(`${base.replace(/\/+$/, '')}/locations/resolve?lat=${lat}&lng=${lng}`, { headers: { Authorization: `ApiKey ${key}` }, signal: AbortSignal.timeout(20_000) })
    if (!r.ok) return undefined
    const j = await r.json()
    return { adminLevel0Name: j.adminLevel0Name ?? null, adminLevel1Name: j.adminLevel1Name ?? null, adminLevel2Name: j.adminLevel2Name ?? null, adminLevel3Name: j.adminLevel3Name ?? null }
  } catch { return undefined }
}

export async function POST(req: NextRequest) {
  const staff = await readStaff()
  if (!staff) return NextResponse.redirect(new URL('/staff/login?back=/staff/inventory', req.url), 303)
  const f = await req.formData()
  const country = String(f.get('country') ?? ''), siteId = String(f.get('siteId') ?? ''), field = String(f.get('field') ?? '')
  const back = new URL(`/staff/inventory/site?country=${encodeURIComponent(country)}&id=${encodeURIComponent(siteId)}`, req.url)
  const fail = (msg: string) => { back.searchParams.set('error', `${field}:${msg}`); return NextResponse.redirect(back, 303) }
  if (!/^[a-z0-9-]+$/.test(country) || !isField(field)) return fail('Unknown field.')
  const record = countrySnapshot(country)?.records.find(r => r.id === siteId)
  if (!record) return fail('That site is not in the latest pull.')

  // The buttons are named "op", not "action": a form control named "action" hides form.action, which the site's Zoho script reads.
  if (f.get('op') === 'remove') {
    await removeCorrection(country, siteId, field)
    back.searchParams.set('saved', `${field}:removed`)
    return NextResponse.redirect(back, 303)
  }
  const parsed = parseValue(field, String(f.get('value') ?? ''))
  if ('error' in parsed) return fail(parsed.error)
  const reason = String(f.get('reason') ?? '').trim().slice(0, 300)
  if (!reason) return fail('Say briefly why (e.g. "address and map point are in Pahang").')
  await saveCorrection({
    siteId, country, field, value: parsed.value, apiValue: apiValueOf(record, field), reason,
    by: staff.email, byName: staff.name, at: new Date().toISOString(),
    ...(field === 'point' ? { resolved: await resolvePoint(parsed.value) } : {}),
  })
  back.searchParams.set('saved', `${field}:${CORRECTABLE[field].label}`)
  return NextResponse.redirect(back, 303)
}
