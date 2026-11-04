// Width of a text section, decided by how much text it holds.
//
// Like Google's pixel limit for titles: estimate the rendered length of the
// text (characters x the average Poppins glyph width) and pick the box from
// that, so every CMS section sizes itself without anyone setting a width.
//
//   short   a heading and a line or two (CTA-like)   768px, 18px text
//   medium  a few paragraphs                          896px, 18px text
//   long    many paragraphs                           960px, 20px text
//
// Long text gets a wider box *and* larger type so a line stays near 90
// characters, the readable maximum; past that, wider just means harder to read.

/** Average Poppins glyph width as a share of the font size. */
const AVG_GLYPH = 0.53;
const BODY_PX = 18;

/** Characters of visible text in Portable Text (or a plain string). */
export function textChars(value: unknown): number {
  if (typeof value === 'string') return value.length;
  if (!Array.isArray(value)) return 0;
  let n = 0;
  for (const block of value as any[]) {
    if (Array.isArray(block?.children)) for (const c of block.children) n += typeof c?.text === 'string' ? c.text.length : 0;
  }
  return n;
}

/** Estimated width in px of the text set on one line at body size. */
export const textPixels = (chars: number) => Math.round(chars * AVG_GLYPH * BODY_PX);

export type WidthTier = 'short' | 'medium' | 'long';

// ~4 lines at 768px (4 x 768), and ~15 lines at 896px (15 x 896).
const SHORT_MAX_PX = 3_100;
const MEDIUM_MAX_PX = 13_500;

export function widthTier(chars: number): WidthTier {
  const px = textPixels(chars);
  return px <= SHORT_MAX_PX ? 'short' : px <= MEDIUM_MAX_PX ? 'medium' : 'long';
}

export const TIER_CLASSES: Record<WidthTier, { box: string; prose: string }> = {
  short: { box: 'max-w-3xl', prose: 'prose-lg' },
  medium: { box: 'max-w-4xl', prose: 'prose-lg' },
  long: { box: 'max-w-[60rem]', prose: 'prose-lg lg:prose-xl' },
};
