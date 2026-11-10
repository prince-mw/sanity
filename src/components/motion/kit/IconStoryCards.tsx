"use client";

// A paragraph told as cards: an icon, a title and one or two lines each,
// revealed one after another with the brand chevron. Used wherever a page
// would otherwise show plain text (Rif, 11 Nov 2026: every section needs a
// visual). Reveal is explicit per card (see reveal.ts).

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { MW } from "../brand";
import { Kicker } from "../BrandBits";
import { useReveal, reveal } from "./reveal";

export type StoryCard = { icon: LucideIcon; title: string; text: string; accent?: string };

export function IconStoryCards({ kicker, cards, columns = 4 }: { kicker?: string; cards: StoryCard[]; columns?: 2 | 3 | 4 }) {
  const cols = columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-4";
  const { ref, state } = useReveal(0.2);
  return (
    <figure ref={ref as React.RefObject<HTMLElement>} className="w-full" aria-label={cards.map(c => `${c.title}: ${c.text}`).join(". ")}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <ul className={`mt-5 grid gap-4 ${cols}`}>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.li
              key={c.title}
              {...reveal(state)}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.45 } } }}
              className="relative overflow-hidden rounded-2xl border p-6"
              style={{ borderColor: MW.ice, background: "#fff" }}
            >
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: c.accent ?? MW.sky }} />
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(191,231,251,0.35)", color: MW.blue }}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold" style={{ color: MW.navy }}>{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MW.body }}>{c.text}</p>
            </motion.li>
          );
        })}
      </ul>
    </figure>
  );
}
