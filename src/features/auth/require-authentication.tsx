"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

export function RequireAuthentication({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "anonymous") router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [pathname, router, status]);

  if (status !== "authenticated") {
    return <main className="auth-status" aria-live="polite">Memeriksa akses aman Anda…</main>;
  }

  return <>{children}</>;
}
