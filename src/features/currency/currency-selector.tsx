"use client";

import { Coins } from "lucide-react";
import { CurrencyCode, currencyNames } from "@/services/currency-service";
import { useCurrency } from "@/features/currency/currency-context";
import { useLanguage } from "@/features/i18n/language-context";

const visibleCurrencies: CurrencyCode[] = ["IDR", "USD", "SGD", "EUR", "MYR", "AUD", "JPY", "KRW", "CNY"];

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const { isEnglish } = useLanguage();
  return <label className="currency-selector"><Coins size={15} /><span className="hide-mobile">{isEnglish ? "Currency" : "Mata uang"}</span><select value={currency} onChange={(event) => setCurrency(event.target.value as CurrencyCode)} aria-label={isEnglish ? "Choose display currency" : "Pilih mata uang tampilan"}>{visibleCurrencies.map((code) => <option key={code} value={code}>{code} · {currencyNames[code]}</option>)}</select></label>;
}
