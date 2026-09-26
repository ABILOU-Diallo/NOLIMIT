import { supabase, isSupabaseConfigured } from '../lib/supabase'

// Configuration locale (fallback)
const DEMO_USERS_KEY = 'issmiga_demo_users_v1'
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

const initialDemoUsers = [
  {
    id: 'usr-owner-1',
    full_name: 'Nicolas Admin',
    email: OWNER_EMAIL,
    role: 'owner',
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

function getLocalUsers() {
  try {
    const raw = localStorage.getItem(DEMO_USERS_KEY)
    if (!raw) {
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(initialDemoUsers))
      return initialDemoUsers
    }
    return JSON.parse(raw)
  } catch {
    return initialDemoUsers
  }
}

export async function getSession() {
  if (isSupabaseConfigured) {
    const { data } = await supabase.auth.getSession()
    return data.session ?? null
  }
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function onAuthChange(callback) {
  if (isSupabaseConfigured) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
    return () => data.subscription?.unsubscribe()
  }
  return () => {}
}

export async function signIn(email, password) {
  if (isSupabaseConfigured) return supabase.auth.signInWithPassword({ email, password })
  return { error: { message: 'Supabase non configuré.' } }
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
  return getLocalUsers().find(u => u.id === userId) || null
}

export async function getUsers({ hideOwner = false } = {}) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return hideOwner ? data.filter(u => u.role !== 'owner') : data
  }
  return getLocalUsers()
}

export async function updateUserProfile(userId, payload) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('profiles').update(payload).eq('id', userId)
    if (error) throw error
  }
  return true
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
