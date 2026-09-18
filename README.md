# Groupe NO LIMIT

Site vitrine du Groupe NO LIMIT — **Orientation · Formation · Employabilité**.

Yaoundé, derrière Tradex Emana. Rentrée : 15 octobre 2026.

## Stack

- React 19, Vite, JavaScript
- React Router, React Hook Form, React Helmet Async
- CSS Modules + design tokens
- Supabase (Auth, PostgreSQL, RLS)

## Démarrage

```bash
npm install
cp .env.example .env
npm run dev
```

Sans clés Supabase, le catalogue s’affiche depuis `src/data/`. Les formulaires indiquent alors clairement qu’ils ne sont pas encore connectés.

## Supabase

1. Créer un projet.
2. Renseigner `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
3. Exécuter `supabase/migrations/20260917_init.sql` puis `supabase/seed.sql`.
4. Ne jamais exposer la service role key dans le frontend.

Les rôles `visitor` / `student` / `admin` sont prévus. L’espace admin n’est pas exposé sur le site public.

## Contenus manquants

Les photos, le mot du promoteur, les compétences par filière, les témoignages et les textes légaux complets sont marqués `TODO` dans le code. Rien n’est inventé.
