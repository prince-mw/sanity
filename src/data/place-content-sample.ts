// Preview copy for the Kuala Lumpur pilot's city and area pages, used until
// the daily job writes a document for each place in Sanity (same `siteContent`
// type, keyed "city:<country>/<city>" or "area:<country>/<city>/<area>").
// Facts only: what each place is, who passes, when. No figures.

import type { Persona } from '@/lib/inventory/siteContent'
import type { Highlight } from '@/lib/inventory/placeContent'

type Entry = { description: string; highlights?: Highlight[]; personas: Persona[] }

export const PLACE_CONTENT_SAMPLE: Record<string, Entry> = {
  'city:malaysia/kuala-lumpur': {
    // the description, as cards (every section needs a visual — Rif, 11 Nov)
    highlights: [
      { icon: 'shopping', title: 'The Golden Triangle', text: 'Bukit Bintang and KLCC hold the malls, hotels and office towers where shoppers, visitors and office workers meet all day.' },
      { icon: 'road', title: 'The roads in and out', text: 'Jalan Tun Razak, Jalan Ampang and the Federal Highway carry the daily traffic between the city and the suburbs, twice a day.' },
      { icon: 'rail', title: 'Rail through the centre', text: 'LRT, MRT and Monorail lines thread the centre, with KL Sentral as the hub for commuters and airport travellers.' },
      { icon: 'tower', title: 'New districts', text: 'TRX and Bangsar South add offices and residences every year — a growing business audience.' },
    ],
    description:
      'Kuala Lumpur is where Malaysia’s commuters, shoppers and visitors meet. The Golden Triangle (Bukit Bintang and KLCC) holds the malls, hotels and office towers; Jalan Tun Razak, Jalan Ampang and the Federal Highway carry the daily traffic in and out; LRT, MRT and Monorail lines thread through the centre with KL Sentral as the hub; and newer districts like TRX and Bangsar South are adding offices and residences every year. Outdoor advertising here reaches a dense, mixed audience many times a day: on the drive in, on the platform, at the mall entrance and on the walk between them.',
    personas: [
      { name: 'Daily commuters', icon: 'commuter', who: 'Office workers coming in from Petaling Jaya, Ampang, Cheras and Selayang by car, LRT and MRT', when: 'Weekdays, 7–10am and 5–8pm', why: 'The same people, on the same routes, twice a day: repeated exposure for any campaign' },
      { name: 'Golden Triangle shoppers', icon: 'shopper', who: 'Locals and visitors in Bukit Bintang, KLCC and the surrounding malls', when: 'Daily, 11am–10pm, busiest on weekends', why: 'Reach people on the day they are out to spend' },
      { name: 'Tourists', icon: 'tourist', who: 'International and domestic visitors around the Petronas Twin Towers, Bukit Bintang, Merdeka Square and Batu Caves', when: 'All year, peaks in school holidays and festive seasons', why: 'The capital is on every first-time visitor’s itinerary' },
      { name: 'Corporate decision-makers', icon: 'office', who: 'Managers and executives in the towers of KLCC, TRX, Jalan Tun Razak and Bangsar South', when: 'Working days', why: 'B2B audiences on the roads and platforms they use every day' },
    ],
  },
  'area:malaysia/kuala-lumpur/bukit-bintang': {
    description:
      'Bukit Bintang is Kuala Lumpur’s shopping and entertainment heart: Pavilion KL, Lot 10, Fahrenheit 88 and Berjaya Times Square sit within a few minutes’ walk of each other, with Jalan Alor and Changkat Bukit Bintang for food and nightlife. The Bukit Bintang MRT and Monorail interchange brings a steady flow of people from early morning to past midnight, and the pavements stay full through the evening. Screens here are seen close up by people on foot, which suits retail, food and beverage, entertainment and tourism campaigns.',
    personas: [
      { name: 'Mall shoppers', icon: 'shopper', who: 'Visitors moving between Pavilion KL, Lot 10, Fahrenheit 88 and Berjaya Times Square', when: 'Daily, 11am–10pm', why: 'Seen metres from the shop doors, at the moment of decision' },
      { name: 'Tourists', icon: 'tourist', who: 'Visitors staying in the Bukit Bintang hotels and exploring on foot', when: 'All week, peaks in holiday seasons', why: 'Bukit Bintang is on every visitor’s list' },
      { name: 'Night-out crowd', icon: 'nightlife', who: 'Diners and bar-goers heading to Jalan Alor and Changkat Bukit Bintang', when: 'Evenings, 7pm–1am', why: 'A slow-moving audience in a buying mood, after dark when screens stand out' },
      { name: 'Young professionals', icon: 'office', who: 'Staff from the offices and co-working spaces around the Golden Triangle', when: 'Weekday lunchtimes and after work', why: 'Lifestyle and dining offers land as they decide where to go' },
    ],
  },
  'area:malaysia/kuala-lumpur/klcc': {
    description:
      'KLCC is the city’s most recognisable address: the Petronas Twin Towers, Suria KLCC, KLCC Park and the Kuala Lumpur Convention Centre, ringed by banks, oil and gas headquarters, embassies and five-star hotels along Jalan Ampang and Jalan Tun Razak. Traffic is dense through the working day and joined by tourist coaches, hotel shuttles and taxis; the KLCC LRT station and the pedestrian walkways to Bukit Bintang carry the rest. Advertising here puts a brand next to the country’s best-known landmark, in front of a business and premium-retail audience.',
    personas: [
      { name: 'KLCC office workers', icon: 'office', who: 'Staff of the banks, energy companies and law firms around the towers', when: 'Weekdays, both rush hours and lunchtime', why: 'A premium business audience on its daily route' },
      { name: 'International tourists', icon: 'tourist', who: 'Visitors to the Twin Towers, KLCC Park and Suria KLCC', when: 'All week, all year', why: 'Reach visitors at the country’s most photographed spot' },
      { name: 'Luxury shoppers', icon: 'shopper', who: 'Customers of Suria KLCC and the Jalan Ampang boutiques and hotels', when: 'Daytime and evenings', why: 'Premium placement for premium brands' },
      { name: 'Convention delegates', icon: 'traveller', who: 'Attendees at the Kuala Lumpur Convention Centre', when: 'During trade shows and conferences', why: 'A business audience in town for a few days, looking for places to go' },
    ],
  },
  'area:malaysia/kuala-lumpur/trx': {
    description:
      'Tun Razak Exchange (TRX) is Kuala Lumpur’s new financial district, at the junction of Jalan Tun Razak and the Maju Expressway, a short walk from Bukit Bintang. The Exchange TRX mall, the office towers and the TRX MRT interchange are filling the district with banks, corporate tenants, shoppers and residents, and the roads around it carry traffic between the city centre and the south. It is becoming one of the city’s main business corridors, with an audience that is still growing.',
    personas: [
      { name: 'Financial-district workers', icon: 'office', who: 'Staff of the banks and corporate offices moving into TRX', when: 'Weekdays, both rush hours', why: 'A new, high-income business audience' },
      { name: 'Exchange TRX shoppers', icon: 'shopper', who: 'Visitors to the mall and its dining and leisure floors', when: 'Evenings and weekends', why: 'On the way to one of KL’s newest shopping destinations' },
      { name: 'Cross-city drivers', icon: 'driver', who: 'Drivers on Jalan Tun Razak and the Maju Expressway', when: 'Daily', why: 'A high-volume route between the centre and the south' },
    ],
  },
  'area:malaysia/kuala-lumpur/bangsar': {
    description:
      'Bangsar is an established residential and dining neighbourhood south-west of the centre, with Bangsar Village, the Telawi streets’ cafés and bars, and the offices and condominiums of Bangsar South and KL Eco City along the Federal Highway. The Bangsar and KL Sentral LRT stations and the highway put it on the daily route between Kuala Lumpur and Petaling Jaya. The audience is affluent, local and loyal to its neighbourhood.',
    personas: [
      { name: 'Affluent residents', icon: 'resident', who: 'Households in Bangsar’s condominiums and bungalows', when: 'Daily, evenings and weekends', why: 'Premium brands reach a high-income catchment at home' },
      { name: 'Bangsar South professionals', icon: 'office', who: 'Staff at the tech and corporate offices in Bangsar South and KL Eco City', when: 'Working days', why: 'A young, well-paid office crowd on its way to work' },
      { name: 'Café and dining crowd', icon: 'nightlife', who: 'Diners on the Telawi streets and at Bangsar Village', when: 'Brunch, evenings and weekends', why: 'Food, drink and lifestyle brands reach people out to enjoy themselves' },
    ],
  },
  'area:malaysia/kuala-lumpur/mid-valley': {
    description:
      'Mid Valley City sits between Kuala Lumpur and Petaling Jaya, where the Federal Highway meets the New Pantai Expressway. Mid Valley Megamall and The Gardens Mall draw shoppers from across the Klang Valley, the KTM Mid Valley station and the Abdullah Hukum LRT bring commuters, and the office towers and hotels on site keep the area busy through the week. It is one of the region’s largest retail destinations and a daily crossing point for commuters.',
    personas: [
      { name: 'Megamall shoppers', icon: 'shopper', who: 'Families and young adults visiting Mid Valley Megamall and The Gardens', when: 'Daily, busiest on weekends and public holidays', why: 'One of the busiest malls in the Klang Valley' },
      { name: 'KL–PJ commuters', icon: 'driver', who: 'Drivers on the Federal Highway and the NPE', when: 'Weekdays, both rush hours', why: 'Two-way commuter flow between the city and the suburbs' },
      { name: 'Families', icon: 'family', who: 'Parents and children on weekend outings', when: 'Weekends and school holidays', why: 'Reach household decision-makers on a day out' },
    ],
  },
  'area:malaysia/kuala-lumpur/kl-sentral': {
    description:
      'KL Sentral is Malaysia’s main transport hub: KTM, LRT, MRT, Monorail, KLIA Express and intercity trains all meet here, with Nu Sentral mall, office towers and hotels built around the station and Brickfields’ Little India next door. Hundreds of thousands of journeys pass through every day, from airport arrivals to daily commuters. Advertising here reaches people on the move, with time to look while they wait.',
    personas: [
      { name: 'Rail commuters', icon: 'commuter', who: 'Daily passengers changing between KTM, LRT, MRT and Monorail', when: 'Weekdays, both rush hours', why: 'A captive audience with waiting time on platforms and concourses' },
      { name: 'Airport travellers', icon: 'traveller', who: 'Arrivals and departures on the KLIA Express and KLIA Transit', when: 'All day, every day', why: 'First and last impressions of the capital for travellers' },
      { name: 'Station office workers', icon: 'office', who: 'Staff of the towers and hotels around KL Sentral', when: 'Working days', why: 'A business audience that passes the same screens daily' },
    ],
  },
  'area:malaysia/kuala-lumpur/dutamas': {
    description:
      'Dutamas sits on the north-west edge of the city centre, where Jalan Duta, the Sprint Highway and the Duta interchange carry traffic from Kepong, Selayang, Mont Kiara and Sungai Buloh into Kuala Lumpur. Publika and Solaris Dutamas bring dining and shopping; Mont Kiara’s condominiums and international schools bring an expatriate, professional audience; the government complex and embassies along Jalan Duta bring a working-day crowd.',
    personas: [
      { name: 'North-west commuters', icon: 'driver', who: 'Drivers from Kepong, Selayang and Sungai Buloh heading into the city', when: 'Weekday mornings and evenings', why: 'High-volume inbound traffic on one of the main approaches to the city' },
      { name: 'Mont Kiara residents', icon: 'resident', who: 'Expatriate and professional households in the condominiums nearby', when: 'Daily, school runs and evenings', why: 'An international, high-income audience on its everyday route' },
      { name: 'Publika and Solaris visitors', icon: 'shopper', who: 'Families and young professionals visiting the malls and restaurants', when: 'Evenings and weekends', why: 'Minutes before they decide where to eat and shop' },
    ],
  },
  'area:malaysia/kuala-lumpur/pantai-dalam': {
    description:
      'Pantai Dalam lies along the New Pantai Expressway (NPE) between Bangsar and Petaling Jaya, next to Bangsar South, Universiti Malaya and the Kerinchi LRT station. The expressway carries commuters between Kuala Lumpur and the western suburbs of Petaling Jaya, Sunway and Subang Jaya, slowing on the approach to the Pantai toll plaza; the offices of Bangsar South and the university campus add a large daytime population.',
    personas: [
      { name: 'KL–PJ commuters', icon: 'driver', who: 'People driving daily between Kuala Lumpur and Petaling Jaya, Sunway or Subang', when: 'Weekdays, both rush hours', why: 'Two-way commuter flow doubles the chances of being seen' },
      { name: 'Bangsar South professionals', icon: 'office', who: 'Staff at the tech and corporate offices in Bangsar South', when: 'Working days', why: 'A young, well-paid office crowd on its way to work' },
      { name: 'University students', icon: 'student', who: 'Students and staff of Universiti Malaya', when: 'Term time, daytime', why: 'A large student population for youth-focused offers' },
    ],
  },
}
