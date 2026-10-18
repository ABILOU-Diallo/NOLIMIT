-- =======================================================================
-- AJOUT DES FILIÈRES ISSMIGA (BTS, LICENCE & MASTER) - VERSION FINALE
-- =======================================================================

-- 1. Mise à jour de l'ENUM diploma_type (Sécurisé par un bloc DO)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'diploma_type' AND e.enumlabel = 'bts') THEN
        ALTER TYPE public.diploma_type ADD VALUE 'bts';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'diploma_type' AND e.enumlabel = 'licence') THEN
        ALTER TYPE public.diploma_type ADD VALUE 'licence';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'diploma_type' AND e.enumlabel = 'master') THEN
        ALTER TYPE public.diploma_type ADD VALUE 'master';
    END IF;
END $$;

-- 2. Insertion des données
-- Note: 'bts', 'licence' et 'master' en minuscules pour l'ENUM
INSERT INTO public.formations (id, pole_id, slug, title, level, diploma, institution, duration, is_published, sort_order)
VALUES
-- BTS ISSMIGA
('bts-cge', 'gestion-administration', 'comptabilite-gestion-entreprises', 'BTS Comptabilité et Gestion des Entreprises', 'BTS', 'bts', 'issmiga', '2 ans', true, 10),
('bts-bf', 'gestion-administration', 'banque-finances', 'BTS Banque et Finances', 'BTS', 'bts', 'issmiga', '2 ans', true, 20),
('bts-grh', 'gestion-administration', 'ressources-humaines', 'BTS Gestion des Ressources Humaines', 'BTS', 'bts', 'issmiga', '2 ans', true, 30),
('bts-gl', 'numerique-it', 'genie-logiciel-bts', 'BTS Génie Logiciel', 'BTS', 'bts', 'issmiga', '2 ans', true, 40),
('bts-rs', 'cybersecurite', 'reseaux-securite-issmiga', 'BTS Réseaux et Sécurité', 'BTS', 'bts', 'issmiga', '2 ans', true, 50),

-- Licences Professionnelles
('lic-grh', 'gestion-administration', 'licence-gestion-ressources-humaines', 'Licence Professionnelle en Gestion des Ressources Humaines', 'Licence', 'licence', 'issmiga', '1 an (post-BTS)', true, 100),
('lic-cf', 'gestion-administration', 'licence-comptabilite-finance', 'Licence Professionnelle en Comptabilité et Finance', 'Licence', 'licence', 'issmiga', '1 an (post-BTS)', true, 110),
('lic-md', 'gestion-administration', 'licence-marketing-digital', 'Licence Professionnelle en Marketing Digital', 'Licence', 'licence', 'issmiga', '1 an (post-BTS)', true, 120),
('lic-gl', 'numerique-it', 'licence-genie-logiciel', 'Licence Professionnelle en Génie Logiciel', 'Licence', 'licence', 'issmiga', '1 an (post-BTS)', true, 130),
('lic-rs', 'cybersecurite', 'licence-reseaux-securite', 'Licence Professionnelle en Réseaux et Sécurité', 'Licence', 'licence', 'issmiga', '1 an (post-BTS)', true, 140),

-- Masters Professionnels
('mst-mp', 'gestion-administration', 'master-management-projets', 'Master Professionnel en Management des Projets', 'Master', 'master', 'issmiga', '2 ans', true, 200),
('mst-acg', 'gestion-administration', 'master-audit-controle-gestion', 'Master Professionnel en Audit et Contrôle de Gestion', 'Master', 'master', 'issmiga', '2 ans', true, 210),
('mst-sir', 'numerique-it', 'master-systemes-information-reseaux', 'Master Professionnel en Systèmes d''Information et Réseaux', 'Master', 'master', 'issmiga', '2 ans', true, 220)
ON CONFLICT (id) DO UPDATE SET
  diploma = EXCLUDED.diploma,
  level = EXCLUDED.level,
  duration = EXCLUDED.duration,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug;
