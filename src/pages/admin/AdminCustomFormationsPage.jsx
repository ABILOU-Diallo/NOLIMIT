import React, { useState, useEffect } from 'react';
import customFormationService from '../../services/customFormationService';
import './AdminCustomFormationsPage.css';

/**
 * Page admin pour gérer les formations à la carte
 */
const AdminCustomFormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'beaute-esthetique-coiffure',
    description_3mois: '',
    description_6mois: '',
    description_9mois: '',
    faisabilite: '',
    is_published: false
  });

  const categories = [
    { value: 'beaute-esthetique-coiffure', label: 'Beauté esthétique et coiffure' },
    { value: 'administration-commerce-gestion', label: 'Administration commerce et gestion' },
    { value: 'informatique-creation-numerique', label: 'Informatique création et numérique' },
    { value: 'hotellerie-restauration-services', label: 'Hôtellerie restauration et services' },
    { value: 'autres-prestations-services', label: 'Autres prestations/services' }
  ];

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customFormationService.getAllFormations();
      setFormations(data);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Impossible de charger les formations.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (formation = null) => {
    if (formation) {
      setEditingFormation(formation);
      setFormData({
        title: formation.title,
        category: formation.category,
        description_3mois: formation.description_3mois,
        description_6mois: formation.description_6mois,
        description_9mois: formation.description_9mois,
        faisabilite: formation.faisabilite,
        is_published: formation.is_published
      });
    } else {
      setEditingFormation(null);
      setFormData({
        title: '',
        category: 'beaute-esthetique-coiffure',
        description_3mois: '',
        description_6mois: '',
        description_9mois: '',
        faisabilite: '',
        is_published: false
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFormation(null);
    setFormData({
      title: '',
      category: 'beaute-esthetique-coiffure',
      description_3mois: '',
      description_6mois: '',
      description_9mois: '',
      faisabilite: '',
      is_published: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFormation) {
        await customFormationService.updateFormation(editingFormation.id, formData);
      } else {
        await customFormationService.createFormation(formData);
      }
      handleCloseModal();
      loadFormations();
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      return;
    }
    try {
      await customFormationService.deleteFormation(id);
      loadFormations();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression.');
    }
  };

  const handleTogglePublication = async (id, isPublished) => {
    try {
      await customFormationService.togglePublication(id, isPublished);
      loadFormations();
    } catch (err) {
      console.error('Erreur lors de la modification:', err);
      alert('Erreur lors de la modification.');
    }
  };

  const groupedFormations = formations.reduce((acc, formation) => {
    const categoryLabel = customFormationService.getCategoryLabel(formation.category);
    if (!acc[categoryLabel]) {
      acc[categoryLabel] = [];
    }
    acc[categoryLabel].push(formation);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="admin-custom-formations-page">
        <div className="container">
          <div className="loading">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-custom-formations-page">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-custom-formations-page">
      <div className="container">
        <div className="page-header">
          <h1>Gestion des formations à la carte</h1>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal()}
          >
            + Nouvelle formation
          </button>
        </div>

        <div className="formations-container">
          {Object.entries(groupedFormations).map(([category, formations]) => (
            <div key={category} className="category-section">
              <h2 className="category-heading">{category}</h2>
              <div className="formations-table-wrapper">
                <table className="formations-table">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Publié</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formations.map(formation => (
                      <tr key={formation.id}>
                        <td>{formation.title}</td>
                        <td>
                          <button
                            className={`status-badge ${formation.is_published ? 'published' : 'draft'}`}
                            onClick={() => handleTogglePublication(formation.id, !formation.is_published)}
                          >
                            {formation.is_published ? 'Publié' : 'Brouillon'}
                          </button>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-sm btn-edit"
                              onClick={() => handleOpenModal(formation)}
                            >
                              Modifier
                            </button>
                            <button
                              className="btn btn-sm btn-delete"
                              onClick={() => handleDelete(formation.id)}
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <h2 className="modal-title">
              {editingFormation ? 'Modifier la formation' : 'Nouvelle formation'}
            </h2>
            
            <form onSubmit={handleSubmit} className="formation-form">
              <div className="form-group">
                <label htmlFor="title">Titre *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Catégorie *</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description_3mois">Description 3 mois *</label>
                <textarea
                  id="description_3mois"
                  value={formData.description_3mois}
                  onChange={(e) => setFormData({...formData, description_3mois: e.target.value})}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_6mois">Description 6 mois *</label>
                <textarea
                  id="description_6mois"
                  value={formData.description_6mois}
                  onChange={(e) => setFormData({...formData, description_6mois: e.target.value})}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_9mois">Description 9 mois *</label>
                <textarea
                  id="description_9mois"
                  value={formData.description_9mois}
                  onChange={(e) => setFormData({...formData, description_9mois: e.target.value})}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="faisabilite">Faisabilité *</label>
                <textarea
                  id="faisabilite"
                  value={formData.faisabilite}
                  onChange={(e) => setFormData({...formData, faisabilite: e.target.value})}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                  />
                  Publier cette formation
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingFormation ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomFormationsPage;
