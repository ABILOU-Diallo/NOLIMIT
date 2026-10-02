# Guide d'intégration des Formations à la Carte

Ce guide explique comment intégrer le système de formations à la carte dans l'application ISSMIGA.

## 📋 Sommaire

1. [Configuration de la base de données](#configuration-de-la-base-de-données)
2. [Intégration dans l'espace utilisateur](#intégration-dans-lespace-utilisateur)
3. [Intégration dans l'espace admin](#intégration-dans-lespace-admin)
4. [Vérification](#vérification)

## 🔧 Configuration de la base de données

### Étape 1 : Exécuter les migrations

Exécutez les scripts SQL dans l'ordre suivant via le **SQL Editor Supabase** :

1. `supabase/migrations/create_custom_formations_table.sql`
2. `supabase/migrations/seed_custom_formations.sql`

Ou via le CLI Supabase :
```bash
supabase db push
```

### Étape 2 : Vérifier la création de la table

```sql
-- Vérifier que la table existe
SELECT * FROM custom_formations LIMIT 5;

-- Vérifier le nombre de formations
SELECT COUNT(*) FROM custom_formations;
-- Devrait afficher 42
```

## 👤 Intégration dans l'espace utilisateur

### Étape 1 : Ajouter le composant dans une page utilisateur

Ajoutez le composant `CustomFormationsSection` dans la page où vous souhaitez afficher les formations à la carte (par exemple, la page d'accueil ou une page dédiée).

```jsx
// Dans src/pages/HomePage.jsx ou src/pages/FormationsPage.jsx
import CustomFormationsSection from '../components/sections/CustomFormationsSection';

function HomePage() {
  return (
    <div>
      {/* Autres sections existantes */}
      
      {/* Section Formations à la Carte */}
      <CustomFormationsSection />
      
      {/* Autres sections existantes */}
    </div>
  );
}

export default HomePage;
```

### Étape 2 : Optionnel - Créer une page dédiée

Si vous préférez une page dédiée :

1. Créez le fichier `src/pages/CustomFormationsPage.jsx` :

```jsx
import React from 'react';
import CustomFormationsSection from '../components/sections/CustomFormationsSection';
import './CustomFormationsPage.css';

function CustomFormationsPage() {
  return (
    <div className="custom-formations-page">
      <CustomFormationsSection />
    </div>
  );
}

export default CustomFormationsPage;
```

2. Créez le fichier `src/pages/CustomFormationsPage.css` :

```css
.custom-formations-page {
  min-height: 100vh;
  background: #f5f5f5;
}
```

3. Ajoutez la route dans votre fichier de routage (ex: `src/App.jsx` ou `src/router.jsx`) :

```jsx
import CustomFormationsPage from './pages/CustomFormationsPage';

// Dans votre configuration de routes
<Route path="/formations-a-la-carte" element={<CustomFormationsPage />} />
```

### Étape 3 : Ajouter un lien dans la navigation

Ajoutez un lien vers cette section dans votre navigation :

```jsx
// Dans src/components/Navbar.jsx ou src/components/Header.jsx
<a href="/formations-a-la-carte" className="nav-link">
  Formations à la carte
</a>
```

## 👨‍💼 Intégration dans l'espace admin

### Étape 1 : Ajouter la route admin

Ajoutez la route vers la page admin dans votre fichier de routage :

```jsx
// Dans src/App.jsx ou src/router.jsx
import AdminCustomFormationsPage from './pages/admin/AdminCustomFormationsPage';

// Dans votre configuration de routes admin
<Route path="/admin/custom-formations" element={<AdminCustomFormationsPage />} />
```

### Étape 2 : Ajouter un lien dans le menu admin

Ajoutez un lien vers cette page dans votre menu de navigation admin :

```jsx
// Dans src/components/AdminSidebar.jsx ou src/components/AdminNavbar.jsx
<a href="/admin/custom-formations" className="admin-nav-link">
  Formations à la carte
</a>
```

### Étape 3 : Vérifier les permissions

Assurez-vous que les politiques RLS (Row Level Security) sont correctement configurées. Les admins doivent avoir le rôle `admin` dans la table `profiles`.

## ✅ Vérification

### Vérifier l'affichage utilisateur

1. Naviguez vers la page où vous avez intégré le composant
2. Vous devriez voir :
   - Le titre "Formations professionnelles à la carte"
   - Un filtre par catégorie
   - Les formations groupées par catégorie
   - Chaque formation affichée avec ses durées (3, 6, 9 mois)
   - Un modal avec les détails quand vous cliquez sur une formation

### Vérifier l'interface admin

1. Connectez-vous avec un compte admin
2. Naviguez vers `/admin/custom-formations`
3. Vous devriez voir :
   - Le titre "Gestion des formations à la carte"
   - Le bouton "+ Nouvelle formation"
   - Les formations groupées par catégorie
   - Des boutons pour modifier/supprimer chaque formation
   - Un badge de statut (Publié/Brouillon) cliquable

### Tester les fonctionnalités

**Espace utilisateur :**
- ✅ Filtrer par catégorie
- ✅ Cliquer sur une formation pour voir les détails
- ✅ Voir les descriptions pour 3, 6 et 9 mois
- ✅ Voir la faisabilité
- ✅ Fermer le modal

**Espace admin :**
- ✅ Créer une nouvelle formation
- ✅ Modifier une formation existante
- ✅ Supprimer une formation
- ✅ Publier/dépublier une formation
- ✅ Voir les formations groupées par catégorie

## 🎨 Personnalisation

### Modifier les couleurs

Les couleurs sont définies dans les fichiers CSS :

- `CustomFormationsSection.css` : Dégradé violet par défaut (`#667eea` à `#764ba2`)
- `AdminCustomFormationsPage.css` : Couleurs admin standards

Pour changer les couleurs, modifiez les valeurs CSS correspondantes.

### Modifier le texte

Le texte peut être modifié directement dans les fichiers JSX :
- `CustomFormationsSection.jsx` pour l'affichage utilisateur
- `AdminCustomFormationsPage.jsx` pour l'interface admin

## 📊 Données

Les formations sont stockées dans la table `custom_formations` avec les champs suivants :

- `id` : UUID (auto-généré)
- `slug` : Identifiant unique pour l'URL
- `title` : Titre de la formation
- `category` : Catégorie (enum)
- `description_3mois` : Description pour 3 mois
- `description_6mois` : Description pour 6 mois
- `description_9mois` : Description pour 9 mois
- `faisabilite` : Conditions de faisabilité
- `is_published` : Statut de publication
- `sort_order` : Ordre d'affichage
- `created_at` : Date de création
- `updated_at` : Date de mise à jour

## 🔒 Sécurité

Les politiques RLS garantissent que :
- Les utilisateurs peuvent voir uniquement les formations publiées
- Les admins peuvent voir et modifier toutes les formations
- Seuls les admins peuvent créer, modifier ou supprimer des formations

## 🐛 Dépannage

### Les formations ne s'affichent pas

1. Vérifiez que les migrations ont été exécutées
2. Vérifiez que les formations sont publiées (`is_published = true`)
3. Vérifiez la console du navigateur pour les erreurs

### Erreur de permission admin

1. Vérifiez que l'utilisateur a le rôle `admin` dans la table `profiles`
2. Vérifiez que les politiques RLS sont correctement configurées

### Le modal ne s'ouvre pas

1. Vérifiez que le composant est correctement importé
2. Vérifiez qu'il n'y a pas de conflit avec d'autres modals
3. Vérifiez la console pour les erreurs JavaScript

## 📞 Support

Pour toute question ou problème, contactez l'équipe technique.
