import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Jakarta Health Journey", description: "Trusted Care, Seamless Journey" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body>{children}</body></html>; }
