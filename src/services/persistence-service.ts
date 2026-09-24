import { appwriteDatabase } from "@/lib/appwrite/database";
import { dataService } from "@/services/data-service";
import type { Feedback, Inquiry } from "@/types/domain";

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
  dataService.addInquiry(record);
}

export async function saveFeedback(record: Feedback, userId?: string) {
  if (appwriteDatabase.isFeedbackConfigured) {
    await appwriteDatabase.createFeedback(record, userId);
    return;
  }
  dataService.addFeedback(record);
}
