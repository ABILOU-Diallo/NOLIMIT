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
    duration: row.duration,
    skills: row.skills ?? [],
    outlets: row.outlets ?? [],
    contentStatus: row.content_status ?? row.contentStatus ?? 'title-only',
  }
}

export async function getPoles() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('formation_poles')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (!error && data?.length) {
      return data.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        tagline: row.tagline,
        description: row.description,
        sortOrder: row.sort_order,
      }))
    }
  }

  return localPoles
}

export async function getFormations() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('formations')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

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

export function searchFormations(list, query, poleId) {
  const q = query.trim().toLowerCase()
  return list.filter((item) => {
    const poleOk = !poleId || item.poleId === poleId
    const textOk =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.excerpt || '').toLowerCase().includes(q)
    return poleOk && textOk
  })
}
