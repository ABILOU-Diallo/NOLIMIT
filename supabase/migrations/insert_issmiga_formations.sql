-- ==============================================================================
-- PARTIE 2 : INSERTION DES FORMATIONS ISSMIGA MANQUANTES
-- ==============================================================================
-- Ce script insère toutes les formations ISSMIGA avec leurs compétences et débouchés
-- ==============================================================================

-- ISSMIGA — Gestion / Management

-- 01 Gestion des collectivités territoriales
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'gestion-collectivites-territoriales',
  'gestion-administration',
  'gestion-collectivites-territoriales',
  'Gestion des collectivités territoriales',
  'bts',
  '2 ans',
  ARRAY[
    'Préparer dossiers administratifs et comptes rendus de service',
    'Participer au suivi budgétaire et aux achats d une collectivité',
    'Collecter des données utiles aux projets locaux',
    'Organiser l accueil des usagers et le suivi des demandes'
  ],
  ARRAY[
    'Assistant administratif territorial',
    'Assistant projets de développement local',
    'Agent suivi budgétaire'
  ],
  41,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 02 Assurance
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'assurance',
  'gestion-administration',
  'assurance',
  'Assurance',
  'bts',
  '2 ans',
  ARRAY[
    'Identifier les besoins de couverture d un client',
    'Expliquer les garanties et exclusions d un contrat étudié',
    'Préparer souscriptions, pièces de sinistre et suivi des dossiers',
    'Appliquer les procédures de conformité et de confidentialité'
  ],
  ARRAY[
    'Assistant gestion de contrats',
    'Conseiller clientèle assurance junior',
    'Gestionnaire de sinistres junior'
  ],
  42,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 03 Gestion logistique et transport
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'gestion-logistique-transport',
  'gestion-administration',
  'gestion-logistique-transport',
  'Gestion logistique et transport',
  'bts',
  '2 ans',
  ARRAY[
    'Planifier approvisionnements, réception et stockage',
    'Organiser une livraison et comparer les solutions de transport',
    'Utiliser des documents de suivi et des indicateurs logistiques',
    'Contrôler stocks, délais, coûts et anomalies opérationnelles'
  ],
  ARRAY[
    'Assistant logistique',
    'Agent exploitation transport',
    'Gestionnaire de stock'
  ],
  43,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 04 Gestion de la qualité
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'gestion-qualite-issmiga',
  'gestion-administration',
  'gestion-qualite-issmiga',
  'Gestion de la qualité',
  'bts',
  '2 ans',
  ARRAY[
    'Décrire un processus et définir des critères de qualité',
    'Préparer procédures, contrôles et suivi documentaire',
    'Analyser non-conformités et rechercher leurs causes',
    'Suivre les actions correctives et les indicateurs d amélioration'
  ],
  ARRAY[
    'Assistant qualité',
    'Technicien contrôle qualité',
    'Assistant amélioration continue'
  ],
  44,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 05 Gestion des projets
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'gestion-projets-issmiga',
  'gestion-administration',
  'gestion-projets-issmiga',
  'Gestion des projets',
  'bts',
  '2 ans',
  ARRAY[
    'Définir objectifs, livrables et parties prenantes',
    'Préparer calendrier, budget et répartition des tâches',
    'Suivre risques, dépenses et indicateurs d avancement',
    'Rédiger rapports et contribuer à l évaluation d un projet'
  ],
  ARRAY[
    'Assistant chef de projet',
    'Assistant suivi-évaluation',
    'Assistant coordination de programme'
  ],
  45,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 06 Gestion des ressources humaines
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'ressources-humaines',
  'gestion-administration',
  'ressources-humaines',
  'Gestion des ressources humaines',
  'bts',
  '2 ans',
  ARRAY[
    'Tenir et actualiser les dossiers du personnel',
    'Préparer recrutements, intégrations et suivi des formations',
    'Collecter les variables de paie et vérifier les informations',
    'Suivre absences, effectifs et indicateurs RH avec confidentialité'
  ],
  ARRAY[
    'Assistant ressources humaines',
    'Assistant administration du personnel',
    'Assistant recrutement'
  ],
  46,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 07 Banque et finances
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'banque-finances',
  'gestion-administration',
  'banque-finances',
  'Banque et finances',
  'bts',
  '2 ans',
  ARRAY[
    'Accueillir les clients et expliquer les services étudiés',
    'Préparer dossiers de compte et pièces de financement',
    'Analyser les éléments financiers simples d un dossier',
    'Appliquer procédures de contrôle, confidentialité et suivi des opérations'
  ],
  ARRAY[
    'Conseiller clientèle bancaire junior',
    'Assistant back office bancaire',
    'Assistant analyse de crédit'
  ],
  47,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 08 Comptabilité et gestion des entreprises
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'comptabilite-gestion-entreprises',
  'gestion-administration',
  'comptabilite-gestion-entreprises',
  'Comptabilité et gestion des entreprises',
  'bts',
  '2 ans',
  ARRAY[
    'Enregistrer les opérations courantes dans un cadre SYSCOHADA',
    'Effectuer rapprochements et vérifications des comptes',
    'Préparer les travaux d inventaire et états sous supervision',
    'Calculer coûts, budgets et indicateurs de gestion'
  ],
  ARRAY[
    'Assistant comptable',
    'Comptable junior',
    'Assistant contrôle de gestion'
  ],
  48,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 09 Microfinance
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'microfinance',
  'gestion-administration',
  'microfinance',
  'Microfinance',
  'bts',
  '2 ans',
  ARRAY[
    'Accueillir les clients et documenter leurs besoins financiers',
    'Préparer dossiers d épargne et de crédit selon les procédures',
    'Suivre remboursements, échéances et portefeuille de clients',
    'Analyser les éléments simples d une activité et signaler les risques'
  ],
  ARRAY[
    'Agent clientèle microfinance',
    'Agent de crédit junior',
    'Assistant suivi de portefeuille'
  ],
  49,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 10 Commerce International
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'commerce-international',
  'gestion-administration',
  'commerce-international',
  'Commerce International',
  'bts',
  '2 ans',
  ARRAY[
    'Préparer une offre et des documents d import-export',
    'Comparer conditions de vente, transport et livraison',
    'Suivre commandes, paiements et relations avec les partenaires',
    'Identifier les pièces de conformité et les risques d une opération'
  ],
  ARRAY[
    'Assistant import-export',
    'Assistant commercial international',
    'Agent suivi des commandes internationales'
  ],
  50,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 11 Marketing, Commerce et Vente
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'marketing-commerce-vente',
  'gestion-administration',
  'marketing-commerce-vente',
  'Marketing, Commerce et Vente',
  'bts',
  '2 ans',
  ARRAY[
    'Réaliser une étude simple de clientèle et de concurrence',
    'Construire une offre et un plan d action commercial',
    'Mener prospection, vente et fidélisation',
    'Analyser les résultats avec des indicateurs marketing et commerciaux'
  ],
  ARRAY[
    'Assistant marketing',
    'Commercial junior',
    'Chargé de clientèle junior'
  ],
  51,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 20 Droit des affaires et de l'entreprise
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'droit-affaires-entreprise',
  'gestion-administration',
  'droit-affaires-entreprise',
  'Droit des affaires et de l entreprise',
  'bts',
  '2 ans',
  ARRAY[
    'Identifier les documents juridiques courants d une entreprise',
    'Rechercher et synthétiser des textes pertinents, notamment OHADA',
    'Préparer des dossiers contractuels sous supervision',
    'Suivre formalités, échéances et classement des pièces'
  ],
  ARRAY[
    'Assistant juridique',
    'Assistant formalités d entreprise',
    'Assistant administration des contrats'
  ],
  52,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 21 Gestion fiscale
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'gestion-fiscale',
  'gestion-administration',
  'gestion-fiscale',
  'Gestion fiscale',
  'bts',
  '2 ans',
  ARRAY[
    'Collecter les pièces nécessaires aux obligations fiscales',
    'Préparer des calculs et déclarations sur des cas validés',
    'Organiser un calendrier des échéances et suivre les justificatifs',
    'Repérer les écarts entre documents comptables et fiscaux'
  ],
  ARRAY[
    'Assistant fiscalité',
    'Assistant cabinet comptable',
    'Agent suivi des déclarations'
  ],
  53,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 22 Douane et transit
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'douane-transit',
  'gestion-administration',
  'douane-transit',
  'Douane et transit',
  'bts',
  '2 ans',
  ARRAY[
    'Constituer et vérifier un dossier documentaire de transit',
    'Identifier classement tarifaire et éléments de valeur dans un cas étudié',
    'Coordonner transporteurs, clients et intervenants de la chaîne',
    'Suivre formalités, délais et coûts d une opération'
  ],
  ARRAY[
    'Agent de transit junior',
    'Assistant déclarant en douane',
    'Assistant opérations import-export'
  ],
  54,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- ISSMIGA — Hôtellerie et Tourisme

-- 12 Hôtellerie
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'hotellerie',
  'creatif-service',
  'hotellerie',
  'Hôtellerie',
  'bts',
  '2 ans',
  ARRAY[
    'Accueillir les clients et gérer réservations, arrivées et départs',
    'Utiliser les outils de suivi de séjour et de facturation',
    'Coordonner les demandes avec hébergement et maintenance',
    'Traiter les réclamations et appliquer les standards de service'
  ],
  ARRAY[
    'Réceptionniste',
    'Agent de réservation',
    'Assistant exploitation hôtelière'
  ],
  55,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 13 Gestion et management hôteliers
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'gestion-management-hoteliers',
  'creatif-service',
  'gestion-management-hoteliers',
  'Gestion et management hôteliers',
  'bts',
  '2 ans',
  ARRAY[
    'Suivre occupation, recettes et coûts d un établissement',
    'Organiser les tâches et plannings des équipes',
    'Contribuer aux actions commerciales et à la qualité de service',
    'Analyser les résultats et proposer des améliorations opérationnelles'
  ],
  ARRAY[
    'Assistant direction hôtelière',
    'Assistant exploitation',
    'Assistant commercial hôtelier'
  ],
  56,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 14 Management et technique d'hébergement
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'management-technique-hebergement',
  'creatif-service',
  'management-technique-hebergement',
  'Management et technique d hébergement',
  'bts',
  '2 ans',
  ARRAY[
    'Organiser la préparation et le contrôle des chambres',
    'Gérer linge, produits et équipements d entretien',
    'Coordonner les informations entre étages, réception et maintenance',
    'Appliquer les procédures d hygiène et de suivi de qualité'
  ],
  ARRAY[
    'Agent de contrôle des chambres',
    'Assistant gouvernant',
    'Assistant coordination hébergement'
  ],
  57,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 15 Restauration
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'restauration',
  'creatif-service',
  'restauration',
  'Restauration',
  'bts',
  '2 ans',
  ARRAY[
    'Préparer une salle et assurer les étapes du service',
    'Conseiller les clients et enregistrer les commandes',
    'Coordonner le service avec la cuisine et gérer les encaissements',
    'Respecter hygiène, traçabilité et gestion des réclamations'
  ],
  ARRAY[
    'Serveur professionnel',
    'Commis de salle',
    'Assistant exploitation restauration'
  ],
  58,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 16 Génie culinaire
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'genie-culinaire',
  'creatif-service',
  'genie-culinaire',
  'Génie culinaire',
  'bts',
  '2 ans',
  ARRAY[
    'Réaliser préparations et cuissons à partir de fiches techniques',
    'Organiser le poste de travail et les séquences de production',
    'Calculer portions, coûts matières et besoins d approvisionnement',
    'Appliquer hygiène alimentaire, conservation et contrôle des produits'
  ],
  ARRAY[
    'Commis de cuisine',
    'Cuisinier junior',
    'Assistant production culinaire'
  ],
  59,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 17 Commercialisation et services de restauration
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'commercialisation-services-restauration',
  'creatif-service',
  'commercialisation-services-restauration',
  'Commercialisation et services de restauration',
  'bts',
  '2 ans',
  ARRAY[
    'Présenter une carte et conseiller la clientèle',
    'Construire une proposition pour un événement ou une prestation',
    'Réaliser les opérations de service et de facturation',
    'Suivre ventes, satisfaction et actions de fidélisation'
  ],
  ARRAY[
    'Assistant commercial restauration',
    'Serveur conseil',
    'Assistant organisation de banquets'
  ],
  60,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 18 Tourisme et loisirs
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'tourisme-loisirs',
  'creatif-service',
  'tourisme-loisirs',
  'Tourisme et loisirs',
  'bts',
  '2 ans',
  ARRAY[
    'Accueillir et informer les visiteurs sur une destination',
    'Concevoir un parcours ou une activité de loisirs',
    'Gérer réservations et coordination des prestataires',
    'Préparer informations pratiques, sécurité et évaluation de la prestation'
  ],
  ARRAY[
    'Agent d accueil touristique',
    'Assistant agence de voyages',
    'Animateur de loisirs selon les exigences du poste'
  ],
  61,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 19 Management touristique
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'management-touristique',
  'creatif-service',
  'management-touristique',
  'Management touristique',
  'bts',
  '2 ans',
  ARRAY[
    'Étudier les besoins d un public et l offre d une destination',
    'Préparer un produit touristique avec budget et partenaires',
    'Organiser une action de promotion et la réservation',
    'Suivre qualité, satisfaction et résultats économiques'
  ],
  ARRAY[
    'Assistant développement touristique',
    'Assistant production touristique',
    'Assistant commercial tourisme'
  ],
  62,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- ISSMIGA — Numérique

-- 23 Télécommunications
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'telecommunications',
  'cybersecurite',
  'telecommunications',
  'Télécommunications',
  'bts',
  '2 ans',
  ARRAY[
    'Lire un schéma de réseau et identifier ses composants',
    'Installer et configurer des équipements de communication',
    'Mesurer la qualité d une liaison et diagnostiquer les défauts',
    'Documenter les interventions et appliquer les consignes de sécurité'
  ],
  ARRAY[
    'Technicien télécommunications junior',
    'Technicien installation réseau',
    'Assistant exploitation télécoms'
  ],
  63,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 24 Réseaux et Sécurité
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'reseaux-securite-issmiga',
  'cybersecurite',
  'reseaux-securite-issmiga',
  'Réseaux et Sécurité',
  'bts',
  '2 ans',
  ARRAY[
    'Concevoir et configurer un réseau local avec segmentation',
    'Administrer services, comptes et accès distants',
    'Appliquer filtrage, mises à jour et sauvegardes',
    'Diagnostiquer les incidents et vérifier les protections déployées'
  ],
  ARRAY[
    'Technicien systèmes et réseaux',
    'Assistant administrateur réseau',
    'Technicien sécurité réseau junior'
  ],
  64,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 25 Génie logiciel
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'genie-logiciel-bts',
  'numerique-it',
  'genie-logiciel-bts',
  'Génie logiciel',
  'bts',
  '2 ans',
  ARRAY[
    'Analyser les besoins et modéliser une application',
    'Développer interfaces, traitements et accès aux données',
    'Construire des tests et gérer les versions du code',
    'Documenter, déployer et maintenir un logiciel en équipe'
  ],
  ARRAY[
    'Développeur d applications junior',
    'Testeur logiciel',
    'Technicien support applicatif'
  ],
  65,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 26 Informatique industrielle et automatisme
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'informatique-industrielle-automatisme',
  'numerique-it',
  'informatique-industrielle-automatisme',
  'Informatique industrielle et automatisme',
  'bts',
  '2 ans',
  ARRAY[
    'Lire les schémas d une installation automatisée',
    'Programmer des séquences simples sur automate',
    'Relier capteurs, actionneurs et interface de supervision',
    'Diagnostiquer les défauts et tester les sécurités sous encadrement'
  ],
  ARRAY[
    'Technicien automatisme junior',
    'Technicien maintenance de systèmes automatisés',
    'Assistant intégration industrielle'
  ],
  66,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 27 Maintenance des systèmes informatiques
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'maintenance-systemes-informatiques',
  'numerique-it',
  'maintenance-systemes-informatiques',
  'Maintenance des systèmes informatiques',
  'bts',
  '2 ans',
  ARRAY[
    'Diagnostiquer les défauts de postes, serveurs et périphériques',
    'Installer et maintenir systèmes, logiciels et équipements',
    'Organiser un plan de maintenance et le suivi du parc',
    'Sécuriser les données et rédiger les rapports d intervention'
  ],
  ARRAY[
    'Technicien maintenance informatique',
    'Technicien support',
    'Gestionnaire de parc informatique junior'
  ],
  67,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 28 E-Commerce et Marketing numérique
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'ecommerce-marketing-numerique',
  'numerique-it',
  'ecommerce-marketing-numerique',
  'E-Commerce et Marketing numérique',
  'bts',
  '2 ans',
  ARRAY[
    'Structurer un catalogue et un parcours de commande en ligne',
    'Préparer campagnes, contenus et actions de référencement',
    'Suivre commandes, service client et coordination logistique',
    'Analyser ventes, conversions et fidélisation'
  ],
  ARRAY[
    'Assistant e-commerce',
    'Assistant marketing numérique',
    'Gestionnaire de boutique en ligne junior'
  ],
  68,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- ISSMIGA — Services et Social

-- 29 Esthétique, Cosmétique et Coiffure
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'esthetique-cosmetique-coiffure',
  'sante-qhse-social',
  'esthetique-cosmetique-coiffure',
  'Esthétique, Cosmétique et Coiffure',
  'bts',
  '2 ans',
  ARRAY[
    'Accueillir le client et identifier ses attentes',
    'Réaliser des prestations esthétiques et de coiffure prévues au programme',
    'Choisir les produits et appliquer les protocoles d hygiène',
    'Gérer rendez-vous, stocks et conseil de vente'
  ],
  ARRAY[
    'Esthéticien selon la spécialisation suivie',
    'Coiffeur selon la spécialisation suivie',
    'Conseiller vente de produits cosmétiques'
  ],
  69,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 30 Puériculture, Gérontologie et Auxiliaire de vie
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'puericulture-gerontologie-auxiliaire',
  'sante-qhse-social',
  'puericulture-gerontologie-auxiliaire',
  'Puériculture, Gérontologie et Auxiliaire de vie',
  'bts',
  '2 ans',
  ARRAY[
    'Identifier les besoins quotidiens d un enfant ou d une personne âgée',
    'Accompagner les activités de vie quotidienne dans le respect de l autonomie',
    'Préparer des activités adaptées et un environnement sûr',
    'Observer, transmettre les informations et alerter les professionnels référents'
  ],
  ARRAY[
    'Assistant accompagnement à domicile',
    'Agent accompagnement de personnes âgées',
    'Assistant accueil petite enfance selon les exigences du poste'
  ],
  70,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;

-- 31 Économie et entrepreneuriat social
INSERT INTO public.formations (id, pole_id, slug, title, diploma, duration, skills, outlets, sort_order, is_published)
VALUES (
  'economie-entrepreneuriat-social',
  'sante-qhse-social',
  'economie-entrepreneuriat-social',
  'Économie et entrepreneuriat social',
  'bts',
  '2 ans',
  ARRAY[
    'Analyser un besoin social et les ressources d un territoire',
    'Concevoir une activité conciliant impact social et viabilité économique',
    'Préparer budget, mobilisation des partenaires et suivi d activité',
    'Définir des indicateurs d impact et présenter les résultats'
  ],
  ARRAY[
    'Assistant projets associatifs',
    'Assistant développement communautaire',
    'Porteur de projet d entreprise sociale'
  ],
  71,
  true
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets,
  title = EXCLUDED.title,
  diploma = EXCLUDED.diploma,
  duration = EXCLUDED.duration;
