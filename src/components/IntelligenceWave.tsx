'use client'

import { useId } from 'react'
import { useReducedMotion } from 'framer-motion'

// ─── INTELLIGENCE WAVE ─────────────────────────────────────────────────────────
// MW Science's "intelligence layer" motif, from the product-stack brand deck
// (Graphic Elements: Wave Icon & Arrows). Each unit is the zigzag from the MW
// logo — a thick polyline whose round joins give the rounded peaks and valleys —
// and units alternate solid / outline, as the deck's usage rules ask.
//
// The units drift sideways through a fixed brand gradient (the logo's own
// cyan → blue → indigo), so each one changes colour as it travels, and a soft
// highlight sweeps across them. The moving shapes live inside an SVG mask and
// the gradient is a plain rect behind that mask — that's what keeps the colours
// pinned to the frame instead of scrolling along with the shapes.

const STEP = 20 // horizontal distance between a peak and the next valley
const AMP = 60 // vertical distance between peaks and valleys
const STROKE = 18 // line weight of one unit
const OUTLINE = 2.4 // ring thickness of the outline units
const PEAKS = 4 // the MW mark has four peaks, then a final upstroke
const UNIT_W = STEP * (PEAKS * 2 + 1)
const GAP = 34
const PERIOD = (UNIT_W + GAP) * 2 // one solid + one outline unit

// Like the logo: starts low, four peaks, and ends on an upstroke back to peak height.
function unitPath(x0: number) {
  const points = Array.from({ length: PEAKS * 2 + 2 }, (_, i) => `${x0 + i * STEP},${i % 2 === 0 ? AMP : 0}`)
  return `M${points.join(' L')}`
}

type Row = {
  y: number // vertical centre of the row in viewBox units
  scale: number
  duration: number // seconds for the row to drift one PERIOD
  phase: number // starting offset, so stacked rows don't line up
  opacity?: number
}

type Variant = 'stack' | 'band'

const LAYOUTS: Record<Variant, { width: number; height: number; angle: number; rows: Row[] }> = {
  // Three layered rows on a slant — the hero / strip visual.
  stack: {
    width: 520,
    height: 440,
    angle: -12,
    rows: [
      { y: 105, scale: 0.72, duration: 26, phase: -60, opacity: 0.55 },
      { y: 220, scale: 1.2, duration: 19, phase: -230 },
      { y: 345, scale: 0.85, duration: 31, phase: -140, opacity: 0.75 },
    ],
  },
  // A single horizontal row — for narrow, wide slots.
  band: {
    width: 600,
    height: 110,
    angle: 0,
    rows: [{ y: 55, scale: 0.95, duration: 22, phase: -90 }],
  },
}

const GRADIENTS = {
  // Logo gradient, ending a touch lighter than the logo's near-black so the
  // right-hand end still reads on a white or pale background.
  light: ['#61CBF5', '#1E76BB', '#2A3B8F', '#14235d'],
  // On the dark navy sections the logo's indigo/black end disappears, so the
  // gradient stays in the brighter half of the brand blues.
  dark: ['#8EDCFA', '#61CBF5', '#3D9BE0', '#8E9BF5'],
}

export function IntelligenceWave({
  variant = 'stack',
  tone = 'dark',
  className,
}: {
  variant?: Variant
  tone?: 'light' | 'dark'
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const { width: W, height: H, angle, rows } = LAYOUTS[variant]
  const stops = GRADIENTS[tone]

  // Enough units to cover the (rotated) frame plus one extra period to scroll into.
  const span = Math.hypot(W, H)
  const unitCount = Math.ceil((span * 2) / (UNIT_W + GAP)) + 2

  const waveMask = `wave-${uid}`
  const fadeMask = `fade-${uid}`
  const fill = `fill-${uid}`
  const fadeFill = `fade-fill-${uid}`
  const shine = `shine-${uid}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={fill} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
          {stops.map((c, i) => (
            <stop key={c} offset={`${(i / (stops.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>

        {/* Highlight that sweeps left → right across the units */}
        <linearGradient id={shine} gradientUnits="userSpaceOnUse" x1={-260} y1="0" x2={0} y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity={tone === 'dark' ? 0.75 : 0.6} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          {!reduceMotion && (
            <>
              <animate attributeName="x1" values={`${-260};${W}`} dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="x2" values={`0;${W + 260}`} dur="4.5s" repeatCount="indefinite" />
            </>
          )}
        </linearGradient>

        {/* Soft edges, so the units drift in and out instead of being sliced off */}
        <linearGradient id={fadeFill} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
          <stop offset="0%" stopColor="#000" />
          <stop offset="14%" stopColor="#fff" />
          <stop offset="86%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <mask id={fadeMask} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill={`url(#${fadeFill})`} />
        </mask>

        <mask id={waveMask} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill="#000" />
          <g transform={`rotate(${angle} ${W / 2} ${H / 2})`}>
            {rows.map((row, r) => {
              // Rows are laid out around the frame centre so the slant pivots cleanly.
              const x0 = W / 2 - span + row.phase
              const y0 = row.y - (AMP * row.scale) / 2
              return (
                <g key={r} transform={`translate(${x0} ${y0}) scale(${row.scale})`} opacity={row.opacity ?? 1}>
                  <g>
                    {!reduceMotion && (
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values={`0 0;${-PERIOD} 0`}
                        dur={`${row.duration}s`}
                        repeatCount="indefinite"
                      />
                    )}
                    {Array.from({ length: unitCount }, (_, i) => {
                      const d = unitPath(i * (UNIT_W + GAP))
                      const outline = (i + r) % 2 === 1
                      return (
                        <g key={i} fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d={d} stroke="#fff" strokeWidth={STROKE} />
                          {outline && <path d={d} stroke="#000" strokeWidth={STROKE - OUTLINE * 2} />}
                        </g>
                      )
                    })}
                  </g>
                </g>
              )
            })}
          </g>
        </mask>
      </defs>

      <g mask={`url(#${fadeMask})`}>
        <rect width={W} height={H} fill={`url(#${fill})`} mask={`url(#${waveMask})`} />
        <rect width={W} height={H} fill={`url(#${shine})`} mask={`url(#${waveMask})`} />
      </g>
    </svg>
  )
}
