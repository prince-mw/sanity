import React from 'react';
import { FeatureScreenshot } from './FeatureScreenshot';

export const FeatureControlSelling: React.FC = () => {
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
          <FeatureScreenshot
            src="https://cdn.sanity.io/images/u10im6di/production/6ca02436d6ec92e76b9613f494549bcc1d2bc752-960x540.png"
            alt="MW Inventory — Media Owner Selling Terms screen showing selling terms configuration and booking constraints"
          />
        </div>

      </div>
    </div>
  );
};
