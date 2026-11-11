// Country guides, batch 1 (12 Nov 2026): Thailand, Philippines, Japan, the UAE
// and Australia. Same shape and rules as country-guide-drafts.ts: the country
// and the search phrase in the first sentence of each topic, real place names,
// short paragraphs, and no figure that is not common public knowledge. Status
// 'draft' until Rif has read them on staging.

import type { GuideDraft } from './country-guide-drafts'

export const COUNTRY_GUIDES_BATCH_1: Record<string, GuideDraft> = {
  thailand: {
    status: 'draft',
    facts: [
      { value: '65M+', label: 'people, with Greater Bangkok the largest market' },
      { value: '77', label: 'provinces, each with its own regional centre' },
      { value: '6', label: 'cities in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Digital billboard advertising in Thailand is led by Bangkok, where large LED screens line the Sukhumvit and Ratchadaphisek roads, the expressways into the centre and the shopping district around Siam and Ratchaprasong.',
      'The BTS Skytrain and the MRT carry millions of trips a week through the same districts, and their stations and trains are among the most watched advertising spaces in the country. Digital screens there change creative by the hour, so one booking can run a breakfast message, a lunch offer and an after-work call to action.',
      'Outside the capital, digital screens are growing in Chiang Mai, Phuket, Pattaya and Khon Kaen, where they sit at airports, malls and the main roads into the city.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Thailand starts with Bangkok, which concentrates most of the country’s spending power. The regional centres reach audiences Bangkok does not: the north, the north-east and the tourist south.',
        'Most national campaigns run in Bangkok first and add the cities where the brand already sells.',
      ],
      cities: [
        { name: 'Bangkok', lat: 13.7563, lng: 100.5018, body: 'The capital and the centre of a metropolitan region that spreads into Nonthaburi, Samut Prakan and Pathum Thani. The BTS and MRT, the expressways and the malls of Siam and Ratchaprasong give brands reach and premium placements in one city.', bestFor: ['National launches', 'Premium retail', 'Commuter reach'] },
        { name: 'Chiang Mai', lat: 18.7883, lng: 98.9853, body: 'The capital of the north, with a large student population, a busy airport and year-round domestic and international visitors to the old city and Nimman.', bestFor: ['Northern region', 'Tourism', 'Students'] },
        { name: 'Phuket', lat: 7.8804, lng: 98.3923, body: 'Thailand’s best-known island, with an international airport, resort areas from Patong to Kata and a high-spending visitor audience for most of the year.', bestFor: ['Tourism', 'Hospitality', 'Premium lifestyle'] },
        { name: 'Pattaya', lat: 12.9236, lng: 100.8825, body: 'A resort city on the Eastern Seaboard, a short drive from Bangkok and close to the industrial estates of Chonburi and Rayong.', bestFor: ['Weekend visitors', 'Eastern Seaboard', 'Hospitality'] },
        { name: 'Khon Kaen', lat: 16.4419, lng: 102.836, body: 'The commercial centre of the north-east, the Isan region, with a major university and the malls and roads that serve the surrounding provinces.', bestFor: ['North-east', 'Regional brands', 'Students'] },
        { name: 'Hat Yai', lat: 7.0086, lng: 100.4747, body: 'The largest city in the south, a trading hub near the Malaysian border with cross-border shoppers and visitors at weekends.', bestFor: ['Southern region', 'Cross-border shoppers', 'Retail'] },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Thailand are shaped by Bangkok’s transit systems and its malls, with large roadside sites on the expressways for reach.',
        'Pair a format that builds reach with one that catches people close to the moment they decide.',
      ],
      list: [
        { name: 'Roadside billboard', job: 'Large static sites on expressways and arterial roads.' },
        { name: 'Roadside LED', job: 'Digital screens at major junctions and on Sukhumvit and Ratchada.' },
        { name: 'Transit media', job: 'BTS and MRT stations, platforms and trains.' },
        { name: 'Mall entrance LED', job: 'Screens at the busiest malls, before the purchase.' },
        { name: 'Indoor panel', job: 'Inside malls, offices and condominiums.' },
        { name: 'Airport media', job: 'Suvarnabhumi, Don Mueang and the regional airports.' },
      ],
    },
    buying: [
      'Billboard advertising in Thailand is booked directly with the media owner for a fixed period. Large static billboards are usually taken for one or more months; digital screens and transit media can be booked for shorter bursts by share of the loop.',
      'Outdoor advertising content may need approval before it goes live, which the media owner normally arranges as part of the booking. Allow time for it in the schedule, especially for alcohol, health and financial products.',
      'The steps do not change: a brief, a site list checked for your dates, artwork to each site’s specification, then reports once the campaign is live. Moving Walls plans, books and measures across cities from one platform.',
    ],
    seasons: [
      'When you advertise in Thailand follows a calendar of national festivals. Songkran, the Thai New Year in April, is the biggest moment of the year, with millions travelling home and celebrations in every city.',
      'Chinese New Year fills Bangkok’s Yaowarat district and the malls, Loy Krathong lights up November, and the year-end holiday season runs from December into the New Year countdowns.',
      'Book festive positions early, and plan a second burst outside the peaks, when the same sites are easier to secure.',
    ],
    moments: [
      { name: 'Chinese New Year', months: [1, 2] },
      { name: 'Songkran, the Thai New Year', months: [4] },
      { name: 'Mid-year sales', months: [6, 7] },
      { name: 'Loy Krathong', months: [11] },
      { name: 'Year-end and New Year countdowns', months: [12, 1] },
    ],
  },

  philippines: {
    status: 'draft',
    facts: [
      { value: '110M+', label: 'people, one of the largest markets in Southeast Asia' },
      { value: '7,600+', label: 'islands, so campaigns are planned region by region' },
      { value: '6', label: 'cities in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Digital billboard advertising in the Philippines is centred on Metro Manila, where LED screens stand along EDSA, C5 and the roads into the business districts of Makati, Bonifacio Global City and Ortigas.',
      'Traffic on EDSA moves slowly for much of the day, so a screen there is watched for minutes rather than seconds, and a loop of several messages is seen in full. That makes Metro Manila one of the most effective markets in the region for digital out-of-home.',
      'Outside the capital, digital screens are growing fastest in Cebu and Davao, at malls, airports and the main roads through the city.',
    ],
    audiences: {
      intro: [
        'Where you advertise in the Philippines starts with Metro Manila, the largest market by far. Cebu and Davao anchor the Visayas and Mindanao, and reach audiences a Manila-only plan misses.',
        'Plan Metro Manila first, then add regional cities in order of where the brand already sells.',
      ],
      cities: [
        { name: 'Metro Manila', lat: 14.5995, lng: 120.9842, body: 'The capital region of sixteen cities, including Makati, Taguig, Pasig and Quezon City. EDSA and C5, the MRT and LRT, and the malls make it the country’s essential outdoor market.', bestFor: ['National launches', 'Commuter reach', 'Business audiences'] },
        { name: 'Cebu', lat: 10.3157, lng: 123.8854, body: 'The commercial centre of the Visayas, with a major port, an international airport and large malls. The natural second market for a national brand.', bestFor: ['Visayas', 'Retail', 'Tourism'] },
        { name: 'Davao', lat: 7.1907, lng: 125.4553, body: 'The largest city in Mindanao and its main commercial and transport hub, with a growing middle class and modern malls.', bestFor: ['Mindanao', 'Regional brands', 'Retail'] },
        { name: 'Clark and Pampanga', lat: 15.1859, lng: 120.5462, body: 'North of Manila, around Clark’s airport and freeport zone, Angeles and San Fernando, on the expressways into Central Luzon.', bestFor: ['Central Luzon', 'Highway reach', 'Travellers'] },
        { name: 'Iloilo', lat: 10.7202, lng: 122.5621, body: 'A fast-growing city on Panay with new business districts and malls, and a regional audience across Western Visayas.', bestFor: ['Western Visayas', 'Regional growth'] },
        { name: 'Cagayan de Oro', lat: 8.4542, lng: 124.6319, body: 'The gateway to Northern Mindanao, a trading and transport city with a large student population.', bestFor: ['Northern Mindanao', 'Students', 'Regional brands'] },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in the Philippines range from the large billboards on EDSA to screens in malls and transit, which matter more here than in most markets because the malls are where people spend their free time.',
        'Pair a format that builds reach with one that catches people close to the purchase.',
      ],
      list: [
        { name: 'Roadside billboard', job: 'Large static sites on EDSA, C5 and the expressways.' },
        { name: 'Roadside LED', job: 'Digital screens on EDSA and at the business district gateways.' },
        { name: 'Transit media', job: 'MRT and LRT stations and trains, buses and terminals.' },
        { name: 'Mall entrance LED', job: 'Screens in the malls, the country’s main leisure spaces.' },
        { name: 'Indoor panel', job: 'Office lobbies and lifts in the business districts.' },
        { name: 'Airport media', job: 'NAIA, Mactan-Cebu and Davao airports.' },
      ],
    },
    buying: [
      'Billboard advertising in the Philippines is booked directly with the media owner for a fixed period. Static billboards on EDSA and the expressways are usually taken for several months; digital screens can be booked for shorter bursts by share of the loop.',
      'Outdoor sites on the main roads are regulated by the local government and the Metro Manila authorities, and the media owner normally arranges the permits and any content approval. Allow time for both before a start date.',
      'The steps do not change: a brief, a site list checked for your dates, artwork to each site’s specification, then reports once the campaign is live. Moving Walls plans, books and measures across cities from one platform.',
    ],
    seasons: [
      'When you advertise in the Philippines is shaped by the longest Christmas season in the world. The “ber months”, September to December, bring Christmas music, decorations and spending, and the best sites are booked well ahead of them.',
      'Holy Week and the summer months, March to May, move audiences to the provinces and the beaches. Back-to-school runs from June to August, and the 11.11 and 12.12 sales are fixed dates for e-commerce.',
      'Plan the year around the ber months, and secure the key EDSA positions early.',
    ],
    moments: [
      { name: 'Holy Week and summer', months: [3, 4, 5], note: 'Holy Week moves each year' },
      { name: 'Back to school', months: [6, 7, 8] },
      { name: 'The “ber months” Christmas season', months: [9, 10, 11, 12] },
      { name: '11.11 and 12.12 sales', months: [11, 12] },
    ],
  },

  japan: {
    status: 'draft',
    facts: [
      { value: '120M+', label: 'people, one of the largest consumer markets in the world' },
      { value: '47', label: 'prefectures, with Tokyo, Osaka and Nagoya leading' },
      { value: '6', label: 'cities in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Digital billboard advertising in Japan is built around its railways. The busiest stations in the world are in Tokyo and Osaka, and the screens on their concourses, platforms and trains reach commuters every working day.',
      'Above ground, the large-format screens at Shibuya Crossing, Shinjuku and Dotonbori in Osaka are some of the most photographed advertising spaces anywhere, and they turn a campaign into something people share.',
      'Japan’s audiences are loyal to routine: the same people pass the same station at the same time each day. That makes frequency easy to build and a well-planned rail campaign very efficient.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Japan starts with Greater Tokyo, the largest metropolitan area in the world. Osaka, Nagoya and Fukuoka each lead their own region, and each has its own rail network and shopping districts.',
        'Plan Tokyo first, then add the regional cities that matter to the brand.',
      ],
      cities: [
        { name: 'Tokyo', lat: 35.6762, lng: 139.6503, body: 'The capital and the centre of a metropolitan area that includes Yokohama, Kawasaki and Saitama. Shibuya, Shinjuku, Ginza and Marunouchi give brands every audience from students to executives.', bestFor: ['National launches', 'Rail commuters', 'Premium retail'] },
        { name: 'Osaka', lat: 34.6937, lng: 135.5023, body: 'Japan’s second city and the centre of the Kansai region, known for food, shopping and entertainment in Umeda, Namba and Dotonbori.', bestFor: ['Kansai region', 'Food and retail', 'Visitors'] },
        { name: 'Nagoya', lat: 35.1815, lng: 136.9066, body: 'The centre of the Chubu region and Japan’s manufacturing heartland, on the bullet train line between Tokyo and Osaka.', bestFor: ['Chubu region', 'Business audiences'] },
        { name: 'Fukuoka', lat: 33.5904, lng: 130.4017, body: 'The largest city in Kyushu, young and fast-growing, with Tenjin and Hakata as its shopping and transport centres and an airport close to the city.', bestFor: ['Kyushu', 'Young audiences', 'Travellers'] },
        { name: 'Sapporo', lat: 43.0618, lng: 141.3545, body: 'The capital of Hokkaido, with a large domestic and international visitor season around the Snow Festival in winter.', bestFor: ['Hokkaido', 'Tourism', 'Winter season'] },
        { name: 'Kyoto', lat: 35.0116, lng: 135.7681, body: 'Japan’s former capital and one of its most visited cities, with domestic and international visitors all year.', bestFor: ['Tourism', 'Heritage', 'Visitors'] },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Japan are led by rail: station posters and screens, train interiors and the large screens at the busiest crossings.',
        'Pair a reach format on the rail network with a moment format where people shop.',
      ],
      list: [
        { name: 'Transit media', job: 'Station concourses, platforms and the inside of trains.' },
        { name: 'Wall LED', job: 'Large screens at Shibuya, Shinjuku and Dotonbori.' },
        { name: 'Roadside billboard', job: 'Building wraps and rooftop boards in shopping districts.' },
        { name: 'Mall entrance LED', job: 'Screens in department stores and malls.' },
        { name: 'Taxi media', job: 'Screens in the back of taxis, for business audiences.' },
        { name: 'Airport media', job: 'Haneda, Narita, Kansai and the regional airports.' },
      ],
    },
    buying: [
      'Billboard advertising in Japan is usually bought through the media owners and the rail companies’ own advertising arms. Station and train media are commonly sold in fixed weekly cycles, and the most popular positions are reserved months ahead.',
      'Creative is reviewed before it goes live, by the rail company or the site owner, so build the review into the schedule. Large screens at the famous crossings can also be booked for short bursts.',
      'The steps do not change: a brief, a site list checked for your dates, artwork to each site’s specification, then reports once the campaign is live. Moving Walls plans, books and measures across cities from one platform.',
    ],
    seasons: [
      'When you advertise in Japan follows a calendar the whole country shares. The New Year holidays, cherry blossom season and the new financial and school year in April, and Golden Week at the start of May, are the busiest moments for travel and spending.',
      'Obon in August sends people home to their families, and from November the illuminations and the year-end season fill the shopping districts until Christmas.',
      'The best rail positions for these weeks are reserved well ahead, so plan the year early.',
    ],
    moments: [
      { name: 'New Year holidays', months: [1] },
      { name: 'Cherry blossom and the new year in April', months: [3, 4] },
      { name: 'Golden Week', months: [4, 5] },
      { name: 'Obon and summer festivals', months: [7, 8] },
      { name: 'Illuminations and the year-end season', months: [11, 12] },
    ],
  },

  uae: {
    status: 'draft',
    facts: [
      { value: '9M+', label: 'residents, with one of the world’s most international populations' },
      { value: '7', label: 'emirates, led by Dubai and Abu Dhabi' },
      { value: '6', label: 'cities in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Digital billboard advertising in the UAE is among the most advanced in the world. Large LED screens line Sheikh Zayed Road in Dubai and the main highways between the emirates, and the malls and airports carry some of the largest indoor screens anywhere.',
      'The audience is international and mobile: residents from more than a hundred countries, business travellers and millions of tourists a year. Digital screens let one campaign speak to several of them in turn, in English and Arabic.',
      'Most plans combine a highway position for reach with a mall or airport screen for the moment people shop and travel.',
    ],
    audiences: {
      intro: [
        'Where you advertise in the UAE depends on the audience. Dubai delivers scale, tourists and business travellers; Abu Dhabi delivers the capital and government; Sharjah and the northern emirates deliver families and commuters.',
        'Many people live in one emirate and work in another, so the highways between them are valuable positions.',
      ],
      cities: [
        { name: 'Dubai', lat: 25.2048, lng: 55.2708, body: 'The country’s commercial centre and one of the world’s busiest airports. Sheikh Zayed Road, Downtown, the Marina and the large malls give brands both reach and premium placements.', bestFor: ['Premium brands', 'Tourists', 'Business travellers'] },
        { name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773, body: 'The capital, home to the federal government, major companies and cultural sites, with its own airport, islands and highway network.', bestFor: ['Government and B2B', 'Affluent residents', 'Culture'] },
        { name: 'Sharjah', lat: 25.3463, lng: 55.4209, body: 'A large residential emirate next to Dubai, with families and commuters on the roads into Dubai every day.', bestFor: ['Families', 'Commuters', 'Value retail'] },
        { name: 'Ajman', lat: 25.4052, lng: 55.5136, body: 'A compact emirate north of Sharjah, with a growing residential population and commuters to Dubai.', bestFor: ['Residents', 'Commuters'] },
        { name: 'Ras Al Khaimah', lat: 25.8007, lng: 55.9762, body: 'The northernmost emirate, known for its resorts, mountains and a growing tourism offer.', bestFor: ['Tourism', 'Resorts'] },
        { name: 'Al Ain', lat: 24.2075, lng: 55.7447, body: 'The garden city of Abu Dhabi emirate, inland on the Omani border, with a large national population and a university.', bestFor: ['National audiences', 'Families', 'Students'] },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in the UAE include some of the largest screens in the world, on the highways and inside the malls.',
        'Pair a highway format for reach with a mall or airport format for the moment of decision.',
      ],
      list: [
        { name: 'Roadside LED', job: 'Large digital screens on Sheikh Zayed Road and the highways.' },
        { name: 'Roadside billboard', job: 'Unipoles and bridge banners on the main roads.' },
        { name: 'Mall entrance LED', job: 'Screens in the large malls of Dubai and Abu Dhabi.' },
        { name: 'Airport media', job: 'Dubai International, Abu Dhabi and Sharjah airports.' },
        { name: 'Transit media', job: 'Dubai Metro stations and trains, bus shelters.' },
        { name: 'Wall LED', job: 'Building-scale screens in Downtown and the business districts.' },
      ],
    },
    buying: [
      'Billboard advertising in the UAE is booked with the media owner for a fixed period, often by the week or the month for digital screens and for longer on large static sites.',
      'Outdoor advertising needs a permit from the local authority, and creative is reviewed for content before it goes live. The media owner normally arranges both, so allow time for them before a start date.',
      'The steps do not change: a brief, a site list checked for your dates, artwork to each site’s specification, then reports once the campaign is live. Moving Walls plans, books and measures across the emirates from one platform.',
    ],
    seasons: [
      'When you advertise in the UAE follows Ramadan and Eid more than any other period. Spending and evening footfall rise through the fasting month, and the malls stay open late.',
      'The cooler months from October to April are the busiest season for tourism and events, with major exhibitions in the autumn, National Day on 2 December and the Dubai Shopping Festival over the New Year. Summer is quieter, with its own summer sales.',
      'Ramadan moves about eleven days earlier each year, so plan against the actual calendar.',
    ],
    moments: [
      { name: 'Ramadan and Eid', months: [2, 3, 4], note: 'moves each year' },
      { name: 'Summer sales', months: [7, 8] },
      { name: 'Exhibitions and events season', months: [10, 11] },
      { name: 'National Day', months: [12] },
      { name: 'Dubai Shopping Festival', months: [12, 1] },
    ],
  },

  australia: {
    status: 'draft',
    facts: [
      { value: '26M+', label: 'people, most of them in five coastal cities' },
      { value: '8', label: 'states and territories' },
      { value: '6', label: 'cities in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Digital billboard advertising in Australia is one of the most mature markets in the world. Most large roadside sites in Sydney and Melbourne are now digital, and screens in airports, train stations and shopping centres reach most adults in the cities every week.',
      'Audiences are measured by an industry standard used by all the major media owners, so a campaign’s reach can be planned and reported in the same terms across sites and cities.',
      'Digital lets one booking change creative by time, weather or event, which suits the sport, retail and travel moments that drive the Australian calendar.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Australia comes down to five cities: Sydney and Melbourne for scale, Brisbane, Perth and Adelaide for their own regions.',
        'Because the cities are far apart, most national campaigns are planned city by city and the budget split by population and where the brand sells.',
      ],
      cities: [
        { name: 'Sydney', lat: -33.8688, lng: 151.2093, body: 'The largest city and the country’s financial centre, with the busiest airport and a dense network of roads, trains and shopping centres.', bestFor: ['National launches', 'Business audiences', 'Commuters'] },
        { name: 'Melbourne', lat: -37.8136, lng: 144.9631, body: 'The second city, known for sport, food and culture, with major events across the year and a large tram and train network.', bestFor: ['Sport and events', 'Culture', 'Retail'] },
        { name: 'Brisbane', lat: -27.4698, lng: 153.0251, body: 'The capital of Queensland and one of the fastest-growing cities, with a warm climate and an outdoor lifestyle.', bestFor: ['Queensland', 'Growth markets', 'Lifestyle'] },
        { name: 'Perth', lat: -31.9505, lng: 115.8605, body: 'The capital of Western Australia, far from the eastern cities and a market of its own, with a strong resources economy.', bestFor: ['Western Australia', 'Affluent audiences'] },
        { name: 'Adelaide', lat: -34.9285, lng: 138.6007, body: 'The capital of South Australia, a compact city known for its festivals, food and wine.', bestFor: ['South Australia', 'Events', 'Food and drink'] },
        { name: 'Gold Coast', lat: -28.0167, lng: 153.4, body: 'Queensland’s holiday coast, with surf beaches, theme parks and a busy domestic tourism season.', bestFor: ['Tourism', 'Leisure', 'Families'] },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Australia cover the whole journey: large digital roadside screens, street furniture, transport, airports and shopping centres.',
        'Pair a large roadside format for reach with a retail or street-level format close to the purchase.',
      ],
      list: [
        { name: 'Roadside LED', job: 'Large digital screens on the main arterial roads and motorways.' },
        { name: 'Street furniture', job: 'Bus shelters and kiosks at street level, close to shops.' },
        { name: 'Transit media', job: 'Train stations, trams, buses and the stations’ concourses.' },
        { name: 'Airport media', job: 'Sydney, Melbourne, Brisbane and Perth airports.' },
        { name: 'Mall entrance LED', job: 'Screens in shopping centres, before the purchase.' },
        { name: 'Indoor panel', job: 'Office towers, gyms and universities.' },
      ],
    },
    buying: [
      'Billboard advertising in Australia is bought directly from the media owners, through agencies or programmatically. Digital sites are commonly booked by the week or by share of time, and many can be bought by audience through programmatic platforms.',
      'Content is reviewed against the industry’s advertising standards, and the media owner checks artwork before it goes live.',
      'The steps do not change: a brief, a site list checked for your dates, artwork to each site’s specification, then reports once the campaign is live. Moving Walls plans, books and measures across cities from one platform.',
    ],
    seasons: [
      'When you advertise in Australia follows the seasons in reverse from the northern hemisphere. The summer holidays from December to January bring the Australian Open and the busiest travel weeks, and end-of-financial-year sales fill June.',
      'Spring brings the football finals in September and the Melbourne Cup in November, followed by Black Friday and the Christmas shopping season.',
      'Book the summer and finals periods early: the best roadside sites go first.',
    ],
    moments: [
      { name: 'Summer holidays and the Australian Open', months: [12, 1] },
      { name: 'End of financial year sales', months: [6] },
      { name: 'Football finals', months: [9] },
      { name: 'Black Friday and Christmas', months: [11, 12] },
    ],
  },
}
