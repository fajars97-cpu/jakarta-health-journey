"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AppwritePing } from "@/components/appwrite/appwrite-ping";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const nav = [["Jelajahi", "/explore"], ["Dukungan perjalanan", "/support"], ["Feedback", "/feedback"]] as const;

export function PublicShell({ children }: { children: React.ReactNode }) {
  const [en, setEn] = useState(false);
  const [open, setOpen] = useState(false);

  return <><AppwritePing />
    <header style={{ borderBottom: "1px solid #d9e5eb", background: "rgba(255,255,255,.96)", position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(12px)" }}>
      <div className="container" style={{ minHeight: 78, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <Image src={`${publicBasePath}/images/logo-dki-jakarta.png`} alt="Lambang Provinsi DKI Jakarta" width={38} height={43} style={{ objectFit: "contain" }} />
          <span aria-hidden="true" style={{ width: 1, height: 34, background: "#d7e2e8" }} />
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 800, color: "var(--navy)", lineHeight: 1.04 }}>
            <Image src={`${publicBasePath}/images/jakarta-health-journey-mark-v1.png`} alt="Logo Jakarta Health Journey" width={40} height={40} style={{ objectFit: "contain" }} />
            <span>Jakarta Health<br /><small style={{ fontWeight: 600, color: "#4c697b" }}>Journey</small></span>
          </Link>
        </div>
        <nav className="hide-mobile" style={{ display: "flex", gap: 22, fontSize: 14, fontWeight: 700, color: "#193d57" }}>
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Image className="hide-mobile" src={`${publicBasePath}/images/logo-jakarta-5-abad.png`} alt="5 Abad Jakarta, Kota Global dan Berbudaya" width={86} height={50} style={{ objectFit: "contain" }} />
          <button onClick={() => setEn(!en)} className="btn btn-outline btn-sm">{en ? "ID" : "EN"}</button>
          <Link className="btn btn-primary btn-sm hide-mobile" href="/login">{en ? "Sign in" : "Masuk"}</Link>
          <button aria-label="Buka menu" className="btn btn-outline btn-sm" onClick={() => setOpen(!open)}><Menu size={18} /></button>
        </div>
      </div>
      {open && <div className="container" style={{ padding: "0 0 16px", display: "grid", gap: 12, fontWeight: 700 }}>
        {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </div>}
    </header>
    {children}
    <footer style={{ background: "var(--navy)", color: "#dcebf3", marginTop: 64, padding: "38px 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Image src={`${publicBasePath}/images/logo-dki-jakarta.png`} alt="Lambang Provinsi DKI Jakarta" width={34} height={39} style={{ objectFit: "contain" }} />
          <Image src={`${publicBasePath}/images/jakarta-health-journey-mark-v1.png`} alt="Logo Jakarta Health Journey" width={35} height={35} style={{ objectFit: "contain" }} />
          <div><b style={{ color: "white" }}>Jakarta Health Journey</b><p style={{ margin: "5px 0 0", fontSize: 14 }}>Trusted Care, Seamless Journey</p></div>
        </div>
        <div style={{ display: "flex", gap: 8, fontSize: 13, maxWidth: 470 }}><ShieldCheck size={18} /><span>Platform informasi publik. Bukan pengganti konsultasi medis atau layanan gawat darurat.</span></div>
      </div>
    </footer>
  </>;
}
