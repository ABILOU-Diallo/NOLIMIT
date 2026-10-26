const base = {
  skills: [],
  outlets: [],
  contentStatus: 'title-only',
}

const DIPLOMA_NAMES = {
  cqp: 'Certificat de Qualification Professionnel (CQP)',
  dqp: 'Diplôme de Qualification Professionnel (DQP)',
  bts: 'Brevet de Technicien Supérieur (BTS)',
  licence: 'Licence Professionnelle',
  master: 'Master Professionnel',
}

function formation(poleId, slug, title, diploma = 'cqp', institution = 'cfp', duration = null, excerpt = null) {
  return {
    ...base,
    id: slug,
    poleId,
    slug,
    title,
    diploma,
    diplomaName: DIPLOMA_NAMES[diploma] || diploma,
    institution,
    duration: duration || (diploma === 'bts' ? '2 ans' : '1 an'),
    excerpt,
  }
}

export const allFormations = [
  // --- CFP NO LIMIT (CQP / DQP) ---
  // A. Secrétariat et gestion administrative
  formation('gestion-administration', 'secretariat-bureautique', 'Secrétariat bureautique', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-bureautique-bilingue', 'Secrétariat bureautique bilingue', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat comptable', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-assistante-direction', 'Secrétariat assistant de direction', 'cqp', 'cfp'),
  formation('gestion-administration', 'assistant-manager', 'Assistant Manager', 'cqp', 'cfp'),
  formation('gestion-administration', 'ressources-humaines', 'Ressources humaines', 'cqp', 'cfp'),
  formation('gestion-administration', 'microfinance-gestion-projets', 'Microfinance et gestion des projets', 'cqp', 'cfp'),
  formation('gestion-administration', 'fiscalite-audit', 'Fiscalité et audit', 'cqp', 'cfp'),

  // B. Informatique et développement
  formation('numerique-it', 'maintenance-informatique', 'Maintenance informatique', 'cqp', 'cfp'),
  formation('numerique-it', 'maintenance-reseaux-informatiques', 'Maintenance de réseaux informatiques', 'cqp', 'cfp'),
  formation('creatif-service', 'montage-audiovisuel-motion-design', 'Montage audiovisuel et Motion Design', 'cqp', 'cfp'),
  formation('creatif-service', 'graphisme-infographie', 'Graphisme de production / Infographie', 'cqp', 'cfp'),
  formation('numerique-it', 'developpement-web-applications', 'Développement d’applications Web et mobiles', 'cqp', 'cfp'),
  formation('numerique-it', 'developpement-full-stack', 'Développement d’applications Web Full Stack', 'cqp', 'cfp'),
  formation('numerique-it', 'webmaster-cfp', 'Webmaster', 'cqp', 'cfp'),
  formation('numerique-it', 'reseaux-systemes-information', 'Réseaux et systèmes d’information', 'cqp', 'cfp'),
  formation('numerique-it', 'administration-systemes-information', 'Administration des systèmes d’information', 'cqp', 'cfp'),
  formation('numerique-it', 'administration-projets-informatiques', 'Administration et mise en œuvre des projets informatiques', 'cqp', 'cfp'),
  formation('numerique-it', 'maintenance-systeme-informatique', 'Maintenance du système informatique', 'cqp', 'cfp'),

  // C. Intelligence artificielle et cybersécurité
  formation('numerique-it', 'ia-business-management', 'Intelligence artificielle et Business Management', 'dqp', 'cfp'),
  formation('marketing-digital', 'marketing-digital-ecommerce', 'Marketing digital et E-commerce', 'cqp', 'cfp'),
  formation('cybersecurite', 'cybersecurite-reseaux-informatiques', 'Cybersécurité des réseaux informatiques', 'cqp', 'cfp'),
  formation('cybersecurite', 'analyse-cybersecurite-operationnelle', 'Analyse et cybersécurité opérationnelle', 'dqp', 'cfp'),
  formation('cybersecurite', 'architecture-gestion-cybersecurite', 'Architecture et gestion de la cybersécurité', 'cqp', 'cfp'),
  formation('numerique-it', 'internet-industriel-objets', 'Internet industriel des objets', 'dqp', 'cfp'),
  formation('numerique-it', 'analyse-donnees-introduction-ia', 'Analyse des données et introduction aux intelligences artificielles', 'dqp', 'cfp'),

  // D. Commerce, marketing et vente
  formation('marketing-vente', 'marketing-commerce-vente', 'Marketing, commerce et vente', 'cqp', 'cfp'),
  formation('sante-qhse-social', 'vendeur-pharmacie', 'Vendeur en pharmacie', 'cqp', 'cfp'),

  // E. Beauté, mode et artisanat
  formation('beaute-mode', 'esthetique-cosmetique-coiffure', 'Esthétique, cosmétique et coiffure', 'cqp', 'cfp'),
  formation('beaute-mode', 'decoration-6-mois', 'Décoration (6 mois)', 'cqp', 'cfp', '6 mois'),
  formation('beaute-mode', 'couture', 'Couture', 'cqp', 'cfp'),

  // F. Hôtellerie et restauration
  formation('hotellerie-restauration', 'hotellerie-restauration', 'Hôtellerie et restauration', 'cqp', 'cfp'),

  // G. Santé et assistance aux personnes
  formation('sante-qhse-social', 'delegue-medical', 'Délégué médical', 'dqp', 'cfp'),
  formation('sante-qhse-social', 'prepose-beneficiaires-auxiliaire-vie', 'Préposé aux bénéficiaires / Auxiliaire de vie', 'cqp', 'cfp'),

  // H. Qualité, hygiène, sécurité et environnement
  formation('qhse', 'gestion-qhse', 'Gestion QHSE (Qualité, Hygiène, Sécurité et Environnement)', 'cqp', 'cfp'),

  // I. Langues
  formation('langues', 'langues-francais-anglais-espagnol-chinois-allemand', 'Langues : français, anglais, espagnol, chinois et allemand', 'cqp', 'cfp'),

  // J. Préparation aux certifications
  formation('certifications', 'preparation-certification-centre-examen', 'Préparation à la certification / Centre d’examen', 'cqp', 'cfp'),
];
