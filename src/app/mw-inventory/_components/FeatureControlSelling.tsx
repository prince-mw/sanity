import React from 'react';
import { FeatureScreenshot } from './FeatureScreenshot';

interface FeatureControlSellingProps {
  title?: string;
  description?: string;
  imageUrl?: string | null;
  imageAlt?: string;
}

const DEFAULT_IMAGE = 'https://cdn.sanity.io/images/u10im6di/production/6ca02436d6ec92e76b9613f494549bcc1d2bc752-960x540.png';
const DEFAULT_ALT = 'MW Studio — Media Owner Selling Terms screen showing selling terms configuration and booking constraints';

export const FeatureControlSelling: React.FC<FeatureControlSellingProps> = ({
  title = 'Control How Inventory Gets Sold',
  description = 'Set selling terms and booking constraints around inventory or networks. Give your teams clear guardrails for what can be offered, when, and under what conditions.',
  imageUrl,
  imageAlt = DEFAULT_ALT,
}) => {
  return (
    <div className="py-10 sm:py-12 lg:py-14 border-t border-gray-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#062068] font-sans">
            {title}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        <div className="lg:col-span-7">
          <FeatureScreenshot
            src={imageUrl || DEFAULT_IMAGE}
            alt={imageAlt}
            width={960}
            height={540}
          />
        </div>

      </div>
    </div>
  );
};
