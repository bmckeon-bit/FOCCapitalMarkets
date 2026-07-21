import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const LOCAL_KEY = "foc_capmarkets_dashboard_v2";
const ROW_ID = "main";

export const supabase = url && key ? createClient(url, key) : null;
export const storageMode = supabase ? "shared" : "local";

export async function loadState() {
  if (supabase) {
    const { data, error } = await supabase.from("dashboard_state").select("data").eq("id", ROW_ID).maybeSingle();
    if (error) throw error;
    return data ? data.data : null;
  }
  const raw = localStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveState(state) {
  if (supabase) {
    const { error } = await supabase.from("dashboard_state").upsert({ id: ROW_ID, data: state, updated_at: new Date().toISOString() });
    if (error) throw error;
    return;
  }
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}

// Viewers poll for the latest shared state so they see the editor's updates without a refresh.
export function subscribeState(onChange, intervalMs = 20000) {
  if (!supabase) return () => {};
  const tick = async () => { try { const s = await loadState(); if (s) onChange(s); } catch (e) {} };
  const id = setInterval(tick, intervalMs);
  return () => clearInterval(id);
}
