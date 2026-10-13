"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, CircleHelp } from "lucide-react";
import { useAuth } from "./auth-provider";

function safeNextPath(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/account";
}

export function LoginForm() {
  const { signIn, status } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const nextPath = safeNextPath(searchParams.get("next"));
  const registerHref = `/register?next=${encodeURIComponent(nextPath)}`;

  useEffect(() => {
    if (status === "authenticated") router.replace(nextPath);
  }, [nextPath, router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace(nextPath);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Login belum berhasil. Periksa email dan kata sandi Anda.";
      setError(message);
      setSubmitting(false);
    }
  }

  return <main className="auth-page">
    <section className="auth-card">
      <div className="auth-brand"><ShieldCheck size={23} /><span>Jakarta Health Tourism</span></div>
      <p className="eyebrow">AKSES AMAN</p>
      <h1>Masuk ke portal Anda.</h1>
      <p className="auth-intro">Gunakan akun yang telah dibuatkan. Session akan berakhir otomatis setelah 24 jam.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label><span>Email</span><div className="auth-input"><Mail size={18} /><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@contoh.id" required /></div></label>
        <label><span>Kata sandi</span><div className="auth-input"><LockKeyhole size={18} /><input type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Masukkan kata sandi" required /><button type="button" className="auth-icon-button" aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="btn btn-primary auth-submit" type="submit" disabled={submitting || status === "loading"}>{submitting ? "Memproses…" : <>Masuk <ArrowRight size={17} /></>}</button>
      </form>
      <div className="auth-help"><button type="button" onClick={() => setHelpOpen((open) => !open)}><CircleHelp size={16} /> Tidak bisa masuk?</button>{helpOpen && <p role="status">Untuk demo, gunakan akun yang diberikan administrator. Jika akses produksi bermasalah, hubungi pengelola Jakarta Health Tourism—jangan kirim kata sandi melalui chat.</p>}</div>
      <p className="auth-note">Belum punya akun? <Link href={registerHref} style={{ color: "#087d80", fontWeight: 800 }}>Buat akun pasien</Link></p>
      <Link className="auth-back" href="/">← Kembali ke Jakarta Health Tourism</Link>
    </section>
  </main>;
}
