// Creates DRAFTS (11 Nov 2026) from the "US Market - Hyperlocal landing page" Google Doc:
//  - United States country page (/locations/united-states), same look and layout as the live Germany page
//  - 6 market pages under it: New York, Los Angeles, Chicago, San Francisco, Florida, New Jersey
//    (/locations/united-states/<slug>), built from the same Germany section styles
// All buttons use the Americas contact form (as on the Americas pages). Florida uses the doc's "REVISED" version.
// Card blurbs and SEO were written where the doc has none.
// The country page is new, so the city drafts reference it weakly; make the reference strong when publishing.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const US_ID = 'location-united-states'
const GERMANY = 'b1de0415-56cf-4916-8914-9de17f0d3173'
const americas = await c.fetch('*[_type=="location" && slug.current=="americas"][0]{contactFormUrl}')
const FORM = americas.contactFormUrl // AmericasContact
const de = await c.getDocument(GERMANY)
const deEmbed = de.sections.find((s) => s._type === 'customEmbed')
const logos = de.sections.find((s) => s._type === 'logoCarousel')
const k = () => Math.random().toString(36).slice(2, 14)

// Germany section CSS, renamed to a new class prefix
const styleOf = (name, cls) => {
  const m = deEmbed.code.match(new RegExp(`<section class="mw-de-${name}">\\s*(<style>[\\s\\S]*?</style>)`))
  if (!m) throw new Error('No Germany style for ' + name)
  return m[1].replace(new RegExp(`mw-de-${name}`, 'g'), cls)
}
const addCss = (style, css) => style.replace(/<\/style>$/, `${css}\n  </style>`)

const ICON = {
  pin: '<path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  nodes: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><line x1="8" y1="7.5" x2="10.5" y2="16"/><line x1="16" y1="7.5" x2="13.5" y2="16"/><line x1="8.5" y1="6" x2="15.5" y2="6"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  bars: '<line x1="4" y1="20" x2="4" y2="13"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="20" y1="20" x2="20" y2="15"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  check: '<circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9.5"/>',
  search: '<circle cx="10" cy="10" r="6"/><line x1="21" y1="21" x2="15" y2="15"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15 20c0-2.5 1.5-4.5 4-5"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  plane: '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
  train: '<rect x="5" y="4" width="14" height="13" rx="3"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="9" cy="14.5" r="1.2"/><circle cx="15" cy="14.5" r="1.2"/><path d="M8 20l-2 2"/><path d="M16 20l2 2"/>',
  road: '<path d="M8 3 4 21"/><path d="M16 3l4 18"/><line x1="12" y1="5" x2="12" y2="8"/><line x1="12" y1="11" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="20"/>',
  bag: '<path d="M6 8V6a6 6 0 0 1 12 0v2"/><rect x="3" y="8" width="18" height="13" rx="2"/><line x1="3" y1="13" x2="21" y2="13"/>',
  screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  star: '<polygon points="12 2 15 9 22 9.5 16.5 14 18 21 12 17 6 21 7.5 14 2 9.5 9 9"/>',
  city: '<rect x="3" y="10" width="5" height="11"/><rect x="10" y="6" width="5" height="15"/><rect x="17" y="13" width="4" height="8"/><line x1="2" y1="21" x2="22" y2="21"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3.3" y1="12" x2="20.7" y2="12"/>',
  wave: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 3v5"/>',
  megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 8a5 5 0 0 1 0 8"/>',
}
// Card icon picked from the card title
const ICON_RULES = [
  [/airport|travell|lax|o’hare/i, 'plane'], [/transit|subway|rail|commut/i, 'train'], [/freeway|road|corridor/i, 'road'],
  [/coast|shore|santa monica|gulf|waterfront/i, 'wave'], [/retail|shopping|shopper|soho|fashion/i, 'bag'],
  [/digital|billboard|screen|display|static/i, 'screen'], [/street furniture/i, 'pin'],
  [/tourism|visitor|entertainment|hollywood|event|times square|culture|creativ/i, 'star'],
  [/business|corporate|financ|professional|b2b|technology/i, 'briefcase'], [/america|expansion|regional|beyond|market entry|multi/i, 'globe'],
  [/measure|evaluat|insight/i, 'bars'], [/consumer|audience|communit|commuter/i, 'users'], [/programmatic|activat/i, 'bolt'],
  [/launch|promotion|awareness|reinforce/i, 'megaphone'], [/intelligence|planning/i, 'target'],
]
const iconFor = (title) => (ICON_RULES.find(([re]) => re.test(title)) || [null, 'city'])[1]
const svg = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg>`
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
const LINK = (href, text) => `<a href="${href}" style="color:#2F5FE0;font-weight:600;text-decoration:none">${text}</a>`

// A plain Zoho link opens the site's shared form popup (with referrer/UTM tagging); other links navigate
const btn = (cls, text, href = FORM) => `
    <div class="${cls}__cta">
      <a class="${cls}__btn" href="${href}">${text} ${ARROW}</a>
    </div>`
const outlineBtns = (cls, items) => `
    <div class="${cls}__cta" style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
      ${items.map(([t, h]) => `<a class="${cls}__btn ${cls}__btn--ghost" href="${h}">${t} ${ARROW}</a>`).join('\n      ')}
    </div>`
const intro = (cls, d) => `
    <div class="${cls}__intro">${d.eyebrow ? `\n      <span class="${cls}__eyebrow">${d.eyebrow}</span>` : ''}
      <h2 class="${cls}__title">${d.title}</h2>${(d.leads || []).map((t) => `\n      <p class="${cls}__lead" style="margin-top:12px">${t}</p>`).join('')}
    </div>`
const note = (t) => (t ? `\n    <p style="max-width:860px;margin:28px auto 0;text-align:center;font-size:13.5px;line-height:1.6;color:#5B6472;font-style:italic">${t}</p>` : '')
const bgCss = (cls, bg) => (bg ? `\n    .${cls}{ background:${bg} !important; }` : '')

// Numbered steps (Germany "prog" styling); columns follow the number of steps
const steps = (p, alias, d) => {
  const cls = `mw-${p}-${alias}`
  const n = d.steps.length
  const st = addCss(styleOf('prog', cls), `    @media (min-width:901px){ .${cls}__steps{ grid-template-columns:repeat(${Math.min(n, 4)},1fr) !important; } }${bgCss(cls, d.bg)}
    .custom-embed .${cls}__btn--ghost{ background:#fff !important; color:#2F5FE0 !important; border:1.5px solid #2F5FE0; }
    .custom-embed .${cls}__btn--ghost:hover{ background:#2F5FE0 !important; color:#fff !important; }`)
  return `<section class="${cls}">
  ${st}
  <div class="${cls}__container">${intro(cls, d)}
    <ol class="${cls}__steps">${d.steps.map(([icon, h, t], i) => `
      <li class="${cls}__step">
        <div class="${cls}__icon-wrap">
          <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
          <span class="${cls}__badge">0${i + 1}</span>
        </div>
        <h3>${h}</h3>
        <p>${t}</p>
      </li>`).join('')}
    </ol>${d.links ? outlineBtns(cls, d.links) : d.cta ? btn(cls, d.cta, d.ctaHref) : ''}
  </div>
</section>`
}
// Cards (Germany "cap" styling, as plain cards); optional small label per card
const cards = (p, alias, d) => {
  const cls = `mw-${p}-${alias}`
  const st = addCss(styleOf('cap', cls), `    .custom-embed .${cls}__card{ cursor:default; border-top:3px solid #2F5FE0 !important; }
    .${cls}__ico{ width:44px; height:44px; border-radius:12px; background:#EAF0FE; color:#2F5FE0; display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
    .${cls}__ico svg{ width:22px; height:22px; }
    .${cls}__grid{ display:flex !important; flex-wrap:wrap; justify-content:center; align-items:stretch !important; gap:22px !important; }
    .${cls}__grid > .${cls}__card{ align-self:stretch !important; height:auto !important; }
    .${cls}__grid > .${cls}__card{ flex:0 1 calc((100% - ${((d.cols || 3) - 1) * 22}px) / ${d.cols || 3}); min-width:0; }
    @media (max-width:900px){ .${cls}__grid > .${cls}__card{ flex-basis:calc((100% - 22px) / 2); } }
    @media (max-width:600px){ .${cls}__grid > .${cls}__card{ flex-basis:100%; } }${bgCss(cls, d.bg)}`)
  return `<section class="${cls}">
  ${st}
  <div class="${cls}__container">${intro(cls, d)}
    <div class="${cls}__grid">${d.cards.map(([label, h, t]) => `
      <div class="${cls}__card">
        <span class="${cls}__ico" aria-hidden="true">${svg(iconFor(h.replace(/<[^>]+>/g, '')))}</span>${label ? `\n        <span class="${cls}__name">${label}</span>` : ''}
        <h3>${h}</h3>
        <p>${t}</p>
      </div>`).join('')}
    </div>${note(d.note)}${d.cta ? btn(cls, d.cta, d.ctaHref) : ''}
  </div>
</section>`
}
// Text section (Germany "final" styling: centred heading, paragraphs, optional button)
const prose = (p, alias, d) => {
  const cls = `mw-${p}-${alias}`
  const st = addCss(styleOf('final', cls), `    .${cls}__container{ max-width:860px !important; }
    .custom-embed .${cls}__lead{ margin:0 0 16px !important; }
    .${cls}__lead:last-of-type{ margin-bottom:${d.cta ? '32px' : '0'} !important; }${bgCss(cls, d.bg)}`)
  return `<section class="${cls}">
  ${st}
  <div class="${cls}__container">${d.eyebrow ? `\n    <p style="margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2F5FE0">${d.eyebrow}</p>` : ''}
    <h2 class="${cls}__title">${d.title}</h2>
    ${d.leads.map((t) => `<p class="${cls}__lead">${t}</p>`).join('\n    ')}${d.cta ? `
    <a class="${cls}__btn" href="${d.ctaHref || FORM}">${d.cta} ${ARROW}</a>` : ''}
  </div>
</section>`
}
// Stat tiles (own small style, Germany colour tokens) with intro text
const stats = (p, alias, d) => {
  const cls = `mw-${p}-${alias}`
  return `<section class="${cls}">
  <style>
    .${cls}{ background:${d.bg || '#F6F8FC'}; padding:clamp(56px,8vw,96px) 24px; box-sizing:border-box; }
    .${cls} *{ box-sizing:border-box; }
    .${cls}__container{ max-width:1160px; margin:0 auto; }
    .${cls}__intro{ max-width:760px; margin:0 auto 44px; text-align:center; }
    .custom-embed .${cls}__title{ font-size:clamp(28px,4vw,38px); font-weight:800; line-height:1.15; color:#101828 !important; margin:0 0 14px; }
    .custom-embed .${cls}__lead{ font-size:16.5px; line-height:1.65; color:#5B6472 !important; margin:0 0 12px; }
    .${cls}__grid{ display:grid; grid-template-columns:repeat(${d.items.length},1fr); gap:20px; }
    .${cls}__stat{ background:#fff; border:1px solid #E2E6ED; border-top:3px solid #2F5FE0; border-radius:16px; padding:28px 22px; text-align:center; box-shadow:0 4px 20px rgba(16,24,40,.06); }
    .custom-embed .${cls}__num{ display:block; font-size:clamp(30px,3.6vw,40px); font-weight:800; color:#12296B !important; line-height:1.1; margin-bottom:8px; }
    .custom-embed .${cls}__label{ display:block; font-size:14px; line-height:1.5; color:#5B6472 !important; }
    @media (max-width:900px){ .${cls}__grid{ grid-template-columns:1fr 1fr; } }
    @media (max-width:520px){ .${cls}__grid{ grid-template-columns:1fr; } }
  </style>
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <h2 class="${cls}__title">${d.title}</h2>${(d.leads || []).map((t) => `\n      <p class="${cls}__lead">${t}</p>`).join('')}
    </div>
    <div class="${cls}__grid">${d.items.map(([n, l]) => `
      <div class="${cls}__stat"><span class="${cls}__num">${n}</span><span class="${cls}__label">${l}</span></div>`).join('')}
    </div>${(d.after || []).map((t) => `\n    <p style="max-width:860px;margin:28px auto 0;text-align:center;font-size:16px;line-height:1.7;color:#5B6472">${t}</p>`).join('')}
  </div>
</section>`
}

// Page composer: tighter section spacing and alternating white / light-grey backgrounds
// (the dark measurement band keeps its own background)
const compose = (p, sections) => {
  const out = sections.map((html, i) => {
    const cls = html.match(/<section class="([^"]+)"/)[1]
    if (cls.endsWith('-measure')) return html
    const bg = i % 2 === 0 ? '#FFFFFF' : '#F6F8FC'
    return html.replace('</style>', `    .${cls}{ background:${bg} !important; }\n  </style>`)
  })
  return `<style>
  .custom-embed section[class^="mw-${p}-"]{ padding-top:clamp(40px,5vw,64px) !important; padding-bottom:clamp(40px,5vw,64px) !important; }
  .custom-embed [class^="mw-${p}-"][class$="__intro"]{ margin-bottom:36px !important; }
  .custom-embed [class^="mw-${p}-"][class$="__cta"]{ margin-top:32px !important; }
  .custom-embed [class^="mw-${p}-"][class$="__stat"]:hover, .custom-embed [class^="mw-${p}-"][class$="__card"]:hover{ transform:translateY(-3px); box-shadow:0 14px 32px rgba(16,24,40,.10); }
</style>
${out.join('\n\n')}`
}

// ---------------- United States (country page, Germany layout) ----------------
const usCode = compose('us', (() => {
  const p = 'us'
  const goals = (() => {
    const cls = 'mw-us-goals'
    const st = addCss(styleOf('goals', cls), `    @media (min-width:861px){ .${cls}__grid{ grid-template-columns:1fr !important; max-width:640px; margin:0 auto; } }`)
    return `<section class="${cls}">
  ${st}
  <div class="${cls}__container">${intro(cls, { eyebrow: 'Choose your path', title: 'What Are You Looking to Achieve?', leads: ['Moving Walls supports agencies planning and activating DOOH across the United States.'] })}
    <div class="${cls}__grid">
      <div class="${cls}__card">
        <span class="${cls}__tag">For Agencies</span>
        <h3>Plan and Activate Multi-Market DOOH Campaigns More Efficiently</h3>
        <p>Bring U.S. OOH into your wider media strategy without managing every market and media owner through disconnected workflows.</p>
        <ul class="${cls}__list">
          ${['Audience and location-led planning', 'Direct and programmatic activation', 'Multi-market campaign coordination', 'Measurement and reporting', 'Flexible campaign scope'].map((t) => `<li>${TICK}${t}</li>`).join('\n          ')}
        </ul>
        <a class="${cls}__btn" href="${FORM}">Explore Campaign Solutions ${ARROW}</a>
      </div>
    </div>
  </div>
</section>`
  })()
  const measure = (() => {
    const cls = 'mw-us-measure'
    return `<section class="${cls}">
  ${styleOf('measure', cls)}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <span class="${cls}__eyebrow">Measurement</span>
      <h2 class="${cls}__title">Make Your DOOH Activity Easier to Understand</h2>
      <p class="${cls}__kicker">Measurement should help your team understand more than whether a campaign was delivered.</p>
      <p class="${cls}__lead">Moving Walls supports planning, verification and measurement workflows that help you understand audience, location and campaign performance signals.</p>
    </div>
    <div class="${cls}__timeline">
      <div class="${cls}__rail" aria-hidden="true"></div>${[['target', 'Before the Campaign', 'Use data to support market, location and audience planning.'], ['eye', 'During the Campaign', 'Monitor delivery and available campaign signals.'], ['bars', 'After the Campaign', 'Bring relevant reporting into one view, including brand lift where required, to support evaluation and future planning.']].map(([i, h, t]) => `
      <div class="${cls}__stop">
        <span class="${cls}__node" aria-hidden="true">${svg(i)}</span>
        <h3>${h}</h3>
        <p>${t}</p>
      </div>`).join('')}
    </div>${btn(cls, 'Explore Measurement Capabilities')}
  </div>
</section>`
  })()
  const cap = (() => {
    const cls = 'mw-us-cap'
    const items = [
      ['MW Planner', '/mw-planner', 'For audience and location-led planning', 'Plan DOOH campaigns using audience and location intelligence and multi-market forecasts.', 'Agencies and media planners.'],
      ['MW Activate', '/mw-activate', 'For campaign activation', 'Execute and optimise DOOH campaigns based on campaign requirements.', 'Agencies, programmatic buyers and campaign teams.'],
      ['MW Measure', '/mw-measure', 'For measurement and attribution', 'Measure campaign performance using real-world signals and brand lift.', 'Agencies looking for clearer performance visibility.'],
      ['MW Market', '/mw-market', 'For accessing DOOH inventory', 'Access digital, static and transit inventory across relevant U.S. markets, subject to availability.', 'Agencies and media buyers.'],
    ]
    const st = addCss(styleOf('cap', cls), `    @media (min-width:901px){ .${cls}__grid{ grid-template-columns:repeat(4,1fr) !important; } }`)
    return `<section class="${cls}">
  ${st}
  <div class="${cls}__container">${intro(cls, { eyebrow: 'Solutions', title: 'Choose the Capabilities That Fit Your Setup', leads: ['Whether you’re planning national campaigns or activating media in a single U.S. market, Moving Walls lets you focus on the capabilities relevant to your current workflow.'] })}
    <div class="${cls}__grid">${items.map(([n, h, t3, t, fit]) => `
      <a class="${cls}__card" href="${h}">
        <span class="${cls}__name">${n}</span>
        <h3>${t3}</h3>
        <p>${t}</p>
        <p class="${cls}__fit"><strong>Best suited for:</strong> ${fit}</p>
        <span class="${cls}__link">Learn more ${ARROW}</span>
      </a>`).join('')}
    </div>
    <div class="${cls}__banner">
      <span class="${cls}__banner-icon" aria-hidden="true">${svg('layers')}</span>
      <p><strong>Supporting Intelligence</strong> — ${LINK('/mw-science', 'MW Science')} provides audience and mobility intelligence, while ${LINK('/mw-influence', 'MW Influence')} supports audience-led targeting across screen networks.</p>
    </div>
    <p style="max-width:860px;margin:28px auto 0;text-align:center;font-size:16px;line-height:1.7;color:#5B6472">When pDOOH is used as an extension of digital and social media campaigns, it can create opportunities for incremental reach beyond online channels. By adding exposure across physical environments such as roads, transit networks, airports and retail locations, pDOOH helps brands connect with audiences at different touchpoints and complements their existing digital media investments.</p>${btn(cls, 'Talk to Us About Your Setup')}
  </div>
</section>`
  })()
  return [
    steps(p, 'flow', { eyebrow: 'How It Works', title: 'Simplify DOOH Planning and Operations Across the United States', leads: ['Planning and operating OOH across the U.S. can involve dozens of media owners, markets, formats, buying methods and reporting processes. Moving Walls brings these activities into a more connected workflow, helping your team plan campaigns, activate media and understand performance with greater visibility.'], steps: [
      ['target', 'Plan with More Context', 'Use audience and location intelligence, performance estimates and campaign requirements to guide media planning across markets.'],
      ['bolt', 'Activate with Flexibility', 'Support direct and programmatic DOOH activation based on campaign requirements, budgets and available inventory.'],
      ['bars', 'Measure More Consistently', 'Bring campaign delivery and available performance signals from every market into a clearer and more transparent reporting workflow.'],
    ] }),
    goals,
    steps(p, 'prog', { eyebrow: 'Programmatic DOOH', title: 'Bring More Flexibility to Programmatic DOOH', leads: [`Programmatic DOOH can add flexibility to campaign activation, but planning, buying and reporting often sit across different systems. Moving Walls helps connect these workflows, and ${LINK('/mw-activate', 'MW Activate')} integrates with the DSPs, SSPs and ad servers your team already uses.`], steps: [
      ['target', 'Plan', 'Identify relevant audiences, markets and media environments.'],
      ['bolt', 'Activate', 'Support programmatic or direct activation based on the campaign.'],
      ['nodes', 'Manage', 'Coordinate campaign activity across markets and partners.'],
      ['bars', 'Report', 'Bring campaign delivery into a more consistent reporting workflow.'],
    ], cta: 'See the Workflow' }),
    measure,
    cap,
    prose(p, 'final', { title: 'Ready to Explore DOOH in the United States?', leads: ['Whether you’re planning a national campaign or looking for a more connected MediaTech workflow, we can focus the demo around your current priorities.'], cta: 'Request a Demo' }),
  ]
})())

// ---------------- Market pages ----------------
const AMERICAS = '/locations/americas'
const PAGES = [
  {
    p: 'ny', slug: 'new-york', name: 'New York', order: 1,
    h1: 'Make an Impact with DOOH Advertising in New York',
    hero: 'New York City is home to approximately 8.55 million residents, making it one of the largest urban markets in the United States. As a major global financial and commercial centre, the city brings together businesses across financial services, technology, media, retail and tourism. Its prominent business districts, shopping destinations and extensive transportation networks create diverse environments for digital out-of-home (DOOH) advertising.\n\nMoving Walls combines audience intelligence, mobility insights and campaign planning capabilities to help advertisers assess relevant media opportunities and plan campaigns across New York.',
    heroCta: 'Explore Advertising Opportunities in New York',
    card: 'Reach commuters, professionals and visitors across Times Square, Midtown, the Financial District, SoHo and Brooklyn with DOOH.',
    seo: ['New York DOOH Advertising | Digital Out-of-Home Campaigns', 'Plan DOOH advertising in New York across subway, airport, billboard and retail environments, from Times Square and Midtown to SoHo and Brooklyn.'],
    sections: (p) => [
      cards(p, 'land', { title: 'New York’s OOH Advertising Landscape', cta: 'Explore New York Media Options', leads: ['From underground transit networks to prominent digital displays, New York offers advertisers access to a variety of physical media environments.'], cols: 4, cards: [
        ['Transit', 'Subway, Bus &amp; Rail Advertising', 'New York’s extensive public transportation network connects residential neighbourhoods with employment centres, shopping destinations and entertainment districts. Transit advertising provides opportunities to reach audiences throughout their daily journeys.'],
        ['Airports', 'Airport Media', 'JFK, Newark Liberty and LaGuardia connect the metropolitan region with domestic and international destinations. Airport placements can be considered for campaigns targeting frequent travelers, international visitors and business audiences.'],
        ['Digital', 'Digital Billboard Advertising', 'Digital displays offer brands the flexibility to use scheduled creative, time-sensitive messaging and visually prominent formats across suitable commercial locations.'],
        ['Retail', 'Retail &amp; Shopping Environments', 'Shopping centres and retail media placements can support promotional activity, product introductions and brand communication in consumer-facing environments.'],
      ] }),
      stats(p, 'aud', { title: 'Understanding the New York Audience', leads: ['New York City has approximately 8.55 million residents, making it a substantial consumer and business market. Its population is supported by a metropolitan economy with strong representation across financial services, technology, media, tourism, retail and professional services.'], items: [
        ['8.55M', 'New York City residents'], ['~1.3B', 'Subway rides in 2025 (472 stations)'], ['142M+', 'Passenger movements across JFK, Newark Liberty and LaGuardia (2025)'], ['65M', 'Visitors to New York City (2025)'],
      ], after: ['Transportation plays a significant role in how people move through the city, with approximately 4 million subway rides on an average weekday. For media planners, these figures provide important context when evaluating the city’s advertising environments. Residential population, commuter activity, business concentrations and visitor movements can all inform location and audience considerations during campaign development.'] }),
      cards(p, 'districts', { title: 'Five Key New York Districts for OOH Advertising', cta: 'Plan Your New York Campaign', leads: ['New York’s commercial districts offer distinct advertising environments, shaped by their business activity, retail presence, tourism and local audiences.'], cols: 3, cards: [
        ['High-Visibility Advertising and Entertainment', 'Times Square', 'Known for its prominent digital displays, theatres and constant visitor activity, Times Square is one of New York’s most recognisable advertising destinations. Its connection to the city’s busiest subway station makes it an important location for brands seeking visibility among commuters, tourists and urban audiences.'],
        ['Business and Corporate Audiences', 'Midtown &amp; Hudson Yards', 'With major corporate offices, premium commercial developments, hotels and transport connections, Midtown and Hudson Yards attract professionals, executives and business travelers. These districts are relevant for campaigns targeting corporate decision-makers and premium consumer segments.'],
        ['Finance and Professional Services', 'Financial District', 'Centred around Wall Street and Lower Manhattan’s financial institutions, the Financial District is a major business destination. It offers a relevant setting for campaigns targeting finance professionals, corporate audiences and decision-makers across the financial services and technology sectors.'],
        ['Fashion, Retail and Lifestyle', 'SoHo', 'SoHo is recognised for its fashion boutiques, flagship stores, art galleries and lifestyle destinations. Its retail-led environment makes it relevant for brands in fashion, beauty, luxury goods and consumer lifestyle categories seeking to connect with shoppers and visitors.'],
        ['Business, Creativity and Urban Culture', 'Brooklyn', 'Brooklyn brings together established commercial centres and neighbourhoods known for creative businesses, independent retail and cultural activity. Downtown Brooklyn has a strong business and educational presence, while Williamsburg attracts creative enterprises, lifestyle brands and visitors interested in the area’s cultural scene.'],
      ] }),
      steps(p, 'intel', { title: 'Bringing Intelligence into OOH Campaign Management', cta: 'Talk to Our Team', leads: ['Moving Walls supports the campaign process through connected planning, audience intelligence and measurement capabilities.'], steps: [
        ['check', 'Campaign Delivery', 'Monitor campaign delivery data to assess whether planned OOH and DOOH activities have been executed as intended.'],
        ['users', 'Audience &amp; Location Insights', 'Apply audience intelligence and location data to understand the audiences and media environments associated with a campaign.'],
        ['bars', 'Performance Evaluation', 'Review campaign intelligence to assess performance and identify learnings that can guide future planning.'],
        ['layers', 'Cross-Channel Measurement', 'Combine OOH campaign delivery and performance insights with information from other marketing channels to develop a broader view of campaign effectiveness.'],
      ] }),
      prose(p, 'pdooh', { title: 'Driving Incremental Reach Through pDOOH', leads: ['pDOOH extends digital and social media campaigns into physical environments such as transit networks, airports, retail destinations and digital billboards. This helps brands reach audiences beyond online channels and can create opportunities for incremental campaign reach. It complements existing digital media investments by connecting with audiences across different touchpoints.'] }),
    ],
    banner: ['Plan Your New York DOOH Campaign', 'Tell us your target audience, preferred districts, campaign dates and objectives, and we’ll help you assess suitable OOH and DOOH opportunities across New York.', 'Explore Advertising Opportunities in New York'],
    faqs: [
      ['What makes New York suitable for digital out-of-home advertising?', 'New York combines a large resident population, substantial daily transit activity, international passenger traffic and prominent commercial districts. These characteristics create multiple environments for advertisers to consider when planning DOOH campaigns.'],
      ['Where can brands explore OOH advertising in New York?', 'Relevant advertising environments include subway and bus networks, commuter rail, airports, digital billboards and retail destinations. Specific placements depend on media-owner inventory, location and campaign requirements.'],
      ['What should advertisers consider when planning a New York DOOH campaign?', 'Advertisers should consider their target audience, campaign objectives, preferred locations, creative requirements, media availability and measurement needs. Audience and mobility insights can help inform location selection and campaign planning.'],
      ['Can Moving Walls support campaigns targeting different New York audiences?', 'Moving Walls provides audience intelligence, location insights and campaign planning capabilities that can help brands and agencies evaluate advertising opportunities based on their campaign objectives and audience requirements.'],
      ['How does Moving Walls support OOH campaign measurement?', 'Moving Walls brings campaign delivery information, audience intelligence and location data into the campaign evaluation process. These insights can help advertisers review campaign activity and contribute to wider marketing performance assessments.'],
    ],
  },
  {
    p: 'la', slug: 'los-angeles', name: 'Los Angeles', order: 2,
    h1: 'Billboard Advertising in Los Angeles', sub: 'OOH & DOOH Campaigns',
    hero: 'Los Angeles is a major advertising market, bringing together entertainment, retail, tourism, business and residential communities across a wide metropolitan area. From high-visibility roadside placements to digital screens in commercial and public environments, the city offers brands different ways to connect with audiences.\n\nWhether you are launching a product, building brand awareness or planning a regional campaign, Moving Walls helps you explore OOH and DOOH opportunities aligned with your campaign objectives.',
    heroCta: 'Plan Your Los Angeles Campaign',
    card: 'Reach residents and visitors across Hollywood, Downtown LA, Beverly Hills, Santa Monica, major freeways and LAX with billboards and DOOH.',
    seo: ['Billboard Advertising in Los Angeles | OOH & DOOH Campaigns', 'Plan billboard and DOOH advertising in Los Angeles, from Hollywood, Downtown LA and Santa Monica to major freeway corridors and LAX.'],
    sections: (p) => [
      stats(p, 'glance', { title: 'Los Angeles at a Glance', leads: ['Los Angeles combines a large resident population with significant visitor activity, creating a varied audience landscape for outdoor advertising.'], items: [['3.87M', 'Los Angeles city population'], ['49.5M', 'Annual visitors'], ['$42.6B', 'Visitor-generated business sales']] }),
      cards(p, 'areas', { title: 'Explore Outdoor Advertising Opportunities Across Los Angeles', cta: 'Explore Los Angeles Locations', leads: ['Different parts of Los Angeles serve different audience and campaign needs. Understanding the local environment can help advertisers identify suitable locations and formats.'], cols: 3, cards: [
        ['', 'Hollywood and Sunset Boulevard', 'Hollywood is closely associated with the entertainment industry, tourism and popular culture. Its prominent commercial and visitor areas can be relevant for entertainment promotions, film releases, lifestyle brands and product launches.'],
        ['', 'Downtown Los Angeles', 'Downtown LA brings together business districts, cultural destinations, retail spaces and residential communities. It can be considered for campaigns looking to connect with professionals, commuters, residents and visitors.'],
        ['', 'Beverly Hills and West Hollywood', 'These areas are known for premium retail, hospitality and lifestyle destinations. They may be relevant for luxury, fashion, beauty and consumer brands looking to reach audiences in these environments.'],
        ['', 'Santa Monica and Coastal Areas', 'Santa Monica combines retail, leisure and tourism activity. Outdoor advertising in relevant locations can support campaigns targeting local consumers and visitors.'],
        ['', 'Major Freeway Corridors', 'Los Angeles has an extensive road network connecting its commercial districts and surrounding communities. Major routes such as I-405, I-10, I-5 and US-101 can be considered when evaluating roadside advertising opportunities and commuter visibility.'],
        ['', 'Los Angeles International Airport', 'Airport environments offer opportunities to connect with domestic and international travellers. These placements may be relevant for travel, hospitality, retail and brands seeking visibility among people on the move.'],
      ], note: 'Specific advertising locations and formats are subject to media-owner inventory, availability and campaign requirements.' }),
      cards(p, 'formats', { title: 'Outdoor Advertising Formats to Consider', cta: 'Ask About Formats', leads: ['The right advertising format depends on your campaign objective, audience and preferred locations.'], cards: [
        ['', 'Digital Billboards', 'Use digital billboard placements for dynamic creative and promotional messaging. Digital formats can be suitable for campaigns that require creative flexibility.'],
        ['', 'Static Billboards', 'Build brand visibility through traditional billboard placements in suitable roadside and commercial environments.'],
        ['', 'Transit Advertising', 'Explore advertising opportunities across public transport environments to connect with commuters and audiences travelling around the city.'],
        ['', 'Street Furniture Advertising', 'Consider formats such as bus shelters and other street-level placements to reach audiences in neighbourhood and pedestrian environments.'],
        ['', 'Airport Advertising', 'Explore suitable airport placements to connect with travellers across relevant airport environments.'],
      ] }),
      steps(p, 'plan', { title: 'Plan and Activate Your Los Angeles OOH Campaign with Moving Walls', cta: 'Plan Your Los Angeles Campaign', leads: ['Planning an outdoor advertising campaign involves more than selecting a location. Advertisers need to define their objectives, understand their target audiences, evaluate available media opportunities and determine how campaign performance will be assessed.', 'Moving Walls brings these activities into a connected workflow.'], steps: [
        ['target', `Plan with ${LINK('/mw-planner', 'MW Planner')}`, 'Define your campaign objectives, identify target audiences, explore available media opportunities and develop a media plan based on your requirements.'],
        ['bolt', 'Activate Your Campaign', 'Move from planning to campaign execution through Moving Walls’ activation capabilities, including suitable direct and programmatic options where supported by available media-owner inventory and connectivity.'],
        ['layers', 'Extend Digital Campaigns Through pDOOH', 'pDOOH extends digital and social media campaigns into physical environments such as billboards, transit networks, street furniture and airports. This helps brands reach audiences beyond online channels and can create opportunities for incremental campaign reach.'],
        ['bars', 'Measure Campaign Performance', `Use ${LINK('/mw-measure', 'MW Measure')} to understand campaign delivery through metrics such as impressions, reach, frequency and CPM. Depending on the campaign and measurement setup, measurement can also include Brand Lift Studies and Marketing Mix Modelling.`],
      ] }),
    ],
    banner: ['Start Planning Your Los Angeles Advertising Campaign', 'Looking to advertise in Los Angeles? Whether you are a brand, agency or media buyer, Moving Walls can help you explore suitable OOH and DOOH opportunities based on your campaign requirements. Share your target audience, preferred locations and campaign objectives with our team to get started.', 'Discuss Your Campaign with Moving Walls'],
    faqs: [
      ['Where can I advertise on billboards in Los Angeles?', 'Potential advertising environments include Hollywood, Sunset Boulevard, Downtown Los Angeles, Beverly Hills, West Hollywood, Santa Monica, major freeway corridors and airport areas. Specific placement options depend on available media-owner inventory.'],
      ['What types of outdoor advertising are available in Los Angeles?', 'Outdoor advertising formats may include digital billboards, static billboards, transit advertising, street furniture and airport advertising.'],
      ['How much does billboard advertising cost in Los Angeles?', 'The cost depends on factors such as location, advertising format, campaign duration, audience requirements and media-owner rates. Contact Moving Walls to discuss your campaign requirements and explore suitable options.'],
      ['Can I run a digital billboard campaign in Los Angeles?', 'Digital billboard campaigns can be planned where suitable digital inventory is available. Placement options and activation methods depend on participating media owners and campaign requirements.'],
      ['Can Moving Walls help plan and measure my campaign?', 'Moving Walls supports OOH campaign planning, activation and measurement through its platform capabilities. Available options depend on the market, media-owner participation and campaign requirements.'],
    ],
  },
  {
    p: 'ch', slug: 'chicago', name: 'Chicago', order: 3,
    h1: 'DOOH Advertising in Chicago',
    hero: 'Chicago is a major business centre, home to leading companies across food and beverage, consumer goods, financial services, insurance, healthcare, manufacturing and logistics. With 30 Fortune 500 headquarters and a regional economy valued at $886 billion, the city provides a strong base for brands with national and international ambitions.\n\nMoving Walls brings together audience intelligence, media planning, campaign activation and measurement capabilities to help Chicago-based brands and agencies evaluate OOH and DOOH opportunities in their home market and across other regions.',
    heroCta: 'Book a Strategy Session',
    card: 'Plan DOOH across the Loop, River North, Michigan Avenue, CTA transit and O’Hare, and take Chicago brands into other US and international markets.',
    seo: ['DOOH Advertising in Chicago | OOH Campaigns Beyond Your Home Market', 'Plan DOOH in Chicago across the Loop, Michigan Avenue, CTA transit and O’Hare, and extend Chicago campaigns into other US and international markets.'],
    sections: (p) => [
      prose(p, 'beyond', { title: 'Why Chicago Brands Look Beyond Their Home Market', leads: [
        'Many Chicago-based businesses serve audiences beyond the Midwest. As brands expand into other US cities or international markets, their media requirements become more complex. Each market has its own media owners, available formats, audience characteristics and campaign requirements.',
        'DOOH gives advertisers another way to establish a physical presence in these markets. Audience and location insights can help inform media selection, while campaign delivery information supports evaluation across different locations.',
        'Moving Walls supports this process by connecting campaign planning, activation and measurement across markets, subject to available inventory and campaign requirements.',
      ], cta: 'Explore the Americas', ctaHref: AMERICAS }),
      cards(p, 'growth', { title: 'How DOOH Can Support Business Growth', cta: 'Talk to Our Team', cols: 4, cards: [
        ['', 'Reinforce Existing Marketing Activity', 'Use pDOOH alongside digital and social campaigns to extend advertising exposure into physical environments where audiences commute, travel and shop. This helps brands reach audiences beyond online channels and creates opportunities for incremental reach that digital-only campaigns may not deliver.'],
        ['', 'Reach Relevant Business Audiences', 'Consider airport, transit and commercial district environments when planning campaigns for professionals and business travellers.'],
        ['', 'Support Market Expansion', 'Introduce a brand, service or product in new cities through relevant outdoor advertising environments.'],
        ['', 'Evaluate Campaign Activity Across Locations', 'Review delivery and audience insights across Chicago and other campaign markets to inform future media decisions.'],
      ] }),
      cards(p, 'env', { title: 'OOH and DOOH Media Environments', cta: 'Ask About Media Formats', cols: 4, cards: [
        ['', 'Digital Billboards', 'Large-format digital displays in urban and roadside environments can support brand awareness, product launches and scheduled creative messaging.'],
        ['', 'Airport Media', 'Advertising opportunities across airport terminals and passenger areas can help brands reach domestic and international travellers.'],
        ['', 'Transit Advertising', 'Rail, station and bus formats provide opportunities to reach audiences during daily commutes and other journeys.'],
        ['', 'Retail and Place-Based Screens', 'Displays in shopping centres, stores, office buildings and other venues can support campaigns in consumer-facing and commercial environments.'],
      ], note: 'Specific formats and placements depend on location, participating media owners and campaign requirements.' }),
      stats(p, 'stats', { title: 'Plan a DOOH Campaign Across Chicago', leads: ['Chicago offers a range of commercial, retail, transport and entertainment environments for advertisers to consider.'], items: [['338M', 'CTA rides in 2025'], ['56.8M', 'Visitors in 2025'], ['84.9M', 'Passengers at O’Hare International Airport (2025)']], after: ['These figures provide context for evaluating potential campaign environments. The right media mix will depend on the audience, campaign objective, location and available inventory.'] }),
      cards(p, 'obj', { title: 'Shape Your Chicago Campaign Around Its Objectives', cols: 3, cards: [
        ['', 'Connect with Commuters', 'Consider CTA rail and bus networks, Metra stations and major commuter routes when planning campaigns around daily travel patterns.'],
        ['', 'Reach Business Audiences', 'Evaluate the Loop, River North and Fulton Market for campaigns aimed at professionals, financial services audiences and business decision-makers.'],
        ['', 'Engage Retail Audiences', 'Consider Michigan Avenue, neighbourhood retail districts and suburban shopping centres for campaigns supporting retail activity and consumer brands.'],
        ['', 'Reach Travellers', 'Explore airport media opportunities at O’Hare and Midway for campaigns targeting business and leisure travellers.'],
        ['', 'Plan Around Major Events', 'Consider campaign timing around sporting events, concerts, conventions and seasonal activity, subject to relevant media availability.'],
        ['', 'Use Campaign Insights to Inform Expansion', 'Evaluate campaign delivery and audience insights from Chicago before planning activity in other US or international markets.'],
      ], note: 'Available screens, formats and buying options depend on the campaign brief, dates and participating media owners.', cta: 'Discuss Your Chicago Campaign' }),
      cards(p, 'why', { title: 'Why Moving Walls?', cols: 4, cards: [
        ['', 'Audience Intelligence', 'Use audience and location insights to inform media planning and evaluate relevant advertising environments.'],
        ['', 'Connected Campaign Workflow', 'Coordinate campaign planning, activation and measurement across different markets through Moving Walls’ connected capabilities.'],
        ['', 'Direct and Programmatic Activation', 'Evaluate direct media buying and programmatic activation options, depending on available inventory and supported integrations.'],
        ['', 'Campaign Measurement', `Use ${LINK('/mw-measure', 'MW Measure')} to review campaign delivery, reach, frequency and location performance. Brand Lift Studies can provide additional insight into changes in brand outcomes where required.`],
      ] }),
    ],
    banner: ['Planning Your Next DOOH Market?', 'Whether you are planning a campaign in Chicago, expanding into another US city or evaluating international markets, Moving Walls brings together campaign planning, activation and measurement capabilities to support your OOH strategy.', 'Book a Strategy Session'],
    faqs: [
      ['Why should Chicago brands consider DOOH when expanding into new markets?', 'DOOH provides opportunities to establish a physical advertising presence in new markets. Audience intelligence, location insights and campaign delivery information can help advertisers plan activity and evaluate campaign execution.'],
      ['Which markets can Moving Walls support?', 'Moving Walls supports OOH and DOOH campaign planning across markets in the Americas, Europe, Asia-Pacific, India, the Middle East and Africa. Available inventory and formats vary by market and media-owner participation.'],
      ['Can we plan campaigns across Chicago and other cities?', 'Campaigns can be planned across multiple cities and markets, subject to inventory availability, campaign requirements and participating media owners.'],
      ['Can campaigns be activated programmatically?', 'Programmatic activation is available where suitable screens are connected to supported supply platforms. Direct media buying can also be considered for campaigns requiring specific placements.'],
      ['How does Moving Walls support campaign measurement?', 'MW Measure supports the review of campaign delivery, reach, frequency and location performance. Brand Lift Studies can also be used to assess changes in brand outcomes, depending on the campaign brief and measurement requirements.'],
    ],
  },
  {
    p: 'sf', slug: 'san-francisco', name: 'San Francisco', order: 4,
    h1: 'Advertise in San Francisco', sub: 'Explore OOH and DOOH Opportunities Across the Bay Area',
    hero: 'San Francisco is a dynamic market shaped by technology, innovation, commerce and tourism. Whether you are launching a product, building brand awareness or expanding your regional presence, Moving Walls helps you plan, activate and measure OOH and DOOH campaigns around your marketing objectives.',
    heroCta: 'Explore San Francisco Advertising Opportunities',
    card: 'Reach technology, business, consumer and visitor audiences across San Francisco and the wider Bay Area, from the Peninsula to Silicon Valley.',
    seo: ['Advertise in San Francisco | OOH & DOOH Across the Bay Area', 'Plan OOH and DOOH advertising in San Francisco and the Bay Area, reaching technology, business, consumer and visitor audiences with Moving Walls.'],
    sections: (p) => [
      stats(p, 'glance', { title: 'A Market Shaped by Technology, Commerce and Tourism', items: [['826,079', 'San Francisco population'], ['23.7M', 'Visitors in 2025'], ['$9.4B', 'Visitor spending (2025)'], ['54.5M+', 'Passengers at San Francisco International Airport (2025)']], after: ['This combination of business activity, consumer spending and visitor movement creates opportunities for brands to connect with different audiences across the city and wider Bay Area.'] }),
      cards(p, 'aud', { title: 'One Region, Diverse Audience Opportunities', cta: 'Explore San Francisco Opportunities', leads: ['San Francisco and the wider Bay Area bring together distinct business and consumer audiences. Understanding these audience groups can help advertisers identify relevant environments and shape their campaign strategies.'], cols: 3, cards: [
        ['', 'Technology and Business Communities', 'With its strong technology ecosystem and concentration of businesses, San Francisco is a relevant market for technology companies, SaaS providers, enterprise brands and B2B advertisers. Campaigns can consider suitable commercial environments to build awareness among professionals and business audiences.'],
        ['', 'Consumers and Visitors', 'The city’s retail, hospitality, cultural and tourism environments attract local consumers as well as domestic and international visitors. These settings can offer opportunities for fashion, lifestyle, travel and consumer brands to connect with relevant audiences.'],
        ['', 'Commuters and Regional Audiences', 'San Francisco’s transport connections link the city with other commercial centres across the Bay Area. Advertisers looking to extend their reach beyond the city can evaluate suitable opportunities across the wider region, including the Peninsula and Silicon Valley.'],
      ] }),
      cards(p, 'obj', { title: 'Plan Your Campaign Around Your Marketing Objectives', cta: 'Plan Your San Francisco Campaign', leads: ['Every campaign has a different purpose. Moving Walls helps advertisers approach OOH and DOOH planning by aligning media opportunities with their target audiences, campaign goals and budget requirements.'], cols: 4, cards: [
        ['', 'Market Entry and Brand Awareness', 'Build visibility when introducing your brand to San Francisco. Evaluate relevant advertising environments that support your market-entry and awareness objectives.'],
        ['', 'Technology and B2B Marketing', 'Develop campaigns around suitable business and commercial environments to strengthen brand presence among professional and technology-oriented audiences.'],
        ['', 'Product Launches and Promotions', 'Use suitable outdoor advertising formats to communicate product launches, promotions and campaign messages across selected locations.'],
        ['', 'Regional Brand Campaigns', 'Consider opportunities across San Francisco and the wider Bay Area when your campaign requires a broader geographic approach.'],
      ] }),
      steps(p, 'how', { title: 'How Moving Walls Supports Your OOH and DOOH Campaigns', cta: 'Talk to Our Team', leads: ['Moving Walls brings campaign planning, activation and measurement into a connected workflow, helping advertisers manage key stages of their outdoor advertising campaigns.'], steps: [
        ['target', `Plan with ${LINK('/mw-planner', 'MW Planner')}`, 'Define your campaign objectives, identify target audiences, explore available media opportunities and develop a media plan aligned with your requirements.'],
        ['bolt', 'Activate with Moving Walls', 'Move from planning to campaign execution through Moving Walls’ activation capabilities, including suitable direct and programmatic options where supported by available media-owner inventory and technical connectivity.'],
        ['layers', 'Extend Your Campaign Beyond Digital Screens', 'pDOOH adds exposure across San Francisco’s business districts, commuter routes and visitor destinations. This helps brands connect with audiences beyond online channels and create opportunities for incremental reach alongside existing digital campaigns.'],
        ['bars', `Measure with ${LINK('/mw-measure', 'MW Measure')}`, 'Understand campaign delivery through metrics such as impressions, reach, frequency and CPM. Depending on the campaign and measurement setup, additional options can include Brand Lift Studies and Marketing Mix Modelling.'],
      ] }),
    ],
    banner: ['Start Planning Your San Francisco Campaign with Moving Walls', 'Looking to advertise in San Francisco or across the wider Bay Area? Whether you are a brand, agency or media buyer, Moving Walls can help you explore OOH and DOOH opportunities aligned with your audience, campaign objectives and budget.', 'Plan Your San Francisco Campaign'],
    faqs: [
      ['Why should brands consider outdoor advertising in San Francisco?', 'San Francisco brings together technology and business communities, retail destinations, tourism and transport networks. These different environments offer opportunities for brands to build visibility among professional, consumer and visitor audiences.'],
      ['Can I plan an OOH campaign across San Francisco and the wider Bay Area?', 'Campaigns can be planned around regional requirements where suitable media-owner inventory is available. Locations and formats depend on your campaign objectives, target audience and inventory availability.'],
      ['What types of businesses can benefit from OOH advertising in San Francisco?', 'Technology companies, SaaS providers, B2B brands, consumer businesses, retail brands and travel companies can explore OOH opportunities based on their target audiences and marketing objectives.'],
      ['What outdoor advertising formats can I consider?', 'Potential formats include digital and static billboards, transit advertising, street-level media and airport advertising. Actual availability depends on the market, media owner and applicable regulations.'],
      ['How can Moving Walls support my campaign?', 'Moving Walls supports OOH campaign planning, activation and measurement through its platform capabilities. Advertisers can use MW Planner to develop media plans, explore suitable activation options and use MW Measure to understand campaign delivery. Available capabilities depend on market coverage and participating media owners.'],
    ],
  },
  {
    p: 'fl', slug: 'florida', name: 'Florida', order: 5,
    h1: 'OOH & DOOH Advertising Across Florida', sub: 'Plan, activate and measure campaigns across Florida',
    hero: 'Florida brings together major tourism destinations, international gateways, metropolitan areas and growing business centres. With more than 23.4 million residents and 143.3 million visitors in 2025, the state offers advertisers opportunities to reach both local and visiting audiences.\n\nMoving Walls connects campaign planning, media activation and measurement, helping brands and agencies run OOH and DOOH campaigns across Florida and extend their strategies across the Americas.',
    heroCta: 'Plan Your Florida Campaign',
    card: 'Reach residents and visitors across Orlando, Miami, Tampa Bay, Jacksonville and South Florida, from airports and highways to tourism districts.',
    seo: ['OOH & DOOH Advertising Across Florida', 'Plan OOH and DOOH campaigns across Florida, from Orlando, Miami and Tampa Bay to Jacksonville and the Gulf Coast, reaching residents and visitors.'],
    sections: (p) => [
      cards(p, 'opp', { title: 'Florida’s OOH Media Opportunities', cta: 'Explore Florida Media Options', leads: ['Florida offers diverse OOH environments that can be combined based on campaign objectives, audiences and geographic requirements.'], cols: 3, cards: [
        ['', 'Road and Commuter Networks', 'Major highways, arterial roads and urban corridors connect residential, commercial and tourism centres, supporting broad awareness and repeated exposure among commuters.'],
        ['', 'Airports and Travel Hubs', 'Miami International, Orlando International and Tampa International airports provide access to domestic and international travellers across major tourism and business markets.'],
        ['', 'Tourism and Entertainment Districts', 'Orlando’s theme parks, entertainment destinations and convention centres attract high visitor volumes. Miami and South Florida offer access to leisure, business and international audiences.'],
        ['', 'Retail and Commercial Areas', 'Shopping destinations, retail districts and commercial centres provide opportunities to reach consumers closer to purchase environments.'],
        ['', 'Transit and Urban Environments', 'Transit networks and high-footfall urban locations help brands connect with residents, commuters, visitors and event audiences across metropolitan markets.'],
      ], note: 'Media availability varies by market, format, media owner and campaign requirements.' }),
      cards(p, 'markets', { title: 'Key Florida Markets for OOH Advertising', cta: 'Plan Your Florida Campaign', leads: ['Different Florida cities offer distinct audience profiles and campaign opportunities.'], cols: 3, cards: [
        ['76.7M visitors (2025)', 'Orlando', 'With 76.7 million visitors in 2025, Orlando offers opportunities to reach tourists, entertainment audiences, convention attendees and local residents.'],
        ['55.3M airport passengers', 'Miami', 'A major international gateway for tourism, business and cultural activity. Miami International Airport handled 55.3 million passengers in 2025, making international and travel audiences important considerations for advertisers.'],
        ['', 'Fort Lauderdale and Palm Beach', 'The broader South Florida region provides access to residential, tourism, business and leisure audiences across connected local markets.'],
        ['24.5M airport passengers', 'Tampa Bay', 'Combining metropolitan audiences, tourism and business activity, Tampa Bay offers regional connectivity. Tampa International Airport handled 24.5 million passengers in FY2025.'],
        ['', 'Jacksonville', 'Jacksonville provides access to a large resident and commuter population and serves as an important commercial centre in Northeast Florida.'],
        ['', 'Sarasota, Fort Myers and Naples', 'Florida’s Gulf Coast markets offer opportunities shaped by tourism, seasonal travel, residential growth and local commercial activity.'],
      ] }),
      prose(p, 'americas', { title: 'Extend Florida Campaigns Across the Americas', leads: ['Florida can form part of a broader Americas media strategy. Moving Walls supports OOH planning and activation across multiple markets, subject to local inventory and market availability.', 'This enables brands and agencies to coordinate campaigns across Florida and other markets through a connected approach to media planning and execution.'], cta: 'Explore Moving Walls Americas', ctaHref: AMERICAS }),
      prose(p, 'workflow', { title: 'Why Use a Connected OOH Workflow?', cta: 'Talk to Moving Walls', leads: [
        'OOH campaigns often involve multiple markets, media owners and formats. Moving Walls connects planning, activation and measurement, helping brands and agencies coordinate these activities across supported markets.',
        '<strong>Combining pDOOH with digital and social media can create opportunities for incremental campaign reach.</strong> While digital-only campaigns reach audiences through online channels, pDOOH adds exposure in physical environments such as roads, transit networks, airports and retail locations. When used together, these channels can help brands connect with audiences across different touchpoints and create opportunities to reach additional audiences beyond digital-only campaigns.',
        'For Florida campaigns, teams can build strategies around audience and geographic objectives, then determine the appropriate media mix, activation approach and measurement methodology.',
      ] }),
    ],
    banner: ['Plan Your Next Florida OOH Campaign', 'Whether the objective is statewide awareness, multi-city reach, tourism marketing or local market activation, Moving Walls can support the planning and execution of OOH and DOOH campaigns across available Florida inventory.', 'Talk to Moving Walls'],
    faqs: [
      ['What OOH advertising opportunities are available in Florida?', 'Florida offers OOH environments across major cities, highways, airports, transit networks, tourism destinations, retail areas and entertainment districts. Availability depends on the market, format and media owner.'],
      ['Can Moving Walls support DOOH campaigns in Florida?', 'Yes. Moving Walls supports programmatic DOOH activation through supported inventory and media-owner integrations. Available inventory and activation methods vary by market.'],
      ['Can I run a campaign across multiple Florida cities?', 'Yes. Campaigns can be planned across multiple markets based on audience, geography, timing, campaign objectives and inventory availability.'],
      ['Can Florida be included in a wider Americas campaign?', 'Yes. Florida can be incorporated into broader Americas campaign planning where relevant inventory and market requirements are supported.'],
      ['Why use programmatic DOOH for Florida campaigns?', 'Programmatic DOOH offers flexibility in planning and activating digital OOH campaigns across supported inventory. When combined with digital and social media, it can extend campaign exposure into physical environments and create opportunities for incremental reach beyond online channels.'],
    ],
  },
  {
    p: 'nj', slug: 'new-jersey', name: 'New Jersey', order: 6,
    h1: 'OOH & Programmatic DOOH Advertising in New Jersey',
    hero: 'New Jersey offers brands access to commuters, local communities, shoppers and visitors across major transport corridors, retail destinations and entertainment districts. From Newark and Jersey City to the Meadowlands and the Jersey Shore, each market presents different opportunities for out-of-home (OOH) and digital out-of-home (DOOH) advertising.\n\nMoving Walls enables brands and agencies to plan, activate and measure OOH and DOOH campaigns using audience insights, location intelligence and campaign performance data.',
    heroCta: 'Plan Your New Jersey Campaign',
    card: 'Reach commuters, shoppers and visitors across Newark, Jersey City, the Meadowlands, Bergen County and the Jersey Shore with OOH and programmatic DOOH.',
    seo: ['OOH & Programmatic DOOH Advertising in New Jersey', 'Plan OOH and programmatic DOOH in New Jersey across Newark, Jersey City, the Meadowlands, Bergen County, the Jersey Shore and South Jersey.'],
    sections: (p) => [
      cards(p, 'why', { title: 'Why Advertise in New Jersey?', cta: 'Plan Your New Jersey Campaign', cols: 3, cards: [
        ['', 'Reach Commuters Across Major Transport Corridors', 'New Jersey’s highways, rail networks, PATH stations and connections to New York City create opportunities to reach audiences during their daily journeys. Plan campaigns around relevant locations, travel patterns and dayparts to align media placements with your campaign objectives.'],
        ['', 'Connect with Shoppers and Event Audiences', 'From North Jersey retail destinations to the Meadowlands entertainment district and the Jersey Shore, New Jersey offers opportunities to reach audiences across shopping, leisure and seasonal travel environments.'],
        ['', 'Plan Across Connected Media Markets', 'New Jersey sits between the New York and Philadelphia media markets and is home to a diverse, multicultural population, including communities with roots in India, other parts of Asia and Latin America. Audience-led planning can help advertisers identify relevant locations and evaluate opportunities across neighbouring media markets, rather than treating state boundaries as the only planning consideration.'],
      ] }),
      steps(p, 'pam', { title: 'Plan, Activate and Measure OOH and DOOH', leads: ['Moving Walls brings key stages of OOH and DOOH campaign management into one workflow, helping brands and agencies coordinate media planning, activation and measurement across their selected markets.'], steps: [
        ['target', 'Plan with Audience Insights', 'Use audience and location intelligence to identify relevant markets, locations and media environments. Evaluate reach, frequency and available inventory against your campaign objectives and budget.'],
        ['bolt', 'Activate Across Available Inventory', 'Choose direct or programmatic DOOH activation based on your campaign requirements, preferred formats and available media inventory. Coordinate campaign execution through MW Activate and its integrations with existing DSPs, SSPs and ad servers.'],
        ['bars', 'Measure Campaign Delivery', 'Review campaign delivery and available performance metrics, including impressions, reach, frequency and CPM. Use consistent reporting to evaluate performance across selected locations and formats.'],
      ], links: [['Explore MW Planner', '/mw-planner'], ['Explore MW Activate', '/mw-activate'], ['Explore MW Measure', '/mw-measure']] }),
      steps(p, 'prog', { eyebrow: 'OOH and DOOH Advertising Solutions for Your Campaign', title: 'Programmatic DOOH Advertising in New Jersey', cta: 'Discuss Programmatic DOOH', leads: [
        'Moving Walls supports brands and agencies looking to plan and execute OOH and DOOH campaigns around specific audiences, locations and business objectives.',
        'Programmatic DOOH enables advertisers to purchase digital out-of-home advertising through automated buying workflows, with campaign parameters informed by factors such as location, timing, budget and available inventory. In New Jersey, this approach can support campaigns targeting commuter corridors, retail destinations, entertainment districts and seasonal visitor markets.',
        `With ${LINK('/mw-activate', 'MW Activate')}, advertisers can coordinate programmatic DOOH through existing platform integrations or use direct activation when the campaign requires specific placements.`,
      ], steps: [
        ['target', 'Plan', 'Identify relevant audiences, locations and media environments.'],
        ['bolt', 'Activate', 'Execute programmatic or direct DOOH campaigns based on available inventory.'],
        ['clock', 'Optimise', 'Adjust campaign allocation where supported by the activation setup and available inventory.'],
        ['bars', 'Measure', 'Review delivery and performance through campaign reporting.'],
      ] }),
      prose(p, 'planning', { title: 'OOH Campaign Planning and Measurement', leads: ['For campaigns that span multiple locations or formats, Moving Walls connects media planning with campaign execution and measurement. This helps advertisers organise their activity around defined objectives and assess delivery across selected markets.', 'pDOOH extends digital and social media campaigns into physical spaces such as roads, transit and retail locations. This helps brands reach additional audiences beyond online channels. It complements digital campaigns and creates opportunities for incremental reach.'] }),
      cards(p, 'markets', { title: 'Key Markets for OOH Advertising in New Jersey', cta: 'Explore New Jersey Markets', cols: 3, cards: [
        ['', 'Newark', 'A major transport and commercial hub, Newark offers opportunities across airport-related travel, rail commuting, downtown activity and entertainment destinations. Suitable media placements depend on the target audience and available inventory.'],
        ['', 'Jersey City and Hoboken', 'These waterfront communities combine residential neighbourhoods, office districts and commuter connections to Manhattan. They can be relevant for brands targeting professionals, urban residents and daily commuters.'],
        ['', 'The Meadowlands', 'The Meadowlands combines sports, entertainment, retail and major road connections. Campaigns can be planned around relevant audience movements and event periods, subject to available media placements.'],
        ['', 'Bergen County', 'Retail destinations, suburban communities and major road corridors make Bergen County relevant for campaigns targeting shoppers, households and motorists.'],
        ['', 'Atlantic City and the Jersey Shore', 'Atlantic City and coastal destinations such as Asbury Park and Cape May attract leisure and seasonal visitor audiences. These markets may suit hospitality, tourism, entertainment and consumer campaigns, depending on seasonality and inventory availability.'],
        ['', 'South Jersey', 'Markets such as Camden and Cherry Hill connect suburban retail and residential audiences with the wider Philadelphia region. They offer opportunities for advertisers seeking coverage across the southern part of the state and neighbouring media markets.'],
      ], note: 'Media availability, formats and targeting capabilities vary by location and media owner. Specific placements should be confirmed during campaign planning.' }),
    ],
    banner: ['Plan Your New Jersey OOH Campaign with Moving Walls', 'Whether you’re planning a local campaign or coordinating activity across multiple Americas markets, Moving Walls brings audience-led planning, OOH and DOOH activation, and campaign measurement into one connected workflow. Tell us about your campaign objectives, target audience, preferred locations, dates, budget and formats.', 'Plan Your New Jersey Campaign'],
    faqs: [
      ['Can Moving Walls support OOH and DOOH campaigns in New Jersey?', 'Moving Walls supports OOH and DOOH planning, activation and measurement for brands and agencies. Specific inventory access depends on the media owners, formats and locations available for the campaign.'],
      ['How much does OOH advertising cost in New Jersey?', 'There is no single fixed price for OOH advertising in New Jersey. Costs depend on location, format, campaign duration, audience requirements, timing and inventory availability. Share your budget and campaign objectives to explore suitable options.'],
      ['Can I extend my New Jersey campaign to other markets?', 'Moving Walls supports campaigns across the Americas, including the United States, Canada, Mexico, Central America, the Caribbean and South America. Market coverage and available inventory should be confirmed for each campaign.'],
      ['How can I measure my OOH and DOOH campaign?', 'Campaign reporting can include metrics such as impressions, reach, frequency and CPM, depending on the campaign setup and available data. MW Measure supports campaign evaluation through reporting and measurement capabilities.'],
    ],
  },
]

// Hero photos (12 Nov 2026): the first set came from Google Images, so they were replaced with free-to-use photos
// (Dg's Unsplash/Pexels downloads for LA, Florida, San Francisco, Chicago; a CC0 Pixel.la Times Square shot via
// Wikimedia Commons for New York, also the United States share image; Dg's free GEICO salt-marsh shot for New Jersey).
const HERO = {"united-states": "image-989128d1554d1a555e896f1ed9ed03e117e81599-960x540-webp", "new-york": "image-989128d1554d1a555e896f1ed9ed03e117e81599-960x540-webp", "los-angeles": "image-66f3a292583a20f5c1a0040f1fdec536f58abe53-960x540-webp", "chicago": "image-ac9b441c60b6d94463b038765a260e0f986e77bf-960x540-webp", "san-francisco": "image-91a3b3aa450ac035bd2be9372134be10fc2abd19-960x540-webp", "florida": "image-35467444a3f94b26889a4264797ae427d1fe452e-960x540-webp", "new-jersey": "image-7c80db7ff320cb42b074c4c8ced2e715ab878da2-960x540-webp"}
const heroImg = (slug, name) => ({ _type: 'image', alt: `DOOH advertising in ${name}`, asset: { _type: 'reference', _ref: HERO[slug] } })
// ---------------- Write drafts ----------------
const faq = (list) => list.map(([question, answer]) => ({ _key: k(), question, answer }))
const tx = c.transaction()
if (await c.fetch('count(*[_type=="location" && slug.current=="united-states" && !(_id in [$id, "drafts." + $id])])', { id: US_ID })) throw new Error('A United States page already exists')
tx.createOrReplace({
  _id: `drafts.${US_ID}`, _type: 'location', country: 'United States', slug: { _type: 'slug', current: 'united-states' },
  heroTitle: 'Plan, Activate and Measure DOOH in the United States',
  heroImage: heroImg('united-states', 'the United States'),
  fullDescription: 'U.S. out-of-home advertising revenue reached a record $9.46 billion in 2025, and digital out-of-home is driving the growth, accounting for 38.4% of spend in Q2 2026 and rising 18.5% year on year. As more of the country’s screens go digital, Moving Walls helps agencies connect audience- and location-led planning, direct and programmatic activation, campaign management and measurement across U.S. markets through one connected platform.',
  description: 'Plan, activate and measure DOOH across U.S. markets, from New York and Los Angeles to Chicago, San Francisco, Florida and New Jersey.',
  ctaButtonText: 'Request a Demo', showAllLocationsButton: true, contactFormUrl: FORM, isActive: true,
  stats: [['341M+', 'Population'], ['$9.46B', 'OOH Ad Revenue (2025)'], ['38.4%', 'Digital Share of OOH Spend (Q2 2026)']].map(([value, label]) => ({ _key: k(), value, label })),
  citiesHeading: 'Explore U.S. Markets',
  relatedPagesHeading: 'Explore Other U.S. Markets',
  citiesSubheading: 'OOH and DOOH advertising opportunities in key U.S. markets',
  sectionsPosition: 'before-faqs',
  sections: [{ ...deEmbed, _key: k(), title: 'custom html', code: usCode }, { ...logos, _key: k() }],
  faqs: faq([
    ['Can Moving Walls support DOOH activity in the United States?', 'Moving Walls supports planning, activation and measurement workflows for agencies running OOH and DOOH campaigns in the U.S., through its Americas team. Inventory access depends on the media owners and formats available in each market.'],
    ['Can campaigns be activated programmatically?', 'Yes. Moving Walls supports both programmatic and direct DOOH activation in the U.S., so your team can choose the approach that fits each campaign’s requirements, budget and timeline rather than defaulting to one buying method.'],
    ['Can we run one campaign across multiple U.S. markets?', 'Yes. Campaigns can be planned, activated and reported across markets in one workflow, subject to inventory availability in each city.'],
    ['Do you work with agencies?', 'Yes. The platform is built around agency workflows: planning, multi-market coordination, campaign management and reporting, so DOOH can sit inside your wider media plan rather than run as a separate process.'],
    ['How can pDOOH contribute to incremental campaign reach?', 'When combined with digital and social media campaigns, pDOOH extends advertising exposure into physical environments. This can help brands reach additional audiences beyond online channels and complement their existing digital media investments.'],
  ]),
  seo: { _type: 'seo', metaTitle: 'DOOH Advertising in the United States | Plan, Activate & Measure', metaDescription: 'Plan, activate and measure DOOH across U.S. markets with audience-led planning, direct and programmatic activation and consistent reporting.', enableKeywords: false, noIndex: false, ogImage: heroImg('united-states', 'the United States') },
})

for (const d of PAGES) {
  const ID = `city-us-${d.slug}`
  if (await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$us && !(_id in [$id, "drafts." + $id])])', { s: d.slug, us: US_ID, id: ID })) throw new Error('Already exists: ' + d.slug)
  tx.createOrReplace({
    _id: `drafts.${ID}`, _type: 'locationCity', city: d.name, slug: { _type: 'slug', current: d.slug },
    country: { _type: 'reference', _ref: US_ID, _weak: true, _strengthenOnPublish: { type: 'location' } }, order: d.order, isActive: true,
    heroImage: heroImg(d.slug, d.name),
    heroTitle: d.h1, ...(d.sub ? { heroSubtitle: d.sub } : {}), fullDescription: d.hero, description: d.card,
    ctaButtonText: d.heroCta, showAllLocationsButton: true, contactFormUrl: FORM,
    sectionsPosition: 'before-faqs',
    faqs: faq(d.faqs),
    sections: [
      { ...deEmbed, _key: k(), title: 'custom html', code: compose(d.p, d.sections(d.p)) },
      { ...logos, _key: k() },
      { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: d.banner[0], subheading: d.banner[1], ctaText: d.banner[2], ctaLink: FORM },
    ],
    seo: { _type: 'seo', metaTitle: d.seo[0], metaDescription: d.seo[1], enableKeywords: false, noIndex: false, ogImage: heroImg(d.slug, d.name) },
  })
}
await tx.commit()
console.log('Drafts created: /locations/united-states +', PAGES.map((d) => d.slug).join(', '))
