import Link from "next/link";
import { ArrowUpRight, Award, Baby, BedDouble, Check, ChevronRight, CircleDollarSign, HeartPulse, Hospital, Languages, MapPin, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { InquiryForm } from "@/features/public-forms/components/forms";
import { ComparisonPackageButton } from "@/features/comparison/components/comparison-ui";
import { FacilityAccess } from "@/features/facility-access/components/facility-access";
import { organizations } from "@/data/demo/mock-data";
import { harapanKotaPackages, harapanKotaProfessionals, harapanKotaReviews, harapanKotaServices } from "@/features/hospital/data/harapan-kota";

const serviceIcons = { heart: HeartPulse, baby: Baby, bone: Stethoscope, scan: Sparkles, nutrition: CircleDollarSign, support: Languages } as const;
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function HarapanKotaLanding() {
  const partner = organizations.find((organization) => organization.slug === "harapan-kota");
  if (!partner) return null;
  return <main className="hospital-page">
    <section className="hospital-hero">
      <div className="container hospital-hero-grid">
        <div>
          <Link href="/explore" className="hospital-back">← Kembali ke katalog layanan</Link>
          <div className="hospital-label"><ShieldCheck size={15} /> Mitra fasyankes terverifikasi</div>
          <h1>Perawatan yang terasa <em>lebih dekat.</em></h1>
          <p>RS Harapan Kota adalah rumah sakit umum contoh dengan layanan ibu & anak, jantung, ortopedi, dan pemeriksaan preventif untuk pasien Jakarta maupun pasien dari luar kota.</p>
          <div className="hospital-hero-actions"><a className="btn btn-coral" href="#paket">Lihat paket layanan <ArrowUpRight size={17} /></a><a className="btn btn-outline" href="#inquiry">Ajukan inquiry</a></div>
          <div className="hospital-metrics"><span><b>24/7</b>IGD & layanan awal</span><span><b>3 bahasa</b>dukungan koordinasi</span><span><b>1–2 hari</b>respon inquiry</span></div>
        </div>
        <div className="hospital-hero-panel">
          <div className="hospital-hero-orb" />
          <div className="hospital-hero-copy"><span>RS HARAPAN KOTA</span><strong>Care in every<br />arrival.</strong><small>Jakarta Pusat · Indonesia</small></div>
          <div className="hospital-hero-card"><Hospital size={21} /><div><b>Patient Liaison Desk</b><small>Koordinasi non-klinis & kunjungan</small></div></div>
        </div>
      </div>
    </section>

    <section className="hospital-intro container">
      <div><p className="eyebrow">LAYANAN TERINTEGRASI</p><h2 className="section-title">Mulai dari kebutuhan Anda, bukan dari daftar yang rumit.</h2></div>
      <p>Tim kami membantu menyusun langkah awal: pilih layanan, kirim inquiry tanpa rekam medis, kemudian kami koordinasikan slot konsultasi dengan fasyankes.</p>
    </section>

    <section className="hospital-section hospital-soft"><div className="container"><div className="hospital-section-heading"><div><p className="eyebrow">LAYANAN UNGGULAN</p><h2 className="section-title">Ruang untuk setiap tahap perawatan.</h2></div><a href="#inquiry" className="hospital-text-link">Tanyakan layanan <ChevronRight size={16} /></a></div><div className="hospital-service-grid">{harapanKotaServices.map((service) => { const Icon = serviceIcons[service.icon as keyof typeof serviceIcons]; return <article className="hospital-service-card" key={service.name}><Icon size={25} /><h3>{service.name}</h3><p>{service.copy}</p><span>Pelajari alur <ArrowUpRight size={14} /></span></article>; })}</div></div></section>

    <section id="paket" className="hospital-section"><div className="container"><div className="hospital-section-heading"><div><p className="eyebrow">PAKET LAYANAN</p><h2 className="section-title">Rencana yang lebih mudah dipahami.</h2></div><p className="hospital-heading-copy">Harga berikut adalah ilustrasi MVP. Tim rumah sakit mengonfirmasi kesesuaian layanan dan biaya akhir setelah penilaian awal.</p></div><div className="hospital-package-grid">{harapanKotaPackages.map((pack) => <article className="hospital-package-card" key={pack.id}><span className="hospital-package-type">{pack.category}</span><h3>{pack.name}</h3><strong>{pack.price}</strong><p>{pack.note}</p><ul>{pack.highlights.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><details><summary>Detail cakupan <ChevronRight size={15} /></summary><ul className="hospital-detail-list">{pack.details.map((item) => <li key={item}>{item}</li>)}</ul></details><ComparisonPackageButton organizationId="01" service={pack.name} /><a href="#inquiry" className="btn btn-primary">Tanya paket ini <ArrowUpRight size={16} /></a></article>)}</div><p className="hospital-disclaimer">Informasi contoh untuk prototipe. Bukan penawaran medis, jaminan harga, maupun pengganti konsultasi dokter. Biaya dapat berubah sesuai asesmen klinis, kelas kamar, dan kebutuhan perawatan.</p></div></section>

    <section className="hospital-section hospital-staff"><div className="container"><div className="hospital-section-heading"><div><p className="eyebrow">TIM KAMI</p><h2 className="section-title">Orang yang hadir di balik setiap rencana.</h2></div><p className="hospital-heading-copy">Profil, sertifikasi, dan penghargaan di bawah ini adalah ilustrasi konten yang dikelola fasyankes.</p></div><div className="hospital-staff-grid">{harapanKotaProfessionals.map((person) => <article className="hospital-person-card" key={person.name}><div className={`hospital-person-image hospital-crop-${person.crop}`} style={{ backgroundImage: `url(${publicBasePath}/images/harapan-kota/care-team.png)` }} role="img" aria-label={`Ilustrasi ${person.role}`} /><div className="hospital-person-content"><p>{person.role}</p><h3>{person.name}</h3><span>{person.bio}</span><div className="hospital-tags">{person.certifications.map((certificate) => <b key={certificate}><ShieldCheck size={13} />{certificate}</b>)}</div><small><Award size={14} />{person.award}</small></div></article>)}</div></div></section>

    <section className="hospital-section hospital-awards"><div className="container hospital-awards-grid"><div><p className="eyebrow">MUTU & KEPERCAYAAN</p><h2 className="section-title">Standar yang dapat Anda tanyakan.</h2><p>Setiap mitra di Jakarta Health Journey melalui proses verifikasi informasi layanan. Dokumen dan klaim resmi tetap perlu diperiksa oleh tim pengelola sebelum dipublikasikan.</p></div><div className="hospital-award-list"><article><Award /><div><b>Akreditasi paripurna</b><span>Status akreditasi — contoh konten</span></div></article><article><ShieldCheck /><div><b>Komitmen keselamatan pasien</b><span>Program mutu & keselamatan — contoh konten</span></div></article><article><HeartPulse /><div><b>Excellence in maternal care</b><span>Penghargaan layanan ibu & anak — contoh</span></div></article></div></div></section>

    <section className="hospital-section"><div className="container"><div className="hospital-section-heading"><div><p className="eyebrow">FASILITAS</p><h2 className="section-title">Dibuat agar waktu tunggu terasa lebih ringan.</h2></div></div><div className="hospital-facilities">{[["Ruang bersalin privat","Pilihan ruang bersalin dengan pendampingan keluarga sesuai kebijakan fasilitas."],["Unit perawatan ibu & bayi","Ruang rawat yang mendukung kedekatan ibu dan bayi selama masa pemulihan."],["Lounge keluarga","Area tunggu yang tenang, Wi-Fi, dan informasi kunjungan yang mudah diakses."],["Aksesibilitas dasar","Rute kursi roda, lift, dan ruang tunggu prioritas pada area tertentu."],["Farmasi & laboratorium","Koordinasi kebutuhan penunjang sesuai arahan dokter dan jam operasional."],["Ruang edukasi pasien","Sesi persiapan pulang, edukasi perawatan, dan koordinasi pendamping." ]].map(([title, copy]) => <article key={title}><BedDouble size={22} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <FacilityAccess partner={partner} />

    <section className="hospital-section hospital-soft"><div className="container"><div className="hospital-section-heading"><div><p className="eyebrow">CERITA PASIEN</p><h2 className="section-title">Kesan baik dimulai dari informasi yang jelas.</h2></div><a className="hospital-text-link" href="#review-note">Kebijakan ulasan <ChevronRight size={16} /></a></div><div className="hospital-review-grid">{harapanKotaReviews.map((review) => <figure key={review.name}><div>“</div><blockquote>{review.quote}</blockquote><figcaption><b>{review.name}</b><span>{review.context}</span></figcaption></figure>)}</div><p id="review-note" className="hospital-disclaimer">Ulasan di atas adalah contoh untuk kebutuhan desain MVP. Saat terintegrasi, tautan akan mengarah ke sumber ulasan yang telah diverifikasi dan mengikuti kebijakan moderasi.</p></div></section>

    <section id="inquiry" className="hospital-inquiry"><div className="container hospital-inquiry-grid"><div><p className="eyebrow">MULAI DARI SINI</p><h2 className="section-title">Ceritakan kebutuhan awal Anda.</h2><p>Gunakan inquiry untuk pertanyaan layanan, ketersediaan konsultasi, atau paket. Jangan sertakan diagnosis, hasil laboratorium, rekam medis, atau informasi darurat.</p><div className="hospital-contact"><MapPin size={19} /><span>Jl. Contoh 01, Jakarta Pusat, DKI Jakarta<br /><b>Senin–Sabtu, 08.00–20.00</b></span></div></div><InquiryForm organizationId="01" services={[...harapanKotaServices.map((item) => item.name), ...harapanKotaPackages.map((item) => item.name)]} returnTo="/facility/harapan-kota" /></div></section>
  </main>;
}
