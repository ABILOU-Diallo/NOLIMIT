-- =======================================================================
-- MIGRATION : actualites v2 — ajout colonnes gallery, video_url, body
-- À exécuter dans Supabase > SQL Editor
-- =======================================================================

-- 1. Renommer content → body (si la colonne s'appelle encore "content")
--    Ignorer si la colonne body existe déjà.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'actualites'
      AND column_name  = 'content'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'actualites'
      AND column_name  = 'body'
  ) THEN
    ALTER TABLE public.actualites RENAME COLUMN content TO body;
  END IF;
END;
$$;

-- 2. Renommer image_url → cover_path (si nécessaire)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'actualites'
      AND column_name  = 'image_url'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'actualites'
      AND column_name  = 'cover_path'
  ) THEN
    ALTER TABLE public.actualites RENAME COLUMN image_url TO cover_path;
  END IF;
END;
$$;

-- 3. Ajouter video_url si absente
ALTER TABLE public.actualites
  ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT NULL;

-- 4. Ajouter gallery (JSONB) si absente
--    Format attendu : [{"url": "...", "type": "image|video"}, ...]
ALTER TABLE public.actualites
  ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT NULL;

-- 5. Vérification finale : liste des colonnes de la table
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'actualites'
ORDER BY ordinal_position;
