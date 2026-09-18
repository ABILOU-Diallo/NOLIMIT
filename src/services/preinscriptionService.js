import { supabase, isSupabaseConfigured } from '../lib/supabase'

export async function submitPreinscription(payload) {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      offline: true,
      message:
        'La préinscription en ligne n’est pas encore connectée. Contactez le centre par WhatsApp ou téléphone.',
    }
  }

  const { error } = await supabase.from('preinscriptions').insert({
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    city: payload.city,
    birth_date: payload.birthDate || null,
    guardian_name: payload.guardianName || null,
    guardian_phone: payload.guardianPhone || null,
    formation_id: payload.formationId || null,
    diploma_interest: payload.diplomaInterest || null,
    message: payload.message || null,
    consent: payload.consent,
    status: 'new',
  })

  if (error) {
    return {
      ok: false,
      message:
        'L’envoi a échoué. Vérifiez votre connexion, puis réessayez ou contactez un conseiller.',
    }
  }

  return { ok: true }
}
