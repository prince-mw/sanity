'use client'

// Blocks shared by the site, area and city pages so they read as one design:
// the audience personas and the related case studies / articles.

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Briefcase, Car, GraduationCap, Home, Moon, Plane, ShoppingBag, TrainFront, Users, Camera, Volume2, VolumeX, type LucideIcon } from 'lucide-react'
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

type Video = { src: string; poster?: string; title: string }

/** 16:9 market video: autoplays muted; a tap turns the sound on. */
function MarketVideo({ video }: { video: Video }) {
  const [sound, setSound] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black ring-1 ring-gray-200">
      <video ref={ref} src={video.src} poster={video.poster} className="aspect-video w-full" autoPlay muted={!sound} loop playsInline preload="metadata" aria-label={video.title} />
      <button type="button" onClick={() => { setSound(s => !s); if (ref.current) ref.current.muted = sound }} aria-pressed={sound}
        className="mw-tap absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/75">
        {sound ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />} {sound ? 'Sound on' : 'Tap for sound'}
      </button>
    </div>
  )
}

function RelatedCard({ it }: { it: RelatedItem }) {
  return (
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
  )
}

/**
 * Related items: `limit` shown first, "View more" reveals the rest (all still
 * related to this market), then a link to the full library. With a market
 * video, the case-study section shows one card and the video beside it.
 */
export function RelatedSection({ title, intro, items, bg, limit = 3, allHref, allLabel, video }: { title: string; intro: string; items: RelatedItem[]; bg: string; limit?: number; allHref: string; allLabel: string; video?: Video }) {
  const [open, setOpen] = useState(false)
  if (!items.length && !video) return null
  const shown = open ? items : items.slice(0, video ? 1 : limit)
  const rest = items.length - shown.length
  return (
    <section className={`${bg} mw-section`}>
      <div className="mw-container">
        <SgSectionHeading title={title} intro={intro} />
        {video && !open ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-stretch">
            {shown[0] && <RelatedCard it={shown[0]} />}
            <MarketVideo video={video} />
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map(it => <li key={it.id}><RelatedCard it={it} /></li>)}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {rest > 0 && (
            <button type="button" onClick={() => setOpen(true)} className="mw-tap inline-flex items-center rounded-lg bg-[#062068] px-5 py-2.5 font-semibold text-white hover:bg-[#0a2a8a]">
              View {rest} more {rest === 1 ? (items[0].kind === 'post' ? 'article' : 'case study') : (items[0].kind === 'post' ? 'articles' : 'case studies')} from this market
            </button>
          )}
          <Link href={allHref} className="mw-tap inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:border-mw-blue-400">{allLabel} →</Link>
        </div>
      </div>
    </section>
  )
}

/** Both related sections, in the house order: case studies (with the market video), then articles. */
export function RelatedContent({ cityName, countryName, caseStudies, posts, firstBg = 'bg-white', video }: { cityName: string; countryName: string; caseStudies: RelatedItem[]; posts: RelatedItem[]; firstBg?: string; video?: Video }) {
  const secondBg = firstBg === 'bg-white' ? 'bg-gray-50' : 'bg-white'
  const hasFirst = caseStudies.length > 0 || !!video
  return (
    <>
      <RelatedSection title="Case studies from this market" intro={`Campaigns that ran in ${cityName} and ${countryName}.`} items={caseStudies} bg={firstBg} limit={3} allHref="/case-studies" allLabel="All case studies" video={video} />
      <RelatedSection title={`Reading on OOH in ${countryName}`} intro="Articles about advertising in this market." items={posts} bg={hasFirst ? secondBg : firstBg} limit={3} allHref="/blog" allLabel="All articles" />
    </>
  )
}
