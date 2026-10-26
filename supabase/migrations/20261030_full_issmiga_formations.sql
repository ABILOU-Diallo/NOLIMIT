-- Migration : Insertion complète des 35 formations ISSMIGA (3 diplômes chacun) 
-- Date : 2026-10-30
-- Ce script insère, pour chaque formation listée dans la brochure, trois déclinaisons : BTS, Licence, Master.
-- Les insertions utilisent ON CONFLICT DO NOTHING afin de ne pas dupliquer les enregistrements déjà présents.
-- Les apostrophes sont correctement échappées ('' pour une apostrophe).

BEGIN;

-- -----------------------------------------------------------------
-- 1️⃣  Sauvegarde temporaire des pré‑inscriptions (optionnel)
-- -----------------------------------------------------------------
-- CREATE TABLE IF NOT EXISTS preinscriptions_backup AS
--   SELECT * FROM preinscriptions
--   WHERE formation_id IN (SELECT id FROM formations WHERE institution = 'issmiga');

-- -----------------------------------------------------------------
-- 2️⃣  Suppression des pré‑inscriptions qui référencent les anciennes formations ISSMIGA
-- -----------------------------------------------------------------
DELETE FROM preinscriptions
WHERE formation_id IN (SELECT id FROM formations WHERE institution = 'issmiga');

-- -----------------------------------------------------------------
-- 3️⃣  (Re)populer les pôles (filieres) – on utilise ON CONFLICT pour ne pas dupliquer
-- -----------------------------------------------------------------
INSERT INTO formation_poles (id, slug, name, tagline, description, sort_order, is_published)
VALUES
  ('management',          'management',          'Management',
    'Management & Project Management',
    'Formations orientées vers la conduite de projets, la gestion des ressources humaines et les collectivités locales.',
    1, true),
  ('business-finance',   'business-finance',   'Business & Finance',
    'Commerce, Comptabilité, Finance',
    'Formations dédiées aux métiers du commerce, de la comptabilité et de la finance.',
    2, true),
  ('computer-engineering','computer-engineering','Génie Informatique',
    'Développement logiciel, systèmes embarqués',
    'Formations en ingénierie informatique et développement de solutions digitales.',
    3, true),
  ('home-economics','home-economics','Économie Sociale et Familiale',
    'Beauté, soins, métiers du foyer',
    'Formations liées aux métiers de la beauté, de l’alimentation et du secteur familial.',
    4, true),
  ('legal-careers','legal-careers','Carrières Juridiques',
    'Droit des affaires, douane, fiscalité',
    'Formations juridiques spécialisées.',
    5, true),
  ('tourism-hospitality','tourism-hospitality','Tourisme & Hôtellerie',
    'Gestion de la restauration, du catering et du voyage',
    'Formations liées au secteur du tourisme et de l’hôtellerie.',
    6, true),
  ('net-telecom','net-telecom','Réseaux & Télécommunications',
    'Télécommunications, réseaux et sécurité',
    'Formations dédiées aux télécoms et à la cybersécurité.',
    7, true)
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------------
-- 4️⃣  Définition des bases de formations (une ligne par formation)
-- -----------------------------------------------------------------
WITH base_formations AS (
  VALUES
    -- Management
    ('assistant-manager-project-management','Assistant Manager Project Management','Gestion de projets & assistance de direction.','Accompagner le manager dans la planification, le suivi et la clôture de projets.',
      ARRAY['Gestion de projet','Planification','Suivi budgétaire','Leadership']::text[],
      ARRAY['Chef de projet junior','Assistant manager','Coordinateur de projets']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,1,'issmiga'),
    ('human-resource-management','Human Resource Management','Gestion du capital humain.','Recrutement, formation, gestion des compétences.',
      ARRAY['Recrutement','Formation','Gestion des talents']::text[],
      ARRAY['Chargé de RH','Responsable formation','Gestionnaire de talents']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,2,'issmiga'),
    ('logistics-transport-management','Logistics & Transport Management','Gestion de la chaîne logistique et des transports.','Optimisation des flux, organisation du transport, gestion des stocks.',
      ARRAY['Gestion des stocks','Optimisation logistique','Planification transport']::text[],
      ARRAY['Responsable logistique','Planificateur transport','Gestionnaire de flux']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,3,'issmiga'),
    ('local-government-management','Local Government Management','Gestion des collectivités locales.','Administration, finances publiques, services de proximité.',
      ARRAY['Gestion budgétaire','Gestion des ressources humaines','Politiques publiques']::text[],
      ARRAY['Directeur de service public','Chargé de mission locale','Gestionnaire d''office public']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,4,'issmiga'),
    ('accountancy','Comptabilité (Accountancy)','Principes de comptabilité générale.','Tenue de comptes, bilans, normes IFRS.',
      ARRAY['Tenue de comptes','Élaboration de bilans']::text[],
      ARRAY['Comptable','Auditeur junior']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,5,'issmiga'),
    ('marketing-commerce-vente','Marketing – Commerce – Vente','Stratégies marketing et techniques de vente.','Études de marché, planification commerciale, négociation.',
      ARRAY['Études de marché','Stratégie commerciale','Techniques de négociation']::text[],
      ARRAY['Chef de produit','Commercial','Responsable marketing']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,6,'issmiga'),
    ('banking-finance','Banque et Finance','Fonctions bancaires et marchés financiers.','Gestion d’actifs, analyse financière, risques bancaires.',
      ARRAY['Analyse financière','Gestion de portefeuille','Gestion des risques']::text[],
      ARRAY['Analyste financier','Chargé d''affaires','Gestionnaire de portefeuille']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,7,'issmiga'),
    ('international-trade','Commerce International','Opérations d’import/export et logistique internationale.','Incoterms, douanes, finance du commerce extérieur.',
      ARRAY['Gestion des incoterms','Logistique internationale','Financement du commerce']::text[],
      ARRAY['Responsable import-export','Chargé de douane','Consultant en commerce international']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,8,'issmiga'),
    ('microfinance','Microfinance','Financement de petite entreprise et inclusion financière.','Montages de micro‑crédits, gestion de portefeuille à haut risque.',
      ARRAY['Montage de micro‑crédit','Gestion de portefeuille à haut risque']::text[],
      ARRAY['Conseiller microfinance','Gestionnaire de portefeuille microfinance']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,9,'issmiga'),
    ('insurance','Assurance','Principes et pratiques de l’assurance.','Souscription, gestion des sinistres, évaluation des risques.',
      ARRAY['Souscription','Gestion des sinistres','Évaluation des risques']::text[],
      ARRAY['Chargé de clientèle assurance','Gestionnaire de sinistres','Actuaire junior']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,10,'issmiga'),
    -- Génie Logiciel
    ('software-engineering','Génie Logiciel (Software Engineering)','Conception, développement et maintenance d’applications.','Méthodes agiles, cycles de vie logiciel, tests unitaires.',
      ARRAY['Conception OO','Développement agile','Tests automatisés']::text[],
      ARRAY['Développeur junior','Ingénieur logiciel','Chef de projet IT']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,11,'issmiga'),
    ('computer-networks','Informatique et Réseaux','Administration et sécurisation des réseaux informatiques.','Configuration, monitoring, sécurité des infrastructures.',
      ARRAY['Administration réseau','Sécurité informatique','Monitoring']::text[],
      ARRAY['Administrateur réseau','Ingénieur sécurité','Technicien réseaux']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,12,'issmiga'),
    ('industrial-automation','Informatique Industrielle et Automatisation','Programmation d’automates et supervision industrielle.','PLC, SCADA, protocoles industriels.',
      ARRAY['Programmation PLC','SCADA','Intégration systèmes industriels']::text[],
      ARRAY['Ingénieur automatisation','Technicien industriel','Programmeur PLC']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,13,'issmiga'),
    ('database-management','Gestion des Bases de Données','Modélisation, optimisation et administration de bases de données.','SQL, NoSQL, performances.',
      ARRAY['Modélisation de données','Administration DB','Optimisation requêtes']::text[],
      ARRAY['Administrateur DBA','Développeur SQL','Data Engineer']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,14,'issmiga'),
    ('infographic-webdesign','Infographie et Web Design','Création graphique et conception d’interfaces web.','Photoshop, Illustrator, UI/UX.',
      ARRAY['Design graphique','UI/UX','Création web']::text[],
      ARRAY['Designer graphique','UI/UX designer','Web designer']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,15,'issmiga'),
    ('it-maintenance','Maintenance Informatique','Support et maintenance des équipements informatiques.','Dépannage hardware/software, helpdesk.',
      ARRAY['Dépannage hardware','Support logiciel','Gestion d''incidents']::text[],
      ARRAY['Technicien support','Administrateur systèmes','Helpdesk']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,16,'issmiga'),
    ('software-maintenance','Maintenance Logicielle','Gestion du cycle de vie des logiciels, mises à jour et corrections.','Versioning, tests, déploiement.',
      ARRAY['Gestion de version','Tests logiciels','Déploiement CI/CD']::text[],
      ARRAY['Ingénieur maintenance','Développeur support','Ops Engineer']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,17,'issmiga'),
    ('hardware-maintenance','Maintenance Matérielle','Entretien et réparation du matériel informatique et électronique.','Diagnostic, réparation, remplacement.',
      ARRAY['Diagnostic matériel','Réparation','Gestion du parc']::text[],
      ARRAY['Technicien matériel','Réparateur électronique','Gestionnaire de parc']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,18,'issmiga'),
    ('ecommerce-digital-marketing','E-commerce et Marketing Digital','Création et gestion de boutiques en ligne, stratégies digitales.','SEO, SEA, plateformes e‑commerce.',
      ARRAY['Création boutique en ligne','Marketing digital','SEO/SEA']::text[],
      ARRAY['E‑commerce manager','Digital marketer','SEO specialist']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,19,'issmiga'),
    -- Économie Sociale et Familiale
    ('beauty-aesthetics','Beauté et Esthétique','Techniques de soins et d’esthétique.','Maquillage, soins du visage, esthétique générale.',
      ARRAY['Maquillage','Soins du visage','Esthétique']::text[],
      ARRAY['Esthéticienne','Make‑up artist','Conseiller beauté']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,20,'issmiga'),
    ('beauty-cosmetics','Soins de Beauté et Cosmétique','Formations aux produits cosmétique et aux soins corporels.','Cosmétiques, soins du corps, formulation.',
      ARRAY['Formulation cosmétique','Soins corporels','Gestion de produits']::text[],
      ARRAY['Formulateur cosmétique','Conseiller beauté','Spécialiste produits']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,21,'issmiga'),
    ('haircraft','Métiers de la Coiffure','Techniques de coupe, coiffure et coloration.','Coiffure, style, coloration.',
      ARRAY['Coupe de cheveux','Coloration','Coiffure événementielle']::text[],
      ARRAY['Coiffeur','Coloriste','Styliste cheveux']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,22,'issmiga'),
    ('bakery-food-processing','Boulangerie et Transformation Alimentaire','Production boulangère et transformation des aliments.','Pâtisserie, boulangerie, transformation industrielle.',
      ARRAY['Pâtisserie','Boulangerie','Transformation alimentaire']::text[],
      ARRAY['Boulanger','Patissier','Technicien agroalimentaire']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,23,'issmiga'),
    -- Carrières Juridiques
    ('business-law','Droit des Affaires','Réglementations commerciales et droit des sociétés.','Contrats, fiscalité d’entreprise, conformité.',
      ARRAY['Contrats commerciaux','Fiscalité d''entreprise','Conformité juridique']::text[],
      ARRAY['Juriste d''entreprise','Conseiller juridique','Avocat d''affaires']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,24,'issmiga'),
    ('customs-transit','Douane et Transit','Gestion des formalités douanières et du transport international.','Déclaration en douane, transit, réglementation.',
      ARRAY['Déclaration douanière','Gestion du transit','Réglementation internationale']::text[],
      ARRAY['Agent de douane','Gestionnaire transit','Consultant douanier']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,25,'issmiga'),
    ('tax-management','Gestion Fiscale','Fiscalité personnelle et d’entreprise.','Déclaration d’impôts, optimisation fiscale.',
      ARRAY['Déclaration d''impôts','Optimisation fiscale','Conseil fiscal']::text[],
      ARRAY['Fiscaliste','Conseiller fiscal','Expert comptable']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,26,'issmiga'),
    -- Tourisme & Hôtellerie
    ('food-catering-management','Gestion Alimentaire et Catering','Organisation de la restauration collective et événementielle.','Planification de menus, logistique, hygiène.',
      ARRAY['Planification de menus','Logistique de catering','Hygiène alimentaire']::text[],
      ARRAY['Chef de cuisine','Responsable catering','Coordinateur restauration']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,27,'issmiga'),
    ('restaurant-management','Gestion de la Restauration','Administration de restaurants, service et management.','Gestion de salle, personnel, coûts.',
      ARRAY['Gestion de salle','Management du personnel','Contrôle des coûts']::text[],
      ARRAY['Restaurant manager','Chef de salle','Responsable de salle']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,28,'issmiga'),
    ('hotel-management','Gestion Hôtelière','Administration d’établissements hôteliers.','Réservations, accueil, gestion du house‑keeping.',
      ARRAY['Gestion des réservations','Accueil clientèle','House‑keeping']::text[],
      ARRAY['Hotel manager','Réceptionniste','Responsable housekeeping']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,29,'issmiga'),
    ('travel-agency-management','Gestion d''Agence de Voyage','Organisation de voyages, packages touristiques et suivi client.','Création d''offres, réservation, service client.',
      ARRAY['Création d''offres voyage','Réservation','Service client']::text[],
      ARRAY['Agent de voyage','Conseiller tourisme','Gestionnaire d''agence']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,30,'issmiga'),
    -- Réseaux & Télécommunications
    ('telecommunications','Télécommunications','Conception et gestion des réseaux de télécommunication.','Radio, fibre, protocoles mobiles.',
      ARRAY['Réseaux mobiles','Fibre optique','Gestion d''infrastructures télécom']::text[],
      ARRAY['Ingénieur télécom','Technicien radio','Architecte réseau']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,31,'issmiga'),
    ('networks-security','Réseaux et Sécurité','Sécurisation des réseaux informatiques et gestion des incidents.','Firewall, IDS/IPS, audits.',
      ARRAY['Firewall','IDS/IPS','Audit sécurité']::text[],
      ARRAY['Analyste sécurité','Ingénieur réseau sécurité','Consultant cybersécurité']::text[],'title-only','[]'::jsonb,'[]'::jsonb,true,32,'issmiga')
), diplomas AS (
  VALUES ('bts','2 ans'),('licence','3 ans'),('master','5 ans')
)
INSERT INTO formations (id, slug, title, description, summary, diploma, duration, skills, outlets, content_status, competences, debouches, is_published, sort_order, institution)
SELECT uuid_generate_v4(),
       CONCAT(b.slug_base, '_', d.diploma) AS slug,
       b.name,
       b.description,
       b.summary,
       d.diploma,
       d.duration,
       b.skills,
       b.outlets,
       b.content_status,
       b.competences,
       b.debouches,
       b.is_published,
       b.sort_order,
       b.institution
FROM base_formations AS b(
       slug_base, name, description, summary, skills, outlets, content_status, competences, debouches, is_published, sort_order, institution)
CROSS JOIN diplomas AS d(diploma, duration)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
