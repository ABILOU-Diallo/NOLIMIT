-- ==============================================================================
-- MISE À JOUR DES COMPÉTENCES ET DÉBOUCHÉS - ISSMIGA GESTION
-- Basé sur le document officiel des compétences et débouchés
-- ==============================================================================

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
  ]
WHERE id = 'gestion-collectivites-territoriales';

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
  ]
WHERE id = 'assurance';

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
  ]
WHERE id = 'gestion-logistique-transport';

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
  ]
WHERE id = 'gestion-qualite-issmiga';

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
  ]
WHERE id = 'gestion-projets-issmiga';

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
  ]
WHERE id = 'ressources-humaines';

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
  ]
WHERE id = 'banque-finances';

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
  ]
WHERE id = 'comptabilite-gestion-entreprises';

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
  ]
WHERE id = 'microfinance';

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
  ]
WHERE id = 'commerce-international';

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
  ]
WHERE id = 'marketing-commerce-vente';

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
  ]
WHERE id = 'droit-affaires-entreprise';

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
  ]
WHERE id = 'gestion-fiscale';

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
  ]
WHERE id = 'douane-transit';
