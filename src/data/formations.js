const base = {
  skills: [],
  outlets: [],
  diploma: 'cqp',
  duration: '1 an',
  contentStatus: 'title-only',
}

function formation(poleId, slug, title, diploma = 'cqp', institution = 'cfp', duration = null) {
  const defaultDuration = institution === 'issmiga' ? (diploma === 'bts' ? '2 ans' : '3 ans') : '1 an'
  return {
    ...base,
    id: slug,
    poleId,
    slug,
    title,
    diploma,
    institution, // 'cfp' | 'issmiga'
    duration: duration || defaultDuration,
    excerpt: null,
    description: null,
  }
}

export const formations = [
  // ==========================================
  // CFP NO LIMIT — Diplômes Professionnels (CQP / DQP)
  // ==========================================

  // Numérique & IT — CFP NO LIMIT
  formation('numerique-it', 'developpement-web-mobile', 'Développement web et mobile', 'dqp', 'cfp'),
  formation('numerique-it', 'developpement-mern', 'Développement d’application web full stack MERN', 'dqp', 'cfp'),
  formation('numerique-it', 'technologies-web-avancees', 'Technologies web avancées', 'dqp', 'cfp'),
  formation('numerique-it', 'webmaster', 'Webmaster', 'cqp', 'cfp'),
  formation('numerique-it', 'developpement-applications-mobiles', 'Développement des applications mobiles', 'dqp', 'cfp'),
  formation('numerique-it', 'genie-logiciel-cfp', 'Génie logiciel (Pratique)', 'dqp', 'cfp'),
  formation('numerique-it', 'analyse-conception-systemes', 'Analyse et conception des systèmes', 'dqp', 'cfp'),
  formation('numerique-it', 'maintenance-systemes-reseaux', 'Maintenance des systèmes et réseaux informatiques', 'cqp', 'cfp'),
  formation('numerique-it', 'analyse-des-donnees', 'Analyse des données', 'dqp', 'cfp'),
  formation('numerique-it', 'business-intelligence', 'Business intelligence', 'dqp', 'cfp'),
  formation('numerique-it', 'internet-des-objets', 'Internet des objets (IoT)', 'dqp', 'cfp'),
  formation('numerique-it', 'intelligence-artificielle', 'Intelligence artificielle', 'dqp', 'cfp'),
  formation('numerique-it', 'administration-bases-de-donnees', 'Administration et optimisation des bases de données', 'dqp', 'cfp'),
  formation('numerique-it', 'bases-de-donnees-avancees', 'Bases de données avancées', 'dqp', 'cfp'),
  formation('numerique-it', 'transformation-digitale', 'Transformation digitale', 'cqp', 'cfp'),
  formation('numerique-it', 'veille-technologique', 'Veille technologique', 'cqp', 'cfp'),
  formation('numerique-it', 'systemes-intelligents', 'Systèmes intelligents', 'dqp', 'cfp'),
  formation('numerique-it', 'gestion-projet-informatique', 'Gestion de projet informatique', 'cqp', 'cfp'),
  formation('numerique-it', 'supervision-systemes-information', 'Supervision des systèmes d’information', 'dqp', 'cfp'),

  // Cybersécurité — CFP NO LIMIT
  formation('cybersecurite', 'architecte-gestion-cybersecurite', 'Architecte et gestion de la cybersécurité', 'dqp', 'cfp'),
  formation('cybersecurite', 'analyse-cybersecurite', 'Analyse et cybersécurité', 'dqp', 'cfp'),
  formation('cybersecurite', 'administration-systemes-reseaux', 'Administration systèmes et réseaux', 'cqp', 'cfp'),
  formation('cybersecurite', 'securite-reseaux', 'Sécurité et réseaux', 'cqp', 'cfp'),
  formation('cybersecurite', 'securite-systemes-information', 'Sécurité des systèmes d’information', 'dqp', 'cfp'),
  formation('cybersecurite', 'audit-controle-systemes', 'Audit et contrôle des systèmes informatiques', 'dqp', 'cfp'),

  // Gestion & Administration — CFP NO LIMIT
  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat comptable', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-bureautique-bilingue', 'Secrétariat bureautique bilingue', 'cqp', 'cfp'),
  formation('gestion-administration', 'assistante-direction-bilingue', 'Secrétariat assistante de direction bilingue', 'cqp', 'cfp'),
  formation('gestion-administration', 'entreprenariat', 'Entreprenariat', 'cqp', 'cfp'),
  formation('gestion-administration', 'architecture-entreprise', 'Architecture d’entreprise', 'dqp', 'cfp'),
  formation('gestion-administration', 'e-business-marketing-digital', 'E-business et marketing digital', 'cqp', 'cfp'),
  formation('gestion-administration', 'finance-cfp', 'Finance (Pratique)', 'cqp', 'cfp'),
  formation('gestion-administration', 'audit-fiscal', 'Audit fiscal', 'dqp', 'cfp'),
  formation('gestion-administration', 'commerce-vente-cfp', 'Commerce et vente (Techniques)', 'cqp', 'cfp'),
  formation('gestion-administration', 'management-gouvernance', 'Management et gouvernance d’entreprise', 'dqp', 'cfp'),

  // Métiers Créatifs & de Service — CFP NO LIMIT
  formation('creatif-service', 'infographie', 'Infographie', 'cqp', 'cfp'),
  formation('creatif-service', 'montage-audiovisuel', 'Montage audiovisuel', 'cqp', 'cfp'),
  formation('creatif-service', 'motion-design', 'Motion design', 'cqp', 'cfp'),

  // Santé, QHSE & Social — CFP NO LIMIT
  formation('sante-qhse-social', 'vente-en-pharmacie', 'Vente en pharmacie', 'cqp', 'cfp'),
  formation('sante-qhse-social', 'qhse', 'Gestion qualité, hygiène, sécurité et environnement', 'dqp', 'cfp'),


  // ==========================================
  // ISSMIGA — Enseignement Supérieur (BTS / Licence / Master)
  // ==========================================

  // 1. Gestion / Management — ISSMIGA
  formation('gestion-administration', 'gestion-collectivites-territoriales', 'Gestion des collectivités territoriales', 'bts', 'issmiga'),
  formation('gestion-administration', 'assurance', 'Assurance', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-logistique-transport', 'Gestion logistique et transport', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-qualite-issmiga', 'Gestion de la qualité', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-projets-issmiga', 'Gestion des projets', 'bts', 'issmiga'),
  formation('gestion-administration', 'ressources-humaines', 'Gestion des ressources humaines', 'bts', 'issmiga'),
  formation('gestion-administration', 'banque-finances', 'Banque et finances', 'bts', 'issmiga'),
  formation('gestion-administration', 'comptabilite-gestion-entreprises', 'Comptabilité et gestion des entreprises', 'bts', 'issmiga'),
  formation('gestion-administration', 'microfinance', 'Microfinance', 'bts', 'issmiga'),

  // 2. Commerce-Vente / Business and Finance — ISSMIGA
  formation('gestion-administration', 'commerce-international', 'Commerce International', 'bts', 'issmiga'),
  formation('gestion-administration', 'marketing-commerce-vente', 'Marketing, Commerce et Vente', 'bts', 'issmiga'),

  // 3. Tourisme, Hôtellerie et Restauration — ISSMIGA
  formation('creatif-service', 'hotellerie', 'Hôtellerie', 'bts', 'issmiga'),
  formation('creatif-service', 'gestion-management-hoteliers', 'Gestion et management hôteliers', 'bts', 'issmiga'),
  formation('creatif-service', 'management-technique-hebergement', 'Management et technique d’hébergement', 'bts', 'issmiga'),
  formation('creatif-service', 'restauration', 'Restauration', 'bts', 'issmiga'),
  formation('creatif-service', 'genie-culinaire', 'Génie culinaire', 'bts', 'issmiga'),
  formation('creatif-service', 'commercialisation-services-restauration', 'Commercialisation et services de restauration', 'bts', 'issmiga'),
  formation('creatif-service', 'tourisme-loisirs', 'Tourisme et loisirs', 'bts', 'issmiga'),
  formation('creatif-service', 'management-touristique', 'Management touristique', 'bts', 'issmiga'),

  // 4. Carrières Juridiques — ISSMIGA
  formation('gestion-administration', 'droit-affaires-entreprise', 'Droit des affaires et de l’entreprise', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-fiscale', 'Gestion fiscale', 'bts', 'issmiga'),
  formation('gestion-administration', 'douane-transit', 'Douane et transit', 'bts', 'issmiga'),

  // 5. Réseaux et Télécommunications — ISSMIGA
  formation('cybersecurite', 'telecommunications', 'Télécommunications', 'bts', 'issmiga'),
  formation('cybersecurite', 'reseaux-securite-issmiga', 'Réseaux et Sécurité', 'bts', 'issmiga'),

  // 6. Génie Informatique — ISSMIGA
  formation('numerique-it', 'genie-logiciel-bts', 'Génie logiciel', 'bts', 'issmiga'),
  formation('numerique-it', 'informatique-industrielle-automatisme', 'Informatique industrielle et automatisme', 'bts', 'issmiga'),
  formation('numerique-it', 'maintenance-systemes-informatiques', 'Maintenance des systèmes informatiques', 'bts', 'issmiga'),
  formation('numerique-it', 'ecommerce-marketing-numerique', 'E-Commerce et Marketing numérique', 'bts', 'issmiga'),

  // 7. Économie et entrepreneuriat social / Home Economics — ISSMIGA
  formation('sante-qhse-social', 'esthetique-cosmetique-coiffure', 'Esthétique, Cosmétique et Coiffure', 'bts', 'issmiga'),
  formation('sante-qhse-social', 'puericulture-gerontologie-auxiliaire', 'Puériculture, Gérontologie et Auxiliaire de vie', 'bts', 'issmiga'),
  formation('sante-qhse-social', 'economie-entrepreneuriat-social', 'Économie et entrepreneuriat social', 'bts', 'issmiga'),
]
