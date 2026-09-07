import React from 'react';
import Image from 'next/image';

interface FeatureScreenshotProps {
  src: string;
  alt: string;
}

// Real MW Inventory product screenshots (provided by Kritika), replacing the earlier
// hand-built mock UI. Framed in a light browser-chrome style to read as a product shot.
export const FeatureScreenshot: React.FC<FeatureScreenshotProps> = ({ src, alt }) => (
  <div className="bg-[#e9ecef]/60 rounded-3xl p-3 sm:p-6 border border-gray-200 shadow-precision">
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-precision overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      <div className="relative w-full aspect-[16/9]">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(max-width: 1024px) 90vw, 700px" />
      </div>
    </div>
  </div>
);
