const base = {
  skills: [],
  outlets: [],
  contentStatus: 'title-only',
}

const DIPLOMA_NAMES = {
  cqp: 'Certificat de Qualification Professionnelle (CQP)',
  dqp: 'Diplôme de Qualification Professionnelle (DQP)',
  bts: 'Brevet de Technicien Supérieur (BTS)',
  licence: 'Licence Professionnelle',
  master: 'Master Professionnel',
}

function formation(poleId, slug, title, diploma = 'cqp', institution = 'cfp', duration = null, excerpt = null) {
  const defaultDuration = institution === 'issmiga' ? (diploma === 'bts' ? '2 ans' : (diploma === 'licence' ? '1 an post-BTS' : '2 ans')) : '1 an'
  const diplomaLabel = DIPLOMA_NAMES[diploma] || diploma.toUpperCase()
  const schoolName = institution === 'issmiga' ? "l'ISSMIGA" : "le CFP NO LIMIT"

  const fullDescription = `Le programme de formation en ${title} dispensé à ${schoolName} est conçu pour répondre aux standards d'excellence et aux besoins du marché de l'emploi. Cette filière permet d'acquérir des compétences techniques et managériales de haut niveau, garantissant une insertion professionnelle réussie et une évolution de carrière durable dans le secteur de la ${poleId.replace('-', ' & ')}.`

  return {
    ...base,
    id: slug,
    poleId,
    slug,
    title,
    diploma,
    institution,
    duration: duration || defaultDuration,
    excerpt: excerpt || `Formation de cycle ${diplomaLabel} en ${title.toLowerCase()} pour une expertise professionnelle certifiée.`,
    description: fullDescription,
    presentation: fullDescription
  }
}

/**
 * Catalogue complet des formations
 * Classé par établissement (CFP puis ISSMIGA), puis par ORDRE ALPHABÉTIQUE STRICT (A-Z)
 */
export const formations = [
  // --- CFP NO LIMIT (CQP / DQP) ---
  formation('numerique-it', 'analyse-des-donnees', 'Analyse des données', 'dqp', 'cfp'),
  formation('cybersecurite', 'analyse-cybersecurite', 'Analyse et cybersécurité', 'dqp', 'cfp'),
  formation('cybersecurite', 'architecte-gestion-cybersecurite', 'Architecte et gestion de la cybersécurité', 'dqp', 'cfp'),
  formation('creatif-service', 'couture-mode', 'Couture et Stylisme', 'cqp', 'cfp'),
  formation('creatif-service', 'decoration-interieur', "Décoration d'intérieur", 'cqp', 'cfp', '6 mois'),
  formation('sante-qhse-social', 'delegue-medical', 'Délégué Médical', 'dqp', 'cfp'),
  formation('numerique-it', 'developpement-mern', "Développement d'application web full stack MERN", 'dqp', 'cfp'),
  formation('numerique-it', 'developpement-web-mobile', 'Développement web et mobile', 'dqp', 'cfp'),
  formation('creatif-service', 'graphisme-infographie', 'Graphisme de Production et Infographie', 'cqp', 'cfp'),
  formation('numerique-it', 'ia-business-management', 'Intelligence Artificielle et Business Management', 'dqp', 'cfp'),
  formation('numerique-it', 'internet-industriel-objets', 'Internet Industriel des objets (IIoT)', 'dqp', 'cfp'),
  formation('numerique-it', 'maintenance-systemes-reseaux', 'Maintenance des systèmes et réseaux informatiques', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-assistante-direction', 'Secrétariat Assistante de Direction', 'dqp', 'cfp'),
  formation('gestion-administration', 'secretariat-bureautique', 'Secrétariat Bureautique', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat Comptable', 'cqp', 'cfp'),
  formation('sante-qhse-social', 'vendeur-pharmacie', 'Vendeur en Pharmacie', 'cqp', 'cfp'),
  formation('numerique-it', 'webmaster-cfp', 'Webmaster', 'cqp', 'cfp'),

  // --- ISSMIGA (BTS) ---
  formation('gestion-administration', 'assurance', 'Assurance', 'bts', 'issmiga'),
  formation('gestion-administration', 'banque-finances', 'Banque et finances', 'bts', 'issmiga'),
  formation('gestion-administration', 'comptabilite-gestion-entreprises', 'Comptabilité et gestion des entreprises', 'bts', 'issmiga'),
  formation('gestion-administration', 'douane-transit', 'Douane et transit', 'bts', 'issmiga'),
  formation('gestion-administration', 'droit-affaires', "Droit des affaires et de l'entreprise", 'bts', 'issmiga'),
  formation('tourisme-hotellerie', 'genie-culinaire', 'Génie culinaire', 'bts', 'issmiga'),
  formation('numerique-it', 'genie-logiciel-bts', 'Génie logiciel', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-collectivites-territoriales', 'Gestion des collectivités territoriales', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-fiscale', 'Gestion fiscale', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-projets-iss', 'Gestion des projets', 'bts', 'issmiga'),
  formation('gestion-administration', 'gestion-qualite', 'Gestion de la qualité', 'bts', 'issmiga'),
  formation('gestion-administration', 'logistique-transport', 'Gestion logistique et transport', 'bts', 'issmiga'),
  formation('gestion-administration', 'ressources-humaines', 'Gestion des ressources humaines', 'bts', 'issmiga'),
  formation('tourisme-hotellerie', 'hotellerie', 'Hôtellerie', 'bts', 'issmiga'),
  formation('numerique-it', 'informatique-industrielle', 'Informatique industrielle et automatisme', 'bts', 'issmiga'),
  formation('numerique-it', 'maintenance-systemes-iss', 'Maintenance des systèmes informatiques', 'bts', 'issmiga'),
  formation('gestion-administration', 'microfinance', 'Microfinance', 'bts', 'issmiga'),
  formation('sante-qhse-social', 'puericulture-gerontologie', 'Puériculture et Gérontologie', 'bts', 'issmiga'),
  formation('tourisme-hotellerie', 'restauration', 'Restauration', 'bts', 'issmiga'),
  formation('cybersecurite', 'telecommunications', 'Télécommunications', 'bts', 'issmiga'),
  formation('tourisme-hotellerie', 'tourisme-loisirs', 'Tourisme et loisirs', 'bts', 'issmiga'),

  // --- ISSMIGA (LICENCES / MASTERS) ---
  formation('gestion-administration', 'licence-comptabilite-finance', 'Licence Professionnelle en Comptabilité et Finance', 'licence', 'issmiga'),
  formation('numerique-it', 'licence-genie-logiciel', 'Licence Professionnelle en Génie Logiciel', 'licence', 'issmiga'),
  formation('gestion-administration', 'licence-gestion-ressources-humaines', 'Licence Professionnelle en Gestion des Ressources Humaines', 'licence', 'issmiga'),
  formation('gestion-administration', 'licence-marketing-digital', 'Licence Professionnelle en Marketing Digital', 'licence', 'issmiga'),
  formation('cybersecurite', 'licence-reseaux-securite', 'Licence Professionnelle en Réseaux et Sécurité', 'licence', 'issmiga'),
  formation('gestion-administration', 'master-audit-controle-gestion', 'Master Professionnel en Audit et Contrôle de Gestion', 'master', 'issmiga'),
  formation('gestion-administration', 'master-management-projets', 'Master Professionnel en Management des Projets', 'master', 'issmiga'),
  formation('numerique-it', 'master-systemes-information-reseaux', "Master Professionnel en Systèmes d'Information et Réseaux", 'master', 'issmiga'),
]
