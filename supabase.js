import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// 🔴 GANTI DENGAN MILIK ANDA
export const SUPABASE_URL = 'https://bjrgrzvyjdlagzlsprrs.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_GedO3ubXDuI0GLP4usWwdA_ABJwZm2W';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getProfile(userId) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  return data;
}

export async function getPenggalangByUser(userId) {
  const { data } = await supabase.from('penggalang').select('*').eq('user_id', userId).maybeSingle();
  return data;
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}
