import { AdminPortal } from "@/features/accounts/components/admin-portal";
import { RequireAuthentication } from "@/features/auth/require-authentication";
import { RequireRole } from "@/features/auth/require-role";
import { Role } from "@/types/domain";

export default function AdminPage() { return <RequireAuthentication><RequireRole roles={[Role.CommitteeAdmin, Role.Reviewer, Role.FacilityAdmin, Role.PartnerAdmin]}><AdminPortal /></RequireRole></RequireAuthentication>; }
