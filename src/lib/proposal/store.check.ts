// Checks for the proposal helpers. No test runner in this repo, so run directly:
//   npx -y tsx src/lib/proposal/store.check.ts
// (store.ts is server-only; the pure helpers are re-implemented here from the
// same source so the check needs no Next.js runtime.)
import { createHash } from 'node:crypto'
import { OBJECTIVES, BUDGET_BANDS, targetSitesFor, marketFor } from './markets'
import type { Brief } from './types'

let bad = 0
const check = (ok: boolean, m: string) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${m}`); if (!ok) bad++ }

// mirrors store.ts
const hashToken = (t: string) => createHash('sha256').update(t).digest('hex')
const parseFigure = (s: string | null | undefined): number | null => { if (!s) return null; const n = Number(String(s).replace(/\D/g, '')); return Number.isFinite(n) && n > 0 ? n : null }
const fmtDate = (iso: string | null) => { if (!iso) return null; const d = new Date(`${iso}T00:00:00Z`); return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) }
const titleLineFor = (brief: Brief) => { const obj = OBJECTIVES.find(o => o.id === brief.objective)?.label; const start = fmtDate(brief.startDate); return [obj ? `${obj} campaign` : 'OOH campaign', brief.cityName, start ? `from ${start}` : null].filter(Boolean).join(' · ') }

const brief: Brief = { countrySlug: 'malaysia', citySlug: 'kuala-lumpur', cityName: 'Kuala Lumpur', startDate: '2027-01-12', durationWeeks: 4, objective: 'launch', audience: '', industry: '', budgetBand: 'mid', formats: [], targetSites: 5 }

check(hashToken('abc').length === 64 && hashToken('abc') === hashToken('abc') && hashToken('abc') !== hashToken('abd'), 'edit token hash is a stable 64-char sha256')
check(parseFigure('182,669') === 182669, 'a display figure "182,669" parses to 182669')
check(parseFigure('1.2M views') === 12, 'parseFigure only strips non-digits (no unit scaling): keep display strings as the API sends them')
check(parseFigure(undefined) === null && parseFigure('') === null && parseFigure('n/a') === null, 'no figure gives null')
check(titleLineFor(brief) === 'Launch campaign · Kuala Lumpur · from 12 Jan 2027', `title line: ${titleLineFor(brief)}`)
check(titleLineFor({ ...brief, objective: null, startDate: null }) === 'OOH campaign · Kuala Lumpur', 'title line without objective or date')
check(targetSitesFor('low') === 3 && targetSitesFor('high') === 8 && targetSitesFor(null) === 5, 'budget bands size the list: 3 / 5 / 8')
check(BUDGET_BANDS.every(b => !/\d{2,}/.test(b.id)), 'budget band ids carry no amounts (ids may reach logs)')
check(marketFor('malaysia', 'kuala-lumpur')?.city.name === 'Kuala Lumpur' && marketFor('malaysia', 'penang') === null, 'only markets with inventory resolve')

console.log(bad ? `\n${bad} FAILED` : '\nall passed')
