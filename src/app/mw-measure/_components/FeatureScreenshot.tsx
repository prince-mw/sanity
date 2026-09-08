import React from 'react';
import Image from 'next/image';

interface FeatureScreenshotProps {
  src: string;
  alt: string;
}

// Real MW Measure product screenshots (provided by Kritika), replacing the earlier
// hand-built interactive mock cards. object-contain avoids cropping, since these
// screenshots' aspect ratios vary and text sits close to the edges.
export const FeatureScreenshot: React.FC<FeatureScreenshotProps> = ({ src, alt }) => (
  <div className="bg-[#e9ecef]/60 rounded-3xl p-3 sm:p-6 border border-gray-200 shadow-precision">
    <div className="relative w-full aspect-[16/10] bg-white rounded-2xl border border-gray-200/90 shadow-precision overflow-hidden">
      <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 1024px) 90vw, 700px" />
    </div>
  </div>
);
