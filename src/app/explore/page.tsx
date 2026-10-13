"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PublicShell } from "@/components/layouts/public-shell";
import { PartnerCard } from "@/features/catalog/components/partner-card";
import { useLanguage } from "@/features/i18n/language-context";
import { dataService } from "@/services/data-service";
import { PartnerType, type Organization } from "@/types/domain";

const typeLabels = { Semua: "All", "Rumah Sakit": "Hospital", "Klinik": "Clinic", Hotel: "Hotel", "Travel Agent": "Travel agent", Penerjemah: "Interpreter" } as const;

export default function Explore() {
  const { isEnglish, t } = useLanguage();
  const [q, setQ] = useState("");
  const [type, setType] = useState("Semua");
  const [area, setArea] = useState("Semua");
  const [accessible, setAccessible] = useState(false);
  const [items, setItems] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const labels = isEnglish ? { eyebrow: "PUBLIC DIRECTORY", title: "Find the right service for your needs.", intro: "Only verified partners are shown. Results are not ranked by payment or commission.", search: "Search services or partners", searchPlaceholder: "Name or service", type: "Partner type", area: "Area", all: "All", accessible: "Accessible", found: "partners found", language: "Languages: Indonesian · English", empty: "No matching results.", emptyCopy: "Try removing one or more filters." } : { eyebrow: "KATALOG PUBLIK", title: "Temukan layanan yang sesuai kebutuhan Anda.", intro: "Hanya mitra terverifikasi yang ditampilkan. Urutan tidak dipengaruhi pembayaran atau komisi.", search: "Cari layanan atau mitra", searchPlaceholder: "Nama atau layanan", type: "Jenis mitra", area: "Wilayah", all: "Semua", accessible: "Aksesibel", found: "mitra ditemukan", language: "Bahasa: Indonesia · Inggris", empty: "Belum ada hasil yang cocok.", emptyCopy: "Coba hapus satu atau beberapa filter." };

  function loadPartners() {
    setLoading(true); setLoadError(false);
    window.setTimeout(() => {
      try { setItems(dataService.listPublic()); } catch { setLoadError(true); } finally { setLoading(false); }
    }, 180);
  }

  useEffect(() => { const timer = window.setTimeout(loadPartners, 0); return () => window.clearTimeout(timer); }, []);
  const list = useMemo(() => items.filter((x) => (type === "Semua" || x.type === type) && (area === "Semua" || x.area === area) && (!accessible || x.accessibility.length > 0) && (`${x.name} ${x.services.join(" ")}`.toLowerCase().includes(q.toLowerCase()))), [items, q, type, area, accessible]);
  const activeFilters = [q && { label: `“${q}”`, clear: () => setQ("") }, type !== "Semua" && { label: type, clear: () => setType("Semua") }, area !== "Semua" && { label: area, clear: () => setArea("Semua") }, accessible && { label: labels.accessible, clear: () => setAccessible(false) }].filter(Boolean) as { label: string; clear: () => void }[];
  const displayType = (value: string) => isEnglish ? typeLabels[value as keyof typeof typeLabels] ?? value : value;
  const resetFilters = () => { setQ(""); setType("Semua"); setArea("Semua"); setAccessible(false); };

  return <PublicShell><main className="container explore-page" style={{ padding: "50px 0" }}>
    <p className="eyebrow">{labels.eyebrow}</p><h1 className="section-title">{labels.title}</h1><p className="explore-intro">{labels.intro}</p>
    <div className="card catalogue-filter" role="search"><div className="catalogue-filter-grid">
      <label className="field"><span>{labels.search}</span><div className="catalogue-search"><Search size={17} aria-hidden="true" /><input className="input" aria-label={labels.search} placeholder={labels.searchPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} /></div></label>
      <label className="field"><span>{labels.type}</span><select className="input" value={type} onChange={(e) => setType(e.target.value)}><option value="Semua">{labels.all}</option>{Object.values(PartnerType).map((value) => <option key={value} value={value}>{displayType(value)}</option>)}</select></label>
      <label className="field"><span>{labels.area}</span><select className="input" value={area} onChange={(e) => setArea(e.target.value)}><option value="Semua">{labels.all}</option>{["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur"].map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="accessible-filter"><input type="checkbox" checked={accessible} onChange={(e) => setAccessible(e.target.checked)} /> <span>{labels.accessible}</span></label>
    </div></div>
    {activeFilters.length > 0 && <div className="active-filter-row"><span>{isEnglish ? "Active filters" : "Filter aktif"}</span>{activeFilters.map((filter) => <button type="button" key={filter.label} onClick={filter.clear}>{filter.label}<X size={13} /></button>)}<button type="button" className="clear-filter-button" onClick={resetFilters}>{t("clearFilters")}</button></div>}
    <div className="explore-results-heading"><b aria-live="polite">{loading ? t("loading") : `${list.length} ${labels.found}`}</b><span className="hint"><SlidersHorizontal size={14} aria-hidden="true" /> {labels.language}</span></div>
    {loading ? <div className="explore-skeleton-grid" aria-label={t("loading")} aria-busy="true">{[1, 2, 3, 4].map((item) => <div className="explore-skeleton card" key={item} />)}</div> : loadError ? <div className="card explore-state" role="alert"><b>{t("error")}</b><p className="hint">{isEnglish ? "Please try again in a moment." : "Silakan coba beberapa saat lagi."}</p><button type="button" className="btn btn-primary" onClick={loadPartners}>{t("retry")}</button></div> : list.length ? <div className="explore-grid">{list.map((x) => <PartnerCard key={x.id} partner={x} />)}</div> : <div className="card explore-state"><b>{labels.empty}</b><p className="hint">{labels.emptyCopy}</p><button type="button" className="btn btn-outline" onClick={resetFilters}>{t("reset")}</button></div>}
  </main></PublicShell>;
}
