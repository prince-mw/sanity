'use client';

import React, { useEffect, useRef, useState } from 'react';

export const NAV_ITEMS = [
  { id: 'the-need', label: 'The Need' },
  { id: 'the-turn', label: 'The Breakthrough' },
  { id: 'the-system', label: 'The System' },
  { id: 'the-proof', label: 'The Proof' },
  { id: 'knowledge-base', label: 'Benchmarks' },
  { id: 'the-models', label: 'The Models' },
  { id: 'why-only-us', label: 'Why Only Us' },
  { id: 'the-brief', label: 'The Brief' },
  { id: 'get-the-report', label: 'Get the Report' },
];

// CSS `position: sticky` can't work on this site: globals.css sets overflow-x:hidden on both
// html and body, which makes body the scroll container. So the bar pins itself with
// position:fixed once its slot reaches the bottom of the fixed site header.
export const SectionNav: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [barHeight, setBarHeight] = useState(0);
  const slotRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      const headerHeight = window.innerWidth >= 1024 ? 64 : 56;
      if (slotRef.current) setPinned(slotRef.current.getBoundingClientRect().top <= headerHeight);
      if (barRef.current) setBarHeight(barRef.current.offsetHeight);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Keep the active tab visible inside the horizontally scrolling bar on small screens.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (list && item) list.scrollTo({ left: item.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  return (
    <div ref={slotRef} style={{ height: pinned ? barHeight : undefined }}>
      <nav
        ref={barRef}
        className={`${pinned ? 'fixed left-0 right-0 top-14 lg:top-16 shadow-md' : 'relative'} z-40 bg-white border-b border-gray-200`}
        aria-label="Page sections"
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12">
          <ul ref={listRef} className="flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} data-id={item.id} className="flex-none">
                <a
                  href={`#${item.id}`}
                  className={`block px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                    active === item.id ? 'bg-[#0f1d4a] text-white' : 'text-gray-500 hover:text-[#14235d] hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-0.5 bg-gray-100">
          <div className="h-full" style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #34d399)' }} />
        </div>
      </nav>
    </div>
  );
};
