"use client";

import { useEffect } from "react";

// The root <html lang> follows the visitor's UI language. A page whose own content is in another
// language sets it while mounted (so browsers don't offer to translate an already-translated page),
// then restores the previous value.
export default function PageHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);
  return null;
}
