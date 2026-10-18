import { formations as localFormations } from '../data/formations'
import { poles as localPoles } from '../data/poles'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function mapFormation(row) {
  if (!row) return null
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
    skills: Array.isArray(row.skills) ? row.skills : [],
    outlets: Array.isArray(row.outlets) ? row.outlets : [],
    isPublished: row.is_published ?? true,
    sortOrder: row.sort_order ?? 0,
  }
}

export async function getPoles(includeUnpublished = false) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('formation_poles').select('*')
      if (!includeUnpublished) query = query.eq('is_published', true)
      const { data, error } = await query.order('sort_order', { ascending: true })
      if (!error && data) return data
    } catch (e) {
      console.warn("Erreur réseau Supabase (Pôles), utilisation des données locales.");
    }
  }
  return localPoles
}

export async function getFormations(includeUnpublished = false) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('formations').select('*')
      if (!includeUnpublished) query = query.eq('is_published', true)
      const { data, error } = await query.order('sort_order', { ascending: true })
      if (!error && data) return data.map(mapFormation)
    } catch (e) {
      console.warn("Erreur réseau Supabase (Formations), utilisation des données locales.");
    }
  }
  return localFormations
}

export async function getFormationBySlug(slug) {
  const all = await getFormations(true)
  return all.find((item) => item.slug === slug) ?? null
}

export function searchFormations(list, query = '', poleId = '', institution = 'all', level = 'all') {
  const q = (query || '').trim().toLowerCase()
  const items = Array.isArray(list) ? list : []

  return items.filter((item) => {
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
}

export async function getCustomFormations(includeUnpublished = false) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('custom_formations').select('*')
      if (!includeUnpublished) query = query.eq('is_published', true)
      const { data, error } = await query.order('sort_order', { ascending: true })
      if (!error && data) return data
    } catch (e) {
      console.warn("Erreur réseau Supabase (Custom Formations).");
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
    const { data, error } = await supabase.from(table).update(dbPayload).eq('id', id).select().single()
    if (error) throw error
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
      presentation: payload.presentation,
      is_published: payload.is_published,
      sort_order: parseInt(payload.sort_order || 0, 10)
    }
    const { data, error } = await supabase.from('formations').insert([dbPayload]).select().single()
    if (error) throw error
    return mapFormation(data)
  }
  return { ...payload, id: `form-${Date.now()}` }
}

export async function deleteFormation(id) {
  if (isSupabaseConfigured && supabase) {
    const table = String(id).startsWith('custom-') ? 'custom_formations' : 'formations'
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
  }
  return true
}
