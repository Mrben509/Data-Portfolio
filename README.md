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
  email: 'delarobia509@gmail.com',
  phone: '+1 849 515 1149',
  // ...
};
```

### Formulaire de contact (FormSubmit)

Les messages sont envoyés automatiquement à l'email défini dans `js/config.js` (`SITE_CONFIG.email`) via [FormSubmit](https://formsubmit.co).

1. Déployez le site (GitHub Pages)
2. Remplissez le formulaire une première fois
3. Ouvrez l'email d'activation reçu dans votre boîte mail et confirmez le lien
4. Les prochains envois arriveront directement dans votre inbox

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
2. Confirmez l'email d'activation FormSubmit (voir section formulaire ci-dessus)

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

## Fichiers privés et publication

`.gitignore` exclut les consignes AGENTS.md, la revue locale REVUE-PORTFOLIO.md,
les réglages IDE, secrets locaux, dépendances, caches et journaux. Un fichier
déjà suivi par Git reste suivi même s'il correspond à une règle d'exclusion.

Le workflow publie uniquement les pages HTML, `css/`, `js/`, `images/`,
`robots.txt`, `sitemap.xml` et `.nojekyll`, copiés dans `_site/`.
La documentation reste versionnée mais n'est pas incluse dans le site déployé.
Utiliser GitHub Actions comme source Pages pour bénéficier de cette sélection.

Les coordonnées publiques et l'identifiant de destination FormSubmit sont
visibles dans le JavaScript par conception ; ce ne sont pas des secrets API.
La validation et le champ anti-spam côté navigateur ne remplacent pas les
protections du prestataire. Le site ne force plus la désactivation du CAPTCHA.
La réception effective des messages nécessite une vérification séparée.
