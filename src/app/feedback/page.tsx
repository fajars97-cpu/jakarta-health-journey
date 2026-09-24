"use client";

import { MessageCircleHeart } from "lucide-react";
import { PublicShell } from "@/components/layouts/public-shell";
import { FeedbackForm } from "@/features/public-forms/components/forms";
import { useLanguage } from "@/features/i18n/language-context";

export default function FeedbackPage() {
  const { isEnglish } = useLanguage();
  const copy = isEnglish ? { eyebrow: "FEEDBACK & REPORTS", title: "Help us maintain a reliable service standard.", intro: "Your feedback is reviewed by the committee. Do not include private medical information or sensitive data." } : { eyebrow: "MASUKAN & LAPORAN", title: "Bantu kami menjaga standar layanan.", intro: "Masukan Anda ditinjau oleh panitia. Jangan sertakan informasi medis pribadi atau data sensitif." };
  return <PublicShell><main><section className="page-intro"><div className="container" style={{ maxWidth: 780 }}><p className="eyebrow"><MessageCircleHeart size={14} /> {copy.eyebrow}</p><h1 className="section-title">{copy.title}</h1><p>{copy.intro}</p></div></section><section className="container" style={{ padding: "26px 0 65px", maxWidth: 780 }}><FeedbackForm /></section></main></PublicShell>;
}
