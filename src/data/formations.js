const base = {
  skills: [],
  outlets: [],
  diploma: 'cqp',
  duration: '1 an',
  contentStatus: 'title-only',
}

function formation(poleId, slug, title, diploma = 'cqp', institution = 'cfp', duration = null, excerpt = null, skills = [], outlets = []) {
  const defaultDuration = institution === 'issmiga' ? (diploma === 'bts' ? '2 ans' : '3 ans') : '1 an'
  return {
    ...base,
    id: slug,
    poleId,
    slug,
    title,
    diploma,
    institution,
    duration: duration || defaultDuration,
    excerpt: excerpt || `Formation professionnelle de haut niveau en ${title.toLowerCase()} pour acquérir des compétences opérationnelles d'excellence.`,
    description: `Le programme en ${title} prépare les apprenants aux réalités du marché de l'emploi local et international avec des ateliers pratiques et un accompagnement à l'insertion.`,
    skills,
    outlets,
  }
}

export const formations = [
  // CFP NO LIMIT — Diplômes Professionnels (CQP / DQP)

  // Numérique & IT — CFP NO LIMIT
  formation('numerique-it', 'developpement-web-mobile', 'Développement web et mobile', 'dqp', 'cfp', '1 an', 'Maîtrisez la création d applications web modernes et mobiles de bout en bout.',
    ['HTML5, CSS3, JavaScript', 'React.js, Vue.js', 'React Native, Flutter', 'Node.js, Express', 'REST API, GraphQL', 'Git, GitHub', 'Responsive Design', 'Performance web'],
    ['Développeur Frontend', 'Développeur Mobile', 'Développeur Full Stack', 'Freelance web', 'Startup tech', 'Agence digitale']
  ),
  formation('numerique-it', 'developpement-mern', 'Développement d application web full stack MERN', 'dqp', 'cfp', '1 an', 'Devenez expert Full Stack avec MongoDB, Express, React et Node.js.',
    ['MongoDB, Mongoose', 'Express.js', 'React.js, Redux', 'Node.js', 'REST API', 'Authentication JWT', 'Cloud deployment', 'Testing'],
    ['Développeur Full Stack', 'Développeur Backend', 'Développeur Frontend', 'Architecte web', 'CTO startup', 'Consultant web']
  ),
  formation('numerique-it', 'technologies-web-avancees', 'Technologies web avancées', 'dqp', 'cfp', '1 an', 'Spécialisation dans les architectures web modernes, le cloud et la performance.',
    ['AWS, Azure, GCP', 'Docker, Kubernetes', 'Microservices', 'Serverless', 'CI/CD', 'WebSockets', 'PWA', 'Performance optimization'],
    ['Ingénieur Cloud', 'DevOps Engineer', 'Architecte logiciel', 'Ingénieur performance', 'Cloud Architect', 'Tech Lead']
  ),
  formation('numerique-it', 'webmaster', 'Webmaster', 'cqp', 'cfp', '1 an', 'Gérez, administrez et animez des sites internet institutionnels et e-commerce.',
    ['CMS (WordPress, Joomla)', 'SEO, SEM', 'Google Analytics', 'Hébergement web', 'Maintenance site', 'E-commerce (Shopify, PrestaShop)', 'Community management', 'Content creation'],
    ['Webmaster', 'Administrateur site web', 'SEO Manager', 'Community Manager', 'E-commerce manager', 'Freelance web']
  ),
  formation('numerique-it', 'developpement-applications-mobiles', 'Développement des applications mobiles', 'dqp', 'cfp', '1 an', 'Conception et déploiement d applications natives et hybrides iOS et Android.',
    ['Swift, Kotlin', 'React Native', 'Flutter', 'iOS, Android SDK', 'App Store, Play Store', 'Push notifications', 'Mobile UI/UX', 'App monetization'],
    ['Développeur iOS', 'Développeur Android', 'Développeur Mobile Cross-platform', 'Mobile Product Manager', 'Startup mobile', 'Freelance mobile']
  ),
  formation('numerique-it', 'genie-logiciel-cfp', 'Génie logiciel (Pratique)', 'dqp', 'cfp', '1 an', 'Formation intensive à l architecture logicielle, aux algorithmes et au codage métier.',
    ['Algorithmique, structures de données', 'Design patterns', 'UML, Merise', 'Java, C#, Python', 'Testing unitaire', 'Code review', 'Clean code', 'Agile, Scrum'],
    ['Développeur logiciel', 'Ingénieur logiciel', 'Analyste programmeur', 'Chef de projet technique', 'Software Architect', 'QA Engineer']
  ),
  formation('numerique-it', 'analyse-conception-systemes', 'Analyse et conception des systèmes', 'dqp', 'cfp', '1 an', 'Modélisation, architecture SI et gestion du cycle de vie des applications.',
    ['UML, BPMN', 'Merise', 'Architecture SOA', 'Modélisation de données', 'Analyse fonctionnelle', 'Spécifications techniques', 'Gestion de projet SI', 'Documentation technique'],
    ['Analyste système', 'Architecte SI', 'Consultant fonctionnel', 'Chef de projet SI', 'Business Analyst', 'Product Owner']
  ),
  formation('numerique-it', 'maintenance-systemes-reseaux', 'Maintenance des systèmes et réseaux informatiques', 'cqp', 'cfp', '1 an', 'Diagnostic, dépannage de parcs informatiques et câblage réseau d entreprise.',
    ['Hardware, PC assembly', 'Windows, Linux', 'Réseaux TCP/IP', 'Câblage réseau', 'Dépannage matériel', 'Active Directory', 'Virtualisation', 'Backup & Recovery'],
    ['Technicien support', 'Administrateur réseau', 'Technicien maintenance', 'Helpdesk', 'SSII', 'Technicien freelance']
  ),
  formation('numerique-it', 'analyse-des-donnees', 'Analyse des données', 'dqp', 'cfp', '1 an', 'Exploitation, traitement de données massives et tableaux de bord avec Python et SQL.',
    ['Python (Pandas, NumPy)', 'SQL avancé', 'Data visualization', 'Statistiques', 'Machine Learning basics', 'ETL', 'Big Data tools', 'Dashboard creation'],
    ['Data Analyst', 'Data Scientist junior', 'Business Analyst', 'Analyste statistique', 'Consultant data', 'Data Engineer']
  ),
  formation('numerique-it', 'business-intelligence', 'Business intelligence', 'dqp', 'cfp', '1 an', 'Aide à la décision stratégique via les outils BI, l ETL et le reporting visuel.',
    ['Power BI, Tableau', 'ETL (Talend, Informatica)', 'Data Warehouse', 'SQL', 'Reporting', 'KPI, Dashboards', 'Data mining', 'Analytics'],
    ['BI Analyst', 'BI Developer', 'Data Analyst', 'Reporting Manager', 'Consultant BI', 'Business Intelligence Manager']
  ),
  formation('numerique-it', 'internet-des-objets', 'Internet des objets (IoT)', 'dqp', 'cfp', '1 an', 'Connectez le monde physique au numérique via les capteurs et microcontrôleurs.',
    ['Arduino, ESP32', 'Raspberry Pi', 'Sensors, Actuators', 'MQTT, CoAP', 'Edge computing', 'Embedded C/C++', 'IoT platforms', 'Security IoT'],
    ['Ingénieur IoT', 'Développeur embarqué', 'Technicien smart home', 'Startup IoT', 'Industrie 4.0', 'Consultant IoT']
  ),
  formation('numerique-it', 'intelligence-artificielle', 'Intelligence artificielle', 'dqp', 'cfp', '1 an', 'Introduction au Machine Learning, Deep Learning et développement de modèles IA.',
    ['Python, TensorFlow', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'Data preprocessing', 'Model deployment'],
    ['Data Scientist', 'ML Engineer', 'AI Researcher junior', 'Consultant IA', 'Startup IA', 'Analyste IA']
  ),
  formation('numerique-it', 'administration-bases-de-donnees', 'Administration et optimisation des bases de données', 'dqp', 'cfp', '1 an', 'Sécurisation, gestion et optimisation des performances Oracle, PostgreSQL et MySQL.',
    ['Oracle, PostgreSQL, MySQL', 'SQL tuning', 'Backup & Recovery', 'Replication', 'Security', 'Performance monitoring', 'Stored procedures', 'Cloud DBA'],
    ['DBA (Database Administrator)', 'Administrateur base de données', 'Data Engineer', 'Consultant base de données', 'Architecte données', 'Cloud DBA']
  ),
  formation('numerique-it', 'bases-de-donnees-avancees', 'Bases de données avancées', 'dqp', 'cfp', '1 an', 'Architecture NoSQL, Big Data et entrepôts de données complexes.',
    ['MongoDB, Cassandra', 'Redis, Elasticsearch', 'NoSQL modeling', 'Big Data (Hadoop, Spark)', 'Data Lake', 'Graph databases', 'Time series DB', 'Polyglot persistence'],
    ['NoSQL DBA', 'Big Data Engineer', 'Data Architect', 'Consultant Big Data', 'Engineer Data Lake', 'Architecte NoSQL']
  ),
  formation('numerique-it', 'transformation-digitale', 'Transformation digitale', 'cqp', 'cfp', '1 an', 'Accompagnement des entreprises dans l adoption des technologies et outils numériques.',
    ['Digital strategy', 'Change management', 'Cloud adoption', 'Process automation', 'Digital marketing', 'Collaborative tools', 'Agile transformation', 'Innovation management'],
    ['Consultant transformation digitale', 'Digital Manager', 'Chief Digital Officer junior', 'Coach digital', 'Consultant innovation', 'Project manager digital']
  ),
  formation('numerique-it', 'veille-technologique', 'Veille technologique', 'cqp', 'cfp', '1 an', 'Méthodes de recherche, d analyse stratégique et d anticipation des innovations.',
    ['Research methodologies', 'Competitive intelligence', 'Trend analysis', 'Data mining', 'Social listening', 'Patent analysis', 'Technology scouting', 'Report writing'],
    ['Veilleur technologique', 'Analyste innovation', 'Consultant veille', 'Strategic analyst', 'R&D analyst', 'Intelligence économique']
  ),
  formation('numerique-it', 'systemes-intelligents', 'Systèmes intelligents', 'dqp', 'cfp', '1 an', 'Développement de systèmes automatisés embarqués autonomes et interactifs.',
    ['Embedded systems', 'Robotics', 'Computer vision', 'Sensor fusion', 'Autonomous navigation', 'Real-time systems', 'Edge AI', 'ROS (Robot OS)'],
    ['Ingénieur systèmes embarqués', 'Robotics engineer', 'Ingénieur vision', 'Développeur autonome', 'Industrie robotique', 'Consultant automation']
  ),
  formation('numerique-it', 'gestion-projet-informatique', 'Gestion de projet informatique', 'cqp', 'cfp', '1 an', 'Pilotage de projets technologiques avec les méthodologies Agiles et Scrum.',
    ['Agile, Scrum, Kanban', 'Project planning', 'Risk management', 'Budget tracking', 'Team coordination', 'Jira, Trello', 'Stakeholder management', 'QA coordination'],
    ['Chef de projet IT', 'Scrum Master', 'Product Owner', 'Project Manager', 'Consultant Agile', 'Delivery Manager']
  ),
  formation('numerique-it', 'supervision-systemes-information', 'Supervision des systèmes d information', 'dqp', 'cfp', '1 an', 'Monitoring en temps réel, alertes et maintien en condition opérationnelle des infrastructures.',
    ['Nagios, Zabbix', 'Prometheus, Grafana', 'Log analysis (ELK)', 'Incident management', 'SLA monitoring', 'Performance tuning', 'Capacity planning', 'Automation'],
    ['Superviseur SI', 'NOC Engineer', 'SRE (Site Reliability Engineer)', 'Infrastructure monitoring', 'Ops Manager', 'Consultant monitoring']
  ),

  // Cybersécurité — CFP NO LIMIT
  formation('cybersecurite', 'architecte-gestion-cybersecurite', 'Architecte et gestion de la cybersécurité', 'dqp', 'cfp', '1 an', 'Conception de politiques de sécurité globales et protection des infrastructures critiques.',
    ['Security architecture', 'ISO 27001', 'Risk assessment', 'Security policies', 'Compliance', 'Business continuity', 'Disaster recovery', 'Security governance'],
    ['RSSI (Chief Information Security Officer)', 'Architecte sécurité', 'Consultant cybersécurité', 'Security Manager', 'Auditeur sécurité', 'Gouvernance SI']
  ),
  formation('cybersecurite', 'analyse-cybersecurite', 'Analyse et cybersécurité', 'dqp', 'cfp', '1 an', 'Détection des menaces, analyse de malwares et réponse aux incidents de sécurité.',
    ['Malware analysis', 'Threat intelligence', 'Incident response', 'Forensics', 'SIEM', 'Penetration testing', 'Vulnerability assessment', 'Security monitoring'],
    ['Analyste sécurité', 'SOC Analyst', 'Incident Responder', 'Forensic analyst', 'Threat hunter', 'Consultant sécurité']
  ),
  formation('cybersecurite', 'administration-systemes-reseaux', 'Administration systèmes et réseaux', 'cqp', 'cfp', '1 an', 'Configuration, administration de serveurs Linux/Windows et routage réseau.',
    ['Linux administration', 'Windows Server', 'Routing (BGP, OSPF)', 'Firewalls', 'VPN', 'Network security', 'Active Directory', 'Monitoring'],
    ['Administrateur systèmes', 'Administrateur réseau', 'SysAdmin', 'Network Engineer', 'Security Administrator', 'DevOps']
  ),
  formation('cybersecurite', 'securite-reseaux', 'Sécurité et réseaux', 'cqp', 'cfp', '1 an', 'Mise en place de pare-feu, VPN, chiffrements et protocoles réseau sécurisés.',
    ['Firewall (Cisco, Palo Alto)', 'VPN (IPsec, SSL)', 'Network segmentation', 'Encryption', 'IDS/IPS', 'Wireshark', 'Network hardening', 'Zero Trust'],
    ['Security Network Engineer', 'Administrateur sécurité réseau', 'Network Security Architect', 'Firewall Administrator', 'Consultant réseau', 'SOC Network']
  ),
  formation('cybersecurite', 'securite-systemes-information', 'Sécurité des systèmes d information', 'dqp', 'cfp', '1 an', 'Gouvernance de la sécurité des SI, normes ISO 27001 et gestion des risques.',
    ['ISO 27001, NIST', 'Risk management', 'Security governance', 'Compliance', 'Audit sécurité', 'Security awareness', 'Data protection', 'Business continuity'],
    ['Security Manager', 'Compliance Officer', 'Auditeur ISO 27001', 'Risk Manager', 'DPO junior', 'Consultant gouvernance']
  ),
  formation('cybersecurite', 'audit-controle-systemes', 'Audit et contrôle des systèmes informatiques', 'dqp', 'cfp', '1 an', 'Évaluation de la conformité, tests d intrusion et rapports de vulnérabilités.',
    ['Penetration testing', 'Vulnerability scanning', 'Security audit', 'Compliance audit', 'Reporting', 'Risk analysis', 'Remediation planning', 'Standards (PCI-DSS, GDPR)'],
    ['Auditeur informatique', 'Pentester', 'Security Consultant', 'Auditeur sécurité', 'Compliance Auditor', 'Risk Analyst']
  ),

  // Gestion & Administration — CFP NO LIMIT
  formation('gestion-administration', 'secretariat-comptable', 'Secrétariat comptable', 'cqp', 'cfp', '1 an', 'Tenue de la comptabilité courante, gestion des pièces justificatives et secrétariat.',
    ['Comptabilité générale', 'Facturation', 'Saisie comptable', 'Bilan, compte de résultat', 'Logiciel comptable', 'Archivage', 'Rédaction administrative', 'Communication pro'],
    ['Secrétaire comptable', 'Assistant comptable', 'Comptable junior', 'Secrétaire administrative', 'PME', 'Cabinet comptable']
  ),
  formation('gestion-administration', 'secretariat-bureautique-bilingue', 'Secrétariat bureautique bilingue', 'cqp', 'cfp', '1 an', 'Maîtrise complète des outils bureautiques et rédaction professionnelle en français et anglais.',
    ['Pack Office (Word, Excel, PowerPoint)', 'Bureautique avancée', 'Anglais professionnel', 'Rédaction', 'Gestion agenda', 'Accueil téléphonique', 'Traduction basique', 'Communication'],
    ['Secrétaire bilingue', 'Assistant administratif', 'Réceptionniste bilingue', 'Assistant de direction', 'International companies', 'Organisations internationales']
  ),
  formation('gestion-administration', 'assistante-direction-bilingue', 'Secrétariat assistante de direction bilingue', 'cqp', 'cfp', '1 an', 'Gestion d agenda, organisation de réunions de haut niveau et relations publiques.',
    ['Gestion agenda', 'Organisation événements', 'Réunions', 'Protocole', 'Anglais courant', 'Rédaction courriers', 'Relations publiques', 'Confidentialité'],
    ['Assistante de direction', 'Assistant exécutif', 'PA (Personal Assistant)', 'Secrétaire générale junior', 'Direction générale', 'Cabinet conseil']
  ),
  formation('gestion-administration', 'entreprenariat', 'Entreprenariat', 'cqp', 'cfp', '1 an', 'De l idée au business plan : création, gestion et développement d une startup.',
    ['Business plan', 'Création entreprise', 'Gestion startup', 'Marketing', 'Finance startup', 'Pitch deck', 'Networking', 'Innovation'],
    ['Entrepreneur', 'Créateur d entreprise', 'Startup founder', 'Consultant création', 'Accélérateur startup', 'Incubateur']
  ),
  formation('gestion-administration', 'architecture-entreprise', 'Architecture d entreprise', 'dqp', 'cfp', '1 an', 'Alignement de la stratégie business d une organisation avec ses outils et SI.',
    ['Enterprise Architecture', 'TOGAF', 'Business strategy', 'IT alignment', 'Process mapping', 'Digital transformation', 'Governance', 'Portfolio management'],
    ['Architecte d entreprise', 'Enterprise Architect', 'Consultant EA', 'Strategic IT Advisor', 'Transformation Lead', 'Business Architect']
  ),
  formation('gestion-administration', 'e-business-marketing-digital', 'E-business et marketing digital', 'cqp', 'cfp', '1 an', 'Stratégies de vente en ligne, community management et publicité sur les réseaux.',
    ['E-commerce', 'SEO/SEM', 'Social media marketing', 'Google Ads, Facebook Ads', 'Email marketing', 'Content marketing', 'Analytics', 'CRM'],
    ['E-commerce Manager', 'Digital Marketer', 'Community Manager', 'Social Media Manager', 'Traffic Manager', 'Freelance digital']
  ),
  formation('gestion-administration', 'finance-cfp', 'Finance (Pratique)', 'cqp', 'cfp', '1 an', 'Gestion de trésorerie, analyse financière d entreprise et tableaux de bord financiers.',
    ['Trésorerie', 'Analyse financière', 'Tableaux de bord', 'Budget', 'Comptabilité financière', 'Excel avancé', 'Ratios financiers', 'Reporting'],
    ['Assistant financier', 'Analyste financier junior', 'Trésorier', 'Contrôleur de gestion junior', 'Service finance', 'Cabinet finance']
  ),
  formation('gestion-administration', 'audit-fiscal', 'Audit fiscal', 'dqp', 'cfp', '1 an', 'Contrôle de la conformité fiscale, optimisation et déclarations réglementaires.',
    ['Fiscalité', 'Audit fiscal', 'Déclarations fiscales', 'Optimisation fiscale', 'Tax compliance', 'Normes fiscales', 'Reporting fiscal', 'Tax planning'],
    ['Auditeur fiscal', 'Conseiller fiscal', 'Expert-comptable junior', 'Inspecteur des impôts', 'Cabinet fiscal', 'Direction fiscale']
  ),
  formation('gestion-administration', 'commerce-vente-cfp', 'Commerce et vente (Techniques)', 'cqp', 'cfp', '1 an', 'Négociation commerciale, techniques de prospection et fidélisation de clientèle.',
    ['Négociation', 'Prospection', 'Fidélisation', 'Techniques de vente', 'Relation client', 'CRM', 'Closing', 'Présentation commerciale'],
    ['Commercial', 'Vendeur', 'Chargé de clientèle', 'Sales Representative', 'Force de vente', 'Entrepreneur commercial']
  ),
  formation('gestion-administration', 'management-gouvernance', 'Management et gouvernance d entreprise', 'dqp', 'cfp', '1 an', 'Pilotage stratégique des équipes, éthique des affaires et prise de décision.',
    ['Leadership', 'Management d équipe', 'Gouvernance', 'Stratégie d entreprise', 'Prise de décision', 'Éthique business', 'Performance management', 'Change management'],
    ['Manager', 'Directeur junior', 'Team Leader', 'Chef de projet', 'Consultant management', 'Coach professionnel']
  ),

  // Métiers Créatifs & de Service — CFP NO LIMIT
  formation('creatif-service', 'infographie', 'Infographie', 'cqp', 'cfp', '1 an', 'Création d identités visuelles, logos et maquettes avec Photoshop, Illustrator, InDesign.',
    ['Photoshop', 'Illustrator', 'InDesign', 'Design graphique', 'Logo design', 'Mise en page', 'Typographie', 'Charte graphique'],
    ['Infographiste', 'Graphiste', 'Designer freelance', 'Agence de pub', 'Studio design', 'Direction artistique junior']
  ),
  formation('creatif-service', 'montage-audiovisuel', 'Montage audiovisuel', 'cqp', 'cfp', '1 an', 'Traitement vidéo, étalonnage, sound design et montage pro sur Premiere et Final Cut.',
    ['Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Montage vidéo', 'Étalonnage', 'Sound design', 'Motion graphics', 'Compression'],
    ['Monteur vidéo', 'Editor', 'Vidéaste', 'Producteur vidéo', 'TV, production', 'Freelance montage']
  ),
  formation('creatif-service', 'motion-design', 'Motion design', 'cqp', 'cfp', '1 an', 'Animation d éléments graphiques 2D/3D et effets spéciaux avec After Effects.',
    ['After Effects', 'Cinema 4D', 'Animation 2D/3D', 'Motion graphics', 'VFX', 'Character animation', 'Kinetic typography', 'Storytelling visuel'],
    ['Motion designer', 'Animateur 2D/3D', 'VFX artist', 'Studio animation', 'Agence pub', 'Freelance motion']
  ),

  // Santé, QHSE & Social — CFP NO LIMIT
  formation('sante-qhse-social', 'vente-en-pharmacie', 'Vente en pharmacie', 'cqp', 'cfp', '1 an', 'Gestion des stocks de médicaments, accueil des patients et délivrance d ordonnances.',
    ['Gestion stocks', 'Délivrance médicaments', 'Accueil patients', 'Conseil parapharmacie', 'Hygiène', 'Réglementation pharmaceutique', 'Logiciel pharmacie', 'Relation client'],
    ['Préparateur en pharmacie', 'Vendeur parapharmacie', 'Assistant pharmacie', 'Officine', 'Parapharmacie', 'Distribution pharmaceutique']
  ),
  formation('sante-qhse-social', 'qhse', 'Gestion qualité, hygiène, sécurité et environnement', 'dqp', 'cfp', '1 an', 'Mise en place des normes de sécurité au travail et réduction des impacts environnementaux.',
    ['ISO 9001, 14001, 45001', 'Gestion des risques', 'Sécurité au travail', 'Environnement', 'Qualité', 'Hygiène', 'Audits QHSE', 'Réglementation'],
    ['Responsable QHSE', 'Chargé QHSE', 'Auditeur qualité', 'Coordinateur sécurité', 'Environnementaliste', 'Consultant QHSE']
  ),

  // ISSMIGA — Enseignement Supérieur (BTS / Licence / Master)

  // 1. Gestion / Management — ISSMIGA
  formation('gestion-administration', 'gestion-collectivites-territoriales', 'Gestion des collectivités territoriales', 'bts', 'issmiga', '2 ans', 'Administration et développement stratégique des communes et régions décentralisées.',
    ['Administration publique', 'Décentralisation', 'Budget communal', 'Développement local', 'Gestion publique', 'Politiques territoriales', 'Partenariat public-privé', 'Gouvernance locale'],
    ['Administrateur territorial', 'Chef de service communal', 'Conseiller territorial', 'Collectivités territoriales', 'Ministère intérieur', 'ONG locales']
  ),
  formation('gestion-administration', 'assurance', 'Assurance', 'bts', 'issmiga', '2 ans', 'Gestion des contrats de couverture, indemnisation des sinistres et conseil client.',
    ['Droit des assurances', 'Gestion sinistres', 'Produits d assurance', 'Courtage', 'Analyse risque', 'Indemnisation', 'Conseil client', 'Réglementation assurance'],
    ['Courtier en assurance', 'Gestionnaire sinistres', 'Chargé d assurance', 'Compagnie d assurance', 'Courtage', 'Conseil assurance']
  ),
  formation('gestion-administration', 'gestion-logistique-transport', 'Gestion logistique et transport', 'bts', 'issmiga', '2 ans', 'Optimisation de la chaîne logistique, stockage et gestion du fret international.',
    ['Supply chain', 'Transport international', 'Douane', 'Gestion des stocks', 'Incoterms', 'Fret maritime/aérien', 'WMS, TMS', 'Optimisation logistique'],
    ['Responsable logistique', 'Supply Chain Manager', 'Chef de projet transport', 'Transitaire', 'Entreprise logistique', 'Import-export']
  ),
  formation('gestion-administration', 'gestion-qualite-issmiga', 'Gestion de la qualité', 'bts', 'issmiga', '2 ans', 'Déploiement des démarches de certification qualité et amélioration continue.',
    ['ISO 9001', 'Management qualité', 'Process improvement', 'Audit qualité', 'KPI', 'Lean management', 'Six Sigma', 'Certification'],
    ['Responsable qualité', 'Quality Manager', 'Auditeur qualité', 'Consultant qualité', 'Direction qualité', 'Certification']
  ),
  formation('gestion-administration', 'gestion-projets-issmiga', 'Gestion des projets', 'bts', 'issmiga', '2 ans', 'Méthodes de planification, suivi de budget et coordination d équipes projet.',
    ['Project management', 'Planning', 'Budgeting', 'MS Project', 'Risk management', 'Stakeholder management', 'Agile', 'Reporting'],
    ['Chef de projet', 'Project Manager', 'Coordinateur projet', 'PMO', 'Consultant projet', 'Entreprises']
  ),
  formation('gestion-administration', 'ressources-humaines', 'Gestion des ressources humaines', 'bts', 'issmiga', '2 ans', 'Administration du personnel, recrutement, gestion des carrières et de la paie.',
    ['Recrutement', 'Gestion paie', 'Administration personnel', 'Droit du travail', 'Formation', 'GPEC', 'Social dialogue', 'SIRH'],
    ['Responsable RH', 'Chargé RH', 'Recruteur', 'Gestionnaire paie', 'DRH assistant', 'Cabinet RH']
  ),
  formation('gestion-administration', 'banque-finances', 'Banque et finances', 'bts', 'issmiga', '2 ans', 'Analyse de dossiers de crédit, gestion de portefeuille et services bancaires.',
    ['Analyse crédit', 'Produits bancaires', 'Gestion portefeuille', 'Risque bancaire', 'Conformité bancaire', 'Finance', 'Relation client', 'Logiciels bancaires'],
    ['Chargé de clientèle bancaire', 'Analyste crédit', 'Gestionnaire de portefeuille', 'Banque', 'Microfinance', 'Institution financière']
  ),
  formation('gestion-administration', 'comptabilite-gestion-entreprises', 'Comptabilité et gestion des entreprises', 'bts', 'issmiga', '2 ans', 'Établissement des états financiers, bilans, comptes de résultat et gestion fiscale.',
    ['Comptabilité générale', 'Comptabilité analytique', 'Fiscalité', 'Bilan, compte de résultat', 'Logiciels comptables', 'Audit', 'Normes IFRS', 'Reporting'],
    ['Comptable', 'Expert-comptable junior', 'Auditeur junior', 'Cabinet comptable', 'Direction comptable', 'Entreprise']
  ),
  formation('gestion-administration', 'microfinance', 'Microfinance', 'bts', 'issmiga', '2 ans', 'Gestion spécifique des institutions de microcrédit et financement inclusif.',
    ['Microcrédit', 'Finance inclusive', 'Gestion de portefeuille microfinance', 'Analyse risque microfinance', 'Épargne', 'Produits microfinance', 'Social performance', 'Réglementation'],
    ['Agent de microfinance', 'Chargé de crédit microfinance', 'Responsable agence IMF', 'Institution de microfinance', 'ONG financière', 'Banque sociale']
  ),

  // 2. Commerce-Vente / Business and Finance — ISSMIGA
  formation('gestion-administration', 'commerce-international', 'Commerce International', 'bts', 'issmiga', '2 ans', 'Opérations d import-export, techniques douanières et négociation internationale.',
    ['Import-export', 'Douane', 'Incoterms', 'Négociation internationale', 'Lettre de crédit', 'Logistique internationale', 'Marchés étrangers', 'Commerce équitable'],
    ['Chargé d import-export', 'Commercial international', 'Transitaire', 'Entreprise export', 'Chambre de commerce', 'Organisation internationale']
  ),
  formation('gestion-administration', 'marketing-commerce-vente', 'Marketing, Commerce et Vente', 'bts', 'issmiga', '2 ans', 'Études de marché, élaboration de plans marketing et management des forces de vente.',
    ['Marketing stratégique', 'Études de marché', 'Plan marketing', 'Force de vente', 'Marketing digital', 'Brand management', 'Trade marketing', 'Communication'],
    ['Responsable marketing', 'Chef de produit', 'Commercial senior', 'Force de vente', 'Agence marketing', 'Direction commerciale']
  ),

  // 3. Tourisme, Hôtellerie et Restauration — ISSMIGA
  formation('creatif-service', 'hotellerie', 'Hôtellerie', 'bts', 'issmiga', '2 ans', 'Gestion opérationnelle des établissements hôteliers aux standards internationaux.',
    ['Gestion hôtelière', 'Réception', 'Service chambres', 'Standards hôteliers', 'PMS (Property Management System)', 'Relation client', 'Réservations', 'Qualité service'],
    ['Réceptionniste', 'Gouvernante', 'Responsable réception', 'Hôtel', 'Chaîne hôtelière', 'Tourisme']
  ),
  formation('creatif-service', 'gestion-management-hoteliers', 'Gestion et management hôteliers', 'bts', 'issmiga', '2 ans', 'Direction d équipes, rentabilité financière et qualité de service en hôtellerie.',
    ['Management hôtelier', 'Revenue management', 'Gestion financière hôtelière', 'Leadership', 'Qualité service', 'Marketing hôtelier', 'RH hôtellerie', 'Stratégie hôtelière'],
    ['Directeur d hôtel adjoint', 'Manager hôtelier', 'Revenue Manager', 'Hôtellerie', 'Groupe hôtelier', 'Consultant hôtelier']
  ),
  formation('creatif-service', 'management-technique-hebergement', 'Management et technique d hébergement', 'bts', 'issmiga', '2 ans', 'Supervision de la réception, du service d étage et de la relation client.',
    ['Technique hébergement', 'Service étage', 'Conciergerie', 'Housekeeping management', 'Relation client', 'Maintenance', 'Standards qualité', 'Team leadership'],
    ['Responsable hébergement', 'Gouvernante chef', 'Concierge', 'Hôtel', 'Résidence', 'Tourisme']
  ),
  formation('creatif-service', 'restauration', 'Restauration', 'bts', 'issmiga', '2 ans', 'Gestion des approvisionnements, direction de salle et de la production culinaire.',
    ['Gestion restauration', 'Cuisine', 'Salle', 'Approvisionnement', 'Hygiène HACCP', 'Menu planning', 'Coûts food', 'Service client'],
    ['Chef de rang', 'Responsable salle', 'Gérant restaurant', 'Restaurant', 'Catering', 'Hôtellerie']
  ),
  formation('creatif-service', 'genie-culinaire', 'Génie culinaire', 'bts', 'issmiga', '2 ans', 'Art de la haute cuisine, élaboration de menus gastronomiques et gestion de cuisine.',
    ['Cuisine gastronomique', 'Techniques culinaires avancées', 'Menu engineering', 'Gestion cuisine', 'Hygiène', 'Créativité culinaire', 'Coûts', 'Leadership cuisine'],
    ['Chef cuisinier', 'Sous-chef', 'Chef de partie', 'Restaurant gastronomique', 'Hôtel 4-5 étoiles', 'Catering haut de gamme']
  ),
  formation('creatif-service', 'commercialisation-services-restauration', 'Commercialisation et services de restauration', 'bts', 'issmiga', '2 ans', 'Événementiel de restauration, marketing des saveurs et excellence du service à table.',
    ['Marketing restauration', 'Vente restauration', 'Événementiel', 'Service client', 'Upselling', 'Gestion relation client', 'Promotions', 'Digital marketing food'],
    ['Commercial restauration', 'Responsable événementiel', 'Sales manager restauration', 'Catering', 'Chaîne restaurant', 'Hôtellerie']
  ),
  formation('creatif-service', 'tourisme-loisirs', 'Tourisme et loisirs', 'bts', 'issmiga', '2 ans', 'Création de circuits touristiques, guidage et valorisation du patrimoine.',
    ['Guidage touristique', 'Création circuits', 'Patrimoine culturel', 'Tourisme durable', 'Anglais touristique', 'Animation touristique', 'Réservation voyages', 'Relation client'],
    ['Guide touristique', 'Chargé de voyages', 'Animateur touristique', 'Agence de voyage', 'Office du tourisme', 'Tourisme culturel']
  ),
  formation('creatif-service', 'management-touristique', 'Management touristique', 'bts', 'issmiga', '2 ans', 'Direction d agences de voyage, marketing de destinations et écotourisme.',
    ['Management tourisme', 'Marketing destination', 'Écotourisme', 'Gestion agence voyage', 'Revenue management tourisme', 'Stratégie touristique', 'Digital tourisme', 'Développement produit'],
    ['Directeur d agence de voyage', 'Manager tourisme', 'Responsable destination', 'Agence voyage', 'Tourisme durable', 'Office du tourisme']
  ),

  // 4. Carrières Juridiques — ISSMIGA
  formation('gestion-administration', 'droit-affaires-entreprise', 'Droit des affaires et de l entreprise', 'bts', 'issmiga', '2 ans', 'Conseil juridique aux sociétés, rédaction de contrats et gestion du contentieux.',
    ['Droit des sociétés', 'Droit des contrats', 'Contentieux', 'Rédaction juridique', 'Droit commercial', 'Droit du travail', 'Droit fiscal', 'Négociation juridique'],
    ['Juriste d entreprise', 'Conseiller juridique', 'Avocat stagiaire', 'Cabinet d avocats', 'Direction juridique', 'Notariat']
  ),
  formation('gestion-administration', 'gestion-fiscale', 'Gestion fiscale', 'bts', 'issmiga', '2 ans', 'Optimisation de la fiscalité d entreprise et déclarations d impôts réglementaires.',
    ['Fiscalité entreprise', 'Optimisation fiscale', 'Déclarations fiscales', 'Impôt sur les sociétés', 'TVA', 'Fiscalité internationale', 'Audit fiscal', 'Conformité fiscale'],
    ['Fiscaliste', 'Conseiller fiscal', 'Expert-comptable fiscal', 'Cabinet fiscal', 'Direction fiscale', 'Administration fiscale']
  ),
  formation('gestion-administration', 'douane-transit', 'Douane et transit', 'bts', 'issmiga', '2 ans', 'Procédures douanières de dédouanement de marchandises à l import et export.',
    ['Régime douanier', 'Dédouanement', 'Transit', 'Tarif douanier', 'Incoterms', 'Logistique douanière', 'Déclarations', 'Conformité'],
    ['Transitaire', 'Déclarant en douane', 'Agent douane', 'Transitaire', 'Entreprise import-export', 'Administration des douanes']
  ),

  // 5. Réseaux et Télécommunications — ISSMIGA
  formation('cybersecurite', 'telecommunications', 'Télécommunications', 'bts', 'issmiga', '2 ans', 'Déploiement d infrastructures de transmission voix, données et réseaux mobiles.',
    ['Réseaux mobiles (4G/5G)', 'Fibre optique', 'VoIP', 'Transmission', 'Antennes', 'RF planning', 'OSS/BSS', 'Telecom protocols'],
    ['Ingénieur télécoms', 'Technicien télécoms', 'Opérateur télécoms', 'Équipementier télécoms', 'Infrastructure télécoms', 'Consultant télécoms']
  ),
  formation('cybersecurite', 'reseaux-securite-issmiga', 'Réseaux et Sécurité', 'bts', 'issmiga', '2 ans', 'Architecture réseau d entreprise, routage avancé et défense périmétrique.',
    ['Routing (BGP, OSPF)', 'Switching', 'Firewall', 'VPN', 'Network security', 'SDN', 'Wi-Fi enterprise', 'Network monitoring'],
    ['Ingénieur réseau', 'Administrateur réseau', 'Security Network Engineer', 'Opérateur', 'Intégrateur réseau', 'SSII']
  ),

  // 6. Génie Informatique — ISSMIGA
  formation('numerique-it', 'genie-logiciel-bts', 'Génie logiciel', 'bts', 'issmiga', '2 ans', 'Conception, développement orienté objet, bases de données et gestion de projets logiciels.',
    ['UML', 'Java, C#, C++', 'Bases de données', 'Design patterns', 'Architecture logicielle', 'Testing', 'Gestion de projet', 'DevOps basics'],
    ['Ingénieur logiciel', 'Développeur senior', 'Architecte logiciel', 'SSII', 'Startup', 'Direction technique']
  ),
  formation('numerique-it', 'informatique-industrielle-automatisme', 'Informatique industrielle et automatisme', 'bts', 'issmiga', '2 ans', 'Automatisation des lignes de production, capteurs et programmation d automates.',
    ['Automates (Siemens, Schneider)', 'SCADA', 'Capteurs', 'Actionneurs', 'PLC programming', 'Régulation', 'Supervision', 'Industrie 4.0'],
    ['Automaticien', 'Ingénieur automatisme', 'Technicien maintenance industrielle', 'Industrie manufacturière', 'Intégrateur industriel', 'Énergie']
  ),
  formation('numerique-it', 'maintenance-systemes-informatiques', 'Maintenance des systèmes informatiques', 'bts', 'issmiga', '2 ans', 'Maintenance matérielle et logicielle des ordinateurs, serveurs et périphériques.',
    ['Hardware maintenance', 'Windows Server', 'Linux', 'Virtualisation', 'Réseaux', 'Dépannage', 'Backup', 'Active Directory'],
    ['Technicien maintenance informatique', 'Administrateur système', 'Support IT', 'SSII', 'Direction informatique', 'Freelance IT']
  ),
  formation('numerique-it', 'ecommerce-marketing-numerique', 'E-Commerce et Marketing numérique', 'bts', 'issmiga', '2 ans', 'Conception de boutiques en ligne, SEO, SEA et stratégies d acquisition digitales.',
    ['E-commerce platforms', 'SEO, SEA', 'Google Analytics', 'Social media ads', 'Email marketing', 'Conversion optimization', 'UX/UI e-commerce', 'Affiliation'],
    ['E-commerce Manager', 'Digital Marketing Manager', 'Traffic Manager', 'SEO Specialist', 'Startup e-commerce', 'Agence digital']
  ),

  // 7. Économie et entrepreneuriat social / Home Economics — ISSMIGA
  formation('sante-qhse-social', 'esthetique-cosmetique-coiffure', 'Esthétique, Cosmétique et Coiffure', 'bts', 'issmiga', '2 ans', 'Soins du corps, visuels d apparence et techniques de coiffure professionnelles haut de gamme.',
    ['Soins esthétiques', 'Maquillage professionnel', 'Coiffure', 'Colorimétrie', 'Hygiène', 'Conseil image', 'Gestion salon', 'Techniques avancées'],
    ['Esthéticienne', 'Coiffeur-styliste', 'Maquilleur professionnel', 'Salon de coiffure', 'Institut de beauté', 'Freelance beauté']
  ),
  formation('sante-qhse-social', 'puericulture-gerontologie-auxiliaire', 'Puériculture, Gérontologie et Auxiliaire de vie', 'bts', 'issmiga', '2 ans', 'Accompagnement et soins aux enfants en bas âge et aux personnes âgées ou dépendantes.',
    ['Puériculture', 'Gérontologie', 'Soins aux personnes âgées', 'Hygiène', 'Psychologie', 'Premiers secours', 'Accompagnement social', 'Éducation'],
    ['Auxiliaire de vie', 'Assistante maternelle', 'Aide-soignante', 'EHPAD', 'Crèche', 'Service à domicile']
  ),
  formation('sante-qhse-social', 'economie-entrepreneuriat-social', 'Économie et entrepreneuriat social', 'bts', 'issmiga', '2 ans', 'Développement de projets solidaires, coopératives et économie circulaire.',
    ['Économie sociale et solidaire', 'Entrepreneuriat social', 'Coopératives', 'Économie circulaire', 'Business plan social', 'Financement solidaire', 'Impact measurement', 'Innovation sociale'],
    ['Entrepreneur social', 'Manager coopérative', 'Chargé de projet ESS', 'ONG', 'Association', 'Incubateur social']
  ),
]
