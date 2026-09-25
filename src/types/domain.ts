export enum Role { Public = "public", Patient = "patient", FacilityAdmin = "facility_admin", PartnerAdmin = "partner_admin", CommitteeAdmin = "committee_admin", Reviewer = "reviewer" }
export enum PartnerType { Hospital = "Rumah Sakit", Clinic = "Klinik", Hotel = "Hotel", Travel = "Travel Agent", Translator = "Penerjemah" }
export enum VerificationStatus { Draft="Draft", Submitted="Submitted", NeedsRevision="Needs Revision", Verified="Verified", Suspended="Suspended", Rejected="Rejected" }
export enum InquiryStatus { New="New", Contacted="Contacted", Scheduled="Scheduled", Closed="Closed", Cancelled="Cancelled" }
export enum FeedbackStatus { New="New", InReview="In Review", Resolved="Resolved", Closed="Closed" }
export type User={id:string;name:string;email:string;role:Role;organizationId?:string};
export type Service={id:string;name:string;category:string};
export type Organization={id:string;slug:string;name:string;type:PartnerType;status:VerificationStatus;summary:string;area:string;address:string;languages:string[];accessibility:string[];contact:string;hours:string;services:string[];image?:string;imageType?:"photo"|"logo";imageAlt?:string};
export type FacilityProfile=Organization & {patientContact:string; inquiryEstimate:string}; export type SupportPartnerProfile=Organization & {supportNote:string};
export type VerificationApplication={id:string;organizationId:string;partnerType:PartnerType;status:VerificationStatus;submittedAt:string;note:string};
export type Inquiry={id:string;organizationId:string;patientId?:string;name:string;contact:string;service:string;purpose:string;date:string;needsTravel:boolean;status:InquiryStatus;createdAt:string;updatedAt?:string};
export type AppointmentKind="Konsultasi awal"|"Kedatangan tindakan";
export type Appointment={id:string;organizationId:string;inquiryId:string;patientId?:string;patientName:string;service:string;kind:AppointmentKind;startsAt:string;status:"Dijadwalkan"|"Menunggu konfirmasi"|"Selesai"|"Dibatalkan";note?:string};
export type PatientProfile={patientId:string;name:string;email:string;phone:string;country:string;preferredLanguage:string;accessibilityNeeds?:string;updatedAt:string};
export type Feedback={id:string;organizationId?:string;category:string;message:string;contact?:string;status:FeedbackStatus;createdAt:string};
export type AuditLog={id:string;at:string;admin:string;action:string;entity:string;note:string};
