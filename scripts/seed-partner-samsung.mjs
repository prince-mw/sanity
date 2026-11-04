// Creates DRAFTS for Samsung (4 Nov 2026):
//  1. partner page /partners/samsung (same structure as SOLUM / LG / BrightSign / DHB). Copy from the
//     "Samsung and DHB" Google Doc (Samsung tab); highlights, card summary, partner type and SEO text
//     are written from that copy (the doc has none).
//  2. the homepage "Technology Partners" list (clientPartners) with Samsung added after BrightSign.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const ID = 'partnerPage-samsung'
const SLUG = 'samsung'
// Samsung logo Dg supplied 4 Nov 2026 (Samsung Logo.avif), empty space trimmed, on its own #f7f7f7 background
const LOGO = 'image-7d264cd04c2b0db807061be9eac4ecebd7fff99c-605x153-png'
if (await c.fetch('count(*[_type=="partnerPage" && slug.current==$s && !(_id in [$id, "drafts." + $id])])', { s: SLUG, id: ID })) { console.error('Slug in use'); process.exit(1) }

let k = 0
const key = () => `sam${String(++k).padStart(3, '0')}`
const card = (icon, title, description) => ({ _key: key(), _type: 'partnerCard', icon, title, description })

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'partnerPage',
  name: 'Samsung',
  slug: { _type: 'slug', current: SLUG },
  isPublished: true,
  logo: { _type: 'image', alt: 'Samsung logo', asset: { _type: 'reference', _ref: LOGO } },
  logoBackground: '#f7f7f7',
  category: 'Commercial display technology',
  summary: "Moving Walls' CMS runs directly on compatible Samsung Tizen displays, combining your own content with direct and programmatic advertising across your screen network.",
  order: 5,

  heroEyebrow: 'Samsung × Moving Walls',
  heroTitle: 'Your Samsung screens. Your content. New advertising opportunities.',
  heroParagraphs: [
    "Bring together Samsung's commercial displays and Moving Walls' content management and media monetisation capabilities.",
    "Manage content across your screen network, deliver brand campaigns and make advertising inventory available to programmatic buyers, with Moving Walls' CMS running on compatible Samsung Tizen displays.",
  ],
  heroCtaText: 'Book a demo',
  heroIllustration: 'screen-network',
  highlights: [
    { _key: key(), _type: 'partnerHighlight', icon: 'screen', text: 'Runs directly on compatible Samsung Tizen displays' },
    { _key: key(), _type: 'partnerHighlight', icon: 'settings', text: 'No additional external media player' },
    { _key: key(), _type: 'partnerHighlight', icon: 'target', text: 'Direct and programmatic advertising' },
  ],

  sections: [
    {
      _key: key(), _type: 'partnerTextSection', icon: 'network',
      heading: 'Bring your screen network together',
      intro: 'Launch a promotion across your locations or tailor content to individual screens. Moving Walls helps you schedule and manage messages across your Samsung display network.',
      paragraphs: ['Combine product promotions, visitor information and paid advertising, with content schedules that fit each location.'],
    },
    {
      _key: key(), _type: 'partnerCardsSection',
      heading: 'Make your screens part of your advertising business',
      intro: 'Your screens connect with people where they shop, travel and spend time. Give brands a way to reach those audiences while keeping control of your network.',
      cards: [
        card('megaphone', 'Run campaigns you sell directly', 'Schedule and deliver advertising booked by brands and agencies across selected screens and locations.'),
        card('bolt', 'Connect to programmatic demand', 'Make eligible screen inventory available through connected programmatic buying platforms, giving advertisers another way to buy space on your network.'),
        card('clock', 'Keep your own content in the mix', 'Plan how your promotions, information and advertising share screen time.'),
      ],
    },
    {
      _key: key(), _type: 'partnerTextSection', icon: 'settings',
      heading: 'Powered by Samsung Tizen. Managed through Moving Walls.',
      intro: "Moving Walls' CMS runs directly on compatible Samsung Tizen commercial displays, bringing content management and advertising capabilities to your screens without an additional external media player.",
      paragraphs: ['Whether you are planning a new installation or developing an existing Samsung network, we help identify the supported displays and setup suited to your requirements.'],
    },
    {
      _key: key(), _type: 'partnerTextSection', icon: 'chart',
      heading: 'See what ran. Understand its impact.',
      intro: 'Track campaign delivery and provide reporting to your advertising customers.',
      paragraphs: ["Explore Moving Walls' audience and campaign measurement capabilities to understand your locations and evaluate advertising performance, with options selected according to your network and goals."],
    },
    {
      _key: key(), _type: 'partnerCardsSection',
      heading: 'What could this look like for you?',
      cards: [
        card('store', 'For retailers', 'Promote your products and offers while creating opportunities for brands to reach shoppers through your in-store screens.'),
        card('network', 'For media owners', 'Build or expand your Samsung display network and support directly sold and programmatic advertising.'),
        card('users', 'For venue and property owners', 'Combine visitor communications with advertising opportunities across malls, offices, transport hubs and other locations.'),
        card('settings', 'For system integrators', 'Add content management and media monetisation capabilities to your Samsung display projects.'),
      ],
    },
    {
      _key: key(), _type: 'partnerTextSection', icon: 'layers',
      heading: 'Build around your network',
      intro: 'Start with your locations, content needs and advertising goals. We help you assess your setup, plan how content and campaigns will work together, and identify the steps to activate your network.',
      paragraphs: ['From your first installation to a wider rollout, bring your Samsung screens into a connected media offering.'],
    },
    {
      _key: key(), _type: 'partnerCtaSection',
      heading: 'Discover what your Samsung screens could do',
      paragraphs: [
        'Planning a new screen network or looking to generate more value from an existing installation?',
        'Tell us about your screens and what you want to achieve.',
      ],
      buttonText: 'Book a demo',
    },
  ],

  metaTitle: 'Samsung × Moving Walls | Tizen Digital Signage Advertising',
  metaDescription: "Run Moving Walls' CMS directly on Samsung Tizen displays: manage content, sell campaigns directly and connect screen inventory to programmatic buyers.",
})
console.log('Draft created: drafts.' + ID, '-> /partners/' + SLUG)

// Homepage Technology Partners list: draft copy of the published list with Samsung added at the end
const list = await c.getDocument('clientPartners')
if (await c.getDocument('drafts.clientPartners')) { console.error('A clientPartners draft already exists, not overwriting'); process.exit(1) }
const { _rev, _createdAt, _updatedAt, ...rest } = list
const partners = (rest.partners || []).filter((p) => p._key !== 'partner-samsung')
partners.push({ _key: 'partner-samsung', name: 'Samsung', logo: { _type: 'image', asset: { _type: 'reference', _ref: LOGO } } })
await c.create({ ...rest, _id: 'drafts.clientPartners', partners })
console.log('Draft created: drafts.clientPartners ->', partners.map((p) => p.name).join(', '))
