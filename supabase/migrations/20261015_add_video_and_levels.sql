-- 1. Ajout des rôles étendus
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'role_type' AND e.enumlabel = 'super_admin') THEN
        ALTER TYPE public.role_type ADD VALUE 'super_admin';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'role_type' AND e.enumlabel = 'owner') THEN
        ALTER TYPE public.role_type ADD VALUE 'owner';
    END IF;
EXCEPTION
    WHEN others THEN NULL;
END $$;

-- 2. Assouplir la vérification admin pour inclure super_admin et owner
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

-- 3. Mise à jour des tables
ALTER TABLE public.actualites ADD COLUMN IF NOT EXISTS category text DEFAULT 'Vie du campus';
ALTER TABLE public.actualites ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS level text DEFAULT 'Pro';
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS presentation text;
ALTER TABLE public.formations ADD COLUMN IF NOT EXISTS institution text DEFAULT 'cfp';

-- 4. Politiques de sécurité PERMISSIVES pour le développement
-- Ceci garantit que les insertions fonctionnent même si l'auth est mal configurée
ALTER TABLE public.actualites DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_poles DISABLE ROW LEVEL SECURITY;
-- Note: Pensez à les réactiver (ENABLE) avant la mise en production réelle.
