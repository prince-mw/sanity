// City guides, batch 1 (12 Nov 2026): Bangkok, Tokyo and Dubai. Same shape and
// rules as city-guide-drafts.ts. Status 'draft' until Rif has read them.

import type { GuideDraft } from './country-guide-drafts'

export const CITY_GUIDES_BATCH_1: Record<string, GuideDraft> = {
  'thailand/bangkok': {
    status: 'draft',
    facts: [
      { value: '10M+', label: 'people in the Bangkok metropolitan region' },
      { value: '2', label: 'mass transit systems, the BTS Skytrain and the MRT' },
      { value: '6', label: 'areas in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Billboard advertising in Bangkok reaches the largest and highest-spending audience in Thailand. The city and its surrounding provinces are home to a large share of the country’s population, and most of its premium retail and offices.',
      'The BTS Skytrain and the MRT carry commuters above and below the busiest roads, so their stations and trains are some of the most effective advertising spaces in the city. On the roads, the expressways and Sukhumvit, Rama IV and Ratchadaphisek deliver drivers by the hundred thousand.',
      'A Bangkok plan usually combines a transit or expressway position for reach with a screen in the Siam and Ratchaprasong shopping district for the moment of decision.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Bangkok decides who sees you. The shopping district, the business districts and the transit hubs each have their own crowd and their own time of day.',
        'Pick the area by audience first, then choose the format that suits how people move through it.',
      ],
      cities: [
        { name: 'Siam and Ratchaprasong', lat: 13.7466, lng: 100.5347, body: 'The heart of shopping in Bangkok, around Siam Paragon, Siam Center, CentralWorld and the skywalks that connect them. Shoppers, students and tourists from late morning until late at night.', bestFor: ['Retail and fashion', 'Young audiences', 'Tourists'] },
        { name: 'Sukhumvit and Asok', lat: 13.7376, lng: 100.56, body: 'The long road east from the centre, lined with offices, condominiums, hotels and malls, served by the BTS above it and the MRT at Asok.', bestFor: ['Affluent residents', 'Expatriates', 'Commuters'] },
        { name: 'Silom and Sathorn', lat: 13.7246, lng: 100.5292, body: 'The city’s main business district, with banks, corporate offices and hotels, and a busy evening crowd on Silom.', bestFor: ['Business audiences', 'Finance', 'Evening crowd'] },
        { name: 'Ratchada and Rama 9', lat: 13.7572, lng: 100.5658, body: 'A newer business and entertainment district on the MRT, with large malls, offices and night markets.', bestFor: ['New launches', 'Office workers', 'Night markets'] },
        { name: 'Chatuchak and Mo Chit', lat: 13.8026, lng: 100.5534, body: 'The north of the city around the weekend market, the bus terminal and the BTS and MRT interchange.', bestFor: ['Weekend shoppers', 'Commuters', 'Mass reach'] },
        { name: 'Suvarnabhumi and the airport road', lat: 13.69, lng: 100.7501, body: 'The main international airport and the expressway into the city, where every arriving visitor and many business travellers pass.', bestFor: ['Travellers', 'Tourism', 'Premium brands'] },
      ],
    },
    people: {
      intro: [
        'Who you reach in Bangkok changes through the day. Morning commuters on the BTS become lunch crowds in the business districts and evening shoppers in Siam.',
      ],
      list: [
        { name: 'Transit commuters', icon: 'commuter', who: 'BTS and MRT riders between the suburbs and the business districts.', when: 'Weekdays, both rush hours' },
        { name: 'Drivers', icon: 'driver', who: 'Commuters on the expressways and the main roads into the centre.', when: 'Weekdays, 7–10am and 5–8pm' },
        { name: 'Office workers', icon: 'office', who: 'Professionals in Silom, Sathorn, Asok and Rama 9.', when: 'Working days, all day' },
        { name: 'Shoppers', icon: 'shopper', who: 'Visitors to the malls of Siam, Ratchaprasong and Sukhumvit.', when: 'Evenings and weekends' },
        { name: 'Tourists', icon: 'tourist', who: 'International visitors in the shopping and hotel districts.', when: 'All year, peaks in the cool season' },
        { name: 'Students', icon: 'student', who: 'University and school students around Siam and the transit lines.', when: 'Term time, afternoons' },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Bangkok follow its transit lines and its malls, with large roadside sites on the expressways.',
      ],
      list: [
        { name: 'Transit media', job: 'BTS and MRT stations, platforms and trains.' },
        { name: 'Roadside LED', job: 'Digital screens on Sukhumvit, Rama IV and Ratchada.' },
        { name: 'Roadside billboard', job: 'Large static sites on the expressways.' },
        { name: 'Mall entrance LED', job: 'Screens in Siam, Ratchaprasong and Sukhumvit malls.' },
        { name: 'Indoor panel', job: 'Office towers and condominium lobbies.' },
        { name: 'Airport media', job: 'Suvarnabhumi and Don Mueang airports.' },
      ],
    },
    seasons: [
      'When you advertise in Bangkok follows the national festivals, with the city at the centre of each. Chinese New Year fills Yaowarat, Songkran turns April into a city-wide celebration, and Loy Krathong lights up the river in November.',
      'The year ends with the countdowns at CentralWorld and Iconsiam, when the shopping district is at its busiest. Book those weeks early.',
    ],
    moments: [
      { name: 'Chinese New Year in Yaowarat', months: [1, 2] },
      { name: 'Songkran', months: [4] },
      { name: 'Loy Krathong', months: [11] },
      { name: 'Year-end and the New Year countdowns', months: [12] },
    ],
  },

  'japan/tokyo': {
    status: 'draft',
    facts: [
      { value: '35M+', label: 'people in Greater Tokyo, the largest metro area in the world' },
      { value: '2', label: 'major airports, Haneda and Narita' },
      { value: '6', label: 'areas in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Billboard advertising in Tokyo reaches the largest metropolitan audience in the world. Greater Tokyo includes Yokohama, Kawasaki and Saitama, and millions of people travel into the centre by train every working day.',
      'That rail network is the backbone of outdoor media here. Station concourses, platforms and the inside of trains reach the same commuters day after day, and the large screens at Shibuya Crossing and Shinjuku are seen by crowds that photograph and share them.',
      'A Tokyo plan usually combines rail media for frequency with a landmark screen for impact.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Tokyo decides who sees you. Each major station district has its own character, from the youth culture of Shibuya to the executives of Marunouchi.',
        'Pick the district by audience, then the format by how people move through it.',
      ],
      cities: [
        { name: 'Shibuya', lat: 35.6595, lng: 139.7005, body: 'The famous scramble crossing and the shopping streets around it, the centre of youth culture and fashion, with some of the most photographed screens in the world.', bestFor: ['Young audiences', 'Fashion', 'Launches'] },
        { name: 'Shinjuku', lat: 35.6938, lng: 139.7034, body: 'The busiest railway station in the world, surrounded by department stores, offices and entertainment streets.', bestFor: ['Mass reach', 'Commuters', 'Retail'] },
        { name: 'Ginza', lat: 35.6717, lng: 139.765, body: 'Tokyo’s luxury shopping district, with flagship stores, department stores and a high-spending audience.', bestFor: ['Luxury brands', 'Premium retail', 'Visitors'] },
        { name: 'Marunouchi and Tokyo Station', lat: 35.6812, lng: 139.7671, body: 'The main business district and the bullet train hub, with corporate headquarters and business travellers.', bestFor: ['Business audiences', 'B2B', 'Travellers'] },
        { name: 'Ikebukuro', lat: 35.7295, lng: 139.7109, body: 'A major station and shopping district in the north-west, with a young crowd and large department stores.', bestFor: ['Students', 'Entertainment', 'Retail'] },
        { name: 'Roppongi', lat: 35.6628, lng: 139.7314, body: 'A district of offices, museums and nightlife, with an international audience and a busy evening crowd.', bestFor: ['International audiences', 'Evening crowd', 'Culture'] },
      ],
    },
    people: {
      intro: [
        'Who you reach in Tokyo follows the rail timetable. Rush-hour commuters fill the stations twice a day, and the shopping districts take over in the evenings and at weekends.',
      ],
      list: [
        { name: 'Rail commuters', icon: 'commuter', who: 'Office workers on the JR, Metro and private lines into the centre.', when: 'Weekdays, 7–9am and 6–8pm' },
        { name: 'Office workers', icon: 'office', who: 'Professionals in Marunouchi, Otemachi, Shinjuku and Shibuya.', when: 'Working days, all day' },
        { name: 'Shoppers', icon: 'shopper', who: 'Visitors to the department stores and shopping streets.', when: 'Evenings and weekends' },
        { name: 'Students', icon: 'student', who: 'Young audiences in Shibuya, Harajuku and Ikebukuro.', when: 'Afternoons and weekends' },
        { name: 'Tourists', icon: 'tourist', who: 'International visitors in Shibuya, Shinjuku, Ginza and Asakusa.', when: 'All year, peaks in spring and autumn' },
        { name: 'Evening crowd', icon: 'nightlife', who: 'Diners and nightlife audiences in Shinjuku and Roppongi.', when: 'Thursday to Saturday nights' },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Tokyo are led by rail, with landmark screens at the busiest crossings.',
      ],
      list: [
        { name: 'Transit media', job: 'Station concourses, platforms and train interiors.' },
        { name: 'Wall LED', job: 'Landmark screens at Shibuya Crossing and Shinjuku.' },
        { name: 'Roadside billboard', job: 'Building wraps and rooftop boards in shopping districts.' },
        { name: 'Mall entrance LED', job: 'Screens in department stores and station malls.' },
        { name: 'Taxi media', job: 'Screens in taxis, for business audiences.' },
        { name: 'Airport media', job: 'Haneda and Narita airports.' },
      ],
    },
    seasons: [
      'When you advertise in Tokyo follows the national calendar. The New Year, cherry blossom season and the start of the financial year in April, and Golden Week at the start of May are the busiest weeks.',
      'Summer brings festivals and fireworks, and from November the illuminations in Marunouchi, Roppongi and Omotesando draw evening crowds until Christmas. Rail positions for these weeks are reserved well ahead.',
    ],
    moments: [
      { name: 'New Year', months: [1] },
      { name: 'Cherry blossom and the new year in April', months: [3, 4] },
      { name: 'Golden Week', months: [4, 5] },
      { name: 'Summer festivals and fireworks', months: [7, 8] },
      { name: 'Winter illuminations', months: [11, 12] },
    ],
  },

  'uae/dubai': {
    status: 'draft',
    facts: [
      { value: '3M+', label: 'residents, most of them from abroad' },
      { value: 'DXB', label: 'one of the world’s busiest international airports' },
      { value: '6', label: 'areas in this guide' },
      { value: '6', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Billboard advertising in Dubai reaches one of the most international audiences in the world: residents from more than a hundred countries, business travellers and millions of tourists a year.',
      'Sheikh Zayed Road runs the length of the city and carries some of the largest digital screens anywhere. The malls and the airport add huge indoor screens in front of people who are about to shop or travel.',
      'A Dubai plan usually combines a Sheikh Zayed Road position for reach with a mall or airport screen for the moment of decision.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Dubai decides who sees you. Downtown and the Marina draw tourists and affluent residents, the business districts draw professionals, and Deira draws traders and shoppers.',
        'Pick the area by audience, then the format by how people move through it.',
      ],
      cities: [
        { name: 'Downtown and Dubai Mall', lat: 25.1972, lng: 55.2744, body: 'Burj Khalifa, Dubai Mall and the boulevard around them, with tourists and residents from morning until late at night.', bestFor: ['Premium retail', 'Tourists', 'Launches'] },
        { name: 'Sheikh Zayed Road and DIFC', lat: 25.2125, lng: 55.2796, body: 'The city’s main highway and the financial centre beside it, lined with office towers and some of the largest screens in the region.', bestFor: ['Mass reach', 'Business audiences', 'Finance'] },
        { name: 'Dubai Marina and JBR', lat: 25.0805, lng: 55.1403, body: 'A waterfront district of residential towers, hotels and beach, with affluent residents and visitors.', bestFor: ['Affluent residents', 'Lifestyle', 'Hospitality'] },
        { name: 'Business Bay', lat: 25.186, lng: 55.265, body: 'A district of offices, hotels and apartments along the canal, next to Downtown.', bestFor: ['Office workers', 'Residents', 'B2B'] },
        { name: 'Deira and Bur Dubai', lat: 25.2697, lng: 55.3095, body: 'The older heart of the city around the Creek, with souks, traders and a large residential population.', bestFor: ['Value retail', 'Traders', 'Residents'] },
        { name: 'Dubai International Airport', lat: 25.2532, lng: 55.3657, body: 'One of the busiest international airports in the world, with transit and arriving passengers from every continent.', bestFor: ['Travellers', 'Luxury brands', 'Global reach'] },
      ],
    },
    people: {
      intro: [
        'Who you reach in Dubai changes with the hour and the season. Commuters fill Sheikh Zayed Road in the morning, the malls fill in the evening, and tourists peak in the cooler months.',
      ],
      list: [
        { name: 'Commuters', icon: 'driver', who: 'Drivers on Sheikh Zayed Road and the roads from Sharjah and Abu Dhabi.', when: 'Weekdays, both rush hours' },
        { name: 'Office workers', icon: 'office', who: 'Professionals in DIFC, Business Bay and Media City.', when: 'Working days, all day' },
        { name: 'Shoppers', icon: 'shopper', who: 'Visitors to Dubai Mall, Mall of the Emirates and the city’s other malls.', when: 'Evenings and weekends' },
        { name: 'Tourists', icon: 'tourist', who: 'International visitors in Downtown, the Marina and the beaches.', when: 'October to April' },
        { name: 'Business travellers', icon: 'traveller', who: 'Passengers at DXB and guests at the business hotels.', when: 'All year, peaks with major events' },
        { name: 'Affluent residents', icon: 'resident', who: 'Households in the Marina, Downtown, Emirates Hills and Palm Jumeirah.', when: 'Evenings and weekends' },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Dubai include some of the largest screens in the world, on Sheikh Zayed Road and inside the malls.',
      ],
      list: [
        { name: 'Roadside LED', job: 'Large digital screens on Sheikh Zayed Road.' },
        { name: 'Roadside billboard', job: 'Unipoles and bridge banners on the main roads.' },
        { name: 'Mall entrance LED', job: 'Screens inside Dubai’s large malls.' },
        { name: 'Airport media', job: 'Dubai International’s terminals.' },
        { name: 'Transit media', job: 'Dubai Metro stations and trains.' },
        { name: 'Wall LED', job: 'Building-scale screens in Downtown and Business Bay.' },
      ],
    },
    seasons: [
      'When you advertise in Dubai is shaped by Ramadan and Eid and by the cooler months, when tourism, exhibitions and events peak.',
      'The Dubai Shopping Festival over the New Year and National Day on 2 December are the busiest weeks for retail, and the summer brings its own sales season. Ramadan moves about eleven days earlier each year, so plan against the actual calendar.',
    ],
    moments: [
      { name: 'Ramadan and Eid', months: [2, 3, 4], note: 'moves each year' },
      { name: 'Summer sales', months: [7, 8] },
      { name: 'Exhibitions season', months: [10, 11] },
      { name: 'National Day', months: [12] },
      { name: 'Dubai Shopping Festival', months: [12, 1] },
    ],
  },
}
