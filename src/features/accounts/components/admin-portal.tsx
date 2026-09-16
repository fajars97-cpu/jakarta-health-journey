import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck, Hotel, ShieldCheck } from "lucide-react";

const workspaces = [
  { name: "Jakarta Health Journey", detail: "Standar platform, mitra, pengaduan, dan audit.", href: "/committee/dashboard", icon: ShieldCheck, accent: "navy" },
  { name: "Fasyankes", detail: "Profil fasilitas, inquiry, dan proses verifikasi.", href: "/facility-admin/dashboard", icon: Building2, accent: "teal" },
  { name: "Partner Support", detail: "Layanan hotel, penerjemah, caregiver, dan perjalanan.", href: "/partner-admin", icon: Hotel, accent: "orange" },
  { name: "Reviewer", detail: "Review mitra dan keputusan verifikasi berbasis standar.", href: "/committee/verification", icon: ClipboardCheck, accent: "blue" },
] as const;

export function AdminPortal() {
  return <main className="account-directory"><section className="account-directory-hero admin-portal-hero"><div className="container"><p className="eyebrow-light">JAKARTA HEALTH JOURNEY · INTERNAL</p><h1>Portal kerja<br /><em>untuk mitra terverifikasi.</em></h1><p>Masuk ke ruang kerja sesuai mandat Anda. Akses akan dibatasi berdasarkan peran ketika model izin final disepakati.</p></div></section><section className="container account-grid">{workspaces.map(({ name, detail, href, icon: Icon, accent }) => <Link key={name} href={href} className={`account-directory-card accent-${accent}`}><span className="account-icon"><Icon size={24} /></span><p>PORTAL INTERNAL</p><h2>{name}</h2><small>{detail}</small><span className="account-arrow"><ArrowRight size={19} /></span></Link>)}</section></main>;
}
