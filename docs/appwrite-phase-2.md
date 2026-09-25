# Appwrite Phase 2 — operational workflows

Fase 2 menambahkan persistence untuk data operasional pasien dan fasyankes. UI tetap memiliki fallback demo ketika collection ID belum diisi, sehingga preview GitHub Pages tetap bisa dibuka.

## Collection tambahan

Database yang sama dengan fase 1 (`jhj-production`) memakai collection berikut:

| Collection | Document ID | Atribut utama |
| --- | --- | --- |
| `appointments` | auto ID | `organizationId`, `inquiryId`, `patientId`, `patientName`, `service`, `kind`, `startsAt`, `status`, `note` |
| `patient_profiles` | user ID pasien | `patientId`, `name`, `email`, `phone`, `country`, `preferredLanguage`, `accessibilityNeeds`, `updatedAt` |

Inquiry sekarang juga menyimpan `patientId` dan `updatedAt` agar dashboard pasien dan dashboard fasyankes dapat membaca sumber data yang sama.

## Environment tambahan

Isi variabel berikut setelah collection dibuat:

```ini
NEXT_PUBLIC_APPWRITE_APPOINTMENTS_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_PATIENT_PROFILES_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_FACILITY_TEAM_ID=
NEXT_PUBLIC_APPWRITE_COMMITTEE_TEAM_ID=
```

Team ID dipakai untuk permission baca/perbarui workflow operasional. Pastikan collection mengizinkan document-level permissions dan atribut memiliki tipe serta panjang yang sesuai.

Tambahkan index berikut agar query dashboard tidak lambat saat data bertambah:

- `inquiries`: index `patientId`, `organizationId`, dan `$createdAt` (descending).
- `appointments`: index `patientId` dan `startsAt` (ascending).

## Alur yang tersedia

1. Pasien mengirim inquiry; `patientId` dilekatkan dari session Appwrite.
2. Pasien melihat inquiry dan jadwal miliknya melalui query `patientId`.
3. Fasyankes membaca inquiry berdasarkan `organizationId` dan memperbarui status.
4. Fasyankes mencatat jadwal konsultasi atau kedatangan tindakan.
5. Pasien menyimpan profil perjalanan untuk kebutuhan hotel/travel.

Semua operasi ini tetap non-klinis. Jangan menyimpan diagnosis, rekam medis, hasil lab, dokumen identitas, atau informasi gawat darurat pada collection tersebut. Operasi sensitif untuk produksi sebaiknya dipindahkan ke Appwrite Function dengan API key server-side.
