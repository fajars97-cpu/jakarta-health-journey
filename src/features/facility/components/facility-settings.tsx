"use client";

import { useState } from "react";
import { BellRing, Building2, CheckCircle2, Globe2, Save, ShieldCheck } from "lucide-react";

type Tab = "profil" | "layanan" | "inquiry" | "publikasi";
const tabItems: { id: Tab; label: string; icon: typeof Building2 }[] = [
  { id: "profil", label: "Profil fasyankes", icon: Building2 },
  { id: "layanan", label: "Layanan & akses", icon: Globe2 },
  { id: "inquiry", label: "Inquiry & notifikasi", icon: BellRing },
  { id: "publikasi", label: "Publikasi", icon: ShieldCheck },
];

export function FacilitySettings() {
  const [tab, setTab] = useState<Tab>("profil");
  const [saved, setSaved] = useState(false);
  const save = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setSaved(true); };
  return <section>
    <header style={{ marginBottom: 25 }}><p className="eyebrow">PENGATURAN FASYANKES</p><h1 className="section-title">Kendalikan informasi yang dilihat pasien.</h1><p style={{ color: "#5b7382", maxWidth: 680, lineHeight: 1.6 }}>Perubahan masih tersimpan dalam mode demo pada browser. Saat database diaktifkan, pengaturan ini akan tersimpan per akun fasyankes dan dapat melalui alur verifikasi.</p></header>
    <div style={{ display: "grid", gridTemplateColumns: "220px minmax(0,1fr)", gap: 18, alignItems: "start" }}>
      <nav className="card" style={{ padding: 10, display: "grid", gap: 4 }}>{tabItems.map((item) => { const Icon = item.icon; return <button type="button" key={item.id} onClick={() => { setTab(item.id); setSaved(false); }} style={{ display: "flex", alignItems: "center", gap: 9, textAlign: "left", border: 0, borderRadius: 10, padding: "11px 10px", cursor: "pointer", background: tab === item.id ? "#e4f3f1" : "transparent", color: tab === item.id ? "#076f68" : "var(--navy)", fontWeight: 700, fontSize: 13 }}><Icon size={17} />{item.label}</button>; })}</nav>
      <form onSubmit={save} className="card" style={{ padding: 24 }}>
        {tab === "profil" && <ProfileSettings />}
        {tab === "layanan" && <ServiceSettings />}
        {tab === "inquiry" && <InquirySettings />}
        {tab === "publikasi" && <PublicationSettings />}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 24, paddingTop: 18, borderTop: "1px solid #e0eaed" }}><button className="btn btn-primary" type="submit"><Save size={16} /> Simpan pengaturan</button>{saved && <span style={{ color: "#08776e", display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 700 }}><CheckCircle2 size={17} />Tersimpan dalam mode demo.</span>}</div>
      </form>
    </div>
  </section>;
}

function Heading({ title, copy }: { title: string; copy: string }) { return <div style={{ marginBottom: 21 }}><h2 style={{ margin: 0, color: "var(--navy)", fontSize: 23 }}>{title}</h2><p className="hint" style={{ lineHeight: 1.55, marginBottom: 0 }}>{copy}</p></div>; }
function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) { return <label className="field">{label}<input className="input" type={type} defaultValue={value} /></label>; }
function ProfileSettings() { return <><Heading title="Identitas & kontak" copy="Informasi dasar yang tampil pada katalog dan halaman profil rumah sakit." /><div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14 }}><Field label="Nama fasyankes" value="RS Harapan Kota" /><Field label="Nama kontak pasien" value="Patient Liaison Desk" /><Field label="Nomor telepon" value="+62 21 555 001" /><Field label="Email inquiry" value="liaison@harapan-kota.demo" /><label className="field" style={{ gridColumn: "1/-1" }}>Alamat<textarea className="input" rows={2} defaultValue="Jl. Contoh 01, Jakarta Pusat, DKI Jakarta" /></label><label className="field" style={{ gridColumn: "1/-1" }}>Ringkasan halaman publik<textarea className="input" rows={3} defaultValue="Rumah sakit umum contoh dengan layanan pasien internasional." /></label></div></>; }
function ServiceSettings() { return <><Heading title="Bahasa, aksesibilitas & jam layanan" copy="Membantu pasien menilai kesiapan kunjungan sebelum mengirim inquiry." /><div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14 }}><Field label="Bahasa layanan" value="Indonesia, English" /><Field label="Jam layanan" value="Senin–Sabtu, 08.00–20.00" /><label className="field" style={{ gridColumn: "1/-1" }}>Aksesibilitas<textarea className="input" rows={2} defaultValue="Akses kursi roda, lift, ruang tunggu prioritas" /></label><label className="field" style={{ gridColumn: "1/-1" }}>Informasi kunjungan<textarea className="input" rows={3} defaultValue="Pasien akan menerima konfirmasi jadwal setelah inquiry ditinjau oleh tim kami." /></label></div></>; }
function InquirySettings() { return <><Heading title="Pengelolaan inquiry" copy="Atur jalur respons dan informasi yang diterima pasien setelah mengirim inquiry." /><div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14 }}><Field label="Target waktu respons" value="1–2 hari kerja" /><Field label="Email penerima notifikasi" value="liaison@harapan-kota.demo" type="email" /><label className="field" style={{ gridColumn: "1/-1" }}>Pesan konfirmasi untuk pasien<textarea className="input" rows={3} defaultValue="Terima kasih. Tim kami akan meninjau inquiry Anda dan menghubungi Anda dalam 1–2 hari kerja." /></label></div><div style={{ marginTop: 19, display: "grid", gap: 10 }}>{["Kirim notifikasi saat inquiry baru masuk", "Izinkan pasien meminta dukungan perjalanan", "Tampilkan pilihan jadwal konsultasi awal"].map((label) => <label key={label} style={{ display: "flex", gap: 9, fontSize: 13, alignItems: "center" }}><input type="checkbox" defaultChecked />{label}</label>)}</div></>; }
function PublicationSettings() { return <><Heading title="Status halaman publik" copy="Konten yang membutuhkan verifikasi akan dikirim ke admin Jakarta Health Journey sebelum diterbitkan." /><div style={{ background: "#edf8f6", border: "1px solid #cce9e4", borderRadius: 14, padding: 16, display: "flex", gap: 11 }}><ShieldCheck color="#08776e" /><div><b style={{ color: "#086c65" }}>Profil saat ini terverifikasi</b><p className="hint" style={{ margin: "5px 0 0" }}>Perubahan pada harga paket, sertifikasi, atau klaim penghargaan dapat memerlukan peninjauan ulang.</p></div></div><div style={{ marginTop: 18, display: "grid", gap: 11 }}>{["Tampilkan halaman profil di katalog publik", "Tampilkan paket layanan dan harga mulai", "Tampilkan ulasan yang sudah dimoderasi"].map((label) => <label key={label} style={{ display: "flex", gap: 9, fontSize: 13, alignItems: "center" }}><input type="checkbox" defaultChecked />{label}</label>)}</div></>; }
