// Creates DRAFT blog posts (6 Nov 2026), publish after checking:
//  1. Sai Bhavani: "From 11.11 to Black Friday…" (English version of the doc only; the Chinese version is not approved)
//     /blog/11-11-black-friday-overseas-ooh-campaigns
//  2. Sherlee: "Is Your Brand Ready for American Out-of-Home?…" ("Revised" tab of the doc)
//     /blog/us-ooh-advertising-readiness-checklist
// Slugs, SEO titles and meta descriptions from Dg. Images exported from the docs and converted to webp
// (the docs' "Agent Ron" tab images are not used). Small copy fixes: a missing full stop after "12 months",
// and the gap in "among exposed audiences  a 38-percentage-point lift" became a comma.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const IMG_DIR = 'C:/Users/admin/AppData/Local/Temp/claude/2b2d14aba91acf9d/a43eb24c-7bbe-4357-b473-79a9d4af0bcc/scratchpad/blog/'
const AUTHOR = { saibhavani: '32439772-fe0d-4116-94b7-a16ff6fc71bb', sherlee: '777f6b27-d404-4ed9-b843-99dcf07d5d5f' }
const CAT = {
  dooh: 'dsdzDBKQU3TOwM9o6lSZUA',
  planning: 'dsdzDBKQU3TOwM9o6lSaDe',
  programmatic: '777c84d8-de0a-48fa-818f-bb21cc35c844',
  measuring: '05fd385f-14a8-4108-98ab-cdfaa1669eb3',
  dataDriven: 'dsdzDBKQU3TOwM9o6lSZF0',
}
const k = () => Math.random().toString(36).slice(2, 14)
const upload = async (file) => (await c.assets.upload('image', fs.createReadStream(IMG_DIR + file), { filename: file }))._id

// Inline text: **bold** and [text](url)
const spans = (text) => {
  const markDefs = []
  const children = []
  for (const part of text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).filter(Boolean)) {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    const bold = part.match(/^\*\*(.+)\*\*$/)
    if (link) {
      const key = k()
      markDefs.push({ _key: key, _type: 'link', href: link[2] })
      // a link may itself contain bold text
      const inner = link[1].match(/^\*\*(.+)\*\*$/)
      children.push({ _key: k(), _type: 'span', marks: inner ? [key, 'strong'] : [key], text: inner ? inner[1] : link[1] })
    } else if (bold) {
      children.push({ _key: k(), _type: 'span', marks: ['strong'], text: bold[1] })
    } else children.push({ _key: k(), _type: 'span', marks: [], text: part })
  }
  return { markDefs, children }
}
const block = (style, text, listItem) => ({ _key: k(), _type: 'block', style, ...(listItem ? { listItem, level: 1 } : {}), ...spans(text) })
const build = async (items) => {
  const out = []
  for (const [type, ...a] of items) {
    if (type === 'p') out.push(block('normal', a[0]))
    else if (type === 'h2') out.push(block('h2', a[0]))
    else if (type === 'ul') a[0].forEach((t) => out.push(block('normal', t, 'bullet')))
    else if (type === 'img') out.push({ _key: k(), _type: 'image', asset: { _type: 'reference', _ref: await upload(a[0]) }, alt: a[1], ...(a[2] ? { caption: a[2] } : {}) })
  }
  return out
}

const POSTS = [
  {
    slug: '11-11-black-friday-overseas-ooh-campaigns',
    title: 'From 11.11 to Black Friday: How Brands and E-commerce Platforms Can Take Their OOH Campaigns Overseas',
    author: AUTHOR.saibhavani,
    categories: [CAT.dooh, CAT.planning, CAT.programmatic, CAT.measuring],
    featured: ['11-11-black-friday-overseas-ooh-campaigns.webp', '11.11 and Black Friday shopping campaigns on digital billboards in cities overseas'],
    seo: ['11.11 to Black Friday OOH: Scaling Cross-Border Ad Campaigns', 'Scale campaigns from 11.11 to Black Friday. Discover how e-commerce brands use overseas DOOH, digital billboards, and brand lift studies to drive holiday sales.'],
    content: [
      ['p', 'As major shopping periods approach, brands and e-commerce platforms face increasing competition for consumer attention. With promotional messages filling social media feeds, search results and online marketplaces, making a brand stand out has become a growing challenge.'],
      ['p', 'China’s 11.11 shopping festival and Black Friday, which has grown beyond its US origins into a global retail phenomenon, are prime examples of periods when promotional activity intensifies. With so many brands competing for attention online, how can advertisers give their messages greater prominence?'],
      ['p', 'Out-of-home (OOH) advertising offers another way to capture attention beyond digital feeds. Through digital billboards, shopping mall screens and transit media, brands and e-commerce platforms can bring their campaigns into prominent physical environments, complementing digital marketing and strengthening visibility among their target audiences.'],
      ['h2', 'From 11.11 to Black Friday: Reaching New Audiences'],
      ['p', 'Campaign messaging should reflect the audiences and market conditions it is designed to reach. Brands need to consider local shopping habits, product availability and the channels through which customers make purchases.'],
      ['p', 'For example, an electronics brand promoting its products through US retailers could use digital billboards near shopping districts to build brand awareness ahead of Black Friday. Coordinated search, social media and e-commerce campaigns can then help interested consumers discover the products.'],
      ['p', 'The priority is to identify relevant markets, understand local audiences and ensure the campaign message connects with their needs.'],
      ['h2', 'How OOH Supports Seasonal Campaigns'],
      ['p', 'During Black Friday, brands compete for attention across online marketplaces, search, social media and promotional emails. OOH adds another opportunity to reach consumers in physical environments.'],
      ['p', 'Digital billboards, shopping mall screens and transit media can support different campaign objectives, from building awareness to reinforcing a locally available promotion.'],
      ['p', 'Brands can structure their campaigns around three stages:'],
      ['ul', [
        '**Build recognition:** Introduce the brand or product before the main promotional period.',
        '**Reinforce consideration:** Coordinate OOH messaging with search, social media and e-commerce campaigns.',
        '**Highlight the offer:** Where media bookings permit creative changes, feature a relevant Black Friday promotion closer to the event.',
      ]],
      ['p', 'The aim is to integrate OOH into the wider media plan, with consistent messaging and a clear route to purchase.'],
      ['h2', 'Chinese Advertisers Are Exploring International DOOH'],
      ['img', 'chinese-brand-digital-billboard-overseas.webp', 'Brand campaign on a large digital billboard above a busy city street at night'],
      ['p', 'According to research reported by [Marketing-Interactive](https://www.marketing-interactive.com/international-pdooh-campaigns-surge-as-chinese-advertisers-go-global), 25% of surveyed Chinese advertisers had booked programmatic DOOH campaigns outside China in the preceding 12 months.'],
      ['p', 'This indicates that international programmatic DOOH is already part of the media mix for some Chinese advertisers. For brands planning overseas campaigns, the next step is identifying the right markets, relevant media environments and suitable measurement objectives.'],
      ['h2', 'Planning for Black Friday 2026'],
      ['p', 'With Black Friday falling on 27 November 2026, brands have approximately four weeks from 29 October to prepare. A focused timeline can help teams prioritise the essential decisions.'],
      ['p', '**29 October–10 November: Confirm the market and inventory.** Select a market where the brand is ready to sell, establish the budget, and confirm media availability and booking requirements.'],
      ['p', '**11–20 November: Finalise creative and coordinate channels.** Localise the messaging, verify promotional terms and align OOH with the brand’s digital campaigns.'],
      ['p', '**21–27 November: Highlight the Black Friday offer.** Where the booking allows, update the creative to feature the promotion and direct consumers to the relevant local retailer or e-commerce page.'],
      ['p', 'These are recommended planning milestones. Actual launch dates depend on media availability, production requirements, and approval timelines.'],
      ['h2', 'Measure More Than Media Delivery'],
      ['p', 'International campaigns need clear measurement objectives, not just a record of where advertisements appeared.'],
      ['p', 'Moving Walls’ [BYD SHARK campaign in the UAE](https://www.movingwalls.com/case-studies/byd-shark-cinema-brand-lift-uae) demonstrates how overseas advertising can be evaluated through brand lift research. The campaign used cinema advertising and compared exposed audiences with a control group.'],
      ['p', 'Moving Walls reported that awareness of BYD’s pickup-truck offering increased from 58% to 96% among exposed audiences, a **38-percentage-point lift**.'],
      ['p', 'This was a cinema campaign, not an OOH campaign, so the result should not be attributed to outdoor advertising. It demonstrates the importance of evaluating audience response alongside media delivery.'],
      ['p', 'For OOH campaigns, brands can track media delivery, estimated reach, brand awareness and landing-page activity. Where suitable data and methodology are available, controlled studies can help assess incremental impact.'],
      ['h2', 'How Moving Walls Supports Overseas OOH Campaigns'],
      ['p', 'Moving Walls provides a connected technology platform that supports OOH planning, campaign execution and measurement across markets.'],
      ['p', 'Brands and agencies retain control of their strategy, budgets and client relationships. The platform supports the operational work involved in coordinating campaigns across media environments, helping teams manage execution and evaluate performance.'],
      ['p', 'For Chinese brands preparing for Black Friday or planning future international campaigns, this offers a structured approach to exploring overseas OOH opportunities.'],
      ['p', 'Planning your next overseas **OOH campaign?**'],
      ['p', 'Take the [OOH readiness quiz](https://survey.zohopublic.com/zs/JHjE75) to assess your preparation for international expansion, or explore [Moving Walls’ China-to-Global platform](https://www.movingwalls.com/locations/china).'],
    ],
  },
  {
    slug: 'us-ooh-advertising-readiness-checklist',
    title: 'Is Your Brand Ready for American Out-of-Home? A Self-Assessment for Brands Entering the US',
    author: AUTHOR.sherlee,
    categories: [CAT.planning, CAT.dooh, CAT.dataDriven, CAT.measuring],
    featured: ['us-ooh-advertising-readiness-checklist.webp', 'DOOH readiness checklist for the US market: is your brand ready for American out-of-home?'],
    seo: ['US OOH Advertising Readiness: Brand Self-Assessment Guide', 'Entering the US OOH market? Take our 5-pillar readiness assessment to navigate fragmented inventory, state privacy laws, and audience-first DOOH planning.'],
    content: [
      ['p', 'The US is one of the most rewarding markets a brand can crack, and one of the least forgiving. Before a single dollar goes into US out-of-home advertising, whether billboards or digital screens, it pays to know whether your team has the foundations to make that spend work. This assessment will help you find out.'],
      ['h2', 'The Realities of Entering the US OOH Market'],
      ['p', 'Running outdoor campaigns in your home market is usually second nature. You know who owns which screens, how deals get done, and what stakeholders expect to see in a post-campaign report.'],
      ['p', 'Entering the US changes almost all of that.'],
      ['p', 'Brands across consumer tech, automotive, e-commerce, gaming, beauty, and fashion are putting the US near the top of their growth plans. However, entering this mature market comes with challenges, including fragmented media ownership, local currency requirements, and regulations that vary by state and city. Inventory spans nationwide and regional operators, while buyers expect [standardized audience measurement](https://oaaa.org/resources/ooh-measurement/). Brands must also consider how American consumers expect their personal and location data to be handled.'],
      ['p', 'In other words, securing screens is the simple bit. The harder question is whether your US market entry strategy equips your team to plan, run, and prove a campaign in America. The assessment below is built to answer exactly that.'],
      ['h2', 'Five Mistakes That Derail US Launches'],
      ['img', 'us-ooh-launch-planning-mistakes.webp', 'Two marketers reviewing campaign data on a laptop and printed reports', 'Source: Canva AI'],
      ['p', 'Access to good locations does not guarantee a successful US OOH campaign. The difference often comes down to the decisions made before launch. Here are some common OOH media planning mistakes that can affect campaign performance:'],
      ['p', '**Planning for "America" instead of American cities:** The country behaves less like one market and more like a collection of very different ones. Commuters in Chicago, families in suburban Atlanta, and tourists in Orlando live, travel, and shop in completely different ways. One national set of assumptions will leave most cities underserved.'],
      ['p', '**Buying the landmark, missing the customer:** A spot in Times Square or in Las Vegas looks impressive in a press release, yet your buyers may rarely pass by. Most Americans get around by car, so highway boards, fuel station screens, and suburban [shopping centers](https://www.movingwalls.com/blog/dooh-the-new-shopfront-for-retail-brands) may deliver more of the right people than famous downtown sites, depending on your audience and campaign objectives.'],
      ['p', '**Working without the full map:** With so many media owners involved, each running its own pricing, formats, and booking steps, it’s easy to see only the slice of inventory your existing contacts offer. That leads to repeated negotiations, patchy coverage, and missed opportunities in every new city.'],
      ['p', '**Overlooking the rulebook:** Outdoor advertising in the US is regulated at the federal, state, and local levels. The federal [Highway Beautification Act](https://www.fhwa.dot.gov/real_estate/oac/) establishes controls for outdoor advertising along certain federal-aid highways, while states and cities set additional requirements for permits, zoning, and sign placement. Four states (Alaska, Hawaii, Maine, and Vermont) have laws that broadly prohibit or restrict billboards, subject to specific exceptions. Privacy requirements also vary by state. For example, [Maryland’s Online Data Privacy Act](https://oag.maryland.gov/resources-info/Pages/data-privacy.aspx), effective October 2025, classifies precise geolocation data as sensitive data and prohibits its sale. Rules like this can affect how location data is collected, processed, shared, and used, so practices that are standard elsewhere may need rethinking before a US campaign launches.'],
      ['p', '**Recycling the home-market playbook:** Creative and messaging that perform well at home can fall flat with American viewers, who tend to reward relevance to their local area, a straightforward reason to buy, and a brand they feel they can trust. Targets, goals, and success metrics usually need recalibrating too.'],
      ['h2', 'Rate Your Readiness'],
      ['p', 'Give your team a score of 0, 1, or 2 in each area:'],
      ['ul', ['**0** = Missing', '**1** = In progress, with noticeable gaps', '**2** = Established, written down, and repeatable']],
      ['p', 'Add up your scores across all five areas for a total out of 10.'],
      ['p', '**Area 1:** US landscape knowledge. Does your team genuinely understand how American OOH works, from local regulations and privacy law to how cities differ, or are you relying on assumptions from other markets?'],
      ['p', '**Area 2:** Audience insight. Is your plan driven by data on where your customers spend their time, or by whichever sites are well known or open for booking?'],
      ['p', '**Area 3:** Inventory reach. Do you have visibility across national, regional, and local media owners, or just the few partners you’ve used before?'],
      ['p', '**Area 4:** Tailored planning. Were the strategy and creative developed specifically for US audiences and individual cities, or reworked from a campaign made for another market?'],
      ['p', '**Area 5:** Unified measurement. Can you access comparable [OOH audience measurement](https://www.movingwalls.com/blog/ooh-101-a-guide-to-successful-ooh-campaign-measurements) and campaign performance metrics across the cities and formats in your US plan?'],
      ['h2', 'Reading Your Result'],
      ['ul', [
        '**0 to 3 points, Starting Out:** US outdoor activity is ad hoc, perhaps a single high-profile placement. Foundations need building before you scale.',
        '**4 to 6 points, Building:** Some cities or campaigns run smoothly, while others still lack a clear process.',
        '**7 to 8 points, Aligned:** Delivery is largely consistent across cities, with a few remaining weak spots in planning or measurement.',
        '**9 to 10 points, Expansion-Ready:** Your team can roll into new US markets with confidence.',
      ]],
      ['p', 'Not sure what your score means for your launch? [Talk to our US team about a personalized readiness consultation](https://www.movingwalls.com/locations/americas).'],
      ['h2', 'An Audience-First Campaign in Practice'],
      ['p', 'Moving Walls’ [programmatic DOOH](https://www.movingwalls.com/blog/what-are-the-benefits-of-programmatic-dooh) campaign for [AHA in the US](https://www.movingwalls.com/case-studies/aha-programmatic-dooh-us-campaign) demonstrates what planning around people, rather than placements, can achieve. The campaign reached South Indian expats in the supermarkets where they shop:'],
      ['ul', [
        'Duration: 12 days',
        'Footprint: more than 100 supermarkets across US retail hubs',
        'Targeting: audience-relevant locations, activated through programmatic DOOH',
        'Delivery: 552,853 impressions',
      ]],
      ['p', 'The results came from identifying where the target audience actually was and buying programmatically to reach them there, rather than relying on a handful of well-known sites. In a market as large and fragmented as the US, that discipline is what turns screen presence into results.'],
      ['img', 'aha-programmatic-dooh-us-supermarket.webp', 'AHA programmatic DOOH campaign on a digital screen at a US supermarket checkout', 'Source: AHA x Moving Walls DOOH campaign in the US'],
      ['h2', 'Turning Gaps Into a Plan'],
      ['p', 'A low score in visibility, audience data, or measurement doesn’t mean the US should wait. It simply shows where to focus first. Share your score with our team, and we’ll turn it into a prioritized plan for your US launch, covering the cities, audiences, and measurement approach that matter most to your brand.'],
      ['p', '[Moving Walls](https://www.movingwalls.com/) brings audience intelligence, OOH media planning, campaign activation, and measurement together in one connected platform, helping agencies and brands make informed planning decisions, access available inventory, and evaluate DOOH advertising performance across markets.'],
      ['p', 'Scored your team? [Request your personalized US OOH readiness consultation](https://www.movingwalls.com/locations/americas) →'],
    ],
  },
]

const now = new Date().toISOString()
const tx = c.transaction()
for (const p of POSTS) {
  if (await c.fetch('count(*[_type=="blogPost" && slug.current==$s && !(_id in path("drafts.**")) ])', { s: p.slug })) throw new Error('Slug already published: ' + p.slug)
  const featured = { _type: 'image', alt: p.featured[1], asset: { _type: 'reference', _ref: await upload(p.featured[0]) } }
  tx.createOrReplace({
    _id: `drafts.blog-${p.slug}`,
    _type: 'blogPost',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    language: 'en',
    isPublished: true,
    status: 'published',
    author: { _type: 'reference', _ref: p.author },
    categories: p.categories.map((ref) => ({ _key: k(), _type: 'reference', _ref: ref })),
    featuredImage: featured,
    publishedAt: now,
    content: await build(p.content),
    seo: { _type: 'seo', metaTitle: p.seo[0], metaDescription: p.seo[1], enableKeywords: false, noIndex: false, ogImage: featured },
  })
}
await tx.commit()
console.log('Drafts created:', POSTS.map((p) => '/blog/' + p.slug).join(', '))
