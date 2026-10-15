import { supabase } from '../lib/supabase';

export const orientationService = {
  async submitRequest(payload) {
    const { data, error } = await supabase
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
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAllRequests() {
    const { data, error } = await supabase
      .from('orientation_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateRequestStatus(id, status, adminNotes = '') {
    const { data, error } = await supabase
      .from('orientation_requests')
      .update({
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteRequest(id) {
    const { error } = await supabase
      .from('orientation_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

export default orientationService;
