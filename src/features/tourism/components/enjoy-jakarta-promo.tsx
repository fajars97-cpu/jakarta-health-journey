"use client";

import { ArrowUpRight, MapPinned, Sparkles } from "lucide-react";
import { useLanguage } from "@/features/i18n/language-context";

const enjoyUrl = (path: string) => `https://enjoy.jakarta.go.id${path}?utm_source=jakarta-health-journey&utm_medium=referral&utm_campaign=health-tourism-cross-promotion`;

const travelReferences = [
  {
    title: "Referensi Blok M · Senopati",
    titleEn: "Blok M · Senopati guide",
    copy: "Pilihan ruang kota, kuliner, dan agenda santai di Jakarta Selatan.",
    copyEn: "City spots, dining, and easy-going plans in South Jakarta.",
    href: enjoyUrl("/article/category/referensi-perjalanan-blok-m-senopati-kebayoran-baru"),
  },
  {
    title: "Referensi Cikini · Raden Saleh",
    titleEn: "Cikini · Raden Saleh guide",
    copy: "Rute kawasan yang cocok untuk jeda, seni, dan pengalaman lokal.",
    copyEn: "A neighbourhood route for pauses, culture, and local experiences.",
    href: enjoyUrl("/article/category/referensi-perjalanan-cikini-raden-saleh"),
  },
  {
    title: "Referensi Kota Tua · Glodok",
    titleEn: "Kota Tua · Glodok guide",
    copy: "Temukan sejarah, kuliner, dan suasana heritage Jakarta.",
    copyEn: "Discover Jakarta heritage, history, and distinctive local flavours.",
    href: enjoyUrl("/article/category/referensi-perjalanan-kota-tua-glodok"),
  },
];

export function EnjoyJakartaPromo() {
  const { isEnglish } = useLanguage();
  const copy = isEnglish
    ? {
        eyebrow: "JAKARTA, BEYOND THE APPOINTMENT",
        title: "Make room for the city, too.",
        intro: "When your schedule allows, discover attractions, food, events, and neighbourhood guides through Enjoy Jakarta—the city’s official tourism reference.",
        badge: "Official tourism guide",
        link: "Explore Enjoy Jakarta",
        note: "Opens the Enjoy Jakarta website in a new tab.",
      }
    : {
        eyebrow: "JAKARTA, DI LUAR JADWAL PERAWATAN",
        title: "Sisihkan ruang untuk mengenal kota.",
        intro: "Saat jadwal Anda memungkinkan, temukan atraksi, kuliner, acara, dan panduan kawasan melalui Enjoy Jakarta—referensi resmi pariwisata Jakarta.",
        badge: "Panduan wisata resmi",
        link: "Jelajahi Enjoy Jakarta",
        note: "Tautan akan membuka situs Enjoy Jakarta di tab baru.",
      };

  return <section className="enjoy-promo"><div className="container"><div className="enjoy-promo-panel">
    <div className="enjoy-promo-heading"><div><p className="enjoy-promo-eyebrow"><Sparkles size={14} /> {copy.eyebrow}</p><h2>{copy.title}</h2><p className="enjoy-promo-intro">{copy.intro}</p></div><a className="enjoy-promo-brand" href={enjoyUrl("/")} target="_blank" rel="noreferrer"><span>enjoy</span><b>jakarta</b><small>{copy.badge}</small><ArrowUpRight size={17} /></a></div>
    <div className="enjoy-promo-grid">{travelReferences.map((reference) => <a className="enjoy-promo-card" href={reference.href} target="_blank" rel="noreferrer" key={reference.href}><span><MapPinned size={17} /> {isEnglish ? "Travel reference" : "Referensi perjalanan"}</span><h3>{isEnglish ? reference.titleEn : reference.title}</h3><p>{isEnglish ? reference.copyEn : reference.copy}</p><strong>{copy.link} <ArrowUpRight size={15} /></strong></a>)}</div>
    <p className="enjoy-promo-note">{copy.note}</p>
  </div></div></section>;
}
