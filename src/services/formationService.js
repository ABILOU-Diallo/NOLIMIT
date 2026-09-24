import { formations as localFormations } from '../data/formations'
import { poles as localPoles } from '../data/poles'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

function mapFormation(row) {
  return {
    id: row.id,
    poleId: row.pole_id ?? row.poleId,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    description: row.description,
    diploma: row.diploma,
    institution: row.institution ?? 'cfp',
    duration: row.duration,
    skills: row.skills ?? [],
    outlets: row.outlets ?? [],
    contentStatus: row.content_status ?? row.contentStatus ?? 'title-only',
    isPublished: row.is_published,
    sortOrder: row.sort_order,
  }
}

export async function getPoles(includeUnpublished = false) {
  if (isSupabaseConfigured) {
    let query = supabase.from('formation_poles').select('*')
    if (!includeUnpublished) {
      query = query.eq('is_published', true)
    }
    query = query.order('sort_order', { ascending: true })

    const { data, error } = await query

    if (!error && data?.length) {
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
  }

  return localPoles
}

export async function getFormations(includeUnpublished = false) {
  if (isSupabaseConfigured) {
    let query = supabase.from('formations').select('*')
    if (!includeUnpublished) {
      query = query.eq('is_published', true)
    }
    query = query.order('sort_order', { ascending: true })

    const { data, error } = await query

    if (!error && data?.length) return data.map(mapFormation)
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

export function searchFormations(list, query, poleId, institution) {
  const q = query.trim().toLowerCase()
  return list.filter((item) => {
    const poleOk = !poleId || item.poleId === poleId
    const institutionOk = !institution || institution === 'all' || item.institution === institution
    const textOk =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.excerpt || '').toLowerCase().includes(q)
    return poleOk && institutionOk && textOk
  })
}

// ADMIN CRUD FUNCTIONS

export async function createFormation(payload) {
  const { data, error } = await supabase
    .from('formations')
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return mapFormation(data)
}

export async function updateFormation(id, payload) {
  const { data, error } = await supabase
    .from('formations')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return mapFormation(data)
}

export async function deleteFormation(id) {
  const { error } = await supabase.from('formations').delete().eq('id', id)
  if (error) throw error
}

export async function createPole(payload) {
  const { data, error } = await supabase
    .from('formation_poles')
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    sortOrder: data.sort_order,
    isPublished: data.is_published,
  }
}

export async function updatePole(id, payload) {
  const { data, error } = await supabase
    .from('formation_poles')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    sortOrder: data.sort_order,
    isPublished: data.is_published,
  }
}

export async function deletePole(id) {
  const { error } = await supabase.from('formation_poles').delete().eq('id', id)
  if (error) throw error
}
