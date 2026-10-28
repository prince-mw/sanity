// Creates DRAFT China city pages for Wuhan and Nanjing (/locations/china/wuhan|nanjing) from
// "Wuhan - china landing page.docx" and "Nanjing landing page.docx".
// Same look as the other China "go global" city pages: section CSS is taken from the live Hangzhou page
// (stats, prose, region chips, media, challenge, steps, case study) and Shenzhen page (card grids,
// region cards with descriptions), with the markup generated from the copy below. Nanjing also gets a
// challenge → solution table and an agency survey band, which the doc asks for.
// Card blurbs and SEO were written for these pages (the docs did not include them).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const CHINA = '66cbdd9a-0357-4ca5-8f7d-368bcd382d6a'
const DESKTOP = 'C:/Users/admin/Desktop/'
const hz = await c.getDocument('city-china-hangzhou')
const sz = await c.getDocument('411690ac-6f1f-4a95-bf90-2fbbfa4b6160')
const hzCode = hz.sections.find((s) => s._type === 'customEmbed').code
const szCode = sz.sections.find((s) => s._type === 'customEmbed').code
const embedBase = hz.sections.find((s) => s._type === 'customEmbed')
const logos = hz.sections.find((s) => s._type === 'logoCarousel')
const FORM = hz.contactFormUrl // ChinaContact
const CASE_URL = 'https://www.movingwalls.com/case-studies/calvin-klein-dooh-campaign-vietnam'
const k = () => Math.random().toString(36).slice(2, 14)

const styleFrom = (code, cls, newCls) => {
  const m = code.match(new RegExp(`<section class="${cls}">\\s*(<style>[\\s\\S]*?</style>)`))
  if (!m) throw new Error('No style for ' + cls)
  return m[1].replaceAll(cls, newCls)
}
const addCss = (style, css) => style.replace(/<\/style>$/, `${css}\n  </style>`)
const esc = (s) => s.replace(/&(?![a-z#0-9]+;)/g, '&amp;')

const ICON = {
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3.3" y1="12" x2="20.7" y2="12"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  nodes: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><line x1="8" y1="7.5" x2="10.5" y2="16"/><line x1="16" y1="7.5" x2="13.5" y2="16"/><line x1="8.5" y1="6" x2="15.5" y2="6"/>',
  bars: '<line x1="4" y1="20" x2="4" y2="13"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="20" y1="20" x2="20" y2="15"/>',
  screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/><circle cx="12" cy="10" r="2"/>',
  plane: '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
  train: '<rect x="5" y="4" width="14" height="13" rx="3"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="9" cy="14.5" r="1.2"/><circle cx="15" cy="14.5" r="1.2"/><path d="M8 20l-2 2"/><path d="M16 20l2 2"/>',
  city: '<rect x="3" y="10" width="5" height="11"/><rect x="10" y="6" width="5" height="15"/><rect x="17" y="13" width="4" height="8"/><line x1="2" y1="21" x2="22" y2="21"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15 20c0-2.5 1.5-4.5 4-5"/>',
  layers: '<polygon points="12 3 3 8 12 13 21 8 12 3"/><polyline points="3 13 12 18 21 13"/><polyline points="3 17.5 12 22.5 21 17.5"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  search: '<circle cx="10" cy="10" r="6"/><line x1="21" y1="21" x2="15" y2="15"/>',
  eye: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
  flag: '<path d="M4 22V4"/><path d="M4 4h12l-2 4 2 4H4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  mountain: '<path d="M3 20 10 8l4 6 2-3 5 9z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1 1"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1-1"/>',
}
const svg = (n, w = 1.7) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg>`
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
const modal = (cls) => `
    <!-- Contact popup: Zoho China form -->
    <div id="${cls}-modal" class="${cls}__modal-overlay" data-modal-root>
      <div class="${cls}__modal-box" role="dialog" aria-modal="true" aria-label="Contact Moving Walls">
        <button type="button" class="${cls}__modal-close" aria-label="Close" data-modal-close>&times;</button>
        <iframe id="${cls}-modal-frame" class="${cls}__modal-frame" title="Moving Walls China Contact Form" loading="lazy"></iframe>
      </div>
    </div>`
const formBtn = (cls, text) => `
    <div class="${cls}__cta">
      <a class="${cls}__btn" href="${FORM}" target="_blank" rel="noopener" data-modal-open="${cls}-modal">
        ${esc(text)}
        ${ARROW}
      </a>
    </div>${modal(cls)}`
const head = (city, title) => `<!--\n  Moving Walls — ${city} Location Page: "${title}"\n-->\n`

// ---- section builders ----
const stats = (p, city, items) => {
  const cls = `mw-${p}-stats`
  let st = styleFrom(hzCode, 'mw-hz-stats', cls)
  if (items.length === 3) st = addCss(st, `    @media (min-width:901px){ .${cls}__grid{ grid-template-columns:repeat(3,1fr) !important; max-width:980px; margin:0 auto; } }`)
  return `${head(city, 'stats strip')}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__grid">
${items.map(([n, l]) => `      <div class="${cls}__stat"><span class="${cls}__num">${n}</span><span class="${cls}__label">${esc(l)}</span></div>`).join('\n')}
    </div>
  </div>
</section>`
}
const prose = (p, sec, city, title, paras, bg) => {
  const cls = `mw-${p}-${sec}`
  let st = styleFrom(hzCode, 'mw-hz-why', cls)
  if (bg) st = addCss(st, `    .${cls}{ background:${bg} !important; }`)
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__inner">
      <h2 class="${cls}__title">${esc(title)}</h2>
      ${paras.map((t) => `<p>${t}</p>`).join('\n      ')}
    </div>
  </div>
</section>`
}
// 4-up icon cards (Shenzhen "Why Moving Walls?" styling) with an optional lead
const cardGrid = (p, sec, city, title, lead, items) => {
  const cls = `mw-${p}-${sec}`
  const st = styleFrom(szCode, 'mw-sz-why', cls)
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>${lead ? `\n      <p class="${cls}__lead">${esc(lead)}</p>` : ''}
    </div>
    <div class="${cls}__grid">
${items.map(([icon, h, t]) => `      <div class="${cls}__card">
        <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
        <h3>${esc(h)}</h3>
        <p>${esc(t)}</p>
      </div>`).join('\n')}
    </div>
  </div>
</section>`
}
const LOC = {
  Singapore: 'singapore', Malaysia: 'malaysia', Thailand: 'thailand', Indonesia: 'indonesia', 'the Philippines': 'philippines',
  UAE: 'uae', 'Saudi Arabia': 'saudi-arabia', Qatar: 'qatar', 'South Africa': 'south-africa', UK: 'united-kingdom',
  Germany: 'germany', Netherlands: 'netherlands', Japan: 'japan', 'South Korea': 'south-korea', 'Hong Kong': 'hong-kong',
  Taiwan: 'taiwan', Australia: 'australia', Africa: 'africa', Europe: 'europe', Americas: 'americas',
}
const lnk = (name, cls) => (LOC[name] ? `<a class="${cls}" href="https://www.movingwalls.com/locations/${LOC[name]}">${esc(name)}</a>` : esc(name))
// Region cards with chips (Hangzhou styling)
const regionChips = (p, city, title, regions) => {
  const cls = `mw-${p}-regions`
  const regionTitle = (r) => (LOC[r] ? `<a href="https://www.movingwalls.com/locations/${LOC[r]}">${esc(r)} ${ARROW}</a>` : esc(r))
  return `${head(city, title)}<section class="${cls}">
  ${styleFrom(hzCode, 'mw-hz-regions', cls)}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>
    <div class="${cls}__grid">
${regions.map(([r, places]) => `      <div class="${cls}__card">
        <h3>${regionTitle(r)}</h3>
        <ul class="${cls}__chips">
${places.map((pl) => `          <li>${LOC[pl] ? `<a class="${cls}__chip" href="https://www.movingwalls.com/locations/${LOC[pl]}">${esc(pl)}</a>` : `<span class="${cls}__chip ${cls}__chip--plain">${esc(pl)}</span>`}</li>`).join('\n')}
        </ul>
      </div>`).join('\n')}
    </div>
    <div class="${cls}__cta">
      <a class="${cls}__btn" href="https://www.movingwalls.com/locations">
        Explore All Locations
        ${ARROW}
      </a>
    </div>
  </div>
</section>`
}
// Region cards with a short description (Shenzhen styling) + link button
const regionCards = (p, city, title, regions, ctaText) => {
  const cls = `mw-${p}-regions`
  const st = addCss(styleFrom(szCode, 'mw-sz-regions', cls), `    .${cls}__cta{ text-align:center; margin-top:32px; }
    .${cls}__btn{ display:inline-flex; align-items:center; gap:8px; text-decoration:none !important; font-weight:700; font-size:15px; padding:15px 30px; border-radius:10px; color:#fff !important; background:#2F5FE0; transition:transform .2s ease, background .2s ease; }
    .${cls}__btn:hover{ background:#2450C4; transform:translateY(-2px); }
    .${cls}__btn svg{ width:16px; height:16px; }
    @media (min-width:901px){ .${cls}__grid{ grid-template-columns:repeat(3,1fr) !important; } }
    .${cls}__card a, .${cls}__link{ text-decoration:none !important; }`)
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>
    <div class="${cls}__grid">
${regions.map(([icon, r, html]) => `      <div class="${cls}__card">
        <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
        <h3>${LOC[r] ? lnk(r, `${cls}__link`) : esc(r)}</h3>
        <p>${html(`${cls}__link`)}</p>
      </div>`).join('\n')}
    </div>
    <div class="${cls}__cta">
      <a class="${cls}__btn" href="https://www.movingwalls.com/locations">
        ${esc(ctaText)}
        ${ARROW}
      </a>
    </div>
  </div>
</section>`
}
const media = (p, city, title, items) => {
  const cls = `mw-${p}-media`
  return `${head(city, title)}<section class="${cls}">
  ${styleFrom(hzCode, 'mw-hz-media', cls)}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>
    <div class="${cls}__grid">
${items.map(([icon, h, t]) => `      <div class="${cls}__card">
        <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
        <h3>${esc(h)}</h3>
        <p>${esc(t)}</p>
      </div>`).join('\n')}
    </div>
  </div>
</section>`
}
const challenge = (p, city, title, items, cta) => {
  const cls = `mw-${p}-challenge`
  return `${head(city, title)}<section class="${cls}">
  ${styleFrom(hzCode, 'mw-hz-challenge', cls)}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>
    <div class="${cls}__grid">
${items.map(([icon, h, t]) => `      <div class="${cls}__card">
        <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
        <h3>${esc(h)}</h3>
        <p>${esc(t)}</p>
      </div>`).join('\n')}
    </div>${formBtn(cls, cta)}
  </div>
</section>`
}
// Challenge → solution table (Nanjing), using the challenge section's container, button and popup styles
const compare = (p, city, title, rows, cta) => {
  const cls = `mw-${p}-compare`
  const st = addCss(styleFrom(hzCode, 'mw-hz-challenge', cls), `    .${cls}__table{ max-width:1040px; margin:0 auto 8px; border:1px solid #E2E6ED; border-radius:16px; overflow:hidden; background:#fff; box-shadow:0 4px 20px rgba(16,24,40,.06); }
    .${cls}__row{ display:grid; grid-template-columns:1fr 56px 1fr; align-items:center; border-top:1px solid #E2E6ED; }
    .${cls}__row:first-child{ border-top:0; }
    .${cls}__row--head{ background:#12296B; }
    .${cls}__row--head span{ color:#fff !important; font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:14px 24px; }
    .${cls}__cell{ padding:20px 24px; font-size:15px; line-height:1.55; }
    .${cls}__cell--pain{ color:#5B6472 !important; }
    .${cls}__cell--fix{ color:#101828 !important; font-weight:600; background:#F6F8FC; height:100%; display:flex; align-items:center; gap:10px; }
    .${cls}__cell--fix svg{ flex-shrink:0; width:18px; height:18px; color:#16A34A; }
    .${cls}__arrow{ display:flex; justify-content:center; color:#2F5FE0; }
    .${cls}__arrow svg{ width:20px; height:20px; }
    @media (max-width:720px){ .${cls}__row{ grid-template-columns:1fr; } .${cls}__arrow{ display:none; } .${cls}__row--head{ display:none; } .${cls}__cell--pain{ padding-bottom:6px; } }`)
  const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>
    <div class="${cls}__table" role="table" aria-label="${esc(title)}">
      <div class="${cls}__row ${cls}__row--head" role="row"><span role="columnheader">The challenge</span><span></span><span role="columnheader">How Moving Walls helps</span></div>
${rows.map(([a, b]) => `      <div class="${cls}__row" role="row"><div class="${cls}__cell ${cls}__cell--pain" role="cell">${esc(a)}</div><div class="${cls}__arrow" aria-hidden="true">${ARROW}</div><div class="${cls}__cell ${cls}__cell--fix" role="cell">${TICK}<span>${esc(b)}</span></div></div>`).join('\n')}
    </div>${formBtn(cls, cta)}
  </div>
</section>`
}
const steps = (p, city, title, items) => {
  const cls = `mw-${p}-how`
  let st = styleFrom(hzCode, 'mw-hz-how', cls)
  if (items.length === 3) st = addCss(st, `    @media (min-width:901px){ .${cls}__steps{ grid-template-columns:repeat(3,1fr) !important; } .${cls}__steps::before{ left:calc(100%/6) !important; right:calc(100%/6) !important; } }`)
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>
    <ol class="${cls}__steps">
${items.map(([icon, h, t], i) => `      <li class="${cls}__step">
        <div class="${cls}__icon-wrap">
          <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
          <span class="${cls}__badge">0${i + 1}</span>
        </div>
        <h3>${esc(h)}</h3>
        <p>${esc(t)}</p>
      </li>`).join('\n')}
    </ol>
  </div>
</section>`
}
// Calvin Klein Vietnam case card; button opens the form, or links to the case study
const caseStudy = (p, city, title, intro, ctaText, ctaToCase) => {
  const cls = `mw-${p}-case`
  let st = styleFrom(hzCode, 'mw-hz-case', cls)
  if (intro) st = addCss(st, `    .${cls}__lead{ max-width:760px; margin:-6px auto 28px; text-align:center; font-size:16px; line-height:1.7; color:#5B6472 !important; }`)
  const btn = ctaToCase
    ? `\n    <div class="${cls}__cta">\n      <a class="${cls}__btn" href="${CASE_URL}">\n        ${esc(ctaText)}\n        ${ARROW}\n      </a>\n    </div>`
    : formBtn(cls, ctaText)
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>${intro ? `\n    <p class="${cls}__lead">${esc(intro)}</p>` : ''}
    <a class="${cls}__card" href="${CASE_URL}">
      <span class="${cls}__arrow" aria-hidden="true">${ARROW}</span>
      <span class="${cls}__tag">Calvin Klein Vietnam</span>
      <div class="${cls}__stats">
        <div class="${cls}__stat"><span class="${cls}__num">27</span><span class="${cls}__label">Days</span></div>
        <div class="${cls}__stat"><span class="${cls}__num">230</span><span class="${cls}__label">Digital Screens</span></div>
        <div class="${cls}__stat"><span class="${cls}__num">39</span><span class="${cls}__label">Premium Locations</span></div>
        <div class="${cls}__stat"><span class="${cls}__num">363,000+</span><span class="${cls}__label">Audience Reached</span></div>
        <div class="${cls}__stat"><span class="${cls}__num">1.56M</span><span class="${cls}__label">Billable Impressions</span></div>
      </div>
    </a>${btn}
  </div>
</section>`
}
// Agency band linking to the "Is Your Agency Ready to Go Global with OOH?" survey (Nanjing)
const agencyBand = (p, city) => `${head(city, 'Working with Agencies')}<section class="mw-${p}-agency">
  <style>
    .mw-${p}-agency{ background:#F6F8FC; padding:clamp(24px,3vw,40px) 16px clamp(40px,6vw,64px); box-sizing:border-box; }
    .mw-${p}-agency *{ box-sizing:border-box; }
    .mw-${p}-agency__box{ max-width:1040px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:28px; flex-wrap:wrap; background:linear-gradient(135deg,#12296B,#2F5FE0); border-radius:20px; padding:32px clamp(24px,4vw,44px); box-shadow:0 16px 36px rgba(16,24,40,.16); }
    .mw-${p}-agency__eyebrow{ display:block; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#BFD0FF !important; margin:0 0 8px; }
    .mw-${p}-agency__title{ font-size:clamp(22px,3vw,28px); font-weight:800; line-height:1.2; color:#fff !important; margin:0 0 8px; }
    .mw-${p}-agency__text{ font-size:15.5px; line-height:1.6; color:#E3EAFF !important; margin:0; max-width:560px; }
    .mw-${p}-agency__btn{ display:inline-flex; align-items:center; gap:8px; text-decoration:none !important; font-weight:700; font-size:15px; padding:15px 26px; border-radius:10px; color:#12296B !important; background:#fff; transition:transform .2s ease; white-space:nowrap; }
    .mw-${p}-agency__btn:hover{ transform:translateY(-2px); }
    .mw-${p}-agency__btn svg{ width:16px; height:16px; }
  </style>
  <div class="mw-${p}-agency__box">
    <div>
      <span class="mw-${p}-agency__eyebrow">Working with Agencies</span>
      <h2 class="mw-${p}-agency__title">Planning an International Campaign for a Client?</h2>
      <p class="mw-${p}-agency__text">Moving Walls supports agencies and brands alike. Take a two-minute check to see how ready your agency is to take clients' OOH across borders.</p>
    </div>
    <a class="mw-${p}-agency__btn" href="https://survey.zohopublic.com/zs/JHjE75" target="_blank" rel="noopener">Is Your Agency Ready to Go Global with OOH? ${ARROW}</a>
  </div>
</section>`

const MEDIA = (desc) => [
  ['screen', 'Digital Billboards', desc[0]],
  ['plane', 'Airport Networks', desc[1]],
  ['train', 'Transit Advertising', desc[2]],
  ['city', 'Mall & Business District Networks', desc[3]],
]

// ---------- Wuhan ----------
const wuhanCode = [
  stats('wh', 'Wuhan', [['20+', 'Countries'], ['850K+', 'Billboard Inventory'], ['1.5B+', 'Daily Impressions']]),
  prose('wh', 'why', 'Wuhan', 'Why Wuhan Brands Are Expanding Globally', [
    'As businesses look beyond domestic growth, many are investing in international expansion across fast-growing markets such as <strong>Southeast Asia, the Middle East and Africa</strong>, as well as established markets such as Europe and the Americas.',
    'Expansion brings new challenges: different media ecosystems, audience behaviours and campaign measurement standards. DOOH lets brands reach audiences in premium public environments, <strong>combining the impact of outdoor media with audience intelligence and measurable performance</strong>.',
  ]),
  cardGrid('wh', 'add', 'Wuhan', 'Why Add DOOH to Your International Marketing Strategy?', '', [
    ['layers', 'Strengthen Omnichannel Campaigns', 'Reinforce your message across online and offline channels for a more consistent customer experience.'],
    ['eye', 'Reach Consumers Beyond Their Screens', 'Engage audiences in airports, transit networks, shopping malls and business districts.'],
    ['flag', 'Build Brand Visibility in New Markets', 'Establish a presence in high-traffic locations where consumers spend time every day.'],
    ['bars', 'Measure Campaign Performance', 'Evaluate delivery and results with standardised reporting.'],
  ]),
  regionChips('wh', 'Wuhan', 'Where Can We Take Your Brand?', [
    ['Southeast Asia', ['Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'the Philippines']],
    ['Middle East', ['UAE', 'Saudi Arabia', 'Qatar']],
    ['Africa', ['South Africa', 'and wider markets']],
    ['Europe', ['UK', 'Germany', 'Netherlands']],
    ['Americas', ['US', 'Canada', 'Mexico', 'Colombia', 'Brazil', 'LATAM']],
    ['Asia-Pacific', ['Japan', 'South Korea', 'Hong Kong', 'Taiwan', 'Australia']],
  ]),
  media('wh', 'Wuhan', 'Media Types Available', MEDIA([
    'High-impact digital screens in prime urban locations',
    'Premium placements across international airport terminals',
    'Metro, rail and bus network coverage across major cities',
    'High-traffic shopping malls and commercial hubs',
  ])),
  challenge('wh', 'Wuhan', 'The Challenges of International Campaign Execution', [
    ['people', 'Multiple Media Partners', 'Different countries often require different media owners and workflows.'],
    ['layers', 'Campaign Complexity', 'Managing approvals, creatives, timelines and reporting across markets increases effort.'],
    ['bars', 'Inconsistent Measurement', 'Comparing performance across regions is difficult without standardised reporting.'],
    ['trend', 'Scaling Internationally', 'As campaigns grow, brands need technology that supports consistent execution and measurable outcomes.'],
  ], 'Book a Strategy Session'),
  cardGrid('wh', 'whymw', 'Wuhan', 'Why Moving Walls?', '', [
    ['target', 'Audience Intelligence', 'Plan using audience and location insights to reach the right consumers across international markets.'],
    ['nodes', 'Connected Campaign Execution', 'Coordinate campaigns across multiple media owners and countries through a single workflow.'],
    ['bars', 'Transparent Measurement', 'Measure performance consistently across markets with standardised reporting.'],
    ['globe', 'Built for Global Expansion', 'Support regional and multi-market campaigns while keeping execution consistent.'],
  ]),
  caseStudy('wh', 'Wuhan', 'Proven International Campaign Delivery', '', "Let's Connect", false),
].join('\n\n')

// ---------- Nanjing ----------
const nanjingCode = [
  stats('nj', 'Nanjing', [['20+', 'Countries'], ['850K+', 'Billboard Inventory'], ['1.5B+', 'Daily Impressions'], ['250+', 'Partner Networks']]),
  prose('nj', 'why', 'Nanjing', 'Built in Nanjing. Ready for Every Market.', [
    'Nanjing is the capital of Jiangsu, with about <strong>9.6 million residents</strong>. Its priority industries include electronics and information technology, new energy vehicles, smart equipment and biomedicine.',
    'Whatever the sector, the challenge is the same once you cross a border: different media ecosystems, audience behaviours and measurement standards. Moving Walls helps you handle them in one place, with <strong>audience intelligence guiding where you go</strong> and measurable performance showing what worked.',
  ]),
  regionCards('nj', 'Nanjing', 'Where Will You Go First?', [
    ['globe', 'Southeast Asia', (a) => `${lnk('Singapore', a)} (Moving Walls' HQ), ${lnk('Malaysia', a)}, ${lnk('Thailand', a)}, ${lnk('Indonesia', a)} and ${lnk('the Philippines', a)}. Fast-growing markets with strong DOOH networks.`],
    ['sun', 'Middle East', (a) => `${lnk('UAE', a)}, ${lnk('Saudi Arabia', a)} and ${lnk('Qatar', a)}. Reach business hubs, luxury retail, airports and international travellers.`],
    ['city', 'Europe', (a) => `${lnk('UK', a)}, ${lnk('Germany', a)} and the ${lnk('Netherlands', a)}. Mature markets with programmatic DOOH and measurable performance.`],
    ['flag', 'Americas', () => 'US, Canada, Mexico, Colombia, Brazil and wider LATAM.'],
    ['mountain', 'Africa', (a) => `${lnk('South Africa', a)} and wider markets, including premium mall environments in Johannesburg and Cape Town.`],
    ['target', 'Asia-Pacific', (a) => `${lnk('Japan', a)}, ${lnk('South Korea', a)}, ${lnk('Hong Kong', a)}, ${lnk('Taiwan', a)} and ${lnk('Australia', a)}. Premium, highly urban audiences.`],
  ], 'See All Locations'),
  media('nj', 'Nanjing', 'Reach People Where They Move, Shop, and Work', MEDIA([
    'High-impact screens in prime urban locations',
    'Premium placements across international terminals',
    'Metro, rail and bus coverage across major cities',
    'High-traffic retail and commercial hubs',
  ])),
  compare('nj', 'Nanjing', 'The Hard Parts of Going Global, and How We Handle Them', [
    ['Different countries often mean different media owners and workflows', 'Coordinate across media owners and countries through a single workflow'],
    ['Approvals, creatives and reporting multiply across markets', 'One connected platform, from planning to execution and measurement'],
    ['Performance is hard to compare between regions', 'Standardised reporting for consistent measurement'],
    ['Campaigns need consistent execution as they scale', 'Support for regional and multi-market campaigns'],
  ], 'Talk to Our Team'),
  steps('nj', 'Nanjing', 'Plan. Activate. Measure.', [
    ['target', 'Plan with Audience Intelligence', 'Use audience and location insights to find the right consumers in each market.'],
    ['bolt', 'Activate in One Workflow', 'Run campaigns across media owners and countries without managing separate platforms.'],
    ['bars', 'Measure Consistently', 'See performance across markets with standardised reporting.'],
  ]),
  prose('nj', 'digital', 'Nanjing', 'Make DOOH Work with Your Digital Marketing', [
    'Search, social and online video drive engagement. DOOH complements them by taking your brand into the physical world, so you reach audiences in <strong>airports, transit networks, malls and business districts</strong> as part of their daily routines.',
    'The result is a more consistent customer experience across online and offline.',
  ], '#F6F8FC'),
  caseStudy('nj', 'Nanjing', 'See It in Action: Calvin Klein in Vietnam', 'To build brand visibility among urban consumers in Vietnam, Calvin Klein ran a 27-day DOOH campaign supported by Moving Walls.', 'Read the Case Study', true),
  agencyBand('nj', 'Nanjing'),
].join('\n\n')

for (const [p, code] of [['wh', wuhanCode], ['nj', nanjingCode]]) {
  if (/mw-hz-|mw-sz-|Hangzhou|Shenzhen/.test(code)) throw new Error(`Template copy left in ${p}`)
}

const up = async (file) => ({ _type: 'image', asset: { _type: 'reference', _ref: (await c.assets.upload('image', fs.createReadStream(DESKTOP + file), { filename: file }))._id } })
const faq = (list) => list.map(([question, answer]) => ({ _key: k(), question, answer }))
const page = (o) => ({
  _id: `drafts.city-china-${o.slug}`,
  _type: 'locationCity',
  country: { _type: 'reference', _ref: CHINA },
  city: o.name,
  slug: { _type: 'slug', current: o.slug },
  isActive: true,
  heroTitle: o.h1,
  heroImage: o.hero,
  fullDescription: o.intro,
  description: o.card,
  ctaButtonText: o.button,
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  sectionsPosition: 'before-faqs',
  sections: [
    { ...embedBase, _key: k(), code: o.code },
    { ...logos, _key: k() },
    { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: o.banner[0], subheading: o.banner[1], ctaText: 'Book a Strategy Session', ctaLink: FORM },
  ],
  faqs: faq(o.faqs),
  seo: { _type: 'seo', metaTitle: o.seo[0], metaDescription: o.seo[1], enableKeywords: false, noIndex: false, ogImage: o.hero },
})

const wuhan = page({
  slug: 'wuhan', name: 'Wuhan', code: wuhanCode,
  h1: 'Take Your Wuhan Brand Global with DOOH',
  hero: await up('dooh-screen-wuhan.webp'),
  intro: 'As Wuhan brands expand into international markets, delivering consistent and measurable brand experiences across countries becomes increasingly important. Moving Walls helps agencies and brands plan, activate and measure Digital Out-of-Home (DOOH) campaigns through one connected platform, making it easier to launch campaigns across borders with confidence.',
  card: 'Expanding beyond Wuhan? Plan, activate and measure DOOH across 20+ countries from one connected platform.',
  button: 'Book a Strategy Session',
  banner: ['Ready to Expand Beyond Wuhan?', "Whether you're entering one new market or launching campaigns across multiple regions, Moving Walls can help you plan, activate and measure international DOOH campaigns with confidence."],
  faqs: [
    ['Why should Wuhan brands use international DOOH advertising?', 'International DOOH helps brands build awareness, engage audiences in premium public environments, and support market expansion with measurable campaign performance.'],
    ['Which international markets can Moving Walls support?', 'Southeast Asia, the Middle East, Africa, Europe, the Americas and Asia-Pacific, across 20+ countries.'],
    ['Can campaigns run across multiple countries?', 'Yes. You can coordinate campaigns across multiple media owners and countries through a single workflow.'],
    ['How is campaign performance measured?', 'Through standardised reporting, so you can measure performance consistently across markets.'],
    ['Can we start with just one market?', "Yes. Whether you're entering one new market or launching across multiple regions, Moving Walls can help."],
    ['How do we get started?', 'Book a strategy session with our team.'],
  ],
  seo: ['Wuhan-to-Global DOOH Advertising | Moving Walls', 'Take your Wuhan brand global. Plan, activate and measure DOOH across 20+ countries and 850K+ billboards from one connected platform.'],
})

const nanjing = page({
  slug: 'nanjing', name: 'Nanjing', code: nanjingCode,
  h1: 'From Nanjing to the World: DOOH That Travels with Your Brand',
  hero: await up('dooh-screen-nanjing.webp'),
  intro: 'Taking a Nanjing business into new markets means new audiences, new media owners and new ways of measuring results. Moving Walls brings them together in one connected platform, so agencies and brands can plan, activate and measure Digital Out-of-Home (DOOH) campaigns across 20+ countries.',
  card: "From Jiangsu's capital to 20+ countries: plan, activate and measure international DOOH in one platform.",
  button: "Let's Talk",
  banner: ['Ready to Take Nanjing Beyond China?', "Whether you're entering one new market or launching across several regions, Moving Walls helps you plan, activate and measure international DOOH with confidence."],
  faqs: [
    ['Why should Nanjing brands use international DOOH advertising?', 'It helps brands build awareness, engage audiences in premium public environments, and support market expansion with measurable campaign performance.'],
    ['Does Moving Walls work with agencies as well as brands?', 'Yes. Agencies and brands can plan, activate and measure international DOOH campaigns through one platform.'],
    ['Do we need different media partners in each country?', 'Different countries often involve different media owners. Moving Walls lets you coordinate across them through a single workflow.'],
    ['Which regions can we reach?', 'Southeast Asia, the Middle East, Africa, Europe, the Americas and Asia-Pacific.'],
    ['How do we compare results across markets?', 'Standardised reporting lets you measure performance consistently across regions.'],
    ['Can we start with just one country?', "Yes. Whether you're entering one new market or launching across multiple regions, Moving Walls can help."],
    ['How do we get started?', 'Book a strategy session with our team.'],
  ],
  seo: ['Nanjing-to-Global DOOH Advertising | Moving Walls', 'Take your Nanjing business into new markets. Plan, activate and measure DOOH across 20+ countries with one platform and standardised reporting.'],
})

for (const d of [wuhan, nanjing]) {
  if (await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$cn && !(_id in [$id, $d])])', { s: d.slug.current, cn: CHINA, id: d._id.replace('drafts.', ''), d: d._id })) throw new Error('Slug in use: ' + d.slug.current)
}
await c.transaction().createOrReplace(wuhan).createOrReplace(nanjing).commit()
console.log('Drafts created: /locations/china/wuhan and /locations/china/nanjing')
