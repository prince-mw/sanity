import 'server-only'

// Inventory pages: reading the snapshot `npm run inventory:pull` writes
// (scripts/inventory-pull.mjs). Pages never call the Inventory API directly —
// a country takes minutes to pull — so the daily job refreshes these files and
// every page reads them. Server only: the files carry prices for the estimate.

import fs from 'node:fs'
import path from 'node:path'
import type { InventoryRecord } from './types'

export type SnapshotIndex = {
  source?: string
  staging?: boolean
  updatedAt?: string
  countries: Record<string, { name: string; sites: number; staging?: boolean; pulledAt?: string }>
}
export type CountrySnapshot = { country: string; slug: string; source: string; staging: boolean; pulledAt: string; records: InventoryRecord[] }

const dir = () => process.env.INVENTORY_SNAPSHOT_DIR || path.join(process.cwd(), '.inventory')

// Re-read a file only when it changes on disk, so a fresh pull shows without a restart.
const memo = new Map<string, { mtime: number; value: unknown }>()
function readJson<T>(file: string): T | null {
  try {
    const mtime = fs.statSync(file).mtimeMs
    const hit = memo.get(file)
    if (hit && hit.mtime === mtime) return hit.value as T
    const value = JSON.parse(fs.readFileSync(file, 'utf8')) as T
    memo.set(file, { mtime, value })
    return value
  } catch {
    return null
  }
}

export const snapshotIndex = () => readJson<SnapshotIndex>(path.join(dir(), 'index.json'))

export function countrySnapshot(countrySlug: string): CountrySnapshot | null {
  if (!/^[a-z0-9-]+$/.test(countrySlug)) return null
  return readJson<CountrySnapshot>(path.join(dir(), `${countrySlug}.json`))
}

/** Changes whenever a country's file is re-pulled; used to key derived caches. */
export function snapshotVersion(countrySlug: string): number {
  try { return fs.statSync(path.join(dir(), `${countrySlug}.json`)).mtimeMs } catch { return 0 }
}
