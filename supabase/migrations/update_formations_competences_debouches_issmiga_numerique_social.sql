-- ==============================================================================
-- MISE À JOUR DES COMPÉTENCES ET DÉBOUCHÉS - ISSMIGA NUMÉRIQUE ET SERVICES SOCIAUX
-- Basé sur le document officiel des compétences et débouchés
-- ==============================================================================

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
  ]
WHERE id = 'telecommunications';

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
  ]
WHERE id = 'reseaux-securite-issmiga';

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
  ]
WHERE id = 'genie-logiciel-bts';

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
  ]
WHERE id = 'informatique-industrielle-automatisme';

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
  ]
WHERE id = 'maintenance-systemes-informatiques';

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
  ]
WHERE id = 'ecommerce-marketing-numerique';

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
  ]
WHERE id = 'esthetique-cosmetique-coiffure';

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
  ]
WHERE id = 'puericulture-gerontologie-auxiliaire';

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
  ]
WHERE id = 'economie-entrepreneuriat-social';
