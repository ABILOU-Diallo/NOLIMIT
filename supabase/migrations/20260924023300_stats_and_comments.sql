-- ============================================================
-- Migration: Statistiques de visites & Commentaires
-- ============================================================

-- 1. Table des visites de pages
CREATE TABLE IF NOT EXISTS public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  session_id text,
  referrer text,
  user_agent text,
  visited_at timestamptz NOT NULL DEFAULT now()
);

-- Index pour les requêtes temporelles
CREATE INDEX IF NOT EXISTS page_views_visited_at_idx ON public.page_views (visited_at DESC);
CREATE INDEX IF NOT EXISTS page_views_path_idx ON public.page_views (path);

-- RLS : anonymes peuvent insérer, admins peuvent lire
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon insert page_views"
  ON public.page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "admin read page_views"
  ON public.page_views FOR SELECT
  USING (public.is_admin());

-- 2. Table des commentaires sur les actualités
CREATE TABLE IF NOT EXISTS public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.actualites(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text,
  content text NOT NULL,
  is_blocked boolean NOT NULL DEFAULT false,
  blocked_reason text,
  blocked_by uuid REFERENCES auth.users(id),
  blocked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS comments_article_id_idx ON public.comments (article_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON public.comments (created_at DESC);

-- RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les commentaires non-bloqués
CREATE POLICY "public read approved comments"
  ON public.comments FOR SELECT
  USING (is_blocked = false OR public.is_admin());

-- N'importe qui peut poster un commentaire
CREATE POLICY "anon insert comments"
  ON public.comments FOR INSERT
  WITH CHECK (true);

-- Les admins peuvent mettre à jour (bloquer/débloquer)
CREATE POLICY "admin manage comments"
  ON public.comments FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 3. Table des statistiques agrégées par jour (cache)
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

ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin read daily_stats"
  ON public.daily_stats FOR SELECT
  USING (public.is_admin());

CREATE POLICY "admin manage daily_stats"
  ON public.daily_stats FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. Fonction pour obtenir les stats des 30 derniers jours
CREATE OR REPLACE FUNCTION public.get_stats_last_30_days()
RETURNS TABLE (
  stat_date date,
  views bigint,
  sessions bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    DATE(visited_at) AS stat_date,
    COUNT(*) AS views,
    COUNT(DISTINCT session_id) AS sessions
  FROM public.page_views
  WHERE visited_at >= NOW() - INTERVAL '30 days'
  GROUP BY DATE(visited_at)
  ORDER BY stat_date ASC;
$$;
