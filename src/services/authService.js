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

const OWNER_EMAIL = 'tantchou@yahoo.com'

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

export async function signUp(email, password, fullName = '', role = 'student') {
  if (!isSupabaseConfigured) {
    return { error: { message: 'Configuration Supabase absente.' } }
  }
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  })
}

/**
 * Création d'un utilisateur par un admin.
 * Note: En mode standard Supabase sans clé service_role, signUp crée le compte Auth.
 */
export async function adminCreateUser(payload) {
  if (!isSupabaseConfigured) {
    return {
      id: `u-${Date.now()}`,
      ...payload,
      is_active: true,
      created_at: new Date().toISOString()
    }
  }

  // Création via Auth
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.full_name,
        role: payload.role
      },
    },
  })

  if (error) throw error

  // Le profil est créé par le trigger handle_new_user() en BD
  // On attend un peu ou on récupère le profil
  const { data: profile, error: pError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (pError) throw pError
  return profile
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

export async function getUsers(options = {}) {
  if (isSupabaseConfigured) {
    let query = supabase.from('profiles').select('*')

    if (options.hideOwner) {
      query = query.neq('role', 'owner')
    }

    const { data, error } = await query.order('created_at', { ascending: false })
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
