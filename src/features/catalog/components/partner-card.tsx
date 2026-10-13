"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import type { Organization } from "@/types/domain";
import { useLanguage } from "@/features/i18n/language-context";
import { ComparisonPackageButton } from "@/features/comparison/components/comparison-ui";

const typeLabels = { "Rumah Sakit": "Hospital", "Klinik": "Clinic", "Hotel": "Hotel", "Travel Agent": "Travel agent", "Penerjemah": "Interpreter" } as const;
const summaryEnglish: Record<string, string> = {
  "harapan-kota": "General hospital with services for international patients.", "sahabat-keluarga": "Integrated care focused on families.", "cakrawala-medika": "Referral facility with a dedicated patient navigator.", "sehat-sudirman": "Outpatient clinic in the Sudirman area.", "mentari-prima": "Community clinic with basic accessibility support.", "teduh-cikini": "Optional accommodation close to several healthcare facilities.", "selaras-kemang": "A stay option with a limited number of accessible rooms.", "rute-nusantara": "Support for non-medical travel arrangements.", "langkah-jakarta": "Coordination for transport and accommodation based on patient needs.", "suara-global": "Interpreter support for non-clinical communication.", "lintas-bahasa": "Indonesian, English, and Mandarin language support."
};
const servicesEnglish: Record<string, string[]> = {
  "harapan-kota": ["Cardiology", "Orthopedics", "Medical check-up"], "sahabat-keluarga": ["Maternal & child care", "Neurology", "Family medical check-up"], "cakrawala-medika": ["Oncology", "Rehabilitation", "Cardiology"], "sehat-sudirman": ["Medical check-up", "Dental care"], "mentari-prima": ["Rehabilitation", "Family health"], "teduh-cikini": ["Companion-friendly accommodation"], "selaras-kemang": ["Accessible accommodation"], "rute-nusantara": ["Airport transfers"], "langkah-jakarta": ["Companion transport"], "suara-global": ["Language interpreting"], "lintas-bahasa": ["Language interpreting"]
};
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PartnerCard({ partner }: { partner: Organization }) {
  const { isEnglish } = useLanguage();
  const type = isEnglish ? typeLabels[partner.type] : partner.type;
  const summary = isEnglish ? summaryEnglish[partner.slug] ?? partner.summary : partner.summary;
  const services = isEnglish ? servicesEnglish[partner.slug] ?? partner.services : partner.services;
  const primaryService = partner.services[0] ?? (isEnglish ? "General service" : "Layanan umum");

  return <article className="card partner-card">
    <div className={`partner-card-visual ${partner.imageType === "logo" ? "partner-card-logo" : ""} ${partner.image?.includes("care-team") ? "partner-card-team" : ""}`}>
      {partner.image ? <Image src={`${publicBasePath}/${partner.image}`} alt={partner.imageAlt ?? partner.name} fill priority={partner.slug === "harapan-kota"} sizes="(max-width: 760px) 100vw, 280px" /> : <span aria-hidden="true">{partner.name.slice(0, 1)}</span>}
    </div>
    <div className="partner-card-body">
      <div className="partner-card-badges"><span className="badge badge-neutral">{type}</span><span className="badge badge-verified"><CheckCircle2 size={14} />{isEnglish ? "Verified" : "Terverifikasi"}</span></div>
      <div><h3>{partner.name}</h3><p>{summary}</p></div>
      <div className="partner-card-meta">
        <span><MapPin size={16} />{partner.area}</span>
        <span><b>{isEnglish ? "Services" : "Layanan"}:</b> {services.join(" · ")}</span>
        {partner.accessibility[0] && <span><b>{isEnglish ? "Access" : "Akses"}:</b> {partner.accessibility[0]}</span>}
      </div>
      <div className="partner-card-actions">
        <Link href={`/facility/${partner.slug}`} className="btn btn-outline">{isEnglish ? "View details" : "Lihat detail"} <ArrowRight size={16} /></Link>
        <ComparisonPackageButton organizationId={partner.id} service={primaryService} compact />
      </div>
    </div>
  </article>;
}
