'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp } from 'lucide-react';

const BLUEPRINT_GRID_STYLE = {
  backgroundSize: '32px 32px',
  backgroundImage:
    'linear-gradient(to right, rgba(71, 90, 162, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(71, 90, 162, 0.07) 1px, transparent 1px)',
};

const DARK_GRID_STYLE = {
  backgroundSize: '36px 36px',
  backgroundImage:
    'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
};

export const DataPlanningSection: React.FC = () => {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-[#f8f9fc] overflow-hidden border-b border-[#e2e8f0]" style={BLUEPRINT_GRID_STYLE} id="data-planning-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062068] tracking-tight leading-tight mb-4">
            Stop Guessing. Start Planning With Data.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Use live inventory, audience and location signals, and forecasting to make smarter OOH decisions before you commit budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 lg:gap-4 bg-[#08173f] rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#1a2d67] shadow-2xl text-white relative">

          {/* Card 1: Live Inventory */}
          <div className="relative flex flex-col">
            <div className="bg-[#0e2154] rounded-xl p-5 border border-[#1e3474] flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#93c5fd] uppercase block mb-1">
                  Where to Buy
                </span>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Live Inventory</h3>
                <p className="text-xs text-[#a5b4fc] mb-4">Find locations that fit your campaign.</p>

                <div className="h-32 bg-[#06122e] rounded-lg border border-[#192b5e] relative overflow-hidden flex items-center justify-center p-3 mb-4">
                  <div className="absolute inset-0 opacity-40" style={DARK_GRID_STYLE} />
                  <div className="relative w-full h-full">
                    <span className="absolute top-4 left-6 w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                    <span className="absolute top-12 left-16 w-3 h-3 rounded-full bg-[#60a5fa] shadow-[0_0_10px_#60a5fa] animate-pulse" />
                    <span className="absolute top-6 right-10 w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                    <span className="absolute bottom-6 left-20 w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                    <span className="absolute bottom-10 right-8 w-2 h-2 rounded-full bg-[#93c5fd]" />
                    <span className="absolute top-16 right-20 w-2 h-2 rounded-full bg-[#a78bfa]" />
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="25%" y1="35%" x2="40%" y2="70%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                      <line x1="40%" y1="70%" x2="75%" y2="40%" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1a2d67] flex items-center justify-between text-xs">
                <span className="text-[#889bcc] text-[11px]">Filtered Sites</span>
                <span className="font-sans font-semibold text-white bg-[#142861] px-2 py-0.5 rounded border border-[#233c82]">
                  1,245 available
                </span>
              </div>
            </div>

            <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#1b347a] border-2 border-[#08173f] text-[#38bdf8] items-center justify-center shadow-lg">
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          {/* Card 2: Audience Insights */}
          <div className="relative flex flex-col">
            <div className="bg-[#0e2154] rounded-xl p-5 border border-[#1e3474] flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#93c5fd] uppercase block mb-1">
                  Who to Reach
                </span>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Audience Insights</h3>
                <p className="text-xs text-[#a5b4fc] mb-4">Understand who your locations can reach.</p>

                <div className="space-y-2.5 mb-4">
                  <div className="bg-[#06122e] rounded-lg p-3 border border-[#192b5e] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#889bcc] uppercase font-medium">Target Affix Index</div>
                      <div className="text-xs text-[#cbd5e1] mt-0.5">High Income Indexing</div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-400 font-sans bg-[#06322b] px-3 py-1 rounded border border-[#0d594b]">
                      142
                    </div>
                  </div>

                  <div className="bg-[#06122e] rounded-lg p-3 border border-[#192b5e] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#889bcc] uppercase font-medium">Audience Concentration</div>
                      <div className="text-xs text-[#cbd5e1] mt-0.5">Prime CBD Mobility</div>
                    </div>
                    <div className="text-sm font-bold text-emerald-400 bg-[#06322b] px-3 py-1.5 rounded border border-[#0d594b] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      High
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1a2d67] flex items-center justify-between text-xs">
                <span className="text-[#889bcc] text-[11px]">Data Source</span>
                <span className="text-[#93c5fd] font-medium text-[11px]">Telco + GPS Mobility</span>
              </div>
            </div>

            <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#1b347a] border-2 border-[#08173f] text-[#fbbf24] items-center justify-center shadow-lg">
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          {/* Card 3: Campaign Forecasts */}
          <div className="relative flex flex-col">
            <div className="bg-[#0e2154] rounded-xl p-5 border border-[#1e3474] flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#93c5fd] uppercase block mb-1">
                  What to Expect
                </span>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-1">Campaign Forecasts</h3>
                <p className="text-xs text-[#a5b4fc] mb-4">See potential reach, impressions, and frequency.</p>

                <div className="h-32 bg-[#06122e] rounded-lg border border-[#192b5e] relative overflow-hidden flex flex-col justify-between p-2.5 mb-4">
                  <div className="absolute inset-0 opacity-30" style={DARK_GRID_STYLE} />

                  <div className="flex items-center justify-between z-10">
                    <span className="text-[9px] font-sans text-[#889bcc] tracking-wider uppercase">Forecasted Reach</span>
                    <div className="bg-[#453208] text-[#fbbf24] border border-[#78540d] text-[10px] font-bold px-2 py-0.5 rounded font-sans flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>+84%</span>
                    </div>
                  </div>

                  <div className="relative w-full h-16 my-auto">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 240 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="15" x2="240" y2="15" stroke="#1b326d" strokeWidth="0.75" strokeDasharray="2 2" />
                      <line x1="0" y1="35" x2="240" y2="35" stroke="#1b326d" strokeWidth="0.75" strokeDasharray="2 2" />
                      <line x1="0" y1="55" x2="240" y2="55" stroke="#1b326d" strokeWidth="0.75" />
                      <path d="M 10 52 C 50 48, 80 38, 120 28 C 160 18, 190 12, 230 6 L 230 58 L 10 58 Z" fill="url(#forecastGradient)" />
                      <path d="M 10 52 C 50 48, 80 38, 120 28 C 160 18, 190 12, 230 6" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="10" cy="52" r="2.5" fill="#3d4d7a" stroke="#fbbf24" strokeWidth="1" />
                      <circle cx="80" cy="38" r="2.5" fill="#526394" stroke="#fbbf24" strokeWidth="1" />
                      <circle cx="150" cy="22" r="2.5" fill="#8292c4" stroke="#fbbf24" strokeWidth="1" />
                      <circle cx="230" cy="6" r="4" fill="#fbbf24" className="animate-pulse" />
                      <circle cx="230" cy="6" r="7" fill="#fbbf24" opacity="0.3" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-[#7589c7] font-sans z-10 px-1">
                    <span>W1 (1.2M)</span>
                    <span>W2 (2.4M)</span>
                    <span>W3 (3.3M)</span>
                    <span className="text-[#fbbf24] font-bold">W4 (4.2M)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1a2d67] flex items-center justify-between text-xs">
                <span className="text-[#889bcc] text-[11px] font-bold uppercase tracking-wider">Cumulative Reach Curve</span>
                <span className="font-sans font-semibold text-[#fbbf24]">4 Weeks</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
