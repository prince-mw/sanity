// Creates a DRAFT blog post (23 Nov 2026) by Sukriti Taneja, publish after Dg checks it:
//   "India's Digital Audience Has Crossed 880 Million. But What Does That Actually Tell Advertisers About Reach?"
//   -> /blog/india-digital-audience-advertising-reach
// Source: "Vtion content-to-sales funnel" Google Doc, tab "Article 1" only (no label, no LinkedIn teaser).
// Copy verbatim except: "Moving Walls Science" -> "MW Science" (naming rule); stray trailing "open" removed.
// The "{Research references: ...}" line became inline source links (IAMAI-Kantar, TRAI, Google Ads; verified 23 Nov 2026).
// "95.22%" kept as written (Dg). Featured image: Dg's 960x540 JPG -> WebP.
// End: ONE ctaButton block with the new optional second button (secondaryText/secondaryUrl) -> two buttons in one row.
// Usage: node scripts/seed-blog-india-digital-audience-reach.mjs <path to india-digital-audience-advertising-reach.webp>
import fs from 'fs'
import { createClient } from '@sanity/client'
import { px } from './data/location-seo-nov2026/pxwidth.mjs'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const IMG = process.argv[2]
if (!IMG || !fs.existsSync(IMG)) throw new Error('Pass the path to the featured .webp')
const AUTHOR = '9c537fd9-4553-478a-b8cb-2cce46c501b8' // Sukriti Taneja
const CATS = ['0313919a-8e6f-451c-9cd5-f548f38f99e5', 'dsdzDBKQU3TOwM9o6lSZF0', '05fd385f-14a8-4108-98ab-cdfaa1669eb3'] // MW Science, Data Driven OOH, Measuring OOH Effectiveness
const SITE = 'https://www.movingwalls.com'
const IAMAI = 'https://www.iamai.in/sites/default/files/research/Kantar_%20IAMAI%20report_2024_.pdf'
const TRAI = 'https://trai.gov.in/sites/default/files/2025-06/PR_No.49of2025.pdf'
const GADS = 'https://support.google.com/google-ads/answer/2472714'
const k = () => Math.random().toString(36).slice(2, 14)

const spans = (text) => {
  const markDefs = []
  const children = []
  for (const part of text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).filter(Boolean)) {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    const bold = part.match(/^\*\*(.+)\*\*$/)
    if (link) {
      const key = k()
      markDefs.push({ _key: key, _type: 'link', href: link[2] })
      children.push({ _key: k(), _type: 'span', marks: [key], text: link[1] })
    } else if (bold) children.push({ _key: k(), _type: 'span', marks: ['strong'], text: bold[1] })
    else children.push({ _key: k(), _type: 'span', marks: [], text: part })
  }
  return { markDefs, children }
}
const block = (style, text, listItem) => ({ _key: k(), _type: 'block', style, ...(listItem ? { listItem, level: 1 } : {}), ...spans(text) })
const build = (items) => items.flatMap(([type, ...a]) => {
  if (type === 'p') return [block('normal', a[0])]
  if (type === 'h2' || type === 'h3') return [block(type, a[0])]
  if (type === 'ul') return a[0].map((t) => block('normal', t, 'bullet'))
  if (type === 'cta2') return [{ _key: k(), _type: 'ctaButton', text: a[0], url: a[1], style: 'primary', alignment: 'left', secondaryText: a[2], secondaryUrl: a[3], secondaryStyle: 'secondary' }]
  throw new Error('Unknown item ' + type)
})

const P = {
  slug: 'india-digital-audience-advertising-reach',
  title: "India's Digital Audience Has Crossed 880 Million. But What Does That Actually Tell Advertisers About Reach?",
  alt: 'India has 886 million internet users: 488M rural and 397M urban. But is your campaign reaching the right audience?',
  seo: [
    "India's 886M Internet Users: What It Means for Ad Reach",
    "India has 886M internet users, but scale isn't reach. See why advertisers need unique reach, frequency and state-level delivery data to plan smarter.",
  ],
  content: [
    ['p', `[India's digital advertising market](${SITE}/locations/india) continues to grow, but greater audience scale doesn't necessarily translate into more effective campaigns.`],
    ['p', 'For advertisers investing across social and paid media, the challenge is understanding not just how much visibility they are generating, but how efficiently they are reaching audiences, where delivery is concentrated, and where opportunities are being missed.'],
    ['p', 'Consider the numbers.'],
    ['p', `According to the [IAMAI-Kantar Internet in India 2024 report](${IAMAI}), India had 886 million active internet users in 2024.`],
    ['p', 'Of these, 488 million were rural users and 397 million were urban users.'],
    ['p', "Rural India therefore accounted for a larger share of the country's active internet audience."],
    ['p', `[TRAI's Indian Telecom Services Yearly Performance Indicators 2024–25](${TRAI}) reported 969.1 million internet subscriptions as of March 2025, of which 95.22% were mobile wireless subscriptions.`],
    ['p', 'These figures describe different things: active users and internet subscriptions. Neither should be treated as a direct measure of advertising reach.'],
    ['p', "Yet together, they illustrate the scale, diversity and mobile-led nature of India's digital environment."],
    ['p', 'For advertisers, understanding this landscape also means understanding how their brand compares with competitors. Comparative social Share of Voice (SOV) can reveal how much of the conversation a brand commands relative to others in its category, providing a clearer picture of its competitive visibility and where it may be losing ground.'],

    ['h2', 'The problem with treating campaign performance as campaign effectiveness'],
    ['p', 'Campaigns across social and paid media can generate substantial activity while still leaving questions around audience overlap, delivery efficiency, exposure, and whether investment is reaching the intended audiences and markets.'],
    ['p', 'A large addressable audience does not automatically translate into uniform campaign delivery. Three measurement considerations deserve closer attention:'],
    ['h3', '1. Geographic distribution'],
    ['p', `[Research](${IAMAI}) shows significant differences in internet penetration across states. 2024 estimates placed [Kerala](${SITE}/locations/india/kerala) at 72% and Goa at 71%, compared with 43% in Bihar and 46% in Uttar Pradesh.`],
    ['p', 'A national audience figure can therefore conceal substantial differences in digital access and audience distribution across markets.'],
    ['h3', '2. Audience duplication and frequency'],
    ['p', 'An impression is a delivery event, not necessarily a unique individual.'],
    ['p', `Where audiences interact with multiple devices, platforms and advertising environments, [deduplicated reach and frequency](${SITE}/blog/ooh-measurement-made-simple-decode-dooh-campaign-data) become important measurement considerations.`],
    ['p', `Google Ads, for example, describes its [unique reach methodology](${GADS}) as using statistical models to account for cross-device behaviour, aggregated observations and local inputs.`],
    ['p', 'The underlying issue is not whether impressions are being counted. It is whether marketers understand how those impressions translate into unique audience exposure.'],
    ['h3', '3. Audience composition'],
    ['p', 'A campaign can achieve substantial reach without necessarily delivering the intended audience composition.'],
    ['p', 'For brands operating across multiple consumer segments, the distribution of exposure across age groups, locations, languages, and other relevant audience characteristics matters.'],
    ['p', 'Aggregate reach alone cannot answer all these questions.'],

    ['h2', 'The next measurement challenge is connecting audience and delivery intelligence'],
    ['p', `A more sophisticated [media planning framework](${SITE}/mw-planner) needs to consider several dimensions together:`],
    ['ul', [
      '**Addressable audience:** How large is the relevant audience in each market?',
      '**Actual campaign delivery:** Where and when is the campaign delivering?',
      '**Unique reach:** How much of the audience has been reached after accounting for duplication?',
      '**Frequency distribution:** How is exposure distributed across that audience?',
      '**Geographical coverage:** Does delivery correspond with the markets that matter commercially?',
      `**Cross-channel contribution:** What additional exposure can [complementary media environments](${SITE}/blog/saudi-arabia-digital-ooh-incremental-reach) provide?`,
    ]],
    ['p', 'This changes the role of campaign reporting.'],
    ['p', 'Instead of simply evaluating whether a campaign achieved its planned impression volume, marketers can begin asking whether its delivery was aligned with the intended audience and market strategy.'],

    ['h2', 'From audience intelligence to connected media planning'],
    ['p', 'There is also an opportunity to use campaign intelligence beyond the digital environment in which it originates.'],
    ['p', `Where campaign analysis identifies geographical opportunities, brands can evaluate whether OOH and [pDOOH](${SITE}/blog/programmatic-dooh-explained) can provide complementary exposure in relevant locations and dayparts.`],
    ['p', "This requires more than identifying an underperforming geography. It requires understanding audience presence, available inventory, location relevance, and the campaign's actual objectives."],
    ['p', `At Moving Walls, this is the thinking behind [connecting social campaign intelligence with real-world media opportunities](${SITE}/blog/extend-social-media-campaigns-with-dooh) through URL to IRL.`],
    ['p', `[MW Science](${SITE}/mw-science) brings audience, campaign, and location intelligence into the media planning conversation.`],
    ['p', 'The objective is to make campaign insights more useful in determining what happens next across the wider media mix.'],

    ['h2', 'The question marketers should be asking'],
    ['p', "India's digital audience is already enormous. The next competitive advantage will not come simply from reporting a larger number of impressions."],
    ['p', 'It will come from understanding who those impressions represent, where exposure is concentrated, how frequency is distributed and whether media investment is reaching the markets that matter.'],
    ['p', 'The question is no longer just how many people a campaign can reach. It is how intelligently that reach is planned, measured and extended.'],
    ['cta2', 'Explore MW Science', '/mw-science', 'Explore OOH in India', '/locations/india'],
  ],
}

const t = px(P.seo[0], 20), d = px(P.seo[1], 14)
if (t > 600 || d > 960) throw new Error(`SEO too wide: ${t}px/${d}px`)
if (await c.fetch('count(*[_type=="blogPost" && slug.current==$s && !(_id in path("drafts.**"))])', { s: P.slug })) throw new Error('Slug already published')
const asset = await c.assets.upload('image', fs.createReadStream(IMG), { filename: P.slug + '.webp' })
const featured = { _type: 'image', alt: P.alt, asset: { _type: 'reference', _ref: asset._id } }
await c.createOrReplace({
  _id: `drafts.blog-${P.slug}`,
  _type: 'blogPost',
  title: P.title,
  slug: { _type: 'slug', current: P.slug },
  language: 'en',
  isPublished: true,
  status: 'published',
  author: { _type: 'reference', _ref: AUTHOR },
  categories: CATS.map((ref) => ({ _key: k(), _type: 'reference', _ref: ref })),
  featuredImage: featured,
  publishedAt: new Date().toISOString(),
  content: build(P.content),
  seo: { _type: 'seo', metaTitle: P.seo[0], metaDescription: P.seo[1], enableKeywords: false, noIndex: false, ogImage: featured },
})
console.log(`Draft created: /blog/${P.slug} (SEO ${t}px/${d}px)`)
