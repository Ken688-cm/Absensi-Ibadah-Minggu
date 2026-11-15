# Absensi Ibadah Minggu USU

Web statis (GitHub Pages) + Firebase (Login Google & Firestore, paket gratis Spark cukup).

## Setup
1. Buka https://console.firebase.google.com → **Add project**.
2. **Build → Authentication → Sign-in method → Google → Enable**.
3. **Build → Firestore Database → Create database** (production mode).
4. Tab **Rules** → tempel isi `firestore.rules` → **Publish**.
5. **Project settings → Your apps → Web (`</>`)** → salin `firebaseConfig` ke `common.js`.
6. **Authentication → Settings → Authorized domains** → tambahkan `USERNAME.github.io`.
7. Push ke GitHub → **Settings → Pages → Deploy from branch (main / root)**.

Halaman mahasiswa: `https://USERNAME.github.io/REPO/` — halaman admin: `.../admin.html`

## Admin
Admin ditentukan oleh **email Google** (`samuelchristianwijaya26@gmail.com`) di `firestore.rules`, bukan password di kode.
Login memakai password Google akun itu sendiri. Jangan menaruh password di GitHub.
Untuk mengganti admin, ubah email di `firestore.rules` dan `common.js`.

## Catatan
- Batas 1x/minggu: ID dokumen = `uid_tahun-Wminggu` (minggu Senin–Minggu, WIB), dijaga oleh rules.
- Typo & huruf besar/kecil pada prodi dirapikan di panel admin (normalisasi + kemiripan teks ≥85%; angka D3/D4 tidak pernah digabung). Data asli tetap tersimpan.
- Lokasi memakai Geolocation browser (wajib HTTPS, GitHub Pages sudah HTTPS).
