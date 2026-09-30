/* =========================================================
   PEGASUS SCOUT - Sistem Informasi Pramuka Penggalang SMP
   ========================================================= */

// ====== DATA DUMMY (bisa diganti API/LocalStorage nanti) ======
const DATA = {
  penggalang: [
    { nis: '2024001', nama: 'Ahmad Fauzi',       regu: 'Elang',     tingkat: 'Ramu',   status: 'Aktif' },
    { nis: '2024002', nama: 'Budi Santoso',      regu: 'Elang',     tingkat: 'Rakit',  status: 'Aktif' },
    { nis: '2024003', nama: 'Citra Dewi',        regu: 'Rajawali',  tingkat: 'Terap',  status: 'Aktif' },
    { nis: '2024004', nama: 'Dian Permata',      regu: 'Rajawali',  tingkat: 'Ramu',   status: 'Aktif' },
    { nis: '2024005', nama: 'Eko Prasetyo',      regu: 'Merpati',   tingkat: 'Rakit',  status: 'Cuti'  },
    { nis: '2024006', nama: 'Fitri Handayani',   regu: 'Merpati',   tingkat: 'Ramu',   status: 'Aktif' },
    { nis: '2024007', nama: 'Galih Ramadhan',    regu: 'Garuda',    tingkat: 'Terap',  status: 'Aktif' },
    { nis: '2024008', nama: 'Hana Salsabila',    regu: 'Garuda',    tingkat: 'Rakit',  status: 'Aktif' },
  ],
  regu: [
    { nama: 'Elang',    ketua: 'Ahmad Fauzi',   anggota: 8, warna: '#2e7d32' },
    { nama: 'Rajawali', ketua: 'Citra Dewi',    anggota: 8, warna: '#1565c0' },
    { nama: 'Merpati',  ketua: 'Fitri Handayani', anggota: 7, warna: '#6a1b9a' },
    { nama: 'Garuda',   ketua: 'Galih Ramadhan', anggota: 8, warna: '#c62828' },
    { nama: 'Cendrawasih', ketua: 'Intan P.',   anggota: 6, warna: '#ef6c00' },
    { nama: 'Kakatua',  ketua: 'Joko S.',       anggota: 7, warna: '#00695c' },
  ],
  pembina: [
    { nama: 'Kak Rina Marlina',  jabatan: 'Pembina Utama',     kontak: '0812-3456-7890' },
    { nama: 'Kak Dedi Kurniawan', jabatan: 'Pembina Putra',    kontak: '0813-2233-4455' },
    { nama: 'Kak Sari Wulandari', jabatan: 'Pembina Putri',    kontak: '0814-5566-7788' },
    { nama: 'Kak Andi Pratama',   jabatan: 'Pelatih PBB',      kontak: '0815-9988-7766' },
  ],
  kegiatan: [
    { tanggal: '2025-01-12', nama: 'Latihan Rutin Mingguan',    lokasi: 'Lapangan Sekolah', status: 'Selesai' },
    { tanggal: '2025-01-19', nama: 'Pioneering & Tali Temali',  lokasi: 'Halaman Belakang', status: 'Selesai' },
    { tanggal: '2025-01-26', nama: 'Persami (Perkemahan Sabtu Minggu)', lokasi: 'Bumi Perkemahan Cibubur', status: 'Akan Datang' },
    { tanggal: '2025-02-02', nama: 'Ujian SKU Ramu',            lokasi: 'Aula Sekolah', status: 'Akan Datang' },
    { tanggal: '2025-02-09', nama: 'Bakti Sosial Lingkungan',   lokasi: 'Desa Sukamaju', status: 'Akan Datang' },
  ],
  absensi: [
    { tanggal: '2025-01-12', kegiatan: 'Latihan Rutin',  hadir: 38, izin: 3, alpha: 1 },
    { tanggal: '2025-01-19', kegiatan: 'Pioneering',      hadir: 35, izin: 5, alpha: 2 },
    { tanggal: '2025-01-26', kegiatan: 'Persami',         hadir: 40, izin: 2, alpha: 0 },
  ],
  sku: [
    { nama: 'Ahmad Fauzi',      tingkat: 'Ramu',  progres: 100, status: 'Lulus' },
    { nama: 'Budi Santoso',     tingkat: 'Rakit', progres: 75,  status: 'Proses' },
    { nama: 'Citra Dewi',       tingkat: 'Terap', progres: 60,  status: 'Proses' },
    { nama: 'Dian Permata',     tingkat: 'Ramu',  progres: 90,  status: 'Proses' },
    { nama: 'Galih Ramadhan',   tingkat: 'Terap', progres: 100, status: 'Lulus' },
  ],
  prestasi: [
    { tahun: 2025, nama: 'Juara 1 Lomba Pionering',        tingkat: 'Kabupaten', peraih: 'Regu Elang' },
    { tahun: 2025, nama: 'Juara 2 Lomba Semaphore',        tingkat: 'Kecamatan', peraih: 'Regu Rajawali' },
    { tahun: 2024, nama: 'Juara 3 Lomba Tali Temali',      tingkat: 'Kabupaten', peraih: 'Regu Garuda' },
    { tahun: 2024, nama: 'Regu Terbaik Persami',           tingkat: 'Sekolah',   peraih: 'Regu Merpati' },
  ],
  dokumentasi: [
    { nama: 'Latihan Rutin Januari',  jumlah: 24, cover: '📸' },
    { nama: 'Persami 2025',           jumlah: 56, cover: '🏕️' },
    { nama: 'Bakti Sosial',           jumlah: 18, cover: '🌱' },
    { nama: 'Lomba Tingkat Kabupaten', jumlah: 32, cover: '🏆' },
  ]
};

// ====== KONFIGURASI HALAMAN ======
const PAGES = {
  dashboard:    { title: 'Dashboard',        subtitle: 'Ringkasan aktivitas pramuka penggalang' },
  penggalang:   { title: 'Data Penggalang',  subtitle: 'Daftar anggota penggalang aktif' },
  regu:         { title: 'Data Regu',        subtitle: 'Kelola regu penggalang' },
  pembina:      { title: 'Pembina',          subtitle: 'Data pembina & pelatih' },
  kegiatan:     { title: 'Kegiatan',         subtitle: 'Jadwal kegiatan kepramukaan' },
  absensi:      { title: 'Absensi',          subtitle: 'Rekap kehadiran anggota' },
  sku:          { title: 'SKU',              subtitle: 'Syarat Kecakapan Umum' },
  prestasi:     { title: 'Prestasi',         subtitle: 'Pencapaian & penghargaan' },
  dokumentasi:  { title: 'Dokumentasi',      subtitle: 'Galeri foto kegiatan' },
  laporan:      { title: 'Laporan',          subtitle: 'Cetak & ekspor laporan' },
  pengaturan:   { title: 'Pengaturan',       subtitle: 'Konfigurasi sistem' },
};

// ====== RENDER ======
const contentEl = document.getElementById('content');
const pageTitleEl = document.getElementById('pageTitle');
const pageSubtitleEl = document.getElementById('pageSubtitle');

function render(page) {
  const info = PAGES[page] || PAGES.dashboard;
  pageTitleEl.textContent = info.title;
  pageSubtitleEl.textContent = info.subtitle;

  const renderers = {
    dashboard: renderDashboard,
    penggalang: renderPenggalang,
    regu: renderRegu,
    pembina: renderPembina,
    kegiatan: renderKegiatan,
    absensi: renderAbsensi,
    sku: renderSKU,
    prestasi: renderPrestasi,
    dokumentasi: renderDokumentasi,
    laporan: renderLaporan,
    pengaturan: renderPengaturan,
  };

  contentEl.innerHTML = (renderers[page] || renderDashboard)();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== HALAMAN: DASHBOARD ======
function renderDashboard() {
  const totalAnggota = DATA.penggalang.length;
  const totalRegu = DATA.regu.length;
  const totalKegiatan = DATA.kegiatan.length;
  const totalPrestasi = DATA.prestasi.length;

  return `
    <div class="welcome-card">
      <div>
        <h1>Salam Pramuka! ⚜️</h1>
        <p>Selamat datang di <strong>PEGASUS SCOUT</strong> — Sistem Informasi Pramuka Penggalang SMP. Kelola data anggota, regu, kegiatan, dan administrasi kepramukaan dalam satu platform.</p>
      </div>
      <div class="welcome-icon"><i class="fas fa-feather-alt"></i></div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon green"><i class="fas fa-user-group"></i></div>
        <div class="stat-info"><h3>${totalAnggota}</h3><p>Penggalang</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><i class="fas fa-flag"></i></div>
        <div class="stat-info"><h3>${totalRegu}</h3><p>Regu</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber"><i class="fas fa-calendar-days"></i></div>
        <div class="stat-info"><h3>${totalKegiatan}</h3><p>Kegiatan</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><i class="fas fa-trophy"></i></div>
        <div class="stat-info"><h3>${totalPrestasi}</h3><p>Prestasi</p></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-clock-rotate-left"></i> Kegiatan Terbaru</h2>
        <button class="btn secondary" onclick="navigate('kegiatan')">Lihat Semua <i class="fas fa-arrow-right"></i></button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Tanggal</th><th>Nama Kegiatan</th><th>Lokasi</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${DATA.kegiatan.slice(0, 4).
