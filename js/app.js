/* =========================================================
   PEGASUS SCOUT — DEBUG VERSION
   ========================================================= */
import { supabase } from './supabase.js';

const contentEl = document.getElementById('content');

function showStatus(html, color = '#374151') {
  contentEl.innerHTML = `
    <div class="panel">
      <div style="padding:24px;border-left:4px solid ${color};background:#f9fafb;border-radius:10px;font-family:monospace;font-size:.85rem;white-space:pre-wrap;line-height:1.6">${html}</div>
      <button class="btn" style="margin-top:16px" onclick="location.reload()">🔄 Reload</button>
      <button class="btn danger" style="margin-top:16px" onclick="localStorage.clear();location.href='login.html'">🚪 Login Ulang</button>
    </div>`;
}

function log(msg) {
  const time = new Date().toLocaleTimeString();
  return `[${time}] ${msg}\n`;
}

(async () => {
  let logText = '=== PEGASUS DEBUG ===\n\n';

  try {
    logText += log('1. Cek session...');
    showStatus(logText);
    await new Promise(r => setTimeout(r, 200));

    const { data: { session }, error: sessErr } = await supabase.auth.getSession();
    
    if (sessErr) {
      logText += log('❌ ERROR getSession: ' + sessErr.message);
      showStatus(logText, '#ef4444');
      return;
    }

    if (!session) {
      logText += log('❌ TIDAK ADA SESSION — Anda belum login!');
      logText += log('→ Akan redirect ke login.html dalam 2 detik...');
      showStatus(logText, '#f59e0b');
      setTimeout(() => location.href = 'login.html', 2000);
      return;
    }

    logText += log('✅ Session OK!');
    logText += log('   Email: ' + session.user.email);
    logText += log('   ID: ' + session.user.id);
    logText += log('   Nama Google: ' + (session.user.user_metadata?.full_name || session.user.user_metadata?.name || '-'));
    logText += log('');
    showStatus(logText);
    await new Promise(r => setTimeout(r, 300));

    logText += log('2. Cek tabel profiles...');
    showStatus(logText);
    await new Promise(r => setTimeout(r, 200));

    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();

    if (profErr) {
      logText += log('❌ ERROR baca profiles: ' + profErr.message);
      logText += log('   Code: ' + profErr.code);
      logText += log('   Hint: ' + (profErr.hint || '-'));
      showStatus(logText, '#ef4444');
      return;
    }

    if (profile) {
      logText += log('✅ Profile ditemukan!');
      logText += log('   Nama: ' + profile.full_name);
      logText += log('   Role: ' + profile.role);
    } else {
      logText += log('⚠️ Profile BELUM ADA di tabel — akan dibuat...');
      const meta = session.user.user_metadata || {};
      const { data: newProf, error: insErr } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          email: session.user.email,
          full_name: meta.full_name || meta.name || 'Pengguna',
          avatar_url: meta.avatar_url,
          role: localStorage.getItem('pegasus_role_choice') || 'penggalang'
        })
        .select()
        .single();

      if (insErr) {
        logText += log('❌ GAGAL insert profile: ' + insErr.message);
        logText += log('   → Kemungkinan RLS policy belum benar');
        showStatus(logText, '#ef4444');
        return;
      }
      logText += log('✅ Profile berhasil dibuat!');
    }

    logText += log('');
    logText += log('3. Semua test BERHASIL! ✅');
    logText += log('');
    logText += log('→ Mengarahkan ke dashboard dalam 3 detik...');
    showStatus(logText, '#10b981');
    setTimeout(() => location.href = 'index.html', 3000);

  } catch (err) {
    logText += log('');
    logText += log('❌ FATAL ERROR: ' + err.message);
    logText += log('Stack: ' + (err.stack || '-'));
    showStatus(logText, '#ef4444');
  }
})();
