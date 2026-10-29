// Date range options for /internal-insights (shared by server and client code)
export type RangeKey = 'this-week' | 'last-week' | 'this-month' | 'last-month' | 'this-year' | 'last-year'

export const RANGE_KEYS: RangeKey[] = ['this-week', 'last-week', 'this-month', 'last-month', 'this-year', 'last-year']

export const RANGE_LABELS: Record<RangeKey, string> = {
  'this-week': 'This week',
  'last-week': 'Last week',
  'this-month': 'This month',
  'last-month': 'Last month',
  'this-year': 'This year',
  'last-year': 'Last year',
}

export const DEFAULT_RANGE: RangeKey = 'this-month'

const iso = (d: Date) => d.toISOString().slice(0, 10)
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d))
const addDays = (d: Date, n: number) => utc(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n)
const dayCount = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000) + 1

/** Current and comparison periods. "This …" ranges run to yesterday (today is incomplete). */
export function periods(range: RangeKey) {
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
