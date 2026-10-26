// Refreshes the Thailand page and creates the Bangkok city page from "Thailand.docx" and "Bangkok.docx" (Oct 2026),
// both as DRAFTS. Thailand follows the Kenya / South Africa layout; Bangkok follows the Penang / Philippines city
// layout plus extra sections from the doc (Why DOOH, student audience, best practices).
// The old Thailand sections (sites outside the current Siam network, Chiang Mai / Phuket cards) are replaced.
// Extra FAQs, SEO and card blurbs were written for these pages.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const THAILAND = 'dsdzDBKQU3TOwM9o6hB7xx'
const BANGKOK = 'city-thailand-bangkok'
const SA = 'b4dc7c56-1d98-435b-b721-bb64196ca058'
const MANCHESTER = 'd2c80f2d-bffd-40fe-af15-04c9bd65dff1'
const CASE_STUDY = 'e9fc6d81-3275-4456-b576-cec53f1eee9b' // skincare brand funnel uplift, Thailand
const DESKTOP = 'C:/Users/admin/Desktop/'

const th = (await c.getDocument('drafts.' + THAILAND)) || (await c.getDocument(THAILAND))
const FORM = th.contactFormUrl // ThailandContact
const thLogos = th.sections.find((s) => s._type === 'logoCarousel')
const sa = await c.getDocument(SA)
const saCode = sa.sections.find((s) => s._type === 'customEmbed').code
const embedBase = sa.sections.find((s) => s._type === 'customEmbed')
const cebu = await c.getDocument('city-philippines-cebu')
const whyEmbed = cebu.sections.find((s) => s._type === 'customEmbed')
const science = cebu.sections.find((s) => /MW Science/.test(s.heading || ''))
const man = await c.getDocument(MANCHESTER)
const manCode = man.sections.find((s) => s._type === 'customEmbed').code

let n = 0
const key = () => `th${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

// Photos: four new uploads + two already in Sanity
const up = async (file) => (await c.assets.upload('image', fs.createReadStream(DESKTOP + file), { filename: file }))
const assets = {
  sq1: await up('sq1-walkway-building-connection.webp'),
  cu1: await up('cu1-nisit.webp'),
  walk: await up('siam-walking-street.webp'),
  gate3: await up('siam-square-gate-3.webp'),
}
const existing = await c.fetch('*[_id in $ids]', { ids: ['image-6f5fca5508aa1edca3086c3cb06726d59a22e59d-1169x591-webp', 'image-bb2b1529d58ce3b6a359c00742dcdb3923779353-1000x302-png'] })
assets.bts = existing.find((a) => a._id.includes('6f5fca55'))
assets.poles = existing.find((a) => a._id.includes('bb2b1529'))
const ref = (k) => ({ _type: 'image', asset: { _type: 'reference', _ref: assets[k]._id } })

// Portable text helpers: "**bold**" and "[text](url)"
const span = (text, marks = []) => ({ _key: key(), _type: 'span', marks, text })
const rich = (s) => {
  const markDefs = []
  const children = s.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).filter(Boolean).map((p) => {
    if (p.startsWith('**')) return span(p.slice(2, -2), ['strong'])
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) { const mk = key(); markDefs.push({ _key: mk, _type: 'link', href: m[2] }); return span(m[1], [mk]) }
    return span(p)
  })
  return { _key: key(), _type: 'block', style: 'normal', markDefs, children }
}
const esc = (s) => s.replace(/&(?![a-z]+;)/g, '&amp;')
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
const modal = (p, sec) => `
    <div id="mw-${p}-${sec}-modal" class="mw-${p}-${sec}__modal-overlay" data-modal-root>
      <div class="mw-${p}-${sec}__modal-box" role="dialog" aria-modal="true" aria-label="Contact Moving Walls">
        <button type="button" class="mw-${p}-${sec}__modal-close" aria-label="Close" data-modal-close>&times;</button>
        <iframe id="mw-${p}-${sec}-modal-frame" class="mw-${p}-${sec}__modal-frame" title="Moving Walls Thailand Contact Form" loading="lazy"></iframe>
      </div>
    </div>`
const styleFrom = (code, cls, newCls) => {
  const m = code.match(new RegExp(`<section class="${cls}">\\s*(<style>[\\s\\S]*?</style>)`))
  if (!m) throw new Error('No style for ' + cls)
  return m[1].replaceAll(cls, newCls)
}

// South Africa "text + photo + button" block
const textImage = (cls, title, paras, cta, img, alt) => {
  const { width, height } = assets[img].metadata.dimensions
  return `<section class="${cls}">
  ${styleFrom(saCode, 'mw-za-billboard', cls).replace('aspect-ratio:1005/561', `aspect-ratio:${width}/${height}`)}
  <div class="${cls}__container">
    <div class="${cls}__row">
      <div class="${cls}__text">
        <h2 class="${cls}__title">${esc(title)}</h2>
        ${paras.map((t) => `<p>${t}</p>`).join('\n        ')}
        <a class="${cls}__btn" href="${FORM}" target="_blank" rel="noopener" data-modal-open="${cls}-modal">
          ${esc(cta)}
          ${ARROW}
        </a>
      </div>
      <div class="${cls}__media">
        <img src="${assets[img].url}" alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy">
      </div>
    </div>${modal(cls.replace(/^mw-/, '').split('-')[0], cls.split('-').slice(2).join('-'))}
  </div>
</section>`
}
// South Africa "market" prose block
const prose = (cls, title, paras, bg) => `<section class="${cls}">
  ${styleFrom(saCode, 'mw-za-market', cls).replace('background:#F6F8FC;', `background:${bg};`)}
  <div class="${cls}__container">
    <div class="${cls}__inner">
      <h2 class="${cls}__title">${esc(title)}</h2>
      ${paras.map((t) => `<p>${t}</p>`).join('\n      ')}
    </div>
  </div>
</section>`
// Philippines "Why Choose Moving Walls" visual block, with new copy
const whyVisual = (comment, eyebrow, title, leads, panelTitle, items, cta) => {
  const ICONS = [
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>',
    '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  ]
  const code = whyEmbed.code
    .replace(/<!--[\s\S]*?-->/, `<!-- Moving Walls — ${comment} -->`)
    .replace(/<span class="mw-phw__eyebrow">[^<]*<\/span>/, `<span class="mw-phw__eyebrow">${esc(eyebrow)}</span>`)
    .replace(/<h2 class="mw-phw__title">[^<]*<\/h2>/, `<h2 class="mw-phw__title">${esc(title)}</h2>`)
    .replace(/<p class="mw-phw__lead">[\s\S]*?<\/p>/, leads.map((t) => `<p class="mw-phw__lead">${esc(t)}</p>`).join(''))
    .replace(/href="https:\/\/forms\.zohopublic\.com[^"]*"/, `href="${FORM}"`)
    .replace('Build Your Cebu Plan', esc(cta))
    .replace(/<p class="mw-phw__ptitle">[^<]*<\/p>/, `<p class="mw-phw__ptitle">${esc(panelTitle)}</p>`)
    .replace(/<div class="mw-phw__grid">[\s\S]*?<\/div><\/div><\/div><\/div><\/section>/, `<div class="mw-phw__grid">${items.map((t, i) => `<div class="mw-phw__item"><span class="mw-phw__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[i % ICONS.length]}</svg></span><p>${esc(t)}</p></div>`).join('')}</div></div></div></section>`)
  if (/Cebu|Manila|PhilippinesContact/.test(code)) throw new Error('Cebu copy left in ' + comment)
  return code
}
const featured = (stories) => ({ _key: key(), _type: 'successStories', backgroundColor: 'gray', sectionHeading: 'See the Proof', cardStyle: 'image', stories: stories.map((id) => ({ _key: key(), _type: 'successStoryItem', contentType: 'caseStudy', caseStudyRef: { _type: 'reference', _ref: id } })) })
const banner = (heading, subheading, ctaText) => ({ _key: key(), _type: 'ctaBanner', backgroundColor: 'blue', heading, subheading, ctaText, ctaLink: FORM })
const faq = (list) => list.map(([question, answer]) => ({ _key: key(), question, answer }))
const site = (name, location, description, reach, impressions, img) => ({ _key: key(), name, location, description, reach, impressions, image: ref(img) })

// ---------- Thailand ----------
const thailandSections = [
  {
    ...embedBase, _key: key(),
    code: [
      textImage('mw-th-outdoor', 'Outdoor Advertising in Thailand', [
        "Thailand's largest audience is concentrated in its capital. Bangkok had <strong>5.42 million registered residents</strong> in 2025, far more than any other province. For billboard advertising in Thailand, that makes Bangkok the natural starting point.",
        'Thai out-of-home is increasingly digital, and digital inventory can be bought by audience and daypart rather than by fixed site and month. Our network is fully digital and fully programmatic, currently concentrated in Bangkok. See the <a href="/locations/thailand/bangkok" style="color:#2F5FE0;font-weight:600">Bangkok page</a> for the site list.',
        'With the Moving Walls platform, you can plan, buy and measure outdoor advertising in Thailand programmatically, with reach and impressions reported by screen.',
      ], 'Start Advertising in Thailand', 'walk', 'Digital screens on the Siam walking street, Bangkok'),
      prose('mw-th-market', 'OOH Market Landscape', [
        "Thailand's population is spread across 76 provinces, but its commercial weight is not. Bangkok holds 5.42 million registered residents, more than any other province, and the capital region drives the bulk of national retail and media spend. Chiang Mai, Phuket, Pattaya and Khon Kaen follow as regional centres.",
        'For advertisers, a Thai campaign usually starts in Bangkok and extends outward. Our current network is Bangkok-only, concentrated in the Siam shopping district, so a national plan today is a capital-city plan. Billboards beyond Bangkok can be added as inventory grows, and we are actively looking at the regional cities above.',
        'For OOH campaigns in Thailand, the advantage of a digital, programmatic network is that it can scale market by market without renegotiating every site.',
      ], '#F6F8FC'),
      prose('mw-th-potential', 'DOOH Market Potential in Thailand', [
        'Thai advertising had a hard 2025. Total ad spend came in at around <strong>107 billion baht</strong> and the market finished down 1.63%, according to the Media Agency Association of Thailand.',
        'Out-of-home went the other way. <a href="https://www.nationthailand.com/business/corporate/40058492" target="_blank" rel="noopener" style="color:#2F5FE0;font-weight:600">MAAT reported that OOH and transit media showed strong growth</a> while television, print and radio continued to shrink. Outdoor is one of the few traditional channels still gaining share in Thailand, helped by heavy urban traffic and a steady shift of inventory from static to digital.',
        'That shift is what makes the market worth entering now. Digital screens can be bought programmatically, dayparted and measured, which puts outdoor on the same footing as the digital channels taking budget elsewhere.',
      ], '#FFFFFF'),
    ].join('\n\n'),
  },
  {
    ...whyEmbed, _key: key(),
    code: whyVisual('Thailand: Why Choose DOOH Advertising', 'Why DOOH', 'Why Choose DOOH Advertising in Thailand?',
      ['Every screen in the network is digital and traded programmatically, which changes what an outdoor buy can do.'],
      'With the Moving Walls platform, advertisers can', [
        'Run different creative by location and time of day',
        'Launch in days, not weeks, with no printing or installation',
        'Buy a district for a week rather than a site for a month',
        'Adjust or extend a flight while it is running',
        'Report delivery by screen, with reach and frequency',
      ], 'Plan Your Thailand Campaign'),
  },
  featured([CASE_STUDY]),
  { ...thLogos, _key: key() },
  banner('Looking for DOOH Advertising in Thailand?', "Tell us your audience, dates and budget. We'll come back with a plan across Siam's walkway, gate and campus screens, and the reporting to show what it delivered.", 'Explore Thailand DOOH'),
]

const { _rev, _updatedAt, _createdAt, _system, ...thRest } = th
const thailand = {
  ...thRest,
  _id: 'drafts.' + THAILAND,
  heroTitle: 'Billboards in Thailand',
  heroImage: ref('gate3'),
  ctaButtonText: 'Launch Your Campaign',
  showAllLocationsButton: true,
  fullDescription: "Thailand is home to 65.8 million people and one of Southeast Asia's largest consumer markets. Its audiences are concentrated in cities, and Bangkok is by far the biggest of them.\n\nThe Moving Walls platform gives brands a route into Thai out-of-home: digital screens bought programmatically, planned against audience data and reported screen by screen. Coverage starts in Bangkok and grows from there.",
  description: "65.8M people and a fully digital, programmatic network in Bangkok's Siam district, reported screen by screen.",
  stats: [['Population', '65.8M'], ['Bangkok Residents', '5.4M'], ['Monthly Impressions', '2.1M+']].map(([label, value]) => ({ _key: key(), label, value })),
  billboardsHeading: 'High Visibility OOH Screens in Thailand',
  billboardsDailyReachLabel: 'Monthly Reach',
  billboardsMonthlyImpressionsLabel: 'Monthly Impressions',
  highVisibilityBillboards: [
    site('BTS Main Entrance', 'Siam Square, Bangkok', 'LED, 4800 × 960 px', '13,500', '157,680', 'bts'),
    site('SQ1 Walkway – Building Connection', 'Siam Square One, Bangkok', 'LED, 4096 × 1080 px', '12,993', '149,040', 'sq1'),
    site('CU1 Nisit', 'Chulalongkorn University area, Bangkok', 'LED, 1024 × 320 px', '8,424', '86,940', 'cu1'),
  ],
  mediaTypesHeading: 'DOOH Media Types in Thailand',
  mediaTypes: [
    ['Mall and walkway LEDs', '14 sites at Siam Square One and the Siam walking street, including large walkway screens and pole networks.', 'mall'],
    ['Urban panels', '8 LED panels at the Siam Square gates and in Silom.', 'digital'],
    ['Campus screens', '2 LED screens in the Chulalongkorn University area.', 'static'],
  ].map(([name, description, icon]) => ({ _key: key(), name, description, icon })),
  sectionsPosition: 'before-faqs',
  sections: thailandSections,
  faqs: faq([
    ['How much does billboard advertising in Thailand cost?', 'Pricing depends on the screens, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
    ['Where are your screens in Thailand?', 'In Bangkok: Siam Square One, the Siam Square gates and walking street, the Chulalongkorn University area and Silom.'],
    ['What types of outdoor advertising are available?', 'Walkway and mall LEDs, pole networks, urban LED panels and campus screens.'],
    ['Can I buy Thai OOH programmatically?', 'Yes. Every screen on these pages is available programmatically through the Moving Walls platform, with reach and impressions reported by screen.'],
    ['Do you have screens outside Bangkok?', 'Not yet. Our Thailand network is currently in Bangkok, centred on Siam. We are looking at Chiang Mai, Phuket, Pattaya and Khon Kaen, and new cities can be added to the same plan as inventory comes online.'],
    ['Can I combine Bangkok with other Southeast Asian markets?', 'Yes. One plan on the Moving Walls platform can run across Thailand, Singapore, Malaysia, Indonesia and more.'],
  ]),
  seo: {
    _type: 'seo',
    metaTitle: 'Billboards & DOOH Advertising in Thailand | Moving Walls',
    metaDescription: "Plan programmatic DOOH in Thailand, starting with Bangkok's Siam network: 24 sites, 45 screens and 2.1M+ monthly impressions, reported by screen.",
    enableKeywords: false,
    noIndex: false,
    ogImage: ref('gate3'),
  },
}

// ---------- Bangkok ----------
const checklist = (cls, eyebrow, title, lead, items, cta) => `<section class="${cls}">
  ${styleFrom(manCode, 'mw-mc-match', cls).replace('</style>', `  @media (min-width:900px){ .${cls}__list{ grid-template-columns:1fr 1fr; } }\n    .${cls}__eyebrow{ display:block; text-align:center; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#2F5FE0 !important; margin:0 0 10px; }\n    .${cls}{ background:#F6F8FC !important; padding-top:clamp(40px,6vw,64px) !important; padding-bottom:clamp(40px,6vw,64px) !important; }\n  </style>`)}
  <div class="${cls}__container">
    <div class="${cls}__inner">
      <span class="${cls}__eyebrow">${esc(eyebrow)}</span>
      <h2 class="${cls}__title">${esc(title)}</h2>
      <p class="${cls}__lead" style="text-align:center">${esc(lead)}</p>
      <ul class="${cls}__list">${items.map((t) => `
        <li>${TICK}<span>${esc(t)}</span></li>`).join('')}
      </ul>
    </div>
    <div class="${cls}__cta">
      <a class="${cls}__btn" href="${FORM}" target="_blank" rel="noopener" data-modal-open="${cls}-modal">
        ${esc(cta)}
        ${ARROW}
      </a>
    </div>${modal('bk', 'why-dooh')}
  </div>
</section>`
const tips = (items) => `<!-- Moving Walls — Bangkok: Best Practices for Outdoor Advertising -->
<section class="mw-bk-tips">
  <style>
    .mw-bk-tips{ background:#FFFFFF; padding:clamp(40px,6vw,72px) 16px; box-sizing:border-box; }
    .mw-bk-tips *{ box-sizing:border-box; }
    @media (min-width:640px){ .mw-bk-tips{ padding-left:24px; padding-right:24px; } }
    .mw-bk-tips__container{ max-width:1280px; margin:0 auto; }
    .mw-bk-tips__eyebrow{ display:block; text-align:center; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#2F5FE0 !important; margin:0 0 10px; }
    .mw-bk-tips__title{ font-size:clamp(28px,4vw,38px); font-weight:800; line-height:1.15; color:#101828 !important; text-align:center; margin:0 0 40px; }
    .mw-bk-tips__grid{ display:flex; flex-wrap:wrap; justify-content:center; gap:22px; list-style:none !important; margin:0; padding:0; }
    .mw-bk-tips__card{ flex:0 1 calc(33.333% - 15px); min-width:260px; background:#F6F8FC; border:1px solid #E2E6ED; border-radius:16px; padding:26px; position:relative; transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
    .mw-bk-tips__card:hover{ transform:translateY(-4px); box-shadow:0 16px 36px rgba(16,24,40,.12); border-color:#2F5FE0; }
    .mw-bk-tips__num{ display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:50%; background:#12296B; color:#fff !important; font-weight:800; font-size:14px; margin-bottom:16px; }
    .mw-bk-tips__card p{ font-size:15px; line-height:1.6; color:#344054 !important; margin:0; }
    .mw-bk-tips__card strong{ color:#101828 !important; }
    @media (max-width:600px){ .mw-bk-tips__card{ flex-basis:100%; } }
    @media (prefers-reduced-motion: reduce){ .mw-bk-tips *{ transition:none!important; } }
  </style>
  <div class="mw-bk-tips__container">
    <span class="mw-bk-tips__eyebrow">Best Practices</span>
    <h2 class="mw-bk-tips__title">Best Practices for Outdoor Advertising in Bangkok</h2>
    <ol class="mw-bk-tips__grid">${items.map((t, i) => `
      <li class="mw-bk-tips__card"><span class="mw-bk-tips__num">0${i + 1}</span><p>${t}</p></li>`).join('')}
    </ol>
  </div>
</section>`

const bangkok = {
  _id: 'drafts.' + BANGKOK,
  _type: 'locationCity',
  country: { _type: 'reference', _ref: THAILAND },
  city: 'Bangkok',
  slug: { _type: 'slug', current: 'bangkok' },
  order: 1,
  isActive: true,
  heroTitle: 'DOOH Advertising in Bangkok',
  heroImage: ref('walk'),
  fullDescription: "Looking for a billboard in Bangkok that proves its impact?\n\nMoving Walls helps brands reach Bangkok's shoppers, students and commuters through digital screens at Siam Square One, the Siam Square gates and walking street, the Chulalongkorn University area and Silom. Every campaign is bought programmatically and reported by screen.",
  description: 'Digital screens across Siam Square One, the Siam Square gates and walking street, Chulalongkorn University and Silom.',
  ctaButtonText: 'Explore Bangkok DOOH',
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  billboardsHeading: 'Premium Billboard Locations in Bangkok',
  billboardsDailyReachLabel: 'Monthly Reach',
  billboardsMonthlyImpressionsLabel: 'Monthly Impressions',
  highVisibilityBillboards: [
    site('BTS Main Entrance', 'Siam Square, Bangkok', 'LED, 4800 × 960 px', '13,500', '157,680', 'bts'),
    site('Siam Walking Street', 'Siam Square, Bangkok', 'Portrait LED, 1418 × 2835 px', '4,974', '65,070', 'walk'),
    site('Siam Square Gate 3', 'Siam Square, Bangkok', 'Urban LED panel, 1152 × 512 px', '7,910', '106,470', 'gate3'),
  ],
  mediaTypesHeading: 'Outdoor Advertising Formats',
  mediaTypes: [['LED Billboards', 'digital'], ['Walkway and mall LEDs', 'mall'], ['Urban panels', 'static'], ['Light pole networks', 'transit'], ['Campus screens', 'static']].map(([name, icon]) => ({ _key: key(), name, description: '', icon })),
  sectionsPosition: 'before-faqs',
  sections: [
    {
      _key: key(), _type: 'textBlock', backgroundColor: 'gray', alignment: 'center', maxWidth: 'full',
      heading: "Reach Bangkok's Shoppers and Students in Siam",
      content: [
        rich("Bangkok is Thailand's most populous area, with [5.42 million registered residents](https://www.ceicdata.com/en/thailand/population-by-age-bangkok) in 2025."),
        rich("Moving Walls' Bangkok network spans **24 sites and 45 screens**, delivering **2.1M+ monthly impressions**, almost all within walking distance of Siam."),
        rich('Through a single platform, advertisers can **take over Siam\'s walkways and gates in one buy**, schedule by time of day and measure reach and impressions by screen.'),
      ],
    },
    {
      _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right', image: ref('sq1'),
      heading: 'Why Advertise in Bangkok?', ctaText: 'Check Siam Availability', ctaLink: FORM, ctaPlacement: 'image',
      content: [
        rich("**Thailand's biggest audience.** Bangkok has 5.42 million registered residents, far more than any other province."),
        rich('**A concentrated network.** Nearly every screen sits in and around Siam Square, so one campaign can surround shoppers from the BTS entrance to the walking street.'),
        rich('**High frequency.** Each screen is seen 8 to 14 times a month on average by the same audience.'),
        rich('**Measurable campaign performance.** All 45 screens are bought programmatically, with reach and impressions reported by screen.'),
      ],
    },
    {
      _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'left', image: ref('gate3'),
      heading: 'Billboard Locations Across Bangkok', ctaText: 'Get the Full Bangkok Site List', ctaLink: FORM, ctaPlacement: 'image',
      content: [
        rich('**Siam Square One walkways** – large LEDs at the building connection, by Starbucks, by Onitsuka, in the fashion zone, at the parking entrance and on Soi 7, 08.00–22.00'),
        rich('**Siam Square One poles and ramp** – pole-mounted and ramp screens inside the mall'),
        rich('**BTS Main Entrance** – a 4800 × 960 px LED, 06.00–00.00'),
        rich('**Siam walking street and Landmark** – a portrait LED on the walking street and the Landmark screen'),
        rich('**Siam Series Light Poles** – a 20-screen LCD network along the street'),
        rich('**Siam Square gates** – LED panels at Gates 2, 3, 6 and 7, 06.00–22.00'),
        rich('**Chulalongkorn University area** – two campus LEDs, 08.00–20.00'),
        rich('**Silom** – a portrait LED panel, 06.00–22.00'),
      ],
    },
    {
      ...whyEmbed, _key: key(),
      code: whyVisual('Bangkok: Why Choose Moving Walls', 'Why Moving Walls', 'Why Choose Moving Walls?', [
        "Booking screens in a new market shouldn't take weeks of back and forth.",
        "Moving Walls brings Bangkok's Siam network onto the same platform as the rest of Southeast Asia, so brands can add Thailand to a regional plan in one buy.",
      ], 'With Moving Walls, you can', [
        'Access 45 screens across Siam, Chulalongkorn and Silom',
        'Take over a whole district in one buy',
        'Buy programmatically and adjust mid-flight',
        'Reach shoppers, students and commuters',
        'Measure reach and impressions by screen with transparent reporting',
      ], 'Talk to Our Team'),
    },
    { ...science, _key: key() },
    {
      ...embedBase, _key: key(),
      code: `<!-- Moving Walls — Bangkok: Why Choose DOOH Advertising -->\n` + checklist('mw-bk-why-dooh', 'Why DOOH', 'Why Choose DOOH Advertising in Bangkok?',
        'Digital out-of-home combines the impact of a street-level billboard with the flexibility of digital. On the Moving Walls platform, advertisers can:', [
          'Run different creative at the BTS entrance, the walkways and the gates',
          'Schedule by time of day, from the morning commute to late-night shopping',
          'Activate programmatically, without long fixed bookings',
          'Reach a defined audience of shoppers, students and commuters',
          'See delivery reported by screen, with reach and frequency',
        ], 'Plan Your Bangkok Campaign'),
    },
    {
      _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right', image: ref('cu1'),
      heading: "Reaching Bangkok's Student Audience", ctaText: 'Reach Bangkok Students', ctaLink: FORM, ctaPlacement: 'image',
      content: [
        rich('Two screens sit in the **Chulalongkorn University area**, and Siam Square is one of the city\'s main student meeting points.'),
        rich('For brands targeting **18- to 24-year-olds**, a Siam and campus combination reaches them where they study and where they spend their free time.'),
      ],
    },
    {
      ...embedBase, _key: key(),
      code: tips([
        '<strong>Pair a large walkway LED with the smaller gate panels:</strong> one for impact, the rest for frequency.',
        '<strong>Keep creative readable in seconds.</strong> Most of these screens are passed on foot, at close range.',
        '<strong>Use Thai and English</strong> where the audience is mixed, as it is around Siam and the BTS.',
        '<strong>Daypart around shopping hours.</strong> Most screens run to 22.00, and the BTS entrance to midnight.',
        '<strong>Measure delivery by screen</strong> and use it to weight the next flight.',
      ]),
    },
    { ...thLogos, _key: key(), heading: 'Trusted by Leading Brands' },
    banner('Plan Your Billboard Advertising Campaign in Bangkok', 'Whether you need the BTS entrance screen or all of Siam, Moving Walls helps you pick the right inventory and shows you what it delivered.', 'Talk to our experts today'),
  ],
  faqs: faq([
    ['How much does billboard advertising in Bangkok cost?', 'Pricing depends on the screens, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
    ['Where are the billboards in Bangkok?', 'Around Siam Square and Siam Square One, the Chulalongkorn University area and Silom.'],
    ['Can I run billboard advertising in Bangkok programmatically?', 'Yes. All 45 screens are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.'],
    ['Can I take over the whole Siam network?', 'Yes. One plan can run across every walkway, gate and pole screen in the district.'],
    ['Which screens are best for reaching students?', 'The two campus LEDs in the Chulalongkorn University area, combined with the Siam Square gates and walking street, where students meet and shop after class.'],
    ['Can I combine Bangkok with other Southeast Asian markets?', 'Yes. One plan on the Moving Walls platform can run across Thailand, Singapore, Malaysia, Indonesia and more, with reporting by screen.'],
  ]),
  seo: {
    _type: 'seo',
    metaTitle: 'Billboard & DOOH Advertising in Bangkok | Siam Screens',
    metaDescription: 'Reach Bangkok shoppers and students across 45 screens at Siam Square One, the Siam gates, Chulalongkorn and Silom. Programmatic, reported by screen.',
    enableKeywords: false,
    noIndex: false,
    ogImage: ref('walk'),
  },
}

if (await c.fetch('count(*[_type=="locationCity" && slug.current=="bangkok" && !(_id in [$id, "drafts." + $id])])', { id: BANGKOK })) throw new Error('A Bangkok city page already exists')
await c.transaction().createOrReplace(thailand).createOrReplace(bangkok).commit()
console.log('Drafts saved: Thailand refresh (drafts.' + THAILAND + ') and Bangkok (drafts.' + BANGKOK + ')')
