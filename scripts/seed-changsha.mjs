// Creates a DRAFT China city page for Changsha (/locations/china/changsha) from the "Changsha Landing page"
// Google Doc (11 Nov 2026). Same look as Suzhou/Qingdao/Xiamen: section builders copied from
// scripts/seed-suzhou-qingdao-xiamen.mjs; sections follow the doc's order and headings.
// Card blurb and SEO were written for the page (the doc did not include them).
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
const formBtn = (cls, text) => !text ? "" : `
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
const regionCards = (p, city, title, regions, ctaText, lead) => {
  const cls = `mw-${p}-regions`
  const st = addCss(styleFrom(szCode, 'mw-sz-regions', cls), `    .${cls}__cta{ text-align:center; margin-top:32px; }
    .${cls}__btn{ display:inline-flex; align-items:center; gap:8px; text-decoration:none !important; font-weight:700; font-size:15px; padding:15px 30px; border-radius:10px; color:#fff !important; background:#2F5FE0; transition:transform .2s ease, background .2s ease; }
    .${cls}__btn:hover{ background:#2450C4; transform:translateY(-2px); }
    .${cls}__btn svg{ width:16px; height:16px; }
    @media (min-width:901px){ .${cls}__grid{ grid-template-columns:repeat(3,1fr) !important; } }
    .${cls}__card a, .${cls}__link{ text-decoration:none !important; }
    .${cls}__lead{ max-width:720px; margin:12px auto 0; text-align:center; font-size:16px; line-height:1.7; color:#5B6472 !important; }`)
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>${lead ? `
      <p class="${cls}__lead">${esc(lead)}</p>` : ""}
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
    </div>${cta ? formBtn(cls, cta) : ""}
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
const agencyBand = (p, city, title, text) => `${head(city, 'Working with Agencies')}<section class="mw-${p}-agency">
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
      <span class="mw-${p}-agency__eyebrow">For Agencies</span>
      <h2 class="mw-${p}-agency__title">${esc(title)}</h2>
      ${text ? `<p class="mw-${p}-agency__text">${esc(text)}</p>` : ""}
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

// "Finding overseas media" block: heading, short text and a button that opens the China form
const findMedia = (p, city, title, text, cta) => {
  const cls = `mw-${p}-find`
  const st = addCss(styleFrom(hzCode, 'mw-hz-challenge', cls), `    .${cls}__lead{ max-width:760px; margin:0 auto; text-align:center; font-size:17px; line-height:1.75; color:#3B4452 !important; }
    .${cls}__lead strong{ color:#101828 !important; }`)
  return `${head(city, title)}<section class="${cls}">
  ${st}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${esc(title)}</h2>
    </div>
    <p class="${cls}__lead">${text}</p>${formBtn(cls, cta)}
  </div>
</section>`
}

const REGIONS = [
  ['globe', 'Southeast Asia', (a) => `${lnk('Singapore', a)} (Moving Walls' HQ), ${lnk('Malaysia', a)}, ${lnk('Thailand', a)}, ${lnk('Indonesia', a)} and ${lnk('the Philippines', a)}`],
  ['sun', 'Middle East', (a) => `${lnk('UAE', a)}, ${lnk('Saudi Arabia', a)} and ${lnk('Qatar', a)}`],
  ['city', 'Europe', (a) => `${lnk('UK', a)}, ${lnk('Germany', a)} and the ${lnk('Netherlands', a)}`],
  ['flag', 'Americas', () => 'US, Canada, Mexico, Colombia, Brazil and wider LATAM'],
  ['mountain', 'Africa', (a) => `${lnk('South Africa', a)} and wider markets`],
  ['target', 'Asia-Pacific', (a) => `${lnk('Japan', a)}, ${lnk('South Korea', a)}, ${lnk('Hong Kong', a)}, ${lnk('Taiwan', a)} and ${lnk('Australia', a)}`],
]
const REGIONS_LEAD = "These are some of the markets we support. Tell us where you plan to go and we'll look at what's available."
const FORMATS = MEDIA([
  'High-impact screens in prime urban locations',
  'Premium placements across international terminals',
  'Metro, rail, and bus coverage across major cities',
  'High-traffic retail and commercial hubs',
])
const CHALLENGES = [
  ['Hard to know where to find the right overseas media', 'Access to a large global media network across 20+ countries'],
  ['Different countries often mean different media owners and workflows', 'Coordinate across media owners and countries in a single workflow'],
  ['Approvals, creatives, and reporting multiply across markets', 'One connected platform, from planning to execution and measurement'],
  ['Performance is hard to compare between regions', 'Standardised reporting for consistent measurement'],
]
const STEPS = [
  ['target', 'Plan', 'Use audience and location insights to find the right consumers in each market.'],
  ['bolt', 'Activate', 'Run campaigns across media owners and countries from one platform.'],
  ['bars', 'Measure', 'See performance across markets with standardised reporting.'],
]
const DIGITAL = ['Search, social, and online video drive engagement. DOOH complements them by taking your brand into the physical world, reaching audiences in <strong>airports, transit networks, malls, and business districts</strong> throughout their daily routines, for a more consistent customer experience.']
const FIND_TEXT = "Not sure where to find the right media overseas? Moving Walls connects you to a global network spanning <strong>20+ countries and 850K+ billboard inventory</strong>. Tell us your target markets, and our team can help you find the right overseas OOH opportunities."
const READY_TEXT = "Whether you're entering one new market or launching across several regions, Moving Walls helps you plan, activate, and measure international DOOH with confidence."


// ---- Suzhou, Qingdao, Xiamen (sections in each doc's order) ----
const FIND_SHORT = 'Not sure where to find the right media overseas? Moving Walls has a large global media network, with <strong>850K+ billboard inventory across 20+ countries</strong>.'
const FORMATS_PROSE = 'Digital billboards in prime urban locations, airport networks across international terminals, transit advertising on metro, rail, and bus networks, and mall and business district networks.'


// "Where to start" block: find-media heading, text, a numbered list, then the form button
const startBlock = (p, city, title, text, items) => findMedia(p, city, title, text, 'Talk to Our Team')
  .replace('</style>', `    .mw-${p}-find__list{ max-width:680px; margin:24px auto 0 !important; padding:0 !important; list-style:none !important; counter-reset:st; display:grid; gap:12px; }
    .mw-${p}-find__list li{ counter-increment:st; display:flex; gap:14px; align-items:flex-start; background:#fff; border:1px solid #E2E6ED; border-radius:12px; padding:14px 18px; font-size:15.5px; line-height:1.6; color:#3B4452; list-style:none !important; }
    .mw-${p}-find__list li::before{ content:counter(st); flex:0 0 28px; height:28px; border-radius:50%; background:#12296B; color:#fff; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center; }
    .mw-${p}-find__list strong{ color:#101828; }
  </style>`)
  .replace(/(<p class="mw-[a-z0-9]+-find__lead">[\s\S]*?<\/p>)/, `$1
    <ol class="mw-${p}-find__list">${items.map((t) => `<li><span>${t}</span></li>`).join('')}</ol>`)

const changshaCode = [
  prose('cs', 'why', 'Changsha', 'Changsha: China’s First UNESCO City of Media Arts', [
    'Changsha is the capital of Hunan, with <strong>more than 10 million residents</strong>. It became China’s first UNESCO City of Media Arts in 2017.',
  ]),
  // Find / Run / Measure as three cards, with the doc's "Talk to Our Team" button
  challenge('cs', 'Changsha', 'Your Overseas Media Plan, Simplified', [
    ['search', 'Find', 'Not sure where to find the right media overseas? Tell us your target markets, and our team can help you find the right overseas OOH opportunities across a global network of 20+ countries and 850K+ billboard inventory.'],
    ['nodes', 'Run', 'Coordinate campaigns across media owners and countries from one platform, instead of working with a different partner in every market.'],
    ['bars', 'Measure', 'Standardised reporting lets you compare performance consistently across regions.'],
  ], 'Talk to Our Team').replace('</style>', '  @media (min-width:901px){ .mw-cs-challenge__grid{ grid-template-columns:repeat(3,1fr) !important; max-width:1100px; margin:0 auto; } }\n  </style>'),
  regionCards('cs', 'Changsha', 'Where Would You Like to Go?', REGIONS.map(([icon, r, html]) => [icon, r, (a) => html(a).replace("(Moving Walls' HQ)", '(our HQ)') + ({
    'Southeast Asia': '. Fast-growing markets with strong DOOH networks.',
    'Middle East': '. Reach business hubs, luxury retail, airports, and international travellers.',
    Europe: '. Mature markets with programmatic DOOH and measurable performance.',
    'Asia-Pacific': '. Premium, highly urban audiences.',
  }[r] || '')]), 'See All Locations', REGIONS_LEAD),
  prose('cs', 'formats', 'Changsha', 'Where Your Campaign Can Appear', ['Digital billboards in prime urban locations, airport networks across international terminals, transit advertising on metro, rail, and bus networks, and mall and business district networks in high-traffic retail and commercial hubs.'], '#F6F8FC'),
  prose('cs', 'hard', 'Changsha', 'What Makes Media Buying Overseas Hard', ['Different countries often mean different media owners and workflows. Approvals, creatives, and reporting multiply across markets, and performance is hard to compare between regions. Moving Walls brings <strong>planning, execution, and measurement together on one connected platform</strong>.']),
  prose('cs', 'digital', 'Changsha', 'Media That Works Alongside Digital', ['Search, social, and online video drive engagement. DOOH extends your brand into the physical world, reaching audiences in <strong>airports, transit networks, malls, and business districts</strong> throughout their daily routines.'], '#F6F8FC'),
  caseStudy('cs', 'Changsha', 'Campaign Example: Calvin Klein in Vietnam', '', 'Read the Case Study', true),
  agencyBand('cs', 'Changsha', 'Planning for a Client?', ''),
].join('\n\n')
if (/mw-hz-|mw-sz-|Hangzhou|Shenzhen|Nanjing|Wuhan|Suzhou|Qingdao|Xiamen/.test(changshaCode)) throw new Error('Template copy left in Changsha')

// Hero photo Dg supplied 11 Nov 2026 (Desktop "outdoor digital screen in Changsha.jpg", converted to webp)
const HERO_IMG = { _type: 'image', alt: 'Outdoor digital screen in Changsha', asset: { _type: 'reference', _ref: 'image-3f15dd3f1f16861771d4e50d72f49a7f64b95f50-960x540-webp' } }
const faq = (list) => list.map(([question, answer]) => ({ _key: k(), question, answer }))
const changsha = {
  _id: 'drafts.city-china-changsha',
  _type: 'locationCity',
  country: { _type: 'reference', _ref: CHINA },
  city: 'Changsha',
  slug: { _type: 'slug', current: 'changsha' },
  isActive: true,
  heroImage: HERO_IMG,
  heroTitle: 'A City of Media Arts Goes Global: Overseas DOOH for Changsha Agencies and Brands',
  fullDescription: 'Changsha has built a name in media. For agencies and brands taking the next step overseas, the challenge is finding the right media owners, locations, and formats in new markets. Moving Walls gives you a large global media network and one connected platform to plan, activate, and measure Digital Out-of-Home (DOOH) campaigns across 20+ countries.',
  description: 'From China’s first UNESCO City of Media Arts to 20+ countries: plan, activate and measure overseas DOOH from one platform.',
  ctaButtonText: "Let's Talk",
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  sectionsPosition: 'before-faqs',
  sections: [
    { ...embedBase, _key: k(), code: changshaCode },
    { ...logos, _key: k() },
    { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: 'Ready to Go Beyond Changsha?', subheading: READY_TEXT, ctaText: 'Book a Strategy Session', ctaLink: FORM },
  ],
  faqs: faq([
    ['How can Changsha brands find the right media overseas?', 'Moving Walls has a large global media network across 20+ countries, and our team can help you find the right overseas OOH opportunities for your target markets.'],
    ['Which overseas markets can we reach?', 'Southeast Asia, the Middle East, Africa, Europe, the Americas, and Asia-Pacific.'],
    ['Can we run several countries from one place?', 'Yes. Moving Walls lets you coordinate across media owners and countries through a single workflow.'],
    ['Is it possible to start with one market?', 'Yes. Whether you’re entering one new market or launching across multiple regions, Moving Walls can help.'],
    ['Can our agency plan this for a client?', 'Yes. Agencies and brands can plan, activate, and measure international DOOH campaigns through one platform.'],
    ['How do we get started?', 'Book a strategy session with our team.'],
  ]),
  seo: { _type: 'seo', metaTitle: 'Changsha-to-Global DOOH Advertising', metaDescription: 'Overseas DOOH for Changsha agencies and brands. Plan, activate and measure campaigns across 20+ countries and 850K+ billboards from one platform.', enableKeywords: false, noIndex: false, ogImage: HERO_IMG },
}

if (await c.fetch('count(*[_type=="locationCity" && slug.current=="changsha" && country._ref==$cn && !(_id in ["city-china-changsha","drafts.city-china-changsha"])])', { cn: CHINA })) throw new Error('Slug in use: changsha')
await c.createOrReplace(changsha)
console.log('Draft created: /locations/china/changsha')
