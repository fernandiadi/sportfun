'use strict';
/* SportFun — materi cabor, pengembangan diri, video, kuis. Semua data ada di bagian DATA agar mudah diubah. */

const $ = (s, r = document) => r.querySelector(s);
const shuffle = a => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } }
};

/* =================== DATA =================== */
const DEV = { nama: 'Fernandi Adi Kurnia', npm: '41183191240028', kelas: 'Pararel 1', semester: '5' };

/* Link video: pencarian YouTube. Ganti dengan link video pilihan, mis. 'https://www.youtube.com/watch?v=XXXX' */
const yt = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);

const TOPICS = [
  {
    id: 'kebugaran', icon: '💪', title: 'Kesehatan dan Kebugaran Jasmani',
    intro: 'Kebugaran jasmani adalah kemampuan tubuh melakukan aktivitas sehari-hari dengan baik tanpa kelelahan berlebihan, dan masih punya tenaga untuk kegiatan lain.',
    sections: [
      ['Komponen terkait kesehatan', ['Daya tahan kardiorespirasi (jantung–paru)', 'Kekuatan otot', 'Daya tahan otot', 'Kelentukan', 'Komposisi tubuh']],
      ['Komponen terkait keterampilan', ['Kecepatan', 'Kelincahan', 'Keseimbangan', 'Koordinasi', 'Daya ledak (power)', 'Waktu reaksi']],
      ['Prinsip latihan (FITT)', ['Frequency: seberapa sering (3–5 kali per minggu)', 'Intensity: seberapa berat (zona 60–80% denyut nadi maksimal)', 'Time: berapa lama (20–60 menit)', 'Type: jenis latihan (lari, renang, senam, dll.)']],
      ['Urutan latihan', ['Pemanasan 5–10 menit', 'Kegiatan inti', 'Pendinginan 5–10 menit']],
      ['Menghitung denyut nadi', ['Denyut nadi maksimal ≈ 220 − usia', 'Contoh usia 16 tahun: 220 − 16 = 204 denyut per menit', 'Zona latihan 70% = 204 × 0,7 ≈ 143 denyut per menit']],
      ['Tes kebugaran', ['Lari 2,4 km atau tes lari multitahap (bleep test): daya tahan jantung-paru', 'Sit and reach: kelentukan', 'Push-up dan sit-up: kekuatan dan daya tahan otot']]
    ],
    videos: [['Kebugaran jasmani dan komponennya', 'https://www.youtube.com/watch?v=64VcB8X0JNo&pp=ygUqa2VidWdhcmFuIGphc21hbmkgZGFuIGtvbXBvbmVubnlhIFBKT0sgU01B'], ['Pemanasan dan pendinginan olahraga', 'https://www.youtube.com/watch?v=GH7DKYDCNxw&pp=ygUncGVtYW5hc2FuIGRhbiBwZW5kaW5naW5hbiBvbGFocmFnYSBQSk9L']]
  },
  {
    id: 'sepakbola', icon: '⚽', title: 'Sepak Bola',
    intro: 'Permainan bola besar beregu yang dimainkan dua tim dengan tujuan memasukkan bola ke gawang lawan sebanyak mungkin.',
    sections: [
      ['Peraturan pokok', ['11 pemain per tim, termasuk penjaga gawang', 'Waktu 2 × 45 menit', 'Hanya penjaga gawang yang boleh memegang bola di area penalti', 'Pelanggaran di kotak penalti dihukum tendangan penalti dari titik 11 meter', 'Offside: penyerang lebih dekat ke garis gawang lawan daripada bola dan lawan kedua terakhir saat bola dioper']],
      ['Teknik dasar', ['Mengumpan (passing)', 'Menggiring (dribbling)', 'Menembak (shooting)', 'Menghentikan bola (controlling)', 'Menyundul (heading)']],
      ['Manfaat', ['Melatih daya tahan, kecepatan, dan kelincahan', 'Melatih kerja sama dan sportivitas']]
    ],
    videos: [['Teknik dasar sepak bola', 'https://www.youtube.com/watch?v=bvJj6vrZmkw&pp=ygUpdGVrbmlrIGRhc2FyIHNlcGFrIGJvbGEgcGFzc2luZyBkcmliYmxpbmc%3D'], ['Peraturan permainan sepak bola', 'https://www.youtube.com/watch?v=v5JPEwkVrbQ&pp=ygVCcGVyYXR1cmFuIHBlcm1haW5hbiBzZXBhayBib2xhIG9mZnNpZGUgcGVuYWx0aSBiZWxhamFyIHVudHVrIHNpc3dh']]
  },
  {
    id: 'voli', icon: '🏐', title: 'Bola Voli',
    intro: 'Permainan beregu yang dibatasi net; bola dipukul melewati net dan dijatuhkan di lapangan lawan.',
    sections: [
      ['Peraturan pokok', ['6 pemain per tim di lapangan', 'Lapangan 18 × 9 meter; net putra 2,43 m, putri 2,24 m', 'Rally point: set 1–4 sampai 25 poin (selisih minimal 2), set ke-5 sampai 15 poin', 'Maksimal 3 sentuhan per tim sebelum bola melewati net', 'Rotasi searah jarum jam setelah tim memperoleh hak servis']],
      ['Teknik dasar', ['Servis (bawah dan atas)', 'Passing bawah: memakai kedua lengan bawah', 'Passing atas: memakai ujung jari kedua tangan', 'Smash: pukulan keras dari atas', 'Blok: menghadang bola di net']],
      ['Manfaat', ['Melatih daya ledak otot tungkai', 'Melatih koordinasi dan komunikasi tim']]
    ],
    videos: [['Teknik dasar bola voli', 'https://www.youtube.com/watch?v=h9A20a8Wqvk&pp=ygUrdGVrbmlrIGRhc2FyIGJvbGEgdm9saSBwYXNzaW5nIHNlcnZpcyBzbWFzaA%3D%3D'], ['Peraturan bola voli', 'https://www.youtube.com/watch?v=j6pG5qgZGsE&pp=ygUsYmVsYWphciBwZXJhdHVyYW4gcGVybWFpbmFuIGJvbGEgdm9saSByb3Rhc2k%3D']]
  },
  {
    id: 'basket', icon: '🏀', title: 'Bola Basket',
    intro: 'Permainan beregu yang bertujuan memasukkan bola ke keranjang lawan dan mencegah lawan mencetak angka.',
    sections: [
      ['Peraturan pokok', ['5 pemain per tim di lapangan', 'Waktu 4 × 10 menit (aturan FIBA)', 'Ring setinggi 3,05 meter', 'Angka 1 (lemparan bebas), 2 (dalam garis), dan 3 (luar garis tiga angka)', 'Shot clock 24 detik untuk melakukan tembakan']],
      ['Pelanggaran umum', ['Traveling: berjalan membawa bola tanpa mendribel', 'Double dribble: mendribel lalu memegang bola dan mendribel lagi', 'Charging dan blocking: kontak badan yang tidak sah']],
      ['Teknik dasar', ['Dribble', 'Passing (chest, bounce, overhead)', 'Shooting dan lay-up', 'Pivot dan rebound']]
    ],
    videos: [['Teknik dasar bola basket', 'https://www.youtube.com/watch?v=YL6MgD56TaQ&pp=ygUvdGVrbmlrIGRhc2FyIGJvbGEgYmFza2V0IGRyaWJibGUgcGFzc2luZyBsYXkgdXA%3D'], ['Peraturan bola basket', 'https://www.youtube.com/watch?v=d8WXssmja3g&pp=ygVGYmVsYWphciBwZXJhdHVyYW4gcGVybWFpbmFuIGJvbGEgYmFza2V0IHRyYXZlbGluZyBzaG90IGNsb2NrIHVudHVrIHNtYQ%3D%3D']]
  },
  {
    id: 'bulutangkis', icon: '🏸', title: 'Bulu Tangkis',
    intro: 'Permainan raket yang dimainkan tunggal atau ganda; kok dipukul melewati net ke lapangan lawan.',
    sections: [
      ['Peraturan pokok', ['Rally point: satu set 21 poin, selisih minimal 2', 'Jika 29–29, pemenang adalah yang mencapai poin ke-30', 'Pertandingan dimainkan terbaik dari 3 set', 'Lapangan ganda 13,4 × 6,1 meter']],
      ['Teknik dasar', ['Grip: forehand dan backhand', 'Servis pendek dan servis panjang', 'Lob: pukulan tinggi ke belakang lapangan', 'Smash: pukulan keras menukik', 'Dropshot dan netting: pukulan halus di dekat net']],
      ['Manfaat', ['Melatih kelincahan dan refleks', 'Melatih koordinasi mata–tangan']]
    ],
    videos: [['Teknik dasar bulu tangkis', 'https://www.youtube.com/watch?v=gvYCYQYKbM0&pp=ygUrdGVrbmlrIGRhc2FyIGJ1bHUgdGFuZ2tpcyBncmlwIHNlcnZpcyBzbWFzaA%3D%3D'], ['Peraturan bulu tangkis', 'https://www.youtube.com/watch?v=uJnKXFtbDYQ&pp=ygUscGVyYXR1cmFuIHBlcm1haW5hbiBidWx1IHRhbmdraXMgcmFsbHkgcG9pbnQ%3D']]
  },
  {
    id: 'atletik', icon: '🏃', title: 'Atletik',
    intro: 'Induk semua cabang olahraga yang terdiri dari nomor jalan, lari, lompat, dan lempar.',
    sections: [
      ['Nomor lari', ['Sprint (jarak pendek): 100 m, 200 m', 'Lari estafet 4 × 100 m: tongkat dioper di zona pergantian 20 meter', 'Lari jarak menengah dan jauh: 800 m hingga maraton']],
      ['Nomor lompat', ['Lompat jauh: awalan, tumpuan, melayang, mendarat', 'Lompat tinggi', 'Lompat jangkit']],
      ['Nomor lempar', ['Tolak peluru', 'Lempar cakram', 'Lempar lembing']],
      ['Manfaat', ['Melatih kecepatan, kekuatan, dan daya tahan', 'Dasar gerak untuk hampir semua cabang olahraga']]
    ],
    videos: [['Teknik lompat jauh', 'https://www.youtube.com/watch?v=RLGkkvz40j8&pp=ygUkdGVrbmlrIGxvbXBhdCBqYXVoIGdheWEgam9uZ2tvayBQSk9L'], ['Teknik lari sprint dan estafet', 'https://www.youtube.com/watch?v=71T6joBBkZg&pp=ygUodGVrbmlrIGxhcmkgc3ByaW50IHN0YXJ0IGpvbmdrb2sgZXN0YWZldNIHCQlBDAGHKiGM7w%3D%3D']]
  }
];


/* Materi pengembangan diri dalam PJOK (terpisah dari materi cabang olahraga) */
const SELF = [
  {
    id: 'disiplin', icon: '🕒', title: 'Disiplin dan Tanggung Jawab',
    intro: 'Disiplin adalah kebiasaan patuh pada aturan dan konsisten menjalankan komitmen, bahkan saat tidak ada yang mengawasi.',
    sections: [
      ['Wujud disiplin dalam PJOK', ['Hadir tepat waktu dan memakai pakaian olahraga yang sesuai', 'Mengikuti aturan permainan dan arahan guru', 'Menjaga dan mengembalikan peralatan olahraga', 'Menjalankan jadwal latihan yang sudah dibuat']],
      ['Cara membangun disiplin', ['Mulai dari target kecil, misalnya 15 menit latihan setiap hari', 'Buat jadwal tetap dan pasang pengingat', 'Catat setiap latihan agar kemajuan terlihat', 'Beri hadiah kecil untuk diri sendiri saat konsisten']],
      ['Manfaat', ['Kemampuan fisik meningkat bertahap', 'Terbawa ke kebiasaan belajar dan kehidupan sehari-hari']]
    ],
    videos: [['Cara membangun disiplin untuk remaja', 'https://www.youtube.com/watch?v=71T6joBBkZg&pp=ygUodGVrbmlrIGxhcmkgc3ByaW50IHN0YXJ0IGpvbmdrb2sgZXN0YWZldNIHCQlBDAGHKiGM7w%3D%3D']]
  },
  {
    id: 'sportivitas', icon: '🤝', title: 'Sportivitas dan Fair Play',
    intro: 'Sportivitas adalah sikap jujur, adil, dan menghormati lawan, wasit, serta aturan, baik saat menang maupun kalah.',
    sections: [
      ['Sikap sportif', ['Bermain jujur dan tidak curang', 'Menghormati keputusan wasit', 'Menyalami lawan setelah pertandingan', 'Menerima kekalahan dengan lapang dada dan tidak sombong saat menang']],
      ['Contoh situasi', ['Mengakui bola keluar lapangan walau wasit tidak melihat', 'Menolong lawan yang cedera', 'Tidak mengejek lawan']],
      ['Manfaat', ['Menciptakan suasana pertandingan yang aman dan menyenangkan', 'Membentuk karakter jujur dan menghargai orang lain']]
    ],
    videos: [['Fair play dan sportivitas dalam olahraga', 'https://youtu.be/sqNxeX4HxdM']]
  },
  {
    id: 'kerjasama', icon: '👥', title: 'Kerja Sama dan Kepemimpinan',
    intro: 'Dalam olahraga beregu, keberhasilan ditentukan oleh kerja sama dan kepemimpinan yang baik, bukan kemampuan satu orang saja.',
    sections: [
      ['Kunci kerja sama tim', ['Komunikasi yang jelas dan sopan', 'Memahami dan menjalankan peran masing-masing', 'Saling mendukung, bukan saling menyalahkan']],
      ['Ciri pemimpin tim (kapten)', ['Memberi contoh yang baik', 'Adil kepada semua anggota', 'Mau mendengar pendapat anggota', 'Tenang saat tim tertinggal']],
      ['Menyelesaikan konflik', ['Dengarkan dulu sampai selesai', 'Fokus pada masalah, bukan menyerang orang', 'Cari jalan tengah yang disepakati bersama']]
    ],
    videos: [['Kerja sama tim dan kepemimpinan dalam olahraga', 'https://www.youtube.com/watch?v=5iaqH1ZJKis&pp=ygU_bWF0ZXJpIGtlcmphIHNhbWEgdGltIGRhbiBrZXBlbWltcGluYW4gZGFsYW0gb2xhaHJhZ2EgIGFuYWsgc21h']]
  },
  {
    id: 'mental', icon: '🧠', title: 'Percaya Diri dan Mental Tangguh',
    intro: 'Mental tangguh adalah kemampuan tetap tenang, fokus, dan bangkit setelah gagal. Ini bisa dilatih seperti otot.',
    sections: [
      ['Membangun percaya diri', ['Gunakan self-talk positif: "Aku bisa berlatih sampai bisa"', 'Rayakan kemajuan kecil', 'Fokus pada proses dan usaha, bukan hanya hasil']],
      ['Mengelola gugup dan tekanan', ['Napas dalam: tarik 4 hitungan, tahan 2, buang 6', 'Visualisasi: bayangkan gerakan yang berhasil', 'Rutinitas singkat sebelum bertanding']],
      ['Menghadapi kegagalan', ['Anggap kegagalan sebagai umpan balik', 'Evaluasi apa yang bisa diperbaiki', 'Terapkan pola pikir berkembang (growth mindset)']]
    ],
    videos: [['Mental juara dan mengatasi gugup saat bertanding', 'https://www.youtube.com/watch?v=OUnEAEGvaH0&pp=ygUvbWVudGFsIGF0bGV0IG1lbmdhdGFzaSBndWd1cCBzZWJlbHVtIGJlcnRhbmRpbmc%3D']]
  },
  {
    id: 'gayahidup', icon: '🥗', title: 'Gaya Hidup Sehat',
    intro: 'Kebugaran tidak hanya dari latihan, tetapi juga dari pola tidur, makan, dan kebiasaan harian.',
    sections: [
      ['Pilar gaya hidup sehat', ['Aktif bergerak: remaja disarankan rata-rata 60 menit per hari', 'Tidur cukup: sekitar 8–10 jam per malam', 'Gizi seimbang: karbohidrat, protein, lemak sehat, sayur, dan buah', 'Cukup minum air putih, terutama saat berolahraga']],
      ['Hal yang perlu dihindari', ['Rokok, alkohol, dan narkoba', 'Begadang dan terlalu lama menatap layar', 'Terlalu sering makan dan minum manis']],
      ['Kebiasaan kecil yang bisa dimulai', ['Sarapan sebelum beraktivitas', 'Berjalan kaki atau bersepeda untuk jarak dekat', 'Membawa botol minum sendiri']]
    ],
    videos: [['Gaya hidup sehat untuk remaja', 'https://www.youtube.com/watch?v=J6geXfxP6VI&pp=ygUxZ2F5YSBoaWR1cCBzZWhhdCB1bnR1ayByZW1hamEgZ2l6aSB0aWR1ciBvbGFocmFnYQ%3D%3D']]
  },
  {
    id: 'target', icon: '🎯', title: 'Menetapkan Target dan Refleksi',
    intro: 'Target yang jelas membuat latihan terarah. Refleksi membantu kita tahu apa yang sudah berhasil dan apa yang perlu diperbaiki.',
    sections: [
      ['Target SMART', ['Specific: jelas dan spesifik', 'Measurable: bisa diukur', 'Achievable: realistis dicapai', 'Relevant: sesuai kebutuhan dan minat', 'Time-bound: ada batas waktu']],
      ['Contoh', ['Kurang baik: "Ingin lebih kuat"', 'Baik: "Menambah push-up dari 10 menjadi 20 kali dalam 8 minggu, latihan 3 kali seminggu"']],
      ['Siklus pengembangan diri', ['Tetapkan target', 'Susun rencana latihan', 'Jalankan dan catat di jurnal', 'Evaluasi dan perbaiki rencana']]
    ],
    videos: [['Cara membuat target SMART untuk latihan', 'https://www.youtube.com/watch?v=lP7hp_pr2Es&pp=ygUrY2FyYSBtZW1idWF0IHRhcmdldCBTTUFSVCBsYXRpaGFuIGtlYnVnYXJhbg%3D%3D']]
  }
];

/* Bank soal: [soal, jawaban benar, [3 jawaban salah], penjelasan] */
const LEVELS = { mudah: { name: 'Mudah', icon: '🌱', desc: 'Pengetahuan dasar dan istilah' }, sedang: { name: 'Sedang', icon: '🔥', desc: 'Peraturan, teknik, dan pengembangan diri' }, sulit: { name: 'Sulit', icon: '🚀', desc: 'Analisis, perhitungan, dan aturan detail' } };
const QUIZ = {
  mudah: [
    ['Berapa jumlah pemain satu tim sepak bola di lapangan?', '11 pemain', ['9 pemain', '7 pemain', '12 pemain'], 'Satu tim sepak bola bermain dengan 11 pemain, termasuk penjaga gawang.'],
    ['Berapa tinggi ring bola basket dari lantai?', '3,05 meter', ['2,43 meter', '2,80 meter', '3,50 meter'], 'Ring basket standar setinggi 3,05 meter.'],
    ['Pukulan keras dari atas ke bawah pada bola voli disebut …', 'Smash', ['Servis', 'Lob', 'Dropshot'], 'Smash adalah pukulan keras menukik dari atas net.'],
    ['Urutan kegiatan olahraga yang benar adalah …', 'Pemanasan, inti, pendinginan', ['Inti, pemanasan, pendinginan', 'Pendinginan, inti, pemanasan', 'Inti, pendinginan, pemanasan'], 'Mulai dengan pemanasan dan akhiri dengan pendinginan.'],
    ['Berapa jumlah pemain bola voli satu tim di lapangan?', '6 pemain', ['5 pemain', '7 pemain', '11 pemain'], 'Bola voli dimainkan 6 pemain per tim di lapangan.'],
    ['Nomor atletik yang termasuk lari jarak pendek adalah …', '100 meter', ['Maraton', '3.000 meter', 'Lompat jangkit'], 'Lari 100 m dan 200 m adalah sprint.'],
    ['Yang termasuk komponen kebugaran terkait kesehatan adalah …', 'Kelentukan', ['Kecepatan angin', 'Panjang lapangan', 'Jumlah penonton'], 'Kelentukan, kekuatan otot, daya tahan, dan komposisi tubuh terkait kesehatan.'],
    ['Teknik membawa bola dengan kaki dalam sepak bola disebut …', 'Menggiring (dribbling)', ['Menyundul', 'Menahan bola', 'Menendang penalti'], 'Dribbling adalah menggiring bola dengan kaki.'],
    ['Mengikuti aturan permainan dan tidak curang termasuk sikap …', 'Sportivitas', ['Egois', 'Malas', 'Sombong'], 'Sportivitas berarti jujur, adil, dan menghormati aturan.'],
    ['Remaja membutuhkan tidur sekitar …', '8–10 jam per malam', ['3–4 jam', '5 jam', '12–14 jam'], 'Tidur cukup membantu pemulihan tubuh dan konsentrasi.']
  ],
  sedang: [
    ['Rumus perkiraan denyut nadi maksimal adalah …', '220 − usia', ['200 − usia', '180 + usia', '220 + usia'], 'Denyut nadi maksimal ≈ 220 dikurangi usia.'],
    ['Satu set bola voli (set 1–4) dimenangkan dengan …', '25 poin dengan selisih minimal 2', ['21 poin', '15 poin tanpa selisih', '30 poin'], 'Set 1–4 sampai 25 poin dengan selisih 2; set ke-5 sampai 15 poin.'],
    ['Berjalan membawa bola basket tanpa mendribel disebut …', 'Traveling', ['Double dribble', 'Charging', 'Blocking'], 'Traveling adalah melangkah terlalu banyak sambil memegang bola.'],
    ['Sistem poin bulu tangkis saat ini adalah …', 'Rally point 21, terbaik dari 3 set', ['Servis poin 15', 'Rally point 11, terbaik dari 5 set', 'Hanya 1 set 30 poin'], 'Satu set sampai 21 poin dengan selisih 2.'],
    ['Urutan tahapan lompat jauh yang benar adalah …', 'Awalan, tumpuan, melayang, mendarat', ['Tumpuan, awalan, mendarat, melayang', 'Melayang, awalan, tumpuan, mendarat', 'Awalan, melayang, tumpuan, mendarat'], 'Tumpuan dilakukan sebelum tubuh melayang di udara.'],
    ['Huruf F pada prinsip latihan FITT berarti …', 'Frequency (frekuensi)', ['Force (tekanan)', 'Fast (cepat)', 'Food (makanan)'], 'FITT: Frequency, Intensity, Time, Type.'],
    ['Pelanggaran di kotak penalti dalam sepak bola dihukum dengan …', 'Tendangan penalti', ['Lemparan ke dalam', 'Tendangan gawang', 'Bola pantul'], 'Penalti ditendang dari titik 11 meter.'],
    ['Passing atas bola voli dilakukan dengan …', 'Ujung jari kedua tangan', ['Kepalan tangan', 'Lengan bawah', 'Telapak tangan terbuka'], 'Passing bawah memakai lengan bawah, passing atas memakai ujung jari.'],
    ['Huruf S pada target SMART berarti …', 'Specific (jelas dan spesifik)', ['Strong', 'Social', 'Short'], 'SMART: Specific, Measurable, Achievable, Relevant, Time-bound.'],
    ['Timmu kalah. Sikap fair play yang tepat adalah …', 'Menyalami lawan dan mengakui kekalahan', ['Menyalahkan wasit', 'Menuduh lawan curang', 'Meninggalkan lapangan'], 'Fair play berarti menerima hasil dengan lapang dada.']
  ],
  sulit: [
    ['Siswa usia 17 tahun berlatih di zona 70% denyut nadi maksimal. Berapa denyut per menit?', 'Sekitar 142', ['Sekitar 203', 'Sekitar 153', 'Sekitar 120'], '220 − 17 = 203; 203 × 70% ≈ 142 denyut per menit.'],
    ['Pemain berada dalam posisi offside jika saat bola dioper …', 'Ia lebih dekat ke garis gawang lawan daripada bola dan lawan kedua terakhir', ['Ia berada di area penalti sendiri', 'Ia berada di belakang bola', 'Ia berada di setengah lapangan sendiri'], 'Offside dilihat dari posisi penyerang di area lawan saat bola dioper.'],
    ['Pada aturan FIBA, batas waktu tim menyerang untuk melakukan tembakan (shot clock) adalah …', '24 detik', ['8 detik', '14 detik', '30 detik'], 'Shot clock basket FIBA adalah 24 detik.'],
    ['Tes sit and reach digunakan untuk mengukur …', 'Kelentukan', ['Kekuatan otot lengan', 'Daya tahan jantung-paru', 'Kecepatan'], 'Sit and reach mengukur kelentukan punggung bawah dan otot paha belakang.'],
    ['Pada bola voli, rotasi pemain dilakukan …', 'Searah jarum jam saat tim memperoleh hak servis', ['Berlawanan arah jarum jam setiap poin', 'Setiap pergantian set saja', 'Bebas sesuai pelatih'], 'Rotasi searah jarum jam dilakukan setelah tim merebut hak servis.'],
    ['Pada bulu tangkis, skor 29–29 membuat pemenang set ditentukan oleh …', 'Poin ke-30', ['Selisih 2 poin tanpa batas', 'Undian', 'Servis berikutnya saja'], 'Batas maksimum set bulu tangkis adalah 30 poin.'],
    ['Gabungan kekuatan dan kecepatan otot dalam gerakan eksplosif disebut …', 'Daya ledak (power)', ['Kelentukan', 'Keseimbangan', 'Daya tahan'], 'Power = kekuatan × kecepatan, misalnya saat melompat atau smash.'],
    ['Panjang zona pergantian tongkat pada estafet 4 × 100 m adalah …', '20 meter', ['5 meter', '50 meter', '100 meter'], 'Tongkat harus dioper di dalam zona 20 meter.'],
    ['Target mana yang paling memenuhi kriteria SMART?', 'Menambah push-up dari 10 ke 20 kali dalam 8 minggu dengan latihan 3 kali seminggu', ['Ingin menjadi atlet hebat', 'Berolahraga lebih banyak', 'Latihan kalau sempat'], 'Target SMART jelas, terukur, realistis, dan punya batas waktu.'],
    ['Sebelum bertanding kamu merasa gugup. Cara mengelolanya yang tepat adalah …', 'Napas dalam dan visualisasi gerakan yang berhasil', ['Menghindari pertandingan', 'Menyalahkan diri sendiri', 'Berlatih semalam suntuk'], 'Napas dalam dan visualisasi menenangkan tubuh dan memusatkan fokus.']
  ]
};

/* =================== TAMPILAN =================== */
const app = () => $('#app');
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function renderHome() {
  app().innerHTML = `<section class="hero"><h1>Selamat datang di SportFun 🏅</h1>
    <p>Belajar PJOK SMA jadi lebih seru: materi cabang olahraga, pengembangan diri, video, dan kuis berjenjang.</p>
    <div class="hero-btns"><a class="btn primary" href="#materi">Mulai belajar</a><a class="btn" href="#kuis">Coba kuis</a></div></section>
    <section class="card id-card"><h2>Keterangan Mahasiswa</h2>
      <dl><dt>Nama</dt><dd>${esc(DEV.nama)}</dd><dt>NPM</dt><dd>${esc(DEV.npm)}</dd><dt>Kelas</dt><dd>${esc(DEV.kelas)}</dd><dt>Semester</dt><dd>${esc(DEV.semester)}</dd></dl></section>
    <div class="grid">${[['📖', 'Materi Cabor', 'Kebugaran jasmani dan 5 cabang olahraga.', 'materi'], ['🌟', 'Pengembangan Diri', 'Disiplin, sportivitas, mental, dan target.', 'diri'], ['▶️', 'Video', 'Tautan video YouTube tiap materi.', 'video'], ['📝', 'Kuis', 'Tiga tingkat kesulitan.', 'kuis']]
      .map(([i, t, d, r]) => `<a class="tile" href="#${r}"><span>${i}</span><h3>${t}</h3><p>${d}</p></a>`).join('')}</div>`;
}

/* Daftar dan detail materi dipakai bersama oleh Materi Cabor (TOPICS) dan Pengembangan Diri (SELF) */
const SECTIONS = {
  materi: { list: TOPICS, title: 'Materi Cabang Olahraga', lead: 'Kebugaran jasmani dan 5 cabang olahraga. Pilih satu topik untuk dipelajari.' },
  diri: { list: SELF, title: 'Pengembangan Diri dalam PJOK', lead: 'Sikap dan kebiasaan yang dibentuk lewat PJOK. Materi ini terpisah dari materi cabang olahraga.' }
};
function renderList(key) {
  const c = SECTIONS[key];
  app().innerHTML = `<h1>${c.title}</h1><p class="lead">${c.lead}</p>
    <div class="grid">${c.list.map(t => `<a class="tile" href="#${key}/${t.id}"><span>${t.icon}</span><h3>${t.title}</h3><p>${t.intro}</p></a>`).join('')}</div>`;
}
function videoLinks(t) { return t.videos.map(([l, u]) => `<a class="btn" href="${u}" target="_blank" rel="noopener">▶ ${l}</a>`).join(''); }
function renderDetail(key, t) {
  const c = SECTIONS[key], i = c.list.indexOf(t), prev = c.list[i - 1], next = c.list[i + 1];
  app().innerHTML = `<a class="back" href="#${key}">← ${c.title}</a>
    <article class="card"><h1>${t.icon} ${t.title}</h1><p class="lead">${t.intro}</p>
    ${t.sections.map(([h, items]) => `<h2>${h}</h2><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul>`).join('')}
    <h2>Video pembelajaran</h2><div class="btns">${videoLinks(t)}</div>
    <div class="pager">${prev ? `<a class="btn" href="#${key}/${prev.id}">← ${prev.title}</a>` : '<span></span>'}${next ? `<a class="btn primary" href="#${key}/${next.id}">${next.title} →</a>` : '<a class="btn primary" href="#kuis">Uji pemahamanmu: Kuis →</a>'}</div></article>`;
}

function renderVideo() {
  const block = (key, list) => `<h2 class="sec">${SECTIONS[key].title}</h2>${list.map(t => `<section class="card"><h2>${t.icon} ${t.title}</h2><div class="btns">${videoLinks(t)}</div><p class="muted"><a href="#${key}/${t.id}">Baca materinya →</a></p></section>`).join('')}`;
  app().innerHTML = `<h1>Video Pembelajaran</h1><p class="lead">Tautan video YouTube untuk setiap materi. Tautan dibuka di tab baru.</p>${block('materi', TOPICS)}${block('diri', SELF)}`;
}

/* ---------- Kuis ---------- */
function renderKuisMenu() {
  const best = store.get('pj2-best', {});
  app().innerHTML = `<h1>Kuis PJOK</h1><p class="lead">Pilih tingkat kesulitan. Setiap soal langsung dibahas setelah dijawab.</p>
    <div class="grid">${Object.entries(LEVELS).map(([id, l]) => `<button class="tile lvl" data-lv="${id}" type="button"><span>${l.icon}</span><h3>${l.name}</h3><p>${l.desc}</p><p class="muted">${QUIZ[id].length} soal · Skor terbaik: ${best[id] === undefined ? '—' : best[id] + '%'}</p></button>`).join('')}</div>`;
  document.querySelectorAll('.lvl').forEach(b => b.addEventListener('click', () => playKuis(b.dataset.lv)));
}

function playKuis(lv) {
  const qs = shuffle(QUIZ[lv]).map(([q, c, w, why]) => { const o = shuffle([c, ...w]); return { q, o, a: o.indexOf(c), why }; });
  let i = 0, score = 0; const miss = [];
  function show() {
    const x = qs[i];
    app().innerHTML = `<section class="card"><p class="muted">${LEVELS[lv].icon} ${LEVELS[lv].name} · Soal ${i + 1}/${qs.length}</p><div class="bar"><i style="width:${(i / qs.length) * 100}%"></i></div>
      <h2>${x.q}</h2><div class="opts">${x.o.map((t, k) => `<button type="button" class="opt" data-k="${k}">${t}</button>`).join('')}</div><div id="fb"></div></section>`;
    document.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => answer(Number(b.dataset.k))));
  }
  function answer(k) {
    const x = qs[i], ok = k === x.a;
    document.querySelectorAll('.opt').forEach((b, n) => { b.disabled = true; if (n === x.a) b.classList.add('right'); else if (n === k) b.classList.add('wrong'); });
    if (ok) score++; else miss.push(x);
    $('#fb').innerHTML = `<div class="fb ${ok ? 'good' : 'bad'}"><b>${ok ? '✅ Benar!' : '❌ Belum tepat'}</b>${x.why}<br><button class="btn primary" id="nx" type="button">${i + 1 >= qs.length ? 'Lihat hasil' : 'Soal berikutnya'}</button></div>`;
    $('#nx').addEventListener('click', () => { i++; i >= qs.length ? result() : show(); }); $('#nx').focus();
  }
  function result() {
    const pct = Math.round((score / qs.length) * 100), best = store.get('pj2-best', {}), rec = best[lv] === undefined || pct > best[lv];
    if (rec) { best[lv] = pct; store.set('pj2-best', best); }
    const msg = pct >= 80 ? 'Luar biasa, pemahamanmu sangat baik!' : pct >= 60 ? 'Bagus, tinggal sedikit lagi!' : 'Ayo pelajari materinya lagi, lalu coba kembali.';
    app().innerHTML = `<section class="card center"><p class="muted">${LEVELS[lv].icon} Kuis ${LEVELS[lv].name}</p><h1>${msg}</h1><div class="score">${pct}%</div>
      <p>${score} dari ${qs.length} soal benar${rec ? ' · 🎉 Skor terbaik baru!' : ''}</p>
      <div class="btns c"><button class="btn primary" id="again" type="button">↻ Ulangi</button><a class="btn" href="#kuis">Ganti level</a><a class="btn" href="#materi">Buka materi</a><a class="btn" href="#diri">Pengembangan diri</a></div></section>
      ${miss.length ? `<section class="card"><h2>Yang perlu dipelajari lagi</h2>${miss.map(m => `<div class="fb"><b>${m.q}</b>Jawaban benar: ${m.o[m.a]}<br>${m.why}</div>`).join('')}</section>` : ''}`;
    $('#again').addEventListener('click', () => playKuis(lv));
  }
  show(); window.scrollTo(0, 0);
}

/* ---------- Router ---------- */
function route() {
  const [r, id] = (location.hash || '#home').slice(1).split('/');
  if (SECTIONS[r]) { const t = SECTIONS[r].list.find(x => x.id === id); t ? renderDetail(r, t) : renderList(r); }
  else if (r === 'video') renderVideo();
  else if (r === 'kuis') renderKuisMenu();
  else renderHome();
  const cur = SECTIONS[r] || ['video', 'kuis'].includes(r) ? r : 'home';
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === cur));
  document.body.classList.remove('menu-open');
  window.scrollTo(0, 0);
}
if (typeof document !== 'undefined') {
  window.addEventListener('hashchange', route);
  $('#menuBtn').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  $('#backdrop').addEventListener('click', () => document.body.classList.remove('menu-open'));
  route();
}
if (typeof module !== 'undefined') module.exports = { TOPICS, SELF, QUIZ };
