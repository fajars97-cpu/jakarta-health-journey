import Link from "next/link";

export default function NotFound() {
  return <main className="route-error"><section className="route-error-card"><p className="eyebrow">404 · JAKARTA HEALTH JOURNEY</p><h1>Halaman tidak ditemukan.</h1><p>Alamat yang Anda buka mungkin sudah berubah atau belum tersedia.</p><Link className="btn btn-primary" href="/explore/">Jelajahi layanan</Link></section></main>;
}
