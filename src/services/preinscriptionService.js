import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_PREINSCRIPTIONS_KEY = 'issmiga_preinscriptions_v1'

export async function uploadPreinscriptionPhoto(file) {
  if (!isSupabaseConfigured) return URL.createObjectURL(file)
  try {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const filePath = `photos/${fileName}`
    const { error: uploadError } = await supabase.storage
      .from('preinscriptions')
      .upload(filePath, file)
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from('preinscriptions').getPublicUrl(filePath)
    return data.publicUrl
  } catch (err) {
    console.warn("Échec upload photo, utilisation URL locale", err)
    return URL.createObjectURL(file)
  }
}

function getLocalPreinscriptions() {
  try {
    const raw = localStorage.getItem(LOCAL_PREINSCRIPTIONS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export async function getPreinscriptions() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('preinscriptions')
      .select('*, formations(title, institution)')
      .order('created_at', { ascending: false })
    if (!error && data) {
      return data.map(item => ({
        ...item,
        formation_title: item.formations?.title || 'Filière non spécifiée',
        institution: item.formations?.institution || item.institution
      }))
    }
  }
  return getLocalPreinscriptions()
}

export async function submitPreinscription(payload) {
  const refCode = `NL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`

  const dbPayload = {
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    city: payload.city || 'Yaoundé',
    birth_date: payload.birthDate || null,
    guardian_name: payload.guardianName || null,
    guardian_phone: payload.guardianPhone || null,
    institution: payload.institution,
    formation_id: payload.formationId,
    diploma_interest: payload.diplomaInterest,
    message: payload.message,
    consent: Boolean(payload.consent),
    photo_url: payload.photoUrl || null,
    documents_checklist: payload.documentsChecklist || [],
    status: 'new',
    reference_code: refCode
  }

  if (isSupabaseConfigured) {
    // IMPORTANT: Pas de .select() ici pour éviter l'erreur 401 en mode anonyme
    const { error } = await supabase
      .from('preinscriptions')
      .insert([dbPayload])

    if (error) {
      console.error("Détails de l'erreur Supabase:", error)
      throw new Error(error.message)
    }
  } else {
    const list = getLocalPreinscriptions()
    localStorage.setItem(LOCAL_PREINSCRIPTIONS_KEY, JSON.stringify([{ ...dbPayload, id: Date.now(), created_at: new Date().toISOString() }, ...list]))
  }

  return { ok: true, reference: refCode }
}

export async function updatePreinscriptionStatus(id, status, adminNotes = '') {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('preinscriptions')
      .update({ status, admin_notes: adminNotes, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  }
  return true
}
