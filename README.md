# 🎓 UI_UX - Projet d'Équipe Digital Minds

## 📋 Vue d'ensemble

Ce projet regroupe le travail de toute l'équipe **Digital Minds**. Chaque membre a son propre espace dédié dans `src/pages/`.

---

## 📂 Structure du Projet

```
UI_UX/
├── index.html                      # Page d'accueil du projet
├── styles.css                      # Styles compilés (généré)
├── src/
│   ├── pages/                      # Pages de chaque membre
│   │   └── digital_minds/          # Module Digital Minds
│   │       ├── matieres-clean.html # ✅ Page matières (VERSION PROPRE)
│   │       ├── publications-*.html # Pages publications
│   │       ├── assets/             # Images et ressources
│   │       └── README.md           # Documentation du module
│   │
│   └── scss/                       # Styles SCSS
│       ├── main.scss               # Fichier principal
│       ├── components/             # Composants partagés
│       │   ├── _navbar.scss
│       │   ├── _sidebar.scss
│       │   ├── _filter.scss
│       │   ├── _publish.scss
│       │   ├── _publications-static.scss
│       │   └── _publications.scss
│       │
│       └── pages/                  # Styles spécifiques aux pages
│           └── _digital_minds.scss
│
└── README.md                       # Ce fichier
```

---

## 🚀 Démarrage Rapide

### **1. Ouvrir le projet**

```bash
cd UI_UX
```

### **2. Voir la page d'accueil**

Ouvrir `index.html` dans votre navigateur.

### **3. Accéder au module Digital Minds**

Cliquer sur "Voir le module" ou ouvrir directement :
```
src/pages/digital_minds/matieres-clean.html
```

---

## 📚 Modules Disponibles

### **1. Digital Minds** ✅

**Responsable :** [Votre nom]  
**Dossier :** `src/pages/digital_minds/`

**Pages :**
- `matieres-clean.html` - Liste des matières (VERSION PROPRE)
- `publications-recentes.html` - Publications récentes
- `publications-populaires.html` - Publications populaires
- `mes-publications.html` - Mes publications

**Styles :**
- `src/scss/pages/_digital_minds.scss`
- `src/scss/components/` (composants partagés)

**Documentation :**
- `src/pages/digital_minds/README.md`

---

### **2. Module 2** 🔜

**Responsable :** À définir  
**Dossier :** `src/pages/module2/` (à créer)

---

### **3. Module 3** 🔜

**Responsable :** À définir  
**Dossier :** `src/pages/module3/` (à créer)

---

## 🎨 Styles et Composants

### **Variables SCSS Globales**

Définies dans `src/scss/main.scss` :

```scss
$teal-brand: #1AACAC;      // Couleur principale
$yellow-btn: #E0A83F;      // Couleur boutons
$gray-bg: #F7FAFC;         // Fond de page
$card-radius: 16px;        // Rayon des cartes
$sidebar-width: 80px;      // Largeur sidebar
```

### **Composants Partagés**

| Composant | Fichier SCSS | Description |
|-----------|--------------|-------------|
| Navbar | `_navbar.scss` | Barre de navigation supérieure |
| Sidebar | `_sidebar.scss` | Barre latérale de navigation |
| Filter | `_filter.scss` | Modal de filtrage |
| Publish | `_publish.scss` | Modal de publication |
| Publications | `_publications.scss` | Styles des publications |

---

## 👥 Équipe

- **Ayoub Belhameid**
- **Cyrine Ben Hlila**
- **Farah Hammami**
- **Fedi Mbarek**

---

## 📝 Conventions de Nommage

### **Fichiers HTML**

- Utiliser des noms descriptifs en minuscules
- Séparer les mots par des tirets : `ma-page.html`
- Suffixe `-clean` pour les versions nettoyées : `matieres-clean.html`

### **Fichiers SCSS**

- Préfixer les partials par `_` : `_navbar.scss`
- Utiliser des noms descriptifs : `_digital_minds.scss`
- Organiser par type : `components/`, `pages/`

### **Classes CSS**

- Utiliser BEM (Block Element Modifier) : `.block__element--modifier`
- Préfixer les classes spécifiques : `.digital-minds-card`
- Éviter les classes génériques : `.card`, `.button`

---

## ✅ Checklist pour Ajouter un Nouveau Module

- [ ] Créer le dossier `src/pages/mon_module/`
- [ ] Créer le fichier `README.md` dans le module
- [ ] Créer les pages HTML (sans navbar/sidebar)
- [ ] Créer le fichier SCSS `src/scss/pages/_mon_module.scss`
- [ ] Importer le fichier SCSS dans `src/scss/main.scss`
- [ ] Ajouter le module dans `index.html`
- [ ] Tester toutes les pages
- [ ] Documenter le module

---

## 🔧 Technologies Utilisées

- **HTML5** - Structure des pages
- **CSS3** - Styles de base
- **SCSS/SASS** - Préprocesseur CSS
- **TailwindCSS** - Framework CSS utilitaire (optionnel)
- **Font Awesome** - Icônes
- **Google Fonts** - Police Poppins

**⚠️ AUCUN JavaScript** - Projet static-only

---

## 📞 Support

Pour toute question ou problème :
1. Consulter la documentation du module (`README.md`)
2. Contacter le responsable du module
3. Créer une issue sur le dépôt Git

---

**Dernière mise à jour :** 17 décembre 2025  
**Version :** 1.0

