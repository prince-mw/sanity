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
