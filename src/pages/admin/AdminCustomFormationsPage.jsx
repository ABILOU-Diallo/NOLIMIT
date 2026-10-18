import React, { useState, useEffect } from 'react';
import {
  getCustomFormations,
  getCategoryLabel,
  createFormation,
  updateFormation,
  deleteFormation,
  togglePublication,
  CATEGORY_LABELS
} from '../../services/customFormationService';
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

  const categories = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label
  }));

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setLoading(true);
      setError(null);
      // On utilise getCustomFormations(true) pour voir aussi les non-publiées en admin
      const data = await getCustomFormations(true);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFormation) {
        await updateFormation(editingFormation.id, formData);
      } else {
        await createFormation(formData);
      }
      handleCloseModal();
      loadFormations();
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      alert('Erreur lors de la sauvegarde.');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Supprimer définitivement ?')) return;
    try {
      await deleteFormation(id);
      loadFormations();
    } catch (err) {
      alert('Erreur lors de la suppression.');
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await togglePublication(id, !currentStatus);
      loadFormations();
    } catch (err) {
      alert('Erreur lors du changement de statut.');
    }
  };

  const groupedFormations = formations.reduce((acc, formation) => {
    const label = getCategoryLabel(formation.category);
    if (!acc[label]) acc[label] = [];
    acc[label].push(formation);
    return acc;
  }, {});

  if (loading) return <div style={{ padding: '2rem' }}>Chargement...</div>;

  return (
    <div className="admin-custom-formations-page" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1>Formations à la carte</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Nouveau</button>
      </div>

      {Object.entries(groupedFormations).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#64748b', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>{category}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '0.85rem', color: '#94a3b8' }}>
                <th style={{ padding: '0.75rem' }}>TITRE</th>
                <th style={{ padding: '0.75rem' }}>STATUT</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {items.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{f.title}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => handleToggle(f.id, f.is_published)}
                      style={{
                        padding: '0.2rem 0.6rem', borderRadius: '12px', border: 'none', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                        background: f.is_published ? '#dcfce7' : '#fee2e2',
                        color: f.is_published ? '#166534' : '#991b1b'
                      }}
                    >
                      {f.is_published ? 'PUBLIÉ' : 'BROUILLON'}
                    </button>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button onClick={() => handleOpenModal(f)} style={{ marginRight: '0.5rem', color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer' }}>Modifier</button>
                    <button onClick={() => handleDeleteItem(f.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer' }}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2>{editingFormation ? 'Modifier' : 'Ajouter'} une formation</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <input
                placeholder="Titre" required
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
              <select
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              >
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <textarea placeholder="Description 3 mois" value={formData.description_3mois} onChange={e => setFormData({...formData, description_3mois: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <textarea placeholder="Description 6 mois" value={formData.description_6mois} onChange={e => setFormData({...formData, description_6mois: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <textarea placeholder="Description 9 mois" value={formData.description_9mois} onChange={e => setFormData({...formData, description_9mois: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <label><input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} /> Publier immédiatement</label>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" style={{ flex: 1, padding: '0.75rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Enregistrer</button>
              <button type="button" onClick={handleCloseModal} style={{ flex: 1, padding: '0.75rem', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminCustomFormationsPage;
