'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useShortlist } from '@/lib/proposal/shortlist'

/**
 * The floating "Proposal (n)" bar on the location pages. Appears once a site
 * is shortlisted; leads to /proposals/new. Under the lead form (z-[60]).
 */
export function ProposalBar() {
  const { items, ready, clear } = useShortlist()
  if (!ready || items.length === 0) return null
  const thumbs = items.filter(i => i.photo).slice(0, 3)
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5 pointer-events-none" role="region" aria-label="Your proposal shortlist">
      <div className="mw-container pointer-events-auto">
        <div className="ml-auto flex w-full items-center gap-3 rounded-2xl bg-[#062068] p-3 text-white shadow-2xl ring-1 ring-white/15 sm:w-auto sm:max-w-xl">
          <div className="hidden sm:flex -space-x-2">
            {thumbs.map(i => (
              <span key={i.id} className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#062068] bg-white/10">
                <Image src={i.photo as string} alt="" fill sizes="40px" className="object-cover" />
              </span>
            ))}
          </div>
          <p className="flex-1 text-sm leading-tight">
            <span className="font-bold">Proposal · {items.length} {items.length === 1 ? 'site' : 'sites'}</span>
            <span className="block text-blue-100/80">Build it in a minute, no sales call needed.</span>
          </p>
          <Link href="/proposals/new" className="mw-tap inline-flex items-center justify-center rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-[#062068] hover:bg-cyan-200">Build proposal</Link>
          <button type="button" onClick={clear} aria-label="Clear the shortlist" className="mw-tap rounded-lg p-2 text-blue-100/80 hover:bg-white/10 hover:text-white"><X className="h-4 w-4" aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  )
}
