import React from 'react';
import { FeatureScreenshot } from './FeatureScreenshot';

interface FeatureCalendarAvailabilityProps {
  title?: string;
  description?: string;
  imageUrl?: string | null;
  imageAlt?: string;
}

const DEFAULT_IMAGE = 'https://cdn.sanity.io/images/u10im6di/production/dbea3560a1890d1bee81e67cd3da2ef60b1511cc-960x682.png?w=900&q=85&auto=format';
const DEFAULT_ALT = 'MW Studio bookings calendar: view campaign bookings across a weekly timeline by inventory, with occupancy status and details on hover';

export const FeatureCalendarAvailability: React.FC<FeatureCalendarAvailabilityProps> = ({
  title = 'Know What You Can Sell',
  description = 'Move beyond static inventory lists. View bookings and availability across a timeline to understand where supply is available and where opportunities exist.',
  imageUrl,
  imageAlt = DEFAULT_ALT,
}) => {
  return (
    <div className="py-10 sm:py-12 lg:py-14 border-t border-gray-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-7 order-2 lg:order-1">
          <FeatureScreenshot
            src={imageUrl || DEFAULT_IMAGE}
            alt={imageAlt}
          />
        </div>

        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#062068] font-sans">
            {title}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
};
