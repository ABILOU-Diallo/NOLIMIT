import { allFormations as localFormations } from '../data/formations'
import { poles as localPoles } from '../data/poles'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getCachedRequest, invalidateCachedRequests, fetchAllPages } from '../utils/requestCache'

const POLE_COLUMNS = 'id,slug,name,tagline,description,sort_order,is_published'
const FORMATION_COLUMNS = 'id,pole_id,slug,title,excerpt,description,presentation,level,diploma,institution,duration,skills,outlets,competences,debouches,is_published,sort_order'
const CUSTOM_FORMATION_COLUMNS = 'id,slug,title,category,description_3mois,description_6mois,description_9mois,faisabilite,is_published,sort_order,created_at,updated_at'
const FORMATION_PAGE_SIZE = 200
const CUSTOM_FORMATION_PAGE_SIZE = 200

function mapFormation(row) {
  if (!row) return null;
  return {
    id: row.id,
    poleId: row.pole_id || row.poleId,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    description: row.description,
    presentation: row.presentation || row.excerpt,
    level: row.level || 'BTS',
    diploma: row.diploma,
    institution: row.institution || 'cfp',
    duration: row.duration,
    // Map database columns "competences" and "debouches" to UI fields "skills" and "outlets"
    // If the JSONB arrays are empty, fall back to the legacy columns "skills" and "outlets"
    skills: Array.isArray(row.competences) && row.competences.length ? row.competences : (Array.isArray(row.skills) ? row.skills : []),
    outlets: Array.isArray(row.debouches) && row.debouches.length ? row.debouches : (Array.isArray(row.outlets) ? row.outlets : []),
    isPublished: row.is_published ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

/**
 * Tri alphabétique universel pour les formations
 */
const sortAlphabetically = (list) => {
  return [...list].sort((a, b) =>
    (a.title || '').localeCompare(b.title || '', 'fr', { sensitivity: 'base' })
  )
}

async function loadPoles(includeUnpublished) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('formation_poles').select(POLE_COLUMNS)
      if (!includeUnpublished) query = query.eq('is_published', true)
      const { data, error } = await query.order('sort_order', { ascending: true }).limit(100)
      if (!error && data) return data
      if (error) throw error
    } catch (error) {
      console.error('Erreur de chargement des pôles Supabase :', error)
    }
  }
  return localPoles
}

export function getPoles(includeUnpublished = false) {
  if (includeUnpublished) return loadPoles(true)
  return getCachedRequest('public:poles', () => loadPoles(false))
}

/**
 * Récupère les formations triées par institution (CFP d'abord) puis A-Z
 */
async function loadFormations(includeUnpublished) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('formations').select(FORMATION_COLUMNS)
      if (!includeUnpublished) query = query.eq('is_published', true)

      const results = (await fetchAllPages((from, to) => query.range(from, to), FORMATION_PAGE_SIZE))
        .map(mapFormation)
      return results.sort((a, b) => {
        if (a.institution !== b.institution) {
          return a.institution === 'cfp' ? -1 : 1
        }
        return (a.title || '').localeCompare(b.title || '', 'fr', { sensitivity: 'base' })
      })
    } catch (error) {
      console.error('Erreur de chargement des formations Supabase :', error)
    }
  }

  // Tri par institution (CFP avant ISSMIGA) puis alphabétique
  return [...localFormations].sort((a, b) => {
    if (a.institution !== b.institution) {
      return a.institution === 'cfp' ? -1 : 1
    }
    return (a.title || '').localeCompare(b.title || '', 'fr', { sensitivity: 'base' })
  })
}

export function getFormations(includeUnpublished = false) {
  if (includeUnpublished) return loadFormations(true)
  return getCachedRequest('public:formations', () => loadFormations(false))
}

export async function getFormationBySlug(slug) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('formations')
      .select(FORMATION_COLUMNS)
      .eq('slug', slug)
      .maybeSingle()
    if (error) throw error
    if (data) return mapFormation(data)
  }
  return localFormations.find((item) => item.slug === slug) ?? null
}

export function searchFormations(list, query = '', poleId = '', institution = 'all', level = 'all') {
  const q = (query || '').trim().toLowerCase()
  const items = Array.isArray(list) ? list : []

  const filtered = items.filter((item) => {
    if (!item) return false
    const poleOk = !poleId || item.poleId === poleId || item.pole_id === poleId
    const institutionOk = !institution || institution === 'all' || item.institution === institution
    const itemLevel = (item.level || '').toLowerCase()
    const itemDiploma = (item.diploma || '').toLowerCase()
    const filterLevel = (level || 'all').toLowerCase()
    const levelOk = filterLevel === 'all' || itemLevel === filterLevel || itemDiploma === filterLevel || itemDiploma.includes(filterLevel)
    const textOk = !q || (item.title || '').toLowerCase().includes(q) || (item.excerpt || '').toLowerCase().includes(q)
    return poleOk && institutionOk && levelOk && textOk
  })

  return sortAlphabetically(filtered)
}

/**
 * Récupère les formations à la carte triées A-Z
 */
export async function getCustomFormations(includeUnpublished = false) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('custom_formations').select(CUSTOM_FORMATION_COLUMNS)
      if (!includeUnpublished) query = query.eq('is_published', true)
      const orderedQuery = query.order('sort_order', { ascending: true })
      const data = await fetchAllPages((from, to) => orderedQuery.range(from, to), CUSTOM_FORMATION_PAGE_SIZE)
      return sortAlphabetically(data || [])
    } catch (error) {
      console.error('Erreur de chargement des formations à la carte :', error)
      throw error
    }
  }
  return []
}

export async function updateFormation(id, payload) {
  if (isSupabaseConfigured && supabase) {
    const isCustom = String(id).startsWith('custom-')
    const table = isCustom ? 'custom_formations' : 'formations'
    const dbPayload = {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      description: payload.description,
      is_published: payload.is_published,
      sort_order: parseInt(payload.sort_order || 0, 10),
      updated_at: new Date().toISOString()
    }
    if (!isCustom) {
      dbPayload.pole_id = payload.pole_id || payload.poleId
      dbPayload.level = payload.level
      dbPayload.institution = payload.institution
      dbPayload.duration = payload.duration
    }
    const columns = isCustom ? CUSTOM_FORMATION_COLUMNS : FORMATION_COLUMNS
    const { data, error } = await supabase.from(table).update(dbPayload).eq('id', id).select(columns).single()
    if (error) throw error
    invalidateCachedRequests('public:')
    return isCustom ? data : mapFormation(data)
  }
  return { ...payload, id }
}

export async function createFormation(payload) {
  if (isSupabaseConfigured && supabase) {
    const dbPayload = {
      id: payload.id || `form-${Date.now()}`,
      title: payload.title,
      slug: payload.slug,
      pole_id: payload.pole_id,
      level: payload.level,
      institution: payload.institution,
      duration: payload.duration,
      excerpt: payload.excerpt,
      description: payload.description,
      is_published: payload.is_published,
      sort_order: parseInt(payload.sort_order || 0, 10)
    }
    const { data, error } = await supabase
      .from('formations')
      .insert([dbPayload])
      .select(FORMATION_COLUMNS)
      .single()
    if (error) throw error
    invalidateCachedRequests('public:')
    return mapFormation(data)
  }
  return { ...payload, id: `form-${Date.now()}` }
}

export async function deleteFormation(id) {
  if (isSupabaseConfigured && supabase) {
    const table = String(id).startsWith('custom-') ? 'custom_formations' : 'formations'
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    invalidateCachedRequests('public:')
  }
  return true
}
