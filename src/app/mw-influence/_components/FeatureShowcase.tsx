import React from 'react';
import { Check } from 'lucide-react';
import { FeatureScreenshot } from './FeatureScreenshot';

const DASHBOARD_IMG = 'https://cdn.sanity.io/images/u10im6di/production/402da052892db4f3a8e04bd08383ea4a8a7ce538-960x682.png?w=900&q=85&auto=format';
const CREATIVES_MANAGEMENT_IMG = 'https://cdn.sanity.io/images/u10im6di/production/f2e8ff1f8349edb7564a06b8c61da34a1b43aecb-960x682.png?w=900&q=85&auto=format';
const CAMPAIGN_PERFORMANCE_IMG = 'https://cdn.sanity.io/images/u10im6di/production/db6556ba4409f5b27c90d299c14795df461192fb-960x682.png?w=900&q=85&auto=format';

export const FeatureShowcase: React.FC = () => {
  return (
    <div id="features" className="w-full">

      <div className="bg-[#13245d] text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8 text-center border-y border-blue-900/40">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-sm font-semibold tracking-wider uppercase text-[#22d3ee]">
            Platform Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            More Than Allocation,<br className="hidden sm:inline" /> MW Influence Helps You Run Your Network Smarter
          </h2>
        </div>
      </div>

      {/* FEATURE 1: Take Manual Work Out of Campaign Operations */}
      <section id="campaign-operations" className="py-14 sm:py-16 lg:py-20 bg-[#fbf8ff] border-b border-[#e3e1e8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#14235d] text-xs font-bold uppercase tracking-wider border border-blue-100">
                <span>01</span>
                <span>Automated Workflow</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] leading-tight tracking-tight">
                Take Manual Work Out of Campaign Operations
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Streamline scheduling, creative approvals, campaign allocations, and inventory management so your team spends less time managing individual placements.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Instant bulk pacing adjustments &amp; floor price rules</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automated slot conflict resolution across 1,000+ screens</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <FeatureScreenshot
                src={DASHBOARD_IMG}
                alt="MW Influence dashboard: active campaigns, total screens, fill rate, total creatives, impressions, revenue and deal performance summary"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 2: Keep Creative Operations Moving */}
      <section id="creative-operations" className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#e3e1e8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7">
              <FeatureScreenshot
                src={CREATIVES_MANAGEMENT_IMG}
                alt="MW Influence creative reviews: manage creative library folders, review recently uploaded creatives and their approval status"
              />
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#14235d] text-xs font-bold uppercase tracking-wider border border-blue-100">
                <span>02</span>
                <span>Asset Management</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] leading-tight tracking-tight">
                Keep Creative Operations Moving
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Review, approve, validate, and distribute creatives through streamlined workflows that help campaigns go live smoothly and on time.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automated format verification (Aspect ratio, codec, FPS)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Edge caching directly to player hardware across all zones</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 3: Deliver Every Campaign With Confidence */}
      <section id="proof-of-play" className="py-14 sm:py-16 lg:py-20 bg-[#fbf8ff] border-b border-[#e3e1e8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#14235d] text-xs font-bold uppercase tracking-wider border border-blue-100">
                <span>03</span>
                <span>Verification &amp; Telemetry</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] leading-tight tracking-tight">
                Deliver Every Campaign With Confidence
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Track campaign delivery and capture event-level proof of play across your network, making pacing, reconciliation, and advertiser reporting easier.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>100% camera-verified &amp; player-logged playback logs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Instant advertiser audit export with geocoded snapshots</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <FeatureScreenshot
                src={CAMPAIGN_PERFORMANCE_IMG}
                alt="MW Influence campaign line items: total line items, delivered ad plays, total cap, delivered impressions and fleet dates by deal"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 4: See Where Your Network Can Perform Better */}
      <section id="network-performance" className="py-14 sm:py-16 lg:py-24 bg-[#182b6e] text-white relative overflow-hidden">

        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#22d3ee]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7">
              <div className="bg-[#0f1d4a]/95 backdrop-blur-xl rounded-2xl p-5 sm:p-7 shadow-2xl border border-white/15">

                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Network Performance
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-[#34d399] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Nodes: 120 | Status: Stable
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-5">

                  <div className="sm:col-span-7 bg-[#13245d] rounded-xl p-3.5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
                    <div className="text-[10px] font-semibold text-blue-200 mb-2">Global Screen Mesh Interconnect</div>

                    <div className="relative h-32 w-full bg-[#0b162c] rounded-lg p-2 flex items-center justify-center overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <line x1="30" y1="30" x2="80" y2="20" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        <line x1="80" y1="20" x2="140" y2="40" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
                        <line x1="140" y1="40" x2="170" y2="70" stroke="#34d399" strokeWidth="1" opacity="0.7" />
                        <line x1="80" y1="20" x2="100" y2="80" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
                        <line x1="30" y1="30" x2="60" y2="70" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                        <line x1="60" y1="70" x2="100" y2="80" stroke="#34d399" strokeWidth="1.5" opacity="0.8" />
                        <line x1="100" y1="80" x2="170" y2="70" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />

                        <circle cx="30" cy="30" r="4" fill="#22d3ee" />
                        <circle cx="80" cy="20" r="6" fill="#34d399" className="animate-pulse" />
                        <circle cx="140" cy="40" r="5" fill="#22d3ee" />
                        <circle cx="170" cy="70" r="4" fill="#fbbf24" />
                        <circle cx="60" cy="70" r="4" fill="#22d3ee" />
                        <circle cx="100" cy="80" r="5" fill="#34d399" />
                      </svg>
                      <div className="absolute bottom-1 right-2 text-[9px] font-sans text-gray-400">
                        12 Regions Active
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-[#13245d] rounded-xl p-3.5 border border-white/10 flex flex-col justify-between">
                    <div className="text-[10px] font-semibold text-blue-200 mb-1">Revenue Opportunity</div>

                    <div className="h-28 flex items-end justify-between gap-2 pt-2 px-1">
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500/40 rounded-t h-12" />
                        <span className="text-[9px] text-gray-400 font-bold">Q1</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500/60 rounded-t h-16" />
                        <span className="text-[9px] text-gray-400 font-bold">Q2</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500/80 rounded-t h-20" />
                        <span className="text-[9px] text-gray-400 font-bold">Q3</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-gradient-to-t from-[#22d3ee] to-[#34d399] rounded-t h-24 shadow-lg shadow-[#22d3ee]/30" />
                        <span className="text-[9px] text-[#34d399] font-bold">Q4</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">

                  <div className="sm:col-span-5 bg-[#13245d] rounded-xl p-3.5 border border-white/10 text-center flex flex-col items-center justify-center">
                    <div className="text-[10px] font-semibold text-blue-200 uppercase mb-2">Inventory Utilization %</div>

                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#22d3ee]"
                          strokeDasharray="78, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-xl font-bold text-white tracking-tight">
                        78%
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-7 bg-[#13245d] rounded-xl p-3.5 border border-white/10 flex flex-col justify-center space-y-2">
                    <div className="text-[10px] font-semibold text-blue-200 uppercase mb-1">Campaign Delivery</div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-white font-medium">Campaign A</span>
                      </div>
                      <span className="text-[#34d399] font-bold">95% (On Track)</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-white font-medium">Campaign B</span>
                      </div>
                      <span className="text-amber-300 font-bold">In Progress</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        <span className="text-white font-medium">Campaign C</span>
                      </div>
                      <span className="text-rose-300 font-bold">Delayed (Auto-reallocating)</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                <span>04</span>
                <span>Executive Analytics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                See Where Your Network Can Perform Better
              </h3>
              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">
                Monitor campaign performance, inventory utilization, revenue opportunities, and operational activity through centralized network insights.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-blue-100 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399] text-[#14235d] flex items-center justify-center font-bold shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Identifies under-monetized slots &amp; off-peak opportunities</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-100 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399] text-[#14235d] flex items-center justify-center font-bold shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automated revenue lift forecasting and yield benchmarking</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
