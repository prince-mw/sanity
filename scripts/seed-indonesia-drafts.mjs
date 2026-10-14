// Creates DRAFT-only content for the Indonesia refresh (Oct 2026):
//   - drafts.<Indonesia location doc>  (main page rewrite)
//   - drafts.<Jakarta city doc>        (only Short Description + order changed — card text)
//   - drafts.city-indonesia-<slug>     (new Surabaya, Bandung, Medan, Bali city pages)
// Nothing is visible on the live site until these drafts are published.
// Reach/impressions are intentionally left empty (pending MW Measure figures).
//
// Usage: node scripts/seed-indonesia-drafts.mjs <placeholder.png> <desktop-image-dir>
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'

const env = Object.fromEntries(
  fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()])
)
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: env.SANITY_API_TOKEN,
})

const [placeholderPath, imageDir] = process.argv.slice(2)
if (!placeholderPath || !imageDir) {
  console.error('Usage: node scripts/seed-indonesia-drafts.mjs <placeholder.png> <desktop-image-dir>')
  process.exit(1)
}

const INDONESIA_ID = 'dsdzDBKQU3TOwM9o6hB6zJ'
const JAKARTA_ID = '37bad461-1de8-4501-8f5d-b0a809e2c1d3'
const ID_FORM =
  'https://forms.zohopublic.com/movingwallsholdingpteltd/form/IndonesiaContact/formperma/s8sCcvtjmyMgEzJnNFMFPauoWNWU8GxkzlG6OhthqYA'
const CASE_STUDIES = ['dsdzDBKQU3TOwM9o6lPK6q', '4WosXPXvlMgq3tPqrVeY7N'] // Visa (Jakarta), Samsung (Jakarta)

// ---------- helpers ----------
let k = 0
const key = () => `id${(k++).toString(36)}${Math.random().toString(36).slice(2, 7)}`
const img = (ref) => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })
const span = (text, marks = []) => ({ _key: key(), _type: 'span', marks, text })
const para = (text) => ({ _key: key(), _type: 'block', style: 'normal', markDefs: [], children: [span(text)] })
// Paragraph whose leading phrase is bold, e.g. "Gubeng station – two-screen…" or "Title: text"
const leadPara = (lead, rest) => ({
  _key: key(), _type: 'block', style: 'normal', markDefs: [],
  children: [span(lead, ['strong']), span(rest)],
})
const bullet = (text, boldTitle) => ({
  _key: key(),
  _type: 'block',
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: boldTitle ? [span(boldTitle, ['strong']), span(` ${text}`)] : [span(text)],
})
const table = (headers, rows) => ({
  _key: key(),
  _type: 'tableBlock',
  bordered: true,
  striped: true,
  headers,
  rows: rows.map((cells) => ({ _key: key(), _type: 'tableRow', cells })),
})
const faqs = (list) => list.map(([question, answer]) => ({ _key: key(), question, answer }))
const media = (list) => list.map(([name, description, icon]) => ({ _key: key(), name, description, icon }))
const stats = (list) => list.map(([value, label]) => ({ _key: key(), value, label }))
const billboards = (list) =>
  list.map(([name, location, description, image]) => ({ _key: key(), name, location, description, image }))
const ctaBanner = (heading, subheading, ctaText) => ({
  _key: key(), _type: 'ctaBanner', backgroundColor: 'blue', heading, subheading, ctaText, ctaLink: ID_FORM,
})
// Drops the draft-only bookkeeping fields so a doc can be written back as a new draft.
const asDraft = (doc, id) => {
  const { _rev, _updatedAt, _createdAt, _system, ...rest } = doc
  return { ...rest, _id: `drafts.${id}` }
}

async function upload(file, filename) {
  const asset = await client.assets.upload('image', fs.createReadStream(file), { filename })
  return asset._id
}

async function run() {
  const [indonesia, jakarta] = await Promise.all([client.getDocument(INDONESIA_ID), client.getDocument(JAKARTA_ID)])
  const existingDrafts = await client.fetch(`*[_id in path("drafts.**") && _id in $ids]._id`, {
    ids: [`drafts.${INDONESIA_ID}`, `drafts.${JAKARTA_ID}`],
  })
  if (existingDrafts.length) {
    console.error('Refusing to overwrite existing drafts:', existingDrafts)
    process.exit(1)
  }

  const placeholder = await upload(placeholderPath, 'indonesia-image-coming-soon.png')
  const [thamrin, paskal, medanLed] = await Promise.all([
    upload(path.join(imageDir, 'led-iconic-thamrin-jl-mh-thamrin-jakarta.webp'), 'led-iconic-thamrin-jl-mh-thamrin-jakarta.webp'),
    upload(path.join(imageDir, 'led-paskal-23-mall-bandung.webp'), 'led-paskal-23-mall-bandung.webp'),
    upload(path.join(imageDir, 'led-jl-kh-zainul-arifin-near-sun-plaza-medan.webp'), 'led-jl-kh-zainul-arifin-near-sun-plaza-medan.webp'),
  ])
  const PH = img(placeholder)

  // Reused as-is from the live Jakarta page (doc text is identical)
  const mwScience = jakarta.sections.find((s) => s.heading === 'Go Beyond Campaign Measurement with MW Science')
  const logos = indonesia.sections.find((s) => s._type === 'logoCarousel')

  // ---------- Main Indonesia page ----------
  const indonesiaDraft = {
    ...asDraft(indonesia, INDONESIA_ID),
    heroTitle: 'OOH Advertising in Indonesia',
    fullDescription:
      "Indonesia is the world's fourth most populous country, with 284 million people. Its cities, commuter rail lines and holiday islands move one of the largest audiences in Asia every day.\n\nThe Moving Walls platform gives brands 657 programmatic screens at 400 sites across 12 provinces, from Jakarta and Bali to Surabaya, Bandung and Medan. Plan by city, buy programmatically, and see what the campaign delivered.",
    ctaButtonText: 'Explore Indonesia DOOH',
    showAllLocationsButton: true,
    contactFormUrl: ID_FORM,
    stats: stats([
      ['284M+', 'Population'],
      ['59%', 'Urban population'],
      ['657', 'Programmatic screens'],
      ['12', 'Provinces covered'],
    ]),
    billboardsHeading: 'High Visibility Outdoor Billboards',
    highVisibilityBillboards: billboards([
      ['LED Iconic Thamrin', 'Jl. MH Thamrin, Jakarta', 'Roadside LED, 8192 × 2158 px', img(thamrin)],
      ['LED Paskal23', 'Paskal 23 mall, Bandung', 'Mall LED, 6 × 10 m', img(paskal)],
      ['LED Jl. KH Zainul Arifin', 'Near Sun Plaza, Medan', 'Roadside LED, 5 × 10 m', img(medanLed)],
    ]),
    mediaTypesHeading: 'Outdoor Ad Media Types Available',
    mediaTypes: media([
      ['Roadside LED billboards', '89 digital billboards on main roads, led by the Iconic networks on Sudirman, Thamrin and Kuningan.', 'highway'],
      ['Train stations and MRT', '32 station sites, including 13 Jakarta MRT stations and the main halls at Gambir, Bandung, Surabaya Gubeng and Pasar Turi.', 'transit'],
      ['Clinic lobby screens', '212 waiting-room screens in clinics across Java, from Jakarta to Semarang and Surabaya.', 'digital'],
      ['Storefront screens', '53 portrait LED screens at convenience stores and offices across Bali.', 'digital'],
      ['Malls and retail', '12 sites, including Pondok Indah Mall, Gandaria City, Kota Kasablanka and Paskal23.', 'mall'],
      ['Airport', 'An 11-screen arrivals network at Kualanamu Airport, Medan.', 'airport'],
    ]),
    sectionsPosition: 'before-faqs',
    sections: [
      {
        _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right',
        heading: 'Billboard Advertising in Indonesia',
        image: img('image-d581484b881479ca0d6ba598542fae4af6e44a52-1453x798-webp'),
        content: [
          para("Indonesia's audience is large and concentrated. Java holds about 54% of the population, and 59% of Indonesians live in cities. That makes billboard advertising Indonesia a city-led buy: a plan built around Greater Jakarta, then extended to Surabaya, Bandung, Medan and Bali."),
          para('The mix is broader than roadside. Programmatic inventory spans digital billboards, commuter and MRT stations, clinic waiting rooms, malls, storefronts and an airport, so one plan can reach commuters, shoppers, patients and tourists.'),
          para('With the Moving Walls platform, you can plan, buy and measure out of home advertising Indonesia in one place, by city and by venue.'),
        ],
      },
      {
        _key: key(), _type: 'twoColumn', backgroundColor: 'gray', imagePosition: 'left',
        heading: 'The Urban Landscape of Indonesia',
        image: img('image-24320b0e8ebe1e297f7f65076014ff381da9af4d-1024x712-webp'),
        content: [
          para('Greater Jakarta holds more than half of the programmatic inventory, with 219 sites across Jakarta, Tangerang, Bekasi, Depok and Bogor. The Iconic LED networks line Sudirman, Thamrin and Kuningan, and 13 MRT stations carry 126 screens between Lebak Bulus and Bundaran HI.'),
          para("Beyond Jakarta, the inventory follows how each city moves. Surabaya and Bandung are reached through their main rail stations. Medan has roadside LEDs in the centre and an arrivals network at Kualanamu. Bali's screens sit where tourists and residents stop: convenience stores in Seminyak, Canggu, Kuta, Nusa Dua, Denpasar and Ubud."),
          para('For outdoor advertising Indonesia and ooh advertising Indonesia, that spread lets a single campaign follow the audience from the capital to the islands.'),
        ],
      },
      {
        _key: key(), _type: 'textBlock', backgroundColor: 'white', alignment: 'left', maxWidth: 'full',
        heading: 'More Cities',
        content: [
          table(['City', "What's there"], [
            ['Tangerang', 'Iconic BSD LED, Alam Sutera banner networks, BSD Junction, clinic lobbies'],
            ['Semarang', 'Roadside LED on Jl. Gajah Mada, clinic lobby screens'],
            ['Bekasi', 'Mega Bekasi digital network, Bekasi station, roadside LED'],
            ['Yogyakarta', 'Lempuyangan station main hall, clinic lobbies'],
            ['Bogor', 'Bogor station, Sentul Icon network, roadside site on Raya Tajur'],
            ['Depok', 'Depok Baru station, clinic lobbies'],
            ['Palembang', 'Roadside LEDs on Jl. Jendral Sudirman'],
            ['Pekanbaru, Banda Aceh, Bandar Lampung, Cilegon', 'A roadside LED in each city'],
          ]),
        ],
      },
      {
        _key: key(), _type: 'successStories', sectionHeading: 'See the Proof',
        stories: CASE_STUDIES.map((id) => ({
          _key: key(), _type: 'successStoryItem', contentType: 'caseStudy',
          caseStudyRef: { _type: 'reference', _ref: id },
        })),
      },
      logos,
      ctaBanner(
        'Looking for Billboard Advertising in Indonesia?',
        "Tell us your cities, audience and budget. We'll come back with a plan across billboards, stations, malls and more, and the reporting to show what it delivered.",
        'Speak to an Expert'
      ),
    ],
    faqsHeading: 'FAQs on Outdoor Advertising in Indonesia',
    faqs: faqs([
      ['Why advertise in Indonesia?', "Indonesia is the world's fourth most populous country, with 284 million people, and 59% of them live in cities. Its biggest audiences are concentrated in a handful of metros, which makes outdoor an efficient way to reach them."],
      ['What are the key cities for OOH advertising?', 'Greater Jakarta holds most of the inventory, followed by Bali, Semarang, Surabaya and Tangerang. Bandung, Medan, Yogyakarta, Bekasi, Bogor, Depok and Palembang are also covered.'],
      ['What types of OOH media are available?', 'Roadside LED billboards, MRT and rail station screens, clinic lobby screens, mall and retail screens, storefront screens in Bali, and an arrivals network at Kualanamu Airport in Medan.'],
      ['Can I buy Indonesian OOH programmatically?', 'Yes. All 657 screens listed on these pages are available programmatically through the Moving Walls platform.'],
      ['How is campaign effectiveness measured?', 'With the Moving Walls platform, you can see delivery by site and screen as the campaign runs, and connect exposure to outcomes after it ends.'],
    ]),
  }

  // ---------- Jakarta: card text only ----------
  const jakartaDraft = {
    ...asDraft(jakarta, JAKARTA_ID),
    description: 'Roadside LED, MRT and mall screens across Sudirman, Thamrin, Kuningan and SCBD.',
    order: 1,
  }

  // ---------- New cities ----------
  const city = (c) => ({
    _id: `drafts.city-indonesia-${c.slug}`,
    _type: 'locationCity',
    country: { _type: 'reference', _ref: INDONESIA_ID },
    city: c.name,
    slug: { _type: 'slug', current: c.slug },
    order: c.order,
    isActive: true,
    heroTitle: c.heroTitle,
    heroImage: PH,
    description: c.card,
    fullDescription: c.heroText,
    ctaButtonText: c.button,
    showAllLocationsButton: true,
    contactFormUrl: ID_FORM,
    billboardsHeading: c.billboardsHeading,
    billboardsDailyReachLabel: 'Monthly Reach',
    billboardsMonthlyImpressionsLabel: 'Monthly Impressions',
    highVisibilityBillboards: billboards(c.billboards.map(([n, l, f]) => [n, l, f, PH])),
    mediaTypesHeading: 'Outdoor Advertising Formats',
    mediaTypes: media(c.formats.map(([n, icon]) => [n, '', icon])),
    sectionsPosition: 'before-faqs',
    sections: [
      {
        _key: key(), _type: 'textBlock', backgroundColor: 'gray', alignment: 'center', maxWidth: 'full',
        heading: c.subtitle,
        content: c.intro.map(para),
      },
      {
        _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right', image: PH,
        heading: `Why Advertise in ${c.name}?`,
        content: c.why.map(([t, d]) => leadPara(`${t}:`, ` ${d}`)),
      },
      {
        _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'left', image: PH,
        heading: c.locationsHeading,
        content: c.locations.map((l) => leadPara(l.slice(0, l.indexOf(' – ')), l.slice(l.indexOf(' – ')))),
      },
      {
        _key: key(), _type: 'textBlock', backgroundColor: 'white', alignment: 'left', maxWidth: 'full',
        heading: 'Why Choose Moving Walls?',
        content: [...c.whyMw.map(para), para('With Moving Walls, you can:'), ...c.canDo.map((t) => bullet(t))],
      },
      { ...mwScience, _key: key() },
      { ...logos, _key: key() },
      ctaBanner(c.ctaHeading, c.ctaText, 'Talk to our experts today'),
    ],
    faqsHeading: 'Frequently Asked Questions',
    faqs: faqs(c.faqs),
    seo: { _type: 'seo', metaTitle: c.seoTitle, metaDescription: c.seoDescription },
  })

  const canDo = (what, reach, place) => [
    `Access ${what}`,
    `Add ${place} to a Jakarta or national campaign in one buy`,
    'Buy programmatically and adjust mid-flight',
    `Reach ${reach}`,
    'Measure delivery by screen with transparent reporting',
  ]

  const cities = [
    city({
      slug: 'surabaya', name: 'Surabaya', order: 2,
      heroTitle: 'Billboard Advertising in Surabaya',
      subtitle: 'Reach East Java’s Largest City Where It Travels and Waits',
      card: "15 screens in the city's two main rail stations and clinic lobbies across Greater Surabaya.",
      heroText: "Moving Walls helps brands reach Surabaya's travellers and residents through digital screens in the city's two main rail stations and a network of clinic waiting rooms. Every campaign is bought programmatically and reported by screen, so you see exactly what ran and where.",
      button: 'Plan Your Surabaya Campaign',
      intro: [
        'Looking for a billboard in Surabaya that proves its impact?',
        "Surabaya is East Java's largest city, home to just over 3 million residents in 2025, more than any other city or regency in the province.",
        "Moving Walls' Surabaya network spans 14 sites and 15 screens: main-hall LED at Gubeng and Pasar Turi stations, plus 12 clinic lobby screens across Surabaya, Sidoarjo and Gresik.",
        'Through a single platform, advertisers can find the right screens, activate them alongside Jakarta or Bandung, and measure delivery by screen.',
      ],
      why: [
        ["East Java's largest city", 'With 3.01 million residents, Surabaya is the biggest single audience in the province.'],
        ['Travellers at the point of departure', "Gubeng and Pasar Turi are the city's main intercity stations. Main-hall screens reach passengers while they wait to board, from 05.00 to 23.00."],
        ['Captive audiences in clinics', 'Waiting-room screens reach patients and families who sit with time to watch, a natural fit for health, pharmacy, beauty and FMCG brands.'],
        ['Measurable campaign performance', 'All 15 screens are bought programmatically, with delivery reported by screen rather than estimated.'],
      ],
      billboardsHeading: 'Premium Advertising Locations in Surabaya',
      billboards: [
        ['Surabaya Gubeng Spectacular', 'Gubeng station, main hall (south)', '2 LED screens, 768 × 768 px'],
        ['Surabaya Pasar Turi Digital Display', 'Pasar Turi station, main hall', 'LED screen, 520 × 416 px'],
        ['Claderma Aesthetic Center Surabaya', 'Clinic lobby, Surabaya', 'Lobby screen, 768 × 432 px'],
      ],
      locationsHeading: 'Advertising Locations Across Surabaya',
      locations: [
        'Gubeng station – two-screen spectacular in the south main hall',
        'Pasar Turi station – main-hall digital display',
        'Central and East Surabaya – clinic lobbies at Indosehat 2003, Klinik Medika Utama (two sites), Sanodoc Clinic, Klinik Amanina Medika and Flora House of Beauty',
        'West Surabaya – Claderma Aesthetic Center and Klinik Dokter Anang',
        'Sidoarjo – Klinik Kecantikan Puspita, Apotek Ben-Fit and Blukid Medika',
        'Gresik – Yellow Clinic',
      ],
      formats: [['Rail station digital displays', 'transit'], ['Station spectaculars', 'transit'], ['Clinic lobby screens', 'digital']],
      whyMw: [
        "Finding the right screens in a city you don't know shouldn't take weeks of calls to media owners.",
        "Moving Walls brings Surabaya's programmatic inventory onto one platform, so brands can plan it alongside the rest of Indonesia.",
      ],
      canDo: canDo('station and clinic screens across Greater Surabaya', 'travellers, patients and families', 'Surabaya'),
      faqs: [
        ['How much does advertising in Surabaya cost?', 'Pricing depends on the site, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
        ['Are there roadside billboards in Surabaya?', 'Our programmatic Surabaya inventory is indoor today: rail stations and clinic lobbies. Talk to our team if your plan needs roadside sites.'],
        ['Can I run OOH advertising in Surabaya programmatically?', 'Yes. All 15 screens are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.'],
        ['Can I combine Surabaya with Jakarta in one campaign?', 'Yes. One plan on the Moving Walls platform can run across Jakarta, Surabaya, Bandung, Medan and Bali.'],
      ],
      ctaHeading: 'Plan Your Advertising Campaign in Surabaya',
      ctaText: 'Whether you need a single station screen or every screen in the city, Moving Walls helps you pick the right inventory and shows you what it delivered.',
      seoTitle: 'Billboard Advertising in Surabaya | Station & Clinic DOOH',
      seoDescription: "Advertise in Surabaya on 15 programmatic screens at Gubeng and Pasar Turi stations and clinic lobbies across Greater Surabaya. Plan, buy and measure with Moving Walls.",
    }),
    city({
      slug: 'bandung', name: 'Bandung', order: 3,
      heroTitle: 'Outdoor Advertising in Bandung',
      subtitle: "Reach West Java's Capital Across Its Mall, Main Road and Station",
      card: "A 6 × 10 m mall LED, a roadside LED on Jl. Merdeka and Bandung station's main hall.",
      heroText: "Moving Walls helps brands reach Bandung's shoppers, drivers and travellers through a mall LED, a roadside LED and the main-hall spectacular at Bandung station. Every campaign is bought programmatically and reported by screen.",
      button: 'Plan Your Bandung Campaign',
      intro: [
        'Looking for a billboard in Bandung that proves its impact?',
        'Bandung is the capital of West Java, home to 2.57 million residents.',
        "Moving Walls' Bandung network spans 3 sites and 4 screens in central Bandung, including a 6 × 10 m LED at Paskal23 and an 8 × 4 m roadside LED on Jl. Merdeka.",
        'Through a single platform, advertisers can add Bandung to a Jakarta campaign, schedule by time of day and measure delivery by screen.',
      ],
      why: [
        ["West Java's capital", "2.57 million residents in the provincial capital, the seat of West Java's government."],
        ['Three audiences in one compact plan', 'The three sites sit within about 2 km of each other, covering a mall, a main road and the main rail station.'],
        ['Large-format impact', "Paskal23's 6 × 10 m portrait LED and Jl. Merdeka's 8 × 4 m landscape LED give brands a big canvas in the city centre."],
        ['Measurable campaign performance', 'All four screens are bought programmatically, with delivery reported by screen.'],
      ],
      billboardsHeading: 'Premium Billboard Locations in Bandung',
      billboards: [
        ['LED Paskal23', 'Paskal 23 mall, Bandung', 'Mall LED, 6 × 10 m'],
        ['LED Jl. Merdeka', 'In front of Holland Bakery, Jl. Merdeka', 'Roadside LED, 8 × 4 m'],
        ['Bandung Station Spectacular', 'Bandung station, main hall', '2 LED screens, 1920 × 768 px'],
      ],
      locationsHeading: 'Billboard Locations Across Bandung',
      locations: [
        'Paskal23 – 6 × 10 m LED at the mall, 10.00–22.00',
        'Jl. Merdeka – 8 × 4 m roadside LED in front of Holland Bakery, 07.00–23.00',
        'Bandung station – two-screen main-hall spectacular, 05.00–23.00',
      ],
      formats: [['LED Billboards', 'digital'], ['Mall LED', 'mall'], ['Rail station spectaculars', 'transit']],
      whyMw: [
        "Finding the right billboard in Bandung shouldn't mean calling media owners one by one.",
        "Moving Walls brings Bandung's programmatic inventory onto one platform, so brands can plan it alongside Jakarta and the rest of Indonesia.",
      ],
      canDo: canDo("Bandung's mall, roadside and station screens", 'shoppers, drivers and travellers', 'Bandung'),
      faqs: [
        ['How much does billboard advertising in Bandung cost?', 'Pricing depends on the site, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
        ['What billboard formats are available in Bandung?', "A 6 × 10 m mall LED at Paskal23, an 8 × 4 m roadside LED on Jl. Merdeka and a two-screen spectacular in Bandung station's main hall."],
        ['Can I run OOH advertising in Bandung programmatically?', 'Yes. All four screens are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.'],
        ['Can I combine Bandung with Jakarta in one campaign?', 'Yes. One plan on the Moving Walls platform can run across Jakarta, Bandung, Surabaya, Medan and Bali.'],
      ],
      ctaHeading: 'Plan Your Billboard Advertising Campaign in Bandung',
      ctaText: 'Whether you need one landmark LED or all three sites, Moving Walls helps you pick the right inventory and shows you what it delivered.',
      seoTitle: 'Billboard Advertising in Bandung | Mall, Roadside & Station LED',
      seoDescription: "Advertise in Bandung on a 6 × 10 m mall LED at Paskal23, an 8 × 4 m roadside LED on Jl. Merdeka and Bandung station's main hall. Bought programmatically with Moving Walls.",
    }),
    city({
      slug: 'medan', name: 'Medan', order: 4,
      heroTitle: 'DOOH Advertising in Medan',
      subtitle: "Reach Indonesia's Largest City Outside Java, From the Roadside to Arrivals",
      card: 'Three roadside LEDs in the city centre, plus 11 screens in Kualanamu Airport arrivals.',
      heroText: "Moving Walls helps brands reach Medan's drivers, shoppers and air travellers through large roadside LEDs in the city centre and an arrivals network at Kualanamu International Airport. Every campaign is bought programmatically and reported by screen.",
      button: 'Plan Your Medan Campaign',
      intro: [
        'Looking for a billboard in Medan that proves its impact?',
        'Medan is the capital of North Sumatra and the most populous city in Indonesia outside Java, with 2.49 million residents in mid-2024.',
        "Moving Walls' Medan network spans 4 sites and 14 screens: three roadside LEDs beside Sun Plaza, Plaza Medan Fair and Hotel Madani, plus 11 screens in Kualanamu arrivals.",
        'Through a single platform, advertisers can run Medan alongside Jakarta, weight spend between the city and the airport, and measure delivery by screen.',
      ],
      why: [
        ["Sumatra's biggest city market", 'With 2.49 million residents, Medan is the largest city in Indonesia outside Java.'],
        ['Large-format roadside impact', "The Jl. KH Zainul Arifin LED near Sun Plaza measures 5 × 10 m, one of three big digital billboards on the city's main roads."],
        ['The airport as a front door', "Kualanamu's arrivals network reaches business travellers and returning residents the moment they land in North Sumatra, from 06.00 to 22.00."],
        ['Measurable campaign performance', 'All 14 screens are bought programmatically, with delivery reported by screen.'],
      ],
      billboardsHeading: 'Premium Billboard Locations in Medan',
      billboards: [
        ['LED Jl. KH Zainul Arifin', 'Near Sun Plaza, Medan', 'Roadside LED, 5 × 10 m'],
        ['LED Jl. Gatot Subroto', 'By Plaza Medan Fair, Medan', 'Roadside LED, 2160 × 1080 px'],
        ['Kualanamu Airport Arrival Network', 'Kualanamu International Airport', '11 screens, 1 × 2 m each'],
      ],
      locationsHeading: 'Billboard Locations Across Medan',
      locations: [
        'Jl. KH Zainul Arifin – 5 × 10 m roadside LED near Sun Plaza, 06.30–23.00',
        'Jl. Gatot Subroto – roadside LED at the junction with Iskandar Muda Baru, by Plaza Medan Fair',
        'Jl. SM Raja – roadside LED by Hotel Madani',
        'Kualanamu International Airport – 11-screen arrivals banner network',
      ],
      formats: [['Digital Billboards', 'highway'], ['LED Billboards', 'digital'], ['Airport Media', 'airport']],
      whyMw: [
        "Finding the right billboard in Medan shouldn't mean calling media owners one by one.",
        "Moving Walls brings Medan's programmatic inventory onto one platform, so brands can plan it alongside Jakarta and the rest of Indonesia.",
      ],
      canDo: canDo("Medan's roadside LEDs and airport screens", 'drivers, shoppers and air travellers', 'Medan'),
      faqs: [
        ['How much does billboard advertising in Medan cost?', 'Pricing depends on the site, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
        ['Can I advertise at Kualanamu Airport?', "Yes. The 11-screen arrivals banner network is available programmatically, on its own or with the city's roadside LEDs."],
        ['Can I run OOH advertising in Medan programmatically?', 'Yes. All 14 screens are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.'],
        ['Can I combine Medan with Jakarta in one campaign?', 'Yes. One plan on the Moving Walls platform can run across Jakarta, Medan, Surabaya, Bandung and Bali.'],
      ],
      ctaHeading: 'Plan Your Billboard Advertising Campaign in Medan',
      ctaText: 'Whether you need one roadside LED or the whole city and airport, Moving Walls helps you pick the right inventory and shows you what it delivered.',
      seoTitle: 'Billboard Advertising in Medan | Roadside LED & Kualanamu Airport',
      seoDescription: 'Advertise in Medan on three large roadside LEDs in the city centre and an 11-screen arrivals network at Kualanamu Airport. Programmatic DOOH with Moving Walls.',
    }),
    city({
      slug: 'bali', name: 'Bali', order: 5,
      heroTitle: 'Out-of-Home Advertising in Bali',
      subtitle: "Reach Bali's Record Tourist Crowds Where They Actually Stop",
      card: '54 screens across Seminyak, Canggu, Kuta, Nusa Dua, Denpasar and Ubud.',
      heroText: "Moving Walls helps brands reach Bali's tourists and residents through digital screens at convenience stores, offices and a roadside LED on Sunset Road, from Seminyak and Canggu to Nusa Dua, Denpasar and Ubud. Every campaign is bought programmatically and reported by screen.",
      button: 'Plan Your Bali Campaign',
      intro: [
        'Looking for a billboard in Bali that proves its impact?',
        'Bali welcomed a record 6.95 million foreign visitors in 2025, up 9.7% on 2024, with Australia the largest source market.',
        "Moving Walls' Bali network spans 54 sites and 54 screens across Badung, Denpasar and Gianyar, including 46 storefront screens at Circle K, Alfamart and other convenience stores.",
        'Through a single platform, advertisers can target by zone, run tourist and resident messages side by side, and measure delivery by screen.',
      ],
      why: [
        ['Record international audience', '6.95 million foreign visitors in 2025, led by Australia, India and China.'],
        ['Screens where people stop', 'Convenience stores are the everyday stop for water, snacks and top-ups, for tourists and residents alike.'],
        ['Every zone of the island', "29 sites in Badung's beach towns, 15 in Denpasar and 10 in and around Ubud."],
        ['Measurable campaign performance', 'All 54 screens are bought programmatically, with delivery reported by screen.'],
      ],
      billboardsHeading: 'Premium Billboard Locations in Bali',
      billboards: [
        ['LED Sunset Road', 'Sunset Road, Kuta, Badung', 'Roadside LED, 1800 × 600 px'],
        ['Alfamart Seminyak', 'Seminyak, Badung', 'Storefront LED, 1080 × 1920 px'],
        ['Circle K Ubud Central', 'Ubud, Gianyar', 'Storefront LED, 1080 × 1920 px'],
      ],
      locationsHeading: 'Advertising Locations Across Bali',
      locations: [
        'Seminyak, Canggu and Kerobokan – storefront screens in the west-coast beach towns, including Batu Bolong and Batu Belig',
        'Kuta and Legian – the Sunset Road LED plus stores on Kartika Plaza and Legian',
        'Jimbaran, Nusa Dua, Ungasan and Pecatu – stores and offices across the Bukit peninsula',
        'Denpasar and Sanur – 15 sites including Renon, Sesetan and the Grab and Gojek offices',
        'Ubud and Gianyar – 10 sites in Ubud, Tegallalang and Ketewel',
      ],
      formats: [['Storefront Digital Screens', 'digital'], ['Office and Venue Screens', 'static'], ['LED Billboards', 'highway']],
      whyMw: [
        "Reaching Bali's visitors shouldn't mean booking a dozen media owners across three regencies.",
        "Moving Walls brings Bali's programmatic inventory onto one platform, so brands can plan it alongside Jakarta and the rest of Indonesia.",
      ],
      canDo: canDo('storefront and roadside screens across Bali', 'international tourists and local residents', 'Bali'),
      faqs: [
        ['How much does advertising in Bali cost?', 'Pricing depends on the site, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
        ['Where are the screens in Bali?', 'Across Badung (Seminyak, Canggu, Kuta, Jimbaran, Nusa Dua), Denpasar (including Sanur and Renon) and Gianyar (Ubud and Tegallalang).'],
        ['Can I run OOH advertising in Bali programmatically?', 'Yes. All 54 screens are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.'],
        ['Can I target tourists and residents separately?', 'Yes. Beach-town screens and Ubud reach visitors; Denpasar screens reach residents. You can run different creative in each zone within one campaign.'],
      ],
      ctaHeading: 'Plan Your Advertising Campaign in Bali',
      ctaText: 'Whether you need a few screens in Seminyak or the whole island, Moving Walls helps you pick the right inventory and shows you what it delivered.',
      seoTitle: 'Billboard Advertising in Bali | Storefront & Roadside DOOH',
      seoDescription: "Reach Bali's 6.95M+ foreign visitors and residents on 54 programmatic screens across Seminyak, Canggu, Kuta, Nusa Dua, Denpasar and Ubud with Moving Walls.",
    }),
  ]

  const tx = client.transaction()
  tx.createOrReplace(indonesiaDraft)
  tx.createOrReplace(jakartaDraft)
  for (const c of cities) tx.createOrReplace(c)
  await tx.commit()
  console.log('Drafts written:', [indonesiaDraft._id, jakartaDraft._id, ...cities.map((c) => c._id)].join('\n  '))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
