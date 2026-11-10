// Draws the stored faceCorners over each pilot photo, so they can be checked
// by eye (no API). npx tsx scripts/mockup-faces-check.mts <outDir>
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { SAMPLE_RECORDS } from '../src/data/inventory-sample'
import { SITE_CONTENT_SAMPLE } from '../src/data/site-content-sample'

const out = path.resolve(process.argv[2] ?? '.audit/faces')
fs.mkdirSync(out, { recursive: true })
for (const rec of SAMPLE_RECORDS) {
  const url = rec.medias?.[0]?.url, face = SITE_CONTENT_SAMPLE[rec.id]?.faceCorners
  if (!url || !face) continue
  const m = url.match(/-(\d+)x(\d+)\.\w+$/)!; const w = Number(m[1]), h = Number(m[2])
  const pts = face.map(([x, y]) => `${x * w},${y * h}`).join(' ')
  const html = `<html><body style="margin:0"><div style="position:relative;width:${w}px;height:${h}px">
    <img src="${url}" style="position:absolute;inset:0;width:${w}px;height:${h}px">
    <svg viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;width:${w}px;height:${h}px">
      <polygon points="${pts}" fill="rgba(0,255,0,0.3)" stroke="#0f0" stroke-width="2"/>
      ${face.map(([x, y], i) => `<circle cx="${x * w}" cy="${y * h}" r="5" fill="#ff0"/><text x="${x * w + 8}" y="${y * h - 5}" font-size="18" font-weight="700" fill="#ff0" stroke="#000" stroke-width="0.5">${i + 1}</text>`).join('')}
    </svg></div></body></html>`
  const tmp = path.join(out, `_${rec.id}.html`); fs.writeFileSync(tmp, html)
  execFileSync('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, `--screenshot=${path.join(out, `${rec.id}.png`)}`, `file:///${tmp.replace(/\\/g, '/')}`], { stdio: 'ignore' })
  fs.unlinkSync(tmp); console.log(rec.id)
}
