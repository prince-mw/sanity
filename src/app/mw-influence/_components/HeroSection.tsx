'use client';

import React, { useState } from 'react';
import { Radio, Calendar, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';
import { InfluenceGeometry } from './brand/InfluenceGeometry';

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

// Highlights the closing word "Valuable" in the same cyan-to-blue gradient used for
// "Prove It." on the MW Measure hero — falls back to plain text if the CMS copy changes.
function renderTitle(title: string) {
  const marker = 'Valuable';
  const idx = title.lastIndexOf(marker);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">
        {marker}
      </span>
      {title.slice(idx + marker.length)}
    </>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'MW Influence',
  title = 'Make Every OOH Slot More Valuable.',
  subtitle = 'Automatically allocate every available slot to the highest-value demand while protecting guaranteed campaigns and maximizing network revenue.',
}) => {
  const [selectedScreenNode, setSelectedScreenNode] = useState('tokyo');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1d4a] via-[#13245d] to-[#182b6e] text-white pt-20 sm:pt-16 lg:pt-20 pb-12 lg:pb-16" id="hero-section">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#182b6e]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#22d3ee]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          <div className="lg:col-span-5 space-y-6 sm:space-y-8 z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-blue-200 text-xs font-semibold tracking-wide shadow-sm" id="hero-badge">
              <div className="w-5 h-5 rounded-full bg-[#0b162c] flex items-center justify-center shrink-0">
                <InfluenceGeometry className="w-3 h-3 text-white" />
              </div>
              <span className="font-sans uppercase tracking-wider text-[11px] text-blue-100">
                {badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] font-sans">
              {renderTitle(title)}
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
              {subtitle}
            </p>

            <div className="pt-2 text-center lg:text-left">
              <CTAButton
                href="/contact"
                className="bg-white hover:bg-gray-100 text-[#14235d] font-semibold text-[15px] px-8 py-3.5 rounded-lg shadow-precision-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer active:scale-[0.98]"
                id="hero-see-action-btn"
              >
                <span>See Influence in Action</span>
              </CTAButton>
            </div>
          </div>

          {/* Live OOH Network Optimization widget */}
          <div className="lg:col-span-7 w-full">
            <div className="w-full bg-[#0f1d4a]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#182b6e] flex items-center justify-center border border-white/10">
                    <Radio className="w-4 h-4 text-[#22d3ee]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white flex items-center gap-2">
                      OOH Network Optimization
                      <span className="text-[10px] bg-[#34d399]/20 text-[#34d399] px-2 py-0.5 rounded font-medium">LIVE OPTIMIZING</span>
                    </div>
                    <div className="text-xs text-blue-200/60 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Dynamic Allocation Engine v4.8
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-xs text-blue-100 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-[#22d3ee]" />
                    <span>Dec 23, 2025</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-xs font-bold ring-2 ring-white/20">
                    MW
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mb-4">

                {/* Network Inventory & Nodes */}
                <div className="md:col-span-4 bg-[#13245d] border border-white/10 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-200">Network Inventory &amp; Nodes</span>
                    <span className="text-[10px] text-gray-400">12 Nodes</span>
                  </div>

                  <div className="space-y-2">
                    <div
                      onClick={() => setSelectedScreenNode('tokyo')}
                      className={`p-2 rounded-lg cursor-pointer transition-all border ${selectedScreenNode === 'tokyo' ? 'bg-[#182b6e] border-[#22d3ee]' : 'bg-[#0b162c] border-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-white">Tokyo Square LED</span>
                        <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded text-[9px] font-bold">12 Avail</span>
                      </div>
                      <div className="text-[10px] text-blue-200/70 mt-1 flex justify-between">
                        <span>High Demand Node</span>
                        <span className="text-emerald-400 font-medium">96% Fill</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedScreenNode('times-square')}
                      className={`p-2 rounded-lg cursor-pointer transition-all border ${selectedScreenNode === 'times-square' ? 'bg-[#182b6e] border-[#22d3ee]' : 'bg-[#0b162c] border-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-white">Times Square (NYC)</span>
                        <span className="bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded text-[9px] font-bold">8 Avail</span>
                      </div>
                      <div className="text-[10px] text-blue-200/70 mt-1 flex justify-between">
                        <span>Prime Highway P4</span>
                        <span className="text-emerald-400 font-medium">98% Fill</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedScreenNode('shibuya')}
                      className={`p-2 rounded-lg cursor-pointer transition-all border ${selectedScreenNode === 'shibuya' ? 'bg-[#182b6e] border-[#22d3ee]' : 'bg-[#0b162c] border-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-white">Shibuya Crossing Mega</span>
                        <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded text-[9px] font-bold">2 Avail</span>
                      </div>
                      <div className="text-[10px] text-blue-200/70 mt-1 flex justify-between">
                        <span>Full Peak Pacing</span>
                        <span className="text-emerald-400 font-medium">100% Fill</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Slots vs Campaign Demand */}
                <div className="md:col-span-5 bg-[#13245d] border border-white/10 rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-blue-200">Available Slots vs Campaign Demand</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-blue-200/70 mb-2">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22d3ee]" /> Available Slots</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#a5b4fc]" /> Campaign Demand</span>
                    </div>
                  </div>

                  <div className="relative h-24 w-full mt-1">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="availGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" />
                      <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" />

                      <path d="M0,65 Q30,60 60,35 T120,20 T170,10 L200,5 L200,80 L0,80 Z" fill="url(#demandGrad)" />
                      <path d="M0,65 Q30,60 60,35 T120,20 T170,10 L200,5" fill="none" stroke="#a5b4fc" strokeWidth="2" />

                      <path d="M0,50 Q40,55 80,45 T140,30 T200,25 L200,80 L0,80 Z" fill="url(#availGrad)" />
                      <path d="M0,50 Q40,55 80,45 T140,30 T200,25" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                    </svg>

                    <div className="absolute top-1 right-2 bg-[#182b6e] border border-[#22d3ee] px-2 py-0.5 rounded text-[9px] text-[#34d399] font-semibold flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-2.5 h-2.5 text-[#22d3ee]" />
                      <span>Peak: 100% Allocated</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                    <span>06:00</span>
                    <span>10:00</span>
                    <span>14:00</span>
                    <span>18:00</span>
                    <span>22:00</span>
                  </div>
                </div>

                {/* Revenue Opportunity & Lift */}
                <div className="md:col-span-3 bg-[#13245d] border border-white/10 rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-200">Revenue Opportunity &amp; Lift</span>
                    <div className="mt-1">
                      <div className="text-[10px] text-gray-400">Total Opportunity</div>
                      <div className="text-lg font-bold text-white tracking-tight">$1.2M</div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#34d399] mt-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>+18% vs Last Period</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-16 flex items-end gap-1.5 pt-2">
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-blue-400/30 rounded-t h-7" />
                      <span className="text-[8px] text-gray-400">W1</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-blue-400/50 rounded-t h-9" />
                      <span className="text-[8px] text-gray-400">W2</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-blue-400/70 rounded-t h-12" />
                      <span className="text-[8px] text-gray-400">W3</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-gradient-to-t from-[#22d3ee] to-[#34d399] rounded-t h-16 shadow-lg shadow-[#22d3ee]/30" />
                      <span className="text-[8px] text-[#34d399] font-bold">W4</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mb-4">

                {/* Allocation Status */}
                <div className="md:col-span-5 bg-[#13245d] border border-white/10 rounded-xl p-3.5">
                  <div className="text-xs font-semibold text-blue-200 mb-2.5">Allocation Status</div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-blue-100 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#22d3ee]" /> Guaranteed Campaigns
                        </span>
                        <span className="font-bold text-white">75%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#22d3ee] rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-blue-100 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#34d399]" /> Programmatic Demand
                        </span>
                        <span className="font-bold text-white">15%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#34d399] rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-blue-100 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#fbbf24]" /> Direct Sales / House
                        </span>
                        <span className="font-bold text-white">10%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#fbbf24] rounded-full" style={{ width: '10%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-Time Delivery Status */}
                <div className="md:col-span-7 bg-[#13245d] border border-white/10 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-200">Real-Time Delivery Status</span>
                    <span className="text-[10px] text-[#22d3ee] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Auto-sync 2s
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="font-medium text-white">Campaign #1492</span>
                        <span className="text-gray-400 text-[10px]">(Tokyo)</span>
                      </div>
                      <span className="text-[#34d399] font-bold text-[10px] bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                        Delivered 98%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                        <span className="font-medium text-white">Campaign #1820</span>
                        <span className="text-gray-400 text-[10px]">(Global Airlines)</span>
                      </div>
                      <span className="text-[#22d3ee] font-bold text-[10px] bg-blue-950/50 px-2 py-0.5 rounded border border-blue-500/30">
                        Optimizing Delivery
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                        <span className="font-medium text-white">Campaign #1203</span>
                        <span className="text-gray-400 text-[10px]">(LA Sunset)</span>
                      </div>
                      <span className="text-gray-300 font-bold text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-white/10">
                        Complete
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-white/10 text-center">
                <div className="bg-[#13245d]/70 p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-300">Total Screens Managed</div>
                  <div className="text-base sm:text-xl font-bold text-white tracking-tight mt-0.5">1,540</div>
                </div>
                <div className="bg-[#13245d]/70 p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-300">Impressions Delivered (Today)</div>
                  <div className="text-base sm:text-xl font-bold text-[#22d3ee] tracking-tight mt-0.5">15.4M</div>
                </div>
                <div className="bg-[#13245d]/70 p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-300">Fill Rate</div>
                  <div className="text-base sm:text-xl font-bold text-[#34d399] tracking-tight mt-0.5">92%</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
