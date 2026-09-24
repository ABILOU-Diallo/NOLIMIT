-- ============================================================
-- Migration: Hiérarchie des rôles - PARTIE 1
-- Ajouter les valeurs enum uniquement (nécessite un commit séparé)
-- ============================================================

ALTER TYPE public.role_type ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.role_type ADD VALUE IF NOT EXISTS 'owner';
