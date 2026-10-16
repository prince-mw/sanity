// Creates DRAFT location docs for Oman, Bahrain, Kuwait and Jordan (Oct 2026), modelled on the Morocco page.
// Usage: node scripts/seed-mena-locations.mjs <embeds.json>  (custom-section HTML per slug, generated from the MENA content doc)
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })
const embeds = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const FORM = 'https://forms.zohopublic.com/movingwallsholdingpteltd/form/MENAContact/formperma/rohUC6TSLJoVVWAQlZib80kjyCuLMyQsdAlSvClkitc'
const k = () => Math.random().toString(36).slice(2, 14)

const existing = await c.fetch(`*[_type=="location" && slug.current in ["jordan","kuwait","bahrain","oman"]]._id`)
if (existing.length) { console.error('already exist:', existing); process.exit(1) }
const placeholder = await c.fetch(`*[_type=="sanity.imageAsset" && originalFilename=="indonesia-image-coming-soon.png"][0]._id`)
const morocco = await c.getDocument('2e0a10c5-e2dd-47ce-b1ad-2fcb78bacfe9')
const logos = morocco.sections.find((s) => s._type === 'logoCarousel')

const pages = [
  {
    slug: 'oman', country: 'Oman', city: 'Muscat',
    heroTitle: 'DOOH Advertising in Oman',
    full: "Oman offers brands a distinctive Out-of-Home advertising environment, combining a growing urban population with expanding commercial activity, tourism, retail, logistics and transport infrastructure. With more than 5.3 million residents, Oman provides brands with opportunities to connect with consumers across major urban centres, business districts, retail destinations, tourism hubs and high-traffic road corridors.\n\nWith Moving Walls, advertisers can plan, activate and measure OOH campaigns using audience and location intelligence, while gaining greater visibility into campaign delivery.",
    short: 'Plan, activate and measure DOOH across Muscat, Salalah, Sohar, Nizwa and Sur, reaching residents, commuters and visitors across Oman.',
    button: 'Explore Oman DOOH',
    banner: ['Boost Your Visibility in Oman with Digital OOH Advertising', 'Reach consumers across Muscat, Salalah, Sohar, Nizwa, Sur and other high-value locations across Oman. Whether you are launching a new brand, driving retail footfall, supporting a product launch, building awareness or reaching audiences during key travel and tourism periods, Moving Walls can help you plan and activate OOH with greater precision.', 'Explore DOOH Options in Oman'],
    faqsHeading: 'FAQs on OOH Advertising in Oman',
    faqs: [
      ['Why advertise in Oman?', 'Oman has more than 5.3 million residents concentrated around key urban centres and transport corridors, with Muscat Governorate alone home to about 1.53 million people. Its airports handled around 15.2 million passengers in 2025, adding a large travelling audience.'],
      ['What are the key cities for OOH advertising in Oman?', 'Muscat is the core market for broad urban reach. Salalah is distinctive during the Khareef tourism season, Sohar combines industry and logistics with residential audiences, Nizwa reaches the interior, and Sur covers coastal tourism and local communities.'],
      ['What DOOH formats are available in Oman?', 'Digital billboards, airport advertising (including Muscat International and Salalah airports), mall advertising, transit advertising, roadside advertising and place-based media in environments such as universities and commercial buildings.'],
      ['Do I need a permit for outdoor advertising in Oman?', 'Yes. Outdoor advertising is subject to permitting and location-specific requirements. In Muscat, the government permit service covers signs on private land, rooftops and building façades, and applications can require ownership documents, a site plan, building-owner approval and a visual of the proposed sign.'],
      ['What language should OOH creative use in Oman?', 'Muscat Municipality guidance states that Arabic is the principal language for advertising, with English permitted alongside Arabic subject to specified conditions.'],
      ['How does Moving Walls help with OOH in Oman?', 'Moving Walls uses audience intelligence and location data to identify where relevant audiences are likely to be, plan suitable OOH environments, activate campaigns across available inventory and measure the outcomes.'],
    ],
    seo: ['DOOH & Billboard Advertising in Oman | Moving Walls', 'Plan billboard and DOOH advertising in Oman across Muscat, Salalah, Sohar, Nizwa and Sur, with audience-led planning, activation and measurement.'],
  },
  {
    slug: 'bahrain', country: 'Bahrain', city: 'Manama',
    heroTitle: 'Outdoor Advertising in Bahrain',
    full: "Bahrain is one of the Gulf's most connected and accessible markets for Out-of-Home advertising, combining a highly urbanised population with a concentrated network of commercial districts, retail destinations, business hubs, residential communities and major transport corridors.\n\nWith more than 1.7 million people projected in Bahrain in 2025, the Kingdom offers advertisers a concentrated environment for reaching residents, professionals, commuters, shoppers, tourists and business visitors. At the centre of the opportunity is Manama and the Greater Manama urban area.",
    short: 'Reach residents, professionals and visitors across Manama, Seef, Juffair, Bahrain Bay and Muharraq with data-driven OOH and DOOH.',
    button: 'Explore Bahrain DOOH',
    banner: ['Boost Your Visibility in Bahrain with Outdoor Advertising', "Take your brand beyond the screen and into the real world. Reach consumers across Manama, Seef, Juffair, Bahrain Bay, Muharraq and other key destinations with data-driven Outdoor and Digital Out-of-Home advertising. Whether you're launching a new product, building brand awareness, driving footfall, supporting a major event or planning a multi-location campaign, Moving Walls can help.", 'Talk to Sales'],
    faqsHeading: 'FAQs on Outdoor Advertising in Bahrain',
    faqs: [
      ['Why advertise in Bahrain?', "Bahrain's compact geography and highly urbanised population of more than 1.7 million mean commercial, residential, retail and business destinations sit close together, so brands can build repeated exposure across audience journeys between home, work, shopping and leisure."],
      ['What are the key areas for OOH advertising in Bahrain?', 'Manama is the primary commercial and financial centre. Seef, Juffair, Bahrain Bay and the Diplomatic Area, and Muharraq add retail, hospitality, business and airport-adjacent audiences, with wider reach available across Greater Bahrain.'],
      ['What OOH formats are available in Bahrain?', 'Digital billboards, airport advertising around Bahrain International Airport, mall advertising, transit advertising across buses and taxis, roadside advertising and place-based media, subject to available inventory.'],
      ['Do I need a permit for outdoor advertising in Bahrain?', "Yes. The Ministry of Municipalities Affairs and Agriculture runs an official advertising-permit service. Applications include the advertising artwork, a copy of the company's Commercial Registration and a site map, and require Advertising Committee approval."],
      ['How much are advertising fees in Bahrain?', 'Bahrain publishes an official fee schedule that varies by format and location. For example, electronic signboards are listed at BD 6 per square foot, plus applicable permission and road-related fees. A deposit may also be required, returned once the board is removed.'],
      ['How does Moving Walls help with OOH in Bahrain?', 'Moving Walls combines audience intelligence, location data, programmatic activation and measurement in one platform, from audience discovery and planning to activation, measurement and optimisation.'],
    ],
    seo: ['Outdoor & DOOH Advertising in Bahrain | Moving Walls', 'Plan outdoor and DOOH advertising in Bahrain across Manama, Seef, Juffair, Bahrain Bay and Muharraq, with audience-led planning and measurement.'],
  },
  {
    slug: 'kuwait', country: 'Kuwait', city: 'Kuwait City',
    heroTitle: 'Digital Outdoor Advertising in Kuwait',
    full: "Kuwait is a highly connected and urbanised advertising market where business, retail, residential and leisure activity is concentrated across a network of major urban districts and high-traffic road corridors.\n\nWith a population of more than 5.2 million, Kuwait provides brands with opportunities to connect with diverse audiences across Kuwait City, Hawally, Salmiya, Farwaniya, Ahmadi and other major commercial and residential areas.\n\nMoving Walls enables advertisers to plan, activate and measure connected OOH campaigns using audience and location intelligence.",
    short: 'Connect with diverse audiences across Kuwait City, Hawally, Salmiya, Farwaniya, Ahmadi and Jahra with connected DOOH.',
    button: 'Explore DOOH Kuwait',
    banner: ['Boost Your Visibility in Kuwait with DOOH Advertising', "Reach audiences across Kuwait City, Hawally, Salmiya, Farwaniya, Ahmadi, Jahra and other high-value locations across Kuwait. Whether you are launching a new product, building brand awareness, driving retail consideration, reaching commuters or connecting with audiences across Kuwait's business and lifestyle environments, Moving Walls can help you plan and activate OOH with greater precision.", 'Plan Your Kuwait Campaign'],
    faqsHeading: 'FAQs on DOOH Advertising in Kuwait',
    faqs: [
      ['Why advertise in Kuwait?', "Kuwait's population reached 5.279 million at the end of Q1 2026, concentrated in a compact network of urban districts and road corridors. Around 3.32 million non-Kuwaiti and 1.57 million Kuwaiti residents create a diverse consumer environment."],
      ['What are the key areas for OOH advertising in Kuwait?', 'Kuwait City is the commercial and financial centre. Hawally and Salmiya offer dense retail and lifestyle audiences, Farwaniya broad everyday reach, Ahmadi industrial and energy audiences, and Jahra residents and commuters in the northwest.'],
      ['What DOOH formats are available in Kuwait?', 'Digital billboards, airport advertising, mall advertising, transit advertising, roadside advertising and place-based media in retail, commercial, entertainment and hospitality environments.'],
      ['Do I need a licence for outdoor advertising in Kuwait?', 'Yes. Kuwait Municipality regulations generally require a municipal licence specifying the advertising type, location and validity period. Kuwait Government Online provides a licence service, with fees based on the regulations and the advertisement’s dimensions.'],
      ['Have Kuwait’s advertising rules changed recently?', 'In 2024, Kuwait Municipality highlighted new advertising regulations intended to improve the visual appearance of advertisements and set clearer standards for installations, with less tolerance for unregulated or visually disruptive advertising.'],
      ['How does Moving Walls help with OOH in Kuwait?', 'Moving Walls connects audience intelligence, location planning, activation and measurement, so brands can identify relevant locations, activate across multiple OOH environments and measure campaign outcomes.'],
    ],
    seo: ['DOOH & Outdoor Advertising in Kuwait | Moving Walls', 'Plan digital outdoor advertising in Kuwait across Kuwait City, Hawally, Salmiya, Farwaniya, Ahmadi and Jahra, with audience-led planning and measurement.'],
  },
  {
    slug: 'jordan', country: 'Jordan', city: 'Amman',
    heroTitle: 'DOOH Advertising in Jordan',
    full: "Jordan offers a highly urbanised advertising environment where audiences move between business districts, residential communities, retail destinations, transport corridors and major tourism locations.\n\nWith an estimated 11.9 million people at the end of 2025, Jordan has significant audience concentrations across Amman, Zarqa, Irbid and other major urban centres. Amman alone accounted for approximately 5 million residents, while Irbid had more than 2.2 million.\n\nMoving Walls enables advertisers to plan, activate and measure connected OOH using audience and location intelligence.",
    short: 'Reach audiences across Amman, Zarqa, Irbid, Aqaba and Madaba with connected digital out-of-home advertising.',
    button: 'Explore Jordan DOOH',
    banner: ['Boost Your Visibility in Jordan with Outdoor Advertising', "Whether you're looking to build nationwide awareness, reach audiences in Amman, target specific urban communities or connect with visitors in tourism destinations such as Aqaba, Moving Walls can help you plan and activate OOH around the audiences and locations that matter to your campaign.", 'Plan Your Jordan OOH Campaign'],
    faqsHeading: 'FAQs on DOOH Advertising in Jordan',
    faqs: [
      ['Why advertise in Jordan?', 'Jordan had an estimated 11.9 million people at the end of 2025, with large audience concentrations in Amman (about 5 million) and Irbid (more than 2.2 million). Tourism adds another audience, with 3.29 million international visitors in the first half of 2025.'],
      ['What are the key cities for OOH advertising in Jordan?', 'Amman is the largest urban advertising market. Zarqa and Irbid add scale across central and northern Jordan, Aqaba offers a Red Sea tourism and leisure audience, and Madaba reaches heritage visitors and local communities.'],
      ['What DOOH formats are available in Jordan?', 'Digital billboards, airport advertising, mall advertising, transit advertising, roadside advertising and place-based media in retail, hospitality and entertainment destinations.'],
      ['Are there regulations for outdoor advertising in Jordan?', 'Yes. Outdoor advertising is subject to local authority and municipal requirements covering approvals, the size and structure of displays, road and public safety, and the impact on the urban environment. Amman and other municipalities may have their own procedures.'],
      ['Can I advertise in tourism and heritage locations in Jordan?', 'Additional permissions may apply to particular public, commercial, heritage or tourism locations, so approvals should be confirmed for the specific location and format before activation.'],
      ['How does Moving Walls help with OOH in Jordan?', "Moving Walls helps brands identify the right locations, plan with audience and movement insights, activate across digital and traditional OOH, optimise delivery and measure outcomes through Moving Walls' measurement capabilities."],
    ],
    seo: ['DOOH & Billboard Advertising in Jordan | Moving Walls', 'Plan DOOH and billboard advertising in Jordan across Amman, Zarqa, Irbid, Aqaba and Madaba, with audience-led planning, activation and measurement.'],
  },
]

const tx = c.transaction()
for (const p of pages) {
  tx.createOrReplace({
    _id: `drafts.location-${p.slug}`,
    _type: 'location',
    country: p.country,
    city: p.city,
    slug: { _type: 'slug', current: p.slug },
    heroTitle: p.heroTitle,
    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: placeholder } },
    description: p.short,
    fullDescription: p.full,
    ctaButtonText: p.button,
    showAllLocationsButton: true,
    hideDefaultHero: false,
    contactFormUrl: FORM,
    isActive: true,
    sectionsPosition: 'before-faqs',
    sections: [
      { _key: k(), _type: 'customEmbed', backgroundColor: 'transparent', maxWidth: 'full', code: embeds[p.slug] },
      { ...logos, _key: k() },
      { _key: k(), _type: 'ctaBanner', backgroundColor: 'blue', heading: p.banner[0], subheading: p.banner[1], ctaText: p.banner[2], ctaLink: FORM },
    ],
    faqsHeading: p.faqsHeading,
    faqs: p.faqs.map(([question, answer]) => ({ _key: k(), question, answer })),
    seo: { _type: 'seo', metaTitle: p.seo[0], metaDescription: p.seo[1], enableKeywords: false, noIndex: false },
  })
}
await tx.commit()
console.log('drafts:', pages.map((p) => `drafts.location-${p.slug}`).join(', '), '| placeholder', placeholder)
