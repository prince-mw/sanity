// Creates DRAFT UK market pages for Scotland and Wales (/locations/united-kingdom/scotland|wales)
// from "Scotland.docx" and "Wales.docx". Visual style reuses the Manchester page's section CSS
// (custom-embed sections, Trusted Globally logos, CTA banner), with markup generated from the copy below.
// Also sets the UK page's city-card heading to "Explore by Market" (new fields; the live site ignores them until the code ships).
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
  const cta = (sec, text) => `
    <div class="mw-${p}-${sec}__cta">
      <a class="mw-${p}-${sec}__btn" href="${FORM}" target="_blank" rel="noopener" data-modal-open="mw-${p}-${sec}-modal">
        ${text}
        ${ARROW}
      </a>
    </div>

    <!-- Contact popup: Zoho UK form -->
    <div id="mw-${p}-${sec}-modal" class="mw-${p}-${sec}__modal-overlay" data-modal-root>
      <div class="mw-${p}-${sec}__modal-box" role="dialog" aria-modal="true" aria-label="Contact Moving Walls">
        <button type="button" class="mw-${p}-${sec}__modal-close" aria-label="Close" data-modal-close>&times;</button>
        <iframe id="mw-${p}-${sec}-modal-frame" class="mw-${p}-${sec}__modal-frame" title="Moving Walls UK Contact Form" loading="lazy"></iframe>
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
    <div class="mw-${p}-areas__note">
      <p>${d.areas.note}</p>
    </div>
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
    </div>${steps('prog', d.prog.steps)}
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

// Shared copy (identical in both docs apart from the market name)
const progSteps = (m) => [
  ['target', 'Plan', `Define geography, dates, dayparts, budget and audience signals for the ${m} markets you need.`],
  ['bolt', 'Activate', 'Run direct or programmatic activation through relevant UK media-owner and technology partners.'],
  ['nodes', 'Coordinate', 'Keep locations, creative requirements and partner activity in one connected workflow.'],
  ['check', 'Review', 'Monitor delivery against the agreed campaign setup.'],
]
const buildCards = (adj, m, where, last) => [
  ['target', 'Audience and Location-Led Planning', `Use available audience, location and mobility intelligence to compare relevant opportunities across ${where}.`],
  ['search', 'Inventory Discovery and Access', 'Identify suitable OOH and DOOH opportunities based on geography, format, timing and supply confirmed for the campaign brief.'],
  ['bolt', 'Direct and Programmatic Activation', 'Choose an activation approach that fits the objective, budget, available inventory and participating partner setup.'],
  ['bars', 'Campaign Delivery and Measurement', 'Bring available delivery, performance and measurement signals into a clearer reporting workflow. The exact signals depend on the campaign setup and data availability.'],
  ['bulb', 'Supporting Intelligence from MW Science', `<a href="/mw-science" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Science</a> can connect available audience, location, media, brand and outcome signals to support planning, measurement and campaign decisions. MW Science Lab’s research network spans 40+ countries, including nine European markets. The specific datasets, research, panel and measurement options for a ${m} campaign are confirmed against the brief and applicable data requirements.`],
  ['globe', last[0], last[1]],
]
const progLeads = (m, adj, vary) => [
  `Campaign requirements can vary considerably between ${vary}. Teams may need control over geography, dates, dayparts, budgets, audience signals, creative requirements and delivery parameters.`,
  `Moving Walls can support <strong>direct and programmatic activation</strong> by working with relevant UK media owners and technology partners. Teams can compare available opportunities across the required ${adj} markets, define when and where activity should run and monitor delivery against the agreed campaign setup.`,
  'The final activation approach depends on the brief, timing, suitable inventory and partner connectivity. Direct activation can be used where it is the better fit, while programmatic activation can be supported where the required inventory and integrations are available.',
]
const connectSteps = (compareTitle, compareText) => [
  ['pin', 'Plan with Audience and Location Context', 'Use available audience, location and mobility intelligence to assess where campaign activity may be most relevant.'],
  ['nodes', compareTitle, compareText],
  ['bolt', 'Choose the Right Buying Approach', 'Support direct or programmatic activation based on the brief, timing, available inventory and relevant partner connectivity.'],
  ['bars', 'Connect Delivery and Reporting', 'Bring campaign activity, delivery information and available performance or measurement signals into a more consistent view.'],
]
const NOTE_AREAS = 'Available locations, formats and buying options are confirmed against the campaign brief, timing and participating UK media-owner or technology partners.'
const NOTE_BUILD = 'The final setup can be tailored around the campaign requirements, existing systems and capabilities available through relevant UK partners.'
const COMPARE = 'Moving Walls helps campaign teams compare available media opportunities using audience context, geography, timing, campaign objectives and budget—then carry those decisions into activation and measurement.'

const PAGES = [
  {
    p: 'sc', slug: 'scotland', name: 'Scotland', order: 3,
    heroTitle: 'Outdoor Advertising in Scotland',
    hero: 'Scotland combines major city, commuter, business, retail, tourism, university, cultural and event audiences across a geographically diverse market. National Records of Scotland estimates that the population reached 5,545,500 in mid-2025, the highest recorded level.\n\nMoving Walls helps brands and agencies use available audience and location intelligence to plan Scottish DOOH activity, support direct or programmatic activation, monitor delivery and connect campaigns to relevant measurement signals through one clearer workflow.',
    heroCta: 'Explore Scotland DOOH',
    card: 'Plan DOOH across Glasgow, Edinburgh, Aberdeen and wider Scotland, with direct or programmatic activation and clearer measurement in one workflow.',
    seo: ['Outdoor & DOOH Advertising in Scotland | Moving Walls', 'Plan, activate and measure DOOH across Glasgow, Edinburgh, Aberdeen and wider Scotland with audience and location intelligence, direct or programmatic.'],
    connect: {
      title: 'Connect Scottish Cities, Regions and Audience Journeys',
      leads: ['A Scotland campaign may need to connect activity across <strong>Glasgow, Edinburgh and the Central Belt</strong> with <strong>Aberdeen, Dundee, Inverness</strong>, airports, transport corridors and regional communities. Audience patterns can also change between weekday commuting, university terms, visitor seasons and major events.', COMPARE],
      steps: connectSteps('Compare City and Regional Opportunities', 'Consider available transport, roadside, retail, business, education, leisure, event and travel environments within one campaign plan.'),
      cta: 'See How Scotland Campaign Planning Works',
    },
    match: {
      title: 'Match the Campaign Approach to Your Scotland Objective',
      lead: 'Scottish DOOH activity can be shaped around different audiences, markets and campaign priorities.',
      items: [
        ['Build National or Multi-City Awareness', 'Coordinate activity across relevant Scottish cities and regions when the brief requires broader reach rather than a single-city plan.'],
        ['Reach Business and Workplace Audiences', 'Consider commercial districts, employment areas and commuter journeys when professional and workplace audiences are a priority.'],
        ['Support Retail and Proximity Campaigns', 'Plan around available shopping, hospitality, leisure and destination environments when proximity or local action matters.'],
        ['Connect with Tourism and Travel Audiences', 'Use location, timing and travel context to consider airports, stations, visitor gateways and relevant destinations.'],
        ['Align with Universities, Culture, Sport and Events', 'Adapt campaign geography, dates, dayparts and creative around relevant university terms, festivals, conferences, performances and sporting fixtures.'],
        ['Coordinate Scotland with Wider UK Activity', 'Connect Scottish markets with campaigns running elsewhere in the UK or internationally through a more consistent planning and reporting workflow.'],
      ],
      close: 'Moving Walls helps planners compare available opportunities against the audience and objective rather than applying the same media mix to every Scottish market.',
      cta: 'Discuss Your Scotland Campaign',
    },
    areas: {
      title: 'Explore Key Scottish Markets and Campaign Corridors',
      leads: ['Scotland includes distinct city, regional and travel audiences.', 'The right market mix should be guided by the campaign objective, timing and inventory available through participating media partners.'],
      cards: [
        ['city', 'Glasgow and Central Scotland', 'Consider Scotland’s largest urban market for retail, business, entertainment, university, sporting and regional commuter audiences.'],
        ['star', 'Edinburgh and the Lothians', 'Plan around capital-city business, finance, retail, university, tourism, cultural and event audiences.'],
        ['bolt', 'Aberdeen and the North East', 'Consider business, energy, education, residential, retail and regional travel audiences across Aberdeen and surrounding North-East communities.'],
        ['cap', 'Dundee, Perth and Tayside', 'Explore opportunities connected to city-centre, university, business, retail, cultural and regional movement across Tayside and nearby areas.'],
        ['mountain', 'Inverness and the Highlands Gateway', 'Consider local, visitor, travel and regional audiences around Inverness and relevant routes connecting the Highlands.'],
        ['road', 'Stirling, Falkirk and the Central Belt', 'Plan around commuter, residential, retail, education and regional movement between Scotland’s major eastern and western urban markets.'],
        ['plane', 'Airports and Intercity Travel Corridors', 'Consider available opportunities connected to major airports, stations and road or rail journeys when the campaign needs to reach travellers or link several Scottish markets.'],
      ],
      note: NOTE_AREAS,
      cta: 'Explore Scotland DOOH Opportunities',
    },
    prog: {
      title: 'Support Direct and Programmatic DOOH Activation Across Scotland',
      leads: progLeads('Scotland', 'Scottish', 'Glasgow, Edinburgh, the Central Belt and Scotland’s other cities or regions'),
      steps: progSteps('Scottish'),
      cta: 'Discuss Scotland Activation Options',
    },
    build: {
      title: 'Build the Scotland DOOH Workflow You Need',
      lead: 'Start with the campaign requirement that matters now rather than assuming a fixed product or inventory setup.',
      cards: buildCards('Scottish', 'Scotland', 'Scottish cities and regions', ['Multi-City and Multi-Market Coordination', 'Connect activity across Scotland or combine Scottish markets with other UK and international locations through a more consistent workflow.']),
      note: NOTE_BUILD,
      cta: 'Discuss Your Campaign Requirements',
    },
    banner: ['Ready to Plan Your Next Scotland DOOH Campaign?', 'Starting with one city? Talk to us about Glasgow, Edinburgh or a wider Scotland plan.'],
    faqs: [
      ['Can Moving Walls support DOOH campaigns across Scotland?', 'Yes. Moving Walls can support audience- and location-led planning, direct and programmatic activation, campaign management and measurement workflows across relevant Scottish markets, subject to the brief, available inventory and partner connectivity.'],
      ['Can Scotland DOOH campaigns be activated programmatically?', 'Yes. Moving Walls can support programmatic DOOH activation in Scotland by working with relevant UK media owners and technology partners. The final setup depends on suitable inventory, timing, campaign requirements and available connectivity. Direct activation can also be supported where appropriate.'],
      ['Can we plan activity across several Scottish cities?', 'Yes. Campaign planning can consider Glasgow, Edinburgh, Aberdeen, Dundee, Inverness and other relevant Scottish markets according to the audience, objective and available opportunities.'],
      ['Which Scottish media environments can be considered?', 'Depending on the brief and available inventory, planning may consider transport, roadside, retail, business, education, leisure, event, sport, travel and destination environments.'],
      ['What audience and location data can be used?', 'Available audience, location and mobility intelligence can support planning. The exact datasets, research and panel options are confirmed against the brief and applicable data requirements.'],
      ['What measurement options are available?', 'The appropriate approach depends on the campaign objective, setup and available data. Moving Walls and MW Science can support relevant planning insights, delivery reporting and available performance or measurement signals, with the final scope confirmed for each brief.'],
      ['Can Scotland be combined with other UK or international markets?', 'Yes. Moving Walls can support multi-market planning and coordination when Scotland forms part of a wider UK, European or international campaign.'],
    ],
  },
  {
    p: 'wl', slug: 'wales', name: 'Wales', order: 4,
    heroTitle: 'Digital OOH Advertising in Wales',
    hero: 'Wales brings together capital-city, regional, commuter, retail, business, university, tourism, sporting and cultural audiences across distinct markets and travel corridors. Official mid-2024 estimates place the population at approximately 3,187,000.\n\nMoving Walls helps brands and agencies use available audience and location intelligence to plan Welsh DOOH activity, support direct or programmatic activation, monitor delivery and connect campaigns to relevant measurement signals through one clearer workflow.',
    heroCta: 'Explore Wales DOOH',
    card: 'Plan DOOH across Cardiff, Newport, Swansea and North Wales, with direct or programmatic activation and clearer measurement in one workflow.',
    seo: ['Digital OOH Advertising in Wales | Moving Walls', 'Plan, activate and measure DOOH across Cardiff, Newport, Swansea and North Wales with audience and location intelligence, direct or programmatic.'],
    connect: {
      title: 'Connect Welsh Markets and Regional Audience Journeys',
      leads: ['A Wales campaign may need to connect <strong>Cardiff and Newport</strong> with <strong>Swansea and South West Wales</strong>, or extend into <strong>Wrexham, North Wales</strong> and relevant cross-border corridors. Audience movement can also change between weekday commuting, university terms, visitor seasons and major sporting or cultural events.', COMPARE],
      steps: connectSteps('Compare Urban, Regional and Travel Opportunities', 'Consider available transport, roadside, retail, business, education, leisure, event and visitor environments within one campaign plan.'),
      cta: 'See How Wales Campaign Planning Works',
    },
    match: {
      title: 'Match the Campaign Approach to Your Wales Objective',
      lead: 'Welsh DOOH activity can be shaped around different regions, audiences and campaign priorities.',
      items: [
        ['Build National or Regional Awareness', 'Coordinate activity across relevant Welsh markets when the campaign requires broader reach rather than a single-city plan.'],
        ['Reach Commuter and Workplace Audiences', 'Consider business districts, employment areas, transport hubs and recurring travel corridors when professional and commuter audiences matter.'],
        ['Support Retail and Proximity Campaigns', 'Plan around available shopping, hospitality, leisure and destination environments when proximity or local action is a priority.'],
        ['Connect with Tourism and Travel Audiences', 'Use geography, timing and travel context to consider visitor gateways, transport connections and relevant destinations.'],
        ['Align with Universities, Culture, Sport and Events', 'Adapt campaign locations, dates, dayparts and creative around relevant university terms, festivals, performances, conferences and sporting fixtures.'],
        ['Coordinate Wales with Wider UK Activity', 'Connect Welsh markets with campaigns running in England, Scotland or internationally through a clearer planning and reporting workflow.'],
      ],
      close: 'Moving Walls helps planners compare available opportunities against the audience and objective rather than applying one location mix across the whole country.',
      cta: 'Discuss Your Wales Campaign',
    },
    areas: {
      title: 'Explore Key Welsh Markets and Campaign Corridors',
      leads: ['Wales includes distinct capital-city, regional, coastal, rural and cross-border audiences.', 'The right market mix should be guided by the campaign objective, timing and available inventory.'],
      cards: [
        ['city', 'Cardiff City Centre and Cardiff Bay', 'Consider capital-city business, retail, hospitality, university, visitor, sporting and event audiences across relevant central and waterfront environments.'],
        ['road', 'Newport and the South East Wales Corridor', 'Plan around commuter, business, residential, retail and cross-border movement between Newport, Cardiff and nearby South East Wales communities.'],
        ['wave', 'Swansea and the Wider Bay Region', 'Consider city-centre, university, retail, leisure, residential and visitor audiences across Swansea and surrounding South West Wales areas.'],
        ['star', 'Wrexham and North East Wales', 'Explore business, retail, education, sporting, residential and cross-border audiences across Wrexham and nearby communities.'],
        ['train', 'North Wales Coast and the A55 Corridor', 'Consider local, visitor and travel audiences across relevant coastal destinations and connected North Wales routes.'],
        ['mountain', 'Central and West Wales', 'Plan selectively around regional centres, visitor destinations, events and seasonal movement where suitable media opportunities are available.'],
        ['plane', 'Airports, Stations and Cross-Border Routes', 'Consider available travel environments and major road or rail connections when the campaign needs to reach travellers or coordinate Wales with neighbouring English markets.'],
      ],
      note: NOTE_AREAS,
      cta: 'Explore Wales DOOH Opportunities',
    },
    prog: {
      title: 'Support Direct and Programmatic DOOH Activation Across Wales',
      leads: progLeads('Wales', 'Welsh', 'Cardiff, South Wales, North Wales and more regional locations'),
      steps: progSteps('Welsh'),
      cta: 'Discuss Wales Activation Options',
    },
    build: {
      title: 'Build the Wales DOOH Workflow You Need',
      lead: 'Start with the campaign requirement that matters now rather than assuming a fixed product or inventory setup.',
      cards: buildCards('Welsh', 'Wales', 'Welsh cities, regions and travel corridors', ['Multi-Region and Multi-Market Coordination', 'Connect activity across Wales or combine Welsh markets with other UK and international locations through a more consistent workflow.']),
      note: NOTE_BUILD,
      cta: 'Discuss Your Campaign Requirements',
    },
    banner: ['Ready to Plan Your Next Wales DOOH Campaign?', 'Whether the brief starts in Cardiff or spans several Welsh regions, the campaign setup can be shaped around the locations and outcomes that matter.'],
    faqs: [
      ['Can Moving Walls support DOOH campaigns across Wales?', 'Yes. Moving Walls can support audience- and location-led planning, direct and programmatic activation, campaign management and measurement workflows across relevant Welsh markets, subject to the brief, available inventory and partner connectivity.'],
      ['Can Wales DOOH campaigns be activated programmatically?', 'Yes. Moving Walls can support programmatic DOOH activation in Wales by working with relevant UK media owners and technology partners. The final setup depends on suitable inventory, timing, campaign requirements and available connectivity. Direct activation can also be supported where appropriate.'],
      ['Can we plan activity across several Welsh regions?', 'Yes. Campaign planning can consider Cardiff, Newport, Swansea, Wrexham, North Wales and other relevant locations according to the audience, objective and available opportunities.'],
      ['Which Welsh media environments can be considered?', 'Depending on the brief and available inventory, planning may consider transport, roadside, retail, business, education, leisure, event, sport, travel and destination environments.'],
      ['What audience and location data can be used?', 'Available audience, location and mobility intelligence can support planning. The exact datasets, research and panel options are confirmed against the brief and applicable data requirements.'],
      ['What measurement options are available?', 'The appropriate approach depends on the campaign objective, setup and available data. Moving Walls and MW Science can support relevant planning insights, delivery reporting and available performance or measurement signals, with the final scope confirmed for each brief.'],
      ['Can Wales be combined with other UK or international markets?', 'Yes. Moving Walls can support multi-market planning and coordination when Wales forms part of a wider UK, European or international campaign.'],
      ['Can we start with one Welsh market or requirement?', 'Yes. The scope can begin with one location or an immediate requirement such as planning, activation, measurement or research without assuming a full-platform setup.'],
    ],
  },
]

const logos = man.sections.find((s) => s._type === 'logoCarousel')
const BANNER_SUB = 'Tell us the audiences, markets, timing and campaign objective you have in mind. We will tailor the conversation around your brief, available inventory, activation approach and measurement priorities.'

for (const d of PAGES) {
  const ID = `city-uk-${d.slug}`
  const clash = await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$uk && !(_id in [$id, "drafts." + $id])])', { s: d.slug, uk: UK, id: ID })
  if (clash) { console.error('Already exists:', d.slug); continue }
  const existing = await c.getDocument(`drafts.${ID}`)
  const keep = existing?.heroImage?.asset?._ref && existing.heroImage.asset._ref !== PLACEHOLDER ? existing.heroImage : null
  const img = keep || { _type: 'image', asset: { _type: 'reference', _ref: PLACEHOLDER } }
  await c.createOrReplace({
    _id: `drafts.${ID}`,
    _type: 'locationCity',
    city: d.name,
    slug: { _type: 'slug', current: d.slug },
    country: { _type: 'reference', _ref: UK },
    heroTitle: d.heroTitle,
    fullDescription: d.hero,
    description: d.card,
    heroImage: img,
    ctaButtonText: d.heroCta,
    showAllLocationsButton: true,
    contactFormUrl: FORM,
    isActive: true,
    order: d.order,
    sectionsPosition: 'before-faqs',
    faqs: d.faqs.map(([question, answer]) => ({ _key: k(), question, answer })),
    sections: [
      { ...manEmbed, _key: k(), code: build(d.p, d) },
      { ...logos, _key: k() },
      { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: d.banner[0], subheading: BANNER_SUB, ctaText: 'Request a Demo', ctaLink: FORM, note: d.banner[1] },
    ],
    seo: { _type: 'seo', metaTitle: d.seo[0], metaDescription: d.seo[1], enableKeywords: false, noIndex: false, ...(keep ? { ogImage: img } : {}) },
  })
  console.log('Draft created: drafts.' + ID, '-> /locations/united-kingdom/' + d.slug)
}

await c.patch(UK).set({ citiesHeading: 'Explore by Market', citiesSubheading: "OOH advertising opportunities in United Kingdom's key markets" }).commit()
console.log('UK page: city cards heading set to "Explore by Market"')
