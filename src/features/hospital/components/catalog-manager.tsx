"use client";

import { useState } from "react";
import { CheckCircle2, PackagePlus, Plus, X } from "lucide-react";
import { harapanKotaPackages, harapanKotaServices } from "@/features/hospital/data/harapan-kota";

type Entry = { id: string; type: "Layanan" | "Paket"; name: string; price?: string; detail: string };
const initial: Entry[] = [
  ...harapanKotaServices.map((item) => ({ id: item.name, type: "Layanan" as const, name: item.name, detail: item.copy })),
  ...harapanKotaPackages.map((item) => ({ id: item.id, type: "Paket" as const, name: item.name, price: item.price, detail: item.highlights.join(" · ") })),
];

export function CatalogManager() {
  const [entries, setEntries] = useState(initial);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ type: "Paket" as Entry["type"], name: "", price: "", detail: "" });
  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.detail.trim()) return;
    setEntries((current) => [{ id: `${Date.now()}`, ...form }, ...current]);
    setNotice(`${form.type} “${form.name}” ditambahkan dalam mode demo.`);
    setForm({ type: "Paket", name: "", price: "", detail: "" }); setOpen(false);
  }
  return <section>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "end", flexWrap: "wrap" }}><div><p className="eyebrow">KONTEN HALAMAN PUBLIK</p><h1 className="section-title" style={{ fontSize: 42 }}>Katalog layanan RS Harapan Kota</h1><p className="hint" style={{ maxWidth: 620, marginTop: 12 }}>Kelola kartu layanan dan paket yang tampil di halaman rumah sakit. Penyimpanan masih bersifat demo pada browser; koneksi database akan menggantikan mode ini.</p></div><button className="btn btn-primary" onClick={() => { setOpen(true); setNotice(""); }}><PackagePlus size={17} /> Tambah katalog</button></div>
    {notice && <div className="card" style={{ padding: 14, marginTop: 22, background: "#e9f7f3", color: "#086c65", display: "flex", gap: 8, alignItems: "center" }}><CheckCircle2 size={17} />{notice}</div>}
    {open && <form onSubmit={save} className="card" style={{ padding: 22, marginTop: 22, display: "grid", gap: 13, maxWidth: 760 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2 style={{ margin: 0, fontSize: 20 }}>Kartu baru</h2><button type="button" aria-label="Tutup" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}><X size={15} /></button></div><div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 12 }}><label className="field">Jenis<select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Entry["type"] })}><option>Layanan</option><option>Paket</option></select></label><label className="field">Nama layanan / paket<input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Paket Pemulihan Ortopedi" /></label></div>{form.type === "Paket" && <label className="field">Harga mulai dari <input className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Contoh: Rp8.500.000" /></label>}<label className="field">Ringkasan / cakupan<textarea className="input" required rows={3} value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="Cantumkan cakupan singkat, syarat, atau informasi penting." /></label><button className="btn btn-primary" type="submit"><Plus size={16} /> Simpan kartu demo</button></form>}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 14, marginTop: 25 }}>{entries.map((entry) => <article className="card" style={{ padding: 19 }} key={entry.id}><span className="badge badge-neutral">{entry.type}</span><h2 style={{ color: "var(--navy)", fontSize: 20, margin: "12px 0 8px" }}>{entry.name}</h2>{entry.price && <b style={{ color: "var(--teal)", fontSize: 14 }}>{entry.price}</b>}<p className="hint" style={{ lineHeight: 1.55, marginBottom: 0 }}>{entry.detail}</p></article>)}</div>
  </section>;
}
