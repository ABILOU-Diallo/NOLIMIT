import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { getCachedRequest, invalidateCachedRequests, fetchAllPages } from '../utils/requestCache'

const TESTIMONIAL_COLUMNS = 'id,author_name,author_role,quote,is_approved,sort_order'
const TESTIMONIAL_ADMIN_PAGE_SIZE = 200

async function loadApprovedTestimonials() {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('testimonials')
    .select(TESTIMONIAL_COLUMNS)
    .eq('is_approved', true)
    .order('sort_order', { ascending: true })
    .limit(20)

  if (error) throw error
  return data ?? []
}

export function getApprovedTestimonials() {
  return getCachedRequest('public:testimonials', loadApprovedTestimonials)
}

export async function getAllTestimonials() {
  if (!isSupabaseConfigured) return []

  return fetchAllPages((from, to) => supabase
    .from('testimonials')
    .select(TESTIMONIAL_COLUMNS)
    .order('sort_order', { ascending: true })
    .range(from, to), TESTIMONIAL_ADMIN_PAGE_SIZE)
}

export async function createTestimonial(payload) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([payload])
    .select(TESTIMONIAL_COLUMNS)
    .single()

  if (error) throw error
  invalidateCachedRequests('public:')
  return data
}

export async function updateTestimonial(id, payload) {
  const { data, error } = await supabase
    .from('testimonials')
    .update(payload)
    .eq('id', id)
    .select(TESTIMONIAL_COLUMNS)
    .single()

  if (error) throw error
  invalidateCachedRequests('public:')
  return data
}

export async function deleteTestimonial(id) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
  invalidateCachedRequests('public:')
}
