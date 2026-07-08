# DataVision Analytics

Site web professionnel pour une entreprise d'analyse de données destinée aux commerçants et PME.

## Aperçu

- Design premium inspiré de Stripe, Linear, Vercel et Notion
- Mode sombre par défaut avec bascule clair/sombre
- 7 pages : Accueil, Services, Pourquoi nous, Réalisations, Tarifs, FAQ, Contact
- Tableau de bord de démonstration interactif
- Formulaire de contact avec validation côté client
- Compatible GitHub Pages (site statique HTML/CSS/JS)

## Structure

```
├── assets/          # Ressources statiques
├── components/      # Documentation des composants partagés
├── css/             # Styles (variables, base, composants, pages, animations)
├── js/              # Scripts modulaires
├── images/          # Favicon et images
├── index.html       # Page d'accueil
├── services.html
├── pourquoi-nous.html
├── realisations.html
├── tarifs.html
├── faq.html
├── contact.html
├── robots.txt
└── sitemap.xml
```

## Personnalisation

### Nom de l'entreprise et coordonnées

Modifiez `js/config.js` :

```javascript
const SITE_CONFIG = {
  companyName: 'DataVision Analytics',
  email: 'contact@datavision-analytics.fr',
  phone: '+33 1 23 45 67 89',
  // ...
};
```

### Formulaire de contact (Formspree)

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Remplacez `formspreeEndpoint` dans `js/config.js` par votre URL Formspree

### Déploiement GitHub Pages

Le site est **100 % statique** (HTML/CSS/JS) et prêt pour GitHub Pages.

#### Option 1 — Déploiement automatique (recommandé)

1. Fusionnez le code sur la branche `main`
2. Allez dans **Settings → Pages**
3. Sous **Build and deployment**, choisissez **Source : GitHub Actions**
4. Le workflow `.github/workflows/deploy.yml` déploie automatiquement à chaque push sur `main`

**URL du site :** https://mrben509.github.io/Data-Analytics-/

#### Option 2 — Déploiement manuel

1. Allez dans **Settings → Pages**
2. Source : branche `main`, dossier `/ (root)`
3. Cliquez sur **Save**

#### Fichiers inclus pour GitHub Pages

- `.nojekyll` — désactive le traitement Jekyll (nécessaire pour les dossiers `_components`, etc.)
- Chemins relatifs partout (`css/`, `js/`, `images/`) — compatibles avec les URLs de type `username.github.io/repo/`
- Aucune dépendance de build ni serveur Node requis

#### Après le déploiement

1. Vérifiez l'URL dans `js/config.js` si le nom du dépôt change
2. Configurez Formspree dans `js/config.js` pour activer l'envoi du formulaire

## Développement local

Ouvrez `index.html` dans un navigateur ou utilisez un serveur local :

```bash
npx serve .
```

## Technologies

- HTML5 sémantique
- CSS3 (variables custom, Grid, Flexbox)
- JavaScript vanilla (ES6+)
- Aucune dépendance externe
