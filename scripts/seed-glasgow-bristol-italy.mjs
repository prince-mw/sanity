// Creates DRAFTS (6 Nov 2026) from the "Europe Deals Reengagement" Google Doc tabs:
//  - Glasgow and Bristol city pages under the UK (/locations/united-kingdom/glasgow|bristol), same look as
//    Scotland/Wales (Manchester section CSS), UK contact form
//  - Italy country page (/locations/italy), same section layout, Europe contact form, market stats in the hero
//  - Europe page: the "Explore DOOH Across Europe" Italy card turned into a link
// Builder copied from scripts/seed-scotland-wales.mjs (CTA form, optional programmatic steps and area note).
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

const EUROPE_ID = '3c1449b3-ac6a-470a-adea-fb7603a91d37'
const europe = await c.getDocument(EUROPE_ID)
const EU_FORM = europe.contactFormUrl // EuropeContact
const MWS = '<a href="/mw-science" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Science</a>'
const connectSteps = (second, last = ['bars', 'Connect Delivery and Reporting', 'Bring campaign activity, delivery information and available performance or measurement signals into a more consistent view.']) => [
  ['pin', 'Plan with Audience and Location Context', 'Use available audience, location and mobility intelligence to assess where campaign activity may be most relevant.'],
  ['nodes', ...second],
  ['bolt', 'Choose the Right Buying Approach', 'Support direct or programmatic activation based on the brief, timing, available inventory and relevant partner connectivity.'],
  last,
]

const UK_PAGES = [
  {
    p: 'gl', slug: 'glasgow', name: 'Glasgow', order: 5, form: FORM, formLabel: 'UK',
    heroTitle: 'Plan, Activate and Measure DOOH Across Glasgow',
    hero: 'Glasgow had Scotland’s highest council-area population in the official mid-2022 estimates, at 622,800 residents. It also sits at the centre of a wider city region formed by eight partner councils, creating opportunities to connect city audiences with movement across Central Scotland.\n\nMoving Walls helps brands and agencies use audience and location intelligence to plan Glasgow DOOH activity, support direct or programmatic activation, monitor delivery and connect campaigns to relevant measurement signals through one clearer workflow.',
    heroCta: 'Request a Glasgow DOOH Demo',
    card: 'Plan DOOH across Glasgow’s retail core, Merchant City, the SEC events corridor and wider Central Scotland, with direct or programmatic activation.',
    seo: ['DOOH & Outdoor Advertising in Glasgow', 'Plan, activate and measure DOOH across Glasgow and Central Scotland, from Buchanan Street to the SEC, with direct or programmatic activation.'],
    connect: {
      title: 'Connect Glasgow Campaigns Across the City and Central Scotland',
      leads: [
        'The audience movement in Glasgow connects city-centre retail and business districts with universities, cultural destinations, entertainment venues, residential neighbourhoods, transport interchanges and surrounding towns. Campaign planning may therefore need to combine concentrated urban visibility with broader regional reach.',
        'Moving Walls helps teams compare available media opportunities using audience context, geography, timing, campaign objectives and budget—then carry those decisions into activation and measurement.',
      ],
      steps: [
        ['pin', 'Plan with Audience and Location Context', 'Use available audience, location and mobility intelligence to understand where campaign activity may be most relevant.'],
        ['nodes', 'Compare City and Regional Opportunities', 'Assess available roadside, transport, retail, business, education, leisure, event and travel environments within one campaign plan.'],
        ['bolt', 'Choose the Right Buying Approach', 'Support direct or programmatic activation depending on the brief, inventory, timing and campaign requirements.'],
        ['bars', 'Connect Delivery and Reporting', 'Bring campaign activity, delivery information and available performance signals into a more consistent view.'],
      ],
      cta: 'See How Glasgow Campaign Planning Works',
    },
    match: {
      title: 'Match the Campaign Approach to Your Glasgow Objective',
      lead: 'Glasgow DOOH activity can be shaped around different audiences, locations and moments.',
      items: [
        ['Reach Retail and City-Centre Audiences', 'Plan around major shopping streets, retail destinations, hospitality areas and transport connections when visibility and proximity are priorities.'],
        ['Connect with Business and Commuter Audiences', 'Consider commercial districts, central stations and weekday travel patterns when professional and commuter audiences matter.'],
        ['Align with Entertainment and Major Events', 'Adapt locations, dates, dayparts and creative around concerts, conferences, exhibitions and other event-led audience movement.'],
        ['Reach Student and University Audiences', 'Use location and timing context to plan around universities, education corridors, term-time activity and nearby leisure areas.'],
        ['Support Sport and Cultural Campaigns', 'Build campaign timing and geography around relevant sporting fixtures, cultural destinations and city events.'],
        ['Extend Reach Across Central Scotland', 'Coordinate Glasgow activity with Paisley, Clydebank, East Kilbride, Hamilton, Motherwell and other connected communities when the campaign requires a broader regional footprint.'],
      ],
      close: 'Moving Walls helps planners compare available opportunities against the audience and objective instead of applying the same location mix to every campaign.',
      cta: 'Discuss Your Glasgow Campaign',
    },
    areas: {
      title: 'Explore Key Glasgow Areas for DOOH Campaigns',
      leads: ['Glasgow brings together retail, business, student, cultural, sporting, residential and visitor audiences across distinct districts. The right area mix should be guided by the campaign objective, audience and timing.'],
      cards: [
        ['bag', 'Buchanan Street, Argyle Street and the Retail Core', 'Consider central shopping, hospitality, visitor and pedestrian environments for campaigns focused on retail, leisure and city-centre audiences.'],
        ['city', 'George Square, Queen Street and Merchant City', 'Plan around commuter, civic, business, hospitality, cultural and evening audiences moving through the eastern side of the city centre.'],
        ['train', 'Glasgow Central, Broomielaw and the Financial District', 'Consider rail passengers, office workers, business visitors and audiences moving between the city centre and the Clyde.'],
        ['pin', 'Sauchiehall Street and the Northern City Centre', 'Explore opportunities connected to retail, entertainment, education, hospitality and city-centre movement.'],
        ['star', 'Finnieston, SEC and the Clyde Events Corridor', 'Plan around conferences, exhibitions, concerts, hospitality and event-led audiences, with campaign timing aligned to relevant activity.'],
        ['cap', 'West End, Hillhead and Byres Road', 'Consider student, university, residential, cultural, leisure and evening audiences across Glasgow’s West End.'],
        ['target', 'Southside, Shawlands and Hampden Connections', 'Plan for residential, hospitality, retail and sporting audiences across the south of the city, including event-led movement where relevant.'],
        ['plane', 'Glasgow Airport, Paisley and Western Corridors', 'Consider travellers, visitors, commuters and regional audiences moving between the airport, Paisley, surrounding destinations and Glasgow.'],
      ],
      note: 'Campaigns can also extend across Central Scotland when wider residential, commuter or regional reach is required. Available locations, formats and buying options depend on the campaign brief and participating media partners.',
      cta: 'Explore Glasgow DOOH Opportunities',
    },
    prog: {
      title: 'Plan and Activate Programmatic DOOH Across Glasgow',
      leads: [
        'Audience movement in Glasgow can change between weekday commuting, retail peaks, university terms, evening activity, weekends and major events. Programmatic DOOH allows campaign teams to define relevant locations, dates, dayparts, audience signals, budgets, creative requirements and delivery parameters around those patterns.',
        'Moving Walls brings these campaign controls into a more connected workflow. Teams can compare available opportunities across Glasgow and Central Scotland, define when and where activity should run, activate through available supply partners and monitor delivery against the campaign setup.',
        'This provides clearer visibility over campaign decisions while retaining the flexibility to use direct activation when it is the better fit. Available programmatic options depend on inventory and technology-partner availability.',
      ],
      cta: 'Discuss Programmatic DOOH in Glasgow',
    },
    build: {
      title: 'Build the Glasgow DOOH Workflow You Need',
      lead: 'Start with the campaign requirement that matters now rather than assuming a fixed product setup.',
      cards: [
        ['target', 'Audience and Location-Led Planning', 'Use available audience, location and mobility intelligence to compare media opportunities across Glasgow and the wider Central Scotland region.'],
        ['search', 'Inventory Discovery and Access', 'Identify relevant OOH and DOOH opportunities based on geography, format, timing and available supply.'],
        ['bolt', 'Direct and Programmatic Activation', 'Choose an activation approach that fits the brief, budget, available inventory and partner setup.'],
        ['bars', 'Campaign Delivery and Measurement', 'Bring available delivery, audience and attribution signals into a clearer reporting workflow.'],
        ['bulb', 'Supporting Intelligence from MW Science', `${MWS} connects available audience, location, media, brand and outcome signals to support planning, measurement and campaign decisions. MW Science Lab’s research network spans 40+ countries, including nine European markets. The specific research, panel and data options for a UK campaign are confirmed against the brief and applicable data requirements.`],
        ['globe', 'Multi-City Coordination', 'Connect Glasgow activity with other UK or international markets when the campaign extends beyond one city.'],
      ],
      note: 'The final setup can be tailored around your campaign requirements, existing systems and the capabilities available through relevant UK partners.',
      cta: 'Discuss Your Campaign Requirements',
    },
    banner: ['Ready to Plan Your Next Glasgow DOOH Campaign?', 'Tell us the audience, locations and campaign objective you have in mind. We will tailor the conversation around your brief, available inventory, activation approach and measurement priorities.', 'Need broader coverage? Glasgow activity can be coordinated with other Central Scotland and UK locations through a connected campaign workflow.'],
    faqs: [
      ['Can Moving Walls support DOOH campaigns across Glasgow and Central Scotland?', 'Moving Walls supports planning, activation, campaign management and measurement workflows across Glasgow and the wider region, subject to campaign scope and available inventory.'],
      ['Can we plan beyond Glasgow city centre?', 'Yes. Campaign planning can consider Glasgow neighbourhoods, transport corridors, surrounding communities and connected Central Scotland locations according to the audience and objective.'],
      ['Can Glasgow DOOH campaigns be activated programmatically?', 'Programmatic activation can be supported where suitable inventory and technology partners are available. Direct activation can also be supported where appropriate.'],
      ['Which Glasgow media environments can be considered?', 'Depending on the brief and available inventory, planning may consider roadside, transport, retail, business, education, leisure, event, sport, travel and destination environments.'],
      ['Can campaigns be planned around Glasgow events?', 'Yes. Location, timing, daypart and available media opportunities can be assessed around relevant concerts, conferences, exhibitions, sporting fixtures and cultural events.'],
      ['What measurement options are available?', 'The right approach depends on the objective, campaign setup and available data. Moving Walls and MW Science can support planning insights, delivery reporting and relevant audience, performance or attribution workflows. Specific UK research, panel and data options are confirmed against the campaign brief.'],
      ['Can Glasgow be combined with Edinburgh or other UK cities?', 'Yes. Moving Walls can support multi-city planning and coordination when Glasgow forms part of a broader Scottish, UK or international campaign.'],
      ['Can we start with a single Glasgow campaign requirement?', 'Yes. The scope can begin with an immediate requirement such as planning, activation, measurement or research without assuming a fixed or full-platform setup.'],
    ],
  },
  {
    p: 'bs', slug: 'bristol', name: 'Bristol', order: 6, form: FORM, formLabel: 'UK',
    heroTitle: 'Plan, Activate and Measure DOOH Across Bristol',
    hero: 'Bristol combines business, technology, creative, university, retail, cultural, residential and visitor audiences within one of the South West’s major urban markets. Bristol City Council estimates that the city’s population reached 495,300 in mid-2025.\n\nMoving Walls helps brands and agencies use available audience and location intelligence to plan Bristol DOOH activity, support direct or programmatic activation, monitor delivery and connect campaigns to relevant measurement signals through one clearer workflow.',
    heroCta: 'Plan Your Bristol DOOH Campaign',
    card: 'Plan DOOH across Broadmead, Temple Meads, Harbourside, Clifton and the wider West of England, with direct or programmatic activation.',
    seo: ['DOOH & Outdoor Advertising in Bristol', 'Plan, activate and measure DOOH across Bristol and the West of England, from Broadmead to Temple Meads, with direct or programmatic activation.'],
    connect: {
      title: 'Plan Bristol DOOH with Audience and Location Intelligence',
      leads: [
        'Audience movement in Bristol can connect the city centre with business and innovation districts, universities, residential neighbourhoods, retail destinations, transport hubs, the airport corridor and nearby West of England communities. Campaign planning may therefore need to balance concentrated city visibility with wider commuter and regional reach.',
        '<a href="/mw-planner" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Planner</a> helps advertisers use available audience and location data to identify relevant placements for the campaign brief. Teams can plan activity around geography, timing, campaign objectives and budget, then carry those decisions into activation and measurement. Final inventory and buying options are confirmed against availability and participating UK partners.',
      ],
      steps: connectSteps(['Plan Across Relevant Media Environments', 'Consider available roadside, transport, retail, business, university, leisure, event and travel environments within one campaign plan.']),
      cta: 'See How Bristol Campaign Planning Works',
    },
    match: {
      title: 'Match the Campaign Approach to Your Bristol Objective',
      lead: 'Bristol DOOH activity can be shaped around different audiences, locations and campaign priorities.',
      items: [
        ['Reach Business, Technology and Creative Audiences', 'Consider commercial, innovation and creative districts when professional, entrepreneurial and workplace audiences are a priority.'],
        ['Support Retail and Proximity Campaigns', 'Plan around available city-centre, shopping, hospitality and leisure environments when proximity or local action matters.'],
        ['Connect with Student and University Audiences', 'Use location and timing context to consider university areas, education corridors, term-time movement and nearby leisure destinations.'],
        ['Align with Culture, Entertainment and Events', 'Adapt campaign geography, dates, dayparts and creative around relevant festivals, performances, conferences, sporting fixtures and other event-led movement.'],
        ['Reach Travellers and Regional Commuters', 'Consider major stations, commuter routes, the airport corridor and regional connections when the brief extends beyond central Bristol.'],
        ['Extend Across the West of England', 'Coordinate Bristol activity with Bath, South Gloucestershire, North Somerset and other relevant locations when the campaign requires a broader regional footprint.'],
      ],
      close: 'Moving Walls helps planners select relevant opportunities based on the audience and objective rather than applying the same location mix to every campaign.',
      cta: 'Discuss Your Bristol Campaign',
    },
    areas: {
      title: 'Explore Key Bristol Areas for DOOH Campaigns',
      leads: ['Bristol brings together business, retail, education, culture, residential, visitor and travel audiences across distinct districts. The right area mix should be guided by the campaign objective, timing and available inventory.'],
      cards: [
        ['bag', 'Bristol City Centre and Broadmead', 'Consider central retail, business, hospitality, leisure and visitor environments for campaigns focused on high-activity city-centre audiences.'],
        ['train', 'Temple Meads and Temple Quarter', 'Plan around rail passengers, commuters, office workers, business visitors and audiences moving through one of the city’s key transport and regeneration areas.'],
        ['wave', 'Harbourside and the Waterfront', 'Consider visitor, cultural, hospitality, leisure, event and evening audiences around relevant waterfront destinations.'],
        ['cap', 'Clifton and the University Areas', 'Explore opportunities connected to university, professional, residential, visitor, hospitality and local retail audiences.'],
        ['pin', 'Gloucester Road, Stokes Croft and the Northern Inner City', 'Consider student, creative, cultural, independent retail, hospitality and residential audiences across these distinctive local areas.'],
        ['road', 'North Bristol and Cribbs Causeway', 'Plan around employment, retail, leisure, residential and major-road movement across North Bristol and surrounding communities.'],
        ['plane', 'Bristol Airport and the Southern Corridor', 'Consider travellers, business visitors and audiences moving between the airport, South Bristol, North Somerset and the city centre.'],
        ['globe', 'Bath and Wider West of England Connections', 'Extend campaign planning into nearby commuter, business, university, retail and visitor markets when the brief requires broader regional reach.'],
      ],
      note: 'Available locations, formats and buying options are confirmed against the campaign brief, timing and participating UK media-owner or technology partners.',
      cta: 'Explore Bristol DOOH Opportunities',
    },
    prog: {
      title: 'Support Direct and Programmatic DOOH Activation Across Bristol',
      leads: [
        'Audience patterns in Bristol can change between commuting hours, university terms, retail periods, weekends, visitor seasons and major events. Campaign teams may therefore need control over geography, dates, dayparts, budgets, audience signals, creative requirements and delivery parameters.',
        'Moving Walls can support <strong>direct and programmatic activation</strong> in Bristol through relevant UK media owners and technology partners. Teams can identify suitable opportunities across Bristol and the wider West of England, define when and where activity should run and monitor delivery against the agreed campaign setup.',
        'The final activation approach depends on the brief, timing, suitable inventory and partner connectivity. Direct activation can be used where it is the better fit, while programmatic activation can be supported where the required inventory and integrations are available.',
      ],
      cta: 'Discuss Bristol Activation Options',
    },
    build: {
      title: 'Build the Bristol DOOH Workflow You Need',
      lead: 'Start with the campaign requirement that matters now rather than assuming a fixed product or inventory setup.',
      cards: [
        ['target', 'Audience and Location-Led Planning', 'Use available audience, location and mobility intelligence to identify relevant opportunities across Bristol and the wider West of England.'],
        ['search', 'Inventory Discovery and Access', 'Identify suitable OOH and DOOH opportunities based on geography, format, timing and supply confirmed for the campaign brief.'],
        ['bolt', 'Direct and Programmatic Activation', 'Choose an activation approach that fits the objective, budget, available inventory and participating partner setup.'],
        ['bars', 'Campaign Delivery and Measurement', 'Bring available delivery, performance and measurement signals into a clearer reporting workflow. The exact signals depend on the campaign setup and data availability.'],
        ['bulb', 'Supporting Intelligence from MW Science', `${MWS} can connect available audience, location, media, brand and outcome signals to support planning, measurement and campaign decisions. MW Science Lab’s research network spans 40+ countries, including nine European markets. The specific datasets, research, panel and measurement options for a Bristol campaign are confirmed against the brief and applicable data requirements.`],
        ['globe', 'Multi-City and Regional Coordination', 'Connect Bristol activity with Bath, other UK cities or international markets when the campaign extends beyond one location.'],
      ],
      note: 'The final setup can be tailored around the campaign requirements, existing systems and capabilities available through relevant UK partners.',
      cta: 'Discuss Your Campaign Requirements',
    },
    banner: ['Ready to Plan Your Next Bristol DOOH Campaign?', 'Tell us the audiences, locations, timing and campaign objective you have in mind. We will tailor the conversation around your brief, available inventory, activation approach and measurement priorities.', 'Need broader coverage? Bristol activity can be coordinated with Bath, the wider West of England and other UK markets.'],
    faqs: [
      ['Can Moving Walls support DOOH campaigns across Bristol and the West of England?', 'Yes. Moving Walls can support audience- and location-led planning, direct and programmatic activation, campaign management and measurement workflows across Bristol and relevant regional locations, subject to the brief, available inventory and partner connectivity.'],
      ['Can Bristol DOOH campaigns be activated programmatically?', 'Yes. Moving Walls can support programmatic DOOH activation in Bristol by working with relevant UK media owners and technology partners. The final setup depends on suitable inventory, timing, campaign requirements and available connectivity. Direct activation can also be supported where appropriate.'],
      ['Can we plan activity beyond Bristol city centre?', 'Yes. Campaign planning can consider North Bristol, South Bristol, the airport corridor, Bath and other relevant West of England locations according to the audience, objective and available opportunities.'],
      ['Which Bristol media environments can be considered?', 'Depending on the brief and available inventory, planning may consider transport, roadside, retail, business, education, leisure, event, travel and destination environments.'],
      ['What audience and location data can be used?', 'Available audience, location and mobility intelligence can support planning. The exact datasets, research and panel options are confirmed against the brief and applicable data requirements.'],
      ['What measurement options are available?', 'The appropriate approach depends on the campaign objective, setup and available data. Moving Walls and MW Science can support relevant planning insights, delivery reporting and available performance or measurement signals, with the final scope confirmed for each brief.'],
      ['Can Bristol be combined with other UK or international markets?', 'Yes. Moving Walls can support multi-city planning and coordination when Bristol forms part of a wider regional, UK, European or international campaign.'],
      ['Can we start with one Bristol campaign requirement?', 'Yes. The scope can begin with an immediate requirement such as planning, activation, measurement or research without assuming a full-platform setup.'],
    ],
  },
]

const ITALY = {
  p: 'it', slug: 'italy', name: 'Italy', form: EU_FORM, formLabel: 'Europe',
  heroTitle: 'Plan, Activate and Measure DOOH Across Italy',
  hero: 'Reach business, commuter, retail, tourism, cultural and travel audiences across Italy through a connected DOOH campaign workflow.\n\nMoving Walls helps brands and agencies use available audience and location intelligence to plan relevant placements, support direct or programmatic activation and bring campaign delivery and available measurement signals into a clearer view.',
  heroCta: 'Plan Your Italy DOOH Campaign',
  card: 'Plan DOOH across Milan, Rome, Turin, Bologna, Naples, Florence and Venice, with direct or programmatic activation and clearer measurement.',
  // Market figures from the doc (Section 2 / 3)
  stats: [['€766M', 'OOH market (2025)'], ['€273M', 'DOOH market (2025)'], ['36%', 'DOOH share of OOH'], ['466.2M', 'Overnight stays (2024)']],
  seo: ['DOOH & Billboard Advertising in Italy', 'Plan, activate and measure DOOH across Milan, Rome, Turin, Bologna, Naples, Florence and Venice, with direct or programmatic activation.'],
  connect: {
    title: 'Build an Italy DOOH Strategy Around Audience Movement',
    leads: [
      'Italy combines major metropolitan centres, regional business hubs, high-volume transport networks, retail destinations and globally recognised visitor markets. Campaign planning may need to connect daily commuter movement with seasonal travel, events, shopping activity and local market differences.',
      'Italy’s OOH market reached <strong>€766 million in 2025</strong>, while DOOH reached <strong>€273 million and represented 36% of the total OOH market</strong>. Programmatic DOOH reached <strong>€15.2 million</strong>, showing a growing activation route that still depends on suitable digital inventory and market connectivity.',
      '<a href="/mw-planner" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Planner</a> helps advertisers use available audience and location data to identify placements that are relevant to the brief. Teams can shape plans around geography, timing, audience priorities, campaign objectives and budget before confirming inventory and buying options with participating partners.',
    ],
    steps: [
      ['pin', 'Plan with Audience and Location Context', 'Use available audience, location and mobility intelligence to assess where campaign activity may be most relevant.'],
      ['nodes', 'Select Relevant Media Environments', 'Consider available roadside, transport, airport, retail, business, leisure, cultural and event environments within one campaign plan.'],
      ['bolt', 'Choose the Right Activation Route', 'Use direct or programmatic activation according to the brief, timing, suitable inventory and participating partner setup.'],
      ['bars', 'Connect Delivery and Measurement', 'Bring available delivery, performance and measurement signals into a clearer reporting workflow.'],
    ],
    cta: 'Plan Your Italy DOOH Campaign',
  },
  match: {
    title: 'Plan Around the Audiences and Outcomes That Matter',
    lead: 'Italian DOOH activity can be shaped around different audiences, locations, seasons and campaign objectives.',
    items: [
      ['Reach Business and Professional Audiences', 'Plan around commercial districts, transport hubs, business centres, exhibition venues and relevant commuter routes.'],
      ['Support Retail, Fashion and Luxury Campaigns', 'Consider premium retail areas, shopping destinations, city-centre environments and visitor movement when brand presence and proximity matter.'],
      ['Connect with Domestic and International Visitors', 'Italy recorded 466.2 million overnight stays in 2024, with international visitors accounting for 54.5% of the total. Use location and timing context to plan around relevant tourism, airport, rail, hospitality and cultural environments.'],
      ['Align with Culture, Sport and Major Events', 'Adapt campaign geography, dates, dayparts and creative around relevant festivals, exhibitions, sporting fixtures, conferences and seasonal peaks.'],
      ['Reach Commuters and Urban Residents', 'Consider available roadside, public transport, station, retail and neighbourhood environments based on the audience and campaign brief.'],
      ['Coordinate Multi-City Campaigns', 'Connect activity across Italian markets when the objective requires national reach, regional sequencing or consistent campaign management.'],
    ],
    close: 'Moving Walls helps planners compare available opportunities against the audience and objective rather than applying the same media mix to every Italian market.',
    cta: 'Discuss Your Italy Campaign',
  },
  areas: {
    title: 'Explore Major Italian DOOH Markets',
    leads: ['The most relevant city mix should be selected according to the audience, objective, timing and inventory available through participating Italian media owners and technology partners.'],
    cards: [
      ['bag', 'Milan', 'Plan for business, finance, fashion, luxury, retail, commuter, exhibition and international visitor audiences across Italy’s leading commercial centre.'],
      ['city', 'Rome', 'Reach government, professional, resident, cultural, retail, tourism and travel audiences across the capital and its major transport corridors.'],
      ['bolt', 'Turin', 'Consider automotive, industrial, technology, business, university, commuter, cultural and event audiences across Turin and the wider Piedmont market.'],
      ['cap', 'Bologna', 'Plan around business, university, exhibition, logistics, commuter, retail and regional travel audiences in one of Northern Italy’s key connected markets.'],
      ['mountain', 'Naples', 'Reach retail, resident, business, tourism, cultural and transport audiences in a major Southern Italian urban and travel hub.'],
      ['star', 'Florence', 'Consider international visitors, luxury, fashion, culture, hospitality, retail and regional travel audiences across Florence and Tuscany.'],
      ['wave', 'Venice', 'Plan around tourism, culture, luxury, hospitality, events and travel movement across Venice and relevant mainland connections.'],
      ['train', 'Wider Regional and Travel Corridors', 'Extend planning into other Italian cities, airports, rail corridors, retail destinations and regional markets when the brief requires broader coverage.'],
    ],
    note: 'Available locations, formats and buying options are confirmed against the campaign brief, timing and participating Italian media-owner or technology partners.',
    cta: 'Explore Italy DOOH Opportunities',
  },
  prog: {
    title: 'Support Direct and Programmatic DOOH Activation Across Italy',
    leads: [
      'Moving Walls can support <strong>direct and programmatic activation</strong> in Italy through relevant media owners and technology partners. Teams can identify suitable opportunities, define when and where activity should run and monitor delivery against the agreed campaign setup.',
      'The final activation approach depends on the brief, timing, suitable inventory, creative requirements and partner connectivity. Direct activation can be used where it is the better fit, while programmatic activation can be supported where the required inventory and integrations are available.',
    ],
    cta: 'Discuss Italy Activation Options',
  },
  build: {
    title: 'Build the Italy DOOH Workflow You Need',
    lead: 'Start with the campaign requirement rather than assuming a fixed inventory or technology setup.',
    cards: [
      ['target', 'Audience and Location-Led Planning', 'Use <a href="/mw-planner" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Planner</a> and available audience, location and mobility intelligence to identify relevant markets and placements.'],
      ['search', 'Inventory Discovery and Access', 'Identify suitable OOH and DOOH opportunities based on geography, environment, format, timing and supply confirmed for the campaign brief.'],
      ['bolt', 'Direct and Programmatic Activation', 'Choose an activation route that fits the objective, budget, available inventory and participating partner setup.'],
      ['bars', 'Campaign Delivery and Measurement', 'Bring available delivery, performance and measurement signals into a clearer workflow. The exact signals depend on campaign setup and data availability.'],
      ['bulb', 'Supporting Intelligence from MW Science', `${MWS} can connect available audience, location, media, brand and outcome signals to support planning, research and measurement decisions. Specific datasets, panels, studies and measurement options for an Italian campaign are confirmed against the brief and applicable data requirements.`],
      ['globe', 'European Campaign Coordination', 'Connect Italy with the <a href="/locations/united-kingdom" style="color:#2F5FE0;font-weight:600;text-decoration:none">UK</a>, <a href="/locations/germany" style="color:#2F5FE0;font-weight:600;text-decoration:none">Germany</a>, France or other <a href="/locations/europe" style="color:#2F5FE0;font-weight:600;text-decoration:none">European markets</a> when the campaign extends beyond one country.'],
    ],
    note: 'The final workflow can be tailored around campaign requirements, existing systems and capabilities available through relevant partners.',
    cta: 'Discuss Your Campaign Requirements',
  },
  banner: ['Ready to Plan Your Italy DOOH Campaign?', 'Tell us the audiences, cities, timing and campaign objective you have in mind. We will tailor the conversation around your brief, available inventory, activation approach and measurement priorities.'],
  faqs: [
    ['Can Moving Walls support DOOH campaigns across Italy?', 'Yes. Moving Walls can support audience- and location-led planning, direct and programmatic activation, campaign management and measurement workflows across Italy, subject to the brief, available inventory and partner connectivity.'],
    ['Can Italian DOOH campaigns be activated programmatically?', 'Yes. Moving Walls can support programmatic DOOH activation in Italy through relevant media owners and technology partners. The final setup depends on suitable inventory, timing, campaign requirements and available connectivity. Direct activation can also be supported where appropriate.'],
    // The doc's answer was a writer's note ("The page should not imply ownership..."), so it is phrased as a customer-facing answer
    ['Does Moving Walls own DOOH inventory in Italy?', 'Moving Walls works with relevant Italian media owners and technology partners rather than a fixed nationwide inventory. Suitable opportunities are identified and confirmed based on the campaign brief.'],
    ['Which Italian cities can be included?', 'Campaign planning can consider Milan, Rome, Turin, Bologna, Naples, Florence, Venice and other relevant markets according to the audience, objective, timing and available opportunities.'],
    ['Which media environments can be considered?', 'Depending on the brief and available supply, planning may consider roadside, public transport, rail, airport, retail, business, leisure, cultural, hospitality and event environments.'],
    ['Can Moving Walls support audience-led planning in Italy?', 'Yes. MW Planner can use available audience, location and mobility intelligence to support market and placement planning. The specific data available is confirmed against the brief.'],
    ['What measurement options are available?', 'Available delivery, performance and measurement signals depend on campaign setup, partner reporting and data availability. MW Science can support research and measurement design where relevant options are available.'],
    ['Can Italy be combined with other European markets?', 'Yes. Moving Walls can support multi-market planning and coordination when Italy forms part of a wider European or international campaign.'],
  ],
}

// Hero photos Dg supplied 6 Nov 2026 (Desktop outdoor-advertising-in-<name>.webp)
const heroImg = (ref, alt) => ({ _type: 'image', alt, asset: { _type: 'reference', _ref: ref } })
UK_PAGES[0].hero_img = heroImg('image-db9632a468606a10967124d730690c671c7d84f6-960x540-webp', 'Outdoor advertising in Glasgow')
UK_PAGES[1].hero_img = heroImg('image-315a847d400531d6eb879386ae0e660dd546e358-960x540-webp', 'Outdoor advertising in Bristol')
ITALY.hero_img = heroImg('image-b1834530a150df0b50615e016024727af05f7dcf-960x540-webp', 'Outdoor advertising in Italy')

const logos = man.sections.find((s) => s._type === 'logoCarousel')
const shell = (d) => ({
  heroTitle: d.heroTitle,
  fullDescription: d.hero,
  description: d.card,
  ctaButtonText: d.heroCta,
  showAllLocationsButton: true,
  contactFormUrl: d.form,
  isActive: true,
  sectionsPosition: 'before-faqs',
  faqs: d.faqs.map(([question, answer]) => ({ _key: k(), question, answer })),
  sections: [
    { ...manEmbed, _key: k(), code: build(d.p, d) },
    { ...logos, _key: k() },
    { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: d.banner[0], subheading: d.banner[1], ctaText: 'Request a Demo', ctaLink: d.form, ...(d.banner[2] ? { note: d.banner[2] } : {}) },
  ],
  seo: { _type: 'seo', metaTitle: d.seo[0], metaDescription: d.seo[1], enableKeywords: false, noIndex: false },
})

const tx = c.transaction()
for (const d of UK_PAGES) {
  const ID = `city-uk-${d.slug}`
  if (await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$uk && !(_id in [$id, "drafts." + $id])])', { s: d.slug, uk: UK, id: ID })) throw new Error('Already exists: ' + d.slug)
  tx.createOrReplace({
    _id: `drafts.${ID}`, _type: 'locationCity', city: d.name, slug: { _type: 'slug', current: d.slug },
    country: { _type: 'reference', _ref: UK }, order: d.order,
    ...shell(d),
    heroImage: d.hero_img,
    seo: { ...shell(d).seo, ogImage: d.hero_img },
  })
}
const IT_ID = 'location-italy'
if (await c.fetch('count(*[_type=="location" && slug.current=="italy" && !(_id in [$id, "drafts." + $id])])', { id: IT_ID })) throw new Error('Italy page already exists')
tx.createOrReplace({
  _id: `drafts.${IT_ID}`, _type: 'location', country: 'Italy', slug: { _type: 'slug', current: 'italy' },
  stats: ITALY.stats.map(([value, label]) => ({ _key: k(), value, label })),
  ...shell(ITALY),
  heroImage: ITALY.hero_img,
  seo: { ...shell(ITALY).seo, ogImage: ITALY.hero_img },
})

// Europe page: the "Explore DOOH Across Europe" Italy card becomes a link, like Germany and the UK
const euEmbed = europe.sections.find((s) => s._type === 'customEmbed')
const STATIC_IT = /<div class="mw-eu-country__card mw-eu-country__card--static">(\s*<div class="mw-eu-country__top">\s*<span class="mw-eu-country__code">IT<\/span>[\s\S]*?<\/ul>\s*)<\/div>/
if (!STATIC_IT.test(euEmbed.code)) throw new Error('Italy card not found on the Europe page')
const ARROW_EU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
const euCode = euEmbed.code.replace(STATIC_IT, (_, inner) => `<a class="mw-eu-country__card" href="https://www.movingwalls.com/locations/italy">${inner}  <span class="mw-eu-country__link">Explore Italy ${ARROW_EU}</span>\n      </a>`)
if (await c.getDocument('drafts.' + EUROPE_ID)) throw new Error('A Europe draft already exists')
const { _rev, _createdAt, _updatedAt, ...eu } = europe
tx.create({ ...eu, _id: 'drafts.' + EUROPE_ID, sections: europe.sections.map((s) => (s === euEmbed ? { ...s, code: euCode } : s)) })

await tx.commit()
console.log('Drafts created: /locations/united-kingdom/glasgow, /locations/united-kingdom/bristol, /locations/italy, Europe page (Italy card linked)')
