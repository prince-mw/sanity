// Creates DRAFT Kenya pages from "Kenya.docx", "Nairobi.docx", "Mombasa.docx" and "Kisumu & Nakuru.docx":
//   /locations/kenya (country, South Africa layout) and /locations/kenya/{nairobi,mombasa,kisumu-nakuru}
//   (city pages, Cape Town layout). Also drafts the Africa page with "Billboards in Kenya" linked.
// FAQs, CTAs, SEO and card blurbs were written for these pages (the docs did not include them).
// Usage: node scripts/seed-kenya-pages.mjs <folder with the prepared .webp photos>
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const IMG_DIR = process.argv[2]
if (!IMG_DIR) { console.error('Pass the photo folder'); process.exit(1) }
const SA = 'b4dc7c56-1d98-435b-b721-bb64196ca058'
const CAPE_TOWN = '966327fe-555b-493f-a52a-09a60596fa0a'
const AFRICA = '7a66f44a-78b6-436f-b3b7-ac220f536594'
const KENYA = 'location-kenya'

const sa = await c.getDocument(SA)
const ct = await c.getDocument(CAPE_TOWN)
const FORM = sa.contactFormUrl // AfricaContact
const saCode = sa.sections.find((s) => s._type === 'customEmbed').code
const ctCode = ct.sections.find((s) => s._type === 'customEmbed').code
const embedBase = sa.sections.find((s) => s._type === 'customEmbed')
const logos = sa.sections.find((s) => s._type === 'logoCarousel')

let n = 0
const key = () => `ke${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

// Photos
const uploaded = {}
for (const f of fs.readdirSync(IMG_DIR).filter((f) => f.endsWith('.webp'))) {
  const a = await c.assets.upload('image', fs.createReadStream(path.join(IMG_DIR, f)), { filename: f })
  uploaded[f.replace('.webp', '')] = a
}
const ref = (name) => ({ _type: 'image', asset: { _type: 'reference', _ref: uploaded[name]._id } })
const url = (name) => uploaded[name].url
const dims = (name) => uploaded[name].metadata?.dimensions || { width: 1200, height: 675 }
const MALL = 'the-mall-westlands-nairobi'
const DAYSTAR = 'daystar-university-nairobi'
const NAKURU = 'nakuru-gantry-screen-kenyatta-avenue'
const MSA_STREET = 'mombasa-street-traffic'
const MSA_WATER = 'mombasa-waterfront'

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

// ---------- Kenya (country) ----------
const kenya = {
  _id: `drafts.${KENYA}`,
  _type: 'location',
  country: 'Kenya',
  slug: { _type: 'slug', current: 'kenya' },
  city: 'Nairobi',
  heroTitle: 'Outdoor Advertising in Kenya',
  heroImage: ref(MALL),
  ctaButtonText: 'Get a Kenya Media Plan',
  showAllLocationsButton: true,
  description: "East Africa's commercial gateway. Billboards and DOOH across Nairobi, Mombasa, Kisumu and Nakuru.",
  fullDescription: "Kenya is the gateway and commercial powerhouse of East Africa. Home to over 58 million people, with rapid urbanization driving high-density growth in major commercial hubs, Kenya offers an exceptionally dynamic out-of-home (OOH) landscape.\n\nFrom Nairobi's heavily trafficked transit corridors and financial districts to Mombasa's coastal trade routes and Kisumu's regional hub, billboards put your brand directly in front of high-value consumers, business executives, and daily commuters. As East Africa's central economic engine, Kenya serves as the ultimate strategic launchpad for regional campaign activations.",
  stats: [['Population', '58.9M+'], ['Screens', '950+'], ['Impressions', '143M+']].map(([label, value]) => ({ _key: key(), label, value })),
  citiesHeading: 'Explore by Major Metropolitan Areas',
  citiesSubheading: "OOH advertising opportunities in Kenya's key cities",
  contactFormUrl: FORM,
  isActive: true,
  sectionsPosition: 'before-faqs',
  hideDefaultHero: false,
  sections: [
    {
      ...embedBase, _key: key(),
      code: [
        mediaSection('ke', 'Kenya', 'OOH Media Formats in Kenya', [
          ['digital', 'Digital billboards', 'Large-format high-definition LED displays along top-density expressways and central business districts. Creative can be scheduled, updated or contextually triggered in minutes.'],
          ['road', 'Roadside and highway', "High-visibility static and digital sites along Kenya's busiest corridors, including the Nairobi Expressway, Mombasa Road, Thika Superhighway, Waiyaki Way and the Kisumu–Mombasa logistics arteries."],
          ['mall', 'Mall networks', 'Screens and static displays inside premium Nairobi shopping destinations such as Two Rivers, Westgate, Sarit Centre, Garden City and Village Market, close to the point of purchase.'],
          ['transit', 'Transit and matatu networks', 'Matatu wraps, inner-city bus fleets, in-bus digital screens and inter-county buses reaching millions of daily urban commuters.'],
          ['airport', 'Airport', 'High-impact inventory at Jomo Kenyatta International Airport (JKIA), reaching business travellers and inbound visitors.'],
        ]),
        textImageSection('ke', 'billboard', 'Kenya', 'Billboard Advertising in Kenya', [
          'Billboards command the largest share of Kenyan out-of-home advertising budgets, driven by daily mobility patterns across major urban centres. Commutes in cities like Nairobi are long, traffic along major arteries is dense, and public transit moves millions along consistent daily routes. Audiences spend significant time outside the home on fixed, predictable paths.',
          'The landscape has evolved quickly. Static formats historically dominated media plans, but leading Kenyan media owners are expanding digital networks fast, and campaigns have shifted from rigid long-term bookings to agile, data-backed buys. Advertisers can now run <strong>programmatic DOOH</strong>, target specific audiences, read mobility data and move budget between Nairobi, Mombasa, Kisumu and Nakuru mid-campaign.',
          "Moving Walls brings Kenya's leading outdoor media owners and agencies onto one platform, so brands can plan, book, activate and measure all of it in one place.",
        ], 'Launch Your Kenya Campaign', DAYSTAR, 'Digital billboard in Nairobi, Kenya'),
        proseSection('ke', 'Kenya', 'DOOH Market Landscape', [
          "Kenya's primary urban hubs, Nairobi, Mombasa, Kisumu and Nakuru, offer ideal conditions for high-impact OOH advertising thanks to heavy vehicle flow, dense foot traffic and strategic transit arteries. Corridors like the Nairobi Expressway, Mombasa Road, Thika Superhighway, Waiyaki Way and Mombasa's Nyali Bridge connect large daily audiences of commuters, executives and shoppers.",
          "Supported by modern road infrastructure and regional highway upgrades, these locations let media planners position digital screens and large-format billboards along high-volume routes. With data-driven platforms like Moving Walls, advertisers can analyse vehicle and pedestrian movement, compare site performance, optimise digital inventory and engage audiences across East Africa's most vibrant commercial ecosystem.",
        ]),
      ].join('\n\n'),
    },
    {
      _key: key(), _type: 'featureGrid', backgroundColor: 'white', columns: 3,
      heading: 'Top OOH Advertising Screens in Kenya',
      features: [
        ['The Mall, Westlands – Nairobi', stat('148,586', '7,696,880'), MALL],
        ['Daystar University – Nairobi', stat('105,584', '3,798,142'), DAYSTAR],
        ['Gantry Screen – Nakuru', stat('98,692', '2,223,525'), NAKURU],
      ].map(([title, description, img]) => ({ _key: key(), title, description, icon: ref(img) })),
    },
    {
      _key: key(), _type: 'successStories', backgroundColor: 'gray', sectionHeading: 'See the Proof', cardStyle: 'image',
      stories: ['4WosXPXvlMgq3tPqrVefOz', 'b8dac2d9-0255-41aa-a446-213764c22fa8', '4WosXPXvlMgq3tPqrVeesT'].map((id) => ({ _key: key(), _type: 'successStoryItem', contentType: 'caseStudy', caseStudyRef: { _type: 'reference', _ref: id } })),
    },
    { ...logos, _key: key() },
    banner("Reach Kenya's Commuters, Shoppers and Decision-Makers", 'Plan, book and measure billboard and DOOH campaigns across Nairobi, Mombasa, Kisumu and Nakuru from one platform, with site-by-site reporting you can share with your team.', 'Talk to Our Kenya Team'),
  ],
  faqs: faq([
    ['How much does billboard advertising in Kenya cost?', 'It depends on the city, the site, the format and how long the campaign runs. A digital screen on a busy Nairobi corridor is priced differently from a mall screen or a regional gantry. Share your audience, budget and dates and we will come back with a plan and rates that fit.'],
    ['Which Kenyan cities can I advertise in with Moving Walls?', 'Nairobi, Mombasa, Kisumu and Nakuru. Our Kenya network covers 950+ screens and delivers 143M+ impressions, so you can run one city or all four in the same plan.'],
    ['Can I buy outdoor advertising in Kenya programmatically?', 'Yes. Digital screens across Kenya can be bought programmatically, so you can target by time, location and audience, and shift budget mid-flight. Static sites can be added to the same plan through direct booking.'],
    ['What OOH formats are available in Kenya?', 'Digital billboards, roadside and highway sites, mall networks, matatu and transit media, and airport inventory at JKIA. We help you pick the mix that fits your audience and objective.'],
    ['How do I measure an OOH campaign in Kenya?', 'You get reach and impressions reported by site, so you can see which locations delivered. For deeper questions such as brand lift or awareness, MW Science can run research alongside the campaign.'],
    ['Can I run Kenya alongside other African markets?', 'Yes. Kenya can sit in the same plan as South Africa, Morocco and other African markets, with one workflow and consistent reporting across countries.'],
  ]),
  seo: seo('Billboard & DOOH Advertising in Kenya | Moving Walls', 'Plan billboard and DOOH campaigns across Nairobi, Mombasa, Kisumu and Nakuru. 950+ screens and 143M+ impressions, bought and measured on one platform.', MALL),
}

// ---------- Cities ----------
const city = (o) => ({
  _id: `drafts.city-kenya-${o.slug}`,
  _type: 'locationCity',
  // weak until Kenya is published (Studio does the same for drafts); made strong on publish
  country: { _type: 'reference', _ref: KENYA, _weak: true, _strengthenOnPublish: { type: 'location' } },
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
  ...(o.sites ? {
    billboardsHeading: o.sitesHeading,
    billboardsDailyReachLabel: 'Daily Reach',
    billboardsMonthlyImpressionsLabel: 'Impressions',
    highVisibilityBillboards: o.sites.map(([name, location, reach, impressions, img]) => ({ _key: key(), name, location, reach, impressions, image: ref(img) })),
  } : {}),
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

const nairobi = city({
  p: 'nb', slug: 'nairobi', name: 'Nairobi', order: 1,
  h1: 'Outdoor Advertising in Nairobi', hero: MALL, button: 'Explore Nairobi DOOH',
  intro: "Nairobi is the economic powerhouse of Kenya and the premier out-of-home market in East Africa. More than 5 million people live across the Nairobi Metropolitan Area, making it one of the most vibrant and fastest-growing urban centres on the continent.\n\nFrom high-traffic corridors like the Nairobi Expressway and Thika Superhighway to the busy commercial districts of Westlands and the CBD, billboard advertising in Nairobi puts your brand in front of millions of commuters, corporate leaders and tech-savvy consumers every day, where they live, work and travel.",
  card: "Expressway, Westlands and the CBD. Reach East Africa's biggest commuter and shopper audience.",
  sitesHeading: 'High Visibility Billboards in Nairobi',
  sites: [['The Mall – Westlands', 'Westlands, Nairobi', '148,586', '7,696,880', MALL], ['Daystar University', 'Nairobi', '105,584', '3,798,142', DAYSTAR]],
  formatsHeading: 'OOH Media Formats in Nairobi',
  formats: [
    ['transit', 'Transit Advertising', "Commuter-heavy displays across Nairobi's public transport network and major interchanges, including matatu wraps, inner-city bus networks, the Nairobi Central SGR Station in Syokimau, and busy terminals at Machakos Bus Station, Kencom and Railways roundabout."],
    ['digital', 'Digital Billboards', "High-impact LED screens and large-format digital gantries along Nairobi's prime commercial and commuter arteries, including the Nairobi Expressway, Waiyaki Way in Westlands, Uhuru Highway, Ngong Road, and key junctions around Upper Hill and the CBD."],
    ['mall', 'Mall Media', "Indoor digital displays, lightbox networks and entrance placements inside Nairobi's top retail destinations, including Two Rivers Mall, Westgate, Sarit Centre, Garden City Mall, The Hub Karen and Village Market."],
    ['road', 'Highways', 'Static, digital and gantry billboards along major arterial and inter-county corridors such as the Thika Superhighway, Mombasa Road, the Southern and Northern Bypasses and Waiyaki Way.'],
    ['airport', 'Airport', 'Inventory at Jomo Kenyatta International Airport (JKIA), reaching business travellers and visitors arriving in the capital.'],
  ],
  marketHeading: 'DOOH Market Landscape',
  market: [
    "Nairobi is East Africa's commercial engine, financial hub and tech capital, the \"Silicon Savannah\". A large and growing population, expanding commercial zones and an energetic city centre combine high-volume traffic corridors with affluent business and lifestyle districts.",
    "The market mixes high-impact static placements with programmatic digital screens across premier retail destinations and arterial expressways. With Moving Walls, advertisers, agencies and media owners can use movement data to reach professionals, daily commuters and active consumers across the metropolitan area.",
  ],
  marketCta: 'Request Nairobi Options', marketImg: DAYSTAR, marketAlt: 'Digital billboard in Nairobi',
  progHeading: 'Programmatic Advertising in Nairobi',
  prog: ["Nairobi is leading the shift to data-driven, programmatic DOOH in East Africa. The capital offers a connected network of digital screens across major expressways, financial districts and lifestyle hubs.", "Through Moving Walls, brands and agencies can run automated, real-time campaigns that respond to audience movement, context and traffic patterns, then optimise as results come in. For marketers who want precision and flexibility in Kenya's largest market, programmatic is the way to buy."],
  progCta: 'Plan Your Nairobi Campaign', progImg: MALL, progAlt: 'LED screen at The Mall, Westlands, Nairobi',
  banner: ['Ready to Advertise in Nairobi?', "From Westlands to the Expressway, we'll help you choose the screens that match your audience and budget, then show you what they delivered.", 'Talk to Our Media Planners'],
  faqs: [
    ['Where should I advertise in Nairobi to reach affluent shoppers?', "Westlands is a strong starting point. The Mall in Westlands reaches 148,586 people a day, and mall media at Two Rivers, Westgate, Sarit Centre, Garden City and Village Market puts your brand close to the point of purchase."],
    ['How can I reach students and young audiences in Nairobi?', 'The screen at Daystar University reaches 105,584 people a day, giving brands steady exposure to students, staff and the surrounding community.'],
    ["What's the best way to reach Nairobi's daily commuters?", 'Combine digital billboards on the Expressway, Thika Superhighway and Waiyaki Way with transit media such as matatu wraps and screens at busy terminals like Kencom, Railways and Machakos Bus Station.'],
    ['Can I advertise at JKIA?', 'Yes. Airport inventory at Jomo Kenyatta International Airport reaches business travellers and visitors, and can run in the same plan as your city sites.'],
    ['Is programmatic DOOH available in Nairobi?', 'Yes. Digital screens in Nairobi can be bought programmatically, so you can target by time and location, adjust mid-campaign and see delivery reported by site.'],
  ],
  seo: ['Billboard Advertising in Nairobi | DOOH & Mall Screens', "Reach Nairobi's commuters and shoppers on the Expressway, in Westlands and in top malls. Plan, buy and measure programmatic DOOH with Moving Walls."],
})

const mombasa = city({
  p: 'ms', slug: 'mombasa', name: 'Mombasa', order: 2,
  h1: 'Outdoor Advertising in Mombasa', hero: MSA_STREET, button: 'Explore Mombasa DOOH',
  intro: "Mombasa is the economic powerhouse of the Kenyan coast and the largest out-of-home market on East Africa's coastal corridor. More than 1.3 million people live here, making it one of the continent's most vibrant urban and port centres.\n\nFrom the busy bridges linking Mombasa Island to the mainland to its commercial hubs, billboard advertising in Mombasa puts your brand in front of commuters, freight operators and tourists every day, where they live, work and travel.",
  card: "Kenya's coastal hub. Reach commuters, port traffic and visitors across the island and North Coast.",
  formatsHeading: 'DOOH Media Formats in Mombasa',
  formats: [
    ['digital', 'Digital Billboards', "High-impact LED screens and large-format digital gantries along Mombasa's prime commercial and commuter arteries, including Digo Road, Nkrumah Road, the Nyali Bridge approaches and major junctions on the Mombasa–Malindi Highway."],
    ['mall', 'Mall Media', "Indoor digital displays, lightbox networks and entrance placements inside Mombasa's top retail destinations, including City Mall Nyali, Nyali Centre and major complexes across the island and the North Coast."],
    ['road', 'Highways', 'Static, digital and gantry billboards along major corridors such as the Mombasa–Nairobi Highway, the Dongo Kundu Bypass and the Nyali–Bamburi coastal strip, capturing heavy vehicle, freight and commuter traffic.'],
  ],
  marketHeading: 'Out-of-Home Market Landscape',
  market: [
    "Mombasa is East Africa's maritime gateway and Kenya's tourism capital. A large permanent population, expanding commercial zones and an energetic coastal economy combine busy traffic corridors with affluent residential and resort districts.",
    'The market mixes high-impact static placements with programmatic digital screens across premier retail destinations and arterial roads. With Moving Walls, brands can use movement data to reach professionals, daily commuters and visitors in high-dwell-time environments across the coastal hub.',
  ],
  marketCta: 'Request Mombasa Options', marketImg: MSA_WATER, marketAlt: 'Mombasa waterfront, Kenya',
  progHeading: 'Programmatic Advertising in Mombasa',
  prog: ["Mombasa is a growing market for data-driven, programmatic DOOH in Kenya, with connected digital screens across major roads, port transport corridors and lifestyle destinations.", "Through Moving Walls, brands and agencies can run automated, real-time campaigns that respond to audience movement, context and traffic patterns, and scale their impact across Kenya's coast."],
  progCta: 'Plan Your Mombasa Campaign', progImg: MSA_STREET, progAlt: 'Street traffic in Mombasa, Kenya',
  banner: ["Put Your Brand on Kenya's Coast", 'Reach commuters crossing Nyali Bridge, shoppers on the North Coast and visitors arriving for the season, in one plan you can measure.', 'Get a Mombasa Media Plan'],
  faqs: [
    ["Where can I reach Mombasa's daily commuters?", 'Digital billboards on Digo Road, Nkrumah Road and the Nyali Bridge approaches sit on the routes people take between the island and the mainland every day.'],
    ['Can I target tourists and visitors in Mombasa?', 'Yes. Sites along the Nyali–Bamburi coastal strip and mall media at City Mall Nyali and Nyali Centre reach holidaymakers and higher-income residents on the North Coast.'],
    ['Are there billboards on the Mombasa–Nairobi Highway?', 'Yes. Static, digital and gantry sites on the Mombasa–Nairobi Highway and the Dongo Kundu Bypass reach freight, logistics and long-distance traffic heading inland.'],
    ['Is programmatic DOOH available in Mombasa?', 'Yes. Digital screens in Mombasa can be bought programmatically, so you can target by time and location and adjust the campaign while it runs.'],
    ['Can I run Mombasa and Nairobi in the same campaign?', "Yes. One plan on the Moving Walls platform can cover Mombasa, Nairobi and Kenya's regional cities, with reporting by site."],
  ],
  seo: ['Billboard Advertising in Mombasa | Outdoor & DOOH', "Advertise across Mombasa's bridges, highways and North Coast malls. Plan and measure programmatic DOOH on Kenya's coast with Moving Walls."],
})

const kisumuNakuru = city({
  p: 'kn', slug: 'kisumu-nakuru', name: 'Kisumu & Nakuru', order: 3,
  h1: 'Outdoor Advertising in Kisumu & Nakuru', hero: NAKURU, button: 'Explore Kisumu & Nakuru DOOH',
  intro: "Kisumu and Nakuru are the economic cornerstones of Western Kenya and the Rift Valley, and vital out-of-home markets on the country's interior corridor. Over 3.5 million people live across these two fast-growing urban hubs and their surrounding agricultural and commercial zones.\n\nFrom Kisumu's lakeside trade routes and Oginga Odinga Street to Nakuru's busy CBD and the Northern Corridor, billboard advertising in Kisumu and Nakuru puts your brand in front of shoppers, regional traders and long-distance commuters every day, giving you high impact outside the capital.",
  card: 'Western Kenya and the Rift Valley. Reach regional shoppers, traders and Northern Corridor traffic.',
  sitesHeading: 'High Visibility Billboard in Nakuru',
  sites: [['Nakuru Gantry Screen', 'Kenyatta Avenue, Nakuru', '98,692', '2,223,525', NAKURU]],
  formatsHeading: 'OOH Media Formats in Kisumu & Nakuru',
  formats: [
    ['transit', 'Transit Advertising', "Commuter-heavy displays across Kisumu's and Nakuru's public transport networks, including matatu wraps and tuk-tuks on busy urban routes, the Kisumu Bus Terminus, Nakuru's main stages and key interchanges connecting neighbouring counties."],
    ['digital', 'Digital Billboards', "High-impact LED screens along prime commercial and commuter arteries, including Kisumu's Oginga Odinga Street and the Ahero junction approaches, and Nakuru's Kenyatta Avenue and major roundabouts on the Nairobi–Nakuru highway."],
    ['road', 'Highways', 'Static, digital and gantry billboards along major inter-county corridors such as the Nairobi–Nakuru–Eldoret Highway and the Kisumu–Kakamega and Kisumu–Busia roads, capturing transit traffic, freight and regional commuters.'],
  ],
  marketHeading: 'DOOH Market Landscape',
  market: [
    "Kisumu and Nakuru are the primary commercial, administrative and logistics nodes of Western Kenya and the Rift Valley. Rising urban populations, new commercial developments and their position on major transit highways combine high-volume traffic corridors with busy retail centres.",
    'The market mixes high-impact static displays with a growing number of programmatic digital screens across key commercial streets and transport hubs. With Moving Walls, brands can use movement insights to reach regional professionals, traders and consumers, and extend their footprint beyond the capital.',
  ],
  marketCta: 'Request Regional Options', marketImg: NAKURU, marketAlt: 'Gantry screen on Kenyatta Avenue, Nakuru',
  progHeading: 'Programmatic Advertising in Kisumu and Nakuru',
  prog: ["Kisumu and Nakuru are embracing data-driven, programmatic OOH to modernise regional media buying, connecting digital inventory across key commercial streets, transport hubs and retail destinations.", "Through Moving Walls, marketers can plan, activate and measure campaigns across Western Kenya and the Rift Valley, target audiences dynamically and optimise performance across Kenya's key interior hubs."],
  progCta: 'Plan Your Regional Campaign', progImg: DAYSTAR, progAlt: 'Digital billboard in Kenya',
  banner: ['Grow Beyond Nairobi with Kisumu & Nakuru', 'Add Western Kenya and the Rift Valley to your national plan in one buy, with delivery reported site by site.', 'Talk to Our Kenya Team'],
  faqs: [
    ['Why advertise in Kisumu and Nakuru, not just Nairobi?', "Over 3.5 million people live across these two hubs and their surrounding areas, and many national brands are under-represented there. Adding them reaches growing regional markets that a Nairobi-only plan misses."],
    ['What is the Nakuru gantry screen?', 'A digital gantry on Kenyatta Avenue in central Nakuru that reaches 98,692 people a day, with traffic heading through the CBD and onto the Northern Corridor.'],
    ['Where can I advertise in Kisumu?', "Digital billboards on Oginga Odinga Street and the Ahero junction approaches, transit media around the Kisumu Bus Terminus and matatu routes, and highway sites on the Kisumu–Kakamega and Kisumu–Busia roads."],
    ['Can I reach long-distance and freight traffic?', 'Yes. Highway billboards on the Nairobi–Nakuru–Eldoret Highway sit on the Northern Corridor, one of the busiest freight and passenger routes in East Africa.'],
    ['Can I add Kisumu and Nakuru to a Nairobi campaign?', 'Yes. One plan on the Moving Walls platform can cover Nairobi, Mombasa, Kisumu and Nakuru, with digital screens bought programmatically and reporting by site.'],
  ],
  seo: ['Billboard Advertising in Kisumu & Nakuru | DOOH Kenya', 'Reach Western Kenya and the Rift Valley with billboards and DOOH in Kisumu and Nakuru, including the Nakuru gantry screen. Plan and measure with Moving Walls.'],
})

for (const d of [kenya, nairobi, mombasa, kisumuNakuru]) {
  const pub = d._id.replace('drafts.', '')
  if (await c.fetch('count(*[slug.current==$s && _type==$t && !(_id in [$id, $d])])', { s: d.slug.current, t: d._type, id: pub, d: d._id })) throw new Error('Slug in use: ' + d.slug.current)
}
const tx = c.transaction()
for (const d of [kenya, nairobi, mombasa, kisumuNakuru]) tx.createOrReplace(d)

// Africa page: link "Billboards in Kenya" the same way South Africa / Morocco are linked (draft)
const africa = (await c.getDocument('drafts.' + AFRICA)) || (await c.getDocument(AFRICA))
const hubs = africa.sections.find((s) => s._type === 'customEmbed' && s.code.includes('Billboards in Kenya'))
const linked = hubs.code.replace('<h3 class="market-name">Billboards in Kenya</h3>', '<h3 class="market-name"><a class="market-name-link" href="https://www.movingwalls.com/locations/kenya">Billboards in Kenya</a></h3>')
if (linked === hubs.code && !hubs.code.includes('/locations/kenya')) throw new Error('Kenya heading not found on Africa page')
const { _rev, _updatedAt, _createdAt, ...africaRest } = africa
tx.createOrReplace({ ...africaRest, _id: 'drafts.' + AFRICA, sections: africa.sections.map((s) => (s._key === hubs._key ? { ...s, code: linked } : s)) })
await tx.commit()
console.log('Drafts created: Kenya + Nairobi, Mombasa, Kisumu & Nakuru; Africa page draft links Kenya')
