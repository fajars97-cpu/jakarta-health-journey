export type HospitalPackage = {
  id: string;
  category: "Paket persalinan" | "Paket preventif";
  name: string;
  price: string;
  note: string;
  highlights: string[];
  details: string[];
};

export const harapanKotaServices = [
  { icon: "heart", name: "Jantung & pembuluh darah", copy: "Evaluasi awal, tindakan terencana, dan pendampingan pemulihan." },
  { icon: "baby", name: "Kesehatan ibu & anak", copy: "Layanan kehamilan, persalinan, dan perawatan keluarga yang terkoordinasi." },
  { icon: "bone", name: "Ortopedi & rehabilitasi", copy: "Dukungan mobilitas dari konsultasi sampai program pemulihan." },
  { icon: "scan", name: "Medical check-up", copy: "Program pemeriksaan yang dapat disesuaikan dengan kebutuhan perjalanan Anda." },
  { icon: "nutrition", name: "Nutrisi klinis", copy: "Pendampingan nutrisi sebelum dan setelah perawatan sesuai rujukan klinis." },
  { icon: "support", name: "Layanan pasien internasional", copy: "Koordinasi non-klinis, bahasa, dan kebutuhan perjalanan bersama mitra." },
];

export const harapanKotaPackages: HospitalPackage[] = [
  {
    id: "cesar-prima",
    category: "Paket persalinan",
    name: "Persalinan Caesar Prima",
    price: "Mulai Rp26.500.000",
    note: "Estimasi untuk kelas kamar standar · evaluasi klinis diperlukan",
    highlights: ["Rawat inap hingga 3 hari", "Obat-obatan standar selama perawatan", "Kunjungan dokter dan perawatan ibu-bayi"],
    details: ["Tindakan operasi dan penggunaan ruang operasi sesuai kebutuhan klinis", "Kamar rawat standar hingga 3 hari, termasuk makan pasien", "Perawatan keperawatan dasar untuk ibu dan bayi", "Tidak termasuk komplikasi, ICU/NICU, transfusi, atau layanan tambahan di luar penilaian dokter"],
  },
  {
    id: "normal-hangati",
    category: "Paket persalinan",
    name: "Persalinan Normal Hangati",
    price: "Mulai Rp14.500.000",
    note: "Estimasi untuk kondisi persalinan tanpa komplikasi",
    highlights: ["Rawat inap hingga 3 hari", "Obat-obatan standar selama perawatan", "Pendampingan laktasi awal"],
    details: ["Observasi persalinan dan dukungan persalinan normal oleh tim terlatih", "Kamar rawat standar hingga 3 hari, termasuk makan pasien", "Obat-obatan standar sesuai instruksi dokter", "Tidak termasuk tindakan emergensi, komplikasi, atau layanan tambahan"],
  },
  {
    id: "water-birth",
    category: "Paket persalinan",
    name: "Water Birth Serenity",
    price: "Mulai Rp21.000.000",
    note: "Ketersediaan bergantung asesmen dokter dan slot ruang bersalin",
    highlights: ["Ruang bersalin dengan kolam khusus", "Rawat inap hingga 3 hari", "Dukungan bidan dan konsultasi menyusui"],
    details: ["Penggunaan fasilitas water birth dan pemantauan sesuai protokol rumah sakit", "Kamar rawat standar hingga 3 hari, termasuk makan pasien", "Konsultasi kesiapan persalinan dan laktasi awal", "Kelayakan klinis dan ketersediaan fasilitas ditetapkan setelah konsultasi dokter"],
  },
  {
    id: "executive-checkup",
    category: "Paket preventif",
    name: "Executive Health Check-up",
    price: "Mulai Rp4.850.000",
    note: "Dapat disusun sesuai usia, kebutuhan, dan rujukan dokter",
    highlights: ["Koordinasi jadwal satu hari", "Konsultasi hasil awal", "Pilihan pendamping bahasa"],
    details: ["Pemeriksaan dasar sesuai paket dan penilaian dokter", "Koordinasi jadwal untuk meminimalkan waktu tunggu", "Ringkasan hasil awal pada layanan yang memungkinkan", "Pemeriksaan lanjutan dan tindakan tambahan dikenakan sesuai kebutuhan"],
  },
];

export const harapanKotaProfessionals = [
  { name: "dr. Aruna Pratama, Sp.OG", role: "Dokter spesialis obstetri & ginekologi", crop: "left", bio: "Mendampingi perencanaan persalinan dengan pendekatan komunikasi yang tenang dan berpusat pada keluarga.", certifications: ["Pelatihan kegawatdaruratan maternal", "Konseling laktasi dasar"], award: "Penghargaan layanan ibu & anak — contoh" },
  { name: "Nadia Putri, S.Kep., Ns.", role: "Perawat koordinator maternal", crop: "center", bio: "Koordinator edukasi pra-pulang dan kesiapan keluarga selama masa rawat inap.", certifications: ["Basic Life Support", "Pelatihan keperawatan maternitas"], award: "Patient experience champion — contoh" },
  { name: "Rania Maheswari, S.Gz., RD", role: "Ahli gizi klinis", crop: "right", bio: "Membantu menyusun dukungan nutrisi yang praktis untuk pemulihan pasien dan pendamping.", certifications: ["Registered Dietitian", "Nutrisi ibu & anak"], award: "Edukator gizi komunitas — contoh" },
];

export const harapanKotaReviews = [
  { quote: "Koordinator membantu kami memahami langkah administrasi dan jadwal kunjungan dengan jelas.", name: "Keluarga pasien", context: "Layanan ibu & anak · contoh ulasan" },
  { quote: "Informasi paket dan apa saja yang perlu disiapkan dijelaskan sejak awal secara transparan.", name: "Pasien medical check-up", context: "Layanan preventif · contoh ulasan" },
  { quote: "Area tunggu nyaman dan tim penerima pasien sangat membantu untuk kebutuhan non-klinis.", name: "Pendamping pasien", context: "Layanan pasien internasional · contoh ulasan" },
];
