const base = {
  skills: [],
  outlets: [],
  diploma: 'cqp',
  duration: '1 an',
  contentStatus: 'title-only',
}

function formation(poleId, slug, title, diploma = 'cqp') {
  return {
    ...base,
    id: slug,
    poleId,
    slug,
    title,
    diploma,
    excerpt: null,
    description: null,
  }
}

export const formations = [
  formation('numerique-it', 'developpement-web-mobile', 'Développement web et mobile', 'dqp'),
  formation('numerique-it', 'developpement-mern', 'Développement d’application web full stack MERN', 'dqp'),
  formation('numerique-it', 'technologies-web-avancees', 'Technologies web avancées', 'dqp'),
  formation('numerique-it', 'webmaster', 'Webmaster', 'cqp'),
  formation('numerique-it', 'developpement-applications-mobiles', 'Développement des applications mobiles', 'dqp'),
  formation('numerique-it', 'genie-logiciel', 'Génie logiciel', 'dqp'),
  formation('numerique-it', 'analyse-conception-systemes', 'Analyse et conception des systèmes', 'dqp'),
  formation('numerique-it', 'maintenance-systemes-reseaux', 'Maintenance des systèmes et réseaux informatiques', 'cqp'),
  formation('numerique-it', 'analyse-des-donnees', 'Analyse des données', 'dqp'),
  formation('numerique-it', 'business-intelligence', 'Business intelligence', 'dqp'),
  formation('numerique-it', 'internet-des-objets', 'Internet des objets (IoT)', 'dqp'),
  formation('numerique-it', 'intelligence-artificielle', 'Intelligence artificielle', 'dqp'),
  formation('numerique-it', 'administration-bases-de-donnees', 'Administration et optimisation des bases de données', 'dqp'),
  formation('numerique-it', 'bases-de-donnees-avancees', 'Bases de données avancées', 'dqp'),
  formation('numerique-it', 'transformation-digitale', 'Transformation digitale', 'cqp'),
  formation('numerique-it', 'veille-technologique', 'Veille technologique', 'cqp'),
  formation('numerique-it', 'systemes-intelligents', 'Systèmes intelligents', 'dqp'),
  formation('numerique-it', 'gestion-projet-informatique', 'Gestion de projet informatique', 'cqp'),
  formation('numerique-it', 'supervision-systemes-information', 'Supervision des systèmes d’information', 'dqp'),

  formation('cybersecurite', 'architecte-gestion-cybersecurite', 'Architecte et gestion de la cybersécurité', 'dqp'),
  formation('cybersecurite', 'analyse-cybersecurite', 'Analyse et cybersécurité', 'dqp'),
  formation('cybersecurite', 'administration-systemes-reseaux', 'Administration systèmes et réseaux', 'cqp'),
  formation('cybersecurite', 'securite-reseaux', 'Sécurité et réseaux', 'cqp'),
  formation('cybersecurite', 'securite-systemes-information', 'Sécurité des systèmes d’information', 'dqp'),
  formation('cybersecurite', 'audit-controle-systemes', 'Audit et contrôle des systèmes informatiques', 'dqp'),

  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat comptable', 'cqp'),
  formation('gestion-administration', 'secretariat-bureautique-bilingue', 'Secrétariat bureautique bilingue', 'cqp'),
  formation('gestion-administration', 'assistante-direction-bilingue', 'Secrétariat assistante de direction bilingue', 'cqp'),
  formation('gestion-administration', 'entreprenariat', 'Entreprenariat', 'cqp'),
  formation('gestion-administration', 'architecture-entreprise', 'Architecture d’entreprise', 'dqp'),
  formation('gestion-administration', 'e-business-marketing-digital', 'E-business et marketing digital', 'cqp'),
  formation('gestion-administration', 'finance', 'Finance', 'cqp'),
  formation('gestion-administration', 'audit-fiscal', 'Audit fiscal', 'dqp'),
  formation('gestion-administration', 'commerce-vente', 'Commerce et vente', 'cqp'),
  formation('gestion-administration', 'management-gouvernance', 'Management et gouvernance d’entreprise', 'dqp'),

  formation('creatif-service', 'infographie', 'Infographie', 'cqp'),
  formation('creatif-service', 'montage-audiovisuel', 'Montage audiovisuel', 'cqp'),
  formation('creatif-service', 'motion-design', 'Motion design', 'cqp'),

  formation('sante-qhse-social', 'vente-en-pharmacie', 'Vente en pharmacie', 'cqp'),
  formation('sante-qhse-social', 'qhse', 'Gestion qualité, hygiène, sécurité et environnement', 'dqp'),
]
