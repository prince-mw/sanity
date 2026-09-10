'use client';

import React, { useState } from 'react';
import { Check, Layers, Users, TrendingUp, FileText, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';

const DARK_GRID_STYLE = {
  backgroundSize: '36px 36px',
  backgroundImage:
    'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
};

const ExploreLink: React.FC<{ children: React.ReactNode; id: string }> = ({ children, id }) => (
  <CTAButton
    href="/contact"
    id={id}
    className="inline-flex items-center gap-2 text-sm font-semibold text-[#062068] hover:text-[#24387f] group cursor-pointer"
  >
    <span>{children}</span>
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </CTAButton>
);

export const FeatureShowcaseSection: React.FC = () => {
  const [selectedAudienceTab, setSelectedAudienceTab] = useState<'retail' | 'commuter' | 'student'>('retail');
  const [activeScenario, setActiveScenario] = useState<'A' | 'B'>('B');

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-white overflow-hidden border-b border-[#e2e8f0]" id="feature-showcase-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edf2fe] border border-[#cbd5e1] text-[#062068] text-xs font-bold uppercase tracking-wider mb-4">
            How MW Planner Helps
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062068] tracking-tight mb-3">
            Make Every Planning Decision Count.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform complex OOH variables into clear, defensible recommendations in four intelligent steps.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-20">

          {/* Point 1: Audience Intelligence */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-6 space-y-4">
              <div className="text-xs font-bold text-blue-500 tracking-wider uppercase">01 / Audience Intelligence</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062068] tracking-tight leading-snug">
                Build Plans Around Your Audience
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Move beyond choosing locations based on availability. Use Audience signals to identify environments and locations that align with who you want to reach.
              </p>
              <div className="pt-2">
                <ExploreLink id="explore-audience-mobility">Explore Audience Mobility Intelligence</ExploreLink>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="bg-[#0b1a45] rounded-xl p-5 sm:p-6 border border-[#1b2f6b] shadow-xl text-white">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                  <div className="sm:col-span-6 space-y-2.5">
                    <div className="text-[10px] font-bold tracking-wider text-[#93c5fd] uppercase mb-2">
                      Audience Segments
                    </div>

                    {(['retail', 'commuter', 'student'] as const).map((tab) => (
                      <div
                        key={tab}
                        onClick={() => setSelectedAudienceTab(tab)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          selectedAudienceTab === tab
                            ? 'bg-[#122b68] border-[#38bdf8] text-white shadow-sm'
                            : 'bg-[#0e2154] border-[#1f3678] text-[#c5c5d2] hover:bg-[#122864]'
                        }`}
                      >
                        <span className="text-xs font-semibold capitalize">
                          {tab === 'retail' ? 'Retail Shoppers' : tab === 'commuter' ? 'Commuters' : 'Students'}
                        </span>
                        {selectedAudienceTab === tab && (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="pt-3">
                      <div className="text-[10px] text-[#869bd5] font-bold uppercase tracking-wider">Index Score</div>
                      <div className="text-2xl font-bold text-emerald-400 font-sans mt-0.5">
                        {selectedAudienceTab === 'retail' ? '142' : selectedAudienceTab === 'commuter' ? '134' : '118'}
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6 bg-[#06122e] rounded-lg border border-[#192b5e] p-3 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
                    <div className="absolute inset-0" style={DARK_GRID_STYLE} />
                    <svg className="w-full h-full relative z-10" viewBox="0 0 160 120">
                      <path d="M 10 100 Q 60 40 110 70 T 150 20" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                      <path d="M 20 115 Q 70 65 120 40 T 155 10" fill="none" stroke="#34d399" strokeWidth="2" />
                      <circle cx="20" cy="115" r="3" fill="#34d399" />
                      <circle cx="70" cy="65" r="4" fill="#38bdf8" />
                      <circle cx="120" cy="40" r="3.5" fill="#a78bfa" />
                      <circle cx="155" cy="10" r="4" fill="#34d399" />
                    </svg>
                    <div className="text-[9px] text-[#7589c7] font-sans relative z-10 text-right">
                      Footfall Heatmap Stream
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Point 2: Budget Optimisation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <div className="bg-[#0b1a45] rounded-xl p-5 sm:p-6 border border-[#1b2f6b] shadow-xl text-white">
                <div className="text-[10px] font-bold tracking-wider text-[#93c5fd] uppercase mb-4">
                  Scenario Analysis
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setActiveScenario('A')}
                    className={`bg-[#0e2154] rounded-lg p-4 border transition-all cursor-pointer ${
                      activeScenario === 'A' ? 'border-[#38bdf8] ring-1 ring-[#38bdf8]' : 'border-[#1e3474] hover:bg-[#122864]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-white">Scenario A: Reach Focus</div>
                      <span className="text-[10px] bg-[#22397c] text-[#b7c4ff] px-2 py-0.5 rounded font-medium">Current</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#1a2d67]">
                        <span className="text-[#889bcc]">Reach</span>
                        <span className="font-semibold text-white">4.2M</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#1a2d67]">
                        <span className="text-[#889bcc]">CPM</span>
                        <span className="font-semibold text-white">$8.50</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-[#1e3474]">
                      <div className="text-[10px] text-[#889bcc] uppercase">Total Budget</div>
                      <div className="text-xl font-bold text-white font-sans mt-0.5">$125K</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveScenario('B')}
                    className={`bg-[#0e2154] rounded-lg p-4 border transition-all cursor-pointer ${
                      activeScenario === 'B' ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-[#1e3474] hover:bg-[#122864]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-white">Scenario B: Balanced</div>
                      <span className="text-[10px] bg-[#06322b] text-emerald-400 border border-[#0d594b] px-2 py-0.5 rounded font-semibold">Recommended</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#1a2d67]">
                        <span className="text-[#889bcc]">Reach</span>
                        <span className="font-semibold text-white">3.8M</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#1a2d67]">
                        <span className="text-[#889bcc]">CPM</span>
                        <span className="font-semibold text-emerald-400">$6.20</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-[#1e3474]">
                      <div className="text-[10px] text-[#889bcc] uppercase">Total Budget</div>
                      <div className="text-xl font-bold text-emerald-400 font-sans mt-0.5">$95K</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4 order-1 md:order-2">
              <div className="text-xs font-bold text-emerald-600 tracking-wider uppercase">02 / Budget Optimisation</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062068] tracking-tight leading-snug">
                Make Better Use of Your Budget
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Compare different planning scenarios to understand the trade-offs between reach, audience, frequency, and spend—and build a media mix that works harder.
              </p>
              <div className="pt-2">
                <ExploreLink id="simulate-custom-scenarios">Simulate Custom Scenarios</ExploreLink>
              </div>
            </div>
          </div>

          {/* Point 3: Automated Planning */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-6 space-y-4">
              <div className="text-xs font-bold text-indigo-500 tracking-wider uppercase">03 / Automated Planning</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062068] tracking-tight leading-snug">
                Turn Data Into Recommendations
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Bring inventory, audience and media Signals, and forecasts together to build recommendations backed by evidence, not assumptions.
              </p>
              <div className="pt-2">
                <ExploreLink id="launch-planning-engine">Launch Planning Engine</ExploreLink>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="bg-[#f8f9fc] rounded-xl p-6 sm:p-8 border border-[#e2e8f0] shadow-sm relative flex items-center justify-center">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-lg">
                  <div className="space-y-3 w-full sm:w-44">
                    <div className="bg-white rounded-lg p-2.5 border border-[#e2e8f0] shadow-xs flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-sky-100 text-sky-600"><Layers className="w-3.5 h-3.5" /></div>
                      <span className="text-xs font-semibold text-[#191c1e]">Live Inventory</span>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 border border-[#e2e8f0] shadow-xs flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-green-100 text-green-600"><Users className="w-3.5 h-3.5" /></div>
                      <span className="text-xs font-semibold text-[#191c1e]">Audience Data</span>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 border border-[#e2e8f0] shadow-xs flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-amber-100 text-amber-600"><TrendingUp className="w-3.5 h-3.5" /></div>
                      <span className="text-xs font-semibold text-[#191c1e]">Forecasting</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-2 sm:py-0">
                    <div className="w-11 h-11 rounded-full bg-[#062068] text-white flex items-center justify-center shadow-md">
                      <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="bg-white rounded-xl p-4 border border-[#e2e8f0] shadow-md text-center">
                      <div className="w-9 h-9 mx-auto rounded-lg bg-[#062068] text-white flex items-center justify-center mb-2">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-bold text-[#062068]">Data-Backed Plan</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Optimized Media Mix &amp; Rationale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Point 4: Stakeholder Approval */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <div className="bg-[#f8f9fc] rounded-xl p-5 sm:p-7 border border-[#e2e8f0] shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-[#062068] text-white flex items-center justify-center text-[10px] font-black">MW</div>
                    <span className="text-xs font-bold text-[#062068]">Campaign Proposal: Q3 Launch</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-green-100 text-green-600 px-2.5 py-0.5 rounded-full">Client Ready</span>
                </div>

                <div className="bg-white rounded-lg p-4 border border-[#e2e8f0] mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#191c1e]">Executive Summary</h4>
                      <p className="text-[11px] text-gray-500">Prepared for: Acme Corp</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 uppercase">Total Investment</div>
                      <div className="text-base font-bold text-[#062068] font-sans">$125,000</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f2f3f6] text-center">
                    <div className="bg-[#f8f9fc] p-2 rounded">
                      <div className="text-[9px] text-gray-500 uppercase font-semibold">Target Audience</div>
                      <div className="text-xs font-bold text-[#191c1e] mt-0.5">High-Income</div>
                    </div>
                    <div className="bg-[#f8f9fc] p-2 rounded">
                      <div className="text-[9px] text-gray-500 uppercase font-semibold">Est. Impressions</div>
                      <div className="text-xs font-bold text-[#191c1e] mt-0.5">12.5M</div>
                    </div>
                    <div className="bg-[#f8f9fc] p-2 rounded">
                      <div className="text-[9px] text-gray-500 uppercase font-semibold">Est. Reach</div>
                      <div className="text-xs font-bold text-[#191c1e] mt-0.5">4.2M</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#edf2fe] rounded-lg p-2.5 text-center text-xs font-semibold text-[#062068] flex items-center justify-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>Interactive Map View Included</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4 order-1 md:order-2">
              <div className="text-xs font-bold text-amber-500 tracking-wider uppercase">04 / Stakeholder Approval</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#062068] tracking-tight leading-snug">
                Present Plans With Confidence
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Turn your media plan into a clear, client-ready proposal that makes your recommendations easier to understand, justify, and approve.
              </p>
              <div className="pt-2">
                <ExploreLink id="view-sample-proposal">View Sample Proposal</ExploreLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
