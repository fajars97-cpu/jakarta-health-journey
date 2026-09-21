"use client";

import Link from "next/link";
import { Check, ChevronDown, CircleAlert, Scale, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { organizations } from "@/data/demo/mock-data";

type ComparisonItem = { organizationId: string; service: string };
const storageKey = "jhj-service-comparison";
const eventName = "jhj-comparison-updated";
function load(): ComparisonItem[] { try { return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as ComparisonItem[]; } catch { return []; } }
function persist(items: ComparisonItem[]) { window.localStorage.setItem(storageKey, JSON.stringify(items)); window.dispatchEvent(new Event(eventName)); }
function keyOf(item: ComparisonItem) { return `${item.organizationId}:${item.service}`; }

export function ComparisonPicker({ organizationId, services }: { organizationId: string; services: string[] }) {
  const [items, setItems] = useState<ComparisonItem[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => { setItems(load()); }, []);
  function toggle(service: string) {
    const entry = { organizationId, service }; const selected = items.some((item) => keyOf(item) === keyOf(entry));
    if (!selected && items.length >= 5) { setNotice("Maksimal lima layanan dapat dibandingkan sekaligus."); return; }
    const next = selected ? items.filter((item) => keyOf(item) !== keyOf(entry)) : [...items, entry];
    setItems(next); persist(next); setNotice("");
  }
  const selectedHere = items.filter((item) => item.organizationId === organizationId).length;
  return <details className="comparison-picker"><summary><Scale size={16} /> Tandai untuk dibandingkan {selectedHere > 0 && <b>{selectedHere}</b>}<ChevronDown size={15} /></summary><div><p>Pilih layanan dari fasyankes ini. Maksimal 5 layanan dari beberapa fasyankes.</p>{services.map((service) => { const active = items.some((item) => keyOf(item) === `${organizationId}:${service}`); return <label key={service}><input type="checkbox" checked={active} onChange={() => toggle(service)} /><span>{service}</span>{active && <Check size={15} />}</label>; })}{notice && <small><CircleAlert size={14} />{notice}</small>}<Link href="/compare" className="btn btn-outline btn-sm"><Scale size={15} /> Buka perbandingan ({items.length}/5)</Link></div></details>;
}

export function ComparisonHeaderLink() {
  const [count, setCount] = useState(0);
  useEffect(() => { const refresh = () => setCount(load().length); refresh(); window.addEventListener(eventName, refresh); window.addEventListener("storage", refresh); return () => { window.removeEventListener(eventName, refresh); window.removeEventListener("storage", refresh); }; }, []);
  return <Link href="/compare" className="btn btn-outline btn-sm hide-mobile" aria-label={`Bandingkan layanan, ${count} dipilih`}><Scale size={16} />Bandingkan{count > 0 && <span className="comparison-count">{count}</span>}</Link>;
}

export function ComparisonWorkspace() {
  const [items, setItems] = useState<ComparisonItem[]>([]);
  useEffect(() => { setItems(load()); }, []);
  const details = useMemo(() => items.map((item) => ({ item, organization: organizations.find((organization) => organization.id === item.organizationId) })).filter((detail): detail is { item: ComparisonItem; organization: typeof organizations[number] } => Boolean(detail.organization)), [items]);
  const distinctOrganizations = new Set(details.map((detail) => detail.organization.id)).size;
  function remove(item: ComparisonItem) { const next = items.filter((entry) => keyOf(entry) !== keyOf(item)); setItems(next); persist(next); }
  function clear() { setItems([]); persist([]); }
  return <main className="compare-page"><section className="container compare-intro"><p className="eyebrow"><Scale size={14} /> PERBANDINGAN LAYANAN</p><h1 className="section-title">Bandingkan pilihan Anda, dengan lebih jernih.</h1><p>Pilih hingga lima layanan dari fasyankes yang berbeda. Informasi ini bersifat publik dan bukan rekomendasi medis.</p></section>{details.length === 0 ? <section className="container compare-empty"><Scale size={32} /><h2>Belum ada layanan yang ditandai.</h2><p>Buka halaman fasyankes, lalu gunakan tombol “Tandai untuk dibandingkan” pada layanan yang ingin Anda lihat berdampingan.</p><Link href="/explore" className="btn btn-primary">Jelajahi fasyankes</Link></section> : <section className="container"><div className="compare-toolbar"><span><b>{details.length}/5 layanan dipilih</b>{distinctOrganizations < 2 && " · Tambahkan layanan dari fasyankes lain untuk membandingkan."}</span><button type="button" className="btn btn-outline btn-sm" onClick={clear}><Trash2 size={15} /> Kosongkan</button></div><div className="compare-scroll"><div className="compare-grid" style={{ gridTemplateColumns: `repeat(${details.length}, minmax(250px, 1fr))` }}>{details.map(({ item, organization }) => <article className="compare-card" key={keyOf(item)}><div className="compare-card-top"><span>{organization.type}</span><button type="button" aria-label={`Hapus ${item.service}`} onClick={() => remove(item)}><Trash2 size={15} /></button></div><h2>{item.service}</h2><h3>{organization.name}</h3><dl><div><dt>Area</dt><dd>{organization.area}</dd></div><div><dt>Bahasa</dt><dd>{organization.languages.join(" · ")}</dd></div><div><dt>Jam layanan</dt><dd>{organization.hours}</dd></div><div><dt>Akses</dt><dd>{organization.accessibility.join(" · ")}</dd></div><div><dt>Proses inquiry</dt><dd>Konfirmasi awal 1–2 hari kerja</dd></div></dl><Link href={`/facility/${organization.slug}`} className="btn btn-outline btn-sm">Lihat fasyankes</Link></article>)}</div></div><p className="compare-note">Untuk harga, cakupan paket, dan kesesuaian klinis, gunakan informasi pada halaman fasyankes lalu kirim inquiry. Jangan gunakan halaman ini untuk keadaan darurat atau keputusan medis tanpa konsultasi.</p></section>}</main>;
}
