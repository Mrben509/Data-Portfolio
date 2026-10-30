# Portfolio d’Emmanuel Raoul Théophile

Portfolio personnel Data Science et Data Analysis, orienté vers les besoins métier,
les missions freelance et les recrutements 100 % à distance. Les projets sont des
travaux indépendants ; les résultats commerciaux et la disponibilité ne sont pas
supposés. Les niveaux de langues parlées restent distincts des traductions du site.

## Contenu et maintenance

Les neuf pages existent en espagnol à la racine (URL historiques), en français dans
`fr/` et en anglais dans `en/`. Elles sont intégralement lisibles sans JavaScript.
Les liens relatifs fonctionnent sous `/Data-Portfolio/` sur GitHub Pages.

`scripts/build-site.mjs` contient le gabarit partagé et les textes dans les trois
langues. Modifier ce fichier puis lancer `node scripts/build-site.mjs` pour
régénérer les 27 pages et le sitemap. Les HTML générés sont versionnés : aucune
compilation ni dépendance n’est requise en production. Node est uniquement un
outil de maintenance. Les URL et ancres historiques sont conservées.

- Accueil : proposition de valeur, offres, preuves et occasions de contact.
- Services : problème, livrable, bénéfice attendu et outils.
- Projets : contexte, contribution personnelle et résultat concret.
- Approche : méthode de travail, parcours et langues parlées.
- Contact : email visible, LinkedIn, GitHub, WhatsApp et CV espagnol.
- Collaboration, FAQ, mentions légales et confidentialité complètent le parcours.

## Langues et thème

`js/preferences.js`, chargé avant le CSS, applique le thème enregistré ou celui du
système. Sur une entrée espagnole, il choisit la première langue prise en charge
parmi les préférences du navigateur (FR, ES, EN ; repli ES). Les URL FR/EN ouvrent
directement leur traduction. Aucun service externe ni géolocalisation.

`js/site.js` active le bouton de thème (état `aria-pressed`), suit les changements
du système tant qu’aucun thème n’a été choisi, et mémorise les choix explicites
avec `localStorage` lorsque disponible. Les liens de langues conservent la page
et l’ancre ; `?lang=` permet un choix explicite même sans stockage. Les préférences
sont facultatives. Sans JavaScript, les liens FR/ES/EN et le thème système restent
utilisables. Aucun traceur, police distante ou formulaire.

## Design

Palette : blanc `#ffffff`, lavis `#edf3f8`, ardoise `#172c46`, bleu d’action
`#2159a8`, pétrole `#126a68`, séparateurs `#cfdae5`. Le thème sombre utilise un
fond ardoise `#132234` et des accents éclaircis. Titres Trebuchet MS et texte
système : aucune police à télécharger.

Composition : navigation et contact, puis proposition de valeur à gauche et
processus à droite ; besoins métier, contact, preuves, contact final. Sur mobile,
une colonne conserve cet ordre. La méthode numérotée correspond à de vraies
étapes ; aucune animation automatique ni décoration lourde. La refonte conserve
l’identité existante et concentre la hiérarchie visuelle sur les décisions métier.

## Publication et vérification

`.github/workflows/deploy.yml` copie uniquement les pages publiques, `fr/`, `en/`,
le CSS, les deux scripts, l’icône, `Curriculum_Joinr.pdf` et les fichiers Pages.
Les sources, CV supplémentaires et réglages locaux ne sont pas publiés.

Vérifications réalisées : 27 pages, liens et ressources locaux, absence du statut
junior dans le HTML, rendu sans débordement à 320, 375, 768, 1024 et 1440 px,
détection FR, sélection EN persistante, thème persistant et conservation des
ancres lors du changement de langue. Inspection visuelle de l’accueil FR sur
bureau clair et mobile sombre. Le navigateur ouvre la messagerie pour l’email ;
ces contrôles ne prouvent pas la réception effective d’un message.
