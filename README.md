# SportFun — Belajar PJOK SMA

Situs statis (HTML + CSS + JavaScript murni, tanpa framework dan tanpa proses build) sebagai media belajar PJOK untuk siswa SMA. Satu halaman dengan navigasi `#hash`, data dipisah dari tampilan.

## Sidebar (menu navigasi)

Menu berada di sidebar kiri. Di HP, sidebar tersembunyi dan dibuka lewat tombol ☰ di bagian atas; menutup otomatis setelah memilih menu.

| Menu | Isi |
| --- | --- |
| **Beranda** | Sambutan SportFun, **Keterangan Mahasiswa**, dan pintasan menu |
| **Materi Cabor** | 6 topik: Kesehatan dan Kebugaran Jasmani, Sepak Bola, Bola Voli, Bola Basket, Bulu Tangkis, Atletik |
| **Pengembangan Diri** | 6 topik terpisah dari cabor: Disiplin dan Tanggung Jawab, Sportivitas dan Fair Play, Kerja Sama dan Kepemimpinan, Percaya Diri dan Mental Tangguh, Gaya Hidup Sehat, Menetapkan Target (SMART) dan Refleksi |
| **Video** | Tautan YouTube untuk setiap topik (cabor dan pengembangan diri) |
| **Kuis** | 3 level (Mudah, Sedang, Sulit), masing-masing 10 soal acak, termasuk soal pengembangan diri |

Setiap materi berisi pengantar, poin-poin inti, tautan video, dan tombol materi sebelumnya/berikutnya. Materi terakhir mengarah ke kuis.

## Keterangan mahasiswa

Tampil **hanya di Beranda**:

| | |
| --- | --- |
| Nama | Fernandi Adi Kurnia |
| NPM | 41183191240028 |
| Kelas | Pararel 1 |
| Semester | 5 |

Untuk mengubah, edit objek `DEV` di bagian atas `script.js`.

## Kuis

- Soal dan pilihan jawaban diacak setiap main.
- Setelah menjawab, siswa langsung melihat pembahasan.
- Di akhir: skor persen, skor terbaik per level (disimpan di browser), dan daftar soal yang salah untuk dipelajari ulang.

## Struktur file

| File | Fungsi |
| --- | --- |
| `index.html` | Kerangka halaman dan sidebar |
| `style.css` | Tampilan sederhana, responsif (sidebar di desktop, tombol ☰ di HP) |
| `script.js` | Data (`DEV`, `TOPICS`, `SELF`, `QUIZ`), tampilan, router |
| `README.md` | Penjelasan ini |

## Tentang tautan video (penting)

Tautan video saat ini berupa **hasil pencarian YouTube** (`youtube.com/results?search_query=...`) per topik. Selalu valid, tetapi hasilnya dapat berubah. Disarankan menggantinya dengan video pilihan:

```js
videos: [['Teknik dasar sepak bola', 'https://www.youtube.com/watch?v=ID_VIDEO']]
```

Cari properti `videos:` pada tiap topik di `TOPICS` dan `SELF`.

## Menyesuaikan isi

- **Materi cabor baru**: tambah objek di `TOPICS`. **Materi pengembangan diri baru**: tambah objek di `SELF` (`id`, `icon`, `title`, `intro`, `sections`, `videos`).
- **Soal baru**: tambah baris `[soal, jawaban benar, [3 jawaban salah], pembahasan]` pada `QUIZ.mudah`, `QUIZ.sedang`, atau `QUIZ.sulit`.

## Menjalankan dan memasang

- Lokal: buka `index.html` di browser.
- GitHub Pages: unggah keempat file ke root repository, lalu **Settings → Pages → Deploy from a branch → main / (root)**.

## Catatan

Materi disusun ringkas sebagai pengantar dan mengikuti aturan umum (FIBA, BWF, FIVB). Cocokkan dengan buku PJOK/kurikulum yang dipakai sebelum dipakai mengajar.
