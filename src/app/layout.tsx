import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/features/auth/auth-provider";
import { LanguageProvider } from "@/features/i18n/language-context";
import { CurrencyProvider } from "@/features/currency/currency-context";
import "@/features/auth/auth.css";
import "@/features/language/language-support.css";
import "@/features/language/language-credentials.css";
import "./globals.css";
const siteUrl = "https://fajars97-cpu.github.io/jakarta-health-journey";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Jakarta Health Journey", template: "%s | Jakarta Health Journey" },
  description: "Temukan layanan kesehatan terverifikasi dan dukungan perjalanan di Jakarta.",
  applicationName: "Jakarta Health Journey",
  keywords: ["health tourism Jakarta", "layanan kesehatan Jakarta", "medical tourism Indonesia", "Enjoy Jakarta"],
  authors: [{ name: "Jakarta Health Journey" }],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: { type: "website", locale: "id_ID", url: siteUrl, siteName: "Jakarta Health Journey", title: "Jakarta Health Journey", description: "Trusted care, seamless journey in Jakarta." },
  twitter: { card: "summary_large_image", title: "Jakarta Health Journey", description: "Layanan kesehatan dan dukungan perjalanan terverifikasi di Jakarta." },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#082b4a" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body><AuthProvider><LanguageProvider><CurrencyProvider>{children}</CurrencyProvider></LanguageProvider></AuthProvider></body></html>; }
