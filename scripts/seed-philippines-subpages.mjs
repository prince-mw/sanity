// Creates DRAFT sub-pages for the Philippines (Oct 2026): EDSA, C5, Cebu, Davao, North & South Luzon,
// Universities, Central Business Districts, Retail & Shopping Malls — as locationCity docs under Philippines,
// at /locations/philippines/<slug>. Content is the first draft from Philippines.docx; photos are placeholders.
// Also sets hideCityCards + relatedPagesHeading on the Philippines draft.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const PH = '4WosXPXvlMgq3tPqrTdYLx'
const ph = (await c.getDocument('drafts.' + PH)) || (await c.getDocument(PH))
const FORM = ph.contactFormUrl
const logos = ph.sections.find((s) => s._type === 'logoCarousel')
const science = (await c.getDocument('city-indonesia-surabaya')).sections.find((s) => /MW Science/.test(s.heading || ''))
const placeholderRef = await c.fetch(`*[_type=="sanity.imageAsset" && originalFilename=="indonesia-image-coming-soon.png"][0]._id`)
const PHOTO = { _type: 'image', asset: { _type: 'reference', _ref: placeholderRef } }

let n = 0
const key = () => `ph${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`
const span = (text, marks = []) => ({ _key: key(), _type: 'span', marks, text })
const para = (text) => ({ _key: key(), _type: 'block', style: 'normal', markDefs: [], children: [span(text)] })
const lead = (b, rest) => ({ _key: key(), _type: 'block', style: 'normal', markDefs: [], children: [span(b, ['strong']), span(rest)] })
const linked = (before, text, href, after) => {
  const mk = key()
  return { _key: key(), _type: 'block', style: 'normal', markDefs: [{ _key: mk, _type: 'link', href }], children: [span(before), span(text, [mk]), span(after)] }
}
const bullet = (t) => ({ _key: key(), _type: 'block', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [span(t)] })
const table = (headers, rows) => ({ _key: key(), _type: 'tableBlock', design: 'modern', bordered: true, striped: true, headers, rows: rows.map((cells) => ({ _key: key(), _type: 'tableRow', cells })) })

const page = (p) => ({
  _id: `drafts.city-philippines-${p.slug}`,
  _type: 'locationCity',
  country: { _type: 'reference', _ref: PH },
  city: p.name,
  slug: { _type: 'slug', current: p.slug },
  order: p.order,
  isActive: true,
  heroTitle: p.h1,
  heroImage: PHOTO,
  description: p.card,
  fullDescription: p.hero,
  ctaButtonText: p.button,
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  billboardsHeading: p.premiumHeading,
  billboardsDailyReachLabel: 'Monthly Reach',
  billboardsMonthlyImpressionsLabel: 'Monthly Impressions',
  highVisibilityBillboards: p.sites.map(([name, location, description, reach, impressions]) => ({ _key: key(), name, location, description, reach, impressions, image: PHOTO })),
  mediaTypesHeading: p.formatsHeading || 'Outdoor Advertising Formats',
  mediaTypes: p.formats.map(([name, icon]) => ({ _key: key(), name, description: '', icon })),
  sectionsPosition: 'before-faqs',
  sections: [
    { _key: key(), _type: 'textBlock', backgroundColor: 'gray', alignment: 'center', maxWidth: 'full', heading: p.subtitle, content: p.intro },
    { _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right', image: PHOTO, heading: p.whyHeading, content: p.why.map(([b, t]) => lead(b, ` ${t}`)) },
    p.sitesTable
      ? { _key: key(), _type: 'textBlock', backgroundColor: 'white', alignment: 'left', maxWidth: 'full', heading: p.sitesHeading, content: [table(...p.sitesTable)] }
      : { _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'left', image: PHOTO, heading: p.sitesHeading, content: [...(p.sitesIntro || []).map(para), ...p.sitesList.map(([b, t]) => lead(b, ` – ${t}`))] },
    { _key: key(), _type: 'textBlock', backgroundColor: 'white', alignment: 'left', maxWidth: 'full', heading: 'Why Choose Moving Walls?', content: [...(p.whyMw || []).map(para), para('With Moving Walls, you can:'), ...p.canDo.map(bullet)] },
    { ...science, _key: key() },
    { ...logos, _key: key() },
    { _key: key(), _type: 'ctaBanner', backgroundColor: 'blue', heading: p.ctaHeading, subheading: p.ctaText, ctaText: 'Talk to our experts today', ctaLink: FORM },
  ],
  faqsHeading: 'Frequently Asked Questions',
  faqs: p.faqs.map(([question, answer]) => ({ _key: key(), question, answer })),
  seo: { _type: 'seo', metaTitle: p.seo[0], metaDescription: p.seo[1] },
})

const pages = [
  {
    slug: 'edsa', name: 'EDSA', order: 1, button: 'Plan Your EDSA Campaign',
    h1: 'Billboard Advertising on EDSA', subtitle: "Metro Manila's Main Artery, End to End",
    card: "27 LED sites along Metro Manila's main artery, including the Buendia gantries.",
    hero: 'Moving Walls offers 27 LED sites and 29 screens on EDSA, delivering 7.57 million impressions a month, from the Buendia gantries in the south to Santolan, Cubao and Kamuning in the north.',
    intro: [para('Looking for billboards in Metro Manila that prove their impact?'), para("EDSA runs 23.8 kilometres through the heart of Metro Manila, passing through six of the region's 17 local government units: Caloocan, Quezon City, San Juan, Mandaluyong, Makati and Pasay. For most national brands, an EDSA plan is the Philippine plan.")],
    whyHeading: 'Why Advertise on EDSA?',
    why: [
      ["The country's highest-impact site sits here.", 'The EDSA Buendia northbound gantry delivers 1,236,000 impressions a month and reaches 208,521 people, the largest of any single site in the network.'],
      ['Congestion works for you.', "EDSA's traffic is the reason dwell time in front of a roadside LED is measured in minutes, not seconds."],
      ['Full-length coverage.', '27 sites spread across the corridor, so a campaign can own the route rather than a single junction.'],
      ['Every format.', 'Gantries, spectaculars, unipoles and LED screens, plus a terminal screen at Victory Liner Cubao.'],
    ],
    premiumHeading: 'High Visibility LED Sites on EDSA',
    sites: [
      ['Robinsons Galleria 3-Panel LED SB / EB', 'Metro Manila', 'LED TV, 1208 × 704 px', '24,707', '279,540'],
      ['ICONIC EDSA Orense', 'Metro Manila', 'Unipole, 2592 × 1500 px', '18,143', '230,760'],
      ['EDSA Guadalupe NB Spectacular', 'EDSA Guadalupe', 'Spectacular LED, 2400 × 3264 px', '15,619', '201,960'],
    ],
    sitesHeading: 'EDSA Sites by Stretch',
    sitesIntro: ['The Buendia gantry also has an Ear Ads position: 1,212,000 impressions and 211,117 reach.'],
    sitesList: [
      ['Southern EDSA (Makati, Pasay)', 'Buendia gantries (Full Ads and Ear Ads), EDSA Apo SB, Orense southbound, Guadalupe'],
      ['Central EDSA (Mandaluyong, Ortigas)', 'Guadalupe NB spectacular, Orense beside the MMDA building'],
      ['Northern EDSA (Quezon City, Cubao)', 'Santolan Cubao, Santolan SB at the Torres Building, Sentinel NB, Belson, Kamuning, Victory Liner Cubao terminal'],
    ],
    formats: [['Gantry LED', 'highway'], ['Spectacular LED', 'digital'], ['Roadside LED and unipoles', 'highway'], ['Terminal screens', 'transit']],
    whyMw: ["EDSA's sites belong to several different media owners. Booking the corridor shouldn't mean booking them one at a time."],
    canDo: ['Access 29 screens across 27 EDSA sites in one plan', 'Add C5 or the regional corridors to the same buy', 'Buy programmatically and adjust mid-flight', 'Measure delivery by site, with brand lift available through MW Science'],
    faqs: [
      ['How much does an EDSA billboard cost?', "Rates depend on the site, format and campaign length. A gantry is priced differently to a roadside LED. Share your dates and budget and we'll come back with a plan."],
      ['Which EDSA site has the biggest audience?', 'The Buendia northbound gantry, at 1,236,000 impressions and 208,521 reach a month.'],
      ['Can I book the whole corridor?', 'Yes. All 27 sites can run as a single campaign, with delivery reported site by site.'],
      ['Can I combine EDSA with C5?', 'Yes. Many plans run both to cover the north-south routes through the metro.'],
    ],
    ctaHeading: 'Plan Your EDSA Campaign', ctaText: 'Whether you need one gantry or the length of the corridor, Moving Walls helps you pick the right sites and shows you what they delivered.',
    seo: ['EDSA Billboard Advertising | 27 LED Sites in Metro Manila', 'Advertise on EDSA with 27 LED sites and 29 screens, from the Buendia gantries to Cubao, delivering 7.57M impressions a month. Plan and measure with Moving Walls.'],
  },
  {
    slug: 'c5', name: 'C5', order: 2, button: 'Plan Your C5 Campaign',
    h1: 'Billboard Advertising on C5', subtitle: 'The Alternate Route Through Metro Manila',
    card: 'The alternate north-south route, from Libis to Bagong Ilog.',
    hero: 'Moving Walls offers 8 LED sites on C5, delivering 1.49 million impressions a month, concentrated around the Bagong Ilog junction and Libis.',
    intro: [para('Looking for billboards in Metro Manila away from the EDSA crowd?'), para("C5 is Metro Manila's second beltway, running 43.9 kilometres from Valenzuela in the north through Quezon City, Pasig and Taguig to Parañaque and Las Piñas in the south. It is the route drivers take to avoid EDSA, and it passes Bonifacio Global City and the eastern business districts on the way.")],
    whyHeading: 'Why Advertise on C5?',
    why: [
      ['A different audience to EDSA.', 'C5 is the route of choice for private vehicles moving between Bonifacio Global City, Ortigas and Libis.'],
      ['The Bagong Ilog cluster.', "Five of the eight sites sit around this junction, northbound and southbound, so a campaign can hold both directions at one of the metro's busiest crossings."],
      ['Business district frontage.', 'The GBF Bridgetowne site faces the Ortigas end of the corridor.'],
      ['Pairs with EDSA.', "Running both corridors covers the metro's two main north-south routes in a single plan."],
    ],
    premiumHeading: 'High Visibility LED Sites on C5',
    sites: [
      ['C5 Libis SB', 'Libis, Northern Manila', 'LED, 2048 × 512 px', '19,873', '217,890'],
      ['C5 Bagong Ilog SB (Menzie)', 'Bagong Ilog, Eastern Manila', 'LED, 864 × 1080 px', '15,695', '206,280'],
      ['C5 GBF Bridgetowne Ortigas NB', 'Bridgetowne, Ortigas', 'Trapezoid LED, 1040 × 1800 px', '18,422', '172,800'],
    ],
    sitesHeading: 'C5 Sites by Stretch',
    sitesList: [
      ['Bagong Ilog junction', 'Menzie SB, Borja NB, the Makati-side unipole, the southbound LED TV and the Kalayaan NB screen'],
      ['Libis and the north', 'C5 Libis SB'],
      ['Ortigas and Bridgetowne', 'GBF Bridgetowne NB, C5 Salonga'],
    ],
    formats: [['Roadside LED', 'highway'], ['LED TV', 'digital'], ['Unipole', 'static'], ['Trapezoid LED', 'digital']],
    canDo: ['Access all 8 C5 sites in one plan', 'Hold both directions at Bagong Ilog', 'Add EDSA or the regional corridors to the same buy', 'Measure delivery by site, with brand lift available through MW Science'],
    faqs: [
      ['How much does a C5 billboard cost?', "Rates depend on the site, format and campaign length. Share your dates and budget and we'll come back with a plan."],
      ['How is C5 different from EDSA?', 'C5 carries more private vehicles and connects the eastern business districts. EDSA carries far higher volume overall. Most national plans use both.'],
      ['Can I book northbound and southbound at the same junction?', 'Yes. Bagong Ilog has sites in both directions.'],
      ['Can I combine C5 with EDSA?', 'Yes, and most brands do.'],
    ],
    ctaHeading: 'Plan Your C5 Campaign', ctaText: 'Whether you need one junction or the whole corridor, Moving Walls helps you pick the right sites and shows you what they delivered.',
    seo: ['C5 Billboard Advertising | LED Sites on Metro Manila’s Second Beltway', 'Advertise on C5 with 8 LED sites around Bagong Ilog, Libis and Bridgetowne, delivering 1.49M impressions a month. Pair with EDSA in one plan.'],
  },
  {
    slug: 'cebu', name: 'Cebu', order: 3, button: 'Plan Your Cebu Campaign',
    h1: 'Billboard Advertising in Cebu', subtitle: 'The Queen City of the South',
    card: 'Across the Ayala and Colon retail cores and Talisay.',
    hero: 'Moving Walls offers 5 LED sites in Cebu, covering the Ayala and Colon retail cores and the Talisay corridor to the south.',
    intro: [para('Looking for billboard advertising in Cebu that proves its impact?'), linked('Cebu City had ', '965,332 residents', 'https://en.wikipedia.org/wiki/2024_Philippine_census', " in the 2024 census, and Metro Cebu around 3.2 million. It is the commercial centre of the Visayas and the country's main gateway outside Luzon.")],
    whyHeading: 'Why Advertise in Cebu?',
    why: [
      ['The biggest market outside Luzon.', 'Cebu City anchors a metro of roughly 3.2 million people.'],
      ['Retail-led coverage.', 'Four of the five sites sit at or beside major malls, where Cebuano shoppers already are.'],
      ['Colon Street.', "Two sites cover the country's oldest street, still one of Cebu's busiest downtown retail areas."],
      ['One plan with Manila.', 'Cebu runs in the same campaign as EDSA and C5, with delivery reported site by site.'],
    ],
    premiumHeading: 'High Visibility LED Sites in Cebu',
    sites: [
      ['Gaisano Mall Talisay', 'Talisay, Metro Cebu', 'LED, 768 × 528 px', '28,471', '327,600'],
      ['Ayala Center Cebu Activity Center LED', 'Cebu Business Park', 'LED, 3328 × 5376 px', '21,082', '208,080'],
      ['Robinsons Galleria Cebu', 'Gen. Maxilom Extension', 'LED', '12,899', '138,240'],
    ],
    sitesHeading: 'Cebu Sites',
    sitesList: [
      ['Cebu Business Park', 'Ayala Center Cebu Activity Center LED'],
      ['Gen. Maxilom Extension', 'Robinsons Galleria Cebu'],
      ['Talisay', 'Gaisano Mall, serving the southern Metro Cebu corridor'],
      ['Colon Street', 'Metro Colon LED and the Colon Juan Luna site'],
    ],
    formats: [['LED billboards', 'digital'], ['Mall-facing LED screens', 'mall']],
    canDo: ['Access all five Cebu LED sites in one buy', 'Add Cebu to a Metro Manila or national campaign', 'Reach shoppers in the Ayala and Colon retail cores', 'Measure delivery by site, with brand lift available through MW Science'],
    faqs: [
      ['How much is billboard advertising in Cebu?', "Rates depend on the site and campaign length. Share your dates and budget and we'll come back with a plan."],
      ['Where are the Cebu sites?', 'Ayala Center Cebu, Robinsons Galleria Cebu, Gaisano Mall Talisay and two sites on Colon Street.'],
      ['Can I combine Cebu with Metro Manila?', 'Yes, in one plan and one report.'],
      ['Do you have more inventory in the Visayas?', 'Cebu is our current Visayas coverage. Talk to our team about what else can be arranged for a campaign.'],
    ],
    ctaHeading: 'Plan Your Cebu Campaign', ctaText: 'Whether you need one mall LED or all five sites, Moving Walls helps you pick the right inventory and shows you what it delivered.',
    seo: ['Billboard Advertising in Cebu | LED Sites in Metro Cebu', 'Advertise in Cebu with 5 LED sites across Ayala Center, Robinsons Galleria, Colon Street and Talisay. Add Cebu to your Manila plan with Moving Walls.'],
  },
  {
    slug: 'davao', name: 'Davao', order: 4, button: 'Plan Your Davao Campaign',
    h1: 'Billboard Advertising in Davao', subtitle: "Mindanao's Largest City",
    card: "The city-centre LED in Mindanao's largest economy.",
    hero: 'Moving Walls offers one LED site in Davao City, with further Mindanao coverage at C.M. Recto Avenue in Cagayan de Oro.',
    intro: [para('Looking for billboard advertising in Davao that proves its impact?'), linked('Davao City had ', '1,848,947 residents', 'https://rsso11.psa.gov.ph/content/2024-census-population-popcen-official-population-counts-city-davao', ' in the 2024 census, making it the most populous city in Mindanao and the only highly urbanised city in the Davao Region, which itself holds 5.39 million people.')],
    whyHeading: 'Why Advertise in Davao?',
    why: [
      ["Mindanao's biggest audience.", '1.85 million residents in the city, 5.39 million across the Davao Region.'],
      ['A market most national plans skip.', 'Brands that buy only Metro Manila miss the southern third of the country.'],
      ['National reach in one plan.', 'Davao runs alongside EDSA, C5, Cebu and the Luzon corridors, with delivery reported site by site.'],
    ],
    premiumHeading: 'LED Sites in Davao and Mindanao',
    sites: [
      ['Davao LED', 'Davao City', 'LED', '4,922', '54,540'],
      ['C.M. Recto Avenue, Cagayan de Oro', 'Cagayan de Oro, Misamis Oriental', '2 LED screens', '6,400', '85,662'],
    ],
    sitesHeading: 'Davao and Mindanao Sites',
    sitesList: [
      ['Davao City', 'Davao LED in the city centre'],
      ['Cagayan de Oro', 'Two LED screens on C.M. Recto Avenue'],
    ],
    formats: [['LED billboards', 'digital']],
    canDo: ['Add Mindanao to a national campaign without a separate booking', 'Buy programmatically alongside Luzon and Visayas inventory', 'Measure delivery by site, with brand lift available through MW Science'],
    faqs: [
      ['How much is billboard advertising in Davao?', "Rates depend on the site and campaign length. Share your dates and budget and we'll come back with a plan."],
      ['How many sites do you have in Davao?', 'One LED site in the city today, plus two screens at C.M. Recto Avenue in Cagayan de Oro. More Davao inventory is being added.'],
      ['Can I combine Davao with Manila and Cebu?', 'Yes. One plan can cover Luzon, the Visayas and Mindanao.'],
    ],
    ctaHeading: 'Plan Your Davao Campaign', ctaText: 'Talk to our team about Davao and adding Mindanao to your plan.',
    seo: ['Billboard Advertising in Davao | LED in Mindanao', 'Reach Davao City and Mindanao with LED billboards in Davao and Cagayan de Oro, planned alongside your Manila and Cebu campaign with Moving Walls.'],
  },
  {
    slug: 'north-south-luzon', name: 'North & South Luzon', order: 5, button: 'Plan Your Luzon Campaign',
    h1: 'Billboard Advertising in North and South Luzon', subtitle: 'The Corridors Out of Metro Manila',
    card: 'Across Bulacan, Pampanga, Calabarzon, Cagayan Valley and Ilocos.',
    hero: 'Moving Walls offers 39 sites across Luzon outside Metro Manila, on the NLEX and SLEX corridors and in the provincial centres.',
    intro: [para('Looking for billboards beyond the capital?'), linked('The two most populous regions in the Philippines sit either side of Metro Manila: ', 'Calabarzon with 16.93 million people', 'https://psa.gov.ph/content/highlights-region-iv-calabarzon-population-2024-census-population-2024-popcen', " to the south and Central Luzon with 12.99 million to the north. Together with the NCR's 14 million, they hold about 39% of the country.")],
    whyHeading: 'Why Advertise in North and South Luzon?',
    why: [
      ['Where the population actually is.', "Calabarzon is the country's most populous region, ahead of Metro Manila itself."],
      ['Expressway audiences.', 'NLEX at Valenzuela and the San Fernando and Angeles interchanges in Pampanga reach drivers on the main route north.'],
      ['The southern growth belt.', 'Bacoor in Cavite sits on the main corridor into Calabarzon.'],
      ['Extends a Manila plan cheaply.', 'These corridors catch the same audience leaving and returning to the capital.'],
    ],
    premiumHeading: 'High Visibility LED Sites in Luzon',
    sites: [
      ['NLEX Drive and Dine', 'Valenzuela City, Bulacan', 'LED', '40,857', '255,360'],
      ['San Fernando Interchange LED (Entry)', 'Mabalacat, Pampanga', 'LED', '32,544', '199,980'],
      ['Bacoor CBC SB', 'Cavite', 'LED', '15,334', '124,392'],
    ],
    sitesHeading: 'Luzon Sites by Area',
    sitesTable: [['Area', 'Sites', 'Screens', "What's there"], [
      ['Calabarzon', '22', '22', 'Bacoor CBC northbound and southbound, Cavite roadside and retail screens'],
      ['Bulacan', '6', '6', 'NLEX Drive and Dine LED and digital signage at Valenzuela, Meycauayan sites'],
      ['Cagayan Valley', '5', '5', 'Provincial roadside and retail screens'],
      ['Pampanga', '3', '3', 'San Fernando Interchange entry and exit LEDs, Angeles Interchange LED'],
      ['Ilocos Region', '2', '2', 'Provincial roadside screens'],
      ['Central Luzon', '1', '1', 'Roadside screen'],
    ]],
    formats: [['Expressway and interchange LED', 'highway'], ['Roadside LED', 'highway'], ['LED TV and retail screens', 'digital']],
    canDo: ['Access 39 sites across six Luzon regions in one plan', 'Extend an EDSA or C5 campaign to the corridors out of the metro', 'Buy programmatically and adjust mid-flight', 'Measure delivery by site, with brand lift available through MW Science'],
    faqs: [
      ['Which areas outside Metro Manila can I buy?', 'Calabarzon, Bulacan, Pampanga, Cagayan Valley, Ilocos and Central Luzon.'],
      ['What are the strongest sites?', 'The NLEX Drive and Dine screens at Valenzuela and the San Fernando Interchange LEDs in Pampanga.'],
      ['Can I run Luzon on its own?', 'Yes, though most brands pair it with EDSA and C5 to cover the capital and the corridors in one plan.'],
    ],
    ctaHeading: 'Plan Your Luzon Campaign', ctaText: "Tell us which corridors matter and we'll build the plan around them.",
    seo: ['Billboard Advertising in North & South Luzon | NLEX, SLEX, Calabarzon', 'Advertise across 39 Luzon sites outside Metro Manila, on NLEX, SLEX and in Calabarzon, Bulacan and Pampanga. Extend your Manila plan with Moving Walls.'],
  },
  {
    slug: 'universities', name: 'Universities & Colleges', order: 6, button: 'Plan Your Campus Campaign',
    h1: 'Outdoor Advertising in University Areas', subtitle: 'Reach Students Where They Study and Gather',
    card: "Sites in Metro Manila's university belts, led by Manila Freedom LED at Morayta and Katipunan.",
    hero: 'Moving Walls offers LED sites in Metro Manila\'s university belts, led by Manila Freedom LED at Morayta and Katipunan White Plains.',
    intro: [para("Manila's University Belt is one of the densest concentrations of higher education anywhere in Asia: a cluster of campuses around Morayta, España and Recto within walking distance of each other. Quezon City adds a second belt around Katipunan, and there are further clusters across the metro.")],
    whyHeading: 'Why Advertise in University Areas?',
    why: [
      ['A concentrated young audience.', 'Campuses put hundreds of thousands of 16- to 24-year-olds within a few city blocks.'],
      ['Predictable rhythms.', 'Term time, class hours and exam periods make audience timing unusually easy to plan around.'],
      ['A natural fit for specific categories.', 'Telco, QSR, e-wallet, snacks, energy drinks and streaming brands all buy this audience hard.'],
      ['Measurable.', 'Delivery reported by site, with brand lift available through MW Science.'],
    ],
    premiumHeading: 'High Visibility LED Sites in University Areas',
    sites: [
      ['Manila Freedom LED (Morayta)', 'Morayta, University Belt, Manila', 'LED, 2496 × 960 px', '45,447', '462,240'],
      ['Katipunan White Plains', 'Katipunan, Quezon City', 'LED, 960 × 1408 px', '16,326', '189,980'],
    ],
    sitesHeading: 'University Areas We Cover',
    sitesList: [
      ['Morayta and the University Belt, Manila', 'Manila Freedom LED, plus in-store screens in the surrounding streets'],
      ['Katipunan, Quezon City', 'Katipunan White Plains LED'],
    ],
    formats: [['Roadside LED', 'highway'], ['In-store screens near campus', 'mall']],
    canDo: ['Reach students on the street and in the stores they use between classes', 'Schedule around class hours and term dates', 'Buy programmatically and adjust mid-flight', 'Measure delivery by site'],
    faqs: [
      ['What counts as a university area?', 'A district with a genuine cluster of campuses, like Morayta or Katipunan. A single college inside a business district is covered on the Central Business Districts page instead.'],
      ['Can I target term time only?', 'Yes. Campaigns can be scheduled around the academic calendar and class hours.'],
      ['Which sites reach the University Belt?', 'Manila Freedom LED at Morayta is the anchor, at 462,240 impressions a month.'],
    ],
    ctaHeading: 'Plan Your Campus Campaign', ctaText: "Tell us the campuses that matter and we'll build the plan around them.",
    seo: ['University Area Advertising in Manila | Campus DOOH', "Reach students in Metro Manila's university belts at Morayta and Katipunan with LED and in-store screens, scheduled around class hours and term dates."],
  },
  {
    slug: 'central-business-districts', name: 'Central Business Districts', order: 7, button: 'Plan Your CBD Campaign',
    h1: 'Outdoor Advertising in Central Business Districts', subtitle: 'Reach Decision-Makers Where They Work',
    card: 'Across Makati, BGC and Taguig, Ortigas and Alabang, including One Ayala.',
    hero: 'Moving Walls offers 75 sites across the business districts, delivering 7.51 million impressions a month, from the EDSA Buendia gantries to the One Ayala transit complex.',
    intro: [para("Looking for billboard advertising in Manila's business districts?"), para("Metro Manila's commercial activity is concentrated in a handful of districts: Makati, Bonifacio Global City and the wider Taguig corridor, Ortigas, and Alabang in the south. These are office environments first, which is what separates them from the university belts and the retail districts.")],
    whyHeading: 'Why Advertise in the CBDs?',
    why: [
      ['Working professionals, daily.', 'Office districts deliver the same audience five days a week, on predictable routes.'],
      ['The highest-value sites in the country.', 'The Buendia gantries, Upper McKinley in Taguig and the Ortigas corridor sit here.'],
      ['One Ayala.', '69 screens across MRT link pillars, the P2P bus area and interactive displays, in one complex.'],
      ['Category fit.', 'Finance, insurance, property, business software, premium auto and airlines all buy this audience.'],
    ],
    premiumHeading: 'High Visibility Sites in the CBDs',
    sites: [
      ['EBC Buendia corner Makati Ave LED', 'Southern Manila, Makati', 'LED, 960 × 480 px', '11,293', '159,840'],
      ['Upper McKinley, Lawton Avenue', 'Taguig City', 'LED', '177,727', '534,960'],
      ['Kalayaan BGC Flyover', 'Northern Manila, BGC', 'LED, 1440 × 1440 px', '5,489', '67,680'],
    ],
    sitesHeading: 'Business Districts We Cover',
    sitesList: [
      ['Makati', 'the EDSA Buendia gantries, Glorietta Activity Center, One Ayala complex'],
      ['Bonifacio Global City and Taguig', 'Upper McKinley at Lawton Avenue, Market! Market!'],
      ['Ortigas', 'Ortigas Greenhills, Ortigas Avenue at La Salle, GBF Bridgetowne on C5'],
      ['Alabang and the south', 'roadside and retail screens on the southern corridor'],
    ],
    formats: [['Gantry and roadside LED', 'highway'], ['Pillar wraps and interactive displays', 'digital'], ['Transit hub screens', 'transit'], ['Mall and retail LED', 'mall']],
    canDo: ['Access 75 sites across every major business district in one plan', 'Combine roadside, transit and in-mall screens around the same office audience', 'Schedule around the working day', 'Measure delivery by site, with brand lift available through MW Science'],
    faqs: [
      ['Which business districts do you cover?', 'Makati, BGC and Taguig, Ortigas, and Alabang, plus the roads connecting them.'],
      ['What is the strongest CBD site?', 'The EDSA Buendia northbound gantry, at 1,236,000 impressions a month.'],
      ['Is One Ayala available?', 'Yes. 69 screens across the MRT link pillars, the P2P bus area and interactive displays.'],
      ['Do university sites appear on this page?', "No. Campus clusters are on the Universities page, so the two don't overlap."],
    ],
    ctaHeading: 'Plan Your CBD Campaign', ctaText: "Tell us which districts matter and we'll build the plan around them.",
    seo: ['CBD Advertising in Metro Manila | Makati, BGC, Ortigas', 'Reach professionals across 75 sites in Makati, BGC, Ortigas and Alabang, from the EDSA Buendia gantries to One Ayala. Plan and measure with Moving Walls.'],
  },
  {
    slug: 'retail-shopping-malls', name: 'Retail & Shopping Malls', order: 8, button: 'Plan Your Retail Campaign',
    h1: 'Outdoor Advertising in Retail and Shopping Malls', subtitle: 'Reach Shoppers at the Point of Decision',
    card: 'From Trinoma and Glorietta to Market! Market!, Robinsons and Ayala Center Cebu.',
    hero: 'Moving Walls offers 47 mall and retail sites with 54 screens, delivering 6.03 million impressions a month, from Trinoma and Glorietta in Metro Manila to Ayala Center Cebu.',
    intro: [para('Looking for mall advertising in the Philippines?'), para('The mall is the centre of Filipino urban life: shopping, eating, meeting and air conditioning in one place. That makes mall screens the closest outdoor format to the purchase itself.')],
    whyHeading: 'Why Advertise in Malls?',
    why: [
      ['Closest to the purchase.', 'A mall screen reaches a shopper minutes, sometimes seconds, before they decide.'],
      ['Long dwell time.', 'Activity centres and atriums hold an audience that is standing still, not driving past.'],
      ['The biggest single mall site.', 'Trinoma Activity Center delivers 767,250 impressions and reaches 144,219 people a month.'],
      ['National footprint.', 'The same plan covers Metro Manila, Cebu and the Luzon corridors.'],
    ],
    premiumHeading: 'High Visibility Mall Sites',
    sites: [
      ['Trinoma Activity Center', 'Trinoma, Quezon City', 'LED, 1920 × 2560 px', '144,219', '767,250'],
      ['Glorietta Activity Center, Makati City', 'Southern Manila, Makati', 'Pillar wrap, 1760 × 4224 px, 3 screens', '15,283', '157,680'],
      ['Market! Market! LED', 'Bonifacio Global City, Taguig', 'LED', '17,534', '200,700'],
    ],
    sitesHeading: 'Malls We Cover',
    sitesList: [
      ['Quezon City and the north', 'Trinoma Activity Center, Eastwood Libis'],
      ['Makati and Taguig', 'Glorietta Activity Center pillar wraps, Market! Market!, One Ayala interactive displays'],
      ['Ortigas', 'Robinsons Galleria 3-panel LED'],
      ['Cebu', 'Ayala Center Cebu Activity Center, Robinsons Galleria Cebu, Gaisano Mall Talisay'],
      ['Luzon corridors', 'NLEX Drive and Dine digital signage at Valenzuela'],
    ],
    formats: [['Activity centre and atrium LED', 'mall'], ['Pillar wraps', 'static'], ['Interactive displays', 'digital'], ['In-mall LED TV', 'digital']],
    canDo: ['Access 54 screens across 47 retail sites in one plan', 'Pair mall screens with the roadside corridor that feeds them', 'Buy programmatically and adjust mid-flight', 'Measure delivery by site, with brand lift available through MW Science'],
    faqs: [
      ['Which malls can I advertise in?', 'Trinoma, Glorietta, Market! Market!, Robinsons Galleria, Eastwood and One Ayala in Metro Manila, plus Ayala Center Cebu, Robinsons Galleria Cebu and Gaisano Talisay.'],
      ['What is the biggest mall site?', 'Trinoma Activity Center, at 767,250 impressions a month.'],
      ['Can I combine malls with roadside sites?', 'Yes, and most brands do: the corridor builds reach and the mall screen closes the gap to purchase.'],
    ],
    ctaHeading: 'Plan Your Retail Campaign', ctaText: "Tell us the malls or the shopper you want and we'll build the plan around them.",
    seo: ['Mall Advertising in the Philippines | Retail DOOH', 'Reach shoppers on 54 screens across 47 mall and retail sites, from Trinoma and Glorietta to Ayala Center Cebu. Plan and measure mall DOOH with Moving Walls.'],
  },
]

const exists = await c.fetch(`*[_type=="locationCity" && country._ref==$ph && !(_id in path("drafts.**"))]._id`, { ph: PH })
if (exists.length) { console.error('Published Philippines sub-pages already exist:', exists); process.exit(1) }

const tx = c.transaction()
for (const p of pages) tx.createOrReplace(page(p))
tx.patch('drafts.' + PH, (pt) => pt.set({ hideCityCards: true, relatedPagesHeading: 'Explore More of the Philippines' }))
await tx.commit({ visibility: 'sync' })
console.log('Drafts:', pages.map((p) => `/locations/philippines/${p.slug}`).join('\n  '))
