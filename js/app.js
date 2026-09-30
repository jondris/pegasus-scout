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
            ${DATA.kegiatan.slice(0, 4).map(k => `
              <tr>
                <td>${formatTanggal(k.tanggal)}</td>
                <td><strong>${k.nama}</strong></td>
                <td>${k.lokasi}</td>
                <td>${statusPill(k.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-users"></i> Anggota Terbaru</h2>
        <button class="btn secondary" onclick="navigate('penggalang')">Kelola <i class="fas fa-arrow-right"></i></button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>NIS</th><th>Nama</th><th>Regu</th><th>Tingkat</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${DATA.penggalang.slice(0, 5).map(p => `
              <tr>
                <td>${p.nis}</td>
                <td><strong>${p.nama}</strong></td>
                <td>${p.regu}</td>
                <td>${p.tingkat}</td>
                <td>${p.status === 'Aktif' ? '<span class="pill success">Aktif</span>' : '<span class="pill warning">Cuti</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: PENGGALANG ======
function renderPenggalang() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-user-group"></i> Daftar Penggalang</h2>
        <button class="btn"><i class="fas fa-plus"></i> Tambah Anggota</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>NIS</th><th>Nama</th><th>Regu</th><th>Tingkat SKU</th><th>Status</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            ${DATA.penggalang.map(p => `
              <tr>
                <td>${p.nis}</td>
                <td><strong>${p.nama}</strong></td>
                <td>${p.regu}</td>
                <td><span class="pill info">${p.tingkat}</span></td>
                <td>${p.status === 'Aktif' ? '<span class="pill success">Aktif</span>' : '<span class="pill warning">Cuti</span>'}</td>
                <td>
                  <button class="btn secondary" style="padding:5px 10px;font-size:.75rem"><i class="fas fa-pen"></i></button>
                  <button class="btn" style="padding:5px 10px;font-size:.75rem;background:#ef4444"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: REGU ======
function renderRegu() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-flag"></i> Data Regu</h2>
        <button class="btn"><i class="fas fa-plus"></i> Tambah Regu</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Nama Regu</th><th>Ketua</th><th>Jumlah Anggota</th><th>Warna</th></tr>
          </thead>
          <tbody>
            ${DATA.regu.map(r => `
              <tr>
                <td><strong>${r.nama}</strong></td>
                <td>${r.ketua}</td>
                <td>${r.anggota} orang</td>
                <td><span class="pill" style="background:${r.warna};color:#fff">${r.nama}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: PEMBINA ======
function renderPembina() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-chalkboard-user"></i> Data Pembina</h2>
        <button class="btn"><i class="fas fa-plus"></i> Tambah Pembina</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Nama</th><th>Jabatan</th><th>Kontak</th></tr>
          </thead>
          <tbody>
            ${DATA.pembina.map(p => `
              <tr>
                <td><strong>${p.nama}</strong></td>
                <td>${p.jabatan}</td>
                <td>${p.kontak}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: KEGIATAN ======
function renderKegiatan() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-calendar-days"></i> Jadwal Kegiatan</h2>
        <button class="btn"><i class="fas fa-plus"></i> Tambah Kegiatan</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Tanggal</th><th>Nama Kegiatan</th><th>Lokasi</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${DATA.kegiatan.map(k => `
              <tr>
                <td>${formatTanggal(k.tanggal)}</td>
                <td><strong>${k.nama}</strong></td>
                <td>${k.lokasi}</td>
                <td>${statusPill(k.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: ABSENSI ======
function renderAbsensi() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-circle-check"></i> Rekap Absensi</h2>
        <button class="btn"><i class="fas fa-plus"></i> Input Absensi</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Tanggal</th><th>Kegiatan</th><th>Hadir</th><th>Izin</th><th>Alpha</th><th>Persentase</th></tr>
          </thead>
          <tbody>
            ${DATA.absensi.map(a => {
              const total = a.hadir + a.izin + a.alpha;
              const pct = Math.round((a.hadir / total) * 100);
              return `
                <tr>
                  <td>${formatTanggal(a.tanggal)}</td>
                  <td><strong>${a.kegiatan}</strong></td>
                  <td><span class="pill success">${a.hadir}</span></td>
                  <td><span class="pill warning">${a.izin}</span></td>
                  <td><span class="pill danger">${a.alpha}</span></td>
                  <td><strong>${pct}%</strong></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: SKU ======
function renderSKU() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-scroll"></i> Progres SKU Anggota</h2>
        <button class="btn"><i class="fas fa-plus"></i> Update SKU</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Nama</th><th>Tingkat</th><th>Progres</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${DATA.sku.map(s => `
              <tr>
                <td><strong>${s.nama}</strong></td>
                <td><span class="pill info">${s.tingkat}</span></td>
                <td>${s.progres}%</td>
                <td>${s.status === 'Lulus' ? '<span class="pill success">Lulus</span>' : '<span class="pill warning">Proses</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: PRESTASI ======
function renderPrestasi() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-trophy"></i> Daftar Prestasi</h2>
        <button class="btn"><i class="fas fa-plus"></i> Tambah Prestasi</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Tahun</th><th>Nama Prestasi</th><th>Tingkat</th><th>Peraih</th></tr>
          </thead>
          <tbody>
            ${DATA.prestasi.map(p => `
              <tr>
                <td>${p.tahun}</td>
                <td><strong>${p.nama}</strong></td>
                <td><span class="pill info">${p.tingkat}</span></td>
                <td>${p.peraih}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====== HALAMAN: DOKUMENTASI ======
function renderDokumentasi() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-camera"></i> Galeri Dokumentasi</h2>
        <button class="btn"><i class="fas fa-upload"></i> Upload Foto</button>
      </div>
      <div class="stats-grid">
        ${DATA.dokumentasi.map(d => `
          <div class="stat-card">
            <div class="stat-icon teal" style="font-size:1.8rem">${d.cover}</div>
            <div class="stat-info">
              <h3>${d.jumlah}</h3>
              <p>${d.nama}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ====== HALAMAN: LAPORAN ======
function renderLaporan() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-chart-column"></i> Laporan & Ekspor Data</h2>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon green"><i class="fas fa-file-pdf"></i></div>
          <div class="stat-info"><h3>PDF</h3><p>Laporan Bulanan</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fas fa-file-excel"></i></div>
          <div class="stat-info"><h3>Excel</h3><p>Data Anggota</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon amber"><i class="fas fa-file-csv"></i></div>
          <div class="stat-info"><h3>CSV</h3><p>Rekap Absensi</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple"><i class="fas fa-print"></i></div>
          <div class="stat-info"><h3>Print</h3><p>SKU & Piagam</p></div>
        </div>
      </div>
    </div>
    <div class="placeholder">
      <i class="fas fa-chart-line"></i>
      <h3>Modul Laporan</h3>
      <p>Fitur ekspor laporan lengkap akan tersedia di versi berikutnya.</p>
    </div>
  `;
}

// ====== HALAMAN: PENGATURAN ======
function renderPengaturan() {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-gear"></i> Pengaturan Sistem</h2>
      </div>
      <div class="table-wrap">
        <table>
          <tbody>
            <tr><td><strong>Nama Gugus Depan</strong></td><td>PEGASUS SCOUT - SMP Negeri 1</td></tr>
            <tr><td><strong>Nomor Gudep</strong></td><td>01.234 / 01.235</td></tr>
            <tr><td><strong>Tahun Aktif</strong></td><td>2025 / 2026</td></tr>
            <tr><td><strong>Pembina Utama</strong></td><td>Kak Rina Marlina</td></tr>
            <tr><td><strong>Versi Aplikasi</strong></td><td>v1.0.0</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="placeholder">
      <i class="fas fa-sliders"></i>
      <h3>Pengaturan Lanjutan</h3>
      <p>Konfigurasi tema, backup data, dan manajemen pengguna akan tersedia di sini.</p>
    </div>
  `;
}

// ====== HELPER ======
function formatTanggal(tgl) {
  const bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const d = new Date(tgl);
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

function statusPill(status) {
  const map = {
    'Selesai': 'success',
    'Akan Datang': 'info',
    'Dibatalkan': 'danger',
  };
  return `<span class="pill ${map[status] || 'info'}">${status}</span>`;
}

// ====== NAVIGASI ======
function navigate(page) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add('active');
  render(page);
  closeSidebar();
}

// ====== SIDEBAR MOBILE ======
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
let overlay = null;

function openSidebar() {
  sidebar.classList.add('open');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
  }
  overlay.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

menuToggle.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

// ====== EVENT LISTENER NAV ======
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    navigate(page);
    history.replaceState(null, '', `#${page}`);
  });
});

// ====== INIT ======
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  const page = PAGES[hash] ? hash : 'dashboard';
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  render(page);
});

// Expose navigate ke global untuk tombol di konten
window.navigate = navigate;
