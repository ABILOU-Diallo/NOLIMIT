-- Migration : Ajout des formations ISSMIGA en trois diplômes (BTS, Licence, Master)
-- Date : 2026-10-30
-- Ce script insère, pour chaque formation existante, trois déclinaisons selon le diplôme.
-- Les insertions utilisent ON CONFLICT DO NOTHING afin de ne pas dupliquer les enregistrements déjà présents.
-- Les apostrophes sont correctement échappées ('' pour une apostrophe).

BEGIN;

-- ------------------------------------------------------------------------------
-- 1️⃣ Sauvegarde temporaire des pré‑inscriptions (optionnel)
-- ------------------------------------------------------------------------------
-- CREATE TABLE IF NOT EXISTS preinscriptions_backup AS
--   SELECT * FROM preinscriptions
--   WHERE formation_id IN (SELECT id FROM formations WHERE institution IN ('issmiga','cfp'));

-- ------------------------------------------------------------------------------
-- 2️⃣ Suppression des pré‑inscriptions qui référencent les anciennes formations ISSMIGA/CFP
-- ------------------------------------------------------------------------------
DELETE FROM preinscriptions
WHERE formation_id IN (SELECT id FROM formations WHERE institution IN ('issmiga','cfp'));

-- ------------------------------------------------------------------------------
-- 3️⃣ (Re)populer les pôles (filieres) – on utilise ON CONFLICT pour ne pas dupliquer
-- ------------------------------------------------------------------------------
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
    3, true)
ON CONFLICT (slug) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 4️⃣ Insertion des formations – chaque base est dupliquée pour les trois diplômes
-- ------------------------------------------------------------------------------
WITH base_formations AS (
  VALUES
    -- slug_base, name, description, summary, skills, outlets, content_status, competences, debouches, is_published, sort_order, institution
    ('assistant-manager-project-management','Assistant Manager Project Management',
     'Gestion de projets & assistance de direction.',
     'Accompagner le manager dans la planification, le suivi et la clôture de projets.',
     ARRAY['Gestion de projet','Planification','Suivi budgétaire','Leadership']::text[],
     ARRAY['Chef de projet junior','Assistant manager','Coordinateur de projets']::text[],
     'title-only',
     '[{"name":"Gestion de projet"},{"name":"Planification"},{"name":"Suivi budgétaire"},{"name":"Leadership"}]'::jsonb,
     '[{"name":"Chef de projet junior"},{"name":"Assistant manager"},{"name":"Coordinateur de projets"}]'::jsonb,
     true, 1, 'issmiga'),
    ('human-resource-management','Human Resource Management',
     'Gestion du capital humain.',
     'Recrutement, formation, gestion des compétences.',
     ARRAY['Recrutement','Formation','Gestion des talents']::text[],
     ARRAY['Chargé de RH','Responsable formation','Gestionnaire de talents']::text[],
     'title-only',
     '[{"name":"Recrutement"},{"name":"Formation"},{"name":"Gestion des talents"}]'::jsonb,
     '[{"name":"Chargé de RH"},{"name":"Responsable formation"},{"name":"Gestionnaire de talents"}]'::jsonb,
     true, 2, 'issmiga')
    -- TODO : ajouter les 33 autres formations ici en suivant le même format
), diplomas AS (
  VALUES ('bts','2 ans'),('licence','3 ans'),('master','5 ans')
)
INSERT INTO formations (id, slug, name, description, summary, diploma, duration, skills, outlets, content_status, competences, debouches, is_published, sort_order, institution)
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
FROM base_formations AS b(slug_base, name, description, summary, skills, outlets, content_status, competences, debouches, is_published, sort_order, institution)
CROSS JOIN diplomas AS d(diploma, duration)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
