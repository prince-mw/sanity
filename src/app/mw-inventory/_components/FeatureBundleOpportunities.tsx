'use client';

import React, { useState } from 'react';
import { Tv, Share2 } from 'lucide-react';
import { SAMPLE_BUNDLE } from './mockData';

export const FeatureBundleOpportunities: React.FC = () => {
  const bundle = SAMPLE_BUNDLE;
  const [activeScreenIndex, setActiveScreenIndex] = useState<number | null>(null);

  return (
    <div className="py-10 sm:py-12 lg:py-14 border-t border-gray-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="bg-[#e9ecef]/60 rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-precision">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-precision font-sans">

              <div className="text-center mb-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  {bundle.name}
                </h4>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  {bundle.badge}
                </p>
              </div>

              <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-gray-50/50 to-blue-50/20 rounded-xl border border-gray-100 p-4 flex items-center justify-center overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <line x1="200" y1="120" x2="80" y2="45" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="120" x2="320" y2="45" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="120" x2="80" y2="195" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="120" x2="320" y2="195" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />

                  <circle cx="200" cy="120" r="16" fill="#062068" opacity="0.1" />
                  <circle cx="200" cy="120" r="6" fill="#062068" />
                </svg>

                <div className="absolute z-10 w-10 h-10 rounded-full bg-[#062068] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Share2 className="w-4 h-4 text-[#80f1b9]" />
                </div>

                {bundle.screens.map((screen, i) => {
                  const position = [
                    'top-4 left-4 sm:left-6',
                    'top-4 right-4 sm:right-6',
                    'bottom-4 left-4 sm:left-6',
                    'bottom-4 right-4 sm:right-6',
                  ][i];
                  return (
                    <div
                      key={screen.id}
                      onMouseEnter={() => setActiveScreenIndex(i)}
                      onMouseLeave={() => setActiveScreenIndex(null)}
                      className={`absolute ${position} transition-all duration-200 cursor-pointer ${
                        activeScreenIndex === i ? 'scale-105 z-20' : 'z-10'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-[#062068] flex items-center justify-center shadow-sm">
                          <Tv className="w-5 h-5" />
                        </div>
                        <span className="mt-1.5 text-[11px] font-medium text-gray-800 text-center whitespace-nowrap bg-white/90 px-2 py-0.5 rounded shadow-xs border border-gray-200">
                          {screen.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-medium text-gray-400">Total Reach</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{bundle.totalReach}</span>
                    <span className="text-xs text-gray-500 font-medium">Impressions / week</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium text-gray-400">Bundle Status</div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {bundle.status}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#062068] font-sans">
            Turn Assets Into Opportunities
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Group inventory into relevant commercial networks and packages when you want to sell beyond individual screens. Make it easier to create supply that matches how buyers want to buy.
          </p>
        </div>

      </div>
    </div>
  );
};
