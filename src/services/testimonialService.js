import { supabase, isSupabaseConfigured } from '../lib/supabase'

export async function getApprovedTestimonials() {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getAllTestimonials() {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function createTestimonial(payload) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTestimonial(id, payload) {
  const { data, error } = await supabase
    .from('testimonials')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTestimonial(id) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}
