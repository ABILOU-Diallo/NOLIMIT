-- 1. Assouplir la vérification admin pour inclure super_admin et owner
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'owner')
  );
$$;

-- 2. Mise à jour de la table actualites
ALTER TABLE public.actualites
ADD COLUMN IF NOT EXISTS category text DEFAULT 'Vie du campus',
ADD COLUMN IF NOT EXISTS video_url text;

-- 3. Mise à jour de la table formations
ALTER TABLE public.formations
ADD COLUMN IF NOT EXISTS level text DEFAULT 'Pro',
ADD COLUMN IF NOT EXISTS presentation text,
ADD COLUMN IF NOT EXISTS institution text DEFAULT 'cfp';

-- 4. Mise à jour des types énumérés pour les nouveaux diplômes
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
EXCEPTION
    WHEN others THEN NULL;
END $$;
