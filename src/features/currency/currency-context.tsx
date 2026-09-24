"use client";

import { createContext, useContext, useState } from "react";
import { CurrencyCode, currencyNames, currencyRates } from "@/services/currency-service";

type CurrencyContextValue = { currency: CurrencyCode; setCurrency: (currency: CurrencyCode) => void };
const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("IDR");
  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}

export function CurrencyPrice({ value }: { value: string }) {
  const { currency } = useCurrency();
  if (currency === "IDR" || !value.includes("Rp")) return <span>{value}</span>;
  const converted = value.replace(/Rp\s?([\d.]+)/g, (_, raw: string) => {
    const amount = Number(raw.replace(/\./g, "")) * currencyRates[currency];
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: amount < 10 ? 2 : 0 }).format(amount);
  });
  return <span title={`Illustrative static rate · ${currencyNames[currency]}`}>{converted}</span>;
}
