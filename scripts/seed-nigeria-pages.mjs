// Creates DRAFT Nigeria pages from "Nigeria.docx", "Lagos.docx", "Abuja.docx" and "Port Harcourt.docx":
//   /locations/nigeria (country, South Africa layout) and /locations/nigeria/{lagos,abuja,port-harcourt}
//   (city pages, Cape Town layout). Also drafts the Africa page with "Billboards in Nigeria" linked.
// Same building blocks as seed-kenya-pages.mjs. FAQs, CTAs, SEO and card blurbs were written for
// these pages (the docs did not include them). Photos are the doc photos with GPS stamps cropped off.
// Usage: node scripts/seed-nigeria-pages.mjs <folder with the prepared .webp photos>
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const IMG_DIR = process.argv[2]
if (!IMG_DIR) { console.error('Pass the photo folder'); process.exit(1) }
const SA = 'b4dc7c56-1d98-435b-b721-bb64196ca058'
const AFRICA = '7a66f44a-78b6-436f-b3b7-ac220f536594'
const NIGERIA = 'location-nigeria'

const sa = await c.getDocument(SA)
const FORM = sa.contactFormUrl // AfricaContact
const saCode = sa.sections.find((s) => s._type === 'customEmbed').code
const embedBase = sa.sections.find((s) => s._type === 'customEmbed')
const logos = sa.sections.find((s) => s._type === 'logoCarousel')

let n = 0
const key = () => `ng${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

// Photos
const uploaded = {}
for (const f of fs.readdirSync(IMG_DIR).filter((f) => f.endsWith('.webp'))) {
  const a = await c.assets.upload('image', fs.createReadStream(path.join(IMG_DIR, f)), { filename: f })
  uploaded[f.replace('.webp', '')] = a
}
const ref = (name) => ({ _type: 'image', asset: { _type: 'reference', _ref: uploaded[name]._id } })
const url = (name) => uploaded[name].url
const dims = (name) => uploaded[name].metadata?.dimensions || { width: 1200, height: 675 }
const LION = 'lion-ring-road-lagos-island'
const OGBA = 'ogba-omole-agege-lagos'
const AMINU = 'aminu-kano-crescent-wuse-abuja'
const BANEX = 'banex-aminu-kano-crescent-abuja'
const PH_AIRPORT = 'airport-road-port-harcourt'
const PH_PARK = 'pleasure-park-aba-road-port-harcourt'

// Section CSS taken from the South Africa and Cape Town pages, renamed per page
const styleOf = (code, cls, prefix) => {
  const m = code.match(new RegExp(`<section class="${cls}">\\s*(<style>[\\s\\S]*?</style>)`))
  if (!m) throw new Error('No style for ' + cls)
  return m[1].replace(new RegExp(cls.replace(/-[a-z]+$/, '-'), 'g'), `mw-${prefix}-`)
}
const ICON = {
  digital: '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/><circle cx="12" cy="10" r="2"/>',
  road: '<path d="M4 21 9 3h6l5 18"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="15" x2="12" y2="17"/>',
  mall: '<path d="M6 8V6a6 6 0 0 1 12 0v2"/><rect x="3" y="8" width="18" height="13" rx="2"/><line x1="3" y1="13" x2="21" y2="13"/>',
  transit: '<rect x="5" y="4" width="14" height="13" rx="3"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="9" cy="14.5" r="1.2"/><circle cx="15" cy="14.5" r="1.2"/><path d="M8 20l-2 2"/><path d="M16 20l2 2"/>',
  airport: '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
}
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
const esc = (s) => s.replace(/&/g, '&amp;')

const mediaSection = (p, page, title, cards) => `<!--
  Moving Walls — ${page} Location Page: "${title}"
-->
<section class="mw-${p}-media">
  ${styleOf(saCode, 'mw-za-media', p)}
  <div class="mw-${p}-media__container">
    <div class="mw-${p}-media__intro">
      <h2 class="mw-${p}-media__title">${esc(title)}</h2>
    </div>
    <div class="mw-${p}-media__grid">${cards.map(([icon, h, t]) => `
      <div class="mw-${p}-media__card">
        <span class="mw-${p}-media__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[icon]}</svg></span>
        <h3>${esc(h)}</h3>
        <p>${esc(t)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`

// Text + photo + CTA popup (South Africa "Billboard Advertising" block). imageLeft flips the columns on desktop.
const textImageSection = (p, sec, page, title, paras, cta, img, alt, imageLeft = false) => {
  const css = styleOf(saCode, 'mw-za-billboard', p).replace(/mw-[a-z]+-billboard/g, `mw-${p}-${sec}`)
  const flip = imageLeft ? `\n    @media (min-width:861px){ .mw-${p}-${sec}__media{ order:1; } .mw-${p}-${sec}__text{ order:2; } }\n  </style>` : '</style>'
  const { width, height } = dims(img)
  return `<!--
  Moving Walls — ${page} Location Page: "${title}"
-->
<section class="mw-${p}-${sec}">
  ${css.replace('</style>', flip).replace(`aspect-ratio:1005/561`, `aspect-ratio:${width}/${height}`)}
  <div class="mw-${p}-${sec}__container">
    <div class="mw-${p}-${sec}__row">
      <div class="mw-${p}-${sec}__text">
        <h2 class="mw-${p}-${sec}__title">${esc(title)}</h2>
        ${paras.map((t) => `<p>${t}</p>`).join('\n        ')}
        <a class="mw-${p}-${sec}__btn" href="${FORM}" target="_blank" rel="noopener" data-modal-open="mw-${p}-${sec}-modal">
          ${esc(cta)}
          ${ARROW}
        </a>
      </div>
      <div class="mw-${p}-${sec}__media">
        <img src="${url(img)}" alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy">
      </div>
    </div>
    <!-- Contact popup: Zoho Africa form -->
    <div id="mw-${p}-${sec}-modal" class="mw-${p}-${sec}__modal-overlay" data-modal-root>
      <div class="mw-${p}-${sec}__modal-box" role="dialog" aria-modal="true" aria-label="Contact Moving Walls">
        <button type="button" class="mw-${p}-${sec}__modal-close" aria-label="Close" data-modal-close>&times;</button>
        <iframe id="mw-${p}-${sec}-modal-frame" class="mw-${p}-${sec}__modal-frame" title="Moving Walls Africa Contact Form" loading="lazy"></iframe>
      </div>
    </div>
  </div>
</section>`
}
const proseSection = (p, page, title, paras) => `<!--
  Moving Walls — ${page} Location Page: "${title}"
-->
<section class="mw-${p}-market">
  ${styleOf(saCode, 'mw-za-market', p)}
  <div class="mw-${p}-market__container">
    <div class="mw-${p}-market__inner">
      <h2 class="mw-${p}-market__title">${esc(title)}</h2>
      ${paras.map((t) => `<p>${t}</p>`).join('\n      ')}
    </div>
  </div>
</section>`
const faq = (list) => list.map(([question, answer]) => ({ _key: key(), question, answer }))
const banner = (heading, subheading, ctaText) => ({ _key: key(), _type: 'ctaBanner', backgroundColor: 'blue', heading, subheading, ctaText, ctaLink: FORM })
const seo = (metaTitle, metaDescription, img) => ({ _type: 'seo', metaTitle, metaDescription, enableKeywords: false, noIndex: false, ogImage: ref(img) })
const stat = (reach, imp) => `Daily Reach - ${reach}\nImpressions - ${imp}`


// ---------- Nigeria (country) ----------
const nigeria = {
  _id: `drafts.${NIGERIA}`,
  _type: 'location',
  country: 'Nigeria',
  slug: { _type: 'slug', current: 'nigeria' },
  city: 'Lagos',
  heroTitle: 'Outdoor Advertising in Nigeria',
  heroImage: ref(LION),
  ctaButtonText: 'Get a Nigeria Media Plan',
  showAllLocationsButton: true,
  description: "West Africa's largest OOH market. Billboards and DOOH across Lagos, Abuja and Port Harcourt.",
  fullDescription: "Nigeria is the largest out-of-home market in West Africa. More than 243 million people live here, with over half living in fast-growing urban centres, and the major metropolitan hubs hold tens of millions of residents between them.\n\nFrom Lagos's dense commuter corridors to Abuja's administrative centre and Port Harcourt's commercial routes, billboards put your brand in front of high-value audiences where they live, work and travel. As Africa's largest economy and a demographic powerhouse, Nigeria is a strategic launchpad for campaigns across West Africa.",
  stats: [['Population', '243M+'], ['Screens', '375+'], ['Impressions', '114M+']].map(([label, value]) => ({ _key: key(), label, value })),
  citiesHeading: 'Explore by Major Metropolitan Areas',
  citiesSubheading: "OOH advertising opportunities in Nigeria's key cities",
  contactFormUrl: FORM,
  isActive: true,
  sectionsPosition: 'before-faqs',
  hideDefaultHero: false,
  sections: [
    {
      ...embedBase, _key: key(),
      code: [
        mediaSection('ng', 'Nigeria', 'OOH Media Formats in Nigeria', [
          ['digital', 'Digital billboards', 'Large-format LED displays on high-density expressways and in city centres. Creative updates happen in minutes rather than weeks.'],
          ['road', 'Roadside and highway', 'Static and digital inventory along high-volume arterial routes, including the Third Mainland Bridge, Lekki-Epe Expressway, Abuja Airport Road and the Port Harcourt–Aba Expressway.'],
          ['mall', 'Mall networks', 'High-impact screens inside top retail destinations across Lagos, Abuja and other major cities, influencing decisions at the point of purchase.'],
          ['transit', 'Transit and taxi', 'BRT bus wraps, in-bus screens, motor park media and interstate transit networks reaching millions of daily urban commuters.'],
          ['airport', 'Airport media', "Placements at Nigeria's major international airports, reaching business travellers, returning diaspora and inbound visitors."],
        ]),
        textImageSection('ng', 'billboard', 'Nigeria', 'Billboard Advertising in Nigeria', [
          'Billboards command the largest share of Nigerian out-of-home budgets, with roadside and freeway inventory making up most of the market. That reflects how the country moves: commutes are long, traffic is dense and commercial transit carries millions along fixed daily routes, so audiences spend real time outside the home on predictable paths.',
          'How that inventory is bought is changing fast. Static formats used to dominate rate cards, but leading Nigerian media owners are moving quickly to digital networks, and campaigns have shifted from rigid long-term bookings to agile, data-led buys. Advertisers can now run <strong>programmatic DOOH</strong>, target specific audiences, read footfall data and move budget between Lagos, Abuja and Port Harcourt mid-campaign.',
          "Moving Walls brings Nigeria's leading outdoor media owners and agencies onto one platform, so you can plan, book, activate and measure every inventory type in one place.",
        ], 'Launch Your Nigeria Campaign', BANEX, 'Digital billboard at Aminu Kano Crescent, Abuja'),
        proseSection('ng', 'Nigeria', 'DOOH Market Landscape', [
          "Nigeria's primary hubs, Lagos, Abuja and Port Harcourt, offer ideal conditions for high-impact OOH thanks to heavy vehicle traffic, dense footfall and strategic commercial arteries. Corridors like the Lekki-Ikoyi Link Bridge in Lagos, the Central Business District in Abuja and Aba Road in Port Harcourt connect large daily audiences of commuters, executives and shoppers.",
          "Backed by extensive road networks and major arterial highways, these locations let planners place digital screens and large-format billboards along high-volume routes. With data-driven platforms like Moving Walls, advertisers can analyse movement data, compare the cost and performance of sites, optimise digital inventory and engage audiences across Nigeria's most dynamic markets.",
        ]),
      ].join('\n\n'),
    },
    {
      _key: key(), _type: 'featureGrid', backgroundColor: 'white', columns: 3,
      heading: 'Out of Home Advertising in Nigeria',
      features: [
        ['Lion – Lagos Island', stat('768,618', '42,589,659'), LION],
        ['Ogba – Lagos', stat('551,766', '28,362,548'), OGBA],
        ['Aminu Kano Crescent – Abuja', stat('382,050', '15,200,165'), AMINU],
        ['Banex – Abuja', stat('284,190', '13,151,549'), BANEX],
        ['Airport Road – Port Harcourt', stat('305,918', '6,228,458'), PH_AIRPORT],
        ['Pleasure Park – Port Harcourt', stat('443,820', '7,910,259'), PH_PARK],
      ].map(([title, description, img]) => ({ _key: key(), title, description, icon: ref(img) })),
    },
    {
      _key: key(), _type: 'successStories', backgroundColor: 'gray', sectionHeading: 'See the Proof', cardStyle: 'image',
      stories: ['4WosXPXvlMgq3tPqrVefOz', 'b8dac2d9-0255-41aa-a446-213764c22fa8'].map((id) => ({ _key: key(), _type: 'successStoryItem', contentType: 'caseStudy', caseStudyRef: { _type: 'reference', _ref: id } })),
    },
    { ...logos, _key: key() },
    banner("Reach Nigeria's Commuters, Shoppers and Decision-Makers", 'Plan, book and measure billboard and DOOH campaigns across Lagos, Abuja and Port Harcourt from one platform, with site-by-site reporting you can share with your team.', 'Talk to Our Nigeria Team'),
  ],
  faqs: faq([
    ['How much does billboard advertising in Nigeria cost?', 'It depends on the city, the site, the format and how long the campaign runs. A digital screen on a Lagos expressway is priced differently from a mall screen in Abuja or a roadside site in Port Harcourt. Share your audience, budget and dates and we will come back with a plan and rates that fit.'],
    ['Which Nigerian cities can I advertise in with Moving Walls?', 'Lagos, Abuja and Port Harcourt. Our Nigeria network covers 375+ screens and delivers 114M+ impressions, so you can run one city or all three in the same plan.'],
    ['Can I buy outdoor advertising in Nigeria programmatically?', 'Yes. Digital screens across Nigeria can be bought programmatically, so you can target by time, location and audience, and shift budget mid-flight. Static sites can be added to the same plan through direct booking.'],
    ['What OOH formats are available in Nigeria?', 'Digital billboards, roadside and highway sites, mall networks, BRT and transit media, and airport placements. We help you choose the mix that fits your audience and objective.'],
    ['How do I measure an OOH campaign in Nigeria?', 'You get reach and impressions reported by site, so you can see which locations delivered. For deeper questions such as brand lift or awareness, MW Science can run research alongside the campaign.'],
    ['Can I run Nigeria alongside other African markets?', 'Yes. Nigeria can sit in the same plan as Kenya, South Africa, Morocco and other African markets, with one workflow and consistent reporting across countries.'],
  ]),
  seo: seo('Billboard & DOOH Advertising in Nigeria | Moving Walls', "Plan billboard and DOOH campaigns across Lagos, Abuja and Port Harcourt. 375+ screens and 114M+ impressions in West Africa's largest market, on one platform.", LION),
}

// ---------- Cities ----------
const city = (o) => ({
  _id: `drafts.city-nigeria-${o.slug}`,
  _type: 'locationCity',
  // weak until Nigeria is published (Studio does the same for drafts); made strong on publish
  country: { _type: 'reference', _ref: NIGERIA, _weak: true, _strengthenOnPublish: { type: 'location' } },
  city: o.name,
  slug: { _type: 'slug', current: o.slug },
  order: o.order,
  isActive: true,
  heroTitle: o.h1,
  heroImage: ref(o.hero),
  fullDescription: o.intro,
  description: o.card,
  ctaButtonText: o.button,
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  billboardsHeading: o.sitesHeading,
  billboardsDailyReachLabel: 'Daily Reach',
  billboardsMonthlyImpressionsLabel: 'Impressions',
  highVisibilityBillboards: o.sites.map(([name, location, reach, impressions, img]) => ({ _key: key(), name, location, reach, impressions, image: ref(img) })),
  sectionsPosition: 'before-faqs',
  sections: [
    {
      ...embedBase, _key: key(),
      code: [
        mediaSection(o.p, o.name, o.formatsHeading, o.formats),
        textImageSection(o.p, 'market', o.name, o.marketHeading, o.market, o.marketCta, o.marketImg, o.marketAlt),
        textImageSection(o.p, 'prog', o.name, o.progHeading, o.prog, o.progCta, o.progImg, o.progAlt, true),
      ].join('\n\n'),
    },
    { ...logos, _key: key() },
    banner(...o.banner),
  ],
  faqs: faq(o.faqs),
  seo: seo(o.seo[0], o.seo[1], o.hero),
})

const lagos = city({
  p: 'lg', slug: 'lagos', name: 'Lagos', order: 1,
  h1: 'Outdoor Advertising in Lagos', hero: LION, button: 'Explore Lagos DOOH',
  intro: "Lagos is the economic powerhouse of Nigeria and the largest out-of-home market in West Africa. More than 20 million people live here, making it one of the most densely populated cities in the world.\n\nFrom the bridges linking the Island to the Mainland to its busy commercial hubs, billboard advertising in Lagos puts your brand in front of millions of commuters every day, reaching key consumer segments where they live, work and travel across the megacity.",
  card: "West Africa's biggest market. Reach Lagos commuters on the bridges, expressways and Island.",
  sitesHeading: 'Premium Billboards in Lagos',
  sites: [['Lion', 'Ring Road, Lagos Island', '768,618', '42,589,659', LION], ['Lagos Ogba', 'Isheri-Ogunnusi Road, Ogba', '551,766', '28,362,548', OGBA]],
  formatsHeading: 'OOH Media Formats in Lagos',
  formats: [
    ['transit', 'Transit Advertising', "Commuter-heavy displays across Lagos's public transport network and major interchanges, including BRT buses and lane corridors (Mile 12 to TBS, Ikorodu Road), the Mobolaji Johnson Station at Ebute Metta, and busy interstate terminals in Ojota and Oshodi."],
    ['digital', 'Digital Billboards', "High-impact LED screens and large-format digital gantries along Lagos's prime commercial and commuter arteries, including the Lekki-Epe Expressway, Falomo Roundabout in Ikoyi, Victoria Island's financial strip and the approaches to the Third Mainland Bridge."],
    ['mall', 'Mall Media', "Indoor digital displays, lightbox networks and entrance placements inside Lagos's top retail destinations, including Ikeja City Mall, The Palms in Lekki, Novare Lekki Mall and Maryland Mall."],
    ['road', 'Highways', 'Static, digital and gantry billboards along major expressways and interstate corridors such as the Third Mainland Bridge, Lekki-Epe Expressway, Ikorodu Road and the Lagos–Ibadan Expressway, capturing huge daily volumes of vehicle and commuter traffic.'],
  ],
  marketHeading: 'DOOH Market Landscape',
  market: [
    "Lagos is West Africa's economic engine, financial centre and tech hub. More than 20 million residents, fast-growing commercial zones and an energetic city centre combine high-volume traffic corridors with affluent business and lifestyle districts.",
    'The market mixes high-impact static placements with programmatic digital screens across premier retail destinations and arterial expressways. With Moving Walls, advertisers, agencies and media owners can use movement data to reach professionals, daily commuters and active consumers in high-dwell-time environments across the megacity.',
  ],
  marketCta: 'Request Lagos Options', marketImg: OGBA, marketAlt: 'Digital billboard in Ogba, Lagos',
  progHeading: 'Programmatic Advertising in Lagos',
  prog: ["Lagos is leading the shift to data-driven, programmatic DOOH in Nigeria. The megacity offers a connected network of digital screens across major expressways, financial hubs and lifestyle destinations.", "Through Moving Walls, brands and agencies can run automated, real-time campaigns that respond to audience movement, context and traffic patterns, then optimise as results come in, across Nigeria's largest urban market."],
  progCta: 'Plan Your Lagos Campaign', progImg: LION, progAlt: 'LED screen on Ring Road, Lagos Island',
  banner: ['Ready to Advertise in Lagos?', "From the Third Mainland Bridge to Lekki, we'll help you choose the screens that match your audience and budget, then show you what they delivered.", 'Talk to Our Media Planners'],
  faqs: [
    ['Where are the highest-reach billboards in Lagos?', 'The Lion screen on Ring Road, Lagos Island reaches 768,618 people a day, and the Ogba site on the Mainland reaches 551,766. Together they cover both sides of the city in one plan.'],
    ["How can I reach Lagos's daily commuters?", 'Combine digital billboards on the Lekki-Epe Expressway, Ikorodu Road and the Third Mainland Bridge approaches with transit media on BRT corridors and at busy terminals like Ojota and Oshodi.'],
    ['Can I advertise in Lagos malls?', 'Yes. Mall media at Ikeja City Mall, The Palms, Novare Lekki Mall and Maryland Mall reaches shoppers close to the point of purchase.'],
    ['Is programmatic DOOH available in Lagos?', 'Yes. Digital screens in Lagos can be bought programmatically, so you can target by time and location, adjust mid-campaign and see delivery reported by site.'],
    ['Can I run Lagos with Abuja and Port Harcourt?', "Yes. One plan on the Moving Walls platform can cover Lagos, Abuja and Port Harcourt, with consistent reporting across all three."],
  ],
  seo: ['Billboard Advertising in Lagos | DOOH & LED Screens', 'Reach Lagos commuters on the Third Mainland Bridge, Lekki-Epe Expressway and Island with programmatic DOOH and billboards. Plan and measure with Moving Walls.'],
})

const abuja = city({
  p: 'ab', slug: 'abuja', name: 'Abuja', order: 2,
  h1: 'Outdoor Advertising in Abuja', hero: AMINU, button: 'Explore Abuja DOOH',
  intro: "Abuja is the political and administrative capital of Nigeria, home to nearly 4 million residents, diplomatic missions and corporate headquarters.\n\nFrom the Central Business District to the major expressways, billboard advertising in Abuja puts your brand in front of decision-makers, executives and high-income commuters every day, reaching affluent audiences where they live, work and travel across the Federal Capital Territory.",
  card: "Nigeria's capital. Reach decision-makers, diplomats and high-income commuters across the FCT.",
  sitesHeading: 'High Visibility Billboards in Abuja',
  sites: [['Abuja Aminu Kano', 'Aminu Kano Crescent, Wuse 2', '382,050', '15,200,165', AMINU], ['Abuja Banex', 'Banex Junction, Wuse 2', '284,190', '13,151,549', BANEX]],
  formatsHeading: 'DOOH Media Formats in Abuja',
  formats: [
    ['transit', 'Transit Advertising', "Commuter-heavy displays across Abuja's transport hubs and routes, including ride-hail networks, inter-city terminals like Utako Park and Jabi Motor Park, and commuter hubs around the Abuja Light Rail stations and Federal Secretariat routes."],
    ['digital', 'Digital Billboards', "High-impact LED screens and digital gantries along Abuja's most prominent arteries, including Ahmadu Bello Way, Shehu Shagari Way in the Central Business District, and busy interchanges across Wuse Zone 2 and Maitama."],
    ['mall', 'Mall Media', "Indoor digital screens, video walls and entrance placements inside Abuja's top retail destinations, including Jabi Lake Mall, Ceddi Plaza, Dunes Center and Novare Central Mall."],
    ['road', 'Highways', 'Static, digital and portrait gantry billboards along major expressways such as the Nnamdi Azikiwe International Airport Expressway, the Kubwa–Zuba Expressway and the Nyanya–Mararaba corridor, capturing daily commuter and diplomatic traffic.'],
  ],
  marketHeading: 'DOOH Market Landscape',
  market: [
    "Abuja is Nigeria's political capital and administrative centre, and an affluent, highly structured OOH market. Nearly 4 million residents, modern urban planning and business hubs like Maitama, Wuse and the CBD connect high-volume expressways with premium lifestyle districts.",
    'With Moving Walls, brands and agencies can use movement data to reach political leaders, diplomats and corporate executives across high-visibility digital screens and premium static inventory.',
  ],
  marketCta: 'Request Abuja Options', marketImg: BANEX, marketAlt: 'Digital billboard at Banex junction, Abuja',
  progHeading: 'Programmatic Advertising in Abuja',
  prog: ["Abuja is an emerging leader for programmatic DOOH in Nigeria, with connected digital screens across major expressways, commercial plazas and airport approaches.", 'Through Moving Walls, brands and agencies can run automated, contextually relevant campaigns that adjust to audience movement, traffic flows and even daily flight schedules, reaching high-net-worth audiences across the capital with precision and control.'],
  progCta: 'Plan Your Abuja Campaign', progImg: AMINU, progAlt: 'Gantry billboard on Aminu Kano Crescent, Abuja',
  banner: ['Ready to Advertise in Abuja?', "From Wuse to the Airport Expressway, we'll help you reach the capital's decision-makers and show you what your campaign delivered.", 'Talk to Our Media Planners'],
  faqs: [
    ["How can I reach Abuja's decision-makers and executives?", 'Digital billboards in Wuse 2, Maitama and the Central Business District sit on the routes that government, diplomatic and corporate audiences use every day. The Aminu Kano Crescent site alone reaches 382,050 people a day.'],
    ['What are the busiest billboard locations in Abuja?', 'Aminu Kano Crescent (382,050 daily reach) and Banex junction (284,190 daily reach) in Wuse 2, plus sites along Ahmadu Bello Way and Shehu Shagari Way.'],
    ['Can I target travellers heading to Abuja airport?', 'Yes. Highway billboards on the Nnamdi Azikiwe International Airport Expressway reach business and diplomatic travellers on their way to and from the airport.'],
    ['Is programmatic DOOH available in Abuja?', 'Yes. Digital screens in Abuja can be bought programmatically, so you can target by time, location and audience and adjust the campaign while it runs.'],
    ['Can I run Abuja with Lagos and Port Harcourt?', 'Yes. One plan on the Moving Walls platform can cover all three cities, with reporting by site.'],
  ],
  seo: ['Billboard Advertising in Abuja | DOOH & Digital Screens', "Reach Abuja's decision-makers and commuters in Wuse, Maitama and the CBD with programmatic DOOH and billboards. Plan and measure with Moving Walls."],
})

const portHarcourt = city({
  p: 'ph', slug: 'port-harcourt', name: 'Port Harcourt', order: 3,
  h1: 'Outdoor Advertising in Port Harcourt', hero: PH_AIRPORT, button: 'Explore Port Harcourt DOOH',
  intro: "Port Harcourt is the commercial heart of the Niger Delta, home to major energy-sector headquarters, thriving industrial corridors and a fast-growing urban population.\n\nFrom Aba Road to the major expressways, billboard advertising in Port Harcourt puts your brand in front of corporate executives, high-income professionals and daily commuters, reaching key consumer segments where they live, work and travel across Rivers State.",
  card: "Nigeria's energy capital. Reach executives and commuters on Aba Road and the airport corridor.",
  sitesHeading: 'High Visibility Billboards in Port Harcourt',
  sites: [['Port Harcourt Pleasure Park', 'Port Harcourt–Aba Expressway', '443,820', '7,910,259', PH_PARK], ['Port Harcourt Airport Road', 'Airport Road, Ikwerre', '305,918', '6,228,458', PH_AIRPORT]],
  formatsHeading: 'OOH Media Types Available in Port Harcourt',
  formats: [
    ['transit', 'Transit Advertising', "Commuter-heavy displays across the city's key transport nodes, including fleet branding, commercial shuttle corridors, interstate bus terminals along Waterlines and Mile 3, and busy routes linking the industrial hubs to residential districts."],
    ['digital', 'Digital Billboards', "High-impact LED screens and digital gantries along Port Harcourt's main commercial and commuter arteries, including Aba Road, Peter Odili Road, Garrison Junction and the GRA Phase 2 entertainment and business strip."],
    ['mall', 'Mall Media', "Indoor digital displays, lightbox networks and entrance placements inside Port Harcourt's top retail destinations, including Port Harcourt Mall on Azikiwe Road and Genesis Center."],
    ['road', 'Highways', 'Static and digital billboards along key regional expressways and industrial corridors such as the Port Harcourt–Aba Expressway, East-West Road and Airport Road, reaching corporate, industrial and commuter traffic.'],
  ],
  marketHeading: 'DOOH Market Landscape',
  market: [
    "Port Harcourt is the energy capital of Nigeria and the main economic hub of the Niger Delta, with an affluent, business-focused OOH landscape. A growing population, a strong multinational energy presence and commercial expansion combine industrial and airport corridors with busy lifestyle districts like GRA Phase 2.",
    'With Moving Walls, advertisers and agencies can use movement data to reach energy-sector executives, entrepreneurs and high-income commuters across high-visibility digital screens and prime static billboards.',
  ],
  marketCta: 'Request Port Harcourt Options', marketImg: PH_PARK, marketAlt: 'Billboard near Pleasure Park, Port Harcourt',
  progHeading: 'Programmatic Advertising in Port Harcourt',
  prog: ["Port Harcourt is a fast-growing market for programmatic DOOH in Nigeria, bringing automated buying to the Niger Delta's top commercial arteries.", "Through Moving Walls, brands and agencies can run automated, context-aware campaigns along high-dwell routes, commercial hubs and airport corridors, with real-time precision, flexible targeting and measurable reach."],
  progCta: 'Plan Your Port Harcourt Campaign', progImg: PH_AIRPORT, progAlt: 'Billboard on Airport Road, Port Harcourt',
  banner: ['Ready to Advertise in Port Harcourt?', "From Aba Road to the airport corridor, we'll help you reach the Niger Delta's executives and commuters and show you what your campaign delivered.", 'Talk to Our Media Planners'],
  faqs: [
    ['Why advertise in Port Harcourt?', "It's the commercial centre of the Niger Delta and home to major energy companies, so it concentrates corporate executives, high-income professionals and busy commuter traffic in one city."],
    ['What are the top billboard locations in Port Harcourt?', 'The Pleasure Park site on the Port Harcourt–Aba Expressway reaches 443,820 people a day, and the Airport Road site reaches 305,918. Aba Road, Peter Odili Road and GRA Phase 2 add further digital options.'],
    ['Can I reach travellers going to Port Harcourt International Airport?', 'Yes. The Airport Road billboard sits on the main route to the airport, reaching business travellers and commuters every day.'],
    ['Is programmatic DOOH available in Port Harcourt?', 'Yes. Digital screens in Port Harcourt can be bought programmatically, so you can target by time and location and adjust while the campaign runs.'],
    ['Can I add Port Harcourt to a Lagos or Abuja campaign?', 'Yes. One plan on the Moving Walls platform can cover Port Harcourt, Lagos and Abuja, with reporting by site.'],
  ],
  seo: ['Billboard Advertising in Port Harcourt | DOOH Nigeria', 'Reach Port Harcourt executives and commuters on Aba Road, Airport Road and the Aba Expressway with programmatic DOOH and billboards. Plan with Moving Walls.'],
})

for (const d of [nigeria, lagos, abuja, portHarcourt]) {
  const pub = d._id.replace('drafts.', '')
  if (await c.fetch('count(*[slug.current==$s && _type==$t && !(_id in [$id, $d])])', { s: d.slug.current, t: d._type, id: pub, d: d._id })) throw new Error('Slug in use: ' + d.slug.current)
}
const tx = c.transaction()
for (const d of [nigeria, lagos, abuja, portHarcourt]) tx.createOrReplace(d)

// Africa page: link "Billboards in Nigeria" the same way South Africa / Morocco / Kenya are linked (draft)
const africa = (await c.getDocument('drafts.' + AFRICA)) || (await c.getDocument(AFRICA))
const hubs = africa.sections.find((s) => s._type === 'customEmbed' && s.code.includes('Billboards in Nigeria'))
const linked = hubs.code.replace('<h3 class="market-name">Billboards in Nigeria</h3>', '<h3 class="market-name"><a class="market-name-link" href="https://www.movingwalls.com/locations/nigeria">Billboards in Nigeria</a></h3>')
if (linked === hubs.code && !hubs.code.includes('/locations/nigeria')) throw new Error('Nigeria heading not found on Africa page')
const { _rev, _updatedAt, _createdAt, ...africaRest } = africa
tx.createOrReplace({ ...africaRest, _id: 'drafts.' + AFRICA, sections: africa.sections.map((s) => (s._key === hubs._key ? { ...s, code: linked } : s)) })
await tx.commit()
console.log('Drafts created: Nigeria + Lagos, Abuja, Port Harcourt; Africa page draft links Nigeria')
