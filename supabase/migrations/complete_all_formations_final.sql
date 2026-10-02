-- ==============================================================================
-- SCRIPT COMPLET FINAL : METTRE À JOUR ET INSÉRER TOUTES LES FORMATIONS
-- ==============================================================================
-- Ce script :
-- 1. Met à jour les 12 formations existantes avec skills et outlets
-- 2. Insère les 59 formations manquantes avec skills et outlets
-- ==============================================================================

-- ============================================================================
-- PARTIE 1 : MISE À JOUR DES 12 FORMATIONS EXISTANTES
-- ============================================================================

-- 1. Comptabilité et gestion des entreprises
UPDATE public.formations SET 
  skills = ARRAY[
    'Enregistrer les opérations courantes dans un cadre SYSCOHADA',
    'Effectuer rapprochements et vérifications des comptes',
    'Préparer les travaux d inventaire et états sous supervision',
    'Calculer coûts, budgets et indicateurs de gestion'
  ],
  outlets = ARRAY[
    'Assistant comptable',
    'Comptable junior',
    'Assistant contrôle de gestion'
  ]
WHERE slug = 'comptabilite-gestion-entreprises';

-- 2. Architecte et gestion de la cybersécurité
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
WHERE slug = 'architecte-gestion-cybersecurite';

-- 3. Développement web et mobile
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
WHERE slug = 'developpement-web-mobile';

-- 4. Génie logiciel (BTS)
UPDATE public.formations SET 
  skills = ARRAY[
    'Analyser les besoins et modéliser une application',
    'Développer interfaces, traitements et accès aux données',
    'Construire des tests et gérer les versions du code',
    'Documenter, déployer et maintenir un logiciel en équipe'
  ],
  outlets = ARRAY[
    'Développeur d applications junior',
    'Testeur logiciel',
    'Technicien support applicatif'
  ]
WHERE slug = 'genie-logiciel-bts';

-- 5. Infographie
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
WHERE slug = 'infographie';

-- 6. Gestion logistique et transport
UPDATE public.formations SET 
  skills = ARRAY[
    'Planifier approvisionnements, réception et stockage',
    'Organiser une livraison et comparer les solutions de transport',
    'Utiliser des documents de suivi et des indicateurs logistiques',
    'Contrôler stocks, délais, coûts et anomalies opérationnelles'
  ],
  outlets = ARRAY[
    'Assistant logistique',
    'Agent exploitation transport',
    'Gestionnaire de stock'
  ]
WHERE slug = 'gestion-logistique-transport';

-- 7. Maintenance des systèmes et réseaux informatiques
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
WHERE slug = 'maintenance-systemes-reseaux';

-- 8. Développement d'application web full stack MERN
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
WHERE slug = 'developpement-mern';

-- 9. Vente en pharmacie
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
WHERE slug = 'vente-en-pharmacie';

-- 10. Réseaux et Sécurité (ISSMIGA)
UPDATE public.formations SET 
  skills = ARRAY[
    'Concevoir et configurer un réseau local avec segmentation',
    'Administrer services, comptes et accès distants',
    'Appliquer filtrage, mises à jour et sauvegardes',
    'Diagnostiquer les incidents et vérifier les protections déployées'
  ],
  outlets = ARRAY[
    'Technicien systèmes et réseaux',
    'Assistant administrateur réseau',
    'Technicien sécurité réseau junior'
  ]
WHERE slug = 'reseaux-securite-issmiga';

-- 11. Gestion des ressources humaines
UPDATE public.formations SET 
  skills = ARRAY[
    'Tenir et actualiser les dossiers du personnel',
    'Préparer recrutements, intégrations et suivi des formations',
    'Collecter les variables de paie et vérifier les informations',
    'Suivre absences, effectifs et indicateurs RH avec confidentialité'
  ],
  outlets = ARRAY[
    'Assistant ressources humaines',
    'Assistant administration du personnel',
    'Assistant recrutement'
  ]
WHERE slug = 'ressources-humaines';

-- 12. Secrétariat comptable
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
WHERE slug = 'secretariat-comptable';

-- ============================================================================
-- PARTIE 2 : INSERTION DES FORMATIONS MANQUANTES (59 formations)
-- ============================================================================

-- CFP NO LIMIT — Numérique (7 formations manquantes)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'technologies-web-avancees',
  'numerique-it',
  'technologies-web-avancees',
  'Technologies web avancées',
  'Architectures web modernes, cloud et performance.',
  'Spécialisation dans les architectures web modernes, le cloud et la performance.',
  'dqp',
  '1 an',
  ARRAY[
    'Organiser une application web modulaire avec gestion des versions',
    'Intégrer des API et mécanismes d échange de données',
    'Améliorer performance, accessibilité et sécurité d un site',
    'Automatiser des tests et documenter le déploiement'
  ],
  ARRAY[
    'Développeur web junior',
    'Intégrateur d applications web',
    'Assistant chargé de maintenance web'
  ],
  3,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'webmaster',
  'numerique-it',
  'webmaster',
  'Webmaster',
  'Gestion et administration de sites internet.',
  'Gérez, administrez et animez des sites internet institutionnels et e-commerce.',
  'cqp',
  '1 an',
  ARRAY[
    'Installer et administrer un site avec un système de gestion de contenu',
    'Publier des pages cohérentes et accessibles',
    'Effectuer sauvegardes, mises à jour et contrôles de fonctionnement',
    'Suivre les visites et améliorer le référencement des contenus'
  ],
  ARRAY[
    'Webmaster junior',
    'Gestionnaire de contenu web',
    'Assistant communication numérique'
  ],
  4,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'developpement-applications-mobiles',
  'numerique-it',
  'developpement-applications-mobiles',
  'Développement des applications mobiles',
  'Conception et déploiement d applications iOS et Android.',
  'Conception et déploiement d applications natives et hybrides iOS et Android.',
  'dqp',
  '1 an',
  ARRAY[
    'Concevoir les écrans et parcours d une application mobile',
    'Programmer navigation, formulaires et accès aux données',
    'Gérer permissions, stockage local et synchronisation',
    'Tester une application sur plusieurs appareils et préparer sa diffusion'
  ],
  ARRAY[
    'Développeur mobile junior',
    'Testeur d applications mobiles',
    'Assistant développement d applications'
  ],
  5,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'genie-logiciel',
  'numerique-it',
  'genie-logiciel',
  'Génie logiciel',
  'Architecture logicielle, algorithmes et codage métier.',
  'Formation intensive à l architecture logicielle, aux algorithmes et au codage métier.',
  'dqp',
  '1 an',
  ARRAY[
    'Traduire un besoin métier en fonctionnalités et tâches',
    'Programmer des modules réutilisables et lisibles',
    'Construire des tests et corriger les anomalies',
    'Utiliser un dépôt de code et rédiger une documentation utilisateur'
  ],
  ARRAY[
    'Développeur d applications junior',
    'Testeur logiciel junior',
    'Technicien support applicatif'
  ],
  6,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'analyse-conception-systemes',
  'numerique-it',
  'analyse-conception-systemes',
  'Analyse et conception des systèmes',
  'Modélisation, architecture SI et gestion du cycle de vie.',
  'Modélisation, architecture SI et gestion du cycle de vie des applications.',
  'dqp',
  '1 an',
  ARRAY[
    'Recueillir les besoins et décrire les processus d une organisation',
    'Modéliser les données, acteurs et fonctionnalités d un système',
    'Rédiger un cahier des charges et des scénarios de validation',
    'Produire des maquettes et expliquer les choix de conception'
  ],
  ARRAY[
    'Assistant analyste fonctionnel',
    'Assistant conception de systèmes',
    'Testeur fonctionnel junior'
  ],
  7,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'analyse-des-donnees',
  'numerique-it',
  'analyse-des-donnees',
  'Analyse des données',
  'Exploitation de données massives et tableaux de bord.',
  'Exploitation, traitement de données massives et tableaux de bord avec Python et SQL.',
  'dqp',
  '1 an',
  ARRAY[
    'Collecter et nettoyer des données issues de plusieurs fichiers',
    'Calculer des indicateurs et repérer incohérences et tendances',
    'Créer des graphiques et tableaux de bord lisibles',
    'Présenter les résultats avec leurs limites et protéger les données'
  ],
  ARRAY[
    'Assistant analyste de données',
    'Assistant reporting',
    'Gestionnaire de données junior'
  ],
  9,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'business-intelligence',
  'numerique-it',
  'business-intelligence',
  'Business intelligence',
  'Aide à la décision stratégique via outils BI.',
  'Aide à la décision stratégique via les outils BI, l ETL et le reporting visuel.',
  'dqp',
  '1 an',
  ARRAY[
    'Définir des indicateurs utiles à une décision opérationnelle',
    'Préparer des données et organiser leur actualisation',
    'Construire un tableau de bord avec filtres et visualisations',
    'Contrôler la cohérence des chiffres et documenter les calculs'
  ],
  ARRAY[
    'Assistant reporting décisionnel',
    'Développeur BI junior',
    'Assistant contrôle de gestion'
  ],
  10,
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- Suite des formations manquantes dans le prochain message...
