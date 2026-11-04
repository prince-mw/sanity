// Creates a DRAFT partner page for DHB at /partners/dhb (same structure as SOLUM / LG / BrightSign).
// Copy from the "Samsung and DHB" Google Doc (DHB tab), 3 Nov 2026. The three key highlights, card
// summary, partner type and SEO text are written from that copy (the doc has none).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const ID = 'partnerPage-dhb'
const SLUG = 'dhb'
if (await c.fetch('count(*[_type=="partnerPage" && slug.current==$s && !(_id in [$id, "drafts." + $id])])', { s: SLUG, id: ID })) { console.error('Slug in use'); process.exit(1) }

let k = 0
const key = () => `dhb${String(++k).padStart(3, '0')}`

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'partnerPage',
  name: 'DHB',
  slug: { _type: 'slug', current: SLUG },
  isPublished: true,
  // homepage DHB logo with its surrounding whitespace trimmed (uploaded 3 Nov 2026)
  logo: { _type: 'image', alt: 'DHB logo', asset: { _type: 'reference', _ref: 'image-1d06a11aa438e07a194b3e23d461076a938e3919-332x260-png' } },
  logoBackground: '#ffffff',
  category: 'In-taxi screen technology',
  summary: "DHB's compact taxi screens, combined with Moving Walls' CMS and advertising capabilities, let transit media owners and taxi fleets reach passengers with direct and programmatic campaigns.",
  order: 4,

  heroEyebrow: 'DHB × Moving Walls',
  heroTitle: 'Turn taxi journeys into advertising opportunities',
  heroParagraphs: [
    'Bring your advertising network into the back seat.',
    "Combine DHB's compact taxi screens with Moving Walls' content management and advertising capabilities to reach passengers during their journey and create opportunities for direct and programmatic revenue.",
  ],
  heroCtaText: 'Book a demo',
  heroIllustration: 'screen-network',
  highlights: [
    { _key: key(), _type: 'partnerHighlight', icon: 'screen', text: 'Tablet screens behind the front passenger seat' },
    { _key: key(), _type: 'partnerHighlight', icon: 'settings', text: "Moving Walls' CMS runs on DHB units" },
    { _key: key(), _type: 'partnerHighlight', icon: 'target', text: 'Direct and programmatic advertising' },
  ],

  sections: [
    {
      _key: key(), _type: 'partnerTextSection', icon: 'screen',
      heading: 'A small screen. A new place for brands.',
      intro: "DHB's tablet screens fit behind the front passenger seat, placing advertising in view of passengers seated in the back.",
      paragraphs: ['For transit media owners, this adds an in-car format to your advertising offering. For taxi fleet operators, it creates an opportunity to develop an advertising network across your vehicles.'],
    },
    {
      _key: key(), _type: 'partnerTextSection', icon: 'settings',
      heading: 'Your network. Your content. Your control.',
      intro: "Moving Walls' CMS runs on the DHB units, giving your team the tools to manage screen content and schedule advertising across your taxi network.",
      paragraphs: ['Manage campaigns through the CMS and decide what appears on your screens.'],
    },
    {
      _key: key(), _type: 'partnerCardsSection',
      heading: 'Two ways to build advertising revenue',
      cards: [
        { _key: key(), _type: 'partnerCard', icon: 'megaphone', title: 'Sell directly to brands and agencies', description: "Offer in-car screen space as part of your transit media portfolio or as a dedicated taxi advertising package. Use Moving Walls' CMS to schedule and deliver the campaigns you sell." },
        { _key: key(), _type: 'partnerCard', icon: 'bolt', title: 'Open your network to programmatic buying', description: "Programmatic advertising has been tested on the DHB tablet units running Moving Walls' CMS, providing a foundation for connecting eligible inventory to programmatic demand." },
      ],
    },
    {
      _key: key(), _type: 'partnerCardsSection',
      heading: 'Expand your transit media offering',
      cards: [
        { _key: key(), _type: 'partnerCard', icon: 'layers', title: 'For media owners', description: 'Add passenger-facing taxi screens to your portfolio and offer advertisers another way to reach people on the move.' },
        { _key: key(), _type: 'partnerCard', icon: 'network', title: 'For taxi fleet operators', description: "Explore how your vehicles can support an advertising business, combining DHB screens with Moving Walls' software and monetisation capabilities." },
      ],
    },
    {
      _key: key(), _type: 'partnerCtaSection',
      heading: 'Get your taxi screen network moving',
      paragraphs: [
        'Whether you are adding screens to an existing fleet or developing a new transit media network, start with your vehicles, deployment plans and advertising goals.',
        'Talk to Moving Walls about bringing DHB taxi screens into your network.',
      ],
      buttonText: 'Discuss your taxi screen network',
    },
  ],

  metaTitle: 'DHB × Moving Walls | Taxi Screen Advertising',
  metaDescription: "Combine DHB's in-taxi tablet screens with Moving Walls' CMS to reach back-seat passengers and build direct and programmatic advertising revenue.",
})
console.log('Draft created: drafts.' + ID, '-> /partners/' + SLUG)
