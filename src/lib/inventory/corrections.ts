import 'server-only'

// Where staff corrections are kept. Sanity documents of type
// `inventoryCorrection` on staging and production (schema in
// studio/schemas/inventoryCorrection.ts, deployed by Prince); JSON files under
// .inventory-corrections/ on a machine whose Sanity token can't write
// (PROPOSAL_STORE=file, the same switch as proposals). Rules: correctionsCore.ts.

import fs from 'node:fs/promises'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { writeClient } from '@/sanity/lib/client'
import type { Correction, CorrectionField } from './correctionsCore'

const fileStore = () => process.env.PROPOSAL_STORE === 'file' || !process.env.SANITY_API_TOKEN
const DIR = path.join(process.cwd(), '.inventory-corrections')
const fileOf = (country: string) => path.join(DIR, `${country.replace(/[^a-z0-9-]/g, '')}.json`)
const FIELDS = '_id, siteId, country, field, value, apiValue, reason, by, byName, at, resolved'

async function readFile(country: string): Promise<Correction[]> {
  try { return JSON.parse(await fs.readFile(fileOf(country), 'utf8')) } catch { return [] }
}
async function writeFile(country: string, list: Correction[]) {
  await fs.mkdir(DIR, { recursive: true })
  await fs.writeFile(fileOf(country), JSON.stringify(list, null, 1))
}

// Read once a minute at most: every page view of every location page asks.
const memo = new Map<string, { at: number; list: Correction[] }>()

export async function listCorrections(country: string, fresh = false): Promise<Correction[]> {
  const hit = memo.get(country)
  if (!fresh && hit && Date.now() - hit.at < 60_000) return hit.list
  let list: Correction[] = []
  try {
    list = fileStore()
      ? await readFile(country)
      : await writeClient.fetch<Correction[]>(`*[_type == "inventoryCorrection" && country == $country] | order(at desc){ ${FIELDS} }`, { country })
  } catch { list = hit?.list ?? [] }
  memo.set(country, { at: Date.now(), list })
  return list
}

/** Save a correction. One correction per site and field: a new one replaces the old. */
export async function saveCorrection(c: Omit<Correction, '_id'>): Promise<Correction> {
  const _id = `inventoryCorrection.${c.country}.${c.siteId}.${c.field}`.replace(/[^A-Za-z0-9._-]/g, '-')
  const doc: Correction = { _id, ...c }
  if (fileStore()) {
    const list = (await readFile(c.country)).filter(x => !(x.siteId === c.siteId && x.field === c.field))
    await writeFile(c.country, [doc, ...list])
  } else {
    await writeClient.createOrReplace({ _type: 'inventoryCorrection', ...doc })
  }
  memo.delete(c.country)
  return doc
}

export async function removeCorrection(country: string, siteId: string, field: CorrectionField) {
  if (fileStore()) {
    await writeFile(country, (await readFile(country)).filter(x => !(x.siteId === siteId && x.field === field)))
  } else {
    await writeClient.delete({ query: `*[_type == "inventoryCorrection" && country == $country && siteId == $siteId && field == $field]`, params: { country, siteId, field } })
  }
  memo.delete(country)
}

/** A version stamp for caches built on top of the corrections. */
export const correctionsStamp = (list: Correction[]) => `${list.length}:${list.reduce((m, c) => (c.at > m ? c.at : m), '')}`

export const newId = () => randomBytes(6).toString('hex')
