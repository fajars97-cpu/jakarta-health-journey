# Jakarta Health Journey

MVP civic-tech untuk membantu pasien menemukan layanan kesehatan dan dukungan perjalanan terverifikasi di Jakarta. Seluruh identitas, organisasi, dan data pada mode demo bersifat fiktif.

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Verifikasi teknis tersedia melalui `npm run lint`, `npm run type-check`, dan `npm run build`.

## Environment dan mode demo

Salin `.env.example` menjadi `.env.local`. Endpoint dan project ID Appwrite sudah disiapkan; isi ID database dan collection setelah membuat skema Phase 1. Tanpa collection ID aplikasi tetap berjalan memakai data in-memory fiktif. Jangan pernah menaruh Appwrite API key atau service secret di browser.

## Role demo

- `patient`: akun pasien dengan dashboard inquiry dan jadwal.
- `facility_admin`: `/facility-admin/dashboard`; hanya melihat inquiry organisasi demo RS Harapan Kota.
- `partner_admin`: portal partner dukungan perjalanan.
- `committee_admin` dan `reviewer`: `/committee/dashboard`; memproses pengajuan dan melihat audit log.

Role dibaca dari Appwrite user preferences (`prefs.role`) dan route admin memeriksa role tersebut. Akun baru otomatis mendapat role `patient`.

## Struktur

- `src/app`: hanya route dan layout Next.js App Router; aman untuk tetap tipis seiring aplikasi berkembang.
- `src/components/layouts`: shell bersama untuk area publik dan admin.
- `src/features`: komponen yang dikelompokkan berdasarkan domain (`admin`, `catalog`, dan `public-forms`).
- `src/types/domain.ts`: enum dan kontrak data MVP yang dipakai lintas layer.
- `src/data/demo`: seed data fiktif untuk mode demo.
- `src/services/data-service.ts`: repository data demo/fallback lokal.
- `src/services/persistence-service.ts`: batas persistence Appwrite dengan fallback demo.
- `src/lib/appwrite/database.ts`: adapter Appwrite Database untuk inquiry, feedback, dan audit log.

## Integrasi berikutnya

Collection Appwrite, permission per role/team, storage dokumen aman, email/notification, dan verifikasi domain masih perlu dikonfigurasi pada project Appwrite. GitHub Pages tetap hanya cocok untuk UI publik; dashboard operasional dan endpoint berprivilege perlu dipindahkan ke server runtime atau Appwrite Functions sebelum menerima data pasien nyata. Platform ini tidak menyimpan RME, tidak membuat diagnosis, tidak menyediakan chat medis, pembayaran, atau ranking berbayar.
