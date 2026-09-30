/* =========================================================
   PEGASUS SCOUT - App Utama
   ========================================================= */
import { supabase, getProfile, getPenggalangByUser, logout } from './supabase.js';

let CURRENT_USER = null;
let CURRENT_PROFILE = null;
let CURRENT_PENGGALANG = null;
let USER_ROLE = 'penggalang';

const PAGES = {
  dashboard:  { title: 'Dashboard',       subtitle: 'Ringkasan aktivitas pramuka penggalang' },
  penggalang: { title: 'Data Penggalang', subtitle: 'Daftar anggota penggalang' },
  regu:       { title: 'Data Regu',       subtitle: 'Kelola regu penggalang' },
  pembina:    { title: 'Pembina',         subtitle: 'Data pembina & pelatih' },
  kegiatan:   { title: 'Kegiatan',        subtitle: 'Jadwal kegiatan kepramukaan' },
  absensi:    { title: 'Absensi',         subtitle: 'Rekap kehadiran anggota' },
  sku:        { title: 'SKU',             subtitle: 'Syarat Kecakapan Umum' },
  skk:        { title: 'SKK',             subtitle: 'Syarat Kecakapan Khusus' },
  prestasi:   { title: 'Prestasi',        subtitle: 'Pencapaian & penghargaan' },
  dokumentasi:{ title: 'Dokumentasi',     subtitle: 'Galeri foto kegiatan' },
  laporan:    { title: 'Laporan',         subtitle: 'Cetak & ekspor laporan' },
  pengaturan: { title: 'Pengaturan',      subtitle: 'Konfigurasi sistem' },
};

const contentEl = document.getElementById('content');
const pageTitleEl = document.getElementById('pageTitle');
const pageSubtitleEl = document.getElementById('pageSubtitle');

// ===== INIT =====
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = 'login.html'; return; }
  CURRENT_USER = session.user;
  await loadUserData();
  applyRoleVisibility();
  bindUserMenu();
  bindNav();
  bindSidebar();
  const hash = location.hash.replace('#','') || 'dashboard';
  navigate(PAGES[hash] ? hash : 'dashboard');
})();

// ===== LOAD DATA =====
async function loadUserData() {
  let profile = await getProfile(CURRENT_USER.id);

  if (!profile) {
    const meta = CURRENT_USER.user_metadata || {};
    const roleChoice = localStorage.getItem('pegasus_role_choice') || 'penggalang';
    const { data: newProfile } = await supabase.from('profiles').insert({
      id: CURRENT_USER.id,
      email: CURRENT_USER.email,
      full_name: meta.full_name || meta.name || 'Pengguna',
      avatar_url: meta.avatar_url || null,
      role: roleChoice
    }).select().single();
    profile = newProfile;
  }

  CURRENT_PROFILE = profile;
  USER_ROLE = profile?.role || 'penggalang';

  const roleChoice = localStorage.getItem('pegasus_role_choice');
  if (roleChoice === 'pembina' && USER_ROLE === 'penggalang') {
    await supabase.from('profiles').update({ role: 'pembina' }).eq('id', CURRENT_USER.id);
    USER_ROLE = 'pembina';
    CURRENT_PROFILE.role = 'pembina';
  }
  localStorage.removeItem('pegasus_role_choice');

  if (USER_ROLE === 'penggalang') {
    CURRENT_PENGGALANG = await getPenggalangByUser(CURRENT_USER.id);
  }

  updateTopbarUser();
}

// ===== TOPBAR =====
function updateTopbarUser() {
  const name = CURRENT_PROFILE.full_name || 'Pengguna';
  const avatar = CURRENT_PROFILE.avatar_url;
  const roleLabel = USER_ROLE === 'pembina' ? 'Pembina' : 'Penggalang';

  document.getElementById('userName').textContent = name;
  document.getElementById('userRole').textContent = roleLabel;

  const av = document.getElementById('userAvatar');
  const avFallback = document.getElementById('userAvatarFallback');
  const udAv = document.getElementById('udAvatar');
  const udAvFallback = document.getElementById('udAvatarFallback');

  if (avatar) {
    [av, udAv].forEach(el => { el.src = avatar; el.style.display = 'block'; });
    [avFallback, udAvFallback].forEach(el => el.style.display = 'none');
  } else {
    [av, udAv].forEach(el => el.style.display = 'none');
    [avFallback, udAvFallback].forEach(el => el.style.display = 'block');
  }
  document.getElementById('udName').textContent = name;
}

// ===== ROLE VISIBILITY =====
function applyRoleVisibility() {
  document.querySelectorAll('[data-pembina-only]').forEach(el => {
    el.style.display = USER_ROLE === 'pembina' ? '' : 'none';
  });
}

// ===== USER MENU =====
function bindUserMenu() {
  const profileBtn = document.getElementById('userProfile');
  const dropdown = document.getElementById('userDropdown');

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });
  document.addEventListener('click', () => dropdown.classList.remove('show'));

  document.getElementById('btnLogout').addEventListener('click', async () => {
    if (confirm('Yakin ingin keluar?')) await logout();
  });
  document.getElementById('btnProfile').addEventListener('click', () => navigate('penggalang'));
  document.getElementById('btnSettings').addEventListener('click', () => navigate('pengaturan'));
}

// ===== NAV =====
function bindNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(link.dataset.page);
    });
  });
}

function navigate(page) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
  location.hash = page;
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
    skk: renderSKK,
    prestasi: renderPrestasi,
    dokumentasi: renderDokumentasi,
    laporan: renderLaporan,
    pengaturan: renderPengaturan,
  };
  contentEl.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Memuat...</div>';
  (renderers[page] || renderDashboard)();
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.navigate = navigate;

// ===== SIDEBAR MOBILE =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
let overlay = null;

function bindSidebar() {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
}
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

// =========================================================
// MODAL HELPER
// =========================================================
function openModal(html) {
  const ov = document.getElementById('modalOverlay');
  ov.innerHTML = `<div class="modal">${html}</div>`;
  ov.classList.add('show');
  ov.addEventListener('click', (e) => { if (e.target === ov) closeModal(); });
}
function closeModal() {
  const ov = document.getElementById('modalOverlay');
  ov.classList.remove('show');
  ov.innerHTML = '';
}
window.closeModal = closeModal;

// =========================================================
// DASHBOARD
// =========================================================
async function renderDashboard() {
  const { count: totalAnggota } = await supabase.from('penggalang').select('*', { count: 'exact', head: true });
  const { count: totalRegu } = await supabase.from('penggalang').select('regu', { count: 'exact', head: true });

  const welcomeName = CURRENT_PROFILE.full_name?.split(' ')[0] || 'Kak';

  contentEl.innerHTML = `
    <div class="welcome-card">
      <div>
        <h1>Halo, ${welcomeName}! ⚜️</h1>
        <p>Selamat datang di <strong>PEGASUS SCOUT</strong>. Anda masuk sebagai <strong>${USER_ROLE === 'pembina' ? 'Pembina' : 'Penggalang'}</strong>.</p>
      </div>
      <div class="welcome-icon"><i class="fas fa-feather-alt"></i></div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon green"><i class="fas fa-user-group"></i></div>
        <div class="stat-info"><h3>${totalAnggota || 0}</h3><p>Penggalang</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><i class="fas fa-flag"></i></div>
        <div class="stat-info"><h3>${totalRegu || 0}</h3><p>Anggota Regu</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber"><i class="fas fa-calendar-days"></i></div>
        <div class="stat-info"><h3>0</h3><p>Kegiatan</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><i class="fas fa-trophy"></i></div>
        <div class="stat-info"><h3>0</h3><p>Prestasi</p></div>
      </div>
    </div>

    ${USER_ROLE === 'penggalang' && !CURRENT_PENGGALANG ? `
      <div class="panel">
        <div class="placeholder">
          <i class="fas fa-user-plus"></i>
          <h3>Anda belum terdaftar sebagai anggota</h3>
          <p>Silakan lengkapi biodata Anda untuk bergabung dengan regu.</p>
          <button class="btn" style="margin-top:16px" onclick="openBiodataForm()"><i class="fas fa-plus"></i> Daftar Sekarang</button>
        </div>
      </div>
    ` : ''}
  `;
  window.openBiodataForm = openBiodataForm;
}

// =========================================================
// PENGGALANG (biodata)
// =========================================================
async function renderPenggalang() {
  const { data: list } = await supabase.from('penggalang').select('*').order('created_at', { ascending: false });

  if (USER_ROLE === 'penggalang') {
    // Penggalang: lihat & edit biodata sendiri
    const p = CURRENT_PENGGALANG;
    contentEl.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <h2><i class="fas fa-id-card"></i> Biodata Saya</h2>
          ${p ? `<button class="btn" onclick="openBiodataForm()"><i class="fas fa-pen"></i> Edit Biodata</button>` : ''}
        </div>
        ${p ? `
          <div class="table-wrap">
            <table>
              <tbody>
                <tr><td><strong>Nama</strong></td><td>${p.nama}</td></tr>
                <tr><td><strong>Regu</strong></td><td>${p.regu || '-'}</td></tr>
                <tr><td><strong>Jabatan Regu</strong></td><td>${p.jabatan_regu || '-'}</td></tr>
                <tr><td><strong>Tingkat SKU</strong></td><td>${p.tingkat_sku || '-'}</td></tr>
                <tr><td><strong>Jenis SKK</strong></td><td>${p.jenis_skk || '-'}</td></tr>
                <tr><td><strong>Status</strong></td><td><span class="pill ${p.status === 'Aktif' ? 'success' : 'warning'}">${p.status}</span></td></tr>
              </tbody>
            </table>
          </div>
        ` : `
          <div class="placeholder">
            <i class="fas fa-user-plus"></i>
            <h3>Belum ada biodata</h3>
            <p>Lengkapi biodata Anda untuk bergabung dengan regu.</p>
            <button class="btn" style="margin-top:16px" onclick="openBiodataForm()"><i class="fas fa-plus"></i> Isi Biodata</button>
          </div>
        `}
      </div>
    `;
    window.openBiodataForm = openBiodataForm;
    return;
  }

  // Pembina: lihat semua anggota + aksi
  contentEl.innerHTML = `
    <div class="panel">
      <div class="panel-header">
        <h2><i class="fas fa-user-group"></i> Semua Anggota Penggalang</h2>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nama</th><th>Regu</th><th>Jabatan</th><th>Tingkat SKU</th><th>SKK</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${(list || []).map(p => `
              <tr>
                <td><strong>${p.nama}</strong></td>
                <td>${p.regu || '-'}</td>
                <td>${p.jabatan_regu || '-'}</td>
                <td>${p.tingkat_sku ? `<span class="pill info">${p.tingkat_sku}</span>` : '-'}</td>
                <td>${p.jenis_skk || '-'}</td>
                <td><span class="pill ${p.status === 'Aktif' ? 'success' : 'warning'}">${p.status}</span></td>
                <td>
                  <button class="btn danger" style="padding:5px 10px;font-size:.75rem" onclick="hapusPenggalang('${p.id}')"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            `).join('') || '<tr><td colspan="7" style="text-align:center;color:#9ca3af">Belum ada data</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;

  window.hapusPenggalang = async (id) => {
    if (!confirm('Hapus anggota ini?')) return;
    await supabase.from('penggalang').delete().eq('id', id);
    renderPenggalang();
  };
}

// ===== FORM BIODATA =====
function openBiodataForm() {
  const p = CURRENT_PENGGALANG || {};
  const reguList = ['Elang','Rajawali','Merpati','Garuda','Cendrawasih','Kakatua'];
  const jabatanList = ['Ketua','Wakil','Sekretaris','Bendahara','Anggota'];
  const skuList = ['Ramu','Rakit','Terap'];
  const skkList = ['SKK Pertolongan Pertama','SKK Pengamanan','SKK Kesehatan','SKK Juru Masak','SKK Berkemah','SKK Navigasi','SKK Komunikasi','SKK Pionering'];

  openModal(`
    <h3><i class="fas fa-id-card"></i> ${p.id ? 'Edit' : 'Isi'} Biodata Penggalang</h3>
    <div class="form-group">
      <label>Nama Lengkap</label>
      <input id="fNama" type="text" value="${p.nama || CURRENT_PROFILE.full_name || ''}" />
    </div>
    <div class="form-group">
      <label>Regu</label>
      <select id="fRegu">
        <option value="">-- Pilih Regu --</option>
        ${reguList.map(r => `<option value="${r}" ${p.regu === r ? 'selected' : ''}>${r}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Jabatan dalam Regu</label>
      <select id="fJabatan">
        <option value="">-- Pilih Jabatan --</option>
        ${jabatanList.map(j => `<option value="${j}" ${p.jabatan_regu === j ? 'selected' : ''}>${j}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Tingkat SKU</label>
      <select id="fSku">
        <option value="">-- Pilih Tingkat --</option>
        ${skuList.map(s => `<option value="${s}" ${p.tingkat_sku === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Jenis SKK</label>
      <select id="fSkk">
        <option value="">-- Pilih SKK --</option>
        ${skkList.map(s => `<option value="${s}" ${p.jenis_skk === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn secondary" onclick="closeModal()">Batal</button>
      <button class="btn" onclick="simpanBiodata()"><i class="fas fa-save"></i> Simpan</button>
    </div>
  `);

  window.simpanBiodata = async () => {
    const payload = {
      user_id: CURRENT_USER.id,
      nama: document.getElementById('fNama').value.trim(),
      regu: document.getElementById('fRegu').value || null,
      jabatan_regu: document.getElementById('fJabatan').value || null,
      tingkat_sku: document.getElementById('fSku').value || null,
      jenis_skk: document.getElementById('fSkk').value || null,
      status: 'Aktif',
      updated_at: new Date().toISOString()
    };
    if (!payload.nama) { alert('Nama wajib diisi'); return; }

    let res;
    if (CURRENT_PENGGALANG?.id) {
      res = await supabase.from('penggalang').update(payload).eq('id', CURRENT_PENGGALANG.id).select().single();
    } else {
      res = await supabase.from('penggalang').insert(payload).select().single();
    }
    if (res.error) { alert('Gagal simpan: ' + res.error.message); return; }

    CURRENT_PENGGALANG = res.data;
    closeModal();
    navigate('penggalang');
  };
}
window.openBiodataForm = openBiodataForm;

// =========================================================
// REGU
// =========================================================
async function renderRegu() {
  const { data } = await supabase.from('penggalang').select('regu, jabatan_regu, nama');
  const grouped = {};
  (data || []).forEach(p => {
    if (!p.regu) return;
    if (!grouped[p.regu]) grouped[p.regu] = [];
    grouped[p.regu].push(p);
  });

  contentEl.innerHTML = `
    <div class="panel">
      <div class="panel-header"><h2><i class="fas fa-flag"></i> Data Regu</h2></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Regu</th><th>Jumlah Anggota</th><th>Struktur</th></tr></thead>
          <tbody>
            ${Object.keys(grouped).length ? Object.entries(grouped).map(([regu, anggota]) => `
              <tr>
                <td><strong>${regu}</strong></td>
                <td>${anggota.length} orang</td>
                <td>${anggota.map(a => `<span class="pill info" style="margin:2px">${a.jabatan_regu || 'Anggota'}: ${a.nama}</span>`).join(' ')}</td>
              </tr>
            `).join('') : '<tr><td colspan="3" style="text-align:center;color:#9ca3af">Belum ada regu terdaftar</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =========================================================
// ABSENSI
// =========================================================
async function renderAbsensi() {
  if (USER_ROLE === 'penggalang') {
    if (!CURRENT_PENGGALANG) {
      contentEl.innerHTML = `<div class="panel"><div class="placeholder"><i class="fas fa-exclamation-circle"></i><h3>Isi biodata dulu</h3><p>Anda belum terdaftar sebagai anggota.</p></div></div>`;
      return;
    }
    const { data } = await supabase.from('absensi').select('*').eq('penggalang_id', CURRENT_PENGGALANG.id).order('tanggal', { ascending: false });
    contentEl.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <h2><i class="fas fa-circle-check"></i> Absensi Saya</h2>
          <button class="btn" onclick="openAbsensiForm()"><i class="fas fa-plus"></i> Tambah Absensi</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Tanggal</th><th>Kegiatan</th><th>Status</th><th>Keterangan</th></tr></thead>
            <tbody>
              ${(data || []).map(a => `
                <tr>
                  <td>${a.tanggal}</td>
                  <td>${a.kegiatan || '-'}</td>
                  <td><span class="pill ${a.status === 'Hadir' ? 'success' : a.status === 'Alpha' ? 'danger' : 'warning'}">${a.status}</span></td>
                  <td>${a.keterangan || '-'}</td>
                </tr>
              `).join('') || '<tr><td colspan="4" style="text-align:center;color:#9ca3af">Belum ada absensi</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
    window.openAbsensiForm = () => {
      openModal(`
        <h3><i class="fas fa-circle-check"></i> Tambah Absensi</h3>
        <div class="form-group"><label>Tanggal</label><input type="date" id="aTanggal" value="${new Date().toISOString().slice(0,10)}" /></div>
        <div class="form-group"><label>Kegiatan</label><input type="text" id="aKegiatan" placeholder="Latihan Rutin" /></div>
        <div class="form-group"><label>Status</label>
          <select id="aStatus">
            <option>Hadir</option><option>Izin</option><option>Sakit</option><option>Alpha</option>
          </select>
        </div>
        <div class="form-group"><label>Keterangan</label><textarea id="aKet" rows="2"></textarea></div>
        <div class="modal-actions">
          <button class="btn secondary" onclick="closeModal()">Batal</button>
          <button class="btn" onclick="simpanAbsensi()"><i class="fas fa-save"></i> Simpan</button>
        </div>
      `);
      window.simpanAbsensi = async () => {
        const payload = {
          penggalang_id: CURRENT_PENGGALANG.id,
          tanggal: document.getElementById('aTanggal').value,
          kegiatan: document.getElementById('aKegiatan').value,
          status: document.getElementById('aStatus').value,
          keterangan: document.getElementById('aKet').value
        };
        const { error } = await supabase.from('absensi').insert(payload);
        if (error) { alert(error.message); return; }
        closeModal(); renderAbsensi();
      };
    };
    return;
  }

  // Pembina: lihat semua absensi
  const { data } = await supabase.from('absensi').select('*, penggalang(nama, regu)').order('tanggal', { ascending: false });
  contentEl.innerHTML = `
    <div class="panel">
      <div class="panel-header"><h2><i class="fas fa-circle-check"></i> Semua Absensi</h2></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Tanggal</th><th>Nama</th><th>Regu</th><th>Kegiatan</th><th>Status</th></tr></thead>
          <tbody>
            ${(data || []).map(a => `
              <tr>
                <td>${a.tanggal}</td>
                <td>${a.penggalang?.nama || '-'}</td>
                <td>${a.penggalang?.regu || '-'}</td>
                <td>${a.kegiatan || '-'}</td>
                <td><span class="pill ${a.status === 'Hadir' ? 'success' : a.status === 'Alpha' ? 'danger' : 'warning'}">${a.status}</span></td>
              </tr>
            `).join('') || '<tr><td colspan="5" style="text-align:center;color:#9ca3af">Belum ada data</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =========================================================
// SKU
// =========================================================
async function renderSKU() {
  if (USER_ROLE === 'penggalang') {
    if (!CURRENT_PENGGALANG) {
      contentEl.innerHTML = `<div class="panel"><div class="placeholder"><i class="fas fa-exclamation-circle"></i><h3>Isi biodata dulu</h3></div></div>`;
      return;
    }
    const { data } = await supabase.from('sku').select('*').eq('penggalang_id', CURRENT_PENGGALANG.id).maybeSingle();
    const s = data || { ramu:false, rakit:false, terap:false };
    contentEl.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <h2><i class="fas fa-scroll"></i> Progres SKU Saya</h2>
          <button class="btn" onclick="openSkuForm()"><i class="fas fa-pen"></i> Update SKU</button>
        </div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon ${s.ramu ? 'green' : 'amber'}"><i class="fas fa-${s.ramu ? 'check' : 'clock'}"></i></div>
            <div class="stat-info"><h3>${s.ramu ? '✓' : '—'}</h3><p>SKU Ramu</p></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon ${s.rakit ? 'green' : 'amber'}"><i class="fas fa-${s.rakit ? 'check' : 'clock'}"></i></div>
            <div class="stat-info"><h3>${s.rakit ? '✓' : '—'}</h3><p>SKU Rakit</p></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon ${s.terap ? 'green' : 'amber'}"><i class="fas fa-${s.terap ? 'check' : 'clock'}"></i></div>
            <div class="stat-info"><h3>${s.terap ? '✓' : '—'}</h3><p>SKU Terap</p></div>
          </div>
        </div>
      </div>
    `;
    window.openSkuForm = () => {
      openModal(`
        <h3><i class="fas fa-scroll"></i> Update SKU</h3>
        <div class="form-group"><label><input type="checkbox" id="sRamu" ${s.ramu ? 'checked' : ''}/> SKU Ramu Lulus</label></div>
        <div class="form-group"><label><input type="checkbox" id="sRakit" ${s.rakit ? 'checked' : ''}/> SKU Rakit Lulus</label></div>
        <div class="form-group"><label><input type="checkbox" id="sTerap" ${s.terap ? 'checked' : ''}/> SKU Terap Lulus</label></div>
        <div class="modal-actions">
          <button class="btn secondary" onclick="closeModal()">Batal</button>
          <button class="btn" onclick="simpanSku()"><i class="fas fa-save"></i> Simpan</button>
        </div>
      `);
      window.simpanSku = async () => {
        const payload = {
          penggalang_id: CURRENT_PENGGALANG.id,
          ramu: document.getElementById('sRamu').checked,
          rakit: document.getElementById('sRakit').checked,
          terap: document.getElementById('sTerap').checked,
          updated_at: new Date().toISOString()
        };
        const { error } = await supabase.from('sku').upsert(payload, { onConflict: 'penggalang_id' });
        if (error) { alert(error.message); return; }
        closeModal(); renderSKU();
      };
    };
    return;
  }
  // Pembina
  const { data } = await supabase.from('sku').select('*, penggalang(nama, regu)');
  contentEl.innerHTML = `
    <div class="panel">
      <div class="panel-header"><h2><i class="fas fa-scroll"></i> SKU Semua Anggota</h2></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nama</th><th>Regu</th><th>Ramu</th><th>Rakit</th><th>Terap</th></tr></thead>
          <tbody>
            ${(data || []).map(s => `
              <tr>
                <td>${s.penggalang?.nama || '-'}</td>
                <td>${s.penggalang?.regu || '-'}</td>
                <td>${s.ramu ? '<span class="pill success">✓</span>' : '—'}</td>
                <td>${s.rakit ? '<span class="pill success">✓</span>' : '—'}</td>
                <td>${s.terap ? '<span class="pill success">✓</span>' : '—'}</td>
              </tr>
            `).join('') || '<tr><td colspan="5" style="text-align:center;color:#9ca3af">Belum ada data</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =========================================================
// SKK
// =========================================================
async function renderSKK() {
  if (USER_ROLE === 'penggalang') {
    if (!CURRENT_PENGGALANG) {
      contentEl.innerHTML = `<div class="panel"><div class="placeholder"><i class="fas fa-exclamation-circle"></i><h3>Isi biodata dulu</h3></div></div>`;
      return;
    }
    const { data } = await supabase.from('skk').select('*').eq('penggalang_id', CURRENT_PENGGALANG.id).order('created_at', { ascending: false });
    contentEl.innerHTML = `
      <div class="panel">
        <div class="panel-header">
          <h2><i class="fas fa-star"></i> SKK Saya</h2>
          <button class="btn" onclick="openSkkForm()"><i class="fas fa-plus"></i> Tambah SKK</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Nama SKK</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              ${(data || []).map(s => `
                <tr>
                  <td>${s.nama_skk}</td>
                  <td><span class="pill ${s.status === 'Lulus' ? 'success' : 'warning'}">${s.status}</span></td>
                  <td><button class="btn danger" style="padding:5px 10px;font-size:.75rem" onclick="hapusSkk('${s.id}')"><i class="fas fa-trash"></i></button></td>
                </tr>
              `).join('') || '<tr><td colspan="3" style="text-align:center;color:#9ca3af">Belum ada SKK</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
    window.openSkkForm = () => {
      openModal(`
        <h3><i class="fas fa-star"></i> Tambah SKK</h3>
        <div class="form-group"><label>Nama SKK</label><input id="skkNama" type="text" placeholder="SKK Pertolongan Pertama" /></div>
        <div class="form-group"><label>Status</label>
          <select id="skkStatus"><option>Proses</option><option>Lulus</option></select>
        </div>
        <div class="modal-actions">
          <button class="btn secondary" onclick="closeModal()">Batal</button>
          <button class="btn" onclick="simpanSkk()"><i class="fas fa-save"></i> Simpan</button>
        </div>
      `);
      window.simpanSkk = async () => {
        const nama = document.getElementById('skkNama').value.trim();
        if (!nama) { alert('Nama SKK wajib'); return; }
        const { error } = await supabase.from('skk').insert({
          penggalang_id: CURRENT_PENGGALANG.id,
          nama_skk: nama,
          status: document.getElementById('skkStatus').value
        });
        if (error) { alert(error.message); return; }
        closeModal(); renderSKK();
      };
    };
    window.hapusSkk = async (id) => {
      if (!confirm('Hapus SKK?')) return;
      await supabase.from('skk').delete().eq('id', id);
      renderSKK();
    };
    return;
  }
  // Pembina
  const { data } = await supabase.from('skk').select('*, penggalang(nama, regu)');
  contentEl.innerHTML = `
    <div class="panel">
      <div class="panel-header"><h2><i class="fas fa-star"></i> SKK Semua Anggota</h2></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nama</th><th>Regu</th><th>SKK</th><th>Status</th></tr></thead>
          <tbody>
            ${(data || []).map(s => `
              <tr>
                <td>${s.penggalang?.nama || '-'}</td>
                <td>${s.penggalang?.regu || '-'}</td>
                <td>${s.nama_skk}</td>
                <td><span class="pill ${s.status === 'Lulus' ? 'success' : 'warning'}">${s.status}</span></td>
              </tr>
            `).join('') || '<tr><td colspan="4" style="text-align:center;color:#9ca3af">Belum ada data</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// =========================================================
// PEMBINA / KEGIATAN / PRESTASI / DOKUMENTASI / LAPORAN
// =========================================================
function renderPembina() {
  contentEl.innerHTML = `<div class="panel"><div class="panel-header"><h2><i class="fas fa-chalkboard-user"></i> Data Pembina</h2></div><div class="placeholder"><i class="fas fa-users-gear"></i><h3>Kelola data pembina</h3><p>Fitur CRUD pembina akan tersedia di sini.</p></div></div>`;
}
function renderKegiatan() {
  contentEl.innerHTML = `<div class="panel"><div class="panel-header"><h2><i class="fas fa-calendar-days"></i> Kegiatan</h2></div><div class="placeholder"><i class="fas fa-calendar-plus"></i><h3>Kelola kegiatan</h3><p>Jadwal dan agenda kepramukaan.</p></div></div>`;
}
function renderPrestasi() {
  contentEl.innerHTML = `<div class="panel"><div class="panel-header"><h2><i class="fas fa-trophy"></i> Prestasi</h2></div><div class="placeholder"><i class="fas fa-medal"></i><h3>Kelola prestasi</h3><p>Pencapaian anggota dan regu.</p></div></div>`;
}
function renderDokumentasi() {
  contentEl.innerHTML = `<div class="panel"><div class="panel-header"><h2><i class="fas fa-camera"></i> Dokumentasi</h2></div><div class="placeholder"><i class="fas fa-images"></i><h3>Galeri foto</h3><p>Upload dan kelola dokumentasi kegiatan.</p></div></div>`;
}
function renderLaporan() {
  contentEl.innerHTML = `<div class="panel"><div class="panel-header"><h2><i class="fas fa-chart-column"></i> Laporan</h2></div><div class="placeholder"><i class="fas fa-file-export"></i><h3>Ekspor laporan</h3><p>PDF, Excel, CSV, dan cetak.</p></div></div>`;
}

// =========================================================
// PENGATURAN
// =========================================================
async function renderPengaturan() {
  contentEl.innerHTML = `
    <div class="panel">
      <div class="panel-header"><h2><i class="fas fa-gear"></i> Pengaturan Akun</h2></div>
      <div class="table-wrap">
        <table>
          <tbody>
            <tr><td><strong>Nama</strong></td><td>${CURRENT_PROFILE.full_name || '-'}</td></tr>
            <tr><td><strong>Peran</strong></td><td><span class="pill info">${USER_ROLE === 'pembina' ? 'Pembina' : 'Penggalang'}</span></td></tr>
            <tr><td><strong>Gudep</strong></td><td>PEGASUS SCOUT - SMP Negeri 1</td></tr>
            <tr><td><strong>Versi</strong></td><td>v1.0.0</td></tr>
          </tbody>
        </table>
      </div>
      ${USER_ROLE === 'pembina' ? `
        <div style="margin-top:20px">
          <button class="btn secondary" onclick="gantiPeran('penggalang')"><i class="fas fa-user"></i> Ubah Jadi Penggalang</button>
        </div>
      ` : `
        <div style="margin-top:20px">
          <button class="btn secondary" onclick="gantiPeran('pembina')"><i class="fas fa-chalkboard-user"></i> Minta Jadi Pembina</button>
        </div>
      `}
    </div>
  `;
  window.gantiPeran = async (role) => {
    if (!confirm(`Ubah peran menjadi ${role}?`)) return;
    await supabase.from('profiles').update({ role }).eq('id', CURRENT_USER.id);
    location.reload();
  };
}
