// Creates a DRAFT blog post (13 Nov 2026), publish after Dg checks it:
//   Sumaiya Shukri: "Contextual DOOH in Europe: Using Dynamic Creative to Match the Moment"
//   /blog/contextual-dooh-europe-dynamic-creative
// Source: "Europe Article Series" Google Doc, first tab (final per Dg). The doc's banner image is the featured image.
// Text is verbatim from the doc. Added: internal links (Dg asked for them) and a CTA button to /locations/europe.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const IMG = process.argv[2] // path to contextual-dooh-europe-dynamic-creative.webp
if (!IMG) throw new Error('Usage: node scripts/seed-blog-contextual-dooh-europe.mjs <featured-image.webp>')
const AUTHOR = '22e33811-51ba-4135-b645-1d7811313dc5' // Sumaiya Shukri
const CAT = { dooh: 'dsdzDBKQU3TOwM9o6lSZUA', programmatic: '777c84d8-de0a-48fa-818f-bb21cc35c844', dataDriven: 'dsdzDBKQU3TOwM9o6lSZF0', planning: 'dsdzDBKQU3TOwM9o6lSaDe' }
const SITE = 'https://www.movingwalls.com'
const k = () => Math.random().toString(36).slice(2, 14)

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
      children.push({ _key: k(), _type: 'span', marks: [key], text: link[1] })
    } else if (bold) children.push({ _key: k(), _type: 'span', marks: ['strong'], text: bold[1] })
    else children.push({ _key: k(), _type: 'span', marks: [], text: part })
  }
  return { markDefs, children }
}
const block = (style, text, listItem) => ({ _key: k(), _type: 'block', style, ...(listItem ? { listItem, level: 1 } : {}), ...spans(text) })
const build = (items) => {
  const out = []
  for (const [type, ...a] of items) {
    if (type === 'p') out.push(block('normal', a[0]))
    else if (type === 'h2' || type === 'h3') out.push(block(type, a[0]))
    else if (type === 'ul') a[0].forEach((t) => out.push(block('normal', t, 'bullet')))
    else if (type === 'cta') out.push({ _key: k(), _type: 'ctaButton', text: a[0], url: a[1], style: 'primary', alignment: 'left' })
  }
  return out
}

const P = {
  slug: 'contextual-dooh-europe-dynamic-creative',
  title: 'Contextual DOOH in Europe: Using Dynamic Creative to Match the Moment',
  featuredAlt: 'Contextual DOOH in Europe: a digital screen whose creative adapts to time of day, weather, location and retail context',
  seo: [
    'Contextual DOOH in Europe: Dynamic Creative for the Moment',
    'How European advertisers use contextual DOOH and dynamic creative, from time of day to weather and location, to match Black Friday and Christmas moments.',
  ],
  content: [
    ['p', 'Performance marketers are used to optimising campaigns around audience, placement, timing and behaviour.'],
    ['p', 'Dynamic creative already plays an important role across digital advertising. In Digital Out-of-Home (DOOH), the opportunity is to bring that adaptability into physical environments.'],
    ['p', 'A message shown to commuters in the morning may need to do something different from one appearing in a retail district at lunchtime or at an airport on a Friday evening.'],
    ['p', 'This is where contextual DOOH becomes useful.'],
    ['p', `Signals such as [location, time, weather, traffic, nearby points of interest or live events](${SITE}/blog/how-to-use-real-time-triggers-in-modern-dooh-campaigns) can help determine which creative is most relevant at a particular moment.`],
    ['p', 'For advertisers and agencies running campaigns across Europe, the opportunity is not simply to use more data.'],
    ['p', 'It is to use the right context to make dynamic creative more relevant to the environment in which it appears.'],

    ['h2', 'What Contextual DOOH Actually Means'],
    ['p', 'Contextual DOOH uses information about the environment around a screen to help inform campaign activation and creative.'],
    ['p', 'The simplest example is time of day.'],
    ['p', 'A food brand might run a breakfast-focused creative during the morning commute and switch to a lunch message later in the day.'],
    ['p', 'A travel advertiser could adapt its message according to the airport or departure city.'],
    ['p', 'A retailer could make the creative more relevant when the screen is close to a particular store.'],
    ['p', 'Weather can provide another useful signal. Where the required data and activation capabilities are available, creative could respond to changing weather conditions rather than showing exactly the same message throughout the campaign.'],
    ['p', 'The important point is that context gives the creative a reason to change.'],
    ['p', 'And during major retail periods, that can become particularly useful.'],

    ['h2', 'Black Friday and Christmas: When Context Can Matter More'],
    ['p', 'The Black Friday and Christmas period is a good example of why one creative message may not suit every moment.'],
    ['p', `Consider a retailer running a [Black Friday DOOH campaign](${SITE}/blog/11-11-black-friday-overseas-ooh-campaigns) across several European cities.`],
    ['p', 'The core campaign and offer may remain the same, but the creative could change depending on the environment.'],
    ['p', 'A screen close to a retail location could highlight the nearby store.'],
    ['p', 'Morning creative could focus on the start of the promotion, while an evening execution might reflect store opening hours or a different campaign message.'],
    ['p', 'As Black Friday moves into the Christmas shopping period, the same DOOH locations could support different creative variations based on the campaign phase, location or time of day.'],
    ['p', 'A Christmas campaign might use one creative around busy shopping environments and another around transport or commuter locations.'],
    ['p', 'The brand idea stays consistent.'],
    ['p', 'The context helps determine which version of the creative makes the most sense.'],
    ['p', 'This is where dynamic creative can make DOOH more responsive without making the campaign unnecessarily complicated.'],

    ['h2', 'How Dynamic Creative Makes Context Useful'],
    ['p', 'Contextual signals only become useful when they influence what the audience actually sees.'],
    ['p', 'That is where dynamic creative comes in.'],
    ['p', 'Instead of running one creative across every screen and every moment, marketers can prepare different creative versions and define the conditions under which each should appear.'],
    ['p', 'For example, a Black Friday campaign might have:'],
    ['ul', [
      '**Creative A:** General Black Friday message',
      '**Creative B:** Location-relevant message for screens near selected stores',
      '**Creative C:** Evening message for a defined time period',
      '**Creative D:** Weather-relevant version where the campaign setup supports it',
    ]],
    ['p', 'The campaign does not need dozens of variations.'],
    ['p', 'The objective is to identify the few conditions that genuinely change what would be useful or relevant to communicate.'],
    ['p', `[Programmatic DOOH](${SITE}/blog/programmatic-dooh-explained) can support this type of flexible activation where the necessary inventory, data and technology are available.`],
    ['p', 'But the technology should follow the creative idea — not the other way around.'],

    ['h2', 'Start With the Moment, Not the Data'],
    ['p', 'It can be tempting to begin a contextual campaign by listing every available signal.'],
    ['p', 'Weather. Traffic. Location. Events. Time. Audience movement.'],
    ['p', 'A better starting point is much simpler:'],
    ['p', '**What changes about this moment that should change our message?**'],
    ['p', 'For a retailer, proximity to a store may matter.'],
    ['p', 'For a food and beverage advertiser, time of day may be more relevant.'],
    ['p', 'For a travel brand, location or departure environment could influence the message.'],
    ['p', 'For an entertainment campaign, an upcoming event or specific date may be useful.'],
    ['p', 'If a signal does not give you a meaningful reason to change the creative, there may be little value in adding it.'],
    ['p', 'Context should make the campaign more relevant, not more complicated.'],

    ['h2', 'Keep Dynamic DOOH Creative Simple'],
    ['p', 'Dynamic creative can use sophisticated inputs behind the scenes.'],
    ['p', 'The advertisement itself should still be easy to understand.'],
    ['p', 'People encounter DOOH while walking through stations, travelling, shopping or moving through city environments. They often have only a short period to absorb the message.'],
    ['p', 'Changing the creative dynamically does not remove the basic principles of good OOH.'],
    ['p', 'You still need:'],
    ['ul', [
      'a clear message,',
      'strong visual hierarchy,',
      'recognisable branding, and',
      'creative designed for the environment in which it appears.',
    ]],
    ['p', 'The audience does not need to know that a weather feed, location signal or scheduling rule influenced the creative.'],
    ['p', 'They simply need to see a message that feels appropriate to the moment.'],

    ['h2', 'Contextual Does Not Have to Mean Individual Targeting'],
    ['p', 'Contextual DOOH also gives marketers another way to think about relevance.'],
    ['p', 'The creative does not necessarily need to know who a specific individual is.'],
    ['p', 'It can respond to what is happening around the screen.'],
    ['ul', [
      'It is 8 am.',
      'The screen is near a shopping centre.',
      'Rain has started.',
      'A major event is taking place nearby.',
      'Christmas shopping activity is increasing in the area.',
    ]],
    ['p', 'These are environmental conditions that can help inform the campaign without requiring the public-facing message to become personalised to one person.'],
    ['p', `For European marketers operating in a [privacy-conscious advertising environment](${SITE}/blog/out-of-home-in-2022-a-look-at-the-key-trends-that-will-shape-outdoor-advertising-in-the-new-year), that distinction is useful.`],
    ['p', 'The aim is not to recreate every form of online targeting on a public screen.'],
    ['p', 'It is to use location and context intelligently to improve the relevance of a one-to-many message.'],

    ['h2', 'Making Contextual DOOH Work Across Europe'],
    ['p', 'A European campaign does not need completely different creative strategies for every market.'],
    ['p', 'The core campaign idea can remain consistent while certain elements respond to local context.'],
    ['p', 'A Christmas campaign running across London, Berlin, Paris and Milan, for example, could maintain the same brand idea while adapting language, retail locations, relevant dayparts or creative variations according to the campaign requirements in each market.'],
    ['p', 'However, available inventory, data and activation capabilities can differ between markets and media owners.'],
    ['p', 'That makes it important to decide first what needs to change and why, and then establish where those requirements can be supported.'],
    ['p', 'The campaign remains connected.'],
    ['p', 'The context becomes local.'],

    ['h2', 'Connecting Context With the Wider DOOH Campaign'],
    ['p', `Moving Walls helps advertisers and agencies connect [audience- and location-led planning](${SITE}/mw-planner) with [DOOH activation](${SITE}/mw-activate) and [campaign measurement](${SITE}/mw-measure) through a more connected workflow.`],
    ['p', 'Where contextual and dynamic creative form part of the campaign strategy, teams can plan the relevant environments and conditions alongside the activation approach.'],
    ['p', 'The objective is not to make every campaign dynamic.'],
    ['p', 'It is to understand when changing the creative can make the message more useful to the audience and the moment.'],

    ['h2', 'Make the Moment Matter'],
    ['p', 'Contextual DOOH gives marketers more options for deciding when, where and how creative appears.'],
    ['p', 'But the strongest campaigns do not necessarily use the most data.'],
    ['p', 'They use the context that matters.'],
    ['p', 'During Black Friday, that might be proximity to a retail location or the stage of the promotion.'],
    ['p', 'During Christmas, it might be location, time of day or the environment surrounding the screen.'],
    ['p', 'For another campaign, the right trigger could be weather, traffic or an event.'],
    ['p', 'The principle remains the same:'],
    ['p', '**Use context when it gives you a meaningful reason to change the creative.**'],
    ['p', 'That is how dynamic DOOH can make a campaign feel more relevant to the moment — without making the strategy more complicated than it needs to be.'],

    ['h3', 'Planning a contextual DOOH campaign across Europe?'],
    ['p', `Explore how Moving Walls can help connect audience, location and contextual signals with your DOOH planning, activation and measurement workflow.`],
    ['cta', 'Explore Moving Walls in Europe', '/locations/europe'],
  ],
}

if (await c.fetch('count(*[_type=="blogPost" && slug.current==$s && !(_id in path("drafts.**"))])', { s: P.slug })) throw new Error('Slug already published: ' + P.slug)
const asset = await c.assets.upload('image', fs.createReadStream(IMG), { filename: P.slug + '.webp' })
const featured = { _type: 'image', alt: P.featuredAlt, asset: { _type: 'reference', _ref: asset._id } }
await c.createOrReplace({
  _id: `drafts.blog-${P.slug}`,
  _type: 'blogPost',
  title: P.title,
  slug: { _type: 'slug', current: P.slug },
  language: 'en',
  isPublished: true,
  status: 'published',
  author: { _type: 'reference', _ref: AUTHOR },
  categories: [CAT.dooh, CAT.programmatic, CAT.dataDriven, CAT.planning].map((ref) => ({ _key: k(), _type: 'reference', _ref: ref })),
  featuredImage: featured,
  publishedAt: new Date().toISOString(),
  content: build(P.content),
  seo: { _type: 'seo', metaTitle: P.seo[0], metaDescription: P.seo[1], enableKeywords: false, noIndex: false, ogImage: featured },
})
console.log('Draft created: /blog/' + P.slug)
