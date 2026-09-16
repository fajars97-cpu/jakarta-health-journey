import { PublicShell } from "@/components/layouts/public-shell";
import { PartnerCard } from "@/features/catalog/components/partner-card";
import { LanguageSupport } from "@/features/language/components/language-support";
import { dataService } from "@/services/data-service";
import { PartnerType } from "@/types/domain";
import { Info, Plane } from "lucide-react";

export default function Support() {
  const list = dataService.listPublic().filter(x => ![PartnerType.Hospital, PartnerType.Clinic, PartnerType.Translator].includes(x.type));
  return <PublicShell><main><section className="page-intro"><div className="container"><p className="eyebrow"><Plane size={14} /> TRAVEL SUPPORT</p><h1 className="section-title">Dukungan yang hadir di sepanjang perjalanan Anda.</h1><p>Dari akomodasi hingga mobilitas, temukan partner pendukung agar Anda bisa fokus pada perjalanan yang lebih tenang.</p></div></section><section className="container" style={{ padding: "18px 0 65px" }}><div className="card" style={{ margin: "0 0 28px", padding: 18, display: "flex", gap: 11, background: "#eff9f8", borderColor: "#cceae5" }}><Info color="#0d887f" /><span><b>Dukungan bersifat opsional.</b> Partner perjalanan tidak memberi rekomendasi atau keputusan medis.</span></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>{list.map(x => <PartnerCard key={x.id} partner={x} />)}</div><LanguageSupport /></section></main></PublicShell>;
}
