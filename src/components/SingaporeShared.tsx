'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useZohoPopup } from './ZohoPopupProvider'
import { LandingPageRenderer } from './landing'
import { type SgFaq, type SgImage, type SgLandmark, type SgScience, type SgSite } from '@/data/singapore'

export const SG_NAVY = 'bg-[#062068]'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SgLogoSection = any
/* eslint-enable @typescript-eslint/no-explicit-any */

export const ArrowIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export const CheckIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
  </svg>
)

const PinIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

/** Opens the Singapore Zoho form in the site popup, and points the navbar CTA at it while mounted */
export function useSgForm(formUrl: string) {
  const { openZohoPopup, setCurrentPageFormUrl } = useZohoPopup()
  useEffect(() => {
    setCurrentPageFormUrl(formUrl)
    return () => setCurrentPageFormUrl(null)
  }, [formUrl, setCurrentPageFormUrl])
  return () => openZohoPopup(formUrl, 'Contact Our Singapore Team')
}

export function SgFormButton({
  onOpen,
  children,
  variant = 'light',
  compact = false,
  showArrow = true,
  className = '',
}: {
  onOpen: () => void
  children: React.ReactNode
  variant?: 'light' | 'dark' | 'outline'
  /** Smaller, arrow-free button for tight button rows */
  compact?: boolean
  showArrow?: boolean
  className?: string
}) {
  const styles = {
    light: 'bg-white text-[#062068] hover:bg-gray-100 shadow-precision-lg',
    dark: 'bg-[#062068] text-white hover:bg-[#0a2a85] shadow-precision',
    outline: 'border-2 border-white/40 text-white hover:bg-white/10',
  }[variant]
  const size = compact ? 'px-4 py-2.5 text-sm whitespace-nowrap' : 'gap-2 px-6 py-3.5 text-base'
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition-all active:scale-[0.98] ${size} ${styles} ${className}`}
    >
      {children}
      {!compact && showArrow && <ArrowIcon />}
    </button>
  )
}

/** Real image, or a labelled placeholder describing the photo still needed */
export function SgImageBox({ image, className = '', sizes = '100vw', priority = false }: { image: SgImage; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ${className}`}>
      {image.src ? (
        <Image src={image.src} alt={image.alt} title={image.title} fill sizes={sizes} className="object-cover" priority={priority} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-slate-500" role="img" aria-label={image.alt}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px] font-semibold uppercase tracking-wider">Image placeholder</span>
          <span className="text-xs leading-snug max-w-[18rem]">{image.need}</span>
        </div>
      )}
    </div>
  )
}

export function SgSectionHeading({ title, intro, center = false, as: Tag = 'h2' }: { title: string; intro?: string; center?: boolean; as?: 'h2' | 'h3' }) {
  return (
    <div className={`mb-8 lg:mb-10 ${center ? 'max-w-5xl mx-auto text-center' : 'max-w-3xl'}`}>
      <Tag className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-4">{title}</Tag>
      {intro && <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{intro}</p>}
    </div>
  )
}

export function SgLandmarkCards({ landmarks, imageOnly = false }: { landmarks: SgLandmark[]; imageOnly?: boolean }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
      {landmarks.map((l, i) => (
        <article key={`${l.name}-${i}`} className="group rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-precision hover:shadow-precision-lg hover:-translate-y-1 transition-all duration-300">
          <SgImageBox image={l.image} className="aspect-[16/10]" sizes="(min-width: 768px) 33vw, 100vw" />
          {!imageOnly && (
          <div className="p-5 lg:p-6">
            <h3 className="text-lg font-bold text-gray-900">{l.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500"><PinIcon />{l.location}</p>
            <p className="mt-3 inline-flex rounded-full bg-mw-blue-50 px-3 py-1 text-xs font-semibold text-mw-blue-700">{l.format}</p>
            {/* Each figure shows only when filled in (e.g. reach not yet available for a site) */}
            {(l.reach || l.impressions) && (
            <dl className={`mt-5 grid gap-4 border-t border-gray-100 pt-4 ${l.reach && l.impressions ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {l.reach && (
              <div>
                <dt className="text-xs text-gray-500">Monthly reach</dt>
                <dd className="text-lg font-bold text-mw-blue-600">{l.reach}</dd>
              </div>
              )}
              {l.impressions && (
              <div>
                <dt className="text-xs text-gray-500">Monthly impressions</dt>
                <dd className="text-lg font-bold text-mw-blue-600">{l.impressions}</dd>
              </div>
              )}
            </dl>
            )}
          </div>
          )}
        </article>
      ))}
    </div>
  )
}

export function SgFaqList({ faqs, heading = 'Frequently Asked Questions', bg = 'bg-gray-50' }: { faqs: SgFaq[]; heading?: string; bg?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className={`py-12 lg:py-16 ${bg}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#062068] mb-8 text-center">{heading}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.question} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`sg-faq-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 hover:text-mw-blue-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                {/* Kept in the DOM when collapsed so answers stay crawlable */}
                <div id={`sg-faq-${i}`} hidden={!isOpen} className="px-5 pb-5 space-y-3 text-gray-600 leading-relaxed">
                  {faq.answer.split('\n\n').map((p) => <p key={p}>{p}</p>)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function SgMwScience({ block: mwScienceBlock }: { block: SgScience }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${SG_NAVY} text-white p-6 sm:p-10`}>
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#61CBF5]/20 blur-3xl pointer-events-none" />
      <div className="relative grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{mwScienceBlock.heading}</h3>
          <p className="text-blue-100/90 leading-relaxed mb-6">{mwScienceBlock.body}</p>
          <Link href={mwScienceBlock.href} className="inline-flex items-center gap-2 font-semibold text-cyan-300 hover:text-white hover:gap-3 transition-all">
            {mwScienceBlock.linkText}
          </Link>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
          {mwScienceBlock.groups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="font-semibold mb-3">{g.title}</p>
              <ul className="space-y-2 text-sm text-blue-100/90">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2"><CheckIcon className="w-4 h-4 mt-0.5 text-cyan-300 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** "Trusted Globally by Marketers" — the same logo carousel section used on the Singapore location doc */
export function SgLogoStrip({ section }: { section: SgLogoSection | null }) {
  if (!section) return null
  return <LandingPageRenderer sections={[section]} />
}

export function SgClosingCta({ heading, body, button, onOpen, showArrow = true }: { heading: string; body: string; button: string; onOpen: () => void; showArrow?: boolean }) {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-3xl ${SG_NAVY} text-white px-6 py-12 sm:px-12 lg:py-16 text-center`}>
          <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#61CBF5]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#1E76BB]/40 blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">{heading}</h2>
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed mb-7">{body}</p>
            <SgFormButton onOpen={onOpen} showArrow={showArrow}>{button}</SgFormButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Sites grouped by region / area: one tab per group, sites shown as tiles */
export function SgSiteGrid({ sites }: { sites: SgSite[] }) {
  const groups = useMemo(() => Array.from(new Set(sites.map((s) => s.group))), [sites])
  const [active, setActive] = useState(groups[0])
  const visible = sites.filter((s) => s.group === active)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label="Areas">
        {groups.map((g) => {
          const selected = g === active
          const count = sites.filter((s) => s.group === g).length
          return (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(g)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selected ? 'bg-[#062068] text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-200 hover:border-mw-blue-300'}`}
            >
              {g} <span className={selected ? 'text-blue-200' : 'text-gray-400'}>{count}</span>
            </button>
          )
        })}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" role="tabpanel">
        {visible.map((s) => (
          <li key={`${s.group}-${s.name}`} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-mw-blue-200 hover:shadow-precision transition-all">
            <span className="mt-0.5 w-8 h-8 rounded-lg bg-mw-blue-50 text-mw-blue-600 flex items-center justify-center flex-shrink-0">
              <PinIcon />
            </span>
            <span>
              <span className="block font-semibold text-gray-900 leading-snug">{s.name}</span>
              {s.note && <span className="block mt-0.5 text-xs text-gray-500">{s.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
