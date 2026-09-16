export enum Role { Public = "public", FacilityAdmin = "facility_admin", CommitteeAdmin = "committee_admin" }
export enum PartnerType { Hospital = "Rumah Sakit", Clinic = "Klinik", Hotel = "Hotel", Travel = "Travel Agent", Translator = "Penerjemah" }
export enum VerificationStatus { Draft="Draft", Submitted="Submitted", NeedsRevision="Needs Revision", Verified="Verified", Suspended="Suspended", Rejected="Rejected" }
export enum InquiryStatus { New="New", Contacted="Contacted", Closed="Closed" }
export enum FeedbackStatus { New="New", InReview="In Review", Resolved="Resolved", Closed="Closed" }
export type User={id:string;name:string;email:string;role:Role;organizationId?:string};
export type Service={id:string;name:string;category:string};
export type Organization={id:string;slug:string;name:string;type:PartnerType;status:VerificationStatus;summary:string;area:string;address:string;languages:string[];accessibility:string[];contact:string;hours:string;services:string[]};
export type FacilityProfile=Organization & {patientContact:string; inquiryEstimate:string}; export type SupportPartnerProfile=Organization & {supportNote:string};
export type VerificationApplication={id:string;organizationId:string;partnerType:PartnerType;status:VerificationStatus;submittedAt:string;note:string};
export type Inquiry={id:string;organizationId:string;name:string;contact:string;service:string;date:string;needsTravel:boolean;status:InquiryStatus;createdAt:string};
export type AppointmentKind="Konsultasi awal"|"Kedatangan tindakan";
export type Appointment={id:string;organizationId:string;inquiryId:string;patientName:string;service:string;kind:AppointmentKind;startsAt:string;status:"Dijadwalkan"|"Menunggu konfirmasi"|"Selesai";note?:string};
export type Feedback={id:string;organizationId?:string;category:string;message:string;contact?:string;status:FeedbackStatus;createdAt:string};
export type AuditLog={id:string;at:string;admin:string;action:string;entity:string;note:string};
