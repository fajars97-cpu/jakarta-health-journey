"use client";

import { Databases, ID, Permission, Role as AppwritePermissionRole } from "appwrite";
import type { Feedback, Inquiry } from "@/types/domain";
import { appwriteConfig, client } from "./client";

const databases = new Databases(client);

export const appwriteDatabase = {
  get isConfigured() {
    return Boolean(appwriteConfig.databaseId);
  },
  get isInquiryConfigured() {
    return Boolean(appwriteConfig.databaseId && appwriteConfig.inquiriesCollectionId);
  },
  get isFeedbackConfigured() {
    return Boolean(appwriteConfig.databaseId && appwriteConfig.feedbackCollectionId);
  },
  get isAuditLogConfigured() {
    return Boolean(appwriteConfig.databaseId && appwriteConfig.auditLogsCollectionId);
  },

  async createInquiry(record: Inquiry, patientId: string) {
    if (!appwriteConfig.databaseId || !appwriteConfig.inquiriesCollectionId) return null;
    return databases.createDocument({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.inquiriesCollectionId,
      documentId: ID.unique(),
      data: {
        ...record,
        patientId,
        needsTravel: record.needsTravel,
      },
      permissions: [
        Permission.read(AppwritePermissionRole.user(patientId)),
        Permission.update(AppwritePermissionRole.user(patientId)),
        Permission.delete(AppwritePermissionRole.user(patientId)),
      ],
    });
  },

  async createFeedback(record: Feedback, userId?: string) {
    if (!appwriteConfig.databaseId || !appwriteConfig.feedbackCollectionId) return null;
    const permissions = userId ? [Permission.read(AppwritePermissionRole.user(userId))] : undefined;
    return databases.createDocument({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.feedbackCollectionId,
      documentId: ID.unique(),
      data: { ...record, userId: userId ?? null },
      permissions,
    });
  },

  async writeAuditLog(data: { actorId: string; action: string; entity: string; note: string }) {
    if (!appwriteConfig.databaseId || !appwriteConfig.auditLogsCollectionId) return null;
    return databases.createDocument({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.auditLogsCollectionId,
      documentId: ID.unique(),
      data,
      permissions: [Permission.read(AppwritePermissionRole.users())],
    });
  },
};
