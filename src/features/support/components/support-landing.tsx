import Link from "next/link";
import { ArrowUpRight, Check, Globe2, MapPin, Plane, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import type { Organization } from "@/types/domain";
import { InquiryForm } from "@/features/public-forms/components/forms";
import { ComparisonPackageButton } from "@/features/comparison/components/comparison-ui";

type Offer = { name: string; price: string; copy: string; included: string[] };
type Profile = { eyebrow: string; title: string; description: string; tone: string; offers: Offer[]; benefits: string[] };

const profiles: Record<string, Profile> = {
  "rute-nusantara": { eyebrow: "TRAVEL SUPPORT · JAKARTA", title: "Perjalanan yang tertata, dari awal hingga tiba.", description: "Contoh travel agent untuk pengaturan perjalanan non-medis, penjemputan, dan koordinasi kebutuhan dasar selama berada di Jakarta.", tone: "#cb7648", offers: [
    { name: "Airport Welcome", price: "Mulai Rp450.000", copy: "Penjemputan bandara satu arah dengan koordinasi waktu kedatangan.", included: ["Kendaraan privat", "Pengemudi berbahasa Indonesia", "Koordinasi titik jemput"] },
    { name: "Care Visit Transfer", price: "Mulai Rp650.000", copy: "Antar-jemput non-medis dari hotel ke fasilitas sesuai jadwal.", included: ["Kendaraan privat", "Waktu tunggu dasar", "Koordinasi rute"] },
    { name: "Jakarta Stay Assist", price: "Mulai Rp1.850.000", copy: "Dukungan dasar perjalanan untuk tiga hari kunjungan.", included: ["Koordinasi transportasi", "Bantuan itinerary non-medis", "Satu contact person"] },
  ], benefits: ["Koordinasi jadwal non-medis", "Pilihan kendaraan sesuai kebutuhan", "Informasi perjalanan yang jelas"] },
  "langkah-jakarta": { eyebrow: "TRAVEL COMPANION · JAKARTA", title: "Ruang lebih untuk fokus pada kunjungan Anda.", description: "Contoh layanan perjalanan dengan pilihan transportasi pendamping dan koordinasi perjalanan yang fleksibel di wilayah Jakarta.", tone: "#4b86a8", offers: [
    { name: "City Arrival Transfer", price: "Mulai Rp500.000", copy: "Penjemputan bandara atau stasiun untuk satu perjalanan kedatangan.", included: ["Kendaraan privat", "Bantuan bagasi dasar", "Koordinasi titik jemput"] },
    { name: "Flexible Day Driver", price: "Mulai Rp1.250.000", copy: "Kendaraan dan pengemudi untuk agenda kunjungan dalam satu hari.", included: ["8 jam penggunaan", "Rute dalam Jakarta", "Koordinasi perubahan jadwal"] },
    { name: "Family Travel Plan", price: "Mulai Rp2.200.000", copy: "Pengaturan dasar perjalanan keluarga selama tiga hari.", included: ["Rencana perjalanan", "Koordinasi transportasi", "Dukungan contact person"] },
  ], benefits: ["Pengaturan rute fleksibel", "Pilihan kendaraan keluarga", "Dukungan perjalanan non-medis"] },
  "suara-global": { eyebrow: "LANGUAGE SUPPORT · JAKARTA", title: "Bahasa yang membuat koordinasi lebih mudah.", description: "Contoh penyedia penerjemah untuk komunikasi non-klinis antara pasien, keluarga, dan mitra layanan di Jakarta.", tone: "#8770a8", offers: [
    { name: "Interpreter On-call", price: "Mulai Rp750.000 / hari", copy: "Penerjemah untuk pendampingan agenda terjadwal di Jakarta.", included: ["Hingga 4 jam", "Indonesia · English", "Koordinasi pra-kunjungan"] },
    { name: "Full-day Language Support", price: "Mulai Rp1.400.000 / hari", copy: "Pendampingan bahasa sepanjang agenda kunjungan satu hari.", included: ["Hingga 8 jam", "Briefing kebutuhan", "Ringkasan non-klinis"] },
    { name: "Family Communication Assist", price: "Mulai Rp1.850.000 / hari", copy: "Dukungan bahasa untuk agenda keluarga dengan koordinasi lebih dari satu lokasi.", included: ["Hingga 8 jam", "Koordinasi multi-lokasi", "Penerjemah bersiaga"] },
  ], benefits: ["Penerjemah terverifikasi", "Basic Life Support — contoh", "Pelatihan keperawatan dasar — contoh"] },
  "lintas-bahasa": { eyebrow: "LANGUAGE SUPPORT · JAKARTA", title: "Mendampingi komunikasi, menjaga rasa percaya diri.", description: "Contoh layanan penerjemah Indonesia, Inggris, dan Mandarin untuk kebutuhan komunikasi non-klinis pasien dan keluarga.", tone: "#0a8f86", offers: [
    { name: "Mandarin Care Companion", price: "Mulai Rp900.000 / hari", copy: "Pendampingan bahasa Mandarin untuk agenda kunjungan terjadwal.", included: ["Hingga 4 jam", "Briefing kebutuhan", "Indonesia · Mandarin"] },
    { name: "Full-day Interpreter", price: "Mulai Rp1.500.000 / hari", copy: "Penerjemah siaga untuk satu hari agenda non-klinis di Jakarta.", included: ["Hingga 8 jam", "Indonesia · English/Mandarin", "Koordinasi pra-kunjungan"] },
    { name: "Arrival & Stay Support", price: "Mulai Rp2.000.000 / hari", copy: "Dukungan bahasa pada hari kedatangan dan pengaturan kebutuhan perjalanan.", included: ["Hingga 8 jam", "Koordinasi hotel/travel", "Penerjemah bersiaga"] },
  ], benefits: ["Basic Life Support — contoh", "Pelatihan keperawatan dasar — contoh", "Dukungan bahasa 3 bahasa"] },
};

export function SupportLanding({ partner }: { partner: Organization }) {
  const profile = profiles[partner.slug];
  if (!profile) return null;
  const isTravel = partner.type === "Travel Agent";
  const Icon = isTravel ? Plane : Globe2;
  const benefitDetails = isTravel
    ? ["Rute, waktu, dan titik jemput dapat diselaraskan dengan agenda kunjungan Anda.", "Tersedia pilihan kendaraan untuk individu, pendamping, atau keluarga kecil.", "Koordinasi terbatas pada kebutuhan perjalanan dan tidak mencakup layanan medis."]
    : ["Status sertifikasi dicantumkan sebagai contoh konten yang dapat diverifikasi oleh mitra.", "Pelatihan dasar membantu penerjemah bersiaga saat mendampingi pasien di luar rumah sakit.", "Pilihan bahasa dan durasi pendampingan dikonfirmasi sebelum jadwal ditetapkan."];
  return <main className="support-landing" style={{ "--support-tone": profile.tone } as React.CSSProperties}>
    <section className="support-hero"><div className="container"><Link href="/support" className="support-back">← Kembali ke dukungan perjalanan</Link><p><Icon size={15} /> {profile.eyebrow}</p><h1>{profile.title}</h1><span>{profile.description}</span><a href="#support-inquiry" className="btn btn-coral">Mulai inquiry <ArrowUpRight size={17} /></a></div></section>
    <section className="container support-summary"><article><MapPin size={20} /><b>{partner.area}</b><span>{partner.address}</span></article><article><ShieldCheck size={20} /><b>Mitra terverifikasi</b><span>Informasi dikelola oleh mitra</span></article><article><UsersRound size={20} /><b>Respons 1–2 hari</b><span>Konfirmasi inquiry non-medis</span></article></section>
    <section className="support-section"><div className="container"><div className="support-heading"><div><p>LAYANAN & TARIF</p><h2>Pilih yang paling sesuai dengan rencana Anda.</h2></div><span>Anda dapat membandingkan hingga lima layanan dalam kategori yang sama.</span></div><div className="support-offer-grid">{profile.offers.map((offer) => <article key={offer.name}><Sparkles size={19} /><h3>{offer.name}</h3><strong>{offer.price}</strong><p>{offer.copy}</p><ul>{offer.included.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><ComparisonPackageButton organizationId={partner.id} service={offer.name} /><a href="#support-inquiry">Tanyakan layanan <ArrowUpRight size={15} /></a></article>)}</div></div></section>
    <section className="support-section support-benefit"><div className="container"><div><p>YANG DAPAT DIHARAPKAN</p><h2>Dukungan yang tetap berada di luar layanan medis.</h2><span>Setiap detail layanan disepakati bersama mitra melalui inquiry sebelum jadwal dikonfirmasi.</span></div><div>{profile.benefits.map((benefit, index) => <article key={benefit}><em>0{index + 1}</em><ShieldCheck size={20} /><div><b>{benefit}</b><span>{benefitDetails[index]}</span></div><ArrowUpRight size={17} /></article>)}</div></div></section>
    <section id="support-inquiry" className="support-inquiry"><div className="container"><div><p>INQUIRY LAYANAN</p><h2>Mulai dari kebutuhan perjalanan Anda.</h2><span>Tuliskan kebutuhan singkat, tanggal, dan preferensi bahasa. Jangan sertakan rekam medis atau informasi darurat.</span></div><InquiryForm organizationId={partner.id} services={profile.offers.map((offer) => offer.name)} returnTo={`/facility/${partner.slug}`} /></div></section>
  </main>;
}
