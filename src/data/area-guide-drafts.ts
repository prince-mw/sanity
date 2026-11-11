// The guide per AREA, same shape as the country and city guides (Rif,
// 11 Nov 2026: freedom on the copy; good for SEO, a good read, good design).
// Keyed "country/city/area". The `audiences.cities` list holds the PLACES in
// the area that draw people (with coordinates for the map); `facts` are public
// facts only; `faqs` become an FAQ section with FAQPage structured data.
//
// Copy rules: the area and the search phrase in the first sentence of each
// topic, real place names, short paragraphs, no figure that is not common
// public knowledge. Site counts and audience figures come from the inventory.

import type { GuideDraft } from './country-guide-drafts'

export type AreaGuideDraft = GuideDraft & { faqs: { q: string; a: string }[] }

export const AREA_GUIDE_DRAFTS: Record<string, AreaGuideDraft> = {
  'malaysia/kuala-lumpur/klcc': {
    facts: [
      { value: '88', label: 'floors in each Petronas Twin Tower' },
      { value: '2', label: 'MRT and LRT lines within walking distance' },
      { value: '6', label: 'landmarks in this guide' },
      { value: '24/7', label: 'a district that is busy day and night' },
    ],
    digital: [
      'Billboard advertising in KLCC puts a brand at the address most people think of when they think of Kuala Lumpur. The Petronas Twin Towers, Suria KLCC and the park around them draw office workers, shoppers, hotel guests and tourists into a few city blocks.',
      'The roads that frame the district, Jalan Ampang, Jalan Tun Razak and Jalan P. Ramlee, carry some of the city’s heaviest traffic, and the slow evening crawl gives roadside screens long looks.',
      'KLCC suits premium and launch campaigns: the audience has spending power, and a site here is often photographed and shared.',
    ],
    audiences: {
      intro: [
        'What draws people to KLCC is a cluster of landmarks within ten minutes’ walk of each other. Each one brings a different crowd at a different time of day.',
        'A site near the towers reaches visitors and shoppers; a site on Jalan Tun Razak reaches the commuters driving past them.',
      ],
      cities: [
        { name: 'Petronas Twin Towers and Suria KLCC', lat: 3.1579, lng: 101.7116, body: 'The country’s best-known landmark, with a six-storey mall at its base. Office workers, shoppers and visitors from morning until the mall closes.', bestFor: ['Premium retail', 'Tourists', 'Launches'] },
        { name: 'KLCC Park', lat: 3.1550, lng: 101.7140, body: 'The landscaped park behind the towers, with its fountain shows and running track. Families and visitors in the evening and at weekends.', bestFor: ['Families', 'Evening audiences'] },
        { name: 'KL Convention Centre and Aquaria', lat: 3.1525, lng: 101.7128, body: 'The city’s main convention venue and its aquarium. Business delegates on event days, families and tourists the rest of the week.', bestFor: ['Business events', 'B2B', 'Families'] },
        { name: 'Jalan Ampang and Avenue K', lat: 3.1594, lng: 101.7128, body: 'The road along the front of the towers, with Avenue K, embassies and offices. Heavy traffic in both directions through the working day.', bestFor: ['Commuter reach', 'Office workers'] },
        { name: 'Jalan Tun Razak', lat: 3.1607, lng: 101.7195, body: 'The main road linking KLCC with Ampang and the city centre. Traffic slows twice a day, so roadside screens get repeated, long looks.', bestFor: ['Drivers', 'High frequency'] },
        { name: 'The hotel strip', lat: 3.1550, lng: 101.7150, body: 'International hotels around the park and along Jalan Pinang. Business travellers and high-spending visitors, arriving by taxi and ride-hailing.', bestFor: ['Business travellers', 'Luxury brands'] },
      ],
    },
    people: {
      intro: ['Who you reach in KLCC shifts through the day, from commuters at the start to diners and visitors at night.'],
      list: [
        { name: 'Office workers', icon: 'office', who: 'Staff of the towers and the offices along Jalan Ampang and Jalan Tun Razak.', when: 'Working days, 8am–7pm' },
        { name: 'Commuters', icon: 'driver', who: 'Drivers on Jalan Tun Razak and Jalan Ampang between the city and Ampang.', when: 'Weekdays, both rush hours' },
        { name: 'Shoppers', icon: 'shopper', who: 'Visitors to Suria KLCC and Avenue K.', when: 'Evenings and weekends' },
        { name: 'Tourists', icon: 'tourist', who: 'International and domestic visitors at the towers, the park and Aquaria.', when: 'Daily, peaks in holiday seasons' },
        { name: 'Business travellers', icon: 'traveller', who: 'Guests at the hotels and delegates at the convention centre.', when: 'Event days and weeknights' },
        { name: 'Rail passengers', icon: 'commuter', who: 'Passengers at KLCC LRT and the Persiaran KLCC MRT station.', when: 'Both rush hours' },
      ],
    },
    formats: {
      intro: ['Advertising formats in KLCC are mostly digital: roadside LED screens on the main roads, and screens inside and at the entrances of the malls.'],
      list: [
        { name: 'Roadside LED', job: 'On Jalan Tun Razak and Jalan Ampang. Change the message by the hour.' },
        { name: 'Mall entrance LED', job: 'At Suria KLCC and Avenue K, the last message before the purchase.' },
        { name: 'Indoor panel', job: 'Inside the malls, close to the shops.' },
        { name: 'Transit media', job: 'In the KLCC LRT and MRT stations.' },
      ],
    },
    seasons: [
      'When to advertise in KLCC follows the city’s calendar, with the district’s own peaks on top. The malls and the park are busiest at Chinese New Year, Hari Raya, the school holidays and through December, when Suria KLCC’s decorations draw crowds.',
      'New Year’s Eve brings the largest gathering of the year to the towers and the park. On ordinary weeks, weekday rush hours and weekend evenings are the strongest times.',
    ],
    moments: [
      { name: 'Chinese New Year', months: [1, 2] },
      { name: 'Ramadan and Hari Raya', months: [2, 3, 4], note: 'moves each year' },
      { name: 'School holidays', months: [6, 12] },
      { name: 'Year-end decorations and sales', months: [11, 12] },
      { name: 'New Year’s Eve at the towers', months: [12] },
    ],
    faqs: [
      { q: 'How much does billboard advertising in KLCC cost?', a: 'It depends on the site, the format, the dates and how long you book. Digital screens can be booked by share of the loop or by impression. Start an instant proposal to get an indicative range for the sites you choose, and a planner confirms availability.' },
      { q: 'Which formats are available in KLCC?', a: 'Mostly digital: roadside LED screens on Jalan Tun Razak and Jalan Ampang, mall entrance screens, indoor panels in the malls and media in the LRT and MRT stations. The site list on this page shows every format we can plan.' },
      { q: 'Who sees advertising in KLCC?', a: 'Office workers and commuters on weekdays, shoppers in the evenings and at weekends, and tourists and business travellers every day of the week.' },
      { q: 'Can I run a campaign in KLCC and other parts of Kuala Lumpur together?', a: 'Yes. Most plans pair KLCC with Bukit Bintang or a highway site for reach. Add sites from any area to the same proposal.' },
    ],
  },

  'malaysia/kuala-lumpur/bukit-bintang': {
    facts: [
      { value: '3', label: 'major malls within a few minutes’ walk' },
      { value: '1', label: 'MRT and Monorail interchange at its centre' },
      { value: '6', label: 'landmarks in this guide' },
      { value: 'Late', label: 'busy until well after midnight' },
    ],
    digital: [
      'Billboard advertising in Bukit Bintang reaches Kuala Lumpur’s busiest shopping and entertainment street. Pavilion, Lot 10 and Starhill sit on one junction, Jalan Alor’s food street is around the corner, and the crowds stay until late at night.',
      'Most of the audience is on foot, which is what makes the district different. People stop, wait and look, so large wall screens are watched rather than passed.',
      'Bukit Bintang suits retail, fashion, food and launch campaigns, and anything that benefits from being seen by tourists as well as locals.',
    ],
    audiences: {
      intro: [
        'What draws people to Bukit Bintang is a dense mix of malls, food streets and nightlife, all within ten minutes’ walk of the MRT station.',
        'Malls deliver shoppers by day; Jalan Alor and Changkat deliver diners and the nightlife crowd after dark.',
      ],
      cities: [
        { name: 'Pavilion Kuala Lumpur', lat: 3.1490, lng: 101.7134, body: 'One of the city’s flagship malls, home to international fashion and luxury brands. Shoppers and tourists from late morning until closing.', bestFor: ['Luxury retail', 'Fashion', 'Tourists'] },
        { name: 'Lot 10 and the Bukit Bintang junction', lat: 3.1466, lng: 101.7105, body: 'The corner of Jalan Bukit Bintang and Jalan Sultan Ismail, the heart of the district and its busiest pedestrian crossing.', bestFor: ['Mass reach', 'Pedestrians'] },
        { name: 'Starhill and Fahrenheit88', lat: 3.1473, lng: 101.7120, body: 'Upmarket shopping and dining on Jalan Bukit Bintang, with hotels above. A premium, international crowd.', bestFor: ['Premium brands', 'Hotels'] },
        { name: 'Jalan Alor', lat: 3.1457, lng: 101.7085, body: 'Kuala Lumpur’s best-known food street, crowded every evening with visitors and locals.', bestFor: ['F&B', 'Evening audiences', 'Tourists'] },
        { name: 'Changkat Bukit Bintang', lat: 3.1470, lng: 101.7065, body: 'Bars, restaurants and nightlife on a short hillside street. Busiest from Thursday to Saturday night.', bestFor: ['Nightlife', 'Young adults'] },
        { name: 'Berjaya Times Square', lat: 3.1425, lng: 101.7106, body: 'A large mall with an indoor theme park at the southern end of the district, popular with families and younger shoppers.', bestFor: ['Families', 'Youth brands'] },
      ],
    },
    people: {
      intro: ['Who you reach in Bukit Bintang changes from shoppers in the afternoon to diners and the nightlife crowd after dark.'],
      list: [
        { name: 'Shoppers', icon: 'shopper', who: 'Visitors to Pavilion, Lot 10, Starhill and Berjaya Times Square.', when: 'Afternoons, evenings and weekends' },
        { name: 'Tourists', icon: 'tourist', who: 'International visitors staying in the hotels around the district.', when: 'Daily, peaks in holiday seasons' },
        { name: 'Evening crowd', icon: 'nightlife', who: 'Diners on Jalan Alor and the bars of Changkat Bukit Bintang.', when: 'Every evening, peaks Thursday to Saturday' },
        { name: 'Young adults', icon: 'student', who: 'Students and young professionals who meet, eat and shop here.', when: 'Evenings and weekends' },
        { name: 'Rail passengers', icon: 'commuter', who: 'Passengers at the Bukit Bintang MRT and Monorail interchange.', when: 'All day, both rush hours' },
        { name: 'Office workers', icon: 'office', who: 'Staff from the offices along Jalan Sultan Ismail and Jalan Raja Chulan.', when: 'Lunchtimes and after work' },
      ],
    },
    formats: {
      intro: ['Advertising formats in Bukit Bintang are built for people on foot: large wall screens over the main junction, mall screens, and street-level panels.'],
      list: [
        { name: 'Wall LED', job: 'Building-scale screens over the Bukit Bintang junction.' },
        { name: 'Roadside LED', job: 'On Jalan Bukit Bintang and Jalan Sultan Ismail.' },
        { name: 'Mall entrance LED', job: 'At Pavilion and Lot 10, the last message before the purchase.' },
        { name: 'Indoor panel', job: 'Inside the malls, close to the shops.' },
        { name: 'Transit media', job: 'At the MRT and Monorail interchange.' },
      ],
    },
    seasons: [
      'When to advertise in Bukit Bintang follows the shopping calendar. The malls are busiest at Chinese New Year, Hari Raya, the school holidays and the year-end sales, and the district is Kuala Lumpur’s main gathering place for the New Year countdown.',
      'Through the week, the strongest times are evenings and weekends, when shoppers and diners overlap on the same streets.',
    ],
    moments: [
      { name: 'Chinese New Year', months: [1, 2] },
      { name: 'Ramadan and Hari Raya', months: [2, 3, 4], note: 'moves each year' },
      { name: 'Mid-year school holidays', months: [6] },
      { name: 'Year-end sales', months: [11, 12] },
      { name: 'New Year countdown', months: [12] },
    ],
    faqs: [
      { q: 'How much does billboard advertising in Bukit Bintang cost?', a: 'It depends on the site, the format, the dates and how long you book. Start an instant proposal to get an indicative range for the sites you choose, and a planner confirms availability.' },
      { q: 'Which formats are available in Bukit Bintang?', a: 'Large wall LED screens over the main junction, roadside LED screens, mall entrance screens, indoor mall panels and media at the MRT and Monorail interchange. The site list on this page shows every format we can plan.' },
      { q: 'When is Bukit Bintang busiest?', a: 'Evenings and weekends, when shoppers and diners overlap. Festive seasons, the year-end sales and the New Year countdown are the busiest periods of the year.' },
      { q: 'Is Bukit Bintang good for reaching tourists?', a: 'Yes. Many of Kuala Lumpur’s hotels are in or next to the district, and Pavilion, Jalan Alor and Changkat are on most visitors’ lists.' },
    ],
  },
}
