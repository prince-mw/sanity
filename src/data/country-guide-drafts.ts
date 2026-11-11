// The market guide per country, written for the country template (Rif,
// 11 Nov 2026: full freedom on the copy; three rules — good for SEO, a good
// read, good design). Every country fills the SAME shape, so writing a new
// country is a known job: five topics, a city list, a format list, a calendar.
//
// Rules for the copy: one idea per paragraph, short paragraphs, the country
// and the search phrase in the first sentence of each topic, real place names,
// and no figure that is not common public knowledge. Campaign and audience
// numbers come from the inventory, never from here.

export type GuideCity = { name: string; lat: number; lng: number; body: string; bestFor: string[] }
export type GuideFormat = { name: string; job: string }
export type GuideMoment = { name: string; months: number[]; note?: string }
/** One audience a place reaches. `icon` is a persona icon key (commuter, shopper, tourist, office, family, student, nightlife, traveller, driver, resident). */
export type GuidePerson = { name: string; icon: string; who: string; when: string }
export type GuideDraft = {
  /** Shown as tiles when the country has no inventory to count yet. Public facts only. */
  facts?: { value: string; label: string }[]
  digital: string[]
  audiences: { intro: string[]; cities: GuideCity[] }
  formats: { intro: string[]; list: GuideFormat[] }
  /** Country guides only: how the market is bought. */
  buying?: string[]
  /** City guides only: who you reach. */
  people?: { intro: string[]; list: GuidePerson[] }
  seasons: string[]
  moments: GuideMoment[]
}

export const COUNTRY_GUIDE_DRAFTS: Record<string, GuideDraft> = {
  malaysia: {
    digital: [
      'Digital billboard advertising in Malaysia is concentrated where the country’s spending is: the Klang Valley. Large-format LED screens line Kuala Lumpur’s Golden Triangle around Bukit Bintang and KLCC, the expressways that feed the city, and the entrances of its biggest malls.',
      'What digital adds is control. A campaign can start in days because nothing is printed, the message can change by the hour, and one booking can carry several versions of the creative. That matters in a market that reads Malay, English and Chinese: the same screen can speak to each audience in turn.',
      'Most advertisers use digital screens for the timely part of a campaign, such as a launch date, a festive offer or a countdown, and hold a classic billboard nearby for constant presence.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Malaysia depends on who you need to reach. The Klang Valley delivers scale; Penang, Johor Bahru and the East Malaysian capitals each deliver an audience you cannot buy in Kuala Lumpur.',
        'Start with the city your customers live or shop in, then add a second city only when the brief calls for it.',
      ],
      cities: [
        { name: 'Kuala Lumpur', lat: 3.139, lng: 101.687, body: 'The capital and the centre of the Klang Valley, which also takes in Petaling Jaya, Shah Alam and Subang Jaya. Commuter expressways, the Golden Triangle’s shopping streets and the rail network give brands both reach and premium placements in one market.', bestFor: ['National launches', 'Premium retail', 'Commuter reach'] },
        { name: 'Penang', lat: 5.414, lng: 100.329, body: 'George Town is a UNESCO World Heritage city with year-round visitors, and Bayan Lepas is one of the region’s electronics manufacturing hubs. The bridges and the coastal expressway carry a daily flow of professionals between the island and the mainland.', bestFor: ['Tourism and F&B', 'Northern region', 'Professionals'] },
        { name: 'Johor Bahru', lat: 1.492, lng: 103.741, body: 'Malaysia’s southern gateway sits across the Causeway from Singapore. Cross-border commuters and weekend shoppers make the roads to the checkpoints and the city’s malls some of the most valuable outdoor positions in the south.', bestFor: ['Cross-border shoppers', 'Retail', 'Property'] },
        { name: 'Kota Kinabalu', lat: 5.98, lng: 116.073, body: 'The capital of Sabah and the main entry point to East Malaysia. A compact city centre, a busy airport road and a strong tourism season mean a small number of sites can cover the market.', bestFor: ['East Malaysia', 'Tourism', 'Regional brands'] },
        { name: 'Ipoh', lat: 4.597, lng: 101.09, body: 'Perak’s capital lies on the North–South Expressway between Kuala Lumpur and Penang. It is a growing food and weekend destination, and a cost-efficient way to extend a northern campaign.', bestFor: ['Regional reach', 'Highway traffic'] },
        { name: 'Melaka', lat: 2.19, lng: 102.249, body: 'A heritage city and one of the country’s most visited destinations, within driving distance of both Kuala Lumpur and Johor Bahru. Weekend and holiday traffic is the audience here.', bestFor: ['Domestic tourism', 'Weekend audiences'] },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Malaysia fall into two groups: formats that build reach and formats that catch a moment. A strong plan usually pairs one of each.',
        'Reach formats sit on the roads people drive every day. Moment formats sit where people decide what to buy, eat or do next.',
      ],
      list: [
        { name: 'Highway unipole', job: 'Head-on to expressway traffic. One bold message, held for weeks.' },
        { name: 'Gantry LED', job: 'Spans the road above every lane. Impossible to miss at speed.' },
        { name: 'Roadside LED', job: 'City-centre screens. Change the message by the hour.' },
        { name: 'Wall LED', job: 'Large screens on buildings in shopping districts.' },
        { name: 'Mall entrance LED', job: 'The last message before the purchase.' },
        { name: 'Indoor panel', job: 'Inside malls and venues, close to the till.' },
        { name: 'Lightbox', job: 'Street level, near stations and shopping streets.' },
        { name: 'Transit media', job: 'MRT, LRT and bus networks for daily commuters.' },
      ],
    },
    buying: [
      'Billboard advertising in Malaysia is bought in two ways. Classic sites such as unipoles and lightboxes are booked directly for a fixed period, typically by the month, with artwork printed and installed before the start date.',
      'Digital sites can be booked the same way by share of the loop, or bought programmatically by impression, with budget moved between screens while the campaign runs.',
      'Either way the order is the same: a brief, a site list checked for your dates, artwork to each site’s specification, then reports once the campaign is live. Moving Walls plans, books and measures both routes from one platform.',
    ],
    seasons: [
      'When you advertise in Malaysia matters as much as where. Demand follows the festive calendar: Chinese New Year, Ramadan and Hari Raya Aidilfitri, and the year-end school holidays are the busiest retail periods, and the best sites are booked well ahead of them.',
      'Merdeka and Malaysia Day bring national campaigns, and the 11.11 and 12.12 sales are now fixed dates for retail and e-commerce.',
      'Ramadan moves about eleven days earlier each year, so plan against the actual calendar. Outside the peaks the same sites are easier to secure, and longer bookings build steady frequency.',
    ],
    moments: [
      { name: 'Chinese New Year', months: [1, 2] },
      { name: 'Ramadan and Hari Raya', months: [2, 3, 4], note: 'moves each year' },
      { name: 'Merdeka and Malaysia Day', months: [8, 9] },
      { name: '11.11 and 12.12 sales', months: [11, 12] },
      { name: 'Year-end school holidays', months: [11, 12] },
    ],
  },

  indonesia: {
    facts: [
      { value: '270M+', label: 'people, the fourth-largest population in the world' },
      { value: '17,000+', label: 'islands, so campaigns are planned city by city' },
      { value: '6', label: 'cities in this guide' },
      { value: '5', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Digital billboard advertising in Indonesia starts in Jakarta. LED screens, known locally as videotron, stand along the Sudirman–Thamrin business corridor, at the city’s major intersections and on the toll roads that carry commuters in from Bekasi, Tangerang, Depok and Bogor.',
      'Jakarta’s traffic is the format’s advantage. Cars move slowly through the centre at peak hours, so a screen is watched for far longer than a billboard on an open highway, and a loop of several messages is seen in full.',
      'Outside the capital, digital screens are growing fastest in Surabaya, Bandung and Bali, where they sit at city gateways, malls and the roads to the airport.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Indonesia is the first decision, because no single city reaches the country. Greater Jakarta is the largest market by far; Surabaya, Bandung and Medan anchor their own regions, and Bali reaches an audience of visitors.',
        'Most national campaigns begin in Jakarta and add cities in order of where the brand already sells.',
      ],
      cities: [
        { name: 'Jakarta', lat: -6.2, lng: 106.816, body: 'The capital and the centre of Greater Jakarta, which includes Bogor, Depok, Tangerang and Bekasi. Office workers in the Sudirman–Thamrin corridor, mall shoppers and millions of daily commuters on toll roads and rail make it the country’s essential outdoor market.', bestFor: ['National launches', 'Business audiences', 'Commuter reach'] },
        { name: 'Surabaya', lat: -7.257, lng: 112.752, body: 'Indonesia’s second city and the commercial capital of East Java. A major port and trading centre with large malls and wide arterial roads, it is the natural second market for a brand growing beyond Jakarta.', bestFor: ['East Java', 'Retail', 'Trade and industry'] },
        { name: 'Bandung', lat: -6.917, lng: 107.619, body: 'The capital of West Java is a university city known for fashion, food and creative industries. Weekend visitors from Jakarta fill its shopping streets, so the audience is young and ready to spend.', bestFor: ['Youth brands', 'Fashion and F&B', 'Weekend visitors'] },
        { name: 'Medan', lat: 3.595, lng: 98.672, body: 'The largest city in Sumatra and the gateway to the island’s plantation and trading economy. A campaign here reaches a regional audience that Java-only plans miss.', bestFor: ['Sumatra', 'Regional reach'] },
        { name: 'Bali', lat: -8.65, lng: 115.216, body: 'Denpasar and the southern resort areas of Kuta, Seminyak and Canggu receive international and domestic visitors all year. The airport road and the main tourist routes are the positions that matter.', bestFor: ['Tourism', 'Hospitality', 'Premium lifestyle'] },
        { name: 'Makassar', lat: -5.147, lng: 119.432, body: 'The largest city in Sulawesi and the main gateway to eastern Indonesia. It suits brands building distribution beyond Java and Sumatra.', bestFor: ['Eastern Indonesia', 'Regional brands'] },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Indonesia range from roadside billboards, the country’s most familiar format, to screens inside the transit systems that Jakarta has built in the past decade.',
        'As elsewhere, pair a format that builds reach with one that catches people at the point of decision.',
      ],
      list: [
        { name: 'Roadside billboard', job: 'Large static sites on arterial and toll roads. Reach, held for weeks.' },
        { name: 'Videotron (LED)', job: 'Digital screens at intersections and business districts.' },
        { name: 'Pedestrian bridge', job: 'Banners across the road on footbridges, facing every lane.' },
        { name: 'Transit media', job: 'MRT Jakarta, TransJakarta and commuter rail stations and vehicles.' },
        { name: 'Mall and airport', job: 'Screens and lightboxes where people shop and travel.' },
      ],
    },
    buying: [
      'Billboard advertising in Indonesia is usually booked directly with the media owner for a fixed period. Static billboards are commonly taken for several months at a time; digital screens can be booked for shorter bursts by share of the loop.',
      'Outdoor advertising here carries a regional advertising tax and a permit, which the media owner normally arranges as part of the booking. Allow time for both before a start date.',
      'The steps do not change: a brief, a site list checked for your dates, artwork to each site’s specification, then reports once the campaign is live. Moving Walls plans, books and measures across cities from one platform.',
    ],
    seasons: [
      'When you advertise in Indonesia is shaped by Ramadan and Lebaran more than any other period. Spending rises through the fasting month, and in the days before Idul Fitri millions travel home in the annual mudik, which makes highway, station and airport sites especially valuable.',
      'Independence Day on 17 August brings national campaigns. The 11.11 sales and Harbolnas on 12.12 are the fixed dates for e-commerce, followed by the Christmas and New Year holidays.',
      'Ramadan moves about eleven days earlier each year, so plan against the actual calendar, and book festive sites early.',
    ],
    moments: [
      { name: 'Ramadan and Lebaran', months: [2, 3, 4], note: 'moves each year' },
      { name: 'School holidays', months: [6, 7] },
      { name: 'Independence Day', months: [8] },
      { name: '11.11 and Harbolnas 12.12', months: [11, 12] },
      { name: 'Christmas and New Year', months: [12, 1] },
    ],
  },
}
