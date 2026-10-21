// Creates a DRAFT of the Philippines location page (Oct 2026 refresh) from the Philippines.docx content.
// The live page is unchanged until the draft is published.
// Usage: node scripts/seed-philippines-main-draft.mjs <embed.json>  (custom-section HTML generated from the doc)
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const ID = '4WosXPXvlMgq3tPqrTdYLx'
const { embed } = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const k = () => Math.random().toString(36).slice(2, 14)
const span = (text, marks = []) => ({ _key: k(), _type: 'span', marks, text })
const para = (text) => ({ _key: k(), _type: 'block', style: 'normal', markDefs: [], children: [span(text)] })
const img = (ref) => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })

const pub = await c.getDocument(ID)
if (await c.getDocument('drafts.' + ID)) { console.error('A Philippines draft already exists, aborting'); process.exit(1) }
const FORM = pub.contactFormUrl
const logos = pub.sections.find((s) => s._type === 'logoCarousel')

const sections = [
  { _key: k(), _type: 'customEmbed', backgroundColor: 'transparent', maxWidth: 'full', code: embed },
  {
    _key: k(), _type: 'twoColumn', backgroundColor: 'white', imagePosition: 'right',
    heading: 'Outdoor Advertising in the Philippines',
    image: img('image-494e8df6c31e5cf763a7259d20b4ee24efcb8f43-960x620-webp'),
    content: [
      para("Filipino audiences are concentrated and mobile. Metro Manila holds 14 million people across 16 cities and one municipality, and the roads that connect them carry the country's heaviest daily traffic. That is why digital billboards in Philippines planning starts with the corridors: a single gantry at EDSA Buendia delivers over 1.2 million impressions."),
      para('What has changed is everything around the billboard. LED billboard advertising Philippines now sits alongside mall LEDs, university-belt screens, in-store displays and rideshare cars, all bought through one platform. A campaign can follow a student from the campus to the mall, or a commuter from EDSA to the checkout.'),
      para('With the Moving Walls platform, you can plan, buy and measure out of home advertising Philippines across 23 media owners in one place.'),
    ],
    ctaText: 'Speak to an Expert', ctaLink: FORM, ctaPlacement: 'image',
  },
  {
    _key: k(), _type: 'twoColumn', backgroundColor: 'gray', imagePosition: 'left',
    heading: 'OOH Market Landscape',
    image: img('image-915df2fd3dc53463b037034ab93d3adbe1648bf1-960x619-webp'),
    content: [
      para("Metro Manila accounts for 326 of our 372 sites. EDSA carries 27 of them and C5 another 8, which together make up the backbone of any national launch. Within the metro, the densest cluster is Southern Manila: Makati, Taguig and Pasay, including One Ayala's 69 pillar and interactive screens at the MRT link and P2P bus areas."),
      para('Outside the capital, the network reaches Cebu in the Visayas, Davao and Cagayan de Oro in Mindanao, and the Luzon growth corridors: NLEX at Valenzuela, the San Fernando and Angeles interchanges in Pampanga, and Bacoor in Cavite.'),
      para('For billboard advertising and led billboard Philippines, the advantage is the mix: corridors for reach, malls and campuses for proximity, in-store and rideshare for dwell time.'),
    ],
    ctaText: 'Request Media Plan', ctaLink: FORM, ctaPlacement: 'image',
  },
  {
    _key: k(), _type: 'successStories', sectionHeading: 'See the Proof', cardStyle: 'image',
    stories: ['dsdzDBKQU3TOwM9o6lPGVD', 'dsdzDBKQU3TOwM9o6lPSn4', 'dsdzDBKQU3TOwM9o6lPNmG'].map((ref) => ({
      _key: k(), _type: 'successStoryItem', contentType: 'caseStudy', caseStudyRef: { _type: 'reference', _ref: ref },
    })),
  },
  { ...logos, _key: k() },
  {
    _key: k(), _type: 'ctaBanner', backgroundColor: 'blue',
    heading: 'Looking for Digital Billboard Advertising in the Philippines?',
    subheading: "Tell us your audience, corridors and budget. We'll come back with a plan and the reporting to show what it delivered.",
    ctaText: 'Take Your Brand Global', ctaLink: FORM,
  },
]

const { _rev, _updatedAt, _createdAt, _system, ...rest } = pub
await c.createOrReplace({
  ...rest,
  _id: 'drafts.' + ID,
  heroTitle: 'Billboard Advertising in the Philippines',
  fullDescription: 'The Philippines is home to 112.7 million people, and 14 million of them live in Metro Manila. Moving Walls gives brands 1,491 screens at 372 sites from 23 media owners: EDSA and C5 gantries, mall LEDs, university belts, convenience stores and rideshare cars. Browse by corridor or by the places your audience actually goes.',
  ctaButtonText: 'Explore Philippines DOOH',
  showAllLocationsButton: true,
  stats: [
    ['112.7M', 'Population'], ['14M', 'Metro Manila residents'], ['1,491', 'Screens'], ['23', 'Media owners'],
  ].map(([value, label]) => ({ _key: k(), value, label })),
  highVisibilityBillboards: [],
  mediaTypes: [],
  sectionsPosition: 'after-hero',
  sections,
  faqsHeading: 'FAQs on DOOH Advertising Philippines',
  faqs: [
    ['How much is billboard advertising in the Philippines?', "Billboard advertising rates depend on the site, format and campaign length. An EDSA gantry sits at a very different price point to a mall LED or a campus screen. Tell us your corridors, audience and dates and we'll come back with a plan and rates."],
    ['Where can I advertise?', 'Along EDSA and C5 in Metro Manila, in Cebu, Davao, and across North and South Luzon, plus by point of interest: universities, central business districts and shopping malls.'],
    ['What types of OOH media are available?', 'Gantry and roadside LED billboards, mall and retail LEDs, campus-area screens, transit hubs including PITX and One Ayala, convenience store screens and rideshare in-car screens.'],
    ['What is the biggest billboard site in the network?', 'The EDSA Buendia gantry delivers over 1.2 million impressions, the highest of any single site.'],
    ['Can I buy Philippine OOH programmatically?', 'Yes. The inventory on these pages is available through the Moving Walls platform, across 23 media owners.'],
    ['How is campaign effectiveness measured?', 'Delivery is reported by site and screen as the campaign runs. Brand lift studies and dynamic creative are available through MW Science.'],
  ].map(([question, answer]) => ({ _key: k(), question, answer })),
})
console.log('Draft created: drafts.' + ID)
