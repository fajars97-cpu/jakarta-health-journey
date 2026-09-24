"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Languages, MapPin } from "lucide-react";
import type { Organization } from "@/types/domain";
import { useLanguage } from "@/features/i18n/language-context";

const typeLabels = { "Rumah Sakit": "Hospital", "Klinik": "Clinic", "Hotel": "Hotel", "Travel Agent": "Travel agent", "Penerjemah": "Interpreter" } as const;
const summaryEnglish: Record<string, string> = {
  "harapan-kota": "General hospital with services for international patients.", "sahabat-keluarga": "Integrated care focused on families.", "cakrawala-medika": "Referral facility with a dedicated patient navigator.", "sehat-sudirman": "Outpatient clinic in the Sudirman area.", "mentari-prima": "Community clinic with basic accessibility support.", "teduh-cikini": "Optional accommodation close to several healthcare facilities.", "selaras-kemang": "A stay option with a limited number of accessible rooms.", "rute-nusantara": "Support for non-medical travel arrangements.", "langkah-jakarta": "Coordination for transport and accommodation based on patient needs.", "suara-global": "Interpreter support for non-clinical communication.", "lintas-bahasa": "Indonesian, English, and Mandarin language support."
};
const servicesEnglish: Record<string, string[]> = {
  "harapan-kota": ["Cardiology", "Orthopedics", "Medical check-up"], "sahabat-keluarga": ["Maternal & child care", "Neurology", "Family medical check-up"], "cakrawala-medika": ["Oncology", "Rehabilitation", "Cardiology"], "sehat-sudirman": ["Medical check-up", "Dental care"], "mentari-prima": ["Rehabilitation", "Family health"], "teduh-cikini": ["Companion-friendly accommodation"], "selaras-kemang": ["Accessible accommodation"], "rute-nusantara": ["Airport transfers"], "langkah-jakarta": ["Companion transport"], "suara-global": ["Language interpreting"], "lintas-bahasa": ["Language interpreting"]
};
const languageLabelsId: Record<string, string> = { English: "Inggris", Arabic: "Arab", Japanese: "Jepang", Korean: "Korea", Mandarin: "Mandarin", Indonesian: "Indonesia" };

export function PartnerCard({ partner }: { partner: Organization }) {
  const { isEnglish } = useLanguage();
  const type = isEnglish ? typeLabels[partner.type] : partner.type;
  const summary = isEnglish ? summaryEnglish[partner.slug] ?? partner.summary : partner.summary;
  return <article className="card partner-card" style={{ padding: 20, display: "grid", gap: 13 }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span className="badge badge-neutral">{type}</span><span className="badge badge-verified"><CheckCircle2 size={14} />{isEnglish ? "Verified" : "Terverifikasi"}</span></div>
    <div><h3 style={{ margin: "0 0 7px", color: "var(--navy)", fontSize: 18 }}>{partner.name}</h3><p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#506878" }}>{summary}</p></div>
    <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#466071" }}><span style={{ display: "flex", gap: 6 }}><MapPin size={16} />{partner.area}</span><span style={{ display: "flex", gap: 6 }}><Languages size={16} />{(isEnglish ? partner.languages : partner.languages.map((language) => languageLabelsId[language] ?? language)).join(" · ")}</span><span style={{ display: "flex", gap: 6 }}><b style={{ fontSize: 11 }}>{isEnglish ? "Services" : "Layanan"}:</b>{(isEnglish ? servicesEnglish[partner.slug] ?? partner.services : partner.services).join(" · ")}</span></div>
    <Link href={`/facility/${partner.slug}`} className="btn btn-outline" style={{ fontSize: 14 }}>{isEnglish ? "View details" : "Lihat detail"} <ArrowRight size={16} /></Link>
  </article>;
}
