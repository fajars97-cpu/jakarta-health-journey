import { appwriteDatabase } from "@/lib/appwrite/database";
import { dataService } from "@/services/data-service";
import type { Appointment, Feedback, Inquiry, InquiryStatus, PatientProfile } from "@/types/domain";

/**
 * Persistence boundary for the MVP. It uses Appwrite when collection IDs are
 * configured and retains the fictional in-memory repository only as a local
 * demo fallback.
 */
export async function saveInquiry(record: Inquiry, patientId?: string) {
  if (patientId && appwriteDatabase.isInquiryConfigured) {
    await appwriteDatabase.createInquiry(record, patientId);
    return;
  }
  dataService.addInquiry(patientId ? { ...record, patientId } : record);
}

export async function listPatientInquiries(patientId: string, fallback: Inquiry[]) {
  if (appwriteDatabase.isInquiryConfigured) {
    try { return await appwriteDatabase.listInquiries({ patientId }); } catch (error) { console.warn("[Appwrite] Falling back to demo inquiries.", error); }
  }
  return fallback.filter((item) => !item.patientId || item.patientId === patientId);
}

export async function listFacilityInquiries(organizationId: string, fallback: Inquiry[]) {
  if (appwriteDatabase.isInquiryConfigured) {
    try { return await appwriteDatabase.listInquiries({ organizationId }); } catch (error) { console.warn("[Appwrite] Falling back to demo facility inquiries.", error); }
  }
  return fallback.filter((item) => item.organizationId === organizationId);
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  if (appwriteDatabase.isInquiryConfigured) {
    await appwriteDatabase.updateInquiryStatus(id, status);
  }
  return dataService.updateInquiry(id, { status, updatedAt: new Date().toISOString() });
}

export async function saveAppointment(record: Appointment, patientId?: string) {
  if (appwriteDatabase.isAppointmentConfigured) {
    await appwriteDatabase.createAppointment(record, patientId);
    return;
  }
}

export async function updateAppointmentStatus(id: string, status: Appointment["status"]) {
  if (appwriteDatabase.isAppointmentConfigured) await appwriteDatabase.updateAppointmentStatus(id, status);
}

export async function listPatientAppointments(patientId: string, fallback: Appointment[]) {
  if (appwriteDatabase.isAppointmentConfigured) {
    try { return await appwriteDatabase.listAppointments(patientId); } catch (error) { console.warn("[Appwrite] Falling back to demo appointments.", error); }
  }
  return fallback.filter((item) => !item.patientId || item.patientId === patientId);
}

export async function savePatientProfile(profile: PatientProfile) {
  if (appwriteDatabase.isPatientProfileConfigured) {
    await appwriteDatabase.upsertPatientProfile(profile);
    return;
  }
  dataService.savePatientProfile(profile);
}

export async function loadPatientProfile(patientId: string) {
  if (appwriteDatabase.isPatientProfileConfigured) {
    try {
      const document = await appwriteDatabase.getPatientProfile(patientId);
      if (!document) return null;
      const data = document as unknown as Record<string, unknown>;
      return { patientId, name: String(data.name ?? ""), email: String(data.email ?? ""), phone: String(data.phone ?? ""), country: String(data.country ?? "Indonesia"), preferredLanguage: String(data.preferredLanguage ?? "Indonesia"), accessibilityNeeds: String(data.accessibilityNeeds ?? ""), updatedAt: String(data.updatedAt ?? "") };
    } catch (error) { console.warn("[Appwrite] Falling back to demo profile.", error); }
  }
  return dataService.patientProfile()?.patientId === patientId ? dataService.patientProfile() : null;
}

export async function saveFeedback(record: Feedback, userId?: string) {
  if (appwriteDatabase.isFeedbackConfigured) {
    await appwriteDatabase.createFeedback(record, userId);
    return;
  }
  dataService.addFeedback(record);
}
