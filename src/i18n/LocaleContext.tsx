'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { locales, defaultLocale, localeNames, localeCodes, Locale } from './config';
import { messagesMap, getMessage } from './messages';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => any; // Changed from string to any to support arrays
  locales: readonly Locale[];
  localeNames: Record<Locale, string>;
  localeCodes: Record<Locale, string>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setLocaleCookie(newLocale: Locale) {
  document.cookie = `locale=${newLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  // The server already resolved the visitor's locale from the cookie, or from the browser's
  // Accept-Language header on a first visit (see RootLayout), so the very first client render
  // matches SSR exactly — no post-mount flash, no hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      setLocaleCookie(newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = 'ltr';
    }
  }, []);

  const t = useCallback((key: string): string => {
    // Falls back to English when this language is missing the key
    return getMessage(messagesMap[locale] || messagesMap[defaultLocale], key);
  }, [locale]);

  const contextValue: LocaleContextType = {
    locale,
    setLocale,
    t,
    locales,
    localeNames,
    localeCodes,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export { locales, localeNames, localeCodes, type Locale };
