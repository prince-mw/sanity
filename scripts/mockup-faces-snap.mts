// Before/after test of edge snapping on the pilot photos, no AI needed:
// take the stored corners, shove them off by a few pixels (as an AI or a
// hurried hand would), snap, and draw both over the photo.
//   npx tsx scripts/mockup-faces-snap.mts <outDir> [jitterPx]
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
import { SAMPLE_RECORDS } from '../src/data/inventory-sample'
import { SITE_CONTENT_SAMPLE } from '../src/data/site-content-sample'
import { snapQuad } from '../src/lib/mockup/snap'

const out = path.resolve(process.argv[2] ?? '.audit/snap')
const jitter = Number(process.argv[3] ?? 7)
fs.mkdirSync(out, { recursive: true })
let seed = 7
const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 * 2 - 1 }

const seen = new Set<string>()
for (const rec of SAMPLE_RECORDS) {
  const url = rec.medias?.[0]?.url, face = SITE_CONTENT_SAMPLE[rec.id]?.faceCorners
  if (!url || !face || seen.has(url)) continue
  seen.add(url)
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const w = info.width, h = info.height
  const truth = face.map(([x, y]) => [x * w, y * h]) as [number, number][]
  const before = truth.map(([x, y]) => [x + rnd() * jitter, y + rnd() * jitter]) as [number, number][]
  const { quad: after, moved } = snapQuad({ data, width: w, height: h, channels: 4 }, before, 10)
  const err = (q: [number, number][]) => (q.reduce((s, p, i) => s + Math.hypot(p[0] - truth[i][0], p[1] - truth[i][1]), 0) / 4).toFixed(1)
  console.log(`${rec.id}: error vs hand-marked — before ${err(before)}px, after ${err(after)}px (moved ${moved.map(m => m.toFixed(1)).join('/')})`)
  const poly = (q: [number, number][]) => q.map(p => p.join(',')).join(' ')
  const html = `<html><body style="margin:0"><div style="position:relative;width:${w}px;height:${h}px">
    <img src="${url}" style="position:absolute;inset:0;width:${w}px;height:${h}px">
    <svg viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;width:${w}px;height:${h}px">
      <polygon points="${poly(before)}" fill="none" stroke="#ff3b3b" stroke-width="2" stroke-dasharray="6 4"/>
      <polygon points="${poly(after)}" fill="rgba(0,255,0,0.18)" stroke="#00ff44" stroke-width="2"/>
      <text x="12" y="28" font-size="20" font-weight="700" fill="#fff" stroke="#000" stroke-width="0.6">red dashed = before (off by ~${jitter}px) · green = snapped</text>
    </svg></div></body></html>`
  const tmp = path.join(out, `_${rec.id}.html`); fs.writeFileSync(tmp, html)
  execFileSync('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, `--screenshot=${path.join(out, `${rec.id}.png`)}`, `file:///${tmp.replace(/\\/g, '/')}`], { stdio: 'ignore' })
  fs.unlinkSync(tmp)
}
console.log('overlays:', out)
