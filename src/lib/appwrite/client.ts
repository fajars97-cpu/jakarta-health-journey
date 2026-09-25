"use client";

import { Client } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://sgp.cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "6aaa3b4a00230790a440",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
  inquiriesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_INQUIRIES_COLLECTION_ID ?? "",
  feedbackCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID ?? "",
  auditLogsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID ?? "",
  appointmentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENTS_COLLECTION_ID ?? "",
  patientProfilesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PATIENT_PROFILES_COLLECTION_ID ?? "",
  facilityTeamId: process.env.NEXT_PUBLIC_APPWRITE_FACILITY_TEAM_ID ?? "",
  committeeTeamId: process.env.NEXT_PUBLIC_APPWRITE_COMMITTEE_TEAM_ID ?? "",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export { client };
