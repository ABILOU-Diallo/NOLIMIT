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
