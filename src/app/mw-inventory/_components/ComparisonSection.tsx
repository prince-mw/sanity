import React from 'react';
import { Sparkles, Search } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#f8f9fa]" id="comparison-section">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#062068] font-sans">
            Your Screens Haven&rsquo;t Changed. Your Potential Has.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">

          {/* Card 1: WITHOUT */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-precision flex flex-col items-center text-center group hover:border-gray-300 transition-all">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 font-sans">
              WITHOUT
            </div>

            <div className="w-full bg-[#18295b] rounded-xl p-4 sm:p-8 flex items-center justify-center min-h-[300px] sm:min-h-[340px] shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

              <div className="relative w-64 max-w-full sm:w-72 bg-black rounded-lg p-2.5 shadow-2xl border-2 border-black transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-t-md shadow-md border-2 border-black flex items-center justify-center">
                  <div className="w-8 h-2 bg-gray-800 rounded-full" />
                </div>

                <div className="bg-white rounded p-3 text-left shadow-sm border-2 border-black mt-2 font-mono text-[10px] text-gray-800 space-y-2 select-none">
                  <div className="border-b-2 border-black pb-1 flex justify-between items-center">
                    <span className="font-bold text-black">Asset</span>
                    <span className="font-bold text-black">Location</span>
                    <span className="font-bold text-black">Availability</span>
                  </div>

                  <div className="space-y-1 py-1 border-b border-black">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-semibold text-gray-900">Large LED - Times Square</span>
                      <span className="text-gray-700">NY</span>
                      <span className="text-red-600 font-bold line-through">Available?</span>
                    </div>
                    <div className="text-[8px] text-red-600 italic pl-1">
                      ⚠️ Double booked w/ Pepsi agency!
                    </div>
                  </div>

                  <div className="space-y-1 py-1 border-b border-black">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-semibold text-gray-900">Subway Panel 05</span>
                      <span className="text-gray-700">London</span>
                      <span className="text-black font-medium">Check spreadsheet</span>
                    </div>
                  </div>

                  <div className="space-y-1 py-1 border-b border-black">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-semibold text-gray-900">Kiosk Mall West</span>
                      <span className="text-gray-700">LA</span>
                      <span className="text-gray-600">Unconfirmed</span>
                    </div>
                  </div>

                  <div className="space-y-1 py-1 border-b border-black">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-semibold text-gray-900">Highway Billboard 7</span>
                      <span className="text-gray-700">Austin</span>
                      <span className="text-red-600 font-bold">Expired rate</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[8px] text-red-700 bg-red-50 p-1 rounded border border-black">
                    * Pending email reply from sales rep (3 days ago)
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2 text-center">
              <div className="text-base sm:text-lg font-medium text-[#ba1a1a]">Scattered supply</div>
              <div className="text-base sm:text-lg font-medium text-[#ba1a1a]">Manual effort</div>
              <div className="text-base sm:text-lg font-medium text-[#ba1a1a]">Missed opportunities</div>
            </div>
          </div>

          {/* Card 2: WITH MW INVENTORY */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-precision flex flex-col items-center text-center group hover:border-[#062068]/30 transition-all">
            <div className="text-xs font-bold uppercase tracking-widest text-[#062068] mb-6 font-sans flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#062068]" />
              <span>WITH MW INVENTORY</span>
            </div>

            <div className="w-full bg-gradient-to-br from-[#0c1f54] via-[#10276d] to-[#081845] rounded-xl p-4 sm:p-6 flex items-center justify-center min-h-[300px] sm:min-h-[340px] shadow-2xl relative overflow-hidden border border-blue-400/20">
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

              <div className="w-full bg-[#0b1739]/95 rounded-lg border border-blue-400/30 p-3 shadow-2xl backdrop-blur-md text-left font-sans">
                <div className="flex items-center justify-between border-b border-blue-900/60 pb-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-white pl-1">
                      <span>MW</span>
                      <span className="font-normal text-blue-300 text-[10px]">Inventory</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-[9px] text-blue-200">
                    <Search className="w-2.5 h-2.5 text-blue-400" />
                    <span>Search network...</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-1 text-[8px] font-bold uppercase tracking-wider text-blue-300/80 px-2 py-1 bg-blue-950/40 rounded">
                  <div className="col-span-4">ASSET</div>
                  <div className="col-span-3">LOCATION</div>
                  <div className="col-span-2">FORMAT</div>
                  <div className="col-span-3 text-right">AVAILABILITY</div>
                </div>

                <div className="space-y-1.5 mt-1.5 text-[9px]">
                  <div className="grid grid-cols-12 gap-1 items-center px-2 py-1 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="col-span-4 font-medium text-white flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#80f1b9]" />
                      Times Sq. Digital 01
                    </div>
                    <div className="col-span-3 text-blue-200 truncate">New York, NY</div>
                    <div className="col-span-2 text-blue-300 text-[8px] truncate">Digital Billboard</div>
                    <div className="col-span-3 text-right">
                      <span className="inline-block px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-[#80f1b9] border border-emerald-400/40 text-[8px] font-medium">
                        ● AVAILABLE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-center px-2 py-1 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="col-span-4 font-medium text-white flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Metro Station Panel 05
                    </div>
                    <div className="col-span-3 text-blue-200 truncate">London, UK</div>
                    <div className="col-span-2 text-blue-300 text-[8px] truncate">Transit Screen</div>
                    <div className="col-span-3 text-right">
                      <span className="inline-block px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 text-[8px] font-medium">
                        ● BOOKED
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-center px-2 py-1 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="col-span-4 font-medium text-white flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#80f1b9]" />
                      Plaza Walkway Kiosk 02
                    </div>
                    <div className="col-span-3 text-blue-200 truncate">Los Angeles, CA</div>
                    <div className="col-span-2 text-blue-300 text-[8px] truncate">Digital Kiosk</div>
                    <div className="col-span-3 text-right">
                      <span className="inline-block px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-[#80f1b9] border border-emerald-400/40 text-[8px] font-medium">
                        ● AVAILABLE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-1 items-center px-2 py-1 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="col-span-4 font-medium text-white flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      Tech Hub Screen A
                    </div>
                    <div className="col-span-3 text-blue-200 truncate">San Francisco, CA</div>
                    <div className="col-span-2 text-blue-300 text-[8px] truncate">Building Facade</div>
                    <div className="col-span-3 text-right">
                      <span className="inline-block px-1.5 py-0.5 rounded-full bg-purple-500/20 text-[#ddb4ff] border border-purple-400/40 text-[8px] font-medium">
                        ● LIVE CAMPAIGN
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-blue-900/60 flex items-center justify-between text-[8px] text-blue-300/80">
                  <div className="flex items-center gap-2">
                    <span>Active Screens: <strong>48 / 48</strong></span>
                    <span>•</span>
                    <span className="text-[#80f1b9]">Zero Conflict Engine</span>
                  </div>
                  <div className="text-white font-sans bg-blue-900/50 px-1.5 py-0.5 rounded text-[7px]">
                    Export CSV / API Sync
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2 text-center">
              <div className="text-base sm:text-lg font-medium text-[#454651]">Structured supply</div>
              <div className="text-base sm:text-lg font-medium text-[#454651]">Clearer decisions</div>
              <div className="text-base sm:text-lg font-medium text-[#454651]">More ways to sell</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
