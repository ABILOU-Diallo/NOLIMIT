import { supabase, isSupabaseConfigured } from '../lib/supabase'

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

export async function getCustomFormations(includeUnpublished = false) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('custom_formations').select('*')
      if (!includeUnpublished) query = query.eq('is_published', true)
      const { data, error } = await query.order('sort_order', { ascending: true })
      if (error) throw error
      return (data || []).map(mapCustom)
    } catch (e) {
      console.error("Erreur custom formations:", e)
      return []
    }
  }
  return []
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
    const { data, error } = await supabase.from('custom_formations').insert([payload]).select().single()
    if (error) throw error
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
      .select()
      .single()

    if (error) throw error
    return mapCustom(data)
  }
  return { ...payload, id }
}

export async function deleteFormation(id) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('custom_formations').delete().eq('id', id)
    if (error) throw error
  }
  return true
}

export async function togglePublication(id, is_published) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('custom_formations').update({ is_published }).eq('id', id)
    if (error) throw error
  }
  return true
}
