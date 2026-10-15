export const locales = ['en', 'ja', 'ko', 'id', 'zh', 'es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Picks the visitor's most-preferred supported language from the browser's Accept-Language
// header (e.g. "id-ID,id;q=0.9,en;q=0.8" -> 'id'). Falls back to English.
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { code: tag.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = preferred.find((p) => locales.includes(p.code as Locale));
  return match ? (match.code as Locale) : defaultLocale;
}

// A field translated per-locale in Sanity (see studio's `localeString` schema) — English is the
// only guaranteed value, other locales are filled in progressively by content editors.
export type LocaleValue = { en: string } & Partial<Record<Locale, string>>;

// Sanity content may still hold the plain-string shape (fields not yet translated, or right
// after a content rollback) — tolerate both so a mismatch degrades to "shows English".
export function resolveLocaleValue(value: LocaleValue | string | undefined | null, locale: Locale): string {
  if (typeof value === 'string') return value;
  return value?.[locale] || value?.en || '';
}

// Per-language versions stored beside an English Sanity field (studio's `translationsField`).
export type LocaleTranslations = Partial<Record<Locale, string>>;

export function pickTranslation(english: string, translations: LocaleTranslations | undefined | null, locale: Locale): string {
  return (locale !== 'en' && translations?.[locale]) || english;
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  id: 'Bahasa Indonesia',
  zh: '中文',
  es: 'Español',
};

export const localeCodes: Record<Locale, string> = {
  en: 'ENG',
  ja: 'JAP',
  ko: 'KOR',
  id: 'IDN',
  zh: 'CHN',
  es: 'ESP',
};
