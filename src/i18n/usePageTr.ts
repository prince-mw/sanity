'use client';

import { useCallback } from 'react';
import { useLocale } from './LocaleContext';
import { translateDeep, translateString, type PageTranslations } from '@/lib/pageTranslations';

// Page-copy translation for the visitor's language (see src/lib/pageTranslations.ts).
//   tr('English text')  → translated string, or the English when there's no translation
//   deep(object)        → same object with every visible string translated
export function usePageTr(translations?: PageTranslations) {
  const { locale } = useLocale();
  const map = locale === 'en' ? undefined : translations?.[locale];
  const tr = useCallback((s: string) => translateString(s, map), [map]);
  const deep = useCallback(<T,>(v: T): T => translateDeep(v, map), [map]);
  return { tr, deep };
}
