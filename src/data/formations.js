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
  formation('numerique-it', 'analyse-des-donnees', 'Analyse des données', 'dqp', 'cfp'),
  formation('cybersecurite', 'analyse-cybersecurite', 'Analyse et cybersécurité', 'dqp', 'cfp'),
  formation('cybersecurite', 'architecte-gestion-cybersecurite', 'Architecte et gestion de la cybersécurité', 'cqp', 'cfp'),
  formation('creatif-service', 'couture-mode', 'Couture et Stylisme', 'cqp', 'cfp'),
  formation('creatif-service', 'decoration-interieur', "Décoration d'intérieur", 'cqp', 'cfp', '6 mois'),
  formation('sante-qhse-social', 'delegue-medical', 'Délégué Médical', 'dqp', 'cfp'),
  formation('numerique-it', 'developpement-mern', "Développement d'application web full stack MERN", 'dqp', 'cfp'),
  formation('numerique-it', 'developpement-web-mobile', 'Développement web et mobile', 'dqp', 'cfp'),
  formation('creatif-service', 'graphisme-infographie', 'Graphisme de Production et Infographie', 'cqp', 'cfp'),
  formation('numerique-it', 'ia-business-management', 'Intelligence Artificielle et Business Management', 'dqp', 'cfp'),
  formation('numerique-it', 'internet-industriel-objets', 'Internet Industriel des objets (IIoT)', 'dqp', 'cfp'),
  formation('numerique-it', 'maintenance-systemes-reseaux', 'Maintenance des systèmes et réseaux informatiques', 'dqp', 'cfp'),
  formation('gestion-administration', 'secretariat-assistante-direction', 'Secrétariat Assistante de Direction', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-bureautique', 'Secrétariat Bureautique', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat Comptable', 'cqp', 'cfp'),
  formation('sante-qhse-social', 'vendeur-pharmacie', 'Vendeur en Pharmacie', 'cqp', 'cfp'),
  formation('numerique-it', 'webmaster-cfp', 'Webmaster', 'cqp', 'cfp'),
]
