import { Suspense } from "react";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return <Suspense fallback={<main className="auth-status">Menyiapkan halaman masuk…</main>}><LoginForm /></Suspense>;
}
