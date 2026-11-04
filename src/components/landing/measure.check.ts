// Run: npx -y tsx src/components/landing/measure.check.ts
import { textChars, textPixels, widthTier, type WidthTier } from './measure';

const para = (t: string) => ({ _type: 'block', children: [{ _type: 'span', text: t }] });

const cases: [string, unknown, WidthTier][] = [
  ['CTA line', [para('Talk to our team about billboards in Malaysia today.')], 'short'],
  ['two short paragraphs', [para('x'.repeat(150)), para('x'.repeat(150))], 'short'],
  ['a few paragraphs', [para('x'.repeat(500)), para('x'.repeat(500))], 'medium'],
  ['long section', Array.from({ length: 5 }, () => para('x'.repeat(600))), 'long'],
  ['plain string', 'x'.repeat(200), 'short'],
  ['nothing', undefined, 'short'],
];

let failed = 0;
for (const [name, value, want] of cases) {
  const chars = textChars(value);
  const got = widthTier(chars);
  const ok = got === want;
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}: ${chars} chars, ~${textPixels(chars)}px -> ${got}${ok ? '' : ` (want ${want})`}`);
}
if (failed) process.exit(1);
