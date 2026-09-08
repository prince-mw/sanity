import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="bg-white text-slate-900 py-10 sm:py-14 border-b border-slate-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14235d]">
          You Know Your Campaign Ran. <br />
          <span className="text-blue-600">
            But Did It Work?
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto">
          Bridging the gap between standard delivery reports and verified campaign performance.
        </p>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">

          {/* Card 1: The Old Way */}
          <div className="w-full md:w-80 lg:w-96 p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center mb-5 text-amber-500 shadow-sm">
              <FileText className="w-7 h-7 stroke-[1.75]" />
            </div>

            <h3 className="text-lg font-bold text-[#14235d] tracking-tight mb-2">
              The Old Way: Delivery
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Proof of play photos, static billboard lists, and estimated historical impressions.
            </p>
          </div>

          <div className="flex items-center justify-center text-slate-400 my-1 md:my-0">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shadow-inner">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: The MW Way */}
          <div className="w-full md:w-80 lg:w-96 p-7 sm:p-8 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center relative overflow-hidden">

            <div className="w-14 h-14 flex items-center justify-center mb-5 select-none">
              <svg
                viewBox="0 0 60 48"
                className="w-12 h-10 overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 16 7 Q 16 11 12 11 Q 16 11 16 15 Q 16 11 20 11 Q 16 11 16 7 Z"
                  fill="#2563eb"
                />

                <path
                  d="M 32 3 Q 32 9 26 9 Q 32 9 32 15 Q 32 9 38 9 Q 32 9 32 3 Z"
                  fill="#2563eb"
                />

                <path
                  d="M 12 36 L 24 22 L 34 31 L 46 17"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="12" cy="36" r="4.2" fill="#2563eb" />
                <circle cx="24" cy="22" r="4.2" fill="#2563eb" />
                <circle cx="34" cy="31" r="4.2" fill="#2563eb" />
                <circle cx="46" cy="17" r="4.2" fill="#2563eb" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-[#14235d] tracking-tight mb-2">
              The Moving Walls Way: Proof
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Verified audience reach, demographic composition, and true business impact—grounded in Media, Audience, Brand and Outcome Signals.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
