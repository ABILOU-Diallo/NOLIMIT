-- ==============================================================================
-- TABLE DES FORMATIONS À LA CARTE
-- ==============================================================================

-- Type enum pour les catégories de formations à la carte
CREATE TYPE public.custom_formation_category AS ENUM (
  'beaute-esthetique-coiffure',
  'administration-commerce-gestion',
  'informatique-creation-numerique',
  'hotellerie-restauration-services',
  'autres-prestations-services'
);

-- Table des formations à la carte
CREATE TABLE IF NOT EXISTS public.custom_formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category public.custom_formation_category NOT NULL,
  description_3mois TEXT NOT NULL,
  description_6mois TEXT NOT NULL,
  description_9mois TEXT NOT NULL,
  faisabilite TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_custom_formations_category ON public.custom_formations(category);
CREATE INDEX IF NOT EXISTS idx_custom_formations_published ON public.custom_formations(is_published);
CREATE INDEX IF NOT EXISTS idx_custom_formations_sort ON public.custom_formations(sort_order);

-- RLS Policies
ALTER TABLE public.custom_formations ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique pour les formations publiées
CREATE POLICY "Public read published custom formations"
  ON public.custom_formations FOR SELECT
  USING (is_published = true OR public.is_admin());

-- Politique d'écriture pour les admins
CREATE POLICY "Admins manage custom formations"
  ON public.custom_formations FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION public.updated_at_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER custom_formations_updated_at
  BEFORE UPDATE ON public.custom_formations
  FOR EACH ROW
  EXECUTE FUNCTION public.updated_at_trigger();
