-- ==============================================================================
-- MISE À JOUR DES COMPÉTENCES ET DÉBOUCHÉS DES FORMATIONS
-- ==============================================================================
-- Ce script met à jour les colonnes skills et outlets de la table formations
-- avec les données provenant du fichier formations.js

-- CFP NO LIMIT — Numérique & IT
UPDATE public.formations SET 
  skills = ARRAY['HTML5, CSS3, JavaScript', 'React.js, Vue.js', 'React Native, Flutter', 'Node.js, Express', 'REST API, GraphQL', 'Git, GitHub', 'Responsive Design', 'Performance web'],
  outlets = ARRAY['Développeur Frontend', 'Développeur Mobile', 'Développeur Full Stack', 'Freelance web', 'Startup tech', 'Agence digitale']
WHERE id = 'developpement-web-mobile';

UPDATE public.formations SET 
  skills = ARRAY['MongoDB, Mongoose', 'Express.js', 'React.js, Redux', 'Node.js', 'REST API', 'Authentication JWT', 'Cloud deployment', 'Testing'],
  outlets = ARRAY['Développeur Full Stack', 'Développeur Backend', 'Développeur Frontend', 'Architecte web', 'CTO startup', 'Consultant web']
WHERE id = 'developpement-mern';

UPDATE public.formations SET 
  skills = ARRAY['AWS, Azure, GCP', 'Docker, Kubernetes', 'Microservices', 'Serverless', 'CI/CD', 'WebSockets', 'PWA', 'Performance optimization'],
  outlets = ARRAY['Ingénieur Cloud', 'DevOps Engineer', 'Architecte logiciel', 'Ingénieur performance', 'Cloud Architect', 'Tech Lead']
WHERE id = 'technologies-web-avancees';

UPDATE public.formations SET 
  skills = ARRAY['CMS (WordPress, Joomla)', 'SEO, SEM', 'Google Analytics', 'Hébergement web', 'Maintenance site', 'E-commerce (Shopify, PrestaShop)', 'Community management', 'Content creation'],
  outlets = ARRAY['Webmaster', 'Administrateur site web', 'SEO Manager', 'Community Manager', 'E-commerce manager', 'Freelance web']
WHERE id = 'webmaster';

UPDATE public.formations SET 
  skills = ARRAY['Swift, Kotlin', 'React Native', 'Flutter', 'iOS, Android SDK', 'App Store, Play Store', 'Push notifications', 'Mobile UI/UX', 'App monetization'],
  outlets = ARRAY['Développeur iOS', 'Développeur Android', 'Développeur Mobile Cross-platform', 'Mobile Product Manager', 'Startup mobile', 'Freelance mobile']
WHERE id = 'developpement-applications-mobiles';

UPDATE public.formations SET 
  skills = ARRAY['Algorithmique, structures de données', 'Design patterns', 'UML, Merise', 'Java, C#, Python', 'Testing unitaire', 'Code review', 'Clean code', 'Agile, Scrum'],
  outlets = ARRAY['Développeur logiciel', 'Ingénieur logiciel', 'Analyste programmeur', 'Chef de projet technique', 'Software Architect', 'QA Engineer']
WHERE id = 'genie-logiciel';

UPDATE public.formations SET 
  skills = ARRAY['UML, BPMN', 'Merise', 'Architecture SOA', 'Modélisation de données', 'Analyse fonctionnelle', 'Spécifications techniques', 'Gestion de projet SI', 'Documentation technique'],
  outlets = ARRAY['Analyste système', 'Architecte SI', 'Consultant fonctionnel', 'Chef de projet SI', 'Business Analyst', 'Product Owner']
WHERE id = 'analyse-conception-systemes';

UPDATE public.formations SET 
  skills = ARRAY['Hardware, PC assembly', 'Windows, Linux', 'Réseaux TCP/IP', 'Câblage réseau', 'Dépannage matériel', 'Active Directory', 'Virtualisation', 'Backup & Recovery'],
  outlets = ARRAY['Technicien support', 'Administrateur réseau', 'Technicien maintenance', 'Helpdesk', 'SSII', 'Technicien freelance']
WHERE id = 'maintenance-systemes-reseaux';

UPDATE public.formations SET 
  skills = ARRAY['Python (Pandas, NumPy)', 'SQL avancé', 'Data visualization', 'Statistiques', 'Machine Learning basics', 'ETL', 'Big Data tools', 'Dashboard creation'],
  outlets = ARRAY['Data Analyst', 'Data Scientist junior', 'Business Analyst', 'Analyste statistique', 'Consultant data', 'Data Engineer']
WHERE id = 'analyse-des-donnees';

UPDATE public.formations SET 
  skills = ARRAY['Power BI, Tableau', 'ETL (Talend, Informatica)', 'Data Warehouse', 'SQL', 'Reporting', 'KPI, Dashboards', 'Data mining', 'Analytics'],
  outlets = ARRAY['BI Analyst', 'BI Developer', 'Data Analyst', 'Reporting Manager', 'Consultant BI', 'Business Intelligence Manager']
WHERE id = 'business-intelligence';

UPDATE public.formations SET 
  skills = ARRAY['Arduino, ESP32', 'Raspberry Pi', 'Sensors, Actuators', 'MQTT, CoAP', 'Edge computing', 'Embedded C/C++', 'IoT platforms', 'Security IoT'],
  outlets = ARRAY['Ingénieur IoT', 'Développeur embarqué', 'Technicien smart home', 'Startup IoT', 'Industrie 4.0', 'Consultant IoT']
WHERE id = 'internet-des-objets';

UPDATE public.formations SET 
  skills = ARRAY['Python, TensorFlow', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'Data preprocessing', 'Model deployment'],
  outlets = ARRAY['Data Scientist', 'ML Engineer', 'AI Researcher junior', 'Consultant IA', 'Startup IA', 'Analyste IA']
WHERE id = 'intelligence-artificielle';

UPDATE public.formations SET 
  skills = ARRAY['Oracle, PostgreSQL, MySQL', 'SQL tuning', 'Backup & Recovery', 'Replication', 'Security', 'Performance monitoring', 'Stored procedures', 'Cloud DBA'],
  outlets = ARRAY['DBA (Database Administrator)', 'Administrateur base de données', 'Data Engineer', 'Consultant base de données', 'Architecte données', 'Cloud DBA']
WHERE id = 'administration-bases-de-donnees';

UPDATE public.formations SET 
  skills = ARRAY['MongoDB, Cassandra', 'Redis, Elasticsearch', 'NoSQL modeling', 'Big Data (Hadoop, Spark)', 'Data Lake', 'Graph databases', 'Time series DB', 'Polyglot persistence'],
  outlets = ARRAY['NoSQL DBA', 'Big Data Engineer', 'Data Architect', 'Consultant Big Data', 'Engineer Data Lake', 'Architecte NoSQL']
WHERE id = 'bases-de-donnees-avancees';

UPDATE public.formations SET 
  skills = ARRAY['Digital strategy', 'Change management', 'Cloud adoption', 'Process automation', 'Digital marketing', 'Collaborative tools', 'Agile transformation', 'Innovation management'],
  outlets = ARRAY['Consultant transformation digitale', 'Digital Manager', 'Chief Digital Officer junior', 'Coach digital', 'Consultant innovation', 'Project manager digital']
WHERE id = 'transformation-digitale';

UPDATE public.formations SET 
  skills = ARRAY['Research methodologies', 'Competitive intelligence', 'Trend analysis', 'Data mining', 'Social listening', 'Patent analysis', 'Technology scouting', 'Report writing'],
  outlets = ARRAY['Veilleur technologique', 'Analyste innovation', 'Consultant veille', 'Strategic analyst', 'R&D analyst', 'Intelligence économique']
WHERE id = 'veille-technologique';

UPDATE public.formations SET 
  skills = ARRAY['Embedded systems', 'Robotics', 'Computer vision', 'Sensor fusion', 'Autonomous navigation', 'Real-time systems', 'Edge AI', 'ROS (Robot OS)'],
  outlets = ARRAY['Ingénieur systèmes embarqués', 'Robotics engineer', 'Ingénieur vision', 'Développeur autonome', 'Industrie robotique', 'Consultant automation']
WHERE id = 'systemes-intelligents';

UPDATE public.formations SET 
  skills = ARRAY['Agile, Scrum, Kanban', 'Project planning', 'Risk management', 'Budget tracking', 'Team coordination', 'Jira, Trello', 'Stakeholder management', 'QA coordination'],
  outlets = ARRAY['Chef de projet IT', 'Scrum Master', 'Product Owner', 'Project Manager', 'Consultant Agile', 'Delivery Manager']
WHERE id = 'gestion-projet-informatique';

UPDATE public.formations SET 
  skills = ARRAY['Nagios, Zabbix', 'Prometheus, Grafana', 'Log analysis (ELK)', 'Incident management', 'SLA monitoring', 'Performance tuning', 'Capacity planning', 'Automation'],
  outlets = ARRAY['Superviseur SI', 'NOC Engineer', 'SRE (Site Reliability Engineer)', 'Infrastructure monitoring', 'Ops Manager', 'Consultant monitoring']
WHERE id = 'supervision-systemes-information';

-- CFP NO LIMIT — Cybersécurité
UPDATE public.formations SET 
  skills = ARRAY['Security architecture', 'ISO 27001', 'Risk assessment', 'Security policies', 'Compliance', 'Business continuity', 'Disaster recovery', 'Security governance'],
  outlets = ARRAY['RSSI (Chief Information Security Officer)', 'Architecte sécurité', 'Consultant cybersécurité', 'Security Manager', 'Auditeur sécurité', 'Gouvernance SI']
WHERE id = 'architecte-gestion-cybersecurite';

UPDATE public.formations SET 
  skills = ARRAY['Malware analysis', 'Threat intelligence', 'Incident response', 'Forensics', 'SIEM', 'Penetration testing', 'Vulnerability assessment', 'Security monitoring'],
  outlets = ARRAY['Analyste sécurité', 'SOC Analyst', 'Incident Responder', 'Forensic analyst', 'Threat hunter', 'Consultant sécurité']
WHERE id = 'analyse-cybersecurite';

UPDATE public.formations SET 
  skills = ARRAY['Linux administration', 'Windows Server', 'Routing (BGP, OSPF)', 'Firewalls', 'VPN', 'Network security', 'Active Directory', 'Monitoring'],
  outlets = ARRAY['Administrateur systèmes', 'Administrateur réseau', 'SysAdmin', 'Network Engineer', 'Security Administrator', 'DevOps']
WHERE id = 'administration-systemes-reseaux';

UPDATE public.formations SET 
  skills = ARRAY['Firewall (Cisco, Palo Alto)', 'VPN (IPsec, SSL)', 'Network segmentation', 'Encryption', 'IDS/IPS', 'Wireshark', 'Network hardening', 'Zero Trust'],
  outlets = ARRAY['Security Network Engineer', 'Administrateur sécurité réseau', 'Network Security Architect', 'Firewall Administrator', 'Consultant réseau', 'SOC Network']
WHERE id = 'securite-reseaux';

UPDATE public.formations SET 
  skills = ARRAY['ISO 27001, NIST', 'Risk management', 'Security governance', 'Compliance', 'Audit sécurité', 'Security awareness', 'Data protection', 'Business continuity'],
  outlets = ARRAY['Security Manager', 'Compliance Officer', 'Auditeur ISO 27001', 'Risk Manager', 'DPO junior', 'Consultant gouvernance']
WHERE id = 'securite-systemes-information';

UPDATE public.formations SET 
  skills = ARRAY['Penetration testing', 'Vulnerability scanning', 'Security audit', 'Compliance audit', 'Reporting', 'Risk analysis', 'Remediation planning', 'Standards (PCI-DSS, GDPR)'],
  outlets = ARRAY['Auditeur informatique', 'Pentester', 'Security Consultant', 'Auditeur sécurité', 'Compliance Auditor', 'Risk Analyst']
WHERE id = 'audit-controle-systemes';

-- CFP NO LIMIT — Gestion & Administration
UPDATE public.formations SET 
  skills = ARRAY['Comptabilité générale', 'Facturation', 'Saisie comptable', 'Bilan, compte de résultat', 'Logiciel comptable', 'Archivage', 'Rédaction administrative', 'Communication pro'],
  outlets = ARRAY['Secrétaire comptable', 'Assistant comptable', 'Comptable junior', 'Secrétaire administrative', 'PME', 'Cabinet comptable']
WHERE id = 'secretariat-comptable';

UPDATE public.formations SET 
  skills = ARRAY['Pack Office (Word, Excel, PowerPoint)', 'Bureautique avancée', 'Anglais professionnel', 'Rédaction', 'Gestion agenda', 'Accueil téléphonique', 'Traduction basique', 'Communication'],
  outlets = ARRAY['Secrétaire bilingue', 'Assistant administratif', 'Réceptionniste bilingue', 'Assistant de direction', 'International companies', 'Organisations internationales']
WHERE id = 'secretariat-bureautique-bilingue';

UPDATE public.formations SET 
  skills = ARRAY['Gestion agenda', 'Organisation événements', 'Réunions', 'Protocole', 'Anglais courant', 'Rédaction courriers', 'Relations publiques', 'Confidentialité'],
  outlets = ARRAY['Assistante de direction', 'Assistant exécutif', 'PA (Personal Assistant)', 'Secrétaire générale junior', 'Direction générale', 'Cabinet conseil']
WHERE id = 'assistante-direction-bilingue';

UPDATE public.formations SET 
  skills = ARRAY['Business plan', 'Création entreprise', 'Gestion startup', 'Marketing', 'Finance startup', 'Pitch deck', 'Networking', 'Innovation'],
  outlets = ARRAY['Entrepreneur', 'Créateur d entreprise', 'Startup founder', 'Consultant création', 'Accélérateur startup', 'Incubateur']
WHERE id = 'entreprenariat';

UPDATE public.formations SET 
  skills = ARRAY['Enterprise Architecture', 'TOGAF', 'Business strategy', 'IT alignment', 'Process mapping', 'Digital transformation', 'Governance', 'Portfolio management'],
  outlets = ARRAY['Architecte d entreprise', 'Enterprise Architect', 'Consultant EA', 'Strategic IT Advisor', 'Transformation Lead', 'Business Architect']
WHERE id = 'architecture-entreprise';

UPDATE public.formations SET 
  skills = ARRAY['E-commerce', 'SEO/SEM', 'Social media marketing', 'Google Ads, Facebook Ads', 'Email marketing', 'Content marketing', 'Analytics', 'CRM'],
  outlets = ARRAY['E-commerce Manager', 'Digital Marketer', 'Community Manager', 'Social Media Manager', 'Traffic Manager', 'Freelance digital']
WHERE id = 'e-business-marketing-digital';

UPDATE public.formations SET 
  skills = ARRAY['Trésorerie', 'Analyse financière', 'Tableaux de bord', 'Budget', 'Comptabilité financière', 'Excel avancé', 'Ratios financiers', 'Reporting'],
  outlets = ARRAY['Assistant financier', 'Analyste financier junior', 'Trésorier', 'Contrôleur de gestion junior', 'Service finance', 'Cabinet finance']
WHERE id = 'finance';

UPDATE public.formations SET 
  skills = ARRAY['Fiscalité', 'Audit fiscal', 'Déclarations fiscales', 'Optimisation fiscale', 'Tax compliance', 'Normes fiscales', 'Reporting fiscal', 'Tax planning'],
  outlets = ARRAY['Auditeur fiscal', 'Conseiller fiscal', 'Expert-comptable junior', 'Inspecteur des impôts', 'Cabinet fiscal', 'Direction fiscale']
WHERE id = 'audit-fiscal';

UPDATE public.formations SET 
  skills = ARRAY['Négociation', 'Prospection', 'Fidélisation', 'Techniques de vente', 'Relation client', 'CRM', 'Closing', 'Présentation commerciale'],
  outlets = ARRAY['Commercial', 'Vendeur', 'Chargé de clientèle', 'Sales Representative', 'Force de vente', 'Entrepreneur commercial']
WHERE id = 'commerce-vente';

UPDATE public.formations SET 
  skills = ARRAY['Leadership', 'Management d équipe', 'Gouvernance', 'Stratégie d entreprise', 'Prise de décision', 'Éthique business', 'Performance management', 'Change management'],
  outlets = ARRAY['Manager', 'Directeur junior', 'Team Leader', 'Chef de projet', 'Consultant management', 'Coach professionnel']
WHERE id = 'management-gouvernance';

-- CFP NO LIMIT — Métiers Créatifs & de Service
UPDATE public.formations SET 
  skills = ARRAY['Photoshop', 'Illustrator', 'InDesign', 'Design graphique', 'Logo design', 'Mise en page', 'Typographie', 'Charte graphique'],
  outlets = ARRAY['Infographiste', 'Graphiste', 'Designer freelance', 'Agence de pub', 'Studio design', 'Direction artistique junior']
WHERE id = 'infographie';

UPDATE public.formations SET 
  skills = ARRAY['Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Montage vidéo', 'Étalonnage', 'Sound design', 'Motion graphics', 'Compression'],
  outlets = ARRAY['Monteur vidéo', 'Editor', 'Vidéaste', 'Producteur vidéo', 'TV, production', 'Freelance montage']
WHERE id = 'montage-audiovisuel';

UPDATE public.formations SET 
  skills = ARRAY['After Effects', 'Cinema 4D', 'Animation 2D/3D', 'Motion graphics', 'VFX', 'Character animation', 'Kinetic typography', 'Storytelling visuel'],
  outlets = ARRAY['Motion designer', 'Animateur 2D/3D', 'VFX artist', 'Studio animation', 'Agence pub', 'Freelance motion']
WHERE id = 'motion-design';

-- CFP NO LIMIT — Santé, QHSE & Social
UPDATE public.formations SET 
  skills = ARRAY['Gestion stocks', 'Délivrance médicaments', 'Accueil patients', 'Conseil parapharmacie', 'Hygiène', 'Réglementation pharmaceutique', 'Logiciel pharmacie', 'Relation client'],
  outlets = ARRAY['Préparateur en pharmacie', 'Vendeur parapharmacie', 'Assistant pharmacie', 'Officine', 'Parapharmacie', 'Distribution pharmaceutique']
WHERE id = 'vente-en-pharmacie';

UPDATE public.formations SET 
  skills = ARRAY['ISO 9001, 14001, 45001', 'Gestion des risques', 'Sécurité au travail', 'Environnement', 'Qualité', 'Hygiène', 'Audits QHSE', 'Réglementation'],
  outlets = ARRAY['Responsable QHSE', 'Chargé QHSE', 'Auditeur qualité', 'Coordinateur sécurité', 'Environnementaliste', 'Consultant QHSE']
WHERE id = 'qhse';
