"use client";

import { createContext, useContext, useState } from "react";

type Language = "id" | "en";
type LanguageContextValue = { language: Language; isEnglish: boolean; toggleLanguage: () => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "id";
    const saved = window.localStorage.getItem("jhj-language");
    return saved === "en" || saved === "id" ? saved : "id";
  });
  function toggleLanguage() {
    setLanguage((current) => {
      const next = current === "id" ? "en" : "id";
      window.localStorage.setItem("jhj-language", next);
      document.documentElement.lang = next;
      return next;
    });
  }
  return <LanguageContext.Provider value={{ language, isEnglish: language === "en", toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
