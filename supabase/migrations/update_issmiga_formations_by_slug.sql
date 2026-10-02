-- ==============================================================================
-- MISE À JOUR DES FORMATIONS ISSMIGA PAR SLUG (Alternative)
-- Ce script utilise UPDATE au lieu de INSERT pour éviter les conflits de slug
-- ==============================================================================

-- ISSMIGA — Gestion / Management

-- 01 Gestion des collectivités territoriales
UPDATE public.formations SET 
  skills = ARRAY[
    'Préparer dossiers administratifs et comptes rendus de service',
    'Participer au suivi budgétaire et aux achats d une collectivité',
    'Collecter des données utiles aux projets locaux',
    'Organiser l accueil des usagers et le suivi des demandes'
  ],
  outlets = ARRAY[
    'Assistant administratif territorial',
    'Assistant projets de développement local',
    'Agent suivi budgétaire'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'gestion-collectivites-territoriales';

-- 02 Assurance
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les besoins de couverture d un client',
    'Expliquer les garanties et exclusions d un contrat étudié',
    'Préparer souscriptions, pièces de sinistre et suivi des dossiers',
    'Appliquer les procédures de conformité et de confidentialité'
  ],
  outlets = ARRAY[
    'Assistant gestion de contrats',
    'Conseiller clientèle assurance junior',
    'Gestionnaire de sinistres junior'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'assurance';

-- 03 Gestion logistique et transport
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
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'gestion-logistique-transport';

-- 04 Gestion de la qualité
UPDATE public.formations SET 
  skills = ARRAY[
    'Décrire un processus et définir des critères de qualité',
    'Préparer procédures, contrôles et suivi documentaire',
    'Analyser non-conformités et rechercher leurs causes',
    'Suivre les actions correctives et les indicateurs d amélioration'
  ],
  outlets = ARRAY[
    'Assistant qualité',
    'Technicien contrôle qualité',
    'Assistant amélioration continue'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'gestion-qualite-issmiga';

-- 05 Gestion des projets
UPDATE public.formations SET 
  skills = ARRAY[
    'Définir objectifs, livrables et parties prenantes',
    'Préparer calendrier, budget et répartition des tâches',
    'Suivre risques, dépenses et indicateurs d avancement',
    'Rédiger rapports et contribuer à l évaluation d un projet'
  ],
  outlets = ARRAY[
    'Assistant chef de projet',
    'Assistant suivi-évaluation',
    'Assistant coordination de programme'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'gestion-projets-issmiga';

-- 06 Gestion des ressources humaines
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
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'ressources-humaines';

-- 07 Banque et finances
UPDATE public.formations SET 
  skills = ARRAY[
    'Accueillir les clients et expliquer les services étudiés',
    'Préparer dossiers de compte et pièces de financement',
    'Analyser les éléments financiers simples d un dossier',
    'Appliquer procédures de contrôle, confidentialité et suivi des opérations'
  ],
  outlets = ARRAY[
    'Conseiller clientèle bancaire junior',
    'Assistant back office bancaire',
    'Assistant analyse de crédit'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'banque-finances';

-- 08 Comptabilité et gestion des entreprises
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
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'comptabilite-gestion-entreprises';

-- 09 Microfinance
UPDATE public.formations SET 
  skills = ARRAY[
    'Accueillir les clients et documenter leurs besoins financiers',
    'Préparer dossiers d épargne et de crédit selon les procédures',
    'Suivre remboursements, échéances et portefeuille de clients',
    'Analyser les éléments simples d une activité et signaler les risques'
  ],
  outlets = ARRAY[
    'Agent clientèle microfinance',
    'Agent de crédit junior',
    'Assistant suivi de portefeuille'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'microfinance';

-- 10 Commerce International
UPDATE public.formations SET 
  skills = ARRAY[
    'Préparer une offre et des documents d import-export',
    'Comparer conditions de vente, transport et livraison',
    'Suivre commandes, paiements et relations avec les partenaires',
    'Identifier les pièces de conformité et les risques d une opération'
  ],
  outlets = ARRAY[
    'Assistant import-export',
    'Assistant commercial international',
    'Agent suivi des commandes internationales'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'commerce-international';

-- 11 Marketing, Commerce et Vente
UPDATE public.formations SET 
  skills = ARRAY[
    'Réaliser une étude simple de clientèle et de concurrence',
    'Construire une offre et un plan d action commercial',
    'Mener prospection, vente et fidélisation',
    'Analyser les résultats avec des indicateurs marketing et commerciaux'
  ],
  outlets = ARRAY[
    'Assistant marketing',
    'Commercial junior',
    'Chargé de clientèle junior'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'marketing-commerce-vente';

-- 20 Droit des affaires et de l'entreprise
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les documents juridiques courants d une entreprise',
    'Rechercher et synthétiser des textes pertinents, notamment OHADA',
    'Préparer des dossiers contractuels sous supervision',
    'Suivre formalités, échéances et classement des pièces'
  ],
  outlets = ARRAY[
    'Assistant juridique',
    'Assistant formalités d entreprise',
    'Assistant administration des contrats'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'droit-affaires-entreprise';

-- 21 Gestion fiscale
UPDATE public.formations SET 
  skills = ARRAY[
    'Collecter les pièces nécessaires aux obligations fiscales',
    'Préparer des calculs et déclarations sur des cas validés',
    'Organiser un calendrier des échéances et suivre les justificatifs',
    'Repérer les écarts entre documents comptables et fiscaux'
  ],
  outlets = ARRAY[
    'Assistant fiscalité',
    'Assistant cabinet comptable',
    'Agent suivi des déclarations'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'gestion-fiscale';

-- 22 Douane et transit
UPDATE public.formations SET 
  skills = ARRAY[
    'Constituer et vérifier un dossier documentaire de transit',
    'Identifier classement tarifaire et éléments de valeur dans un cas étudié',
    'Coordonner transporteurs, clients et intervenants de la chaîne',
    'Suivre formalités, délais et coûts d une opération'
  ],
  outlets = ARRAY[
    'Agent de transit junior',
    'Assistant déclarant en douane',
    'Assistant opérations import-export'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'douane-transit';

-- ISSMIGA — Hôtellerie et Tourisme

-- 12 Hôtellerie
UPDATE public.formations SET 
  skills = ARRAY[
    'Accueillir les clients et gérer réservations, arrivées et départs',
    'Utiliser les outils de suivi de séjour et de facturation',
    'Coordonner les demandes avec hébergement et maintenance',
    'Traiter les réclamations et appliquer les standards de service'
  ],
  outlets = ARRAY[
    'Réceptionniste',
    'Agent de réservation',
    'Assistant exploitation hôtelière'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'hotellerie';

-- 13 Gestion et management hôteliers
UPDATE public.formations SET 
  skills = ARRAY[
    'Suivre occupation, recettes et coûts d un établissement',
    'Organiser les tâches et plannings des équipes',
    'Contribuer aux actions commerciales et à la qualité de service',
    'Analyser les résultats et proposer des améliorations opérationnelles'
  ],
  outlets = ARRAY[
    'Assistant direction hôtelière',
    'Assistant exploitation',
    'Assistant commercial hôtelier'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'gestion-management-hoteliers';

-- 14 Management et technique d'hébergement
UPDATE public.formations SET 
  skills = ARRAY[
    'Organiser la préparation et le contrôle des chambres',
    'Gérer linge, produits et équipements d entretien',
    'Coordonner les informations entre étages, réception et maintenance',
    'Appliquer les procédures d hygiène et de suivi de qualité'
  ],
  outlets = ARRAY[
    'Agent de contrôle des chambres',
    'Assistant gouvernant',
    'Assistant coordination hébergement'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'management-technique-hebergement';

-- 15 Restauration
UPDATE public.formations SET 
  skills = ARRAY[
    'Préparer une salle et assurer les étapes du service',
    'Conseiller les clients et enregistrer les commandes',
    'Coordonner le service avec la cuisine et gérer les encaissements',
    'Respecter hygiène, traçabilité et gestion des réclamations'
  ],
  outlets = ARRAY[
    'Serveur professionnel',
    'Commis de salle',
    'Assistant exploitation restauration'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'restauration';

-- 16 Génie culinaire
UPDATE public.formations SET 
  skills = ARRAY[
    'Réaliser préparations et cuissons à partir de fiches techniques',
    'Organiser le poste de travail et les séquences de production',
    'Calculer portions, coûts matières et besoins d approvisionnement',
    'Appliquer hygiène alimentaire, conservation et contrôle des produits'
  ],
  outlets = ARRAY[
    'Commis de cuisine',
    'Cuisinier junior',
    'Assistant production culinaire'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'genie-culinaire';

-- 17 Commercialisation et services de restauration
UPDATE public.formations SET 
  skills = ARRAY[
    'Présenter une carte et conseiller la clientèle',
    'Construire une proposition pour un événement ou une prestation',
    'Réaliser les opérations de service et de facturation',
    'Suivre ventes, satisfaction et actions de fidélisation'
  ],
  outlets = ARRAY[
    'Assistant commercial restauration',
    'Serveur conseil',
    'Assistant organisation de banquets'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'commercialisation-services-restauration';

-- 18 Tourisme et loisirs
UPDATE public.formations SET 
  skills = ARRAY[
    'Accueillir et informer les visiteurs sur une destination',
    'Concevoir un parcours ou une activité de loisirs',
    'Gérer réservations et coordination des prestataires',
    'Préparer informations pratiques, sécurité et évaluation de la prestation'
  ],
  outlets = ARRAY[
    'Agent d accueil touristique',
    'Assistant agence de voyages',
    'Animateur de loisirs selon les exigences du poste'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'tourisme-loisirs';

-- 19 Management touristique
UPDATE public.formations SET 
  skills = ARRAY[
    'Étudier les besoins d un public et l offre d une destination',
    'Préparer un produit touristique avec budget et partenaires',
    'Organiser une action de promotion et la réservation',
    'Suivre qualité, satisfaction et résultats économiques'
  ],
  outlets = ARRAY[
    'Assistant développement touristique',
    'Assistant production touristique',
    'Assistant commercial tourisme'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'management-touristique';

-- ISSMIGA — Numérique

-- 23 Télécommunications
UPDATE public.formations SET 
  skills = ARRAY[
    'Lire un schéma de réseau et identifier ses composants',
    'Installer et configurer des équipements de communication',
    'Mesurer la qualité d une liaison et diagnostiquer les défauts',
    'Documenter les interventions et appliquer les consignes de sécurité'
  ],
  outlets = ARRAY[
    'Technicien télécommunications junior',
    'Technicien installation réseau',
    'Assistant exploitation télécoms'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'telecommunications';

-- 24 Réseaux et Sécurité
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
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'reseaux-securite-issmiga';

-- 25 Génie logiciel
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
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'genie-logiciel-bts';

-- 26 Informatique industrielle et automatisme
UPDATE public.formations SET 
  skills = ARRAY[
    'Lire les schémas d une installation automatisée',
    'Programmer des séquences simples sur automate',
    'Relier capteurs, actionneurs et interface de supervision',
    'Diagnostiquer les défauts et tester les sécurités sous encadrement'
  ],
  outlets = ARRAY[
    'Technicien automatisme junior',
    'Technicien maintenance de systèmes automatisés',
    'Assistant intégration industrielle'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'informatique-industrielle-automatisme';

-- 27 Maintenance des systèmes informatiques
UPDATE public.formations SET 
  skills = ARRAY[
    'Diagnostiquer les défauts de postes, serveurs et périphériques',
    'Installer et maintenir systèmes, logiciels et équipements',
    'Organiser un plan de maintenance et le suivi du parc',
    'Sécuriser les données et rédiger les rapports d intervention'
  ],
  outlets = ARRAY[
    'Technicien maintenance informatique',
    'Technicien support',
    'Gestionnaire de parc informatique junior'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'maintenance-systemes-informatiques';

-- 28 E-Commerce et Marketing numérique
UPDATE public.formations SET 
  skills = ARRAY[
    'Structurer un catalogue et un parcours de commande en ligne',
    'Préparer campagnes, contenus et actions de référencement',
    'Suivre commandes, service client et coordination logistique',
    'Analyser ventes, conversions et fidélisation'
  ],
  outlets = ARRAY[
    'Assistant e-commerce',
    'Assistant marketing numérique',
    'Gestionnaire de boutique en ligne junior'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'ecommerce-marketing-numerique';

-- ISSMIGA — Services et Social

-- 29 Esthétique, Cosmétique et Coiffure
UPDATE public.formations SET 
  skills = ARRAY[
    'Accueillir le client et identifier ses attentes',
    'Réaliser des prestations esthétiques et de coiffure prévues au programme',
    'Choisir les produits et appliquer les protocoles d hygiène',
    'Gérer rendez-vous, stocks et conseil de vente'
  ],
  outlets = ARRAY[
    'Esthéticien selon la spécialisation suivie',
    'Coiffeur selon la spécialisation suivie',
    'Conseiller vente de produits cosmétiques'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'esthetique-cosmetique-coiffure';

-- 30 Puériculture, Gérontologie et Auxiliaire de vie
UPDATE public.formations SET 
  skills = ARRAY[
    'Identifier les besoins quotidiens d un enfant ou d une personne âgée',
    'Accompagner les activités de vie quotidienne dans le respect de l autonomie',
    'Préparer des activités adaptées et un environnement sûr',
    'Observer, transmettre les informations et alerter les professionnels référents'
  ],
  outlets = ARRAY[
    'Assistant accompagnement à domicile',
    'Agent accompagnement de personnes âgées',
    'Assistant accueil petite enfance selon les exigences du poste'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'puericulture-gerontologie-auxiliaire';

-- 31 Économie et entrepreneuriat social
UPDATE public.formations SET 
  skills = ARRAY[
    'Analyser un besoin social et les ressources d un territoire',
    'Concevoir une activité conciliant impact social et viabilité économique',
    'Préparer budget, mobilisation des partenaires et suivi d activité',
    'Définir des indicateurs d impact et présenter les résultats'
  ],
  outlets = ARRAY[
    'Assistant projets associatifs',
    'Assistant développement communautaire',
    'Porteur de projet d entreprise sociale'
  ],
  diploma = 'bts',
  duration = '2 ans'
WHERE slug = 'economie-entrepreneuriat-social';
