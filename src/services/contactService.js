import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { fetchAllPages } from '../utils/requestCache'

export async function submitContact(payload) {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      offline: true,
      message:
        'Le formulaire en ligne est temporairement indisponible. Écrivez à Info@issmiga.com ou Info@cfpnolimit.com ou contactez-nous via WhatsApp.',
    }
  }

  const { error } = await supabase.from('contacts').insert({
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone || null,
    subject: payload.subject,
    message: payload.message,
    status: 'new',
  })

  if (error) {
    return {
      ok: false,
      message:
        'Le message n’a pas pu être envoyé. Réessayez ou contactez le secrétariat par téléphone.',
    }
  }

  return { ok: true }
}

export async function getContacts() {
  if (!isSupabaseConfigured) return []

  return fetchAllPages((from, to) => supabase
    .from('contacts')
    .select('id,full_name,email,phone,subject,message,status,created_at')
    .order('created_at', { ascending: false })
    .range(from, to))
}

export async function updateContactStatus(id, status) {
  const { data, error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
    .select('id,status')
    .single()

  if (error) throw error
  return data
}

export async function deleteContact(id) {
  const { error } = await supabase.from('contacts').delete().eq('id', id)
  if (error) throw error
}
