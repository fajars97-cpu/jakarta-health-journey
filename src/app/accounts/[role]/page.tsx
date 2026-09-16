import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layouts/public-shell";
import { AccountLanding, accountLanding } from "@/features/accounts/components/account-landing";

const roles = Object.keys(accountLanding) as Array<keyof typeof accountLanding>;
export function generateStaticParams() { return roles.map(role => ({ role })); }
export default async function RoleLanding({ params }: { params: Promise<{ role: string }> }) { const { role } = await params; if (!roles.includes(role as keyof typeof accountLanding)) notFound(); return <PublicShell><AccountLanding account={role as keyof typeof accountLanding} /></PublicShell>; }
