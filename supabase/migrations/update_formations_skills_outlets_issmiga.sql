-- ==============================================================================
-- MISE À JOUR DES COMPÉTENCES ET DÉBOUCHÉS DES FORMATIONS ISSMIGA (BTS/Licence/Master)
-- ==============================================================================
-- Ce script met à jour les colonnes skills et outlets des formations ISSMIGA
-- avec les données provenant du fichier formations.js

-- ISSMIGA — Gestion / Management
UPDATE public.formations SET 
  skills = ARRAY['Administration publique', 'Décentralisation', 'Budget communal', 'Développement local', 'Gestion publique', 'Politiques territoriales', 'Partenariat public-privé', 'Gouvernance locale'],
  outlets = ARRAY['Administrateur territorial', 'Chef de service communal', 'Conseiller territorial', 'Collectivités territoriales', 'Ministère intérieur', 'ONG locales']
WHERE id = 'gestion-collectivites-territoriales';

UPDATE public.formations SET 
  skills = ARRAY['Droit des assurances', 'Gestion sinistres', 'Produits d assurance', 'Courtage', 'Analyse risque', 'Indemnisation', 'Conseil client', 'Réglementation assurance'],
  outlets = ARRAY['Courtier en assurance', 'Gestionnaire sinistres', 'Chargé d assurance', 'Compagnie d assurance', 'Courtage', 'Conseil assurance']
WHERE id = 'assurance';

UPDATE public.formations SET 
  skills = ARRAY['Supply chain', 'Transport international', 'Douane', 'Gestion des stocks', 'Incoterms', 'Fret maritime/aérien', 'WMS, TMS', 'Optimisation logistique'],
  outlets = ARRAY['Responsable logistique', 'Supply Chain Manager', 'Chef de projet transport', 'Transitaire', 'Entreprise logistique', 'Import-export']
WHERE id = 'gestion-logistique-transport';

UPDATE public.formations SET 
  skills = ARRAY['ISO 9001', 'Management qualité', 'Process improvement', 'Audit qualité', 'KPI', 'Lean management', 'Six Sigma', 'Certification'],
  outlets = ARRAY['Responsable qualité', 'Quality Manager', 'Auditeur qualité', 'Consultant qualité', 'Direction qualité', 'Certification']
WHERE id = 'gestion-qualite-issmiga';

UPDATE public.formations SET 
  skills = ARRAY['Project management', 'Planning', 'Budgeting', 'MS Project', 'Risk management', 'Stakeholder management', 'Agile', 'Reporting'],
  outlets = ARRAY['Chef de projet', 'Project Manager', 'Coordinateur projet', 'PMO', 'Consultant projet', 'Entreprises']
WHERE id = 'gestion-projets-issmiga';

UPDATE public.formations SET 
  skills = ARRAY['Recrutement', 'Gestion paie', 'Administration personnel', 'Droit du travail', 'Formation', 'GPEC', 'Social dialogue', 'SIRH'],
  outlets = ARRAY['Responsable RH', 'Chargé RH', 'Recruteur', 'Gestionnaire paie', 'DRH assistant', 'Cabinet RH']
WHERE id = 'ressources-humaines';

UPDATE public.formations SET 
  skills = ARRAY['Analyse crédit', 'Produits bancaires', 'Gestion portefeuille', 'Risque bancaire', 'Conformité bancaire', 'Finance', 'Relation client', 'Logiciels bancaires'],
  outlets = ARRAY['Chargé de clientèle bancaire', 'Analyste crédit', 'Gestionnaire de portefeuille', 'Banque', 'Microfinance', 'Institution financière']
WHERE id = 'banque-finances';

UPDATE public.formations SET 
  skills = ARRAY['Comptabilité générale', 'Comptabilité analytique', 'Fiscalité', 'Bilan, compte de résultat', 'Logiciels comptables', 'Audit', 'Normes IFRS', 'Reporting'],
  outlets = ARRAY['Comptable', 'Expert-comptable junior', 'Auditeur junior', 'Cabinet comptable', 'Direction comptable', 'Entreprise']
WHERE id = 'comptabilite-gestion-entreprises';

UPDATE public.formations SET 
  skills = ARRAY['Microcrédit', 'Finance inclusive', 'Gestion de portefeuille microfinance', 'Analyse risque microfinance', 'Épargne', 'Produits microfinance', 'Social performance', 'Réglementation'],
  outlets = ARRAY['Agent de microfinance', 'Chargé de crédit microfinance', 'Responsable agence IMF', 'Institution de microfinance', 'ONG financière', 'Banque sociale']
WHERE id = 'microfinance';

-- ISSMIGA — Commerce-Vente / Business and Finance
UPDATE public.formations SET 
  skills = ARRAY['Import-export', 'Douane', 'Incoterms', 'Négociation internationale', 'Lettre de crédit', 'Logistique internationale', 'Marchés étrangers', 'Commerce équitable'],
  outlets = ARRAY['Chargé d import-export', 'Commercial international', 'Transitaire', 'Entreprise export', 'Chambre de commerce', 'Organisation internationale']
WHERE id = 'commerce-international';

UPDATE public.formations SET 
  skills = ARRAY['Marketing stratégique', 'Études de marché', 'Plan marketing', 'Force de vente', 'Marketing digital', 'Brand management', 'Trade marketing', 'Communication'],
  outlets = ARRAY['Responsable marketing', 'Chef de produit', 'Commercial senior', 'Force de vente', 'Agence marketing', 'Direction commerciale']
WHERE id = 'marketing-commerce-vente';

-- ISSMIGA — Tourisme, Hôtellerie et Restauration
UPDATE public.formations SET 
  skills = ARRAY['Gestion hôtelière', 'Réception', 'Service chambres', 'Standards hôteliers', 'PMS (Property Management System)', 'Relation client', 'Réservations', 'Qualité service'],
  outlets = ARRAY['Réceptionniste', 'Gouvernante', 'Responsable réception', 'Hôtel', 'Chaîne hôtelière', 'Tourisme']
WHERE id = 'hotellerie';

UPDATE public.formations SET 
  skills = ARRAY['Management hôtelier', 'Revenue management', 'Gestion financière hôtelière', 'Leadership', 'Qualité service', 'Marketing hôtelier', 'RH hôtellerie', 'Stratégie hôtelière'],
  outlets = ARRAY['Directeur d hôtel adjoint', 'Manager hôtelier', 'Revenue Manager', 'Hôtellerie', 'Groupe hôtelier', 'Consultant hôtelier']
WHERE id = 'gestion-management-hoteliers';

UPDATE public.formations SET 
  skills = ARRAY['Technique hébergement', 'Service étage', 'Conciergerie', 'Housekeeping management', 'Relation client', 'Maintenance', 'Standards qualité', 'Team leadership'],
  outlets = ARRAY['Responsable hébergement', 'Gouvernante chef', 'Concierge', 'Hôtel', 'Résidence', 'Tourisme']
WHERE id = 'management-technique-hebergement';

UPDATE public.formations SET 
  skills = ARRAY['Gestion restauration', 'Cuisine', 'Salle', 'Approvisionnement', 'Hygiène HACCP', 'Menu planning', 'Coûts food', 'Service client'],
  outlets = ARRAY['Chef de rang', 'Responsable salle', 'Gérant restaurant', 'Restaurant', 'Catering', 'Hôtellerie']
WHERE id = 'restauration';

UPDATE public.formations SET 
  skills = ARRAY['Cuisine gastronomique', 'Techniques culinaires avancées', 'Menu engineering', 'Gestion cuisine', 'Hygiène', 'Créativité culinaire', 'Coûts', 'Leadership cuisine'],
  outlets = ARRAY['Chef cuisinier', 'Sous-chef', 'Chef de partie', 'Restaurant gastronomique', 'Hôtel 4-5 étoiles', 'Catering haut de gamme']
WHERE id = 'genie-culinaire';

UPDATE public.formations SET 
  skills = ARRAY['Marketing restauration', 'Vente restauration', 'Événementiel', 'Service client', 'Upselling', 'Gestion relation client', 'Promotions', 'Digital marketing food'],
  outlets = ARRAY['Commercial restauration', 'Responsable événementiel', 'Sales manager restauration', 'Catering', 'Chaîne restaurant', 'Hôtellerie']
WHERE id = 'commercialisation-services-restauration';

UPDATE public.formations SET 
  skills = ARRAY['Guidage touristique', 'Création circuits', 'Patrimoine culturel', 'Tourisme durable', 'Anglais touristique', 'Animation touristique', 'Réservation voyages', 'Relation client'],
  outlets = ARRAY['Guide touristique', 'Chargé de voyages', 'Animateur touristique', 'Agence de voyage', 'Office du tourisme', 'Tourisme culturel']
WHERE id = 'tourisme-loisirs';

UPDATE public.formations SET 
  skills = ARRAY['Management tourisme', 'Marketing destination', 'Écotourisme', 'Gestion agence voyage', 'Revenue management tourisme', 'Stratégie touristique', 'Digital tourisme', 'Développement produit'],
  outlets = ARRAY['Directeur d agence de voyage', 'Manager tourisme', 'Responsable destination', 'Agence voyage', 'Tourisme durable', 'Office du tourisme']
WHERE id = 'management-touristique';

-- ISSMIGA — Carrières Juridiques
UPDATE public.formations SET 
  skills = ARRAY['Droit des sociétés', 'Droit des contrats', 'Contentieux', 'Rédaction juridique', 'Droit commercial', 'Droit du travail', 'Droit fiscal', 'Négociation juridique'],
  outlets = ARRAY['Juriste d entreprise', 'Conseiller juridique', 'Avocat stagiaire', 'Cabinet d avocats', 'Direction juridique', 'Notariat']
WHERE id = 'droit-affaires-entreprise';

UPDATE public.formations SET 
  skills = ARRAY['Fiscalité entreprise', 'Optimisation fiscale', 'Déclarations fiscales', 'Impôt sur les sociétés', 'TVA', 'Fiscalité internationale', 'Audit fiscal', 'Conformité fiscale'],
  outlets = ARRAY['Fiscaliste', 'Conseiller fiscal', 'Expert-comptable fiscal', 'Cabinet fiscal', 'Direction fiscale', 'Administration fiscale']
WHERE id = 'gestion-fiscale';

UPDATE public.formations SET 
  skills = ARRAY['Régime douanier', 'Dédouanement', 'Transit', 'Tarif douanier', 'Incoterms', 'Logistique douanière', 'Déclarations', 'Conformité'],
  outlets = ARRAY['Transitaire', 'Déclarant en douane', 'Agent douane', 'Transitaire', 'Entreprise import-export', 'Administration des douanes']
WHERE id = 'douane-transit';

-- ISSMIGA — Réseaux et Télécommunications
UPDATE public.formations SET 
  skills = ARRAY['Réseaux mobiles (4G/5G)', 'Fibre optique', 'VoIP', 'Transmission', 'Antennes', 'RF planning', 'OSS/BSS', 'Telecom protocols'],
  outlets = ARRAY['Ingénieur télécoms', 'Technicien télécoms', 'Opérateur télécoms', 'Équipementier télécoms', 'Infrastructure télécoms', 'Consultant télécoms']
WHERE id = 'telecommunications';

UPDATE public.formations SET 
  skills = ARRAY['Routing (BGP, OSPF)', 'Switching', 'Firewall', 'VPN', 'Network security', 'SDN', 'Wi-Fi enterprise', 'Network monitoring'],
  outlets = ARRAY['Ingénieur réseau', 'Administrateur réseau', 'Security Network Engineer', 'Opérateur', 'Intégrateur réseau', 'SSII']
WHERE id = 'reseaux-securite-issmiga';

-- ISSMIGA — Génie Informatique
UPDATE public.formations SET 
  skills = ARRAY['UML', 'Java, C#, C++', 'Bases de données', 'Design patterns', 'Architecture logicielle', 'Testing', 'Gestion de projet', 'DevOps basics'],
  outlets = ARRAY['Ingénieur logiciel', 'Développeur senior', 'Architecte logiciel', 'SSII', 'Startup', 'Direction technique']
WHERE id = 'genie-logiciel-bts';

UPDATE public.formations SET 
  skills = ARRAY['Automates (Siemens, Schneider)', 'SCADA', 'Capteurs', 'Actionneurs', 'PLC programming', 'Régulation', 'Supervision', 'Industrie 4.0'],
  outlets = ARRAY['Automaticien', 'Ingénieur automatisme', 'Technicien maintenance industrielle', 'Industrie manufacturière', 'Intégrateur industriel', 'Énergie']
WHERE id = 'informatique-industrielle-automatisme';

UPDATE public.formations SET 
  skills = ARRAY['Hardware maintenance', 'Windows Server', 'Linux', 'Virtualisation', 'Réseaux', 'Dépannage', 'Backup', 'Active Directory'],
  outlets = ARRAY['Technicien maintenance informatique', 'Administrateur système', 'Support IT', 'SSII', 'Direction informatique', 'Freelance IT']
WHERE id = 'maintenance-systemes-informatiques';

UPDATE public.formations SET 
  skills = ARRAY['E-commerce platforms', 'SEO, SEA', 'Google Analytics', 'Social media ads', 'Email marketing', 'Conversion optimization', 'UX/UI e-commerce', 'Affiliation'],
  outlets = ARRAY['E-commerce Manager', 'Digital Marketing Manager', 'Traffic Manager', 'SEO Specialist', 'Startup e-commerce', 'Agence digital']
WHERE id = 'ecommerce-marketing-numerique';

-- ISSMIGA — Économie et entrepreneuriat social / Home Economics
UPDATE public.formations SET 
  skills = ARRAY['Soins esthétiques', 'Maquillage professionnel', 'Coiffure', 'Colorimétrie', 'Hygiène', 'Conseil image', 'Gestion salon', 'Techniques avancées'],
  outlets = ARRAY['Esthéticienne', 'Coiffeur-styliste', 'Maquilleur professionnel', 'Salon de coiffure', 'Institut de beauté', 'Freelance beauté']
WHERE id = 'esthetique-cosmetique-coiffure';

UPDATE public.formations SET 
  skills = ARRAY['Puériculture', 'Gérontologie', 'Soins aux personnes âgées', 'Hygiène', 'Psychologie', 'Premiers secours', 'Accompagnement social', 'Éducation'],
  outlets = ARRAY['Auxiliaire de vie', 'Assistante maternelle', 'Aide-soignante', 'EHPAD', 'Crèche', 'Service à domicile']
WHERE id = 'puericulture-gerontologie-auxiliaire';

UPDATE public.formations SET 
  skills = ARRAY['Économie sociale et solidaire', 'Entrepreneuriat social', 'Coopératives', 'Économie circulaire', 'Business plan social', 'Financement solidaire', 'Impact measurement', 'Innovation sociale'],
  outlets = ARRAY['Entrepreneur social', 'Manager coopérative', 'Chargé de projet ESS', 'ONG', 'Association', 'Incubateur social']
WHERE id = 'economie-entrepreneuriat-social';
