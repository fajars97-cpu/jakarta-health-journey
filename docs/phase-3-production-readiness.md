# Phase 3 — production readiness

Fase 3 menyiapkan aplikasi untuk dipelihara dengan aman sebelum dipakai untuk operasi nyata.

## Yang sudah diterapkan

- Metadata SEO, canonical URL, Open Graph, sitemap, dan robots policy untuk route publik.
- Route-level loading, error boundary, dan halaman 404 yang konsisten dengan identitas JHJ.
- Manifest web app untuk pengalaman mobile yang lebih baik.
- Quality gate CI berjalan pada push `main` dan pull request: type-check, lint, audit dependency, serta static build.
- Duplicate-submit guard ringan untuk inquiry dan feedback pada sisi client.

## Batasan yang tetap berlaku

Duplicate-submit guard bukan pengganti rate limiting server. Static export GitHub Pages tidak dapat melakukan enforcement authorization di server. Sebelum go-live, pindahkan dashboard dan operasi privileged ke Appwrite Functions atau runtime server, tambahkan rate limiting berbasis IP/user, monitoring, backup, dan verifikasi permission collection.

## Checklist sebelum produksi

1. Isi seluruh collection dan Team ID Appwrite dari fase 1–2.
2. Buat Appwrite Function untuk operasi status inquiry, jadwal, audit log, dan integrasi notifikasi.
3. Simpan API key hanya pada server/function secrets.
4. Uji permission dengan akun patient, facility admin, partner admin, committee, dan reviewer.
5. Tambahkan monitoring error dan backup berkala sebelum menerima data operasional nyata.
