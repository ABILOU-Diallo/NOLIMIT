import { supabase } from '../lib/supabase';
import { fetchAllPages } from '../utils/requestCache'

export async function submitRequest(payload) {
  if (!supabase) throw new Error('Le service de demandes est indisponible.')
  const { error } = await supabase
    .from('orientation_requests')
    .insert([{
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      formation_title: payload.formationTitle,
      formation_slug: payload.formationSlug,
      preferred_duration: payload.preferredDuration,
      message: payload.message,
      status: 'pending'
    }]);

  if (error) throw error;
  return { ok: true };
}

export async function getAllRequests() {
  if (!supabase) throw new Error('Le service de demandes est indisponible.')
  return fetchAllPages((from, to) => supabase
    .from('orientation_requests')
    .select('id,full_name,email,phone,city,formation_title,formation_slug,preferred_duration,message,status,admin_notes,created_at,updated_at')
    .order('created_at', { ascending: false })
    .range(from, to))
}

export async function updateRequestStatus(id, status, adminNotes = '') {
  if (!supabase) throw new Error('Le service de demandes est indisponible.')
  const { error } = await supabase
    .from('orientation_requests')
    .update({
      status,
      admin_notes: adminNotes,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw error;
  return true;
}

export async function deleteRequest(id) {
  if (!supabase) throw new Error('Le service de demandes est indisponible.')
  const { error } = await supabase
    .from('orientation_requests')
    .delete().eq('id', id);

  if (error) throw error;
  return true;
}
