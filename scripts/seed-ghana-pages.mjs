// Creates DRAFT Ghana pages from the "Landing Page - Ghana" and "Landing Page - Greater Accra" Google Docs (17 Nov 2026):
//   /locations/ghana (country, South Africa / Nigeria layout) and /locations/ghana/accra (Greater Accra city page).
//   Also drafts the Africa page with "Billboards in Ghana" linked.
// Same building blocks as seed-nigeria-pages.mjs. FAQs, closing banners, SEO and card blurbs were written for
// these pages (the docs did not include them). Photos are the three doc site photos (airport date stamp cropped).
// Usage: node scripts/seed-ghana-pages.mjs <folder with the prepared .webp photos>
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const IMG_DIR = process.argv[2]
if (!IMG_DIR) { console.error('Pass the photo folder'); process.exit(1) }
const SA = 'b4dc7c56-1d98-435b-b721-bb64196ca058'
const AFRICA = '7a66f44a-78b6-436f-b3b7-ac220f536594'
const GHANA = 'location-ghana'

const sa = await c.getDocument(SA)
const FORM = sa.contactFormUrl // AfricaContact
const saCode = sa.sections.find((s) => s._type === 'customEmbed').code
const embedBase = sa.sections.find((s) => s._type === 'customEmbed')
const logos = sa.sections.find((s) => s._type === 'logoCarousel')

let n = 0
const key = () => `gh${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

// Photos
const uploaded = {}
for (const f of fs.readdirSync(IMG_DIR).filter((f) => f.endsWith('.webp'))) {
  const a = await c.assets.upload('image', fs.createReadStream(path.join(IMG_DIR, f)), { filename: f })
  uploaded[f.replace('.webp', '')] = a
}
const ref = (name) => ({ _type: 'image', asset: { _type: 'reference', _ref: uploaded[name]._id } })
const url = (name) => uploaded[name].url
const dims = (name) => uploaded[name].metadata?.dimensions || { width: 1200, height: 675 }

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

const THEATRE = 'national-theatre-accra'
const AIRPORT = 'kotoka-airport-baggage-claim-accra'
const OXFORD = 'oxford-street-osu-accra'

// ---------- Ghana (country) ----------
const ghana = {
  _id: `drafts.${GHANA}`,
  _type: 'location',
  country: 'Ghana',
  slug: { _type: 'slug', current: 'ghana' },
  city: 'Accra',
  heroTitle: 'Outdoor Advertising in Ghana',
  heroImage: ref(THEATRE),
  ctaButtonText: 'Launch Your Campaign',
  showAllLocationsButton: true,
  description: "One of West Africa's most dynamic OOH markets. Billboards and DOOH across Greater Accra.",
  fullDescription: "Ghana is one of West Africa's most dynamic out-of-home markets. More than 33 million people live here, with nearly 60% of the population concentrated in vibrant urban centres. Key commercial hubs like Accra and Kumasi drive massive daily commuter traffic.\n\nFrom the bustling financial district of Airport City to high-traffic highway interchanges like Tetteh Quarshie, strategic billboards put your brand directly in front of consumers where they live, work and travel. And as a major economic gateway to West Africa, Ghana serves as an ideal base for campaigns looking to expand further across the region.",
  stats: [['Population', '33M'], ['Impressions', '12.8M']].map(([label, value]) => ({ _key: key(), label, value })),
  citiesHeading: 'Explore by Major Metropolitan Areas',
  citiesSubheading: "OOH advertising opportunities in Ghana's key cities",
  contactFormUrl: FORM,
  isActive: true,
  sectionsPosition: 'before-faqs',
  hideDefaultHero: false,
  sections: [
    {
      ...embedBase, _key: key(),
      code: [
        mediaSection('gh', 'Ghana', 'OOH Media Types Available in Ghana', [
          ['digital', 'Digital billboards', 'Large-format LED screens along high-density arteries like Airport Bypass, Liberation Road and Ring Road. Creative updates can be deployed rapidly to capture peak urban traffic.'],
          ['road', 'Roadside and highway', 'Static and digital inventory along key transit corridors, including the N1 (George Walker Bush Highway), the N6 (Accra–Kumasi Highway), Spintex Road and major city roundabouts.'],
          ['airport', 'Transit & Airport Advertising', 'Mobile LED rooftop screens and in-car passenger displays across ride-hailing fleets moving through key commercial corridors, paired with high-impact digital networks at Kotoka International Airport (Accra) and Kumasi International Airport. Premium displays targeting business travellers, expats and inbound international tourists.'],
        ]),
        textImageSection('gh', 'billboard', 'Ghana', 'Billboard Advertising in Ghana', [
          "Billboards take up a dominant share of Ghana's out-of-home advertising spend, with roadside inventory accounting for the vast majority of the market. This reflects daily transit habits across major urban centres like Greater Accra and Kumasi. Daily commutes are extended by heavy traffic bottlenecks, vehicle ownership is growing rapidly among the urban middle class, and thousands of public transport options like <em>trotros</em> move millions of commuters along set daily routes. People spend significant time away from home, travelling along highly predictable urban corridors.",
          'What is rapidly shifting is how out-of-home inventory is managed and bought. While traditional static vinyl formats still represent a significant portion of the market, advertising budgets are steadily migrating toward high-impact <strong>Digital Out-of-Home (DOOH)</strong> screens. These screens support real-time campaign updates, programmatic trading, audience targeting and verified proof-of-play. Billboard advertising in Ghana is evolving beyond fixed multi-month bookings into a flighted, data-backed strategy that lets brands adjust campaign weight between Accra and Kumasi in real time.',
          'Moving Walls plans, books, activates and measures all of it in one place.',
        ], 'Launch Your Ghana Campaign', OXFORD, 'Digital billboard on Oxford Street, Osu, Accra'),
        proseSection('gh', 'Ghana', 'DOOH Market Landscape', [
          "Ghana's core commercial hubs, Greater Accra and Kumasi, are prime environments for high-impact out-of-home (OOH) advertising thanks to dense foot traffic, commercial centres and major economic activity. High-density corridors like Accra's financial hub at Airport City, the busy Kwame Nkrumah Interchange and Kumasi's central trading districts connect large daily audiences of commuters, shoppers and business travellers.",
          "Supported by heavy transit networks and primary highways such as the N1 George Walker Bush Highway, the N6 Accra–Kumasi Highway and Liberation Road, these routes let advertisers, media owners and campaign planners position digital displays and static inventory along high-volume travel corridors. With data-driven platforms like Moving Walls, they can evaluate movement patterns, trade programmatic inventory and engage target audiences across Ghana's fastest-growing urban centres.",
        ]),
      ].join('\n\n'),
    },
    {
      _key: key(), _type: 'featureGrid', backgroundColor: 'white', columns: 3,
      heading: 'Out of Home Advertising in Ghana',
      features: [
        ['National Theatre – Accra', stat('447,249', '4,998,662'), THEATRE],
        ['Airport Baggage Claim – Accra', stat('268,958', '2,154,002'), AIRPORT],
        ['Oxford Street – Accra', stat('526,549', '5,663,428'), OXFORD],
      ].map(([title, description, img]) => ({ _key: key(), title, description, icon: ref(img) })),
    },
    {
      _key: key(), _type: 'successStories', backgroundColor: 'gray', sectionHeading: 'See the Proof', cardStyle: 'image',
      stories: ['4WosXPXvlMgq3tPqrVefOz', 'b8dac2d9-0255-41aa-a446-213764c22fa8'].map((id) => ({ _key: key(), _type: 'successStoryItem', contentType: 'caseStudy', caseStudyRef: { _type: 'reference', _ref: id } })),
    },
    { ...logos, _key: key() },
    banner("Reach Ghana's Commuters, Shoppers and Business Travellers", 'Plan, book and measure billboard and DOOH campaigns across Greater Accra from one platform, with site-by-site reporting you can share with your team.', 'Talk to Our Ghana Team'),
  ],
  faqs: faq([
    ['How much does billboard advertising in Ghana cost?', 'It depends on the site, the format and how long the campaign runs. A digital screen on a busy Accra road is priced differently from an airport placement. Share your audience, budget and dates and we will come back with a plan and rates that fit.'],
    ['Where can I advertise in Ghana with Moving Walls?', 'Our Ghana sites are in Greater Accra, including the National Theatre, Oxford Street in Osu and the baggage claim at Kotoka International Airport. Together they deliver around 12.8M impressions. Ask us about other cities such as Kumasi.'],
    ['Can I buy outdoor advertising in Ghana programmatically?', 'Yes. Digital screens in Ghana can be bought programmatically, so you can target by time, location and audience, and shift budget while the campaign runs. Static sites can be added to the same plan through direct booking.'],
    ['What OOH formats are available in Ghana?', 'Digital billboards, roadside and highway sites, ride-hailing and transit screens, and airport media. We help you choose the mix that fits your audience and objective.'],
    ['How do I measure an OOH campaign in Ghana?', 'You get reach and impressions reported by site, so you can see which locations delivered. For deeper questions such as brand lift or awareness, MW Science can run research alongside the campaign.'],
    ['Can I run Ghana alongside other African markets?', 'Yes. Ghana can sit in the same plan as Nigeria, Kenya, South Africa and other African markets, with one workflow and consistent reporting across countries.'],
  ]),
  seo: seo('Billboard & DOOH Advertising in Ghana', 'Plan billboard and DOOH campaigns in Ghana, from Accra’s Airport City to Oxford Street and Kotoka Airport. Book and measure every site on one platform.', THEATRE),
}

// ---------- Greater Accra (city) ----------
const accra = {
  _id: 'drafts.city-ghana-accra',
  _type: 'locationCity',
  // weak until Ghana is published (Studio does the same for drafts); made strong on publish
  country: { _type: 'reference', _ref: GHANA, _weak: true, _strengthenOnPublish: { type: 'location' } },
  city: 'Greater Accra',
  slug: { _type: 'slug', current: 'accra' },
  order: 1,
  isActive: true,
  heroTitle: 'Outdoor Advertising in Greater Accra',
  heroImage: ref(THEATRE),
  fullDescription: "Greater Accra is the economic and political epicentre of Ghana and its largest out-of-home market. Home to over 5.4 million people, it is the most densely populated region in the country.\n\nFrom high-traffic highway interchanges like Tetteh Quarshie to bustling commercial districts like Airport City and Osu, billboard advertising in Greater Accra puts your brand in front of hundreds of thousands of active commuters every day. For brands seeking high visibility, outdoor advertising in Greater Accra offers direct access to key consumer segments where they live, work and travel. Modern campaign planning connects outdoor advertising companies and agencies in Greater Accra to help you scale campaigns seamlessly across the metropolitan area.",
  description: "Ghana's largest OOH market. Reach Accra's commuters, shoppers and air travellers.",
  ctaButtonText: 'Explore Accra DOOH',
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  billboardsHeading: 'High Visibility Billboards in Greater Accra',
  billboardsDailyReachLabel: 'Daily Reach',
  billboardsMonthlyImpressionsLabel: 'Impressions',
  highVisibilityBillboards: [
    ['National Theatre', 'National Theatre, Accra', '447,249', '4,998,662', THEATRE],
    ['Airport Baggage Claim', 'Kotoka International Airport, Accra', '268,958', '2,154,002', AIRPORT],
    ['Oxford Street', 'Oxford Street, Osu', '526,549', '5,663,428', OXFORD],
  ].map(([name, location, reach, impressions, img]) => ({ _key: key(), name, location, reach, impressions, image: ref(img) })),
  sectionsPosition: 'before-faqs',
  sections: [
    {
      ...embedBase, _key: key(),
      code: [
        mediaSection('ac', 'Greater Accra', 'OOH Media Types Available in Greater Accra', [
          ['airport', 'Transit & Airport Advertising', 'Mobile LED rooftop screens and in-car passenger displays across ride-hailing fleets moving through key commercial corridors, paired with high-impact digital networks at Kotoka International Airport. Premium displays targeting business travellers, expats and inbound international tourists.'],
          ['digital', 'Digital Billboards', "High-impact LED screens and large-format digital displays along Greater Accra's prime commercial and commuter arteries, including the N1 George Walker Bush Highway, Liberation Road towards Kotoka International Airport, the Airport City financial district, Spintex Road, and high-volume intersections such as the Tetteh Quarshie Interchange and Ridge Roundabout."],
          ['road', 'Highways', 'Large static, digital and gantry billboards along major expressways and inter-regional corridors such as the N1 George Walker Bush Highway, the N6 Accra–Kumasi Highway, Spintex Road, the Tema Motorway and the Beach Road corridor, capturing huge daily volumes of vehicle and commuter traffic.'],
        ]),
        textImageSection('ac', 'market', 'Greater Accra', 'DOOH Market Landscape', [
          "Greater Accra is Ghana's economic engine, financial hub and corporate centre, offering a high-density, high-value out-of-home (OOH) advertising landscape. Over 5.4 million residents, fast-expanding commercial zones and an energetic urban core combine high-volume traffic corridors with affluent business and lifestyle districts.",
          'The market mixes high-impact static placements with programmatic digital screens (DOOH) across premier retail destinations, airport hubs and arterial expressways. With Moving Walls, advertisers, agencies and media owners can use real-time movement data to reach high-net-worth professionals, daily commuters and active consumers across the metropolitan area.',
          'For brands looking to run visually striking campaigns in high-impact, high-dwell-time environments, Greater Accra is one of the most vibrant and measurable outdoor advertising markets in West Africa.',
        ], 'Plan Your Accra Campaign', OXFORD, 'Digital billboard on Oxford Street, Osu, Accra'),
      ].join('\n\n'),
    },
    { ...logos, _key: key() },
    banner('Ready to Advertise in Accra?', "From Airport City to Oxford Street, we'll help you choose the screens that match your audience and budget, then show you what they delivered.", 'Talk to Our Media Planners'),
  ],
  faqs: faq([
    ['Where are the highest-reach billboards in Accra?', 'The Oxford Street screen in Osu reaches 526,549 people a day, the National Theatre site reaches 447,249, and the baggage claim screen at Kotoka International Airport reaches 268,958.'],
    ['Can I advertise at Kotoka International Airport?', 'Yes. The baggage claim screen at Kotoka reaches arriving business travellers, expats and tourists, and can run alongside roadside screens in the city in one plan.'],
    ["How can I reach Accra's daily commuters?", 'Combine digital billboards on Liberation Road, Spintex Road and the N1 George Walker Bush Highway with sites at busy intersections such as Tetteh Quarshie and Ridge Roundabout, plus ride-hailing screens on the main commercial corridors.'],
    ['Is programmatic DOOH available in Accra?', 'Yes. Digital screens in Accra can be bought programmatically, so you can target by time and location, adjust mid-campaign and see delivery reported by site.'],
    ['Can I run Accra with other African markets?', 'Yes. One plan on the Moving Walls platform can cover Accra alongside Nigeria, Kenya, South Africa and other African markets, with consistent reporting.'],
  ]),
  seo: seo('Billboard Advertising in Accra | DOOH & Digital Screens', 'Reach Accra commuters and travellers on Oxford Street, at the National Theatre and Kotoka Airport with DOOH and billboards. Plan and measure with Moving Walls.', THEATRE),
}

for (const d of [ghana, accra]) {
  const pub = d._id.replace('drafts.', '')
  if (await c.fetch('count(*[slug.current==$s && _type==$t && !(_id in [$id, $d])])', { s: d.slug.current, t: d._type, id: pub, d: d._id })) throw new Error('Slug in use: ' + d.slug.current)
}
const tx = c.transaction()
for (const d of [ghana, accra]) tx.createOrReplace(d)

// Africa page: link "Billboards in Ghana" the same way Kenya / Nigeria are linked (draft)
const africa = (await c.getDocument('drafts.' + AFRICA)) || (await c.getDocument(AFRICA))
const hubs = africa.sections.find((s) => s._type === 'customEmbed' && s.code.includes('Billboards in Ghana'))
const linked = hubs.code.replace('<h3 class="market-name">Billboards in Ghana</h3>', '<h3 class="market-name"><a class="market-name-link" href="https://www.movingwalls.com/locations/ghana">Billboards in Ghana</a></h3>')
if (linked === hubs.code && !hubs.code.includes('/locations/ghana')) throw new Error('Ghana heading not found on Africa page')
const { _rev, _updatedAt, _createdAt, ...africaRest } = africa
tx.createOrReplace({ ...africaRest, _id: 'drafts.' + AFRICA, sections: africa.sections.map((s) => (s._key === hubs._key ? { ...s, code: linked } : s)) })
await tx.commit()
console.log('Drafts created: Ghana + Greater Accra; Africa page draft links Ghana')
