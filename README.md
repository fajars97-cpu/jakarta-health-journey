# Jakarta Health Journey

MVP civic-tech untuk membantu pasien menemukan layanan kesehatan dan dukungan perjalanan terverifikasi di Jakarta. Seluruh identitas, organisasi, dan data pada mode demo bersifat fiktif.

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Verifikasi teknis tersedia melalui `npm run lint`, `npm run type-check`, dan `npm run build`.

## Environment dan mode demo

Salin `.env.example` menjadi `.env.local` lalu isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk mulai menghubungkan Supabase. Tanpa variabel tersebut aplikasi tetap berjalan memakai data in-memory fiktif. `src/lib/data-service.ts` adalah titik abstraksi yang perlu diganti dengan query Supabase; jangan letakkan service role key di browser.

## Role demo

- `public`: semua halaman katalog, detail, inquiry, dan feedback.
- `facility_admin`: `/facility-admin/dashboard`; hanya melihat inquiry organisasi demo RS Harapan Kota.
- `committee_admin`: `/committee/dashboard`; memproses pengajuan dan melihat audit log.

Menu **ROLE DEMO DEVELOPMENT** di sidebar admin dipakai untuk menguji penolakan akses UI. Ketika Supabase Auth terhubung, peran seharusnya dipasok dari tabel profil pengguna dan dicek lagi dengan RLS pada server/database.

## Struktur

- `src/app`: hanya route dan layout Next.js App Router; aman untuk tetap tipis seiring aplikasi berkembang.
- `src/components/layouts`: shell bersama untuk area publik dan admin.
- `src/features`: komponen yang dikelompokkan berdasarkan domain (`admin`, `catalog`, dan `public-forms`).
- `src/types/domain.ts`: enum dan kontrak data MVP yang dipakai lintas layer.
- `src/data/demo`: seed data fiktif untuk mode demo.
- `src/services/data-service.ts`: repository data demo/pintu masuk implementasi Supabase berikutnya.

## Integrasi berikutnya

Autentikasi Supabase, Row Level Security, persistensi inquiry/feedback/audit log, storage dokumen aman, email/notification, dan upload dokumen masih berupa mock. Platform ini tidak menyimpan RME, tidak membuat diagnosis, tidak menyediakan chat medis, pembayaran, atau ranking berbayar.
