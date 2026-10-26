// Creates a DRAFT Taiwan city page for Taipei (/locations/taiwan/taipei) from "Taipei-to-Global DOOH Advertising.docx".
// Section styles are cloned from the Taiwan page (stats strip, 3-step flow, agencies card, programmatic steps,
// capability cards), with Taipei copy. The last block becomes "Expanding beyond Taipei?" with the four key cities.
// Extra FAQs, the card blurb and SEO were written for this page (the doc did not include them).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const ID = 'city-taiwan-taipei'
const TAIWAN = '2ff8d290-ec45-4239-8bc3-26ce1ddff12b'
const HERO_FILE = 'C:/Users/admin/Desktop/ooh-advertising-taipei.webp'
const k = () => Math.random().toString(36).slice(2, 14)

if (await c.fetch('count(*[_type=="locationCity" && slug.current=="taipei" && !(_id in [$id, "drafts." + $id])])', { id: ID })) {
  console.error('A Taipei city page already exists'); process.exit(1)
}

const tw = await c.getDocument(TAIWAN)
const FORM = tw.contactFormUrl // TaiwanContact
const embed = tw.sections.find((s) => s._type === 'customEmbed')
const logos = tw.sections.find((s) => s._type === 'logoCarousel')
const asset = await c.assets.upload('image', fs.createReadStream(HERO_FILE), { filename: 'ooh-advertising-taipei.webp' })
const HERO = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }

let html = embed.code.replace(/mw-tw-/g, 'mw-tp-').replace(/Taiwan Location Page/g, 'Taipei Location Page')
const swap = (from, to) => {
  if (!html.includes(from)) throw new Error('Template text not found: ' + from.slice(0, 70))
  html = html.replace(from, to)
}

// 1. Stats strip: three figures from the doc
swap(/<div class="mw-tp-stats__grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/.exec(html)[0], `<div class="mw-tp-stats__grid">
      <div class="mw-tp-stats__stat">
        <span class="mw-tp-stats__num">US$215M</span>
        <span class="mw-tp-stats__label">Taiwan DOOH Market</span>
        <span class="mw-tp-stats__sub">2025 projection</span>
      </div>
      <div class="mw-tp-stats__stat">
        <span class="mw-tp-stats__num">4</span>
        <span class="mw-tp-stats__label">Key Cities</span>
        <span class="mw-tp-stats__sub">Taipei · Taichung · Tainan · Kaohsiung</span>
      </div>
      <div class="mw-tp-stats__stat">
        <span class="mw-tp-stats__num">2</span>
        <span class="mw-tp-stats__label">Ways to Buy</span>
        <span class="mw-tp-stats__sub">Direct and programmatic activation</span>
      </div>
    </div>
  </div>
</section>`)
swap('.mw-tp-stats__grid{ display:grid; grid-template-columns:1fr 1fr; gap:22px; max-width:760px; margin:0 auto; }', '.mw-tp-stats__grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; max-width:1080px; margin:0 auto; }')

// 2. How it works
swap('Simplify DOOH Planning and Operations Across Taiwan</h2>', 'Simplify DOOH Planning and Operations in Taipei</h2>')
swap(/<p class="mw-tp-flow__lead">[\s\S]*?<\/p>/.exec(html)[0], '<p class="mw-tp-flow__lead">Planning OOH in a major city can involve multiple media owners, formats, locations, buying methods and reporting processes. Moving Walls brings these into one connected workflow.</p>')
swap('identify relevant media opportunities.</p>', 'find relevant media opportunities in Taipei.</p>')
swap('Support direct and programmatic DOOH activation based on campaign requirements, budgets and available inventory.', 'Support direct and programmatic DOOH based on your requirements, budget and available inventory.')
swap('Bring campaign delivery and available performance signals into a clearer and more transparent reporting workflow.', 'Bring campaign delivery and available performance signals into one transparent reporting workflow.')

// 3. Agencies card
swap('<span class="mw-tp-goals__eyebrow">Choose Your Path</span>', '<span class="mw-tp-goals__eyebrow">For Agencies</span>')
swap('What Are You Looking to Achieve?</h2>', 'Bring Taipei DOOH Into Your Media Strategy</h2>')
swap(/<p class="mw-tp-goals__lead">[\s\S]*?<\/p>/.exec(html)[0], '<p class="mw-tp-goals__lead">Plan, activate and report Taipei campaigns in the same workflow as the rest of your media plan.</p>')
swap('<h3>Plan and Activate DOOH Campaigns More Efficiently</h3>', '<h3>Plan and Activate Taipei DOOH Campaigns More Efficiently</h3>')
swap('<p>Bring Taiwan DOOH into your wider media strategy without managing every step through disconnected workflows.</p>', '<p>Bring Taipei DOOH into your wider media strategy without disconnected workflows.</p>')

// 4. Programmatic
swap('Bring More Flexibility to Programmatic DOOH</h2>', 'Programmatic DOOH in Taiwan</h2>')
swap(/<p class="mw-tp-prog__lead">[\s\S]*?<\/p>/.exec(html)[0], '<p class="mw-tp-prog__lead">Programmatic DOOH adds flexibility to activation, but planning, buying and reporting often sit in different systems. Moving Walls connects them: Plan → Activate → Manage → Report.</p>')

// 5. Capability block → "Expanding beyond Taipei?"
swap('<span class="mw-tp-cap__eyebrow">What You Can Do with Moving Walls in Taiwan</span>', '<span class="mw-tp-cap__eyebrow">Expanding Beyond Taipei?</span>')
swap('Focus on the DOOH Capabilities That Fit Your Campaign</h2>', 'Start in Taipei, Scale Across Taiwan</h2>')
swap(/<p class="mw-tp-cap__lead">[\s\S]*?<\/p>/.exec(html)[0], '<p class="mw-tp-cap__lead">Start with a localized Taipei campaign, then coordinate activity across Taichung, Tainan and Kaohsiung through the same platform, with one plan and one report.</p>')
swap(/<div class="mw-tp-cap__grid">[\s\S]*?<\/div>\s*<div class="mw-tp-cap__cta">/.exec(html)[0], `<div class="mw-tp-cap__grid">
      <div class="mw-tp-cap__card">
        <h3>Taipei</h3>
        <p>Taiwan's capital and largest metro, with dense business districts, retail hubs and MRT commuter flows. The natural starting point for most campaigns.</p>
      </div>
      <div class="mw-tp-cap__card">
        <h3>Taichung</h3>
        <p>The main hub of central Taiwan. Extend a Taipei plan to reach shoppers and commuters in the country's second-largest city.</p>
      </div>
      <div class="mw-tp-cap__card">
        <h3>Tainan</h3>
        <p>A historic southern city with strong local and visitor audiences, easy to add when your campaign needs national reach.</p>
      </div>
      <div class="mw-tp-cap__card">
        <h3>Kaohsiung</h3>
        <p>Southern Taiwan's port and industrial centre. Pair it with Taipei to cover both ends of the island in one buy.</p>
      </div>
    </div>
    <div class="mw-tp-cap__cta">`)
swap(/(data-modal-open="mw-tp-cap-modal">)\s*Talk to Us About Your Campaign/.exec(html)[0], 'data-modal-open="mw-tp-cap-modal">\n        Plan a Multi-City Campaign')

html = html
  .replace('"Choose Your Path" — What Are You Looking to Achieve? (agencies card + CTA popup)', '"For Agencies" (agencies card + CTA popup)')
  .replace('"Programmatic DOOH" — Bring More Flexibility to Programmatic DOOH', '"Programmatic DOOH in Taiwan"')
  .replace('"What You Can Do with Moving Walls in Taiwan" (4 capability cards + CTA popup)', '"Expanding Beyond Taipei?" (4 city cards + CTA popup)')
  .replace('Simplify DOOH Planning and Operations Across Taiwan (3 steps)', 'Simplify DOOH Planning and Operations in Taipei (3 steps)')
if (/Taiwan DOOH into|Choose Your Path|mw-tw-/.test(html)) throw new Error('Taiwan copy left in the Taipei embed')

const faqs = [
  ['Can Moving Walls support DOOH in Taipei?', 'Yes. Moving Walls supports planning, activation and measurement workflows for agencies running OOH and DOOH campaigns in Taiwan, including Taipei.'],
  ['Can campaigns be activated programmatically?', 'Yes. Moving Walls supports direct and programmatic DOOH activation across Taiwan, depending on your campaign requirements, budget and available inventory. Contact our team to confirm what is available for your Taipei campaign.'],
  ['Do you work with agencies?', 'Yes. Moving Walls supports agencies in planning, activating and measuring DOOH campaigns in Taipei and across Taiwan, from audience and location-led planning to reporting.'],
  ['Can we start with one product or one use case?', 'Yes. Many agencies start with one need, such as planning or activation, and add more as their Taipei activity grows. Get in touch to discuss the scope that fits your campaign.'],
  ['Can Moving Walls work with our existing setup?', 'Moving Walls brings planning, activation and reporting into one connected workflow. Talk to our team about how it fits your current setup.'],
  ['Can a Taipei campaign run alongside other cities in Taiwan?', 'Yes. You can start in Taipei and add Taichung, Tainan or Kaohsiung to the same plan, with consistent reporting across every city.'],
  ['How is campaign performance reported?', 'Campaign delivery and the performance signals available for your setup are brought into one reporting workflow, so you can see what ran and how it performed without stitching reports together.'],
].map(([question, answer]) => ({ _key: k(), question, answer }))

await c.createOrReplace({
  _id: `drafts.${ID}`,
  _type: 'locationCity',
  country: { _type: 'reference', _ref: TAIWAN },
  city: 'Taipei',
  slug: { _type: 'slug', current: 'taipei' },
  order: 1,
  isActive: true,
  heroTitle: 'Outdoor Advertising in Taipei',
  heroImage: HERO,
  fullDescription: "Taipei is one of Taiwan's four key cities for DOOH, within a national digital out-of-home market projected at approximately US$215 million in 2025.\n\nMoving Walls helps agencies plan, activate and measure DOOH campaigns in Taipei through one connected platform, so reaching Taipei audiences is simpler, more flexible and easier to measure.",
  description: "Taiwan's capital and biggest DOOH market. Plan, activate and measure Taipei campaigns on one platform.",
  ctaButtonText: 'Explore Taipei DOOH',
  showAllLocationsButton: true,
  contactFormUrl: FORM,
  sectionsPosition: 'before-faqs',
  sections: [
    { ...embed, _key: k(), code: html },
    { ...logos, _key: k() },
    {
      _key: k(), _type: 'ctaBanner', backgroundColor: 'blue',
      heading: 'Get a Taipei Media Plan',
      subheading: "Whether you're planning a localized campaign in Taipei or coordinating across Taiwan, manage every stage through one unified cloud platform.",
      ctaText: 'Talk to Us', ctaLink: FORM,
    },
  ],
  faqs,
  seo: {
    _type: 'seo',
    metaTitle: 'Taipei DOOH Advertising | Programmatic & Direct OOH',
    metaDescription: "Plan, activate and measure DOOH campaigns in Taipei, part of Taiwan's US$215M digital out-of-home market. Direct and programmatic buying on one platform.",
    enableKeywords: false,
    noIndex: false,
    ogImage: HERO,
  },
})
console.log('Draft created: drafts.' + ID, '-> /locations/taiwan/taipei')
