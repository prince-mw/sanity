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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    // Get saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale);
      document.documentElement.lang = savedLocale;
      document.documentElement.dir = 'ltr';
    } else {
      // Try to detect from browser
      const browserLocale = navigator.language.split('-')[0] as Locale;
      if (locales.includes(browserLocale)) {
        setLocaleState(browserLocale);
        document.documentElement.lang = browserLocale;
        document.documentElement.dir = 'ltr';
      }
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = 'ltr';
    }
  }, []);

  // Use the current locale for translation, but default for SSR
  const currentLocale = mounted ? locale : defaultLocale;
  
  const t = useCallback((key: string): string => {
    const messages = messagesMap[currentLocale] || messagesMap[defaultLocale];
    return getNestedValue(messages as Record<string, unknown>, key);
  }, [currentLocale]);

  const contextValue: LocaleContextType = {
    locale: currentLocale,
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
