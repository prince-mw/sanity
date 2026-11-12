// Creates DRAFTS (10 Nov 2026) from the "Europe Deals Reengagement" Google Doc's Milan and Rome tabs:
//  - Milan and Rome city pages under Italy (/locations/italy/milan|rome), same look as the Italy page
//    (builder copied from scripts/seed-glasgow-bristol-italy.mjs; the docs have no "match" section or step lists),
//    Europe contact form as on the Italy page.
//  - Italy page: the Milan and Rome cards in "Explore Major Italian DOOH Markets" link to the new pages, and the
//    automatic city grid is hidden (Dg: no separate section on the Italy page).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const MANCHESTER = 'd2c80f2d-bffd-40fe-af15-04c9bd65dff1'
const UK = 'f7e96d31-ae08-427a-bd87-20d591cb5ac0'
const PLACEHOLDER = 'image-29b62a2ecb4787d3bee0ba9291a97227a876c861-1600x900-png'
const k = () => Math.random().toString(36).slice(2, 14)

const ICON = {
  pin: '<path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  nodes: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><line x1="8" y1="7.5" x2="10.5" y2="16"/><line x1="16" y1="7.5" x2="13.5" y2="16"/><line x1="8.5" y1="6" x2="15.5" y2="6"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  bars: '<line x1="4" y1="20" x2="4" y2="13"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="20" y1="20" x2="20" y2="15"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  check: '<circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9.5"/>',
  search: '<circle cx="10" cy="10" r="6"/><line x1="21" y1="21" x2="15" y2="15"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3.3" y1="12" x2="20.7" y2="12"/>',
  city: '<rect x="3" y="10" width="5" height="11"/><rect x="10" y="6" width="5" height="15"/><rect x="17" y="13" width="4" height="8"/><line x1="2" y1="21" x2="22" y2="21"/>',
  bag: '<path d="M6 8V6a6 6 0 0 1 12 0v2"/><rect x="3" y="8" width="18" height="13" rx="2"/><line x1="3" y1="13" x2="21" y2="13"/>',
  plane: '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
  train: '<rect x="5" y="4" width="14" height="13" rx="3"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="9" cy="14.5" r="1.2"/><circle cx="15" cy="14.5" r="1.2"/><path d="M8 20l-2 2"/><path d="M16 20l2 2"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  star: '<polygon points="12 2 15 9 22 9.5 16.5 14 18 21 12 17 6 21 7.5 14 2 9.5 9 9"/>',
  mountain: '<path d="M3 20 10 8l4 6 2-3 5 9z"/>',
  wave: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 3v5"/>',
  road: '<path d="M8 3 4 21"/><path d="M16 3l4 18"/><line x1="12" y1="5" x2="12" y2="8"/><line x1="12" y1="11" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="20"/>',
}
const svg = (name, w = 1.7) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${ICON[name]}</svg>`
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'

// Manchester section CSS, keyed by section name (workflow, match, areas, prog, build)
const man = await c.getDocument(MANCHESTER)
const manEmbed = man.sections.find((s) => s._type === 'customEmbed')
const manCode = manEmbed.code
const FORM = man.contactFormUrl
const styleOf = (name, p) => {
  const m = manCode.match(new RegExp(`<section class="mw-mc-${name}">\\s*(<style>[\\s\\S]*?</style>)`))
  if (!m) throw new Error('No Manchester style for ' + name)
  return m[1].replace(/mw-mc-/g, `mw-${p}-`)
}

function build(p, d) {
  const cta = (sec, text) => !text ? '' : `
    <div class="mw-${p}-${sec}__cta">
      <a class="mw-${p}-${sec}__btn" href="${d.form}" target="_blank" rel="noopener" data-modal-open="mw-${p}-${sec}-modal">
        ${text}
        ${ARROW}
      </a>
    </div>

    <!-- Contact popup: Zoho ${d.formLabel} form -->
    <div id="mw-${p}-${sec}-modal" class="mw-${p}-${sec}__modal-overlay" data-modal-root>
      <div class="mw-${p}-${sec}__modal-box" role="dialog" aria-modal="true" aria-label="Contact Moving Walls">
        <button type="button" class="mw-${p}-${sec}__modal-close" aria-label="Close" data-modal-close>&times;</button>
        <iframe id="mw-${p}-${sec}-modal-frame" class="mw-${p}-${sec}__modal-frame" title="Moving Walls ${d.formLabel} Contact Form" loading="lazy"></iframe>
      </div>
    </div>`
  const head = (n, title) => `<!--
  Moving Walls — ${d.name} Location Page
  Section ${n} of 5: "${title}"
-->`
  const steps = (sec, items) => `
    <ol class="mw-${p}-${sec}__steps">${items.map(([icon, h, t], i) => `
      <li class="mw-${p}-${sec}__step">
        <div class="mw-${p}-${sec}__icon-wrap">
          <span class="mw-${p}-${sec}__icon" aria-hidden="true">${svg(icon)}</span>
          <span class="mw-${p}-${sec}__badge">0${i + 1}</span>
        </div>
        <h3>${h}</h3>
        <p>${t}</p>
      </li>`).join('')}
    </ol>`
  const cards = (sec, items) => `
    <div class="mw-${p}-${sec}__grid">${items.map(([icon, h, t]) => `
      <div class="mw-${p}-${sec}__card">
        <span class="mw-${p}-${sec}__icon" aria-hidden="true">${svg(icon)}</span>
        <h3>${h}</h3>
        <p>${t}</p>
      </div>`).join('')}
    </div>`
  const leads = (sec, arr) => arr.map((t) => `<p class="mw-${p}-${sec}__lead">${t}</p>`).join('\n      ')

  return [
    `${head(1, d.connect.title)}
<section class="mw-${p}-workflow">
  ${styleOf('workflow', p)}
  <div class="mw-${p}-workflow__container">
    <div class="mw-${p}-workflow__intro">
      <h2 class="mw-${p}-workflow__title">${d.connect.title}</h2>
      ${leads('workflow', d.connect.leads)}
    </div>${steps('workflow', d.connect.steps)}
${cta('workflow', d.connect.cta)}
  </div>
</section>`,
    `${head(2, d.match.title)}
<section class="mw-${p}-match">
  ${styleOf('match', p).replace('</style>', `  @media (min-width:900px){ .mw-${p}-match__list{ grid-template-columns:1fr 1fr; } }\n  </style>`)}
  <div class="mw-${p}-match__container">
    <div class="mw-${p}-match__inner">
      <h2 class="mw-${p}-match__title">${d.match.title}</h2>
      <p class="mw-${p}-match__lead">${d.match.lead}</p>
      <ul class="mw-${p}-match__list">${d.match.items.map(([h, t]) => `
        <li>${TICK}<span><strong>${h}</strong>${t}</span></li>`).join('')}
      </ul>
      <p class="mw-${p}-match__lead">${d.match.close}</p>
    </div>
${cta('match', d.match.cta)}
  </div>
</section>`,
    `${head(3, d.areas.title)}
<section class="mw-${p}-areas">
  ${styleOf('areas', p).replace('</style>', `  .mw-${p}-areas__grid{ display:flex; flex-wrap:wrap; justify-content:center; }
    .mw-${p}-areas__grid > .mw-${p}-areas__card{ flex:0 1 calc(25% - 17px); min-width:250px; }
    @media (max-width:600px){ .mw-${p}-areas__grid > .mw-${p}-areas__card{ flex-basis:100%; } }
  </style>`)}
  <div class="mw-${p}-areas__container">
    <div class="mw-${p}-areas__intro">
      <h2 class="mw-${p}-areas__title">${d.areas.title}</h2>
      ${leads('areas', d.areas.leads)}
    </div>${cards('areas', d.areas.cards)}
    ${d.areas.note ? `<div class="mw-${p}-areas__note">
      <p>${d.areas.note}</p>
    </div>` : ''}
${cta('areas', d.areas.cta)}
  </div>
</section>`,
    `${head(4, d.prog.title)}
<section class="mw-${p}-prog">
  ${styleOf('prog', p)}
  <div class="mw-${p}-prog__container">
    <div class="mw-${p}-prog__intro">
      <h2 class="mw-${p}-prog__title">${d.prog.title}</h2>
      ${leads('prog', d.prog.leads)}
    </div>${d.prog.steps ? steps('prog', d.prog.steps) : ''}
${cta('prog', d.prog.cta)}
  </div>
</section>`,
    `${head(5, d.build.title)}
<section class="mw-${p}-build">
  ${styleOf('build', p)}
  <div class="mw-${p}-build__container">
    <div class="mw-${p}-build__intro">
      <h2 class="mw-${p}-build__title">${d.build.title}</h2>
      <p class="mw-${p}-build__lead">${d.build.lead}</p>
    </div>${cards('build', d.build.cards)}
    <div class="mw-${p}-build__note">
      <p>${d.build.note}</p>
    </div>
${cta('build', d.build.cta)}
  </div>
</section>`,
  ].join('\n\n')
}

// ---- Milan and Rome (city pages under Italy) ----
const ITALY_ID = 'location-italy'
const italy = await c.getDocument(ITALY_ID)
const IT_FORM = italy.contactFormUrl // EuropeContact, as on the Italy page
const MWS = '<a href="/mw-science" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Science</a>'
const PLANNER = (t) => `<a href="/mw-planner" style="color:#2F5FE0;font-weight:600;text-decoration:none">${t}</a>`
const src = (text, href) => `<a href="${href}" target="_blank" rel="noopener" style="color:#2F5FE0;font-weight:600;text-decoration:none">${text} ↗</a>`

// The docs have no "match" section and no step lists, so those parts of the shared builder are dropped
const cityCode = (d) => build(d.p, d)
  .replace(new RegExp(`<!--\\s*Moving Walls — ${d.name} Location Page\\s*Section 2 of 5[\\s\\S]*?</section>`), '')
  .replace(new RegExp(`<ol class="mw-${d.p}-workflow__steps">\\s*</ol>`), '')
  .replace(new RegExp(`<ol class="mw-${d.p}-prog__steps">\\s*</ol>`), '')

const MILAN = {
  p: 'ml', slug: 'milan', name: 'Milan', order: 1, form: IT_FORM, formLabel: 'Europe',
  heroTitle: 'DOOH Advertising in Milan for Luxury Shoppers and Design Buyers',
  hero: 'A shopper visiting the boutiques of the Quadrilatero della Moda and a design buyer heading to a showroom in Brera have different reasons to stop. For a fashion launch, give shoppers a reason to visit your boutique, whether it’s a new collection or an in-store event. During Design Week, help buyers find your showroom when it’s open.\n\nTell Moving Walls who you want to reach, where you want them to go and when. We’ll compare available digital outdoor placements along relevant shopping and arrival routes and check which formats and schedules fit your launch.',
  heroCta: 'Request a Milan launch plan',
  card: 'Reach luxury shoppers and design buyers across the Quadrilatero della Moda, Brera, Porta Nuova and Milano Centrale, around launches and Design Week.',
  seo: ['DOOH Advertising in Milan for Fashion & Design Brands', 'Plan DOOH in Milan around fashion launches and Design Week, from the Quadrilatero della Moda and Brera to Milano Centrale, direct or programmatic.'],
  connect: {
    title: 'Brera or the Fairground? Start with the Appointment',
    leads: [
      'Salone del Mobile.Milano reported <strong>more than 302,000 visitors and 2,103 exhibitors in 2025</strong>. Its annual report also found that 53% of the 861 Design Week events it observed were concentrated between Duomo and Brera. For a design brand, that gives the district a specific role. Brief us on your showroom hours and we can compare a local evening placement with a daytime approach to the fair.',
      src('Salone del Mobile.Milano, 2025 annual report', 'https://www.salonemilano.it/en/salone-del-mobile-milano-observatory/salone-del-mobile-milano-milan-design-eco-system-2025-annual-report'),
    ],
    steps: [],
  },
  match: { title: '', lead: '', items: [], close: '' },
  areas: {
    title: 'From Centrale to the Showroom',
    leads: ['Start with the role each area could play in your audience’s journey. Moving Walls can assess relevant opportunities in and around these locations, subject to suitable inventory and partner access.'],
    cards: [
      ['bag', 'Duomo and Central Shopping Areas', 'Consider central Milan for campaigns shaped around shopping, city visits and brand discovery. Assess available placements against the audience, format and brand context required.'],
      ['star', 'Fashion District and Brera', 'Explore location-led planning for fashion, luxury, design and lifestyle campaigns. Select opportunities based on the surrounding context and available audience intelligence.'],
      ['city', 'Porta Nuova and CityLife', 'Consider these areas when planning for business, professional, retail and urban lifestyle audiences. Assess relevant office, shopping and commuter environments within the campaign geography.'],
      ['train', 'Milano Centrale and Transport Connections', 'Plan around rail travel, daily commuting and onward city journeys. Evaluate suitable station, transport and nearby media opportunities through participating partners.'],
      ['plane', 'Exhibition Venues and Airport Journeys', 'Extend planning to exhibition-related travel and journeys through Milan’s airport catchment when business visitors or international travellers are a priority. Airport and venue inventory is confirmed separately for each brief.'],
    ],
    note: '',
    cta: 'Request a Milan launch plan',
  },
  prog: {
    title: 'Choose the Right Way to Activate DOOH in Milan',
    leads: [
      'Moving Walls supports <strong>direct and programmatic DOOH activation</strong> through relevant Italian media owners and technology partners.',
      'Direct activation can support campaigns built around agreed placements and schedules. Programmatic activation can support eligible digital inventory where the required partner connections and buying capabilities are available.',
      'We help define a suitable approach around your objective, budget, dates, creative requirements and available supply. Locations, formats and buying options are confirmed before activation.',
    ],
  },
  build: {
    title: 'Bring Milan Campaign Planning, Activation and Measurement Together',
    lead: 'From the brief to the report, in one connected workflow.',
    cards: [
      ['target', 'Define the Audience and Objective', 'Start with who you want to reach and what the campaign needs to support, from brand awareness to a retail launch or event presence.'],
      ['pin', `Build the Location Plan with ${PLANNER('MW Planner')}`, 'Use available audience and location intelligence to assess areas, media environments and timing against the brief.'],
      ['search', 'Confirm Inventory and Buying Options', 'Work through relevant partners to establish suitable placements, formats, availability, creative specifications and direct or programmatic activation options.'],
      ['bars', 'Monitor Delivery and Review Available Results', 'Bring available delivery, performance and measurement signals into a clearer reporting workflow. Agree on reporting priorities and feasible measurement options during planning.'],
      ['bulb', 'Support Research and Measurement with MW Science', `Use ${MWS} to support intelligence and measurement design where suitable data and research options are available. Specific datasets, studies and outcome measures are confirmed for the campaign.`],
      ['globe', 'Extend Beyond Milan', 'Connect Milan with <a href="/locations/italy/rome" style="color:#2F5FE0;font-weight:600;text-decoration:none">Rome</a>, other Italian cities or wider <a href="/locations/europe" style="color:#2F5FE0;font-weight:600;text-decoration:none">European markets</a> when your campaign requires coordinated planning and reporting.'],
    ],
    note: '',
  },
  banner: ['Where Should Buyers Find Your Collection in Milan?', 'Send your showroom or store address, launch window and budget. We’ll check placements against the dates when your audience can actually visit.', 'Request a Milan launch plan'],
  faqs: [
    ['What should a Milan Design Week advertiser include in the brief?', 'Send the fair stand or showroom address, opening hours, appointment dates and preferred districts. If you also want a fashion retail presence around the Quadrilatero della Moda, include the boutique address so we can price and assess each part of the journey separately.'],
    ['Quanto costa la pubblicità esterna a Milano?', 'Give Moving Walls your preferred areas, campaign dates, budget range and any fixed destinations. We’ll ask the relevant media partners to confirm available formats, booking terms and costs for that brief.'],
    ['What reporting can my agency offer its client?', 'Agree the reporting scope before booking. We can review delivery records supplied by participating partners. Where the data supports it, MW Science can help design a study around a separate question such as brand awareness or visits.'],
  ],
}

const ROME = {
  p: 'rm', slug: 'rome', name: 'Rome', order: 2, form: IT_FORM, formLabel: 'Europe',
  heroTitle: 'Reach Travellers with DOOH Advertising in Rome',
  hero: 'A visitor arriving at Roma Termini may still be choosing how to spend the evening. For a museum with late opening hours, that’s a chance to advertise tonight’s exhibition. For a retailer, the better moment may come the next morning, as visitors leave their hotel to explore the historic centre.\n\nShare your destination, campaign dates and the action you want visitors to take. Moving Walls helps brands and agencies plan digital outdoor campaigns around those journeys and checks which placements are available for the brief.',
  heroCta: 'Request a Rome media plan',
  card: 'Reach visitors and business travellers across Roma Termini, airport transfers, the historic centre, Prati and EUR, timed to their journeys.',
  seo: ['DOOH Advertising in Rome: Reach Travellers & Visitors', 'Plan DOOH in Rome around travellers’ journeys, from Roma Termini and airport transfers to the historic centre, Prati and EUR, direct or programmatic.'],
  connect: {
    title: 'Use Rome’s Overnight Stays to Plan Beyond the Arrival',
    leads: [
      'Italy’s statistics office, Istat, recorded <strong>more than 42.7 million overnight stays in the municipality of Rome in 2024</strong>, equivalent to 9.2% of the national total. For a museum or evening attraction, plan two opportunities. Introduce the experience around an arrival journey, then test a later reminder near the hotel or on the way to the venue. Use opening hours and ticket availability to decide when the message should run.',
      src('Istat, tourism flows by municipality, 2024', 'https://www.istat.it/comunicato-stampa/i-flussi-turistici-anno-2024/'),
    ],
    steps: [],
  },
  match: { title: '', lead: '', items: [], close: '' },
  areas: {
    title: 'Where to Reach Travellers During Their Stay in Rome',
    leads: [],
    cards: [
      ['train', 'Rail Arrivals at Roma Termini and Tiburtina', 'For a ticketed event, use the arrival message to answer two questions a visitor can act on straight away. What’s on today, and where is it? Share the venue address and start time so we can check station and onward-route options with media partners.'],
      ['plane', 'Airport Transfers and Hotel Stays', 'A transfer is a chance to introduce an experience early in the trip. A message near a hotel can serve a different purpose, such as reminding guests about a museum’s evening opening. We check airport, transfer and hotel-area placements separately for your dates.'],
      ['bag', 'Shopping and Cultural Visits in the Historic Centre and Prati', 'For a boutique or gallery, start with the streets visitors could use to reach your door. A shop in Prati might feature its address and Saturday hours. If residents are also part of the brief, we can assess the local shopping catchment separately.'],
      ['city', 'Business Travellers Attending Events in EUR', 'For a conference or exhibition, brief us on the venue, session times and where delegates are likely to stay. That gives us a route and a time window to check for suitable placements.'],
    ],
    note: '',
    cta: 'Request a Rome media plan',
  },
  prog: {
    title: 'Activate Your Rome Campaign with a Buying Approach That Fits',
    leads: [
      'Moving Walls supports <strong>direct and programmatic DOOH activation</strong> in Rome through relevant Italian media owners and technology partners.',
      'Use direct activation where agreed locations, formats and schedules suit the brief. Consider programmatic activation where eligible digital inventory and the necessary integrations are available.',
      'The final approach brings together your campaign dates, budget, creative requirements and available supply. Scheduling and dayparting options depend on the selected inventory and partner setup.',
    ],
  },
  build: {
    title: 'Connect Your Rome Campaign from Brief to Reporting',
    lead: 'From the brief to the report, in one connected workflow.',
    cards: [
      ['target', 'Set the Audience Priorities', 'Identify the travellers most relevant to your offer, such as weekend visitors looking for things to do or delegates attending an event in EUR. Share the destination, visiting hours and languages your creative needs to support.'],
      ['pin', `Assess Locations with ${PLANNER('MW Planner')}`, 'Use available audience and location intelligence to identify areas and travel routes that fit the brief. Account for campaign timing and local context.'],
      ['search', 'Confirm the Media Plan', 'Identify suitable opportunities through participating partners and confirm inventory, formats, dates, creative specifications and activation options.'],
      ['nodes', 'Align Creative with the Journey', 'Give each message a job. An arrival ad might introduce an exhibition. A later ad near the venue might give the entrance address and last admission time. Confirm language versions, formats and scheduling options with the media partner.'],
      ['bars', 'Define Reporting and Measurement', `Agree on available delivery reporting and relevant measurement options before launch. ${MWS} can support research and measurement design, with specific data sources, studies and signals confirmed against the brief.`],
      ['globe', 'Coordinate Across Markets', 'Connect Rome with <a href="/locations/italy/milan" style="color:#2F5FE0;font-weight:600;text-decoration:none">Milan</a>, other Italian markets or a broader <a href="/locations/europe" style="color:#2F5FE0;font-weight:600;text-decoration:none">European campaign</a> when your objective requires consistent planning and campaign oversight.'],
    ],
    note: '',
  },
  banner: ['Where Do You Want Travellers to Go in Rome?', 'Send your venue or store address, opening hours, campaign dates and budget. We’ll check which placements fit the routes visitors are likely to take and confirm availability and reporting before you book.', 'Request a Rome media plan'],
  faqs: [
    ['Would Termini or a neighbourhood placement suit our Rome brief?', 'For a ticketed attraction, look at where visitors might decide to book, such as on arrival at Termini, near their hotel or on the way to the venue. For a local retail offer, start with the store’s catchment and opening hours. Send the destination and dates so we can check which placements are available for your audience.'],
    ['Quanto costa la pubblicità esterna a Roma?', 'Give Moving Walls your preferred areas, campaign dates, budget range and any fixed destinations. We’ll ask the relevant media partners to confirm available formats, booking terms and costs for that brief.'],
    ['What reporting can my agency offer its client?', 'Agree the reporting scope before booking. We can review delivery records supplied by participating partners. Where the data supports it, MW Science can help design a study around a separate question such as brand awareness or visits.'],
  ],
}

// Hero photos Dg supplied 10 Nov 2026 (Desktop "dooh advertising screen <City>.jpg", converted to webp)
const HERO = { milan: 'image-0f9d5a87ec28ab0c2453bd9efedc256b7bb57a2e-960x540-webp', rome: 'image-54ae865c12e237969a035cac310f3ff5b5f8d72a-960x540-webp' }
const heroImg = (d) => ({ _type: 'image', alt: `DOOH advertising screen in ${d.name}`, asset: { _type: 'reference', _ref: HERO[d.slug] } })
const logos = man.sections.find((s) => s._type === 'logoCarousel')
const tx = c.transaction()
for (const d of [MILAN, ROME]) {
  const ID = `city-italy-${d.slug}`
  if (await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$it && !(_id in [$id, "drafts." + $id])])', { s: d.slug, it: ITALY_ID, id: ID })) throw new Error('Already exists: ' + d.slug)
  const code = cityCode(d)
  if (code.includes(`mw-${d.p}-match`)) throw new Error('match section left in ' + d.slug)
  tx.createOrReplace({
    _id: `drafts.${ID}`, _type: 'locationCity', city: d.name, slug: { _type: 'slug', current: d.slug },
    country: { _type: 'reference', _ref: ITALY_ID }, order: d.order, isActive: true,
    heroTitle: d.heroTitle, heroImage: heroImg(d), fullDescription: d.hero, description: d.card,
    ctaButtonText: d.heroCta, showAllLocationsButton: true, contactFormUrl: d.form,
    sectionsPosition: 'before-faqs',
    faqs: d.faqs.map(([question, answer]) => ({ _key: k(), question, answer })),
    sections: [
      { ...manEmbed, _key: k(), code },
      { ...logos, _key: k() },
      { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: d.banner[0], subheading: d.banner[1], ctaText: d.banner[2], ctaLink: d.form },
    ],
    seo: { _type: 'seo', metaTitle: d.seo[0], metaDescription: d.seo[1], enableKeywords: false, noIndex: false, ogImage: heroImg(d) },
  })
}

// Italy page: link the Milan and Rome cards in "Explore Major Italian DOOH Markets" (no separate city grid)
const LINK_CSS = `<style>
  .custom-embed .mw-citylink-title{ color:inherit !important; text-decoration:none !important; }
  .custom-embed .mw-citylink-title:hover{ color:#2F5FE0 !important; }
  .custom-embed .mw-citylink{ display:inline-flex; align-items:center; gap:6px; margin-top:14px; font-size:14px; font-weight:700; color:#2F5FE0 !important; text-decoration:none !important; }
  .custom-embed .mw-citylink:hover{ gap:9px; }
  .custom-embed .mw-citylink svg{ width:15px; height:15px; }
</style>
`
if (await c.getDocument('drafts.' + ITALY_ID)) throw new Error('An Italy draft already exists')
const itEmbed = italy.sections.find((s) => s._type === 'customEmbed')
let itCode = itEmbed.code
if (itCode.includes('mw-citylink')) throw new Error('Italy cards already linked')
for (const [city, href] of [['Milan', '/locations/italy/milan'], ['Rome', '/locations/italy/rome']]) {
  const parts = itCode.split(`<h3>${city}</h3>`)
  if (parts.length !== 2) throw new Error(`Expected one ${city} card on the Italy page`)
  const end = parts[1].indexOf('</p>') + 4
  itCode = parts[0] + `<h3><a class="mw-citylink-title" href="${href}">${city}</a></h3>` + parts[1].slice(0, end) + `\n        <a class="mw-citylink" href="${href}">Explore ${city} ${ARROW}</a>` + parts[1].slice(end)
}
const { _rev, _createdAt, _updatedAt, ...itRest } = italy
tx.create({ ...itRest, _id: 'drafts.' + ITALY_ID, hideCityCards: true, sections: italy.sections.map((s) => (s === itEmbed ? { ...s, code: LINK_CSS + itCode } : s)) })

await tx.commit()
console.log('Drafts created: /locations/italy/milan, /locations/italy/rome, Italy page (Milan + Rome cards linked)')
