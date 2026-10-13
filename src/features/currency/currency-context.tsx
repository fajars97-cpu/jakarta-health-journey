"use client";

import { createContext, useContext, useState } from "react";
import { CurrencyCode, currencyNames, currencyRates } from "@/services/currency-service";
import { useLanguage } from "@/features/i18n/language-context";

type CurrencyContextValue = { currency: CurrencyCode; setCurrency: (currency: CurrencyCode) => void };
const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window === "undefined") return "IDR";
    const saved = window.localStorage.getItem("jhj-currency");
    return saved && saved in currencyRates ? saved as CurrencyCode : "IDR";
  });
  function setCurrency(next: CurrencyCode) { setCurrencyState(next); window.localStorage.setItem("jhj-currency", next); }
  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}

export function CurrencyPrice({ value }: { value: string }) {
  const { currency } = useCurrency();
  const { isEnglish } = useLanguage();
  if (currency === "IDR" || !value.includes("Rp")) return <span className="currency-price"><span className="currency-price-main">{value}</span></span>;
  const converted = value.replace(/Rp\s?([\d.]+)/g, (_, raw: string) => {
    const amount = Number(raw.replace(/\./g, "")) * currencyRates[currency];
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: amount < 10 ? 2 : 0 }).format(amount);
  });
  const rateLabel = isEnglish ? `Illustrative static rate · ${currencyNames[currency]} · updated October 13, 2026` : `Kurs ilustrasi statis · ${currencyNames[currency]} · diperbarui 13 Oktober 2026`;
  return <span className="currency-price" title={rateLabel}><span className="currency-price-main">≈ {converted}</span><small>{isEnglish ? "Static illustrative rate · 13 Oct 2026" : "Kurs ilustrasi statis · 13 Okt 2026"}</small></span>;
}
