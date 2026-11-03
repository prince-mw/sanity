'use client'

// Added under a city page that has inventory: the city's areas and every site.

import Link from 'next/link'
import { SgSectionHeading } from '../SingaporeShared'
import type { PublicSite } from '@/lib/inventory/types'
import { SiteGrid, SitesMap, SampleBanner, areaPath } from './InventoryShared'
import type { AreaLink } from './InventoryAreaClient'

export function CityInventorySection({ cityName, citySlug, countrySlug, sites, pagedIds, areas, sample }: {
  cityName: string
  citySlug: string
  countrySlug: string
  sites: PublicSite[]
  pagedIds: string[]
  areas: AreaLink[]
  sample: boolean
}) {
  const paged = new Set(pagedIds)
  return (
    <div id="all-sites">
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sample && <SampleBanner className="mb-6" />}
          <SgSectionHeading title={`Advertising areas in ${cityName}`} intro="Pick an area to see every site there." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {areas.map(a => (
              <Link key={a.slug} href={areaPath(countrySlug, citySlug, a.slug)} className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg transition-all">
                <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{a.kind === 'buyer' ? `${a.count} sites` : a.count ? `${a.count} site${a.count === 1 ? '' : 's'} · growing` : 'Growing'}</span>
                <span className="mt-2 text-lg font-bold text-gray-900">{a.name}</span>
                <span className="mt-3 text-sm font-semibold text-mw-blue-600 group-hover:text-[#062068]">Explore {a.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SgSectionHeading title={`Every advertising site in ${cityName}`} intro={`${sites.length} sites across ${new Set(sites.map(s => s.areaSlug)).size} areas.`} />
          <SiteGrid sites={sites} hasPage={s => paged.has(s.id)} />
          <div className="mt-10"><SitesMap sites={sites} title={`Map of advertising sites in ${cityName}`} /></div>
        </div>
      </section>
    </div>
  )
}
