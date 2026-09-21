import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Globe2, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PublicShell } from "@/components/layouts/public-shell";
import { InquiryForm } from "@/features/public-forms/components/forms";
import { HarapanKotaLanding } from "@/features/hospital/components/harapan-kota-landing";
import { PartnerLanding } from "@/features/hospital/components/partner-landing";
import { dataService } from "@/services/data-service";

export async function generateStaticParams() { return dataService.listOrganizations().map((organization) => ({ slug: organization.slug })); }

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = dataService.findBySlug(slug);
  if (!partner) notFound();
  if (slug === "harapan-kota") return <PublicShell><HarapanKotaLanding /></PublicShell>;
  if (["sahabat-keluarga", "cakrawala-medika", "mentari-prima", "sehat-sudirman"].includes(slug)) return <PublicShell><PartnerLanding partner={partner} /></PublicShell>;
  const isFacility = ["Rumah Sakit", "Klinik"].includes(partner.type);
  return <PublicShell><main className="container" style={{ padding: "42px 0" }}>
    <Link href={isFacility ? "/explore" : "/support"} className="hint">← Kembali ke katalog</Link>
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(320px,.85fr)", gap: 30, marginTop: 22 }}>
      <section><div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}><span className="badge badge-neutral">{partner.type}</span><span className="badge badge-verified"><CheckCircle2 size={14} />Verified</span></div><h1 className="section-title" style={{ fontSize: 42, marginTop: 16 }}>{partner.name}</h1><p style={{ fontSize: 17, lineHeight: 1.6, color: "#516e7e" }}>{partner.summary}</p>
        <div className="card" style={{ padding: 22, display: "grid", gap: 16, marginTop: 25 }}><h2 style={{ margin: 0, color: "var(--navy)", fontSize: 20 }}>Informasi layanan</h2><p style={{ margin: 0 }}><b>Layanan unggulan</b><br />{partner.services.join(" · ")}</p><p style={{ margin: 0, display: "flex", gap: 9 }}><MapPin size={19} color="#0e887f" />{partner.address}</p><p style={{ margin: 0, display: "flex", gap: 9 }}><Phone size={19} color="#0e887f" />{partner.contact}</p><p style={{ margin: 0, display: "flex", gap: 9 }}><Globe2 size={19} color="#0e887f" />{partner.languages.join(" · ")}</p><p style={{ margin: 0, display: "flex", gap: 9 }}><Clock size={19} color="#0e887f" />{partner.hours}</p><p style={{ margin: 0, display: "flex", gap: 9 }}><ShieldCheck size={19} color="#0e887f" />{partner.accessibility.join(" · ")}</p></div>
        <div className="card" style={{ padding: 20, marginTop: 18, background: "#f1f8fb" }}><b>Estimasi proses inquiry</b><p style={{ marginBottom: 0 }}>Mitra biasanya mengonfirmasi penerimaan inquiry dalam 1–2 hari kerja. Ini bukan estimasi diagnosis atau tindakan medis.</p></div>
      </section>
      <aside><a href={`tel:${partner.contact.replaceAll(" ", "")}`} className="btn btn-primary" style={{ width: "100%" }}>Hubungi {isFacility ? "Fasyankes" : "Mitra"} Langsung</a>{isFacility && <Link href="/support" className="btn btn-secondary" style={{ width: "100%", marginTop: 10 }}>Butuh Dukungan Perjalanan?</Link>}<div style={{ marginTop: 18 }}><InquiryForm organizationId={partner.id} services={partner.services} returnTo={`/facility/${slug}`} /></div></aside>
    </div>
  </main></PublicShell>;
}
