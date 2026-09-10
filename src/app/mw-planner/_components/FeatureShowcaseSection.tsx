'use client';

import React from 'react';
import { Layers, Users, TrendingUp, FileText, ArrowRight, ChevronRight } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';
import { FeatureScreenshot } from './FeatureScreenshot';

const AUDIENCE_REACH_IMG = 'https://cdn.sanity.io/images/u10im6di/production/90d4090b2b6e14a886e14aec99147bf77cbc5584-960x682.png?w=900&q=85&auto=format';
const BUDGET_TRACKER_IMG = 'https://cdn.sanity.io/images/u10im6di/production/e9a70595fe1d8edf3912fdda6d01470d400be7c2-960x682.png?w=900&q=85&auto=format';
const DASHBOARD_OVERVIEW_IMG = 'https://cdn.sanity.io/images/u10im6di/production/5a7188df7cd1199cfafde87cc2578c094577b54c-960x682.png?w=900&q=85&auto=format';

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
              <FeatureScreenshot
                src={AUDIENCE_REACH_IMG}
                alt="MW Planner dashboard: audience reach vs impressions trend and regional inventory snapshot by market"
              />
            </div>
          </div>

          {/* Point 2: Budget Optimisation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <FeatureScreenshot
                src={BUDGET_TRACKER_IMG}
                alt="MW Planner budget tracker: total, spent and remaining budget with budget performance summary trend"
              />
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
              <FeatureScreenshot
                src={DASHBOARD_OVERVIEW_IMG}
                alt="MW Planner dashboard: revenue performance summary with revenue vs cost analysis and sales performance breakdown"
              />
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
