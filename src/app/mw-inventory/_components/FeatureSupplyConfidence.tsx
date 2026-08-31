import React from 'react';
import { MapPin } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';
import { SAMPLE_ASSET } from './mockData';

export const FeatureSupplyConfidence: React.FC = () => {
  const asset = SAMPLE_ASSET;

  return (
    <div className="py-10 sm:py-12 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#062068] font-sans">
            Manage Your Supply With Confidence
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Keep your inventory organised in one place, with the information your teams need to manage a growing network without relying on fragmented spreadsheets or systems.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-[#e9ecef]/60 rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-precision">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-7 shadow-precision hover:border-[#062068]/30 transition-all font-sans">

              <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-[#062068] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-tight">
                    MW
                  </div>
                  <div className="text-xs font-bold text-gray-900 tracking-wide uppercase">
                    ASSET DETAILS
                  </div>
                </div>
                <div className="text-[11px] font-medium text-gray-500 font-mono">
                  Asset ID: {asset.id} | {asset.name}
                </div>
              </div>

              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-5 bg-gray-900 group">
                <img
                  src={asset.imageUrl}
                  alt={asset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <div className="text-xs font-semibold">{asset.name}</div>
                    <div className="text-[10px] text-gray-300 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {asset.location}
                    </div>
                  </div>
                  <CTAButton
                    href="/contact"
                    className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 backdrop-blur-md text-[10px] font-medium transition-colors cursor-pointer"
                  >
                    Inspect Asset
                  </CTAButton>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-[11px] border-b border-gray-100 pb-5 mb-5">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">LOCATION</div>
                  <div className="font-medium text-gray-900 mt-0.5">{asset.location}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">STATUS</div>
                  <div className="mt-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Campaign
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">VENUE TYPE</div>
                  <div className="font-medium text-gray-900 mt-0.5">{asset.venueType}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">ADVERTISER</div>
                  <div className="font-medium text-gray-900 mt-0.5">{asset.advertiser || 'Confidential'}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">FORMAT</div>
                  <div className="font-medium text-gray-900 mt-0.5">{asset.format}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">AUDIENCE INDEX</div>
                  <div className="font-medium text-gray-900 mt-0.5">{asset.audienceIndexLabel}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">DIMENSIONS</div>
                  <div className="font-medium text-gray-900 mt-0.5">{asset.dimensions}</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">AVAILABILITY</div>
                  <div className="font-medium text-gray-900 mt-0.5">{asset.availabilityNote}</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  PERFORMANCE METRICS
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="w-28 h-8 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                        <path
                          d="M 0 25 Q 15 22, 25 15 T 50 18 T 75 8 T 100 12"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 0 25 Q 15 22, 25 15 T 50 18 T 75 8 T 100 12 L 100 30 L 0 30 Z"
                          fill="url(#sparkGrad)"
                          opacity="0.15"
                        />
                        <defs>
                          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-900">Avg. Weekly Impressions:</span> {asset.avgWeeklyImpressions}M<br />
                      <span className="font-semibold text-gray-900">CPM:</span> ${asset.cpm.toFixed(2)}
                    </div>
                  </div>

                  <CTAButton
                    href="/contact"
                    className="self-center sm:self-auto bg-[#062068] hover:bg-[#001452] text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                    id="view-schedule-btn"
                  >
                    View Schedule
                  </CTAButton>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
