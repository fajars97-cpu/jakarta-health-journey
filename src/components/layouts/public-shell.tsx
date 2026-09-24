"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AppwritePing } from "@/components/appwrite/appwrite-ping";
import { ComparisonHeaderLink } from "@/features/comparison/components/comparison-ui";
import { useLanguage } from "@/features/i18n/language-context";
import { CurrencySelector } from "@/features/currency/currency-selector";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return <PublicChrome>{children}</PublicChrome>;
}

function PublicChrome({ children }: { children: React.ReactNode }) {
  const { isEnglish, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const labels = isEnglish ? { explore: "Explore", guide: "Guide", support: "Travel support", feedback: "Feedback", signIn: "Sign in", language: "ID", languageAria: "Switch to Indonesian", menu: "Open menu", tagline: "Trusted Care, Seamless Journey", disclaimer: "Public information platform. Not a substitute for medical consultation or emergency services.", privacy: "Privacy", terms: "Terms" } : { explore: "Jelajahi", guide: "Panduan", support: "Dukungan perjalanan", feedback: "Masukan", signIn: "Masuk", language: "EN", languageAria: "Ganti ke bahasa Inggris", menu: "Buka menu", tagline: "Perawatan Tepercaya, Perjalanan Terarah", disclaimer: "Platform informasi publik. Bukan pengganti konsultasi medis atau layanan gawat darurat.", privacy: "Privasi", terms: "Ketentuan" };
  const localizedNav = [[labels.explore, "/explore"], [labels.guide, "/guide"], [labels.support, "/support"], [labels.feedback, "/feedback"]] as const;

  return <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}><AppwritePing />
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
        <nav className="hide-mobile" style={{ display: "flex", gap: 18, fontSize: 13, fontWeight: 700, color: "#193d57", whiteSpace: "nowrap" }}>
          {localizedNav.map(([label, href]) => <Link key={href} href={href} style={{ whiteSpace: "nowrap" }}>{label}</Link>)}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Image className="hide-mobile" src={`${publicBasePath}/images/logo-jakarta-5-abad.png`} alt="5 Abad Jakarta, Kota Global dan Berbudaya" width={86} height={50} style={{ objectFit: "contain" }} />
          <ComparisonHeaderLink />
          <CurrencySelector />
          <button onClick={toggleLanguage} className="btn btn-outline btn-sm" aria-label={labels.languageAria}>{labels.language}</button>
          <Link className="btn btn-primary btn-sm hide-mobile" href="/login">{labels.signIn}</Link>
          <button aria-label={labels.menu} className="btn btn-outline btn-sm" onClick={() => setOpen(!open)}><Menu size={18} /></button>
        </div>
      </div>
      {open && <div className="container" style={{ padding: "0 0 16px", display: "grid", gap: 12, fontWeight: 700 }}>
        {localizedNav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </div>}
    </header>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>
    <footer style={{ background: "var(--navy)", color: "#dcebf3", marginTop: "auto", padding: "38px 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Image src={`${publicBasePath}/images/logo-dki-jakarta.png`} alt="Lambang Provinsi DKI Jakarta" width={34} height={39} style={{ objectFit: "contain" }} />
          <Image src={`${publicBasePath}/images/jakarta-health-journey-mark-v1.png`} alt="Logo Jakarta Health Journey" width={35} height={35} style={{ objectFit: "contain" }} />
          <div><b style={{ color: "white" }}>Jakarta Health Journey</b><p style={{ margin: "5px 0 0", fontSize: 14 }}>{labels.tagline}</p></div>
        </div>
          <div style={{ display: "grid", gap: 8, fontSize: 13, maxWidth: 470 }}><div style={{ display: "flex", gap: 8 }}><ShieldCheck size={18} /><span>{labels.disclaimer}</span></div><div style={{ display: "flex", gap: 14, paddingLeft: 26, fontSize: 12 }}><Link href="/privacy" style={{ textDecoration: "underline" }}>{labels.privacy}</Link><Link href="/terms" style={{ textDecoration: "underline" }}>{labels.terms}</Link></div></div>
      </div>
    </footer>
  </div>;
}
