import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_PREINSCRIPTIONS_KEY = 'issmiga_preinscriptions_v1'

const initialPreinscriptions = [
  {
    id: 'pre-1',
    full_name: 'Amina Bello',
    email: 'amina.bello@gmail.com',
    phone: '+237 690 123 456',
    city: 'Yaoundé',
    birth_date: '2005-04-12',
    guardian_name: 'Bello Samy',
    guardian_phone: '+237 677 000 111',
    institution: 'issmiga',
    formation_id: 'bts-comptabilite',
    diploma_interest: 'bts',
    message: 'Souhaite intégrer le BTS comptabilité dès la rentrée.',
    status: 'new',
    admin_notes: '',
    consent: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'pre-2',
    full_name: 'Brice Tchoua',
    email: 'brice.tchoua@yahoo.fr',
    phone: '+237 655 123 456',
    city: 'Douala',
    birth_date: '2004-09-18',
    guardian_name: '',
    guardian_phone: '',
    institution: 'cfp',
    formation_id: 'secretariat-bureautique-bilingue',
    diploma_interest: 'cqp',
    message: 'Recherche une formation courte orientée bureautique bilingue.',
    status: 'contacted',
    admin_notes: 'Appel effectué, dossier en attente.',
    consent: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

function getLocalPreinscriptions() {
  try {
    const raw = localStorage.getItem(LOCAL_PREINSCRIPTIONS_KEY)
    if (!raw) {
      localStorage.setItem(LOCAL_PREINSCRIPTIONS_KEY, JSON.stringify(initialPreinscriptions))
      return initialPreinscriptions
    }
    return JSON.parse(raw)
  } catch {
    return initialPreinscriptions
  }
}

function setLocalPreinscriptions(list) {
  try {
    localStorage.setItem(LOCAL_PREINSCRIPTIONS_KEY, JSON.stringify(list))
  } catch {
    // Ignore storage errors
  }
}

export async function getPreinscriptions() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('preinscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) return data
  }

  return getLocalPreinscriptions()
}

export async function submitPreinscription(payload) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('preinscriptions').insert({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      birth_date: payload.birthDate || null,
      guardian_name: payload.guardianName || null,
      guardian_phone: payload.guardianPhone || null,
      formation_id: payload.formationId || null,
      institution: payload.institution || 'issmiga',
      diploma_interest: payload.diplomaInterest || null,
      message: payload.message || null,
      consent: Boolean(payload.consent),
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

  const list = getLocalPreinscriptions()
  const nextItem = {
    id: `pre-${Date.now()}`,
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    city: payload.city || 'Yaoundé',
    birth_date: payload.birthDate || null,
    guardian_name: payload.guardianName || null,
    guardian_phone: payload.guardianPhone || null,
    institution: payload.institution || 'issmiga',
    formation_id: payload.formationId || null,
    diploma_interest: payload.diplomaInterest || null,
    message: payload.message || null,
    consent: Boolean(payload.consent),
    status: 'new',
    admin_notes: '',
    created_at: new Date().toISOString(),
  }

  setLocalPreinscriptions([nextItem, ...list])
  return { ok: true }
}

export async function updatePreinscriptionStatus(id, status, adminNotes = '') {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('preinscriptions')
      .update({
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error
    return true
  }

  const list = getLocalPreinscriptions()
  const updated = list.map((item) =>
    item.id === id ? { ...item, status, admin_notes: adminNotes } : item,
  )
  setLocalPreinscriptions(updated)
  return true
}
