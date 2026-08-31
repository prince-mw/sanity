'use client';

import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, Check } from 'lucide-react';
import { SellingRules } from './types';
import { SAMPLE_RULES } from './mockData';

export const FeatureControlSelling: React.FC = () => {
  const [rules, setRules] = useState<SellingRules>(SAMPLE_RULES);
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [showBlockOutInfo, setShowBlockOutInfo] = useState(false);

  const handleToggle = (key: keyof SellingRules) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
    triggerSaved();
  };

  const handleNumberChange = (key: keyof SellingRules, value: number) => {
    setRules((prev) => ({ ...prev, [key]: value }));
    triggerSaved();
  };

  const triggerSaved = () => {
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 2000);
  };

  return (
    <div className="py-10 sm:py-12 lg:py-14 border-t border-gray-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#062068] font-sans">
            Control How Inventory Gets Sold
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Set selling terms and booking constraints around inventory or networks. Give your teams clear guardrails for what can be offered, when, and under what conditions.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-[#e9ecef]/60 rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-precision">
            <div className="bg-[#182859] text-white rounded-2xl border border-blue-400/20 p-6 sm:p-8 shadow-2xl font-sans relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Selling Terms &amp; Constraints
                  </h4>
                  <p className="text-xs text-blue-200/80 mt-0.5">
                    Define booking rules and availability parameters.
                  </p>
                </div>
                {showSavedNotification && (
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-[#80f1b9] border border-emerald-400/40 px-2 py-0.5 rounded animate-fade-in flex items-center gap-1">
                    <Check className="w-3 h-3" /> Saved live
                  </span>
                )}
              </div>

              <div className="space-y-4 text-xs">

                <div className="flex items-center justify-between py-1">
                  <span className="text-blue-100 font-medium">Minimum Stay Duration</span>
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex items-center bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-300 mr-1.5" />
                      <input
                        type="number"
                        min="1"
                        max="90"
                        value={rules.minStayDuration}
                        onChange={(e) => handleNumberChange('minStayDuration', parseInt(e.target.value) || 1)}
                        className="w-8 bg-transparent text-white font-medium text-center focus:outline-none"
                      />
                    </div>
                    <div className="bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1 text-blue-200 flex items-center gap-1">
                      <span>days</span>
                      <ChevronDown className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-blue-100 font-medium">Minimum Advance Booking</span>
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex items-center bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-300 mr-1.5" />
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={rules.minAdvanceBooking}
                        onChange={(e) => handleNumberChange('minAdvanceBooking', parseInt(e.target.value) || 0)}
                        className="w-8 bg-transparent text-white font-medium text-center focus:outline-none"
                      />
                    </div>
                    <div className="bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1 text-blue-200 flex items-center gap-1">
                      <span>days</span>
                      <ChevronDown className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="pt-3 pb-1 border-t border-white/10 text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                  Booking Lead Times
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-blue-100 font-medium">Minimum Lead Time</span>
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex items-center bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1">
                      <Clock className="w-3.5 h-3.5 text-blue-300 mr-1.5" />
                      <input
                        type="number"
                        min="1"
                        max="72"
                        value={rules.minLeadTimeHours}
                        onChange={(e) => handleNumberChange('minLeadTimeHours', parseInt(e.target.value) || 1)}
                        className="w-8 bg-transparent text-white font-medium text-center focus:outline-none"
                      />
                    </div>
                    <div className="bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1 text-blue-200 flex items-center gap-1">
                      <span>hours</span>
                      <ChevronDown className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-blue-100 font-medium">Maximum Lead Time</span>
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex items-center bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1">
                      <Clock className="w-3.5 h-3.5 text-blue-300 mr-1.5" />
                      <input
                        type="number"
                        min="1"
                        max="36"
                        value={rules.maxLeadTimeMonths}
                        onChange={(e) => handleNumberChange('maxLeadTimeMonths', parseInt(e.target.value) || 1)}
                        className="w-8 bg-transparent text-white font-medium text-center focus:outline-none"
                      />
                    </div>
                    <div className="bg-[#0d1b40] border border-blue-400/30 rounded px-2 py-1 text-blue-200 flex items-center gap-1">
                      <span>months</span>
                      <ChevronDown className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="pt-3 pb-1 border-t border-white/10 text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                  Constraint Rules
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-blue-100 font-medium">Allow Same-Day Bookings</span>
                  <button
                    type="button"
                    onClick={() => handleToggle('allowSameDayBookings')}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      rules.allowSameDayBookings ? 'bg-[#80f1b9]' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#062068] shadow-lg ring-0 transition duration-200 ease-in-out ${
                        rules.allowSameDayBookings ? 'translate-x-4' : 'translate-x-0 bg-white'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-blue-100 font-medium">Block Out Dates</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBlockOutInfo((v) => !v)}
                    className="text-[11px] font-medium text-blue-300 hover:text-white underline cursor-pointer"
                  >
                    Manage Dates
                  </button>
                </div>
                {showBlockOutInfo && (
                  <div className="text-[10px] text-blue-200/90 bg-blue-950/60 border border-blue-400/20 rounded px-2.5 py-2 -mt-2">
                    Block-out window active: Dec 24 &ndash; Dec 26 (Holiday Peak Floor Rate Enforcement)
                  </div>
                )}

                <div className="flex items-center justify-between py-1">
                  <span className="text-blue-100 font-medium">Require Host Approval</span>
                  <button
                    type="button"
                    onClick={() => handleToggle('requireHostApproval')}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      rules.requireHostApproval ? 'bg-[#80f1b9]' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#062068] shadow-lg ring-0 transition duration-200 ease-in-out ${
                        rules.requireHostApproval ? 'translate-x-4' : 'translate-x-0 bg-white'
                      }`}
                    />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
