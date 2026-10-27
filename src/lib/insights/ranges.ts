// Date range options for /internal-insights (shared by server and client code)
export type RangeKey = 'this-month' | 'last-month' | '28' | '90'

export const RANGE_KEYS: RangeKey[] = ['this-month', 'last-month', '28', '90']

export const RANGE_LABELS: Record<RangeKey, string> = {
  'this-month': 'This month',
  'last-month': 'Last month',
  '28': 'Last 28 days',
  '90': 'Last 90 days',
}
