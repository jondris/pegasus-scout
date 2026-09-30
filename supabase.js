/* =========================================================
   PEGASUS SCOUT — Supabase Client
   ========================================================= */

// ✅ IMPORT HARUS DI ATAS
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';

export const SUPABASE_URL = 'https://bjrgrzvyjdlagzlsprrs.supabase.co';

// ⚠️ GANTI dengan anon key BARU (klik tombol Copy di Supabase, jangan ketik manual!)
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcmdyenZ5amRsYWd6bHNwcnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NjcyNjEsImV4cCI6MjEwNjM0MzI2MX0.Cse0N3pIk4yBF7LdA38TK5tBhkatFMLyFvEg8WfhuZo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) console.warn('[getProfile]', error.message);
  return data;
}

export async function getPenggalangByUser(userId) {
  const { data, error } = await supabase
    .from('penggalang')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) console.warn('[getPenggalangByUser]', error.message);
  return data;
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}
