// Ambient Drift compass needle: ticks slowly orbit, the needle breathes gently,
// a soft glow pulses behind it. Originally built for MW Science's "True North
// for OOH" final CTA (MWScienceClient.tsx), shared here so other pages can
// reuse the same visual.
// NOTE: Framer Motion + SVG `rotate` silently fails to apply any transform
// (confirmed via getComputedStyle), so rotation here uses plain CSS
// transforms (Tailwind keyframes) instead.

function compassTicks() {
  const round = (n: number) => Math.round(n * 1000) / 1000
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180
    return {
      id: i,
      x1: round(50 + 46 * Math.sin(angle)), y1: round(50 - 46 * Math.cos(angle)),
      x2: round(50 + 40 * Math.sin(angle)), y2: round(50 - 40 * Math.cos(angle)),
    }
  })
}

const TONES = {
  light: { ring: '#60a5fa', tick: '#93c5fd', glow: '#60a5fa', needle: '#60a5fa' },
  dark: { ring: '#1d4ed8', tick: '#3b82f6', glow: '#1d4ed8', needle: '#1d4ed8' },
}

function needlePath(color: string) {
  return <>
    <path d="M50 14 L58 50 L50 86 L42 50 Z" fill={color} opacity="0.9" />
    <path d="M50 14 L58 50 L50 50 Z" fill="#ffffff" />
  </>
}

export function CompassNeedleAmbientDrift({ className, tone = 'light' }: { className?: string; tone?: keyof typeof TONES }) {
  const ticks = compassTicks()
  const { ring, tick, glow, needle } = TONES[tone]
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <filter id="compassGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke={ring} strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={tick} strokeOpacity="0.2" strokeWidth="1" />
      <g className="animate-spin-slow" style={{ transformOrigin: '50px 50px', animationDuration: '26s' }}>
        {ticks.map(t => (
          <line key={t.id} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={tick} strokeOpacity="0.3" strokeWidth="1" />
        ))}
      </g>
      <circle cx="50" cy="50" r="10" fill={glow} opacity="0.35" filter="url(#compassGlow)" className="animate-pulse" />
      <g className="animate-compass-drift" style={{ transformOrigin: '50px 50px' }}>
        {needlePath(needle)}
      </g>
      <circle cx="50" cy="50" r="4" fill="#1e3a8a" stroke={tick} strokeWidth="1.5" />
    </svg>
  )
}
