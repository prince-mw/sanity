'use client'

// City page, straight after the hero: the inventory finder (filters, site
// cards and the branded map), then the city's areas. CMS text follows.

import Link from 'next/link'
import { SgSectionHeading } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import { areaPath } from './InventoryShared'
import { SiteFinder } from './SiteFinder'
import type { SiteInsights } from '../proposal/SiteDetailsDialog'
import type { AreaLink } from './InventoryAreaClient'
import { AudienceSection, RelatedContent } from './ContentBlocks'
import type { PlaceContent, Highlight } from '@/lib/inventory/placeContent'
import { IconStoryCards } from '../motion/kit/IconStoryCards'
import { MARKET_VIDEOS } from '@/data/market-videos'
import { ShoppingBag, Route, TrainFront, Building2, Landmark, Store, Plane, Trees, type LucideIcon } from 'lucide-react'

const HIGHLIGHT_ICONS: Record<Highlight['icon'], LucideIcon> = { shopping: ShoppingBag, road: Route, rail: TrainFront, tower: Building2, landmark: Landmark, mall: Store, airport: Plane, park: Trees }

export function CityInventorySection({ cityName, citySlug, countrySlug, countryName, sites, pagedIds, areas, sample, content, guide, insights = {} }: {
  cityName: string
  citySlug: string
  countrySlug: string
  sites: PublicSite[]
  pagedIds: string[]
  areas: AreaLink[]
  sample: boolean
  countryName: string
  content: PlaceContent
  /** The city template's guide: rendered after the sites; it covers areas and audiences, so those sections step aside. */
  guide?: React.ReactNode
  /** Description and personas per site, for the Details popup. */
  insights?: Record<string, SiteInsights>
}) {
  const paged = new Set(pagedIds)
  const areaCount = new Set(sites.map(s => s.areaSlug)).size
  return (
    <div id="all-sites">
      {!guide && (content.highlights.length > 0 || content.description) && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title={`Outdoor advertising in ${cityName}`} intro={content.highlights.length ? undefined : content.description ?? undefined} />
            {content.highlights.length > 0 && (
              <IconStoryCards kicker={`Where ${cityName} moves`} cards={content.highlights.map(h => ({ icon: HIGHLIGHT_ICONS[h.icon] ?? Landmark, title: h.title, text: h.text }))} />
            )}
          </div>
        </section>
      )}
      <section className="bg-gray-50 mw-section">
        <div className="mw-container">
          <SgSectionHeading title={`Every advertising site in ${cityName}`} intro={`${sites.length} sites across ${areaCount} areas. Filter on the left; open Details for a site's audience and screen specifications.`} />
          <SiteFinder sites={sites} hasPage={s => paged.has(s.id)} mapTitle={`Map of advertising sites in ${cityName}`} insights={insights} />
        </div>
      </section>
      {guide}
      {!guide && areas.length > 0 && (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <SgSectionHeading title={`Advertising areas in ${cityName}`} intro="Pick an area to see every site there." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {areas.map(a => (
                <Link key={a.slug} href={areaPath(countrySlug, citySlug, a.slug)} className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg transition-all">
                  <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{a.kind === 'buyer' ? `${a.count} sites` : a.count ? `${a.count} site${a.count === 1 ? '' : 's'} · growing` : 'Growing'}</span>
                  <span className="mt-2 text-lg font-bold text-gray-900">{a.name}</span>
                  <span className="mt-3 text-sm font-semibold text-mw-blue-600 group-hover:text-[#2563eb]">Explore {a.name} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {!guide && <AudienceSection placeName={cityName} personas={content.personas} />}
      <RelatedContent cityName={cityName} countryName={countryName} caseStudies={content.caseStudies} posts={content.posts} firstBg="bg-white" video={MARKET_VIDEOS[countrySlug]} />
    </div>
  )
}
