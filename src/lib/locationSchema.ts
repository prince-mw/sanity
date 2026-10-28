// Service + BreadcrumbList JSON-LD for /locations/{country} and /locations/{country}/{city} pages.
// Schema only: the breadcrumb trail is not shown on the page. Sits alongside the existing
// Organization and FAQPage blocks.

const BASE = 'https://www.movingwalls.com'

// areaServed @type for pages that aren't a plain country or city
const PLACE_TYPE: Record<string, string> = {
  // regions, and places we don't label as countries
  africa: 'Place',
  americas: 'Place',
  'americas-es': 'Place',
  europe: 'Place',
  'hong-kong': 'Place',
  taiwan: 'Place',
  // UK nations
  scotland: 'Country',
  wales: 'Country',
  // states / provinces
  kerala: 'AdministrativeArea',
  selangor: 'AdministrativeArea',
  penang: 'AdministrativeArea',
  bali: 'AdministrativeArea',
  // topic pages and combined markets
  c5: 'Place',
  edsa: 'Place',
  'central-business-districts': 'Place',
  'north-south-luzon': 'Place',
  'retail-shopping-malls': 'Place',
  universities: 'Place',
  'kisumu-nakuru': 'Place',
}

// "Americas (Español)" / "China (中文)" → "Americas" / "China"
const cleanName = (name: string) => name.replace(/\s*\([^)]*\)\s*$/, '').trim()

export function buildLocationJsonLd(opts: {
  countrySlug: string
  countryName: string
  citySlug?: string
  cityName?: string
}) {
  const country = cleanName(opts.countryName)
  const countryUrl = `${BASE}/locations/${opts.countrySlug}`
  const isCity = Boolean(opts.citySlug && opts.cityName)
  const place = isCity ? cleanName(opts.cityName!) : country
  const url = isCity ? `${countryUrl}/${opts.citySlug}` : countryUrl
  const placeType = PLACE_TYPE[isCity ? opts.citySlug! : opts.countrySlug] || (isCity ? 'City' : 'Country')

  const crumbs = [
    { '@type': 'ListItem', position: 1, name: 'Locations', item: `${BASE}/locations` },
    { '@type': 'ListItem', position: 2, name: country, item: countryUrl },
    ...(isCity ? [{ '@type': 'ListItem', position: 3, name: place, item: url }] : []),
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Outdoor advertising in ${place}`,
        serviceType: 'Out-of-home and digital out-of-home advertising',
        provider: { '@type': 'Organization', name: 'Moving Walls', url: BASE },
        areaServed: { '@type': placeType, name: place },
        url,
      },
      { '@type': 'BreadcrumbList', itemListElement: crumbs },
    ],
  }
}
