-- ==============================================================================
-- SCHÉMA BASE DE DONNÉES SUPABASE — GROUPE NO LIMIT & ISSMIGA
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE DES PROFILS UTILISATEURS (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABLE DES PRÉINSCRIPTIONS (PREINSCRIPTIONS)
CREATE TABLE IF NOT EXISTS public.preinscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT DEFAULT 'Yaoundé',
  birth_date DATE,
  guardian_name TEXT,
  guardian_phone TEXT,
  institution TEXT DEFAULT 'issmiga' CHECK (institution IN ('cfp', 'issmiga')),
  formation_id TEXT,
  diploma_interest TEXT,
  message TEXT,
  consent BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'validated', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLE DES ACTUALITÉS (ACTUALITES)
CREATE TABLE IF NOT EXISTS public.actualites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Vie du campus',
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT DEFAULT 'Administration Groupe NO LIMIT',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES

-- Activer RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preinscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actualites ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin' AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public Profiles Read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users Update Own Profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins Manage All Profiles" ON public.profiles FOR ALL USING (public.is_admin(auth.uid()));

-- Preinscriptions Policies
CREATE POLICY "Anyone Can Insert Preinscription" ON public.preinscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users Read Own Preinscriptions" ON public.preinscriptions FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
CREATE POLICY "Admins Manage All Preinscriptions" ON public.preinscriptions FOR ALL USING (public.is_admin(auth.uid()));

-- Actualites Policies
CREATE POLICY "Public Read Published News" ON public.actualites FOR SELECT USING (status = 'published' OR public.is_admin(auth.uid()));
CREATE POLICY "Admins Manage All News" ON public.actualites FOR ALL USING (public.is_admin(auth.uid()));

-- 6. PUBLICATION REALTIME POUR SUPABASE
ALTER PUBLICATION supabase_realtime ADD TABLE public.actualites;
ALTER PUBLICATION supabase_realtime ADD TABLE public.preinscriptions;

-- 7. TRIGGER DE CRÉATION AUTOMATIQUE DE PROFIL À L'INSCRIPTION AUTH
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
