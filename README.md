# Groupe NO LIMIT (ISSMIGA & CFP)

Site vitrine et plateforme de gestion pour le Groupe NO LIMIT — **Orientation · Formation · Employabilité**.
Situé à Yaoundé, derrière Tradex Emana.

## 🚀 Fonctionnalités Clés

- **Catalogue de Formations** : Gestion des cycles Diplômants (BTS, DQP) et des Certifications internationales (Formations à la carte).
- **Actualités Multi-médias** : Système de publication supportant images et vidéos avec affichage intelligent (grille type réseau social "Facebook style").
- **Gestion RBAC (Contrôle d'accès)** :
  - **Owner / SuperAdmin** : Gestion totale, création d'administrateurs, configuration système.
  - **Admin** : Gestion des actualités, des formations et des étudiants.
  - **Student** : Espace personnel et suivi des préinscriptions.
- **Tableau de Bord** : Statistiques de visites et suivi des conversions en temps réel via fonctions RPC Supabase.

## 🛠 Stack Technique

- **Frontend** : React 19, Vite, JavaScript, React Router 6.
- **Backend & DB** : Supabase (PostgreSQL, Auth, Storage, RLS).
- **Déploiement** : Vercel (Configuré pour Node 20.x).

## 📦 Démarrage Rapide

1. **Installation** :
   ```bash
   npm install
   ```

2. **Configuration** :
   Copiez `.env.example` en `.env` et renseignez vos clés Supabase.
   ```bash
   SUPABASE_URL=https://votre_projet.supabase.co
   SUPABASE_ANON_KEY=votre_cle_anon
   ```

3. **Lancement** :
   ```bash
   npm run dev
   ```

## 🗄️ Base de données (Supabase)

Pour initialiser la base de données, exécutez les scripts dans l'ordre suivant dans le SQL Editor de Supabase :
1. `supabase/migrations/20260917_init.sql` (Schéma de base)
2. `supabase/migrations/20260924011101_roles_hierarchy.sql` (Types de rôles)
3. `supabase/migrations/20261015_add_video_and_levels.sql` (Supports médias et filières)
4. `backend/seed.sql` (Données de démonstration)

## 🌐 Déploiement

Le projet est optimisé pour Vercel. Lors du déploiement :
1. Définir les variables d'environnement `SUPABASE_URL` et `SUPABASE_ANON_KEY`.
2. Vérifier que la version de Node.js est définie sur **20.x**.

---
*Note : Le propriétaire actuel configuré est `tantchou@yahoo.com`.*
