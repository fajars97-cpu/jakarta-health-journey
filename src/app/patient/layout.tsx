import { PatientShell } from "@/features/patient/components/patient-portal";
import "@/features/patient/patient.css";

export default function PatientLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <PatientShell>{children}</PatientShell>; }
