import { supabase } from '../lib/supabase';

/**
 * Service pour gérer les formations à la carte
 */
export const customFormationService = {
  /**
   * Récupérer toutes les formations à la carte publiées
   */
  async getPublishedFormations() {
    const { data, error } = await supabase
      .from('custom_formations')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer toutes les formations à la carte (admin)
   */
  async getAllFormations() {
    const { data, error } = await supabase
      .from('custom_formations')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer une formation par son slug
   */
  async getFormationBySlug(slug) {
    const { data, error } = await supabase
      .from('custom_formations')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer les formations par catégorie
   */
  async getFormationsByCategory(category) {
    const { data, error } = await supabase
      .from('custom_formations')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Créer une nouvelle formation (admin)
   */
  async createFormation(formation) {
    const { data, error } = await supabase
      .from('custom_formations')
      .insert({
        ...formation,
        slug: formation.slug || this.generateSlug(formation.title),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mettre à jour une formation (admin)
   */
  async updateFormation(id, updates) {
    const { data, error } = await supabase
      .from('custom_formations')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Supprimer une formation (admin)
   */
  async deleteFormation(id) {
    const { error } = await supabase
      .from('custom_formations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  /**
   * Publier/dépublier une formation (admin)
   */
  async togglePublication(id, isPublished) {
    const { data, error } = await supabase
      .from('custom_formations')
      .update({
        is_published: isPublished,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Réorganiser l'ordre des formations (admin)
   */
  async reorderFormations(formations) {
    const updates = formations.map((formation, index) => ({
      id: formation.id,
      sort_order: index
    }));

    const { error } = await supabase
      .from('custom_formations')
      .upsert(updates);

    if (error) throw error;
    return true;
  },

  /**
   * Générer un slug à partir d'un titre
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  },

  /**
   * Obtenir le libellé de la catégorie
   */
  getCategoryLabel(category) {
    const labels = {
      'beaute-esthetique-coiffure': 'Beauté esthétique et coiffure',
      'administration-commerce-gestion': 'Administration commerce et gestion',
      'informatique-creation-numerique': 'Informatique création et numérique',
      'hotellerie-restauration-services': 'Hôtellerie restauration et services',
      'autres-prestations-services': 'Autres prestations/services'
    };
    return labels[category] || category;
  }
};

export default customFormationService;
