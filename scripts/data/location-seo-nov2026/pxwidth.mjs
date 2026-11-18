// Pixel width of text in Arial (as Google SERP tools measure: title 20px, description 14px)
import fs from 'fs'
const buf = fs.readFileSync('C:/Windows/Fonts/arial.ttf')
const u16 = (o) => buf.readUInt16BE(o), i16 = (o) => buf.readInt16BE(o), u32 = (o) => buf.readUInt32BE(o)
const tables = {}
for (let i = 0, n = u16(4); i < n; i++) { const r = 12 + i * 16; tables[buf.toString('ascii', r, r + 4)] = u32(r + 8) }
const unitsPerEm = u16(tables.head + 18)
const numHM = u16(tables.hhea + 34)
const adv = (g) => u16(tables.hmtx + 4 * Math.min(g, numHM - 1))
// cmap format 4 (BMP)
const cm = tables.cmap; let sub
for (let i = 0, n = u16(cm + 2); i < n; i++) { const r = cm + 4 + i * 8; if (u16(r) === 3 && u16(r + 2) === 1) sub = cm + u32(r + 4) }
const segX2 = u16(sub + 6), ends = sub + 14, starts = ends + segX2 + 2, deltas = starts + segX2, ros = deltas + segX2
function glyph(cp) {
  for (let i = 0; i < segX2 / 2; i++) {
    if (u16(ends + 2 * i) >= cp) {
      const s = u16(starts + 2 * i); if (s > cp) return 0
      const d = i16(deltas + 2 * i), ro = u16(ros + 2 * i)
      if (!ro) return (cp + d) & 0xffff
      const g = u16(ros + 2 * i + ro + 2 * (cp - s)); return g ? (g + d) & 0xffff : 0
    }
  }
  return 0
}
export function px(text, size) {
  let w = 0
  for (const ch of text) { const g = glyph(ch.codePointAt(0)); w += g ? adv(g) / unitsPerEm * size : size }
  return Math.round(w)
}
if (process.argv[2]) console.log(px(process.argv[2], 20), px(process.argv[2], 14))
