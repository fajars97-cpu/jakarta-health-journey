import Link from "next/link";
import { ArrowRight, BadgeCheck, BedDouble, ClipboardCheck, FileText, HelpCircle, MapPinned, MessageCircleQuestion, ShieldCheck, Stethoscope, TrainFront, UsersRound } from "lucide-react";

const journeySteps = [
  { number: "01", icon: Stethoscope, title: "Pahami kebutuhan", copy: "Mulai dari layanan yang Anda cari, tanpa memasukkan rekam medis atau informasi darurat.", href: "/explore", cta: "Jelajahi fasyankes" },
  { number: "02", icon: ClipboardCheck, title: "Bandingkan pilihan", copy: "Lihat harga ilustrasi, cakupan, durasi, akses, dan ketentuan dari paket yang relevan.", href: "/compare", cta: "Buka perbandingan" },
  { number: "03", icon: MessageCircleQuestion, title: "Kirim inquiry", copy: "Buat akun agar inquiry, jadwal, dan pembaruan dari mitra tersimpan di dashboard Anda.", href: "/register", cta: "Buat akun" },
  { number: "04", icon: MapPinned, title: "Atur perjalanan", copy: "Tambahkan hotel, travel agent, penerjemah, dan informasi transportasi sesuai kebutuhan.", href: "/support", cta: "Lihat dukungan" },
];

const guideTopics = [
  { icon: BadgeCheck, title: "Memilih fasyankes", copy: "Hal yang perlu dicek pada profil mitra, dokter, layanan, dan status verifikasi.", href: "/explore" },
  { icon: FileText, title: "Membaca paket & harga", copy: "Pahami perbedaan harga mulai, cakupan, pengecualian, dan biaya tambahan.", href: "/compare" },
  { icon: BedDouble, title: "Hotel & kebutuhan menginap", copy: "Bandingkan kamar, fasilitas aksesibel, tarif malam, dan kebijakan booking.", href: "/support" },
  { icon: UsersRound, title: "Penerjemah & pendamping", copy: "Pilih dukungan bahasa dan perjalanan non-medis yang sesuai agenda Anda.", href: "/support" },
  { icon: TrainFront, title: "Tiba di Jakarta", copy: "Gunakan informasi transportasi umum dan akses drop-off di halaman fasyankes.", href: "/explore" },
  { icon: ShieldCheck, title: "Privasi & keselamatan", copy: "Gunakan inquiry untuk koordinasi non-klinis; bukan untuk diagnosis atau keadaan darurat.", href: "/feedback" },
];

const beforeInquiry = ["Nama dan kontak yang dapat dihubungi", "Layanan atau paket yang diminati", "Tujuan kunjungan secara singkat dan non-klinis", "Preferensi tanggal dan kebutuhan perjalanan", "Persetujuan pemrosesan data kontak untuk tindak lanjut"];

export function GuidePage() {
  return <main className="guide-page">
    <section className="guide-hero"><div className="container guide-hero-grid"><div><p className="guide-eyebrow"><MapPinned size={15} /> PANDUAN PERJALANAN KESEHATAN</p><h1>Lebih siap mengambil langkah berikutnya.</h1><p className="guide-hero-copy">Panduan singkat untuk memilih layanan, memahami paket, mengirim inquiry, dan menata kebutuhan perjalanan kesehatan di Jakarta.</p><div className="guide-hero-actions"><Link href="#mulai" className="btn btn-coral">Mulai dari sini <ArrowRight size={16} /></Link><Link href="/compare" className="btn guide-light-button">Bandingkan layanan</Link></div></div><div className="guide-hero-panel"><span>JAKARTA HEALTH JOURNEY</span><strong>Browse.<br />Choose.<br />Coordinate.</strong><small>Informasi publik untuk membantu persiapan awal.</small></div></div></section>

    <section id="mulai" className="guide-section"><div className="container"><div className="guide-section-heading"><div><p>ALUR YANG DISARANKAN</p><h2>Dari pencarian sampai koordinasi.</h2></div><span>Anda dapat berhenti di tahap mana pun dan kembali melanjutkan dari dashboard setelah masuk.</span></div><div className="guide-step-grid">{journeySteps.map((step) => { const Icon = step.icon; return <article key={step.number}><div className="guide-step-top"><span>{step.number}</span><Icon size={21} /></div><h3>{step.title}</h3><p>{step.copy}</p><Link href={step.href}>{step.cta} <ArrowRight size={14} /></Link></article>; })}</div></div></section>

    <section className="guide-section guide-soft"><div className="container"><div className="guide-section-heading"><div><p>TOPIK PENTING</p><h2>Informasi yang membantu Anda membandingkan dengan tenang.</h2></div><span>Semua konten ini adalah panduan umum, bukan rekomendasi medis atau pengganti konsultasi dokter.</span></div><div className="guide-topic-grid">{guideTopics.map((topic) => { const Icon = topic.icon; return <Link href={topic.href} className="guide-topic-card" key={topic.title}><Icon size={22} /><h3>{topic.title}</h3><p>{topic.copy}</p><ArrowRight size={17} /></Link>; })}</div></div></section>

    <section className="guide-section"><div className="container guide-checklist-layout"><div><p className="guide-eyebrow guide-eyebrow-dark">SEBELUM MENGIRIM INQUIRY</p><h2>Siapkan informasi secukupnya.</h2><p>Inquiry dirancang untuk koordinasi awal. Mitra akan meminta detail tambahan melalui kanal yang sesuai bila diperlukan.</p><Link href="/explore" className="btn btn-primary">Cari layanan <ArrowRight size={16} /></Link></div><div className="guide-checklist">{beforeInquiry.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><ShieldCheck size={17} /><b>{item}</b></div>)}</div></div></section>

    <section className="guide-section guide-rights"><div className="container guide-rights-grid"><div><p>TRANSPARANSI PASIEN</p><h2>Hal yang layak Anda tanyakan.</h2></div><div><p>Sebelum menyetujui layanan atau booking, minta informasi tertulis tentang cakupan paket, pengecualian, estimasi total, jadwal, pembatalan, dan rencana tindak lanjut.</p><Link href="/compare">Lihat data perbandingan <ArrowRight size={15} /></Link></div></div></section>

    <section className="guide-section guide-faq"><div className="container"><div className="guide-section-heading"><div><p>FAQ</p><h2>Pertanyaan dasar sebelum mulai.</h2></div></div><div className="guide-faq-grid"><details open><summary><HelpCircle size={18} />Apakah JHJ memberikan diagnosis?</summary><p>Tidak. JHJ adalah platform informasi publik dan koordinasi inquiry non-klinis. Untuk pertanyaan medis, hubungi fasyankes secara langsung.</p></details><details><summary><HelpCircle size={18} />Apakah harga paket sudah final?</summary><p>Belum. Harga pada MVP adalah ilustrasi. Konfirmasi harga akhir, cakupan, dan ketersediaan langsung melalui inquiry.</p></details><details><summary><HelpCircle size={18} />Mengapa saya perlu membuat akun?</summary><p>Akun membantu menyimpan inquiry, jadwal, pembatalan, dan pembaruan dari mitra dalam dashboard pasien.</p></details></div></div></section>

    <section className="guide-cta"><div className="container"><div><p>LANGKAH BERIKUTNYA</p><h2>Sudah siap mulai menjelajah?</h2></div><div><Link href="/explore" className="btn btn-coral">Jelajahi layanan <ArrowRight size={16} /></Link><Link href="/support" className="guide-cta-link">Butuh dukungan perjalanan <ArrowRight size={15} /></Link></div></div></section>
  </main>;
}
