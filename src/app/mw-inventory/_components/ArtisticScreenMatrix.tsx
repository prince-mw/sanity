'use client';

import React, { useState } from 'react';

// Purely decorative — a stylised 2x2 grid representing "screens" in the network.
// Not tied to any real asset data or click-through destination.
export const ArtisticScreenMatrix: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative mx-auto max-w-[420px] lg:max-w-[380px] xl:max-w-[420px]" id="artistic-screen-matrix">

      {/* Ambient background atmosphere matching the navy palette with subtle breathing pulse */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#fde047]/10 rounded-full blur-3xl pointer-events-none anim-pulse-glow" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none anim-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* 2x2 Grid of Artistic Screens */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 p-1.5 sm:p-2">

        {/* SCREEN 1 (TOP-LEFT): Gold & Peach Waves with Geometric Facets & Wire Lines */}
        <div
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.025] hover:shadow-2xl shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #091329 0%, #060e20 50%, #0c1833 100%)',
            boxShadow: hoveredIndex === 0
              ? '0 0 25px rgba(250, 204, 21, 0.45), inset 0 0 15px rgba(250, 204, 21, 0.25)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="absolute inset-0 rounded-2xl border-[1.5px] border-[#eab308]/70 group-hover:border-[#fde047] transition-colors pointer-events-none z-20 shadow-[inset_0_0_8px_rgba(234,179,8,0.3)] anim-border-breath" />
          <div className="absolute inset-[3px] rounded-[13px] border border-[#fde047]/20 pointer-events-none z-20" />

          <svg className="w-full h-full object-cover select-none" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldRibbonGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#fde047" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#fb923c" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="peachRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#fde047" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="facetGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="facetGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0.1" />
              </linearGradient>
              <filter id="goldBloom" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="16" />
              </filter>
            </defs>

            <circle cx="160" cy="240" r="140" fill="#f59e0b" opacity="0.12" filter="url(#coreGlow)" className="anim-pulse-glow" />
            <circle cx="280" cy="140" r="100" fill="#fb923c" opacity="0.1" filter="url(#coreGlow)" className="anim-pulse-glow" style={{ animationDelay: '1.5s' }} />

            <g className="anim-facet-shimmer">
              <polygon points="40,320 120,200 170,220 90,340" fill="url(#facetGrad1)" />
              <polygon points="50,290 140,170 200,190 110,310" fill="#fde047" opacity="0.18" />
              <polygon points="180,300 280,180 340,200 240,320" fill="url(#facetGrad2)" />
              <polygon points="260,250 330,160 380,175 310,265" fill="#fb923c" opacity="0.25" />
              <polygon points="220,210 290,130 350,145 280,225" fill="#fde047" opacity="0.15" />
            </g>

            <g className="anim-wave-slow">
              <path
                d="M -30 380 C 60 310, 140 370, 220 280 C 290 200, 320 120, 420 70 L 440 180 C 350 220, 300 320, 200 370 Z"
                fill="url(#peachRibbonGrad)"
              />
              <path
                d="M -20 400 C 50 300, 110 360, 190 260 C 260 160, 310 100, 430 40 L 410 110 C 310 160, 250 250, 170 340 C 110 400, 60 380, -20 420 Z"
                fill="url(#goldRibbonGrad1)"
                filter="url(#goldBloom)"
              />
            </g>

            <g className="anim-wire-flow">
              {[
                { d: 'M -20 370 C 60 270, 130 330, 210 230 C 280 140, 330 90, 420 30', stroke: '#fef08a', w: 1.6, op: 0.9 },
                { d: 'M -20 360 C 62 263, 132 323, 212 225 C 282 136, 332 87, 422 28', stroke: '#fde047', w: 1.2, op: 0.8 },
                { d: 'M -20 350 C 64 256, 134 316, 214 220 C 284 132, 334 84, 424 26', stroke: '#facc15', w: 1.0, op: 0.7 },
                { d: 'M -20 340 C 66 249, 136 309, 216 215 C 286 128, 336 81, 426 24', stroke: '#fbbf24', w: 0.9, op: 0.65 },
                { d: 'M -20 330 C 68 242, 138 302, 218 210 C 288 124, 338 78, 428 22', stroke: '#f59e0b', w: 0.8, op: 0.6 },
                { d: 'M -20 320 C 70 235, 140 295, 220 205 C 290 120, 340 75, 430 20', stroke: '#fb923c', w: 0.7, op: 0.55 },
                { d: 'M -20 310 C 72 228, 142 288, 222 200 C 292 116, 342 72, 432 18', stroke: '#fde047', w: 0.7, op: 0.5 },
                { d: 'M -20 300 C 74 221, 144 281, 224 195 C 294 112, 344 69, 434 16', stroke: '#fef08a', w: 0.6, op: 0.45 },
                { d: 'M -20 290 C 76 214, 146 274, 226 190 C 296 108, 346 66, 436 14', stroke: '#fde047', w: 0.6, op: 0.4 },
                { d: 'M -20 280 C 78 207, 148 267, 228 185 C 298 104, 348 63, 438 12', stroke: '#f59e0b', w: 0.5, op: 0.35 },
                { d: 'M -20 270 C 80 200, 150 260, 230 180 C 300 100, 350 60, 440 10', stroke: '#fb923c', w: 0.5, op: 0.3 },
              ].map((line, i) => (
                <path key={i} d={line.d} stroke={line.stroke} strokeWidth={line.w} strokeOpacity={line.op} />
              ))}
            </g>

            <g className="anim-pulse-glow">
              <path
                d="M 120 290 C 180 230, 230 180, 290 120"
                stroke="#ffffff"
                strokeWidth="2.5"
                filter="url(#goldBloom)"
                strokeLinecap="round"
              />
              <circle cx="210" cy="220" r="3" fill="#ffffff" filter="url(#goldBloom)" />
            </g>
          </svg>
        </div>

        {/* SCREEN 2 (TOP-RIGHT): Mint & Cyan Infinity Ribbon Swirls with Stardust */}
        <div
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.025] hover:shadow-2xl shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #06182c 0%, #03101f 50%, #082238 100%)',
            boxShadow: hoveredIndex === 1
              ? '0 0 25px rgba(56, 189, 248, 0.45), inset 0 0 15px rgba(64, 224, 208, 0.25)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="absolute inset-0 rounded-2xl border-[1.5px] border-[#38bdf8]/80 group-hover:border-[#67e8f9] transition-colors pointer-events-none z-20 shadow-[inset_0_0_8px_rgba(56,189,248,0.35)] anim-border-breath" />
          <div className="absolute inset-[3px] rounded-[13px] border border-[#67e8f9]/20 pointer-events-none z-20" />

          <svg className="w-full h-full object-cover select-none" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mintLoopGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#40E0D0" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#80f1b9" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="mintLoopGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0f766e" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="stardustGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="#67e8f9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </radialGradient>
              <filter id="mintBloom" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="ambientCyan" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>

            <circle cx="200" cy="200" r="130" fill="#0284c7" opacity="0.18" filter="url(#ambientCyan)" className="anim-pulse-glow" />
            <circle cx="260" cy="120" r="90" fill="#40E0D0" opacity="0.15" filter="url(#ambientCyan)" className="anim-pulse-glow" style={{ animationDelay: '2s' }} />

            <path
              className="anim-wave-reverse"
              d="M 50 360 C 120 280, 80 140, 180 90 C 280 40, 360 110, 340 230 C 320 350, 180 340, 220 210 C 240 140, 320 90, 380 60 L 390 120 C 330 160, 280 220, 260 280 C 230 370, 110 390, 50 360 Z"
              fill="url(#mintLoopGrad2)"
              opacity="0.65"
            />
            <path
              className="anim-wave-breath"
              d="M 20 280 C 80 180, 160 140, 240 80 C 310 30, 380 50, 380 140 C 380 230, 280 260, 200 310 C 120 360, 60 380, 20 280 Z"
              fill="url(#mintLoopGrad1)"
              filter="url(#mintBloom)"
            />
            <path
              className="anim-wave-slow"
              d="M 80 80 C 160 120, 220 240, 320 290 C 390 320, 420 260, 380 180 C 320 80, 210 50, 80 80 Z"
              fill="url(#mintLoopGrad2)"
              opacity="0.55"
            />

            <g className="anim-pulse-glow">
              <path d="M 60 220 C 130 150, 250 160, 340 100" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.9" filter="url(#mintBloom)" />
              <path d="M 90 260 C 160 190, 270 200, 360 140" stroke="#67e8f9" strokeWidth="1.5" strokeOpacity="0.8" />
              <path d="M 120 300 C 190 230, 290 230, 380 170" stroke="#80f1b9" strokeWidth="1.2" strokeOpacity="0.7" />
            </g>

            {[
              { cx: 90, cy: 110, r: 2.2, op: 0.9, anim: 'anim-star-fast' },
              { cx: 120, cy: 85, r: 1.5, op: 0.8, anim: 'anim-star-slow' },
              { cx: 160, cy: 130, r: 2.8, op: 0.95, anim: 'anim-star-fast' },
              { cx: 210, cy: 70, r: 1.8, op: 0.7, anim: 'anim-star-slow' },
              { cx: 250, cy: 110, r: 3.0, op: 1.0, anim: 'anim-star-fast' },
              { cx: 290, cy: 90, r: 2.0, op: 0.85, anim: 'anim-star-slow' },
              { cx: 330, cy: 140, r: 1.6, op: 0.75, anim: 'anim-star-fast' },
              { cx: 350, cy: 190, r: 2.4, op: 0.9, anim: 'anim-star-slow' },
              { cx: 310, cy: 230, r: 1.8, op: 0.8, anim: 'anim-star-fast' },
              { cx: 270, cy: 260, r: 2.5, op: 0.95, anim: 'anim-star-slow' },
              { cx: 240, cy: 310, r: 1.7, op: 0.75, anim: 'anim-star-fast' },
              { cx: 190, cy: 290, r: 2.2, op: 0.85, anim: 'anim-star-slow' },
              { cx: 150, cy: 330, r: 1.4, op: 0.65, anim: 'anim-star-fast' },
              { cx: 110, cy: 270, r: 2.0, op: 0.8, anim: 'anim-star-slow' },
              { cx: 70, cy: 240, r: 1.5, op: 0.7, anim: 'anim-star-fast' },
              { cx: 220, cy: 180, r: 3.5, op: 1.0, anim: 'anim-star-fast' },
              { cx: 180, cy: 210, r: 2.0, op: 0.85, anim: 'anim-star-slow' },
              { cx: 260, cy: 200, r: 2.2, op: 0.9, anim: 'anim-star-fast' },
            ].map((star, idx) => (
              <g key={idx} className={star.anim} style={{ animationDelay: `${(idx % 5) * 0.4}s` }}>
                <circle cx={star.cx} cy={star.cy} r={star.r * 2} fill="url(#stardustGlow)" opacity={star.op * 0.8} />
                <circle cx={star.cx} cy={star.cy} r={star.r} fill="#ffffff" opacity={star.op} />
              </g>
            ))}

            <g className="anim-star-spin" style={{ transformOrigin: '250px 110px' }}>
              <path d="M 250 102 L 250 118 M 242 110 L 258 110" stroke="#ffffff" strokeWidth="1.4" opacity="0.95" />
            </g>
            <g className="anim-star-spin" style={{ transformOrigin: '220px 180px', animationDirection: 'reverse', animationDuration: '20s' }}>
              <path d="M 220 172 L 220 188 M 212 180 L 228 180" stroke="#ffffff" strokeWidth="1.4" opacity="0.95" />
            </g>
          </svg>
        </div>

        {/* SCREEN 3 (BOTTOM-LEFT): Dual Flowing Silk Waves (Cyan & Sunset Coral) */}
        <div
          onMouseEnter={() => setHoveredIndex(2)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.025] hover:shadow-2xl shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #07152d 0%, #030c1c 50%, #0c1a36 100%)',
            boxShadow: hoveredIndex === 2
              ? '0 0 25px rgba(56, 189, 248, 0.4), inset 0 0 15px rgba(251, 146, 60, 0.2)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="absolute inset-0 rounded-2xl border-[1.5px] border-[#38bdf8]/75 group-hover:border-[#7dd3fc] transition-colors pointer-events-none z-20 shadow-[inset_0_0_8px_rgba(56,189,248,0.3)] anim-border-breath" />
          <div className="absolute inset-[3px] rounded-[13px] border border-[#7dd3fc]/20 pointer-events-none z-20" />

          <svg className="w-full h-full object-cover select-none" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyanSilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="coralSilkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#fb923c" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#fde047" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
              </linearGradient>
              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="coralGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <circle cx="120" cy="240" r="110" fill="#0284c7" opacity="0.14" className="anim-pulse-glow" />
            <circle cx="300" cy="280" r="100" fill="#ea580c" opacity="0.12" className="anim-pulse-glow" style={{ animationDelay: '1.8s' }} />

            <path
              className="anim-wave-slow"
              d="M -30 200 C 60 120, 140 280, 240 180 C 320 90, 360 220, 440 140 L 430 220 C 350 280, 300 160, 220 250 C 140 330, 50 180, -30 270 Z"
              fill="url(#cyanSilkGrad)"
              filter="url(#cyanGlow)"
            />
            <path
              className="anim-wave-reverse"
              d="M -20 330 C 70 240, 160 380, 260 260 C 330 180, 370 300, 430 230 L 420 320 C 360 380, 310 260, 230 350 C 150 420, 60 320, -20 390 Z"
              fill="url(#coralSilkGrad)"
              filter="url(#coralGlow)"
            />

            <g className="anim-wire-flow">
              {[
                { d: 'M -20 180 C 70 100, 150 260, 250 160 C 330 80, 370 200, 430 120', stroke: '#7dd3fc', w: 1.5, op: 0.9 },
                { d: 'M -20 195 C 72 115, 152 272, 252 172 C 332 92, 372 210, 432 132', stroke: '#38bdf8', w: 1.2, op: 0.75 },
                { d: 'M -20 210 C 74 130, 154 284, 254 184 C 334 104, 374 220, 434 144', stroke: '#0ea5e9', w: 1.0, op: 0.65 },
                { d: 'M -20 225 C 76 145, 156 296, 256 196 C 336 116, 376 230, 436 156', stroke: '#bae6fd', w: 0.8, op: 0.55 },
                { d: 'M -20 240 C 78 160, 158 308, 258 208 C 338 128, 378 240, 438 168', stroke: '#fdba74', w: 0.8, op: 0.5 },
                { d: 'M -20 255 C 80 175, 160 320, 260 220 C 340 140, 380 250, 440 180', stroke: '#fb923c', w: 1.0, op: 0.65 },
                { d: 'M -20 270 C 82 190, 162 332, 262 232 C 342 152, 382 260, 442 192', stroke: '#f97316', w: 1.2, op: 0.75 },
                { d: 'M -20 285 C 84 205, 164 344, 264 244 C 344 164, 384 270, 444 204', stroke: '#ea580c', w: 1.4, op: 0.85 },
              ].map((line, i) => (
                <path key={i} d={line.d} stroke={line.stroke} strokeWidth={line.w} strokeOpacity={line.op} />
              ))}
            </g>

            <path
              className="anim-pulse-glow"
              d="M 50 140 C 130 260, 230 180, 330 110"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#cyanGlow)"
            />
          </svg>
        </div>

        {/* SCREEN 4 (BOTTOM-RIGHT): Golden Green Intertwined Energy with Matrix Code */}
        <div
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.025] hover:shadow-2xl shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #071528 0%, #030e1c 50%, #091c1d 100%)',
            boxShadow: hoveredIndex === 3
              ? '0 0 25px rgba(250, 204, 21, 0.4), inset 0 0 15px rgba(74, 222, 128, 0.25)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="absolute inset-0 rounded-2xl border-[1.5px] border-[#eab308]/75 group-hover:border-[#fde047] transition-colors pointer-events-none z-20 shadow-[inset_0_0_8px_rgba(234,179,8,0.3)] anim-border-breath" />
          <div className="absolute inset-[3px] rounded-[13px] border border-[#fde047]/20 pointer-events-none z-20" />

          <svg className="w-full h-full object-cover select-none" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="electricGreenGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#4ade80" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#80f1b9" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="electricGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#eab308" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.35" />
              </linearGradient>
              <filter id="energyBloom" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {[
              { x: 70, y1: 180, y2: 280, op: 0.35, delay: '0s' },
              { x: 95, y1: 200, y2: 320, op: 0.45, delay: '0.6s' },
              { x: 120, y1: 160, y2: 290, op: 0.3, delay: '1.2s' },
              { x: 145, y1: 210, y2: 330, op: 0.4, delay: '0.3s' },
              { x: 260, y1: 170, y2: 300, op: 0.35, delay: '0.9s' },
              { x: 285, y1: 190, y2: 340, op: 0.5, delay: '1.5s' },
              { x: 310, y1: 220, y2: 310, op: 0.4, delay: '0.4s' },
              { x: 335, y1: 180, y2: 270, op: 0.3, delay: '1.1s' },
              { x: 360, y1: 200, y2: 290, op: 0.35, delay: '0.7s' },
            ].map((col, idx) => (
              <g key={idx}>
                <line
                  className="anim-data-rain"
                  style={{ animationDelay: col.delay }}
                  x1={col.x}
                  y1={col.y1}
                  x2={col.x}
                  y2={col.y2}
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeDasharray="4 8"
                  strokeOpacity={col.op}
                />
                <circle cx={col.x} cy={col.y1 + 25} r="1.3" fill="#ffffff" className="anim-star-fast" style={{ animationDelay: col.delay }} opacity={col.op * 1.5} />
                <circle cx={col.x} cy={col.y1 + 65} r="1.6" fill="#80f1b9" className="anim-star-slow" style={{ animationDelay: col.delay }} opacity={col.op * 1.8} />
              </g>
            ))}

            <g className="anim-wire-flow">
              {[
                { d: 'M -30 380 C 80 340, 180 370, 290 280 C 350 220, 390 140, 440 80', stroke: '#4ade80', op: 0.35 },
                { d: 'M -30 365 C 80 325, 180 355, 290 268 C 350 210, 390 135, 440 75', stroke: '#80f1b9', op: 0.4 },
                { d: 'M -30 350 C 80 310, 180 340, 290 256 C 350 200, 390 130, 440 70', stroke: '#fde047', op: 0.45 },
                { d: 'M -30 335 C 80 295, 180 325, 290 244 C 350 190, 390 125, 440 65', stroke: '#facc15', op: 0.5 },
                { d: 'M -30 320 C 80 280, 180 310, 290 232 C 350 180, 390 120, 440 60', stroke: '#eab308', op: 0.55 },
              ].map((line, i) => (
                <path key={i} d={line.d} stroke={line.stroke} strokeWidth="0.8" strokeOpacity={line.op} />
              ))}
            </g>

            <path
              className="anim-wave-breath"
              d="M -20 320 C 80 200, 160 340, 270 190 C 340 100, 380 240, 430 180 L 420 240 C 370 290, 330 160, 260 250 C 160 390, 70 260, -20 370 Z"
              fill="url(#electricGreenGrad)"
              filter="url(#energyBloom)"
            />
            <path
              className="anim-wave-slow"
              d="M -30 240 C 90 120, 170 300, 280 130 C 350 20, 380 180, 430 110 L 420 170 C 370 230, 330 90, 260 190 C 160 340, 70 180, -30 290 Z"
              fill="url(#electricGoldGrad)"
              filter="url(#energyBloom)"
            />

            <g className="anim-pulse-glow">
              <path
                d="M -10 270 C 90 160, 170 310, 280 160 C 350 60, 380 200, 430 140"
                stroke="#ffffff"
                strokeWidth="2.8"
                filter="url(#energyBloom)"
                strokeLinecap="round"
              />
              <path
                d="M -10 230 C 80 280, 180 180, 270 260 C 340 320, 390 190, 430 230"
                stroke="#80f1b9"
                strokeWidth="2.2"
                filter="url(#energyBloom)"
                strokeLinecap="round"
              />
            </g>

            <circle cx="140" cy="245" r="4.5" fill="#ffffff" filter="url(#energyBloom)" className="anim-star-fast" />
            <circle cx="275" cy="170" r="5" fill="#ffffff" filter="url(#energyBloom)" className="anim-star-fast" style={{ animationDelay: '0.8s' }} />
            <circle cx="365" cy="180" r="3.5" fill="#fde047" filter="url(#energyBloom)" className="anim-star-slow" style={{ animationDelay: '1.4s' }} />
          </svg>
        </div>

      </div>
    </div>
  );
};
