# Groupe NO LIMIT (ISSMIGA & CFP)

Site vitrine et plateforme de gestion pour le Groupe NO LIMIT — **Orientation · Formation · Employabilité**.
Situé à Yaoundé, derrière Tradex Emana.

## 🚀 Fonctionnalités Clés

- **Catalogue de Formations Dynamique** : 
  - Gestion des cycles Diplômants (BTS, Licence, Master) pour **ISSMIGA**.
  - Formations professionnelles (CQP, DQP) pour le **CFP NO LIMIT**.
  - Catalogue "À la carte" pour les certifications internationales et langues.
- **Gestion des Utilisateurs & CRM Intégré** : 
  - **Suivi des Candidatures** : Visualisation directe des vœux de formation depuis la liste des utilisateurs.
  - **Dossier Candidat Complet** : Accès aux documents, motivations et informations de contact en un clic.
  - **Exportation Intelligente** : Génération de fichiers **CSV/Excel** filtrés pour le suivi commercial.
  - **Actions de Contact Rapide** : Intégration `tel:` et `mailto:` pour appeler ou écrire aux candidats instantanément.
  - **Confidentialité Administrative** : Masquage technique des comptes super-administrateurs de maintenance.
- **Parcours d'Inscription Optimisé** :
  - **Wizard Multi-étapes** : Formulaire guidé avec téléchargement de photo et checklist de documents.
  - **Validation WhatsApp** : Bouton de confirmation directe vers le secrétariat après soumission.
- **Gestion de Contenu (CMS)** :
  - Système d'actualités supportant images et vidéos (YouTube/Vimeo).
  - Gestion des témoignages et des pôles de formation.
- **Contrôle d'Accès (RBAC)** : Hiérarchie stricte (Owner, SuperAdmin, Admin, Student).

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
4. **Correction Relationnelle** : Exécuter `ALTER TABLE public.preinscriptions ADD CONSTRAINT preinscriptions_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);`
5. `backend/seed.sql` (Données initiales et actualités)

## 🌐 Déploiement

Le projet est optimisé pour Vercel. Lors du déploiement :
1. Définir les variables d'environnement `SUPABASE_URL` et `SUPABASE_ANON_KEY`.
2. Vérifier que la version de Node.js est définie sur **20.x**.

---
*Note : Le propriétaire principal configuré est `tantchou@yahoo.com`.*
