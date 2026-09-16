import { MessageCircleHeart } from "lucide-react";
import { PublicShell } from "@/components/layouts/public-shell";
import { FeedbackForm } from "@/features/public-forms/components/forms";

export default function FeedbackPage() {
  return <PublicShell><main><section className="page-intro"><div className="container" style={{ maxWidth: 780 }}><p className="eyebrow"><MessageCircleHeart size={14} /> FEEDBACK & KELUHAN</p><h1 className="section-title">Bantu kami menjaga standar layanan.</h1><p>Masukan Anda ditinjau oleh panitia. Jangan sertakan informasi medis pribadi atau data sensitif.</p></div></section><section className="container" style={{ padding: "26px 0 65px", maxWidth: 780 }}><FeedbackForm /></section></main></PublicShell>;
}
