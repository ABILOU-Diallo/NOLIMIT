import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getCachedRequest, invalidateCachedRequests, fetchAllPages } from '../utils/requestCache'

const CUSTOM_FORMATION_COLUMNS = 'id,slug,title,category,description_3mois,description_6mois,description_9mois,faisabilite,is_published,sort_order,created_at,updated_at'
const PAGE_SIZE = 200

export const CATEGORY_LABELS = {
  'all': 'Toutes les formations',
  'beaute-esthetique-coiffure': 'Beauté esthétique et coiffure',
  'administration-commerce-gestion': 'Administration commerce et gestion',
  'informatique-creation-numerique': 'Informatique création et numérique',
  'hotellerie-restauration-services': 'Hôtellerie restauration et services',
  'autres-prestations-services': 'Autres prestations/services'
};

function mapCustom(row) {
  if (!row) return null
  return {
    ...row,
    isPublished: row.is_published,
    sortOrder: row.sort_order,
  }
}

async function loadCustomFormations(includeUnpublished = false) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('custom_formations').select(CUSTOM_FORMATION_COLUMNS)
      if (!includeUnpublished) query = query.eq('is_published', true)
      const orderedQuery = query.order('sort_order', { ascending: true })
      const data = await fetchAllPages((from, to) => orderedQuery.range(from, to), PAGE_SIZE)
      return (data || []).map(mapCustom)
    } catch (e) {
      console.error('Erreur de chargement des formations à la carte :', e)
      throw e
    }
  }
  return []
}

export function getCustomFormations(includeUnpublished = false) {
  if (includeUnpublished) return loadCustomFormations(true)
  return getCachedRequest('public:custom-formations', () => loadCustomFormations(false))
}

export async function getPublishedFormations() {
  return getCustomFormations(false);
}

export async function getFormationsByCategory(category) {
  const all = await getPublishedFormations();
  if (category === 'all') return all;
  return all.filter(f => f.category === category);
}

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

export async function createFormation(payload) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('custom_formations')
      .insert([payload])
      .select(CUSTOM_FORMATION_COLUMNS)
      .single()
    if (error) throw error
    invalidateCachedRequests('public:')
    return mapCustom(data)
  }
  return { ...payload, id: `custom-${Date.now()}` }
}

export async function updateFormation(id, payload) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('custom_formations')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select(CUSTOM_FORMATION_COLUMNS)
      .single()

    if (error) throw error
    invalidateCachedRequests('public:')
    return mapCustom(data)
  }
  return { ...payload, id }
}

export async function deleteFormation(id) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('custom_formations').delete().eq('id', id)
    if (error) throw error
    invalidateCachedRequests('public:')
  }
  return true
}

export async function togglePublication(id, is_published) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('custom_formations').update({ is_published }).eq('id', id)
    if (error) throw error
    invalidateCachedRequests('public:')
  }
  return true
}
