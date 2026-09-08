import React from 'react';
import Image from 'next/image';

// Hero visual — a single provided image, replacing the earlier four-screen photo grid.
const HERO_IMAGE_URL =
  'https://cdn.sanity.io/images/u10im6di/production/033e3e912ff148224ffa87f95b853490235f48e9-485x438.webp?w=900&q=85&auto=format';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-[420px] lg:max-w-[380px] xl:max-w-[420px]" id="hero-visual">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#fde047]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full aspect-square">
        <Image
          src={HERO_IMAGE_URL}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 640px) 90vw, 420px"
          priority
        />
      </div>
    </div>
  );
};
