import React from 'react';
import { FeatureScreenshot } from './FeatureScreenshot';

export const FeatureSupplyConfidence: React.FC = () => {
  return (
    <div className="py-10 sm:py-12 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#062068] font-sans">
            Manage Your Supply With Confidence
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Keep your inventory organised in one place, giving your teams the information they need to manage a growing network without relying on fragmented spreadsheets or systems.
          </p>
        </div>

        <div className="lg:col-span-7">
          <FeatureScreenshot
            src="https://cdn.sanity.io/images/u10im6di/production/4ffa4b34fda0a2570e778f2c5e2bd809c83817b9-960x682.png?w=900&q=85&auto=format"
            alt="MW Studio dashboard: total revenue, occupancy rate, fill rate, active campaigns and inventory intelligence by asset type"
          />
        </div>

      </div>
    </div>
  );
};
