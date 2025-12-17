# 📁 Digital Minds - Pages

## 📋 Vue d'ensemble

Ce dossier contient les pages développées pour le module **Digital Minds** (système de gestion de matières et publications).

---

## 📂 Structure des Fichiers

```
digital_minds/
├── assets/                     # Images et ressources
│   └── vite.svg
├── matieres-clean.html         # ✅ Page liste des matières (VERSION PROPRE)
├── publications-recentes.html  # Page publications récentes
├── publications-populaires.html # Page publications populaires
├── mes-publications.html       # Page mes publications
└── README.md                   # Ce fichier
```

---

## 🎯 Pages Disponibles

### **1. matieres-clean.html** ✅ **RECOMMANDÉ**

**Description :** Page d'accueil affichant la liste des matières sous forme de cartes.

**Fonctionnalités :**
- Grille de cartes de matières (responsive)
- Bouton "Filtrer une matière"
- Bouton "Nouvelle publication"
- Toggle vue tableau/liste
- Pagination
- Bouton chat flottant

**Contenu métier uniquement :**
- ✅ Navbar et sidebar SUPPRIMÉES (à inclure par l'équipe UI_UX)
- ✅ Styles importés depuis `../../scss/main.scss`
- ✅ Prêt pour intégration dans UI_UX

---

### **2. publications-recentes.html**

**Description :** Page affichant les publications récentes.

**Fonctionnalités :**
- Liste des publications
- Filtres par matière, niveau, période
- Onglets : Récentes / Populaires / Mes publications
- Pagination

**⚠️ Note :** Contient encore navbar/sidebar (à nettoyer)

---

### **3. publications-populaires.html**

**Description :** Page affichant les publications les plus populaires.

**Fonctionnalités :**
- Tri par popularité
- Filtres avancés
- Onglets de navigation

**⚠️ Note :** Contient encore navbar/sidebar (à nettoyer)

---

### **4. mes-publications.html**

**Description :** Page affichant les publications de l'utilisateur connecté.

**Fonctionnalités :**
- Gestion des publications personnelles
- Édition/suppression
- Statistiques

**⚠️ Note :** Contient encore navbar/sidebar (à nettoyer)

---

## 🔧 Comment Utiliser Ces Pages dans UI_UX

### **Étape 1 : Inclure la Navbar et Sidebar**

Dans chaque fichier HTML, remplacez le commentaire :

```html
<!-- ========================================== -->
<!-- NAVBAR & SIDEBAR - COMPOSANTS PARTAGÉS UI_UX -->
<!-- À INCLURE ICI PAR L'ÉQUIPE                -->
<!-- ========================================== -->
```

Par le code de la navbar et sidebar de UI_UX (à définir par l'équipe).

---

### **Étape 2 : Vérifier les Chemins des Styles**

Assurez-vous que le lien vers les styles est correct :

```html
<link rel="stylesheet" href="../../scss/main.scss">
```

Si la structure change, ajustez le chemin relatif.

---

### **Étape 3 : Tester la Page**

1. Ouvrir le fichier HTML dans le navigateur
2. Vérifier que les styles s'appliquent correctement
3. Vérifier que la navbar et sidebar s'affichent
4. Tester la responsivité (mobile, tablette, desktop)

---

## 🎨 Styles Utilisés

Les styles spécifiques à Digital Minds sont dans :
```
UI_UX/src/scss/pages/_digital_minds.scss
```

Les composants partagés (navbar, sidebar, etc.) sont dans :
```
UI_UX/src/scss/components/
├── _navbar.scss
├── _sidebar.scss
├── _filter.scss
├── _publish.scss
├── _publications-static.scss
└── _publications.scss
```

---

## 📝 Variables SCSS Utilisées

```scss
$teal-brand: #1AACAC;      // Couleur principale (teal)
$yellow-btn: #E0A83F;      // Couleur boutons (jaune)
$gray-bg: #F7FAFC;         // Fond de page (gris clair)
$card-radius: 16px;        // Rayon des cartes
$sidebar-width: 80px;      // Largeur de la sidebar
```

---

## ✅ Checklist d'Intégration

Avant de considérer une page comme "intégrée" dans UI_UX :

- [ ] Navbar et sidebar UI_UX incluses
- [ ] Ancien code navbar/sidebar supprimé
- [ ] Styles importés depuis `main.scss`
- [ ] Chemins relatifs corrects
- [ ] Page testée dans le navigateur
- [ ] Responsive vérifié (mobile, tablette, desktop)
- [ ] Aucun JavaScript (projet static-only)
- [ ] Code propre et bien indenté

---

## 🚀 Prochaines Étapes

1. **Nettoyer les autres pages** (publications-recentes.html, etc.)
2. **Définir la navbar/sidebar UI_UX** avec l'équipe
3. **Intégrer les composants partagés** dans toutes les pages
4. **Tester l'ensemble** du module Digital Minds
5. **Documenter** les interactions et workflows

---

## 👥 Responsable

**Module :** Digital Minds  
**Développeur :** [Votre nom]  
**Date de création :** 17 décembre 2025  
**Dernière mise à jour :** 17 décembre 2025

---

## 📞 Contact

Pour toute question sur ce module, contactez le responsable Digital Minds.

