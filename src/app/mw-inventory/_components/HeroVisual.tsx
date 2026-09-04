import React from 'react';
import Image from 'next/image';

// MW Inventory's brand geometry is the "four-screen grid" — it represents multiple
// OOH screens and media assets organised into one accessible inventory. Previously an
// abstract animated illustration; now real DOOH/OOH photography per the updated
// product visual identity (blue-toned scene, each tile popping a distinct accent colour).
//
// Real MW OOH/DOOH screen photography (already hosted on MW's own Sanity CDN) —
// Hong Kong, Tokyo and Seoul network locations.
const TILES = [
  {
    url: 'https://cdn.sanity.io/images/u10im6di/production/e1c93d5a04ac921c2a1068a100dce53d31a80374-1681x985.png?w=700&q=80&auto=format',
    accent: '#fb7185', // coral
  },
  {
    url: 'https://cdn.sanity.io/images/u10im6di/production/32a29382eba70b5f6940dcec2493ab73675bf691-960x535.webp?w=700&q=80&auto=format',
    accent: '#38bdf8', // cyan
  },
  {
    url: 'https://cdn.sanity.io/images/u10im6di/production/2b37a37b1d9d1fc0c703ba3dc07274b3d162eff3-961x585.png?w=700&q=80&auto=format',
    accent: '#4ade80', // green
  },
  {
    url: 'https://cdn.sanity.io/images/u10im6di/production/8b28142e5d4371238c6f1abd53acfaee166a8b32-960x540.webp?w=700&q=80&auto=format',
    accent: '#eab308', // gold
  },
];

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-[420px] lg:max-w-[380px] xl:max-w-[420px]" id="hero-visual">
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#fde047]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 p-1.5 sm:p-2">
        {TILES.map((tile, i) => (
          <div
            key={i}
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-[1.025] hover:shadow-2xl"
          >
            <Image
              src={tile.url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, 200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b1f]/70 via-[#040b1f]/10 to-transparent" />
            <div
              className="absolute inset-0 rounded-2xl border-[1.5px] transition-colors pointer-events-none"
              style={{ borderColor: `${tile.accent}b3`, boxShadow: `inset 0 0 10px ${tile.accent}40` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
