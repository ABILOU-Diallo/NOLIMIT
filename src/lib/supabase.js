import { createClient } from '@supabase/supabase-js'

// Lecture hybride (VITE_ ou SUPABASE_)
const rawUrl = import.meta.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const rawKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

const url = rawUrl?.trim().replace(/['"]/g, '')
const anonKey = rawKey?.trim().replace(/['"]/g, '')

// Vérification détaillée pour le debugging
export const isSupabaseConfigured = Boolean(url && anonKey && url.startsWith('http'))

if (!isSupabaseConfigured) {
  if (!url) console.error("❌ Erreur de config : SUPABASE_URL est vide dans le .env")
  if (!anonKey) console.error("❌ Erreur de config : SUPABASE_ANON_KEY est vide dans le .env")
  if (url && !url.startsWith('http')) console.error("❌ Erreur de config : SUPABASE_URL doit commencer par https://")

  console.warn("⚠️ Mode démo activé : Les données seront stockées localement dans votre navigateur.")
}

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
