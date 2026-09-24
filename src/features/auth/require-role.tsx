"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { Role } from "@/types/domain";

export function RequireRole({ roles, children }: { roles: Role[]; children: React.ReactNode }) {
  const { status, role } = useAuth();
  if (status !== "authenticated") return <main className="auth-status" aria-live="polite">Memeriksa peran Anda…</main>;
  if (!roles.includes(role)) {
    return <main className="auth-status"><section className="card" style={{ padding: 28, maxWidth: 560, margin: 20 }}><h1 style={{ marginTop: 0 }}>Akses terbatas</h1><p>Peran akun Anda belum memiliki akses ke ruang kerja ini.</p><Link className="btn btn-outline" href="/account">Kembali ke akun</Link></section></main>;
  }
  return <>{children}</>;
}
