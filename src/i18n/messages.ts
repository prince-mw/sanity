import type { Locale } from './config';

// Statically import all translations to ensure they're bundled
import enMessages from '../../messages/en.json';
import jaMessages from '../../messages/ja.json';
import koMessages from '../../messages/ko.json';
import idMessages from '../../messages/id.json';
import zhMessages from '../../messages/zh.json';
import esMessages from '../../messages/es.json';
import ptMessages from '../../messages/pt.json';

export type Messages = typeof enMessages;

export const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  ja: jaMessages,
  ko: koMessages,
  id: idMessages,
  zh: zhMessages,
  es: esMessages,
  pt: ptMessages,
};

// Get nested value from object using dot notation; undefined when the path doesn't exist
function getNestedValue(obj: unknown, path: string): any {
  let current: unknown = obj;
  for (const key of path.split('.')) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

// A string, array or object for the key in the given language — falling back to English when
// that language is missing it, and to the key itself if English is missing it too.
export function getMessage(messages: Messages, key: string): any {
  return getNestedValue(messages, key) ?? getNestedValue(enMessages, key) ?? key;
}
