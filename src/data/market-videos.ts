// One Ava-style brand video per market (16:9 MP4), shown beside the case
// study on city, area and site pages so a market with a single case study
// has no empty space. Generated with the mw-brand-video skill from that
// market's featured case study; hosted on the Sanity CDN. Keyed by country slug.
// Rif, 11 Nov 2026. Empty until the first video is produced.

export const MARKET_VIDEOS: Record<string, { src: string; poster?: string; title: string }> = {}
