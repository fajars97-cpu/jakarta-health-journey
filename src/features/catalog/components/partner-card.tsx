import Link from "next/link";
import { ArrowRight, CheckCircle2, Languages, MapPin } from "lucide-react";
import type { Organization } from "@/types/domain";

export function PartnerCard({ partner }: { partner: Organization }) {
  return <article className="card partner-card" style={{ padding: 20, display: "grid", gap: 13 }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span className="badge badge-neutral">{partner.type}</span><span className="badge badge-verified"><CheckCircle2 size={14} />Verified</span></div>
    <div><h3 style={{ margin: "0 0 7px", color: "var(--navy)", fontSize: 18 }}>{partner.name}</h3><p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#506878" }}>{partner.summary}</p></div>
    <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#466071" }}><span style={{ display: "flex", gap: 6 }}><MapPin size={16} />{partner.area}</span><span style={{ display: "flex", gap: 6 }}><Languages size={16} />{partner.languages.join(" · ")}</span></div>
    <Link href={`/facility/${partner.slug}`} className="btn btn-outline" style={{ fontSize: 14 }}>Lihat Detail <ArrowRight size={16} /></Link>
  </article>;
}
