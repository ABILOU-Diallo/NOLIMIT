import { supabase, isSupabaseConfigured } from '../lib/supabase'

// Configuration locale
const DEMO_SESSION_KEY = 'issmiga_demo_session_v1'

export const ROLE_HIERARCHY = { visitor: 0, student: 1, admin: 2, super_admin: 3, owner: 4 }

export const ROLE_LABELS = {
  visitor: 'Visiteur',
  student: 'Étudiant',
  admin: 'Administrateur',
  super_admin: 'Super Administrateur',
  owner: 'Propriétaire',
}

const OWNER_EMAIL = 'nicodevnico@gmail.com'

export async function getSession() {
  if (isSupabaseConfigured) {
    const { data } = await supabase.auth.getSession()
    return data.session ?? null
  }
  try {
    return JSON.parse(localStorage.getItem(DEMO_SESSION_KEY))
  } catch { return null }
}

export function onAuthChange(callback) {
  if (isSupabaseConfigured) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
    return () => data.subscription?.unsubscribe()
  }
  return () => {}
}

export async function signIn(email, password) {
  if (!isSupabaseConfigured) {
    return { error: { message: 'Le serveur doit être redémarré pour charger les clés .env (Faites Ctrl+C puis npm run dev)' } }
  }
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signUp(email, password, fullName = '') {
  if (!isSupabaseConfigured) {
    return { error: { message: 'Configuration Supabase absente.' } }
  }
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role: 'student' },
    },
  })
}

export async function signOut() {
  if (isSupabaseConfigured) return supabase.auth.signOut()
  localStorage.removeItem(DEMO_SESSION_KEY)
  return { error: null }
}

export async function getProfile(userId) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    if (error) console.error('Error fetching profile:', error)
    return data
  }
  return null
}

export async function getUsers() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
  return []
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

export async function uploadArticleImage(file) {
  if (!isSupabaseConfigured) return URL.createObjectURL(file)
  const ext = file.name.split('.').pop()
  const name = `${Math.random().toString(36).substring(2)}-${Date.now()}.${ext}`
  const { data, error } = await supabase.storage.from('article-images').upload(name, file)
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage.from('article-images').getPublicUrl(name)
  return publicUrl
}
