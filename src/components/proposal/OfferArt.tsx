// The offer drawings (Rif approved the twelve on 11 Nov 2026): one looping SVG
// per offer, brand colours, CSS animation only — no video, nothing to load.
// Styles live in globals.css under `.offer-art`.

const BLUE = '#2563eb', SKY = '#66C9F3', SUN = '#FEDA24', NAVY = '#1B1E2B', GREY = '#c9d1de'

export type ArtKey = 'measure' | 'planner' | 'creative' | 'dynamic' | 'market' | 'weeks-8' | 'weeks-12' | 'moment' | 'audience' | 'digital' | 'larger' | 'smaller' | 'city'

/** Which drawing an option id gets. */
export function artFor(id: string, kind?: 'suggestion' | 'addon' | 'tier' | 'city'): ArtKey {
  if (kind === 'city' || id.startsWith('city-')) return 'city'
  if (id === 'run-8-weeks' || id === 'weeks-8') return 'weeks-8'
  if (id === 'weeks-12') return 'weeks-12'
  if (id.startsWith('moment-')) return 'moment'
  if (id.startsWith('audience-')) return 'audience'
  if (id === 'digital') return 'digital'
  if (id === 'larger' || id === 'smaller') return id
  if (['measure', 'planner', 'creative', 'dynamic', 'market'].includes(id)) return id as ArtKey
  return 'moment'
}

export function OfferArt({ art, className = '' }: { art: ArtKey; className?: string }) {
  const common = { viewBox: '0 0 320 200', className: `offer-art offer-art-${art} ${className}`, 'aria-hidden': true as const, focusable: 'false' as const }
  switch (art) {
    case 'measure': return (
      <svg {...common}><rect x="40" y="30" width="150" height="140" rx="10" fill="#fff" stroke={GREY} />
        <g fill={BLUE}><rect className="oa-bar" x="60" y="80" width="22" height="70" /><rect className="oa-bar" x="90" y="60" width="22" height="90" fill={SKY} /><rect className="oa-bar" x="120" y="95" width="22" height="55" /><rect className="oa-bar" x="150" y="50" width="22" height="100" fill={SKY} /></g>
        <line x1="55" y1="150" x2="180" y2="150" stroke="#9aa3b2" />
        <circle className="oa-ring" cx="245" cy="110" r="22" fill="none" stroke={BLUE} strokeWidth="3" /><path d="M245 70c-16 0-28 12-28 27 0 20 28 48 28 48s28-28 28-48c0-15-12-27-28-27z" fill={BLUE} /><circle cx="245" cy="97" r="9" fill={SUN} />
        <text x="245" y="170" fontSize="12" textAnchor="middle" fill={NAVY} fontWeight="700">store footfall</text></svg>)
    case 'planner': return (
      <svg {...common}><defs><clipPath id="oa-clip-planner"><rect x="0" y="0" width="320" height="200" /></clipPath></defs>
        <rect x="135" y="40" width="50" height="34" rx="4" fill={BLUE} /><rect x="158" y="74" width="4" height="40" fill={NAVY} />
        <g clipPath="url(#oa-clip-planner)" fill={SKY}><circle className="oa-dot" cx="0" cy="135" r="7" /><circle className="oa-dot" cx="0" cy="150" r="7" /><circle className="oa-dot" cx="0" cy="142" r="7" fill={BLUE} /><circle className="oa-dot" cx="0" cy="128" r="7" /><circle className="oa-dot" cx="0" cy="156" r="7" fill={BLUE} /><circle className="oa-dot" cx="0" cy="138" r="7" /></g>
        <path className="oa-line" d="M30 185 C 90 185, 120 110, 160 110 S 240 60, 295 55" fill="none" stroke={SUN} strokeWidth="4" strokeLinecap="round" />
        <text x="295" y="45" fontSize="11" textAnchor="end" fill={NAVY} fontWeight="700">forecast reach</text></svg>)
    case 'creative': return (
      <svg {...common}><g transform="translate(160 140)"><rect x="-45" y="-30" width="90" height="60" rx="6" fill={BLUE} /><text x="0" y="6" fontSize="12" textAnchor="middle" fill="#fff" fontWeight="700">MASTER</text>
        <rect className="oa-fly1" x="-45" y="-30" width="90" height="60" rx="6" fill={SKY} /><rect className="oa-fly2" x="-45" y="-30" width="90" height="60" rx="6" fill={SUN} /><rect className="oa-fly3" x="-45" y="-30" width="90" height="60" rx="6" fill={SKY} /></g>
        <g fill="none" stroke={GREY} strokeWidth="2"><rect x="40" y="55" width="50" height="34" rx="4" /><rect x="142" y="40" width="36" height="54" rx="4" /><rect x="230" y="55" width="50" height="34" rx="4" /></g>
        <text x="160" y="28" fontSize="11" textAnchor="middle" fill={NAVY} fontWeight="700">every screen, right first time</text></svg>)
    case 'dynamic': return (
      <svg {...common}><rect x="95" y="50" width="130" height="80" rx="6" fill={NAVY} />
        <g className="oa-day"><rect x="103" y="58" width="114" height="64" rx="3" fill={SUN} /><text x="160" y="95" fontSize="13" textAnchor="middle" fill={NAVY} fontWeight="700">BREAKFAST DEAL</text></g>
        <g className="oa-night"><rect x="103" y="58" width="114" height="64" rx="3" fill={BLUE} /><text x="160" y="95" fontSize="13" textAnchor="middle" fill="#fff" fontWeight="700">DINNER 20% OFF</text></g>
        <g className="oa-sun"><circle cx="160" cy="22" r="9" fill={SUN} /><circle cx="160" cy="158" r="7" fill={SKY} /></g>
        <text x="160" y="175" fontSize="11" textAnchor="middle" fill={NAVY} fontWeight="700">8 am · 6 pm</text></svg>)
    case 'market': return (
      <svg {...common}><rect x="50" y="60" width="70" height="46" rx="5" fill={BLUE} /><rect x="200" y="60" width="70" height="46" rx="5" fill={SKY} />
        <text x="85" y="140" fontSize="11" textAnchor="middle" fill={NAVY}>site A</text><text x="235" y="140" fontSize="11" textAnchor="middle" fill={NAVY}>site B</text>
        <path d="M125 83 H195" stroke={GREY} strokeWidth="2" strokeDasharray="4 4" />
        <circle className="oa-coin" cx="100" cy="83" r="12" fill={SUN} stroke={NAVY} strokeWidth="2" />
        <text x="160" y="175" fontSize="11" textAnchor="middle" fill={NAVY} fontWeight="700">pay by impression · move budget mid-flight</text></svg>)
    case 'weeks-8': return (
      <svg {...common}><rect x="40" y="90" width="240" height="18" rx="9" fill="#e5e7eb" /><rect className="oa-wk" x="40" y="90" width="240" height="18" rx="9" fill={BLUE} />
        <text x="40" y="78" fontSize="11" fill={NAVY} fontWeight="700">4 weeks</text><text x="280" y="78" fontSize="11" textAnchor="end" fill={NAVY} fontWeight="700">8 weeks</text>
        <circle cx="110" cy="150" r="9" fill={NAVY} /><circle className="oa-fade" cx="170" cy="150" r="9" fill={BLUE} />
        <text x="160" y="185" fontSize="11" textAnchor="middle" fill={NAVY}>seen once → seen twice</text></svg>)
    case 'weeks-12': return (
      <svg {...common}><g fill={BLUE}>
        {Array.from({ length: 12 }, (_, i) => <rect key={i} className="oa-cell" style={{ animationDelay: `${i * 0.4}s` }} x={52 + (i % 4) * 56} y={50 + Math.floor(i / 4) * 38} width="48" height="30" rx="4" fill={i === 11 ? SUN : BLUE} />)}</g>
        <text x="160" y="180" fontSize="11" textAnchor="middle" fill={NAVY} fontWeight="700">12 weeks · one booking · builds to the date</text></svg>)
    case 'moment': return (
      <svg {...common}><rect x="70" y="80" width="180" height="70" rx="6" fill="#fff" stroke={GREY} /><path d="M70 80 L160 40 L250 80Z" fill={BLUE} /><text x="160" y="125" fontSize="12" textAnchor="middle" fill={NAVY} fontWeight="700">MALL</text>
        <g className="oa-bob"><rect x="38" y="118" width="22" height="24" rx="3" fill={SUN} /><path d="M43 118v-6a6 6 0 0 1 12 0v6" fill="none" stroke={NAVY} strokeWidth="2" /></g>
        <g className="oa-pop"><rect x="262" y="88" width="34" height="22" rx="3" fill={SKY} /><rect x="277" y="110" width="4" height="40" fill={NAVY} /><text x="279" y="170" fontSize="10" textAnchor="middle" fill={BLUE} fontWeight="700">+1 site</text></g></svg>)
    case 'audience': return (
      <svg {...common}><g><circle cx="70" cy="80" r="14" fill={BLUE} /><circle cx="110" cy="80" r="14" fill={BLUE} /><circle cx="150" cy="80" r="14" className="oa-lit" /><circle cx="190" cy="80" r="14" className="oa-lit" /><circle cx="230" cy="80" r="14" className="oa-lit" />
        <rect x="58" y="100" width="24" height="30" rx="6" fill={BLUE} /><rect x="98" y="100" width="24" height="30" rx="6" fill={BLUE} /><rect x="138" y="100" width="24" height="30" rx="6" className="oa-lit" /><rect x="178" y="100" width="24" height="30" rx="6" className="oa-lit" /><rect x="218" y="100" width="24" height="30" rx="6" className="oa-lit" /></g>
        <g className="oa-fade"><rect x="262" y="60" width="34" height="22" rx="3" fill={SUN} /><rect x="277" y="82" width="4" height="48" fill={NAVY} /></g>
        <text x="160" y="170" fontSize="11" textAnchor="middle" fill={NAVY} fontWeight="700">one more site on their route</text></svg>)
    case 'digital': return (
      <svg {...common}><rect x="40" y="60" width="100" height="62" rx="4" fill={GREY} /><text x="90" y="96" fontSize="11" textAnchor="middle" fill={NAVY}>STATIC</text><rect x="88" y="122" width="4" height="40" fill={NAVY} />
        <rect x="180" y="55" width="100" height="72" rx="6" fill={NAVY} /><rect className="oa-slide" x="186" y="61" width="88" height="60" rx="3" /><rect x="228" y="127" width="4" height="35" fill={NAVY} />
        <text x="230" y="180" fontSize="11" textAnchor="middle" fill={NAVY} fontWeight="700">changes by the hour</text></svg>)
    case 'larger': case 'smaller': return (
      <svg {...common}><g fill={BLUE}><rect x="40" y="70" width="40" height="26" rx="3" /><rect x="100" y="70" width="40" height="26" rx="3" /><rect x="160" y="70" width="40" height="26" rx="3" /></g>
        <g fill={SKY} className={art === 'larger' ? 'oa-fade' : 'oa-fade-out'}><rect x="220" y="70" width="40" height="26" rx="3" /><rect x="40" y="120" width="40" height="26" rx="3" /><rect x="100" y="120" width="40" height="26" rx="3" /><rect x="160" y="120" width="40" height="26" rx="3" /><rect x="220" y="120" width="40" height="26" rx="3" /></g>
        <text x="160" y="175" fontSize="11" textAnchor="middle" fill={NAVY} fontWeight="700">{art === 'larger' ? 'the same brief, more of the city' : 'the essentials, lighter'}</text></svg>)
    case 'city': return (
      <svg {...common}><path d="M60 150 C 80 60, 120 40, 150 55 C 190 75, 210 40, 260 80 C 290 110, 250 170, 200 160 C 150 150, 90 175, 60 150Z" fill="#fff" stroke={GREY} />
        <path d="M120 95c-9 0-16 7-16 16 0 12 16 28 16 28s16-16 16-28c0-9-7-16-16-16z" fill={BLUE} />
        <path className="oa-route" d="M128 112 Q 170 60 218 90" fill="none" stroke={SUN} strokeWidth="3" strokeDasharray="6 6" />
        <g className="oa-pin2"><path d="M220 75c-9 0-16 7-16 16 0 12 16 28 16 28s16-16 16-28c0-9-7-16-16-16z" fill={SKY} /></g></svg>)
  }
}
