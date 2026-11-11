import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationDetailClient from '@/components/LocationDetailClient'
import { LandingPageRenderer } from '@/components/landing'
import Link from 'next/link'
import { CountryGuide, type Tone } from '@/components/location/CountryGuide'
import { ProposalPromo } from '@/components/proposal/ProposalPromo'
import { getLocationBySlug, transformLocationFull, getCitiesByCountry, transformCityForList } from '@/sanity/lib/fetch'
import { getLocationPageLang } from '@/lib/locationLanguageGroups'
import { inventoryEnabled, sitesFor } from '@/lib/inventory/source'
import { marketOf } from '@/lib/proposal/markets'
import { promoEnabled } from '@/lib/proposal/promo'
import { guideFor, marketData, tailSections, templateReport, type TemplateSection } from '@/lib/location/countryTemplate'
import { COUNTRY_GUIDE_DRAFTS } from '@/data/country-guide-drafts'

// The country page on the new template, for review (Rif, 11 Nov 2026). Same
// data as /locations/<country>; only the layout rule differs. Works for any
// country slug, so the same template can be judged on a second market.
// Add ?check=1 for the slot-by-slot completeness list. Never indexed.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Country template preview | Moving Walls', robots: { index: false, follow: false } }

export default async function CountryTemplatePreview({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ check?: string; tone?: string }> }) {
  if (!inventoryEnabled()) notFound()
  const { slug } = await params
  const { check, tone: toneParam } = await searchParams
  // Brand colours are the default now; ?tone=none shows the plain version for comparison.
  const tone: Tone = toneParam === 'none' ? 'none' : 'brand'
  const TONES: [Tone, string][] = [['brand', 'Brand colours'], ['none', 'Plain']]
  const sanityLocation = await getLocationBySlug(slug, false)
  if (!sanityLocation) notFound()

  const location = transformLocationFull(sanityLocation)
  const countryName = sanityLocation.country || location.name
  const [cityDocs, sites] = await Promise.all([getCitiesByCountry(slug, false), sitesFor(slug)])
  const cities = cityDocs.map(transformCityForList)
  const sections = (location.sections ?? []) as TemplateSection[]
  const topics = guideFor(slug, countryName, sections)
  const data = marketData(sites)
  const showPromo = promoEnabled() && !!marketOf(slug)
  const report = check ? templateReport({ location: { ...location, sections }, cities, guide: topics, data, hasSeoTitle: !!sanityLocation.seo?.metaTitle, hasSeoDescription: !!sanityLocation.seo?.metaDescription }) : null

  return (
    <>
      <LocationDetailClient
        initialData={{ ...location, sectionsPosition: 'before-faqs' }}
        cities={cities}
        pageType="country"
        accents={tone === 'brand'}
        lang={getLocationPageLang(slug)}
        afterHero={showPromo ? <ProposalPromo variant="band" market={countryName} /> : null}
        sectionsOverride={<>
          {/* Review control, preview page only: switch the guide's colour treatment. */}
          <div className="border-y border-gray-200 bg-white">
            <div className="mw-container flex flex-wrap items-center gap-2 py-3">
              <span className="mr-1 text-sm font-semibold text-gray-500">Colour option</span>
              {TONES.map(([id, name]) => <Link key={id} href={`/locations/${slug}/template-preview${id === 'brand' ? '' : `?tone=${id}`}#country-guide-title`} scroll={false} className={`mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold ${tone === id ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb]'}`}>{name}</Link>)}
            </div>
          </div>
          <CountryGuide country={countryName} countrySlug={slug} topics={topics} data={data} draft={COUNTRY_GUIDE_DRAFTS[slug] ?? null} cityLinks={Object.fromEntries(cities.map(c => [c.city.trim().toLowerCase(), c.href]))} proposalHref={showPromo ? '/proposals/new' : null} tone={tone} />
          <LandingPageRenderer sections={tailSections(sections)} />
        </>}
      />
      {report && (
        <section className="border-t border-gray-200 bg-white mw-section-sm">
          <div className="mw-container">
            <h2 className="text-xl font-bold text-gray-900">Template check · {countryName}</h2>
            <p className="mt-1 text-sm text-gray-600">{report.filter(r => r.ok).length} of {report.length} slots filled. A slot without data is hidden on the page.</p>
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {report.map(r => (
                <li key={r.slot} className="flex items-baseline gap-2 text-sm">
                  <span className={`inline-block h-2 w-2 flex-shrink-0 rounded-full ${r.ok ? 'bg-emerald-500' : 'bg-red-500'}`} aria-hidden="true" />
                  <span className="font-semibold text-gray-900">{r.slot}</span>
                  <span className="text-gray-600">{r.ok ? r.note || 'ok' : r.note || 'missing'}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
