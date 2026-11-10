// One Ava-style brand video per market (16:9 MP4), shown beside the case
// study on city, area and site pages so a market with a single case study
// has no empty space. Generated with the mw-brand-video skill from that
// market's featured case study; hosted on the Sanity CDN. Keyed by country slug.
// Rif, 11 Nov 2026.

export const MARKET_VIDEOS: Record<string, { src: string; poster?: string; title: string }> = {
  // From the YSL Libre case study (one screen in the heart of Kuala Lumpur, 51.2% female viewership).
  malaysia: {
    src: 'https://cdn.sanity.io/files/u10im6di/production/1e9aeb1df936850aa220c0f3f8ef4f71d8458253.mp4',
    poster: 'https://cdn.sanity.io/images/u10im6di/production/3e0d8c56224f5add79257424eb66b8e97ec6c2bb-1920x1080.jpg?w=1280&auto=format',
    title: 'YSL Libre in Kuala Lumpur: one screen, 51.2% female viewership',
  },
}
