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
        <a href="index.html" class="logo" aria-label="${SITE_CONFIG.companyName} — Inicio">
          <span class="logo__icon">${Icons.logo}</span>
          <span class="logo__text">${SITE_CONFIG.companyName}</span>
        </a>

        <nav class="nav" id="nav" aria-label="Navegación principal">
          ${navLinks}
        </nav>

        <div class="header__actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="Cambiar tema">
            ${Icons.sun}${Icons.moon}
          </button>
          <a href="contact.html" class="btn btn--primary btn--sm">Contactar</a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menú" aria-expanded="false">
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
            <p>Transforma tus datos comerciales en decisiones estratégicas claras y rentables.</p>
            <div class="footer__social">${socialLinks}</div>
          </div>

          <div class="footer__links">
            <h4 class="footer__title">Navegación</h4>
            ${navLinks}
          </div>

          <div class="footer__links">
            <h4 class="footer__title">Servicios</h4>
            <a href="services.html#analyse-ventes">Análisis de ventas</a>
            <a href="services.html#tableau-bord">Tableros personalizados</a>
            <a href="services.html#previsions">Predicciones de ventas</a>
            <a href="tarifs.html">Precios</a>
          </div>

          <div class="footer__links">
            <h4 class="footer__title">Contacto</h4>
            <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>
            <a href="tel:${SITE_CONFIG.phone.replace(/\s/g, '')}">${SITE_CONFIG.phone}</a>
            <a href="${SITE_CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp Business</a>
            <p style="font-size:0.875rem;color:var(--color-text-muted);margin:0.5rem 0 0;line-height:1.45;">${SITE_CONFIG.address}</p>
            <a href="contact.html">Formulario de contacto</a>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; ${SITE_CONFIG.year} ${SITE_CONFIG.companyName}. Todos los derechos reservados.</p>
          <div class="footer__legal">
            <a href="mentions-legales.html">Aviso legal</a>
            <a href="politique-confidentialite.html">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>

    <button class="back-to-top" id="back-to-top" aria-label="Volver arriba">
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
