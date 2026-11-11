// Draft market-guide copy per country, for the topics the CMS has no text for
// yet (Rif approves each before it goes live; then it moves into Sanity fields).
// No figures: only what holds without a source. `moments` drives the calendar
// strip: months are 1–12.
export type GuideDraft = {
  formats?: string[]
  buying?: string[]
  seasons?: string[]
  moments?: { name: string; months: number[]; note?: string }[]
}

export const COUNTRY_GUIDE_DRAFTS: Record<string, GuideDraft> = {
  malaysia: {
    formats: [
      'Malaysia’s outdoor market runs on a handful of formats, and each has a job. Highway unipoles and gantries on the expressways into Kuala Lumpur and between the major cities are built for reach: commuters see them head-on every working day, so they suit one bold message held for weeks.',
      'Roadside and wall LED screens in the city centres add flexibility, because the creative can change by the hour and a campaign can start without printing. Mall entrance screens and indoor panels catch people minutes before they buy, which makes them the natural choice for retail, food and launch offers. Lightboxes and street furniture fill in the neighbourhoods around stations and shopping streets. Most plans pair a reach format with a moment format.',
    ],
    buying: [
      'Billboard advertising in Malaysia is bought in two ways. Classic sites such as unipoles and lightboxes are booked directly for a fixed period, typically by the month, with artwork printed and installed before the start date. Digital sites can be booked the same way by share of the loop, or bought programmatically by impression, with budget moved between screens while the campaign runs.',
      'Either way the order is the same: a brief, a site list checked for availability on your dates, artwork to each site’s specification, then play reports once the campaign is live. Moving Walls plans, books and measures both routes from one platform.',
    ],
    seasons: [
      'Demand for outdoor media in Malaysia follows the calendar. Chinese New Year, Ramadan and Hari Raya Aidilfitri, and the year-end school holidays are the busiest retail periods, and the best sites for them are often booked well ahead. Merdeka and Malaysia Day bring national campaigns, and the 11.11 and 12.12 sales have become fixed dates for e-commerce and retail brands.',
      'Festive dates such as Ramadan move earlier each year, so plan against the actual calendar rather than last year’s dates. Outside the peaks the same sites are easier to secure, and longer bookings build steady frequency.',
    ],
    moments: [
      { name: 'Chinese New Year', months: [1, 2] },
      { name: 'Ramadan and Hari Raya', months: [2, 3, 4], note: 'moves each year' },
      { name: 'Merdeka and Malaysia Day', months: [8, 9] },
      { name: '11.11 and 12.12 sales', months: [11, 12] },
      { name: 'Year-end school holidays', months: [11, 12] },
    ],
  },
}
