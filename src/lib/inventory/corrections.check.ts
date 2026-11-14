// Checks for staff corrections. Run: npx -y tsx src/lib/inventory/corrections.check.ts
import { applyCorrections, statusOf, parseValue, apiValueOf, sameValue, type Correction } from './correctionsCore'
import type { InventoryRecord } from './types'

let bad = 0
const check = (ok: boolean, m: string) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${m}`); if (!ok) bad++ }
const site: InventoryRecord = { id: 's1', name: 'Jln Tanjung Lumpur', address: 'Jalan Tanjung Lumpur, 26060 Balok, Pahang', adminLevel0Name: 'Malaysia', adminLevel1Name: 'Kuala Lumpur', adminLevel2Name: 'Kuala Lumpur', geoms: ['POINT(103.337646 3.798792)'], panels: [{ physicalWidth: 40, physicalHeight: 60 }] }
const c = (field: Correction['field'], value: string, apiValue: string | null): Correction => ({ _id: `x.${field}`, siteId: 's1', country: 'malaysia', field, value, apiValue, reason: 'test', by: 'a@movingwalls.com', byName: 'A', at: '2026-11-14T00:00:00Z' })

const state = c('state', 'Pahang', 'Kuala Lumpur')
check(statusOf(state, site) === 'active', 'a correction is in use while the API still says what it said')
check(statusOf(state, { ...site, adminLevel1Name: 'Pahang' }) === 'fixed-at-source', 'when the API now says what staff said, the correction retires itself')
check(statusOf(state, { ...site, adminLevel1Name: 'Selangor' }) === 'conflict', 'when the API changes to a third value, the site goes to review')
const applied = applyCorrections(site, [state, c('size', '4 x 6', '40 x 60'), c('name', 'Tanjung Lumpur Roadside', 'Jln Tanjung Lumpur')])
check(applied.adminLevel1Name === 'Pahang' && applied.placeLocked === true, 'a corrected state is used and locks the place')
check(applied.panels?.[0]?.physicalWidth === 4 && applied.name === 'Tanjung Lumpur Roadside', 'size and name corrections are used')
check(applied.address === site.address && applied.geoms?.[0] === site.geoms?.[0], 'fields nobody corrected keep the API value')
check(applyCorrections({ ...site, adminLevel1Name: 'Pahang' }, [state]).placeLocked !== true, 'a retired correction is not applied')
check(applyCorrections(site, [c('hidden', 'yes', 'no')]).hiddenByStaff === true, 'a site staff hid is marked hidden')
const pt = applyCorrections(site, [{ ...c('point', '3.80, 103.34', null), resolved: { adminLevel1Name: 'Pahang' } }])
check(pt.geoms?.[0] === 'POINT(103.34 3.8)' && pt.resolved?.adminLevel1Name === 'Pahang', 'a corrected map point carries where it resolves')
check('value' in parseValue('point', '3.79, 103.3') && 'error' in parseValue('point', '103.3, 3.79') && 'error' in parseValue('point', 'abc'), 'map points are checked, latitude first')
check('error' in parseValue('size', '1920 x 1080') && 'value' in parseValue('size', '12 x 6'), 'sizes over 100 m are refused')
check('error' in parseValue('facing', 'north') && 'value' in parseValue('facing', 'NE'), 'facing must be a compass point')
check(apiValueOf(site, 'point') === '3.798792, 103.337646' && sameValue('3.798792, 103.337646', '3.798792,103.33764600'), 'points compare regardless of formatting')
console.log(bad ? `\n${bad} FAILED` : '\nall passed')
process.exit(bad ? 1 : 0)
