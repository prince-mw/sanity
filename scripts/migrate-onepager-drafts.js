// Bulk migration: creates DRAFT-only one-pager content for all remaining case studies
// (the 3 pilots were already done via pilot-onepager-drafts.js). Does NOT touch published
// documents — nothing changes on the live site until someone clicks Publish in Studio.
// The AirAsia "7 million free seats" case study is intentionally excluded — its deck slide
// still has an unresolved "[[Market]]" placeholder pending confirmation from Dg.
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const envPath = path.join(__dirname, '..', '.env.local');
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) {
    process.env[match[1]] = match[2].trim();
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const ENTRIES = [
  {
    id: 'b8dac2d9-0255-41aa-a446-213764c22fa8', // Chinese New Year Africa
    title: 'Chinese New Year Scaled Across Africa With 567 Digital Screens',
    titleHighlight: '567 Digital Screens',
    categoryBadge: 'campaign',
    metaLine: 'Africa · 10 markets · 567 digital screens · 24-hour campaign',
    challenge: 'The campaign needed to overcome fragmented media networks and different execution timelines across 10 African markets, while ensuring the Chinese New Year creative went live simultaneously and consistently across all locations.',
    whatWeDid: [
      'Used Moving Walls Planner to select DOOH sites across 10 African markets',
      'Activated 567 digital screens through Moving Walls Activate',
      'Deployed one unified CCTV Spring Festival Gala creative across all markets',
      'Launched the campaign simultaneously across all 10 markets in a single day',
    ],
    whyItWorked: 'Multiple media owner networks were connected through one platform, enabling the Chinese New Year creative to run simultaneously across 10 markets.',
    metrics: [
      { label: 'Estimated impressions', value: '37.8M' },
      { label: 'Digital screens activated', value: '567' },
      { label: 'Single-day campaign rollout', value: '24 Hours' },
    ],
  },
  {
    id: '555edeca-f483-4995-ac40-5abe1a588d1a', // Mau Media
    title: 'Mau Media Turned OOH Visibility Into Measurable Audience Delivery',
    titleHighlight: 'Measurable Audience Delivery',
    categoryBadge: 'measurement-brand-lift',
    metaLine: 'Mauritius · OOH audience measurement · MW Measure',
    challenge: "Mau Media relied on estimated visibility to evaluate its OOH inventory, making it difficult to quantify audience delivery, compare sites, and support data-backed pricing.",
    whatWeDid: [
      "Mapped and digitized Mau Media's OOH inventory across Mauritius",
      'Used MW Measure to analyze audience movement and calculate site-level reach and impressions',
      'Identified high-performing locations and non-peak audience patterns',
      'Standardized audience reporting to support inventory packaging and planning',
    ],
    whyItWorked: "Adding audience measurement to Mau Media's existing infrastructure enabled the team to evaluate, package, and price inventory based on actual audience delivery.",
    metrics: [],
  },
  {
    id: '4WosXPXvlMgq3tPqrVek5p', // Confectionery Philippines
    title: "DOOH Reached 23,207 Shoppers During the Philippines' Peak Holiday Period",
    titleHighlight: '23,207 Shoppers',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · 15-day DOOH campaign · Confectionery · Retail',
    challenge: 'For a confectionery brand, the campaign needed to maintain visibility during the peak Christmas shopping period and concentrate exposure in high-footfall retail environments where purchase decisions were taking place.',
    whatWeDid: [
      'Selected two high-footfall retail environments using Moving Walls Planner',
      'Used location, audience and retail intelligence to identify priority placements',
      'Concentrated exposure around key shopping corridors and peak retail activity',
      'Optimised delivery based on site-level performance and audience insights',
    ],
    whyItWorked: 'Retail and audience intelligence helped concentrate exposure where shopper activity and impression delivery were strongest.',
    metrics: [
      { label: 'Estimated impressions', value: '2.1M' },
      { label: 'Ad plays delivered', value: '3,173' },
      { label: 'Unique individuals reached', value: '23,207' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPc8z', // Masterise Homes
    title: 'Masterise Homes Reached 80K+ Urban Consumers Across 14 Premium Locations',
    titleHighlight: '80K+ Urban Consumers',
    categoryBadge: 'campaign',
    metaLine: 'Vietnam · 17-day DOOH campaign · Real Estate',
    challenge: 'Masterise Homes needed to reach high-value urban audiences for its premium residential offering, with greater precision than broad traffic-based OOH could provide.',
    whatWeDid: [
      'Deployed DOOH across 14 premium retail and lifestyle locations',
      'Used movement and audience data to identify high-potential property audiences',
      'Aligned ad delivery with peak audience activity, including key days and time windows',
      'Prioritised high-performing premium locations based on audience and impression data',
    ],
    whyItWorked: 'Audience data helped Masterise target high-value audiences in premium locations at the right times.',
    metrics: [
      { label: 'Unique individuals reached', value: '80K+' },
      { label: 'Billable impressions', value: '427K+' },
      { label: 'Campaign Duration', value: '17 Days' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVejA1', // Al Arabia
    title: 'Al Arabia United in Egypt Cut OOH Reporting Time From 5 Days to 24 Hours',
    titleHighlight: '5 Days to 24 Hours',
    categoryBadge: 'platform-adoption',
    metaLine: 'Egypt · OOH audience measurement · 35 measured sites',
    challenge: 'Al Arabia needed to replace manual reporting and limited audience visibility with a standardised measurement framework that could provide advertisers with consistent reach, impression and audience data.',
    whatWeDid: [
      'Integrated ~35 OOH sites into Moving Walls Measure',
      'Established standardised audience measurement and reporting workflows',
      'Enabled audience demographics and segmentation across measured locations',
      'Trained sales and operations teams to use audience insights in proposals and campaign reviews',
    ],
    whyItWorked: 'A unified measurement workflow made audience reporting faster, consistent and easier to use with advertisers.',
    metrics: [
      { label: 'Reporting turnaround time', value: '24 Hours' },
      { label: 'Measured OOH sites', value: '35' },
      { label: 'Measured campaigns with audience-based post-campaign reviews', value: '100%' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00bzA', // FC Media
    title: 'FC Media Proved OOH Campaign Impact With Audience Measurement in Morocco',
    titleHighlight: 'Audience Measurement',
    categoryBadge: 'measurement-brand-lift',
    metaLine: 'Morocco · OOH audience measurement · Campaign Performance',
    challenge: 'FC Media needed to provide the advertiser with measurable proof of campaign delivery across different locations, audiences and time periods, rather than relying on estimated reach.',
    whatWeDid: [
      'Deployed Moving Walls Measure to track audience exposure across campaign locations',
      'Measured campaign delivery using movement and traffic data',
      'Evaluated performance across locations and time bands',
      'Generated post-campaign audience insights to validate campaign delivery',
    ],
    whyItWorked: 'A unified measurement workflow made audience reporting faster, consistent and easier to use with advertisers.',
    metrics: [
      { label: 'Lift in brand recall', value: '25%' },
      { label: 'Engagement', value: '15%' },
      { label: 'Sales uplift', value: '10%' },
      { label: 'Audience recall', value: '40%' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVeiSf', // Fintech Philippines
    title: 'Fintech Brand Drove 3M+ Views Across 8 High-Traffic Locations in the Philippines',
    titleHighlight: '3M+ Views',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · 54-day DOOH campaign · Fintech',
    challenge: 'The fintech brand needed to move beyond broad demographic targeting and reach consumers during everyday moments when payment decisions were more likely to happen.',
    whatWeDid: [
      'Activated 8 digital screens across high-traffic urban locations',
      'Used movement and visitation data to identify high-intent audience segments',
      'Targeted food lovers, grocery shoppers, healthcare visitors and commuters',
      'Optimised ad delivery around peak foot-traffic hours and high-intent locations',
    ],
    whyItWorked: 'Audience and location data helped the brand reach consumers during relevant moments across their daily routines.',
    metrics: [
      { label: 'Potential views over 54 days', value: '3.06M' },
      { label: 'Unique audiences reached', value: '239,650' },
      { label: 'Of forecast ad plays delivered', value: '52,556' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00bmy', // Luxury Hotel Sydney
    title: 'Luxury Hotel Reached 284K Travelers and Urban Audiences Across Sydney',
    titleHighlight: '284K Travelers',
    categoryBadge: 'campaign',
    metaLine: 'Sydney, Australia · 13-day programmatic DOOH campaign · 27 premium screens',
    challenge: 'The Luxury hotel needed to reach high-value travellers, commuters and professionals across changing travel patterns, while ensuring its DOOH presence appeared in premium locations during relevant travel moments.',
    whatWeDid: [
      'Ran a 13-day programmatic DOOH campaign across 27 premium digital screens',
      'Used Moving Walls Planner to identify locations based on audience movement and footfall',
      'Targeted travellers, commuters and professionals across CBD and transit locations',
      'Activated the campaign programmatically through Moving Walls Activate for real-time optimisation',
    ],
    whyItWorked: 'Audience and location data helped the brand reach consumers during relevant moments across their daily routines.',
    metrics: [
      { label: 'Potential views over 13 days', value: '2.52M+' },
      { label: 'Unique audiences reached', value: '284,054' },
      { label: 'Of forecast ad plays delivered', value: '77,240' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00bAM', // JP Morgan
    title: "JP Morgan Reached 73,333 Professionals Across Singapore's CBD",
    titleHighlight: '73,333 Professionals',
    categoryBadge: 'campaign',
    metaLine: 'Singapore · 26-day pDOOH campaign · 12 high-impact digital billboards',
    challenge: 'JP Morgan needed to build awareness of its active ETFs among working professionals by reaching them at relevant points in their daily commute and workday.',
    whatWeDid: [
      'Used Moving Walls Planner and footfall data to select 12 high-impact digital billboards',
      'Used geofencing and behavioural data to target working professionals',
      'Used Moving Walls Activate for programmatic buying across media owner networks',
      'Scheduled delivery around peak commute and lunch hours, with 9 AM and 5 PM as key peak periods',
    ],
    whyItWorked: 'Audience data and dynamic scheduling helped JP Morgan reach working professionals when and where they were most active.',
    metrics: [
      { label: 'Impressions delivered', value: '506K+' },
      { label: 'Unique audiences reached', value: '73,333' },
      { label: 'Of forecast ad plays delivered', value: '55,950' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00at5', // Retail Media Network (store-level data)
    title: 'How Store-Level Transaction Data Helped Improve DOOH Efficiency Without Adding Screens',
    titleHighlight: 'Improve DOOH Efficiency',
    categoryBadge: 'retail-media-data',
    metaLine: 'Retail media · Store & vicinity · Transaction data',
    challenge: 'The retail media owner was using broad, fixed time windows for DOOH, making it difficult to align screen delivery with actual purchase behaviour and avoid low-intent impressions.',
    whatWeDid: [
      'Used Moving Walls Measure to analyse store-level transaction and audience data',
      'Identified category-specific high-spend hours and store-level peak periods',
      'Adjusted DOOH activation to high-intent time bands, including store vicinity',
      'Analysed hourly, weekday/weekend and event-driven purchase patterns across four store environments',
    ],
    whyItWorked: 'Store-level purchase data helped align screen delivery with the times and locations of highest purchase intent.',
    metrics: [
      { label: 'Higher weekend sales', value: '2.5x' },
      { label: 'Monthly transactions from weekends', value: '55%' },
      { label: 'Store environments analysed', value: '4' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVefrt', // Calvin Klein
    title: "Calvin Klein connected with 363K+ consumers through data-led DOOH across Vietnam's lifestyle hubs.",
    titleHighlight: '363K+ consumers',
    categoryBadge: 'campaign',
    metaLine: 'Vietnam · 27-day DOOH campaign · 230 screens',
    challenge: 'Calvin Klein needed to build visibility among urban, aspirational audiences by reaching them in relevant lifestyle environments and during periods of high audience activity.',
    whatWeDid: [
      'Deployed 230 screens across 39 lifestyle locations in Hanoi, Ho Chi Minh City and Khanh Hoa',
      'Used Moving Audience to identify high-traffic fitness and lifestyle locations',
      'Focused delivery around peak morning hours, particularly 6–8 AM',
      'Optimised placements using audience and location performance data',
    ],
    whyItWorked: 'Location intelligence and time-based optimisation helped Calvin Klein maximise exposure among active urban audiences.',
    metrics: [
      { label: 'Total Billable impressions', value: '1.56M+' },
      { label: 'Unique individuals reached', value: '363K+' },
      { label: 'Average frequency', value: '4.4' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVefOz', // Straat Africa
    title: "Empowering Media Owners With Straat Africa's In-Taxi Screen Network",
    titleHighlight: 'In-Taxi Screen Network',
    categoryBadge: 'campaign',
    metaLine: 'South Africa · 2025 · MW Solution - Audience Measurement · Programmatic Buying · with Straat Africa',
    challenge: "Straat Africa was scaling an in-taxi DOOH network, but managing hundreds of screens manually made campaign operations difficult and limited its ability to prove audience value to advertisers.",
    whatWeDid: [
      'Centralized 100+ taxis with MW Solution for easier scheduling and content management.',
      'Mapped taxi routes and audience patterns to identify high-traffic areas and peak commuting periods.',
      'Enabled programmatic buying to give advertisers faster access to the network.',
      'Introduced audience measurement and transparent reporting to demonstrate campaign performance.',
    ],
    whyItWorked: 'By connecting screen management, audience insights, campaign activation and reporting in one workflow, Straat Africa could operate its growing network more efficiently while giving advertisers clearer proof of media value.',
    metrics: [
      { label: 'Monthly impressions', value: '3M+' },
      { label: 'Viewability rate', value: '85%+' },
      { label: 'Of impressions during prime hours', value: '70%' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPX0b', // Crypto Malaysia
    title: 'Crypto Brand Reached 930K+ Malaysians Across 8 High-Traffic Urban Locations',
    titleHighlight: '930K+ Malaysians',
    categoryBadge: 'campaign',
    metaLine: 'Malaysia · 5-week programmatic DOOH campaign · 8 locations',
    challenge: 'The crypto brand needed to reach beyond tech-savvy audiences and build familiarity and trust among everyday Malaysians in a regulated and cautious market.',
    whatWeDid: [
      'Ran a 5-week programmatic DOOH campaign across 8 high-traffic urban sites',
      'Used audience segmentation to reach mid-income earners, young families and food lovers',
      'Adapted campaign messaging based on real-time location and time-of-day data.',
      'Optimised placements and creative delivery based on audience response and location data',
    ],
    whyItWorked: 'Audience data and real-time optimisation helped the campaign reach audiences with relevant messaging across everyday urban environments.',
    metrics: [
      { label: 'Total Impressions Delivered', value: '7.18M+' },
      { label: 'Unique individuals reached', value: '930K+' },
      { label: 'Billable ad plays', value: '107,572' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVeesT', // OOH Traxx
    title: 'OOH Traxx digitized 100+ assets and built a faster, programmatic-ready OOH business',
    titleHighlight: 'programmatic-ready OOH business',
    categoryBadge: 'campaign',
    metaLine: 'Kenya · AdOps Automation · Centralized Inventory · Programmatic Buying · Audience Measurement',
    challenge: 'OOH Traxx was growing across roadside, mall and retail screens, but managing 100+ assets manually was slowing operations, limiting advertiser access and making campaign performance harder to prove.',
    whatWeDid: [
      'Centralized 100+ roadside, mall and retail assets in one platform.',
      'Automated scheduling and campaign workflows to reduce repetitive manual work.',
      'Enabled faster advertiser booking, including programmatic buying.',
      'Added audience reporting and campaign insights to give advertisers clearer proof of performance.',
    ],
    whyItWorked: 'By bringing inventory, campaign operations, booking and measurement into one workflow, OOH Traxx could operate more efficiently while giving advertisers the speed, transparency and proof needed to book with confidence.',
    metrics: [
      { label: 'OOH assets digitized', value: '100+' },
      { label: 'Campaign activations', value: 'Faster' },
      { label: 'Proof-of-performance', value: 'Trust' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00aOb', // Maggi
    title: "Maggi reached 750K consumers in 15 days by putting its message in the right place and time",
    titleHighlight: '750K consumers',
    categoryBadge: 'campaign',
    metaLine: 'Vietnam · Programmatic DOOH · Audience Targeting · Real-Time Optimization',
    challenge: 'Maggi wanted to strengthen its connection with busy urban consumers in Vietnam, especially young women, by reaching them at the moments and places most relevant to their daily routines.',
    whatWeDid: [
      'Used audience and footfall data to identify high-traffic commuter corridors, retail hubs and markets.',
      'Activated 338 screens across major cities to build reach at scale.',
      'Focused delivery around the morning rush with peak targeting between 7–9 AM.',
      'Optimized placements in real time using impression, reach and view-rate data to shift delivery toward higher-performing screens and locations.',
    ],
    whyItWorked: 'Instead of treating every screen and every hour equally, Maggi used audience, location and timing signals to concentrate delivery around the moments when its target consumers were most likely to be reached.',
    metrics: [
      { label: 'Consumers reached', value: '750K' },
      { label: 'Impressions delivered', value: '3.2M+' },
      { label: 'Morning impressions', value: '1.6M+' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVediD', // FMCG Ramadan
    title: 'An FMCG brand achieved 95% ad recall in 29 days by owning the Iftar moment',
    titleHighlight: '95% ad recall',
    categoryBadge: 'campaign',
    metaLine: 'Ramadan · Programmatic Transit DOOH · Dynamic Creative · Audience Targeting · Real-Time Optimization',
    challenge: 'Ramadan changed when and where consumers travelled, but the brand needed to stay relevant during the critical Iftar commute. Its previous transit campaigns lacked the ability to dynamically target these moments or optimize delivery in real time.',
    whatWeDid: [
      'Used data to identify key Iftar commute hotspots',
      'Activated 924 in-train digital screens programmatically',
      'Delivered dynamic Ramadan-focused creative',
      'Optimized delivery using real-time audience and location data',
    ],
    whyItWorked: "The campaign didn't treat Ramadan like a standard media period. It aligned audience, timing, location and creative around the Iftar journey—making the brand more relevant when consumers were most receptive.",
    metrics: [
      { label: 'Unique individuals reached', value: '11.9M' },
      { label: 'Impressions delivered', value: '17.8M' },
      { label: 'Ad recall', value: '95%' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVee25', // Jeki Japan
    title: "How Japan's Transit Media Cut Manual Work and Scaled DOOH",
    titleHighlight: 'Scaled DOOH',
    categoryBadge: 'campaign',
    metaLine: 'Japan · Transit DOOH · Media Digitization · Campaign Automation · Programmatic Buying',
    challenge: "Japan's OOH market needed a more efficient way to connect diverse media inventory with growing local and international advertising demand. jeki wanted to build a scalable marketplace that could simplify media transactions and unlock new demand.",
    whatWeDid: [
      'Digitized OOH inventory',
      'Automated media transactions',
      'Enabled programmatic buying',
      'Connected jeki to global demand',
    ],
    whyItWorked: 'MASTRUM brings diverse Japanese OOH inventory into a unified marketplace, combining automation and programmatic capabilities to make media buying more efficient and connect Japanese inventory with global advertisers.',
    metrics: [
      { label: 'Screens integrated', value: '34,000' },
      { label: 'Repetitive admin work eliminated', value: '85%' },
      { label: "Weekly commuters reached through Jeki's network", value: '17.3M' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVedVZ', // Pharma Philippines
    title: 'A leading pharma brand reached 92,000+ health-conscious consumers across 3 high-footfall sites',
    titleHighlight: '92,000+ health-conscious consumers',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · Programmatic DOOH · Audience Targeting · Dynamic Optimization · with The Trade Desk',
    challenge: 'The brand needed to raise awareness about the similar symptoms of the common cold and COVID-19 and reach health-conscious audiences with timely, relevant messaging.',
    whatWeDid: [
      'Targeted health-conscious audiences using behavioral and demographic data',
      'Selected high-footfall urban locations',
      'Used programmatic buying for automated delivery',
      'Optimized placements and creative in real time',
    ],
    whyItWorked: 'Data-led targeting and strategic high-footfall placements helped the campaign reach health-conscious audiences when and where the message was most relevant.',
    metrics: [
      { label: 'Health-conscious individuals reached across 3 sites', value: '92K+' },
      { label: 'Impressions delivered across the campaign', value: '1.13M' },
      { label: 'Ad plays delivered over 62 days', value: '20,570' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPThv', // AHA
    title: 'AHA connected with audiences across 100 U.S. retail hubs',
    titleHighlight: '100 U.S. retail hubs',
    categoryBadge: 'campaign',
    metaLine: 'U.S. · Programmatic DOOH · Audience Targeting · Retail Media · Cultural Relevance',
    challenge: "AHA wanted to reach its target audience in the U.S. beyond digital channels and connect with audiences in relevant real-world environments.",
    whatWeDid: [
      'Identified relevant audience locations',
      'Activated DOOH across U.S. retail hubs',
      'Used programmatic buying for targeted delivery',
      "Extended AHA's digital presence into the physical world",
    ],
    whyItWorked: "By bringing AHA's content into retail environments where audiences were already spending time, the campaign extended digital reach into real-world moments.",
    metrics: [
      { label: 'Impressions delivered', value: '552,853' },
      { label: 'Supermarkets activated', value: '100+' },
      { label: 'Campaign duration', value: '12 Days' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPSn4', // Adidas
    title: 'Adidas reached 109K+ people and 1.1M+ potential views across 3 high-traffic locations',
    titleHighlight: '109K+ people',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · Programmatic DOOH · Audience Targeting · Data-Led Optimization · with The Trade Desk',
    challenge: 'Adidas wanted to build visibility for its new performance footwear line and reach active, urban audiences across high-footfall locations in the Philippines.',
    whatWeDid: [
      'Activated programmatic DOOH across 3 urban locations',
      'Used audience data to target relevant demographics',
      'Optimized sites using screen-level performance data',
      'Focused on active lifestyle audiences',
    ],
    whyItWorked: 'Data-led site selection and audience targeting helped Adidas focus its campaign on high-performing locations and audiences aligned with its performance footwear launch',
    metrics: [
      { label: 'Potential views', value: '1.15M' },
      { label: 'Unique reach', value: '109K+' },
      { label: 'Impressions from top site', value: '54.97%' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVecZl', // ZOHO
    title: 'ZOHO reached 3.16 million people with 92.7 million impressions in India',
    titleHighlight: '92.7 million impressions',
    categoryBadge: 'campaign',
    metaLine: 'India · Programmatic DOOH · Audience Targeting · Location Analytics · with Moving Walls',
    challenge: 'ZOHO Workplace wanted to increase brand visibility and reach potential customers effectively across high-traffic areas in India.',
    whatWeDid: [
      'Used programmatic DOOH for targeted delivery',
      'Leveraged real-time audience data and location analytics',
      'Reached key audience segments at strategic times and locations',
      'Optimized delivery around peak audience periods',
    ],
    whyItWorked: 'By combining programmatic DOOH with audience and location data, ZOHO could reach millions of potential customers at strategic times and locations, strengthening brand visibility and awareness.',
    metrics: [
      { label: 'Impressions delivered', value: '92.7M' },
      { label: 'Unique reach', value: '3.16M' },
      { label: 'Ad plays delivered', value: '388.8K' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVecN7', // Hyatt Regency
    title: 'Hyatt Regency increased guest engagement by 40% with personalized digital content',
    titleHighlight: '40% with personalized digital content',
    categoryBadge: 'campaign',
    metaLine: 'Hotel · Digital Signage · Personalized Content · Guest Experience · with LMX',
    challenge: 'Hyatt Regency wanted to improve the guest experience by delivering relevant, personalized information to business travelers, leisure guests and event attendees across the hotel.',
    whatWeDid: [
      'Installed 15 interactive screens across the hotel',
      'Localized content for different guest needs',
      'Replaced paper-based welcome materials with digital screens',
      'Delivered personalized guest messages and information',
    ],
    whyItWorked: 'By combining strategic screen placement with personalized, localized content, Hyatt Regency made information more relevant while creating a more engaging guest experience.',
    metrics: [
      { label: 'Increase in guest engagement', value: '40%' },
      { label: 'Increase in return visitors', value: '15%' },
      { label: 'Interactive screens', value: '15' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVecFt', // AQUA
    title: 'AQUA reached 1 million+ people with weather-triggered DOOH in Jakarta',
    titleHighlight: '1 million+ people',
    categoryBadge: 'campaign',
    metaLine: 'Indonesia · Programmatic DOOH · Dynamic Creative · Weather Targeting · Audience Data',
    challenge: "AQUA wanted to increase brand visibility and connect with Jakarta's millennial audience during Citayam Fashion Week with more relevant, context-driven messaging",
    whatWeDid: [
      'Targeted high-traffic locations across Jakarta',
      'Activated weather-triggered creative',
      'Used a mobile LED truck across key routes',
      'Optimized delivery using real-time data',
    ],
    whyItWorked: 'By combining real-time weather data, strategic locations and dynamic creative, AQUA delivered messages that stayed relevant to the audience and their surroundings.',
    metrics: [
      { label: 'People reached', value: '1.04M' },
      { label: 'Views delivered', value: '2.59M' },
      { label: 'Campaign duration', value: '42 Days' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPQPF', // Insurer Philippines
    title: "A leading insurer reached 287K+ people with a 31-day Valentine's DOOH campaign",
    titleHighlight: '287K+ people',
    categoryBadge: 'campaign',
    metaLine: "Philippines · Programmatic DOOH · Dynamic Creative · Audience Targeting · Location Planning",
    challenge: 'The insurance company wanted to build awareness and generate interest in personal insurance by connecting with urban audiences through a more engaging and locally relevant campaign.',
    whatWeDid: [
      'Planned high-impact DOOH locations across the Philippines',
      "Created Valentine's Day-themed localised creatives",
      'Used two creatives featuring local personalities',
      'Connected the message of love with personal insurance',
    ],
    whyItWorked: "By combining strategic urban locations with culturally relevant Valentine's Day creative, the campaign made insurance more relatable while reaching a broad local audience.",
    metrics: [
      { label: 'Impressions delivered', value: '2.65M' },
      { label: 'Unique reach', value: '287.7K' },
      { label: 'Total spots', value: '32,861' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPPnL', // Pizza brand
    title: 'A pizza brand reached 142K+ consumers with data-driven DOOH in the Philippines',
    titleHighlight: '142K+ consumers',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · Programmatic DOOH · Audience Targeting · Location Intelligence · Retail Proximity',
    challenge: 'A popular Philippine pizza chain wanted to promote its mix-and-match menu, increase awareness and drive more online orders and in-store visits during the holiday period.',
    whatWeDid: [
      'Identified locations with high concentrations of pizza lovers',
      'Activated programmatic DOOH across 2 locations',
      'Targeted audiences using mobility and location data',
      'Placed media close to relevant brand touchpoints',
    ],
    whyItWorked: 'Using audience and location data, the campaign focused on reaching pizza lovers at the right places and near relevant outlets, helping keep the brand top of mind when consumers were ready to purchase.',
    metrics: [
      { label: 'Views delivered', value: '2.81M' },
      { label: 'Unique reach', value: '142.9K' },
      { label: 'Campaign duration', value: '92 Days' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPPYB', // Lay's
    title: "Lay's reached 220K+ consumers during the Philippines' holiday season",
    titleHighlight: '220K+ consumers',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · DOOH · Audience Targeting · Location Planning · Seasonal Campaign',
    challenge: "Lay's wanted to strengthen its position as the go-to snack for holiday celebrations while reaching younger adults and families during the festive shopping season.",
    whatWeDid: [
      'Activated DOOH across 9 prime locations',
      'Targeted younger adults and families',
      'Placed screens near malls and grocery stores',
      'Connected the message of love with personal insurance',
    ],
    whyItWorked: "By combining strategic locations, festive creative and audience targeting, Lay's reached consumers while they were out shopping and celebrating during the holiday season.",
    metrics: [
      { label: 'Views delivered', value: '2.82M' },
      { label: 'Unique reach', value: '220.6K' },
      { label: 'Ad plays', value: '48.7K' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPOVk', // RKG Ghee
    title: 'RKG Ghee reached 187K people during Thaipusam with precision-targeted DOOH',
    titleHighlight: '187K people',
    categoryBadge: 'campaign',
    metaLine: 'Malaysia · Programmatic DOOH · Precision Targeting · Cultural Moments · Audience Data',
    challenge: 'RKG Ghee wanted to build brand awareness in Malaysia and connect with Thaipusam devotees at the right locations and moments during the festival.',
    whatWeDid: [
      'Selected premium screens near Batu Caves',
      'Targeted Thaipusam festival-goers',
      'Used culturally relevant creative',
      'Focused on food-lover audiences',
    ],
    whyItWorked: 'By combining precision location targeting with culturally relevant creative, RKG Ghee placed its message close to the heart of Thaipusam celebrations and reached audiences most relevant to the brand.',
    metrics: [
      { label: 'Impressions delivered', value: '2M' },
      { label: 'People reached', value: '187K' },
      { label: 'CPM', value: 'MYR 5.80' },
    ],
  },
  // NOTE: AirAsia "7 million free seats" (id NUzgRk9h7jKjntS8q00Ym0) intentionally
  // excluded — deck slide still has an unresolved "[[Market]]" placeholder.
  {
    id: 'NUzgRk9h7jKjntS8q00Yfu', // AirAsia 7 weeks Malaysia
    title: 'AirAsia ran seven weeks, seven offers, and 29 million impressions across Malaysia.',
    titleHighlight: '29 million impressions',
    categoryBadge: 'campaign',
    metaLine: 'Malaysia · 7-week flight · Programmatic DOOH · weekly creative rotation',
    challenge: 'Peak travel season, and AirAsia needed its seasonal offers to stand out and stay top of mind while pushing audiences into the super app. Digital alone would not put the brand in front of people in the physical world.',
    whatWeDid: [
      'Booked 37 DOOH sites across 9 states and 10 districts in Malaysia',
      'Rotated a fresh creative every week for seven weeks, one offer at a time',
      'Ran it through Moving Audiences Xchange, with automated media owner approvals',
      'Checked live impression and proof-of-play data against forecast, and adjusted',
    ],
    whyItWorked: 'A new offer every week kept a long flight feeling current, and proof-of-play data meant each switch was made on evidence rather than instinct.',
    metrics: [
      { label: 'Impressions delivered, against a 22M forecast', value: '29M+' },
      { label: 'Sites across 9 states and 10 districts', value: '37' },
      { label: 'Fresh creatives, one per week of the flight', value: '7' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPNmG', // McDonald's weather 10-day
    title: "McDonald's turned live weather into deals, and lifted store visits 9% in 10 days.",
    titleHighlight: 'lifted store visits 9%',
    categoryBadge: 'retail-media-data',
    metaLine: 'Philippines · 10-day flight · Dynamic DOOH · live weather data · footfall measurement',
    challenge: "McDonald's was launching Crave and Claim Deals that only unlocked in its app when local weather hit certain conditions. The offers needed mass-reach promotion, but could only be revealed as conditions changed.",
    whatWeDid: [
      'Connected open weather feeds to the buy through the Moving Audiences (MAX) platform',
      'Wrote custom ad-serving rules so creative changed with live local temperature',
      'Ran dynamic creative across multiple screens in 7 locations in the Philippines',
      "Matched DOOH-exposed mobile devices against McDonald's stores to measure visits",
    ],
    whyItWorked: 'The screen only showed the deal when the weather made it relevant, so the trigger in the street matched the trigger in the app.',
    metrics: [
      { label: "Lift in exposed audiences visiting McDonald's", value: '9%' },
      { label: 'Impressions delivered in 10 days', value: '~1M' },
      { label: 'Additional measured impressions vs forecast', value: '152%' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPNLj', // ICC
    title: '18 media owners put the ICC T20 World Cup on 2,211 screens in 662 locations worldwide.',
    titleHighlight: '2,211 screens',
    categoryBadge: 'partnership',
    metaLine: "Global · ICC Men's T20 World Cup 2022 · Dynamic DOOH · with 18 media owners",
    challenge: "The ICC wanted to grow cricket's audience beyond existing fans while keeping those fans current with the tournament. Reaching people far from the grounds, in many markets at once, needed supply no single media owner could offer.",
    whatWeDid: [
      'Brought 18 media owners into one campaign through our global DOOH DSP',
      'Piped near real-time scores and highlights into the creative during play',
      'Produced 149 unique creatives to keep the feed fresh across the tournament',
      'Opened the score updates to brand sponsorship, locally or across all markets',
    ],
    whyItWorked: 'The screens carried content people already wanted, in places they were already waiting, so the campaign behaved like a live feed rather than an ad.',
    metrics: [
      { label: 'Locations globally, across 18 media owners', value: '662' },
      { label: 'Screens carrying the live feed', value: '2,211' },
      { label: 'Ad spots delivered across the tournament', value: '2.6M' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00Xq5', // Birch Tree
    title: 'Birch Tree launched its immune-boosting milk powder to targeted shoppers across the Philippines.',
    titleHighlight: 'targeted shoppers',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · Programmatic DOOH · Google DV360',
    challenge: 'Birch Tree needed to reach a specific dairy audience inside a crowded market with fragmented tastes and dietary trends. Broad-brush buying would spend against people who were never going to convert.',
    whatWeDid: [
      'Bought programmatic DOOH through Google DV360',
      'Targeted by age, gender, location and interest rather than by site alone',
      'Concentrated on iconic highway screens and high-traffic facades',
      'Weighted placement toward areas with high target-audience density',
    ],
    whyItWorked: 'Audience targeting decided the buy, so the iconic sites were chosen for who passes them rather than for how big they are.',
    metrics: [],
  },
  {
    id: '4WosXPXvlMgq3tPqrVeZ6n', // Caltex
    title: 'Caltex reached nearly 700,000 unique audiences in Malaysia, and beat its forecast plays.',
    titleHighlight: '700,000 unique audiences',
    categoryBadge: 'campaign',
    metaLine: 'Malaysia · 62-day tracking period · Programmatic DOOH · with GroupM',
    challenge: 'Caltex wanted to extend a running video campaign onto spectacular DOOH sites and retarget the same passersby on mobile. Awareness alone was not enough. Delivery had to be provable across several media owners.',
    whatWeDid: [
      'Used the Moving Audiences planner to find DOOH sites close to Caltex stations',
      'Forecast reach and impressions before booking, then tracked delivery against it',
      'Paired the sites with a mobile guessing game triggered within a 5km radius',
      'Reweighted toward the highest-performing sites using live audience data',
    ],
    whyItWorked: 'One billboard alone drove over a quarter of impressions, and tracking against forecast is what made that visible in time to act on it.',
    metrics: [
      { label: 'Potential views over 62 days', value: '8.73M' },
      { label: 'Unique audiences reached', value: '700K' },
      { label: 'Of forecast ad plays delivered', value: '125.76%' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00XDT', // Dell
    title: 'Dell beat its forecast by 800,000 potential views, targeting small business owners in Malaysia.',
    titleHighlight: '800,000 potential views',
    categoryBadge: 'campaign',
    metaLine: 'Malaysia · Programmatic DOOH · Moving Audiences Planner · with GroupM',
    challenge: 'Dell needed awareness for its Small Business Solutions among a narrow segment, small business owners. A general DOOH buy would reach plenty of people and very few of them the right ones.',
    whatWeDid: [
      'Used the Moving Audiences Planner to find sites dense in small business owners',
      'Targeted by location, day and time of day rather than by site alone',
      'Verified every play through the Ad-Play Verification Service',
      'Reviewed weekly performance and shifted spend to the highest-exposure sites',
    ],
    whyItWorked: 'Audience movement data showed which sites were underperforming week by week, so budget moved off them while the campaign was still running.',
    metrics: [
      { label: 'Potential views above forecast', value: '+800K' },
      { label: 'Of forecast ad plays, independently verified', value: '100.85%' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPLhO', // Luxury Fragrance (YSL)
    title: 'One screen in the heart of Kuala Lumpur, 51.2% female viewership, right on the core target for the fragrance launch.',
    titleHighlight: '51.2% female viewership',
    categoryBadge: 'campaign',
    metaLine: 'Kuala Lumpur, Malaysia · DOOH · single high-impact screen',
    challenge: 'A leading luxury house was launching a new fragrance and needed anticipation built before it landed in store. The audience was narrow and the budget sat on a single site, so the screen had to be the right one.',
    whatWeDid: [
      'Used the Moving Audiences platform to find the highest-traffic screen in central KL',
      'Checked the audience profile of that site against the target before committing',
      'Concentrated delivery in the 4 to 5pm window on Fridays and Sundays',
      'Chose a site within walking distance of the store, to shorten the trip to purchase',
    ],
    whyItWorked: 'The whole budget sat on one screen, so the site was chosen on who passes it and when, not on how many people pass it.',
    metrics: [
      { label: 'Female viewership, the core target', value: '51.2%' },
      { label: 'Prime target audience window leveraged on Fridays & Sundays', value: '4 pm - 5 pm' },
      { label: 'Single high-impact location in central KL, steps from the retail store', value: '1 Screen' },
    ],
  },
  {
    id: 'NUzgRk9h7jKjntS8q00XUk', // Lancôme
    title: 'A CNY serum launch beat its forecast impressions by 107.1%, over 30 days in Malaysia.',
    titleHighlight: 'beat its forecast impressions by 107.1%',
    categoryBadge: 'campaign',
    metaLine: 'Malaysia · 30-day campaign · Premium DOOH · video · with GroupM',
    challenge: 'Chinese New Year is peak gifting season and a crowded one. Lancome needed its limited edition serum seen near its own store locations, and needed the video delivery to be accountable rather than assumed.',
    whatWeDid: [
      'Used Moving Audiences to shortlist premium panels near high-traffic malls',
      'Screened sites against the brand image, not just the footfall count',
      'Forecast audience impressions, then bought the peak hours that data showed',
      'Reported actual audience delivery back against the original forecast',
    ],
    whyItWorked: 'The forecast was made before the buy and checked after it, so peak-hour targeting could be proven rather than claimed.',
    metrics: [
      { label: 'Above forecast impressions', value: '107.1%' },
      { label: 'More audience than predicted', value: '105.5%' },
      { label: 'Of audience were frequent mall visitors', value: '78%' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVeYRF', // McDonald's 100-day
    title: "McDonald's reached 1.4 million audiences in the Philippines, at 142.63% of what was promised.",
    titleHighlight: '1.4 million audiences',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · 100-day tracking period · Dynamic DOOH · weather triggers · with GroupM',
    challenge: "McDonald's was launching McSavers Mix & Match and wanted maximum reach against the target, not just maximum plays. A flat schedule would spend the same on a wet Tuesday as on a payday Friday.",
    whatWeDid: [
      'Built three creatives for sunshine, heavy rain and Petsa de Peligro',
      'Served each one only when the live condition it was written for was true',
      'Reviewed site performance weekly across the tracking period',
      'Moved spots off underperforming sites onto higher-performing ones',
    ],
    whyItWorked: 'Three conditions meant three reasons to look, and weekly reviews moved the money to the sites that were actually delivering.',
    metrics: [
      { label: 'Audiences reached', value: '1.4M+' },
      { label: 'Of promised delivery', value: '142.63%' },
      { label: 'Days tracked', value: '100' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPHmo', // Neutrogena
    title: 'Neutrogena launched Bright Boost with 2.45 million impressions in 15 days at Mumbai Airport.',
    titleHighlight: '2.45 million impressions',
    categoryBadge: 'campaign',
    metaLine: 'India · 15-day flight · Programmatic DOOH · Google DV360 · Mumbai T2',
    challenge: 'Neutrogena was launching its Bright Boost range into a crowded market and needed the DOOH leg of a digital-first launch to reach an affluent audience with time to actually watch the screen.',
    whatWeDid: [
      'Activated 38 screens in the T2 Prime Passage at Mumbai Airport',
      'Bought them programmatically through Google DV360',
      'Used Moving Audiences to forecast reach, potential views and impressions',
      'Measured actual delivery back against that forecast as the benchmark',
    ],
    whyItWorked: 'Airport dwell time gives a launch message room to land, and the forecast gave the team something to hold the delivery against.',
    metrics: [
      { label: 'Impressions in 15 days', value: '2.45M' },
      { label: 'More reach than planned', value: '105%' },
      { label: 'Of audience aged 16 to 34', value: '55%' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVeY7N', // Samsung
    title: 'Samsung sequenced a Flip&Fold launch across Jakarta to 14 million potential views.',
    titleHighlight: '14 million potential views',
    categoryBadge: 'campaign',
    metaLine: 'Indonesia · Jan 2022 tracking period · Classic and programmatic DOOH · Google DV360',
    challenge: 'Samsung wanted anticipation for the Galaxy Z Flip3 and A03 without paying for sites that its audience never passes. Media wastage was the thing to design out, not just reach to add.',
    whatWeDid: [
      'Ran 54 classic and programmatic billboards plus LED sites across Jakarta',
      'Used Moving Audiences to pick sites by audience density, not by size',
      'Bought programmatically through Google DV360 and sequenced the messages',
      'Tracked 15 of the sites to see which ones carried the audience',
    ],
    whyItWorked: 'Audience movement data made the site list an argument rather than a preference, and the same data can sequence the next campaign.',
    metrics: [
      { label: 'Potential views across the buy', value: '14M+' },
      { label: 'Actual audience views', value: '2M+' },
      { label: 'Average opportunities to see', value: '7x' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPHMH', // Seaoil
    title: 'Seaoil told drivers how many minutes to the next station, and converted 14.91% of them at its best site.',
    titleHighlight: 'converted 14.91%',
    categoryBadge: 'retail-media-data',
    metaLine: 'Philippines · 60-day tracking period · Programmatic DOOH · live mapping API',
    challenge: 'Seaoil was running a lifetime free gas contest and wanted more than awareness. The campaign had to move drivers into forecourts, in a category where the nearest competitor is usually the default.',
    whatWeDid: [
      'Fed a live mapping API into the creative on each site',
      'Showed passing drivers the minutes to the nearest Seaoil station',
      'Used Moving Audiences to cut waste and find the traffic hours that matched',
      'Matched exposed audiences against station visits to measure conversion',
    ],
    whyItWorked: 'A live distance is an instruction rather than a message, and the audience was already in the vehicle that could act on it.',
    metrics: [
      { label: 'Conversion at the top site, of exposed audience', value: '14.91%' },
      { label: 'Potential views over 60 days', value: '1.6M' },
      { label: 'Unique individuals reached', value: '164K' },
    ],
  },
  {
    id: '4WosXPXvlMgq3tPqrVeYYT', // Shell
    title: 'Shell reached 1.4 million motorists in Malaysia, at 142.63% of what was promised.',
    titleHighlight: '1.4 million motorists',
    categoryBadge: 'campaign',
    metaLine: 'Malaysia · 100-day tracking period · Programmatic DOOH · with GroupM',
    challenge: 'Shell needed its Ekstra Kilometer message in front of motorists at the moments they were actually driving past. Over a long flight, audience movement shifts and a fixed site list quietly stops working.',
    whatWeDid: [
      'Used Moving Audiences predictive analytics to find peak motorist hours',
      'Selected billboards against live movement trends rather than historic counts',
      'Tracked real delivery against the original prediction throughout',
      'Reviewed weekly and moved spots off sites that had fallen behind',
    ],
    whyItWorked: 'Over 100 days the audience moved, and weekly reallocation meant the buy moved with it instead of running on the original plan.',
    metrics: [
      { label: 'Motorists reached', value: '1.4M+' },
      { label: 'Of promised delivery', value: '142.63%' },
      { label: 'Days tracked', value: '100' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPGVD', // Sunsilk
    title: 'Sunsilk reached 471,600 people across the Philippines in 57 days of weather-triggered DOOH.',
    titleHighlight: '471,600 people',
    categoryBadge: 'campaign',
    metaLine: 'Philippines · 57-day campaign · Programmatic DOOH · weather triggers · MAX + Google DV360',
    challenge: 'Sunsilk needed a promotion to stand out in a crowded haircare market, and needed people to remember it afterwards. On a flight this long, a single static creative stops being noticed by week two.',
    whatWeDid: [
      'Ran the campaign on the Moving Audiences Xchange (MAX) platform',
      'Built dynamic messages triggered by live local weather conditions',
      'Integrated with Google DV360 to extend the digital video buy onto screens',
      'Ran across 5 locations in the Philippines over a 57-day flight',
    ],
    whyItWorked: 'The creative changed with the weather outside the screen, so a 57-day flight kept giving people something they had not already walked past.',
    metrics: [
      { label: 'Potential views over 57 days', value: '3.49M' },
      { label: 'Unique reach across 5 locations', value: '471,600' },
      { label: 'Increase in unique reach', value: '289%' },
    ],
  },
  {
    id: 'dsdzDBKQU3TOwM9o6lPK6q', // Visa
    title: 'Visa served creative only to BMW and Mini drivers, from one screen in Jakarta.',
    titleHighlight: 'one screen in Jakarta',
    categoryBadge: 'campaign',
    metaLine: 'Indonesia · 1-month flight · Programmatic DOOH · vehicle brand analytics',
    challenge: 'Visa was launching a premium traveller card and needed a launch that felt as selective as the product. A broad DOOH buy would have said the same thing to everyone who walked past.',
    whatWeDid: [
      'Used vehicle brand analytics to detect BMW, Mini Cooper and other luxury cars',
      'Built three personalised creatives and served them in real time',
      'Triggered the ad only when the vehicle condition was met, not on a schedule',
      'Placed the single screen at a traffic light junction for the dwell time',
    ],
    whyItWorked: 'The trigger was the car in front of the screen, so a single site behaved like an audience segment rather than a location.',
    metrics: [
      { label: 'Reach', value: '154K' },
      { label: 'Potential views', value: '1.3M' },
      { label: 'Screen, at a Jakarta traffic junction', value: '1' },
    ],
  },
];

async function run() {
  let ok = 0;
  let failed = 0;
  for (const entry of ENTRIES) {
    try {
      const published = await client.getDocument(entry.id);
      if (!published) {
        console.error(`NOT FOUND: ${entry.id} (${entry.title})`);
        failed++;
        continue;
      }
      const draftId = `drafts.${entry.id}`;
      const draftDoc = {
        ...published,
        _id: draftId,
        title: entry.title,
        titleHighlight: entry.titleHighlight,
        categoryBadge: entry.categoryBadge,
        metaLine: entry.metaLine,
        challenge: entry.challenge,
        whatWeDid: entry.whatWeDid,
        whyItWorked: entry.whyItWorked,
        ...(entry.metrics && entry.metrics.length > 0 ? { metrics: entry.metrics } : {}),
      };
      delete draftDoc._rev;
      await client.createOrReplace(draftDoc);
      console.log(`OK: drafts.${entry.id} — ${entry.title}`);
      ok++;
    } catch (err) {
      console.error(`FAILED: ${entry.id} (${entry.title})`, err.message);
      failed++;
    }
  }
  console.log(`\nDone. ${ok} succeeded, ${failed} failed. (${ENTRIES.length} total, AirAsia 7M-seats excluded pending market value)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
