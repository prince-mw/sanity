export const locales = ['en', 'ja', 'ko', 'id', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  id: 'Bahasa Indonesia',
  zh: '中文',
};

export const localeCodes: Record<Locale, string> = {
  en: 'ENG',
  ja: 'JAP',
  ko: 'KOR',
  id: 'IDN',
  zh: 'CHN',
};
