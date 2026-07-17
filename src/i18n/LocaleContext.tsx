'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { locales, defaultLocale, localeNames, localeCodes, Locale } from './config';

// Statically import all translations to ensure they're bundled
import enMessages from '../../messages/en.json';
import jaMessages from '../../messages/ja.json';
import koMessages from '../../messages/ko.json';
import idMessages from '../../messages/id.json';
import zhMessages from '../../messages/zh.json';

// Type for messages
type Messages = typeof enMessages;

// Messages map
const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  ja: jaMessages,
  ko: koMessages,
  id: idMessages,
  zh: zhMessages,
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => any; // Changed from string to any to support arrays
  locales: readonly Locale[];
  localeNames: Record<Locale, string>;
  localeCodes: Record<Locale, string>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Helper function to get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): any {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if translation not found
    }
  }
  
  // Return whatever type it is - string, array, object, etc.
  return current !== undefined ? current : path;
}

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setLocaleCookie(newLocale: Locale) {
  document.cookie = `locale=${newLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  // The server already resolved the visitor's locale from the cookie (see RootLayout), so the
  // very first client render matches SSR exactly — no post-mount flash, no hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale);

  // Only runs for a first-ever visit with no locale cookie yet: detect the browser's language
  // and persist it as the cookie so the next request (even a full server navigation) renders it directly.
  useEffect(() => {
    if (initialLocale) return;
    const browserLocale = navigator.language.split('-')[0] as Locale;
    if (locales.includes(browserLocale) && browserLocale !== defaultLocale) {
      setLocaleState(browserLocale);
      setLocaleCookie(browserLocale);
      document.documentElement.lang = browserLocale;
    }
  }, [initialLocale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      setLocaleCookie(newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = 'ltr';
    }
  }, []);

  const t = useCallback((key: string): string => {
    const messages = messagesMap[locale] || messagesMap[defaultLocale];
    return getNestedValue(messages as Record<string, unknown>, key);
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
