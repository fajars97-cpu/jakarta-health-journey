import Link from "next/link";
import { ArrowUpRight, Award, Check, CircleDollarSign, Clock3, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import type { Organization } from "@/types/domain";
import { InquiryForm } from "@/features/public-forms/components/forms";
import { ComparisonPackageButton } from "@/features/comparison/components/comparison-ui";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const profiles = {
  "sahabat-keluarga": {
    eyebrow: "RUMAH SAKIT KELUARGA", title: "Tumbuh sehat, bersama.", accent: "#d67f50", image: "sahabat-keluarga.png",
    description: "Rumah sakit keluarga contoh yang menghubungkan kebutuhan ibu, anak, dan keluarga dalam satu perjalanan perawatan yang hangat.",
    services: ["Klinik tumbuh kembang", "Konsultasi kehamilan", "Imunisasi keluarga", "Medical check-up keluarga"],
    packages: [["Family Well-check", "Mulai Rp1.750.000", "Konsultasi umum, pemeriksaan dasar, dan ringkasan kunjungan."], ["Persiapan Kelahiran", "Mulai Rp3.500.000", "Kelas persiapan, konsultasi awal, dan tur ruang bersalin."], ["Tumbuh Kembang Anak", "Mulai Rp1.250.000", "Skrining awal dan konsultasi koordinasi keluarga."]],
    trust: ["Area bermain anak", "Ruang laktasi", "Pendamping keluarga"],
  },
  "cakrawala-medika": {
    eyebrow: "PUSAT RUJUKAN TERINTEGRASI", title: "Lebih jelas, menuju pulih.", accent: "#168b98", image: "cakrawala-medika.png",
    description: "Fasilitas rujukan contoh untuk jantung, rehabilitasi, dan pemeriksaan lanjutan dengan koordinasi kunjungan yang lebih terarah.",
    services: ["Konsultasi jantung", "Rehabilitasi medik", "Ortopedi terpadu", "Medical check-up eksekutif"],
    packages: [["Cardiac First Step", "Mulai Rp5.800.000", "Koordinasi konsultasi awal dan pemeriksaan sesuai indikasi."], ["Mobility Recovery", "Mulai Rp3.250.000", "Penilaian rehabilitasi dan program awal pemulihan."], ["Executive Screening", "Mulai Rp4.950.000", "Pemeriksaan preventif dengan pengaturan jadwal satu hari."]],
    trust: ["Navigator pasien", "Koordinasi rujukan", "Ruang rehabilitasi"],
  },
  "mentari-prima": {
    eyebrow: "AESTHETIC & WELLNESS CLINIC", title: "Kulit sehat, rasa percaya diri yang utuh.", accent: "#bd7869", image: "mentari-prima.png",
    description: "Klinik estetika dan wellness contoh dengan konsultasi kulit yang personal, program perawatan bertahap, serta pengalaman kunjungan yang nyaman.",
    services: ["Konsultasi dermatologi", "Skin rejuvenation", "Acne management", "Nutrisi & wellness"],
    packages: [["Skin Discovery", "Mulai Rp650.000", "Konsultasi kulit, analisis awal, dan rencana perawatan personal."], ["Clear Confidence", "Mulai Rp1.850.000", "Program perawatan jerawat bertahap sesuai asesmen dokter."], ["Glow & Restore", "Mulai Rp2.450.000", "Program peremajaan non-invasif dan home-care guidance."]],
    trust: ["Konsultasi privat", "Ruang tindakan nyaman", "After-care guidance"],
  },
  "sehat-sudirman": {
    eyebrow: "KLINIK PREVENTIF PERKOTAAN", title: "Waktu Anda berharga. Kesehatan juga.", accent: "#4b8fc1", image: "sehat-sudirman.png",
    description: "Klinik rawat jalan contoh di kawasan Sudirman untuk konsultasi umum, medical check-up, dan rencana kesehatan preventif yang efisien.",
    services: ["Konsultasi dokter umum", "Medical check-up cepat", "Skrining metabolik", "Vaksinasi dewasa"],
    packages: [["Office Health Check", "Mulai Rp850.000", "Pemeriksaan dasar dan konsultasi hasil untuk ritme kerja aktif."], ["Metabolic Reset", "Mulai Rp1.450.000", "Skrining metabolik dan rencana langkah kesehatan awal."], ["Travel Ready", "Mulai Rp1.100.000", "Konsultasi perjalanan dan pilihan vaksinasi sesuai kebutuhan."]],
    trust: ["Slot kunjungan fleksibel", "Akses kursi roda", "Ringkasan kunjungan"],
  },
} as const;

const teamBySlug = {
  "sahabat-keluarga": [["dr. Aulia Nirmala, Sp.A", "Dokter anak", "Fokus tumbuh kembang dan komunikasi keluarga."], ["Dina Arum, S.Tr.Keb.", "Bidan koordinator", "Pendampingan persiapan kelahiran dan pasca-pulang."], ["Rafa Pradana, M.Psi.", "Psikolog keluarga", "Dukungan adaptasi keluarga pada tiap tahap."]],
  "cakrawala-medika": [["dr. Bima Satrya, Sp.JP", "Dokter spesialis jantung", "Koordinasi evaluasi dan rencana perawatan."], ["Maya Kartika, S.Ft., Ftr.", "Fisioterapis", "Program mobilitas dan pemulihan bertahap."], ["Arvin Utama, S.Kep., Ns.", "Perawat navigator", "Koordinasi persiapan kunjungan dan tindak lanjut."]],
  "mentari-prima": [["dr. Kirana Putri, Sp.D.V.E.", "Dokter kulit & kelamin", "Konsultasi kulit berbasis kebutuhan individual."], ["Nadia Syifa, A.Md.Kes.", "Terapis klinik", "Pendampingan prosedur non-invasif dan after-care."], ["Salsa Permata, S.Gz.", "Wellness nutritionist", "Edukasi kebiasaan yang mendukung kesehatan kulit."]],
  "sehat-sudirman": [["dr. Raka Wibowo", "Dokter umum", "Konsultasi preventif yang praktis dan terarah."], ["Vina Lestari, S.Kep., Ns.", "Perawat klinik", "Koordinasi pemeriksaan dan edukasi pra-pulang."], ["Fara Anindita, S.Gz.", "Ahli gizi", "Rencana pola makan yang realistis untuk pekerja aktif."]],
} as const;

export function PartnerLanding({ partner }: { partner: Organization }) {
  const profile = profiles[partner.slug as keyof typeof profiles];
  if (!profile) return null;
  const team = teamBySlug[partner.slug as keyof typeof teamBySlug];
  const allServices = [...profile.services, ...profile.packages.map((item) => item[0])];
  return <main className="partner-landing" style={{ "--partner-accent": profile.accent } as React.CSSProperties}>
    <section className="partner-hero" style={{ backgroundImage: `linear-gradient(90deg, #082b4af5 0%, #082b4ad9 38%, #082b4a15 78%), url(${publicBasePath}/images/partner-landing/${profile.image})` }}><div className="container"><Link href="/explore" className="partner-back">← Kembali ke katalog</Link><div className="partner-hero-content"><p><ShieldCheck size={15} /> {profile.eyebrow}</p><h1>{profile.title}</h1><span>{profile.description}</span><div><a href="#partner-inquiry" className="btn btn-coral">Mulai konsultasi <ArrowUpRight size={17} /></a><a href="#partner-packages" className="btn btn-outline">Lihat layanan</a></div></div></div></section>
    <section className="container partner-summary"><article><MapPin size={20} /><b>{partner.area}</b><span>{partner.address}</span></article><article><Clock3 size={20} /><b>Respons 1–2 hari</b><span>Konfirmasi inquiry non-klinis</span></article><article><ShieldCheck size={20} /><b>Mitra terverifikasi</b><span>Informasi dikelola fasyankes</span></article></section>
    <section className="partner-section"><div className="container"><div className="partner-heading"><div><p>LAYANAN PILIHAN</p><h2>Dirancang sesuai kebutuhan Anda.</h2></div><span>Setiap layanan akan dikonfirmasi setelah inquiry awal.</span></div><div className="partner-services">{profile.services.map((service, index) => <article key={service}><em>0{index + 1}</em><h3>{service}</h3><p>Informasi awal, pilihan jadwal, dan koordinasi layanan dari tim {partner.name}.</p><a href="#partner-inquiry">Pelajari layanan <ArrowUpRight size={14} /></a></article>)}</div></div></section>
    <section id="partner-packages" className="partner-section partner-tint"><div className="container"><div className="partner-heading"><div><p>PROGRAM & PAKET</p><h2>Langkah awal yang transparan.</h2></div><span>Harga merupakan ilustrasi paket MVP dan dapat berubah setelah asesmen.</span></div><div className="partner-packages">{profile.packages.map(([name, price, copy]) => <article key={name}><Sparkles size={20} /><h3>{name}</h3><strong>{price}</strong><p>{copy}</p><ul><li><Check size={14} />Koordinasi jadwal awal</li><li><Check size={14} />Penjelasan cakupan layanan</li></ul><ComparisonPackageButton organizationId={partner.id} service={name} /><a href="#partner-inquiry">Tanya paket <ArrowUpRight size={16} /></a></article>)}</div></div></section>
    <section className="partner-section"><div className="container partner-trust"><div><p>KENYAMANAN KUNJUNGAN</p><h2>Detail kecil yang membuat perbedaan.</h2><span>Fasilitas dan informasi ini adalah contoh konten profil yang dapat diperbarui oleh admin fasyankes.</span></div><div>{profile.trust.map((item) => <article key={item}><CircleDollarSign size={20} /><b>{item}</b><span>Informasi layanan tersedia saat konfirmasi kunjungan.</span></article>)}</div></div></section>
    <section className="partner-section partner-team"><div className="container"><div className="partner-heading"><div><p>TIM PROFESIONAL</p><h2>Orang yang mendampingi tiap langkah.</h2></div><span>Profil dan sertifikasi berikut adalah konten contoh yang kelak dikelola oleh fasyankes.</span></div><div className="partner-team-grid">{team.map(([name, role, copy], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><p>{role}</p><h3>{name}</h3><small>{copy}</small><b><ShieldCheck size={13} />Sertifikasi profesi — contoh</b></article>)}</div></div></section>
    <section className="partner-section partner-quality"><div className="container"><div><p>STANDAR MUTU</p><h2>Informasi yang pantas untuk ditanyakan.</h2><span>Area ini menampung dokumen akreditasi, sertifikasi, dan penghargaan fasyankes setelah diverifikasi oleh admin Jakarta Health Journey.</span></div><div><article><Award size={22} /><b>Akreditasi layanan</b><span>Status akreditasi — mock-up</span></article><article><ShieldCheck size={22} /><b>Keselamatan pasien</b><span>Program mutu — mock-up</span></article><article><Star size={22} /><b>Pengalaman pasien</b><span>Penghargaan layanan — mock-up</span></article></div></div></section>
    <section className="partner-section"><div className="container"><div className="partner-heading"><div><p>ULASAN & CERITA</p><h2>Pengalaman yang membangun kepercayaan.</h2></div><span>Semua ulasan berikut adalah contoh untuk desain MVP dan bukan ulasan publik nyata.</span></div><div className="partner-review-grid">{["Penjelasan alur kunjungan sangat membantu sejak inquiry pertama.", "Tim membuat pilihan layanan dan jadwal terasa lebih mudah dipahami.", "Area tunggu dan informasi pendamping terasa nyaman dan rapi."].map((quote, index) => <article key={quote}><span>“</span><p>{quote}</p><b>Pasien & keluarga · contoh {index + 1}</b></article>)}</div></div></section>
    <section id="partner-inquiry" className="partner-inquiry"><div className="container"><div><p>INQUIRY LAYANAN</p><h2>Rencanakan kunjungan dengan lebih tenang.</h2><span>Tulis kebutuhan singkat Anda. Jangan sertakan rekam medis, hasil laboratorium, atau informasi darurat.</span></div><InquiryForm organizationId={partner.id} services={allServices} returnTo={`/facility/${partner.slug}`} /></div></section>
  </main>;
}
