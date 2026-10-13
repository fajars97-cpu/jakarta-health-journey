"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShieldCheck, X } from "lucide-react";
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
  const { isEnglish, toggleLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const labels = isEnglish ? { explore: "Explore", guide: "Guide", support: "Travel support", feedback: "Feedback", signIn: "Sign in", language: "ID", languageAria: "Switch to Indonesian", menu: "Open menu", tagline: "Trusted Care, Seamless Journey", disclaimer: "Public information platform. Not a substitute for medical consultation or emergency services.", privacy: "Privacy", terms: "Terms" } : { explore: "Jelajahi", guide: "Panduan", support: "Dukungan perjalanan", feedback: "Masukan", signIn: "Masuk", language: "EN", languageAria: "Ganti ke bahasa Inggris", menu: "Buka menu", tagline: "Perawatan Tepercaya, Perjalanan Terarah", disclaimer: "Platform informasi publik. Bukan pengganti konsultasi medis atau layanan gawat darurat.", privacy: "Privasi", terms: "Ketentuan" };
  const localizedNav = [[labels.explore, "/explore"], [labels.guide, "/guide"], [labels.support, "/support"], [labels.feedback, "/feedback"]] as const;

  return <div className="public-shell"><AppwritePing />
    <a className="skip-link" href="#main-content">{t("skip")}</a>
    <header className="public-header">
      <div className="container public-header-inner">
        <div className="public-brand-group">
          <Image src={`${publicBasePath}/images/logo-dki-jakarta.png`} alt="Lambang Provinsi DKI Jakarta" width={38} height={43} style={{ objectFit: "contain" }} />
          <span aria-hidden="true" style={{ width: 1, height: 34, background: "#d7e2e8" }} />
          <Link href="/" className="public-brand">
            <Image src={`${publicBasePath}/images/jakarta-health-journey-mark-v1.png`} alt="Logo Jakarta Health Tourism" width={40} height={40} style={{ objectFit: "contain" }} />
            <span>Jakarta Health<br /><small style={{ fontWeight: 600, color: "#4c697b" }}>Tourism</small></span>
          </Link>
        </div>
        <nav className="public-nav" aria-label={isEnglish ? "Main navigation" : "Navigasi utama"}>
          {localizedNav.map(([label, href]) => <Link key={href} href={href} style={{ whiteSpace: "nowrap" }}>{label}</Link>)}
        </nav>
        <div className="public-actions">
          <Image className="public-anniversary-logo" src={`${publicBasePath}/images/logo-jakarta-5-abad.png`} alt="5 Abad Jakarta, Kota Global dan Berbudaya" width={86} height={50} style={{ objectFit: "contain" }} />
          <ComparisonHeaderLink />
          <CurrencySelector />
          <button onClick={toggleLanguage} className="btn btn-outline btn-sm" aria-label={labels.languageAria}>{labels.language}</button>
          <Link className="btn btn-primary btn-sm public-sign-in" href="/login">{labels.signIn}</Link>
          <button aria-label={labels.menu} aria-expanded={open} aria-controls="public-mobile-menu" className="btn btn-outline btn-sm public-menu-button" onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {open && <div id="public-mobile-menu" className="container public-mobile-menu">
        {localizedNav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/login" onClick={() => setOpen(false)}>{labels.signIn}</Link>
      </div>}
    </header>
    <div id="main-content" tabIndex={-1} className="public-content">{children}</div>
    <footer className="public-footer">
      <div className="container public-footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Image src={`${publicBasePath}/images/logo-dki-jakarta.png`} alt="Lambang Provinsi DKI Jakarta" width={34} height={39} style={{ objectFit: "contain" }} />
          <Image src={`${publicBasePath}/images/jakarta-health-journey-mark-v1.png`} alt="Logo Jakarta Health Tourism" width={35} height={35} style={{ objectFit: "contain" }} />
          <div><b>Jakarta Health Tourism</b><p>{labels.tagline}</p></div>
        </div>
          <div className="public-footer-note"><div><ShieldCheck size={18} /><span>{labels.disclaimer}</span></div><div className="public-footer-links"><Link href="/privacy">{labels.privacy}</Link><Link href="/terms">{labels.terms}</Link></div></div>
      </div>
    </footer>
  </div>;
}
