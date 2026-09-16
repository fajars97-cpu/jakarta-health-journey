"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, ClipboardList, ShieldAlert } from "lucide-react";
import { dataService } from "@/services/data-service";
import { Appointment, AppointmentKind, Inquiry, InquiryStatus } from "@/types/domain";
import { Title } from "@/features/admin/components/admin-ui";

const facilityId = "01";
const defaultAppointments: Appointment[] = [
  { id: "APT-201", organizationId: facilityId, inquiryId: "INQ-102", patientName: "Dimas P.", service: "Medical check-up", kind: "Konsultasi awal", startsAt: "25 Sep 2026 · 10.00 WIB", status: "Dijadwalkan" },
];

function AppointmentForm({ inquiry, onSave }: { inquiry?: Inquiry; onSave: (appointment: Appointment) => void }) {
  const [kind, setKind] = useState<AppointmentKind>("Konsultasi awal");
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const startsAt = String(form.get("startsAt") || "");
    if (!startsAt) { setNotice("Pilih tanggal dan waktu terlebih dahulu."); return; }
    onSave({ id: `APT-${Date.now()}`, organizationId: facilityId, inquiryId: inquiry?.id ?? "MANUAL", patientName: inquiry?.name ?? String(form.get("patientName") || "Pasien"), service: inquiry?.service ?? String(form.get("service") || "Layanan umum"), kind, startsAt: new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(startsAt)), status: "Menunggu konfirmasi", note: String(form.get("note") || "") });
    event.currentTarget.reset(); setNotice("Jadwal demo berhasil dicatat. Konfirmasi klinis tetap dilakukan oleh fasyankes.");
  }
  return <form className="card" style={{ padding: 20, display: "grid", gap: 13 }} onSubmit={submit}>
    <div><span className="badge badge-neutral">PENJADWALAN NON-KLINIS</span><h2 style={{ margin: "10px 0 5px", color: "var(--navy)", fontSize: 20 }}>{inquiry ? `Tindak lanjuti ${inquiry.name}` : "Buat jadwal baru"}</h2><p className="hint" style={{ margin: 0 }}>Jangan memasukkan diagnosis, hasil pemeriksaan, atau rekam medis.</p></div>
    {!inquiry && <><label className="field">Nama pasien / kontak<input className="input" name="patientName" required /></label><label className="field">Layanan<select className="input" name="service" defaultValue="Medical check-up"><option>Medical check-up</option><option>Jantung</option><option>Ortopedi</option></select></label></>}
    <label className="field">Jenis jadwal<select className="input" value={kind} onChange={(event) => setKind(event.target.value as AppointmentKind)}><option>Konsultasi awal</option><option>Kedatangan tindakan</option></select></label>
    <label className="field">Tanggal dan waktu<input className="input" name="startsAt" type="datetime-local" required /></label>
    <label className="field">Catatan operasional (opsional)<textarea className="input" name="note" rows={3} placeholder="Contoh: membawa identitas dan tiba 30 menit lebih awal." /></label>
    <button className="btn btn-primary" type="submit"><CalendarClock size={17} /> Catat jadwal</button>{notice && <p className="hint" style={{ color: notice.startsWith("Pilih") ? "#b3261e" : "#08776e", margin: 0 }}>{notice}</p>}
  </form>;
}

function AppointmentRows({ appointments }: { appointments: Appointment[] }) {
  return <div className="card" style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}><thead><tr>{["Pasien", "Layanan", "Agenda", "Waktu", "Status"].map((item) => <th key={item} style={{ textAlign: "left", padding: 14, borderBottom: "1px solid #dce6ed" }}>{item}</th>)}</tr></thead><tbody>{appointments.map((appointment) => <tr key={appointment.id}><td style={{ padding: 14 }}><b>{appointment.patientName}</b><br /><span className="hint">{appointment.id}</span></td><td style={{ padding: 14 }}>{appointment.service}</td><td style={{ padding: 14 }}>{appointment.kind}</td><td style={{ padding: 14 }}>{appointment.startsAt}</td><td style={{ padding: 14 }}><span className="badge badge-neutral">{appointment.status}</span></td></tr>)}</tbody></table></div>;
}

export function FacilityInquiries() {
  const [rows, setRows] = useState(() => dataService.inquiries().filter((inquiry) => inquiry.organizationId === facilityId));
  const [appointments, setAppointments] = useState(defaultAppointments);
  const [selected, setSelected] = useState<Inquiry | undefined>();
  function save(appointment: Appointment) { setAppointments((current) => [appointment, ...current]); setRows((current) => current.map((inquiry) => inquiry.id === appointment.inquiryId ? { ...inquiry, status: InquiryStatus.Contacted } : inquiry)); setSelected(undefined); }
  return <section><Title title="Inquiry & tindak lanjut" subtitle="Kelola inquiry RS Harapan Kota tanpa menyimpan informasi klinis atau rekam medis." /><div style={{ display: "grid", gridTemplateColumns: selected ? "minmax(0,1.25fr) minmax(320px,.75fr)" : "1fr", gap: 18 }}><div className="card" style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}><thead><tr>{["Kontak", "Layanan", "Preferensi", "Status", ""].map((item) => <th key={item} style={{ textAlign: "left", padding: 14, borderBottom: "1px solid #dce6ed" }}>{item}</th>)}</tr></thead><tbody>{rows.map((inquiry) => <tr key={inquiry.id}><td style={{ padding: 14 }}><b>{inquiry.name}</b><br /><span className="hint">{inquiry.contact}</span></td><td style={{ padding: 14 }}>{inquiry.service}</td><td style={{ padding: 14 }}>{inquiry.date}</td><td style={{ padding: 14 }}><select className="input" aria-label="Ubah status inquiry" value={inquiry.status} onChange={(event) => setRows((current) => current.map((row) => row.id === inquiry.id ? { ...row, status: event.target.value as InquiryStatus } : row))}><option>New</option><option>Contacted</option><option>Closed</option></select></td><td style={{ padding: 14 }}><button className="btn btn-outline btn-sm" onClick={() => setSelected(inquiry)}><CalendarClock size={15} /> Jadwalkan</button></td></tr>)}</tbody></table></div>{selected && <AppointmentForm inquiry={selected} onSave={save} />}</div><div style={{ marginTop: 24 }}><h2 style={{ color: "var(--navy)", fontSize: 20 }}>Jadwal dari inquiry</h2><AppointmentRows appointments={appointments} /></div></section>;
}

export function FacilitySchedule() {
  const [appointments, setAppointments] = useState(defaultAppointments);
  const upcoming = useMemo(() => appointments.filter((appointment) => appointment.status !== "Selesai"), [appointments]);
  return <section><Title title="Jadwal konsultasi & kedatangan" subtitle="Atur waktu konsultasi awal atau kedatangan tindakan setelah koordinasi dengan pasien." /><div className="card" style={{ padding: 17, display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 18, background: "#fff8eb" }}><ShieldAlert size={20} color="#a86300" /><p style={{ margin: 0, lineHeight: 1.55 }}><b>Catatan keselamatan:</b> jadwal ini bukan persetujuan tindakan dan bukan pengganti asesmen dokter. Konfirmasi kelayakan, informed consent, serta detail klinis tetap dikelola melalui sistem fasyankes.</p></div><div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(320px,.8fr)", gap: 18 }}><div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><h2 style={{ color: "var(--navy)", fontSize: 20, margin: 0 }}><ClipboardList size={19} style={{ verticalAlign: "-4px", marginRight: 7 }} />Jadwal mendatang</h2><span className="badge badge-verified"><CheckCircle2 size={14} />{upcoming.length} aktif</span></div><AppointmentRows appointments={upcoming} /></div><AppointmentForm onSave={(appointment) => setAppointments((current) => [appointment, ...current])} /></div></section>;
}
