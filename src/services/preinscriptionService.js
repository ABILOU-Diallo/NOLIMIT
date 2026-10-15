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
    // On récupère également le titre de la formation via une jointure pour l'admin
    const { data, error } = await supabase
      .from('preinscriptions')
      .select('*, formations(title, institution)')
      .order('created_at', { ascending: false })

    if (!error && data) {
      return data.map(item => ({
        ...item,
        // Si la jointure a fonctionné, on s'assure que l'institution est cohérente
        formation_title: item.formations?.title || item.formation_id,
        // On privilégie l'institution de la formation si elle existe
        institution: item.formations?.institution || item.institution
      }))
    }
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

  // Toujours sauvegarder localement
  try {
    const list = getLocalPreinscriptions()
    setLocalPreinscriptions([nextItem, ...list])
  } catch (e) {
    console.warn('LocalStorage save error:', e)
  }

  if (isSupabaseConfigured) {
    try {
      // 1. Validation de l'ID de formation
      let validFormationId = null
      let detectedInstitution = nextItem.institution

      if (nextItem.formation_id) {
        try {
          const { data: found } = await supabase
            .from('formations')
            .select('id, institution')
            .or(`id.eq.${nextItem.formation_id},slug.eq.${nextItem.formation_id}`)
            .maybeSingle()

          if (found?.id) {
            validFormationId = found.id
            // Sécurité : on utilise l'institution définie dans la table formations pour éviter toute confusion
            detectedInstitution = found.institution
          }
        } catch (e) {
          console.warn('Erreur vérification formation:', e)
        }
      }

      // 2. Vérification de la session utilisateur
      let userId = null
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        if (sessionData?.session?.user?.id) {
          userId = sessionData.session.user.id
        }
      } catch (e) { /* ignore */ }

      const dbPayload = {
        full_name: nextItem.full_name,
        email: nextItem.email,
        phone: nextItem.phone,
        city: nextItem.city || 'Yaoundé',
        birth_date: nextItem.birth_date ? nextItem.birth_date : null,
        guardian_name: nextItem.guardian_name || null,
        guardian_phone: nextItem.guardian_phone || null,
        institution: detectedInstitution, // CRITIQUE : Ajout de l'institution dans le payload DB
        formation_id: validFormationId,
        diploma_interest: nextItem.diploma_interest || null,
        message: nextItem.message || (nextItem.formation_id && !validFormationId ? `Filière demandée : ${nextItem.formation_id}` : null),
        consent: Boolean(nextItem.consent),
        status: 'new',
      }

      if (userId) dbPayload.user_id = userId

      const { error } = await supabase.from('preinscriptions').insert(dbPayload)

      if (error) {
        console.error('Erreur Supabase insertion:', error)
      } else {
        console.log('✅ Préinscription enregistrée avec succès ! Institution:', detectedInstitution)
      }

      return { ok: true, reference: refCode, item: { ...nextItem, institution: detectedInstitution } }
    } catch (err) {
      console.warn('Erreur inattendue Supabase:', err)
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
