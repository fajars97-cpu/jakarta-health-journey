"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("[JHJ] Route error", error); }, [error]);
  return <main className="route-error" role="alert"><section className="route-error-card"><p className="eyebrow">JAKARTA HEALTH JOURNEY</p><h1>Halaman belum dapat dimuat.</h1><p>Terjadi kendala sementara. Coba muat ulang halaman atau kembali ke katalog layanan.</p><div className="route-error-actions"><button className="btn btn-primary" onClick={() => reset()}>Coba lagi</button><a className="btn btn-outline" href="/explore/">Kembali ke katalog</a></div></section></main>;
}
