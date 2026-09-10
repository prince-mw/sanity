import React from 'react';
import Image from 'next/image';

interface FeatureScreenshotProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Real MW Measure product screenshots (provided by Kritika), replacing the earlier
// hand-built interactive mock cards. Shown directly with no outer card/frame — just the
// screenshot itself, rounded. Sized from the image's own true pixel dimensions (default
// 960x682, override per-image if a screenshot's native size differs) so the box always
// matches its aspect ratio exactly — no letterboxing on either axis.
export const FeatureScreenshot: React.FC<FeatureScreenshotProps> = ({ src, alt, width = 960, height = 682 }) => (
  <div className="relative w-full rounded-2xl border border-gray-200/80 shadow-precision overflow-hidden bg-white">
    <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" sizes="(max-width: 1024px) 90vw, 700px" />
  </div>
);
