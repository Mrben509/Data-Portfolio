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

1. Poussez le code sur GitHub
2. Allez dans **Settings → Pages**
3. Source : branche `main`, dossier `/ (root)`
4. Mettez à jour les URLs dans `sitemap.xml`, `robots.txt` et les balises `canonical`/`og:url`

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
