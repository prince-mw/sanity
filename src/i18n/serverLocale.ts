import { cookies, headers } from "next/headers";
import { locales, localeFromAcceptLanguage, type Locale } from "./config";

// The visitor's language on the server: a language picked from the switcher (cookie) wins;
// otherwise their browser language. Crawlers send neither, so they get English.
export async function getRequestLocale(): Promise<Locale> {
  const localeCookie = (await cookies()).get('locale')?.value;
  return locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : localeFromAcceptLanguage((await headers()).get('accept-language'));
}
