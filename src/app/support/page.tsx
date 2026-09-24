"use client";

import { Info, Plane } from "lucide-react";
import { PublicShell } from "@/components/layouts/public-shell";
import { PartnerCard } from "@/features/catalog/components/partner-card";
import { LanguageSupport } from "@/features/language/components/language-support";
import { useLanguage } from "@/features/i18n/language-context";
import { dataService } from "@/services/data-service";
import { PartnerType } from "@/types/domain";

export default function Support() {
  const { isEnglish } = useLanguage();
  const list = dataService.listPublic().filter((x) => ![PartnerType.Hospital, PartnerType.Clinic, PartnerType.Translator].includes(x.type));
  const copy = isEnglish ? { eyebrow: "TRAVEL SUPPORT", title: "Support that stays with you beyond medical care.", intro: "From accommodation to mobility, find trusted partners so you can focus on a calmer journey.", optional: "Support is optional.", notice: "Travel partners do not provide medical recommendations or decisions." } : { eyebrow: "DUKUNGAN PERJALANAN", title: "Dukungan yang tetap hadir di luar layanan medis.", intro: "Dari akomodasi hingga mobilitas, temukan mitra tepercaya agar Anda dapat fokus pada perjalanan yang lebih tenang.", optional: "Dukungan bersifat opsional.", notice: "Mitra perjalanan tidak memberikan rekomendasi atau keputusan medis." };
  return <PublicShell><main><section className="page-intro"><div className="container"><p className="eyebrow"><Plane size={14} /> {copy.eyebrow}</p><h1 className="section-title">{copy.title}</h1><p>{copy.intro}</p></div></section><section className="container" style={{ padding: "18px 0 65px" }}><div className="card" style={{ margin: "0 0 28px", padding: 18, display: "flex", gap: 11, background: "#eff9f8", borderColor: "#cceae5" }}><Info color="#0d887f" /><span><b>{copy.optional}</b> {copy.notice}</span></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>{list.map((x) => <PartnerCard key={x.id} partner={x} />)}</div><LanguageSupport /></section></main></PublicShell>;
}
