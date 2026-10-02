-- ==============================================================================
-- MISE À JOUR DES COMPÉTENCES ET DÉBOUCHÉS - ISSMIGA HÔTELLERIE ET TOURISME
-- Basé sur le document officiel des compétences et débouchés
-- ==============================================================================

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
  ]
WHERE id = 'hotellerie';

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
  ]
WHERE id = 'gestion-management-hoteliers';

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
  ]
WHERE id = 'management-technique-hebergement';

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
  ]
WHERE id = 'restauration';

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
  ]
WHERE id = 'genie-culinaire';

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
  ]
WHERE id = 'commercialisation-services-restauration';

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
  ]
WHERE id = 'tourisme-loisirs';

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
  ]
WHERE id = 'management-touristique';
