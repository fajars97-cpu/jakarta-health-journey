import { AccountHome } from "@/features/auth/account-home";
import { RequireAuthentication } from "@/features/auth/require-authentication";

export default function AccountPage() { return <RequireAuthentication><AccountHome /></RequireAuthentication>; }
