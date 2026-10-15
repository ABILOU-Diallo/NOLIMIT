-- Création de la table pour les demandes d'entretien d'orientation
CREATE TABLE IF NOT EXISTS public.orientation_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    formation_title TEXT,
    formation_slug TEXT,
    preferred_duration TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending', -- pending, scheduled, completed, cancelled
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Désactivation RLS pour le développement (à activer en prod avec les bonnes policies)
ALTER TABLE public.orientation_requests DISABLE ROW LEVEL SECURITY;

-- Index pour la performance
CREATE INDEX IF NOT EXISTS idx_orientation_requests_status ON public.orientation_requests(status);
CREATE INDEX IF NOT EXISTS idx_orientation_requests_created_at ON public.orientation_requests(created_at);
