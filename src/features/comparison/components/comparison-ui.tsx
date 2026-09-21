"use client";

import Link from "next/link";
import { CircleAlert, Scale, Trash2 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { organizations } from "@/data/demo/mock-data";
import { PartnerType } from "@/types/domain";

type ComparisonGroup = "fasyankes" | "hotel" | "travel" | "translator";
type ComparisonItem = { organizationId: string; service: string; group?: ComparisonGroup };
type ResolvedComparisonItem = ComparisonItem & { group: ComparisonGroup };
const storageKey = "jhj-service-comparison";
const eventName = "jhj-comparison-updated";
function groupOf(type: PartnerType): ComparisonGroup { if (type === PartnerType.Hospital || type === PartnerType.Clinic) return "fasyankes"; if (type === PartnerType.Hotel) return "hotel"; if (type === PartnerType.Travel) return "travel"; return "translator"; }
function groupLabel(group: ComparisonGroup) { return group === "fasyankes" ? "fasyankes (rumah sakit atau klinik)" : group === "travel" ? "travel agent" : group; }
function persist(items: ComparisonItem[]) { window.localStorage.setItem(storageKey, JSON.stringify(items)); window.dispatchEvent(new Event(eventName)); }
function keyOf(item: ComparisonItem) { return `${item.organizationId}:${item.service}`; }
function subscribe(callback: () => void) { window.addEventListener(eventName, callback); window.addEventListener("storage", callback); return () => { window.removeEventListener(eventName, callback); window.removeEventListener("storage", callback); }; }
function snapshot() { return window.localStorage.getItem(storageKey) ?? "[]"; }
function useComparisonItems(): ResolvedComparisonItem[] { const serialized = useSyncExternalStore(subscribe, snapshot, () => "[]"); return useMemo(() => { try { return (JSON.parse(serialized) as ComparisonItem[]).map((item) => ({ ...item, group: item.group ?? groupOf(organizations.find((organization) => organization.id === item.organizationId)?.type ?? PartnerType.Hospital) })); } catch { return []; } }, [serialized]); }

export function ComparisonPackageButton({ organizationId, service }: { organizationId: string; service: string }) {
  const items = useComparisonItems(); const [notice, setNotice] = useState("");
  const selected = items.some((item) => keyOf(item) === `${organizationId}:${service}`);
  function toggle() {
    const organization = organizations.find((candidate) => candidate.id === organizationId); if (!organization) return;
    const group = groupOf(organization.type); const entry: ResolvedComparisonItem = { organizationId, service, group };
    if (!selected && items.length > 0 && items[0].group !== group) { setNotice(`Daftar berisi ${groupLabel(items[0].group)}. Kosongkan daftar untuk membandingkan ${groupLabel(group)}.`); return; }
    if (!selected && items.length >= 5) { setNotice("Maksimal lima paket dapat dibandingkan."); return; }
    persist(selected ? items.filter((item) => keyOf(item) !== keyOf(entry)) : [...items, entry]); setNotice("");
  }
  return <div className="comparison-package-action"><button type="button" onClick={toggle} className={selected ? "comparison-package-selected" : ""}><Scale size={15} />{selected ? "Ditandai untuk dibandingkan" : "Bandingkan paket"}</button>{notice && <small><CircleAlert size={13} />{notice}</small>}</div>;
}

export function ComparisonHeaderLink() { const count = useComparisonItems().length; return <Link href="/compare" className="btn btn-outline btn-sm hide-mobile" aria-label={`Bandingkan layanan, ${count} dipilih`}><Scale size={16} />Bandingkan{count > 0 && <span className="comparison-count">{count}</span>}</Link>; }

export function ComparisonWorkspace() {
  const items = useComparisonItems();
  const details = useMemo(() => items.flatMap((item) => { const organization = organizations.find((candidate) => candidate.id === item.organizationId); return organization ? [{ item, organization }] : []; }), [items]); const distinctOrganizations = new Set(details.map((detail) => detail.organization.id)).size; const group = details[0]?.item.group;
  function remove(item: ComparisonItem) { persist(items.filter((entry) => keyOf(entry) !== keyOf(item))); } function clear() { persist([]); }
  return <main className="compare-page"><section className="container compare-intro"><p className="eyebrow"><Scale size={14} /> PERBANDINGAN LAYANAN</p><h1 className="section-title">Bandingkan pilihan Anda, dengan lebih jernih.</h1><p>Pilih hingga lima layanan dalam kelompok yang sama: fasyankes, hotel, travel agent, atau penerjemah. Informasi ini bersifat publik dan bukan rekomendasi medis.</p></section>{details.length === 0 ? <section className="container compare-empty"><Scale size={32} /><h2>Belum ada layanan yang ditandai.</h2><p>Buka katalog atau halaman mitra, lalu gunakan tombol “Tandai untuk dibandingkan” pada layanan yang ingin Anda lihat berdampingan.</p><Link href="/explore" className="btn btn-primary">Jelajahi mitra</Link></section> : <section className="container"><div className="compare-toolbar"><span><b>{details.length}/5 layanan {group && `· ${groupLabel(group)}`}</b>{distinctOrganizations < 2 && " · Tambahkan layanan dari mitra lain untuk membandingkan."}</span><button type="button" className="btn btn-outline btn-sm" onClick={clear}><Trash2 size={15} /> Kosongkan</button></div><div className="compare-scroll"><div className="compare-grid" style={{ gridTemplateColumns: `repeat(${details.length}, minmax(250px, 1fr))` }}>{details.map(({ item, organization }) => <article className="compare-card" key={keyOf(item)}><div className="compare-card-top"><span>{organization.type}</span><button type="button" aria-label={`Hapus ${item.service}`} onClick={() => remove(item)}><Trash2 size={15} /></button></div><h2>{item.service}</h2><h3>{organization.name}</h3><dl><div><dt>Area</dt><dd>{organization.area}</dd></div><div><dt>Bahasa</dt><dd>{organization.languages.join(" · ")}</dd></div><div><dt>Jam layanan</dt><dd>{organization.hours}</dd></div><div><dt>Akses</dt><dd>{organization.accessibility.join(" · ")}</dd></div><div><dt>Proses inquiry</dt><dd>Konfirmasi awal 1–2 hari kerja</dd></div></dl><Link href={`/facility/${organization.slug}`} className="btn btn-outline btn-sm">Lihat mitra</Link></article>)}</div></div><p className="compare-note">Untuk harga, cakupan paket, dan kesesuaian layanan, gunakan informasi pada halaman mitra lalu kirim inquiry. Jangan gunakan halaman ini untuk keadaan darurat atau keputusan medis tanpa konsultasi.</p></section>}</main>;
}
