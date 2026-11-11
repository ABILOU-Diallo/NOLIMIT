-- Indexes used by the current public and admin list queries.
CREATE TABLE IF NOT EXISTS public.orientation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text,
  formation_title text,
  formation_slug text,
  preferred_duration text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.daily_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_date date NOT NULL UNIQUE,
  page_views_count integer NOT NULL DEFAULT 0,
  unique_sessions integer NOT NULL DEFAULT 0,
  new_users integer NOT NULL DEFAULT 0,
  new_preinscriptions integer NOT NULL DEFAULT 0,
  new_contacts integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
UPDATE public.profiles AS profile
SET email = auth_user.email
FROM auth.users AS auth_user
WHERE profile.id = auth_user.id AND profile.email IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_email
  ON public.profiles (email)
  WHERE email IS NOT NULL;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = (SELECT auth.uid())
      AND role IN ('admin', 'super_admin', 'owner')
      AND is_active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.sync_profile_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles SET email = NEW.email WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_profile_email ON auth.users;
CREATE TRIGGER sync_profile_email
  AFTER INSERT OR UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_profile_email();

ALTER TABLE public.actualites
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_formations_published_sort
  ON public.formations (is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_formation_poles_published_sort
  ON public.formation_poles (is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_actualites_published_created
  ON public.actualites (created_at DESC)
  WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_actualites_created
  ON public.actualites (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved_sort
  ON public.testimonials (sort_order)
  WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_sort
  ON public.testimonials (sort_order);
CREATE INDEX IF NOT EXISTS idx_custom_formations_published_sort
  ON public.custom_formations (is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_preinscriptions_created
  ON public.preinscriptions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_preinscriptions_formation
  ON public.preinscriptions (formation_id);
CREATE INDEX IF NOT EXISTS idx_preinscriptions_user
  ON public.preinscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_preinscriptions_pending
  ON public.preinscriptions (status)
  WHERE status = 'new';
CREATE INDEX IF NOT EXISTS idx_contacts_created
  ON public.contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_pending
  ON public.contacts (status)
  WHERE status = 'new';
CREATE INDEX IF NOT EXISTS idx_orientation_requests_created
  ON public.orientation_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_created
  ON public.profiles (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_public_article_created
  ON public.comments (article_id, created_at DESC)
  WHERE is_blocked = false;

-- A previous development migration disabled these policies. Restore RLS for
-- every public table; the existing role-specific policies remain in force.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_poles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actualites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preinscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_formations ENABLE ROW LEVEL SECURITY;

-- Orientation requests contain personal data and must not be publicly readable.
ALTER TABLE public.orientation_requests ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON TABLE public.orientation_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.orientation_requests TO authenticated;

ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin read daily_stats" ON public.daily_stats;
DROP POLICY IF EXISTS "admin manage daily_stats" ON public.daily_stats;
CREATE POLICY "admin read daily_stats"
  ON public.daily_stats FOR SELECT
  USING (public.is_admin());
CREATE POLICY "admin manage daily_stats"
  ON public.daily_stats FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public insert orientation requests" ON public.orientation_requests;
DROP POLICY IF EXISTS "admin read orientation requests" ON public.orientation_requests;
DROP POLICY IF EXISTS "admin update orientation requests" ON public.orientation_requests;
DROP POLICY IF EXISTS "admin delete orientation requests" ON public.orientation_requests;

CREATE POLICY "public insert orientation requests"
  ON public.orientation_requests FOR INSERT
  WITH CHECK (status = 'pending');

CREATE POLICY "admin read orientation requests"
  ON public.orientation_requests FOR SELECT
  USING (public.is_admin());

CREATE POLICY "admin update orientation requests"
  ON public.orientation_requests FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin delete orientation requests"
  ON public.orientation_requests FOR DELETE
  USING (public.is_admin());

-- Keep public article media readable and allow only administrators to upload.
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "anyone can view article images" ON storage.objects;
DROP POLICY IF EXISTS "admins can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "admins can delete article images" ON storage.objects;

CREATE POLICY "anyone can view article images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

CREATE POLICY "admins can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'article-images' AND public.is_admin());

CREATE POLICY "admins can delete article images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'article-images' AND public.is_admin());

CREATE OR REPLACE FUNCTION public.get_admin_dashboard_counts()
RETURNS TABLE (
  users bigint,
  preinscriptions bigint,
  pending_preinscriptions bigint,
  articles bigint,
  published_articles bigint,
  contacts bigint,
  pending_contacts bigint
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Accès réservé à l’administration.';
  END IF;

  RETURN QUERY
  SELECT
    (SELECT count(*) FROM public.profiles),
    (SELECT count(*) FROM public.preinscriptions),
    (SELECT count(*) FROM public.preinscriptions WHERE status = 'new'),
    (SELECT count(*) FROM public.actualites),
    (SELECT count(*) FROM public.actualites WHERE status = 'published'),
    (SELECT count(*) FROM public.contacts),
    (SELECT count(*) FROM public.contacts WHERE status = 'new');
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_counts() TO authenticated;
