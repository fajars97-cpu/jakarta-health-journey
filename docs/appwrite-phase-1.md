# Appwrite Phase 1

Konfigurasi ini melengkapi UI dan adapter client. Buat database dan collection di Appwrite Console sebelum mengisi ID pada `.env.local` atau GitHub Actions.

## Database dan collection

Database: `jhj-production`

| Collection | Tujuan | Atribut minimum |
| --- | --- | --- |
| `inquiries` | Inquiry non-klinis pasien | `organizationId`, `patientId`, `name`, `contact`, `service`, `purpose`, `date`, `needsTravel`, `status`, `createdAt` |
| `feedback` | Masukan publik | `userId`, `category`, `message`, `contact`, `status`, `createdAt` |
| `audit_logs` | Jejak tindakan admin | `actorId`, `action`, `entity`, `note`, `createdAt` |

Semua atribut teks yang menerima input pengguna perlu memiliki batas panjang. `purpose` dibatasi 500 karakter di UI dan harus dibatasi lagi pada collection.

## Permission baseline

- `inquiries`: create untuk authenticated users; read/update/delete untuk pemilik inquiry; akses admin melalui Team role Appwrite, bukan email hardcode.
- `feedback`: create untuk guests atau authenticated users; read hanya committee/reviewer team.
- `audit_logs`: create hanya melalui Function/server runtime; read hanya committee/reviewer team.
- Jangan memberikan `read("any")` ke inquiry, feedback, atau audit log.

## Role

Simpan `role` pada Appwrite user preferences untuk demo, lalu pindahkan ke membership/team untuk production:

- `patient`
- `facility_admin`
- `partner_admin`
- `committee_admin`
- `reviewer`

Role pada browser hanya untuk navigasi. Operasi sensitif tetap harus diperiksa ulang oleh Appwrite permission atau Function.

## Production gate

Jangan menerima rekam medis, hasil lab, diagnosis, dokumen identitas, atau kondisi gawat darurat melalui form ini. GitHub Pages tidak menyediakan server-side enforcement; gunakan Appwrite Functions/server runtime sebelum data operasional digunakan.
