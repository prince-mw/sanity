// Preview copy for the Kuala Lumpur pilot sites, used until the daily job has
// written a `siteContent` document for each site in Sanity. Written from the
// site record (format, venue, address) and what stands around it; no figures
// beyond those already on the page. Keyed by the Inventory record id.

import type { Persona, FaceCorners } from '@/lib/inventory/siteContent'

type Entry = { description: string; personas: Persona[]; faceCorners?: FaceCorners }

export const SITE_CONTENT_SAMPLE: Record<string, Entry> = {
  'real-menara-tan-tan': {
    faceCorners: [[0.479, 0.073], [0.75, 0.056], [0.746, 0.485], [0.481, 0.457]],
    description:
      'A roadside LED on Jalan Tun Razak at Menara Tan & Tan, one of the main roads linking KLCC with Ampang and the city centre. Traffic here builds twice a day: office commuters into the Golden Triangle in the morning and the slow crawl out in the evening, when a digital screen gets its longest looks. The site sits among office towers, the Royal Selangor Golf Club and the hotels along Jalan Tun Razak, a short drive from the Petronas Twin Towers and Suria KLCC. Day-parted creative suits it well: a breakfast message for the inbound crowd, an after-work offer for the outbound one.',
    personas: [
      { name: 'City-centre commuters', icon: 'commuter', who: 'Office workers driving between Ampang, KLCC and the Golden Triangle', when: 'Weekdays, 7–10am and 5–8pm', why: 'Slow evening traffic means long, repeated exposure to the loop' },
      { name: 'Corporate decision-makers', icon: 'office', who: 'Managers and executives based in the towers along Jalan Tun Razak and KLCC', when: 'Working days, all day', why: 'Reach B2B audiences on the road they take every day' },
      { name: 'Hotel and business travellers', icon: 'traveller', who: 'Guests at the hotels around KLCC and Jalan Tun Razak, in taxis and ride-hailing cars', when: 'Daily, peaks at check-in and dinner time', why: 'First impressions of the city for visitors with spending power' },
      { name: 'Affluent residents', icon: 'resident', who: 'Households from Ampang Hilir and the KLCC condominiums', when: 'Evenings and weekends', why: 'Premium brands reach a high-income catchment on its home route' },
    ],
  },
  'real-duta-park': {
    faceCorners: [[0.344, 0.136], [0.515, 0.128], [0.513, 0.598], [0.347, 0.599]],
    description:
      'A highway unipole facing traffic from Dutamas and Selayang heading into Kuala Lumpur, near the Duta interchange where the Sprint Highway, Jalan Duta and the North–South Expressway link meet. This is one of the busiest approaches to the city from the north-west, carrying daily commuters from Segambut, Kepong, Selayang and Mont Kiara. A unipole here is seen head-on at motorway speed, so bold, short creative with one message works best. The site is close to Publika and Mont Kiara’s residential towers, and to the government offices and embassies around Jalan Duta.',
    personas: [
      { name: 'North-west commuters', icon: 'driver', who: 'Drivers from Kepong, Selayang, Segambut and Sungai Buloh heading into the city', when: 'Weekday mornings, 6:30–9:30am', why: 'High-volume inbound traffic sees the same message every working day' },
      { name: 'Mont Kiara and Dutamas residents', icon: 'resident', who: 'Expatriate and professional households in the condominiums nearby', when: 'Daily, school runs and evenings', why: 'An international, high-income audience on its everyday route' },
      { name: 'Shoppers heading to Publika and Solaris', icon: 'shopper', who: 'Families and young professionals visiting the malls and dining around Dutamas', when: 'Evenings and weekends', why: 'Catch them minutes before they decide where to eat and shop' },
      { name: 'Intercity drivers', icon: 'traveller', who: 'Travellers joining or leaving the North–South Expressway', when: 'Fridays, Sundays and public holidays', why: 'Reach people from outside KL on arrival in the capital' },
    ],
  },
  'real-npe-pantai-baru': {
    faceCorners: [[0.035, 0.052], [0.27, 0.1], [0.265, 0.63], [0.036, 0.657]],
    description:
      'A highway unipole on the New Pantai Expressway (NPE) at Pantai Baru, the toll road that links Bangsar and KL Sentral with Petaling Jaya, Sunway and Subang Jaya. The NPE carries a steady stream of commuters between Kuala Lumpur and Selangor’s western suburbs, and the Pantai stretch runs past Bangsar South’s offices, Universiti Malaya and the Mid Valley area. Traffic slows on the approach to the Pantai toll plaza, which gives the unipole longer dwell time than most expressway sites. It suits brands that want both KL and PJ audiences from one position.',
    personas: [
      { name: 'KL–PJ commuters', icon: 'driver', who: 'People driving daily between Kuala Lumpur and Petaling Jaya, Sunway or Subang', when: 'Weekdays, both rush hours', why: 'Two-way commuter flow doubles the chances of being seen' },
      { name: 'Bangsar South professionals', icon: 'office', who: 'Staff at the tech and corporate offices in Bangsar South and KL Eco City', when: 'Working days, 8am–7pm', why: 'A young, well-paid office crowd on its way to work' },
      { name: 'University students', icon: 'student', who: 'Students and staff of Universiti Malaya and the colleges along the Pantai corridor', when: 'Term time, daytime', why: 'Reach a large student population with youth-focused offers' },
      { name: 'Mid Valley and Bangsar shoppers', icon: 'shopper', who: 'Visitors to Mid Valley Megamall, Bangsar Village and the Bangsar dining streets', when: 'Evenings and weekends', why: 'Shoppers pass this site on the way to and from the malls' },
    ],
  },
  'sample-bb-01': {
    faceCorners: [[0.147, 0.243], [0.77, 0.306], [0.797, 0.781], [0.139, 0.81]],
    description:
      'A roadside LED on Jalan Bukit Bintang, in the middle of Kuala Lumpur’s busiest shopping and entertainment street. Pavilion KL, Lot 10, Fahrenheit 88 and the Bukit Bintang MRT and Monorail interchange are all within a few minutes’ walk, and the pavements are full from late morning until past midnight. The screen is seen by slow-moving traffic and by the crowds crossing between the malls, so it works for retail launches, food and beverage, entertainment and tourism campaigns that want to be seen at the moment people are out to spend.',
    personas: [
      { name: 'Mall shoppers', icon: 'shopper', who: 'Local and visiting shoppers moving between Pavilion KL, Lot 10 and Fahrenheit 88', when: 'Daily, 11am–10pm', why: 'Reach people with wallets open, metres from the shop doors' },
      { name: 'Tourists', icon: 'tourist', who: 'International and domestic visitors staying in the Bukit Bintang hotels', when: 'All week, peaks in school holidays and festive seasons', why: 'Bukit Bintang is on every first-time visitor’s itinerary' },
      { name: 'Night-out crowd', icon: 'nightlife', who: 'Diners and bar-goers heading to Jalan Alor and Changkat Bukit Bintang', when: 'Evenings, 7pm–1am', why: 'A lit screen holds attention on a street that comes alive after dark' },
      { name: 'Young professionals', icon: 'office', who: 'Staff from the offices and co-working spaces around the Golden Triangle', when: 'Weekday lunchtimes and after work', why: 'Lifestyle and dining offers land at the moment they are deciding where to go' },
    ],
  },
  'sample-bb-02': {
    faceCorners: [[0.1, 0.236], [0.25, 0.253], [0.244, 0.717], [0.103, 0.728]],
    description:
      'A digital screen above the main entrance plaza of a Bukit Bintang shopping mall, facing the open space where shoppers meet, queue and take photos. Everyone entering or leaving the mall passes under it, and the plaza itself is a popular meeting point for friends and tour groups. The screen is close enough for detail to read, so it suits product launches, seasonal campaigns and anything that benefits from a QR code or a call to action.',
    personas: [
      { name: 'Mall visitors', icon: 'shopper', who: 'Shoppers entering and leaving through the main entrance', when: 'Daily, 10am–10pm', why: 'Every visitor passes directly beneath the screen' },
      { name: 'Meeting-point crowd', icon: 'family', who: 'Friends, families and tour groups waiting on the plaza', when: 'Afternoons, evenings and weekends', why: 'Waiting people have time to watch a full loop' },
      { name: 'Tourists', icon: 'tourist', who: 'Visitors to Bukit Bintang on foot', when: 'All week', why: 'A landmark entrance seen in thousands of holiday photos' },
    ],
  },
  'sample-bb-03': {
    faceCorners: [[0.406, 0.033], [0.556, 0.033], [0.55, 0.412], [0.406, 0.423]],
    description:
      'A static unipole on Jalan Imbi, catching traffic heading into the Golden Triangle from the Tun Razak side. Jalan Imbi links Berjaya Times Square and the Imbi food streets with Bukit Bintang and TRX, and it is a regular route for taxis and ride-hailing cars dropping visitors at the malls and hotels. A large static face gives a brand continuous presence on one of the main approaches to the city’s shopping district.',
    personas: [
      { name: 'Inbound drivers', icon: 'driver', who: 'Drivers and ride-hailing passengers heading into Bukit Bintang', when: 'Daily, busiest in the afternoon and evening', why: 'Seen on the approach, before the shopping decision is made' },
      { name: 'Hotel guests', icon: 'traveller', who: 'Guests at the Imbi and Bukit Bintang hotels', when: 'Check-in and dinner times', why: 'Reach visitors in their first hours in the city' },
      { name: 'Food-street diners', icon: 'nightlife', who: 'People heading to the Imbi and Jalan Alor eating streets', when: 'Evenings', why: 'Food and drink brands reach people on their way to eat' },
    ],
  },
  'sample-bb-04': {
    faceCorners: [[0.362, 0.267], [0.45, 0.262], [0.45, 0.54], [0.362, 0.544]],
    description:
      'A wall-mounted LED on Changkat Bukit Bintang, the dining and nightlife strip behind the main shopping street. The road is lined with restaurants, bars and cafés and is largely pedestrian in the evening, so the screen is watched by people walking slowly, choosing where to eat and drink. It suits beverage, entertainment and lifestyle campaigns, and evening-only schedules make the most of it.',
    personas: [
      { name: 'Evening diners', icon: 'nightlife', who: 'Locals and visitors choosing a restaurant or bar on the strip', when: '6pm–1am', why: 'A captive, slow-moving audience in a buying mood' },
      { name: 'Tourists', icon: 'tourist', who: 'Visitors exploring Bukit Bintang on foot', when: 'Evenings, all week', why: 'Changkat is one of KL’s best-known nightlife streets' },
      { name: 'Young professionals', icon: 'office', who: 'After-work groups from the Golden Triangle offices', when: 'Weekday evenings', why: 'Reach them at the start of a night out' },
    ],
  },
  'sample-klcc-01': {
    faceCorners: [[0.112, 0.016], [0.3, 0.02], [0.3, 0.509], [0.106, 0.509]],
    description:
      'A gantry LED across Jalan Ampang in KLCC, one of the most photographed roads in Malaysia, with the Petronas Twin Towers, Suria KLCC and the Jalan Ampang embassies and offices alongside. Traffic here is dense through the working day and is joined by tourist coaches, hotel shuttles and taxis. A gantry screen sits directly in the driver’s line of sight, which makes it one of the strongest positions in the city for brand campaigns that need prestige and scale.',
    personas: [
      { name: 'KLCC office workers', icon: 'office', who: 'Staff of the banks, oil and gas companies and law firms around KLCC', when: 'Weekdays, both rush hours', why: 'A premium business audience on its daily route' },
      { name: 'International tourists', icon: 'tourist', who: 'Visitors heading to the Petronas Twin Towers, KLCC Park and Suria KLCC', when: 'All week, all year', why: 'Reach visitors at the country’s most famous landmark' },
      { name: 'Luxury shoppers', icon: 'shopper', who: 'Customers of Suria KLCC and the Jalan Ampang boutiques and hotels', when: 'Daytime and evenings', why: 'Premium placement for premium brands' },
      { name: 'Embassy and hotel traffic', icon: 'traveller', who: 'Diplomatic staff, hotel guests and business travellers on Jalan Ampang', when: 'Daily', why: 'An international audience in one of the city’s most prestigious locations' },
    ],
  },
  'sample-klcc-02': {
    faceCorners: [[0.081, 0.177], [0.2, 0.2], [0.2, 0.48], [0.081, 0.487]],
    description:
      'An indoor digital panel on the concourse of Suria KLCC, at the foot of the Petronas Twin Towers. The concourse links the mall’s shops, the KLCC LRT station and the walkways to the convention centre and the park, so it carries office workers, shoppers and tourists all day. At eye level and close to the shops, the panel suits retail offers, product launches and campaigns with a QR code or a short call to action.',
    personas: [
      { name: 'Mall shoppers', icon: 'shopper', who: 'Customers of Suria KLCC’s international and local brands', when: 'Daily, 10am–10pm', why: 'Seen minutes before purchase, inside the mall' },
      { name: 'LRT commuters', icon: 'commuter', who: 'Office workers passing through from KLCC LRT station', when: 'Weekday rush hours and lunchtime', why: 'A guaranteed daily audience on the walk to work' },
      { name: 'Tourists', icon: 'tourist', who: 'Visitors to the Twin Towers, the aquarium and KLCC Park', when: 'All week', why: 'Tourists spend time and money on this concourse' },
      { name: 'Convention delegates', icon: 'traveller', who: 'Attendees at the Kuala Lumpur Convention Centre next door', when: 'During events', why: 'Reach a business audience during trade shows and conferences' },
    ],
  },
  'sample-trx-01': {
    faceCorners: [[0.406, 0.033], [0.556, 0.033], [0.55, 0.412], [0.406, 0.423]],
    description:
      'A roadside LED on Jalan Tun Razak at the edge of Tun Razak Exchange (TRX), Kuala Lumpur’s new financial district. The site faces traffic between Bukit Bintang, the Jalan Imbi area and the Maju Expressway, and is a short walk from The Exchange TRX mall and the TRX MRT interchange. As the district fills with banks, offices and residences, the road is becoming one of the city’s main business corridors.',
    personas: [
      { name: 'Financial-district workers', icon: 'office', who: 'Staff of the banks and corporate offices in TRX', when: 'Weekdays, both rush hours', why: 'A new, high-income business audience' },
      { name: 'Exchange TRX shoppers', icon: 'shopper', who: 'Visitors to the mall and its dining and leisure floors', when: 'Evenings and weekends', why: 'Seen on the way to one of KL’s newest shopping destinations' },
      { name: 'Cross-city drivers', icon: 'driver', who: 'Drivers using Jalan Tun Razak and the Maju Expressway', when: 'Daily', why: 'A high-volume route linking the city centre with the south' },
    ],
  },
}
