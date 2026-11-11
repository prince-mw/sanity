// Shared types for the instant proposal. Importable from client code: no
// server-only modules here.
import type { PublicSite } from '@/lib/inventory/types'

export type Objective = 'launch' | 'awareness' | 'footfall' | 'event'
export type ProposalStatus = 'draft' | 'sent' | 'approved' | 'changes-requested'
export type VersionSource = 'claude' | 'rules' | 'manual' | 'shortlist'

export type Brief = {
  countrySlug: string; citySlug: string; cityName: string
  startDate: string | null            // YYYY-MM-DD
  durationWeeks: number | null
  objective: Objective | null
  audience: string                    // in the client's words
  industry: string
  budgetBand: string | null           // sizes the list only; never rendered
  formats: string[]
  targetSites: number
}

export type VersionSite = { siteId: string; siteName: string; reason: string; order: number }

export type ProposalVersion = { n: number; createdAt: string; source: VersionSource; summary: string; sites: VersionSite[] }

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
  approvedAt: string | null
  createdAt: string
  updatedAt: string
}

export type ProposalTotals = { sites: number; withFigures: number; reach: number | null; impressions: number | null; investment: { currency: string; low: number; high: number; priced: number } | null }

/** One audience type the plan reaches (commuters, shoppers…), with each site's own persona note for it. */
export type AudienceMember = { siteId: string; siteName: string; name: string; who: string; when: string; why: string }
export type AudienceGroup = { key: string; label: string; icon: string; members: AudienceMember[] }

/** The document plus its sites resolved from the inventory, in the current version's order. */
export type ProposalView = {
  doc: ProposalDoc
  version: ProposalVersion
  sites: (PublicSite & { reason: string })[]
  missing: VersionSite[]              // sites in the version the inventory no longer has
  totals: ProposalTotals
  audience: AudienceGroup[]
}
