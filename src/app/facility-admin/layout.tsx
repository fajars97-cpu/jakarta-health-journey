import { AdminShell } from "@/components/layouts/admin-shell";
import { RequireAuthentication } from "@/features/auth/require-authentication";
import { RequireRole } from "@/features/auth/require-role";
import { Role } from "@/types/domain";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RequireAuthentication><RequireRole roles={[Role.FacilityAdmin]}><AdminShell role={Role.FacilityAdmin}>{children}</AdminShell></RequireRole></RequireAuthentication>;
}
