/* =========================================================
   Konfigurasi Supabase
   ========================================================= */

// 🔴 GANTI dengan milik Anda
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx';

// Load SDK Supabase via ESM CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: ambil profil user aktif
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

// Helper: ambil biodata penggalang milik user
export async function getPenggalangByUser(userId) {
  const { data, error } = await supabase
    .from('penggalang')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return null;
  return data;
}

// Helper: login Google
export async function loginWithGoogle(role = 'penggalang') {
  // Simpan pilihan role di localStorage; setelah callback kita set ke DB
  localStorage.setItem('pegasus_role_choice', role);
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/index.html'
    }
  });
  if (error) alert('Gagal login: ' + error.message);
}

// Helper: logout
export async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem('pegasus_role_choice');
  window.location.href = 'login.html';
}
