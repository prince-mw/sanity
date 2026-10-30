import 'server-only'
import { actionId } from './actions'

// Blog content audit (Blog findings tab). A point-in-time snapshot (GA4 + Search Console + Semrush +
// competitor review) stored in the PRIVATE Sanity doc `secrets.internalInsightsBlogAudit`, so no business
// data lives in this public repo. Each item gets a stable id for the shared Not started / WIP / Done status.

type Priority = 'High' | 'Medium' | 'Low'

export interface AuditItem {
  id: string
  key: string
  priority: Priority
  category: string
  title: string
  detail: string
  page?: string
  owner?: string
  flag?: string
  items?: { label: string; href?: string; note?: string; highlight?: string }[]
}

export interface AuditSection { key: string; title: string; note?: string; when: string; intro: string; items: AuditItem[] }

export interface AuditPost {
  t: string; s: string; a: string; g: string; c: string; d: string
  cl: number; im: number; pos: number | null; org: number; ai: number; w: number; q: string
}

export interface BlogAudit {
  auditDate: string
  period: string
  /** Last 12 months (`cur`) vs the 12 months before (`prev`); `neutral` = no good/bad colour */
  stats: { label: string; value: string; cur: number; prev: number; prevLabel: string; lowerIsBetter?: boolean; neutral?: boolean }[]
  findings: { title: string; detail: string }[]
  questions: { question: string; demand: string; winner: string; ours: string; oursLinks?: { label: string; href: string }[]; diagnosis: 'missing' | 'weak' | 'cannibal' | 'ok'; fix: string }[]
  sections: AuditSection[]
  posts: AuditPost[]
  method: string[]
}

export async function getBlogAudit(): Promise<BlogAudit | null> {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) return null
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const query = encodeURIComponent('*[_id == "secrets.internalInsightsBlogAudit"][0]')
  const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`, {
    headers: { authorization: `Bearer ${token}` },
    next: { revalidate: 600 },
  })
  const doc = (await res.json())?.result
  if (!doc) return null
  return {
    ...doc,
    sections: (doc.sections || []).map((s: AuditSection) => ({
      ...s,
      items: (s.items || []).map((i) => ({ ...i, id: actionId(['blog', i.key]) })),
    })),
  }
}
