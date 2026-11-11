'use client'

import { Check, Plus } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import { useShortlist } from '@/lib/proposal/shortlist'

/**
 * "Add to proposal" on a site card (inside the card's link, so it stops the
 * click) or in the site page hero (the slot the price button used to hold).
 * It is the lead CTA (Rif, 11 Nov 2026), so on cards it is the solid blue
 * button and the one beside it is the outlined one. `className` sizes it.
 */
export function AddToProposalButton({ site, variant, className = '' }: { site: PublicSite; variant: 'card' | 'hero'; className?: string }) {
  const { has, add, remove, ready } = useShortlist()
  const on = ready && has(site.id)
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    if (on) remove(site.id); else add(site)
  }
  if (variant === 'hero') {
    return (
      <button type="button" onClick={toggle} aria-pressed={on}
        className={`mw-tap inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all border-2 ${on ? 'border-cyan-300 bg-cyan-300 text-[#2563eb]' : 'border-white bg-white text-[#2563eb] hover:bg-cyan-50'}`}>
        {on ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
        {on ? 'Added to proposal' : 'Add to proposal'}
      </button>
    )
  }
  return (
    <button type="button" onClick={toggle} aria-pressed={on}
      className={`mw-tap inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 px-4 py-2 text-xs font-semibold shadow-sm transition-colors ${on ? 'border-[#2563eb] bg-white text-[#2563eb]' : 'border-[#2563eb] bg-[#2563eb] text-white hover:border-[#1d4ed8] hover:bg-[#1d4ed8]'} ${className}`}>
      {on ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
      {on ? 'Added' : 'Add to proposal'}
    </button>
  )
}
