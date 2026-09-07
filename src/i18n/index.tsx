import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import es from "./locales/es";
import en from "./locales/en";

export type Locale = "es" | "en";

const translations = { es, en } as const;

type TranslationKeys = keyof typeof es;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Record<TranslationKeys, string>;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("epikas-locale");
    return (saved === "es" || saved === "en") ? saved : "es";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("epikas-locale", newLocale);
  }, []);

  const t = translations[locale] as Record<TranslationKeys, string>;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
