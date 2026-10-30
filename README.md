# Portfolio d’Emmanuel Raoul Théophile

Portfolio personnel en espagnol : Junior Data Scientist, Machine Learning,
IA appliquée, automatisation Python et documentation technique.

Les contenus s’appuient sur les deux CV fournis par le propriétaire. Les projets
sont présentés comme des travaux indépendants ; aucune référence client,
performance chiffrée, certification ou disponibilité immédiate n’est supposée.

## Structure et développement

Les neuf pages HTML contiennent leur navigation et leurs coordonnées directement,
pour fonctionner sans JavaScript. `css/main.css` contient les styles responsive,
`images/favicon.svg` l’icône personnelle. Aucune dépendance ni compilation.

Pour prévisualiser : `python3 -m http.server 8000`, puis ouvrir
`http://localhost:8000/`. Les chemins relatifs permettent un hébergement dans
un sous-répertoire GitHub Pages.

- `index.html` : présentation, compétences et aperçu des projets.
- `realisations.html` : contexte, contribution personnelle et livrables.
- `services.html` : compétences et pistes de collaboration.
- `pourquoi-nous.html` : parcours, formation et langues.
- `tarifs.html` : modalités de collaboration, sans tarifs non confirmés.
- `faq.html`, `contact.html` et les deux pages d’information complètent le parcours.

Les URL historiques des fichiers sont conservées pour les liens existants.
Les coordonnées apparaissent dans les pages : toute mise à jour doit les modifier
partout. Contact principal : `raoulemmanuelt@gmail.com`.

## Contact et confidentialité

Le contact est direct : email, WhatsApp Business et LinkedIn. Aucun formulaire,
service FormSubmit, traceur, script tiers, police distante ou stockage local.
Un clic email dépend de l’application de messagerie du visiteur ; l’adresse
reste affichée pour être copiée.

## Publication

Le workflow `.github/workflows/deploy.yml` prépare `_site/` avec les neuf pages,
`css/main.css`, `images/favicon.svg`, `Curriculum_Joinr.pdf`, `robots.txt`, `sitemap.xml` et `.nojekyll`.
Il ne publie pas la racine du dépôt. GitHub Pages doit utiliser GitHub Actions.

URL prévue selon le dépôt actuel : https://mrben509.github.io/Data-Portfolio/

`.gitignore` exclut notamment `AGENTS.md`, `REVUE-PORTFOLIO.md`, les CV sources
`Curriculum*.pdf` / `Currículum*.pdf`, les réglages IDE, secrets locaux et caches.
Seul `Curriculum_Joinr.pdf` est publié, avec un lien de téléchargement sur les pages Profil et Contact. Le CV PNL et les originaux accentués restent exclus.
Un fichier déjà versionné reste suivi malgré `.gitignore`.

## Vérification

Contrôler les pages à 320, 375, 768, 1024 et 1440 px, le zoom à 200 %, les liens,
les ancres des projets, le focus clavier, le lien d’évitement et la FAQ native.
La validation des liens ne prouve pas la réception des messages ni la disponibilité
des comptes sur les plateformes externes.
