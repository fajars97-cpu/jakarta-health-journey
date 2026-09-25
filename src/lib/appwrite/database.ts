"use client";

import { Databases, ID, Permission, Query, Role as AppwritePermissionRole, type Models } from "appwrite";
import type { Appointment, Feedback, Inquiry, InquiryStatus, PatientProfile } from "@/types/domain";
import { appwriteConfig, client } from "./client";

const databases = new Databases(client);

type DocumentData = Record<string, unknown>;
const value = (data: DocumentData, key: string, fallback = "") => typeof data[key] === "string" ? data[key] as string : fallback;
const booleanValue = (data: DocumentData, key: string) => data[key] === true;
const inquiryFromDocument = (document: Models.Document): Inquiry => {
  const data = document as unknown as DocumentData;
  return { id: document.$id, organizationId: value(data, "organizationId"), patientId: value(data, "patientId") || undefined, name: value(data, "name"), contact: value(data, "contact"), service: value(data, "service"), purpose: value(data, "purpose"), date: value(data, "date"), needsTravel: booleanValue(data, "needsTravel"), status: value(data, "status") as InquiryStatus, createdAt: value(data, "createdAt"), updatedAt: value(data, "updatedAt") || undefined };
};
const appointmentFromDocument = (document: Models.Document): Appointment => {
  const data = document as unknown as DocumentData;
  return { id: document.$id, organizationId: value(data, "organizationId"), inquiryId: value(data, "inquiryId"), patientId: value(data, "patientId") || undefined, patientName: value(data, "patientName"), service: value(data, "service"), kind: value(data, "kind") as Appointment["kind"], startsAt: value(data, "startsAt"), status: value(data, "status") as Appointment["status"], note: value(data, "note") || undefined };
};
const teamPermissions = (action: "read" | "update") => [
  ...(appwriteConfig.facilityTeamId ? [Permission[action](AppwritePermissionRole.team(appwriteConfig.facilityTeamId))] : []),
  ...(appwriteConfig.committeeTeamId ? [Permission[action](AppwritePermissionRole.team(appwriteConfig.committeeTeamId))] : []),
];

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
  get isAppointmentConfigured() {
    return Boolean(appwriteConfig.databaseId && appwriteConfig.appointmentsCollectionId);
  },
  get isPatientProfileConfigured() {
    return Boolean(appwriteConfig.databaseId && appwriteConfig.patientProfilesCollectionId);
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
        ...teamPermissions("read"),
        ...teamPermissions("update"),
      ],
    });
  },

  async listInquiries(filters: { patientId?: string; organizationId?: string } = {}) {
    if (!appwriteConfig.databaseId || !appwriteConfig.inquiriesCollectionId) return [];
    const queries = [
      ...(filters.patientId ? [Query.equal("patientId", filters.patientId)] : []),
      ...(filters.organizationId ? [Query.equal("organizationId", filters.organizationId)] : []),
      Query.orderDesc("$createdAt"),
    ];
    const result = await databases.listDocuments({ databaseId: appwriteConfig.databaseId, collectionId: appwriteConfig.inquiriesCollectionId, queries });
    return result.documents.map(inquiryFromDocument);
  },

  async updateInquiryStatus(id: string, status: InquiryStatus) {
    if (!appwriteConfig.databaseId || !appwriteConfig.inquiriesCollectionId) return null;
    return databases.updateDocument({ databaseId: appwriteConfig.databaseId, collectionId: appwriteConfig.inquiriesCollectionId, documentId: id, data: { status, updatedAt: new Date().toISOString() } });
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
      permissions: [...teamPermissions("read")],
    });
  },

  async createAppointment(record: Appointment, patientId?: string) {
    if (!appwriteConfig.databaseId || !appwriteConfig.appointmentsCollectionId) return null;
    return databases.createDocument({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.appointmentsCollectionId,
      documentId: ID.unique(),
      data: { ...record, patientId: patientId ?? record.patientId ?? null },
      permissions: [
        ...(patientId ? [Permission.read(AppwritePermissionRole.user(patientId))] : []),
        ...(patientId ? [Permission.update(AppwritePermissionRole.user(patientId))] : []),
        ...teamPermissions("read"),
        ...teamPermissions("update"),
      ],
    });
  },

  async listAppointments(patientId: string) {
    if (!appwriteConfig.databaseId || !appwriteConfig.appointmentsCollectionId) return [];
    const result = await databases.listDocuments({ databaseId: appwriteConfig.databaseId, collectionId: appwriteConfig.appointmentsCollectionId, queries: [Query.equal("patientId", patientId), Query.orderAsc("startsAt")] });
    return result.documents.map(appointmentFromDocument);
  },

  async updateAppointmentStatus(id: string, status: Appointment["status"]) {
    if (!appwriteConfig.databaseId || !appwriteConfig.appointmentsCollectionId) return null;
    return databases.updateDocument({ databaseId: appwriteConfig.databaseId, collectionId: appwriteConfig.appointmentsCollectionId, documentId: id, data: { status } });
  },

  async upsertPatientProfile(profile: PatientProfile) {
    if (!appwriteConfig.databaseId || !appwriteConfig.patientProfilesCollectionId) return null;
    const permissions = [Permission.read(AppwritePermissionRole.user(profile.patientId)), Permission.update(AppwritePermissionRole.user(profile.patientId))];
    try {
      return await databases.updateDocument({ databaseId: appwriteConfig.databaseId, collectionId: appwriteConfig.patientProfilesCollectionId, documentId: profile.patientId, data: profile });
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code !== 404) throw error;
      return databases.createDocument({ databaseId: appwriteConfig.databaseId, collectionId: appwriteConfig.patientProfilesCollectionId, documentId: profile.patientId, data: profile, permissions });
    }
  },

  async getPatientProfile(patientId: string) {
    if (!appwriteConfig.databaseId || !appwriteConfig.patientProfilesCollectionId) return null;
    try {
      return await databases.getDocument({ databaseId: appwriteConfig.databaseId, collectionId: appwriteConfig.patientProfilesCollectionId, documentId: patientId });
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code === 404) return null;
      throw error;
    }
  },
};
