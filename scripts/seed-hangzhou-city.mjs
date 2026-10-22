// Creates a DRAFT China city page for Hangzhou (/locations/china/hangzhou) from "Hangzhou Landing page.docx".
// Layout is cloned from the Chengdu page (same custom-embed sections, Trusted Globally logos, CTA banner),
// with the Hangzhou copy swapped in.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const ID = 'city-china-hangzhou'
const CHENGDU = 'b904808d-6fcc-421c-9e1e-2be1a51792c6'
const HERO = 'image-adc4403737c997aff840a5bd4fb1ef3987a6ba01-960x540-webp'
const k = () => Math.random().toString(36).slice(2, 14)

const exists = await c.fetch('count(*[_type=="locationCity" && slug.current=="hangzhou" && !(_id in [$id, "drafts." + $id])])', { id: ID })
if (exists) { console.error('A Hangzhou city page already exists'); process.exit(1) }

const src = await c.getDocument(CHENGDU)
const embed = src.sections.find((s) => s._type === 'customEmbed')
const logos = src.sections.find((s) => s._type === 'logoCarousel')
const banner = src.sections.find((s) => s._type === 'ctaBanner')

let html = embed.code.replace(/mw-cd-/g, 'mw-hz-').replace(/Chengdu/g, 'Hangzhou')
const swap = (from, to) => {
  if (!html.includes(from)) throw new Error('Template text not found: ' + from.slice(0, 60))
  html = html.replace(from, to)
}

// Why section
swap(
  /<p>Hangzhou is Western China[\s\S]*?<\/p>\s*<p>[\s\S]*?<\/p>/.exec(html)[0],
  `<p>Hangzhou is one of China's leading <strong>digital economy and e-commerce centres</strong>, and a hub for brands built online. Many of these brands already sell overseas through marketplaces and cross-border channels, and they now need <strong>offline presence</strong> to build trust and recognition in new markets.</p>
      <p>DOOH gives online-first brands that physical visibility. Finding the right overseas media is the hard part, and <strong>that's where Moving Walls comes in.</strong></p>`,
)

// Benefits: new heading + 5th card first; 5 cards laid out 3 + 2, centred
html = html.replaceAll('Find Overseas Media Opportunities, Without the Guesswork', 'Build Offline Brand Awareness Beyond Online Channels').replace('Channels" (4 cards)', 'Channels" (5 cards)')
swap(
  '<div class="mw-hz-find__grid">',
  `<div class="mw-hz-find__grid">
      <div class="mw-hz-find__card">
        <span class="mw-hz-find__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 8H6"/></svg></span>
        <h3>Support Cross-Border Sales</h3>
        <p>Use premium DOOH to build awareness that lifts performance on overseas marketplaces and online stores.</p>
      </div>`,
)
swap('Access premium DOOH inventory through our network of media owners across 20+ countries.', 'Access trusted media owners across 20+ countries.')
swap('Plan using audience and location insights, so you know where your target consumers actually are.', 'Plan using audience and location insights to reach your target consumers.')
swap(
  '.mw-hz-find__grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }',
  '.mw-hz-find__grid{ display:flex; flex-wrap:wrap; justify-content:center; gap:22px; }\n    .mw-hz-find__grid > .mw-hz-find__card{ flex:0 1 calc(33.333% - 15px); }',
)
swap(
  '@media (max-width:900px){ .mw-hz-find__grid{ grid-template-columns:1fr 1fr; } }',
  '@media (max-width:900px){ .mw-hz-find__grid > .mw-hz-find__card{ flex-basis:calc(50% - 11px); } }',
)
swap(
  '@media (max-width:560px){ .mw-hz-find__grid{ grid-template-columns:1fr; } }',
  '@media (max-width:560px){ .mw-hz-find__grid > .mw-hz-find__card{ flex-basis:100%; } }',
)

// Regions: intro line under the heading
swap(
  '<h2 class="mw-hz-regions__title">Where Can We Take Your Brand?</h2>',
  '<h2 class="mw-hz-regions__title">Where Can We Take Your Brand?</h2>\n      <p class="mw-hz-regions__lead">These are the popular markets in each region, but we are not limited to them. Tell us where you want to go.</p>',
)
swap(
  '.mw-hz-regions__grid{',
  '.mw-hz-regions__lead{ font-size:16px; line-height:1.7; color:#5B6472 !important; margin:0; }\n    .mw-hz-regions__grid{',
)

// Media types heading (docx wording)
html = html.replaceAll('OOH Media Types Available Overseas', 'Media Types Available Overseas')

// Case study CTA
swap(/Let's Connect(\s*<svg)/.exec(html)[0], /Let's Connect(\s*<svg)/.exec(html)[0].replace("Let's Connect", 'Plan Multi-Market OOH'))

if (/chengdu|mw-cd-|Western China/i.test(html)) throw new Error('Chengdu text left in the embed')

const faqs = [
  ['Why should Hangzhou brands use international DOOH?', 'DOOH builds awareness in premium public places and supports your expansion with measurable results. For online-first brands, it adds offline visibility that complements marketplace and social activity.'],
  ['Which overseas markets can Moving Walls support?', 'Southeast Asia, the Middle East, Africa, Europe, the Americas, and Asia-Pacific, across 20+ countries.'],
  ["I don't know overseas media owners. Can you help?", "Yes. Tell us your target markets and audience, and we'll match you with relevant inventory from our global network."],
  ['Can campaigns run across multiple countries?', 'Yes. You can plan, activate, and manage them in one workflow.'],
  ['How is campaign performance measured?', 'Through audience, location, and delivery data with standardised reporting, so you can compare markets consistently.'],
  ['Can we start with just one market?', 'Yes. Many brands begin with one city or country and expand as results come in.'],
  ['How do we get started?', 'Book a strategy session. Share your target markets, audience, and timing, and our team will suggest relevant opportunities.'],
].map(([question, answer]) => ({ _key: k(), question, answer }))

const img = { _type: 'image', asset: { _type: 'reference', _ref: HERO } }
const doc = {
  _id: `drafts.${ID}`,
  _type: 'locationCity',
  city: 'Hangzhou',
  slug: { _type: 'slug', current: 'hangzhou' },
  country: { _type: 'reference', _ref: src.country._ref },
  heroTitle: 'Take Your Hangzhou Brand Global with DOOH',
  fullDescription: 'Hangzhou brands are growing fast in international markets, and the next step is visibility where your new customers are. Moving Walls connects you to a global network of media owners and premium DOOH inventory, so you can plan, activate, and measure campaigns across borders on one platform.',
  description: 'Give your online-first Hangzhou brand offline visibility overseas. Plan, activate, and measure DOOH across 20+ countries from one platform.',
  heroImage: img,
  ctaButtonText: 'Target Overseas Buyers',
  showAllLocationsButton: true,
  contactFormUrl: src.contactFormUrl,
  isActive: true,
  faqs,
  sectionsPosition: 'before-faqs',
  sections: [
    { ...embed, _key: k(), code: html },
    { ...logos, _key: k() },
    { ...banner, _key: k(), heading: 'Ready to Expand Beyond Hangzhou?', subheading: "Whether you're entering one new market or launching across several regions, Moving Walls helps you plan, activate, and measure international DOOH with confidence.", ctaText: 'Discover Global DOOH' },
  ],
  seo: {
    _type: 'seo',
    metaTitle: 'Hangzhou-to-Global OOH Advertising | Cross-Border DOOH',
    metaDescription: 'Take your Hangzhou brand global. Build offline visibility for cross-border sales with DOOH across 20+ countries, planned and measured on one platform.',
    enableKeywords: false,
    noIndex: false,
    ogImage: img,
  },
}
await c.createOrReplace(doc)
console.log('Draft created: drafts.' + ID, '-> /locations/china/hangzhou')
