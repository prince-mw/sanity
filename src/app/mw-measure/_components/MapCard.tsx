'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Users, MapPin, TrendingUp, Layers } from 'lucide-react';
import { MAP_LOCATIONS } from './mockData';
import { MapBillboardLocation } from './types';

export const MapCard: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapBillboardLocation | null>(MAP_LOCATIONS[0]);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [liveImpressions, setLiveImpressions] = useState(12418300);
  const [isLiveActive, setIsLiveActive] = useState(true);

  // Subtle real-time live ticker
  useEffect(() => {
    if (!isLiveActive) return;
    const interval = setInterval(() => {
      setLiveImpressions((prev) => prev + Math.floor(Math.random() * 14) + 6);
    }, 2400);
    return () => clearInterval(interval);
  }, [isLiveActive]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-blue-400/20 bg-slate-900/90 backdrop-blur-md text-white select-none">

      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#172765]/90 border-b border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE CAMPAIGN</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-wide">Q3 Global Tech Launch</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
              showHeatmap
                ? 'bg-blue-600/40 text-blue-200 border border-blue-400/30'
                : 'bg-slate-800/60 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
            title="Toggle Footfall Heatmap"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Density Heatmap</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-[#a7c5eb] overflow-hidden">

        {/* Vector Stylized Map Background (New York, Manhattan, Hudson River, Brooklyn) */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8fb5e8" />
              <stop offset="100%" stopColor="#76a3de" />
            </linearGradient>

            <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2ecf9" />
              <stop offset="100%" stopColor="#d2e2f6" />
            </linearGradient>

            <radialGradient id="heatMidtown" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.45)" />
              <stop offset="40%" stopColor="rgba(168, 85, 247, 0.3)" />
              <stop offset="75%" stopColor="rgba(59, 130, 246, 0.15)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </radialGradient>

            <radialGradient id="heatFiDi" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.4)" />
              <stop offset="50%" stopColor="rgba(99, 102, 241, 0.25)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
            </radialGradient>
          </defs>

          <rect width="800" height="500" fill="url(#waterGrad)" />

          <path
            d="M 0 0 L 290 0 C 285 80, 275 140, 280 200 C 290 260, 260 330, 240 390 C 220 450, 180 500, 150 500 L 0 500 Z"
            fill="url(#landGrad)"
            stroke="#b8d1f0"
            strokeWidth="1.5"
          />

          <path
            d="M 470 0 C 510 50, 525 100, 520 180 C 515 250, 480 320, 440 380 C 420 410, 390 440, 375 435 C 360 415, 375 350, 400 270 C 420 200, 430 130, 440 0 Z"
            fill="url(#landGrad)"
            stroke="#a9c7ec"
            strokeWidth="1.5"
          />

          <path
            d="M 570 0 C 550 80, 560 140, 545 200 C 520 270, 480 330, 460 370 C 480 400, 550 430, 640 450 C 720 470, 800 480, 800 480 L 800 0 Z"
            fill="url(#landGrad)"
            stroke="#a9c7ec"
            strokeWidth="1.5"
          />

          <path
            d="M 230 460 C 250 440, 290 450, 280 480 C 265 500, 210 500, 230 460 Z"
            fill="url(#landGrad)"
            stroke="#b8d1f0"
          />

          <path d="M 425 385 C 470 385, 520 375, 550 370" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="4 2" />
          <path d="M 430 365 C 480 360, 530 345, 560 340" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M 455 310 C 500 295, 540 280, 570 275" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 490 170 C 530 165, 580 155, 620 150" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 275 225 C 330 225, 380 230, 435 235" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
          <path d="M 255 345 C 310 345, 360 350, 410 360" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

          <g stroke="#ffffff" strokeWidth="1" opacity="0.6">
            <line x1="450" y1="40" x2="490" y2="70" />
            <line x1="440" y1="90" x2="505" y2="135" />
            <line x1="430" y1="140" x2="515" y2="200" />
            <line x1="420" y1="190" x2="510" y2="260" />
            <line x1="410" y1="240" x2="490" y2="310" />
            <line x1="395" y1="290" x2="470" y2="350" />
            <line x1="385" y1="340" x2="445" y2="390" />

            <path d="M 455 30 C 475 150, 460 270, 415 410" fill="none" strokeWidth="1.5" />
            <path d="M 470 40 C 490 160, 475 280, 430 415" fill="none" strokeWidth="1.5" />
            <path d="M 485 50 C 505 170, 490 290, 445 400" fill="none" strokeWidth="1" />
          </g>

          <rect x="462" y="75" width="28" height="65" rx="3" fill="#b9dfbe" stroke="#97c89d" strokeWidth="1" opacity="0.9" />

          {showHeatmap && (
            <g>
              <circle cx="465" cy="180" r="85" fill="url(#heatMidtown)" />
              <circle cx="410" cy="370" r="65" fill="url(#heatFiDi)" />
              <circle cx="250" cy="270" r="45" fill="url(#heatFiDi)" opacity="0.7" />
              <circle cx="560" cy="160" r="50" fill="url(#heatMidtown)" opacity="0.6" />
            </g>
          )}

          <text x="450" y="240" fill="#1e3a8a" fontSize="18" fontWeight="800" opacity="0.85" letterSpacing="0.5">New York</text>
          <text x="445" y="155" fill="#3b82f6" fontSize="9" fontWeight="600" opacity="0.9">MIDTOWN MANHATTAN</text>
          <text x="400" y="325" fill="#3b82f6" fontSize="9" fontWeight="600" opacity="0.85">Washington Square Park</text>
          <text x="405" y="380" fill="#1e40af" fontSize="9" fontWeight="700" opacity="0.85">FINANCIAL DISTRICT</text>
          <text x="170" y="270" fill="#1e3a8a" fontSize="14" fontWeight="700" opacity="0.8">Jersey City</text>
          <text x="160" y="295" fill="#64748b" fontSize="8" fontWeight="600">Newport Centre</text>
          <text x="170" y="380" fill="#047857" fontSize="8" fontWeight="600">Liberty State Park</text>
          <text x="320" y="420" fill="#0369a1" fontSize="9" fontWeight="600" fontStyle="italic">Hudson River</text>
          <text x="600" y="125" fill="#1e40af" fontSize="10" fontWeight="700">LONG ISLAND CITY</text>
          <text x="590" y="270" fill="#1e3a8a" fontSize="13" fontWeight="700">Brooklyn</text>
          <text x="600" y="330" fill="#047857" fontSize="8" fontWeight="600">Maria Hernandez Park</text>
          <text x="635" y="65" fill="#0284c7" fontSize="9" fontWeight="600">LaGuardia Airport</text>
        </svg>

        {/* Dynamic Interactive Billboard Pins */}
        {MAP_LOCATIONS.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          return (
            <div
              key={loc.id}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => setSelectedLocation(loc)}
            >
              <div className="absolute -inset-3 rounded-full bg-cyan-500/40 animate-ping-slow pointer-events-none"></div>
              <div className="absolute -inset-1.5 rounded-full bg-cyan-500/60 pointer-events-none"></div>

              <div className={`relative w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-transform ${
                isSelected ? 'bg-blue-600 scale-125 ring-4 ring-cyan-400/40' : 'bg-indigo-700 hover:scale-110'
              }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none whitespace-nowrap">
                <div className="bg-slate-950/95 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md shadow-xl border border-slate-700">
                  <div className="font-bold text-cyan-400">{loc.name}</div>
                  <div className="text-slate-300 text-[10px]">{loc.impressions} Impr. · {loc.reach} Reach</div>
                </div>
              </div>
            </div>
          );
        })}

        {selectedLocation && (
          <div className="absolute top-3 right-3 z-30 max-w-[210px] bg-slate-950/90 backdrop-blur-md rounded-xl p-3 border border-cyan-500/40 shadow-xl text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Verified Node</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans">Active</span>
            </div>
            <div className="text-xs font-bold text-white line-clamp-1">{selectedLocation.name}</div>
            <div className="text-[10px] text-slate-400 mb-2">{selectedLocation.format}</div>
            <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-800 text-[10px]">
              <div>
                <div className="text-slate-400 text-[9px]">Impressions</div>
                <div className="font-bold text-white font-sans">{selectedLocation.impressions}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[9px]">Audience</div>
                <div className="font-bold text-white font-sans">{selectedLocation.reach}</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom KPI Bar */}
      <div className="grid grid-cols-4 divide-x divide-blue-800/40 bg-[#13235d] px-2 sm:px-4 py-3.5 text-center">

        <div className="px-2">
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-blue-200/90 font-medium mb-0.5">
            <Eye className="w-3.5 h-3.5 text-blue-300" />
            <span>Impressions</span>
          </div>
          <div className="text-base sm:text-2xl font-black tracking-tight text-white font-sans">
            {(liveImpressions / 1000000).toFixed(1)}M
          </div>
        </div>

        <div className="px-2">
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-blue-200/90 font-medium mb-0.5">
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span>Reach</span>
          </div>
          <div className="text-base sm:text-2xl font-black tracking-tight text-white font-sans">
            3.2M
          </div>
        </div>

        <div className="px-2">
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-blue-200/90 font-medium mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-blue-300" />
            <span>Locations</span>
          </div>
          <div className="text-base sm:text-2xl font-black tracking-tight text-white font-sans">
            847
          </div>
        </div>

        <div className="px-2">
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-cyan-300/90 font-medium mb-0.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lift</span>
          </div>
          <div className="text-base sm:text-2xl font-black tracking-tight text-cyan-400 font-sans">
            +23%
          </div>
        </div>

      </div>

    </div>
  );
};
