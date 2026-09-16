import { RequireAuthentication } from "@/features/auth/require-authentication";

export default function PartnerAdminPage() {
  return <RequireAuthentication><main className="auth-page"><section className="auth-card auth-account-card"><p className="eyebrow">PARTNER SUPPORT</p><h1>Ruang kerja partner.</h1><p className="auth-intro">Portal untuk pengelola hotel, caregiver, penerjemah, transportasi, dan dukungan perjalanan sedang disiapkan.</p></section></main></RequireAuthentication>;
}
