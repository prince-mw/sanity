import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { inventoryEnabled, sitesFor } from '@/lib/inventory/source'
import { getSiteContent } from '@/lib/inventory/siteContent'
import { ensureMarkets } from '@/lib/proposal/marketsData'
import { MARKETS } from '@/lib/proposal/markets'
import type { PublicSite } from '@/lib/inventory/types'
import { SgSectionHeading } from '@/components/SingaporeShared'

// "Pick a billboard, see your ad on it": every site whose screen has been
// marked on its photo, so the mock-up works there. The entry point the
// promos send people to (Rif, 11 Nov 2026).
export const revalidate = 300

export const metadata: Metadata = {
  title: 'See your ad on a real billboard | Moving Walls',
  description: 'Pick a billboard or digital screen, add your logo and a line or upload your creative, and see it on the real site photo in seconds. Image or video, free.',
}

type Group = { countryName: string; countrySlug: string; cities: { name: string; slug: string; sites: PublicSite[] }[] }

async function sitesWithFaces(countryFilter?: string): Promise<Group[]> {
  await ensureMarkets()
  const out: Group[] = []
  for (const m of MARKETS) {
    if (countryFilter && m.countrySlug !== countryFilter) continue
    const cities: Group['cities'] = []
    for (const c of m.cities.filter(c => c.available)) {
      const all = await sitesFor(m.countrySlug, c.slug).catch(() => [] as PublicSite[])
      const withPhoto = all.filter(s => s.photos[0])
      const contents = await Promise.all(withPhoto.map(s => getSiteContent(s).catch(() => null)))
      const sites = withPhoto.filter((_, i) => contents[i]?.faceCorners?.length === 4)
      if (sites.length) cities.push({ name: c.name, slug: c.slug, sites })
    }
    if (cities.length) out.push({ countryName: m.countryName, countrySlug: m.countrySlug, cities })
  }
  return out
}

export default async function MockupIndexPage({ searchParams }: { searchParams: Promise<{ country?: string }> }) {
  if (!inventoryEnabled()) notFound()
  const { country } = await searchParams
  const groups = await sitesWithFaces(country)
  const total = groups.reduce((n, g) => n + g.cities.reduce((m, c) => m + c.sites.length, 0), 0)
  return (
    <div className="bg-white">
      <section className="bg-[#2563eb] text-white mw-hero-top pb-10 lg:pb-14">
        <div className="mw-container">
          <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">Ad mock-up</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">See your ad on a real billboard.</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">Pick a site below. On its page, add your logo and a line, or upload your finished image or video, and it appears on the screen in that site&apos;s real photo, at the right perspective and in the screen&apos;s own light. Register once to see it, and we email you the version you choose together with the person who books that site.</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            {['Your logo and a line, or your own creative', 'Image or video, fitted to the screen', 'Free: one registration, nothing to install'].map(t => <li key={t} className="flex items-center gap-2 text-sm font-semibold"><span className="h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="mw-section">
        <div className="mw-container">
          <SgSectionHeading title={total ? `${total} ${total === 1 ? 'site' : 'sites'} ready for your ad` : 'Sites are being prepared'} intro="Each of these screens has been marked on its photo, so your creative lands exactly on it. More sites are added as their photos are prepared; any site page shows its specifications and the audience it reaches." />
          {groups.map(g => (
            <div key={g.countrySlug} className="mb-12 last:mb-0">
              {groups.length > 1 && <h3 className="mb-6 text-2xl font-bold text-[#2563eb]">{g.countryName}</h3>}
              {g.cities.map(c => (
                <div key={c.slug} className="mb-10 last:mb-0">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-3">
                    <h4 className="text-xl font-bold text-gray-900">{c.name}</h4>
                    <Link href={`/locations/${g.countrySlug}/${c.slug}`} className="text-sm font-semibold text-[#2563eb] hover:underline">All sites in {c.name} →</Link>
                  </div>
                  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {c.sites.map(s => (
                      <li key={s.id}>
                        <Link href={`/locations/${s.countrySlug}/${s.citySlug}/${s.areaSlug}/${s.slug}#see-your-ad`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg">
                          <span className="relative block aspect-[16/10] bg-gray-100"><Image src={s.photos[0]} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></span>
                          <span className="flex flex-1 flex-col p-5">
                            <span className="text-xs font-bold uppercase tracking-wider text-mw-blue-600">{s.displayFormat ?? s.format}{s.areaName ? ` · ${s.areaName}` : ''}</span>
                            <span className="mt-1 font-bold leading-snug text-gray-900">{s.name}</span>
                            {s.size && <span className="mt-1 text-sm text-gray-500">{s.size}{s.specs?.resolution ? ` · ${s.specs.resolution}` : ''}</span>}
                            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[#2563eb] group-hover:underline">See your ad here <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          {!total && <p className="text-gray-600">No site is ready yet. <Link href="/locations" className="font-semibold text-[#2563eb] hover:underline">Browse our locations</Link> and ask us for a mock-up on any site.</p>}
        </div>
      </section>

      <section className="bg-gray-50 mw-section-sm">
        <div className="mw-container grid gap-8 lg:grid-cols-3">
          {[
            ['How the mock-up works', 'The screen in each photo is marked by hand or by our model, corner by corner. Your creative is warped onto it in perspective, lit by the screen’s own light in the photo, and softened to the photo’s sharpness, so it looks placed, not pasted. You can drag the corners yourself if the fit is not exact.'],
            ['What you can upload', 'A logo (PNG, SVG or JPG) with a tagline, and we lay the ad out for you in your colour. Or your finished creative: an image, or a video up to 30 seconds. Each site page tells you the size the screen plays, with a blank template to download, and shows exactly how a different size would be fitted.'],
            ['What happens next', 'Register once and the mock-up unlocks on that site. Press “Send to our team” and we email you that exact version, with the details of the person who books the site. In an instant proposal, every site in your plan is mocked up with the same creative once you approve it.'],
          ].map(([h, b]) => <div key={h}><h3 className="font-bold text-gray-900">{h}</h3><p className="mt-2 text-sm leading-relaxed text-gray-600">{b}</p></div>)}
        </div>
      </section>
    </div>
  )
}
