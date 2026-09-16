import { AdminShell } from "@/components/layouts/admin-shell";
import { RequireAuthentication } from "@/features/auth/require-authentication";
import { Role } from "@/types/domain";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RequireAuthentication><AdminShell role={Role.CommitteeAdmin}>{children}</AdminShell></RequireAuthentication>;
}
