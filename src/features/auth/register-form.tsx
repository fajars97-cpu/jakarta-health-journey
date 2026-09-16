"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "./auth-provider";

function safeNextPath(value: string | null) { return value?.startsWith("/") && !value.startsWith("//") ? value : "/patient/dashboard"; }

export function RegisterForm() {
  const { signUp, status } = useAuth(); const router = useRouter(); const searchParams = useSearchParams(); const nextPath = safeNextPath(searchParams.get("next"));
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  useEffect(() => { if (status === "authenticated") router.replace(nextPath); }, [nextPath, router, status]);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setError(""); setSubmitting(true); try { await signUp(name.trim(), email.trim(), password); router.replace(nextPath); } catch (caught) { setError(caught instanceof Error ? caught.message : "Pembuatan akun belum berhasil."); setSubmitting(false); } }
  const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;
  return <main className="auth-page"><section className="auth-card"><div className="auth-brand"><ShieldCheck size={23} /><span>Jakarta Health Journey</span></div><p className="eyebrow">AKUN PASIEN</p><h1>Buat akun untuk melanjutkan.</h1><p className="auth-intro">Akun diperlukan agar inquiry, jadwal, dan koordinasi perjalanan Anda dapat dikelola dengan aman.</p><form onSubmit={submit} className="auth-form"><label><span>Nama lengkap</span><div className="auth-input"><UserRound size={18} /><input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></div></label><label><span>Email</span><div className="auth-input"><Mail size={18} /><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div></label><label><span>Kata sandi</span><div className="auth-input"><LockKeyhole size={18} /><input type="password" minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="btn btn-primary auth-submit" type="submit" disabled={submitting || status === "loading"}>{submitting ? "Membuat akun…" : <>Buat akun & lanjutkan <ArrowRight size={17} /></>}</button></form><p className="auth-note">Sudah punya akun? <Link href={loginHref} style={{ color: "#087d80", fontWeight: 800 }}>Masuk di sini</Link></p></section></main>;
}
