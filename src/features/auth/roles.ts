import type { Models } from "appwrite";
import { Role } from "@/types/domain";

const roles = new Set<string>(Object.values(Role));

export function roleFromUser(user: Models.User<Models.Preferences> | null): Role {
  const candidate = (user?.prefs as Record<string, unknown> | undefined)?.role;
  return typeof candidate === "string" && roles.has(candidate) ? candidate as Role : user ? Role.Patient : Role.Public;
}

export function roleLabel(role: Role) {
  return {
    [Role.Public]: "Public",
    [Role.Patient]: "Patient",
    [Role.FacilityAdmin]: "Facility admin",
    [Role.PartnerAdmin]: "Partner admin",
    [Role.CommitteeAdmin]: "JHJ admin",
    [Role.Reviewer]: "Reviewer",
  }[role];
}
