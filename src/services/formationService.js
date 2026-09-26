import { formations as localFormations } from '../data/formations'
import { poles as localPoles } from '../data/poles'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function mapFormation(row) {
  if (!row) return null
  return {
    id: row.id,
    poleId: row.pole_id ?? row.poleId,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    description: row.description,
    presentation: row.presentation || row.excerpt,
    level: row.level || 'BTS',
    diploma: row.diploma,
    institution: row.institution ?? 'cfp',
    duration: row.duration,
    skills: row.skills ?? [],
    outlets: row.outlets ?? [],
    contentStatus: row.content_status ?? row.contentStatus ?? 'title-only',
    isPublished: row.is_published ?? row.isPublished ?? true,
    sortOrder: row.sort_order ?? row.sortOrder ?? 0,
  }
}

export async function getPoles(includeUnpublished = false) {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('formation_poles').select('*')
      if (!includeUnpublished) {
        query = query.eq('is_published', true)
      }
      query = query.order('sort_order', { ascending: true })

      const { data, error } = await query
      if (!error && data) {
        return data.map((row) => ({
          id: row.id,
          slug: row.slug,
          name: row.name,
          tagline: row.tagline,
          description: row.description,
          sortOrder: row.sort_order,
          isPublished: row.is_published,
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  return localPoles
}

export async function getFormations(includeUnpublished = false) {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('formations').select('*')
      if (!includeUnpublished) {
        query = query.eq('is_published', true)
      }
      query = query.order('sort_order', { ascending: true })

      const { data, error } = await query
      if (!error && data) return data.map(mapFormation)
    } catch (e) {
      console.error(e)
    }
  }

  return localFormations
}

export async function getFormationBySlug(slug) {
  const all = await getFormations()
  return all.find((item) => item.slug === slug) ?? null
}

export function getFormationsByPole(list, poleId) {
  return list.filter((item) => item.poleId === poleId)
}

export function getFormationsByInstitution(list, institution) {
  if (!institution || institution === 'all') return list
  return list.filter((item) => item.institution === institution)
}

export function searchFormations(list, query, poleId, institution, level = 'all') {
  const q = query.trim().toLowerCase()
  return list.filter((item) => {
    const poleOk = !poleId || item.poleId === poleId
    const institutionOk = !institution || institution === 'all' || item.institution === institution
    const levelOk = !level || level === 'all' || (item.level && item.level.toLowerCase() === level.toLowerCase()) || (item.diploma && item.diploma.toLowerCase() === level.toLowerCase())
    const textOk =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.excerpt || '').toLowerCase().includes(q)
    return poleOk && institutionOk && levelOk && textOk
  })
}

// ADMIN CRUD FUNCTIONS FOR FORMATIONS

export async function createFormation(payload) {
  const formationId = payload.id || payload.slug || `form-${Date.now()}`
  const dbPayload = {
    id: formationId,
    slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: payload.title,
    excerpt: payload.excerpt || '',
    description: payload.description || '',
    presentation: payload.presentation || '',
    level: payload.level || 'BTS',
    diploma: payload.diploma || 'cqp',
    institution: payload.institution || 'cfp',
    duration: payload.duration || '1 an',
    skills: Array.isArray(payload.skills) ? payload.skills : [],
    outlets: Array.isArray(payload.outlets) ? payload.outlets : [],
    pole_id: payload.pole_id || payload.poleId,
    content_status: payload.content_status || payload.contentStatus || 'title-only',
    is_published: payload.is_published !== undefined ? payload.is_published : (payload.isPublished !== undefined ? payload.isPublished : true),
    sort_order: parseInt(payload.sort_order ?? payload.sortOrder ?? 0, 10),
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('formations')
      .insert([dbPayload])
      .select()
      .single()

    if (error) throw error
    return mapFormation(data)
  }

  return mapFormation(dbPayload)
}

export async function updateFormation(id, payload) {
  const dbPayload = {
    slug: payload.slug,
    title: payload.title,
    excerpt: payload.excerpt || '',
    description: payload.description || '',
    presentation: payload.presentation || '',
    level: payload.level || 'BTS',
    diploma: payload.diploma || 'cqp',
    institution: payload.institution || 'cfp',
    duration: payload.duration || '1 an',
    skills: Array.isArray(payload.skills) ? payload.skills : [],
    outlets: Array.isArray(payload.outlets) ? payload.outlets : [],
    pole_id: payload.pole_id || payload.poleId,
    content_status: payload.content_status || payload.contentStatus || 'title-only',
    is_published: payload.is_published !== undefined ? payload.is_published : (payload.isPublished !== undefined ? payload.isPublished : true),
    sort_order: parseInt(payload.sort_order ?? payload.sortOrder ?? 0, 10),
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('formations')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return mapFormation(data)
  }

  return { id, ...payload }
}

export async function deleteFormation(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('formations').delete().eq('id', id)
    if (error) throw error
  }
  return true
}

// ADMIN CRUD FUNCTIONS FOR POLES

export async function createPole(payload) {
  const poleId = payload.id || payload.slug || `pole-${Date.now()}`
  const dbPayload = {
    id: poleId,
    slug: payload.slug || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: payload.name,
    tagline: payload.tagline || '',
    description: payload.description || '',
    sort_order: parseInt(payload.sort_order || 0, 10),
    is_published: payload.is_published !== undefined ? payload.is_published : true,
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('formation_poles')
      .insert([dbPayload])
      .select()
      .single()

    if (error) throw error
    return data
  }
  return dbPayload
}

export async function updatePole(id, payload) {
  const dbPayload = {
    slug: payload.slug,
    name: payload.name,
    tagline: payload.tagline || '',
    description: payload.description || '',
    sort_order: parseInt(payload.sort_order || 0, 10),
    is_published: payload.is_published !== undefined ? payload.is_published : true,
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('formation_poles')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
  return { id, ...payload }
}

export async function deletePole(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('formation_poles').delete().eq('id', id)
    if (error) throw error
  }
  return true
}
