const base = {
  skills: [],
  outlets: [],
  diploma: 'cqp',
  duration: '1 an',
  contentStatus: 'title-only',
}

function formation(poleId, slug, title, diploma = 'cqp', institution = 'cfp', duration = null, excerpt = null, skills = [], outlets = []) {
  const defaultDuration = institution === 'issmiga' ? (diploma === 'bts' ? '2 ans' : (diploma === 'licence' ? '1 an post-BTS' : '2 ans')) : '1 an'
  return {
    ...base,
    id: slug,
    poleId,
    slug,
    title,
    diploma,
    institution,
    duration: duration || defaultDuration,
    excerpt: excerpt || `Formation de cycle ${diploma} en ${title.toLowerCase()} pour une expertise professionnelle accrue.`,
    description: `Le programme en ${title} à ISSMIGA vise à former des cadres hautement qualifiés répondant aux standards internationaux.`,
    skills,
    outlets,
  }
}

export const formations = [
  // --- CFP NO LIMIT (CQP / DQP) ---
  formation('numerique-it', 'developpement-web-mobile', 'Développement web et mobile', 'dqp', 'cfp'),
  formation('numerique-it', 'developpement-mern', 'Développement d application web full stack MERN', 'dqp', 'cfp'),
  formation('numerique-it', 'webmaster', 'Webmaster', 'cqp', 'cfp'),
  formation('numerique-it', 'maintenance-systemes-reseaux', 'Maintenance des systèmes et réseaux informatiques', 'cqp', 'cfp'),
  formation('numerique-it', 'analyse-des-donnees', 'Analyse des données', 'dqp', 'cfp'),

  // Cybersécurité — CFP
  formation('cybersecurite', 'architecte-gestion-cybersecurite', 'Architecte et gestion de la cybersécurité', 'dqp', 'cfp'),
  formation('cybersecurite', 'analyse-cybersecurite', 'Analyse et cybersécurité', 'dqp', 'cfp'),

  // Gestion — CFP
  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat comptable', 'cqp', 'cfp'),
  formation('gestion-administration', 'secretariat-bureautique-bilingue', 'Secrétariat bureautique bilingue', 'cqp', 'cfp'),

  // --- ISSMIGA (BTS / LICENCE / MASTER) ---

  // BTS ISSMIGA
  formation('gestion-administration', 'comptabilite-gestion-entreprises', 'Comptabilité et gestion des entreprises', 'bts', 'issmiga'),
  formation('gestion-administration', 'banque-finances', 'Banque et finances', 'bts', 'issmiga'),
  formation('gestion-administration', 'ressources-humaines', 'Gestion des ressources humaines', 'bts', 'issmiga'),
  formation('numerique-it', 'genie-logiciel-bts', 'Génie logiciel', 'bts', 'issmiga'),
  formation('cybersecurite', 'reseaux-securite-issmiga', 'Réseaux et Sécurité', 'bts', 'issmiga'),

  // LICENCES PROFESSIONNELLES ISSMIGA
  formation('gestion-administration', 'licence-gestion-ressources-humaines', 'Licence Professionnelle en Gestion des Ressources Humaines', 'licence', 'issmiga', '1 an (post-BTS)'),
  formation('gestion-administration', 'licence-comptabilite-finance', 'Licence Professionnelle en Comptabilité et Finance', 'licence', 'issmiga', '1 an (post-BTS)'),
  formation('gestion-administration', 'licence-marketing-digital', 'Licence Professionnelle en Marketing Digital', 'licence', 'issmiga', '1 an (post-BTS)'),
  formation('numerique-it', 'licence-genie-logiciel', 'Licence Professionnelle en Génie Logiciel', 'licence', 'issmiga', '1 an (post-BTS)'),
  formation('cybersecurite', 'licence-reseaux-securite', 'Licence Professionnelle en Réseaux et Sécurité', 'licence', 'issmiga', '1 an (post-BTS)'),

  // MASTERS PROFESSIONNELS ISSMIGA
  formation('gestion-administration', 'master-management-projets', 'Master Professionnel en Management des Projets', 'master', 'issmiga', '2 ans'),
  formation('gestion-administration', 'master-audit-controle-gestion', 'Master Professionnel en Audit et Contrôle de Gestion', 'master', 'issmiga', '2 ans'),
  formation('numerique-it', 'master-systemes-information-reseaux', 'Master Professionnel en Systèmes d Information et Réseaux', 'master', 'issmiga', '2 ans'),
]
