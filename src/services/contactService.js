import { supabase, isSupabaseConfigured } from '../lib/supabase'

export async function submitContact(payload) {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      offline: true,
      message:
        'Le formulaire n’est pas encore connecté. Écrivez à info@nolimitacademy.org ou passez par WhatsApp.',
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
