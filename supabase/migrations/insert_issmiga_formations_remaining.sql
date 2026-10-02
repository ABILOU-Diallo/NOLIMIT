-- ==============================================================================
-- INSERTION DES FORMATIONS ISSMIGA MANQUANTES
-- ==============================================================================

-- ISSMIGA — Gestion / Management (13 formations)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'gestion-collectivites-territoriales',
  'gestion-administration',
  'gestion-collectivites-territoriales',
  'Gestion des collectivités territoriales',
  'Administration et développement stratégique des communes.',
  'Administration et développement stratégique des communes et régions décentralisées.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'assurance',
  'gestion-administration',
  'assurance',
  'Assurance',
  'Gestion des contrats de couverture et indemnisation.',
  'Gestion des contrats de couverture, indemnisation des sinistres et conseil client.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'gestion-qualite-issmiga',
  'gestion-administration',
  'gestion-qualite-issmiga',
  'Gestion de la qualité',
  'Déploiement des démarches de certification qualité.',
  'Déploiement des démarches de certification qualité et amélioration continue.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'gestion-projets-issmiga',
  'gestion-administration',
  'gestion-projets-issmiga',
  'Gestion des projets',
  'Méthodes de planification et suivi de budget.',
  'Méthodes de planification, suivi de budget et coordination d équipes projet.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'banque-finances',
  'gestion-administration',
  'banque-finances',
  'Banque et finances',
  'Analyse de dossiers de crédit et gestion de portefeuille.',
  'Analyse de dossiers de crédit, gestion de portefeuille et services bancaires.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'microfinance',
  'gestion-administration',
  'microfinance',
  'Microfinance',
  'Gestion spécifique des institutions de microcrédit.',
  'Gestion spécifique des institutions de microcrédit et financement inclusif.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'commerce-international',
  'gestion-administration',
  'commerce-international',
  'Commerce International',
  'Opérations d import-export et techniques douanières.',
  'Opérations d import-export, techniques douanières et négociation internationale.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'marketing-commerce-vente',
  'gestion-administration',
  'marketing-commerce-vente',
  'Marketing, Commerce et Vente',
  'Études de marché et management des forces de vente.',
  'Études de marché, élaboration de plans marketing et management des forces de vente.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'droit-affaires-entreprise',
  'gestion-administration',
  'droit-affaires-entreprise',
  'Droit des affaires et de l entreprise',
  'Conseil juridique aux sociétés et rédaction de contrats.',
  'Conseil juridique aux sociétés, rédaction de contrats et gestion du contentieux.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'gestion-fiscale',
  'gestion-administration',
  'gestion-fiscale',
  'Gestion fiscale',
  'Optimisation de la fiscalité d entreprise.',
  'Optimisation de la fiscalité d entreprise et déclarations d impôts réglementaires.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'douane-transit',
  'gestion-administration',
  'douane-transit',
  'Douane et transit',
  'Procédures douanières de dédouanement.',
  'Procédures douanières de dédouanement de marchandises à l import et export.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- ISSMIGA — Hôtellerie et Tourisme (8 formations)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'hotellerie',
  'creatif-service',
  'hotellerie',
  'Hôtellerie',
  'Gestion opérationnelle des établissements hôteliers.',
  'Gestion opérationnelle des établissements hôteliers aux standards internationaux.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'gestion-management-hoteliers',
  'creatif-service',
  'gestion-management-hoteliers',
  'Gestion et management hôteliers',
  'Direction d équipes et rentabilité financière.',
  'Direction d équipes, rentabilité financière et qualité de service en hôtellerie.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'management-technique-hebergement',
  'creatif-service',
  'management-technique-hebergement',
  'Management et technique d hébergement',
  'Supervision de la réception et du service d étage.',
  'Supervision de la réception, du service d étage et de la relation client.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'restauration',
  'creatif-service',
  'restauration',
  'Restauration',
  'Gestion des approvisionnements et direction de salle.',
  'Gestion des approvisionnements, direction de salle et de la production culinaire.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'genie-culinaire',
  'creatif-service',
  'genie-culinaire',
  'Génie culinaire',
  'Art de la haute cuisine et menus gastronomiques.',
  'Art de la haute cuisine, élaboration de menus gastronomiques et gestion de cuisine.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'commercialisation-services-restauration',
  'creatif-service',
  'commercialisation-services-restauration',
  'Commercialisation et services de restauration',
  'Événementiel de restauration et marketing des saveurs.',
  'Événementiel de restauration, marketing des saveurs et excellence du service à table.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'tourisme-loisirs',
  'creatif-service',
  'tourisme-loisirs',
  'Tourisme et loisirs',
  'Création de circuits touristiques et guidage.',
  'Création de circuits touristiques, guidage et valorisation du patrimoine.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'management-touristique',
  'creatif-service',
  'management-touristique',
  'Management touristique',
  'Direction d agences de voyage et marketing de destinations.',
  'Direction d agences de voyage, marketing de destinations et écotourisme.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- ISSMIGA — Numérique (5 formations)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'telecommunications',
  'cybersecurite',
  'telecommunications',
  'Télécommunications',
  'Déploiement d infrastructures de transmission voix et données.',
  'Déploiement d infrastructures de transmission voix, données et réseaux mobiles.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'informatique-industrielle-automatisme',
  'numerique-it',
  'informatique-industrielle-automatisme',
  'Informatique industrielle et automatisme',
  'Automatisation des lignes de production et programmation d automates.',
  'Automatisation des lignes de production, capteurs et programmation d automates.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'maintenance-systemes-informatiques',
  'numerique-it',
  'maintenance-systemes-informatiques',
  'Maintenance des systèmes informatiques',
  'Maintenance matérielle et logicielle des ordinateurs et serveurs.',
  'Maintenance matérielle et logicielle des ordinateurs, serveurs et périphériques.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'ecommerce-marketing-numerique',
  'numerique-it',
  'ecommerce-marketing-numerique',
  'E-Commerce et Marketing numérique',
  'Conception de boutiques en ligne et stratégies d acquisition digitales.',
  'Conception de boutiques en ligne, SEO, SEA et stratégies d acquisition digitales.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

-- ISSMIGA — Services et Social (3 formations)

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'esthetique-cosmetique-coiffure',
  'sante-qhse-social',
  'esthetique-cosmetique-coiffure',
  'Esthétique, Cosmétique et Coiffure',
  'Soins du corps, visuels d apparence et techniques de coiffure.',
  'Soins du corps, visuels d apparence et techniques de coiffure professionnelles haut de gamme.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'puericulture-gerontologie-auxiliaire',
  'sante-qhse-social',
  'puericulture-gerontologie-auxiliaire',
  'Puériculture, Gérontologie et Auxiliaire de vie',
  'Accompagnement et soins aux enfants et personnes âgées.',
  'Accompagnement et soins aux enfants en bas âge et aux personnes âgées ou dépendantes.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;

INSERT INTO public.formations (id, pole_id, slug, title, excerpt, description, diploma, duration, skills, outlets, sort_order, is_published, content_status)
VALUES (
  'economie-entrepreneuriat-social',
  'sante-qhse-social',
  'economie-entrepreneuriat-social',
  'Économie et entrepreneuriat social',
  'Développement de projets solidaires et économie circulaire.',
  'Développement de projets solidaires, coopératives et économie circulaire.',
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
  true,
  'title-only'
) ON CONFLICT (slug) DO UPDATE SET
  skills = EXCLUDED.skills,
  outlets = EXCLUDED.outlets;
