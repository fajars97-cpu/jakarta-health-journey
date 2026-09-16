import { Suspense } from "react";
import { RegisterForm } from "@/features/auth/register-form";

export default function RegisterPage() { return <Suspense fallback={<main className="auth-status">Menyiapkan pendaftaran…</main>}><RegisterForm /></Suspense>; }
