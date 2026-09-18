import { supabase } from '../lib/supabase'

export async function getSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session ?? null
}

export function onAuthChange(callback) {
  if (!supabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
  return () => data.subscription.unsubscribe()
}

export async function signIn(email, password) {
  if (!supabase) {
    return { error: { message: 'Authentification non configurée.' } }
  }
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signUp(email, password) {
  if (!supabase) {
    return { error: { message: 'Authentification non configurée.' } }
  }
  return supabase.auth.signUp({ email, password })
}

export async function signOut() {
  if (!supabase) return { error: null }
  return supabase.auth.signOut()
}

export async function resetPassword(email) {
  if (!supabase) {
    return { error: { message: 'Authentification non configurée.' } }
  }
  return supabase.auth.resetPasswordForEmail(email)
}

export async function getProfile(userId) {
  if (!supabase) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
  return data
}
