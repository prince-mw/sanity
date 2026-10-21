// Layout pass on the Philippines sub-page drafts (Oct 2026):
//  - "Why Choose Moving Walls?" becomes a designed custom section (intro + CTA, benefits as icon cards)
//  - CTA buttons centred under the image on the two-column sections
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const ICON = {
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  arrows: '<path d="M7 16V4M3 8l4-4 4 4M17 8v12M21 16l-4 4-4-4"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>',
}
const pickIcon = (t) => {
  const s = t.toLowerCase()
  if (/measure|report/.test(s)) return 'chart'
  if (/programmatic/.test(s)) return 'cpu'
  if (/schedule|term|working day|class/.test(s)) return 'clock'
  if (/both directions/.test(s)) return 'arrows'
  if (/^add |extend|combine|pair/.test(s)) return 'layers'
  if (/shopper|reach students|reach /.test(s)) return /shopper|retail/.test(s) ? 'bag' : 'users'
  return 'pin'
}
const svg = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'

const CSS = `<style>
.mw-phw{--ink:#101828;--muted:#5B6472;--navy:#12296B;--blue:#2F5FE0;--tint:#EAF0FE;--line:#E2E6ED;background:linear-gradient(180deg,#F6F8FC 0%,#fff 100%);padding:clamp(48px,6vw,80px) 16px}
.mw-phw *{box-sizing:border-box}
@media(min-width:640px){.mw-phw{padding-left:24px;padding-right:24px}}
@media(min-width:1024px){.mw-phw{padding-left:32px;padding-right:32px}}
.mw-phw__wrap{max-width:1280px;margin:0 auto;display:grid;gap:40px;align-items:center}
@media(min-width:1024px){.mw-phw__wrap{grid-template-columns:0.9fr 1.1fr;gap:56px}}
.mw-phw .mw-phw__eyebrow{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--blue)!important;margin:0 0 10px}
.mw-phw .mw-phw__title{font-size:clamp(28px,4vw,38px);font-weight:800;line-height:1.15;color:var(--ink)!important;margin:0 0 16px}
.mw-phw .mw-phw__lead{font-size:16px;line-height:1.75;color:var(--muted)!important;margin:0 0 14px}
.mw-phw a.mw-phw__btn{display:inline-flex;align-items:center;gap:8px;margin-top:12px;background:var(--blue);color:#fff!important;font-weight:700;font-size:15px;padding:13px 26px;border-radius:10px;text-decoration:none!important;box-shadow:0 8px 20px rgba(47,95,224,.25);transition:background .2s ease,transform .2s ease}
.mw-phw a.mw-phw__btn:hover{background:var(--navy);transform:translateY(-2px)}
.mw-phw a.mw-phw__btn svg{width:18px;height:18px}
.mw-phw__panel{background:linear-gradient(145deg,#0B1B4D 0%,#12296B 50%,#2F5FE0 100%);border-radius:22px;padding:clamp(22px,3vw,34px);box-shadow:0 22px 48px rgba(18,41,107,.28)}
.mw-phw .mw-phw__ptitle{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#BFD0FF!important;margin:0 0 18px}
.mw-phw__grid{display:grid;gap:14px}
@media(min-width:640px){.mw-phw__grid{grid-template-columns:1fr 1fr}}
.mw-phw__item{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:18px;display:flex;gap:14px;align-items:flex-start;transition:background .2s ease,transform .2s ease}
.mw-phw__item:hover{background:rgba(255,255,255,.14);transform:translateY(-2px)}
.mw-phw__ic{width:40px;height:40px;min-width:40px;border-radius:10px;background:#fff;color:var(--blue);display:flex;align-items:center;justify-content:center}
.mw-phw__ic svg{width:20px;height:20px}
.mw-phw .mw-phw__item p{margin:0;font-size:15px;line-height:1.5;font-weight:600;color:#fff!important}
.mw-phw__item:last-child:nth-child(odd){grid-column:1/-1}
@media(prefers-reduced-motion:reduce){.mw-phw *{transition:none!important}}
</style>`

const whyEmbed = (p, form) =>
  `<!-- Moving Walls — Philippines ${esc(p.name)}: Why Choose Moving Walls -->\n<section class="mw-phw">${CSS}<div class="mw-phw__wrap"><div>` +
  `<span class="mw-phw__eyebrow">Why Moving Walls</span><h2 class="mw-phw__title">Why Choose Moving Walls?</h2>` +
  p.lead.map((t) => `<p class="mw-phw__lead">${esc(t)}</p>`).join('') +
  `<a class="mw-phw__btn" href="${form}" target="_blank" rel="noopener">${esc(p.cta)} ${ARROW}</a></div>` +
  `<div class="mw-phw__panel"><p class="mw-phw__ptitle">With Moving Walls, you can</p><div class="mw-phw__grid">` +
  p.canDo.map((t) => `<div class="mw-phw__item"><span class="mw-phw__ic">${svg(pickIcon(t))}</span><p>${esc(t)}</p></div>`).join('') +
  `</div></div></div></section>`

// Per page: Why-section CTA, Sites-section CTA (null where that section has no image), Why Choose MW intro + CTA
const PAGES = {
  edsa: { name: 'EDSA', why: 'Check EDSA Availability', sites: 'Get the Full EDSA Site List', cta: 'Build Your EDSA Plan',
    lead: ["EDSA's sites belong to several different media owners. Booking the corridor shouldn't mean booking them one at a time."] },
  c5: { name: 'C5', why: 'Check C5 Availability', sites: 'Get the Full C5 Site List', cta: 'Build Your C5 Plan',
    lead: ['Plan, buy and measure every C5 site in one place, alongside the rest of your Philippine campaign.'] },
  cebu: { name: 'Cebu', why: 'Check Cebu Availability', sites: 'Get the Full Cebu Site List', cta: 'Build Your Cebu Plan',
    lead: ['Plan, buy and measure Cebu in the same campaign as Metro Manila, with delivery reported site by site.'] },
  davao: { name: 'Davao', why: 'Add Mindanao to Your Plan', sites: 'Get Davao Availability', cta: 'Build Your Mindanao Plan',
    lead: ['Add Davao and Mindanao to a national campaign without a separate booking.'] },
  'north-south-luzon': { name: 'North & South Luzon', why: 'Check Luzon Availability', sites: null, cta: 'Build Your Luzon Plan',
    lead: ['Extend your Metro Manila campaign to the corridors out of the capital, planned and reported in one place.'] },
  universities: { name: 'Universities', why: 'Plan Around the Academic Calendar', sites: 'Get the Campus Site List', cta: 'Build Your Campus Plan',
    lead: ['Reach students on campus streets and in the stores they use, scheduled around class hours and term dates.'] },
  'central-business-districts': { name: 'CBDs', why: 'Reach CBD Professionals', sites: 'Get the Full CBD Site List', cta: 'Build Your CBD Plan',
    lead: ["Reach Metro Manila's working professionals across every major business district in one plan."] },
  'retail-shopping-malls': { name: 'Retail & Malls', why: 'Reach Shoppers in Malls', sites: 'Get the Full Mall Site List', cta: 'Build Your Retail Plan',
    lead: ['Put your brand in front of shoppers minutes before they decide, across malls in Metro Manila, Cebu and Luzon.'] },
}

const k = () => Math.random().toString(36).slice(2, 14)
const tx = c.transaction()
for (const [slug, p] of Object.entries(PAGES)) {
  const id = `drafts.city-philippines-${slug}`
  const d = await c.getDocument(id)
  if (!d) throw new Error('missing ' + id)
  const form = d.contactFormUrl
  let twoCol = 0
  const sections = d.sections.map((s) => {
    if (s._type === 'twoColumn') {
      twoCol++
      const isWhy = /^Why Advertise/.test(s.heading || '')
      const text = isWhy ? p.why : p.sites
      return text ? { ...s, ctaText: text, ctaLink: form, ctaPlacement: 'image' } : s
    }
    if (s._type === 'textBlock' && s.heading === 'Why Choose Moving Walls?') {
      const canDo = (s.content || [])
        .filter((b) => b.listItem === 'bullet')
        .map((b) => b.children.map((ch) => ch.text).join(''))
      return { _key: s._key || k(), _type: 'customEmbed', backgroundColor: 'transparent', maxWidth: 'full', code: whyEmbed({ ...p, canDo }, form) }
    }
    return s
  })
  tx.patch(id, (pt) => pt.set({ sections }))
  console.log(slug, '| two-column sections:', twoCol)
}
await tx.commit({ visibility: 'sync' })
console.log('updated')
