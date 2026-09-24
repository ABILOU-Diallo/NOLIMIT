import { supabase, isSupabaseConfigured } from '../lib/supabase'

// Stockage local réactif pour le mode démonstration
const DEMO_USERS_KEY = 'issmiga_demo_users_v1'
const DEMO_SESSION_KEY = 'issmiga_demo_session_v1'

// Hiérarchie des rôles
export const ROLE_HIERARCHY = {
  visitor: 0,
  student: 1,
  admin: 2,
  super_admin: 3,
  owner: 4,
}

export const ROLE_LABELS = {
  visitor: 'Visiteur',
  student: 'Étudiant',
  admin: 'Administrateur',
  super_admin: 'Super Administrateur',
  owner: 'Propriétaire',
}

const OWNER_EMAIL = 'nicodevnico@gmail.com'
const SUPER_ADMIN_EMAILS = new Set(['tantchou@yahoo.com', 'njoyadiallo4@gmail.com'])

function isProtectedOwner(user) {
  return user?.role === 'owner' || user?.email?.toLowerCase() === OWNER_EMAIL
}

function sanitizeUserList(users, hideOwner) {
  if (!hideOwner) return users
  return users
    .filter((user) => !isProtectedOwner(user))
    .map((user) => (user.role === 'owner' ? { ...user, role: 'super_admin' } : user))
}

async function getTargetUser(userId) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    if (error) throw error
    return data
  }
  return getLocalUsers().find((user) => user.id === userId) ?? null
}

const initialDemoUsers = [
  {
    id: 'usr-owner-1',
    full_name: 'Nicolas Admin',
    email: 'nicodevnico@gmail.com',
    role: 'owner',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'usr-super-1',
    full_name: 'Dr Orly Tantchou',
    email: 'tantchou@yahoo.com',
    role: 'super_admin',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'usr-super-2',
    full_name: 'Njoya Diallo',
    email: 'njoyadiallo4@gmail.com',
    role: 'super_admin',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'usr-admin-1',
    full_name: 'Admin Académique',
    email: 'admin@nolimitacademy.org',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'usr-student-1',
    full_name: 'Jean Paul Mvogo',
    email: 'jean.mvogo@gmail.com',
    role: 'student',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'usr-student-2',
    full_name: 'Marie Claire Nkoa',
    email: 'marie.nkoa@yahoo.fr',
    role: 'student',
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

function setLocalUsers(users) {
  try {
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users))
  } catch {
    // Ignore storage errors
  }
}

function getLocalSession() {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setLocalSession(session) {
  try {
    if (session) {
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(DEMO_SESSION_KEY)
    }
  } catch {
    // Ignore
  }
}

const authListeners = new Set()

function notifyAuthListeners(session) {
  authListeners.forEach((cb) => cb(session))
}

export async function getSession() {
  if (isSupabaseConfigured) {
    const { data } = await supabase.auth.getSession()
    return data.session ?? null
  }
  return getLocalSession()
}

export function onAuthChange(callback) {
  if (isSupabaseConfigured) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
    return () => data.subscription?.unsubscribe()
  }

  authListeners.add(callback)
  return () => authListeners.delete(callback)
}

export async function signIn(email, password) {
  if (isSupabaseConfigured) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  const users = getLocalUsers()
  const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

  if (!found) {
    return { error: { message: 'Aucun compte trouvé avec cet e-mail.' } }
  }

  if (!found.is_active) {
    return { error: { message: 'Ce compte a été désactivé par l\'administration.' } }
  }

  const mockSession = {
    user: {
      id: found.id,
      email: found.email,
      user_metadata: { full_name: found.full_name, role: found.role },
    },
    profile: found,
  }

  setLocalSession(mockSession)
  notifyAuthListeners(mockSession)
  return { data: mockSession, error: null }
}

export async function signUp(email, password, fullName = '') {
  if (isSupabaseConfigured) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: 'student' },
      },
    })
  }

  const users = getLocalUsers()
  const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())

  if (exists) {
    return { error: { message: 'Cet e-mail est déjà utilisé par un autre compte.' } }
  }

  let role = 'student'
  if (email.trim().toLowerCase() === OWNER_EMAIL) role = 'owner'
  else if (SUPER_ADMIN_EMAILS.has(email.trim().toLowerCase())) role = 'super_admin'

  const newUser = {
    id: `usr-${Date.now()}`,
    full_name: fullName || email.split('@')[0],
    email,
    role,
    is_active: true,
    created_at: new Date().toISOString(),
  }

  const updatedUsers = [newUser, ...users]
  setLocalUsers(updatedUsers)

  const mockSession = {
    user: {
      id: newUser.id,
      email: newUser.email,
      user_metadata: { full_name: newUser.full_name, role: newUser.role },
    },
    profile: newUser,
  }

  setLocalSession(mockSession)
  notifyAuthListeners(mockSession)
  return { data: mockSession, error: null }
}

export async function signOut() {
  if (isSupabaseConfigured) {
    return supabase.auth.signOut()
  }

  setLocalSession(null)
  notifyAuthListeners(null)
  return { error: null }
}

export async function resetPassword(email) {
  if (isSupabaseConfigured) {
    return supabase.auth.resetPasswordForEmail(email)
  }
  return { data: {}, error: null }
}

export async function getProfile(userId) {
  if (isSupabaseConfigured) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return data
  }

  const users = getLocalUsers()
  return users.find((u) => u.id === userId) ?? null
}

export async function getUsers({ hideOwner = true } = {}) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) return sanitizeUserList(data, hideOwner)
  }
  return sanitizeUserList(getLocalUsers(), hideOwner)
}

export async function updateUserProfile(userId, payload, currentUserRole) {
  const targetUser = await getTargetUser(userId)
  if (!targetUser) throw new Error('Utilisateur introuvable.')
  if (isProtectedOwner(targetUser) && currentUserRole !== 'owner') {
    throw new Error('Cette fiche ne peut pas être modifiée.')
  }
  if (targetUser.role === 'super_admin' && currentUserRole !== 'owner') {
    throw new Error('Impossible de modifier un super administrateur.')
  }

  const next = {
    full_name: payload.full_name,
    phone: payload.phone || null,
    updated_at: new Date().toISOString(),
  }

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('profiles').update(next).eq('id', userId)
    if (error) throw error
    return true
  }

  setLocalUsers(getLocalUsers().map((user) => (user.id === userId ? { ...user, ...next } : user)))
  return true
}

/**
 * Met à jour le rôle d'un utilisateur.
 * Règles :
 * - Un super_admin ne peut pas modifier le rôle d'un owner
 * - Un super_admin ne peut pas modifier le rôle d'un autre super_admin (sauf owner)
 * - Un admin simple ne peut promouvoir qu'à "admin" maximum
 */
export async function updateUserRole(userId, newRole, currentUserRole) {
  const targetUser = await getTargetUser(userId)
  if (!targetUser) throw new Error('Utilisateur introuvable.')
  if (isProtectedOwner(targetUser)) {
    throw new Error('Impossible de modifier ce compte.')
  }
  if (targetUser.role === 'super_admin' && currentUserRole !== 'owner') {
    throw new Error('Impossible de modifier le rôle d\'un super administrateur.')
  }
  if (currentUserRole === 'admin' && ['super_admin', 'owner'].includes(newRole)) {
    throw new Error('Vous n\'avez pas les droits pour attribuer ce rôle.')
  }
  if (newRole === 'owner') {
    throw new Error('Ce rôle ne peut pas être attribué.')
  }

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', userId)
    if (error) throw error
    return true
  }

  const updated = getLocalUsers().map((u) => (u.id === userId ? { ...u, role: newRole } : u))
  setLocalUsers(updated)
  return true
}

/**
 * Active / désactive un compte utilisateur.
 * Règles : ne peut pas désactiver un owner, ni un super_admin (sauf owner)
 */
export async function updateUserStatus(userId, isActive, currentUserRole) {
  const targetUser = await getTargetUser(userId)
  if (!targetUser) throw new Error('Utilisateur introuvable.')
  if (isProtectedOwner(targetUser)) {
    throw new Error('Impossible de désactiver ce compte.')
  }
  if (targetUser.role === 'super_admin' && currentUserRole !== 'owner') {
    throw new Error('Impossible de désactiver un super administrateur.')
  }

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', userId)
    if (error) throw error
    return true
  }

  const updated = getLocalUsers().map((u) => (u.id === userId ? { ...u, is_active: isActive } : u))
  setLocalUsers(updated)
  return true
}

/**
 * Supprime un compte utilisateur.
 * Règles : ne peut jamais supprimer un super_admin ou owner.
 */
export async function deleteUser(userId, currentUserRole) {
  const targetUser = await getTargetUser(userId)
  if (!targetUser) throw new Error('Utilisateur introuvable.')
  if (isProtectedOwner(targetUser) || targetUser.role === 'super_admin') {
    throw new Error('Impossible de supprimer un super administrateur.')
  }
  if (targetUser.role === 'admin' && !['super_admin', 'owner'].includes(currentUserRole)) {
    throw new Error('Seul un super administrateur peut supprimer un administrateur.')
  }

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId)
    if (error) throw error
    return true
  }

  const updated = getLocalUsers().filter((u) => u.id !== userId)
  setLocalUsers(updated)
  return true
}

/**
 * Upload d'une image vers Supabase Storage
 */
export async function uploadArticleImage(file) {
  if (!isSupabaseConfigured) {
    // Mode demo : retourner un objet URL local
    return URL.createObjectURL(file)
  }

  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from('article-images')
    .upload(filename, file, { upsert: false })

  if (error) throw error

  const { data: publicData } = supabase.storage
    .from('article-images')
    .getPublicUrl(data.path)

  return publicData.publicUrl
}
