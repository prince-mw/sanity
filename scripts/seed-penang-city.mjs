// Creates a DRAFT Malaysia city page for Penang (/locations/malaysia/penang) from "Penang.docx".
// Layout follows the Philippines sub-pages (e.g. Cebu): intro, Why Advertise + Sites two-columns with CTAs
// under the images, premium site cards, formats, visual "Why Choose Moving Walls", MW Science, logos, CTA, FAQs.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const ID = 'city-malaysia-penang'
const MY = 'NUzgRk9h7jKjntS8pyrlKE'
const DESKTOP = 'C:/Users/admin/Desktop/'

const exists = await c.fetch('count(*[_type=="locationCity" && slug.current=="penang" && !(_id in [$id, "drafts." + $id])])', { id: ID })
if (exists) { console.error('A Penang city page already exists'); process.exit(1) }

const my = await c.getDocument(MY)
const FORM = my.contactFormUrl
const cebu = await c.getDocument('city-philippines-cebu')
const whyEmbed = cebu.sections.find((s) => s._type === 'customEmbed')
const science = cebu.sections.find((s) => /MW Science/.test(s.heading || ''))
const logos = my.sections.find((s) => s._type === 'logoCarousel')

// Upload photos (re-uses an existing asset if the same file was uploaded before)
const up = async (file) => {
  const a = await c.assets.upload('image', fs.createReadStream(DESKTOP + file), { filename: file })
  return { _type: 'image', asset: { _type: 'reference', _ref: a._id } }
}
const HERO = await up('jalan-burma-jalan-anson-penang.webp')
const AUTOCITY = await up('autocity-juru-penang.webp')
const GURNEY = await up('persiaran-gurney-jln-tanjong-tokong.webp')
const BM = await up('bukit-mertajam-jln-song-ban-kheng.webp')

let n = 0
const key = () => `pg${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`
const span = (text, marks = []) => ({ _key: key(), _type: 'span', marks, text })
// "**bold** plain" mini-markup -> portable text block
const rich = (s) => ({
  _key: key(), _type: 'block', style: 'normal', markDefs: [],
  children: s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((p) => (p.startsWith('**') ? span(p.slice(2, -2), ['strong']) : span(p))),
})

// Why Choose Moving Walls: same visual block as the Philippines pages, Penang copy
const ICONS = [
  '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>',
  '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
]
const CAN = [
  'Access spectaculars, unipoles, facades and mall screens across Penang',
  'Add Penang to a Klang Valley or national campaign in one buy',
  'Buy programmatically and adjust mid-flight',
  'Reach drivers, shoppers and commuters',
  'Measure reach and impressions by site with transparent reporting',
]
let why = whyEmbed.code
  .replace('Philippines Cebu: Why Choose Moving Walls', 'Malaysia Penang: Why Choose Moving Walls')
  .replace(/<p class="mw-phw__lead">[\s\S]*?<\/p>/, `<p class="mw-phw__lead">Penang's screens belong to five different media owners. Booking them shouldn't mean five separate conversations.</p><p class="mw-phw__lead">Moving Walls brings them onto one platform, so brands can plan Penang alongside Kuala Lumpur and the rest of Malaysia.</p>`)
  .replace(/href="https:\/\/forms\.zohopublic\.com[^"]*"/, `href="${FORM}"`)
  .replace('Build Your Cebu Plan', 'Talk to Our Team')
  .replace(/<div class="mw-phw__grid">[\s\S]*?<\/div><\/div><\/div><\/div><\/section>/, `<div class="mw-phw__grid">${CAN.map((t, i) => `<div class="mw-phw__item"><span class="mw-phw__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[i]}</svg></span><p>${t}</p></div>`).join('')}</div></div></div></section>`)
if (/Cebu|Manila|PhilippinesContact/.test(why)) throw new Error('Cebu text left in the Why Choose block')

const faqs = [
  ['How much does billboard advertising in Penang cost?', 'Pricing depends on the site, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
  ['Can I advertise on both Penang Island and the mainland?', 'Yes. Two sites are in George Town and three are in Seberang Perai, and one plan can cover all five.'],
  ['Can I run billboard advertising in Penang programmatically?', 'Yes. All sites are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.'],
  ['Can I combine Penang with Kuala Lumpur?', 'Yes. One plan on the Moving Walls platform can run across every Malaysian city we cover.'],
].map(([question, answer]) => ({ _key: key(), question, answer }))

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'locationCity',
  country: { _type: 'reference', _ref: MY },
  city: 'Penang',
  slug: { _type: 'slug', current: 'penang' },
  isActive: true,
  heroTitle: 'Billboard Advertising in Penang',
  heroImage: HERO,
  fullDescription: "Looking for a Penang billboard that proves its impact?\n\nMoving Walls helps brands reach Penang's drivers and shoppers through spectacular LEDs on Persiaran Gurney and at AutoCity Juru, a facade screen in central George Town, a roadside spectacular in Bukit Mertajam and AEON mall screens. Every campaign is bought programmatically and reported by site.",
  description: 'Spectaculars, facade and mall screens across George Town, Juru and Bukit Mertajam, bought programmatically and reported by site.',
  ctaButtonText: 'Explore Penang DOOH',
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  billboardsHeading: 'Premium Billboard Locations in Penang',
  billboardsDailyReachLabel: 'Monthly Reach',
  billboardsMonthlyImpressionsLabel: 'Monthly Impressions',
  highVisibilityBillboards: [
    ['AutoCity @ Juru', 'Juru, Seberang Perai', 'Spectacular unipole, 1560 × 810 px', '114,307', '848,160', AUTOCITY],
    ['Persiaran Gurney / Jln Tanjong Tokong', 'George Town, Penang Island', 'Spectacular LED, 1056 × 512 px', '70,490', '672,480', GURNEY],
    ['Bukit Mertajam – Jln Song Ban Kheng', 'Bukit Mertajam, Seberang Perai', 'Spectacular unipole, 576 × 864 px', '98,496', '738,720', BM],
  ].map(([name, location, description, reach, impressions, image]) => ({ _key: key(), name, location, description, reach, impressions, image })),
  mediaTypesHeading: 'Outdoor Advertising Formats in Penang',
  mediaTypes: [['Spectacular LEDs', 'digital'], ['Digital unipoles', 'highway'], ['Facade screens', 'static'], ['Mall screens', 'mall']].map(([name, icon]) => ({ _key: key(), name, description: '', icon })),
  sectionsPosition: 'before-faqs',
  sections: [
    {
      _key: key(), _type: 'textBlock', backgroundColor: 'gray', alignment: 'center', maxWidth: 'full',
      heading: "Reach Malaysia's Most Densely Populated State, on the Island and the Mainland",
      content: [
        rich("Penang is Malaysia's most densely populated state, home to **1.74 million people** at the 2020 census, and **92.5%** of them live in urban areas."),
        rich("Moving Walls' Penang network spans **5 sites and 7 screens**, delivering **2.6M+ monthly impressions**, across George Town on the island and Juru and Bukit Mertajam on the mainland."),
        rich('Through a single platform, advertisers can cover **both sides of the bridge** in one plan and measure delivery by site.'),
      ],
    },
    {
      _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right', image: GURNEY,
      heading: 'Why Advertise in Penang?', ctaText: 'Explore DOOH Inventory', ctaLink: FORM, ctaPlacement: 'image',
      content: [
        rich("**Dense and urban.** 1.74 million people live in Malaysia's most densely populated state, 92.5% of them in urban areas."),
        rich("**Both sides of the water.** Sites on Penang Island and in Seberang Perai reach George Town's city traffic and drivers and shoppers on the mainland."),
        rich('**Spectacular formats.** Three of the five sites are spectaculars, including the 1560 × 810 px screen at AutoCity Juru.'),
        rich('**Measurable campaign performance.** All sites are bought programmatically, with reach and impressions reported by site.'),
      ],
    },
    {
      _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'left', image: AUTOCITY,
      heading: 'Digital Billboard Locations Across Penang', ctaText: 'Get the Full Penang Site List', ctaLink: FORM, ctaPlacement: 'image',
      content: [
        rich('**Persiaran Gurney** – spectacular LED at the Jalan Tanjong Tokong junction, 06.30–00.30'),
        rich('**Central George Town** – facade screen at Jalan Burma / Jalan Anson, 06.30–00.30'),
        rich('**Juru** – spectacular unipole at AutoCity, 06.00–01.00'),
        rich('**Bukit Mertajam** – spectacular unipole on Jalan Song Ban Kheng, 06.00–01.00'),
        rich('**AEON Mall Bukit Mertajam** – three digital mall screens, 10.00–22.00'),
      ],
    },
    { ...whyEmbed, _key: key(), code: why },
    { ...science, _key: key() },
    { ...logos, _key: key(), heading: 'Trusted by Leading Brands' },
    {
      _key: key(), _type: 'ctaBanner', backgroundColor: 'blue',
      heading: 'Plan Your Out-of-Home Advertising Campaign in Penang',
      subheading: 'Whether you need one Gurney spectacular or every site in the state, Moving Walls helps you pick the right inventory and shows you what it delivered.',
      ctaText: 'Plan Your Penang Campaign', ctaLink: FORM,
    },
  ],
  faqs,
  seo: {
    _type: 'seo',
    metaTitle: 'Billboard Advertising in Penang | DOOH & LED Screens',
    metaDescription: 'Advertise in Penang with 5 DOOH sites and 7 screens across George Town, Juru and Bukit Mertajam. 2.6M+ monthly impressions, bought programmatically.',
    enableKeywords: false,
    noIndex: false,
    ogImage: HERO,
  },
})
console.log('Draft created: drafts.' + ID, '-> /locations/malaysia/penang')
