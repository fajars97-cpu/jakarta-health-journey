import Link from "next/link";
import {
  Accessibility,
  ArrowUpRight,
  BedDouble,
  Check,
  Clock3,
  Coffee,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import type { Organization } from "@/types/domain";
import { InquiryForm } from "@/features/public-forms/components/forms";
import { ComparisonPackageButton } from "@/features/comparison/components/comparison-ui";
import { CurrencyPrice } from "@/features/currency/currency-context";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type HotelProfile = {
  eyebrow: string;
  title: string;
  description: string;
  neighborhood: string;
  tone: string;
  rooms: readonly { name: string; price: string; size: string; bed: string; copy: string; features: string[] }[];
  highlights: readonly { title: string; copy: string }[];
  facilities: readonly string[];
  policy: readonly { label: string; value: string }[];
};

const profiles: Record<string, HotelProfile> = {
  "teduh-cikini": {
    eyebrow: "HOTEL RAMAH PENDAMPING · CIKINI",
    title: "Ruang istirahat yang terasa dekat.",
    description: "Hotel contoh dekat berbagai fasilitas kesehatan di Jakarta Pusat, untuk pasien dan pendamping yang membutuhkan alur menginap lebih praktis.",
    neighborhood: "Cikini · Jakarta Pusat",
    tone: "#9c7657",
    rooms: [
      { name: "Companion Twin", price: "Mulai Rp825.000 / malam", size: "28 m²", bed: "2 tempat tidur single", copy: "Pilihan sederhana untuk pasien rawat jalan dan satu pendamping.", features: ["Sarapan untuk 2 orang", "Meja kerja", "Kamar mandi dengan pegangan"] },
      { name: "Quiet Recovery King", price: "Mulai Rp1.150.000 / malam", size: "34 m²", bed: "1 tempat tidur king", copy: "Kamar tenang dengan area duduk untuk waktu pemulihan yang lebih nyaman.", features: ["Sarapan untuk 2 orang", "Area duduk", "Layanan antar-jemput opsional"] },
      { name: "Family Stay Suite", price: "Mulai Rp1.650.000 / malam", size: "48 m²", bed: "1 king + sofa bed", copy: "Ruang lebih lega untuk keluarga kecil atau pendamping tambahan.", features: ["Sarapan untuk 3 orang", "Pantry ringan", "Early check-in bila tersedia"] },
    ],
    highlights: [
      { title: "Dekat kebutuhan harian", copy: "Apotek, pilihan makan, dan akses transportasi berada di sekitar hotel." },
      { title: "Dukungan pendamping", copy: "Tim front desk membantu mengatur informasi non-medis yang diperlukan untuk kunjungan." },
      { title: "Ritme yang lebih tenang", copy: "Area lounge dan pilihan kamar tenang untuk waktu beristirahat." },
    ],
    facilities: ["Lobi & lounge tenang", "Restoran sepanjang hari", "Wi-Fi di seluruh area", "Laundry berbayar", "Taksi & antar-jemput opsional", "Petugas 24 jam"],
    policy: [
      { label: "Check-in / check-out", value: "14.00 / 12.00 · early check-in sesuai ketersediaan" },
      { label: "Aksesibilitas", value: "Jalur masuk landai, lift, dan beberapa kamar dengan pegangan" },
      { label: "Pembatalan", value: "Dapat berubah menurut tarif dan tanggal; konfirmasi sebelum booking" },
    ],
  },
  "selaras-kemang": {
    eyebrow: "BOUTIQUE STAY · KEMANG",
    title: "Menginap dengan ruang untuk bernapas.",
    description: "Hotel contoh di Kemang dengan pilihan kamar aksesibel terbatas, suasana lebih privat, dan akses mudah ke layanan pendamping perjalanan.",
    neighborhood: "Kemang · Jakarta Selatan",
    tone: "#587b95",
    rooms: [
      { name: "Accessible Garden Room", price: "Mulai Rp1.050.000 / malam", size: "32 m²", bed: "1 tempat tidur queen", copy: "Kamar lantai rendah dengan sirkulasi yang dirancang lebih leluasa.", features: ["Kamar mandi aksesibel", "Sarapan untuk 2 orang", "Akses lift dekat kamar"] },
      { name: "Calm Corner Deluxe", price: "Mulai Rp1.350.000 / malam", size: "38 m²", bed: "1 tempat tidur king", copy: "Pilihan sudut yang lebih senyap untuk pasien dan pendamping dewasa.", features: ["Area duduk", "Sarapan untuk 2 orang", "Menu kamar pilihan"] },
      { name: "Kemang Family Residence", price: "Mulai Rp1.950.000 / malam", size: "54 m²", bed: "1 king + 2 single", copy: "Pilihan hunian singkat untuk keluarga dengan kebutuhan ruang lebih besar.", features: ["Pantry ringan", "Sarapan untuk 4 orang", "Laundry berbayar"] },
    ],
    highlights: [
      { title: "Kamar aksesibel terbatas", copy: "Ketersediaan kamar dengan fitur aksesibel dikonfirmasi langsung oleh tim hotel." },
      { title: "Lingkungan yang hidup", copy: "Pilihan makan, kebutuhan harian, dan transportasi berada dalam jangkauan Kemang." },
      { title: "Koordinasi lebih mudah", copy: "Tim concierge dapat membantu mengarahkan layanan transportasi non-medis." },
    ],
    facilities: ["Lounge taman", "Restoran & menu kamar", "Wi-Fi di seluruh area", "Lift", "Concierge 24 jam", "Antar-jemput opsional"],
    policy: [
      { label: "Check-in / check-out", value: "15.00 / 12.00 · titip bagasi tersedia" },
      { label: "Aksesibilitas", value: "Lift dan beberapa kamar aksesibel; mohon ajukan lebih awal" },
      { label: "Pembatalan", value: "Dapat berubah menurut tarif dan tanggal; konfirmasi sebelum booking" },
    ],
  },
};

export function HotelLanding({ partner }: { partner: Organization }) {
  const profile = profiles[partner.slug];
  if (!profile) return null;
  const services = profile.rooms.map((room) => room.name);
  const roomImage = partner.slug === "teduh-cikini" ? "teduh-twin-room.png" : "selaras-accessible-room.png";

  return (
    <main className="hotel-landing" style={{ "--hotel-tone": profile.tone } as React.CSSProperties}>
      <section className="hotel-hero">
        <div className="hotel-hero-shape hotel-hero-shape-one" />
        <div className="hotel-hero-shape hotel-hero-shape-two" />
        <div className="container hotel-hero-layout">
          <div>
            <Link href="/support" className="hotel-back">← Kembali ke dukungan perjalanan</Link>
            <p className="hotel-eyebrow"><ShieldCheck size={15} /> {profile.eyebrow}</p>
            <h1>{profile.title}</h1>
            <p className="hotel-description">{profile.description}</p>
            <div className="hotel-hero-actions">
              <a href="#hotel-inquiry" className="btn btn-coral">Tanyakan ketersediaan <ArrowUpRight size={17} /></a>
              <a href="#hotel-rooms" className="hotel-text-link">Lihat pilihan kamar</a>
            </div>
          </div>
          <div className="hotel-hero-card">
            <span>STAY WITH EASE</span>
            <BedDouble size={40} />
            <strong>{profile.neighborhood}</strong>
            <small>Informasi harga dan kamar adalah contoh konten MVP, dikonfirmasi melalui inquiry.</small>
          </div>
        </div>
      </section>

      <section className="container hotel-summary">
        <article><MapPin size={20} /><b>{partner.area}</b><span>{partner.address}</span></article>
        <article><Clock3 size={20} /><b>Respons 1–2 hari</b><span>Konfirmasi ketersediaan non-medis</span></article>
        <article><Accessibility size={20} /><b>Fitur aksesibel</b><span>Dikonfirmasi untuk pilihan kamar</span></article>
      </section>

      <section id="hotel-rooms" className="hotel-section hotel-rooms-section">
        <div className="container">
          <div className="hotel-heading"><div><p>PILIHAN KAMAR</p><h2>Tarif yang mudah dibandingkan.</h2></div><span>Pilih hingga lima kamar hotel untuk dibandingkan dengan hotel lain.</span></div>
          <div className="hotel-room-grid">
            {profile.rooms.map((room, index) => (
              <article className="hotel-room-card" key={room.name}>
                <div className={`hotel-room-visual hotel-room-visual-${index + 1}`} style={{ backgroundImage: `linear-gradient(180deg, transparent 42%, #082b4a99), url(${publicBasePath}/images/hotels/${roomImage})` }}><BedDouble size={36} /><span>{room.size}</span></div>
                <h3>{room.name}</h3>
                <strong><CurrencyPrice value={room.price} /></strong>
                <small>{room.bed}</small>
                <p>{room.copy}</p>
                <ul>{room.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
                <ComparisonPackageButton organizationId={partner.id} service={room.name} />
                <a href="#hotel-inquiry">Tanyakan kamar <ArrowUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hotel-section hotel-soft-section"><div className="container hotel-highlights"><div><p>UNTUK PASIEN & PENDAMPING</p><h2>Hal kecil yang membantu perjalanan terasa lebih ringan.</h2></div><div>{profile.highlights.map((item) => <article key={item.title}><Sparkles size={20} /><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

      <section className="hotel-section"><div className="container hotel-facilities"><div><p>FASILITAS HOTEL</p><h2>Yang tersedia selama masa menginap.</h2><span>Fasilitas dapat berubah; tanyakan kebutuhan spesifik saat mengajukan inquiry.</span><div className="hotel-facility-photo" style={{ backgroundImage: `url(${publicBasePath}/images/hotels/hotel-lounge.png)` }} /></div><div className="hotel-facility-list">{profile.facilities.map((item, index) => <article key={item}>{index % 3 === 0 ? <Wifi size={18} /> : index % 3 === 1 ? <Coffee size={18} /> : <UtensilsCrossed size={18} />}<span>{item}</span></article>)}</div></div></section>

      <section className="hotel-section hotel-policy-section"><div className="container"><div className="hotel-heading"><div><p>SEBELUM MEMESAN</p><h2>Ketentuan yang perlu dikonfirmasi.</h2></div><span>Informasi ini bukan konfirmasi booking dan dapat berubah menurut tanggal menginap.</span></div><div className="hotel-policy-grid">{profile.policy.map((item) => <article key={item.label}><Star size={18} /><b>{item.label}</b><p>{item.value}</p></article>)}</div></div></section>

      <section id="hotel-inquiry" className="hotel-inquiry"><div className="container"><div><p>INQUIRY KAMAR</p><h2>Mulai dari kebutuhan menginap Anda.</h2><span>Tulis tanggal, jumlah tamu, dan kebutuhan aksesibilitas secara singkat. Jangan masukkan informasi medis pribadi.</span></div><InquiryForm organizationId={partner.id} services={services} returnTo={`/facility/${partner.slug}`} /></div></section>
    </main>
  );
}
