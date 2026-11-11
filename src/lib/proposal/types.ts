// Shared types for the instant proposal. Importable from client code: no
// server-only modules here.
import type { PublicSite } from '@/lib/inventory/types'

export type Objective = 'launch' | 'awareness' | 'footfall' | 'event'
export type ProposalStatus = 'draft' | 'sent' | 'approved' | 'changes-requested'
export type VersionSource = 'claude' | 'rules' | 'manual' | 'shortlist' | 'client'

export type Brief = {
  countrySlug: string
  cities: string[]                    // city slugs, one or more; the first is the lead city
  countryWide: boolean                // asked for the whole country: every available city is planned, the rest requested
  citySlug: string; cityName: string  // the lead city (kept for titles and older documents)
  startDate: string | null            // YYYY-MM-DD
  durationWeeks: number | null
  objective: Objective | null
  audience: string                    // in the client's words
  industry: string
  budgetBand: string | null           // sizes the list only; never rendered
  formats: string[]
  targetSites: number
}

export type VersionSite = { siteId: string; siteName: string; reason: string; order: number; citySlug?: string }

export type ProposalVersion = { n: number; createdAt: string; source: VersionSource; summary: string; sites: VersionSite[]; addons?: string[] }

/** Someone other than the creator who acted on the proposal (approved, added, requested): the second lead. */
export type Participant = { name: string; email: string; at: string; action: string }

export type ProposalDoc = {
  _id: string
  shareId: string
  editTokenHash: string
  status: ProposalStatus
  titleLine: string
  creator: { name: string; email: string; company: string; country: string }
  leadId: string | null
  crmError?: string | null
  brief: Brief
  currentVersion: number
  versions: ProposalVersion[]
  changeRequests: { at: string; message: string }[]
  cityRequests: { at: string; citySlug: string; by?: string }[]   // cities asked for that have no inventory yet
  participants: Participant[]
  hidden: { suggestions: string[]; addons: string[] }               // what the creator keeps off the client page
  derivedFrom: string | null                                       // the shareId this proposal was started from
  approvedAt: string | null
  createdAt: string
  updatedAt: string
}

export type ProposalTotals = { sites: number; withFigures: number; reach: number | null; impressions: number | null; investment: { currency: string; low: number; high: number; priced: number } | null }

/** One audience type the plan reaches (commuters, shoppers…), with each site's own persona note for it. */
export type AudienceMember = { siteId: string; siteName: string; name: string; who: string; when: string; why: string }
export type AudienceGroup = { key: string; label: string; icon: string; members: AudienceMember[] }

export type TierId = 'essentials' | 'recommended' | 'full'
/** A size of the plan the client can switch to; `current` is the one the proposal holds now. */
export type Tier = { id: TierId; label: string; blurb: string; siteIds: string[]; current: boolean; totals: ProposalTotals }
/** One way to make the plan stronger; `siteIds` are added (with `reasons`) or `weeks` changes the run. */
export type Suggestion = { id: string; kind: 'moment' | 'audience' | 'frequency' | 'digital'; title: string; body: string; siteIds: string[]; reasons: Record<string, string>; weeks?: number; delta?: { sites: number; reach: number | null; investment: { currency: string; low: number; high: number } | null } }

/** One city in the plan: its sites' count and figures, and whether inventory exists for it. */
export type CityGroup = { slug: string; name: string; available: boolean; requested: boolean; sites: number; reach: number | null; impressions: number | null }

/** The document plus its sites resolved from the inventory, in the current version's order. */
export type ProposalView = {
  doc: ProposalDoc
  version: ProposalVersion
  sites: (PublicSite & { reason: string })[]
  missing: VersionSite[]              // sites in the version the inventory no longer has
  totals: ProposalTotals
  audience: AudienceGroup[]
  cities: CityGroup[]                 // every city of the market: in the plan, requested, or offered
  tiers: Tier[]
  suggestions: Suggestion[]
  pool: (PublicSite & { reason: string })[]   // every site a tier or suggestion can add, resolved, for the page to render
}
