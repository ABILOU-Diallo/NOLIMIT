import React, { useState, useEffect } from 'react';
import customFormationService from '../../services/customFormationService';
import './CustomFormationsSection.css';

/**
 * Section affichant les formations à la carte pour les utilisateurs
 */
const CustomFormationsSection = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormation, setSelectedFormation] = useState(null);

  const categories = [
    { value: 'all', label: 'Toutes les formations' },
    { value: 'beaute-esthetique-coiffure', label: 'Beauté esthétique et coiffure' },
    { value: 'administration-commerce-gestion', label: 'Administration commerce et gestion' },
    { value: 'informatique-creation-numerique', label: 'Informatique création et numérique' },
    { value: 'hotellerie-restauration-services', label: 'Hôtellerie restauration et services' },
    { value: 'autres-prestations-services', label: 'Autres prestations/services' }
  ];

  useEffect(() => {
    loadFormations();
  }, [selectedCategory]);

  const loadFormations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (selectedCategory === 'all') {
        data = await customFormationService.getPublishedFormations();
      } else {
        data = await customFormationService.getFormationsByCategory(selectedCategory);
      }
      
      setFormations(data);
    } catch (err) {
      console.error('Erreur lors du chargement des formations:', err);
      setError('Impossible de charger les formations. Veuillez réessayer.');
    } finally {
      setLoading(false);
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

  const handleFormationClick = (formation) => {
    setSelectedFormation(formation);
  };

  const handleCloseModal = () => {
    setSelectedFormation(null);
  };

  if (loading) {
    return (
      <section className="custom-formations-section">
        <div className="container">
          <div className="loading">Chargement des formations...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="custom-formations-section">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="custom-formations-section">
      <div className="container">
        <div className="section-header">
          <h2>Formations professionnelles à la carte</h2>
          <p className="section-subtitle">
            ORIENTATION – FORMATION – EMPLOYABILITÉ
          </p>
          <p className="section-description">
            Au CFP NO LIMIT, chaque apprenant peut construire un parcours adapté à son projet professionnel. 
            Nos formations combinent apprentissage guidé, pratique et réalisations concrètes.
          </p>
        </div>

        <div className="filter-bar">
          <label htmlFor="category-filter">Filtrer par catégorie :</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="formations-grid">
          {Object.entries(groupedFormations).map(([category, formations]) => (
            <div key={category} className="category-group">
              <h3 className="category-title">{category}</h3>
              <div className="formations-list">
                {formations.map(formation => (
                  <div
                    key={formation.id}
                    className="formation-card"
                    onClick={() => handleFormationClick(formation)}
                  >
                    <h4 className="formation-title">{formation.title}</h4>
                    <div className="formation-durations">
                      <span className="duration-badge">3 mois</span>
                      <span className="duration-badge">6 mois</span>
                      <span className="duration-badge">9 mois</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="info-section">
          <h3>Un parcours adapté à vos besoins</h3>
          <p>
            Vous souhaitez découvrir une compétence, renforcer votre expérience, trouver un emploi 
            ou développer votre propre activité ? Nos services d'orientation vous aident à choisir 
            la filière, la durée, le rythme et les modules qui correspondent à votre situation.
          </p>
          <p>
            Pour connaître le coût réel de votre formation, rapprochez-vous des services du CFP NO LIMIT. 
            Après étude de vos besoins et de votre parcours, notre équipe vous communiquera une 
            proposition personnalisée, avec le détail des prestations et des éventuels équipements 
            ou consommables nécessaires.
          </p>
          <p className="contact-info">
            <strong>Contactez le CFP NO LIMIT</strong> pour un entretien d'orientation et pour connaître 
            les prochaines sessions.
          </p>
        </div>
      </div>

      {selectedFormation && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <h2 className="modal-title">{selectedFormation.title}</h2>
            
            <div className="duration-options">
              <div className="duration-option">
                <h4>3 mois</h4>
                <p>{selectedFormation.description_3mois}</p>
              </div>
              <div className="duration-option">
                <h4>6 mois</h4>
                <p>{selectedFormation.description_6mois}</p>
              </div>
              <div className="duration-option">
                <h4>9 mois</h4>
                <p>{selectedFormation.description_9mois}</p>
              </div>
            </div>

            <div className="faisabilite-section">
              <h4>Faisabilité</h4>
              <p>{selectedFormation.faisabilite}</p>
            </div>

            <button className="contact-button">
              Demander un entretien d'orientation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomFormationsSection;
