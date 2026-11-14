import { NextRequest, NextResponse } from 'next/server'
import { readStaff } from '@/lib/staff/auth'
import { staffSites } from '@/lib/inventory/staffInventory'
import { CORRECTABLE } from '@/lib/inventory/correctionsCore'

// CSV for the onboarding team (Rif, 14 Nov 2026: fix the source, so our
// corrections shrink over time). kind=corrections: every staff correction that
// the API doesn't have yet. kind=issues: every open hygiene issue per site.
// Staff only. Never carries media owners or prices.

export const runtime = 'nodejs'

const cell = (v: unknown) => { const s = v == null ? '' : String(v); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s }
const csv = (rows: unknown[][]) => '﻿' + rows.map(r => r.map(cell).join(',')).join('\r\n')

export async function GET(req: NextRequest) {
  if (!(await readStaff())) return new NextResponse('Staff only', { status: 401 })
  const q = req.nextUrl.searchParams
  const country = q.get('country') ?? '', kind = q.get('kind') === 'issues' ? 'issues' : 'corrections'
  if (!/^[a-z0-9-]+$/.test(country)) return new NextResponse('Bad country', { status: 400 })
  const { sites, corrections } = await staffSites(country)
  const byId = new Map(sites.map(s => [s.raw.id, s]))
  const rows: unknown[][] = kind === 'corrections'
    ? [['status', 'referenceId', 'siteId', 'site name', 'field', 'API value', 'correct value', 'reason', 'corrected by', 'corrected at'],
       ...corrections.filter(c => c.status !== 'fixed-at-source').map(c => [c.status, byId.get(c.siteId)?.raw.referenceId ?? '', c.siteId, c.siteName, CORRECTABLE[c.field].label, c.apiValue ?? '', c.value, c.reason, c.byName, c.at.slice(0, 10)])]
    : [['severity', 'issue', 'referenceId', 'siteId', 'site name', 'stored state', 'map point state', 'address'],
       ...sites.flatMap(s => s.issues.filter(i => i.onboarding).map(i => [i.severity, i.label, s.raw.referenceId ?? '', s.raw.id, s.raw.name, s.raw.adminLevel1Name ?? '', s.raw.resolved?.adminLevel1Name ?? '', s.raw.address ?? '']))]
  const name = `${country}-${kind}-${new Date().toISOString().slice(0, 10)}.csv`
  return new NextResponse(csv(rows), { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="${name}"`, 'cache-control': 'no-store' } })
}
