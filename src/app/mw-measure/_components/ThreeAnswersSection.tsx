import React from 'react';
import { Map, Users, TrendingUp } from 'lucide-react';
import { MeasureGeometry } from './brand/MeasureGeometry';

export const ThreeAnswersSection: React.FC = () => {
  return (
    <section id="three-answers" className="bg-[#18286a] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden">

      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-3">
            <div className="w-4 h-4 rounded-full bg-[#0b162c] flex items-center justify-center">
              <MeasureGeometry size="xs" />
            </div>
            <span>The MW Performance Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            One Campaign. Three Answers.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-blue-100/75 max-w-xl mx-auto">
            Transform raw OOH impressions into three clear, outcome-driven answers every marketer needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: What Happened? */}
          <div className="relative rounded-2xl bg-[#1d307d]/80 border border-blue-400/20 p-7 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-blue-300/40 hover:bg-[#20358a]/90 transition-all shadow-xl">

            <span className="absolute top-2 right-4 text-7xl sm:text-8xl font-black text-white/5 select-none pointer-events-none font-sans">
              01
            </span>

            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-6 shadow-sm">
                <Map className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                What Happened?
              </h3>

              <p className="text-sm text-blue-100/75 leading-relaxed">
                Understand campaign delivery across locations, formats, audiences, and impressions through clear, consolidated reporting, connecting Media Signals across your campaign.
              </p>
            </div>

            <div className="mt-8 pt-4 relative h-36 w-full rounded-xl bg-blue-950/40 border border-blue-500/10 p-3 overflow-hidden flex items-center justify-center">

              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: 'radial-gradient(#93c5fd 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}></div>

              <svg className="w-full h-full relative z-10" viewBox="0 0 240 100" fill="none">
                <path
                  d="M 15 70 Q 60 85 90 60 T 170 35 T 225 75"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                />
                <circle cx="30" cy="72" r="4.5" fill="#fbbf24" className="animate-pulse" />
                <circle cx="90" cy="60" r="5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="140" cy="42" r="4.5" fill="#fbbf24" />
                <circle cx="175" cy="36" r="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                <circle cx="215" cy="70" r="4.5" fill="#fbbf24" />
              </svg>
            </div>

          </div>

          {/* Card 2: Who Did You Reach? */}
          <div className="relative rounded-2xl bg-[#1d307d]/80 border border-blue-400/20 p-7 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-teal-300/40 hover:bg-[#20358a]/90 transition-all shadow-xl">

            <span className="absolute top-2 right-4 text-7xl sm:text-8xl font-black text-white/5 select-none pointer-events-none font-sans">
              02
            </span>

            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300 mb-6 shadow-sm">
                <Users className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                Who Did You Reach?
              </h3>

              <p className="text-sm text-blue-100/75 leading-relaxed">
                Explore Audience and Location Signals to understand where campaigns performed best and how different environments contributed to reach.
              </p>
            </div>

            <div className="mt-8 pt-4 relative h-36 w-full rounded-xl bg-blue-950/40 border border-blue-500/10 p-3 overflow-hidden flex flex-col justify-end">

              <div className="relative h-24 w-full flex items-end justify-between gap-3 px-2 pb-2">
                <div className="w-1/5 bg-[#2dd4bf]/40 rounded-t-md h-[30%] transition-all group-hover:h-[35%]"></div>
                <div className="w-1/5 bg-[#2dd4bf]/60 rounded-t-md h-[55%] transition-all group-hover:h-[60%]"></div>
                <div className="w-1/5 bg-[#2dd4bf]/85 rounded-t-md h-[85%] transition-all group-hover:h-[90%]"></div>
                <div className="w-1/5 bg-[#2dd4bf] rounded-t-md h-[95%] shadow-[0_0_10px_rgba(45,212,191,0.3)]"></div>
                <div className="w-1/5 bg-[#2dd4bf]/70 rounded-t-md h-[65%] transition-all group-hover:h-[70%]"></div>
              </div>

              <div className="flex justify-between text-[9px] text-blue-200/60 font-sans px-2 border-t border-blue-400/10 pt-1">
                <span>18-24</span>
                <span>25-34</span>
                <span>35-44</span>
                <span>45-54</span>
                <span>55+</span>
              </div>

            </div>

          </div>

          {/* Card 3: Did It Work? */}
          <div className="relative rounded-2xl bg-[#1d307d]/80 border border-blue-400/20 p-7 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-cyan-300/40 hover:bg-[#20358a]/90 transition-all shadow-xl">

            <span className="absolute top-2 right-4 text-7xl sm:text-8xl font-black text-white/5 select-none pointer-events-none font-sans">
              03
            </span>

            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-6 shadow-sm">
                <TrendingUp className="w-6 h-6 stroke-[2]" />
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                Did It Work?
              </h3>

              <p className="text-sm text-blue-100/75 leading-relaxed">
                Go beyond delivery metrics with impact measurement that helps demonstrate Brand and Outcome Signals, campaign effectiveness, and media value.
              </p>
            </div>

            <div className="mt-8 pt-4 relative h-36 w-full rounded-xl bg-blue-950/40 border border-blue-500/10 p-3 overflow-hidden flex items-center justify-center">

              <div className="relative flex items-center justify-center">
                <svg className="w-28 h-28 animate-[spin_24s_linear_infinite]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeDasharray="6 6"
                    opacity="0.85"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-sans tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                    +23%
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
