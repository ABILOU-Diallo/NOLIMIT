-- ==============================================================================
-- SCRIPT COMPLET : MISE À JOUR ET INSERTION DES FORMATIONS AVEC COMPÉTENCES ET DÉBOUCHÉS
-- ==============================================================================
-- Ce script :
-- 1. Met à jour les formations CFP NO LIMIT existantes (skills et outlets)
-- 2. Insère les formations ISSMIGA manquantes avec leurs compétences et débouchés
-- ==============================================================================

-- ============================================================================
-- PARTIE 1 : MISE À JOUR DES FORMATIONS CFP NO LIMIT EXISTANTES
-- ============================================================================

-- CFP NO LIMIT — Numérique

-- 01 Développement web et mobile
UPDATE public.formations SET 
  skills = ARRAY[
    'Analyser un besoin utilisateur et définir les écrans d une application',
    'Créer des interfaces adaptées aux ordinateurs et téléphones',
    'Relier une application à une base de données et à une API',
    'Tester, corriger et déployer un projet documenté'
  ],
  outlets = ARRAY[
    'Développeur web junior',
    'Intégrateur web',
    'Assistant développeur mobile'
  ]
WHERE id = 'developpement-web-mobile';

-- 02 Développement d'application web full stack MERN
UPDATE public.formations SET 
  skills = ARRAY[
    'Construire une interface React avec composants réutilisables',
    'Développer une API avec Node.js et Express',
    'Structurer des données et requêtes dans MongoDB',
    'Mettre en place authentification, tests et déploiement d une application'
  ],
  outlets = ARRAY[
    'Développeur JavaScript junior',
    'Développeur full stack junior',
    'Assistant développeur back end'
  ]
WHERE id = 'developpement-mern';

-- 03 Technologies web avancées
UPDATE public.formations SET 
  skills = ARRAY[
    'Organiser une application web modulaire avec gestion des versions',
    'Intégrer des API et mécanismes d échange de données',
    'Améliorer performance, accessibilité et sécurité d un site',
    'Automatiser des tests et documenter le déploiement'
  ],
  outlets = ARRAY[
    'Développeur web junior',
    'Intégrateur d applications web',
    'Assistant chargé de maintenance web'
  ]
WHERE id = 'technologies-web-avancees';

-- 04 Webmaster
UPDATE public.formations SET 
  skills = ARRAY[
    'Installer et administrer un site avec un système de gestion de contenu',
    'Publier des pages cohérentes et accessibles',
    'Effectuer sauvegardes, mises à jour et contrôles de fonctionnement',
    'Suivre les visites et améliorer le référencement des contenus'
  ],
  outlets = ARRAY[
    'Webmaster junior',
    'Gestionnaire de contenu web',
    'Assistant communication numérique'
  ]
WHERE id = 'webmaster';

-- 05 Développement des applications mobiles
UPDATE public.formations SET 
  skills = ARRAY[
    'Concevoir les écrans et parcours d une application mobile',
    'Programmer navigation, formulaires et accès aux données',
    'Gérer permissions, stockage local et synchronisation',
    'Tester une application sur plusieurs appareils et préparer sa diffusion'
  ],
  outlets = ARRAY[
    'Développeur mobile junior',
    'Testeur d applications mobiles',
    'Assistant développement d applications'
  ]
WHERE id = 'developpement-applications-mobiles';

-- 06 Génie logiciel (Pratique)
UPDATE public.formations SET 
  skills = ARRAY[
    'Traduire un besoin métier en fonctionnalités et tâches',
    'Programmer des modules réutilisables et lisibles',
    'Construire des tests et corriger les anomalies',
    'Utiliser un dépôt de code et rédiger une documentation utilisateur'
  ],
  outlets = ARRAY[
    'Développeur d applications junior',
    'Testeur logiciel junior',
    'Technicien support applicatif'
  ]
WHERE id = 'genie-logiciel';

-- 07 Analyse et conception des systèmes
UPDATE public.formations SET 
  skills = ARRAY[
    'Recueillir les besoins et décrire les processus d une organisation',
    'Modéliser les données, acteurs et fonctionnalités d un système',
    'Rédiger un cahier des charges et des scénarios de validation',
    'Produire des maquettes et expliquer les choix de conception'
  ],
  outlets = ARRAY[
    'Assistant analyste fonctionnel',
    'Assistant conception de systèmes',
    'Testeur fonctionnel junior'
  ]
WHERE id = 'analyse-conception-systemes';

-- 08 Maintenance des systèmes et réseaux informatiques
UPDATE public.formations SET 
  skills = ARRAY[
    'Installer et configurer des postes et périphériques',
    'Diagnostiquer les pannes matérielles et logicielles courantes',
    'Mettre en service un petit réseau local et vérifier sa connectivité',
    'Réaliser sauvegardes, maintenance préventive et suivi des interventions'
  ],
  outlets = ARRAY[
    'Technicien maintenance informatique',
    'Technicien support utilisateurs',
    'Assistant technicien réseau'
  ]
WHERE id = 'maintenance-systemes-reseaux';

-- 09 Analyse des données
UPDATE public.formations SET 
  skills = ARRAY[
    'Collecter et nettoyer des données issues de plusieurs fichiers',
    'Calculer des indicateurs et repérer incohérences et tendances',
    'Créer des graphiques et tableaux de bord lisibles',
    'Présenter les résultats avec leurs limites et protéger les données'
  ],
  outlets = ARRAY[
    'Assistant analyste de données',
    'Assistant reporting',
    'Gestionnaire de données junior'
  ]
WHERE id = 'analyse-des-donnees';

-- 10 Business intelligence
UPDATE public.formations SET 
  skills = ARRAY[
    'Définir des indicateurs utiles à une décision opérationnelle',
    'Préparer des données et organiser leur actualisation',
    'Construire un tableau de bord avec filtres et visualisations',
    'Contrôler la cohérence des chiffres et documenter les calculs'
  ],
  outlets = ARRAY[
    'Assistant reporting décisionnel',
    'Développeur BI junior',
    'Assistant contrôle de gestion'
  ]
WHERE id = 'business-intelligence';

-- 11 Internet des objets (IoT)
UPDATE public.formations SET 
  skills = ARRAY[
    'Raccorder capteurs et actionneurs à une carte de prototypage',
    'Programmer la collecte et la transmission de mesures',
    'Afficher des données et déclencher des alertes simples',
    'Tester fiabilité, consommation et sécurité d un prototype'
  ],
  outlets = ARRAY[
    'Technicien IoT junior',
    'Assistant intégration de capteurs',
    'Technicien de prototypage connecté'
  ]
WHERE id = 'internet-des-objets';

-- 12 Intelligence artificielle
UPDATE public.formations SET 
  skills = ARRAY[
    'Préparer un jeu de données et définir un objectif mesurable',
    'Utiliser un modèle existant pour une tâche simple',
    'Évaluer erreurs, biais et limites des résultats',
    'Intégrer un outil d IA dans un processus avec contrôle humain'
  ],
  outlets = ARRAY[
    'Assistant projets IA',
    'Assistant préparation de données',
    'Technicien intégration d outils IA'
  ]
WHERE id = 'intelligence-artificielle';

-- 13 Administration et optimisation des bases de données
UPDATE public.formations SET 
  skills = ARRAY[
    'Installer un système de gestion de bases de données',
    'Créer comptes, permissions et procédures de sauvegarde',
    'Analyser les requêtes et améliorer leur performance',
    'Tester une restauration et documenter les opérations de maintenance'
  ],
  outlets = ARRAY[
    'Assistant administrateur de bases de données',
    'Technicien bases de données',
    'Assistant exploitation informatique'
  ]
WHERE id = 'administration-bases-de-donnees';

-- 14 Bases de données avancées
UPDATE public.formations SET 
  skills = ARRAY[
    'Concevoir un modèle relationnel cohérent et normalisé',
    'Écrire des requêtes complexes, vues et transactions',
    'Comparer les usages des bases relationnelles et non relationnelles',
    'Contrôler intégrité, concurrence et qualité des données'
  ],
  outlets = ARRAY[
    'Développeur bases de données junior',
    'Assistant ingénierie des données',
    'Technicien gestion de données'
  ]
WHERE id = 'bases-de-donnees-avancees';

-- 15 Transformation digitale
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les tâches pouvant être simplifiées par des outils numériques',
    'Cartographier un processus et repérer ses points de blocage',
    'Configurer des outils collaboratifs et circuits de documents',
    'Accompagner les utilisateurs et mesurer les gains obtenus'
  ],
  outlets = ARRAY[
    'Assistant transformation numérique',
    'Assistant gestion documentaire',
    'Assistant déploiement d outils collaboratifs'
  ]
WHERE id = 'transformation-digitale';

-- 16 Veille technologique
UPDATE public.formations SET 
  skills = ARRAY[
    'Définir un besoin de veille et sélectionner des sources fiables',
    'Organiser une collecte régulière d informations',
    'Comparer les solutions selon coût, usages et risques',
    'Produire une synthèse documentée pour éclairer une décision'
  ],
  outlets = ARRAY[
    'Assistant veille technologique',
    'Assistant documentation numérique',
    'Assistant études numériques'
  ]
WHERE id = 'veille-technologique';

-- 17 Systèmes intelligents
UPDATE public.formations SET 
  skills = ARRAY[
    'Décrire un système associant capteurs, données et règles de décision',
    'Programmer des comportements automatisés simples',
    'Intégrer un modèle ou service d IA à un prototype',
    'Tester les performances et prévoir un mode de fonctionnement sûr'
  ],
  outlets = ARRAY[
    'Assistant intégration de systèmes intelligents',
    'Technicien prototypage',
    'Assistant automatisation numérique'
  ]
WHERE id = 'systemes-intelligents';

-- 18 Gestion de projet informatique
UPDATE public.formations SET 
  skills = ARRAY[
    'Définir objectifs, livrables et acteurs d un projet',
    'Organiser tâches, calendrier et ressources disponibles',
    'Suivre avancement, anomalies et demandes de changement',
    'Préparer comptes rendus, tests de réception et documentation'
  ],
  outlets = ARRAY[
    'Assistant chef de projet informatique',
    'Assistant coordination numérique',
    'Assistant suivi de projets'
  ]
WHERE id = 'gestion-projet-informatique';

-- 19 Supervision des systèmes d'information
UPDATE public.formations SET 
  skills = ARRAY[
    'Surveiller disponibilité et utilisation des équipements',
    'Configurer des indicateurs et alertes d exploitation',
    'Analyser journaux et incidents puis escalader les anomalies',
    'Documenter les interventions et vérifier les sauvegardes'
  ],
  outlets = ARRAY[
    'Technicien supervision informatique',
    'Opérateur exploitation informatique',
    'Assistant centre de services'
  ]
WHERE id = 'supervision-systemes-information';

-- CFP NO LIMIT — Cybersécurité

-- 20 Architecte et gestion de la cybersécurité
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les actifs numériques et leurs risques principaux',
    'Représenter une architecture simple avec séparation des accès',
    'Proposer des mesures de protection adaptées aux usages',
    'Documenter un plan de traitement des risques et de réponse aux incidents'
  ],
  outlets = ARRAY[
    'Assistant sécurité informatique',
    'Technicien déploiement de sécurité',
    'Assistant gestion des risques numériques'
  ]
WHERE id = 'architecte-gestion-cybersecurite';

-- 21 Analyse et cybersécurité
UPDATE public.formations SET 
  skills = ARRAY[
    'Repérer des événements suspects dans des journaux techniques',
    'Qualifier une alerte et préserver les éléments utiles',
    'Effectuer des vérifications sur un environnement autorisé',
    'Rédiger un compte rendu et recommander des mesures correctives'
  ],
  outlets = ARRAY[
    'Analyste sécurité junior',
    'Opérateur supervision de sécurité junior',
    'Assistant réponse aux incidents'
  ]
WHERE id = 'analyse-cybersecurite';

-- 22 Administration systèmes et réseaux
UPDATE public.formations SET 
  skills = ARRAY[
    'Installer et configurer des systèmes et services de base',
    'Créer les comptes et gérer les droits d accès',
    'Configurer adressage et équipements d un réseau local',
    'Maintenir les services avec sauvegardes et procédures documentées'
  ],
  outlets = ARRAY[
    'Technicien systèmes et réseaux',
    'Technicien support infrastructure',
    'Assistant administrateur réseau'
  ]
WHERE id = 'administration-systemes-reseaux';

-- 23 Sécurité et réseaux
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les équipements et flux d un réseau',
    'Configurer filtrage, segmentation et accès distant',
    'Appliquer mises à jour et mesures de protection',
    'Tester les règles d accès et documenter la configuration'
  ],
  outlets = ARRAY[
    'Technicien réseau junior',
    'Assistant sécurité réseau',
    'Technicien support réseau'
  ]
WHERE id = 'securite-reseaux';

-- 24 Sécurité des systèmes d'information
UPDATE public.formations SET 
  skills = ARRAY[
    'Recenser les informations sensibles et leurs usages',
    'Appliquer contrôle des accès et sauvegardes adaptées',
    'Sensibiliser les utilisateurs aux risques numériques',
    'Contribuer à un plan de continuité et au suivi des incidents'
  ],
  outlets = ARRAY[
    'Assistant sécurité des systèmes d information',
    'Technicien protection des postes',
    'Assistant continuité informatique'
  ]
WHERE id = 'securite-systemes-information';

-- 25 Audit et contrôle des systèmes informatiques
UPDATE public.formations SET 
  skills = ARRAY[
    'Définir un périmètre de contrôle et une grille de vérification',
    'Examiner configurations, permissions et traces d activité',
    'Consigner les preuves et hiérarchiser les écarts',
    'Présenter un rapport et suivre les actions correctives'
  ],
  outlets = ARRAY[
    'Assistant audit informatique',
    'Technicien contrôle des configurations',
    'Assistant contrôle interne informatique'
  ]
WHERE id = 'audit-controle-systemes';

-- CFP NO LIMIT — Gestion

-- 26 Secrétariat comptable
UPDATE public.formations SET 
  skills = ARRAY[
    'Classer les pièces comptables et vérifier leur complétude',
    'Préparer factures et saisir des opérations simples',
    'Tenir un suivi de caisse, fournisseurs et clients',
    'Organiser les échéances et transmettre les dossiers au comptable'
  ],
  outlets = ARRAY[
    'Secrétaire comptable',
    'Assistant administratif et comptable',
    'Agent de facturation'
  ]
WHERE id = 'secretariat-comptable';

-- 27 Secrétariat bureautique bilingue
UPDATE public.formations SET 
  skills = ARRAY[
    'Rédiger courriers et messages professionnels en français et en anglais',
    'Créer documents, tableaux et présentations bureautiques',
    'Accueillir les interlocuteurs et orienter les demandes',
    'Classer les dossiers et organiser rendez-vous et réunions'
  ],
  outlets = ARRAY[
    'Secrétaire bilingue',
    'Agent d accueil bilingue',
    'Assistant administratif'
  ]
WHERE id = 'secretariat-bureautique-bilingue';

-- 28 Secrétariat assistante de direction bilingue
UPDATE public.formations SET 
  skills = ARRAY[
    'Gérer un agenda et prioriser les demandes de la direction',
    'Rédiger notes et comptes rendus en français et en anglais',
    'Organiser réunions, déplacements et suivi des décisions',
    'Traiter des dossiers confidentiels avec méthode et discrétion'
  ],
  outlets = ARRAY[
    'Assistant de direction bilingue junior',
    'Assistant exécutif junior',
    'Secrétaire de direction'
  ]
WHERE id = 'assistante-direction-bilingue';

-- 29 Entreprenariat
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier un besoin client et tester une idée d activité',
    'Estimer coûts, prix et besoins de financement',
    'Préparer un plan d affaires simple et un suivi de trésorerie',
    'Organiser prospection, vente et démarches de création à vérifier'
  ],
  outlets = ARRAY[
    'Créateur de petite activité',
    'Assistant développement commercial',
    'Assistant gestion de microentreprise'
  ]
WHERE id = 'entreprenariat';

-- 30 Architecture d'entreprise
UPDATE public.formations SET 
  skills = ARRAY[
    'Cartographier les activités, données et outils d une organisation',
    'Repérer redondances, dépendances et besoins d intégration',
    'Proposer un modèle de fonctionnement cible simple',
    'Documenter les étapes d amélioration et les impacts sur les équipes'
  ],
  outlets = ARRAY[
    'Assistant analyse de processus',
    'Assistant organisation',
    'Assistant projets de transformation'
  ]
WHERE id = 'architecture-entreprise';

-- 31 E-business et marketing digital
UPDATE public.formations SET 
  skills = ARRAY[
    'Préparer une offre commerciale pour un canal numérique',
    'Créer contenus et campagnes adaptés à une cible',
    'Gérer demandes clients et commandes en ligne',
    'Suivre trafic, conversions et résultats d une campagne'
  ],
  outlets = ARRAY[
    'Assistant marketing digital',
    'Assistant e-commerce',
    'Animateur de communauté junior'
  ]
WHERE id = 'e-business-marketing-digital';

-- 32 Finance (Pratique)
UPDATE public.formations SET 
  skills = ARRAY[
    'Établir un budget simple et prévoir les flux de trésorerie',
    'Comparer coûts et recettes d une activité',
    'Calculer des indicateurs de rentabilité et de liquidité',
    'Préparer un tableau de suivi et signaler les écarts'
  ],
  outlets = ARRAY[
    'Assistant trésorerie',
    'Assistant gestion financière',
    'Agent de suivi budgétaire'
  ]
WHERE id = 'finance';

-- 33 Audit fiscal
UPDATE public.formations SET 
  skills = ARRAY[
    'Organiser les pièces nécessaires à un contrôle fiscal interne',
    'Comparer déclarations et documents comptables sur un cas pédagogique',
    'Repérer incohérences et risques de non-conformité',
    'Rédiger une note de contrôle sous supervision'
  ],
  outlets = ARRAY[
    'Assistant contrôle fiscal interne',
    'Assistant cabinet comptable',
    'Assistant conformité fiscale'
  ]
WHERE id = 'audit-fiscal';

-- 34 Commerce et vente (Techniques)
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les besoins d un client et présenter une offre',
    'Argumenter, traiter les objections et conclure une vente',
    'Tenir un fichier clients et organiser les relances',
    'Suivre stocks, commandes et satisfaction de la clientèle'
  ],
  outlets = ARRAY[
    'Vendeur conseil',
    'Commercial junior',
    'Agent de service clientèle'
  ]
WHERE id = 'commerce-vente';

-- 35 Management et gouvernance d'entreprise
UPDATE public.formations SET 
  skills = ARRAY[
    'Organiser les tâches et responsabilités d une petite équipe',
    'Préparer des indicateurs de suivi d activité',
    'Formaliser procédures, décisions et circulation de l information',
    'Identifier les risques organisationnels et proposer des améliorations'
  ],
  outlets = ARRAY[
    'Assistant management',
    'Assistant coordination d activité',
    'Assistant contrôle interne'
  ]
WHERE id = 'management-gouvernance';

-- CFP NO LIMIT — Création

-- 36 Infographie
UPDATE public.formations SET 
  skills = ARRAY[
    'Composer une mise en page selon une identité visuelle',
    'Créer et retoucher des images pour supports imprimés et numériques',
    'Préparer des fichiers aux formats adaptés à la production',
    'Présenter des propositions et intégrer les corrections d un client'
  ],
  outlets = ARRAY[
    'Infographiste junior',
    'Maquettiste junior',
    'Assistant création graphique'
  ]
WHERE id = 'infographie';

-- 37 Montage audiovisuel
UPDATE public.formations SET 
  skills = ARRAY[
    'Organiser les fichiers vidéo et audio d un projet',
    'Assembler un récit cohérent avec coupes et transitions',
    'Ajuster son, sous-titres et colorimétrie de base',
    'Exporter des versions adaptées aux canaux de diffusion'
  ],
  outlets = ARRAY[
    'Monteur vidéo junior',
    'Assistant postproduction',
    'Créateur de contenus vidéo'
  ]
WHERE id = 'montage-audiovisuel';

-- 38 Motion design
UPDATE public.formations SET 
  skills = ARRAY[
    'Concevoir un storyboard et des éléments graphiques animables',
    'Animer textes, formes et transitions visuelles',
    'Synchroniser l animation avec voix, musique et rythme',
    'Exporter une animation lisible pour différents écrans'
  ],
  outlets = ARRAY[
    'Motion designer junior',
    'Assistant animation graphique',
    'Créateur de contenus animés'
  ]
WHERE id = 'motion-design';

-- CFP NO LIMIT — Santé et QHSE

-- 39 Vente en pharmacie
UPDATE public.formations SET 
  skills = ARRAY[
    'Accueillir le public et transmettre les demandes au professionnel habilité',
    'Réceptionner et ranger les produits selon les procédures de la structure',
    'Suivre stocks, dates de péremption et conditions de conservation',
    'Préparer les opérations administratives et de caisse sous supervision'
  ],
  outlets = ARRAY[
    'Agent d accueil en structure pharmaceutique',
    'Assistant gestion de stock',
    'Employé de vente de parapharmacie selon le cadre applicable'
  ]
WHERE id = 'vente-en-pharmacie';

-- 40 Gestion qualité, hygiène, sécurité et environnement
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les risques d une activité et les mesures de prévention',
    'Rédiger procédures et fiches de contrôle QHSE',
    'Suivre incidents, déchets et indicateurs de conformité',
    'Participer aux inspections et proposer des actions correctives'
  ],
  outlets = ARRAY[
    'Assistant QHSE',
    'Animateur prévention junior',
    'Agent contrôle qualité'
  ]
WHERE id = 'qhse';
