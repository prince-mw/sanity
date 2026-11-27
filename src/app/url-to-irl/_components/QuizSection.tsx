'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CheckCircle2, Mail, HelpCircle } from 'lucide-react';
import { appendUTMsToUrl } from '@/lib/utmCookies';
import { appendReferrerName } from '@/lib/referrerName';
import { COLORS, Reveal } from './shared';

// Rukshana's Zoho quiz. The last step collects the visitor's details and Zoho emails them the
// Insights Report. Adds the same short referrername tag and UTM parameters as the site's
// ZohoFormEmbed, plus Zoho's auto-resize flag (zf_rszfm=1): the quiz then posts
// "<permalink>|<height>" messages on every step, and the iframe follows them, so it never
// shows an inner scrollbar or a block of empty space.
const QUIZ_PERMA = 'ADS6tgL5aO5D-VqSBLaVzT30vE3aQndHfjsJG5YqX0c';
const QUIZ_URL = `https://forms.zohopublic.com/movingwallsholdingpteltd/form/URL2IRLHowmuchdoyouknow/formperma/${QUIZ_PERMA}?zf_rszfm=1`;

function QuizFrame() {
  const pathname = usePathname();
  const [src, setSrc] = useState(() => appendReferrerName(QUIZ_URL, pathname));
  const [height, setHeight] = useState(460);
  // Zoho surrounds its white quiz card with a margin of theme background: 41px top, 50px sides and
  // ~54px bottom on wider frames; 20px on phones (measured Nov 2026). We crop that margin so only
  // the card shows inside our rounded frame.
  const [crop, setCrop] = useState({ x: 50, top: 41, bottom: 54 });
  useEffect(() => {
    const update = () => setCrop(window.innerWidth >= 640 ? { x: 50, top: 41, bottom: 54 } : { x: 20, top: 20, bottom: 20 });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // UTMs come from cookies, so add them after mount (avoids a hydration mismatch).
  useEffect(() => {
    setSrc(appendUTMsToUrl(appendReferrerName(QUIZ_URL, pathname)));
  }, [pathname]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string' || !/^https:\/\/([\w-]+\.)*zoho(public)?\.com$/.test(e.origin)) return;
      const [perma, h] = e.data.split('|');
      const px = parseInt(h, 10);
      // Zoho measures the welcome screen before its banner image loads and under-reports it
      // (~440px for ~700px of content on wide frames; ~390px for ~580px on phones), which hides
      // the Start button. Keep a floor that fits the welcome screen; later steps are taller.
      const floor = window.innerWidth >= 640 ? 720 : 620;
      if (perma === QUIZ_PERMA && px > 0) setHeight(Math.max(px + 15, floor));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // overflow: clip (not hidden) so nothing inside the quiz, e.g. Zoho scrolling its thank-you
  // message into view, can scroll this frame sideways.
  return (
    <div
      className="relative rounded-3xl bg-white shadow-2xl transition-[height] duration-300"
      style={{ height: height - crop.top - crop.bottom, overflow: 'clip' }}
    >
      <iframe
        src={src}
        title="URL2IRL - How much do you know?"
        aria-label="URL2IRL - How much do you know?"
        className="absolute block max-w-none"
        style={{ top: -crop.top, left: -crop.x, width: `calc(100% + ${2 * crop.x}px)`, height, border: 'none' }}
        suppressHydrationWarning
      />
    </div>
  );
}

export const QuizSection: React.FC = () => {
  return (
    <section
      id="get-the-report"
      className="scroll-mt-32 py-16 sm:py-20 lg:py-24 text-white relative"
      // overflow: clip rather than hidden: a hidden-overflow section can still be scrolled sideways by
      // script (the Zoho thank-you step did this, shifting the whole section left by ~128px).
      style={{ background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.navyMid} 100%)`, overflow: 'clip' }}
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.cyan}1a` }} />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${COLORS.violet}1f` }} />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-40">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: COLORS.cyan }}>
            Get the Insights Report
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
            How much do you know about <span style={{ color: COLORS.green }}>URL2IRL?</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-blue-100/85 leading-relaxed">
            Tell us where to send it, answer four quick questions, and the full report lands in your inbox: URL2IRL, The Incrementality
            Operating System.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              { icon: HelpCircle, t: 'Your name and email, then four quick questions' },
              { icon: CheckCircle2, t: 'Nine controlled experiments, misses published with the wins' },
              { icon: Mail, t: 'The report is emailed to you at the end' },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-start gap-3 text-sm sm:text-base text-blue-100/90">
                <Icon className="w-5 h-5 flex-none mt-0.5" style={{ color: COLORS.green }} />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <QuizFrame />
        </Reveal>
      </div>
    </section>
  );
};
