-- Mise à jour de la table preinscriptions pour inclure la photo et la checklist des documents
ALTER TABLE public.preinscriptions ADD COLUMN IF NOT EXISTS photo_url text;
ALTER TABLE public.preinscriptions ADD COLUMN IF NOT EXISTS documents_checklist jsonb DEFAULT '[]';

-- Création d'un bucket pour les photos de profil si nécessaire (à faire via l'UI Supabase ou via SQL si l'extension storage est activée)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('preinscriptions', 'preinscriptions', true) ON CONFLICT (id) DO NOTHING;
