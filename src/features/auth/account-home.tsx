"use client";

import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "./auth-provider";
import { Role } from "@/types/domain";

export function AccountHome() {
  const { user, role, signOut } = useAuth();
  const portalHref = role === Role.FacilityAdmin ? "/facility-admin/dashboard" : role === Role.PartnerAdmin ? "/partner-admin" : role === Role.CommitteeAdmin || role === Role.Reviewer ? "/admin" : "/patient/dashboard";
  return <main className="auth-page"><section className="auth-card auth-account-card">
    <div className="auth-brand"><ShieldCheck size={23} /><span>Jakarta Health Journey</span></div>
    <p className="eyebrow">SESSION AKTIF</p>
    <h1>Selamat datang, {user?.name || "Pengguna"}.</h1>
    <p className="auth-intro">Anda telah masuk sebagai <strong>{user?.email}</strong>. Pemetaan akses berdasarkan peran akan kita susun berikutnya.</p>
    <div className="auth-actions"><Link className="btn btn-primary" href={portalHref}>Buka dashboard</Link><button className="btn btn-outline" onClick={() => void signOut()}><LogOut size={16} /> Keluar</button></div>
  </section></main>;
}
