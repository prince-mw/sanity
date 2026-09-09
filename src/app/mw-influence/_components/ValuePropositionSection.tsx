'use client';

import React, { useState } from 'react';
import { ShieldCheck, Zap, Sparkles, ArrowUpRight } from 'lucide-react';

export const ValuePropositionSection: React.FC = () => {
  const [activeScreenCreative, setActiveScreenCreative] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [priorityHover, setPriorityHover] = useState<number | null>(null);

  return (
    <section id="value-proposition" className="py-12 sm:py-16 lg:py-20 bg-white text-[#1b1b20]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14235d] mb-4">
            Your Inventory Is Limited. Your Demand Isn&apos;t.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Guaranteed campaigns, direct bookings, and programmatic demand all compete for the same OOH inventory.{' '}
            <strong className="font-semibold text-gray-900">
              Influence continuously makes allocation decisions using media, location and audience Signals to turn competing demand into better utilization and revenue.
            </strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD 1: What Should Run? */}
          <div className="bg-[#121f56] hover:bg-[#13245d] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-white/10 flex flex-col justify-between transition-all duration-300 group">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                What Should Run?
              </h3>
              <p className="text-sm text-blue-100/80 leading-relaxed mb-6 font-normal">
                Influence evaluates every available slot against value demand while protecting guaranteed campaigns and business rules.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 text-[#1b1b20] shadow-inner mt-4 border border-gray-100">
              <div className="text-[11px] font-bold text-center text-gray-700 uppercase tracking-wider mb-3">
                OOH Allocation: Fast-Pacing Unit
              </div>

              <div className="flex flex-col items-center mb-4">
                <div className="w-48 h-24 bg-slate-900 rounded-lg p-1.5 shadow-md border border-slate-700 relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="absolute top-1 left-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] text-gray-300 font-sans">NODE #704</span>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded shadow">
                      Campaign {activeScreenCreative} Active
                    </span>
                    <div className="text-[9px] text-[#22d3ee] mt-1 font-medium">
                      {activeScreenCreative === 'A' && 'Guaranteed Apex Flight (100% Pacing)'}
                      {activeScreenCreative === 'B' && 'Programmatic High-Bid ($42 CPM)'}
                      {activeScreenCreative === 'C' && 'Direct Booking Luxury Spot'}
                      {activeScreenCreative === 'D' && 'Retail Flash Sale Multi-Screen'}
                    </div>
                  </div>
                </div>
                <div className="w-4 h-5 bg-gray-400" />
                <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center">
                {(['A', 'B', 'C', 'D'] as const).map((camp) => (
                  <button
                    key={camp}
                    onClick={() => setActiveScreenCreative(camp)}
                    className={`p-1.5 rounded-lg border text-[10px] transition-all cursor-pointer ${activeScreenCreative === camp ? 'bg-[#0f1d4a] text-white border-[#0f1d4a] font-bold shadow' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                  >
                    <div>Camp {camp}</div>
                    <div className="text-[8px] opacity-80 mt-0.5">
                      {camp === 'A' ? 'Guar.' : camp === 'B' ? 'Prog.' : camp === 'C' ? 'Direct' : 'Promo'}
                    </div>
                  </button>
                ))}
              </div>
              <div className="text-[9px] text-center text-gray-400 mt-2">
                Click a campaign to test live allocation router
              </div>
            </div>
          </div>

          {/* CARD 2: What Should Come First? */}
          <div className="bg-[#121f56] hover:bg-[#13245d] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-white/10 flex flex-col justify-between transition-all duration-300 group">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                What Should Come First?
              </h3>
              <p className="text-sm text-blue-100/80 leading-relaxed mb-6 font-normal">
                Influence prioritizes the highest-value eligible demand while keeping guaranteed campaigns on track.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 text-[#1b1b20] shadow-inner mt-4 border border-gray-100">
              <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Campaign Priority</span>
                <span className="text-[9px] text-[#14235d] bg-blue-50 px-1.5 py-0.5 rounded font-semibold">Real-Time Queue</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase">
                      <th className="pb-1.5 font-semibold">Campaign</th>
                      <th className="pb-1.5 font-semibold">Priority</th>
                      <th className="pb-1.5 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">

                    <tr
                      onMouseEnter={() => setPriorityHover(1)}
                      onMouseLeave={() => setPriorityHover(null)}
                      className={`transition-colors ${priorityHover === 1 ? 'bg-blue-50/80' : ''}`}
                    >
                      <td className="py-2 font-medium text-gray-900 text-[11px]">Guaranteed Launch</td>
                      <td className="py-2 text-[11px] text-[#14235d] font-semibold">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#22d3ee]" />
                          <span>Protected</span>
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <span className="inline-block bg-[#34d399]/30 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      </td>
                    </tr>

                    <tr
                      onMouseEnter={() => setPriorityHover(2)}
                      onMouseLeave={() => setPriorityHover(null)}
                      className={`transition-colors ${priorityHover === 2 ? 'bg-blue-50/80' : ''}`}
                    >
                      <td className="py-2 font-medium text-gray-900 text-[11px]">Eligible Growth</td>
                      <td className="py-2 text-[11px] text-blue-700 font-semibold">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>Prioritized</span>
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <span className="inline-block bg-[#34d399]/30 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      </td>
                    </tr>

                    <tr
                      onMouseEnter={() => setPriorityHover(3)}
                      onMouseLeave={() => setPriorityHover(null)}
                      className={`transition-colors ${priorityHover === 3 ? 'bg-blue-50/80' : ''}`}
                    >
                      <td className="py-2 font-medium text-gray-700 text-[11px]">Standard Outreach</td>
                      <td className="py-2 text-[11px] text-gray-500 font-medium">Normal</td>
                      <td className="py-2 text-right">
                        <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Pending
                        </span>
                      </td>
                    </tr>

                    <tr
                      onMouseEnter={() => setPriorityHover(4)}
                      onMouseLeave={() => setPriorityHover(null)}
                      className={`transition-colors ${priorityHover === 4 ? 'bg-blue-50/80' : ''}`}
                    >
                      <td className="py-2 font-medium text-gray-600 text-[11px]">Seasonal Promo</td>
                      <td className="py-2 text-[11px] text-gray-400 font-normal">Low</td>
                      <td className="py-2 text-right">
                        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Draft
                        </span>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CARD 3: How Do You Get More From Your Inventory? */}
          <div className="bg-[#121f56] hover:bg-[#13245d] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-white/10 flex flex-col justify-between transition-all duration-300 group">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                How Do You Get More From Your Inventory?
              </h3>
              <p className="text-sm text-blue-100/80 leading-relaxed mb-6 font-normal">
                Influence automatically puts available inventory to work, improving utilization, reducing manual intervention, and increasing revenue.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 text-[#1b1b20] shadow-inner mt-4 border border-gray-100">

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center bg-gray-50/90 rounded-lg p-2.5 border border-gray-200">
                  <div className="text-xs font-bold text-gray-500 mb-2">Before</div>
                  <div className="grid grid-cols-5 gap-1 max-w-[120px] mx-auto mb-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3.5 h-3.5 rounded-full mx-auto ${
                          [1, 4, 7, 10, 15, 18].includes(i)
                            ? 'bg-blue-300'
                            : 'border-2 border-dashed border-gray-300 bg-white'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    Available Slots: <span className="font-bold text-gray-700">6/20</span>
                  </div>
                </div>

                <div className="text-center bg-blue-50/90 rounded-lg p-2.5 border border-blue-200 shadow-sm relative overflow-hidden">
                  <div className="text-xs font-bold text-[#14235d] mb-2 flex items-center justify-center gap-1">
                    <span>After</span>
                    <Sparkles className="w-3 h-3 text-[#22d3ee]" />
                  </div>
                  <div className="grid grid-cols-5 gap-1 max-w-[120px] mx-auto mb-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-3.5 rounded-full mx-auto bg-[#1e68e5] shadow-sm transition-all duration-300 hover:scale-125"
                      />
                    ))}
                  </div>
                  <div className="text-[10px] text-[#14235d] font-bold">
                    Allocated Slots: <span className="text-[#1e68e5]">20/20</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-[#34d399]/40 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                  +Utilization Up
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-[#34d399]/40 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                  +Revenue Up
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
