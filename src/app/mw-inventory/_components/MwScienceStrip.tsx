import React from 'react';
import Link from 'next/link';
import { CompassNeedleAmbientDrift } from '@/components/CompassNeedleAmbientDrift';

export const MwScienceStrip: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-r from-emerald-50 via-white to-violet-100 py-10 sm:py-14"
      id="mw-science-ecosystem-strip"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-mw-gray-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-mw-blue-900 uppercase">
                Ecosystem Intelligence Layer
              </span>
            </div>

            <p className="text-base sm:text-[17px] lg:text-[18px] text-mw-blue-900 font-normal leading-relaxed tracking-tight max-w-2xl font-sans">
              Powered by <strong className="font-bold">MW Science</strong>, the Cognitive Compass behind Moving Walls, connecting real-world signals to guide smarter decisions across the entire ecosystem.
            </p>

            <div className="pt-1 text-center lg:text-left">
              <Link
                href="/mw-science"
                className="inline-flex items-center gap-2.5 bg-mw-blue-900 hover:bg-mw-blue-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] font-sans group"
                id="btn-explore-mw-science"
              >
                <span>Explore MW Science</span>
                <span className="group-hover:translate-x-0.5 transition-transform font-bold">→</span>
              </Link>
            </div>

          </div>

          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end lg:-translate-x-16">
            <CompassNeedleAmbientDrift className="w-32 h-32 sm:w-40 sm:h-40" tone="dark" />
          </div>

        </div>
      </div>
    </section>
  );
};
