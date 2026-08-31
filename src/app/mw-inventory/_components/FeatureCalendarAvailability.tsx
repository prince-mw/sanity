import React from 'react';
import { Filter } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';

const DATES = [
  { key: '2024-11-06', label: 'M', day: 'Nov 6' },
  { key: '2024-11-09', label: 'T', day: 'Nov 9' },
  { key: '2024-11-13', label: 'W', day: 'Nov 13' },
  { key: '2024-11-19', label: 'T', day: 'Nov 19' },
  { key: '2024-11-20', label: 'F', day: 'Nov 20' },
  { key: '2024-11-27', label: 'S', day: 'Nov 27' },
  { key: '2024-12-03', label: 'S', day: 'Dec 3' },
];

export const FeatureCalendarAvailability: React.FC = () => {
  return (
    <div className="py-10 sm:py-12 lg:py-14 border-t border-gray-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="bg-[#e9ecef]/60 rounded-3xl p-3 sm:p-7 border border-gray-200 shadow-precision">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 shadow-precision overflow-x-auto font-sans">

              <div className="flex items-center justify-between mb-4 min-w-[580px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#062068]" />
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Network Availability Matrix
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#40E0D0]" />
                    <span className="text-gray-600 font-medium">Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#1e293b]" />
                    <span className="text-gray-600 font-medium">Booked</span>
                  </div>
                </div>
              </div>

              <div className="min-w-[620px]">

                <div className="grid grid-cols-12 gap-1.5 pb-2 border-b border-gray-200 text-[10px] font-semibold text-gray-600">
                  <div className="col-span-4 pl-1 flex items-center gap-1 text-gray-900 uppercase tracking-wider">
                    <span>Asset</span>
                    <Filter className="w-3 h-3 text-gray-400" />
                  </div>
                  {DATES.map((d, i) => (
                    <div key={i} className="col-span-1 text-center font-mono">
                      <div className="text-gray-900 font-bold text-[11px]">{d.label}</div>
                      <div className="text-[9px] text-gray-500">{d.day}</div>
                    </div>
                  ))}
                  <div className="col-span-1"></div>
                </div>

                <div className="space-y-2 mt-2.5">

                  {/* Row 1: Times Square Digital */}
                  <div className="grid grid-cols-12 gap-1.5 items-center text-[10px]">
                    <div className="col-span-4 pr-1">
                      <div className="font-semibold text-gray-900 truncate">1. Times Square Digital</div>
                      <div className="text-[9px] text-gray-500 font-mono">(OOH-TSQ-01) | Billboard</div>
                    </div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs" title="Nov 6 - Available">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs" title="Nov 9 - Available">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs" title="Nov 13 - Available">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs" title="Nov 19 - Available">Available</div>
                    <div className="col-span-4 bg-[#233549] text-white h-9 rounded px-2 flex flex-col justify-center text-left shadow-xs">
                      <div className="text-[8px] font-semibold text-blue-200 uppercase">Booked</div>
                      <div className="text-[8px] text-white font-medium truncate">Pepsi Holiday Campaign</div>
                    </div>
                  </div>

                  {/* Row 2: Sunset Blvd Static */}
                  <div className="grid grid-cols-12 gap-1.5 items-center text-[10px]">
                    <div className="col-span-4 pr-1">
                      <div className="font-semibold text-gray-900 truncate">2. Sunset Blvd Static</div>
                      <div className="text-[9px] text-gray-500 font-mono">(OOH-SBB-03) | Billboard</div>
                    </div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-2 bg-[#233549] text-white h-9 rounded px-1.5 flex flex-col justify-center text-left shadow-xs">
                      <div className="text-[8px] font-semibold text-blue-200 uppercase">Booked</div>
                      <div className="text-[8px] text-white font-medium truncate">Netflix Ad</div>
                    </div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-2 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                  </div>

                  {/* Row 3: Market St Digital */}
                  <div className="grid grid-cols-12 gap-1.5 items-center text-[10px]">
                    <div className="col-span-4 pr-1">
                      <div className="font-semibold text-gray-900 truncate">3. Market St Digital</div>
                      <div className="text-[9px] text-gray-500 font-mono">(OOH-MKS-05) | Shelter</div>
                    </div>
                    <div className="col-span-1 bg-[#233549] text-white h-9 rounded px-1 flex flex-col justify-center text-center shadow-xs">
                      <div className="text-[7px] text-blue-200">Booked</div>
                      <div className="text-[7px] text-white truncate">Nike Launch</div>
                    </div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-2 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                  </div>

                  {/* Row 4: Downtown Wallscape */}
                  <div className="grid grid-cols-12 gap-1.5 items-center text-[10px]">
                    <div className="col-span-4 pr-1">
                      <div className="font-semibold text-gray-900 truncate">4. Downtown Wallscape</div>
                      <div className="text-[9px] text-gray-500 font-mono">(OOH-DTS-02) | Wallscape</div>
                    </div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-3 bg-[#233549] text-white h-9 rounded px-2 flex flex-col justify-center text-left shadow-xs">
                      <div className="text-[8px] font-semibold text-blue-200 uppercase">Booked</div>
                      <div className="text-[8px] text-white font-medium truncate">Spotify Event</div>
                    </div>
                  </div>

                  {/* Row 5: Airport Terminal Banner */}
                  <div className="grid grid-cols-12 gap-1.5 items-center text-[10px]">
                    <div className="col-span-4 pr-1">
                      <div className="font-semibold text-gray-900 truncate">5. Airport Terminal Banner</div>
                      <div className="text-[9px] text-gray-500 font-mono">(OOH-APT-04) | Banner</div>
                    </div>
                    <div className="col-span-2 bg-[#233549] text-white h-9 rounded px-2 flex flex-col justify-center text-left shadow-xs">
                      <div className="text-[8px] font-semibold text-blue-200 uppercase">Booked</div>
                      <div className="text-[8px] text-white font-medium truncate">Gucci Promo</div>
                    </div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                    <div className="col-span-1 bg-[#40E0D0] h-9 rounded flex items-center justify-center text-[8px] font-bold text-gray-900 shadow-xs">Available</div>
                  </div>

                </div>

              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync: Connected to DSP &amp; Direct Booking channels
                </span>
                <CTAButton href="/contact" className="font-semibold text-[#062068] hover:text-[#24387f] cursor-pointer">
                  Talk to Our Team &rarr;
                </CTAButton>
              </div>

            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#062068] font-sans">
            Know What You Can Sell
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Move beyond static inventory lists. View bookings and availability across a timeline to understand where supply is available and where opportunities exist.
          </p>
        </div>

      </div>
    </div>
  );
};
