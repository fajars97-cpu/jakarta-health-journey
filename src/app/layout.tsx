import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/auth-provider";
import { LanguageProvider } from "@/features/i18n/language-context";
import "@/features/auth/auth.css";
import "@/features/language/language-support.css";
import "@/features/language/language-credentials.css";
import "./globals.css";
export const metadata: Metadata = { title: "Jakarta Health Journey", description: "Trusted Care, Seamless Journey" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body><AuthProvider><LanguageProvider>{children}</LanguageProvider></AuthProvider></body></html>; }
