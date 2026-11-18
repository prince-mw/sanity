// Creates 2 DRAFT product blog posts (16 Nov 2026) by Christin Wong Li Yan, publish after Dg checks them:
//  1. "Understanding Your Brand Lift Results in MW Measure"  -> /blog/understanding-brand-lift-results-mw-measure  (category MW Measure)
//  2. "Adding Your First Inventory on MW Studio? Key Concepts for a Smooth Setup" -> /blog/adding-first-inventory-mw-studio-setup-guide (category MW Studio, created here if missing)
// Source: Dg's two .docx files. Screenshots from the docs, featured images from Dg; all converted to WebP.
// Copy is the docs' own. Formatting fixes: section headings made H2; the Measure doc's last section (typed as headings) made a paragraph + bullets;
// arrows restored in "Parent → Child → Grand Child" (stored as an equation in the doc); 2 missing full stops; "AI summary findings ... provides" -> "provide".
// Added: internal links + a product CTA button at the end of each post.
// Usage: node scripts/seed-blog-mw-measure-studio-guides.mjs <folder with the .webp files>
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const DIR = process.argv[2]
if (!DIR) throw new Error('Pass the folder holding the .webp files')
const AUTHOR = '4ae22cc9-2675-4a05-ab98-0aae5f3239a0' // Christin Wong Li Yan
const CAT_MEASURE = 'e0cfd4ec-6ae7-4284-a835-a9144dfd9776'
const CAT_STUDIO = 'category-mw-studio'
const SITE = 'https://www.movingwalls.com'
const k = () => Math.random().toString(36).slice(2, 14)
const upload = async (file) => (await c.assets.upload('image', fs.createReadStream(path.join(DIR, file)), { filename: file }))._id

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
      const inner = link[1].match(/^\*\*(.+)\*\*$/) // bold link text
      children.push({ _key: k(), _type: 'span', marks: inner ? [key, 'strong'] : [key], text: inner ? inner[1] : link[1] })
    } else if (bold) children.push({ _key: k(), _type: 'span', marks: ['strong'], text: bold[1] })
    else children.push({ _key: k(), _type: 'span', marks: [], text: part })
  }
  return { markDefs, children }
}
const block = (style, text, list) => ({ _key: k(), _type: 'block', style, ...(list ? { listItem: list.type, level: list.level } : {}), ...spans(text) })
// items: ['p', text] ['h2', text] ['ul', [text | ['  ', text] for level 2]] ['img', file, alt] ['table', headers, rows] ['cta', text, url]
const build = async (items) => {
  const out = []
  for (const [type, ...a] of items) {
    if (type === 'p') out.push(block('normal', a[0]))
    else if (type === 'h2' || type === 'h3') out.push(block(type, a[0]))
    else if (type === 'ul') a[0].forEach((t) => out.push(Array.isArray(t) ? block('normal', t[1], { type: 'bullet', level: 2 }) : block('normal', t, { type: 'bullet', level: 1 })))
    else if (type === 'img') out.push({ _key: k(), _type: 'image', asset: { _type: 'reference', _ref: await upload(a[0]) }, alt: a[1] })
    else if (type === 'table') out.push({ _key: k(), _type: 'tableBlock', design: 'modern', striped: true, bordered: true, headers: a[0], rows: a[1].map((cells) => ({ _key: k(), _type: 'tableRow', cells })) })
    else if (type === 'cta') out.push({ _key: k(), _type: 'ctaButton', text: a[0], url: a[1], style: 'primary', alignment: 'left' })
    else throw new Error('Unknown item ' + type)
  }
  return out
}

const POSTS = [
  {
    slug: 'understanding-brand-lift-results-mw-measure',
    title: 'Understanding Your Brand Lift Results in MW Measure',
    category: CAT_MEASURE,
    featured: ['understanding-brand-lift-results-mw-measure.webp', 'Understanding your brand lift results in MW Measure'],
    seo: [
      'Understanding Brand Lift Results in MW Measure for OOH',
      'See how MW Measure brand lift studies compare exposed and control groups, which funnel metrics they track, and how to use OOH lift results in future plans.',
    ],
    content: [
      ['p', `Standard OOH reporting tracks delivery metrics like [impressions, reach, and frequency](${SITE}/blog/ooh-measurement-made-simple-decode-dooh-campaign-data). [MW Measure](${SITE}/mw-measure) expands on this with [**Brand Lift Studies**](${SITE}/blog/how-brand-lift-studies-are-reshaping-ooh-measurement), allowing you to see exactly how your campaign changed consumer perception and intent.`],
      ['img', 'mw-measure-brand-lift-1.webp', 'Brand Lift Studies dashboard in MW Measure listing pre/post and controlled/exposed studies'],
      ['h2', '1. How Brand Lift Works (The 4-Step Process)'],
      ['p', `Brand lift is measured by comparing 2 distinct audience groups to isolate the [true impact of your campaign](${SITE}/blog/brand-lift-measuring-the-true-impact-of-your-campaigns):`],
      ['p', '**1. Establish Campaign Exposure:** Using location data and audience movement patterns to identify the audience exposed (or highly likely to be exposed) to your OOH campaign displays in the real world.'],
      ['p', '**2. Create a Comparison (Control Group):** The exposed group is evaluated against a demographically and geographically relevant control group that was not exposed. This baseline ensures differences in response reflect campaign impact rather than pre-existing brand sentiment.'],
      ['img', 'mw-measure-brand-lift-2.webp', 'MW Measure demographics breakdown comparing the control group and exposed group by gender, age, income and job title'],
      ['p', '**3. Measure Brand Response:** Both groups are surveyed across your selected brand metrics.'],
      ['ul', ['**Example:** If 54% of the Control group is aware of your brand and 62% of the Exposed group is aware, your campaign delivered an **observed lift of +8 percentage points**.']],
      ['p', '**4. Interpret the Result:** Rather than leaving you with isolated percentages, the **AI summary findings** in MW Measure provide an executive campaign narrative. These summaries automatically contextualize your numbers against category benchmarks, call out top-performing funnel stages, and synthesize key takeaways for immediate reporting.'],
      ['img', 'mw-measure-brand-lift-3.webp', 'MW Measure campaign narrative summarising lift in brand awareness, familiarity, purchase consideration and ad recall against benchmarks'],
      ['h2', '2. Standard Brand Lift Metrics Across the Funnel'],
      ['p', 'Brand Lift studies can evaluate movement across different stages of the consumer decision journey. Depending on your specific campaign objectives, MW Measure can evaluate any combination of the following metrics:'],
      ['table', ['Metric', 'Survey Focus', 'Funnel Stage'], [
        ['Ad Recall', '"Do you remember seeing an advertisement for [Brand] recently?"', 'Baseline Exposure: Confirms visual recall and creative cut-through.'],
        ['Brand Awareness', '"Which of the following brands have you heard of?" (Aided or Unaided)', 'Upper Funnel: Measures overall market visibility and brand presence.'],
        ['Brand Familiarity', '"How familiar are you with [Brand] and what they offer?"', 'Upper-Mid Funnel: Measures depth of consumer understanding.'],
        ['Brand Favorability / Likeness', '"How positive or favorable is your overall impression of [Brand]?"', 'Mid Funnel: Evaluates brand affinity, sentiment, and emotional connection.'],
        ['Purchase Consideration', '"When shopping for [Category], how likely are you to consider [Brand]?"', "Mid-Lower Funnel: Measures inclusion on the consumer's purchase shortlist."],
        ['Purchase / Action Intent', '"How likely are you to buy, visit, or take action with [Brand] in the next 30 days?"', 'Lower Funnel: Measures near-term commercial intent and anticipated action.'],
      ]],
      ['img', 'mw-measure-brand-lift-4.webp', 'MW Measure brand lift report showing control, exposed and lift scores for each metric against the OOH industry average'],
      ['p', '**Customization Note:** While these represent the industry-standard metrics, your Brand Lift Study can be completely tailored to your needs. You can add custom, targeted questions designed specifically around your unique campaign and brand objectives.'],
      ['p', `**Important Boundary:** Brand Lift measures stated intent and perception, not [direct sales attribution](${SITE}/blog/connecting-the-world-of-online-to-offline).`],
      ['h2', '3. How to Apply These Learnings to Future Plans'],
      ['p', `The value of a Brand Lift Study isn't just in the final report - it is in using the data to improve [your next campaign](${SITE}/mw-planner). Some common scenarios and interpretations:`],
      ['ul', [
        '**High Recall, Low Consideration:** If ad recall is strong but consideration is flat, your creative was eye-catching but may have lacked a clear value proposition or call-to-action.',
        '**Low Recall, High Consideration:** If recall is low but intent is high, your messaging is highly persuasive, but your media placements may not have had enough visibility or frequency.',
        '**Balanced Full-Funnel Lift:** Uniform gains across awareness, favorability, and intent indicate an effective combination of high-impact formats and resonant creative messaging.',
      ]],
      ['cta', 'Explore MW Measure', '/mw-measure'],
    ],
  },
  {
    slug: 'adding-first-inventory-mw-studio-setup-guide',
    title: 'Adding Your First Inventory on MW Studio? Key Concepts for a Smooth Setup',
    category: CAT_STUDIO,
    featured: ['adding-first-inventory-mw-studio-setup-guide.webp', 'Adding your first inventory on MW Studio: key concepts for a smooth setup'],
    seo: [
      'Add Your First Inventory in MW Studio: Setup Guide',
      'A step-by-step guide for media owners adding their first screen to MW Studio, from venue classification and location to pricing, media and panel setup.',
    ],
    content: [
      ['p', `When registering a new [inventory location](${SITE}/blog/dooh-inventory-management-for-media-owners) in [MW Studio](${SITE}/mw-studio), you will move through a guided 6-step setup: **Classification → Location → Operations → Pricing & Terms → Media → Panel**.`],
      ['p', `To ensure your screens are set up accurately and immediately [discoverable by media buyers](${SITE}/blog/build-your-ooh-online-store-with-mw-studio), here is a quick guide to the essential settings across each step.`],

      ['h2', 'Step 1: Classification (Categorizing Your Asset)'],
      ['p', 'The classification step defines the type of advertising environment you operate, helping media planners match your screens with their campaign criteria.'],
      ['ul', ['**Venue Hierarchy**', ['  ', 'MW Studio uses a 3-tier structure (Parent → Child → Grand Child) to pinpoint your media environment.']]],
      ['table', ['Level', 'Description', 'Example 1', 'Example 2', 'Example 3'], [
        ['Venue Type Parent', 'The primary environment or industry sector', 'Retail', 'Transit', 'Financial'],
        ['Venue Type Child', 'The specific location setting within that category.', 'Shopping Mall', 'Airport', 'Bank'],
        ['Venue Type Grand Child', 'The exact area or zone inside the venue', 'Indoor Concourse', 'Arrival Hall', 'ATM Screen'],
      ]],
      ['p', `[Media planners](${SITE}/mw-planner) filter by venue first when assembling proposals. Selecting the most specific tier ensures targeted searches find your screen immediately.`],
      ['ul', [
        '**Sell As (Individual, Network, Both):**',
        ['  ', '**Individual:** Sells this display exclusively as a standalone unit.'],
        ['  ', '**Network:** Packages this display exclusively as part of a grouped bundle (e.g., purchasing an entire shopping centre circuit together).'],
        ['  ', '**Both:** Gives buyers the flexibility to book this single display on its own **or** include it within a wider network package. (Recommended for maximum commercial flexibility.)'],
        '**Size Category (XS to XL):**',
        ['  ', 'Standardizes your inventory based on physical display dimensions, making it easy for planners to assemble multi-market proposals with matched screen sizes.'],
      ]],
      ['img', 'mw-studio-inventory-step-1.webp', 'MW Studio inventory setup, step 1 Classification: venue type, format, size category and sell-as options'],

      ['h2', 'Step 2: Location (Where It Lives)'],
      ['ul', [
        '**Inventory Name:**',
        ['  ', '**Best practice:** Use a clear, descriptive name combining the venue and specific position (e.g., "Pavilion Mall Main Entrance" or "Federal Highway KM 12 Northbound"). Media planners read this name directly on their campaign proposals.'],
        '**Smart Location Matching:**',
        ['  ', 'Whether you pinpoint your screen on the interactive map, type in GPS coordinates, or enter the location name, MW Studio automatically fills in the rest - Country, State, City, Postal Code and Time Zone.'],
      ]],
      ['img', 'mw-studio-inventory-step-2.webp', 'MW Studio inventory setup, step 2 Location: inventory name, site description and GPS coordinates'],

      ['h2', 'Step 3: Operations (Operating Hours & Delivery)'],
      ['ul', [
        '**Different hours on different days? (Toggle):**',
        ['  ', 'Keep this disabled if your screens run the same hours seven days a week.'],
        ['  ', 'Enable this toggle if your operating window varies - such as shorter weekend schedules or extended late-night retail hours.'],
        '**Enable Programmatic (Toggle):**',
        ['  ', `Enable this setting to connect your digital inventory to [programmatic auctions](${SITE}/blog/programmatic-dooh-explained), allowing DSPs and automated buying platforms to bid on available ad capacity.`],
      ]],
      ['img', 'mw-studio-inventory-step-3.webp', 'MW Studio inventory setup, step 3 Operations: operating hours, programmatic toggle, spot and loop configuration'],

      ['h2', 'Step 4: Pricing & Terms (Commercial Rates)'],
      ['ul', [
        '**Base CPM vs. Base CPS:**',
        ['  ', `**Base CPM (Cost Per Thousand):** The rate charged for every [1,000 audience impressions](${SITE}/blog/impression-based-sales-guide-for-ooh-media-owners) delivered. This is the industry-standard benchmark for digital campaigns and programmatic selling.`],
        ['  ', '**Base CPS (Cost Per Spot):** A fixed rate charged per individual ad play slot within a loop.'],
        '**Booking Constraints (Min Hours / Min Days):**',
        ['  ', 'Set the minimum campaign commitment you accept from buyers to keep your booking schedule balanced and efficient.'],
      ]],
      ['img', 'mw-studio-inventory-step-4.webp', 'MW Studio inventory setup, step 4 Pricing & Terms: base CPM, base CPS and booking constraints'],

      ['h2', 'Step 5: Media (Showcasing Your Display)'],
      ['ul', [
        '**Authentic Site Photos & Video Clips:**',
        ['  ', 'Upload high-resolution images or short video walkthroughs showing the screen active in its actual environment.'],
        ['  ', 'Highlight real-world viewing angles, passing foot traffic, or vehicle flow - buyers review these visuals directly when evaluating and finalizing campaign proposals.'],
        ['  ', '**Pro-Tip:** Profiles with authentic site photography provide buyers with clear visual context, leading to faster review cycles and higher booking rates.'],
      ]],
      ['img', 'mw-studio-inventory-step-5.webp', 'MW Studio inventory setup, step 5 Media: upload site photos and video clips'],

      ['h2', 'Step 6: Panel (Defining Your Display Faces)'],
      ['ul', [
        '**Understanding "Inventory" vs. "Panel":**',
        ['  ', '**Inventory:** The physical location, venue, or overall structure (e.g., Airport Arrival Hall Totem).'],
        ['  ', '**Panel:** The individual physical digital screen face installed on that structure.'],
        ['  ', '**Real-World Example:** For a double-sided roadside totem (Face A and Face B), create **one Inventory record**, and then add **two Panels** under Step 6.'],
        '**Screen Specs & Resolution:**',
        ['  ', 'Enter the exact native pixel dimensions (e.g., 1920 x 1080) and physical measurements for every panel. MW Studio uses these specifications to automatically check creative compatibility so buyer artwork displays smoothly.'],
        ['  ', '**Flexible Setup:** You can always add additional panels, screens, or custom layout zones later as your display configuration evolves.'],
      ]],
      ['img', 'mw-studio-inventory-step-6.webp', 'MW Studio inventory setup, step 6 Panel: add panels for each physical screen face'],
      ['cta', 'Explore MW Studio', '/mw-studio'],
    ],
  },
]

for (const p of POSTS) {
  if (p.seo[0].length > 60 || p.seo[1].length > 160) throw new Error(`SEO too long for ${p.slug}: ${p.seo[0].length}/${p.seo[1].length}`)
  if (await c.fetch('count(*[_type=="blogPost" && slug.current==$s && !(_id in path("drafts.**"))])', { s: p.slug })) throw new Error('Slug already published: ' + p.slug)
}

// MW Studio category (published straight away: it is only a label, and the post itself stays a draft)
await c.createIfNotExists({ _id: CAT_STUDIO, _type: 'category', title: 'MW Studio', slug: { _type: 'slug', current: 'mw-studio' }, description: 'Articles about MW Studio' })

const now = new Date().toISOString()
for (const p of POSTS) {
  const featured = { _type: 'image', alt: p.featured[1], asset: { _type: 'reference', _ref: await upload(p.featured[0]) } }
  await c.createOrReplace({
    _id: `drafts.blog-${p.slug}`,
    _type: 'blogPost',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    language: 'en',
    isPublished: true,
    status: 'published',
    author: { _type: 'reference', _ref: AUTHOR },
    categories: [{ _key: k(), _type: 'reference', _ref: p.category }],
    featuredImage: featured,
    publishedAt: now,
    content: await build(p.content),
    seo: { _type: 'seo', metaTitle: p.seo[0], metaDescription: p.seo[1], enableKeywords: false, noIndex: false, ogImage: featured },
  })
  console.log('Draft created: /blog/' + p.slug, `(SEO ${p.seo[0].length}/${p.seo[1].length})`)
}
