-- =======================================================================
-- RÉPARATION ET MISE À JOUR DE LA TABLE PREINSCRIPTIONS
-- =======================================================================

-- 1. Ajout des colonnes manquantes
ALTER TABLE public.preinscriptions ADD COLUMN IF NOT EXISTS institution text;
ALTER TABLE public.preinscriptions ADD COLUMN IF NOT EXISTS photo_url text;
ALTER TABLE public.preinscriptions ADD COLUMN IF NOT EXISTS documents_checklist jsonb DEFAULT '[]';
ALTER TABLE public.preinscriptions ADD COLUMN IF NOT EXISTS reference_code text;

-- 2. Mise à jour du type énuméré diploma_type pour la table formations
-- (Nécessaire pour l'insertion des Licences/Masters)
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
