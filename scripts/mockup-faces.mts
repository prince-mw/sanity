// Marks the advertising face on each pilot site photo with Claude vision and
// draws the result over the photo so a person can check it before it is used.
//
//   ANTHROPIC_API_KEY=... npx tsx scripts/mockup-faces.mts [outDir]
//
// Prints a TS snippet of `faceCorners` per site id (paste into
// src/data/site-content-sample.ts) and writes <outDir>/<id>.jpg overlays.
// The daily job will do the same for real sites and store the corners in Sanity.

import fs from 'node:fs'
import path from 'node:path'
import { SAMPLE_RECORDS } from '../src/data/inventory-sample'

const MODEL = 'claude-sonnet-5-5'
const out = path.resolve(process.argv[2] ?? '.audit/faces')
fs.mkdirSync(out, { recursive: true })
const key = process.env.ANTHROPIC_API_KEY
if (!key) { console.error('ANTHROPIC_API_KEY missing'); process.exit(1) }

const prompt = (w: number, h: number) => `This photo (${w}×${h} pixels) shows an outdoor advertising site: a billboard, LED screen, unipole, lightbox or digital panel.
Find the ADVERTISING FACE — the flat rectangle where the ad is displayed (the screen or poster area only, not its frame, pole or building).
Return its four corners in pixel coordinates as JSON only, in this order: top-left, top-right, bottom-right, bottom-left, as they appear in the photo (follow the perspective: the near edge is longer than the far edge).
Format: {"corners":[[x,y],[x,y],[x,y],[x,y]],"confidence":0-1,"note":"<=12 words"}
If there are several faces, choose the largest, most central one. If no face is visible, return {"corners":null,"confidence":0,"note":"..."}.`

async function sizeOf(url: string): Promise<[number, number]> {
  const m = url.match(/-(\d+)x(\d+)\.\w+$/) // Sanity CDN filenames carry the size
  if (m) return [Number(m[1]), Number(m[2])]
  throw new Error(`no size in ${url}`)
}

async function detect(url: string, w: number, h: number) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key!, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 300, messages: [{ role: 'user', content: [
      { type: 'image', source: { type: 'url', url } }, { type: 'text', text: prompt(w, h) },
    ] }] }),
  })
  if (!r.ok) throw new Error(`Claude ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const text = (await r.json())?.content?.[0]?.text ?? ''
  return JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}')
}

// Overlay drawn with Chrome (no image libs needed): an HTML page screenshotted headless.
async function overlay(id: string, url: string, w: number, h: number, corners: number[][]) {
  const pts = corners.map(([x, y]) => `${x},${y}`).join(' ')
  const html = `<html><body style="margin:0"><div style="position:relative;width:${w}px;height:${h}px">
    <img src="${url}" style="position:absolute;inset:0;width:${w}px;height:${h}px">
    <svg viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;width:${w}px;height:${h}px">
      <polygon points="${pts}" fill="rgba(0,255,0,0.25)" stroke="#00ff00" stroke-width="3"/>
      ${corners.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="#ff0"/><text x="${x + 10}" y="${y - 6}" font-size="22" font-weight="700" fill="#ff0">${i + 1}</text>`).join('')}
    </svg></div></body></html>`
  const tmp = path.join(out, `_${id}.html`)
  fs.writeFileSync(tmp, html)
  const { execFileSync } = await import('node:child_process')
  execFileSync('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, `--screenshot=${path.join(out, `${id}.png`)}`, `file:///${tmp.replace(/\\/g, '/')}`], { stdio: 'ignore' })
  fs.unlinkSync(tmp)
}

const seen = new Set<string>()
const snippet: string[] = []
for (const rec of SAMPLE_RECORDS) {
  const url = rec.medias?.[0]?.url
  if (!url || rec.publication !== 'public') continue
  const [w, h] = await sizeOf(url)
  const res = await detect(url, w, h)
  if (!res.corners) { console.log(`${rec.id}: no face (${res.note})`); continue }
  const frac = res.corners.map(([x, y]: number[]) => [Math.round(x / w * 1000) / 1000, Math.round(y / h * 1000) / 1000])
  console.log(`${rec.id}: confidence ${res.confidence} — ${res.note}`)
  snippet.push(`  '${rec.id}': ${JSON.stringify(frac)},`)
  if (!seen.has(url)) { seen.add(url); await overlay(rec.id, url, w, h, res.corners) }
}
console.log('\n// faceCorners (fractions, TL TR BR BL):\n' + snippet.join('\n'))
console.log(`\nOverlays: ${out}`)
