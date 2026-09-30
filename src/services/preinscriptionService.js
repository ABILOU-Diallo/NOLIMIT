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
  const refCode = `NL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  const nextItem = {
    id: `pre-${Date.now()}`,
    reference_code: refCode,
    full_name: payload.fullName || payload.full_name || '',
    email: payload.email || '',
    phone: payload.phone || '',
    city: payload.city || 'Yaoundé',
    birth_date: payload.birthDate || payload.birth_date || null,
    guardian_name: payload.guardianName || payload.guardian_name || null,
    guardian_phone: payload.guardianPhone || payload.guardian_phone || null,
    institution: payload.institution || 'issmiga',
    formation_id: payload.formationId || payload.formation_id || null,
    diploma_interest: payload.diplomaInterest || payload.diploma_interest || null,
    message: payload.message || null,
    consent: Boolean(payload.consent),
    status: 'new',
    admin_notes: '',
    created_at: new Date().toISOString(),
  }

  // Always save locally for immediate offline/hybrid availability
  try {
    const list = getLocalPreinscriptions()
    setLocalPreinscriptions([nextItem, ...list])
  } catch (e) {
    console.warn('LocalStorage save error:', e)
  }

  if (isSupabaseConfigured) {
    try {
      const dbPayload = {
        full_name: nextItem.full_name,
        email: nextItem.email,
        phone: nextItem.phone,
        city: nextItem.city,
        birth_date: nextItem.birth_date,
        guardian_name: nextItem.guardian_name,
        guardian_phone: nextItem.guardian_phone,
        formation_id: nextItem.formation_id,
        diploma_interest: nextItem.diploma_interest,
        message: nextItem.message,
        consent: nextItem.consent,
        status: 'new',
      }

      const { data, error } = await supabase.from('preinscriptions').insert(dbPayload).select()

      if (error) {
        console.warn('Supabase insertion error (fallback to local active):', error)
        // If Supabase has foreign key or column issue, we don't block the user since local storage is saved
        return { ok: true, reference: refCode, item: nextItem, warning: 'Saved locally' }
      }

      return { ok: true, reference: refCode, item: data?.[0] || nextItem }
    } catch (err) {
      console.warn('Supabase unexpected error:', err)
      return { ok: true, reference: refCode, item: nextItem }
    }
  }

  return { ok: true, reference: refCode, item: nextItem }
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
