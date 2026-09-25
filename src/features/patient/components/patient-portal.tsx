"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { CalendarClock, ClipboardList, Compass, Hotel, Plane, ShieldCheck, UserRound, XCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { RequireAuthentication } from "@/features/auth/require-authentication";
import { useAuth } from "@/features/auth/auth-provider";
import { dataService } from "@/services/data-service";
import { listPatientAppointments, listPatientInquiries, loadPatientProfile, savePatientProfile, updateAppointmentStatus, updateInquiryStatus } from "@/services/persistence-service";
import { InquiryStatus, type Appointment as DomainAppointment, type Inquiry as DomainInquiry } from "@/types/domain";

type Inquiry = { id: string; provider: string; category: "Fasyankes" | "Hotel" | "Travel"; service: string; updated: string; status: "Diterima" | "Menunggu konfirmasi" | "Dijadwalkan" | "Dibatalkan" };
type Schedule = { id: string; title: string; provider: string; time: string; type: "Konsultasi" | "Tindakan"; status: "Dijadwalkan" | "Permintaan pembatalan" | "Dibatalkan" };

const inquiries: Inquiry[] = [
  { id: "INQ-101", provider: "RS Harapan Kota", category: "Fasyankes", service: "Jantung", updated: "Hari ini · 09.12", status: "Dijadwalkan" },
  { id: "SUP-032", provider: "Hotel Teduh Cikini", category: "Hotel", service: "Kamar aksesibel · 2 malam", updated: "Kemarin · 16.40", status: "Menunggu konfirmasi" },
  { id: "SUP-041", provider: "Rute Nusantara Travel", category: "Travel", service: "Antar-jemput bandara", updated: "Kemarin · 11.10", status: "Diterima" },
];
const schedules: Schedule[] = [
  { id: "APT-201", title: "Konsultasi awal", provider: "RS Harapan Kota · Layanan Jantung", time: "25 Sep 2026 · 10.00 WIB", type: "Konsultasi", status: "Dijadwalkan" },
  { id: "APT-207", title: "Kedatangan untuk tindakan", provider: "RS Harapan Kota · Menunggu konfirmasi klinis", time: "02 Okt 2026 · 08.00 WIB", type: "Tindakan", status: "Dijadwalkan" },
];

const nav = [["Ringkasan", "/patient/dashboard", ClipboardList], ["Jadwal", "/patient/schedule", CalendarClock], ["Inquiry perjalanan", "/patient/inquiries", Plane], ["Data diri", "/patient/profile", UserRound], ["Jelajahi layanan", "/explore", Compass]] as const;

function portalInquiry(record: DomainInquiry): Inquiry {
  const organization = dataService.listOrganizations().find((item) => item.id === record.organizationId);
  const category = organization?.type === "Hotel" ? "Hotel" : organization?.type === "Travel Agent" ? "Travel" : "Fasyankes";
  const status = record.status === InquiryStatus.Scheduled ? "Dijadwalkan" : record.status === InquiryStatus.Contacted ? "Diterima" : record.status === InquiryStatus.Cancelled || record.status === InquiryStatus.Closed ? "Dibatalkan" : "Menunggu konfirmasi";
  return { id: record.id, provider: organization?.name ?? "Mitra layanan", category, service: record.service, updated: record.updatedAt ? new Date(record.updatedAt).toLocaleString("id-ID") : record.createdAt, status };
}

function portalSchedule(record: DomainAppointment): Schedule {
  const organization = dataService.listOrganizations().find((item) => item.id === record.organizationId);
  return { id: record.id, title: record.kind, provider: `${organization?.name ?? "Fasyankes"} · ${record.service}`, time: record.startsAt, type: record.kind === "Konsultasi awal" ? "Konsultasi" : "Tindakan", status: record.status === "Dibatalkan" ? "Dibatalkan" : record.status === "Menunggu konfirmasi" ? "Permintaan pembatalan" : "Dijadwalkan" };
}

export function PatientShell({ children }: { children: ReactNode }) {
  const path = usePathname(); const { user, signOut } = useAuth();
  return <RequireAuthentication><div className="patient-shell"><header className="patient-header"><Link href="/" className="patient-brand"><ShieldCheck size={20} /> Jakarta Health Journey <small>Patient</small></Link><div><span className="patient-name">{user?.name || "Pasien Demo"}</span><button className="patient-logout" onClick={() => void signOut()}>Keluar</button></div></header><aside className="patient-nav">{nav.map(([label, href, Icon]) => <Link key={href} href={href} className={path === href ? "active" : ""}><Icon size={17} />{label}</Link>)}</aside><main className="patient-main">{children}</main></div></RequireAuthentication>;
}

function Status({ value }: { value: string }) { return <span className={`patient-status ${value === "Dijadwalkan" || value === "Diterima" ? "is-good" : value.includes("Batal") ? "is-muted" : "is-waiting"}`}>{value}</span>; }
function PageTitle({ title, subtitle }: { title: string; subtitle: string }) { return <header className="patient-title"><p>JAKARTA HEALTH JOURNEY · PASIEN</p><h1>{title}</h1><span>{subtitle}</span></header>; }

export function PatientDashboard() {
  const { user } = useAuth();
  const [inquiryItems, setInquiryItems] = useState(inquiries);
  const [scheduleItems, setScheduleItems] = useState(schedules);
  useEffect(() => {
    if (!user?.$id) return;
    let active = true;
    const timer = window.setTimeout(() => {
      void Promise.all([
        listPatientInquiries(user.$id, dataService.inquiries()).then((rows) => rows.map(portalInquiry)),
        listPatientAppointments(user.$id, []),
      ]).then(([rows, appointments]) => {
        if (!active) return;
        setInquiryItems(rows);
        if (appointments.length > 0) setScheduleItems(appointments.map(portalSchedule));
      });
    }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [user?.$id]);
  return <section><PageTitle title="Perjalanan Anda, terarah." subtitle="Ringkasan koordinasi layanan dan perjalanan. Tidak memuat rekam medis." /><div className="patient-stat-grid">{[["Inquiry aktif", String(inquiryItems.filter((item) => item.status !== "Dibatalkan").length)], ["Jadwal mendatang", String(scheduleItems.filter((item) => item.status === "Dijadwalkan").length)], ["Partner perjalanan", String(inquiryItems.filter((item) => item.category !== "Fasyankes").length)]].map(([label, value]) => <div key={label} className="patient-stat"><span>{label}</span><b>{value}</b></div>)}</div><div className="patient-grid"><section className="patient-card"><div className="patient-card-title"><h2>Jadwal berikutnya</h2><Link href="/patient/schedule">Kelola</Link></div>{scheduleItems.map((schedule) => <div className="patient-list" key={schedule.id}><CalendarClock size={19} /><div><b>{schedule.title}</b><span>{schedule.provider}</span><small>{schedule.time}</small></div><Status value={schedule.status} /></div>)}</section><section className="patient-card"><div className="patient-card-title"><h2>Progres inquiry</h2><Link href="/patient/inquiries">Lihat semua</Link></div>{inquiryItems.map((inquiry) => <div className="patient-list" key={inquiry.id}><ClipboardList size={19} /><div><b>{inquiry.provider}</b><span>{inquiry.service}</span><small>{inquiry.updated}</small></div><Status value={inquiry.status} /></div>)}</section></div><section className="patient-notice"><ShieldCheck size={21} /><p><b>Privasi Anda dijaga.</b> Gunakan portal ini untuk koordinasi jadwal dan perjalanan. Untuk pertanyaan medis atau keadaan darurat, hubungi fasyankes atau layanan darurat secara langsung.</p></section></section>;
}

export function PatientSchedule() {
  const { user } = useAuth();
  const [items, setItems] = useState(schedules); const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!user?.$id) return;
    let active = true;
    const timer = window.setTimeout(() => { void listPatientAppointments(user.$id, []).then((rows) => { if (active && rows.length > 0) setItems(rows.map(portalSchedule)); }); }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [user?.$id]);
  function requestCancel(id: string) { setItems((current) => current.map((item) => item.id === id ? { ...item, status: "Permintaan pembatalan" } : item)); void updateAppointmentStatus(id, "Menunggu konfirmasi"); setNotice("Permintaan pembatalan sudah dicatat. Fasyankes akan mengonfirmasi melalui kontak Anda."); }
  return <section><PageTitle title="Jadwal Anda" subtitle="Kelola jadwal konsultasi dan kedatangan. Perubahan tunduk pada konfirmasi fasyankes." />{notice && <p className="patient-feedback">{notice}</p>}<div className="patient-card patient-schedule-list">{items.map((schedule) => <article key={schedule.id}><div><p>{schedule.type.toUpperCase()}</p><h2>{schedule.title}</h2><span>{schedule.provider}</span><b>{schedule.time}</b></div><div className="patient-actions"><Status value={schedule.status} />{schedule.status === "Dijadwalkan" && <button className="patient-button-outline" onClick={() => requestCancel(schedule.id)}><XCircle size={16} /> Ajukan pembatalan</button>}</div></article>)}</div><section className="patient-notice"><CalendarClock size={21} /><p><b>Butuh perubahan waktu?</b> Ajukan pembatalan di atas, kemudian fasyankes akan menghubungi Anda untuk menawarkan waktu yang tersedia. Jadwal tindakan tetap memerlukan konfirmasi klinis dari fasyankes.</p></section></section>;
}

export function PatientInquiries() {
  const { user } = useAuth();
  const [items, setItems] = useState(inquiries); const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!user?.$id) return;
    let active = true;
    const timer = window.setTimeout(() => { void listPatientInquiries(user.$id, dataService.inquiries()).then((rows) => { if (active) setItems(rows.map(portalInquiry)); }); }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [user?.$id]);
  function cancel(id: string) { setItems((current) => current.map((item) => item.id === id ? { ...item, status: "Dibatalkan" } : item)); void updateInquiryStatus(id, InquiryStatus.Cancelled); setNotice("Inquiry dibatalkan. Mitra tidak akan menjadwalkan tindak lanjut baru."); }
  return <section><PageTitle title="Inquiry layanan & perjalanan" subtitle="Pantau inquiry fasyankes, hotel, dan travel agent dari satu tempat." />{notice && <p className="patient-feedback">{notice}</p>}<div className="patient-inquiry-grid">{items.map((inquiry) => <article className="patient-card" key={inquiry.id}><div className="patient-card-title"><span className="patient-category">{inquiry.category === "Hotel" ? <Hotel size={16} /> : <Plane size={16} />}{inquiry.category}</span><Status value={inquiry.status} /></div><h2>{inquiry.provider}</h2><p>{inquiry.service}</p><small>Terakhir diperbarui: {inquiry.updated}</small>{inquiry.status !== "Dibatalkan" && <button className="patient-link-button" onClick={() => cancel(inquiry.id)}>Batalkan inquiry</button>}</article>)}</div><section className="patient-notice"><Hotel size={21} /><p><b>Untuk booking hotel:</b> lengkapi data perjalanan di halaman Data diri. Partner hanya menerima data yang diperlukan untuk menindaklanjuti booking.</p></section></section>;
}

export function PatientProfile() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<{ name: string; email: string; phone: string; country: string; preferredLanguage: string; accessibilityNeeds?: string; updatedAt?: string } | null>(null);
  useEffect(() => {
    if (!user?.$id) return;
    let active = true;
    const timer = window.setTimeout(() => { void loadPatientProfile(user.$id).then((value) => { if (active && value) setProfile(value); }); }, 0);
    return () => { active = false; window.clearTimeout(timer); };
  }, [user?.$id]);
  async function save(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); if (user?.$id) { await savePatientProfile({ patientId: user.$id, name: String(form.get("name") || ""), email: String(form.get("email") || ""), phone: String(form.get("phone") || ""), country: String(form.get("country") || ""), preferredLanguage: String(form.get("preferredLanguage") || ""), accessibilityNeeds: String(form.get("accessibilityNeeds") || ""), updatedAt: new Date().toISOString() }); } setSaved(true); }
  return <section><PageTitle title="Data diri & perjalanan" subtitle="Data dasar untuk komunikasi dan pengajuan booking partner perjalanan." /><form key={profile?.updatedAt ?? user?.$id} className="patient-card patient-form" onSubmit={save}><div className="patient-form-section"><h2>Kontak utama</h2><label>Nama lengkap<input className="input" name="name" defaultValue={profile?.name || user?.name || "Maya Lestari"} required /></label><label>Email<input className="input" name="email" type="email" defaultValue={profile?.email || user?.email || "maya@example.demo"} required /></label><label>Nomor telepon<input className="input" name="phone" defaultValue={profile?.phone || "+62 812 0000 0000"} required /></label></div><div className="patient-form-section"><h2>Keperluan perjalanan</h2><label>Negara / domisili<select className="input" name="country" defaultValue={profile?.country || "Indonesia"}><option>Indonesia</option><option>Malaysia</option><option>Singapore</option><option>Lainnya</option></select></label><label>Bahasa yang diutamakan<select className="input" name="preferredLanguage" defaultValue={profile?.preferredLanguage || "Indonesia"}><option>Indonesia</option><option>English</option><option>Mandarin</option></select></label><label>Kebutuhan aksesibilitas (opsional)<input className="input" name="accessibilityNeeds" defaultValue={profile?.accessibilityNeeds || ""} placeholder="Contoh: akses kursi roda" /></label></div><div className="patient-data-note"><ShieldCheck size={19} /><span>Jangan masukkan diagnosis, hasil laboratorium, nomor identitas, atau rekam medis. Partner hotel/travel hanya menerima data operasional yang Anda setujui.</span></div><button className="btn btn-primary" type="submit">Simpan data perjalanan</button>{saved && <p className="patient-feedback">Data perjalanan tersimpan.</p>}</form></section>;
}
