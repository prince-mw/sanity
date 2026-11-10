'use client'

// Blocks shared by the site, area and city pages so they read as one design:
// the audience personas and the related case studies / articles.

import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, Car, GraduationCap, Home, Moon, Plane, ShoppingBag, TrainFront, Users, Camera, type LucideIcon } from 'lucide-react'
import { SgSectionHeading } from '../SingaporeShared'
import type { Persona, RelatedItem } from '@/lib/inventory/siteContent'

const PERSONA_ICONS: Record<Persona['icon'], LucideIcon> = {
  commuter: TrainFront, shopper: ShoppingBag, tourist: Camera, office: Briefcase, family: Users,
  student: GraduationCap, nightlife: Moon, traveller: Plane, driver: Car, resident: Home,
}

export function PersonaGrid({ personas }: { personas: Persona[] }) {
  if (!personas.length) return null
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {personas.map(p => {
        const Icon = PERSONA_ICONS[p.icon] ?? Users
        return (
          <li key={p.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mw-blue-50 text-[#062068]"><Icon className="h-6 w-6" aria-hidden="true" /></span>
            <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">{p.who}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="font-semibold text-gray-500">When</dt><dd className="text-gray-800">{p.when}</dd></div>
              <div><dt className="font-semibold text-gray-500">Why it works</dt><dd className="text-gray-800">{p.why}</dd></div>
            </dl>
          </li>
        )
      })}
    </ul>
  )
}

/** "Who you reach" section: the figures (optional) and the personas. */
export function AudienceSection({ placeName, personas, figures, bg = 'bg-gray-50' }: { placeName: string; personas: Persona[]; figures?: { label: string; value: string }[]; bg?: string }) {
  const hasFigures = !!figures?.length
  if (!personas.length && !hasFigures) return null
  return (
    <section className={`${bg} mw-section`}>
      <div className="mw-container">
        <SgSectionHeading title={`Who you reach in ${placeName}`} intro={`The people who pass through ${placeName} and when — so you can match your creative to the moment.`} />
        {hasFigures && (
          <dl className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gray-200 sm:max-w-md">
            {figures!.map(f => (
              <div key={f.label} className="bg-white p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{f.label}</dt><dd className="mt-1 text-3xl font-bold text-[#062068]">{f.value}</dd></div>
            ))}
          </dl>
        )}
        <PersonaGrid personas={personas} />
      </div>
    </section>
  )
}

export function RelatedSection({ title, intro, items, bg }: { title: string; intro: string; items: RelatedItem[]; bg: string }) {
  if (!items.length) return null
  return (
    <section className={`${bg} mw-section`}>
      <div className="mw-container">
        <SgSectionHeading title={title} intro={intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(it => (
            <li key={it.id}>
              <Link href={it.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-mw-blue-200 hover:shadow-precision-lg">
                <div className="relative aspect-[16/10] bg-gray-100">
                  {it.image && <Image src={it.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-1 text-xs font-bold uppercase tracking-wider text-mw-blue-600">{it.kind === 'post' ? 'Article' : 'Case study'}</span>
                  <h3 className="font-bold leading-snug text-gray-900">{it.title}</h3>
                  {it.excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{it.excerpt}</p>}
                  <span className="mt-auto pt-4 text-sm font-semibold text-mw-blue-600 group-hover:text-[#062068]">Read more →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Both related sections, in the house order: case studies, then articles. */
export function RelatedContent({ cityName, countryName, caseStudies, posts, firstBg = 'bg-white' }: { cityName: string; countryName: string; caseStudies: RelatedItem[]; posts: RelatedItem[]; firstBg?: string }) {
  const secondBg = firstBg === 'bg-white' ? 'bg-gray-50' : 'bg-white'
  return (
    <>
      <RelatedSection title="Case studies from this market" intro={`Campaigns that ran in ${cityName} and ${countryName}.`} items={caseStudies} bg={firstBg} />
      <RelatedSection title={`Reading on OOH in ${countryName}`} intro="Articles about advertising in this market." items={posts} bg={caseStudies.length ? secondBg : firstBg} />
    </>
  )
}
