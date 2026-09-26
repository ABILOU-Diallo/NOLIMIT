# Backend Supabase — Groupe NO LIMIT & ISSMIGA

Ce dossier contient la configuration de la base de données PostgreSQL hébergée sur Supabase pour la plateforme Groupe NO LIMIT / ISSMIGA.

---

## 1. Fichiers Inclus

- **`schema.sql`** : Script DDL complet (création des tables `profiles`, `preinscriptions`, `actualites`, politiques RLS, triggers et activation Supabase Realtime).
- **`seed.sql`** : Données initiales d'actualités et d'exemples.

---

## 2. Procédure d'Installation Supabase

1. Créez un projet sur [Supabase.com](https://supabase.com).
2. Rendez-vous dans le **SQL Editor** du tableau de bord Supabase.
3. Exécutez l'intégralité du contenu du fichier `backend/schema.sql`.
4. Exécutez ensuite le contenu du fichier `backend/seed.sql`.
5. Récupérez vos identifiants dans **Project Settings > API** :
   - `Project URL`
   - `anon / public key`

---

## 3. Configuration des Variables d'Environnement (Frontend)

Créez un fichier `.env` à la racine de votre projet frontend avec le contenu suivant :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_public_aici
```

---

## 4. Compte Administrateur par Défaut

Après avoir créé votre premier utilisateur via la page `/inscription` ou l'interface d'authentification Supabase, vous pouvez lui accorder le rôle d'administrateur en exécutant la commande SQL suivante :

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'votre_email@domaine.com';
```
