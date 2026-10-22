// Creates a DRAFT Malaysia city page for Ipoh (/locations/malaysia/ipoh) from "Ipoh.docx".
// Layout follows the Philippines sub-pages (e.g. Cebu): intro, Why Advertise + Sites two-columns with CTAs
// under the images, premium site cards, formats, visual "Why Choose Moving Walls", MW Science, logos, CTA, FAQs.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const ID = 'city-malaysia-ipoh'
const MY = 'NUzgRk9h7jKjntS8pyrlKE'
const DESKTOP = 'C:/Users/admin/Desktop/'

const exists = await c.fetch('count(*[_type=="locationCity" && slug.current=="ipoh" && !(_id in [$id, "drafts." + $id])])', { id: ID })
if (exists) { console.error('An Ipoh city page already exists'); process.exit(1) }

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
const HERO = await up('jln-ipoh-sentul-district-police-hq.webp')
const KINTA_ROAD = await up('ipoh-kinta-city-jln-sultan-azlan-shah.webp')
const AEON_KINTA = await up('aeon-mall-kinta-city.webp')
const AEON_S18 = await up('aeon-mall-ipoh-station-18.webp')

let n = 0
const key = () => `ip${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`
const span = (text, marks = []) => ({ _key: key(), _type: 'span', marks, text })
// "**bold** plain" mini-markup -> portable text block
const rich = (s) => ({
  _key: key(), _type: 'block', style: 'normal', markDefs: [],
  children: s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((p) => (p.startsWith('**') ? span(p.slice(2, -2), ['strong']) : span(p))),
})

// Why Choose Moving Walls: same visual block as the Philippines pages, Ipoh copy
const ICONS = [
  '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>',
  '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
]
const CAN = [
  'Access roadside and mall screens across Ipoh and Perak',
  'Add Ipoh to a national campaign in one buy',
  'Buy programmatically and adjust mid-flight',
  'Reach drivers and shoppers',
  'Measure reach and impressions by site with transparent reporting',
]
let why = whyEmbed.code
  .replace('Philippines Cebu: Why Choose Moving Walls', 'Malaysia Ipoh: Why Choose Moving Walls')
  .replace(/<p class="mw-phw__lead">[\s\S]*?<\/p>/, `<p class="mw-phw__lead">Booking screens outside the Klang Valley shouldn't mean starting from scratch.</p><p class="mw-phw__lead">Moving Walls brings Perak's inventory onto the same platform as Kuala Lumpur and Penang, so brands can extend a national plan in one buy.</p>`)
  .replace(/href="https:\/\/forms\.zohopublic\.com[^"]*"/, `href="${FORM}"`)
  .replace('Build Your Cebu Plan', 'Talk to Our Team')
  .replace(/<div class="mw-phw__grid">[\s\S]*?<\/div><\/div><\/div><\/div><\/section>/, `<div class="mw-phw__grid">${CAN.map((t, i) => `<div class="mw-phw__item"><span class="mw-phw__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[i]}</svg></span><p>${t}</p></div>`).join('')}</div></div></div></section>`)
if (/Cebu|Manila|PhilippinesContact/.test(why)) throw new Error('Cebu text left in the Why Choose block')

const faqs = [
  ['How much does digital billboard advertising in Ipoh cost?', 'Pricing depends on the site, format and campaign length. Talk to our team for a plan and rates based on your audience and dates.'],
  ['Is there an LED billboard in Ipoh?', 'Yes. The spectacular unipole on Jalan Sultan Azlan Shah near Kinta City reaches 74,513 people a month.'],
  ['Can I run advertising in Ipoh programmatically?', 'Yes. All Perak sites are available programmatically, so you can activate, adjust and measure campaigns without long fixed bookings.'],
  ['Can I combine Ipoh with Kuala Lumpur or Penang?', 'Yes. One plan on the Moving Walls platform can run across every Malaysian city we cover.'],
].map(([question, answer]) => ({ _key: key(), question, answer }))

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'locationCity',
  country: { _type: 'reference', _ref: MY },
  city: 'Ipoh',
  slug: { _type: 'slug', current: 'ipoh' },
  isActive: true,
  heroTitle: 'Digital OOH Advertising in Ipoh',
  heroImage: HERO,
  fullDescription: "Looking for an LED billboard in Ipoh that proves its impact?\n\nMoving Walls helps brands reach Ipoh's drivers and shoppers through a roadside spectacular on Jalan Sultan Azlan Shah and digital screens in AEON Mall Kinta City and AEON Mall Ipoh Station 18, with more AEON screens in Taiping and Seri Manjung. Every campaign is bought programmatically and reported by site.",
  description: "A roadside spectacular and AEON mall screens in Perak's capital, with more screens in Taiping and Seri Manjung.",
  ctaButtonText: 'Plan Ipoh DOOH Campaign',
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  billboardsHeading: 'Premium Billboard Locations in Ipoh',
  billboardsDailyReachLabel: 'Monthly Reach',
  billboardsMonthlyImpressionsLabel: 'Monthly Impressions',
  highVisibilityBillboards: [
    ['Jalan Sultan Azlan Shah (Kinta City)', 'Kinta, Ipoh', 'Spectacular unipole, 576 × 864 px', '74,513', '533,520', KINTA_ROAD],
    ['AEON Mall Kinta City', 'Ipoh', '3 mall LED screens, 1080 × 1920 px', '7,261', '42,000', AEON_KINTA],
    ['AEON Mall Ipoh Station 18', 'Ipoh', '4 mall LED screens, 1080 × 1920 px', '5,178', '38,400', AEON_S18],
  ].map(([name, location, description, reach, impressions, image]) => ({ _key: key(), name, location, description, reach, impressions, image })),
  mediaTypesHeading: 'Outdoor Advertising Formats',
  mediaTypes: [['LED Billboards', 'digital'], ['Spectacular unipoles', 'highway'], ['Mall screens', 'mall']].map(([name, icon]) => ({ _key: key(), name, description: '', icon })),
  sectionsPosition: 'before-faqs',
  sections: [
    {
      _key: key(), _type: 'textBlock', backgroundColor: 'gray', alignment: 'center', maxWidth: 'full',
      heading: "Reach Perak's Capital on the Road and in Its Malls",
      content: [
        rich('Ipoh is the capital of Perak, with **759,952 residents** at the 2020 census.'),
        rich("Moving Walls' Perak network spans **5 sites and 15 screens**, delivering **1M+ monthly impressions**, three of them in Ipoh."),
        rich('Through a single platform, advertisers can add Ipoh to a **Klang Valley or Penang campaign** and measure delivery by site.'),
      ],
    },
    {
      _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right', image: KINTA_ROAD,
      heading: 'Why Advertise in Ipoh?', ctaText: 'Explore Ipoh DOOH', ctaLink: FORM, ctaPlacement: 'image',
      content: [
        rich("**Perak's capital.** Ipoh is the state's administrative centre, with 759,952 residents in 2020."),
        rich('**Road and mall together.** A roadside spectacular reaches drivers, while two AEON malls reach shoppers in the same city.'),
        rich('**Beyond the city.** AEON screens in Taiping and Seri Manjung extend a campaign across Perak.'),
        rich('**Measurable campaign performance.** All sites are bought programmatically, with reach and impressions reported by site.'),
      ],
    },
    {
      _key: key(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'left', image: AEON_KINTA,
      heading: 'Billboard Locations Across Ipoh and Perak', ctaText: 'Plan Your Ipoh Campaign', ctaLink: FORM, ctaPlacement: 'image',
      content: [
        rich('**Jalan Sultan Azlan Shah, Ipoh** – roadside spectacular near Kinta City, 06.00–01.00'),
        rich('**AEON Mall Kinta City, Ipoh** – three digital mall screens, 10.00–22.00'),
        rich('**AEON Mall Ipoh Station 18** – four digital mall screens, 10.00–22.00'),
        rich('**AEON Mall Seri Manjung** – four digital mall screens, reaching 25,741 people a month'),
        rich('**AEON Mall Taiping** – three digital mall screens'),
      ],
    },
    { ...whyEmbed, _key: key(), code: why },
    { ...science, _key: key() },
    { ...logos, _key: key(), heading: 'Trusted by Leading Brands' },
    {
      _key: key(), _type: 'ctaBanner', backgroundColor: 'blue',
      heading: 'Plan Your Billboard Advertising Campaign in Ipoh',
      subheading: 'Whether you need one roadside spectacular or every screen in Perak, Moving Walls helps you pick the right inventory and shows you what it delivered.',
      ctaText: 'Talk to our Experts Today', ctaLink: FORM,
    },
  ],
  faqs,
  seo: {
    _type: 'seo',
    metaTitle: 'Digital OOH & Billboard Advertising in Ipoh | Moving Walls',
    metaDescription: 'Advertise in Ipoh with a roadside LED spectacular and AEON mall screens, plus Taiping and Seri Manjung. 1M+ monthly impressions across Perak, bought programmatically.',
    enableKeywords: false,
    noIndex: false,
    ogImage: HERO,
  },
})
console.log('Draft created: drafts.' + ID, '-> /locations/malaysia/ipoh')
