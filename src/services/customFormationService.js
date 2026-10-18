import { supabase, isSupabaseConfigured } from '../lib/supabase'

function mapCustom(row) {
  if (!row) return null
  return {
    ...row,
    isPublished: row.is_published,
    sortOrder: row.sort_order,
  }
}

export async function getCustomFormations(includeUnpublished = false) {
  if (isSupabaseConfigured) {
    let query = supabase.from('custom_formations').select('*')
    if (!includeUnpublished) query = query.eq('is_published', true)
    const { data, error } = await query.order('sort_order', { ascending: true })
    if (!error && data) return data.map(mapCustom)
  }
  return []
}

export async function updateCustomFormation(id, payload) {
  if (isSupabaseConfigured) {
    const dbPayload = {
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      description_3mois: payload.description_3mois,
      description_6mois: payload.description_6mois,
      description_9mois: payload.description_9mois,
      price_3mois: payload.price_3mois,
      price_6mois: payload.price_6mois,
      price_9mois: payload.price_9mois,
      is_published: payload.is_published,
      sort_order: parseInt(payload.sort_order || 0, 10),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('custom_formations')
      .update(dbPayload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return mapCustom(data)
  }
  return { ...payload, id }
}

export async function createCustomFormation(payload) {
  if (isSupabaseConfigured) {
    const dbPayload = {
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      description_3mois: payload.description_3mois,
      description_6mois: payload.description_6mois,
      description_9mois: payload.description_9mois,
      price_3mois: payload.price_3mois,
      price_6mois: payload.price_6mois,
      price_9mois: payload.price_9mois,
      is_published: payload.is_published,
      sort_order: parseInt(payload.sort_order || 0, 10)
    }

    const { data, error } = await supabase.from('custom_formations').insert([dbPayload]).select().single()
    if (error) throw error
    return mapCustom(data)
  }
  return { ...payload, id: `custom-${Date.now()}` }
}
