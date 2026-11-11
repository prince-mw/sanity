// Who looks after which market, copied from CashflowOS (`lib/mw-people.ts` +
// `lib/mw-markets.ts`, 11 Nov 2026). Rif's rule: nothing of the website's
// tools is built in CashflowOS; only these names and markets come across, so
// a proposal can be assigned to the market lead for its country. Keep the two
// in step by hand when the team changes. Rif is the fallback and is always in
// copy on the CRM side (launch checklist).

export type Person = { name: string; email: string; title: string; markets: string[] }

export const OWNER: Person = { name: 'Rif', email: 'rif-at.wanwang@movingwalls.com', title: 'SEO and paid search lead', markets: [] }

export const PEOPLE: Person[] = [
  OWNER,
  { name: 'Dinesh', email: 'dinesh@movingwalls.com', title: 'Website and on-page SEO', markets: [] },
  { name: 'Sukrithi', email: 'sukriti.taneja@movingwalls.com', title: 'India', markets: ['india'] },
  { name: 'Deewakshi', email: 'deewakshi.shrestha@movingwalls.com', title: 'SEA and Philippines', markets: ['sea', 'philippines'] },
  { name: 'Sherlee', email: 'sherlee@movingwalls.com', title: 'Americas and Japan', markets: ['americas', 'japan'] },
  { name: 'Rukshana', email: 'rukshana@movingwalls.com', title: 'MENA', markets: ['mena'] },
  { name: 'Sumaiya', email: 'sumaiya@movingwalls.com', title: 'Europe and ANZ', markets: ['europe', 'anz'] },
  { name: 'Savita', email: 'savita.s@movingwalls.com', title: 'Sub-Saharan Africa', markets: ['africa'] },
  { name: 'Sai', email: 'saibhavani@movingwalls.com', title: 'North Asia', markets: ['north-asia'] },
  { name: 'Mehul', email: 'mehul@movingwalls.com', title: 'Management', markets: [] },
  { name: 'Safwaan', email: 'safwaan@movingwalls.com', title: 'Management', markets: [] },
]

/** Market key → label and the country slugs (the /locations/<slug> keys) inside it. */
export const MARKET_COUNTRIES: { key: string; label: string; countries: string[] }[] = [
  { key: 'mena', label: 'MENA', countries: ['uae', 'saudi-arabia', 'qatar', 'oman', 'kuwait', 'bahrain'] },
  { key: 'europe', label: 'Europe', countries: ['united-kingdom', 'germany', 'france', 'netherlands', 'switzerland', 'czech-republic', 'romania', 'europe'] },
  { key: 'africa', label: 'Sub-Saharan Africa', countries: ['south-africa', 'nigeria', 'kenya', 'ghana', 'uganda', 'africa'] },
  { key: 'americas', label: 'Americas', countries: ['united-states', 'canada', 'brazil', 'mexico', 'americas'] },
  { key: 'japan', label: 'Japan', countries: ['japan'] },
  { key: 'india', label: 'India', countries: ['india'] },
  { key: 'north-asia', label: 'North Asia', countries: ['china', 'hong-kong', 'south-korea', 'taiwan'] },
  { key: 'philippines', label: 'Philippines', countries: ['philippines'] },
  { key: 'anz', label: 'ANZ', countries: ['australia', 'new-zealand'] },
  { key: 'sea', label: 'SEA', countries: ['malaysia', 'singapore', 'thailand', 'indonesia', 'vietnam', 'sri-lanka'] },
]

export const marketOfCountry = (countrySlug: string) => MARKET_COUNTRIES.find(m => m.countries.includes(countrySlug)) ?? null

/** The market lead for a country, else Rif. `fallback` says whether nobody owns that market. */
export function ownerForCountry(countrySlug: string): { name: string; email: string; market: string | null; fallback: boolean } {
  const m = marketOfCountry(countrySlug)
  const p = m ? PEOPLE.find(x => x.markets.includes(m.key)) : null
  return p ? { name: p.name, email: p.email, market: m!.key, fallback: false } : { name: OWNER.name, email: OWNER.email, market: m?.key ?? null, fallback: true }
}

export const personByEmail = (email: string) => PEOPLE.find(p => p.email.toLowerCase() === email.trim().toLowerCase()) ?? null
export const marketLeads = () => PEOPLE.filter(p => p.markets.length)
