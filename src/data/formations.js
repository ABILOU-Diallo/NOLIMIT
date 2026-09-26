const base = {
  skills: [],
  outlets: [],
  diploma: 'cqp',
  duration: '1 an',
  contentStatus: 'title-only',
}

function formation(poleId, slug, title, diploma = 'cqp', institution = 'cfp', duration = null, excerpt = null) {
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
    excerpt: excerpt || `Formation professionnelle de haut niveau en ${title.toLowerCase()} pour acquérir des compétences opérationnelles d'excellence.`,
    description: `Le programme en ${title} prépare les apprenants aux réalités du marché de l'emploi local et international avec des ateliers pratiques et un accompagnement à l'insertion.`,
  }
}

export const formations = [
  // ==========================================
  // CFP NO LIMIT — Diplômes Professionnels (CQP / DQP)
  // ==========================================

  // Numérique & IT — CFP NO LIMIT
  formation('numerique-it', 'developpement-web-mobile', 'Développement web et mobile', 'dqp', 'cfp', '1 an', 'Maîtrisez la création d\'applications web modernes et mobiles de bout en bout.'),
  formation('numerique-it', 'developpement-mern', 'Développement d’application web full stack MERN', 'dqp', 'cfp', '1 an', 'Devenez expert Full Stack avec MongoDB, Express, React et Node.js.'),
  formation('numerique-it', 'technologies-web-avancees', 'Technologies web avancées', 'dqp', 'cfp', '1 an', 'Spécialisation dans les architectures web modernes, le cloud et la performance.'),
  formation('numerique-it', 'webmaster', 'Webmaster', 'cqp', 'cfp', '1 an', 'Gérez, administrez et animez des sites internet institutionnels et e-commerce.'),
  formation('numerique-it', 'developpement-applications-mobiles', 'Développement des applications mobiles', 'dqp', 'cfp', '1 an', 'Conception et déploiement d\'applications natives et hybrides iOS et Android.'),
  formation('numerique-it', 'genie-logiciel-cfp', 'Génie logiciel (Pratique)', 'dqp', 'cfp', '1 an', 'Formation intensive à l\'architecture logicielle, aux algorithmes et au codage métier.'),
  formation('numerique-it', 'analyse-conception-systemes', 'Analyse et conception des systèmes', 'dqp', 'cfp', '1 an', 'Modélisation, architecture SI et gestion du cycle de vie des applications.'),
  formation('numerique-it', 'maintenance-systemes-reseaux', 'Maintenance des systèmes et réseaux informatiques', 'cqp', 'cfp', '1 an', 'Diagnostic, dépannage de parcs informatiques et câblage réseau d\'entreprise.'),
  formation('numerique-it', 'analyse-des-donnees', 'Analyse des données', 'dqp', 'cfp', '1 an', 'Exploitation, traitement de données massives et tableaux de bord avec Python et SQL.'),
  formation('numerique-it', 'business-intelligence', 'Business intelligence', 'dqp', 'cfp', '1 an', 'Aide à la décision stratégique via les outils BI, l\'ETL et le reporting visuel.'),
  formation('numerique-it', 'internet-des-objets', 'Internet des objets (IoT)', 'dqp', 'cfp', '1 an', 'Connectez le monde physique au numérique via les capteurs et microcontrôleurs.'),
  formation('numerique-it', 'intelligence-artificielle', 'Intelligence artificielle', 'dqp', 'cfp', '1 an', 'Introduction au Machine Learning, Deep Learning et développement de modèles IA.'),
  formation('numerique-it', 'administration-bases-de-donnees', 'Administration et optimisation des bases de données', 'dqp', 'cfp', '1 an', 'Sécurisation, gestion et optimisation des performances Oracle, PostgreSQL et MySQL.'),
  formation('numerique-it', 'bases-de-donnees-avancees', 'Bases de données avancées', 'dqp', 'cfp', '1 an', 'Architecture NoSQL, Big Data et entrepôts de données complexes.'),
  formation('numerique-it', 'transformation-digitale', 'Transformation digitale', 'cqp', 'cfp', '1 an', 'Accompagnement des entreprises dans l\'adoption des technologies et outils numériques.'),
  formation('numerique-it', 'veille-technologique', 'Veille technologique', 'cqp', 'cfp', '1 an', 'Méthodes de recherche, d\'analyse stratégique et d\'anticipation des innovations.'),
  formation('numerique-it', 'systemes-intelligents', 'Systèmes intelligents', 'dqp', 'cfp', '1 an', 'Développement de systèmes automatisés embarqués autonomes et interactifs.'),
  formation('numerique-it', 'gestion-projet-informatique', 'Gestion de projet informatique', 'cqp', 'cfp', '1 an', 'Pilotage de projets technologiques avec les méthodologies Agiles et Scrum.'),
  formation('numerique-it', 'supervision-systemes-information', 'Supervision des systèmes d’information', 'dqp', 'cfp', '1 an', 'Monitoring en temps réel, alertes et maintien en condition opérationnelle des infrastructures.'),

  // Cybersécurité — CFP NO LIMIT
  formation('cybersecurite', 'architecte-gestion-cybersecurite', 'Architecte et gestion de la cybersécurité', 'dqp', 'cfp', '1 an', 'Conception de politiques de sécurité globales et protection des infrastructures critiques.'),
  formation('cybersecurite', 'analyse-cybersecurite', 'Analyse et cybersécurité', 'dqp', 'cfp', '1 an', 'Détection des menaces, analyse de malwares et réponse aux incidents de sécurité.'),
  formation('cybersecurite', 'administration-systemes-reseaux', 'Administration systèmes et réseaux', 'cqp', 'cfp', '1 an', 'Configuration, administration de serveurs Linux/Windows et routage réseau.'),
  formation('cybersecurite', 'securite-reseaux', 'Sécurité et réseaux', 'cqp', 'cfp', '1 an', 'Mise en place de pare-feu, VPN, chiffrements et protocoles réseau sécurisés.'),
  formation('cybersecurite', 'securite-systemes-information', 'Sécurité des systèmes d’information', 'dqp', 'cfp', '1 an', 'Gouvernance de la sécurité des SI, normes ISO 27001 et gestion des risques.'),
  formation('cybersecurite', 'audit-controle-systemes', 'Audit et contrôle des systèmes informatiques', 'dqp', 'cfp', '1 an', 'Évaluation de la conformité, tests d\'intrusion et rapports de vulnérabilités.'),

  // Gestion & Administration — CFP NO LIMIT
  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat comptable', 'cqp', 'cfp', '1 an', 'Tenue de la comptabilité courante, gestion des pièces justificatives et secrétariat.'),
  formation('gestion-administration', 'secretariat-bureautique-bilingue', 'Secrétariat bureautique bilingue', 'cqp', 'cfp', '1 an', 'Maîtrise complète des outils bureautiques et rédaction professionnelle en français et anglais.'),
  formation('gestion-administration', 'assistante-direction-bilingue', 'Secrétariat assistante de direction bilingue', 'cqp', 'cfp', '1 an', 'Gestion d\'agenda, organisation de réunions de haut niveau et relations publiques.'),
  formation('gestion-administration', 'entreprenariat', 'Entreprenariat', 'cqp', 'cfp', '1 an', 'De l\'idée au business plan : création, gestion et développement d\'une startup.'),
  formation('gestion-administration', 'architecture-entreprise', 'Architecture d’entreprise', 'dqp', 'cfp', '1 an', 'Alignement de la stratégie business d\'une organisation avec ses outils et SI.'),
  formation('gestion-administration', 'e-business-marketing-digital', 'E-business et marketing digital', 'cqp', 'cfp', '1 an', 'Stratégies de vente en ligne, community management et publicité sur les réseaux.'),
  formation('gestion-administration', 'finance-cfp', 'Finance (Pratique)', 'cqp', 'cfp', '1 an', 'Gestion de trésorerie, analyse financière d\'entreprise et tableaux de bord financiers.'),
  formation('gestion-administration', 'audit-fiscal', 'Audit fiscal', 'dqp', 'cfp', '1 an', 'Contrôle de la conformité fiscale, optimisation et déclarations réglementaires.'),
  formation('gestion-administration', 'commerce-vente-cfp', 'Commerce et vente (Techniques)', 'cqp', 'cfp', '1 an', 'Négociation commerciale, techniques de prospection et fidélisation de clientèle.'),
  formation('gestion-administration', 'management-gouvernance', 'Management et gouvernance d’entreprise', 'dqp', 'cfp', '1 an', 'Pilotage stratégique des équipes, éthique des affaires et prise de décision.'),

  // Métiers Créatifs & de Service — CFP NO LIMIT
  formation('creatif-service', 'infographie', 'Infographie', 'cqp', 'cfp', '1 an', 'Création d\'identités visuelles, logos et maquettes avec Photoshop, Illustrator, InDesign.'),
  formation('creatif-service', 'montage-audiovisuel', 'Montage audiovisuel', 'cqp', 'cfp', '1 an', 'Traitement vidéo, étalonnage, sound design et montage pro sur Premiere et Final Cut.'),
  formation('creatif-service', 'motion-design', 'Motion design', 'cqp', 'cfp', '1 an', 'Animation d\'éléments graphiques 2D/3D et effets spéciaux avec After Effects.'),

  // Santé, QHSE & Social — CFP NO LIMIT
  formation('sante-qhse-social', 'vente-en-pharmacie', 'Vente en pharmacie', 'cqp', 'cfp', '1 an', 'Gestion des stocks de médicaments, accueil des patients et délivrance d\'ordonnances.'),
  formation('sante-qhse-social', 'qhse', 'Gestion qualité, hygiène, sécurité et environnement', 'dqp', 'cfp', '1 an', 'Mise en place des normes de sécurité au travail et réduction des impacts environnementaux.'),


  // ==========================================
  // ISSMIGA — Enseignement Supérieur (BTS / Licence / Master)
  // ==========================================

  // 1. Gestion / Management — ISSMIGA
  formation('gestion-administration', 'gestion-collectivites-territoriales', 'Gestion des collectivités territoriales', 'bts', 'issmiga', '2 ans', 'Administration et développement stratégique des communes et régions décentralisées.'),
  formation('gestion-administration', 'assurance', 'Assurance', 'bts', 'issmiga', '2 ans', 'Gestion des contrats de couverture, indemnisation des sinistres et conseil client.'),
  formation('gestion-administration', 'gestion-logistique-transport', 'Gestion logistique et transport', 'bts', 'issmiga', '2 ans', 'Optimisation de la chaîne logistique, stockage et gestion du fret international.'),
  formation('gestion-administration', 'gestion-qualite-issmiga', 'Gestion de la qualité', 'bts', 'issmiga', '2 ans', 'Déploiement des démarches de certification qualité et amélioration continue.'),
  formation('gestion-administration', 'gestion-projets-issmiga', 'Gestion des projets', 'bts', 'issmiga', '2 ans', 'Méthodes de planification, suivi de budget et coordination d\'équipes projet.'),
  formation('gestion-administration', 'ressources-humaines', 'Gestion des ressources humaines', 'bts', 'issmiga', '2 ans', 'Administration du personnel, recrutement, gestion des carrières et de la paie.'),
  formation('gestion-administration', 'banque-finances', 'Banque et finances', 'bts', 'issmiga', '2 ans', 'Analyse de dossiers de crédit, gestion de portefeuille et services bancaires.'),
  formation('gestion-administration', 'comptabilite-gestion-entreprises', 'Comptabilité et gestion des entreprises', 'bts', 'issmiga', '2 ans', 'Établissement des états financiers, bilans, comptes de résultat et gestion fiscale.'),
  formation('gestion-administration', 'microfinance', 'Microfinance', 'bts', 'issmiga', '2 ans', 'Gestion spécifique des institutions de microcrédit et financement inclusif.'),

  // 2. Commerce-Vente / Business and Finance — ISSMIGA
  formation('gestion-administration', 'commerce-international', 'Commerce International', 'bts', 'issmiga', '2 ans', 'Opérations d\'import-export, techniques douanières et négociation internationale.'),
  formation('gestion-administration', 'marketing-commerce-vente', 'Marketing, Commerce et Vente', 'bts', 'issmiga', '2 ans', 'Études de marché, élaboration de plans marketing et management des forces de vente.'),

  // 3. Tourisme, Hôtellerie et Restauration — ISSMIGA
  formation('creatif-service', 'hotellerie', 'Hôtellerie', 'bts', 'issmiga', '2 ans', 'Gestion opérationnelle des établissements hôteliers aux standards internationaux.'),
  formation('creatif-service', 'gestion-management-hoteliers', 'Gestion et management hôteliers', 'bts', 'issmiga', '2 ans', 'Direction d\'équipes, rentabilité financière et qualité de service en hôtellerie.'),
  formation('creatif-service', 'management-technique-hebergement', 'Management et technique d’hébergement', 'bts', 'issmiga', '2 ans', 'Supervision de la réception, du service d\'étage et de la relation client.'),
  formation('creatif-service', 'restauration', 'Restauration', 'bts', 'issmiga', '2 ans', 'Gestion des approvisionnements, direction de salle et de la production culinaire.'),
  formation('creatif-service', 'genie-culinaire', 'Génie culinaire', 'bts', 'issmiga', '2 ans', 'Art de la haute cuisine, élaboration de menus gastronomiques et gestion de cuisine.'),
  formation('creatif-service', 'commercialisation-services-restauration', 'Commercialisation et services de restauration', 'bts', 'issmiga', '2 ans', 'Événementiel de restauration, marketing des saveurs et excellence du service à table.'),
  formation('creatif-service', 'tourisme-loisirs', 'Tourisme et loisirs', 'bts', 'issmiga', '2 ans', 'Création de circuits touristiques, guidage et valorisation du patrimoine.'),
  formation('creatif-service', 'management-touristique', 'Management touristique', 'bts', 'issmiga', '2 ans', 'Direction d\'agences de voyage, marketing de destinations et écotourisme.'),

  // 4. Carrières Juridiques — ISSMIGA
  formation('gestion-administration', 'droit-affaires-entreprise', 'Droit des affaires et de l’entreprise', 'bts', 'issmiga', '2 ans', 'Conseil juridique aux sociétés, rédaction de contrats et gestion du contentieux.'),
  formation('gestion-administration', 'gestion-fiscale', 'Gestion fiscale', 'bts', 'issmiga', '2 ans', 'Optimisation de la fiscalité d\'entreprise et déclarations d\'impôts réglementaires.'),
  formation('gestion-administration', 'douane-transit', 'Douane et transit', 'bts', 'issmiga', '2 ans', 'Procédures douanières de dédouanement de marchandises à l\'import et export.'),

  // 5. Réseaux et Télécommunications — ISSMIGA
  formation('cybersecurite', 'telecommunications', 'Télécommunications', 'bts', 'issmiga', '2 ans', 'Déploiement d\'infrastructures de transmission voix, données et réseaux mobiles.'),
  formation('cybersecurite', 'reseaux-securite-issmiga', 'Réseaux et Sécurité', 'bts', 'issmiga', '2 ans', 'Architecture réseau d\'entreprise, routage avancé et défense périmétrique.'),

  // 6. Génie Informatique — ISSMIGA
  formation('numerique-it', 'genie-logiciel-bts', 'Génie logiciel', 'bts', 'issmiga', '2 ans', 'Conception, développement orienté objet, bases de données et gestion de projets logiciels.'),
  formation('numerique-it', 'informatique-industrielle-automatisme', 'Informatique industrielle et automatisme', 'bts', 'issmiga', '2 ans', 'Automatisation des lignes de production, capteurs et programmation d\'automates.'),
  formation('numerique-it', 'maintenance-systemes-informatiques', 'Maintenance des systèmes informatiques', 'bts', 'issmiga', '2 ans', 'Maintenance matérielle et logicielle des ordinateurs, serveurs et périphériques.'),
  formation('numerique-it', 'ecommerce-marketing-numerique', 'E-Commerce et Marketing numérique', 'bts', 'issmiga', '2 ans', 'Conception de boutiques en ligne, SEO, SEA et stratégies d\'acquisition digitales.'),

  // 7. Économie et entrepreneuriat social / Home Economics — ISSMIGA
  formation('sante-qhse-social', 'esthetique-cosmetique-coiffure', 'Esthétique, Cosmétique et Coiffure', 'bts', 'issmiga', '2 ans', 'Soins du corps, visuels d\'apparence et techniques de coiffure professionnelles haut de gamme.'),
  formation('sante-qhse-social', 'puericulture-gerontologie-auxiliaire', 'Puériculture, Gérontologie et Auxiliaire de vie', 'bts', 'issmiga', '2 ans', 'Accompagnement et soins aux enfants en bas âge et aux personnes âgées ou dépendantes.'),
  formation('sante-qhse-social', 'economie-entrepreneuriat-social', 'Économie et entrepreneuriat social', 'bts', 'issmiga', '2 ans', 'Développement de projets solidaires, coopératives et économie circulaire.'),
]
