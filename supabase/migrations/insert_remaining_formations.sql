-- ==============================================================================
-- INSERTION DES FORMATIONS MANQUANTES - SUITE
-- ==============================================================================
-- Ce script continue l'insertion des formations manquantes
-- ==============================================================================

-- CFP NO LIMIT — Numérique (suite)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'internet-des-objets',
  'numerique-it',
  'internet-des-objets',
  'Internet des objets (IoT)',
  'Connectez le monde physique au numérique.',
  'Connectez le monde physique au numérique via les capteurs et microcontrôleurs.',
  'dqp',
  '1 an',
  ARRAY[
    'Raccorder capteurs et actionneurs à une carte de prototypage',
    'Programmer la collecte et la transmission de mesures',
    'Afficher des données et déclencher des alertes simples',
    'Tester fiabilité, consommation et sécurité d un prototype'
  ],
  ARRAY[
    'Technicien IoT junior',
    'Assistant intégration de capteurs',
    'Technicien de prototypage connecté'
  ],
  11,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'intelligence-artificielle',
  'numerique-it',
  'intelligence-artificielle',
  'Intelligence artificielle',
  'Machine Learning, Deep Learning et modèles IA.',
  'Introduction au Machine Learning, Deep Learning et développement de modèles IA.',
  'dqp',
  '1 an',
  ARRAY[
    'Préparer un jeu de données et définir un objectif mesurable',
    'Utiliser un modèle existant pour une tâche simple',
    'Évaluer erreurs, biais et limites des résultats',
    'Intégrer un outil d IA dans un processus avec contrôle humain'
  ],
  ARRAY[
    'Assistant projets IA',
    'Assistant préparation de données',
    'Technicien intégration d outils IA'
  ],
  12,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'administration-bases-de-donnees',
  'numerique-it',
  'administration-bases-de-donnees',
  'Administration et optimisation des bases de données',
  'Sécurisation et gestion des bases de données.',
  'Sécurisation, gestion et optimisation des performances Oracle, PostgreSQL et MySQL.',
  'dqp',
  '1 an',
  ARRAY[
    'Installer un système de gestion de bases de données',
    'Créer comptes, permissions et procédures de sauvegarde',
    'Analyser les requêtes et améliorer leur performance',
    'Tester une restauration et documenter les opérations de maintenance'
  ],
  ARRAY[
    'Assistant administrateur de bases de données',
    'Technicien bases de données',
    'Assistant exploitation informatique'
  ],
  13,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'bases-de-donnees-avancees',
  'numerique-it',
  'bases-de-donnees-avancees',
  'Bases de données avancées',
  'Architecture NoSQL, Big Data et entrepôts de données.',
  'Architecture NoSQL, Big Data et entrepôts de données complexes.',
  'dqp',
  '1 an',
  ARRAY[
    'Concevoir un modèle relationnel cohérent et normalisé',
    'Écrire des requêtes complexes, vues et transactions',
    'Comparer les usages des bases relationnelles et non relationnelles',
    'Contrôler intégrité, concurrence et qualité des données'
  ],
  ARRAY[
    'Développeur bases de données junior',
    'Assistant ingénierie des données',
    'Technicien gestion de données'
  ],
  14,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'transformation-digitale',
  'numerique-it',
  'transformation-digitale',
  'Transformation digitale',
  'Accompagnement des entreprises dans l adoption des technologies.',
  'Accompagnement des entreprises dans l adoption des technologies et outils numériques.',
  'cqp',
  '1 an',
  ARRAY[
    'Identifier les tâches pouvant être simplifiées par des outils numériques',
    'Cartographier un processus et repérer ses points de blocage',
    'Configurer des outils collaboratifs et circuits de documents',
    'Accompagner les utilisateurs et mesurer les gains obtenus'
  ],
  ARRAY[
    'Assistant transformation numérique',
    'Assistant gestion documentaire',
    'Assistant déploiement d outils collaboratifs'
  ],
  15,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'veille-technologique',
  'numerique-it',
  'veille-technologique',
  'Veille technologique',
  'Méthodes de recherche et d analyse stratégique.',
  'Méthodes de recherche, d analyse stratégique et d anticipation des innovations.',
  'cqp',
  '1 an',
  ARRAY[
    'Définir un besoin de veille et sélectionner des sources fiables',
    'Organiser une collecte régulière d informations',
    'Comparer les solutions selon coût, usages et risques',
    'Produire une synthèse documentée pour éclairer une décision'
  ],
  ARRAY[
    'Assistant veille technologique',
    'Assistant documentation numérique',
    'Assistant études numériques'
  ],
  16,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'systemes-intelligents',
  'numerique-it',
  'systemes-intelligents',
  'Systèmes intelligents',
  'Développement de systèmes automatisés embarqués.',
  'Développement de systèmes automatisés embarqués autonomes et interactifs.',
  'dqp',
  '1 an',
  ARRAY[
    'Décrire un système associant capteurs, données et règles de décision',
    'Programmer des comportements automatisés simples',
    'Intégrer un modèle ou service d IA à un prototype',
    'Tester les performances et prévoir un mode de fonctionnement sûr'
  ],
  ARRAY[
    'Assistant intégration de systèmes intelligents',
    'Technicien prototypage',
    'Assistant automatisation numérique'
  ],
  17,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'gestion-projet-informatique',
  'numerique-it',
  'gestion-projet-informatique',
  'Gestion de projet informatique',
  'Pilotage de projets technologiques avec Agiles et Scrum.',
  'Pilotage de projets technologiques avec les méthodologies Agiles et Scrum.',
  'cqp',
  '1 an',
  ARRAY[
    'Définir objectifs, livrables et acteurs d un projet',
    'Organiser tâches, calendrier et ressources disponibles',
    'Suivre avancement, anomalies et demandes de changement',
    'Préparer comptes rendus, tests de réception et documentation'
  ],
  ARRAY[
    'Assistant chef de projet informatique',
    'Assistant coordination numérique',
    'Assistant suivi de projets'
  ],
  18,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'supervision-systemes-information',
  'numerique-it',
  'supervision-systemes-information',
  'Supervision des systèmes d information',
  'Monitoring en temps réel et maintien en condition opérationnelle.',
  'Monitoring en temps réel, alertes et maintien en condition opérationnelle des infrastructures.',
  'dqp',
  '1 an',
  ARRAY[
    'Surveiller disponibilité et utilisation des équipements',
    'Configurer des indicateurs et alertes d exploitation',
    'Analyser journaux et incidents puis escalader les anomalies',
    'Documenter les interventions et vérifier les sauvegardes'
  ],
  ARRAY[
    'Technicien supervision informatique',
    'Opérateur exploitation informatique',
    'Assistant centre de services'
  ],
  19,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- CFP NO LIMIT — Cybersécurité (5 formations manquantes)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'analyse-cybersecurite',
  'cybersecurite',
  'analyse-cybersecurite',
  'Analyse et cybersécurité',
  'Détection des menaces et réponse aux incidents.',
  'Détection des menaces, analyse de malwares et réponse aux incidents de sécurité.',
  'dqp',
  '1 an',
  ARRAY[
    'Repérer des événements suspects dans des journaux techniques',
    'Qualifier une alerte et préserver les éléments utiles',
    'Effectuer des vérifications sur un environnement autorisé',
    'Rédiger un compte rendu et recommander des mesures correctives'
  ],
  ARRAY[
    'Analyste sécurité junior',
    'Opérateur supervision de sécurité junior',
    'Assistant réponse aux incidents'
  ],
  21,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'administration-systemes-reseaux',
  'cybersecurite',
  'administration-systemes-reseaux',
  'Administration systèmes et réseaux',
  'Configuration et administration de serveurs Linux/Windows.',
  'Configuration, administration de serveurs Linux/Windows et routage réseau.',
  'cqp',
  '1 an',
  ARRAY[
    'Installer et configurer des systèmes et services de base',
    'Créer les comptes et gérer les droits d accès',
    'Configurer adressage et équipements d un réseau local',
    'Maintenir les services avec sauvegardes et procédures documentées'
  ],
  ARRAY[
    'Technicien systèmes et réseaux',
    'Technicien support infrastructure',
    'Assistant administrateur réseau'
  ],
  22,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'securite-reseaux',
  'cybersecurite',
  'securite-reseaux',
  'Sécurité et réseaux',
  'Mise en place de pare-feu, VPN et protocoles sécurisés.',
  'Mise en place de pare-feu, VPN, chiffrements et protocoles réseau sécurisés.',
  'cqp',
  '1 an',
  ARRAY[
    'Identifier les équipements et flux d un réseau',
    'Configurer filtrage, segmentation et accès distant',
    'Appliquer mises à jour et mesures de protection',
    'Tester les règles d accès et documenter la configuration'
  ],
  ARRAY[
    'Technicien réseau junior',
    'Assistant sécurité réseau',
    'Technicien support réseau'
  ],
  23,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'securite-systemes-information',
  'cybersecurite',
  'securite-systemes-information',
  'Sécurité des systèmes d information',
  'Gouvernance de la sécurité des SI et normes ISO 27001.',
  'Gouvernance de la sécurité des SI, normes ISO 27001 et gestion des risques.',
  'dqp',
  '1 an',
  ARRAY[
    'Recenser les informations sensibles et leurs usages',
    'Appliquer contrôle des accès et sauvegardes adaptées',
    'Sensibiliser les utilisateurs aux risques numériques',
    'Contribuer à un plan de continuité et au suivi des incidents'
  ],
  ARRAY[
    'Assistant sécurité des systèmes d information',
    'Technicien protection des postes',
    'Assistant continuité informatique'
  ],
  24,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'audit-controle-systemes',
  'cybersecurite',
  'audit-controle-systemes',
  'Audit et contrôle des systèmes informatiques',
  'Évaluation de la conformité et tests d intrusion.',
  'Évaluation de la conformité, tests d intrusion et rapports de vulnérabilités.',
  'dqp',
  '1 an',
  ARRAY[
    'Définir un périmètre de contrôle et une grille de vérification',
    'Examiner configurations, permissions et traces d activité',
    'Consigner les preuves et hiérarchiser les écarts',
    'Présenter un rapport et suivre les actions correctives'
  ],
  ARRAY[
    'Assistant audit informatique',
    'Technicien contrôle des configurations',
    'Assistant contrôle interne informatique'
  ],
  25,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- CFP NO LIMIT — Gestion (8 formations manquantes)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'secretariat-bureautique-bilingue',
  'gestion-administration',
  'secretariat-bureautique-bilingue',
  'Secrétariat bureautique bilingue',
  'Maîtrise complète des outils bureautiques bilingues.',
  'Maîtrise complète des outils bureautiques et rédaction professionnelle en français et anglais.',
  'cqp',
  '1 an',
  ARRAY[
    'Rédiger courriers et messages professionnels en français et en anglais',
    'Créer documents, tableaux et présentations bureautiques',
    'Accueillir les interlocuteurs et orienter les demandes',
    'Classer les dossiers et organiser rendez-vous et réunions'
  ],
  ARRAY[
    'Secrétaire bilingue',
    'Agent d accueil bilingue',
    'Assistant administratif'
  ],
  27,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'assistante-direction-bilingue',
  'gestion-administration',
  'assistante-direction-bilingue',
  'Secrétariat assistante de direction bilingue',
  'Gestion d agenda et relations publiques bilingues.',
  'Gestion d agenda, organisation de réunions de haut niveau et relations publiques.',
  'cqp',
  '1 an',
  ARRAY[
    'Gérer un agenda et prioriser les demandes de la direction',
    'Rédiger notes et comptes rendus en français et en anglais',
    'Organiser réunions, déplacements et suivi des décisions',
    'Traiter des dossiers confidentiels avec méthode et discrétion'
  ],
  ARRAY[
    'Assistant de direction bilingue junior',
    'Assistant exécutif junior',
    'Secrétaire de direction'
  ],
  28,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'entreprenariat',
  'gestion-administration',
  'entreprenariat',
  'Entreprenariat',
  'De l idée au business plan : création et gestion.',
  'De l idée au business plan : création, gestion et développement d une startup.',
  'cqp',
  '1 an',
  ARRAY[
    'Identifier un besoin client et tester une idée d activité',
    'Estimer coûts, prix et besoins de financement',
    'Préparer un plan d affaires simple et un suivi de trésorerie',
    'Organiser prospection, vente et démarches de création à vérifier'
  ],
  ARRAY[
    'Créateur de petite activité',
    'Assistant développement commercial',
    'Assistant gestion de microentreprise'
  ],
  29,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'architecture-entreprise',
  'gestion-administration',
  'architecture-entreprise',
  'Architecture d entreprise',
  'Alignement stratégie business et SI.',
  'Alignement de la stratégie business d une organisation avec ses outils et SI.',
  'dqp',
  '1 an',
  ARRAY[
    'Cartographier les activités, données et outils d une organisation',
    'Repérer redondances, dépendances et besoins d intégration',
    'Proposer un modèle de fonctionnement cible simple',
    'Documenter les étapes d amélioration et les impacts sur les équipes'
  ],
  ARRAY[
    'Assistant analyse de processus',
    'Assistant organisation',
    'Assistant projets de transformation'
  ],
  30,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'e-business-marketing-digital',
  'gestion-administration',
  'e-business-marketing-digital',
  'E-business et marketing digital',
  'Stratégies de vente en ligne et marketing digital.',
  'Stratégies de vente en ligne, community management et publicité sur les réseaux.',
  'cqp',
  '1 an',
  ARRAY[
    'Préparer une offre commerciale pour un canal numérique',
    'Créer contenus et campagnes adaptés à une cible',
    'Gérer demandes clients et commandes en ligne',
    'Suivre trafic, conversions et résultats d une campagne'
  ],
  ARRAY[
    'Assistant marketing digital',
    'Assistant e-commerce',
    'Animateur de communauté junior'
  ],
  31,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'finance',
  'gestion-administration',
  'finance',
  'Finance',
  'Gestion de trésorerie et analyse financière.',
  'Gestion de trésorerie, analyse financière d entreprise et tableaux de bord financiers.',
  'cqp',
  '1 an',
  ARRAY[
    'Établir un budget simple et prévoir les flux de trésorerie',
    'Comparer coûts et recettes d une activité',
    'Calculer des indicateurs de rentabilité et de liquidité',
    'Préparer un tableau de suivi et signaler les écarts'
  ],
  ARRAY[
    'Assistant trésorerie',
    'Assistant gestion financière',
    'Agent de suivi budgétaire'
  ],
  32,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'audit-fiscal',
  'gestion-administration',
  'audit-fiscal',
  'Audit fiscal',
  'Contrôle de la conformité fiscale et optimisation.',
  'Contrôle de la conformité fiscale, optimisation et déclarations réglementaires.',
  'dqp',
  '1 an',
  ARRAY[
    'Organiser les pièces nécessaires à un contrôle fiscal interne',
    'Comparer déclarations et documents comptables sur un cas pédagogique',
    'Repérer incohérences et risques de non-conformité',
    'Rédiger une note de contrôle sous supervision'
  ],
  ARRAY[
    'Assistant contrôle fiscal interne',
    'Assistant cabinet comptable',
    'Assistant conformité fiscale'
  ],
  33,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'commerce-vente',
  'gestion-administration',
  'commerce-vente',
  'Commerce et vente',
  'Négociation commerciale et techniques de prospection.',
  'Négociation commerciale, techniques de prospection et fidélisation de clientèle.',
  'cqp',
  '1 an',
  ARRAY[
    'Identifier les besoins d un client et présenter une offre',
    'Argumenter, traiter les objections et conclure une vente',
    'Tenir un fichier clients et organiser les relances',
    'Suivre stocks, commandes et satisfaction de la clientèle'
  ],
  ARRAY[
    'Vendeur conseil',
    'Commercial junior',
    'Agent de service clientèle'
  ],
  34,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'management-gouvernance',
  'gestion-administration',
  'management-gouvernance',
  'Management et gouvernance d entreprise',
  'Pilotage stratégique des équipes et prise de décision.',
  'Pilotage stratégique des équipes, éthique des affaires et prise de décision.',
  'dqp',
  '1 an',
  ARRAY[
    'Organiser les tâches et responsabilités d une petite équipe',
    'Préparer des indicateurs de suivi d activité',
    'Formaliser procédures, décisions et circulation de l information',
    'Identifier les risques organisationnels et proposer des améliorations'
  ],
  ARRAY[
    'Assistant management',
    'Assistant coordination d activité',
    'Assistant contrôle interne'
  ],
  35,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- CFP NO LIMIT — Création (2 formations manquantes)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'montage-audiovisuel',
  'creatif-service',
  'montage-audiovisuel',
  'Montage audiovisuel',
  'Traitement vidéo, étalonnage et sound design.',
  'Traitement vidéo, étalonnage, sound design et montage pro sur Premiere et Final Cut.',
  'cqp',
  '1 an',
  ARRAY[
    'Organiser les fichiers vidéo et audio d un projet',
    'Assembler un récit cohérent avec coupes et transitions',
    'Ajuster son, sous-titres et colorimétrie de base',
    'Exporter des versions adaptées aux canaux de diffusion'
  ],
  ARRAY[
    'Monteur vidéo junior',
    'Assistant postproduction',
    'Créateur de contenus vidéo'
  ],
  37,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'motion-design',
  'creatif-service',
  'motion-design',
  'Motion design',
  'Animation d éléments graphiques 2D/3D et effets spéciaux.',
  'Animation d éléments graphiques 2D/3D et effets spéciaux avec After Effects.',
  'cqp',
  '1 an',
  ARRAY[
    'Concevoir un storyboard et des éléments graphiques animables',
    'Animer textes, formes et transitions visuelles',
    'Synchroniser l animation avec voix, musique et rythme',
    'Exporter une animation lisible pour différents écrans'
  ],
  ARRAY[
    'Motion designer junior',
    'Assistant animation graphique',
    'Créateur de contenus animés'
  ],
  38,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- CFP NO LIMIT — Santé et QHSE (1 formation manquante)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'qhse',
  'sante-qhse-social',
  'qhse',
  'Gestion qualité, hygiène, sécurité et environnement',
  'Mise en place des normes de sécurité au travail.',
  'Mise en place des normes de sécurité au travail et réduction des impacts environnementaux.',
  'dqp',
  '1 an',
  ARRAY[
    'Identifier les risques d une activité et les mesures de prévention',
    'Rédiger procédures et fiches de contrôle QHSE',
    'Suivre incidents, déchets et indicateurs de conformité',
    'Participer aux inspections et proposer des actions correctives'
  ],
  ARRAY[
    'Assistant QHSE',
    'Animateur prévention junior',
    'Agent contrôle qualité'
  ],
  40,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;
