// The market guide per CITY, same idea as country-guide-drafts.ts (Rif,
// 11 Nov 2026: freedom on the copy; good for SEO, a good read, good design).
// Every city fills the same shape: an overview, the areas that matter, who
// you reach, the formats, and the city's own calendar. Keyed "country/city".
//
// Same copy rules: the city and the search phrase in the first sentence of
// each topic, real place names, short paragraphs, and no figure that is not
// common public knowledge. Site and audience numbers come from the inventory.

import type { GuideDraft } from './country-guide-drafts'

import { CITY_GUIDES_BATCH_1 } from './city-guides-batch-1'

export const CITY_GUIDE_DRAFTS: Record<string, GuideDraft> = {
  'malaysia/kuala-lumpur': {
    status: 'approved',
    digital: [
      'Billboard advertising in Kuala Lumpur reaches the largest and highest-spending audience in Malaysia. The city is the centre of the Klang Valley, and people from Petaling Jaya, Shah Alam, Subang Jaya and beyond travel into it every day to work, shop and eat.',
      'That daily movement is what outdoor media buys. Expressways and the Sprint, NPE and Duta corridors deliver commuters by the hundred thousand; the Golden Triangle delivers shoppers and office workers on foot; the MRT, LRT and Monorail connect the two.',
      'A Kuala Lumpur plan usually combines a highway position for reach with a city-centre screen for the moment of decision.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Kuala Lumpur decides who sees you. Each district has its own crowd and its own time of day, and they sit only a few kilometres apart.',
        'Pick the area by audience first, then choose the format that suits how people move through it.',
      ],
      cities: [
        { name: 'Bukit Bintang', lat: 3.1466, lng: 101.7113, body: 'The city’s main shopping and entertainment district, home to Pavilion, Lot 10 and Jalan Alor. Crowds are on foot from late morning until after midnight, so large LED screens are watched rather than passed.', bestFor: ['Retail and fashion', 'Tourists', 'Evening audiences'] },
        { name: 'KLCC', lat: 3.1579, lng: 101.7116, body: 'The Petronas Twin Towers, Suria KLCC and the offices and hotels around them. A premium audience of executives, business travellers and visitors, on Jalan Ampang and Jalan Tun Razak every working day.', bestFor: ['Premium brands', 'Business audiences', 'Hotels and travel'] },
        { name: 'TRX', lat: 3.1425, lng: 101.7187, body: 'Tun Razak Exchange is the city’s new financial district, built around The Exchange TRX mall and its own MRT interchange. Finance professionals by day, shoppers in the evening and at weekends.', bestFor: ['Finance and B2B', 'Luxury retail', 'New launches'] },
        { name: 'KL Sentral', lat: 3.1343, lng: 101.6865, body: 'Malaysia’s largest transit hub, where the LRT, MRT, Monorail, KTM and the airport express meet. Commuters and travellers pass through twice a day, which builds frequency faster than anywhere else in the city.', bestFor: ['Commuter reach', 'Travellers', 'High frequency'] },
        { name: 'Bangsar', lat: 3.1291, lng: 101.6712, body: 'An affluent residential and dining neighbourhood with a large expatriate community, next to the offices of Bangsar South. Evenings and weekends are busiest, around Jalan Telawi and Bangsar Village.', bestFor: ['Affluent households', 'F&B and lifestyle', 'Professionals'] },
        { name: 'Mid Valley', lat: 3.1177, lng: 101.6772, body: 'Mid Valley Megamall and The Gardens form one of the busiest retail centres in the country, at the junction of the Federal Highway and the routes to Petaling Jaya. Families and weekend shoppers are the core audience.', bestFor: ['Family shoppers', 'Mass retail', 'Weekend traffic'] },
      ],
    },
    people: {
      intro: [
        'Who you reach in Kuala Lumpur changes through the day. The same road carries commuters at eight in the morning and diners at eight at night, so timing matters as much as position.',
      ],
      list: [
        { name: 'Daily commuters', icon: 'driver', who: 'Drivers and riders from across the Klang Valley on the expressways into the city.', when: 'Weekdays, 7–10am and 5–8pm' },
        { name: 'Office workers', icon: 'office', who: 'Professionals in the Golden Triangle, TRX, KL Sentral and Bangsar South.', when: 'Working days, all day' },
        { name: 'Shoppers', icon: 'shopper', who: 'Visitors to Pavilion, Suria KLCC, The Exchange TRX and Mid Valley.', when: 'Evenings and weekends' },
        { name: 'Tourists and visitors', icon: 'tourist', who: 'International and domestic visitors around KLCC and Bukit Bintang.', when: 'Daily, peaks in holiday seasons' },
        { name: 'Rail passengers', icon: 'commuter', who: 'MRT, LRT, Monorail and KTM users, concentrated at KL Sentral and the interchanges.', when: 'Both rush hours' },
        { name: 'Evening crowd', icon: 'nightlife', who: 'Diners and nightlife audiences in Bukit Bintang, Changkat and Bangsar.', when: 'Thursday to Sunday nights' },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Kuala Lumpur follow the shape of the city: big static sites on the roads in, digital screens in the centre, and smaller formats where people walk.',
      ],
      list: [
        { name: 'Highway unipole', job: 'On the expressways into the city. Reach, held for weeks.' },
        { name: 'Gantry LED', job: 'Across the carriageway, facing every lane.' },
        { name: 'Roadside LED', job: 'City-centre junctions. Change the message by the hour.' },
        { name: 'Wall LED', job: 'Building-scale screens in Bukit Bintang and the Golden Triangle.' },
        { name: 'Mall entrance LED', job: 'The last message before the purchase.' },
        { name: 'Indoor panel', job: 'Inside malls, close to the till.' },
        { name: 'Lightbox', job: 'Street level, near stations and shopping streets.' },
        { name: 'Transit media', job: 'MRT, LRT and Monorail stations and trains.' },
      ],
    },
    seasons: [
      'When you advertise in Kuala Lumpur follows the national festive calendar, with the city’s own peaks on top. Chinese New Year, Ramadan and Hari Raya, and the year-end holidays fill the malls, and Bukit Bintang becomes the country’s gathering place for New Year’s Eve and Merdeka.',
      'Demand for the best city-centre screens is highest in those weeks, so book early. In quieter months the same positions are easier to secure and a longer booking builds frequency with commuters.',
    ],
    moments: [
      { name: 'Chinese New Year', months: [1, 2] },
      { name: 'Ramadan and Hari Raya', months: [2, 3, 4], note: 'moves each year' },
      { name: 'Merdeka celebrations', months: [8] },
      { name: 'Year-end sales and holidays', months: [11, 12] },
      { name: 'New Year’s Eve in the city centre', months: [12] },
    ],
  },

  'indonesia/jakarta': {
    status: 'approved',
    facts: [
      { value: '10M+', label: 'residents in the city itself' },
      { value: '5', label: 'municipalities, plus the surrounding commuter cities' },
      { value: '6', label: 'areas in this guide' },
      { value: '5', label: 'outdoor formats to plan with' },
    ],
    digital: [
      'Billboard advertising in Jakarta reaches the largest urban audience in Indonesia. The city is the centre of Greater Jakarta, and every working day commuters arrive from Bogor, Depok, Tangerang and Bekasi by toll road, commuter rail and bus.',
      'Traffic is slow at peak hours, which is the advertiser’s advantage: a screen on Sudirman or a billboard at a toll gate is seen for far longer than the same format in a faster city.',
      'A Jakarta plan usually starts on the Sudirman–Thamrin corridor for business audiences and adds toll-road and mall positions for reach.',
    ],
    audiences: {
      intro: [
        'Where you advertise in Jakarta depends on which Jakarta you need: the business core, the lifestyle south, the trading north or the commuters arriving from outside.',
        'Choose the area for its audience, then the format for how people move through it.',
      ],
      cities: [
        { name: 'Sudirman–Thamrin', lat: -6.2088, lng: 106.8229, body: 'The main business corridor, running from the Hotel Indonesia roundabout past the country’s largest office towers. Executives, office workers and MRT passengers every working day.', bestFor: ['Business audiences', 'Corporate brands', 'Premium positions'] },
        { name: 'SCBD and Senayan', lat: -6.2253, lng: 106.8089, body: 'The Sudirman Central Business District and the malls and stadium of Senayan beside it. Finance and technology professionals by day, with dining and events in the evening.', bestFor: ['Finance and tech', 'Luxury retail', 'Events'] },
        { name: 'Kuningan', lat: -6.2297, lng: 106.8303, body: 'The Rasuna Said and Mega Kuningan office district, home to embassies, multinational offices and large malls. A dense weekday audience with high spending power.', bestFor: ['B2B', 'Professionals', 'Weekday reach'] },
        { name: 'Kemang and South Jakarta', lat: -6.2607, lng: 106.8136, body: 'Residential and lifestyle neighbourhoods known for cafés, restaurants and boutiques, with a young, affluent and international crowd in the evenings and at weekends.', bestFor: ['Lifestyle brands', 'F&B', 'Young affluent'] },
        { name: 'Kelapa Gading', lat: -6.1588, lng: 106.9089, body: 'A large, self-contained residential and retail district in North Jakarta, built around some of the city’s biggest malls. Families and weekend shoppers are the audience.', bestFor: ['Family shoppers', 'Retail', 'North Jakarta'] },
        { name: 'Toll roads and the airport', lat: -6.1256, lng: 106.6559, body: 'The inner-city and outer ring toll roads and the Soekarno–Hatta airport road carry commuters and travellers in volume. Large billboards here are the reach format of the city.', bestFor: ['Mass reach', 'Travellers', 'Commuters'] },
      ],
    },
    people: {
      intro: [
        'Who you reach in Jakarta depends on the hour. The business districts empty into the malls after work, and the toll roads carry a different audience at weekends.',
      ],
      list: [
        { name: 'Daily commuters', icon: 'driver', who: 'Drivers and motorcyclists arriving from Bogor, Depok, Tangerang and Bekasi.', when: 'Weekdays, 6–10am and 4–9pm' },
        { name: 'Office workers', icon: 'office', who: 'Professionals on Sudirman–Thamrin, in SCBD and in Kuningan.', when: 'Working days, all day' },
        { name: 'Mall shoppers', icon: 'shopper', who: 'Families and young adults in the city’s large malls, which are the main leisure space.', when: 'Evenings and weekends' },
        { name: 'Transit riders', icon: 'commuter', who: 'MRT Jakarta, TransJakarta and commuter rail passengers.', when: 'Both rush hours' },
        { name: 'Business travellers', icon: 'traveller', who: 'Domestic and international travellers on the airport road and in the business hotels.', when: 'Daily, peaks Monday and Friday' },
        { name: 'Evening crowd', icon: 'nightlife', who: 'Diners and café-goers in Senayan, SCBD and Kemang.', when: 'Thursday to Saturday nights' },
      ],
    },
    formats: {
      intro: [
        'Outdoor advertising formats in Jakarta range from the large roadside billboards the city is known for to screens inside its newer transit systems.',
      ],
      list: [
        { name: 'Roadside billboard', job: 'Large static sites on arterial and toll roads. Reach, held for months.' },
        { name: 'Videotron (LED)', job: 'Digital screens on Sudirman–Thamrin and at major junctions.' },
        { name: 'Pedestrian bridge', job: 'Banners across the road on footbridges, facing every lane.' },
        { name: 'Transit media', job: 'MRT Jakarta, TransJakarta and commuter rail stations and vehicles.' },
        { name: 'Mall and airport', job: 'Screens and lightboxes where people shop and travel.' },
      ],
    },
    seasons: [
      'When you advertise in Jakarta is shaped first by Ramadan and Lebaran. Spending rises through the fasting month, the malls stay busy late into the evening, and in the days before Idul Fitri much of the city leaves on the annual mudik, which moves the audience onto toll roads, stations and the airport.',
      'Jakarta’s anniversary in June brings the Jakarta Fair, and the 11.11 and 12.12 sales lead into the year-end holidays. Book festive positions early.',
    ],
    moments: [
      { name: 'Ramadan and Lebaran', months: [2, 3, 4], note: 'moves each year' },
      { name: 'Jakarta anniversary and Jakarta Fair', months: [6, 7] },
      { name: 'Independence Day', months: [8] },
      { name: '11.11 and Harbolnas 12.12', months: [11, 12] },
      { name: 'Christmas and New Year', months: [12, 1] },
    ],
  },
  // Batch 1 (12 Nov 2026), drafts awaiting Rif's review.
  ...CITY_GUIDES_BATCH_1,
}
