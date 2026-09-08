import React from 'react';
import { LayoutGrid, Activity, Sparkles, Upload } from 'lucide-react';
import { FeatureScreenshot } from './FeatureScreenshot';
import { MeasureGeometry } from './brand/MeasureGeometry';

const CAMPAIGN_INSIGHTS_IMG = 'https://cdn.sanity.io/images/u10im6di/production/386cb5e361b78bb8979f58012590c036d83acbdc-512x295.png?w=900&q=85&auto=format';
const BRAND_LIFT_IMG = 'https://cdn.sanity.io/images/u10im6di/production/279738f88c4b015f90dba4479c5879960d6219cb-512x295.png?w=900&q=85&auto=format';
const AI_ANALYSER_IMG = 'https://cdn.sanity.io/images/u10im6di/production/d87c73e44a48d680e3068241c6a4e33f313f6fb4-512x295.png?w=900&q=85&auto=format';
const DASHBOARD_IMG = 'https://cdn.sanity.io/images/u10im6di/production/4a16b4542f4f087ad542c9f01d40d08b38e55267-512x331.png?w=900&q=85&auto=format';

export const CampaignInsightsSection: React.FC = () => {
  return (
    <section id="deep-campaign-insights" className="bg-white text-slate-900 py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3 shadow-xs">
            <div className="w-4 h-4 rounded-full bg-[#0b162c] flex items-center justify-center">
              <MeasureGeometry size="xs" />
            </div>
            <span>Four Layers of Campaign Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14235d]">
            Deep Campaign Insights at Scale
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto">
            How MW Measure helps you validate delivery, uncover audience movement, and prove real-world business lift.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">

          {/* FEATURE 1: Understand Campaign Performance */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 shadow-sm">
                <LayoutGrid className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] tracking-tight">
                Understand Campaign Performance
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                See the complete picture of your OOH campaign—from delivery and reach to audience saturation and location performance—without piecing together data from disparate vendors.
              </p>
            </div>

            <div className="md:col-span-7 w-full">
              <FeatureScreenshot src={CAMPAIGN_INSIGHTS_IMG} alt="MW Measure campaign insights: time of day performance and location-wise contribution" />
            </div>
          </div>

          {/* FEATURE 2: Prove Campaign Impact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-7 w-full order-2 md:order-1">
              <FeatureScreenshot src={BRAND_LIFT_IMG} alt="MW Measure brand lift executive summary: awareness, familiarity, consideration and recall" />
            </div>

            <div className="md:col-span-5 space-y-4 order-1 md:order-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-sm">
                <Activity className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] tracking-tight">
                Prove Campaign Impact
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Go beyond proving that your campaign ran. Measure what it changed, including brand awareness, consideration, recall, and other outcomes through brand lift studies and impact measurement.
              </p>
            </div>
          </div>

          {/* FEATURE 3: Learn and Improve */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-600 shadow-sm">
                <Sparkles className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] tracking-tight">
                Learn and Improve
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Turn every campaign into a high-leverage learning opportunity. Identify what worked, which dayparts peaked, and how to calibrate future media budgets for maximum ROI.
              </p>
            </div>

            <div className="md:col-span-7 w-full">
              <FeatureScreenshot src={AI_ANALYSER_IMG} alt="MW Measure AI Analyser: instant campaign insights chat interface" />
            </div>
          </div>

          {/* FEATURE 4: Share Results With Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-7 w-full order-2 md:order-1">
              <FeatureScreenshot src={DASHBOARD_IMG} alt="MW Measure dashboard: active campaigns, spend, impressions and campaign performance table" />
            </div>

            <div className="md:col-span-5 space-y-4 order-1 md:order-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-sm">
                <Upload className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] tracking-tight">
                Share Results With Confidence
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Replace fragmented campaign PDFs with credible, verifiable evidence of performance—giving marketers and media buyers the proof they need to demonstrate media value to stakeholders.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
