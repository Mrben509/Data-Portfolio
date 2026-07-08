/**
 * Injection des composants partagés (header, footer)
 */

/** Retourne le nom du fichier de la page courante */
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page === '' ? 'index.html' : page;
}

/** Génère le HTML du header */
function renderHeader() {
  const currentPage = getCurrentPage();
  const navLinks = SITE_CONFIG.navigation
    .map(
      (item) =>
        `<a href="${item.href}" class="nav__link${currentPage === item.href ? ' active' : ''}">${item.label}</a>`
    )
    .join('');

  return `
    <header class="header" id="header">
      <div class="container header__inner">
        <a href="index.html" class="logo" aria-label="${SITE_CONFIG.companyName} — Accueil">
          <span class="logo__icon">${Icons.logo}</span>
          <span class="logo__text">${SITE_CONFIG.companyName}</span>
        </a>

        <nav class="nav" id="nav" aria-label="Navigation principale">
          ${navLinks}
        </nav>

        <div class="header__actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="Changer de thème">
            ${Icons.sun}${Icons.moon}
          </button>
          <a href="contact.html" class="btn btn--primary btn--sm">Demander un devis</a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">
            ${Icons.menu}
          </button>
        </div>
      </div>
    </header>
  `;
}

/** Génère le HTML du footer */
function renderFooter() {
  const navLinks = SITE_CONFIG.navigation
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join('');

  const socialLinks = SITE_CONFIG.social
    .map(
      (item) =>
        `<a href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">${Icons[item.icon] || ''}</a>`
    )
    .join('');

  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="index.html" class="logo">
              <span class="logo__icon">${Icons.logo}</span>
              <span class="logo__text">${SITE_CONFIG.companyName}</span>
            </a>
            <p>Transformez vos données commerciales en décisions stratégiques concrètes et rentables.</p>
            <div class="footer__social">${socialLinks}</div>
          </div>

          <div class="footer__links">
            <h4 class="footer__title">Navigation</h4>
            ${navLinks}
          </div>

          <div class="footer__links">
            <h4 class="footer__title">Services</h4>
            <a href="services.html">Analyse des ventes</a>
            <a href="services.html">Tableaux de bord</a>
            <a href="services.html">Prévisions</a>
            <a href="tarifs.html">Tarifs</a>
          </div>

          <div class="footer__links">
            <h4 class="footer__title">Contact</h4>
            <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>
            <a href="tel:${SITE_CONFIG.phone.replace(/\s/g, '')}">${SITE_CONFIG.phone}</a>
            <a href="contact.html">Formulaire de contact</a>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; ${SITE_CONFIG.year} ${SITE_CONFIG.companyName}. Tous droits réservés.</p>
          <div class="footer__legal">
            <a href="mentions-legales.html">Mentions légales</a>
            <a href="politique-confidentialite.html">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>

    <button class="back-to-top" id="back-to-top" aria-label="Retour en haut">
      ${Icons.arrowUp}
    </button>
  `;
}

/** Injecte header et footer dans la page */
function initComponents() {
  const headerPlaceholder = document.getElementById('site-header');
  const footerPlaceholder = document.getElementById('site-footer');

  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = renderHeader();
  }

  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = renderFooter();
  }
}
