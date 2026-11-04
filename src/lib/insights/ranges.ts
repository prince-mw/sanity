// Date range options for /internal-insights (shared by server and client code)
export type PresetRange = 'this-week' | 'last-week' | 'this-month' | 'last-month' | 'this-year' | 'last-year'
/** A preset, or custom dates as "YYYY-MM-DD_YYYY-MM-DD" (also the cache key, so each custom period is cached on its own) */
export type RangeKey = PresetRange | `${string}_${string}`

export const RANGE_KEYS: PresetRange[] = ['this-week', 'last-week', 'this-month', 'last-month', 'this-year', 'last-year']

export const RANGE_LABELS: Record<PresetRange, string> = {
  'this-week': 'This week',
  'last-week': 'Last week',
  'this-month': 'This month',
  'last-month': 'Last month',
  'this-year': 'This year',
  'last-year': 'Last year',
}

export const DEFAULT_RANGE: RangeKey = 'this-month'

/** Earliest date the custom picker allows (GA4 / Zoho data starts around then) */
export const CUSTOM_MIN = '2023-01-01'
const DAY = /^\d{4}-\d{2}-\d{2}$/

export const customRange = (start: string, end: string): RangeKey => `${start}_${end}`

/** The dates of a custom range, or null for a preset */
export function customDates(range: string): { start: string; end: string } | null {
  const [start, end] = range.split('_')
  return DAY.test(start || '') && DAY.test(end || '') ? { start, end } : null
}

/** The range from the URL: a preset, or valid custom dates (real days, in order, from CUSTOM_MIN to today) */
export function parseRange(value: string | undefined): RangeKey {
  if (RANGE_KEYS.includes(value as PresetRange)) return value as PresetRange
  const c = customDates(value || '')
  if (!c) return DEFAULT_RANGE
  const real = (d: string) => !isNaN(Date.parse(d)) && new Date(d).toISOString().slice(0, 10) === d
  const today = new Date().toISOString().slice(0, 10)
  return real(c.start) && real(c.end) && c.start <= c.end && c.start >= CUSTOM_MIN && c.end <= today ? customRange(c.start, c.end) : DEFAULT_RANGE
}

/** True when the range is long enough to chart by month rather than by day */
export const isLongRange = (range: RangeKey) => {
  const c = customDates(range)
  return c ? dayCount(new Date(c.start), new Date(c.end)) > 92 : range === 'this-year' || range === 'last-year'
}

const iso = (d: Date) => d.toISOString().slice(0, 10)
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d))
const addDays = (d: Date, n: number) => utc(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n)
const dayCount = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000) + 1

/** Custom dates vs the same number of days just before them */
function customPeriods(c: { start: string; end: string }) {
  const start = new Date(`${c.start}T00:00:00Z`)
  const end = new Date(`${c.end}T00:00:00Z`)
  const days = dayCount(start, end)
  return { start: c.start, end: c.end, prevStart: iso(addDays(start, -days)), prevEnd: iso(addDays(start, -1)), days }
}

/** Current and comparison periods. "This …" ranges run to yesterday (today is incomplete). */
export function periods(range: RangeKey) {
  const custom = customDates(range)
  if (custom) return customPeriods(custom)
  const now = new Date()
  const today = utc(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const yesterday = addDays(today, -1)
  const toDate = (start: Date) => (yesterday < start ? start : yesterday)
  const out = (start: Date, end: Date, prevStart: Date, prevEnd: Date) => ({
    start: iso(start), end: iso(end), prevStart: iso(prevStart), prevEnd: iso(prevEnd), days: dayCount(start, end),
  })

  const monday = addDays(today, -((today.getUTCDay() + 6) % 7))
  switch (range) {
    case 'this-week': {
      const end = toDate(monday)
      return out(monday, end, addDays(monday, -7), addDays(end, -7))
    }
    case 'last-week': {
      const start = addDays(monday, -7)
      return out(start, addDays(monday, -1), addDays(start, -7), addDays(monday, -8))
    }
    case 'last-month': {
      const start = utc(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)
      const end = utc(today.getUTCFullYear(), today.getUTCMonth(), 0)
      return out(start, end, utc(today.getUTCFullYear(), today.getUTCMonth() - 2, 1), utc(today.getUTCFullYear(), today.getUTCMonth() - 1, 0))
    }
    case 'this-year': {
      const start = utc(today.getUTCFullYear(), 0, 1)
      const end = toDate(start)
      const prevStart = utc(today.getUTCFullYear() - 1, 0, 1)
      return out(start, end, prevStart, utc(end.getUTCFullYear() - 1, end.getUTCMonth(), end.getUTCDate()))
    }
    case 'last-year': {
      const y = today.getUTCFullYear() - 1
      return out(utc(y, 0, 1), utc(y, 11, 31), utc(y - 1, 0, 1), utc(y - 1, 11, 31))
    }
    case 'this-month':
    default: {
      // Month to date vs the same days of last month
      const start = utc(today.getUTCFullYear(), today.getUTCMonth(), 1)
      const end = toDate(start)
      const prevStart = utc(start.getUTCFullYear(), start.getUTCMonth() - 1, 1)
      const lastOfPrev = utc(start.getUTCFullYear(), start.getUTCMonth(), 0)
      const candidate = utc(prevStart.getUTCFullYear(), prevStart.getUTCMonth(), dayCount(start, end))
      return out(start, end, prevStart, candidate > lastOfPrev ? lastOfPrev : candidate)
    }
  }
}

/**
 * Whole calendar periods (this month = 1st to last day, including days still to come) and the
 * previous whole period. Used where future-dated data matters, e.g. planned work hours.
 */
export function calendarPeriods(range: RangeKey) {
  const custom = customDates(range)
  if (custom) return customPeriods(custom)
  const now = new Date()
  const today = utc(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const y = today.getUTCFullYear()
  const m = today.getUTCMonth()
  const monday = addDays(today, -((today.getUTCDay() + 6) % 7))
  const out = (start: Date, end: Date, prevStart: Date, prevEnd: Date) => ({
    start: iso(start), end: iso(end), prevStart: iso(prevStart), prevEnd: iso(prevEnd), days: dayCount(start, end),
  })
  switch (range) {
    case 'this-week': return out(monday, addDays(monday, 6), addDays(monday, -7), addDays(monday, -1))
    case 'last-week': return out(addDays(monday, -7), addDays(monday, -1), addDays(monday, -14), addDays(monday, -8))
    case 'last-month': return out(utc(y, m - 1, 1), utc(y, m, 0), utc(y, m - 2, 1), utc(y, m - 1, 0))
    case 'this-year': return out(utc(y, 0, 1), utc(y, 11, 31), utc(y - 1, 0, 1), utc(y - 1, 11, 31))
    case 'last-year': return out(utc(y - 1, 0, 1), utc(y - 1, 11, 31), utc(y - 2, 0, 1), utc(y - 2, 11, 31))
    case 'this-month':
    default: return out(utc(y, m, 1), utc(y, m + 1, 0), utc(y, m - 1, 1), utc(y, m, 0))
  }
}
