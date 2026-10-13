"use client";

import { createContext, useContext, useState } from "react";

type Language = "id" | "en";
const sharedCopy = {
  id: {
    compare: "Bandingkan",
    compareService: "Bandingkan layanan",
    markedForComparison: "Ditandai untuk dibandingkan",
    reset: "Reset filter",
    loading: "Memuat layanan…",
    error: "Layanan belum dapat dimuat.",
    retry: "Coba lagi",
    clearFilters: "Hapus filter",
    exchangeRate: "Kurs ilustrasi statis",
    rateAsOf: "Diperbarui 13 Oktober 2026",
    source: "Sumber: data demo Jakarta Health Tourism",
    skip: "Lewati ke konten utama",
  },
  en: {
    compare: "Compare",
    compareService: "Compare service",
    markedForComparison: "Marked for comparison",
    reset: "Reset filters",
    loading: "Loading services…",
    error: "Services could not be loaded.",
    retry: "Try again",
    clearFilters: "Clear filters",
    exchangeRate: "Illustrative static rate",
    rateAsOf: "Updated October 13, 2026",
    source: "Source: Jakarta Health Tourism demo data",
    skip: "Skip to main content",
  },
} as const;

type TranslationKey = keyof typeof sharedCopy.id;
type LanguageContextValue = { language: Language; isEnglish: boolean; toggleLanguage: () => void; t: (key: TranslationKey) => string };

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
  const t = (key: TranslationKey) => sharedCopy[language][key];
  return <LanguageContext.Provider value={{ language, isEnglish: language === "en", toggleLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
