import { ArrowUpRight, BusFront, CarFront, Footprints, MapPin, TrainFront } from "lucide-react";
import type { Organization } from "@/types/domain";

type AccessProfile = { district: string; stops: { mode: "MRT" | "TransJakarta" | "KRL"; title: string; detail: string }[]; lastMile: string };

const accessProfiles: Record<string, AccessProfile> = {
  "harapan-kota": { district: "Jakarta Pusat", stops: [{ mode: "MRT", title: "Stasiun MRT pusat kota", detail: "Lanjutkan dengan taksi/ojek sekitar 10–15 menit." }, { mode: "TransJakarta", title: "Halte koridor utama", detail: "Tersedia titik turun di kawasan pusat kota." }, { mode: "KRL", title: "Stasiun KRL terdekat", detail: "Lanjutkan dengan kendaraan penghubung." }], lastMile: "Area drop-off berada dekat lobi utama; informasikan kebutuhan kursi roda saat tiba." },
  "sahabat-keluarga": { district: "Jakarta Selatan", stops: [{ mode: "MRT", title: "Stasiun MRT Jakarta Selatan", detail: "Lanjutkan dengan kendaraan penghubung sekitar 10 menit." }, { mode: "TransJakarta", title: "Halte kawasan keluarga", detail: "Rute bus di sekitar area hunian dan komersial." }, { mode: "KRL", title: "Stasiun KRL Jakarta Selatan", detail: "Lanjutkan dengan taksi/ojek menuju fasyankes." }], lastMile: "Tersedia area berhenti singkat untuk pasien dan pendamping di depan pintu masuk." },
  "cakrawala-medika": { district: "Jakarta Barat", stops: [{ mode: "TransJakarta", title: "Halte koridor Jakarta Barat", detail: "Lanjutkan dengan kendaraan penghubung sekitar 10–15 menit." }, { mode: "KRL", title: "Stasiun KRL Jakarta Barat", detail: "Pilih taksi/ojek untuk perjalanan lanjutan." }, { mode: "MRT", title: "Konektivitas MRT", detail: "Terhubung melalui perjalanan lanjutan dari pusat kota." }], lastMile: "Gunakan pintu masuk utama untuk drop-off; tanya petugas untuk akses prioritas." },
  "sehat-sudirman": { district: "Jakarta Selatan", stops: [{ mode: "MRT", title: "Stasiun MRT Sudirman", detail: "Jarak lanjutan pendek dengan berjalan kaki atau taksi." }, { mode: "TransJakarta", title: "Halte koridor Sudirman", detail: "Akses dari jalur bus utama kawasan perkantoran." }, { mode: "KRL", title: "Stasiun KRL Sudirman", detail: "Lanjutkan dengan berjalan kaki atau kendaraan penghubung." }], lastMile: "Akses lantai dasar dan lift tersedia; area drop-off mengikuti ketentuan gedung." },
  "mentari-prima": { district: "Jakarta Timur", stops: [{ mode: "TransJakarta", title: "Halte koridor Jakarta Timur", detail: "Lanjutkan dengan taksi/ojek sekitar 10–15 menit." }, { mode: "KRL", title: "Stasiun KRL Jakarta Timur", detail: "Sambungkan dengan kendaraan penghubung." }, { mode: "MRT", title: "Konektivitas MRT", detail: "Perjalanan lanjutan tersedia dari area pusat kota." }], lastMile: "Pintu masuk klinik berada di permukaan jalan dengan area turun penumpang." },
};

function ModeIcon({ mode }: { mode: AccessProfile["stops"][number]["mode"] }) {
  if (mode === "TransJakarta") return <BusFront size={18} />;
  return <TrainFront size={18} />;
}

export function FacilityAccess({ partner }: { partner: Organization }) {
  const profile = accessProfiles[partner.slug];
  if (!profile) return null;
  const mapQuery = encodeURIComponent(`${partner.name}, ${partner.address}`);

  return <section className="facility-access"><div className="container"><div className="facility-access-heading"><div><p>LOKASI & AKSES</p><h2>Rencanakan perjalanan menuju fasyankes.</h2><span>Informasi transportasi berikut adalah ilustrasi MVP. Konfirmasi rute, jadwal, dan aksesibilitas sebelum berangkat.</span></div><a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Buka peta <ArrowUpRight size={15} /></a></div><div className="facility-access-grid"><div className="facility-map-card"><div className="facility-map-lines" /><div className="facility-map-pin"><MapPin size={26} /><b>{partner.name}</b><small>{profile.district}</small></div><span className="facility-map-label">Peta lokasi · ilustrasi</span></div><div className="facility-transit-list"><h3>Transportasi umum</h3>{profile.stops.map((stop) => <article key={stop.title}><div className="facility-mode-icon"><ModeIcon mode={stop.mode} /></div><div><b>{stop.mode} · {stop.title}</b><span>{stop.detail}</span></div></article>)}<div className="facility-last-mile"><CarFront size={18} /><div><b>Akses dari titik turun</b><span>{profile.lastMile}</span></div></div></div></div><div className="facility-walk-note"><Footprints size={17} /><span>Waktu tempuh dapat berubah karena kondisi lalu lintas dan operasional transportasi umum.</span></div></div></section>;
}
