-- ============================================================
-- Migration: Hiérarchie des rôles - PARTIE 2
-- Fonctions, triggers, RLS, assignation des rôles, storage
-- ============================================================

-- 1. Fonctions helper pour les rôles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin', 'owner')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role IN ('super_admin', 'owner')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'owner'
  );
$$;

-- 2. Mettre à jour le trigger d'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role public.role_type;
BEGIN
  v_role := CASE
    WHEN new.email = 'nicodevnico@gmail.com' THEN 'owner'::public.role_type
    WHEN new.email IN ('tantchou@yahoo.com', 'njoyadiallo4@gmail.com') THEN 'super_admin'::public.role_type
    ELSE 'student'::public.role_type
  END;

  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    v_role
  );
  RETURN new;
END;
$$;

-- 3. Attribuer les bons rôles aux comptes existants
UPDATE public.profiles
SET role = 'owner'
WHERE id IN (SELECT id FROM auth.users WHERE email = 'nicodevnico@gmail.com');

UPDATE public.profiles
SET role = 'super_admin'
WHERE id IN (
  SELECT id FROM auth.users
  WHERE email IN ('tantchou@yahoo.com', 'njoyadiallo4@gmail.com')
)
AND role NOT IN ('owner');

-- 4. Suppression des anciennes politiques de profiles
DROP POLICY IF EXISTS "admin profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins Manage All Profiles" ON public.profiles;

-- 5. Nouvelles politiques profiles
-- Owner : accès total inconditionnel
CREATE POLICY "owner full access profiles"
  ON public.profiles FOR ALL
  USING (public.is_owner())
  WITH CHECK (public.is_owner());

-- Super admin : peut tout faire SAUF supprimer super_admin ou owner
CREATE POLICY "super_admin manage profiles select"
  ON public.profiles FOR SELECT
  USING (public.is_super_admin());

CREATE POLICY "super_admin manage profiles insert"
  ON public.profiles FOR INSERT
  WITH CHECK (public.is_super_admin());

CREATE POLICY "super_admin manage profiles update"
  ON public.profiles FOR UPDATE
  USING (
    public.is_super_admin()
    AND role NOT IN ('super_admin', 'owner')
  );

CREATE POLICY "super_admin manage profiles delete"
  ON public.profiles FOR DELETE
  USING (
    public.is_super_admin()
    AND role NOT IN ('super_admin', 'owner')
  );

-- Admin simple : ne peut gérer que les students
CREATE POLICY "admin manage students update"
  ON public.profiles FOR UPDATE
  USING (
    public.is_admin()
    AND role = 'student'
  )
  WITH CHECK (
    public.is_admin()
    AND role = 'student'
  );

-- 6. Mettre à jour les politiques des autres tables
DROP POLICY IF EXISTS "admin write poles" ON public.formation_poles;
CREATE POLICY "admin write poles"
  ON public.formation_poles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin write formations" ON public.formations;
CREATE POLICY "admin write formations"
  ON public.formations FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin write actualites" ON public.actualites;
CREATE POLICY "admin write actualites"
  ON public.actualites FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin write testimonials" ON public.testimonials;
CREATE POLICY "admin write testimonials"
  ON public.testimonials FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin write preinscriptions" ON public.preinscriptions;
CREATE POLICY "admin write preinscriptions"
  ON public.preinscriptions FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "admin read contacts" ON public.contacts;
DROP POLICY IF EXISTS "admin write contacts" ON public.contacts;
CREATE POLICY "admin read contacts"
  ON public.contacts FOR SELECT
  USING (public.is_admin());

CREATE POLICY "admin write contacts"
  ON public.contacts FOR UPDATE
  USING (public.is_admin());

-- 7. Storage bucket pour les images d'articles
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anyone can view article images" ON storage.objects;
DROP POLICY IF EXISTS "admins can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "admins can delete article images" ON storage.objects;

CREATE POLICY "anyone can view article images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

CREATE POLICY "admins can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'article-images'
    AND public.is_admin()
  );

CREATE POLICY "admins can delete article images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'article-images'
    AND public.is_admin()
  );
