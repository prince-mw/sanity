// Creates 2 DRAFT market blog posts (17 Nov 2026), author Staff Writer, publish after Dg checks them:
//  1. "OOH Advertising in Oman: Reaching Audiences Across a Growing Market" -> /blog/ooh-advertising-in-oman
//  2. "Advertising in Qatar: Reaching Audiences Through Out-of-Home"       -> /blog/ooh-advertising-in-qatar
// Source: the two Google Docs (Oman_blogpost_marketing_28/10/26, Advertising in Qatar_blog_Marketing_28/10/26). Copy is the docs' own.
// Formatting: city sub-headings (plain text in the docs) made H3; format bullet labels bold.
// Added: internal links (location + city pages, MW Planner/Activate/Measure, related blogs), source links for the
// population figures (checked 17 Nov 2026), and a CTA button to the country page.
// Usage: node scripts/seed-blog-oman-qatar-ooh.mjs <folder with ooh-advertising-in-oman.webp + ooh-advertising-in-qatar.webp>
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const DIR = process.argv[2]
if (!DIR) throw new Error('Pass the folder holding the .webp files')
const AUTHOR = 'Ry20dN2rA2x7HRIvRFOfuf' // Staff Writer
const CAT = { dooh: 'dsdzDBKQU3TOwM9o6lSZUA', planning: 'dsdzDBKQU3TOwM9o6lSaDe', trends: 'dsdzDBKQU3TOwM9o6lSZyU' }
const SITE = 'https://www.movingwalls.com'
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
      const inner = link[1].match(/^\*\*(.+)\*\*$/)
      children.push({ _key: k(), _type: 'span', marks: inner ? [key, 'strong'] : [key], text: inner ? inner[1] : link[1] })
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
  if (type === 'cta') return [{ _key: k(), _type: 'ctaButton', text: a[0], url: a[1], style: 'primary', alignment: 'left' }]
  throw new Error('Unknown item ' + type)
})

const POSTS = [
  {
    slug: 'ooh-advertising-in-oman',
    title: 'OOH Advertising in Oman: Reaching Audiences Across a Growing Market',
    image: ['ooh-advertising-in-oman.webp', 'Digital billboards and DOOH screens along a Muscat waterfront road at dusk, with a mosque and fort in the background'],
    seo: [
      'OOH Advertising in Oman: Muscat, Salalah & Sohar Guide',
      'Plan OOH and DOOH advertising in Oman: key locations in Muscat, Salalah and Sohar, the right formats, measurement and regulations to know before you launch.',
    ],
    content: [
      ['p', `Oman's evolving urban landscape, expanding tourism sector and growing commercial activity are creating new opportunities for brands to connect with consumers beyond traditional media channels. From the busy business districts of Muscat to Salalah's seasonal tourism hotspots and Sohar's industrial and logistics hubs, [out-of-home (OOH) advertising in Oman](${SITE}/locations/oman) offers brands a way to reach audiences across the places where they live, work, shop and travel.`],
      ['p', 'As the Sultanate continues to develop its infrastructure, retail destinations and tourism offerings, digital out-of-home (DOOH) advertising provides advertisers with greater flexibility to plan campaigns around audience movement, location and timing.'],

      ['h2', 'Why Is Oman an Opportunity for OOH Advertising?'],
      ['p', `Oman's population reached [approximately 5.36 million at the end of 2025](https://www.muscatdaily.com/2026/01/20/omanis-make-up-56-7-of-population-as-total-reaches-5-36mn/), with Muscat Governorate accounting for around 1.53 million residents. The country's diverse population, expanding commercial centres and established transport networks create opportunities for advertisers seeking to connect with both local and expatriate audiences.`],
      ['p', "Unlike markets concentrated around a single commercial district, Oman's advertising opportunities vary across its urban centres. Muscat offers broad consumer and business reach, while Salalah, Sohar, Nizwa and Sur provide access to distinct audience groups and regional markets."],
      ['p', 'For advertisers, this means campaign planning should consider not only where people live, but also how they move between commercial districts, retail destinations, workplaces, transport hubs and tourism attractions.'],

      ['h2', 'Key Locations for Outdoor Advertising in Oman'],
      ['p', "Choosing the right locations is essential to building an effective OOH campaign. Each of Oman's major urban centres offers different opportunities depending on the audience and campaign objectives."],
      ['h3', "Muscat: Reaching Oman's Core Consumer Market"],
      ['p', "As the country's principal business and commercial centre, Muscat offers access to a large concentration of residents, professionals, shoppers and commuters. Digital billboards along major roads, roadside placements and screens near commercial and retail destinations can help brands build visibility across the capital."],
      ['p', `For campaigns seeking broad urban reach, [Muscat](${SITE}/locations/oman/muscat) is a natural starting point for developing an OOH media plan.`],
      ['h3', 'Salalah: Connecting with Seasonal Tourism Audiences'],
      ['p', `Salalah offers a distinctive advertising opportunity during the Khareef season, when visitors travel to Dhofar to experience its cooler weather and green landscapes. This seasonal movement creates opportunities for [tourism, hospitality, retail, food and beverage brands](${SITE}/blog/enhancing-tourism-marketing-how-out-of-home-advertising-takes-your-brand-to-new-heights) to connect with residents and visitors across relevant locations.`],
      ['p', 'Campaigns can benefit from aligning media schedules with seasonal demand and the availability of suitable advertising inventory.'],
      ['h3', 'Sohar: Reaching Industrial and Commercial Audiences'],
      ['p', "Sohar combines residential communities with industrial, logistics and commercial activity. This creates opportunities for both consumer-facing brands and businesses seeking to reach professionals and audiences connected to Oman's industrial economy."],
      ['h3', 'Nizwa and Sur: Connecting with Regional Audiences'],
      ['p', "Nizwa provides access to residents, shoppers and domestic visitors in Oman's interior, while Sur combines coastal tourism, local communities and commercial activity. Advertising across suitable road corridors and retail environments can help brands extend their presence beyond the country's largest urban centre."],

      ['h2', 'Choosing the Right OOH and DOOH Formats'],
      ['p', 'Oman offers several outdoor advertising formats to support different campaign objectives and audience journeys.'],
      ['ul', [
        '**Digital billboards:** High-impact screens along major roads and commercial districts help brands build visibility among motorists and commuters.',
        `**Airport advertising:** Suitable placements at Muscat International Airport and Salalah Airport offer opportunities to [reach travellers and visitors](${SITE}/blog/airport-media-high-impact-dooh-advertising-2026).`,
        '**Mall advertising:** Digital screens in shopping destinations help brands engage consumers in retail environments.',
        '**Transit advertising:** Available placements across transport environments and movement corridors can extend campaign reach.',
        '**Roadside advertising:** Large-format media along key routes can support awareness campaigns across urban centres.',
        '**Place-based media:** Screens in commercial buildings, universities, retail destinations and other relevant environments allow brands to connect with audiences in specific contexts.',
      ]],
      ['p', `DOOH adds flexibility through adaptable scheduling and dynamic creative. Where supported by available inventory, [programmatic activation](${SITE}/blog/programmatic-dooh-explained) can help advertisers coordinate campaigns across locations and select appropriate time slots based on their objectives.`],

      ['h2', 'Making OOH Advertising More Measurable'],
      ['p', 'Effective outdoor advertising requires more than selecting high-visibility locations. Advertisers also need to understand which environments are relevant to their target audiences and how their campaigns contribute to wider marketing goals.'],
      ['p', `[Audience intelligence and location data](${SITE}/mw-planner) can help identify suitable advertising environments, inform media allocation and provide greater visibility into campaign delivery. When combined with [appropriate measurement methods](${SITE}/mw-measure), these insights can help marketers evaluate exposure and make better-informed decisions about future campaigns.`],
      ['p', `OOH can also complement digital and social media activity. While online advertising connects with audiences through personal devices, outdoor media creates additional opportunities to reach people in physical environments. This combination can help brands extend campaign reach and explore [incremental audience engagement](${SITE}/blog/saudi-arabia-digital-ooh-incremental-reach).`],
      ['p', 'In Oman, where tourism, commuting and commercial activity vary by location and season, using audience insights alongside flexible campaign scheduling can be particularly valuable.'],

      ['h2', 'Understanding OOH Advertising Regulations in Oman'],
      ['p', 'Outdoor advertising in Oman is subject to permitting, site-specific approvals and applicable municipal requirements. Advertisers should confirm the relevant permissions, creative and language requirements, structural standards and road-safety regulations before launching a campaign.'],
      ['p', 'Requirements may vary by governorate, advertising format and placement. Working with relevant authorities and media owners helps ensure that campaigns are planned around the applicable requirements.'],

      ['h2', 'Plan Your OOH Advertising Campaign in Oman with Moving Walls'],
      ['p', "As Oman's advertising landscape develops, brands have opportunities to move beyond traditional location-based planning towards more audience-informed media decisions."],
      ['p', `Moving Walls helps advertisers and agencies [plan](${SITE}/mw-planner), [activate](${SITE}/mw-activate) and [measure](${SITE}/mw-measure) OOH and DOOH campaigns using audience and location intelligence, flexible activation and connected campaign reporting.`],
      ['p', 'Whether you want to build brand awareness across Muscat, reach seasonal audiences in Salalah, connect with commercial communities in Sohar or extend your campaign across multiple Omani markets, a data-informed approach can help you make more of your outdoor advertising investment.'],
      ['p', 'Explore OOH and DOOH advertising opportunities in Oman with Moving Walls and discover how audience intelligence can help your brand connect with people in the real world.'],
      ['cta', 'Explore OOH Advertising in Oman', '/locations/oman'],
    ],
  },
  {
    slug: 'ooh-advertising-in-qatar',
    title: 'Advertising in Qatar: Reaching Audiences Through Out-of-Home',
    image: ['ooh-advertising-in-qatar.webp', 'Digital billboards and DOOH screens along the Doha Corniche at night, with the West Bay skyline behind'],
    seo: [
      'OOH Advertising in Qatar: Doha, Lusail & DOOH Guide',
      'Plan OOH and DOOH advertising in Qatar: key locations in Doha, Lusail, Al Rayyan and The Pearl, the right formats, and how to make campaigns measurable.',
    ],
    content: [
      ['p', `Qatar's evolving urban landscape is creating new opportunities for brands to connect with residents, professionals, commuters and international visitors. From Doha's busy commercial districts to Lusail's modern developments and the country's growing retail and hospitality destinations, [out-of-home (OOH) advertising in Qatar](${SITE}/locations/qatar) offers brands a way to reach audiences as they move through their daily lives.`],
      ['p', 'As the country continues to invest in infrastructure, tourism, entertainment and urban development, advertisers can use OOH and digital out-of-home (DOOH) media to build visibility, complement digital campaigns and connect with audiences in high-traffic public environments.'],

      ['h2', 'Why Advertise in Qatar?'],
      ['p', `Qatar offers a concentrated advertising market shaped by international business, a diverse expatriate population, tourism and a strong retail and hospitality sector. According to [Qatar's National Planning Council](https://thepeninsulaqatar.com/article/05/01/2026/qatar-population-increases-by-23-in-2025), the country's population reached 3,214,609 at the end of December 2025.`],
      ['p', 'This population, combined with the movement of commuters, business travellers and tourists, creates opportunities for brands to engage different audience groups across multiple locations and moments throughout the day.'],
      ['p', "Doha remains the centre of Qatar's commercial activity, bringing together business districts, residential communities, shopping destinations, hotels and cultural attractions. Surrounding areas, including Lusail and Al Rayyan, offer additional opportunities to reach audiences across developing urban and commercial environments."],
      ['p', 'For advertisers, the opportunity lies in selecting locations that align with their target audiences, campaign objectives and customer journeys.'],

      ['h2', 'Key OOH Advertising Locations in Qatar'],
      ['p', 'The effectiveness of an outdoor advertising campaign depends on more than visibility alone. Location selection, audience movement and the context in which an advertisement appears all influence its potential impact.'],
      ['h3', 'Doha: Reaching the Heart of Qatar'],
      ['p', `As Qatar's capital and primary commercial centre, [Doha](${SITE}/locations/qatar/doha) offers a wide range of OOH opportunities. Areas such as West Bay and Msheireb attract professionals, residents and visitors, while major roads, shopping centres and hospitality destinations provide additional opportunities for brands to build awareness.`],
      ['p', 'Roadside billboards and digital screens can help advertisers maintain visibility along busy commuter routes and reach audiences as they travel between workplaces, homes and leisure destinations.'],
      ['h3', 'Lusail: Connecting with a Growing Urban Destination'],
      ['p', 'Lusail combines residential communities, business districts, retail, hospitality and entertainment venues. Its modern infrastructure and expanding urban environment make it an important consideration for campaigns targeting professionals, residents, families and visitors.'],
      ['p', "OOH placements across relevant commercial and high-traffic locations can help brands establish a presence as audiences engage with the city's developing destinations."],
      ['h3', 'Al Rayyan: Reaching Residential and Commuter Audiences'],
      ['p', 'Al Rayyan offers opportunities to connect with residents, families, commuters and audiences travelling between residential, educational, sporting and commercial destinations. Advertising across suitable road corridors and retail environments can support campaigns seeking broader reach beyond central Doha.'],
      ['h3', 'The Pearl-Qatar: Engaging Lifestyle Audiences'],
      ['p', 'The Pearl-Qatar brings together waterfront residences, retail, dining and hospitality. These environments can be relevant for brands targeting lifestyle, automotive, luxury, travel and consumer categories, depending on the available inventory and campaign objectives.'],
      ['p', `Other important destinations include [Hamad International Airport](${SITE}/blog/airport-media-high-impact-dooh-advertising-2026), major shopping malls, sports venues, cultural attractions and hospitality districts.`],

      ['h2', 'Choosing the Right OOH and DOOH Formats'],
      ['p', "Qatar's outdoor advertising landscape offers different formats to support different campaign goals."],
      ['ul', [
        '**Digital billboards:** High-impact screens across major roads, highways and urban environments can help brands build awareness and visibility.',
        '**Airport advertising:** Suitable placements can connect brands with international travellers and business visitors, subject to airport-specific arrangements.',
        '**Mall advertising:** Digital screens and place-based media provide opportunities to engage shoppers in retail environments.',
        '**Transit advertising:** Available opportunities across metro, bus, taxi and other mobility environments can extend campaign reach along audience journeys.',
        '**Place-based media:** Screens in commercial, residential, hospitality and entertainment settings can help brands reach audiences in relevant contexts.',
      ]],
      ['p', `[Digital out-of-home](${SITE}/press-news/elan-media-and-location-media-xchange-join-forces-to-transform-digital-out-of-home-advertising-in-qatar) adds flexibility to these formats. Advertisers can schedule campaigns for specific times, adapt creative to contextual conditions and coordinate messaging across multiple locations. [Programmatic activation](${SITE}/blog/programmatic-dooh-explained), where supported by available inventory, can further streamline campaign planning and delivery.`],

      ['h2', 'Making OOH Advertising More Measurable'],
      ['p', 'Modern OOH advertising is increasingly about understanding audiences and demonstrating campaign impact, rather than simply purchasing space on a billboard.'],
      ['p', `[Audience and location insights](${SITE}/mw-planner) can help advertisers identify relevant environments, plan placements around audience movement and allocate budgets more effectively. When combined with [appropriate measurement approaches](${SITE}/mw-measure), these insights can also help brands evaluate campaign exposure and understand how OOH contributes to wider marketing objectives.`],
      ['p', `Integrating OOH with digital and social campaigns can strengthen a brand's overall media strategy. While digital channels reach audiences across personal devices, outdoor media can create additional opportunities for visibility in the physical world. This complementary approach can help brands extend reach beyond existing digital touchpoints and explore [incremental audience engagement](${SITE}/blog/saudi-arabia-digital-ooh-incremental-reach).`],
      ['p', 'Campaign measurement and reporting can then help advertisers assess performance and inform future media decisions.'],

      ['h2', 'Plan Your OOH Campaign in Qatar with Moving Walls'],
      ['p', 'Successful outdoor advertising begins with understanding where audiences move, which environments matter to a brand and how campaign performance will be evaluated.'],
      ['p', `Moving Walls helps advertisers and agencies [plan](${SITE}/mw-planner), [activate](${SITE}/mw-activate) and [measure](${SITE}/mw-measure) OOH and DOOH campaigns using audience and location insights, flexible activation and connected campaign reporting.`],
      ['p', 'Whether your objective is to build brand awareness across Doha, reach audiences in Lusail and Al Rayyan, or connect with travellers and shoppers across Qatar, a data-informed approach can help you make more effective media decisions.'],
      ['p', 'Explore OOH and DOOH advertising opportunities in Qatar with Moving Walls and discover how audience intelligence can help your brand reach the right people in the real world.'],
      ['cta', 'Explore OOH Advertising in Qatar', '/locations/qatar'],
    ],
  },
]

for (const p of POSTS) {
  if (p.seo[0].length > 60 || p.seo[1].length > 160) throw new Error(`SEO too long for ${p.slug}: ${p.seo[0].length}/${p.seo[1].length}`)
  if (await c.fetch('count(*[_type=="blogPost" && slug.current==$s && !(_id in path("drafts.**"))])', { s: p.slug })) throw new Error('Slug already published: ' + p.slug)
}
const now = new Date().toISOString()
for (const p of POSTS) {
  const asset = await c.assets.upload('image', fs.createReadStream(path.join(DIR, p.image[0])), { filename: p.image[0] })
  const featured = { _type: 'image', alt: p.image[1], asset: { _type: 'reference', _ref: asset._id } }
  await c.createOrReplace({
    _id: `drafts.blog-${p.slug}`,
    _type: 'blogPost',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    language: 'en',
    isPublished: true,
    status: 'published',
    author: { _type: 'reference', _ref: AUTHOR },
    categories: [CAT.dooh, CAT.planning, CAT.trends].map((ref) => ({ _key: k(), _type: 'reference', _ref: ref })),
    featuredImage: featured,
    publishedAt: now,
    content: build(p.content),
    seo: { _type: 'seo', metaTitle: p.seo[0], metaDescription: p.seo[1], enableKeywords: false, noIndex: false, ogImage: featured },
  })
  console.log('Draft created: /blog/' + p.slug, `(SEO ${p.seo[0].length}/${p.seo[1].length})`)
}
