import React from 'react';
import { FeatureScreenshot } from './FeatureScreenshot';

export const FeatureCalendarAvailability: React.FC = () => {
  return (
    <div className="py-10 sm:py-12 lg:py-14 border-t border-gray-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-7 order-2 lg:order-1">
          <FeatureScreenshot
            src="https://cdn.sanity.io/images/u10im6di/production/bc9eabd2c9374edf53fd57627949f0346b0ff612-960x540.png"
            alt="MW Inventory — Availability view showing bookings across a timeline, by inventory and hour"
          />
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
