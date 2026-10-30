// Website leads (GA4) as one card per market: the country page and its city pages together, plus one card
// for the site-wide contact and demo forms. Shared by the Location pages and Leads & Deals tabs.
import type { LeadSource } from '@/lib/insights/data'
import { nf } from './ui'

interface Item { name: string; leads: number; paid: number }
interface Group extends Item { items: Item[] }

const SITE_WIDE = 'Main contact & demo'
const FORM_NAMES: Record<string, string> = { contact: 'Contact form', demo: 'Demo form', f1: 'F1 page form' }
const ACRONYMS = new Set(['uae', 'uk', 'usa', 'mrt', 'cbd', 'ooh', 'dooh'])
const title = (slug: string) => slug.split('-').map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))).join(' ')
/** "shanghai-zh" → "Shanghai (Chinese)" */
const pageName = (slug: string) => {
  const lang = slug.match(/-(es|zh)$/)?.[1]
  const base = title(slug.replace(/-(es|zh)$/, ''))
  return lang ? `${base} (${lang === 'es' ? 'Spanish' : 'Chinese'})` : base
}

export function groupLeads(sources: LeadSource[]): Group[] {
  const groups = new Map<string, Group>()
  const add = (group: string, item: string, s: LeadSource) => {
    const g = groups.get(group) || groups.set(group, { name: group, leads: 0, paid: 0, items: [] }).get(group)!
    g.leads += s.leads
    g.paid += s.paid
    const i = g.items.find((x) => x.name === item) || (g.items.push({ name: item, leads: 0, paid: 0 }), g.items[g.items.length - 1])
    i.leads += s.leads
    i.paid += s.paid
  }
  for (const s of sources) {
    if (s.isLocation) {
      const [, country = '', city] = s.creditedTo.split('/').filter(Boolean)
      add(title(country.replace(/-(es|zh)$/, '')), city ? pageName(city) : `${pageName(country)} page`, s)
    } else {
      const suffix = s.event.replace(/^generate_lead_?/, '')
      add(SITE_WIDE, FORM_NAMES[suffix] || `${title(suffix.replace(/_/g, '-')) || 'Other'} form`, s)
    }
  }
  const out = [...groups.values()]
  for (const g of out) g.items.sort((a, b) => b.leads - a.leads)
  // Site-wide forms first, then markets by leads
  return out.sort((a, b) => Number(b.name === SITE_WIDE) - Number(a.name === SITE_WIDE) || b.leads - a.leads)
}

const paidNote = (paid: number) => (paid ? <span className="text-amber-700">{nf(paid)} paid</span> : <span className="text-gray-400">0 paid</span>)

export default function LeadCards({ sources }: { sources: LeadSource[] }) {
  const groups = groupLeads(sources)
  if (!groups.length) return <p className="text-sm text-gray-500">No website leads in this period.</p>
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {groups.map((g) => (
        <div key={g.name} className={`rounded-xl border p-4 ${g.name === SITE_WIDE ? 'border-sky-200 bg-sky-50/50' : 'border-gray-200 bg-white'}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{g.name}</p>
          <p className="mt-1 text-2xl font-bold text-[#062068]">{nf(g.leads)} <span className="text-sm font-semibold">{paidNote(g.paid)}</span></p>
          <ul className="mt-2 space-y-0.5 text-sm">
            {g.items.map((i) => (
              <li key={i.name} className="flex justify-between gap-3">
                <span className="text-gray-700">{i.name}</span>
                <span className="whitespace-nowrap"><b className="text-gray-900">{nf(i.leads)}</b>{i.paid > 0 && <span className="text-xs text-amber-700"> · {nf(i.paid)} paid</span>}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
