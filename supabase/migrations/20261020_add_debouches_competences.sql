-- Migration : Ajout des colonnes debouches et competences
-- Date : 2026-10-25
-- Cette migration ajoute deux nouvelles colonnes JSONB à la table public.formations
--   * competences : tableau JSON décrivant les compétences acquises
--   * debouches   : tableau JSON décrivant les débouchés / métiers visés
-- Les colonnes sont initialisées à un tableau JSON vide pour garder la compatibilité.

BEGIN;

ALTER TABLE public.formations
  ADD COLUMN IF NOT EXISTS competences jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS debouches   jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMIT;
