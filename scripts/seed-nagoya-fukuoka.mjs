// Creates DRAFTS (6 Nov 2026):
//  - Nagoya and Fukuoka city pages under Japan (/locations/japan/nagoya|fukuoka) from the "Japan Revised Landing
//    pages" Google Doc. Same look as the live Osaka page (its section CSS is reused), Japan contact form.
//    Hero photos: free images shared by Yoshinori Hayashi (Japan), converted to webp
//    (Desktop dooh-advertising-nagoya.webp = Nagoya Station towers, dooh-advertising-fukuoka.webp = Tenjin).
//    Hero: short H1 "DOOH Advertising in <City>", with the doc's H1 as the smaller hero subtitle (Dg, 6 Nov 2026).
//  - Tokyo and Osaka pages: a new "featured screens" section built from Yoshinori's
//    "Onlive MASTRUM media list 1.xlsx": only screens with a photo in the list; names, sizes and counts only
//    (no impressions or prices).
//    It also hides the stray "1. 2. 3. 4." list numbers on Osaka's live "From Audience Insight" steps.
// The Nagoya doc's secondary CTAs ("Download the ... Pitch Template / Measurement Whitepaper") are left out:
// those downloads do not exist yet.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const JAPAN = 'NUzgRk9h7jKjntS8pyrlSM'
const TOKYO = '79cd7489-2321-4bfe-8419-d6ef320ef519'
const OSAKA = 'ed07e54b-39b1-4f37-a1fc-09e78d0a1dd3'
const k = () => Math.random().toString(36).slice(2, 14)

const osaka = await c.getDocument(OSAKA)
const FORM = osaka.contactFormUrl // JapanContact
const osakaEmbed = osaka.sections.find((s) => s._type === 'customEmbed')
const logos = osaka.sections.find((s) => s._type === 'logoCarousel')
// Osaka section CSS, renamed to a new section prefix
const styleOf = (name, prefix) => {
  const m = osakaEmbed.code.match(new RegExp(`<section class="mw-os-${name}">\\s*(<style>[\\s\\S]*?</style>)`))
  if (!m) throw new Error('No Osaka style for ' + name)
  return m[1].replace(new RegExp(`mw-os-${name}`, 'g'), prefix)
}

const ICON = {
  pin: '<path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  nodes: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><line x1="8" y1="7.5" x2="10.5" y2="16"/><line x1="16" y1="7.5" x2="13.5" y2="16"/><line x1="8.5" y1="6" x2="15.5" y2="6"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  bars: '<line x1="4" y1="20" x2="4" y2="13"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="20" y1="20" x2="20" y2="15"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  search: '<circle cx="10" cy="10" r="6"/><line x1="21" y1="21" x2="15" y2="15"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3.3" y1="12" x2="20.7" y2="12"/>',
  city: '<rect x="3" y="10" width="5" height="11"/><rect x="10" y="6" width="5" height="15"/><rect x="17" y="13" width="4" height="8"/><line x1="2" y1="21" x2="22" y2="21"/>',
  bag: '<path d="M6 8V6a6 6 0 0 1 12 0v2"/><rect x="3" y="8" width="18" height="13" rx="2"/><line x1="3" y1="13" x2="21" y2="13"/>',
  plane: '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
  train: '<rect x="5" y="4" width="14" height="13" rx="3"/><line x1="5" y1="10" x2="19" y2="10"/><circle cx="9" cy="14.5" r="1.2"/><circle cx="15" cy="14.5" r="1.2"/><path d="M8 20l-2 2"/><path d="M16 20l2 2"/>',
  star: '<polygon points="12 2 15 9 22 9.5 16.5 14 18 21 12 17 6 21 7.5 14 2 9.5 9 9"/>',
  wave: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 3v5"/>',
  road: '<path d="M8 3 4 21"/><path d="M16 3l4 18"/><line x1="12" y1="5" x2="12" y2="8"/><line x1="12" y1="11" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="20"/>',
  car: '<path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><line x1="5" y1="12" x2="19" y2="12"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15 20c0-2.5 1.5-4.5 4-5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>',
  screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/>',
  ship: '<path d="M3 17l2 4h14l2-4H3z"/><path d="M6 17V9h12v8"/><line x1="12" y1="3" x2="12" y2="9"/>',
  check: '<circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9.5"/>',
}
const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[name]}</svg>`
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'

// Button colours: the site-wide ".custom-embed a" rule otherwise beats the section's own button style
const fixBtns = (p) => `<style>
  ${['match', 'areas', 'screens', 'prog', 'build'].map((s) => `.custom-embed .mw-${p}-${s}__btn`).join(', ')}{ color:#fff !important; text-decoration:none !important; }
  .custom-embed .mw-${p}-connect__btn{ color:#2F5FE0 !important; text-decoration:none !important; }
  .custom-embed .mw-${p}-connect__btn:hover{ color:#fff !important; }
  .custom-embed .mw-${p}-connect__steps > li, .custom-embed .mw-os-delivery__steps > li{ list-style:none !important; }
  .custom-embed .mw-${p}-note{ max-width:900px; margin:20px auto 0; text-align:center; font-size:13.5px; line-height:1.6; color:#5B6472; font-style:italic; }
</style>`
const bg = (cls, colour) => `<style>.${cls}{ background:${colour} !important; }</style>`
const leads = (cls, arr) => arr.map((t) => `<p class="${cls}__lead" style="margin-top:12px">${t}</p>`).join('\n      ')
const btn = (cls, text) => (text ? `
    <div class="${cls}__cta">
      <a class="${cls}__btn" href="${FORM}">${text} ${ARROW}</a>
    </div>` : '')
const note = (p, text) => (text ? `\n    <p class="mw-${p}-note">${text}</p>` : '')
const cards = (cls, items, spec = false) => items.map(([icon, h, t, s]) => `
      <div class="${cls}__card">
        <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
        <h3>${h}</h3>
        <p>${t}</p>${spec && s ? `\n        <p style="margin-top:10px;font-size:12.5px;font-weight:700;color:#2F5FE0">${s}</p>` : ''}
      </div>`).join('')

// Section builders (Osaka styles: glance = stats, delivery = 4 steps, why / districts = 3-col cards, env = 4-col cards)
const glance = (p, title, stats, source) => {
  const cls = `mw-${p}-glance`
  return `<section class="${cls}">
  ${styleOf('glance', cls).replace('</style>', `  @media (min-width:900px){ .${cls}__stats{ grid-template-columns:repeat(${stats.length},1fr); } }\n  </style>`)}
  <div class="${cls}__container">
    <h2 class="${cls}__title">${title}</h2>
    <div class="${cls}__stats">${stats.map(([n, l]) => `
      <div class="${cls}__stat">
        <p class="${cls}__num">${n}</p>
        <p class="${cls}__label">${l}</p>
      </div>`).join('')}
    </div>${note(p, source)}
  </div>
</section>`
}
const steps = (p, name, d) => {
  const cls = `mw-${p}-${name}`
  return `<section class="${cls}">
  ${styleOf('delivery', cls)}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      ${d.eyebrow ? `<p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2F5FE0">${d.eyebrow}</p>` : ''}
      <h2 class="${cls}__title">${d.title}</h2>
      ${leads(cls, d.leads)}
    </div>
    <ol class="${cls}__steps">${d.steps.map(([icon, h, t], i) => `
      <li class="${cls}__step">
        <div class="${cls}__icon-wrap">
          <span class="${cls}__icon" aria-hidden="true">${svg(icon)}</span>
          <span class="${cls}__badge">0${i + 1}</span>
        </div>
        <h3>${h}</h3>
        <p>${t}</p>
      </li>`).join('')}
    </ol>${d.cta ? `
    <div class="${cls}__cta" style="justify-content:center">
      <a class="${cls}__btn" href="${FORM}">${d.cta} ${ARROW}</a>
    </div>` : ''}
  </div>
</section>`
}
const grid = (p, name, style, d, background) => {
  const cls = `mw-${p}-${name}`
  return `<section class="${cls}">
  ${styleOf(style, cls)}${background ? bg(cls, background) : ''}
  <div class="${cls}__container">
    <div class="${cls}__intro">
      ${d.eyebrow ? `<p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2F5FE0">${d.eyebrow}</p>` : ''}
      <h2 class="${cls}__title">${d.title}</h2>
      ${leads(cls, d.leads || [])}
    </div>
    <div class="${cls}__grid">${cards(cls, d.cards || [], true)}
    </div>${note(p, d.note)}${btn(cls, d.cta)}
  </div>
</section>`
}
// Text-only section (programmatic / buying), Osaka "why" style without cards
const prose = (p, name, d, background) => {
  const cls = `mw-${p}-${name}`
  return `<section class="${cls}">
  ${styleOf('why', cls)}${background ? bg(cls, background) : ''}
  <div class="${cls}__container">
    <div class="${cls}__intro" style="max-width:900px">
      <h2 class="${cls}__title">${d.title}</h2>
      ${leads(cls, d.leads)}
    </div>${btn(cls, d.cta)}
  </div>
</section>`
}

// ---- Featured screens from the MASTRUM media list (Yoshinori, 6 Nov 2026) ----
// Only screens whose row in the list links a photo are shown (Dg, 6 Nov 2026). Nagoya and Fukuoka have no
// city screen with a photo, so they get no screens section. Photos are the media owners' own images
// (some are mock-ups), downloaded from the list's Drive links and converted to webp.
const SHOTS = 'C:/Users/admin/AppData/Local/Temp/claude/2b2d14aba91acf9d/a43eb24c-7bbe-4357-b473-79a9d4af0bcc/scratchpad/jp/screens/'
const shot = async (name) => (await c.assets.upload('image', fs.createReadStream(SHOTS + name + '.webp'), { filename: name + '.webp' })).url
const SCREENS_NOTE = 'From the MASTRUM media list; images supplied by the media owners. Some screens are bought programmatically; others are booked by the week. Availability, formats and buying options are confirmed for each brief.'
const SCREENS = {
  tokyo: [
    ['mastrum-shibuya-mega-wall', 'Shibuya Mega Wall Vision', 'Large-format vertical screen in Shibuya, one of Tokyo’s busiest youth, retail and entertainment districts.', 'Shibuya · 13.0m × 6.0m · 9 AM–midnight'],
    ['mastrum-akihabara-wide-wall', 'Akihabara Wide Wall 135°', 'Wide-angle corner screen in Akihabara, reaching shoppers, visitors and pop-culture audiences.', 'Akihabara · 3.75m × 11.75m · 9 AM–midnight'],
    ['mastrum-jad-vision-shinjuku', 'JAD Vision Station Network', 'Programmatic vertical and horizontal screens in JR East stations such as Shinjuku, Shinagawa, Gotanda and Yurakucho, bought by impression.', 'About 370 screens at around 120 Tokyo stations'],
    ['mastrum-tokyo-dome-city-visions', 'Tokyo Dome City Visions', 'Six large screens around Tokyo Dome City, including the 22 Gate Plaza and MEETS PORT visions, reaching event, sport and leisure crowds.', 'Tokyo Dome City · up to 6.0m × 14.0m'],
    ['mastrum-keikyu-haneda-airport', 'Keikyu Station Vision, Haneda Airport', 'Station screens at Haneda Airport Terminals 1, 2 and 3 on the Keikyu line, reaching domestic and international travellers.', '6 screens · up to 1.7m × 4.86m'],
    ['mastrum-jr-above-door-channel', 'JR Above-the-Door Channel', 'A screen above each door on trains across nine JR East lines, including the Yamanote line, reaching commuters throughout the day.', '37,690 in-train screens · Tokyo, Saitama, Kanagawa'],
  ],
  osaka: [
    ['mastrum-kintetsu-namba-urban-vision', 'Kintetsu Namba Urban Vision', 'Station screens at Osaka Namba Station on the Kintetsu line, at the heart of the Namba entertainment and shopping district.', 'Namba · 23 screens · 1.6m × 0.9m'],
  ],
}
const screensSection = async (p, city, extraLead) => {
  const cls = `mw-${p}-screens`
  const items = await Promise.all(SCREENS[city.toLowerCase()].map(async ([img, h, t, spec]) => ({ src: await shot(img), h, t, spec })))
  const single = items.length === 1
  return `<section class="${cls}">
  ${styleOf('districts', cls)}${bg(cls, '#F6F8FC')}<style>
    .${cls}__card{ padding:0 !important; overflow:hidden; }
    .${cls}__media{ aspect-ratio:16/10; background:#EAF0FE; overflow:hidden; }
    .${cls}__media img{ width:100%; height:100%; object-fit:cover; display:block; margin:0; }
    .${cls}__body{ padding:22px 24px 24px; }
    .custom-embed .${cls}__spec{ margin-top:10px !important; font-size:12.5px !important; font-weight:700; color:#2F5FE0 !important; }${single ? `
    .${cls}__grid{ grid-template-columns:1fr !important; max-width:820px; margin:0 auto; }
    .${cls}__media{ aspect-ratio:auto; }
    .${cls}__media img{ height:auto; }` : ''}
  </style>
  <div class="${cls}__container">
    <div class="${cls}__intro">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2F5FE0">MASTRUM Inventory</p>
      <h2 class="${cls}__title">Featured Screens for ${city} Campaigns</h2>
      <p class="${cls}__lead" style="margin-top:12px">A selection of screens available through MASTRUM, the DOOH marketplace powered by Moving Walls technology with JR East Marketing &amp; Communications (jeki).${extraLead ? ' ' + extraLead : ''}</p>
    </div>
    <div class="${cls}__grid">${items.map((s) => `
      <div class="${cls}__card">
        <div class="${cls}__media"><img src="${s.src}" alt="${s.h}" loading="lazy"></div>
        <div class="${cls}__body">
          <h3>${s.h}</h3>
          <p>${s.t}</p>
          <p class="${cls}__spec">${s.spec}</p>
        </div>
      </div>`).join('')}
    </div>${note(p, SCREENS_NOTE)}${btn(cls, `Ask About ${city} Screens`)}
  </div>
</section>`
}

// ---- Nagoya ----
const NAGOYA = {
  p: 'ng', slug: 'nagoya', name: 'Nagoya',
  h1: 'DOOH Advertising in Nagoya',
  sub: 'Nagoya DOOH in Japan’s Automotive Capital: Nearly 3x Tokyo’s Cars per Household',
  hero: 'Nagoya is Japan’s fourth-largest city, home to 2.34 million people, and the commercial centre of a region built on manufacturing: Aichi Prefecture has recorded Japan’s largest value of manufactured goods shipments every year since 1977. Its automotive industry, extensive highway network and reliance on private vehicles and company cars create distinct opportunities for out-of-home advertising, from roadside corridors connecting manufacturing hubs to the commuter centres of Meieki and Sakae.\n\nMoving Walls helps brands, agencies and media owners plan Nagoya DOOH around audience, location and traffic intelligence, activate directly or programmatically, and bring delivery and measurement into one view. In Japan, our platform technology already powers MASTRUM, the DOOH marketplace launched with JR East Marketing & Communications (jeki).',
  heroCta: 'Plan Your Nagoya Campaign',
  card: 'Reach Nagoya’s commuters, drivers and decision-makers across Meieki, Sakae and Aichi’s industrial corridors, with roadside and programmatic DOOH.',
  seo: ['DOOH & Billboard Advertising in Nagoya', 'Plan roadside and programmatic DOOH in Nagoya across Meieki, Sakae, Chubu Centrair and Aichi’s industrial corridors, with traffic-led measurement.'],
  img: ['dooh-advertising-nagoya.webp', 'Nagoya Station district (Meieki), Nagoya'],
  banner: ['Ready to Plan Your Nagoya DOOH Campaign?', 'Tell us who you want to reach, which parts of Nagoya or Chubu matter, your dates and what the campaign needs to achieve. We’ll shape the plan around available inventory, the right buying route and how you want to measure results.', 'Taking a Chubu brand overseas? Ask about international DOOH planning.'],
}
NAGOYA.code = [
  glance('ng', 'Nagoya at a Glance', [
    ['2.34M', 'Nagoya residents'],
    ['Nearly 3x', 'Aichi’s private cars per household vs Tokyo: 1.198 vs 0.401 (March 2026)'],
    ['No. 1', 'In Japan for manufactured goods shipments, every year since 1977 (Aichi)'],
    ['11.0M', 'Passengers through Chubu Centrair (FY2024)'],
  ], 'Source: AIRIA, March 2026. The vehicle ownership comparison is between Aichi Prefecture and Tokyo, not Nagoya city.'),
  steps('ng', 'connect', {
    eyebrow: 'Connect Nagoya’s Districts, Commuters and Region',
    title: 'One Plan for the City and the Wider Chubu Market',
    leads: [
      'A Nagoya campaign rarely stops at the city line. Commuters travel in from across Aichi, Gifu and Mie, with private vehicles and company cars playing an important role in daily movement. Business activity is concentrated around manufacturing headquarters, industrial corridors and central commercial districts. Shopping, dining and nightlife also concentrate in a few key areas.',
      'These movement patterns create opportunities for roadside DOOH to build repeated exposure among business professionals and decision-makers travelling along their daily driving routes. As digital customer acquisition costs rise, advertisers are placing greater emphasis on accountable media investments.',
      'Moving Walls helps you compare available media opportunities by audience, area, timing and budget, then carry those choices through activation and reporting.',
    ],
    steps: [
      ['users', 'Start From the Audience', 'Use available audience, location and mobility data to see where your target customers are most likely to be, by district and time of day.'],
      ['nodes', 'Compare Environments Side by Side', 'Weigh station, street-level, retail, roadside, office-district and airport opportunities in a single plan.'],
      ['bolt', 'Pick the Buying Route That Fits', 'Run direct, programmatic or a mix, depending on the brief, dates, screens available and partner connectivity in Japan.'],
      ['bars', 'See Delivery in One Place', 'Bring campaign delivery and available performance signals into one consistent report.'],
    ],
    cta: 'See How Nagoya Planning Works',
  }),
  grid('ng', 'match', 'why', {
    eyebrow: 'Match the Campaign to Your Nagoya Objective',
    title: 'Different Goals, Different Nagoya Plans',
    cards: [
      ['globe', 'Launch or Grow Awareness Across Chubu', 'Combine central Nagoya with surrounding Aichi, Gifu and Mie markets when the brief needs regional reach rather than a single district.'],
      ['train', 'Reach Commuters and Office Workers', 'Focus on station concourses, subway connections and the Meieki and Fushimi office areas during weekday peaks. Complement these placements with roadside DOOH to reach motorists and passengers along their regular commuting routes.'],
      ['car', 'Drive Automotive and Dealership Visits', 'Use roadside DOOH placements along major traffic corridors to build repeated exposure among motorists. Where geofenced mobile retargeting is available in Japan, combine roadside advertising with retargeting to encourage visits to automotive dealerships.'],
      ['home', 'Generate Real Estate Leads', 'Use roadside DOOH to reach audiences travelling through relevant residential and commercial development areas. Where geofenced mobile retargeting is available in Japan, it can be explored to support real estate lead generation.'],
      ['bag', 'Drive Retail and Store Visits', 'Plan around Sakae, the department stores around Nagoya Station and suburban shopping centres when proximity to purchase matters.'],
      ['briefcase', 'Reach B2B Decision-Makers and Technical Talent', 'Target manufacturing and business corridors for B2B SaaS, executive and technical recruitment, and business services campaigns.'],
      ['plane', 'Speak to Business Travellers and Visitors', 'Use Shinkansen arrivals, hotels and Centrair to reach domestic business travellers and inbound visitors.'],
      ['calendar', 'Time Activity to Events', 'Shape dates and dayparts around trade shows, sports fixtures and large events. The region showed its event pull as host of the 20th Asian Games, Aichi-Nagoya 2026, held from 19 September to 4 October with 46 participating teams and 469 medal events.'],
      ['nodes', 'Connect Nagoya with Tokyo, Osaka and Beyond', 'Run Nagoya as one market in a national Japan plan, or alongside international markets, with the same planning and reporting workflow.'],
    ],
    cta: 'Discuss Your Nagoya Campaign',
  }),
  grid('ng', 'areas', 'districts', {
    eyebrow: 'Key Nagoya Areas and Corridors',
    title: 'Where Nagoya Audiences Gather',
    leads: ['Nagoya’s audiences cluster in a handful of districts and travel corridors. The right mix depends on the objective, the dates and the screens available through participating media partners. Nagoya’s extensive road network also creates opportunities to reach audiences through roadside advertising along major traffic arteries.'],
    cards: [
      ['train', 'Meieki (Nagoya Station District)', 'The city’s main gateway and business district, where the Tokaido Shinkansen, JR, Meitetsu, Kintetsu and subway lines meet. Nagoya Station is described as the world’s largest station by floor area, and the surrounding towers mix offices, hotels and department stores.'],
      ['bag', 'Sakae', 'Nagoya’s central shopping, dining and entertainment district, around Hisaya-odori Park and the Nagoya TV Tower. Suited to retail, fashion, beauty and food brands.'],
      ['briefcase', 'Fushimi and Marunouchi', 'Office and financial districts between Meieki and Sakae, reaching professional and weekday audiences.'],
      ['pin', 'Kanayama and Osu', 'Kanayama is a major rail interchange between central Nagoya and Centrair; Osu is a busy shopping street popular with younger audiences and visitors.'],
      ['plane', 'Chubu Centrair International Airport', 'The region’s international and domestic gateway, with 11.0 million passengers in fiscal 2024, reaching business travellers, inbound visitors and outbound residents.'],
      ['road', 'Aichi’s Industrial and Suburban Corridors', 'The roads and rail lines linking Nagoya with Toyota City, Kariya, Okazaki and other manufacturing centres, where the Toyota group and its suppliers are based. Useful for B2B, recruitment, automotive and suburban retail campaigns.'],
    ],
    note: 'Available locations, formats and buying options are confirmed against the brief, timing and participating Japanese media owners.',
    cta: 'Explore Nagoya DOOH Opportunities',
  }),
  prose('ng', 'prog', {
    title: 'Roadside DOOH and Programmatic Activation in Nagoya',
    leads: [
      'Nagoya’s automotive-centric economy and extensive highway network create opportunities for roadside DOOH advertising. High volumes of daily vehicle movement along major traffic arteries provide opportunities to reach motorists, passengers, business professionals and decision-makers through repeated exposure along their regular driving routes.',
      'Through roadside DOOH and traffic intelligence, traditional roadside billboard inventory can become more measurable and programmatic. Where available in Japan, vehicular traffic data and location-based telemetry can support impression counts and reach measurement, helping agencies move from subjective media planning towards data-driven premium advertising solutions.',
      'Some Nagoya campaigns need specific landmark screens booked for fixed dates; others need flexible delivery across many screens by audience and daypart. Moving Walls supports both. <strong>Direct activation</strong> secures particular sites, while <strong>programmatic DOOH</strong> lets you set districts, times, budgets and audience signals and buy the ad plays that match.',
      'In Japan, Moving Walls technology powers MASTRUM, the impression-based DOOH platform launched with jeki, whose first phase brought about 34,000 screens onto one system. Which Nagoya screens can be bought programmatically depends on the media owners and integrations available for your campaign.',
    ],
    cta: 'Discuss Nagoya Activation Options',
  }),
  grid('ng', 'build', 'why', {
    eyebrow: 'Choose What You Need Now',
    title: 'Build the Nagoya Workflow Around Your Team',
    cards: [
      ['target', 'Audience and Location Planning', 'Compare Nagoya districts and screens against your target audience and forecast reach and frequency.'],
      ['search', 'Inventory Discovery', 'Find suitable DOOH and OOH opportunities by area, format and dates.'],
      ['bolt', 'Activation', 'Book directly, buy programmatically, or combine both.'],
      ['bars', 'Delivery and Measurement', 'Bring campaign delivery, reach, available impression counts and performance signals into one report, with brand lift studies where the brief requires them.'],
      ['bulb', 'Supporting Intelligence from MW Science', '<a href="/mw-science" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Science</a> connects audience, location, media, brand and outcome signals to support planning and measurement. The datasets and research options for a Japan campaign are confirmed against the brief and applicable data requirements.'],
      ['globe', 'Multi-City and Multi-Country Coordination', 'Combine Nagoya with <a href="/locations/japan/tokyo" style="color:#2F5FE0;font-weight:600;text-decoration:none">Tokyo</a>, <a href="/locations/japan/osaka" style="color:#2F5FE0;font-weight:600;text-decoration:none">Osaka</a> or international markets in one workflow.'],
    ],
    cta: 'Discuss Your Campaign Requirements',
  }, '#F6F8FC'),
  grid('ng', 'whymw', 'env', {
    title: 'Why Moving Walls',
    cards: [
      ['check', 'Local Platform Experience', 'Our technology already runs Japan’s MASTRUM DOOH marketplace with jeki.'],
      ['users', 'Audience-Led Planning', 'Start from who you want to reach, not a list of screens.'],
      ['road', 'Roadside Measurement Opportunities', 'Use traffic intelligence and location-based data to support impression counts and reach measurement.'],
      ['globe', 'One Workflow Across Markets', 'Plan Nagoya, the rest of Japan and overseas markets the same way.'],
      ['bars', 'Consistent Reporting', 'Compare delivery across districts, cities and countries.'],
    ],
  }, '#FFFFFF').replace('</style>', '  .mw-ng-whymw__grid{ grid-template-columns:repeat(auto-fit,minmax(200px,1fr)) !important; }\n  </style>'),
].join('\n\n')
NAGOYA.faqs = [
  ['Can Moving Walls support DOOH campaigns in Nagoya?', 'Yes. Moving Walls supports audience- and location-led planning, direct and programmatic activation and measurement for Nagoya campaigns, including roadside DOOH opportunities.'],
  ['Can Nagoya campaigns be bought programmatically?', 'Where screens are connected to programmatic supply, yes. Moving Walls technology powers Japan’s MASTRUM platform with jeki, and direct booking is available when a campaign needs specific sites.'],
  ['Can roadside DOOH reach regular commuters in Nagoya?', 'Yes. Roadside DOOH can build repeated exposure among motorists, passengers and business professionals travelling along their regular driving routes.'],
  ['How can roadside DOOH campaigns be measured?', 'Where available in Japan, vehicular traffic intelligence and location-based telemetry can support impression counts and reach measurement along major traffic arteries, helping agencies demonstrate ROI to advertisers while giving media owners a basis to evaluate roadside advertising opportunities.'],
  ['Which Nagoya industries can benefit from DOOH advertising?', 'Automotive, real estate, B2B SaaS and executive or technical recruitment are relevant categories for Nagoya’s manufacturing-led economy, business districts and extensive road network.'],
  ['Can DOOH campaigns support automotive dealership visits and real estate leads?', 'Roadside DOOH can support these campaign objectives. Geofenced mobile retargeting can also be explored where the capability is available in Japan and applicable data permissions are in place.'],
  ['Which Nagoya areas can a campaign cover?', 'Plans can include Meieki, Sakae, Fushimi and Marunouchi, Kanayama and Osu, Chubu Centrair and the wider Aichi, Gifu and Mie region, depending on the objective and available screens.'],
  ['Can a Nagoya campaign run with Tokyo and Osaka?', 'Yes. Nagoya can be one market in a national Japan plan, planned and reported in the same workflow.'],
  ['How are Nagoya campaigns measured?', 'The approach depends on the objective and available data. Moving Walls can provide delivery reporting, impressions, reach and frequency, location performance and brand lift where the brief calls for it.'],
  ['Can Nagoya brands use Moving Walls for overseas campaigns?', 'Yes. Moving Walls provides access to more than one million sites across 50+ markets, so a Chubu brand can test one overseas market or run several from one platform.'],
]

// ---- Fukuoka ----
const FUKUOKA = {
  p: 'fk', slug: 'fukuoka', name: 'Fukuoka',
  h1: 'DOOH Advertising in Fukuoka',
  sub: 'Data-Driven DOOH Advertising in Fukuoka, Kyushu’s Gateway to Asia',
  hero: 'Fukuoka is a dynamic regional hub in northern Kyushu, known for its vibrant urban environment, strong economic activity and international connectivity. With an estimated population of 1.67 million as of October 2026, the city combines a diverse resident population with a steady flow of international visitors, particularly from South Korea and other Asian markets.\n\nMoving Walls helps brands, agencies and media owners reach Fukuoka’s residents, students and international visitors through audience- and location-led DOOH planning. By combining high-frequency urban touchpoints with programmatic activation and mobile engagement strategies, campaigns can connect physical advertising exposure with subsequent digital interactions and campaign measurement.',
  heroCta: 'Plan Your Fukuoka Campaign',
  card: 'Reach Fukuoka’s residents, students and international visitors across Tenjin, Hakata Station, the airport and Hakata Port with data-driven DOOH.',
  seo: ['DOOH & Billboard Advertising in Fukuoka', 'Plan data-driven DOOH in Fukuoka across Tenjin, Hakata Station, Fukuoka Airport and Hakata Port, reaching residents and international visitors.'],
  img: ['dooh-advertising-fukuoka.webp', 'Tenjin district, Fukuoka'],
  banner: ['Ready to Reach Fukuoka?', 'Tell us whether you’re looking to reach Fukuoka’s residents, students or international visitors, connect DOOH exposure with digital engagement, or expand campaigns across Kyushu. Moving Walls can help shape a strategy around your audience, available inventory, buying preferences and measurement objectives.', 'Exploring new ways to demonstrate DOOH campaign performance? Speak with us about Fukuoka market opportunities and measurement approaches.'],
}
FUKUOKA.code = [
  glance('fk', 'Fukuoka at a Glance', [
    ['1.67M', 'Fukuoka City residents (October 2026)'],
    ['8%', 'Of Japan’s international air passengers through Fukuoka Airport (2025)'],
    ['No. 1', 'Japanese port for foreign cruise calls: Hakata, 193 calls (2024)'],
  ], 'Fukuoka Airport accounted for 8% of Japan’s record 114.4 million international air passengers in 2025, while Hakata Port recorded 193 foreign cruise ship calls in 2024, the highest among Japanese ports.'),
  steps('fk', 'connect', {
    eyebrow: 'A Compact City With a Wide Reach',
    title: 'Plan Fukuoka and the Kyushu Market Together',
    leads: [
      'Fukuoka’s compact urban layout brings Tenjin, Hakata Station and Fukuoka Airport within a short distance of one another, creating concentrated pedestrian movement across key commercial and transport hubs. Its mix of students, young professionals and consumers also contributes to activity around retail, entertainment and lifestyle destinations.',
      'As Kyushu’s primary commercial and trendsetting hub, Fukuoka offers brands an opportunity to test campaigns locally before extending them across Kitakyushu, Kumamoto, Kagoshima and the wider region.',
      'Moving Walls helps agencies and media owners move beyond traditional location-based media selection by using audience, location and impression data to plan campaigns, evaluate inventory and demonstrate campaign delivery to advertisers.',
    ],
    steps: [
      ['users', 'Find Your Audience First', 'Use available audience, location and mobility data to identify districts and time slots that align with your target customers and campaign objectives.'],
      ['nodes', 'Mix City Environments', 'Combine station, street-level, retail, office, airport and port opportunities in one plan, subject to available inventory.'],
      ['bolt', 'Choose How You Buy', 'Book specific sites directly, buy programmatically, or use both.'],
      ['bars', 'Report in One Place', 'Consolidate campaign delivery, impressions, reach and available performance signals to provide advertisers with a clearer view of campaign outcomes.'],
    ],
  }),
  grid('fk', 'match', 'why', {
    eyebrow: 'Match the Plan to Your Fukuoka Goal',
    title: 'What Do You Need Fukuoka to Do for Your Brand?',
    cards: [
      ['plane', 'Win Inbound Travellers', 'Reach visitors from Korea, Taiwan, China and Southeast Asia at the airport, Hakata Station, the port and in shopping districts, with creative that can switch language by location.'],
      ['users', 'Grow With a Young, Growing City', 'Fukuoka’s mix of students and young professionals suits consumer tech, beauty, food, subscription-based products and lifestyle brands.'],
      ['train', 'Reach Commuters and Office Workers', 'Focus on Hakata Station, Tenjin and subway connections during weekday peaks.'],
      ['bag', 'Drive Shopping and Store Visits', 'Plan around Tenjin’s department stores, Canal City Hakata and Momochi when proximity to purchase matters.'],
      ['phone', 'Connect DOOH With Mobile Engagement', 'Combine high-visibility DOOH placements in Tenjin and other commercial districts with location-based mobile advertising and social media campaigns. Re-engage eligible audiences who have been exposed to physical advertising through subsequent digital touchpoints, subject to available data, technology integrations and applicable permissions.'],
      ['calendar', 'Time Activity to Events', 'Weight schedules toward festivals such as Hakata Gion Yamakasa and Hakata Dontaku, baseball at Mizuho PayPay Dome Fukuoka and concerts and conventions.'],
      ['globe', 'Cover Kyushu, Not Just Fukuoka', 'Extend to Kitakyushu, Kumamoto, Kagoshima and other Kyushu cities, or run Fukuoka within a national Japan plan.'],
    ],
    cta: 'Discuss Your Fukuoka Campaign',
  }),
  grid('fk', 'areas', 'districts', {
    eyebrow: 'Key Fukuoka Areas',
    title: 'Where Fukuoka’s Audiences Are',
    leads: ['Fukuoka’s audiences are concentrated in a handful of walkable districts and transport hubs. The right mix depends on the objective, the dates and the screens available through participating media partners.'],
    cards: [
      ['bag', 'Tenjin', 'Fukuoka’s main shopping, office and entertainment district, with department stores, an underground shopping street and substantial pedestrian activity. The Tenjin Big Bang redevelopment is introducing new office and retail spaces, creating opportunities for brands to connect with shoppers, professionals and younger consumers.'],
      ['train', 'Hakata Station', 'The city’s rail hub and the southern end of the San’yo Shinkansen, combining commuters, business travellers and shoppers in the station complex and surrounding offices.'],
      ['plane', 'Fukuoka Airport', 'Unusually close to the city centre and linked by subway, so arriving domestic and international travellers move quickly into Hakata and Tenjin. In 2025 it handled 8% of Japan’s international air passengers.'],
      ['ship', 'Hakata Port and Bayside', 'Japan’s leading port for foreign cruise calls in 2024, plus ferry connections with Korea, bringing international visitors into the city on arrival days.'],
      ['star', 'Canal City Hakata and Nakasu', 'Shopping, entertainment and Fukuoka’s best-known nightlife and food-stall area, busy with visitors in the evening.'],
      ['wave', 'Momochi and Seaside', 'Home to Fukuoka Tower, Mizuho PayPay Dome Fukuoka and waterfront retail, with large crowds on game and event days.'],
    ],
    note: 'Available locations, formats and buying options are confirmed against the brief, timing and participating Japanese media owners.',
    cta: 'Explore Fukuoka DOOH Opportunities',
  }),
  prose('fk', 'prog', {
    title: 'Buying Fukuoka DOOH: Direct, Programmatic or Both',
    leads: [
      'For regional agencies and media owners, demonstrating campaign value to advertisers increasingly requires more than traditional site-based media planning. As digital advertising acquisition costs rise, DOOH offers an opportunity to build physical brand exposure and connect it with subsequent digital engagement.',
      'Some Fukuoka briefs need a fixed presence at Hakata Station or in Tenjin for a set period; others need flexible delivery that follows visitors and shoppers across the city. <strong>Direct activation</strong> secures specific sites, while <strong>programmatic DOOH</strong> uses defined budgets, dayparts, audience signals and impression-based buying to support more flexible campaign delivery.',
      'For D2C and e-commerce brands, this creates an opportunity to use DOOH as an upper-funnel channel that builds awareness and supports subsequent digital interactions, rather than relying exclusively on digital acquisition channels.',
      'Moving Walls technology powers MASTRUM, the impression-based DOOH platform launched with JR East Marketing &amp; Communications (jeki), whose first phase brought about 34,000 screens across Japan onto one system. Which Fukuoka screens are available programmatically depends on the media owners and integrations available for your campaign.',
    ],
    cta: 'Discuss Fukuoka Activation Options',
  }),
  grid('fk', 'build', 'why', {
    title: 'Build Your Fukuoka Workflow',
    cards: [
      ['target', 'Audience and Location Planning', 'Compare Fukuoka districts and screens against your target audience, using available audience and mobility insights to support location selection and forecast reach and frequency.'],
      ['search', 'Inventory Discovery', 'Find suitable DOOH and OOH by area, format and dates, helping agencies and media owners identify relevant inventory opportunities for advertiser briefs.'],
      ['bolt', 'Activation', 'Book directly, buy programmatically, or combine both with mobile and digital campaign integrations where available.'],
      ['bars', 'Delivery and Measurement', 'Consolidate impression delivery, reach and available performance signals into one report. Incorporate Brand Lift Studies where the brief requires them to evaluate campaign impact.'],
      ['bulb', 'MW Science', '<a href="/mw-science" style="color:#2F5FE0;font-weight:600;text-decoration:none">MW Science</a> brings audience, location, media, brand and outcome signals to support planning and measurement. Data and research options for a Japan campaign are confirmed against the brief and applicable data requirements.'],
      ['globe', 'Multi-City and Multi-Country', 'Run Fukuoka with <a href="/locations/japan/tokyo" style="color:#2F5FE0;font-weight:600;text-decoration:none">Tokyo</a>, <a href="/locations/japan/osaka" style="color:#2F5FE0;font-weight:600;text-decoration:none">Osaka</a>, <a href="/locations/japan/nagoya" style="color:#2F5FE0;font-weight:600;text-decoration:none">Nagoya</a> or overseas markets in one workflow.'],
    ],
    cta: 'Discuss Your Campaign Requirements',
  }, '#F6F8FC'),
].join('\n\n')
FUKUOKA.faqs = [
  ['Can Moving Walls support DOOH campaigns in Fukuoka?', 'Yes. Moving Walls supports audience- and location-led planning, direct and programmatic activation and measurement for Fukuoka, subject to the brief, available inventory and partner connectivity in Japan.'],
  ['Can we target international visitors in Fukuoka?', 'Yes. Plans can focus on Fukuoka Airport, Hakata Station, Hakata Port and visitor-heavy districts, timed to arrival peaks such as cruise days.'],
  ['Can Fukuoka campaigns be bought programmatically?', 'Where screens are connected to programmatic supply, yes. Direct booking is available when a brief needs specific sites.'],
  ['Which Fukuoka areas can a campaign cover?', 'Tenjin, Hakata Station, the airport, Hakata Port and Bayside, Canal City and Nakasu, and Momochi, plus other Kyushu cities, depending on the objective and available screens.'],
  ['How are Fukuoka campaigns measured?', 'Delivery reporting, reach and frequency, location performance and Brand Lift Studies where the brief calls for them, depending on available data and measurement requirements.'],
  ['Can a Fukuoka brand advertise overseas through Moving Walls?', 'Yes. Moving Walls provides access to more than one million screens across 50+ markets, so Kyushu brands can test one overseas market or run several from one platform.'],
  ['Can DOOH campaigns in Fukuoka be integrated with mobile advertising?', 'Yes. Where supported by available technology integrations and applicable data permissions, DOOH campaigns can be coordinated with location-based mobile advertising to create additional digital touchpoints and re-engage eligible audiences.'],
  ['How can agencies and media owners demonstrate DOOH campaign performance to advertisers?', 'Moving Walls supports impression delivery reporting, reach and frequency analysis, and available campaign performance signals. Brand Lift Studies can also be incorporated where the campaign brief and research requirements call for them.'],
]

// ---- Write drafts ----
const up = async ([file, alt]) => ({ _type: 'image', alt, asset: { _type: 'reference', _ref: (await c.assets.upload('image', fs.createReadStream('C:/Users/admin/Desktop/' + file), { filename: file }))._id } })
const tx = c.transaction()
for (const d of [NAGOYA, FUKUOKA]) {
  const ID = `city-japan-${d.slug}`
  if (await c.fetch('count(*[_type=="locationCity" && slug.current==$s && country._ref==$jp && !(_id in [$id, "drafts." + $id])])', { s: d.slug, jp: JAPAN, id: ID })) throw new Error('Already exists: ' + d.slug)
  const img = await up(d.img)
  tx.createOrReplace({
    _id: `drafts.${ID}`, _type: 'locationCity', city: d.name, slug: { _type: 'slug', current: d.slug },
    country: { _type: 'reference', _ref: JAPAN }, isActive: true,
    heroTitle: d.h1, heroSubtitle: d.sub, fullDescription: d.hero, description: d.card, heroImage: img,
    ctaButtonText: d.heroCta, showAllLocationsButton: true, contactFormUrl: FORM,
    sectionsPosition: 'before-faqs',
    faqs: d.faqs.map(([question, answer]) => ({ _key: k(), question, answer })),
    sections: [
      { ...osakaEmbed, _key: k(), code: fixBtns(d.p) + '\n' + d.code },
      { ...logos, _key: k() },
      { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: d.banner[0], subheading: d.banner[1], ctaText: 'Request a Demo', ctaLink: FORM, note: d.banner[2] },
    ],
    seo: { _type: 'seo', metaTitle: d.seo[0], metaDescription: d.seo[1], enableKeywords: false, noIndex: false, ogImage: img },
  })
}

// Tokyo and Osaka: add the featured-screens section after each page's own custom section
for (const [id, p, city, extra] of [
  [TOKYO, 'tks', 'Tokyo', 'Around 370 of these are station screens in about 120 Tokyo stations that can be bought programmatically by impression.'],
  [OSAKA, 'oss', 'Osaka', ''],
]) {
  // Re-runs replace this script's own earlier Tokyo/Osaka drafts (marked by the screens section)
  const old = await c.getDocument('drafts.' + id)
  if (old && !old.sections.some((s) => s.title === 'MASTRUM featured screens')) throw new Error('A draft already exists for ' + city)
  if (old) await c.delete('drafts.' + id)
  const doc = await c.getDocument(id)
  if (doc.sections.some((s) => s._type === 'customEmbed' && s.code.includes(`mw-${p}-screens`))) throw new Error('Screens section already on ' + city)
  const at = doc.sections.findIndex((s) => s._type === 'customEmbed')
  const section = { _type: 'customEmbed', _key: k(), backgroundColor: 'transparent', maxWidth: 'full', title: 'MASTRUM featured screens', code: fixBtns(p) + '\n' + (await screensSection(p, city, extra)) }
  const sections = [...doc.sections.slice(0, at + 1), section, ...doc.sections.slice(at + 1)]
  const { _rev, _createdAt, _updatedAt, ...rest } = doc
  tx.create({ ...rest, _id: 'drafts.' + id, sections })
}
await tx.commit()
console.log('Drafts created: /locations/japan/nagoya, /locations/japan/fukuoka, Tokyo + Osaka with featured screens (photos only)')
