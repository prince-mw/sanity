// Inventory pages: the shapes.
//
// `InventoryRecord` is the subset of the Inventory Advertising API's
// `InventoryWithRelations` (POST /inventories/search) that the website uses —
// field names exactly as the API returns them, so swapping the sample data for
// the live API changes nothing downstream.
//
// `PublicSite` is what a page is allowed to see. It is built only by
// toPublicSite(): the media owner and every price are dropped there, so neither
// can reach page HTML or a client component by accident.

export interface InventoryRecord {
  id: string
  referenceId?: string | null
  name: string
  description?: string | null
  typeName?: string | null
  displayFormatName?: string | null
  size?: string | null
  scale?: string | null
  classicFields?: { illuminated?: boolean | null } | null
  digitalFields?: { spotDuration?: number | null; spotsPerLoop?: number | null; loopDuration?: number | null } | null
  venueTaxonomyName?: string | null
  adminLevel0Name?: string | null
  adminLevel1Name?: string | null
  adminLevel2Name?: string | null
  adminLevel3Name?: string | null
  adminLevel4Name?: string | null
  address?: string | null
  postalCode?: string | null
  /** WKT, e.g. "POINT(101.7123 3.1466)" — longitude first. */
  geoms?: string[] | null
  medias?: { mediaType?: string | null; url?: string | null }[] | null
  thumbnailUrl?: string | null
  /** Full-size version of thumbnailUrl (the plain one is a small `tn_` copy). */
  thumbnailUrlOriginal?: string | null
  /** Venue taxonomy, broad to narrow (e.g. Retail → Mall → Concourse). */
  venues?: { name?: string | null; path?: string | null }[] | null
  /** One entry per screen face: pixels, metres, screens. */
  panels?: InventoryPanel[] | null
  status?: string | null
  publication?: string | null
  archived?: boolean | null
  /** The media owner approves each creative before it runs. */
  requiresContentApproval?: boolean | null
  mediaOwnerName?: string | null
  prices?: InventoryPrice[] | null
  /** Not an API field: marks stand-in data until the API key arrives. */
  sample?: boolean
  /** Not an API field: audience figures already published on the hand-built city page. */
  audience?: { reach?: string; impressions?: string } | null
  /** Screen/board specifications. Field names to be confirmed against the API's full record; the sample data fills them with stand-ins. */
  specs?: SiteSpecs | null
}

/** What a planner needs to brief artwork and timing. Any field may be missing. */
export interface SiteSpecs {
  resolution?: string | null        // '1080 px × 1920 px'
  panels?: number | null
  screens?: number | null
  leadTimeDays?: number | null
  playerSoftware?: string | null
  contentApproval?: boolean | null
  boardType?: string | null         // 'STANDEE', 'BILLBOARD', ...
  videoFormats?: string[] | null
  imageFormats?: string[] | null
  audioFormats?: string[] | null
  /** Not an API field: true while the values are stand-ins. */
  sample?: boolean
}

export interface InventoryPanel {
  pixelWidth?: number | null
  pixelHeight?: number | null
  physicalWidth?: number | null
  physicalHeight?: number | null
  screenCount?: number | null
  orientation?: string | null
  supportsAudio?: boolean | null
}

export interface InventoryPrice {
  currency?: string | null
  daily?: number | null
  monthly?: number | null
  cpm?: number | null
  cps?: number | null
}

/** Which adminLevel holds the city and the area, per country. Levels differ by country. */
export interface LevelMap { city: 1 | 2 | 3 | 4; area: 1 | 2 | 3 | 4 }

export interface PublicSite {
  id: string
  slug: string
  name: string
  description: string | null
  format: string | null
  displayFormat: string | null
  size: string | null
  illuminated: boolean | null
  digital: { spotSeconds: number | null; spotsPerLoop: number | null; loopSeconds: number | null } | null
  venueType: string | null
  countryName: string
  countrySlug: string
  cityName: string
  citySlug: string
  areaName: string
  areaSlug: string
  address: string | null
  lat: number | null
  lng: number | null
  photos: string[]
  audience: { reach?: string; impressions?: string } | null
  specs: SiteSpecs | null
  sample: boolean
}

export interface PriceQuote {
  siteId: string
  currency: string
  daily: number | null
  monthly: number | null
}
